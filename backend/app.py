from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# 1. The Home Route
@app.route('/')
def home():
    return "The Bible Quiz Kitchen is OPEN!"

# 2. The Add Question Route
@app.route('/add-question', methods=['POST'])
def add_question():
    # 'request.json' automatically converts the incoming JSON string into a Python Dictionary
    new_question_data = request.json
    
    # For now, let's just print it to the terminal to see it!
    print("New Question Received:", new_question_data)
    
    # We send a success message back to the browser
    return jsonify({"status": "success", "message": "Question received!"}), 201

if __name__ == '__main__':
    app.run(port=5000, debug=True)