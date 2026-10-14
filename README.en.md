English · [日本語](README.md)

# Gematria CipherLab - Gematria Calculation Trace Tool

![GitHub Repo stars](https://img.shields.io/github/stars/ipusiron/gematria-cipherlab?style=social)
![GitHub forks](https://img.shields.io/github/forks/ipusiron/gematria-cipherlab?style=social)
![GitHub last commit](https://img.shields.io/github/last-commit/ipusiron/gematria-cipherlab)
![GitHub license](https://img.shields.io/github/license/ipusiron/gematria-cipherlab)
[![GitHub Pages](https://img.shields.io/badge/demo-GitHub%20Pages-blue?logo=github)](https://ipusiron.github.io/gematria-cipherlab/)

**Day109 - Security Tools Built with Generative AI 200**

Gematria CipherLab is a browser-only educational tool for examining eight letter-value methods through normalization, tokenization, value assignment, and summation. It also provides same-writing-system comparison, line and whitespace-segment breakdowns, verified JSON loading, and share URLs that omit input by default.

## 🌐 Live Demo

👉 [Open Gematria CipherLab](https://ipusiron.github.io/gematria-cipherlab/)

No installation is required. Text is processed only in the browser and is not sent elsewhere. The complete interface can be switched between English and Japanese.

## 📸 Screenshot

![Multiline breakdown and comparison of the Hebrew methods](assets/en/screenshot.png)

*Inspecting multiline input by line and whitespace segment while comparing Hebrew Standard and Final Values*

## ✨ Features

- Use eight methods and automatically compare methods for the same writing system
- Inspect the input, substituted tokens, values, and total step by step
- Distinguish included, substituted, excluded, and ignored input
- Switch an on-screen keyboard between Hebrew Standard and final values from 500 to 900
- Copy or save reproducible JSON with the method ID, method version, trace, and comparison
- Recompute saved JSON and restore it only when the total, trace, and comparison match
- Break multiline input down by physical line and whitespace-delimited segment
- Share only the language and method, or explicitly opt in to including the input
- Switch the complete interface between English and Japanese and save the preference
- Use a mobile-first interface from a width of 320 pixels
- Run without external libraries, external APIs, or a build process

## 🎯 Use Cases

- Show why `שלום` is 376 in Hebrew Standard and 936 when final mem is counted as 600
- Place English Ordinal 111 and English ×6 666 side by side for `COMPUTER`
- Compare the treatment of I/J, U/V, HI, HV, and excluded letters in Agrippa 23 and the 27-slot transcription
- Observe Hebrew ordinary forms, final forms, points, and presentation forms
- Save versioned JSON so a lesson, article, or manual check carries its calculation conditions
- Load saved JSON to verify that its total or trace was not rewritten
- Put `שלום חי` and `אמת` on separate lines to inspect line and whitespace-segment totals
- Share the selected language and method with a collaborator without placing the input text in the URL

## 📖 Included Methods

| Screen | Method | Rule summary |
|---|---|---|
| English & Latin | English Zero-based | A=0 to Z=25 |
| English & Latin | English Ordinal | A=1 to Z=26 |
| English & Latin | English ×6 | Six times each English Ordinal value (A=6 to Z=156) |
| English & Latin | Latin 23 | Counts 23 letters from 1 to 23, J→I, U→V, and excludes W |
| Agrippa | Agrippa 23 | A–I=1–9, K–S=10–90, and T/V/X/Y/Z=100–500 |
| Agrippa | Agrippa 27-slot | U=200, J=600, V=700, HI=800, HV=900, and W→HV |
| Hebrew | Hebrew Standard | Counts 22 letters from 1 to 400, with the same values for final forms |
| Hebrew | Hebrew Final Values | Keeps ordinary letters at 1–400 and assigns final ך, ם, ן, ף, and ץ to 500–900 |

### Agrippa 23 and the 27-slot transcription

Agrippa 23 uses the 23 letters in the source table. In modern spelling, J is substituted with I, U with V, and W is excluded because it is not in the table.

Agrippa 27-slot is this tool’s transcription design for mapping the source table’s final “consonantal I,” “consonantal V,” “HI,” and “HV” entries to J, V, HI, and HV in modern input. U is 200, J is 600, V is 700, and W is substituted with HV=900. This design does not infer whether I or V in an original spelling was a vowel or consonant.

HI and HV are compound tokens only when contiguous. For example, `HI` is 800, while `H I` is 8+9=17.

### Hebrew Standard and final values from 500 to 900

The method maps א through ת to standard values from 1 through 400. The final forms ך, ם, ן, ף, and ץ have the same values as כ, מ, נ, פ, and צ. Input is normalized with NFKD, and points and cantillation marks are ignored without a warning. Therefore, `שָׁלוֹם` and `שלום` both total 376, and the presentation form `שׁ` decomposes and is calculated as ש=300.

Hebrew Final Values is a separate method that counts only the five final forms as ך=500, ם=600, ן=700, ף=800, and ץ=900. Thus `שלום` is 376 when final mem is 40 in Standard and 936 when it is 600 in Final Values. `חי`, which has no final form, remains 18 in both. This is a method difference, not a score that declares one result more correct.

## 🔬 Calculation Trace

The result is shown in three stages.

1. Tokenization: splits the input into method-specific tokens and marks substitutions, exclusions, and ignored characters
2. Value assignment: shows each included token and its value
3. Total: shows the addition and final total

| State | Meaning |
|---|---|
| Included | Defined by the method and added to the total |
| Normalized or substituted | Added after J→I, W→HV, Unicode normalization, or another stated transformation |
| Excluded | A letter that the selected method does not define |
| Ignored | Spaces, punctuation, digits, Hebrew points, cantillation marks, and similar separators or marks |

Input is limited to 10,000 characters. English and Latin methods apply NFKC and uppercase conversion; the Hebrew method applies NFKD. Spaces, tabs, and line breaks are ignored as separators. Enter inserts a line break, while Ctrl/Command+Enter calculates.

Below the total, the interface reports the total, included count, and excluded count for each physical line and whitespace-delimited segment. This is not linguistic word segmentation. Cards then compare every method for the same writing system against the selected reference. Differences are numeric only; equality or proximity is not scored as meaning or confidence.

Copy Result includes the method name, method ID, method version, trace, line breakdown, and comparison. Save JSON writes the complete analysis in the machine-readable `gematria-cipherlab.analysis` format. The JSON omits timestamps so the same input and method reproduce the same file content. Load JSON accepts a file of up to 1 MB with `formatVersion: 1`, recomputes it from the input and method, and restores it only when every field matches.

A share URL contains only the interface language and method by default. The input is added only when Include the input text in the URL is selected, and a URL longer than 4,000 characters is rejected. A URL containing input may remain in browser history and at its destination.

## ⚠️ Limitations of the Result

An equal total does not prove a semantic relationship, prediction, authenticity, or cryptographic security. Results depend on the selected method, spelling, transcription, and Unicode normalization.

This tool is a calculator for checking letter-value correspondences. It does not judge historical or religious interpretations and cannot provide encryption or authentication. Recalculation during JSON loading is an internal consistency check, not a digital signature, author authentication, or third-party proof of tampering. It cannot detect a JSON file regenerated with matching input and results.

## 🔒 Security and Privacy

- Processes input in the browser without storing or transmitting it
- Renders user input with `textContent` and `replaceChildren()`
- Declares a CSP including `script-src 'self'` and `connect-src 'none'`
- Recursively freezes calculation tables and results against runtime mutation
- Generates copied text and JSON entirely in the browser without sending it to an external service
- Treats loaded JSON values as untrusted and requires a complete match after recomputation
- Omits input from share URLs by default and requires an explicit on-screen choice to include it
- Loads no external libraries

GitHub Pages does not let this repository set HTTP response headers such as `X-Frame-Options`. Because `frame-ancestors` is also ineffective in an HTML CSP meta element, the public page does not guarantee that embedding is blocked.

## 🚀 Usage

1. Choose English & Latin, Agrippa, or Hebrew.
2. Select a method when the tab offers more than one.
3. Enter text or choose a preset. Enter can be used for multiline input.
4. Select Calculate or press Ctrl/Command+Enter, then inspect the trace, line breakdown, cross-method comparison, and reference table.
5. Copy the result or save reproducible JSON when needed. Load JSON verifies and restores a saved file.
6. Before copying a share URL, choose whether to include the input. The default URL contains only the language and method.

For local use, open `index.html` directly. You can also serve the directory from a local HTTP server; no build step is required.

## 🧪 Tests

With Node.js 22 or later, run the tests without installing dependencies.

```console
npm test
```

The suite covers representative values for all eight methods, Agrippa longest matching and boundaries, Hebrew normalization and final values from 500 to 900, tabs and line breaks, line breakdowns, method comparison, JSON recomputation and inconsistent-file rejection, data immutability, English/Japanese message parity, and HTML/CSP requirements.

## 📁 Directory Structure

```text
gematria-cipherlab/
├── .github/
│   └── workflows/
│       └── test.yml          # Runs tests with Node.js 22
├── assets/
│   ├── en/
│   │   └── screenshot.png    # English interface screenshot
│   └── screenshot.png        # Japanese interface screenshot
├── docs/
│   ├── detailed_design.md    # Calculation core and data-processing design
│   └── ui_spec.md            # Interface, interaction, and responsive specification
├── test/
│   ├── core.test.js          # Calculation-core tests
│   ├── html.test.js          # HTML and CSP tests
│   ├── i18n.test.js          # English/Japanese message tests
│   └── readme.test.js        # README synchronization tests
├── gematria-core.js          # DOM-independent calculation core
├── messages.js               # English and Japanese messages
├── script.js                 # Interface control and result rendering
├── style.css                 # Mobile-first styles
├── index.html                # Application screen
├── README.md                 # Japanese README
├── README.en.md              # English README
├── CLAUDE.md                 # Development rules and architecture
├── package.json              # Test command
└── LICENSE                   # MIT License
```

## 🔗 References

- [Agrippa, *De occulta philosophia*, Book II, Chapter XX](https://www.alchemy-texts.com/book/three-books-of-occult-philosophy/)
- [Internet Archive: *De Occulta Philosophia* (1533 edition)](https://archive.org/details/DeOccultaPhilosophiaLoc1533)
- [Jewish Encyclopedia: “Gematria”](https://www.jewishencyclopedia.com/articles/6571-gematria)
- [Jewish Encyclopedia: “Arithmetic”](https://www.jewishencyclopedia.com/articles/1776-arithmetic)
- [Unicode Names List: Hebrew](https://unicode.org/Public/18.0.0/charts/nameslist/0590/)
- [Unicode Names List: Alphabetic Presentation Forms](https://www.unicode.org/Public/UCD/latest/charts/nameslist/fb00/)

## 📄 License

This project uses the MIT License. See [LICENSE](LICENSE) for details.

## 🛠️ About This Tool

This tool is Day109 of the “Security Tools Built with Generative AI 200” project. See [Security Tools Built with Generative AI 200](https://akademeia.info/?page_id=44607) for the overall project and other tools.
