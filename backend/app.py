import os
import psycopg2
from psycopg2.extras import RealDictCursor
import json
import logging
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

# Configure logging
logging.basicConfig(level=logging.INFO, format='[%(asctime)s] [%(levelname)s] %(message)s')
logger = logging.getLogger(__name__)

parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
app = Flask(__name__, static_folder=parent_dir, static_url_path='')
CORS(app)

# GET THIS FROM RENDER DASHBOARD (Environment Variables)
DATABASE_URL = os.environ.get('DATABASE_URL')

def get_db_connection():
    # Connects to Render Postgres
    conn = psycopg2.connect(DATABASE_URL)
    return conn

def init_db():
    conn = get_db_connection()
    cur = conn.cursor()
    # Postgres syntax for Auto-increment is SERIAL
    cur.execute('''
        CREATE TABLE IF NOT EXISTS pending_questions (
            id SERIAL PRIMARY KEY,
            question TEXT,
            option_a TEXT, option_b TEXT, option_c TEXT, option_d TEXT,
            correct_index INTEGER,
            category TEXT,
            reference TEXT,
            fact TEXT,
            status TEXT
        )
    ''')
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
    logger.info("Postgres Database initialized.")

init_db()

# --- ROUTES ---

@app.route('/add-question', methods=['POST'])
def add_question():
    data = request.json
    opts = data.get('options', [])
    conn = get_db_connection()
    cur = conn.cursor()
    
    # Postgres uses %s instead of ?
    cur.execute('''
        INSERT INTO pending_questions 
        (question, option_a, option_b, option_c, option_d, correct_index, category, reference, fact, status)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
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
    cur.close()
    conn.close()
    return jsonify({"status": "success", "message": "Saved to Postgres!"}), 201

@app.route('/admin/questions', methods=['GET'])
def get_questions():
    conn = get_db_connection()
    # RealDictCursor makes rows look like dictionaries automatically
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute('SELECT * FROM pending_questions')
    questions = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(questions)

@app.route('/admin/delete/<int:q_id>', methods=['DELETE'])
def delete_question(q_id):
    admin_key = request.headers.get('Admin-Key')
    if admin_key != os.environ.get('ADMIN_KEY', 'hacking'):
        return jsonify({"message": "Unauthorized"}), 401
    
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('DELETE FROM pending_questions WHERE id = %s', (q_id,))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({"message": "Deleted from Postgres"})

# ... (You would update the other routes like approve and report similarly)