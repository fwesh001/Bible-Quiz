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
            correct_index INTEGER,
            status TEXT
        )
    ''')
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
    cursor.execute('''
        INSERT INTO pending_questions (question, option_a, option_b, correct_index, status)
        VALUES (?, ?, ?, ?, ?)
    ''', (data['question'], data['options'][0], data['options'][1], data['correct'], 'PENDING'))
    
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
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    # Change the status to APPROVED for this specific ID
    cursor.execute('UPDATE pending_questions SET status = "APPROVED" WHERE id = ?', (q_id,))
    
    conn.commit()
    conn.close()
    return jsonify({"message": f"Question {q_id} approved!"})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
