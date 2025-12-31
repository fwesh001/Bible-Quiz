# 📜 Bible Quiz

A lightweight, browser-based quiz game to test and learn knowledge of the Scriptures.

---

## 🔧 Features

- Multiple-choice Bible questions with references and short facts
- Category filter: Old Testament / New Testament / All
- Difficulty filter (Normal / Hard / All)
- **Visual Timers**: Round Timer (bar) and Question Timer (circular countdown)
- **Immersive Audio**: WebAudio feedback for correct/wrong answers
- Daily Challenge (deterministic 5-question set)
- **Achievements**: Unlock titles like "Bible Student", "Hebrew Scripture Expert", and "Daily Challenger"
- Local high score & achievements saved to localStorage
- Dark Mode and mute controls
- Question review and simple navigation

---

## 🚀 Quick Start

1. Clone or download the project files.

2. (Optional but recommended) Create and activate a Python virtual environment, then install backend dependencies:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

3. Run the backend (optional — only needed if you want to use the admin panel or serve questions from the live DB):

```powershell
# from project root
python backend/app.py
```

The backend will create a local SQLite DB file `quiz_data.db` automatically.

4. Open the frontend by opening [index.html](index.html) in a browser, or serve the folder with a simple static server for better compatibility:

```powershell
# from project root
python -m http.server 8000
# then open http://localhost:8000
```

---

## ▶️ How to Use

- Select a **Category**, **Difficulty**, **Time Limit**, and **Number of Questions**.
- Click **Start Quiz** for a normal round or **Daily Challenge** for the deterministic 5-question set.
- During the quiz you can skip questions, see facts/references after answering, and view results at the end.
- Use the sidebar to toggle **Dark Mode** and **Mute**.

---

## 🛡 Admin Panel & Backend (Progress)

An admin interface is included to collect, review, and approve submitted questions. Files for the admin UI are: [admin.html](admin.html), [admin.js](admin.js), and [admin.css](admin.css).

Backend summary (in `backend/app.py`):

- Built with Flask and `flask-cors`.
- Creates/uses `quiz_data.db` (SQLite) and a `pending_questions` table.
- **File System Sync**: The `approve_question` endpoint writes directly to the local `questions.js` file, keeping the static frontend updated.
- Admin credentials are read from environment variables: `ADMIN_KEY` and `ADMIN_PASSWORD`. Defaults are set in the code for local testing but change them in production.

Key endpoints:

- `POST /add-question` — Save a submitted question into `pending_questions` (status=\"PENDING\").
- `GET /admin/questions` — Return all pending questions (for the admin UI).
- `POST /admin/approve/<id>` — Mark a question as `APPROVED` (requires `Admin-Key` header).
- `POST /admin/edit/<id>` — Edit question fields (requires `Admin-Key`).
- `POST /admin/login` — Simple password check, returns `admin_key` on success.
- `GET /questions/live` — Returns approved questions in the same format as `questions.js` for the frontend to consume.

Environment example (Windows PowerShell):

```powershell
$env:ADMIN_KEY = 'supersecret'
$env:ADMIN_PASSWORD = 'safepassword'
python backend/app.py
```

---

## ➕ Adding / Contributing Questions

Questions are stored in `questions.js` in the `bibleQuestions` array for the static frontend. Each question object follows this structure:

```js
{
  question: "Who built the ark?",
  options: ["Noah", "Moses", "Abraham", "David"],
  correct: 0, // index of correct option
  reference: "Genesis 6:14",
  fact: "Jehovah instructed Noah to build the ark...",
  category: "OLD TESTAMENT",
  difficulty: "NORMAL"
}
```

- To contribute: edit [questions.js](questions.js) and open a pull request, or submit via the frontend Add-Question flow which posts to the backend (if running).

---

## 🛠 Development Notes

- Core frontend files:
  - [index.html](index.html) — UI and structure
  - [style.css](style.css) — styling
  - [questions.js](questions.js) — bundled question data for the static experience
  - [script.js](script.js) — game logic

- Admin files:
  - [admin.html](admin.html)
  - [admin.js](admin.js)
  - [admin.css](admin.css)

- Backend:
  - [backend/app.py](backend/app.py) — Flask API and SQLite storage
  - DB file `quiz_data.db` is created in the project root when the backend runs

---

## 📬 Contact / Contribution

Send question submissions or feedback to: zabdielfwesh001@gmail.com

---

Made with care for learning Scripture. 🙏
