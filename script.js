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
  timerEnabled: false,
  timeLimit: 15,
  timeLeft: 15,
  timerId: null,
  accepting: true,
  mode: 'normal', // 'normal' | 'daily'
  category: 'All'
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
  enableTimer: $('#enable-timer'),
  start: $('#btn-start'),
  daily: $('#btn-daily'),
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
  achievementsBox: $('#achievements')
};

// ========================
// Screen Navigation
// ========================
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

// ========================
// Game Setup & Flow
// ========================
function startQuiz(mode = 'normal') {
  initAudio();
  state.mode = mode;
  state.category = els.category.value;
  state.timerEnabled = els.enableTimer.checked;
  state.timeLeft = state.timeLimit;
  state.index = 0;
  state.score = 0;
  state.correctCount = 0;
  state.answered = 0;
  state.streak = 0;
  state.longestStreak = 0;
  state.bonuses3 = 0;
  state.bonuses5 = 0;
  state.accepting = true;

  let pool = bibleQuestions;
  if (state.mode === 'normal' && state.category !== 'All') {
    const sel = (state.category || '').toLowerCase();
    pool = pool.filter(q => ((q.category || '').toLowerCase() === sel));
  }

  if (state.mode === 'daily') {
    const today = new Date();
    const seed = parseInt(`${today.getFullYear()}${(today.getMonth()+1).toString().padStart(2,'0')}${today.getDate().toString().padStart(2,'0')}`);
    state.questions = seededPick(bibleQuestions, 5, seed);
  } else {
    const count = Math.min(10, pool.length);
    state.questions = shuffle(pool).slice(0, count);
  }

  showScreen('quiz');
  renderQuestion();
  updateTimerUI();
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

  els.progress.textContent = `Question ${state.index + 1} of ${state.questions.length}`;

  if (state.timerEnabled) {
    startTimer();
    els.timer.setAttribute('aria-hidden', 'false');
  } else {
    stopTimer();
    els.timer.setAttribute('aria-hidden', 'true');
    els.timerFill.style.width = '100%';
  }

  state.accepting = true;
}

function startTimer() {
  stopTimer();
  state.timeLeft = state.timeLimit;
  els.timerFill.style.width = '100%';
  state.timerId = setInterval(() => {
    state.timeLeft -= 0.2;
    const pct = Math.max(0, (state.timeLeft / state.timeLimit) * 100);
    els.timerFill.style.width = pct + '%';
    if (state.timeLeft <= 0) {
      stopTimer();
      handleAnswerTimeout();
    }
  }, 200);
}

function stopTimer() {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
}

function handleAnswerTimeout() {
  if (!state.accepting) return;
  state.accepting = false;
  showAnswer(null); // treat as wrong
}

function showAnswer(chosenIndex) {
  const q = state.questions[state.index];
  const correctIdx = q.correct;

  els.opts.forEach((btn, i) => {
    btn.classList.add('disabled');
    if (i === correctIdx) btn.classList.add('correct');
  });

  if (chosenIndex !== null && chosenIndex !== correctIdx) {
    els.opts[chosenIndex].classList.add('wrong');
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

  // Feedback
  els.ref.textContent = q.reference;
  els.fact.textContent = q.fact;
  els.feedback.classList.add('show');

  // Next question after delay
  setTimeout(() => {
    nextQuestion();
  }, 1800);
}

function nextQuestion() {
  state.index++;
  if (state.index >= state.questions.length) {
    stopTimer();
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

  // Update welcome stats now (so returning home shows latest)
  updateWelcomeStats();

  showScreen('results');
}

function encouragementFor(accuracy) {
  if (accuracy >= 85) return { text: '“Well done, good and faithful servant”', ref: 'Matthew 25:21' };
  if (accuracy >= 60) return { text: '“Grow in the grace and knowledge of our Lord”', ref: '2 Peter 3:18' };
  return { text: '“I can do all things through Christ who strengthens me”', ref: 'Philippians 4:13' };
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
  if (state.longestStreak >= 10) gain('scripture_scholar', 'Scripture Scholar', '10 correct answers in a row');
  else present('scripture_scholar', 'Scripture Scholar', '10 correct answers in a row');

  if (state.correctCount === state.questions.length && state.questions.length > 0) gain('faithful_servant', 'Faithful Servant', 'Perfect score');
  else present('faithful_servant', 'Faithful Servant', 'Perfect score');

  // Category mastery (earned when 80%+ in that category quiz of at least 8 Qs)
  const enoughQs = state.questions.length >= 8;
  const sel = (state.category || '').toLowerCase();
  const inOT = sel === 'old testament' || (state.mode === 'daily' && state.questions.every(q => (q.category || '').toLowerCase() === 'old testament'));
  const inNT = sel === 'new testament' || (state.mode === 'daily' && state.questions.every(q => (q.category || '').toLowerCase() === 'new testament'));

  if (enoughQs && inOT && accuracy >= 80) gain('ot_expert', 'Old Testament Expert', 'Score 80%+ on OT quiz (8+ questions)');
  else present('ot_expert', 'Old Testament Expert', 'Score 80%+ on OT quiz (8+ questions)');

  if (enoughQs && inNT && accuracy >= 80) gain('nt_expert', 'New Testament Expert', 'Score 80%+ on NT quiz (8+ questions)');
  else present('nt_expert', 'New Testament Expert', 'Score 80%+ on NT quiz (8+ questions)');

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

function updateTimerUI() {
  if (state.timerEnabled) {
    $('#timer').style.display = '';
  } else {
    $('#timer').style.display = 'none';
  }
}

// ========================
// Event Listeners
// ========================
els.start.addEventListener('click', () => startQuiz('normal'));
els.daily.addEventListener('click', () => startQuiz('daily'));

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

// Init
updateWelcomeStats();
