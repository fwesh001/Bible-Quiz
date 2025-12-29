# 📜 Bible Quiz

A lightweight, browser-based quiz game to test and learn knowledge of the Scriptures.

---

## 🔧 Features

- Multiple-choice Bible questions with references and short facts
- Category filter: Old Testament (Hebrew) / New Testament (Greek) / All
- Difficulty filter (Normal / Hard / All)
- Round timer and per-question timer (configurable)
- Daily Challenge (deterministic 5-question set)
- Local high score & achievements saved to `localStorage`
- Dark Mode and mute controls
- Question review and simple navigation

---

## 🚀 Quick Start

1. Clone or download the project files.
2. Open `index.html` in any modern browser (no build step required).

Tip: To serve over HTTP for better compatibility with some browsers, run a simple server such as `npx http-server` or `python -m http.server` in the project folder.

---

## ▶️ How to Use

- Select a **Category**, **Difficulty**, **Time Limit**, and **Number of Questions**.
- Click **Start Quiz** for a normal round or **Daily Challenge** for the 5-question deterministic set.
- During the quiz you can skip questions, see facts/references after answering, and view results at the end.
- Use the sidebar to toggle **Dark Mode** and **Mute**.

---

## ➕ Adding / Contributing Questions

Questions are stored in `questions.js` in the `bibleQuestions` array. Each question object uses this structure:

```js
{
  question: "Who built the ark of salvation?",
  options: ["Noah", "Moses", "Abraham", "David"],
  correct: 0,              // index of correct option (0=A, 1=B, ...)
  reference: "Genesis 6:14",
  fact: "Jehovah instructed Noah to build the ark...",
  category: "OLD TESTAMENT", // or "NEW TESTAMENT" or other
  difficulty: "NORMAL" // optional: "NORMAL" or "HARD"
}
```

- Ensure `options` contains up to 4 strings and `correct` references the correct option index.
- To contribute, you can either:
  - Edit `questions.js` and submit a pull request, or
  - Use the in-app "Add Question" link (opens an email pre-filled) to send questions to zabdielfwesh001@gmail.com.

---

## 🛠 Development Notes

- Core files:
  - `index.html` — UI and structure
  - `style.css` — styling (light/dark themes)
  - `questions.js` — question data
  - `script.js` — game logic
- No external build tools are required. The app runs statically in the browser.
- The daily challenge uses a deterministic seed based on the date to generate reproducible questions.

---

## 📬 Contact / Contribution

Send question submissions or feedback to: zabdielfwesh001@gmail.com

---
Made with care for learning Scripture. 🙏
