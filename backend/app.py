import os
import sqlite3
import json
import logging
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

# Configure structured logging
logging.basicConfig(
    level=logging.INFO,
    format='[%(asctime)s] [%(levelname)s] %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
logger = logging.getLogger(__name__)

# Get the parent directory (project root) to serve static files
parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

app = Flask(__name__, static_folder=parent_dir, static_url_path='')
CORS(app)

DB_NAME = "quiz_data.db"

# Admin credentials read from environment for safety
ADMIN_KEY = os.environ.get('ADMIN_KEY', 'hacking')
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'hacking')

def init_db():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS pending_questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            question TEXT,
            option_a TEXT,
            option_b TEXT,
            option_c TEXT,
            option_d TEXT,
            correct_index INTEGER,
            category TEXT,
            reference TEXT,
            fact TEXT,
            status TEXT
        )
    ''')
    conn.commit()
    # Ensure older databases get the new columns if they were created without option_c/option_d
    cursor.execute("PRAGMA table_info(pending_questions)")
    cols = [row[1] for row in cursor.fetchall()]
    if 'option_c' not in cols:
        cursor.execute('ALTER TABLE pending_questions ADD COLUMN option_c TEXT')
    if 'option_d' not in cols:
        cursor.execute('ALTER TABLE pending_questions ADD COLUMN option_d TEXT')
    conn.commit()
    conn.close()
    logger.info("Database initialized successfully.")

# Initialize the pantry when the script starts
init_db()

@app.route('/')
def index():
    """Serve the main index.html page"""
    return send_from_directory(parent_dir, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    """Serve static files from the project root"""
    try:
        return send_from_directory(parent_dir, path)
    except FileNotFoundError:
        # If file not found, let Flask handle 404
        return "File not found", 404

@app.route('/add-question', methods=['POST'])
def add_question():
    data = request.json
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    opts = data.get('options', [])
    cursor.execute('''
        INSERT INTO pending_questions 
        (question, option_a, option_b, option_c, option_d, correct_index, category, reference, fact, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        data['question'], 
        opts[0] if len(opts) > 0 else '', 
        opts[1] if len(opts) > 1 else '', 
        opts[2] if len(opts) > 2 else '', 
        opts[3] if len(opts) > 3 else '', 
        data.get('correct', 0),
        data.get('category', 'ALL'),
        data.get('reference', ''),
        data.get('fact', ''),
        'PENDING'
    ))
    conn.commit()
    conn.close()
    logger.info(f"New question submitted: {data.get('question', 'Unknown')[:30]}...")
    return jsonify({"status": "success", "message": "Saved to database!"}), 201

@app.route('/admin/questions', methods=['GET'])
def get_questions():
    conn = sqlite3.connect(DB_NAME)
    # This row_factory makes the data look like a Dictionary instead of a Tuple
    conn.row_factory = sqlite3.Row 
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM pending_questions')
    rows = cursor.fetchall()
    
    # Convert the database rows into a list of dictionaries so JS can read them
    questions = [dict(row) for row in rows]
    
    conn.close()
    # logger.info(f"Admin fetched {len(questions)} pending questions.") # Optional: uncomment if too noisy
    return jsonify(questions)

@app.route('/admin/approve/<int:q_id>', methods=['POST'])
def approve_question(q_id):
    # Check the "Admin-Key" header
    admin_key = request.headers.get('Admin-Key')
    if not admin_key or admin_key != ADMIN_KEY:
        return jsonify({"message": "Unauthorized"}), 401

    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    # Fetch the pending question
    cursor.execute('SELECT * FROM pending_questions WHERE id = ?', (q_id,))
    row = cursor.fetchone()
    if not row:
        conn.close()
        return jsonify({"message": "Question not found"}), 404

    # Build the JS object to append (match questions.js structure)
    new_entry = {
        "question": row['question'] or '',
        "options": [row['option_a'] or '', row['option_b'] or '', row['option_c'] or '', row['option_d'] or ''],
        "correct": row['correct_index'] if row['correct_index'] is not None else 0,
        "reference": row['reference'] or '',
        "fact": row['fact'] or '',
        "category": row['category'] or 'ALL'
    }

    # Path to questions.js (project root)
    qpath = os.path.normpath(os.path.join(os.path.dirname(__file__), '..', 'questions.js'))

    try:
        with open(qpath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Find last closing bracket of the array (the final ] )
        stripped = content.rstrip()
        last_bracket = stripped.rfind(']')
        if last_bracket == -1:
            raise Exception('Could not find closing bracket in questions.js')

        prefix = stripped[:last_bracket]
        closing = stripped[last_bracket:]

        # Determine whether we need a leading comma before adding the new object
        needs_comma = not prefix.rstrip().endswith('[')

        # Prepare JS-friendly string of the object using JSON (valid JS object literal)
        js_obj_str = json.dumps(new_entry, indent=2, ensure_ascii=False)

        to_write = prefix
        if needs_comma:
            to_write += ','
        to_write += '\n  ' + js_obj_str + '\n' + closing

        with open(qpath, 'w', encoding='utf-8') as f:
            f.write(to_write)

        # Mark as approved in DB so it doesn't show in admin anymore
        cursor.execute('UPDATE pending_questions SET status = "APPROVED" WHERE id = ?', (q_id,))
        conn.commit()
        conn.close()
        logger.info(f"Question {q_id} approved and synced to questions.js.")
        return jsonify({"message": "Saved to questions.js and Database!"})

    except Exception as e:
        conn.close()
        logger.error(f"Error approving question {q_id}: {str(e)}")
        return jsonify({"error": str(e)}), 500


@app.route('/admin/edit/<int:q_id>', methods=['POST', 'PUT', 'PATCH'])
def edit_question(q_id):
    # Require Admin-Key header for authentication
    admin_key = request.headers.get('Admin-Key')
    if not admin_key or admin_key != ADMIN_KEY:
        logger.warning(f"Unauthorized edit attempt for QID {q_id}")
        return jsonify({"message": "Unauthorized"}), 401

    data = request.json or {}
    # Allowed fields that can be updated and their DB column names
    allowed = {
        'question': 'question',
        'option_a': 'option_a',
        'option_b': 'option_b',
        'option_c': 'option_c',
        'option_d': 'option_d',
        'correct_index': 'correct_index',
        'category': 'category',
        'reference': 'reference',
        'fact': 'fact',
        'status': 'status'
    }

    updates = []
    params = []
    for key, col in allowed.items():
        if key in data:
            updates.append(f"{col} = ?")
            params.append(data[key])

    if not updates:
        return jsonify({"message": "No valid fields provided"}), 400

    params.append(q_id)
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    sql = f"UPDATE pending_questions SET {', '.join(updates)} WHERE id = ?"
    cursor.execute(sql, params)
    conn.commit()
    conn.close()

    logger.info(f"Question {q_id} updated via Admin.")
    return jsonify({"message": f"Question {q_id} updated."})


@app.route('/admin/login', methods=['POST'])
def admin_login():
    data = request.json or {}
    password = data.get('password', '')
    if password == ADMIN_PASSWORD:
        logger.info("Admin login successful.")
        return jsonify({"ok": True, "admin_key": ADMIN_KEY})
    logger.warning("Admin login failed: Incorrect password.")
    return jsonify({"ok": False, "message": "Invalid password"}), 401

@app.route('/questions/live', methods=['GET'])
def get_live_questions():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    # Only grab the ones you clicked "Approve" on!
    cursor.execute('SELECT * FROM pending_questions WHERE status = "APPROVED"')
    rows = cursor.fetchall()
    
    questions = []
    for row in rows:
        # We format it exactly like your original questions.js objects
        questions.append({
            "question": row['question'],
            "options": [row['option_a'] or '', row['option_b'] or '', row['option_c'] or '', row['option_d']],
            "correct": row['correct_index'],
            "category": "OLD TESTAMENT" # You can store this in DB too
        })
    
    conn.close()
    # logger.info(f"Live questions fetched. Count: {len(questions)}") # Optional noise reduction
    return jsonify(questions)

@app.route('/admin/delete/<int:q_id>', methods=['DELETE'])
def delete_question(q_id):
    # Require Admin-Key header for authentication
    admin_key = request.headers.get('Admin-Key')
    if not admin_key or admin_key != ADMIN_KEY:
        logger.warning(f"Unauthorized delete attempt for QID {q_id}")
        return jsonify({"message": "Unauthorized"}), 401
    
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('DELETE FROM pending_questions WHERE id = ?', (q_id,))
    # Check if a row was actually deleted
    if cursor.rowcount == 0:
        conn.close()
        return jsonify({"message": "Question not found"}), 404
    
    conn.commit()
    conn.close()
    logger.info(f"Question {q_id} permanently deleted via Admin.")
    return jsonify({"message": f"Question {q_id} deleted."})

if __name__ == '__main__':
    logger.info("Starting Bible Quiz Backend on port 5000...")
    app.run(port=5000, debug=True)
