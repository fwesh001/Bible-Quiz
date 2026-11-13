const fs = require('fs');
const assert = require('assert');

console.log('--- STARTING PHASE 1 VERIFICATION ---');

const html = fs.readFileSync('index.html', 'utf8');
const css = fs.readFileSync('style.css', 'utf8');

// 1. Google Fonts checks in index.html
assert.ok(html.includes('fonts.googleapis.com'), 'fonts.googleapis.com link missing');
assert.ok(html.includes('fonts.gstatic.com'), 'fonts.gstatic.com link missing');
assert.ok(html.includes('family=Fredoka'), 'Fredoka font link missing');
assert.ok(html.includes('family=Plus+Jakarta+Sans'), 'Plus Jakarta Sans font link missing');
assert.ok(html.includes('display=swap'), 'display=swap parameter missing');
console.log('✔ Google Fonts preconnect & link verified in index.html');

// 2. SVG Sprite system
assert.ok(html.includes('<svg id="clay-icons" style="display:none;"'), 'SVG sprite container missing');
const requiredSymbols = [
  'icon-scroll', 'icon-book-open', 'icon-stake', 'icon-oil-lamp',
  'icon-fifty-fifty', 'icon-timer', 'icon-star-outline', 'icon-star-filled',
  'icon-volume-high', 'icon-volume-mute', 'icon-sliders', 'icon-close'
];
requiredSymbols.forEach(id => {
  assert.ok(html.includes(`id="${id}"`), `Missing symbol ${id}`);
});
console.log('✔ All 12 SVG symbols verified in sprite');

// 3. HTML syntax & markup checks
assert.ok(html.includes('<button id="sidebar-toggle" class="sidebar-open-btn" aria-label="Open Settings">'), 'Header toggle button opening missing');
assert.ok(html.includes('</button>\n  </header>') || html.includes('</button>\r\n  </header>'), 'Header button properly closed before </header>');
assert.ok(html.includes('id="clay-live-skeleton"'), 'clay-live-skeleton container missing');
assert.ok(html.includes('Hebrew-Aramaic Scriptures'), 'Hebrew-Aramaic Scriptures option missing');
assert.ok(html.includes('Christian Greek Scriptures'), 'Christian Greek Scriptures option missing');
assert.ok(html.includes('clay-btn-primary'), 'clay-btn-primary class on Start Quiz missing');
assert.ok(html.includes('clay-btn-amber'), 'clay-btn-amber class on Daily Challenge missing');
console.log('✔ index.html markup and syntax verified');

// 4. CSS Tokens & Typography checks in style.css
assert.ok(css.includes('--font-display: \'Fredoka\''), '--font-display token missing in style.css');
assert.ok(css.includes('--font-sans: \'Plus Jakarta Sans\''), '--font-sans token missing in style.css');
assert.ok(css.includes('--font-scripture: Georgia'), '--font-scripture token missing in style.css');
assert.ok(css.includes('--clay-canvas: #F8F5EE'), '--clay-canvas light token missing');
assert.ok(css.includes('--clay-canvas: #16181D'), '--clay-canvas dark token missing');
assert.ok(css.includes('--shadow-clay-card:'), '--shadow-clay-card missing');
assert.ok(css.includes('--shadow-clay-btn-primary:'), '--shadow-clay-btn-primary missing');
assert.ok(css.includes('--shadow-clay-btn-amber:'), '--shadow-clay-btn-amber missing');
assert.ok(css.includes('--shadow-clay-skeleton:'), '--shadow-clay-skeleton missing');
console.log('✔ style.css claymorphic tokens and typography verified');

// 5. CSS Skeleton animations & classes
assert.ok(css.includes('@keyframes clay-shimmer'), '@keyframes clay-shimmer missing');
assert.ok(css.includes('@keyframes clay-pulse'), '@keyframes clay-pulse missing');
assert.ok(css.includes('.clay-skeleton {'), '.clay-skeleton class missing');
assert.ok(css.includes('.clay-skeleton-pill {'), '.clay-skeleton-pill class missing');
assert.ok(css.includes('.clay-skeleton-card {'), '.clay-skeleton-card class missing');
assert.ok(css.includes('.clay-icon {'), '.clay-icon class missing');
assert.ok(css.includes('.clay-btn-primary'), '.clay-btn-primary styles missing');
assert.ok(css.includes('.clay-btn-amber'), '.clay-btn-amber styles missing');
console.log('✔ style.css skeleton classes and animations verified');

console.log('\n=============================================');
console.log('🎉 ALL PHASE 1 IMPLEMENTATION CHECKS PASSED!');
console.log('=============================================');
