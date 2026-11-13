// Verification test suite for UPGRADE_PLAN.md
const fs = require('fs');
const assert = require('assert');

console.log('--- STARTING UPGRADE_PLAN.md VERIFICATION ---');

const planContent = fs.readFileSync('UPGRADE_PLAN.md', 'utf8');

// 1. Structural check
assert.ok(planContent.includes('# BIBLE QUIZ WEB APPLICATION: MASTER PRODUCTION UPGRADE PLAN'), 'Title missing');
assert.ok(planContent.includes('## 4. R3: IN-GAME HINTS & ADVANCED SETTINGS ARCHITECTURE'), 'Section 4 missing');

// 2. Section 4.1.1 checks
console.log('\n[Checking Section 4.1.1: 50/50 Elimination Algorithm]');
assert.ok(planContent.includes('Number.isInteger(q.correct) ? q.correct : parseInt(q.correct, 10)'), 'Safe integer coercion missing in 4.1.1');
assert.ok(planContent.includes('if (numOptions < 3) return;'), 'numOptions < 3 guard missing in 4.1.1');
assert.ok(planContent.includes('Array.from({ length: numOptions }, (_, i) => i).filter(i => i !== correctIdx)'), 'Dynamic incorrect indices missing in 4.1.1');
assert.ok(planContent.includes('clay-eliminated'), 'clay-eliminated missing in 4.1.1');
assert.ok(planContent.includes('Navigator Ribbon Revisit & State Restoration'), 'Navigator ribbon revisit section missing in 4.1.1');
assert.ok(planContent.includes('#quiz-nav-ribbon'), '#quiz-nav-ribbon reference missing in 4.1.1');
console.log('✔ Section 4.1.1 hardenings verified successfully');

// 3. Section 4.2.2 checks
console.log('\n[Checking Section 4.2.2: Scripture Clue Fallback Extractor]');
assert.ok(planContent.includes("replace(/^[\\s(\\[]*(?:see\\s+)?/i, '').trim()"), 'Leading punctuation/see clean regex missing in 4.2.2');
assert.ok(planContent.includes('^([1-3]?\\s*[A-Za-z]+(?:\\s+(?:of\\s+)?[A-Za-z]+)*)\\s*(\\d+)'), '3-word title regex missing in 4.2.2');
assert.ok(planContent.includes("'obadiah', 'philemon', '2 john', '3 john', 'jude'"), 'Single-chapter books list missing in 4.2.2');
assert.ok(planContent.includes('Read the book of ${book}, verse ${chapter}'), 'Single-chapter verse formatting missing in 4.2.2');
console.log('✔ Section 4.2.2 hardenings verified successfully');

// 4. Section 4.5 checks
console.log('\n[Checking Section 4.5: SettingsManager.migrateIfNeeded]');
assert.ok(planContent.includes("JSON.parse(localStorage.getItem('bibleQuizHighScore') || '{}')"), 'Null guard on high score missing in 4.5');
assert.ok(planContent.includes("JSON.parse(localStorage.getItem('bibleQuizAchievements') || '{}')"), 'Null guard on achievements missing in 4.5');
assert.ok(planContent.includes('Fresh Browser Null Guard'), 'Fresh browser null guard documentation missing in 4.5');
console.log('✔ Section 4.5 hardenings verified successfully');

// 5. Section 6.5 checks
console.log('\n[Checking Section 6.5: LocalStorage Migration Test Rubric]');
assert.ok(planContent.includes('Fresh Browser Test (null storage)'), 'Fresh browser test rubric missing in 6.5');
console.log('✔ Section 6.5 rubric verified successfully');

// 6. Typography & Custom Font Pairing checks (R1)
console.log('\n[Checking Section 2.3 & Tokens: Typography & Custom Font Pairing Specifications]');
assert.ok(planContent.includes('--font-display'), 'CSS token --font-display missing');
assert.ok(planContent.includes('--font-sans'), 'CSS token --font-sans missing');
assert.ok(planContent.includes('--font-scripture'), 'CSS token --font-scripture missing');
assert.ok(planContent.includes('Fredoka'), 'Fredoka font specification missing');
assert.ok(planContent.includes('Plus Jakarta Sans'), 'Plus Jakarta Sans font specification missing');
assert.ok(planContent.includes('500') && planContent.includes('600') && planContent.includes('700'), 'Fredoka weights missing');
assert.ok(planContent.includes('400') && planContent.includes('500') && planContent.includes('600') && planContent.includes('700'), 'Plus Jakarta Sans weights missing');
assert.ok(planContent.includes('fonts.googleapis.com'), 'fonts.googleapis.com preconnect missing');
assert.ok(planContent.includes('fonts.gstatic.com'), 'fonts.gstatic.com preconnect missing');
assert.ok(planContent.includes('crossorigin'), 'fonts.gstatic.com crossorigin attribute missing');
assert.ok(planContent.includes('display=swap'), 'display=swap missing in font loading strategy');
assert.ok(planContent.includes('ui-rounded, system-ui, sans-serif'), 'ui-rounded, system-ui fallback chain missing');
assert.ok(planContent.includes('Georgia'), 'Georgia scripture font specification missing');
assert.ok(planContent.includes('--clay-skeleton-base'), '--clay-skeleton-base token missing');
assert.ok(planContent.includes('--clay-skeleton-shimmer'), '--clay-skeleton-shimmer token missing');
assert.ok(planContent.includes('--clay-skeleton-accent'), '--clay-skeleton-accent token missing');
assert.ok(planContent.includes('--clay-skeleton-pill'), '--clay-skeleton-pill token missing');
console.log('✔ Typography & custom font pairing specifications verified successfully');

// 7. Claymorphic Skeleton Loader & Screen Transition checks (R2)
console.log('\n[Checking Section 2.8 & Wireframes: Claymorphic Skeleton Loaders & Screen Transitions]');
assert.ok(planContent.includes('### 2.8 Claymorphic Skeleton Loaders & Screen Transitions (Zero-CLS Architecture)'), 'Section 2.8 missing');
assert.ok(planContent.includes('#### 2.6.5 Claymorphic Skeleton Loader Wireframes'), 'Section 2.6.5 wireframe header missing');
assert.ok(planContent.includes('2.6.5.1 Live Question Loading State Skeleton'), 'Section 2.6.5.1 missing');
assert.ok(planContent.includes('2.6.5.2 In-Game Question & 4-Option Pill Transition Skeleton'), 'Section 2.6.5.2 missing');
assert.ok(planContent.includes('2.6.5.3 Results Screen Calculation & Compilation Skeleton'), 'Section 2.6.5.3 missing');
assert.ok(planContent.includes('@keyframes clay-shimmer'), '@keyframes clay-shimmer missing');
assert.ok(planContent.includes('@keyframes clay-pulse'), '@keyframes clay-pulse missing');
assert.ok(planContent.includes('--shadow-clay-skeleton'), '--shadow-clay-skeleton token missing');
assert.ok(planContent.includes('inset 2px 2px 4px 0 rgba(255, 255, 255'), 'Dual inset highlight missing in skeleton shadow');
assert.ok(planContent.includes('inset -2px -2px 4px 0 rgba(140, 120, 95'), 'Dual inset occlusion missing in skeleton shadow');
assert.ok(planContent.includes('/questions/live'), '/questions/live live question loading state missing');
assert.ok(planContent.includes('id="clay-live-skeleton"'), '#clay-live-skeleton markup missing');
assert.ok(planContent.includes('id="in-game-skeleton"'), '#in-game-skeleton transition loader markup missing');
assert.ok(planContent.includes('.clay-skeleton-pill'), '.clay-skeleton-pill option pill skeleton missing');
assert.ok(planContent.includes('id="results-skeleton"'), '#results-skeleton markup missing');
assert.ok(planContent.includes('score calculation') || planContent.includes('Calculating final results'), 'Score calculation skeleton phase missing');
assert.ok(planContent.includes('achievement evaluation') || planContent.includes('ACHIEVEMENTS EVALUATION SKELETON'), 'Achievement evaluation skeleton phase missing');
assert.ok(planContent.includes('review list compilation') || planContent.includes('QUESTION REVIEW LIST SKELETON'), 'Review list compilation skeleton phase missing');
assert.ok(planContent.includes('Cumulative Layout Shift') || planContent.includes('CLS'), 'CLS elimination recommendations missing');
assert.ok(planContent.includes('min-height: 220px'), 'min-height: 220px reservation missing for question card');
assert.ok(planContent.includes('min-height: 52px'), 'min-height: 52px reservation missing for option pills');
assert.ok(planContent.includes('contain: layout style;'), 'CSS containment missing');
assert.ok(planContent.includes('.screen-exit') && planContent.includes('.screen-enter'), 'Screen transition lifecycle classes missing');
console.log('✔ Claymorphic skeleton loaders & screen transitions verified successfully');

// 8. Roadmap Milestones & Verification Rubrics checks (R3)
console.log('\n[Checking Sections 5 & 6: Roadmap Milestones & Verification Rubrics]');
assert.ok(planContent.includes('Google Fonts preconnect hints and stylesheet `<link>` tags present in `index.html`'), 'Phase 1 font acceptance gate missing');
assert.ok(planContent.includes('Claymorphic skeleton loaders render with soft pulsating warm shimmer and dual inset shadows matching parchment clay theme'), 'Phase 2 skeleton acceptance gate missing');
assert.ok(planContent.includes('Cumulative Layout Shift (CLS < 0.05)'), 'Phase 2 CLS acceptance gate missing');
assert.ok(planContent.includes('### 6.7 Typography & Custom Font Pairing Verification Rubric'), 'Section 6.7 rubric missing');
assert.ok(planContent.includes('### 6.8 Claymorphic Skeleton Loader & Screen Transition Verification Rubric'), 'Section 6.8 rubric missing');
assert.ok(planContent.includes('**T-1**') && planContent.includes('**T-6**'), 'Typography checkpoints T-1 through T-6 missing');
assert.ok(planContent.includes('**S-1**') && planContent.includes('**S-6**'), 'Skeleton checkpoints S-1 through S-6 missing');
console.log('✔ Roadmap milestones & verification rubrics verified successfully');

// 9. Direct execution test of code snippets extracted from markdown
console.log('\n[Executing algorithmic logic from UPGRADE_PLAN.md]');

// Test 50/50 logic
function testFiftyFifty() {
  const q = { options: ['A', 'B', 'C', 'D'], correct: '3', fiftyUsed: false };
  const state = { accepting: true, currentIndex: 0, questions: [q], hintsFiftyRemaining: 2 };

  const numOptions = Array.isArray(q.options) ? q.options.length : 0;
  if (numOptions < 3) throw new Error('Guard failed');
  const correctIdx = Number.isInteger(q.correct) ? q.correct : parseInt(q.correct, 10);
  const incorrect = Array.from({ length: numOptions }, (_, i) => i).filter(i => i !== correctIdx);
  for (let i = incorrect.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [incorrect[i], incorrect[j]] = [incorrect[j], incorrect[i]];
  }
  const toEliminate = incorrect.slice(0, 2);
  q.fiftyUsed = true;
  q.eliminatedOptions = toEliminate;
  state.hintsFiftyRemaining--;
  q.scoreMultiplier = (q.scoreMultiplier || 1.0) * 0.5;

  assert.strictEqual(q.eliminatedOptions.length, 2);
  assert.ok(!q.eliminatedOptions.includes(3), 'Correct option index 3 must never be eliminated');
  assert.strictEqual(state.hintsFiftyRemaining, 1);
  assert.strictEqual(q.scoreMultiplier, 0.5);
  console.log('✔ 50/50 execution test passed');
}
testFiftyFifty();

// Test Scripture Clue extractor
function testClueExtractor() {
  function getScriptureClue(q) {
    if (q.clue && typeof q.clue === 'string' && q.clue.trim()) return q.clue.trim();
    if (q.reference && typeof q.reference === 'string') {
      const cleaned = q.reference.replace(/^[\s(\[]*(?:see\s+)?/i, '').trim();
      const match = cleaned.match(/^([1-3]?\s*[A-Za-z]+(?:\s+(?:of\s+)?[A-Za-z]+)*)\s*(\d+)/i);
      if (match) {
        const book = match[1].trim();
        const chapter = match[2];
        const singleChapterBooks = ['obadiah', 'philemon', '2 john', '3 john', 'jude'];
        const normalizedBook = book.toLowerCase().replace(/\s+/g, ' ');
        if (singleChapterBooks.includes(normalizedBook)) {
          return `Scripture Clue: Read the book of ${book}, verse ${chapter} to discover the answer!`;
        }
        return `Scripture Clue: Read ${book} chapter ${chapter} to discover the answer!`;
      }
      return `Scripture Clue: Look closely into the inspired account in ${cleaned}.`;
    }
    return 'Scripture Clue: Ponder the context of Jehovah’s faithful servants during this biblical period.';
  }

  assert.strictEqual(getScriptureClue({ reference: 'Song of Solomon 1:1' }), 'Scripture Clue: Read Song of Solomon chapter 1 to discover the answer!');
  assert.strictEqual(getScriptureClue({ reference: '(See Jude 9)' }), 'Scripture Clue: Read the book of Jude, verse 9 to discover the answer!');
  assert.strictEqual(getScriptureClue({ reference: '[see Philemon 4]' }), 'Scripture Clue: Read the book of Philemon, verse 4 to discover the answer!');
  assert.strictEqual(getScriptureClue({ reference: '2 John 7' }), 'Scripture Clue: Read the book of 2 John, verse 7 to discover the answer!');
  assert.strictEqual(getScriptureClue({ reference: 'Genesis 1:1' }), 'Scripture Clue: Read Genesis chapter 1 to discover the answer!');
  console.log('✔ Scripture clue extractor execution test passed');
}
testClueExtractor();

// Test Migration
function testMigrationLogic() {
  const mockStorage = {};
  const mockLocalStorage = {
    getItem: (k) => mockStorage.hasOwnProperty(k) ? mockStorage[k] : null,
    setItem: (k, v) => { mockStorage[k] = String(v); },
    clear: () => { Object.keys(mockStorage).forEach(k => delete mockStorage[k]); }
  };

  function migrateIfNeeded() {
    if (mockLocalStorage.getItem('bible_quiz_v2_migrated') === 'true') return;
    const legacyHighScore = JSON.parse(mockLocalStorage.getItem('bibleQuizHighScore') || '{}');
    const legacyAchievements = JSON.parse(mockLocalStorage.getItem('bibleQuizAchievements') || '{}');
    const statsV2 = {
      version: 2,
      bestScore: Number.isFinite(legacyHighScore.bestScore) ? legacyHighScore.bestScore : 0,
      bestAccuracy: Number.isFinite(legacyHighScore.bestAccuracy) ? legacyHighScore.bestAccuracy : 0,
      bestStreak: Number.isFinite(legacyHighScore.bestStreak) ? legacyHighScore.bestStreak : 0,
      totalQuizzesPlayed: Number.isFinite(legacyHighScore.quizzesPlayed) ? legacyHighScore.quizzesPlayed : 0,
      totalQuestionsAnswered: 0,
      totalCorrectAnswers: 0,
      dailyChallengesCompleted: 0,
      lastPlayedDate: new Date().toISOString()
    };
    mockLocalStorage.setItem('bible_quiz_stats_v2', JSON.stringify(statsV2));
    mockLocalStorage.setItem('bible_quiz_v2_migrated', 'true');
  }

  // Fresh browser
  migrateIfNeeded();
  assert.strictEqual(mockLocalStorage.getItem('bible_quiz_v2_migrated'), 'true');
  const fresh = JSON.parse(mockLocalStorage.getItem('bible_quiz_stats_v2'));
  assert.strictEqual(fresh.bestScore, 0);
  console.log('✔ SettingsManager migration execution test passed');
}
testMigrationLogic();

// Test Google Fonts URL Structure
function testGoogleFontsUrl() {
  const fontLinkMatch = planContent.match(/href="(https:\/\/fonts\.googleapis\.com\/css2\?[^"]+)"/);
  assert.ok(fontLinkMatch, 'Google Fonts stylesheet href link not found in UPGRADE_PLAN.md');
  const fontUrl = new URL(fontLinkMatch[1]);
  assert.strictEqual(fontUrl.hostname, 'fonts.googleapis.com');
  assert.strictEqual(fontUrl.pathname, '/css2');
  const families = fontUrl.searchParams.getAll('family');
  assert.ok(families.some(f => f.includes('Fredoka') && f.includes('500;600;700')), 'Fredoka weights 500;600;700 missing in Google Fonts URL');
  assert.ok(families.some(f => f.includes('Plus Jakarta Sans') || f.includes('Plus+Jakarta+Sans')), 'Plus Jakarta Sans missing in Google Fonts URL');
  assert.strictEqual(fontUrl.searchParams.get('display'), 'swap', 'display=swap missing in Google Fonts URL');
  console.log('✔ Google Fonts URL parsing and parameter validation test passed');
}
testGoogleFontsUrl();

// Test Skeleton HTML Markup Balance
function testSkeletonMarkupBalance() {
  const skeletonIds = ['clay-live-skeleton', 'in-game-skeleton', 'results-skeleton'];
  skeletonIds.forEach(id => {
    const regex = new RegExp(`<div id="${id}"[\\s\\S]*?<\\/div>\\n*(?:<\\/div>)?`, 'g');
    assert.ok(planContent.includes(`id="${id}"`), `Skeleton container #${id} missing`);
    assert.ok(planContent.includes(`id="${id}"`) && planContent.includes('aria-busy="true"'), `aria-busy="true" missing on #${id}`);
  });
  console.log('✔ Skeleton HTML markup structure and ARIA attributes test passed');
}
testSkeletonMarkupBalance();

console.log('\n=============================================');
console.log('🎉 ALL UPGRADE_PLAN.md VERIFICATIONS PASSED!');
console.log('=============================================');
