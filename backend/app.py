import os
import re
import logging
import threading
from contextlib import contextmanager
from urllib.parse import urlparse, parse_qsl, urlencode, urlunparse, quote, unquote

from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor
from werkzeug.security import check_password_hash
from dotenv import load_dotenv


logging.basicConfig(level=logging.INFO, format='[%(asctime)s] [%(levelname)s] %(message)s')
logger = logging.getLogger(__name__)

backend_dir = os.path.dirname(__file__)
parent_dir = os.path.abspath(os.path.join(backend_dir, '..'))

# Local development support: load environment values from .env if present
load_dotenv(os.path.join(parent_dir, '.env'))
load_dotenv(os.path.join(backend_dir, '.env'))

app = Flask(__name__, static_folder=parent_dir, static_url_path='')
CORS(app)

_SCHEMA_NAME_RE = re.compile(r'^[A-Za-z_][A-Za-z0-9_]*$')
_db_initialized = False
_db_init_lock = threading.Lock()


class DatabaseConfigError(RuntimeError):
    """Raised when required database configuration is missing or invalid."""


def get_db_schema():
    schema = (os.environ.get('DB_SCHEMA') or 'bible_quiz').strip()
    if not _SCHEMA_NAME_RE.match(schema):
        raise DatabaseConfigError(f"Invalid DB_SCHEMA identifier: {schema!r}")
    return schema


def table_name(name):
    return f'"{get_db_schema()}"."{name}"'


def normalize_database_url(raw_url):
    url = (raw_url or '').strip()
    if not url:
        raise DatabaseConfigError('DATABASE_URL is not configured')

    if url.startswith('postgres://'):
        url = 'postgresql://' + url[len('postgres://'):]

    # Percent-encode userinfo credentials safely so special characters like '@' or '#' in passwords don't break urlparse/libpq
    if '://' in url and '@' in url:
        scheme, rest = url.split('://', 1)
        if '@' in rest:
            creds, host_part = rest.rsplit('@', 1)
            if ':' in creds:
                user, password = creds.split(':', 1)
                creds = f"{quote(unquote(user), safe='')}:{quote(unquote(password), safe='')}"
            else:
                creds = quote(unquote(creds), safe='')
            url = f"{scheme}://{creds}@{host_part}"

    parsed = urlparse(url)
    host = (parsed.hostname or '').lower()
    query = dict(parse_qsl(parsed.query, keep_blank_values=True))

    # Enforce SSL for remote Postgres hosts (e.g., Supabase/Render) if omitted
    if host and host not in ('localhost', '127.0.0.1', '::1') and 'sslmode' not in query:
        query['sslmode'] = 'require'
        url = urlunparse(parsed._replace(query=urlencode(query)))

    return url


def log_startup_config_warnings():
    missing = [
        name for name in ('DATABASE_URL', 'ADMIN_KEY', 'ADMIN_PASSWORD_HASH')
        if not os.environ.get(name)
    ]
    if missing:
        logger.warning(
            'Missing environment variables (%s); static quiz will still load, '
            'but affected API endpoints will be unavailable.',
            ', '.join(missing)
        )


def get_db_connection():
    dsn = normalize_database_url(os.environ.get('DATABASE_URL'))
    return psycopg2.connect(dsn, connect_timeout=10)


def _create_schema_and_tables(cur):
    schema = get_db_schema()
    pending_table = table_name('pending_questions')
    reports_table = table_name('reports')
    feedback_table = table_name('feedback')

    cur.execute(f'CREATE SCHEMA IF NOT EXISTS "{schema}"')
    cur.execute(f'''
        CREATE TABLE IF NOT EXISTS {pending_table} (
            id SERIAL PRIMARY KEY,
            question TEXT,
            option_a TEXT,
            option_b TEXT,
            option_c TEXT,
            option_d TEXT,
            correct_index INTEGER,
            category TEXT,
            reference TEXT,
            fact TEXT,
            difficulty TEXT DEFAULT 'NORMAL',
            status TEXT DEFAULT 'PENDING'
        )
    ''')
    cur.execute(f"ALTER TABLE {pending_table} ADD COLUMN IF NOT EXISTS difficulty TEXT DEFAULT 'NORMAL'")
    cur.execute(f'''
        CREATE TABLE IF NOT EXISTS {reports_table} (
            id SERIAL PRIMARY KEY,
            question_id INTEGER,
            question_text TEXT,
            reason TEXT,
            status TEXT DEFAULT 'OPEN',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    cur.execute(f'''
        CREATE TABLE IF NOT EXISTS {feedback_table} (
            id SERIAL PRIMARY KEY,
            type TEXT DEFAULT 'BUG',
            message TEXT,
            context_text TEXT,
            status TEXT DEFAULT 'OPEN',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')


def init_db():
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            _create_schema_and_tables(cur)
        conn.commit()
        logger.info('Postgres database initialized (schema=%s)', get_db_schema())
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


def ensure_db_initialized():
    """Initialize schema and tables lazily so import/startup never blocks Gunicorn port binding."""
    global _db_initialized
    if _db_initialized:
        return

    with _db_init_lock:
        if _db_initialized:
            return
        init_db()
        _db_initialized = True


@contextmanager
def db_cursor(dict_cursor=False, commit=False):
    ensure_db_initialized()
    conn = get_db_connection()
    cursor_factory = RealDictCursor if dict_cursor else None
    cur = conn.cursor(cursor_factory=cursor_factory)
    try:
        yield cur
        if commit:
            conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        cur.close()
        conn.close()


def require_admin():
    admin_key = os.environ.get('ADMIN_KEY')
    if not admin_key:
        return False
    incoming_key = request.headers.get('Admin-Key')
    if not incoming_key:
        return False
    return incoming_key == admin_key


def verify_admin_password(password):
    password_hash = os.environ.get('ADMIN_PASSWORD_HASH')
    if not password_hash:
        logger.error('ADMIN_PASSWORD_HASH is not configured')
        return False
    return check_password_hash(password_hash, password)


def row_to_quiz_question(row):
    return {
        'id': row.get('id'),
        'question': row.get('question') or '',
        'options': [
            row.get('option_a') or '',
            row.get('option_b') or '',
            row.get('option_c') or '',
            row.get('option_d') or ''
        ],
        'correct': int(row.get('correct_index') or 0),
        'category': row.get('category') or 'ALL',
        'reference': row.get('reference') or '',
        'fact': row.get('fact') or '',
        'difficulty': row.get('difficulty') or 'NORMAL'
    }


@app.errorhandler(DatabaseConfigError)
@app.errorhandler(psycopg2.Error)
def handle_database_error(exc):
    logger.error('Database error during request: %s', exc)
    return jsonify({'message': 'Database service temporarily unavailable'}), 503


log_startup_config_warnings()


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/health', methods=['GET'])
def health_check():
    try:
        ensure_db_initialized()
        conn = get_db_connection()
        try:
            with conn.cursor() as cur:
                cur.execute('SELECT 1')
                cur.fetchone()
        finally:
            conn.close()
        return jsonify({
            'status': 'ok',
            'database': 'connected',
            'schema': get_db_schema()
        }), 200
    except (DatabaseConfigError, psycopg2.Error) as exc:
        logger.warning('Health check database probe failed: %s', exc)
        return jsonify({
            'status': 'degraded',
            'database': 'unavailable'
        }), 200


@app.route('/add-question', methods=['POST'])
def add_question():
    data = request.get_json(silent=True) or {}
    question = (data.get('question') or '').strip()
    opts = data.get('options', [])
    if not question:
        return jsonify({'message': 'Question is required'}), 400
    if not isinstance(opts, list):
        opts = []

    with db_cursor(commit=True) as cur:
        cur.execute(f'''
            INSERT INTO {table_name('pending_questions')}
            (question, option_a, option_b, option_c, option_d, correct_index, category, reference, fact, difficulty, status)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        ''', (
            question,
            opts[0] if len(opts) > 0 else '',
            opts[1] if len(opts) > 1 else '',
            opts[2] if len(opts) > 2 else '',
            opts[3] if len(opts) > 3 else '',
            int(data.get('correct', 0) or 0),
            data.get('category', 'ALL'),
            data.get('reference', ''),
            data.get('fact', ''),
            data.get('difficulty', 'NORMAL'),
            'PENDING'
        ))
    return jsonify({'status': 'success', 'message': 'Saved for admin review'}), 201


@app.route('/questions/live', methods=['GET'])
def get_live_questions():
    with db_cursor(dict_cursor=True) as cur:
        cur.execute(
            f"SELECT * FROM {table_name('pending_questions')} "
            "WHERE UPPER(COALESCE(status, '')) = 'APPROVED' ORDER BY id ASC"
        )
        rows = cur.fetchall()
    return jsonify([row_to_quiz_question(r) for r in rows])


@app.route('/report-question', methods=['POST'])
def report_question():
    data = request.get_json(silent=True) or {}
    reason = (data.get('reason') or '').strip()
    question_text = (data.get('question_text') or '').strip()
    question_id = data.get('id', 0)

    if not reason:
        return jsonify({'message': 'Reason is required'}), 400

    with db_cursor(commit=True) as cur:
        cur.execute(f'''
            INSERT INTO {table_name('reports')} (question_id, question_text, reason, status)
            VALUES (%s, %s, %s, %s)
        ''', (int(question_id or 0), question_text, reason, 'OPEN'))
    return jsonify({'message': 'Report submitted'}), 201


@app.route('/feedback', methods=['POST'])
def submit_feedback():
    data = request.get_json(silent=True) or {}
    feedback_type = (data.get('type') or 'BUG').strip().upper()
    message = (data.get('message') or '').strip()
    context_text = (data.get('context_text') or '').strip()

    if feedback_type not in ('BUG', 'SUGGESTION'):
        feedback_type = 'BUG'

    if not message:
        return jsonify({'message': 'Feedback message is required'}), 400

    with db_cursor(commit=True) as cur:
        cur.execute(f'''
            INSERT INTO {table_name('feedback')} (type, message, context_text, status)
            VALUES (%s, %s, %s, %s)
        ''', (feedback_type, message, context_text, 'OPEN'))
    return jsonify({'message': 'Feedback submitted'}), 201


@app.route('/admin/login', methods=['POST'])
def admin_login():
    data = request.get_json(silent=True) or {}
    password = data.get('password', '')
    if not verify_admin_password(password):
        return jsonify({'message': 'Invalid password'}), 401
    admin_key = os.environ.get('ADMIN_KEY')
    if not admin_key:
        return jsonify({'message': 'Admin key is not configured'}), 503
    return jsonify({'admin_key': admin_key})


@app.route('/admin/questions', methods=['GET'])
def get_questions():
    with db_cursor(dict_cursor=True) as cur:
        cur.execute(f"SELECT * FROM {table_name('pending_questions')} ORDER BY id DESC")
        rows = cur.fetchall()
    return jsonify(rows)


@app.route('/admin/edit/<int:q_id>', methods=['POST'])
def edit_question(q_id):
    if not require_admin():
        return jsonify({'message': 'Unauthorized'}), 401

    data = request.get_json(silent=True) or {}
    with db_cursor(commit=True) as cur:
        cur.execute(f'''
            UPDATE {table_name('pending_questions')}
            SET question = %s,
                option_a = %s,
                option_b = %s,
                option_c = %s,
                option_d = %s,
                correct_index = %s,
                category = %s,
                reference = %s,
                fact = %s,
                difficulty = %s
            WHERE id = %s
        ''', (
            data.get('question', ''),
            data.get('option_a', ''),
            data.get('option_b', ''),
            data.get('option_c', ''),
            data.get('option_d', ''),
            int(data.get('correct_index', 0) or 0),
            data.get('category', 'ALL'),
            data.get('reference', ''),
            data.get('fact', ''),
            data.get('difficulty', 'NORMAL'),
            q_id
        ))
    return jsonify({'message': 'Question updated'})


@app.route('/admin/approve/<int:q_id>', methods=['POST'])
def approve_question(q_id):
    if not require_admin():
        return jsonify({'message': 'Unauthorized'}), 401

    with db_cursor(commit=True) as cur:
        cur.execute(
            f"UPDATE {table_name('pending_questions')} SET status = 'APPROVED' WHERE id = %s",
            (q_id,)
        )
    return jsonify({'message': 'Question approved'})


@app.route('/admin/delete/<int:q_id>', methods=['DELETE'])
def delete_question(q_id):
    if not require_admin():
        return jsonify({'message': 'Unauthorized'}), 401

    with db_cursor(commit=True) as cur:
        cur.execute(f"DELETE FROM {table_name('pending_questions')} WHERE id = %s", (q_id,))
    return jsonify({'message': 'Deleted from Postgres'})


@app.route('/admin/reports', methods=['GET'])
def get_reports():
    if not require_admin():
        return jsonify({'message': 'Unauthorized'}), 401

    with db_cursor(dict_cursor=True) as cur:
        cur.execute(f"SELECT * FROM {table_name('reports')} ORDER BY created_at DESC, id DESC")
        rows = cur.fetchall()
    return jsonify(rows)


@app.route('/admin/resolve-report/<int:report_id>', methods=['POST'])
def resolve_report(report_id):
    if not require_admin():
        return jsonify({'message': 'Unauthorized'}), 401

    with db_cursor(commit=True) as cur:
        cur.execute(
            f"UPDATE {table_name('reports')} SET status = 'RESOLVED' WHERE id = %s",
            (report_id,)
        )
    return jsonify({'message': 'Report resolved'})


@app.route('/admin/delete-report/<int:report_id>', methods=['DELETE'])
def delete_report(report_id):
    if not require_admin():
        return jsonify({'message': 'Unauthorized'}), 401

    with db_cursor(commit=True) as cur:
        cur.execute(f"DELETE FROM {table_name('reports')} WHERE id = %s", (report_id,))
    return jsonify({'message': 'Report deleted'})


@app.route('/admin/feedback', methods=['GET'])
def get_feedback():
    if not require_admin():
        return jsonify({'message': 'Unauthorized'}), 401

    with db_cursor(dict_cursor=True) as cur:
        cur.execute(f"SELECT * FROM {table_name('feedback')} ORDER BY created_at DESC, id DESC")
        rows = cur.fetchall()
    return jsonify(rows)


@app.route('/admin/resolve-feedback/<int:feedback_id>', methods=['POST'])
def resolve_feedback(feedback_id):
    if not require_admin():
        return jsonify({'message': 'Unauthorized'}), 401

    with db_cursor(commit=True) as cur:
        cur.execute(
            f"UPDATE {table_name('feedback')} SET status = 'RESOLVED' WHERE id = %s",
            (feedback_id,)
        )
    return jsonify({'message': 'Feedback resolved'})


@app.route('/admin/delete-feedback/<int:feedback_id>', methods=['DELETE'])
def delete_feedback(feedback_id):
    if not require_admin():
        return jsonify({'message': 'Unauthorized'}), 401

    with db_cursor(commit=True) as cur:
        cur.execute(f"DELETE FROM {table_name('feedback')} WHERE id = %s", (feedback_id,))
    return jsonify({'message': 'Feedback deleted'})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)), debug=False)
