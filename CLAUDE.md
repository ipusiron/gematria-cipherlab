# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Gematria CipherLab is an educational gematria calculator supporting multiple cipher schemes with token-based analysis and step-by-step trace visualization.

## Supported Gematria Schemes

- **Simple English A=0**: A-Z, single character tokens, A=0
- **Simple English A=1**: A-Z, single character tokens, A=1
- **English ×6**: A-Z, single character tokens, exactly six times English Ordinal
- **Simple Latin23**: I/J merged, U/V merged, single character tokens
- **Agrippa 23**: Single character tokens, J→I, U→V, W is undefined (excluded with warning)
- **Agrippa 27-slot transcription**: U=200, J=600, V=700, HI=800, HV=900; longest-match tokenization; W treated as HV
- **Hebrew Standard**: Hebrew letters א-ת, values 1-400; final forms keep ordinary-letter values; points are ignored

## Core Architecture

### Calculation Pipeline
1. Unicode normalization (NFKC for Latin methods, NFKD for Hebrew)
2. Tokenization (scheme-specific rules)
3. Numeric assignment
4. Summation

### Token States
- **Included**: Token participates in calculation
- **Excluded**: Undefined token (with warning)
- **Aliased/Normalized**: Normalized form included

### UI Structure (per ui_spec.md)
- Header with tool name and complete English/Japanese switching
- Tab bar: Basics / English & Latin / Agrippa / Hebrew
- Main area: Input, settings, results
- Footer: GitHub link

### Trace Visualization (3 steps)
1. **Tokenization**: Token boundaries with state highlighting
2. **Mapping**: Token → numeric value correspondence
3. **Summation**: Human-readable formula with excluded tokens listed separately

## Development Guidelines

### Technology Stack
- Plain HTML/CSS/JavaScript (no frameworks unless explicitly requested)
- Mobile-first responsive design

### CSS Architecture
- Base styles at mobile width (360-414px)
- Breakpoints: 600px (tablet), 900px (laptop/PC)
- Optional file split: `style.css`, `style-mobile.css`, `style-tablet.css`, `style-laptop.css`
- Use `gap` for child element spacing, `margin` for container positioning
- Units: `rem`/`em` preferred over `px`

### HTML Requirements
- `lang="ja"` attribute
- `meta viewport` required
- Semantic elements: `<header>`, `<main>`, `<section>`, `<button>`

### JavaScript
- Vanilla JS with `querySelector` and `addEventListener`
- Click/tap-first UI (avoid hover-dependent interactions)
- Keep calculations in `gematria-core.js` without DOM dependencies
- Render user-controlled text with `textContent`; do not introduce HTML-string insertion
- Keep Japanese and English keys synchronized in `messages.js`

### Verification
- Run `npm test` without installing dependencies
- Verify `file://` operation as well as HTTP/HTTPS publication
- Check 320, 390, 600, 768, and 1280 pixel widths for overflow and overlap
