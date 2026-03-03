import os
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor
from werkzeug.security import check_password_hash


logging.basicConfig(level=logging.INFO, format='[%(asctime)s] [%(levelname)s] %(message)s')
logger = logging.getLogger(__name__)

parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
app = Flask(__name__, static_folder=parent_dir, static_url_path='')
CORS(app)

DATABASE_URL = os.environ.get('DATABASE_URL')
ADMIN_KEY = os.environ.get('ADMIN_KEY', 'hacking')
ADMIN_PASSWORD_HASH = os.environ.get('ADMIN_PASSWORD_HASH')


def get_db_connection():
    if not DATABASE_URL:
        raise RuntimeError('DATABASE_URL is not set')
    return psycopg2.connect(DATABASE_URL)


def require_admin():
    return request.headers.get('Admin-Key') == ADMIN_KEY


def verify_admin_password(password):
    if not ADMIN_PASSWORD_HASH:
        logger.error('ADMIN_PASSWORD_HASH is not configured')
        return False
    return check_password_hash(ADMIN_PASSWORD_HASH, password)


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


def init_db():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('''
        CREATE TABLE IF NOT EXISTS pending_questions (
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
    cur.execute("ALTER TABLE pending_questions ADD COLUMN IF NOT EXISTS difficulty TEXT DEFAULT 'NORMAL'")
    cur.execute('''
        CREATE TABLE IF NOT EXISTS reports (
            id SERIAL PRIMARY KEY,
            question_id INTEGER,
            question_text TEXT,
            reason TEXT,
            status TEXT DEFAULT 'OPEN',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    cur.close()
    conn.close()
    logger.info('Postgres database initialized')


init_db()


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/add-question', methods=['POST'])
def add_question():
    data = request.get_json(silent=True) or {}
    question = (data.get('question') or '').strip()
    opts = data.get('options', [])
    if not question:
        return jsonify({'message': 'Question is required'}), 400
    if not isinstance(opts, list):
        opts = []

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('''
        INSERT INTO pending_questions
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
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({'status': 'success', 'message': 'Saved for admin review'}), 201


@app.route('/questions/live', methods=['GET'])
def get_live_questions():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT * FROM pending_questions WHERE UPPER(COALESCE(status, '')) = 'APPROVED' ORDER BY id ASC")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify([row_to_quiz_question(r) for r in rows])


@app.route('/report-question', methods=['POST'])
def report_question():
    data = request.get_json(silent=True) or {}
    reason = (data.get('reason') or '').strip()
    question_text = (data.get('question_text') or '').strip()
    question_id = data.get('id', 0)

    if not reason:
        return jsonify({'message': 'Reason is required'}), 400

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('''
        INSERT INTO reports (question_id, question_text, reason, status)
        VALUES (%s, %s, %s, %s)
    ''', (int(question_id or 0), question_text, reason, 'OPEN'))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({'message': 'Report submitted'}), 201


@app.route('/admin/login', methods=['POST'])
def admin_login():
    data = request.get_json(silent=True) or {}
    password = data.get('password', '')
    if not verify_admin_password(password):
        return jsonify({'message': 'Invalid password'}), 401
    return jsonify({'admin_key': ADMIN_KEY})


@app.route('/admin/questions', methods=['GET'])
def get_questions():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute('SELECT * FROM pending_questions ORDER BY id DESC')
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(rows)


@app.route('/admin/edit/<int:q_id>', methods=['POST'])
def edit_question(q_id):
    if not require_admin():
        return jsonify({'message': 'Unauthorized'}), 401

    data = request.get_json(silent=True) or {}
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('''
        UPDATE pending_questions
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
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({'message': 'Question updated'})


@app.route('/admin/approve/<int:q_id>', methods=['POST'])
def approve_question(q_id):
    if not require_admin():
        return jsonify({'message': 'Unauthorized'}), 401

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("UPDATE pending_questions SET status = 'APPROVED' WHERE id = %s", (q_id,))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({'message': 'Question approved'})


@app.route('/admin/delete/<int:q_id>', methods=['DELETE'])
def delete_question(q_id):
    if not require_admin():
        return jsonify({'message': 'Unauthorized'}), 401

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('DELETE FROM pending_questions WHERE id = %s', (q_id,))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({'message': 'Deleted from Postgres'})


@app.route('/admin/reports', methods=['GET'])
def get_reports():
    if not require_admin():
        return jsonify({'message': 'Unauthorized'}), 401

    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute('SELECT * FROM reports ORDER BY created_at DESC, id DESC')
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(rows)


@app.route('/admin/resolve-report/<int:report_id>', methods=['POST'])
def resolve_report(report_id):
    if not require_admin():
        return jsonify({'message': 'Unauthorized'}), 401

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("UPDATE reports SET status = 'RESOLVED' WHERE id = %s", (report_id,))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({'message': 'Report resolved'})


@app.route('/admin/delete-report/<int:report_id>', methods=['DELETE'])
def delete_report(report_id):
    if not require_admin():
        return jsonify({'message': 'Unauthorized'}), 401

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('DELETE FROM reports WHERE id = %s', (report_id,))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({'message': 'Report deleted'})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)), debug=False)