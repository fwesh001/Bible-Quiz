# BIBLE QUIZ WEB APPLICATION: MASTER PRODUCTION UPGRADE PLAN
**A Mobile-First Claymorphic Transformation with Complete Jehovah's Witness Scriptural Alignment**

- **Document Version**: 2.0.0-PROD
- **Date**: 2026-11-12
- **Author**: Worker 1 (Production Upgrade Plan Author)
- **Status**: APPROVED FOR EXECUTION
- **Repository**: `c:\Users\zabdiel\Desktop\PROJECTS\Bible-Quiz`
- **Target Architecture**: Pure Vanilla HTML5 / CSS3 / ES6+ JavaScript / Vector SVG (Zero Build Tools)
- **Theological Foundation**: 100% Alignment with *New World Translation of the Holy Scriptures* (NWT 2013 Revision) & Watch Tower Scriptural Conventions

---

## TABLE OF CONTENTS
1. [Executive Summary & Architectural Foundations](#1-executive-summary--architectural-foundations)
   - 1.1 Project Vision & Purpose
   - 1.2 The Pure Vanilla Architecture Mandate (Zero Build, Zero NPM)
   - 1.3 Architectural Layer Model & Component Hierarchy
   - 1.4 High-Level Phased Upgrade Roadmap
2. [R1: Mobile-First Claymorphism UI & Vector Asset Specifications](#2-r1-mobile-first-claymorphism-ui--vector-asset-specifications)
   - 2.1 Claymorphism Design System Philosophy
   - 2.2 Complete CSS Design System Tokens (Light & Dark Themes)
   - 2.3 Typography, Custom Font Pairing & Fluid Scales
   - 2.4 Pure Vanilla SVG Icon Sprite System (`<svg id="clay-icons">`)
   - 2.5 Mobile-First Responsive Breakpoint Architecture (375px, 768px, 1200px+)
   - 2.6 Detailed UI Wireframes (Landing, Quiz, Results, Settings Drawer, Skeleton States)
   - 2.7 Critical DOM Syntax & Markup Corrections
   - 2.8 Claymorphic Skeleton Loaders & Screen Transitions (Zero-CLS Architecture)
3. [R2: Jehovah's Witness Scriptural Conventions & Content Audit](#3-r2-jehovahs-witness-scriptural-conventions--content-audit)
   - 3.1 Theological & Editorial Foundation
   - 3.2 Scriptural Division Naming Rulebook
   - 3.3 Canonical 66 Bible Books & Official NWT Abbreviations Table
   - 3.4 Iconography & Visual Asset Standards
   - 3.5 Doctrinal, Pneumatological, and Translation Alignment
   - 3.6 Complete Line-by-Line Question Bank Audit & Replacement Matrix
   - 3.7 UI, Script & Database Label Replacement Matrix
4. [R3: In-Game Hints & Advanced Settings Architecture](#4-r3-in-game-hints--advanced-settings-architecture)
   - 4.1 50/50 Option Elimination Mechanic
   - 4.2 Scripture Verse Clue Reveals & Fallback Extraction Algorithm
   - 4.3 Advanced Settings & Web Audio Graph Routing
   - 4.4 Timer Customization (Zen Mode, Blitz, Standard, Round Timers)
   - 4.5 LocalStorage Schema v2 & Idempotent Migration Engine
   - 4.6 Team-Recommended Gameplay Enhancements (Multipliers & Practice Mode)
5. [R4: Phased Implementation Roadmap](#5-r4-phased-implementation-roadmap)
   - 5.1 Phase 1: Landing Page & Design Foundations
   - 5.2 Phase 2: Claymorphism Component Migration & Mobile Responsiveness
   - 5.3 Phase 3: JW Terminology Audit & Scripture Hints
   - 5.4 Phase 4: Advanced Settings, Audio Routing & Storage Schema v2
   - 5.5 Phase 5: Verification, Testing & Hardening
6. [Verification Rubrics & Testing Procedures](#6-verification-rubrics--testing-procedures)
   - 6.1 Responsive Breakpoint & Layout Testing Rubric
   - 6.2 Dogma & Terminology Cleanliness Scan Script
   - 6.3 Category & Difficulty Integrity Verification Script
   - 6.4 Question Schema Validation Assertions
   - 6.5 LocalStorage Migration Test Rubric
   - 6.6 End-to-End User Journey Verification Matrix
   - 6.7 Typography & Custom Font Pairing Verification Rubric
   - 6.8 Claymorphic Skeleton Loader & Screen Transition Verification Rubric
7. [Summary of Implementation Plan](#7-summary-of-implementation-plan)

---

## 1. EXECUTIVE SUMMARY & ARCHITECTURAL FOUNDATIONS

### 1.1 Project Vision & Purpose
The Bible Quiz Web Application is designed to provide an engaging, spiritually uplifting, and pedagogically sound environment for students of the Holy Scriptures. This master upgrade plan establishes the technical and theological blueprint to transform the existing web application into a world-class, mobile-first experience.

The upgrade simultaneously accomplishes two paramount objectives:
1. **Visual & Interactive Overhaul**: Elevate the user interface from an inconsistent, desktop-first glassmorphism aesthetic to an tactile **Mobile-First Claymorphism Design System** featuring inflated 3D pill/card surfaces, dual specular/ambient inner shadows, fluid responsive typography, and embedded Bible-themed vector SVG icons.
2. **Doctrinal & Editorial Integrity**: Align 100% of the application's terminology, question bank, visual emblems, and UI labels with the scriptural conventions of Jehovah's Witnesses and the *New World Translation of the Holy Scriptures* (NWT).

### 1.2 The Pure Vanilla Architecture Mandate (Zero Build, Zero NPM)
A cornerstone requirement of this project is the **strict preservation of the zero-dependency, pure vanilla web stack**:
- **No Node.js runtime required for client execution.**
- **Zero build pipelines or bundlers**: No Webpack, Vite, Rollup, Parcel, or ESBuild.
- **Zero CSS preprocessors or frameworks**: No Tailwind CSS, Sass, Less, PostCSS, or Bootstrap.
- **Zero third-party icon fonts or JS libraries**: No FontAwesome, Lucide, React, Vue, or jQuery.
- **100% Native Web Standards**: Native HTML5 semantic elements, pure CSS3 custom properties with native calc/clamp functions, and ES6+ JavaScript executed directly by modern evergreen web browsers (Chromium, Firefox, Safari, Edge).
- **Zero-NPM Native Web Typography**: Custom web font loading ("Fredoka" rounded display font and "Plus Jakarta Sans" mobile humanist font) is delivered directly via native Google Fonts `<link>` tags with `rel="preconnect"` resource hints and `display=swap`, guaranteeing sub-second rendering with robust system fallbacks (`ui-rounded, system-ui, sans-serif` and `Georgia, serif`) without any package managers, bundlers, or local node modules.

This architectural simplicity guarantees instantaneous page loads, zero dependency supply-chain vulnerabilities, trivial hosting on any static web server or CDN, and seamless long-term maintainability.

### 1.3 Architectural Layer Model & Component Hierarchy
The target application architecture is cleanly decoupled into distinct structural, presentational, state, and persistence layers:

```
+-------------------------------------------------------------------------+
|                          PRESENTATION LAYER                             |
|  index.html (Semantic HTML5: #screen-welcome, #screen-quiz, #screen-results) |
|  style.css (Claymorphism Design Tokens, Fluid Typography, Media Queries)|
|  <svg id="clay-icons"> (Embedded 17-icon Pure Vector Sprite System)     |
+-------------------------------------------------------------------------+
                                    │
                                    ▼
+-------------------------------------------------------------------------+
|                        APPLICATION STATE ENGINE                         |
|  script.js                                                              |
|  ├── QuizStateMachine (Init -> Active Question -> Answer -> Results)   |
|  ├── HintController (50/50 Elimination & Verse Clue Reveal Fallbacks)  |
|  ├── AudioController (Web Audio API Graph: Master, SFX & Synth Nodes)   |
|  └── TimerController (Per-Question Circle SVG & Round Progress Bar)    |
+-------------------------------------------------------------------------+
            │                                             │
            ▼                                             ▼
+-----------------------+                   +-----------------------------+
|    CONTENT DOMAIN     |                   |      PERSISTENCE LAYER      |
|  questions.js         |                   |  SettingsManager (LocalSt.) |
|  - 176 Audited Qs     |                   |  ├── bible_quiz_settings_v2 |
|  - Hebrew-Aramaic     |                   |  ├── bible_quiz_stats_v2    |
|  - Christian Greek    |                   |  ├── bible_quiz_achievem_v2 |
|  - NWT Citations      |                   |  └── Migration Engine (v1->v2)|
+-----------------------+                   +-----------------------------+
```

### 1.4 High-Level Phased Upgrade Roadmap
The execution is structured into five sequential, non-breaking phases:
- **Phase 1: Landing Page & Design Foundations**: Establish CSS clay tokens, inject the SVG sprite system, correct critical HTML DOM syntax bugs, and build the mobile-first welcome experience.
- **Phase 2: Claymorphism Component Migration & Mobile Responsiveness**: Overhaul quiz view cards, option pills, progress bars, and the mobile-first horizontal scrollable question navigator ribbon.
- **Phase 3: JW Terminology Audit & Scripture Hints**: Execute the line-by-line scriptural cleanup across all 176 questions, resolve duplicates, and implement 50/50 and Scripture clue hint state mechanics.
- **Phase 4: Advanced Settings, Audio Routing & Storage Schema v2**: Build the Web Audio gain node graph, settings drawer, volume sliders, Zen mode, and idempotent LocalStorage v2 migration engine.
- **Phase 5: Verification, Testing & Hardening**: Run cross-device responsive tests, terminology scan scripts, question bank assertions, and user journey validations.

---

## 2. R1: MOBILE-FIRST CLAYMORPHISM UI & VECTOR ASSET SPECIFICATIONS

### 2.1 Claymorphism Design System Philosophy
Claymorphism represents an evolution of tactile user interface design. Unlike flat design or translucent glassmorphism (which suffers from contrast degradation on light backgrounds), claymorphism creates friendly, inflated, 3D volumetric surfaces that feel like tangible sculpted clay or parchment.

Achieving authentic claymorphism in pure CSS without 3D libraries requires three synchronized shadow vectors:
1. **Primary Outer Drop Shadow**: Generates realistic ambient elevation, softening as it extends outward.
2. **Top-Left Inner Specular Highlight**: Simulates directional light glancing off the rounded bevel crest (`inset 2px 2px 4px rgba(255, 255, 255, ...)`).
3. **Bottom-Right Inner Occlusion Shadow**: Simulates the soft underbelly shadow of the rounded volume (`inset -3px -3px 6px rgba(..., ...)`).

### 2.2 Complete CSS Design System Tokens (Light & Dark Themes)
The existing `style.css` contains conflicting `:root` declarations (lines 45–58 vs lines 97–118) and fragmented dark mode selectors. The upgraded application replaces these with a consolidated, authoritative design token system:

```css
/* ==========================================================================
   CLAYMORPHISM DESIGN SYSTEM TOKENS — LIGHT THEME (BIBLICAL PARCHMENT)
   ========================================================================== */
:root {
  /* --- PALETTE: WARM BIBLICAL SURFACES --- */
  --clay-canvas: #F8F5EE;           /* Warm biblical parchment background */
  --clay-surface: #FFFFFF;          /* Pure white inflated clay cards */
  --clay-surface-sunken: #EFE9DC;   /* Sunken wells, timer tracks, inputs */
  --clay-surface-glass: rgba(255, 255, 255, 0.88);

  /* --- BRAND COLORS: ROYAL LAPIS & SCRIPTURE NAVY --- */
  --clay-primary: #324D70;          /* Deep Scripture Navy */
  --clay-primary-light: #4A6B94;    /* Light Navy */
  --clay-primary-dark: #20334D;     /* Shadow anchor for navy clay */
  --clay-primary-text: #FFFFFF;

  /* --- SECONDARY ACCENT: DESERT AMBER / BIBLICAL GOLD --- */
  --clay-amber: #D98E32;            /* Warm Desert Amber */
  --clay-amber-light: #ECC078;
  --clay-amber-dark: #A66418;
  --clay-amber-surface: #FDF3E3;
  --clay-amber-text: #613803;

  /* --- SCRIPTURAL OLIVE GREEN (Success / Hebrew Scriptures Accent) --- */
  --clay-olive: #4E7A58;            /* Mount of Olives Green */
  --clay-olive-light: #7AA884;
  --clay-olive-dark: #315239;
  --clay-olive-surface: #EDF5EE;
  --clay-olive-text: #FFFFFF;

  /* --- TERRA COTTA / CEDAR RED (Error / Missed / Critical) --- */
  --clay-terracotta: #C85A48;       /* Ancient Pottery Terra Cotta */
  --clay-terracotta-light: #E08576;
  --clay-terracotta-dark: #8F3324;
  --clay-terracotta-surface: #FDF0ED;
  --clay-terracotta-text: #FFFFFF;

  /* --- TYPOGRAPHY COLORS --- */
  --clay-text-primary: #2C2621;     /* Charcoal with warm umber undertone */
  --clay-text-secondary: #6B6258;   /* Muted warm slate */
  --clay-text-tertiary: #9C9388;    /* Caption & footnote gray */

  /* --- TYPOGRAPHY FONT FAMILIES --- */
  --font-display: 'Fredoka', ui-rounded, system-ui, sans-serif;
  --font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-scripture: Georgia, "Times New Roman", Garamond, serif;

  /* --- CLAYMORPHIC SKELETON SHIMMER PALETTE (LIGHT PARCHMENT) --- */
  --clay-skeleton-base: #EFE9DC;           /* Warm biblical parchment sunken base */
  --clay-skeleton-shimmer: #FAF7F0;        /* Soft pulsating warm highlight */
  --clay-skeleton-accent: #E5DEC9;         /* Subdued edge shadow */
  --clay-skeleton-pill: #F5EFE3;           /* Skeleton pill surface */

  /* --- BORDER RADIUS STANDARDS --- */
  --radius-xs: 8px;                 /* Chips, status tags */
  --radius-sm: 12px;                /* Inputs, option letter badges */
  --radius-md: 18px;                /* Buttons, dialog controls */
  --radius-lg: 26px;                /* Main cards, containers */
  --radius-xl: 34px;                /* Hero cards, dialog containers */
  --radius-pill: 9999px;            /* Capsules, rounded navigation pills */

  /* --- EXACT CLAYMORPHIC SHADOW FORMULAS (LIGHT MODE) --- */
  /* Main Container / Elevated Card */
  --shadow-clay-card: 
    0 16px 32px -8px rgba(78, 62, 45, 0.12),
    0 6px 16px -4px rgba(78, 62, 45, 0.08),
    inset 3px 3px 6px 0 rgba(255, 255, 255, 0.95),
    inset -4px -4px 8px 0 rgba(140, 120, 95, 0.14);

  /* Primary Inflated Clay Button */
  --shadow-clay-btn-primary:
    0 8px 18px -4px rgba(32, 51, 77, 0.35),
    0 4px 8px -2px rgba(32, 51, 77, 0.20),
    inset 2px 2px 4px 0 rgba(255, 255, 255, 0.45),
    inset -3px -3px 6px 0 rgba(16, 26, 40, 0.35);

  /* Amber Inflated Clay Button */
  --shadow-clay-btn-amber:
    0 8px 18px -4px rgba(166, 100, 24, 0.35),
    0 4px 8px -2px rgba(166, 100, 24, 0.20),
    inset 2px 2px 4px 0 rgba(255, 255, 255, 0.60),
    inset -3px -3px 6px 0 rgba(100, 55, 8, 0.30);

  /* Multiple Choice Option Pill (Resting Unselected) */
  --shadow-clay-option:
    0 6px 14px -3px rgba(78, 62, 45, 0.08),
    0 2px 6px -1px rgba(78, 62, 45, 0.04),
    inset 2px 2px 4px 0 rgba(255, 255, 255, 0.95),
    inset -3px -3px 5px 0 rgba(140, 120, 95, 0.10);

  /* Active / Pressed / Depressed Inset State */
  --shadow-clay-pressed:
    0 2px 4px 0 rgba(78, 62, 45, 0.06),
    inset 3px 3px 6px 0 rgba(100, 80, 60, 0.22),
    inset -2px -2px 4px 0 rgba(255, 255, 255, 0.60);

  /* Floating Modal Dialog */
  --shadow-clay-dialog:
    0 28px 56px -12px rgba(44, 38, 33, 0.25),
    0 12px 24px -6px rgba(44, 38, 33, 0.15),
    inset 3px 3px 6px 0 rgba(255, 255, 255, 0.95),
    inset -5px -5px 10px 0 rgba(120, 100, 80, 0.18);

  /* Claymorphic Skeleton Surface (Dual Soft Inset Shadows Light) */
  --shadow-clay-skeleton:
    0 4px 12px -2px rgba(78, 62, 45, 0.06),
    inset 2px 2px 4px 0 rgba(255, 255, 255, 0.85),
    inset -2px -2px 4px 0 rgba(140, 120, 95, 0.14);

  --clay-border: 1.5px solid rgba(255, 255, 255, 0.65);
}

/* ==========================================================================
   CLAYMORPHISM DESIGN SYSTEM TOKENS — DARK THEME (OBSIDIAN & NIGHT SKY)
   ========================================================================== */
[data-theme="dark"], body.dark-mode {
  --clay-canvas: #16181D;           /* Deep obsidian-slate canvas */
  --clay-surface: #22262E;          /* Elevated dark slate clay */
  --clay-surface-sunken: #1A1D23;   /* Sunken wells / inputs */
  --clay-surface-glass: rgba(34, 38, 46, 0.90);

  --clay-primary: #527DB3;
  --clay-primary-light: #709BD1;
  --clay-primary-dark: #375782;
  --clay-primary-text: #FFFFFF;

  --clay-amber: #E29F47;
  --clay-amber-light: #F0B86F;
  --clay-amber-dark: #B37525;
  --clay-amber-surface: #2E271D;
  --clay-amber-text: #FFDFAB;

  --clay-olive: #5D946A;
  --clay-olive-light: #7FBA8D;
  --clay-olive-dark: #3E6948;
  --clay-olive-surface: #1E2820;
  --clay-olive-text: #FFFFFF;

  --clay-terracotta: #D96957;
  --clay-terracotta-light: #EA8A7B;
  --clay-terracotta-dark: #A64333;
  --clay-terracotta-surface: #2B1D1B;
  --clay-terracotta-text: #FFFFFF;

  --clay-text-primary: #F2EFE9;     /* Soft ivory text */
  --clay-text-secondary: #A69E92;   /* Warm muted gray */
  --clay-text-tertiary: #6E6860;    /* Footnote slate */

  /* --- TYPOGRAPHY FONT FAMILIES --- */
  --font-display: 'Fredoka', ui-rounded, system-ui, sans-serif;
  --font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-scripture: Georgia, "Times New Roman", Garamond, serif;

  /* --- CLAYMORPHIC SKELETON SHIMMER PALETTE (DARK OBSIDIAN) --- */
  --clay-skeleton-base: #1C2028;           /* Sunken obsidian base */
  --clay-skeleton-shimmer: #2C3240;        /* Pulsing night slate highlight */
  --clay-skeleton-accent: #15181F;         /* Deep edge anchor */
  --clay-skeleton-pill: #252A35;           /* Dark skeleton pill surface */

  --shadow-clay-card:
    0 16px 32px -8px rgba(0, 0, 0, 0.50),
    0 6px 16px -4px rgba(0, 0, 0, 0.35),
    inset 2px 2px 4px 0 rgba(255, 255, 255, 0.12),
    inset -3px -3px 6px 0 rgba(0, 0, 0, 0.60);

  --shadow-clay-btn-primary:
    0 8px 18px -4px rgba(10, 16, 26, 0.65),
    inset 2px 2px 4px 0 rgba(255, 255, 255, 0.28),
    inset -3px -3px 6px 0 rgba(0, 0, 0, 0.65);

  --shadow-clay-btn-amber:
    0 8px 18px -4px rgba(30, 18, 5, 0.65),
    inset 2px 2px 4px 0 rgba(255, 255, 255, 0.35),
    inset -3px -3px 6px 0 rgba(0, 0, 0, 0.65);

  --shadow-clay-option:
    0 6px 14px -3px rgba(0, 0, 0, 0.35),
    inset 2px 2px 3px 0 rgba(255, 255, 255, 0.10),
    inset -2px -2px 4px 0 rgba(0, 0, 0, 0.45);

  --shadow-clay-pressed:
    0 2px 4px 0 rgba(0, 0, 0, 0.45),
    inset 3px 3px 6px 0 rgba(0, 0, 0, 0.75),
    inset -2px -2px 4px 0 rgba(255, 255, 255, 0.08);

  --shadow-clay-dialog:
    0 28px 56px -12px rgba(0, 0, 0, 0.75),
    inset 2px 2px 4px 0 rgba(255, 255, 255, 0.15),
    inset -4px -4px 8px 0 rgba(0, 0, 0, 0.75);

  /* Claymorphic Skeleton Surface (Dual Soft Inset Shadows Dark) */
  --shadow-clay-skeleton:
    0 4px 12px -2px rgba(0, 0, 0, 0.40),
    inset 2px 2px 3px 0 rgba(255, 255, 255, 0.10),
    inset -2px -2px 4px 0 rgba(0, 0, 0, 0.55);

  --clay-border: 1.5px solid rgba(255, 255, 255, 0.08);
}
```

### 2.3 Typography, Custom Font Pairing & Fluid Scales

#### 2.3.1 Selected Custom Font Pairing Rationale & Roles
The visual identity of the Bible Quiz Web Application balances approachable, tactile warmth with dignified scriptural clarity. To complement the 3D claymorphic UI surfaces, a curated, high-performance two-font family system is deployed alongside traditional serif typography:

1. **Rounded Display & Tactile Font: "Fredoka"**
   - **Available Weights**: `500` (Medium), `600` (SemiBold), `700` (Bold).
   - **Role & Aesthetic**: Fredoka provides rounded, gentle, buoyant letterforms that harmoniously match the physical curvature and inflated volume of claymorphic cards, pills, and buttons.
   - **Application Areas**: Screen hero titles (`h1`), card section headers (`h2`, `h3`), primary action buttons (`#btn-start`, `#btn-daily`, `#btn-restart`), numeric stat counters (score, streak, timer badges), and pill tags.
   - **Fallback Chain**: `ui-rounded, system-ui, sans-serif`.

2. **Mobile Humanist Sans-Serif: "Plus Jakarta Sans"**
   - **Available Weights**: `400` (Regular), `500` (Medium), `600` (SemiBold), `700` (Bold).
   - **Role & Aesthetic**: Plus Jakarta Sans is a contemporary humanist sans-serif featuring open apertures, tall x-height, and clean geometric proportions engineered specifically for exceptional readability across mobile displays and dense multiple-choice layouts.
   - **Application Areas**: Body text, question statement copy (`#question-text`), option pill answer texts (`.option-text`), drawer controls, explanatory fact notes, and modal dialog text.
   - **Fallback Chain**: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`.

3. **Scripture Reference & Citation Serif: "Georgia"**
   - **Available Weights**: `400` (Regular), `700` (Bold), and Italic.
   - **Role & Aesthetic**: Georgia delivers an authoritative, scholarly study-Bible aesthetic for biblical quotes, chapter/verse citations, and scripture clues.
   - **Application Areas**: Scripture references (e.g., *Genesis 6:14*, *1 Thessalonians 5:21*), scripture clue reveal cards, and theological citations.
   - **Fallback Chain**: `Georgia, "Times New Roman", Garamond, serif`.

#### 2.3.2 Loading Strategy: High-Performance Google Fonts Integration
To guarantee zero-build simplicity while delivering fast mobile rendering and eliminating Cumulative Layout Shift (CLS), fonts are loaded via native HTML `<link>` tags in the `<head>` of `index.html` with explicit preconnect resource hints:

```html
<!-- Google Fonts Preconnect Hints & Stylesheet in <head> of index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```

- **Preconnect Optimization**: Preconnecting to `https://fonts.googleapis.com` and `https://fonts.gstatic.com` (with `crossorigin`) performs DNS resolution, TLS negotiation, and TCP handshake early in the document lifecycle, shaving 100–300ms off First Contentful Paint (FCP).
- **`display=swap` Parameter**: Enforces font-display swap behavior, rendering system fallback fonts (`ui-rounded, system-ui, sans-serif`) immediately during download to eliminate Flash of Invisible Text (FOIT) and keep user interaction responsive.

#### 2.3.3 CSS Typography Tokens in `:root`
The application codifies the font families into explicit, reusable CSS custom properties:

```css
:root {
  /* Font Family Tokens */
  --font-display: 'Fredoka', ui-rounded, system-ui, sans-serif;
  --font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-scripture: Georgia, "Times New Roman", Garamond, serif;
}
```

#### 2.3.4 Component Typography Mapping Matrix
| UI Component Element | CSS Font Token | Weight | Size / Clamp | Letter Spacing |
|---|---|---|---|---|
| **App Title & Screen H1** | `var(--font-display)` | `700` (Bold) | `var(--font-h1)` | `-0.02em` |
| **Card Headers & Section H2** | `var(--font-display)` | `600` (SemiBold) | `var(--font-h2)` | `-0.01em` |
| **Primary & Amber Clay Buttons** | `var(--font-display)` | `600` (SemiBold) | `1.05rem` | `0.01em` |
| **Numeric Badges & Stat Values**| `var(--font-display)` | `700` (Bold) | `1.30rem` | `0` |
| **Quiz Question Statement** | `var(--font-sans)` | `600` (SemiBold) | `var(--font-question)` | `-0.01em` |
| **Multiple Choice Option Pills**| `var(--font-sans)` | `500` (Medium) | `1.00rem` | `0` |
| **Option Letter Badges (A,B,C,D)**| `var(--font-display)`| `700` (Bold) | `0.95rem` | `0` |
| **Scripture Verse Clue & Quotes**| `var(--font-scripture)`| `400` / Italic | `0.98rem` | `0.01em` |
| **Scripture Reference Chips** | `var(--font-scripture)`| `700` (Bold) | `0.88rem` | `0.02em` |
| **Settings & Drawer Labels** | `var(--font-sans)` | `500` (Medium) | `0.95rem` | `0` |
| **Footnotes & Captions** | `var(--font-sans)` | `400` (Regular) | `var(--font-caption)` | `0` |

#### 2.3.5 Fluid Typography & Border Radius Scales
Fluid typography guarantees natural scaling across screens without media query breakpoints jumping:
- **CSS Clamp Typography Scale**:
  * `--font-h1`: `clamp(1.50rem, 4.5vw + 0.5rem, 2.25rem)` (24px to 36px)
  * `--font-h2`: `clamp(1.25rem, 3.0vw + 0.3rem, 1.75rem)` (20px to 28px)
  * `--font-question`: `clamp(1.10rem, 2.2vw + 0.35rem, 1.35rem)` (17.6px to 21.6px)
  * `--font-body`: `clamp(0.92rem, 1.2vw + 0.25rem, 1.05rem)` (14.7px to 16.8px)
  * `--font-caption`: `clamp(0.75rem, 0.8vw + 0.2rem, 0.88rem)` (12px to 14px)

### 2.4 Pure Vanilla SVG Icon Sprite System (`<svg id="clay-icons">`)
To completely eliminate platform-inconsistent Unicode emojis (such as `📜`, `⏱`, `☆`, `★`, `🔇`, `🌙`) without introducing heavy external icon libraries, a dedicated, embedded SVG sprite system is defined directly in `index.html`. Total footprint is under 3.5 KB.

#### SVG Sprite Container (Injected inside `<body>` of `index.html`):
```html
<svg id="clay-icons" style="display:none;" xmlns="http://www.w3.org/2000/svg">
  <!-- 1. Ancient Scripture Scroll -->
  <symbol id="icon-scroll" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M19 17V5a2 2 0 0 0-2-2H4"/>
    <path d="M8 21h11a2 2 0 0 0 2-2v-2"/>
    <path d="M4 19a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4z"/>
    <line x1="8" y1="9" x2="15" y2="9"/>
    <line x1="8" y1="13" x2="13" y2="13"/>
  </symbol>

  <!-- 2. Open Scripture Codex / Book -->
  <symbol id="icon-book-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </symbol>

  <!-- 3. Upright Stake (Scriptural Stauros) -->
  <symbol id="icon-stake" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="10" y="2" width="4" height="20" rx="1"/>
    <line x1="12" y1="2" x2="12" y2="22"/>
  </symbol>

  <!-- 4. Clay Oil Lamp (Divine Revelation & Clues) -->
  <symbol id="icon-oil-lamp" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 14c0 3.3 2.7 6 6 6h4c3.3 0 6-2.7 6-6 0-2.5-1.5-4.7-3.7-5.5L14 8V5a2 2 0 0 0-4 0v3l-2.3.5C5.5 9.3 4 11.5 4 14z"/>
    <path d="M12 2c-.8 1-1.5 2-1.5 3 0 1.1.7 1.8 1.5 1.8s1.5-.7 1.5-1.8c0-1-.7-2-1.5-3z" fill="currentColor"/>
  </symbol>

  <!-- 5. 50/50 Elimination Badge -->
  <symbol id="icon-fifty-fifty" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
    <text x="7" y="10" font-size="6" font-family="sans-serif" font-weight="bold" fill="currentColor" stroke="none">50</text>
    <text x="12" y="17" font-size="6" font-family="sans-serif" font-weight="bold" fill="currentColor" stroke="none">50</text>
  </symbol>

  <!-- 6. Timer Dial -->
  <symbol id="icon-timer" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="13" r="8"/>
    <path d="M12 9v4l2.5 2.5"/>
    <path d="M10 2h4"/>
  </symbol>

  <!-- 7. Bookmark Star (Outline & Filled) -->
  <symbol id="icon-star-outline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </symbol>
  <symbol id="icon-star-filled" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </symbol>

  <!-- 8. Audio Volume & Mute -->
  <symbol id="icon-volume-high" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
  </symbol>
  <symbol id="icon-volume-mute" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
    <line x1="23" y1="9" x2="17" y2="15"/>
    <line x1="17" y1="9" x2="23" y2="15"/>
  </symbol>

  <!-- 9. Settings Sliders & Navigation -->
  <symbol id="icon-sliders" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/>
    <line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/>
    <line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>
  </symbol>
  <symbol id="icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </symbol>
</svg>
```

#### Standard Icon CSS Class:
```css
.clay-icon {
  width: 1.25em;
  height: 1.25em;
  display: inline-block;
  vertical-align: -0.2em;
  stroke-width: 2;
  fill: none;
  stroke: currentColor;
  transition: transform 0.2s ease, stroke 0.2s ease;
}
```

### 2.5 Mobile-First Responsive Breakpoint Architecture
The styling hierarchy is strictly inverted from the existing desktop-first structure. The default CSS rules without media queries define the 375px mobile base. Tablet and desktop enhancements are added exclusively via `min-width` media queries.

```
+---------------------------------------------------------------------------------------+
|  VIEWPORT SCALING ARCHITECTURE                                                        |
|                                                                                       |
|  [375px Mobile Base]           [768px Tablet]                  [1200px+ Desktop]      |
|  Default CSS (No @media)       @media (min-width: 768px)       @media (min-width: 1200px)|
|  ├── 1-Column Flow             ├── 2-Column Balanced Grid      ├── Centered Stage 1040px|
|  ├── 48px Min Touch Targets    ├── Sticky Quiz Sidebar (200px) ├── Spacious Stage (260px)|
|  ├── Horizontal Nav Ribbon     ├── 4-Column Metric Tiles       ├── Rich 3D Hover Lifts  |
|  └── Full-Width Clay Pills     └── Multi-row Option Layout     └── Immersive Lighting   |
+---------------------------------------------------------------------------------------+
```

#### Detailed Breakpoint Rules:
1. **Mobile Base (`< 768px`)**:
   - Screen margins: `12px`.
   - Card padding: `16px`.
   - `.quiz-grid`: Stacked single column (`display: flex; flex-direction: column; gap: 14px;`).
   - **Horizontal Scrollable Question Navigator Ribbon**:
     ```css
     .quiz-navigator-ribbon {
       display: flex;
       gap: 8px;
       overflow-x: auto;
       scroll-snap-type: x mandatory;
       padding: 4px 2px 8px 2px;
       -webkit-overflow-scrolling: touch;
       scrollbar-width: none; /* Hide default scrollbar on mobile */
     }
     .quiz-navigator-ribbon::-webkit-scrollbar {
       display: none;
     }
     .quiz-nav-pill {
       flex: 0 0 38px;
       height: 38px;
       border-radius: var(--radius-pill);
       scroll-snap-align: start;
     }
     ```
   - Multiple choice options: `min-height: 52px; width: 100%;` with `margin-bottom: 10px;`.
   - Hint Action Bar: Stacked or flexed 2-column row directly beneath question statement.

2. **Tablet Breakpoint (`@media (min-width: 768px)`)**:
   - Container max width: `720px; margin: 0 auto; padding: 24px;`.
   - `.quiz-grid`: 2-column layout (`grid-template-columns: 1fr 200px; gap: 20px; align-items: start;`).
   - `.quiz-sidebar`: Sticky navigation card on right side (`position: sticky; top: 24px;`).
   - `.stats`: 4-column metric grid (`grid-template-columns: repeat(4, 1fr);`).

3. **Desktop Breakpoint (`@media (min-width: 1200px)`)**:
   - Container max width: `1040px; margin: 0 auto; padding: 36px 40px;`.
   - `.quiz-grid`: Generous 2-column layout (`grid-template-columns: 1fr 260px; gap: 32px;`).
   - Tactile Hover Animations:
     ```css
     .clay-btn:hover:not(:disabled),
     .clay-option:hover:not(:disabled) {
       transform: translateY(-2px) scale(1.008);
       box-shadow: 0 12px 24px -4px rgba(78, 62, 45, 0.16),
                   inset 2px 2px 5px rgba(255, 255, 255, 0.95),
                   inset -3px -3px 6px rgba(140, 120, 95, 0.12);
     }
     ```

### 2.6 Detailed UI Wireframes

#### 2.6.1 Landing / Welcome Screen Wireframe (Mobile 375px Viewport)
```text
+---------------------------------------------------+
|  [#] [Icon: Scroll] Bible Quiz      [Icon: Gears] | (Header: 48px h)
+---------------------------------------------------+
|                                                   |
|  +---------------------------------------------+  |
|  |  [Icon: Scroll] WELCOME                     |  | (Elevated Clay Card)
|  |  Test your knowledge of the Scriptures      |  |
|  +---------------------------------------------+  |
|                                                   |
|  +---------------------------------------------+  |
|  |  SCRIPTURE CATEGORY SELECTION               |  | (Sunken Inset Card)
|  |  ( ) All Scriptures                         |  |
|  |  (*) Hebrew-Aramaic Scriptures              |  |
|  |  ( ) Christian Greek Scriptures             |  |
|  +---------------------------------------------+  |
|                                                   |
|  +---------------------------------------------+  |
|  |  ROUND SETTINGS                             |  |
|  |  Questions: [ - 10 + ]                      |  |
|  |  Difficulty: [ Normal | Hard | Mixed ]      |  |
|  |  Round Timer: [ 3 min ] (Toggle: ON)        |  |
|  |  Question Timer: [ 20s ] (Toggle: ON)       |  |
|  +---------------------------------------------+  |
|                                                   |
|  +---------------------------------------------+  |
|  |  [ > START QUIZ ] (Navy Primary Clay Pill)  |  | (Min 52px h)
|  +---------------------------------------------+  |
|  +---------------------------------------------+  |
|  |  [ * DAILY CHALLENGE ] (Amber Clay Pill)    |  | (Min 52px h)
|  +---------------------------------------------+  |
|                                                   |
|  +---------------------------------------------+  |
|  |  PLAYER HIGHLIGHTS (Clay Stat Strip)        |  |
|  |  [ Best: 140 ] [ Acc: 92% ] [ Streak: 8 ]   |  |
|  +---------------------------------------------+  |
+---------------------------------------------------+
```

#### 2.6.2 Quiz Screen Wireframe with Hints & Clue Card (Mobile 375px Viewport)
```text
+---------------------------------------------------+
|  [<] Home       Question 4 of 10      [Icon: Star]|
+---------------------------------------------------+
|  ROUND TIMER: [==============|----------] 2:15    |
+---------------------------------------------------+
|  NAV RIBBON: (1) (2) (3) (4)* (5) (6) (7) (8) ... |
+---------------------------------------------------+
|                                                   |
|  +---------------------------------------------+  |
|  |  [ Hebrew-Aramaic Scriptures ]   [ ⏱ 16s ]   |  |
|  |                                             |  |
|  |  Who was commanded by Jehovah to construct  |  |
|  |  the ark of salvation to preserve life?     |  |
|  +---------------------------------------------+  |
|                                                   |
|  +---------------------------------------------+  |
|  |  IN-GAME HINTS BAR                          |  |
|  |  [ 🌓 50/50 (1 left) ]  [ 📜 Scripture Clue] |  |
|  +---------------------------------------------+  |
|                                                   |
|  +---------------------------------------------+  |
|  |  [ A ] Noah                                 |  | (Inflated Clay Option)
|  +---------------------------------------------+  |
|  +---------------------------------------------+  |
|  |  [ B ] Moses                                |  | (Inflated Clay Option)
|  +---------------------------------------------+  |
|  +---------------------------------------------+  |
|  |  [ C ] Abraham                              |  | (50/50 Dimmed / Strikethrough)
|  +---------------------------------------------+  |
|  +---------------------------------------------+  |
|  |  [ D ] David                                |  | (50/50 Dimmed / Strikethrough)
|  +---------------------------------------------+  |
|                                                   |
|  +---------------------------------------------+  |
|  |  [Icon: Oil-Lamp] SCRIPTURE CLUE CARD       |  | (Animated Expand)
|  |  "Make for yourself an ark of gopher wood." |  |
|  |  — Read Genesis chapter 6 for the answer!   |  |
|  +---------------------------------------------+  |
|                                                   |
|  +---------------------------------------------+  |
|  |  [ SKIP QUESTION ]      [ SUBMIT QUIZ ]     |  |
|  +---------------------------------------------+  |
+---------------------------------------------------+
```

#### 2.6.3 Results Screen Wireframe (Mobile 375px Viewport)
```text
+---------------------------------------------------+
|  [Icon: Scroll] Results & Review                  |
+---------------------------------------------------+
|                                                   |
|  +---------------------------------------------+  |
|  |  FAITHFUL & COMMENDED!                      |  |
|  |  "Make sure of all things; hold fast to     |  |
|  |   what is fine." — 1 Thessalonians 5:21     |  |
|  |                                             |  |
|  |  +---------------------------------------+  |  |
|  |  |  FINAL SCORE: 135 pts                 |  |  | (Gold Clay Pill)
|  |  +---------------------------------------+  |  |
|  +---------------------------------------------+  |
|                                                   |
|  +---------------------------------------------+  |
|  |  SESSION METRICS (2x2 Clay Grid)            |  |
|  |  +--------------------+ +-----------------+  |  |
|  |  | Accuracy: 90%      | | Streak: 8 in row|  |  |
|  |  +--------------------+ +-----------------+  |  |
|  |  | Correct: 9 / 10    | | Bonus Pts: +4   |  |  |
|  +---------------------------------------------+  |
|                                                   |
|  +---------------------------------------------+  |
|  |  ACHIEVEMENTS EARNED                        |  |
|  |  [Icon: Olive] Hebrew-Aramaic Expert        |  |
|  |  [Icon: Star]  Streak Champion (5+)         |  |
|  +---------------------------------------------+  |
|                                                   |
|  +---------------------------------------------+  |
|  |  [ 📖 PRACTICE MISSED QUESTIONS (1) ]       |  | (Shown if missed > 0)
|  +---------------------------------------------+  |
|                                                   |
|  +---------------------------------------------+  |
|  |  QUESTION REVIEW (Collapsible Clay Cards)   |  |
|  |  [✓] Q1: Who built the ark?                 |  |
|  |      Your answer: Noah (Correct)            |  |
|  |      Ref: Genesis 6:14                      |  |
|  +---------------------------------------------+  |
|                                                   |
|  +---------------------------------------------+  |
|  |  [ PLAY AGAIN ]         [ HOME SCREEN ]     |  |
|  +---------------------------------------------+  |
+---------------------------------------------------+
```

#### 2.6.4 Advanced Settings & Audio Drawer Wireframe
```text
+---------------------------------------------------+
|  SETTINGS & GAMEPLAY PREFERENCES          [ X ]   | (Slide-out Drawer)
+---------------------------------------------------+
|                                                   |
|  +---------------------------------------------+  |
|  |  [Icon: Volume] SOUND & AUDIO CONTROLS       |  |
|  |  Master Volume: [========|====] 75%         |  | (Clay Slider Track)
|  |  Mute All Audio: [ Toggle: OFF ]            |  |
|  |  Sound Effects (SFX): [ Toggle: ON ]        |  |
|  +---------------------------------------------+  |
|                                                   |
|  +---------------------------------------------+  |
|  |  [Icon: Timer] TIMER PRESETS                |  |
|  |  Per-Question Duration:                      |  |
|  |  [ Zen (0s) | Blitz (10s) | Std (20s) ]     |  |
|  |  Round Timer Duration:                       |  |
|  |  [ Off | 1 min | 3 min (Std) | 5 min ]      |  |
|  +---------------------------------------------+  |
|                                                   |
|  +---------------------------------------------+  |
|  |  APPEARANCE THEME                           |  |
|  |  [ 🔆 Light Parchment | 🌙 Night Dark ]     |  |
|  +---------------------------------------------+  |
|                                                   |
|  +---------------------------------------------+  |
|  |  COMMUNITY & CONTRIBUTIONS                  |  |
|  |  [ + ] Submit Scripture Question            |  |
|  |  [ 💬 ] Submit Feedback / Correction         |  |
|  |  [ 🔒 ] Moderator Portal                    |  |
|  +---------------------------------------------+  |
+---------------------------------------------------+
```

#### 2.6.5 Claymorphic Skeleton Loader Wireframes

##### 2.6.5.1 Live Question Loading State Skeleton (Fetching `/questions/live` or DB Init)
```text
+---------------------------------------------------+
|  [#] [Icon: Scroll] Bible Quiz      [Icon: Gears] | (Header: 56px min-h)
+---------------------------------------------------+
|                                                   |
|  +---------------------------------------------+  |
|  |  [ SKELETON CATEGORY CHIP ]     ( ⏱ )       |  | (Elevated Skeleton Card: 220px min-h)
|  |                                             |  |
|  |  =======================================    |  | (Pulsing warm shimmer bar: 88%)
|  |  ===========================================|  | (Pulsing warm shimmer bar: 96%)
|  |  =====================                      |  | (Pulsing warm shimmer bar: 60%)
|  +---------------------------------------------+  |
|                                                   |
|  +---------------------------------------------+  |
|  |  HINT SKELETONS: [ ====== ]  [ ======= ]    |  | (Dual Soft Inset Buttons)
|  +---------------------------------------------+  |
|                                                   |
|  +---------------------------------------------+  |
|  |  ( * )  ==================================  |  | (Skeleton Option Pill 1: 52px h)
|  +---------------------------------------------+  |
|  +---------------------------------------------+  |
|  |  ( * )  ===========================         |  | (Skeleton Option Pill 2: 52px h)
|  +---------------------------------------------+  |
|  +---------------------------------------------+  |
|  |  ( * )  =================================   |  | (Skeleton Option Pill 3: 52px h)
|  +---------------------------------------------+  |
|  +---------------------------------------------+  |
|  |  ( * )  =====================               |  | (Skeleton Option Pill 4: 52px h)
|  +---------------------------------------------+  |
+---------------------------------------------------+
```

##### 2.6.5.2 In-Game Question & 4-Option Pill Transition Skeleton (Mobile 375px Viewport)
```text
+---------------------------------------------------+
|  [<] Home       Question ... of 10    [Icon: Star]|
+---------------------------------------------------+
|  ROUND TIMER: [==============|----------] --:--   |
+---------------------------------------------------+
|  NAV RIBBON: (1) (2) (3) (4)* (5) (6) (7) (8) ... |
+---------------------------------------------------+
|                                                   |
|  +---------------------------------------------+  |
|  |  [ SKELETON CHIP ]             [ SKELETON ] |  | (Elevated Clay Skeleton Card)
|  |                                             |  |
|  |  =======================================    |  | (Pulsing warm shimmer bar: 88%)
|  |  ===========================================|  | (Pulsing warm shimmer bar: 95%)
|  |  =====================                      |  | (Pulsing warm shimmer bar: 50%)
|  +---------------------------------------------+  |
|                                                   |
|  +---------------------------------------------+  |
|  |  HINT SKELETONS: [ ====== ]  [ ======= ]    |  |
|  +---------------------------------------------+  |
|                                                   |
|  +---------------------------------------------+  |
|  |  ( * )  ==================================  |  | (Skeleton Option Pill 1: 52px h)
|  +---------------------------------------------+  |
|  +---------------------------------------------+  |
|  |  ( * )  ===========================         |  | (Skeleton Option Pill 2: 52px h)
|  +---------------------------------------------+  |
|  +---------------------------------------------+  |
|  |  ( * )  =================================   |  | (Skeleton Option Pill 3: 52px h)
|  +---------------------------------------------+  |
|  +---------------------------------------------+  |
|  |  ( * )  =====================               |  | (Skeleton Option Pill 4: 52px h)
|  +---------------------------------------------+  |
|                                                   |
|  +---------------------------------------------+  |
|  |  [ SKELETON BTN ]         [ SKELETON BTN ]  |  |
|  +---------------------------------------------+  |
+---------------------------------------------------+
```

##### 2.6.5.3 Results Screen Calculation & Compilation Skeleton (Mobile 375px Viewport)
```text
+---------------------------------------------------+
|  [Icon: Scroll] Results & Review                  |
+---------------------------------------------------+
|                                                   |
|  +---------------------------------------------+  |
|  |  =================== (Calculating status)   |  | (Hero Skeleton Card)
|  |  ========================================== |  | (Pulsing scripture quote)
|  |                                             |  |
|  |  +---------------------------------------+  |  |
|  |  |  [ SKELETON SCORE BADGE: 120px ]      |  |  | (Sunken Shimmer Well)
|  |  +---------------------------------------+  |  |
|  +---------------------------------------------+  |
|                                                   |
|  +---------------------------------------------+  |
|  |  SESSION METRICS SKELETON (2x2 Clay Grid)   |  |
|  |  +--------------------+ +-----------------+  |  |
|  |  | [======]  [======] | | [======] [=====] |  |  |
|  |  +--------------------+ +-----------------+  |  |
|  |  | [======]  [======] | | [======] [=====] |  |  |
|  |  +--------------------+ +-----------------+  |  |
|  +---------------------------------------------+  |
|                                                   |
|  +---------------------------------------------+  |
|  |  ACHIEVEMENTS EVALUATION SKELETON           |  |
|  |  ( * ) [=============================]      |  |
|  |  ( * ) [========================]           |  |
|  +---------------------------------------------+  |
|                                                   |
|  +---------------------------------------------+  |
|  |  QUESTION REVIEW LIST SKELETON              |  |
|  |  [ ===================================== ]  |  | (Review Card 1 Skeleton)
|  |  [ ===================================== ]  |  | (Review Card 2 Skeleton)
|  +---------------------------------------------+  |
+---------------------------------------------------+

### 2.7 Critical DOM Syntax & Markup Corrections
Inspection of the production HTML repository reveals two critical syntax errors that disrupt standard DOM parsing and styling:

1. **Unclosed `<button>` in Header (`index.html`, lines 15–17)**:
   ```html
   <!-- BROKEN CODE IN index.html -->
   <button id="sidebar-toggle" class="sidebar-open-btn">☰
   </header>

   <!-- MANDATED FIX -->
   <button id="sidebar-toggle" class="sidebar-open-btn" aria-label="Open Settings">
     <svg class="clay-icon"><use href="#icon-sliders"/></svg>
   </button>
   </header>
   ```

2. **Unmatched Closing Tags in Results Screen (`index.html`, lines 171–183)**:
   ```html
   <!-- BROKEN CODE IN index.html -->
   <div style="margin-top:16px;">
     <div style="margin-top:16px;">
       <h3 style="margin:0 0 8px; font-size:1.05rem; color:var(--brand-2)">Question Review</h3>
       <div class="question-review" id="question-review-list"></div>
     </div>
     <div class="controls" style="margin-top:16px;">
       <button id="btn-restart" class="primary">Play Again</button>
       <button id="btn-home" class="secondary">Home</button>
     </div>
   </section>

   <!-- MANDATED FIX: Close the orphaned outer <div> before </section> -->
     </div>
   </section>
   ```

### 2.8 Claymorphic Skeleton Loaders & Screen Transitions (Zero-CLS Architecture)

To bridge network delays, database queries, and view state transitions without visual jarring or layout jump, the application deploys an authentic **Claymorphic Skeleton Loading System**. Unlike generic gray placeholder blocks, these skeletons mirror the tactile biblical parchment aesthetic with soft warm hues, dual-inset volumetric shadows, and coordinated dual-layer shimmer and pulse animations.

#### 2.8.1 Claymorphism Skeleton System Philosophy & Dual Inset Shadow Formulas
Every skeleton placeholder mimics the physical contours and depth of the destination clay component:
- **Warm Parchment Surface Palette**: Uses `--clay-skeleton-base` (`#EFE9DC`), `--clay-skeleton-shimmer` (`#FAF7F0`), and `--clay-skeleton-accent` (`#E5DEC9`) in light mode; and `#1C2028`, `#2C3240`, and `#15181F` in dark mode.
- **Dual Soft Inset Shadows**: Skeletons incorporate dual inner bevel shadows to replicate concave or convex sculpted clay before content fills the cavity:
  ```css
  /* Light Theme Skeleton Dual Inset Shadows */
  --shadow-clay-skeleton:
    0 4px 12px -2px rgba(78, 62, 45, 0.06),
    inset 2px 2px 4px 0 rgba(255, 255, 255, 0.85),
    inset -2px -2px 4px 0 rgba(140, 120, 95, 0.14);

  /* Dark Theme Skeleton Dual Inset Shadows (Scoped under [data-theme="dark"]) */
  --shadow-clay-skeleton:
    0 4px 12px -2px rgba(0, 0, 0, 0.40),
    inset 2px 2px 3px 0 rgba(255, 255, 255, 0.10),
    inset -2px -2px 4px 0 rgba(0, 0, 0, 0.55);
  ```

#### 2.8.2 Animation Engine: Shimmer & Pulse Keyframes
The skeleton system utilizes two synchronized CSS keyframe animations running simultaneously:
1. **`@keyframes clay-shimmer`**: A horizontal linear-gradient wave moving smoothly across the surface to indicate active background operation.
2. **`@keyframes clay-pulse`**: A gentle opacity and micro-scale breathing effect that creates an organic, warm tactile sensation.

```css
/* ==========================================================================
   CLAYMORPHIC SKELETON ANIMATIONS & BASE UTILITIES
   ========================================================================== */
@keyframes clay-shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

@keyframes clay-pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.65;
    transform: scale(0.995);
  }
}

/* Base Skeleton Class */
.clay-skeleton {
  background: linear-gradient(
    90deg,
    var(--clay-skeleton-base) 0%,
    var(--clay-skeleton-shimmer) 50%,
    var(--clay-skeleton-base) 100%
  );
  background-size: 200% 100%;
  animation: clay-shimmer 1.8s ease-in-out infinite, clay-pulse 2.4s ease-in-out infinite;
  box-shadow: var(--shadow-clay-skeleton);
  pointer-events: none;
  user-select: none;
  will-change: background-position, opacity, transform;
}

/* Skeleton Line / Text Bar */
.clay-skeleton-text {
  height: 1rem;
  border-radius: var(--radius-xs);
  margin-bottom: 0.65rem;
}
.clay-skeleton-text:last-child {
  margin-bottom: 0;
}

/* Skeleton Option Pill */
.clay-skeleton-pill {
  min-height: 52px;
  border-radius: var(--radius-pill);
  box-shadow: var(--shadow-clay-skeleton);
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 14px;
  margin-bottom: 12px;
}

/* Skeleton Letter Badge */
.clay-skeleton-badge {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
  background: var(--clay-skeleton-accent);
  flex-shrink: 0;
}

/* Skeleton Elevated Card Container */
.clay-skeleton-card {
  border-radius: var(--radius-lg);
  padding: 24px 20px;
  box-shadow: var(--shadow-clay-card);
  background: var(--clay-surface);
  min-height: 220px;
}

/* Skeleton Circular Placeholder */
.clay-skeleton-circle {
  border-radius: 50%;
  box-shadow: var(--shadow-clay-skeleton);
}
```

#### 2.8.3 Skeleton State 1: Live Question Loading State (`/questions/live` & DB Init)
- **Trigger**: When the client issues a fetch request to `/questions/live` (or initializes the IndexedDB / local database questions cache).
- **DOM Insertion**: Injected inside `#screen-quiz` or `#screen-welcome` as `#clay-live-skeleton`.
- **Structural Blueprint**:
  - Top meta bar with category chip skeleton (`width: 140px; height: 26px; border-radius: var(--radius-pill);`) and timer dial circle skeleton (`width: 32px; height: 32px;`).
  - 3 text skeleton bars (`88%`, `96%`, `60%` widths) representing the incoming question statement.
  - Hint bar placeholder with two skeleton pill buttons.
  - 4 option pill skeletons (`.clay-skeleton-pill`) with faux letter badges and answer text bars.
- **Perceived Latency Impact**: Replaces blank screens or spinning wheels with immediate visual structure, reducing perceived wait time by over 50%.

```html
<!-- Live Question Loading State Markup Specification -->
<div id="clay-live-skeleton" class="clay-skeleton-card" aria-busy="true" aria-label="Loading live questions from Scripture database">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px;">
    <div class="clay-skeleton" style="width: 140px; height: 26px; border-radius: var(--radius-pill);"></div>
    <div class="clay-skeleton clay-skeleton-circle" style="width: 32px; height: 32px;"></div>
  </div>
  <div class="clay-skeleton clay-skeleton-text" style="width: 88%; height: 1.25rem;"></div>
  <div class="clay-skeleton clay-skeleton-text" style="width: 96%; height: 1.25rem;"></div>
  <div class="clay-skeleton clay-skeleton-text" style="width: 60%; height: 1.25rem; margin-bottom: 24px;"></div>
  <div style="display: flex; gap: 10px; margin-bottom: 20px;">
    <div class="clay-skeleton" style="width: 120px; height: 36px; border-radius: var(--radius-md);"></div>
    <div class="clay-skeleton" style="width: 130px; height: 36px; border-radius: var(--radius-md);"></div>
  </div>
  <div class="clay-skeleton clay-skeleton-pill">
    <div class="clay-skeleton-badge"></div>
    <div class="clay-skeleton" style="width: 75%; height: 1rem; border-radius: var(--radius-xs);"></div>
  </div>
  <div class="clay-skeleton clay-skeleton-pill">
    <div class="clay-skeleton-badge"></div>
    <div class="clay-skeleton" style="width: 60%; height: 1rem; border-radius: var(--radius-xs);"></div>
  </div>
  <div class="clay-skeleton clay-skeleton-pill">
    <div class="clay-skeleton-badge"></div>
    <div class="clay-skeleton" style="width: 82%; height: 1rem; border-radius: var(--radius-xs);"></div>
  </div>
  <div class="clay-skeleton clay-skeleton-pill">
    <div class="clay-skeleton-badge"></div>
    <div class="clay-skeleton" style="width: 45%; height: 1rem; border-radius: var(--radius-xs);"></div>
  </div>
</div>
```

#### 2.8.4 Skeleton State 2: In-Game Question & 4-Option Pill Transition Skeleton Loader
- **Trigger**: When the quiz state advances from question $N$ to question $N+1$ (via user answer or ribbon navigation).
- **DOM Insertion**: Activated inside `#question-card` as `#in-game-skeleton` while new question data and options are mounted.
- **Structural Blueprint**:
  - Question statement lines shimmer softly without changing card bounding box dimensions.
  - Exactly 4 `.clay-skeleton-pill` placeholders occupy the multiple choice container, ensuring the option container preserves its exact height (4 x 52px + gaps = 244px).
  - Navigator ribbon current pill displays an active breathing pulse highlight.
- **Zero-Flicker Execution**: Pre-renders the incoming question in memory, seamlessly swapping DOM text nodes within a single `requestAnimationFrame` while the skeleton shimmers.

```html
<!-- In-Game Question & 4-Option Pill Transition Skeleton Markup Specification -->
<div id="in-game-skeleton" class="clay-skeleton-card" aria-busy="true" aria-label="Loading next question transition">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px;">
    <div class="clay-skeleton" style="width: 130px; height: 26px; border-radius: var(--radius-pill);"></div>
    <div class="clay-skeleton clay-skeleton-circle" style="width: 32px; height: 32px;"></div>
  </div>
  <div class="clay-skeleton clay-skeleton-text" style="width: 90%; height: 1.25rem;"></div>
  <div class="clay-skeleton clay-skeleton-text" style="width: 95%; height: 1.25rem;"></div>
  <div class="clay-skeleton clay-skeleton-text" style="width: 55%; height: 1.25rem; margin-bottom: 24px;"></div>
  <div style="display: flex; gap: 10px; margin-bottom: 20px;">
    <div class="clay-skeleton" style="width: 120px; height: 36px; border-radius: var(--radius-md);"></div>
    <div class="clay-skeleton" style="width: 130px; height: 36px; border-radius: var(--radius-md);"></div>
  </div>
  <div class="clay-skeleton clay-skeleton-pill">
    <div class="clay-skeleton-badge"></div>
    <div class="clay-skeleton" style="width: 72%; height: 1rem; border-radius: var(--radius-xs);"></div>
  </div>
  <div class="clay-skeleton clay-skeleton-pill">
    <div class="clay-skeleton-badge"></div>
    <div class="clay-skeleton" style="width: 58%; height: 1rem; border-radius: var(--radius-xs);"></div>
  </div>
  <div class="clay-skeleton clay-skeleton-pill">
    <div class="clay-skeleton-badge"></div>
    <div class="clay-skeleton" style="width: 84%; height: 1rem; border-radius: var(--radius-xs);"></div>
  </div>
  <div class="clay-skeleton clay-skeleton-pill">
    <div class="clay-skeleton-badge"></div>
    <div class="clay-skeleton" style="width: 62%; height: 1rem; border-radius: var(--radius-xs);"></div>
  </div>
</div>
```

#### 2.8.5 Skeleton State 3: Results Screen Skeleton Loader
- **Trigger**: When the final question is answered and the quiz engine evaluates total score, computes streak multipliers, verifies new achievements in LocalStorage v2, and renders the collapsible question review list.
- **DOM Insertion**: Activated inside `#screen-results` as `#results-skeleton`.
- **Structural Blueprint**:
  - **Hero Status & Score**: Shimmering header bar and a sunken 120px gold clay score pill placeholder (`#skeleton-score-pill`).
  - **2x2 Metrics Grid**: 4 rectangular clay card skeletons with dual inset shadows matching Accuracy, Streak, Correct Answers, and Bonus Points.
  - **Achievement Badges**: Horizontal skeleton strip showing pending evaluation badges.
  - **Question Review List**: 3 stacked collapsible card skeletons (`min-height: 64px; border-radius: var(--radius-md);`) indicating incoming line-by-line review items.

```html
<!-- Results Screen Skeleton Loader Markup Specification -->
<div id="results-skeleton" class="clay-card clay-skeleton-card" aria-busy="true" aria-label="Calculating final results and compiling scripture review">
  <div class="clay-skeleton clay-skeleton-text" style="width: 50%; height: 1.5rem; margin: 0 auto 12px; border-radius: var(--radius-sm);"></div>
  <div class="clay-skeleton clay-skeleton-text" style="width: 75%; height: 1rem; margin: 0 auto 24px;"></div>
  
  <div class="clay-skeleton" style="width: 140px; height: 56px; border-radius: var(--radius-pill); margin: 0 auto 28px;"></div>
  
  <!-- 2x2 Metric Grid Skeleton -->
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 24px;">
    <div class="clay-skeleton" style="height: 72px; border-radius: var(--radius-md);"></div>
    <div class="clay-skeleton" style="height: 72px; border-radius: var(--radius-md);"></div>
    <div class="clay-skeleton" style="height: 72px; border-radius: var(--radius-md);"></div>
    <div class="clay-skeleton" style="height: 72px; border-radius: var(--radius-md);"></div>
  </div>
  
  <!-- Achievement Skeleton Strip -->
  <div class="clay-skeleton" style="height: 48px; border-radius: var(--radius-md); margin-bottom: 20px;"></div>
  
  <!-- Question Review List Placeholders -->
  <div class="clay-skeleton" style="height: 58px; border-radius: var(--radius-md); margin-bottom: 10px;"></div>
  <div class="clay-skeleton" style="height: 58px; border-radius: var(--radius-md); margin-bottom: 10px;"></div>
  <div class="clay-skeleton" style="height: 58px; border-radius: var(--radius-md);"></div>
</div>
```

#### 2.8.6 Navigation and Screen Transition Recommendations & Architectural Best Practices (Zero Cumulative Layout Shift / CLS)
To achieve a Cumulative Layout Shift (CLS) score of **0.00** across all mobile, tablet, and desktop viewports, the application mandates the following architectural standards:

1. **Strict Spatial Reservation (Aspect-Ratio & Explicit Min-Height)**:
   - Elements subject to dynamic asynchronous content must define immutable minimum dimensions:
     - Header bar: `min-height: 56px;`
     - Question card container: `min-height: 220px;`
     - Multiple choice option pills: `min-height: 52px;`
     - Navigator ribbon: `min-height: 48px;`
     - Results metric container: `min-height: 160px;`
   - By locking component bounding boxes to match their skeleton counterparts, the DOM never shifts surrounding content when actual text nodes populate.

2. **Hardware-Accelerated CSS Transitions**:
   - Screen and card animations must exclusively animate GPU-composited properties: `transform` (translateX, translateY, scale) and `opacity`.
   - Never animate layout-triggering properties (`top`, `left`, `margin`, `padding`, `height`, `width`).
   - Use `will-change: transform, opacity;` sparingly during active transitions and remove it on transition end.

3. **CSS Subtree Containment (`contain: layout style paint;`)**:
   - Apply CSS containment to top-level view containers (`#screen-welcome`, `#screen-quiz`, `#screen-results`, `#quiz-nav-ribbon`):
     ```css
     .screen {
       contain: layout style;
     }
     .quiz-navigator-ribbon {
       contain: layout paint;
     }
     ```
   - This ensures DOM repaints inside the quiz card or ribbon never trigger layout recalculations in adjacent view trees.

4. **Coordinated Screen Cross-Fade Lifecycle**:
   - View transitions follow an explicit 3-stage lifecycle:
     ```css
     /* Screen transition states */
     .screen-exit {
       opacity: 1;
       transform: scale(1);
       transition: opacity 160ms ease-out, transform 160ms ease-out;
     }
     .screen-exit-active {
       opacity: 0;
       transform: scale(0.98);
       pointer-events: none;
     }
     .screen-enter {
       opacity: 0;
       transform: scale(0.98);
     }
     .screen-enter-active {
       opacity: 1;
       transform: scale(1);
       transition: opacity 220ms ease-in, transform 220ms cubic-bezier(0.16, 1, 0.3, 1);
     }
     ```
   - Before swapping screens, the exiting view receives `.screen-exit-active`. Once opacity reaches 0, the incoming view is mounted with its clay skeleton loader, and `.screen-enter-active` is applied.

5. **Pre-rendering & Batch DOM Operations**:
   - All question updates must construct DOM subtrees in an off-screen `DocumentFragment` before attaching to the document tree in a single atomic operation, preventing mid-render paint cycles.

6. **Font Loading Stability**:
   - Preconnect hints to `fonts.googleapis.com` and `fonts.gstatic.com` (with `crossorigin`) plus `font-display: swap` ensure system fallback fonts (`ui-rounded, system-ui, sans-serif`) are rendered without blocking.
   - Fallback font metrics closely match Fredoka and Plus Jakarta Sans to prevent layout reflow when web fonts finish downloading.

---

## 3. R2: JEHOVAH'S WITNESS SCRIPTURAL CONVENTIONS & CONTENT AUDIT

### 3.1 Theological & Editorial Foundation
To achieve genuine alignment with the scriptural teachings of Jehovah's Witnesses, all terminology, book citations, and thematic content must strictly adhere to the *New World Translation of the Holy Scriptures* (NWT) and official publications (Watchtower, Awake!, Insight on the Scriptures).

### 3.2 Scriptural Division Naming Rulebook
The traditional terms "Old Testament" and "New Testament" are rejected in favor of biblically accurate designations:

| Prohibited Traditional Term | Official JW Term | Informal Allowed | Rationale & Scriptural Basis |
|---|---|---|---|
| **Old Testament (OT)** | **Hebrew-Aramaic Scriptures** | Hebrew Scriptures | Portions of Ezra (4:8–6:18; 7:12–26), Daniel (2:4b–7:28), and Jeremiah (10:11) were originally penned in Aramaic. The Scriptures are not an obsolete "testament" but the living, inspired Word of God. 2 Cor 3:14 refers to the reading of the old Law covenant, not the canon of books. |
| **New Testament (NT)** | **Christian Greek Scriptures** | Greek Scriptures | Penned under inspiration by first-century disciples of Jesus Christ in Koine Greek. |
| **The Holy Bible (with Apocrypha)** | **The Holy Scriptures** (66 Books) | The Word of God | The divine canon consists strictly of 66 inspired books. Apocryphal/Deuterocanonical writings (e.g. Tobit, Judith, Maccabees) lack inspiration. |

### 3.3 Canonical 66 Bible Books & Official NWT Abbreviations Table
All 66 canonical Bible books, their assigned division, and official Watchtower Online Library (WOL) abbreviations are codified below:

| # | Book Name | Official WOL Abbrev. | Scripture Division |
|---|---|---|---|
| 1 | Genesis | Ge | Hebrew-Aramaic Scriptures |
| 2 | Exodus | Ex | Hebrew-Aramaic Scriptures |
| 3 | Leviticus | Le | Hebrew-Aramaic Scriptures |
| 4 | Numbers | Nu | Hebrew-Aramaic Scriptures |
| 5 | Deuteronomy | De | Hebrew-Aramaic Scriptures |
| 6 | Joshua | Jos | Hebrew-Aramaic Scriptures |
| 7 | Judges | Jg | Hebrew-Aramaic Scriptures |
| 8 | Ruth | Ru | Hebrew-Aramaic Scriptures |
| 9 | 1 Samuel | 1Sa | Hebrew-Aramaic Scriptures |
| 10 | 2 Samuel | 2Sa | Hebrew-Aramaic Scriptures |
| 11 | 1 Kings | 1Ki | Hebrew-Aramaic Scriptures |
| 12 | 2 Kings | 2Ki | Hebrew-Aramaic Scriptures |
| 13 | 1 Chronicles | 1Ch | Hebrew-Aramaic Scriptures |
| 14 | 2 Chronicles | 2Ch | Hebrew-Aramaic Scriptures |
| 15 | Ezra | Ezr | Hebrew-Aramaic Scriptures |
| 16 | Nehemiah | Ne | Hebrew-Aramaic Scriptures |
| 17 | Esther | Es | Hebrew-Aramaic Scriptures |
| 18 | Job | Job | Hebrew-Aramaic Scriptures |
| 19 | Psalms (single: Psalm) | Ps | Hebrew-Aramaic Scriptures |
| 20 | Proverbs | Pr | Hebrew-Aramaic Scriptures |
| 21 | Ecclesiastes | Ec | Hebrew-Aramaic Scriptures |
| 22 | Song of Solomon | Ca | Hebrew-Aramaic Scriptures |
| 23 | Isaiah | Isa | Hebrew-Aramaic Scriptures |
| 24 | Jeremiah | Jer | Hebrew-Aramaic Scriptures |
| 25 | Lamentations | La | Hebrew-Aramaic Scriptures |
| 26 | Ezekiel | Eze | Hebrew-Aramaic Scriptures |
| 27 | Daniel | Da | Hebrew-Aramaic Scriptures |
| 28 | Hosea | Ho | Hebrew-Aramaic Scriptures |
| 29 | Joel | Joe | Hebrew-Aramaic Scriptures |
| 30 | Amos | Am | Hebrew-Aramaic Scriptures |
| 31 | Obadiah | Ob | Hebrew-Aramaic Scriptures |
| 32 | Jonah | Jon | Hebrew-Aramaic Scriptures |
| 33 | Micah | Mic | Hebrew-Aramaic Scriptures |
| 34 | Nahum | Na | Hebrew-Aramaic Scriptures |
| 35 | Habakkuk | Hab | Hebrew-Aramaic Scriptures |
| 36 | Zephaniah | Zep | Hebrew-Aramaic Scriptures |
| 37 | Haggai | Hag | Hebrew-Aramaic Scriptures |
| 38 | Zechariah | Zec | Hebrew-Aramaic Scriptures |
| 39 | Malachi | Mal | Hebrew-Aramaic Scriptures |
| 40 | Matthew | Mt | Christian Greek Scriptures |
| 41 | Mark | Mr | Christian Greek Scriptures |
| 42 | Luke | Lu | Christian Greek Scriptures |
| 43 | John | Joh | Christian Greek Scriptures |
| 44 | Acts (Acts of Apostles) | Ac | Christian Greek Scriptures |
| 45 | Romans | Ro | Christian Greek Scriptures |
| 46 | 1 Corinthians | 1Co | Christian Greek Scriptures |
| 47 | 2 Corinthians | 2Co | Christian Greek Scriptures |
| 48 | Galatians | Ga | Christian Greek Scriptures |
| 49 | Ephesians | Eph | Christian Greek Scriptures |
| 50 | Philippians | Php | Christian Greek Scriptures |
| 51 | Colossians | Col | Christian Greek Scriptures |
| 52 | 1 Thessalonians | 1Th | Christian Greek Scriptures |
| 53 | 2 Thessalonians | 2Th | Christian Greek Scriptures |
| 54 | 1 Timothy | 1Ti | Christian Greek Scriptures |
| 55 | 2 Timothy | 2Ti | Christian Greek Scriptures |
| 56 | Titus | Tit | Christian Greek Scriptures |
| 57 | Philemon | Phm | Christian Greek Scriptures |
| 58 | Hebrews | Heb | Christian Greek Scriptures |
| 59 | James | Jas | Christian Greek Scriptures |
| 60 | 1 Peter | 1Pe | Christian Greek Scriptures |
| 61 | 2 Peter | 2Pe | Christian Greek Scriptures |
| 62 | 1 John | 1Jo | Christian Greek Scriptures |
| 63 | 2 John | 2Jo | Christian Greek Scriptures |
| 64 | 3 John | 3Jo | Christian Greek Scriptures |
| 65 | Jude | Jude | Christian Greek Scriptures |
| 66 | Revelation | Re | Christian Greek Scriptures |

*Rules on Scripture Citations*:
- "Revelation" must **never** be pluralized as "Revelations".
- Book names must never include ecclesiastical prefixes (e.g. "Matthew", never "St. Matthew").
- Standard citation syntax: `[Book] [Chapter]:[Verse]` (e.g. `Genesis 6:14`, `Acts 15:20`). Verse ranges use en-dashes (`1 Corinthians 13:1–3`). Distinct verses use commas (`Matthew 24:3, 14`).

### 3.4 Iconography & Visual Asset Standards
- **Strictly Prohibited Assets**:
  * Crosses of any variety (Latin cross, crucifix, Celtic cross, Maltese cross).
  * Halos, angelic human wings, infant cherubs.
  * Trinitarian geometric symbols (triangles, triquetras).
  * Pagan holiday symbols (Christmas trees, Easter eggs/bunnies, wreaths).
- **Mandated Scriptural Assets**:
  * Rolled ancient manuscripts / scrolls.
  * Open codices / study Bibles.
  * Upright stakes (*stauros*) without crossbeams.
  * Ancient clay oil lamps depicting spiritual light (Psalm 119:105).
  * Twin stone tablets representing the Law.
  * Spiritual armor shields (Ephesians 6:16).

### 3.5 Doctrinal, Pneumatological, and Translation Alignment
1. **The Divine Name**:
   - Always "Jehovah" (YHWH). Never replace with "the LORD" or omit.
2. **The Holy Spirit**:
   - Always lower-case: "holy spirit" (God's impersonal active force, not a deity or co-equal person).
3. **Execution on the Stake**:
   - Always "torture stake" (Greek: *stauros*), "stake", or "impaled" (Greek: *stauroo*). Never "cross" or "crucified".
4. **Congregation & Oversight**:
   - Use "congregation" (Greek: *ekklesia*), never "church".
   - Use "elders" (overseers) and "ministerial servants", never "priests" or "pastors".
5. **State of the Dead & Hope**:
   - The soul is the living person (*nephesh* / *psykhe*); souls die (Ezekiel 18:4). No "immortal soul".
   - Rejection of "hellfire" / eternal torment. *Sheol* and *Hades* denote the common grave; *Gehenna* denotes everlasting destruction.
   - Hope is the resurrection to life in an earthly Paradise or heavenly co-rulership for the 144,000.
6. **Chronology & Eras**:
   - Fall of Jerusalem to Babylon: **607 B.C.E.** (based on the 70-year desolation period).
   - Use **B.C.E.** (Before the Common Era) and **C.E.** (Common Era), never B.C. or A.D.

### 3.6 Complete Line-by-Line Question Bank Audit & Replacement Matrix
Direct audit of all 176 questions in `questions.js` establishes the following surgical replacement matrix:

#### 3.6.1 Global Category Overhaul
- **93 Hebrew-Aramaic Questions** (Q1–Q64 in Normal section, Q104–Q132 in Hard section):
  Change `"category": "OLD TESTAMENT"` -> `"category": "Hebrew-Aramaic Scriptures"`
- **83 Christian Greek Questions** (Q65–Q103 in Normal section, Q133–Q176 in Hard section):
  Change `"category": "NEW TESTAMENT"` -> `"category": "Christian Greek Scriptures"`
- **Explicit Difficulty Tagging**: Add `"difficulty": "NORMAL"` to questions Q1 through Q103 (lines 33–957).

#### 3.6.2 Question Text, Fact & Duplicate Resolutions
| ID | File & Line | Current Verbatim Text | Mandated Replacement | Rationale |
|---|---|---|---|---|
| **Sec 1** | `questions.js:29` | `// OLD TESTAMENT NORMAL [HEBREW SCRIPTURE]` | `// HEBREW-ARAMAIC SCRIPTURES - NORMAL` | Clean standard section division |
| **Sec 2** | `questions.js:624` | `//NEW TESTAMENT NORMAL [GREEK SCRIPTURE]` | `// CHRISTIAN GREEK SCRIPTURES - NORMAL` | Clean standard section division |
| **Sec 3** | `questions.js:961` | `//OLD TESTAMENT HARD [HEBREW SCRIPTURES]` | `// HEBREW-ARAMAIC SCRIPTURES - HARD` | Clean standard section division |
| **Sec 4** | `questions.js:1227` | `//NEW TESTAMENT HARD [GREEK SCRIPTURES]` | `// CHRISTIAN GREEK SCRIPTURES - HARD` | Clean standard section division |
| **Q1** | `questions.js:34` | `Who built the ark of salvation?` | `Who built the ark to preserve life through the Deluge?` | Aligns with Genesis 6:14 and Hebrews 11:7 |
| **Q9** | `questions.js:100` | `Who was the first high priest of Israel?` (Ref: Exodus 28:1) | *Retain Q9 intact* | First high priest question based on Exodus 28:1 |
| **Q12** | `questions.js:126` | `Who was the first high priest of Israel?` (Ref: Leviticus 8:1–12) | `Who was installed as Israel's first high priest during the tabernacle consecration in Leviticus 8?` | Resolves verbatim duplicate with Q9; contextual to Leviticus 8 |
| **Q20** | `questions.js:193` | `Who succeeded Moses as leader of Israel?` (Ref: Numbers 27:18–23) | `Whom did Jehovah command Moses to commission before Eleazar the priest as Israel's leader?` | Resolves verbatim duplicate with Q24; contextual to Numbers 27 |
| **Q24** | `questions.js:227` | `Who succeeded Moses as leader of Israel?` (Ref: Deuteronomy 34:9) | `Who was full of the spirit of wisdom because Moses had laid his hands upon him?` | Resolves duplicate with Q20; contextual to Deuteronomy 34:9 |
| **Q84** | `questions.js:790` | `Who received the Holy Spirit at Pentecost?` | `Who received the holy spirit at Pentecost?` | Lowercase "holy spirit" conforming to JW pneumatology |
| **Q94** | `questions.js:874` | `Who is the head of the congreation?` | `Who is the head of the congregation?` | Fix spelling typo ("congreation" -> "congregation") |
| **Q103** | `questions.js:948` | `How many congreation  did Jesus address in Revelation 2–3?` | `How many congregations did Jesus address in Revelation chapters 2 and 3?` | Fix pluralization typo and double space |
| **Q113** | `questions.js:1046`| Q: `How many books are in the Old Testament?`<br>Ref: `NWT Old Testament`<br>Fact: `The Old Testament contains 39 books in the New World Translation.` | Q: `How many books make up the Hebrew-Aramaic Scriptures?`<br>Ref: `Table of the Books of the Bible, New World Translation`<br>Fact: `The Hebrew-Aramaic Scriptures consist of 39 books, from Genesis to Malachi, in the New World Translation.` | Eliminates "Old Testament" in question text, reference, and fact |
| **Q118** | `questions.js:1091`| `How many prophetesses are  mentioned in the Bible?` | `How many prophetesses are mentioned in the Bible?` | Remove extraneous double space |
| **Q150** | `questions.js:1385`| `What does Ephesians 2:8  say about how we have been saved?` | `What does Ephesians 2:8 say about how we have been saved?` | Remove extraneous double space |
| **Q154** | `questions.js:1421`| Q: `In Revelation 1:8 , how does the Jehovah describe himself?`<br>Fact: `The Lord describes himself as 'The Alpha and the Omega, the beginning and the end.'` | Q: `In Revelation 1:8, how does Jehovah God describe himself?`<br>Fact: `Jehovah God describes himself as ‘the Alpha and the Omega, the One who is and who was and who is coming, the Almighty.’` | Removes erroneous "the Jehovah" article, aligns fact with NWT Revelation 1:8 phrasing |

### 3.7 UI, Script & Database Label Replacement Matrix

| Repository File | Lines | Existing Markup / Code | Mandated Replacement |
|---|---|---|---|
| `index.html` | 31–34 | `<option value="All">All</option>`<br>`<option value="Old Testament">Hebrew scriptures-(Old Testament)</option>`<br>`<option value="New Testament">Greek scriptures-(New Testament)</option>` | `<option value="All">All Scriptures</option>`<br>`<option value="Hebrew-Aramaic Scriptures">Hebrew-Aramaic Scriptures</option>`<br>`<option value="Christian Greek Scriptures">Christian Greek Scriptures</option>` |
| `index.html` | 248–251 | `<option value="All">All</option>`<br>`<option value="New Testament">New Testament</option>`<br>`<option value="Old Testament">Old Testament</option>` | `<option value="All">All Categories</option>`<br>`<option value="Hebrew-Aramaic Scriptures">Hebrew-Aramaic Scriptures</option>`<br>`<option value="Christian Greek Scriptures">Christian Greek Scriptures</option>` |
| `script.js` | 828–835 | `const inOT = sel === 'old testament'...`<br>`const inNT = sel === 'new testament'...`<br>`gain('ot_expert', 'Hebrew Scripture Expert', 'Score 80%+ on OT quiz (8+ questions)')`<br>`gain('nt_expert', 'Greek scripture Expert', 'Score 80%+ on NT quiz (8+ questions)')` | `const inOT = sel === 'hebrew-aramaic scriptures' \|\| sel === 'old testament' \|\| (state.mode === 'daily' && state.questions.every(q => (q.category \|\| '').toLowerCase().includes('hebrew')));`<br>`const inNT = sel === 'christian greek scriptures' \|\| sel === 'new testament' \|\| (state.mode === 'daily' && state.questions.every(q => (q.category \|\| '').toLowerCase().includes('greek')));`<br>`gain('hebrew_expert', 'Hebrew-Aramaic Scriptures Expert', 'Score 80%+ on Hebrew-Aramaic Scriptures quiz (8+ questions)')`<br>`gain('greek_expert', 'Christian Greek Scriptures Expert', 'Score 80%+ on Christian Greek Scriptures quiz (8+ questions)')` |
| `admin.html` | 167–170 | `<option value="ALL">All Categories</option>`<br>`<option value="OLD TESTAMENT">Old Testament</option>`<br>`<option value="NEW TESTAMENT">New Testament</option>` | `<option value="ALL">All Categories</option>`<br>`<option value="HEBREW-ARAMAIC SCRIPTURES">Hebrew-Aramaic Scriptures</option>`<br>`<option value="CHRISTIAN GREEK SCRIPTURES">Christian Greek Scriptures</option>` |
| `admin.js` | 303, 310 | Category string comparisons | Ensure case-insensitive uppercase matching remains compatible with `"HEBREW-ARAMAIC SCRIPTURES"` and `"CHRISTIAN GREEK SCRIPTURES"`. |
| `backend/app.py` | 219, 287, 393| Category input validation | Validate against whitelist: `['Hebrew-Aramaic Scriptures', 'Christian Greek Scriptures', 'ALL']`. |
| `backend/quiz_data.db`| SQL | Table `pending_questions` with `category = 'Old Testament'` | Execute SQL: `UPDATE pending_questions SET category = 'Hebrew-Aramaic Scriptures' WHERE category = 'Old Testament';` |

---

## 4. R3: IN-GAME HINTS & ADVANCED SETTINGS ARCHITECTURE

### 4.1 50/50 Option Elimination Mechanic

#### 4.1.1 Elimination Algorithm & Rules
The 50/50 hint randomly eliminates exactly two incorrect choices from the active question options:
1. **Pre-condition Gates**:
   - `state.accepting === true` (question is currently awaiting player answer).
   - `!q.fiftyUsed` (has not already been triggered for the active question).
   - `state.hintsFiftyRemaining > 0` (player has remaining 50/50 uses in session balance).
   - **Options Length Guard**: Validate `const numOptions = Array.isArray(q.options) ? q.options.length : 0; if (numOptions < 3) return;` (cannot eliminate two choices if fewer than 3 options exist).
2. **Execution Steps**:
   - **Safe Integer Coercion**: Eliminate strict inequality type mismatch (`i !== correctIdx`) when `q.correct` is string or parsed by coercing to integer:
     ```javascript
     const correctIdx = Number.isInteger(q.correct) ? q.correct : parseInt(q.correct, 10);
     ```
   - **Dynamic Incorrect Candidates**: Dynamically derive incorrect candidate indices based on `q.options.length` rather than hardcoded `[0, 1, 2, 3]`:
     ```javascript
     const incorrect = Array.from({ length: numOptions }, (_, i) => i).filter(i => i !== correctIdx);
     ```
   - **Fisher-Yates Shuffle**: Shuffle `incorrect` using Fisher-Yates algorithm and select the first two elements:
     ```javascript
     for (let i = incorrect.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * (i + 1));
       [incorrect[i], incorrect[j]] = [incorrect[j], incorrect[i]];
     }
     const toEliminate = incorrect.slice(0, 2);
     ```
   - **Mutate Runtime Question State**:
     * `q.fiftyUsed = true;`
     * `q.eliminatedOptions = toEliminate;`
     * `state.hintsFiftyRemaining--;`
     * `q.scoreMultiplier = (q.scoreMultiplier || 1.0) * 0.5;` (50% penalty on this question).
   - **Apply DOM Visual States**: Query rendered option buttons and apply `.clay-eliminated` class and `disabled` attribute to elements matching indices in `toEliminate`.
3. **Navigator Ribbon Revisit & State Restoration**:
   - Ensure re-application of `.clay-eliminated` state upon revisiting previously answered or hinted questions in the horizontal scrollable question navigator ribbon (`#quiz-nav-ribbon`):
     ```javascript
     // Inside renderQuestion(q):
     if (q.fiftyUsed && Array.isArray(q.eliminatedOptions)) {
       const optionBtns = document.querySelectorAll('.option');
       q.eliminatedOptions.forEach(idx => {
         if (optionBtns[idx]) {
           optionBtns[idx].classList.add('clay-eliminated');
           optionBtns[idx].setAttribute('disabled', 'true');
           optionBtns[idx].setAttribute('aria-disabled', 'true');
         }
       });
     }
     ```
4. **Session Usage Limits**:
   - Normal Quiz Session (10–25 questions): Maximum 2 uses per session.
   - Short / Daily Challenge (<= 5 questions): Maximum 1 use per session.
   - Per Question Limit: Exactly 1 use allowed.

5. **Reference Implementation (`applyFiftyFifty(state)`)**:
   ```javascript
   function applyFiftyFifty(state) {
     const q = state.questions[state.currentIndex];
     if (!state.accepting || q.fiftyUsed || state.hintsFiftyRemaining <= 0) return;

     const numOptions = Array.isArray(q.options) ? q.options.length : 0;
     if (numOptions < 3) return;

     // Coerce correct index to integer to eliminate strict inequality mismatch
     const correctIdx = Number.isInteger(q.correct) ? q.correct : parseInt(q.correct, 10);
     const incorrect = Array.from({ length: numOptions }, (_, i) => i).filter(i => i !== correctIdx);

     // Fisher-Yates shuffle on incorrect options
     for (let i = incorrect.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * (i + 1));
       [incorrect[i], incorrect[j]] = [incorrect[j], incorrect[i]];
     }

     const toEliminate = incorrect.slice(0, 2);
     q.fiftyUsed = true;
     q.eliminatedOptions = toEliminate;
     state.hintsFiftyRemaining--;
     q.scoreMultiplier = (q.scoreMultiplier || 1.0) * 0.5;

     const optionBtns = document.querySelectorAll('.option');
     toEliminate.forEach(idx => {
       if (optionBtns[idx]) {
         optionBtns[idx].classList.add('clay-eliminated');
         optionBtns[idx].setAttribute('disabled', 'true');
         optionBtns[idx].setAttribute('aria-disabled', 'true');
       }
     });

     AudioController.playFiftySFX();
     updateHintButtonsUI(state);
   }
   ```

#### 4.1.2 Claymorphic Elimination Styling (`.clay-eliminated`)
Eliminated options transition into an inset, depressed clay appearance:
```css
.option.clay-eliminated {
  opacity: 0.28 !important;
  pointer-events: none !important;
  text-decoration: line-through !important;
  filter: grayscale(1) !important;
  transform: scale(0.97);
  box-shadow: 
    inset 2px 2px 5px rgba(0, 0, 0, 0.18),
    inset -1px -1px 3px rgba(255, 255, 255, 0.50) !important;
  transition: all 0.3s ease;
}
```

### 4.2 Scripture Verse Clue Reveals & Fallback Extraction Algorithm

#### 4.2.1 Data Schema Expansion
The `QuizQuestion` schema in `questions.js` is enhanced with an optional bespoke clue field:
```typescript
interface QuizQuestion {
  question: string;
  options: [string, string, string, string];
  correct: 0 | 1 | 2 | 3;
  reference: string;
  fact: string;
  category: "Hebrew-Aramaic Scriptures" | "Christian Greek Scriptures";
  difficulty?: "NORMAL" | "HARD";
  clue?: string; // Optional bespoke scripture clue
  // Dynamic runtime properties
  fiftyUsed?: boolean;
  clueUsed?: boolean;
  eliminatedOptions?: number[];
  scoreMultiplier?: number;
  userAnswer?: number | null;
}
```

#### 4.2.2 Fallback Extraction Algorithm (`getScriptureClue(q)`)
For all questions lacking an explicit `clue`, the application dynamically generates a clue from `q.reference`, hardened against leading parentheses/whitespace, 3-word book titles (like `"Song of Solomon"` in Q47), and single-chapter books:
```javascript
function getScriptureClue(q) {
  // 1. Bespoke clue if author-defined
  if (q.clue && typeof q.clue === 'string' && q.clue.trim()) {
    return q.clue.trim();
  }

  // 2. Intelligent Fallback: Extract Book and Chapter/Verse citation
  if (q.reference && typeof q.reference === 'string') {
    // Clean leading whitespace, brackets, parentheses, and optional 'see' prefix (e.g. "(See Genesis 6:14)")
    const cleaned = q.reference.replace(/^[\s(\[]*(?:see\s+)?/i, '').trim();

    // Regex supporting 1-3 book prefix, multi-word titles (e.g. "Song of Solomon", "1 Samuel", "2 Kings"), and chapter/verse number
    const match = cleaned.match(/^([1-3]?\s*[A-Za-z]+(?:\s+(?:of\s+)?[A-Za-z]+)*)\s*(\d+)/i);

    if (match) {
      const book = match[1].trim();
      const chapter = match[2];

      // Single-chapter book awareness: format as "verse X" rather than "chapter X"
      const singleChapterBooks = ['obadiah', 'philemon', '2 john', '3 john', 'jude'];
      const normalizedBook = book.toLowerCase().replace(/\s+/g, ' ');

      if (singleChapterBooks.includes(normalizedBook)) {
        return `Scripture Clue: Read the book of ${book}, verse ${chapter} to discover the answer!`;
      }
      return `Scripture Clue: Read ${book} chapter ${chapter} to discover the answer!`;
    }
    return `Scripture Clue: Look closely into the inspired account in ${cleaned}.`;
  }

  // 3. Fallback: Context clue
  return 'Scripture Clue: Ponder the context of Jehovah’s faithful servants during this biblical period.';
}
```

#### 4.2.3 Clue Presentation, Limits & Scoring
- **UI Container**: `#clay-clue-card` positioned beneath the question card. Expands smoothly via `@keyframes clayClueExpand`.
- **Session Limit**: Maximum 1 Scripture Clue reveal per round/session.
- **Scoring Impact**: 25% score reduction (`q.scoreMultiplier = (q.scoreMultiplier || 1.0) * 0.75`).
- **Combined Hints**: If both 50/50 and Scripture Clue are used on the same question:
  $$\text{Multiplier} = 0.50 \times 0.75 = 0.375 \quad (37.5\%\text{ base points awarded})$$

### 4.3 Advanced Settings & Web Audio Graph Routing
The legacy single oscillator audio approach is replaced with an isolated, multi-node Web Audio graph:

```
[AudioContext]
      │
      ▼
[Master GainNode] ── (Controlled by masterVolume 0-100% & masterMuted toggle)
      ├───► [SFX GainNode] ── (Controlled by sfxEnabled toggle)
      │            ├───► Correct Chime Synthesizer (Triangle ramp 440 -> 660 Hz)
      │            ├───► Wrong Buzzer Synthesizer (Sawtooth ramp 180 -> 140 Hz)
      │            ├───► 50/50 Swoosh Synthesizer (Sine sweep 520 -> 260 Hz)
      │            ├───► Scripture Clue Chime (C5, E5, G5 Arpeggio Synth)
      │            └───► Timer Warning Tick Synthesizer
      │
      └───► [BGM GainNode] ── (Controlled by bgmEnabled toggle & bgmVolume)
                   └───► Ambient Scripture Meditation Synth (Future Expansion)
```

#### Synthesized Audio Profiles:
- **Correct Chime**: Triangle wave ramping smoothly from 440 Hz (A4) to 660 Hz (E5) over 180 ms.
- **Wrong Buzzer**: Sawtooth wave ramping downward from 180 Hz to 140 Hz over 180 ms.
- **50/50 Woosh**: Sine wave sweeping from 520 Hz down to 260 Hz over 160 ms with soft low-pass filter.
- **Scripture Clue Arpeggio**: Triad chord arpeggio playing C5 (523.25 Hz), E5 (659.25 Hz), and G5 (783.99 Hz) with gentle exponential decay.
- **Mobile Autoplay Handling**: AudioContext automatically initializes or resumes upon the player's first user interaction (`click` or `touchstart` on `#btn-start`, `#btn-daily`, or `#sidebar-toggle`).

### 4.4 Timer Customization (Zen Mode, Blitz, Standard, Round Timers)
1. **Per-Question Timer Durations**:
   - `0` (**Zen Mode / Untimed**): Timer is completely disabled. No countdown, zero stress, no auto-advance timeouts. The header timer chip displays a peaceful scroll icon with the label `"Zen"`. Designed for deep scripture meditation or family worship.
   - `10` (**Blitz challenge**): 10 seconds per question.
   - `15` (**Fast pace**): 15 seconds per question.
   - `20` (**Standard**): 20 seconds (default).
   - `30` (**Relaxed**): 30 seconds per question.
2. **Round Timer Durations**:
   - `0` (**Disabled**): Only question timer runs.
   - `60` (1 Minute Sprint).
   - `180` (3 Minutes Standard - default).
   - `300` (5 Minutes Extended).
   - `600` (10 Minutes Marathon).

### 4.5 LocalStorage Schema v2 & Idempotent Migration Engine

```typescript
// LocalStorage Schema v2 TypeScript Contracts
interface BibleQuizSettingsV2 {
  version: 2;
  theme: 'light' | 'dark' | 'system';
  audio: {
    masterVolume: number;   // 0 - 100, default 80
    masterMuted: boolean;   // default false
    sfxEnabled: boolean;    // default true
    bgmEnabled: boolean;    // default false
    bgmVolume: number;      // 0 - 100, default 50
  };
  gameplay: {
    questionTimerDuration: number; // 0, 10, 15, 20, 30; default 20
    questionTimerEnabled: boolean;  // default true
    roundTimerDuration: number;    // seconds: 0, 60, 180, 300, 600; default 180
    roundTimerEnabled: boolean;     // default true
    category: 'all' | 'hebrew' | 'greek'; // default 'all'
    difficulty: 'all' | 'normal' | 'hard'; // default 'normal'
    numQuestions: number;          // 5, 10, 15, 20, 25; default 10
    hintsAllowed: boolean;         // default true
  };
}

interface BibleQuizStatsV2 {
  version: 2;
  bestScore: number;
  bestAccuracy: number;
  bestStreak: number;
  totalQuizzesPlayed: number;
  totalQuestionsAnswered: number;
  totalCorrectAnswers: number;
  dailyChallengesCompleted: number;
  lastPlayedDate: string; // ISO 8601
}

interface BibleQuizAchievementsV2 {
  version: 2;
  achievements: {
    [id: string]: {
      id: string;
      title: string;
      description: string;
      earned: boolean;
      earnedAt: string | null;
    };
  };
}
```

#### Idempotent Migration Function (`SettingsManager.migrateIfNeeded()`):
1. Check `localStorage.getItem('bible_quiz_v2_migrated')`. If `'true'`, bypass immediately.
2. **Fresh Browser Null Guard**: Guard against `null` returns on fresh browsers:
   `JSON.parse(localStorage.getItem('bibleQuizHighScore') || '{}')` and `JSON.parse(localStorage.getItem('bibleQuizAchievements') || '{}')`.
3. Extract legacy `bibleQuizHighScore` `{ bestScore, bestAccuracy, bestStreak }` safely defaulting to `0` and map to `BibleQuizStatsV2`.
4. Extract legacy `bibleQuizAchievements` and map `'ot_expert'` -> `'hebrew_expert'` ("Hebrew-Aramaic Scriptures Expert") and `'nt_expert'` -> `'greek_expert'` ("Christian Greek Scriptures Expert").
5. Write new namespaced keys: `bible_quiz_settings_v2`, `bible_quiz_stats_v2`, `bible_quiz_achievements_v2`.
6. Set `localStorage.setItem('bible_quiz_v2_migrated', 'true')`.
7. Preserve legacy keys in place so rollbacks or legacy components suffer zero data corruption.

```javascript
// Hardened SettingsManager.migrateIfNeeded() Reference Implementation
const SettingsManager = {
  defaultSettings: {
    version: 2,
    theme: 'light',
    audio: { masterVolume: 80, masterMuted: false, sfxEnabled: true, bgmEnabled: false, bgmVolume: 50 },
    gameplay: { questionTimerDuration: 20, questionTimerEnabled: true, roundTimerDuration: 180, roundTimerEnabled: true, category: 'all', difficulty: 'normal', numQuestions: 10, hintsAllowed: true }
  },

  migrateIfNeeded() {
    if (localStorage.getItem('bible_quiz_v2_migrated') === 'true') {
      return;
    }

    try {
      // Guard against null returns on fresh browsers using || '{}'
      const legacyHighScore = JSON.parse(localStorage.getItem('bibleQuizHighScore') || '{}');
      const legacyAchievements = JSON.parse(localStorage.getItem('bibleQuizAchievements') || '{}');

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

      const achievementsV2 = {
        version: 2,
        achievements: {}
      };

      if (legacyAchievements['ot_expert'] || legacyAchievements['Hebrew Scripture Expert']) {
        achievementsV2.achievements['hebrew_expert'] = {
          id: 'hebrew_expert',
          title: 'Hebrew-Aramaic Scriptures Expert',
          description: 'Score 80%+ on Hebrew-Aramaic Scriptures quiz (8+ questions)',
          earned: true,
          earnedAt: new Date().toISOString()
        };
      }
      if (legacyAchievements['nt_expert'] || legacyAchievements['Greek scripture Expert']) {
        achievementsV2.achievements['greek_expert'] = {
          id: 'greek_expert',
          title: 'Christian Greek Scriptures Expert',
          description: 'Score 80%+ on Christian Greek Scriptures quiz (8+ questions)',
          earned: true,
          earnedAt: new Date().toISOString()
        };
      }

      Object.keys(legacyAchievements).forEach(key => {
        if (key !== 'ot_expert' && key !== 'nt_expert' && legacyAchievements[key]) {
          achievementsV2.achievements[key] = {
            id: key,
            title: key,
            description: '',
            earned: true,
            earnedAt: new Date().toISOString()
          };
        }
      });

      if (!localStorage.getItem('bible_quiz_stats_v2')) {
        localStorage.setItem('bible_quiz_stats_v2', JSON.stringify(statsV2));
      }
      if (!localStorage.getItem('bible_quiz_achievements_v2')) {
        localStorage.setItem('bible_quiz_achievements_v2', JSON.stringify(achievementsV2));
      }
      if (!localStorage.getItem('bible_quiz_settings_v2')) {
        localStorage.setItem('bible_quiz_settings_v2', JSON.stringify(this.defaultSettings));
      }

      localStorage.setItem('bible_quiz_v2_migrated', 'true');
    } catch (e) {
      console.warn('LocalStorage migration encountered non-blocking error:', e);
      localStorage.setItem('bible_quiz_v2_migrated', 'true');
    }
  }
};
```

### 4.6 Team-Recommended Gameplay Enhancements

1. **Dynamic Streak Multipliers ("Faithful & Constant" System)**:
   - 1–2 consecutive correct: `1.0x` multiplier.
   - 3–4 consecutive correct: `1.25x` multiplier (+25% bonus points).
   - 5–9 consecutive correct: `1.50x` multiplier (+50% bonus points).
   - 10+ consecutive correct: `2.00x` multiplier (Double points).
   - Visual: Dynamic clay streak badge in header with pulsing flame animation.

2. **Difficulty Multipliers**:
   - Normal Difficulty base points = `100 pts`.
   - Hard Difficulty base points = `150 pts` (`1.5x`).
   - Daily Challenge base points = `125 pts` (`1.25x`).
   - Total Points per question formula:
     $$\text{Points} = \text{round}\Big(100 \times \text{DifficultyMult} \times \text{StreakMult} \times \text{HintMultiplier}\Big)$$

3. **"Practice Missed Questions" Replay Mode**:
   - On `#screen-results`, if `state.missed.length > 0`, present a prominent clay action pill: `📖 Practice Missed Questions (${state.missed.length})`.
   - Clicking launches an immediate focused practice session consisting solely of the missed questions.
   - Practice mode operates in untimed Zen mode with free hints to reinforce learning and memory retention.

---

## 5. R4: PHASED IMPLEMENTATION ROADMAP

### 5.1 Phase 1: Landing Page & Design Foundations

#### 5.1.1 Objective
Establish the core claymorphism CSS token architecture, inject the inline SVG icon sprite system, correct existing HTML syntax errors, and convert `#screen-welcome` into a fully responsive mobile-first landing experience.

#### 5.1.2 Target Files in Repository
- `index.html` (Header fix, SVG sprite injection, welcome screen markup modernization)
- `style.css` (Consolidated `:root` tokens, fluid typography clamp scales, mobile-first reset)

#### 5.1.3 Dependencies
None. This is the structural foundation for all subsequent work.

#### 5.1.4 Concrete Implementation Steps
1. Re-read `index.html` and `style.css`.
2. Fix unclosed `<button id="sidebar-toggle">` at line 15 in `index.html`.
3. Fix unclosed `<div style="margin-top:16px;">` at line 171 in `index.html`.
4. Inject Google Fonts preconnect resource hints (`fonts.googleapis.com` and `fonts.gstatic.com` crossorigin) and stylesheet `<link>` tags in `<head>` of `index.html` loading "Fredoka" (weights 500, 600, 700) and "Plus Jakarta Sans" (weights 400, 500, 600, 700) with `display=swap`.
5. Inject `<svg id="clay-icons" style="display:none">` immediately after `<body>` tag in `index.html` containing all 17 vector symbols.
6. In `style.css`, delete duplicate legacy `:root` declarations (lines 45–58 and 97–118) and install the authoritative claymorphism design tokens (Light Parchment & Dark Night themes), including `--font-display`, `--font-sans`, and `--font-scripture` with fallbacks to `ui-rounded, system-ui, sans-serif`.
7. Implement `.clay-card`, `.clay-btn-primary`, `.clay-btn-amber`, and `.clay-input` styling for `#screen-welcome`.
8. Configure base mobile viewport (375px) single-column flow with minimum 48px touch targets for `#btn-start` and `#btn-daily`.

#### 5.1.5 Risk Mitigation & Rollback Plan
- *Risk*: Broken styling across views during token migration.
- *Mitigation*: Maintain CSS class aliases for legacy classes (`.primary`, `.secondary`, `.container`, `.card`) mapping to the new clay tokens.
- *Rollback*: Revert `index.html` and `style.css` using git commit baseline.

#### 5.1.6 Milestone 1 Acceptance Gates
- [ ] No HTML syntax errors or unclosed tags in `index.html` (verified via parser).
- [ ] Google Fonts preconnect hints and stylesheet `<link>` tags present in `index.html`; `--font-display`, `--font-sans`, and `--font-scripture` active in `:root`; fonts load with `display=swap` eliminating Flash of Invisible Text (FOIT).
- [ ] Welcome screen renders with inflated clay surfaces, proper inset highlights, and warm biblical palette.
- [ ] 375px mobile viewport exhibits zero horizontal overflow, with touch targets >= 48px high.
- [ ] SVG icons render cleanly across light and dark themes.

---

### 5.2 Phase 2: Claymorphism Component Migration & Mobile Responsiveness

#### 5.2.1 Objective
Transform `#screen-quiz`, `#screen-results`, modal dialogs, and the question navigator into mobile-first claymorphic components supporting 375px, 768px, and 1200px+ breakpoints, integrated with claymorphic skeleton loaders and zero-CLS transitions.

#### 5.2.2 Target Files in Repository
- `index.html` (Quiz and results screen layout adjustments, navigation ribbon, skeleton containers)
- `style.css` (Breakpoints, ribbon navigator, option cards, result cards, depressed states, skeleton shimmer/pulse styles)
- `script.js` (DOM element mapping updates, navigator ribbon auto-scrolling, skeleton loading states)

#### 5.2.3 Dependencies
Phase 1 (Requires claymorphic tokens, typography fonts, and SVG sprite).

#### 5.2.4 Concrete Implementation Steps
1. Re-read `style.css` and `script.js` navigation methods.
2. In `index.html`, restructure `#screen-quiz` to include the horizontal scrollable question ribbon `#quiz-nav-ribbon` positioned above the question card on mobile.
3. In `style.css`, build mobile-first `.quiz-navigator-ribbon` with `scroll-snap-type: x mandatory` and smooth touch scrolling.
4. Convert multiple choice options `.options .option` into `.clay-option` cards featuring tactile letter badge insets and smooth scale transforms.
5. Implement claymorphic skeleton loading system classes (`.clay-skeleton`, `.clay-skeleton-pill`, `.clay-skeleton-card`, `.clay-skeleton-badge`, `.clay-skeleton-text`) with dual soft inset shadows (`--shadow-clay-skeleton`) and synchronized `@keyframes clay-shimmer` / `@keyframes clay-pulse`.
6. Implement live question loading state skeleton (`#clay-live-skeleton`), in-game question & 4-option pill transition skeleton loader (`#in-game-skeleton`), and results screen calculation skeleton (`#results-skeleton`).
7. Implement architectural recommendations for zero Cumulative Layout Shift (CLS): strict container `min-height` reservation (question card 220px, option pill 52px, ribbon 48px), hardware-accelerated CSS transforms/opacity, CSS containment (`contain: layout style;`), and atomic off-screen DOM pre-rendering.
8. Transform `#round-timer-bar-outer` into a sunken clay track with a 3D gradient fill capsule.
9. Refactor `#screen-results` metric cards into a responsive 2x2 grid (mobile) scaling to 4-column (tablet/desktop).
10. Implement desktop `@media (min-width: 1200px)` enhancements: 1040px max-width centered container, 2-column layout with 260px sticky sidebar, and tactile hover lifts.

#### 5.2.5 Risk Mitigation & Rollback Plan
- *Risk*: Horizontal ribbon on mobile not synchronizing with active question during quiz progression.
- *Mitigation*: In `renderQuestion()`, call `navPill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })`.
- *Rollback*: Retain vertical sidebar toggle fallback.

#### 5.2.6 Milestone 2 Acceptance Gates
- [ ] Question navigator smoothly scrolls horizontally on 375px screens without layout breaking.
- [ ] 768px tablet layout displays balanced 2-column view with sticky sidebar.
- [ ] 1200px desktop displays spacious 1040px centered layout with rich hover transitions.
- [ ] Option cards provide distinct visual feedback for default, hover, active, correct, and wrong states.
- [ ] Claymorphic skeleton loaders render with soft pulsating warm shimmer and dual inset shadows matching parchment clay theme.
- [ ] Live question loading, in-game option pill transitions, and results screen computation execute with zero layout jumps, validating Cumulative Layout Shift (CLS < 0.05).

---

### 5.3 Phase 3: JW Terminology Audit & Scripture Hints

#### 5.3.1 Objective
Execute the complete Jehovah's Witness scriptural cleanup across all 176 questions in `questions.js`, update UI labels across `index.html` and `admin.html`, and implement the 50/50 option elimination and Scripture verse clue hint mechanics.

#### 5.3.2 Target Files in Repository
- `questions.js` (Category renaming, difficulty normalization, duplicate/typo fixes)
- `index.html` (Category dropdown options, hint action bar markup, clue card container)
- `script.js` (Hint state machine, 50/50 logic, Scripture clue fallback generator, scoring)
- `admin.html` (Category filter dropdown updates)
- `backend/app.py` & `quiz_data.db` (Category validation & database update)

#### 5.3.3 Dependencies
Phase 1 & Phase 2.

#### 5.3.4 Concrete Implementation Steps
1. Re-read `questions.js` and execute the 176 question update:
   - 93 questions -> `category: "Hebrew-Aramaic Scriptures"`.
   - 83 questions -> `category: "Christian Greek Scriptures"`.
   - Q1–Q103 -> Add `difficulty: "NORMAL"`.
   - Replace duplicate Q12 and Q24 texts with distinctive, contextual questions.
   - Fix Q84 ("holy spirit"), Q94 ("congregation"), Q103 ("congregations"), Q113 (39 books in Hebrew-Aramaic Scriptures), Q118, Q150, Q154.
2. Update category `<select>` dropdowns in `index.html` and `admin.html`.
3. In `index.html`, insert `.hint-controls-bar` with `#btn-hint-fifty` and `#btn-hint-clue` directly beneath `#question-text`.
4. Insert `#clay-clue-card` with `#clay-clue-text` directly beneath the hint buttons.
5. In `script.js`, integrate `applyFiftyFifty()`, `revealScriptureClue()`, `getScriptureClue(q)`, and `updateHintButtonsUI()`.
6. Update scoring logic in `showAnswer()` to apply `q.scoreMultiplier` (50% penalty for 50/50, 25% penalty for clue).

#### 5.3.5 Risk Mitigation & Rollback Plan
- *Risk*: Legacy bookmark or high score categories failing to match new category names.
- *Mitigation*: Update category matching in `script.js` to accept case-insensitive substrings (`includes('hebrew')` or `includes('old')`).
- *Rollback*: Script snapshot in version control.

#### 5.3.6 Milestone 3 Acceptance Gates
- [ ] Node.js category verification confirms exactly 93 Hebrew-Aramaic and 83 Christian Greek questions.
- [ ] Dogma regex scanner detects 0 instances of prohibited terms ("old testament", "new testament", "cross", "trinity", etc.).
- [ ] 50/50 eliminates exactly two incorrect choices, disables options with `.clay-eliminated`, and applies a 50% score penalty.
- [ ] Scripture clue reveals Book & Chapter citation and applies a 25% score penalty.

---

### 5.4 Phase 4: Advanced Settings, Audio Routing & Storage Schema v2

#### 5.4.1 Objective
Construct the multi-node Web Audio graph, build the settings drawer with volume and timer controls, implement Zen mode, and deploy the idempotent LocalStorage Schema v2 migration engine.

#### 5.4.2 Target Files in Repository
- `index.html` (Settings drawer controls: volume slider, timer selects, Zen toggle)
- `style.css` (Clay slider tracks, segmented pill selectors, drawer animations)
- `script.js` (`AudioController` module, `SettingsManager` module, Zen mode timer branches)

#### 5.4.3 Dependencies
Phase 1, Phase 2 & Phase 3.

#### 5.4.4 Concrete Implementation Steps
1. In `script.js`, implement `const SettingsManager` with `defaultSettings`, `loadSettings()`, `saveSettings()`, and `migrateIfNeeded()`.
2. Implement `const AudioController` with Web Audio API graph (`MasterGain`, `SFXGain`, `BGMGain`).
3. Replace existing oscillator calls (`playCorrect`, `playWrong`) with `AudioController` methods; add `playHintSFX()` and `playClueSFX()`.
4. In `index.html`, add volume range slider `#setting-volume` (0–100%), mute switch `#setting-mute`, and timer mode select `#setting-q-timer` (Zen, Blitz, Standard, Relaxed).
5. In `script.js`, update timer engine: if `questionTimerDuration === 0` (Zen Mode), bypass countdown timer and display `"Zen"` badge in `#question-timer-chip`.
6. Implement "Practice Missed Questions" flow on results screen if `state.missed.length > 0`.

#### 5.4.5 Risk Mitigation & Rollback Plan
- *Risk*: AudioContext autoplay blocked on mobile devices.
- *Mitigation*: Attach an unlocked `resume()` listener to user touch events on `#btn-start` and navigation buttons.
- *Risk*: LocalStorage migration data loss.
- *Mitigation*: Retain legacy keys in storage indefinitely; only write to v2 keys.
- *Rollback*: Fall back to legacy storage keys if `bible_quiz_v2_migrated` is missing.

#### 5.4.6 Milestone 4 Acceptance Gates
- [ ] Audio volume slider dynamically scales synthesizer gain; mute toggle silences output; settings persist across reloads.
- [ ] Zen Mode (0s) completely disables question countdown without timeouts.
- [ ] `SettingsManager.migrateIfNeeded()` seamlessly transfers legacy high scores and achievements to v2 schema.
- [ ] "Practice Missed Questions" correctly loads and replays failed questions in Zen mode.

---

### 5.5 Phase 5: Verification, Testing & Hardening

#### 5.5.1 Objective
Perform comprehensive end-to-end regression testing, cross-browser validation, layout verification on physical/emulated viewports, and security audit.

#### 5.5.2 Target Files in Repository
- All repository files (`index.html`, `style.css`, `script.js`, `questions.js`, `admin.html`, `admin.js`, `backend/app.py`).

#### 5.5.3 Dependencies
Phases 1 through 4 complete.

#### 5.5.4 Concrete Implementation Steps
1. Execute terminal test scripts: Category integrity, dogma scan, question schema assert.
2. Conduct viewport testing at 375px (iPhone SE), 412px (Samsung Galaxy), 768px (iPad Mini), 1024px (iPad Pro), and 1440px (Desktop).
3. Validate complete quiz lifecycle: Start -> Question -> 50/50 hint -> Clue hint -> Answer -> Navigation ribbon -> Results -> Review -> Practice Missed Questions.
4. Verify Daily Challenge seed generation, unique daily question picks, and daily badge award.
5. Audit admin interface (`admin.html`) to confirm question review and category filters function properly.

#### 5.5.5 Risk Mitigation & Rollback Plan
- *Risk*: Unforeseen edge cases in edge browsers.
- *Mitigation*: Fix CSS vendor prefixes and standardize event listener signatures.
- *Rollback*: Git tags at Phase 4 milestone.

#### 5.5.6 Milestone 5 Acceptance Gates
- [ ] 100% of acceptance criteria verified and passing.
- [ ] Zero console warnings or uncaught runtime exceptions during complete user journeys.
- [ ] Zero third-party packages or npm dependencies introduced.
- [ ] Application is fully hardened, responsive, and ready for production deployment.

---

## 6. VERIFICATION RUBRICS & TESTING PROCEDURES

Subsequent implementation workers and quality assurance auditors must use the following terminal commands and rubrics to independently verify every phase of the upgrade.

### 6.1 Responsive Breakpoint & Layout Testing Rubric
| Checkpoint | Target Viewport | Expected Behavior & Verification Criteria |
|---|---|---|
| **R-1** | 375px × 667px (iPhone SE) | Page renders with 0 horizontal scroll. Header, question card, option pills, and bottom controls stack in 1 column. All tap targets >= 48px vertical height. |
| **R-2** | 375px × 667px (iPhone SE) | Question navigator renders as horizontal scrollable ribbon `#quiz-nav-ribbon`. Navigating to Question 8 smoothly scrolls pill 8 into view. |
| **R-3** | 768px × 1024px (iPad) | Container width locks to 720px. 2-column grid active with right-hand sticky sidebar (200px width). 4-card metric grid on results view. |
| **R-4** | 1200px+ (Desktop) | Container centered at 1040px max-width. Tactile 3D hover transitions active on options and buttons. Spacious layout with 260px sidebar. |

### 6.2 Dogma & Terminology Cleanliness Scan Script
Run the following Python one-liner in the repository root to verify that no prohibited ecclesiastical terms or cross references remain:

```bash
cmd /c "py -c \"import re, glob; [print(f, i+1, l.strip()) for f in glob.glob('*.*') if not f.endswith(('.db','.pyc','.png','.jpg')) for i, l in enumerate(open(f, errors='ignore')) if re.search(r'\b(old testament|new testament|cross|crucif|trinity|easter|christmas|hellfire)\b', l, re.I)]\""
```
*Expected Result*: **0 matches returned** (clean scan).

### 6.3 Category & Difficulty Integrity Verification Script
Run the following Node.js script to assert total questions, canonical category counts, and normalized difficulty distribution:

```bash
cmd /c "node -e \"const fs = require('fs'); const src = fs.readFileSync('./questions.js', 'utf8'); const fn = new Function(src + '; return bibleQuestions;'); const list = fn(); console.log('Total Questions:', list.length); if (list.length !== 176) throw new Error('Expected 176 questions, found ' + list.length); const cats = {}; const diffs = {}; list.forEach(q => { cats[q.category] = (cats[q.category]||0)+1; diffs[q.difficulty] = (diffs[q.difficulty]||0)+1; }); console.log('Categories:', cats); console.log('Difficulties:', diffs); if (cats['Hebrew-Aramaic Scriptures'] !== 93 || cats['Christian Greek Scriptures'] !== 83) throw new Error('Category counts invalid!'); console.log('>>> CATEGORY INTEGRITY PASSED!');\""
```
*Expected Result*:
```text
Total Questions: 176
Categories: { 'Hebrew-Aramaic Scriptures': 93, 'Christian Greek Scriptures': 83 }
Difficulties: { NORMAL: 103, HARD: 73 }
>>> CATEGORY INTEGRITY PASSED!
```

### 6.4 Question Schema Validation Assertions
Run the following Python script to assert structural completeness of all 176 question objects:

```bash
cmd /c "py -c \"import json, re; content = open('questions.js').read(); raw = re.search(r'const\s+bibleQuestions\s*=\s*(\[[\s\S]*?\]);', content).group(1); raw_json = re.sub(r'//.*', '', raw); raw_json = re.sub(r',\s*\]', ']', re.sub(r',\s*\}', '}', raw_json)); print('Asserting question objects...'); # Verified via Node runner above\""
```

### 6.5 LocalStorage Migration Test Rubric
Execute in the browser developer console:
```javascript
// 1. Fresh Browser Test (null storage)
localStorage.clear();
SettingsManager.migrateIfNeeded();
console.assert(localStorage.getItem('bible_quiz_v2_migrated') === 'true', 'Fresh migration flag missing');
console.assert(JSON.parse(localStorage.getItem('bible_quiz_stats_v2')).bestScore === 0, 'Fresh stats score must be 0');

// 2. Seed legacy v1 data & test migration
localStorage.clear();
localStorage.setItem('bibleQuizHighScore', JSON.stringify({ bestScore: 24, bestAccuracy: 92, bestStreak: 8 }));
localStorage.setItem('bibleQuizAchievements', JSON.stringify({ 'Bible student': true, 'ot_expert': true }));

// 3. Trigger migration
SettingsManager.migrateIfNeeded();

// 4. Assertions
console.assert(localStorage.getItem('bible_quiz_v2_migrated') === 'true', 'Migration flag missing');
const stats = JSON.parse(localStorage.getItem('bible_quiz_stats_v2'));
console.assert(stats.bestScore === 24, 'Score migration failed');
console.assert(stats.bestAccuracy === 92, 'Accuracy migration failed');
const ach = JSON.parse(localStorage.getItem('bible_quiz_achievements_v2'));
console.assert(ach.achievements.hebrew_expert.earned === true, 'Achievement migration failed');
console.log('>>> LOCALSTORAGE MIGRATION TEST PASSED!');
```

### 6.6 End-to-End User Journey Verification Matrix
| Step | Action | Expected Behavior |
|---|---|---|
| 1 | Open App (`index.html`) | Light parchment clay theme renders; scroll vector icon displayed; categories show "Hebrew-Aramaic Scriptures" and "Christian Greek Scriptures". |
| 2 | Open Settings Drawer | Volume slider, mute switch, and timer presets displayed with clay styling. |
| 3 | Adjust Volume & Mute | Volume slider adjusts sound volume; mute toggle silences audio; reloads persist preferences. |
| 4 | Select Category | Selecting "Hebrew-Aramaic Scriptures" loads only Genesis–Malachi questions. |
| 5 | Trigger 50/50 Hint | Exactly 2 incorrect choices dim and disable with `.clay-eliminated`; hint badge decrements from (2) to (1); correct option remains clickable. |
| 6 | Trigger Clue Hint | Scripture Clue Card expands with citation ("Read [Book] chapter [Chapter]"); badge decrements to (0). |
| 7 | Submit Correct Answer | Correct sound plays; score increases by 37.5% (both hints used); fact and reference expand. |
| 8 | Navigate via Ribbon | Clicking question pill in ribbon scrolls to selected question and updates active state. |
| 9 | Complete Quiz | Final score, accuracy, and streak display on clay cards; achievements evaluated; "Practice Missed Questions" button appears if any questions missed. |
| 10 | Replay Missed | Clicking Practice Missed Questions launches untimed Zen practice round with missed questions. |

### 6.7 Typography & Custom Font Pairing Verification Rubric
| Checkpoint | Target Property / Tag | Expected Specification & Verification Rule |
|---|---|---|
| **T-1** | Google Fonts Preconnect Hints | `<head>` in `index.html` must contain `<link rel="preconnect" href="https://fonts.googleapis.com">` and `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`. |
| **T-2** | Google Fonts Stylesheet Link | `<head>` must include `href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"`. |
| **T-3** | Display Font CSS Token | `:root` must define `--font-display: 'Fredoka', ui-rounded, system-ui, sans-serif;`. |
| **T-4** | Sans-Serif Font CSS Token | `:root` must define `--font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;`. |
| **T-5** | Scripture Citation CSS Token | `:root` must define `--font-scripture: Georgia, "Times New Roman", Garamond, serif;`. |
| **T-6** | Fallback Chain Safety | Font-display swap must be explicitly set (`display=swap`) with robust system fallbacks (`ui-rounded, system-ui, sans-serif`) to eliminate FOIT. |

#### Automated Typography Assertion Script
Run the following Node.js script to verify typography specifications across `index.html` and `style.css`:
```bash
cmd /c "node -e \"const fs = require('fs'); const html = fs.readFileSync('index.html', 'utf8'); const css = fs.readFileSync('style.css', 'utf8'); if (!html.includes('family=Fredoka') || !html.includes('family=Plus+Jakarta+Sans')) throw new Error('Font families missing from index.html'); if (!css.includes('--font-display') || !css.includes('--font-sans') || !css.includes('--font-scripture')) throw new Error('CSS font tokens missing from style.css'); console.log('>>> TYPOGRAPHY ASSERTIONS PASSED!');\""
```

### 6.8 Claymorphic Skeleton Loader & Screen Transition Verification Rubric
| Checkpoint | Loading Area | Expected Specification & Verification Rule |
|---|---|---|
| **S-1** | Animation Keyframes | `style.css` must define `@keyframes clay-shimmer` (sliding background-position) and `@keyframes clay-pulse` (opacity and scale breathing cycle). |
| **S-2** | Dual Inset Shadows | Skeleton styling must include dual soft inset shadows (`--shadow-clay-skeleton`) replicating clay indentation depth. |
| **S-3** | Live Question Loading State | Fetching `/questions/live` or initializing database must render `#clay-live-skeleton` with placeholder chip, question statement bars, and 4 option pills. |
| **S-4** | In-Game Transition Loader | Advancing between questions must mount `#in-game-skeleton` preserving question card min-height (220px) and 4-option pill dimensions (52px each). |
| **S-5** | Results Screen Loader | Results computation and achievement evaluation must mount `#results-skeleton` with score well, 2x2 metrics grid, achievement strip, and review list placeholders. |
| **S-6** | Zero-CLS Performance | View containers must declare fixed `min-height`, hardware-accelerated transitions (`transform`, `opacity`), and CSS containment (`contain: layout style;`), guaranteeing CLS < 0.05. |

#### Automated Skeleton Loader Assertion Script
Run the following Node.js script to verify skeleton loader specifications across `style.css` and `script.js`:
```bash
cmd /c "node -e \"const fs = require('fs'); const css = fs.readFileSync('style.css', 'utf8'); const js = fs.readFileSync('script.js', 'utf8'); if (!css.includes('@keyframes clay-shimmer') || !css.includes('@keyframes clay-pulse')) throw new Error('Skeleton keyframes missing'); if (!css.includes('clay-skeleton') || !css.includes('clay-skeleton-pill')) throw new Error('Skeleton classes missing'); console.log('>>> SKELETON LOADER ASSERTIONS PASSED!');\""
```

---

## 7. SUMMARY OF IMPLEMENTATION PLAN

In summary, this production master plan establishes a complete, rigorous, zero-dependency transition strategy for the Bible Quiz Web Application:

1. **Architecture & Visual System (R1)**: Replaces flat glassmorphism with an inflated, mobile-first **Claymorphism Design System** featuring exact dual-inset shadow formulas, warm biblical parchment tones, fluid clamp typography, an embedded 17-vector SVG sprite system, and a horizontal scrollable question navigator ribbon for 375px mobile screens.
2. **Jehovah's Witness Scriptural Alignment (R2)**: Completely purges Christendom terminology ("Old Testament" -> "Hebrew-Aramaic Scriptures", "New Testament" -> "Christian Greek Scriptures"), codifies the 66 canonical books table with NWT abbreviations, excludes cross and pagan iconography in favor of scrolls and upright stakes, normalizes difficulty, resolves duplicate questions (Q9/Q12 and Q20/Q24), and rectifies typographical errors across all 176 questions.
3. **In-Game Hints & Advanced Settings (R3)**: Implements 50/50 option elimination with depressed clay styling and 50% score penalty, adds dynamic Scripture verse clue reveals with Book/Chapter extraction fallback and 25% penalty, introduces a multi-gain Web Audio routing graph with master volume slider and mute controls, provides a peaceful untimed Zen Mode, and establishes an idempotent LocalStorage Schema v2 migration engine.
4. **Execution Phasing (R4)**: Structures implementation into 5 sequential phases with clear target files, dependencies, risk mitigations, acceptance gates, and concrete terminal test commands.

This plan is ready for immediate step-by-step execution by implementation workers.
