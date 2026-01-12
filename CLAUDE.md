# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Gematria CipherLab is an educational gematria calculator supporting multiple cipher schemes with token-based analysis and step-by-step trace visualization.

## Supported Gematria Schemes

- **Simple English A=0**: A-Z, single character tokens, A=0
- **Simple English A=1**: A-Z, single character tokens, A=1
- **English Gematria**: A-Z, single character tokens, A=6 (multiples of 6)
- **Simple Latin23**: I/J merged, U/V merged, single character tokens
- **Agrippa 23**: Single character tokens, J→I, U→V, W is undefined (excluded with warning)
- **Agrippa 27**: Single + multi-character tokens (HI, HV), longest-match tokenization, W treated as HV
- **Hebrew Gematria**: Hebrew letters א-ת, values 1-400, includes final forms

## Core Architecture

### Calculation Pipeline
1. Normalization
2. Tokenization (scheme-specific rules)
3. Numeric assignment
4. Summation

### Token States
- **Included**: Token participates in calculation
- **Excluded**: Undefined token (with warning)
- **Aliased/Normalized**: Normalized form included

### UI Structure (per ui_spec.md)
- Header with tool name
- Tab bar: English / Agrippa / Hebrew
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
- Use `requestAnimationFrame` for animations
