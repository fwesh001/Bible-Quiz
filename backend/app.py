import os
import sqlite3
import json
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
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

# Initialize the pantry when the script starts
init_db()

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
        return jsonify({"message": "Saved to questions.js and Database!"})

    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500


@app.route('/admin/edit/<int:q_id>', methods=['POST', 'PUT', 'PATCH'])
def edit_question(q_id):
    # Require Admin-Key header for authentication
    admin_key = request.headers.get('Admin-Key')
    if not admin_key or admin_key != ADMIN_KEY:
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

    return jsonify({"message": f"Question {q_id} updated."})


@app.route('/admin/login', methods=['POST'])
def admin_login():
    data = request.json or {}
    password = data.get('password', '')
    if password == ADMIN_PASSWORD:
        return jsonify({"ok": True, "admin_key": ADMIN_KEY})
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
    return jsonify(questions)

if __name__ == '__main__':
    app.run(port=5000, debug=True)
