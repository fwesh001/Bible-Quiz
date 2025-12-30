// Bible Quiz Game Logic

// ========================
// Utilities
// ========================
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function mulberry32(seed) {
  return function() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededPick(arr, count, seed) {
  const rng = mulberry32(seed);
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, Math.min(count, a.length));
}

// Shuffle with optional RNG (for deterministic daily mode)
function shuffleWithRng(arr, rng) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const r = rng ? rng() : Math.random();
    const j = Math.floor(r * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// For each question, shuffle options and update the correct index to match the new order
function randomizeOptionsForQuestions(questions, seed) {
  return questions.map((q, idx) => {
    const opts = q.options.slice();
    const correctText = opts[q.correct];
    const rng = (typeof seed === 'number') ? mulberry32(seed + idx) : null;
    const shuffled = shuffleWithRng(opts, rng);
    const newCorrect = Math.max(0, shuffled.indexOf(correctText));
    return { ...q, options: shuffled, correct: newCorrect };
  });
}

// ========================
// Audio (WebAudio beeps)
// ========================
let audioCtx;
function initAudio() { if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }

function playTone(freq, durationMs, type = 'sine', volume = 0.04) {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.value = volume;
  osc.connect(gain).connect(audioCtx.destination);
  osc.start();
  setTimeout(() => { osc.stop(); }, durationMs);
}
function playCorrect() {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(440, now);
  osc.frequency.linearRampToValueAtTime(660, now + 0.18);
  gain.gain.value = 0.06;
  osc.connect(gain).connect(audioCtx.destination);
  osc.start();
  osc.stop(now + 0.2);
}
function playWrong() { playTone(180, 180, 'sawtooth', 0.06); }

// ========================
// Game State
// ========================
const state = {
  questions: [],
  index: 0,
  score: 0,
  correctCount: 0,
  answered: 0,
  streak: 0,
  longestStreak: 0,
  bonuses3: 0,
  bonuses5: 0,
  missed: [],
  timerEnabled: false,
  timeLimit: 15,
  timeLeft: 15,
  timerId: null,
  accepting: true,
  mode: 'normal', // 'normal' | 'daily'
  category: 'All',
  difficulty: 'All'
};

// ========================
// Local Storage
// ========================
const STORAGE_KEYS = {
  HIGH: 'bibleQuizHighScore',
  ACH: 'bibleQuizAchievements'
};

function loadHigh() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.HIGH)) || { bestScore: 0, bestAccuracy: 0, bestStreak: 0 }; }
  catch { return { bestScore: 0, bestAccuracy: 0, bestStreak: 0 }; }
}
function saveHigh(obj) { localStorage.setItem(STORAGE_KEYS.HIGH, JSON.stringify(obj)); }

function loadAch() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.ACH)) || {}; }
  catch { return {}; }
}
function saveAch(obj) { localStorage.setItem(STORAGE_KEYS.ACH, JSON.stringify(obj)); }

// ========================
// DOM Refs
// ========================
const screens = {
  welcome: $('#screen-welcome'),
  quiz: $('#screen-quiz'),
  results: $('#screen-results')
};
const els = {
  category: $('#category'),
  difficulty: $('#difficulty'),
  numQuestions: $('#num-questions'),
  enableTimer: $('#enable-timer'),
  start: $('#btn-start'),
  daily: $('#btn-daily'),
  skip: $('#btn-skip'),
  timer: $('#timer'),
  timerFill: $('#timer-fill'),
  qText: $('#question-text'),
  opts: [$('#opt-0'), $('#opt-1'), $('#opt-2'), $('#opt-3')],
  feedback: $('#feedback'),
  ref: $('#ref'),
  fact: $('#fact'),
  progress: $('#progress-text'),
  finalScore: $('#final-score'),
  finalAccuracy: $('#final-accuracy'),
  finalLongest: $('#final-longest'),
  finalBonuses: $('#final-bonuses'),
  encouragement: $('#encouragement'),
  restart: $('#btn-restart'),
  home: $('#btn-home'),
  bestScore: $('#best-score'), 
  bestAcc: $('#best-accuracy'),
  bestStreak: $('#longest-streak-best'),
  achievementsBox: $('#achievements'),
  missedList: $('#missed-list'),
  navList: $('#nav-list'),
  modalSubmit: $('#modal-submit'),
  modalSubmitConfirm: $('#btn-confirm-submit'),
  modalSubmitCancel: $('#btn-cancel-submit'),
  roundTimerBar: document.getElementById('round-timer-bar'),
  roundTimerBarFill: document.getElementById('round-timer-bar-fill'),
  roundTimerLabel: document.getElementById('round-timer-label'),
  questionTimerBarOuter: document.getElementById('question-timer-bar-outer'),
  questionTimerBarFill: document.getElementById('question-timer-bar-fill'),
  questionTimerBarLabel: document.getElementById('question-timer-bar-label'),
  roundTimeInput: document.getElementById('round-time'),
  questionTimeInput: document.getElementById('question-time'),
  questionReviewList: document.getElementById('question-review-list')
};

  // Ensure `bibleQuestions` exists (may be defined in questions.js). If not, initialize empty.
  if (typeof bibleQuestions === 'undefined') {
    bibleQuestions = [];
  }

  // Go get the approved questions from the kitchen
  fetch('http://127.0.0.1:5000/questions/live')
    .then(res => res.json())
    .then(data => {
      bibleQuestions = data; 
      console.log("Quiz Loaded with", bibleQuestions.length, "questions!");
      // Now you can call your function to start the quiz
    })
    .catch(err => {
      console.error('Failed to load live questions:', err);
    });

// ========================
// Screen Navigation
// ========================
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

// ========================
// Game Setup & Flow (with round & question timers)
// ========================
let roundTimer = null;
let roundTimeTotal = 180; // default, will be set from input
let roundTimeLeft = 180;
let questionTimer = null;
let questionTimeTotal = 20; // default, will be set from input
let questionTimeLeft = 20;

function startQuiz(mode = 'normal') {
  initAudio();
  state.mode = mode;
  state.category = els.category.value;
  state.difficulty = els.difficulty ? els.difficulty.value : 'All';
  // Use state.timerEnabled instead of els.enableTimer
  state.timerEnabled = typeof state.timerEnabled === 'boolean' ? state.timerEnabled : true;
  state.timeLeft = state.timeLimit;
  state.index = 0;
  state.score = 0;
  state.correctCount = 0;
  state.answered = 0;
  state.streak = 0;
  state.longestStreak = 0;
  state.bonuses3 = 0;
  state.bonuses5 = 0;
  state.missed = [];
  state.accepting = true;

  // Set round and per-question timer from user input
  // Get round time from input (in minutes), default 3
  let roundTimeMinutes = 3;
  if (els.roundTimeInput && els.roundTimeInput.value) {
    roundTimeMinutes = Math.max(1, Math.min(30, parseInt(els.roundTimeInput.value, 10) || 3));
  }
  roundTimeTotal = roundTimeMinutes * 60;
  roundTimeLeft = roundTimeTotal;
  questionTimeTotal = parseInt(els.questionTimeInput?.value, 10) || 20;
  questionTimeLeft = questionTimeTotal;
  clearInterval(roundTimer);
  clearInterval(questionTimer);

  let pool = bibleQuestions;
  if (state.mode === 'normal' && state.category !== 'All') {
    const sel = (state.category || '').toLowerCase();
    pool = pool.filter(q => ((q.category || '').toLowerCase() === sel));
  }
  // Apply difficulty filter: default questions without a difficulty are treated as NORMAL
  if (state.mode === 'normal') {
    const diffSel = (state.difficulty || 'All').toLowerCase();
    if (diffSel !== 'all') {
      pool = pool.filter(q => (String(q.difficulty || 'NORMAL').toLowerCase() === diffSel));
    }
  }
  // Fallback if no questions match
  if (state.mode === 'normal' && pool.length === 0) {
    alert('No questions match the selected Category and Difficulty. Showing all difficulties instead.');
    state.difficulty = 'All';
    if (els.difficulty) els.difficulty.value = 'All';
    pool = bibleQuestions;
    if (state.category !== 'All') {
      const sel = (state.category || '').toLowerCase();
      pool = pool.filter(q => ((q.category || '').toLowerCase() === sel));
    }
  }

  if (state.mode === 'daily') {
    const today = new Date();
    const seed = parseInt(`${today.getFullYear()}${(today.getMonth()+1).toString().padStart(2,'0')}${today.getDate().toString().padStart(2,'0')}`);
    // Pick questions deterministically and also shuffle options deterministically
    const picked = seededPick(bibleQuestions, 5, seed);
    state.questions = randomizeOptionsForQuestions(picked, seed);
  } else {
    // Determine requested number of questions (default 10, max 50)
    let requested = 10;
    if (els.numQuestions && typeof els.numQuestions.value !== 'undefined') {
      const n = parseInt(els.numQuestions.value, 10);
      if (!isNaN(n)) requested = n;
    }
    requested = Math.max(1, Math.min(100, requested));
    const count = Math.min(requested, pool.length);
    // Shuffle question order randomly, then randomize options randomly
    const picked = shuffle(pool).slice(0, count);
    state.questions = randomizeOptionsForQuestions(picked);
  }

  showScreen('quiz');
  buildNavigator();
  renderQuestion();
  updateTimerUI();
  startRoundTimer();
}

function startRoundTimer() {
  // Reset round timer bar
  updateRoundTimerBar();
  clearInterval(roundTimer);
  roundTimer = setInterval(() => {
    roundTimeLeft -= 0.2;
    if (roundTimeLeft < 0) roundTimeLeft = 0;
    updateRoundTimerBar();
    if (roundTimeLeft <= 0) {
      clearInterval(roundTimer);
      clearInterval(questionTimer);
      endRoundDueToTimeout();
    }
  }, 200);
}

function updateRoundTimerBar() {
  if (!els.roundTimerBarFill || !els.roundTimerLabel) return;
  const pct = Math.max(0, (roundTimeLeft / roundTimeTotal));
  els.roundTimerBarFill.style.width = (pct * 100) + '%';
  els.roundTimerBarFill.style.transform = 'scaleX(' + pct + ')';
  // Color gradient: green > yellow > red
  let bg = 'linear-gradient(90deg, #22c55e 0%, #facc15 60%, #ef4444 100%)';
  if (pct <= 0.2) bg = 'linear-gradient(90deg, #ef4444 0%, #ef4444 100%)';
  else if (pct <= 0.4) bg = 'linear-gradient(90deg, #facc15 0%, #ef4444 100%)';
  els.roundTimerBarFill.style.background = bg;
  // Update label
  const min = Math.floor(roundTimeLeft / 60);
  const sec = Math.floor(roundTimeLeft % 60);
  els.roundTimerLabel.textContent = `${min}:${sec.toString().padStart(2, '0')}`;
}

// No dynamic question time, use user input
function getDynamicQuestionTime() {
  return questionTimeTotal;
}

function buildNavigator() {
  if (!els.navList) return;
  els.navList.innerHTML = '';
  state.questions.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.className = 'nav-item';
    btn.type = 'button';
    btn.textContent = String(i + 1);
    btn.dataset.index = String(i);
    btn.addEventListener('click', () => {
      if (!state.accepting) return;
      stopTimer();
      state.streak = 0; // jumping breaks streak
      state.index = i;
      renderQuestion();
    });
    els.navList.appendChild(btn);
  });
  updateNavigator();
}

function updateNavigator() {
  if (!els.navList) return;
  const items = Array.from(els.navList.querySelectorAll('.nav-item'));
  items.forEach((el, i) => {
    el.classList.remove('current');
    el.classList.toggle('current', i === state.index);
  });
}

function markNav(i, status) {
  if (!els.navList) return;
  const item = els.navList.querySelector(`.nav-item[data-index="${i}"]`);
  if (!item) return;
  item.classList.remove('correct', 'wrong', 'skipped');
  if (status) item.classList.add(status);
}

function renderQuestion() {
  const q = state.questions[state.index];
  els.qText.textContent = q.question;
  els.opts.forEach((btn, i) => {
    btn.classList.remove('correct', 'wrong', 'disabled');
    btn.querySelector('.opt-text').textContent = q.options[i];
    btn.disabled = false;
  });
  els.feedback.classList.remove('show');
  els.ref.textContent = '';
  els.fact.textContent = '';
  if (els.ref) els.ref.classList.remove('show');
  if (els.fact) els.fact.classList.remove('show');

  els.progress.textContent = `Question ${state.index + 1} of ${state.questions.length}`;
  updateNavigator();

  // Per-question timer logic (circular)
  if (state.timerEnabled) {
    startQuestionTimerCircle();
  } else {
    stopQuestionTimer();
    if (els.questionTimerArc) {
      els.questionTimerArc.setAttribute('stroke-dashoffset', '0');
      els.questionTimerArc.setAttribute('stroke', '#22c55e');
    }
    if (els.questionTimerLabel) {
      els.questionTimerLabel.textContent = questionTimeTotal;
    }
  }

  state.accepting = true;
}


// Per-question timer (circular)
function startQuestionTimerCircle() {
  stopQuestionTimer();
  questionTimeLeft = questionTimeTotal;
  updateQuestionTimerCircle();
  questionTimer = setInterval(() => {
    questionTimeLeft -= 0.2;
    if (questionTimeLeft < 0) questionTimeLeft = 0;
    updateQuestionTimerCircle();
    if (questionTimeLeft <= 0) {
      stopQuestionTimer();
      handleAnswerTimeout();
    }
  }, 150);
}

function updateQuestionTimerCircle() {
  if (!els.questionTimerArc || !els.questionTimerLabel) return;
  const pct = Math.max(0, questionTimeLeft / questionTimeTotal);
  // SVG circle: circumference = 2 * PI * r = 2*PI*20 = ~125.66
  const CIRC = 125.66;
  els.questionTimerArc.setAttribute('stroke-dasharray', CIRC);
  // Animate clockwise: pct=1 is full, pct=0 is empty (clockwise)
  els.questionTimerArc.setAttribute('stroke-dashoffset', (CIRC * (1 - pct)).toFixed(2));
  // Color: green > yellow > red
  let color = '#22c55e';
  if (pct <= 0.2) color = '#ef4444';
  else if (pct <= 0.4) color = '#facc15';
  els.questionTimerArc.setAttribute('stroke', color);
  els.questionTimerLabel.textContent = Math.ceil(questionTimeLeft);
}

function startQuestionTimer() {
  stopQuestionTimer();
  questionTimeTotal = getDynamicQuestionTime();
  questionTimeLeft = questionTimeTotal;
  updateQuestionTimerCircle();
  questionTimer = setInterval(() => {
    questionTimeLeft -= 0.2;
    if (questionTimeLeft < 0) questionTimeLeft = 0;
    updateQuestionTimerCircle();
    if (questionTimeLeft <= 0) {
      stopQuestionTimer();
      handleAnswerTimeout();
    }
  }, 200);
}

function stopQuestionTimer() {
  if (questionTimer) {
    clearInterval(questionTimer);
    questionTimer = null;
  }
}

function updateQuestionTimerCircle() {
  if (!els.questionTimerArc || !els.questionTimerLabel) {
    console.log('Timer arc or label not found', els.questionTimerArc, els.questionTimerLabel);
    return;
  }
  const pct = Math.max(0, questionTimeLeft / questionTimeTotal);
  // SVG circle: circumference = 2 * PI * r = 2*PI*20 = ~125.66
  const CIRC = 125.66;
  els.questionTimerArc.setAttribute('stroke-dasharray', CIRC);
  els.questionTimerArc.setAttribute('stroke-dashoffset', (CIRC * (1 - pct)).toFixed(2));
  // Color: green > yellow > red
  let color = '#22c55e';
  if (pct <= 0.2) color = '#ef4444';
  else if (pct <= 0.4) color = '#facc15';
  els.questionTimerArc.setAttribute('stroke', color);
  // Set SVG <text> value
  console.log('Timer update:', {questionTimeLeft, pct, label: els.questionTimerLabel});
  if (typeof els.questionTimerLabel.textContent !== 'undefined') {
    els.questionTimerLabel.textContent = Math.ceil(questionTimeLeft);
    console.log('Set timer label to', Math.ceil(questionTimeLeft));
  } else {
    console.log('SVG text element not found or not settable');
  }
}

function endRoundDueToTimeout() {
  // End the round immediately if round timer expires
  stopQuestionTimer();
  stopRoundTimer();
  showResults();
}

function stopRoundTimer() {
  if (roundTimer) {
    clearInterval(roundTimer);
    roundTimer = null;
  }
}

// (Legacy timer functions kept for fallback, but not used)
function startTimer() {}
function stopTimer() {}

function handleAnswerTimeout() {
  if (!state.accepting) return;
  state.accepting = false;
  showAnswer(null); // treat as wrong
}

function showAnswer(chosenIndex) {
  stopQuestionTimer();
  const q = state.questions[state.index];
  const correctIdx = q.correct;

  // Record user's answer for review (null for skipped)
  q.userAnswer = chosenIndex;

  els.opts.forEach((btn, i) => {
    btn.classList.add('disabled');
    if (i === correctIdx) btn.classList.add('correct');
  });

  if (chosenIndex !== null && chosenIndex !== correctIdx) {
    els.opts[chosenIndex].classList.add('wrong');
  }
  // mark navigator status for this question
  if (chosenIndex === correctIdx) {
    markNav(state.index, 'correct');
  } else if (chosenIndex === null) {
    markNav(state.index, 'skipped');
  } else {
    markNav(state.index, 'wrong');
  }

  // Score & streaks
  state.answered++;
  if (chosenIndex === correctIdx) {
    state.correctCount++;
    state.score += 1; // base
    state.streak++;
    if (state.streak === 3) { state.score += 1; state.bonuses3++; }
    if (state.streak === 5) { state.score += 2; state.bonuses5++; }
    state.longestStreak = Math.max(state.longestStreak, state.streak);
    playCorrect();
  } else {
    state.streak = 0;
    playWrong();
  }

  // Show inline fact and reference under the question
  els.ref.textContent = q.reference;
  if (els.ref) els.ref.classList.add('show');
  els.fact.textContent = q.fact;
  if (els.fact) els.fact.classList.add('show');

  // Next question after delay
  setTimeout(() => {
    nextQuestion();
  }, 3000);
}

function nextQuestion() {
  state.index++;
  if (state.index >= state.questions.length) {
    stopQuestionTimer();
    stopRoundTimer();
    showResults();
    return;
  }
  renderQuestion();
}

function showResults() {
  const accuracy = state.answered ? Math.round((state.correctCount / state.answered) * 100) : 0;
  els.finalScore.textContent = state.score;
  els.finalAccuracy.textContent = accuracy + '%';
  els.finalLongest.textContent = state.longestStreak;
  els.finalBonuses.textContent = state.bonuses3 + state.bonuses5;

  const msg = encouragementFor(accuracy);
  els.encouragement.textContent = msg.text;
  els.encouragement.title = msg.ref;

  // Save highs
  const high = loadHigh();
  const newHigh = {
    bestScore: Math.max(high.bestScore || 0, state.score),
    bestAccuracy: Math.max(high.bestAccuracy || 0, accuracy),
    bestStreak: Math.max(high.bestStreak || 0, state.longestStreak)
  };
  saveHigh(newHigh);

  // Achievements
  const earned = evaluateAchievements(accuracy);
  renderAchievements(earned);


  // Full question review list
  if (els.questionReviewList) {
    els.questionReviewList.innerHTML = '';
    state.questions.forEach((q, idx) => {
      // Determine user's answer
      let userAnswer = null;
      let wasCorrect = false;
      let wasSkipped = false;
      if (q.userAnswer !== undefined && q.userAnswer !== null) {
        userAnswer = q.options[q.userAnswer];
        wasCorrect = q.userAnswer === q.correct;
        wasSkipped = false;
      } else {
        userAnswer = '<i>Skipped</i>';
        wasSkipped = true;
      }
      // Correct: green, wrong/skipped: red
      const item = document.createElement('div');
      item.className = 'question-review-item ' + (wasCorrect ? 'correct' : 'wrong');
      item.innerHTML = `
        <div class="question-review-q">Q${idx+1}: ${q.question}</div>
        <div class="question-review-category">Category: ${q.category || 'N/A'}</div>
        <div class="question-review-user">Your answer: <span class="${wasCorrect ? 'question-review-correct' : 'question-review-wrong'}">${userAnswer}</span></div>
        <div>Correct answer: <span class="question-review-correct">${q.options[q.correct]}</span></div>
        <div class="question-review-fact">Fact: ${q.fact || ''}</div>
        <div class="question-review-ref">Reference: ${q.reference || ''}</div>
      `;
      els.questionReviewList.appendChild(item);
    });
  }

  // Full question review list
  if (els.questionReviewList) {
    els.questionReviewList.innerHTML = '';
    state.questions.forEach((q, idx) => {
      // Determine user's answer
      let userAnswer = null;
      let wasCorrect = false;
      if (q.userAnswer !== undefined && q.userAnswer !== null) {
        userAnswer = q.options[q.userAnswer];
        wasCorrect = q.userAnswer === q.correct;
      }
      // If missed, highlight red; if correct, green
      const item = document.createElement('div');
      item.className = 'question-review-item ' + (wasCorrect ? 'correct' : 'wrong');
      item.innerHTML = `
        <div class="question-review-q">Q${idx+1}: ${q.question}</div>
        <div class="question-review-category">Category: ${q.category || 'N/A'}</div>
        <div class="question-review-user">Your answer: <span class="${wasCorrect ? 'question-review-correct' : 'question-review-wrong'}">${userAnswer !== null ? userAnswer : '<i>Skipped</i>'}</span></div>
        <div>Correct answer: <span class="question-review-correct">${q.options[q.correct]}</span></div>
        <div class="question-review-fact">Fact: ${q.fact || ''}</div>
        <div class="question-review-ref">Reference: ${q.reference || ''}</div>
      `;
      els.questionReviewList.appendChild(item);
    });
  }

  // Update welcome stats now (so returning home shows latest)
  updateWelcomeStats();

  showScreen('results');
}

function encouragementFor(accuracy) {
  if (accuracy >= 85) return { text: '“.”', ref: '.' };
  if (accuracy >= 60) return { text: '“.”', ref: '.' };
  return { text: '“.”', ref: '.' };
}

function evaluateAchievements(accuracy) {
  const ach = loadAch();
  const earned = [];

  function gain(key, title, desc) {
    const was = !!ach[key];
    if (!was) ach[key] = true;
    earned.push({ key, title, desc, earned: true });
  }
  function present(key, title, desc) {
    earned.push({ key, title, desc, earned: !!ach[key] });
  }

  // Always present these, mark earned if satisfied
  if (state.longestStreak >= 10) gain('Bible student', 'Bible Student', '10 correct answers in a row');
  else present('Bible student', 'Bible Student', '10 correct answers in a row');


  // Category mastery (earned when 80%+ in that category quiz of at least 8 Qs)
  const enoughQs = state.questions.length >= 8;
  const sel = (state.category || '').toLowerCase();
  const inOT = sel === 'old testament' || (state.mode === 'daily' && state.questions.every(q => (q.category || '').toLowerCase() === 'old testament'));
  const inNT = sel === 'new testament' || (state.mode === 'daily' && state.questions.every(q => (q.category || '').toLowerCase() === 'new testament'));

  if (enoughQs && inOT && accuracy >= 80) gain('ot_expert', 'Hebrew Scripture Expert', 'Score 80%+ on OT quiz (8+ questions)');
  else present('ot_expert', 'Hebrew Scripture Expert', 'Score 80%+ on OT quiz (8+ questions)');

  if (enoughQs && inNT && accuracy >= 80) gain('nt_expert', 'Greek scripture Expert', 'Score 80%+ on NT quiz (8+ questions)');
  else present('nt_expert', 'Greek scripture Expert', 'Score 80%+ on NT quiz (8+ questions)');

  // Daily Challenger (complete a daily challenge)
  if (state.mode === 'daily') gain('daily_challenger', 'Daily Challenger', 'Complete a Daily Challenge');
  else present('daily_challenger', 'Daily Challenger', 'Complete a Daily Challenge');

  saveAch(ach);
  return earned;
}

function renderAchievements(items) {
  els.achievementsBox.innerHTML = '';
  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'achievement';
    div.innerHTML = `
      <span class="status ${item.earned ? 'earned' : 'locked'}"></span>
      <div>
        <div style="font-weight:700;">${item.title}</div>
        <div class="subtitle" style="margin:0">${item.desc}</div>
      </div>
      <div style="color:${item.earned ? '#22c55e' : '#9ca3af'}; font-weight:700;">${item.earned ? 'Earned' : 'Locked'}</div>
    `;
    els.achievementsBox.appendChild(div);
  });
}

function updateWelcomeStats() {
  const high = loadHigh();
  els.bestScore.textContent = high.bestScore || 0;
  els.bestAcc.textContent = ((high.bestAccuracy || 0) + '%');
  els.bestStreak.textContent = high.bestStreak || 0;
}

// updateTimerUI is now a no-op, as timer updates are handled by updateRoundTimerBar and updateQuestionTimerCircle
function updateTimerUI() {}

function showSubmitModal(show) {
  if (!els.modalSubmit) return;
  if (show) {
    els.modalSubmit.classList.add('show');
    els.modalSubmit.setAttribute('aria-hidden', 'false');
    if (els.modalSubmitConfirm) els.modalSubmitConfirm.focus();
  } else {
    els.modalSubmit.classList.remove('show');
    els.modalSubmit.setAttribute('aria-hidden', 'true');
  }
}

// ========================
// Event Listeners
// ========================
els.start.addEventListener('click', () => startQuiz('normal'));
els.daily.addEventListener('click', () => startQuiz('daily'));

// Skip current question (does not affect score or accuracy; breaks streak)
els.skip.addEventListener('click', () => {
  if (!state.accepting) return;
  state.accepting = false;
  stopTimer();
  const isLast = state.index === state.questions.length - 1;
  // On last question, prompt to submit
  if (isLast) {
    markNav(state.index, 'skipped');
    showSubmitModal(true);
  } else {
    state.streak = 0; // break streak on skip
    markNav(state.index, 'skipped');
    nextQuestion();
  }
});

els.opts.forEach(btn => {
  btn.addEventListener('click', () => {
    if (!state.accepting) return;
    state.accepting = false;
    stopTimer();
    const idx = parseInt(btn.dataset.index, 10);
    showAnswer(idx);
  });
});

els.restart.addEventListener('click', () => startQuiz(state.mode));
els.home.addEventListener('click', () => { stopTimer(); showScreen('welcome'); });

// Modal events
if (els.modalSubmitCancel) {
  els.modalSubmitCancel.addEventListener('click', () => {
    showSubmitModal(false);
    // allow user to continue; keep accepting true and timer off until user chooses
    state.accepting = true;
  });
}
if (els.modalSubmitConfirm) {
  els.modalSubmitConfirm.addEventListener('click', () => {
    showSubmitModal(false);
    // finalize quiz without incrementing answered for skipped modal case
    // We'll intentionally not count this last question as answered.
    showResults();
  });
}


const sidebar = document.getElementById('sidebar');
const sidebarToggleBtn = document.getElementById('sidebar-toggle');
const toggleMuteBtn = document.getElementById('toggle-mute-btn');
const toggleDarkmodeBtn = document.getElementById('toggle-darkmode');

let isMuted = false;
let isDark = false;

// Helper to globally mute/unmute audio
function setMute(mute) {
  isMuted = mute;
  if (window.audioCtx) {
    try {
      if (isMuted) {
        window.audioCtx.suspend();
      } else {
        window.audioCtx.resume();
      }
    } catch (e) {
      console.error('Audio mute error:', e);
    }
  }
}

// Patch playCorrect and playWrong to respect mute
const origPlayCorrect = playCorrect;
const origPlayWrong = playWrong;
playCorrect = function() { if (!isMuted) origPlayCorrect(); };
playWrong = function() { if (!isMuted) origPlayWrong(); };

// Open/close sidebar
sidebarToggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
  if (!sidebar.contains(e.target) && !sidebarToggleBtn.contains(e.target)) {
    sidebar.classList.remove('active');
  }
});

// ===== Mute toggle =====
toggleMuteBtn.addEventListener('click', () => {
  try {
    setMute(!isMuted);
    toggleMuteBtn.textContent = isMuted ? '🔊 Unmute' : '🔇 Mute';
    console.log('Mute toggled:', isMuted);
  } catch (e) {
    console.error('Mute toggle error:', e);
  }
});

// ===== Dark mode toggle =====
toggleDarkmodeBtn.addEventListener('click', () => {
  try {
    isDark = !isDark;
    document.body.classList.toggle('dark-mode', isDark);
    toggleDarkmodeBtn.textContent = isDark ? '🔆 Light Mode' : '🌙 Dark Mode';
    console.log('Dark mode toggled:', isDark);
  } catch (e) {
    console.error('Dark mode toggle error:', e);
  }
});

// Timer toggle button logic
const timerBtn = document.getElementById('enable-timer-btn');
if (timerBtn) {
  // Use els.enableTimerBtn for compatibility with game logic
  els.enableTimerBtn = timerBtn;
  // Default ON
  state.timerEnabled = true;
  timerBtn.textContent = state.timerEnabled ? 'Timer: ON' : 'Timer: OFF';
  timerBtn.classList.toggle('active', state.timerEnabled);
  timerBtn.addEventListener('click', () => {
    state.timerEnabled = !state.timerEnabled;
    timerBtn.textContent = state.timerEnabled ? 'Timer: ON' : 'Timer: OFF';
    timerBtn.classList.toggle('active', state.timerEnabled);
  });
}

// ========================
// Add question logic
// ========================

// 1. Show the form when the "Add Question" button is clicked
const questionModal = document.getElementById('questionModal');
function closeQuestionModal() {
  if (!questionModal) return;
  questionModal.classList.remove('show');
  questionModal.style.display = 'none';
  // clear fields
  try {
    const ids = ['qText','qOptionA','qOptionB','qOptionC','qOptionD','qReference','qFact'];
    ids.forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
    const sel = document.getElementById('qCorrect'); if (sel) sel.value = '0';
    const cat = document.getElementById('qCategory'); if (cat) cat.value = 'All';
  } catch (e) { /* ignore */ }
}

document.getElementById('addQuestionBtn').addEventListener('click', () => {
    if (!questionModal) return;
    questionModal.style.display = 'block';
    // trigger animated 'show' class
    requestAnimationFrame(() => questionModal.classList.add('show'));
});

// 2. Handle the actual submission
document.getElementById('submitToBackend').addEventListener('click', () => {
    // Grab the values from the input boxes
    const questionData = {
      question: document.getElementById('qText').value,
      options: [
        document.getElementById('qOptionA').value,
        document.getElementById('qOptionB').value,
        document.getElementById('qOptionC').value,
        document.getElementById('qOptionD').value
      ],
      correct: parseInt(document.getElementById('qCorrect')?.value || '0', 10),
      category: document.getElementById('qCategory')?.value || 'All',
      reference: document.getElementById('qReference')?.value || '',
      fact: document.getElementById('qFact')?.value || '',
      status: 'PENDING'
    };

    // Send it to the Python Kitchen!
    fetch('http://127.0.0.1:5000/add-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(questionData)
    })
    .then(res => res.json())
    .then(data => {
      alert("Server says: " + data.message);
      // clear and close
      closeQuestionModal();
    })
    .catch(err => console.error("Error connecting to Python:", err));
});

// Defensive handler: intercept any mailto link that targets the add-question email
// and force the in-app modal to open instead of allowing the mail client to launch.
document.addEventListener('click', (e) => {
  try {
    const anchor = e.target.closest && e.target.closest('a[href^="mailto:"]');
    if (!anchor) return;
    const href = anchor.getAttribute('href') || '';
      if (href.startsWith('mailto:zabdielfwesh001@gmail.com')) {
      e.preventDefault();
      const modal = document.getElementById('questionModal');
      if (modal) {
        modal.style.display = 'block';
        requestAnimationFrame(() => modal.classList.add('show'));
        const first = modal.querySelector('input, textarea, button');
        if (first && typeof first.focus === 'function') first.focus();
      }
    }
  } catch (err) {
    console.error('Error intercepting mailto click', err);
  }
});

// ========================
// Admin unlock: 5-click secret -> password modal -> redirect to admin.html
// ========================

const adminLoginBtn = document.getElementById('adminLoginBtn');
// ========================
// Admin login modal: open on single click -> password modal -> redirect to admin.html

const adminLoginModal = document.getElementById('adminLoginModal');
const adminPasswordInput = document.getElementById('adminPasswordInput');
const adminSubmitBtn = document.getElementById('adminSubmitBtn');
const adminCancelBtn = document.getElementById('adminCancelBtn');

function showAdminLogin(show) {
  if (!adminLoginModal) return;
  if (show) {
    adminLoginModal.style.display = 'block';
    adminLoginModal.classList.add('show');
    adminLoginModal.setAttribute('aria-hidden', 'false');
    if (adminPasswordInput) adminPasswordInput.focus();
  } else {
    adminLoginModal.style.display = 'none';
    adminLoginModal.classList.remove('show');
    adminLoginModal.setAttribute('aria-hidden', 'true');
    if (adminPasswordInput) adminPasswordInput.value = '';
  }
}

let adminClickCount = 0;
let adminClickTimer = null;
function resetAdminClicks() {
  adminClickCount = 0;
  if (adminClickTimer) { clearTimeout(adminClickTimer); adminClickTimer = null; }
}

if (adminLoginBtn) {
  adminLoginBtn.addEventListener('click', () => {
    adminClickCount++;
    if (adminClickTimer) clearTimeout(adminClickTimer);
    // reset click count after 10s of inactivity
    adminClickTimer = setTimeout(resetAdminClicks, 10000);
    if (adminClickCount >= 2) {
      resetAdminClicks();
      // Open the admin login modal and close the sidebar
      showAdminLogin(true);
      if (sidebar) sidebar.classList.remove('active');
    }
  });
}

if (adminCancelBtn) adminCancelBtn.addEventListener('click', () => showAdminLogin(false));

if (adminSubmitBtn) adminSubmitBtn.addEventListener('click', () => {
  const pwd = adminPasswordInput ? adminPasswordInput.value : '';
  if (!pwd) return alert('Enter password');

  fetch('http://127.0.0.1:5000/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: pwd })
  })
  .then(res => {
    if (!res.ok) throw new Error('Invalid Password');
    return res.json();
  })
  .then(data => {
    // SAVE the key and password for the next page to use
    sessionStorage.setItem('adminKey', data.admin_key); 
    window.location.href = 'admin.html';
  })
  .catch(err => alert(err.message));
});