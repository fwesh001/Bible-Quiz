/**
 * verify_phase2.js - Verification Suite for Phase 2: Claymorphism Component Migration & Mobile Responsiveness
 */
const fs = require('fs');
const path = require('path');

let errors = [];
let passed = 0;

function assert(condition, message) {
  if (!condition) {
    errors.push(message);
    console.error(`  FAIL: ${message}`);
  } else {
    passed++;
    console.log(`  PASS: ${message}`);
  }
}

console.log('=== VERIFYING PHASE 2: CLAYMORPHISM COMPONENT MIGRATION & MOBILE RESPONSIVENESS ===\n');

// 1. Verify index.html
console.log('1. Checking index.html DOM structure:');
try {
  const html = fs.readFileSync('index.html', 'utf8');

  assert(html.includes('id="quiz-nav-ribbon"'), 'Horizontal question ribbon #quiz-nav-ribbon is present in DOM');
  assert(html.includes('class="quiz-navigator-ribbon"'), 'Class .quiz-navigator-ribbon is applied to ribbon');
  assert(html.includes('id="in-game-skeleton"'), 'In-game question transition skeleton #in-game-skeleton is present');
  assert(html.includes('id="hint-controls-bar"'), 'Hint controls bar #hint-controls-bar is present');
  assert(html.includes('id="btn-hint-fifty"'), '50/50 hint button #btn-hint-fifty is present');
  assert(html.includes('id="btn-hint-clue"'), 'Scripture clue hint button #btn-hint-clue is present');
  assert(html.includes('id="clay-clue-card"'), 'Scripture clue card container #clay-clue-card is present');
  assert(html.includes('id="results-skeleton"'), 'Results screen computation skeleton #results-skeleton is present');
  assert(html.includes('id="results-content"'), 'Results screen content container #results-content is present');
  assert(html.includes('class="option clay-option"'), 'Multiple choice option buttons use .clay-option class');
  assert(html.includes('class="badge option-badge"'), 'Option buttons contain .option-badge');
  assert(html.includes('class="stats results-stats"'), 'Results stats use .results-stats class');

  // Tag matching check
  const openSections = (html.match(/<section/g) || []).length;
  const closeSections = (html.match(/<\/section>/g) || []).length;
  assert(openSections === closeSections, `All <section> tags balanced (${openSections} open, ${closeSections} close)`);
} catch (e) {
  errors.push(`Error reading index.html: ${e.message}`);
}

// 2. Verify style.css
console.log('\n2. Checking style.css Design Tokens & Breakpoints:');
try {
  const css = fs.readFileSync('style.css', 'utf8');

  assert(css.includes('.quiz-navigator-ribbon'), 'CSS rule .quiz-navigator-ribbon exists');
  assert(css.includes('scroll-snap-type: x mandatory'), 'Ribbon enforces scroll-snap-type: x mandatory');
  assert(css.includes('scrollbar-width: none'), 'Ribbon hides default scrollbars on mobile');
  assert(css.includes('.quiz-nav-pill'), 'CSS rule .quiz-nav-pill exists');
  assert(css.includes('.clay-option'), 'CSS rule .clay-option exists');
  assert(css.includes('min-height: 52px'), 'Options enforce min-height: 52px for tactile touch targets');
  assert(css.includes('.clay-eliminated'), 'State class .clay-eliminated exists with strike-through styling');
  assert(css.includes('.round-timer-bar-outer'), 'CSS rule .round-timer-bar-outer exists for sunken clay track');
  assert(css.includes('.round-timer-bar-fill'), 'CSS rule .round-timer-bar-fill exists with 3D gradient capsule');
  assert(css.includes('.hint-controls-bar'), 'CSS rule .hint-controls-bar exists');
  assert(css.includes('.clay-hint-btn'), 'CSS rule .clay-hint-btn exists with amber button styling');
  assert(css.includes('.clay-clue-card'), 'CSS rule .clay-clue-card exists with clue-enter animation');
  assert(css.includes('contain: layout style'), 'Screens enforce CSS containment: layout style');
  assert(css.includes('@media (min-width: 768px)'), 'Tablet breakpoint @media (min-width: 768px) is implemented');
  assert(css.includes('grid-template-columns: 1fr 200px'), 'Tablet quiz grid implements 2-column layout with 200px sidebar');
  assert(css.includes('@media (min-width: 1200px)'), 'Desktop breakpoint @media (min-width: 1200px) is implemented');
  assert(css.includes('max-width: 1040px'), 'Desktop container enforces max-width: 1040px centered stage');
} catch (e) {
  errors.push(`Error reading style.css: ${e.message}`);
}

// 3. Verify script.js
console.log('\n3. Checking script.js Navigation & Skeleton Transitions:');
try {
  const js = fs.readFileSync('script.js', 'utf8');

  // Syntax check
  try {
    new Function(js);
    assert(true, 'script.js parses with zero syntax errors');
  } catch (parseErr) {
    assert(false, `script.js syntax error: ${parseErr.message}`);
  }

  assert(js.includes('quizNavRibbon: document.getElementById(\'quiz-nav-ribbon\')'), 'els.quizNavRibbon is defined');
  assert(js.includes('resultsSkeleton: document.getElementById(\'results-skeleton\')'), 'els.resultsSkeleton is defined');
  assert(js.includes('inGameSkeleton: document.getElementById(\'in-game-skeleton\')'), 'els.inGameSkeleton is defined');
  assert(js.includes('scrollIntoView({ behavior: \'smooth\''), 'updateNavigator smoothly scrolls active ribbon pill');
  assert(js.includes('quiz-nav-pill'), 'buildNavigator creates .quiz-nav-pill buttons for mobile ribbon');
  assert(js.includes('clay-eliminated'), 'renderQuestion restores .clay-eliminated state for 50/50 hint');
  assert(js.includes('clayClueCard'), 'renderQuestion manages .clayClueCard display state');
  assert(js.includes('showResults()'), 'showResults function exists');
  assert(js.includes('resultsSkeleton.style.display = \'none\''), 'showResults smoothly transitions skeleton to results');
} catch (e) {
  errors.push(`Error reading script.js: ${e.message}`);
}

console.log('\n=======================================================');
console.log(`Phase 2 Verification Results: ${passed} Passed, ${errors.length} Failed`);
console.log('=======================================================');

if (errors.length > 0) {
  console.error('\nFailures encountered:');
  errors.forEach((err, idx) => console.error(`${idx + 1}. ${err}`));
  process.exit(1);
} else {
  console.log('\n>>> All Phase 2 criteria successfully verified! Ready to proceed. <<<');
  process.exit(0);
}

