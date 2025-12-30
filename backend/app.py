import sqlite3
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

DB_NAME = "quiz_data.db"

def init_db():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    # Create the table if it doesn't exist
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS pending_questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            question TEXT,
            option_a TEXT,
            option_b TEXT,
            option_c TEXT,
            option_d TEXT,
            correct_index INTEGER,
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
    
    # Save to the Pantry!
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    # Accept up to 4 options; fill missing with empty string
    opts = data.get('options', [])
    a = opts[0] if len(opts) > 0 else ''
    b = opts[1] if len(opts) > 1 else ''
    c = opts[2] if len(opts) > 2 else ''
    d = opts[3] if len(opts) > 3 else ''
    cursor.execute('''
        INSERT INTO pending_questions (question, option_a, option_b, option_c, option_d, correct_index, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', (data['question'], a, b, c, d, data.get('correct', 0), 'PENDING'))
    
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
    if admin_key != "hacking":
        return jsonify({"message": "Unauthorized"}), 401

    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    # Change the status to APPROVED for this specific ID
    cursor.execute('UPDATE pending_questions SET status = "APPROVED" WHERE id = ?', (q_id,))
    
    conn.commit()
    conn.close()
    return jsonify({"message": f"Question {q_id} approved!"})

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
            "options": [row['option_a'] or '', row['option_b'] or '', row['option_c'] or '', row['option_d'] or ''],
            "correct": row['correct_index'],
            "category": "OLD TESTAMENT" # You can store this in DB too
        })
    
    conn.close()
    return jsonify(questions)

if __name__ == '__main__':
    app.run(port=5000, debug=True)
