# 📜 Bible Quiz

A lightweight, browser-based quiz game to test and learn knowledge of the Scriptures.

---

## 🔧 Features

- Multiple-choice Bible questions with references and short facts
- **Responsive Design**: Optimized for mobile devices and tablets (including 412x915 screens)
- **Deployment Ready**: Configured for seamless deployment on Render with Flask serving static files
- Category filter: Old Testament / New Testament / All
- Difficulty filter (Normal / Hard / All)
- **Visual Timers**: Round Timer (bar) and Question Timer (circular countdown)
- **Immersive Audio**: WebAudio feedback for correct/wrong answers
- **Keyboard Shortcuts**: Press Enter to submit quiz or confirm admin actions
- Daily Challenge (deterministic 5-question set)
- **Achievements**: Unlock titles like "Bible Student", "Hebrew Scripture Expert", and "Daily Challenger"
- Local high score & achievements saved to localStorage
- Dark Mode and mute controls
- Question review and simple navigation

---

## 🚀 Quick Start

### Local Development

1. Clone or download the project files.

2. (Optional but recommended) Create and activate a Python virtual environment, then install backend dependencies:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

3. Run the backend (required for API features):

```powershell
# from project root
cd backend
python app.py
```

4. Open the frontend:
   - Visit `http://localhost:5000` in your browser
   - The app works on both desktop and mobile screens

### Deployment (Render)

The app is configured to deploy easily on Render:
1. Push code to GitHub
2. Create a new Web Service on Render linked to your repo
3. Set Build Command: `pip install -r requirements.txt`
4. Set Start Command: `gunicorn --chdir backend app:app`
5. Your app will automatically serve the frontend from the root URL!

---

## ▶️ How to Use

- Select a **Category**, **Difficulty**, **Time Limit**, and **Number of Questions**.
- Click **Start Quiz** for a normal round or **Daily Challenge** for the deterministic 5-question set.
- During the quiz you can skip questions, see facts/references after answering, and view results at the end.
- Use the sidebar to toggle **Dark Mode** and **Mute**.

---

## 🛡 Admin Panel & Backend

An admin interface is included to collect, review, and approve submitted questions. Files for the admin UI are: [admin.html](admin.html), [admin.js](admin.js), and [admin.css](admin.css).

### Admin Dashboard Features
- **Bulk Actions**: Select multiple questions with checkboxes; "Approve Selected" and "Delete Selected" buttons
- **Custom Modals**: Styled confirmation dialogs instead of browser alerts
- **Status Badges**: Color-coded indicators (🟡 Pending, 🟢 Approved)
- **Hard Delete**: Permanently remove questions from the database
- **Keyboard Support**: Press Enter to login or confirm modal actions
- **Structured Logging**: All admin actions are logged with timestamps

### Admin UI — Compact Summary View (Updated)

- The admin interface now uses a compact summary + expandable details pattern across the **Pending**, **Reports**, and **Search** tabs.
- Each item shows a single-line summary (full question text and status) with an expand toggle. Click the expand button to reveal editable fields, options, and action buttons (Save / Approve / Delete or Resolve / Delete for reports).
- This reduces visual clutter and improves scanning large lists.

Quick notes for the admin UI:
- To test the admin UI without the backend, serve the project root as a static site (see Testing below) and open `admin.html`.
- If the backend is running, the admin UI will load pending items from the API endpoints and wire Save / Approve / Delete actions to the backend.

### Backend Summary (in `backend/app.py`)

- Built with Flask and `flask-cors`.
- Creates/uses `quiz_data.db` (SQLite) and a `pending_questions` table.
- **File System Sync**: The `approve_question` endpoint writes directly to the local `questions.js` file, keeping the static frontend updated.
- Admin credentials are read from environment variables: `ADMIN_KEY` and `ADMIN_PASSWORD`. Defaults are set in the code for local testing but change them in production.

### Key Endpoints

- `POST /add-question` — Save a submitted question into `pending_questions` (status="PENDING")
- `GET /admin/questions` — Return all pending questions (for the admin UI)
- `POST /admin/approve/<id>` — Mark a question as `APPROVED` and sync to `questions.js` (requires `Admin-Key` header)
- `DELETE /admin/delete/<id>` — Permanently delete a question from the database (requires `Admin-Key` header)
- `POST /admin/edit/<id>` — Edit question fields (requires `Admin-Key`)
- `POST /admin/login` — Simple password check, returns `admin_key` on success
- `GET /questions/live` — Returns approved questions in the same format as `questions.js` for the frontend to consume

Environment example (Windows PowerShell):

```powershell
$env:ADMIN_KEY = 'supersecret'
$env:ADMIN_PASSWORD = 'safepassword'
python backend/app.py
```

---

## 🧪 Testing the Admin UI (Quick)

You can open the `admin.html` file directly from a static server or via the backend. Recommended quick tests:

Static server (no backend API):
```powershell
# from project root
python -m http.server 8000
# then open http://localhost:8000/admin.html
```

With backend (API wired):
```powershell
cd backend
python app.py
# then open http://localhost:5000/admin.html
```

When testing, try:
- Expand / collapse rows in Pending, Reports, and Search
- Perform Save, Approve, Delete actions (with backend running)
- Use the login area to set the admin key (if backend requires auth)

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
