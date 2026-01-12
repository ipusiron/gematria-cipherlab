/**
 * Gematria CipherLab - Multi-scheme Gematria Calculator
 */

// ============================================
// Internationalization (i18n)
// ============================================

let currentLang = 'ja';

const I18N = {
  en: {
    'header.desc': 'Multi-scheme gematria calculator with token-based analysis and step-by-step trace visualization.',
    'tab.basics': 'Basics',
    'tab.simple': 'English',
    'tab.agrippa': 'Agrippa',
    'tab.hebrew': 'Hebrew',
    'basics.whatIs': 'What is Gematria?',
    'basics.whatIsDesc': 'Gematria is a method of assigning numerical values to letters, used to interpret the numerical meaning of words and names. It is not merely a way to write numbers, but an interpretive technique for uncovering hidden meanings in words through their numerical values.',
    'basics.origins': 'Origins',
    'basics.originsDesc': 'Originally a mystical and Kabbalistic practice in Hebrew, similar systems also developed in Greek (Isopsephy). Today, it has been extended to English and other languages.',
    'basics.howToUse': 'How to Use This Tool',
    'basics.step1': 'Select the calculation scheme from the tabs above',
    'basics.step2': 'Enter text in the input field (or select a preset)',
    'basics.step3': 'Press "Calculate" to see results in 3 steps: Tokenization → Value Assignment → Total',
    'basics.schemes': 'Supported Schemes',
    'basics.englishDesc': 'Uses English alphabet (A-Z). Includes Simple (A=1), Zero-indexed (A=0), and multiples of 6 schemes.',
    'basics.agrippaDesc': '16th century classical Latin gematria by Agrippa. Uses Hebrew numerical system.',
    'basics.hebrewDesc': 'Original gematria. Maps 22 Hebrew letters to values 1-400. Includes on-screen keyboard.',
    'scheme.label': 'Scheme:',
    'scheme.simpleEnglish': 'Simple English A=1 (A=1, B=2, ...Z=26)',
    'scheme.simpleEnglish0': 'Simple English A=0 (A=0, B=1, ...Z=25)',
    'scheme.simpleLatin23': 'Simple Latin23 (I/J, U/V merged)',
    'scheme.englishGematria': 'English Gematria (A=6, B=12, ...Z=156)',
    'scheme.agrippa23': 'Agrippa 23 (Classical Latin)',
    'scheme.agrippa27': 'Agrippa 27 (Extended with HI, HV)',
    'scheme.hebrewGematria': 'Hebrew Gematria (א=1, ב=2, ...)',
    'hebrew.keyboardLabel': 'Hebrew Letter Input:',
    'hebrew.units': 'Units (1-9)',
    'hebrew.tens': 'Tens (10-90)',
    'hebrew.hundreds': 'Hundreds (100-400)',
    'hebrew.clear': 'Clear',
    'hebrew.backspace': 'Backspace',
    'input.label': 'Input Text:',
    'input.presetDefault': '-- Preset Examples --',
    'input.placeholder': 'Enter text to calculate...',
    'input.calculate': 'Calculate',
    'warnings.title': 'Warnings',
    'results.title': 'Calculation Trace',
    'results.step1': 'Step 1: Tokenization',
    'results.step2': 'Step 2: Mapping',
    'results.step3': 'Step 3: Summation',
    'legend.included': 'Included',
    'legend.excluded': 'Excluded',
    'legend.normalized': 'Normalized',
    'reference.title': 'Reference Table',
    'reference.token': 'Token',
    'reference.value': 'Value',
    'reference.excluded': 'Excluded',
    'reference.normalizations': 'Normalizations',
    'modal.close': 'Close',
    'result.total': 'Total',
    'result.noValidTokens': '(No valid tokens)',
    'result.excludedFrom': 'Excluded from calculation',
    'warning.excludedChars': 'Excluded characters (not defined in {scheme})'
  },
  ja: {
    'header.desc': '複数のゲマトリア方式に対応した計算ツール。トークン分析とステップごとのトレース表示機能付き。',
    'tab.basics': '基礎',
    'tab.simple': '英語',
    'tab.agrippa': 'アグリッパ',
    'tab.hebrew': 'ヘブライ',
    'basics.whatIs': 'ゲマトリアとは？',
    'basics.whatIsDesc': 'ゲマトリアは、文字に数値を割り当て、言葉や名前の数値的意味を解釈する手法です。単なる「数を表記する方法」ではなく、言葉に隠された意味を数値から読み解く解釈の手法です。',
    'basics.origins': '起源',
    'basics.originsDesc': '元来はヘブライ語の神秘主義的・カバラ的な実践でしたが、ギリシャ（イソプセフィア）でも同様のシステムが発展し、現在では英語など他の言語にも拡張されています。',
    'basics.howToUse': 'このツールの使い方',
    'basics.step1': '上のタブから計算したい方式を選択',
    'basics.step2': '入力欄にテキストを入力（またはプリセットを選択）',
    'basics.step3': '「計算」ボタンを押すと、トークン化→数値割当→合計の3ステップで結果を表示',
    'basics.schemes': '対応方式',
    'basics.englishDesc': '英語アルファベット(A-Z)を使用。Simple(A=1)、Zero-indexed(A=0)、6の倍数方式など。',
    'basics.agrippaDesc': '16世紀のアグリッパによる古典ラテン語ゲマトリア。ヘブライ数値体系を使用。',
    'basics.hebrewDesc': '本来のゲマトリア。ヘブライ文字22文字を1〜400の数値に対応。オンスクリーンキーボード付き。',
    'scheme.label': '方式:',
    'scheme.simpleEnglish': 'Simple English A=1 (A=1, B=2, ...Z=26)',
    'scheme.simpleEnglish0': 'Simple English A=0 (A=0, B=1, ...Z=25)',
    'scheme.simpleLatin23': 'Simple Latin23 (I/J, U/V 統合)',
    'scheme.englishGematria': 'English Gematria (A=6, B=12, ...Z=156)',
    'scheme.agrippa23': 'Agrippa 23 (古典ラテン語)',
    'scheme.agrippa27': 'Agrippa 27 (HI, HV拡張)',
    'scheme.hebrewGematria': 'Hebrew Gematria (א=1, ב=2, ...)',
    'hebrew.keyboardLabel': 'ヘブライ文字入力:',
    'hebrew.units': '1の位 (1-9)',
    'hebrew.tens': '10の位 (10-90)',
    'hebrew.hundreds': '100の位 (100-400)',
    'hebrew.clear': 'クリア',
    'hebrew.backspace': '1文字削除',
    'input.label': '入力テキスト:',
    'input.presetDefault': '-- プリセット例 --',
    'input.placeholder': '計算するテキストを入力...',
    'input.calculate': '計算',
    'warnings.title': '警告',
    'results.title': '計算トレース',
    'results.step1': 'Step 1: トークン化',
    'results.step2': 'Step 2: 数値割当',
    'results.step3': 'Step 3: 合計計算',
    'legend.included': '計算対象',
    'legend.excluded': '除外',
    'legend.normalized': '正規化',
    'reference.title': '参照テーブル',
    'reference.token': 'トークン',
    'reference.value': '数値',
    'reference.excluded': '除外',
    'reference.normalizations': '正規化',
    'modal.close': '閉じる',
    'result.total': '合計',
    'result.noValidTokens': '（有効なトークンなし）',
    'result.excludedFrom': '計算から除外',
    'warning.excludedChars': '除外された文字（{scheme}で未定義）'
  }
};

function t(key, params = {}) {
  let text = I18N[currentLang][key] || I18N['en'][key] || key;
  for (const [k, v] of Object.entries(params)) {
    text = text.replace(`{${k}}`, v);
  }
  return text;
}

function applyI18n() {
  // Apply translations to elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });

  // Apply placeholder translations
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = t(key);
  });

  // Update scheme notes and reference table
  updateSchemeNote();
  updatePresets();
  updateReferenceTable();
}

// ============================================
// Scheme Definitions
// ============================================

const SCHEMES = {
  'simple-english': {
    name: 'Simple English (A=1)',
    description: {
      en: 'A–Z mapped to 1–26. All letters are included.',
      ja: 'A〜Zを1〜26に対応。すべての文字が計算対象。'
    },
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    tokenType: 'single',
    mapping: {},
    normalizations: {},
    info: {
      en: `
        <p>Simple English gematria assigns sequential values to the 26-letter English alphabet.</p>
        <ul>
          <li>A = 1, B = 2, C = 3, ... Z = 26</li>
          <li>All 26 letters are valid</li>
          <li>Non-alphabetic characters are ignored</li>
        </ul>
      `,
      ja: `
        <p>Simple English ゲマトリアは、26文字の英語アルファベットに連番の数値を割り当てます。</p>
        <ul>
          <li>A = 1, B = 2, C = 3, ... Z = 26</li>
          <li>26文字すべてが有効</li>
          <li>アルファベット以外の文字は無視</li>
        </ul>
      `
    }
  },
  'simple-english-0': {
    name: 'Simple English (A=0)',
    description: {
      en: 'A–Z mapped to 0–25. Zero-indexed version.',
      ja: 'A〜Zを0〜25に対応。ゼロ始まり版。'
    },
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    tokenType: 'single',
    mapping: {},
    normalizations: {},
    info: {
      en: `
        <p>Zero-indexed Simple English gematria.</p>
        <ul>
          <li>A = 0, B = 1, C = 2, ... Z = 25</li>
          <li>All 26 letters are valid</li>
          <li>Non-alphabetic characters are ignored</li>
        </ul>
      `,
      ja: `
        <p>ゼロ始まりの Simple English ゲマトリア。</p>
        <ul>
          <li>A = 0, B = 1, C = 2, ... Z = 25</li>
          <li>26文字すべてが有効</li>
          <li>アルファベット以外の文字は無視</li>
        </ul>
      `
    }
  },
  'simple-latin23': {
    name: 'Simple Latin23',
    description: {
      en: 'Classical Latin 23-letter alphabet with I/J and U/V merged. W is excluded.',
      ja: 'I/J統合、U/V統合の古典ラテン語23文字。Wは除外。'
    },
    alphabet: 'ABCDEFGHIKLMNOPQRSTVXYZ',
    tokenType: 'single',
    mapping: {},
    normalizations: { 'J': 'I', 'U': 'V' },
    excluded: ['W'],
    info: {
      en: `
        <p>Classical Latin used only 23 letters. J and U were introduced later.</p>
        <ul>
          <li>J is treated as I (J→I)</li>
          <li>U is treated as V (U→V)</li>
          <li>W is excluded (not in classical Latin)</li>
          <li>Values: A=1, B=2, ... I/J=9, K=10, ... V/U=20, X=21, Y=22, Z=23</li>
        </ul>
      `,
      ja: `
        <p>古典ラテン語は23文字のみを使用。JとUは後に追加されました。</p>
        <ul>
          <li>JはIとして扱う（J→I）</li>
          <li>UはVとして扱う（U→V）</li>
          <li>Wは除外（古典ラテン語に存在しない）</li>
          <li>数値: A=1, B=2, ... I/J=9, K=10, ... V/U=20, X=21, Y=22, Z=23</li>
        </ul>
      `
    }
  },
  'english-gematria': {
    name: 'English Gematria',
    description: {
      en: 'A–Z mapped to multiples of 6 (A=6, B=12, ... Z=156). Also known as English Sumerian.',
      ja: 'A〜Zを6の倍数に対応（A=6, B=12, ... Z=156）。English Sumerianとも呼ばれる。'
    },
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    tokenType: 'single',
    mapping: {},
    normalizations: {},
    info: {
      en: `
        <p>English Gematria assigns values in multiples of 6 to the English alphabet.</p>
        <ul>
          <li>A = 6, B = 12, C = 18, ... Z = 156</li>
          <li>Also known as English Sumerian Gematria</li>
          <li>Originated in 19th-20th century occultism (Aleister Crowley et al.)</li>
          <li>Often used to find words equaling 666 (e.g., COMPUTER = 666)</li>
          <li>A modern artificial system, not historical cryptography</li>
        </ul>
      `,
      ja: `
        <p>English Gematriaは、英語アルファベットに6の倍数を割り当てます。</p>
        <ul>
          <li>A = 6, B = 12, C = 18, ... Z = 156</li>
          <li>English Sumerian Gematriaとも呼ばれる</li>
          <li>19〜20世紀の近代オカルティズムで考案（アレイスター・クロウリーら）</li>
          <li>666になる単語を探す用途で有名（例：COMPUTER = 666）</li>
          <li>古代からの伝統ではなく、近代の人工的システム</li>
        </ul>
      `
    }
  },
  'hebrew-gematria': {
    name: 'Hebrew Gematria',
    description: {
      en: 'Classical Hebrew gematria. 22 letters mapped to 1-400.',
      ja: '古典的ヘブライ・ゲマトリア。22文字を1〜400に対応。'
    },
    alphabet: 'אבגדהוזחטיכלמנסעפצקרשת',
    tokenType: 'single',
    mapping: {
      'א': 1, 'ב': 2, 'ג': 3, 'ד': 4, 'ה': 5, 'ו': 6, 'ז': 7, 'ח': 8, 'ט': 9,
      'י': 10, 'כ': 20, 'ל': 30, 'מ': 40, 'נ': 50, 'ס': 60, 'ע': 70, 'פ': 80, 'צ': 90,
      'ק': 100, 'ר': 200, 'ש': 300, 'ת': 400,
      // Final forms (same values)
      'ך': 20, 'ם': 40, 'ן': 50, 'ף': 80, 'ץ': 90
    },
    normalizations: {},
    isRTL: true,
    info: {
      en: `
        <p>Classical Hebrew Gematria assigns numerical values to the 22 Hebrew letters.</p>
        <ul>
          <li>Units (1-9): א to ט</li>
          <li>Tens (10-90): י to צ</li>
          <li>Hundreds (100-400): ק to ת</li>
          <li>Final forms (ך, ם, ן, ף, ץ) have same values as regular forms</li>
          <li>Used in Kabbalah and Jewish mysticism</li>
        </ul>
        <p><strong>Example:</strong> חי (chai, life) = 8 + 10 = 18</p>
      `,
      ja: `
        <p>古典的ヘブライ・ゲマトリアは、22のヘブライ文字に数値を割り当てます。</p>
        <ul>
          <li>1の位（1-9）: א〜ט</li>
          <li>10の位（10-90）: י〜צ</li>
          <li>100の位（100-400）: ק〜ת</li>
          <li>語末形（ך, ם, ן, ף, ץ）は通常形と同じ値</li>
          <li>カバラ、ユダヤ神秘主義で使用</li>
        </ul>
        <p><strong>例：</strong> חי（chai、生命）= 8 + 10 = 18</p>
      `
    }
  },
  'agrippa-23': {
    name: 'Agrippa 23',
    description: {
      en: 'J→I, U→V conversion. W is undefined (excluded). Hebrew numerical system.',
      ja: 'J→I, U→V に変換。Wは未定義（除外）。ヘブライ数値体系。'
    },
    alphabet: 'ABCDEFGHIKLMNOPQRSTVXYZ',
    tokenType: 'single',
    mapping: {},
    normalizations: { 'J': 'I', 'U': 'V' },
    excluded: ['W'],
    useAgrippaValues: true,
    info: {
      en: `
        <p>Heinrich Cornelius Agrippa's system maps Latin letters to Hebrew letter values.</p>
        <ul>
          <li>J is treated as I (J→I)</li>
          <li>U is treated as V (U→V)</li>
          <li>W is excluded</li>
          <li>Uses Hebrew numerical values (1-9, 10-90, 100-500)</li>
        </ul>
      `,
      ja: `
        <p>ハインリッヒ・コルネリウス・アグリッパの体系。ラテン文字をヘブライ文字の数値に対応付けます。</p>
        <ul>
          <li>JはIとして扱う（J→I）</li>
          <li>UはVとして扱う（U→V）</li>
          <li>Wは除外</li>
          <li>ヘブライ数値体系を使用（1-9, 10-90, 100-500）</li>
        </ul>
      `
    }
  },
  'agrippa-27': {
    name: 'Agrippa 27',
    description: {
      en: 'Extended with compound tokens HI, HV. W→HV conversion. Longest-match tokenization.',
      ja: '複合トークンHI, HVを含む拡張版。W→HV変換。最長一致でトークン化。'
    },
    alphabet: 'ABCDEFGHIKLMNOPQRSTVXYZ',
    tokenType: 'longest-match',
    compoundTokens: ['HI', 'HV'],
    mapping: {},
    normalizations: { 'J': 'I', 'U': 'V', 'W': 'HV' },
    useAgrippaValues: true,
    info: {
      en: `
        <p>Extended Agrippa system that includes compound tokens for Greek-origin sounds.</p>
        <ul>
          <li>HI and HV are compound tokens with special values</li>
          <li>W is converted to HV</li>
          <li>J→I, U→V (before tokenization)</li>
          <li>Tokenization uses longest-match from left to right</li>
          <li>27 total tokens including compounds</li>
        </ul>
      `,
      ja: `
        <p>ギリシャ語由来の音を表す複合トークンを含む拡張アグリッパ体系。</p>
        <ul>
          <li>HIとHVは特別な値を持つ複合トークン</li>
          <li>WはHVに変換</li>
          <li>J→I, U→V（トークン化前に変換）</li>
          <li>左から最長一致でトークン化</li>
          <li>複合トークンを含め計27トークン</li>
        </ul>
      `
    }
  }
};

// Agrippa values based on Hebrew letter numerical values
const AGRIPPA_VALUES = {
  'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
  'K': 10, 'L': 20, 'M': 30, 'N': 40, 'O': 50, 'P': 60, 'Q': 70, 'R': 80, 'S': 90,
  'T': 100, 'V': 200, 'X': 300, 'Y': 400, 'Z': 500,
  'HI': 600, 'HV': 700
};

// Initialize scheme mappings
function initializeSchemeMappings() {
  // Simple English (A=1): A=1 to Z=26
  const simpleEnglish = SCHEMES['simple-english'];
  for (let i = 0; i < 26; i++) {
    simpleEnglish.mapping[String.fromCharCode(65 + i)] = i + 1;
  }

  // Simple English (A=0): A=0 to Z=25
  const simpleEnglish0 = SCHEMES['simple-english-0'];
  for (let i = 0; i < 26; i++) {
    simpleEnglish0.mapping[String.fromCharCode(65 + i)] = i;
  }

  // Simple Latin23: Sequential 1-23
  const latin23 = SCHEMES['simple-latin23'];
  for (let i = 0; i < latin23.alphabet.length; i++) {
    latin23.mapping[latin23.alphabet[i]] = i + 1;
  }

  // English Gematria: Multiples of 6 (A=6, B=12, ... Z=156)
  const englishGematria = SCHEMES['english-gematria'];
  for (let i = 0; i < 26; i++) {
    englishGematria.mapping[String.fromCharCode(65 + i)] = (i + 1) * 6;
  }

  // Agrippa 23: Hebrew-based values
  const agrippa23 = SCHEMES['agrippa-23'];
  for (const letter of agrippa23.alphabet) {
    agrippa23.mapping[letter] = AGRIPPA_VALUES[letter];
  }

  // Agrippa 27: Hebrew-based values + compound tokens
  const agrippa27 = SCHEMES['agrippa-27'];
  for (const letter of agrippa27.alphabet) {
    agrippa27.mapping[letter] = AGRIPPA_VALUES[letter];
  }
  agrippa27.mapping['HI'] = AGRIPPA_VALUES['HI'];
  agrippa27.mapping['HV'] = AGRIPPA_VALUES['HV'];

  // Freeze objects to prevent modification
  Object.freeze(I18N);
  Object.freeze(I18N.en);
  Object.freeze(I18N.ja);
  Object.values(SCHEMES).forEach(scheme => Object.freeze(scheme));
  Object.freeze(SCHEMES);
}

// ============================================
// Preset Examples
// ============================================

const PRESETS = {
  'simple-english': [
    { label: 'HELLO', value: 'HELLO' },
    { label: 'WORLD', value: 'WORLD' },
    { label: 'GEMATRIA', value: 'GEMATRIA' }
  ],
  'simple-english-0': [
    { label: 'HELLO', value: 'HELLO' },
    { label: 'WORLD', value: 'WORLD' },
    { label: 'GEMATRIA', value: 'GEMATRIA' }
  ],
  'simple-latin23': [
    { label: 'ROMA', value: 'ROMA' },
    { label: 'CAESAR', value: 'CAESAR' },
    { label: 'JULIUS', value: 'JULIUS' }
  ],
  'english-gematria': [
    { label: 'HELLO', value: 'HELLO' },
    { label: 'GEMATRIA', value: 'GEMATRIA' },
    { label: 'COMPUTER', value: 'COMPUTER' }
  ],
  'agrippa-23': [
    { label: 'ABRACADABRA', value: 'ABRACADABRA' },
    { label: 'ALPHA', value: 'ALPHA' },
    { label: 'OMEGA', value: 'OMEGA' }
  ],
  'agrippa-27': [
    { label: 'IHVH (Tetragrammaton)', value: 'IHVH' },
    { label: 'JEHOVA', value: 'JEHOVA' },
    { label: 'CHRISTVS', value: 'CHRISTVS' }
  ],
  'hebrew-gematria': [
    { label: 'חי (chai, 18)', value: 'חי' },
    { label: 'שלום (shalom, 376)', value: 'שלום' },
    { label: 'אמת (emet, 441)', value: 'אמת' }
  ]
};

// ============================================
// Calculation Engine
// ============================================

/**
 * Token states
 */
const TokenState = {
  INCLUDED: 'included',
  EXCLUDED: 'excluded',
  NORMALIZED: 'normalized'
};

/**
 * Normalize text: uppercase and remove non-letters
 */
function normalize(text) {
  return text.toUpperCase();
}

/**
 * Apply scheme-specific character normalizations (J→I, U→V, W→HV)
 */
function applyNormalizations(text, scheme) {
  const normalizations = scheme.normalizations || {};
  let result = '';
  const changes = [];

  for (const char of text) {
    if (normalizations[char]) {
      result += normalizations[char];
      changes.push({ from: char, to: normalizations[char] });
    } else {
      result += char;
    }
  }

  return { text: result, changes };
}

/**
 * Tokenize text based on scheme rules
 */
/**
 * Check if character is valid for the scheme
 */
function isValidChar(char, scheme) {
  // Check if it's in the mapping
  if (scheme.mapping[char] !== undefined) return true;
  // Check for Latin letters (for Latin-based schemes)
  if (/[A-Z]/.test(char)) return true;
  // Check for Hebrew letters
  if (/[\u0590-\u05FF]/.test(char)) return true;
  return false;
}

function tokenize(text, schemeId) {
  const scheme = SCHEMES[schemeId];
  const tokens = [];
  // For Hebrew, don't uppercase (Hebrew has no case)
  const normalized = scheme.isRTL ? text : normalize(text);
  const { text: normalizedText, changes } = applyNormalizations(normalized, scheme);

  // Track original positions for normalized characters
  const normalizedChars = new Set(changes.map(c => c.from));

  if (scheme.tokenType === 'longest-match' && scheme.compoundTokens) {
    // Longest match tokenization for Agrippa 27
    let i = 0;
    let originalIndex = 0;

    while (i < normalizedText.length) {
      const char = normalizedText[i];

      // Skip non-alphabetic characters
      if (!isValidChar(char, scheme)) {
        i++;
        originalIndex++;
        continue;
      }

      // Try compound tokens first (longest match)
      let matched = false;
      for (const compound of scheme.compoundTokens.sort((a, b) => b.length - a.length)) {
        if (normalizedText.substring(i, i + compound.length) === compound) {
          // Check if this was a W→HV conversion
          const originalChar = normalized[originalIndex];
          const wasNormalized = originalChar === 'W' || normalizedChars.has(normalized[originalIndex]);

          tokens.push({
            token: compound,
            original: originalChar === 'W' ? 'W' : compound,
            value: scheme.mapping[compound],
            state: wasNormalized ? TokenState.NORMALIZED : TokenState.INCLUDED
          });
          i += compound.length;
          originalIndex += originalChar === 'W' ? 1 : compound.length;
          matched = true;
          break;
        }
      }

      if (!matched) {
        // Single character token
        const originalChar = normalized[originalIndex];
        const isNormalized = normalizedChars.has(originalChar);

        if (scheme.mapping[char] !== undefined) {
          tokens.push({
            token: char,
            original: originalChar,
            value: scheme.mapping[char],
            state: isNormalized ? TokenState.NORMALIZED : TokenState.INCLUDED
          });
        } else if (scheme.excluded && scheme.excluded.includes(char)) {
          tokens.push({
            token: char,
            original: originalChar,
            value: null,
            state: TokenState.EXCLUDED
          });
        } else if (isValidChar(char, scheme)) {
          tokens.push({
            token: char,
            original: originalChar,
            value: null,
            state: TokenState.EXCLUDED
          });
        }
        i++;
        originalIndex++;
      }
    }
  } else {
    // Single character tokenization
    let originalIndex = 0;
    for (let i = 0; i < normalizedText.length; i++) {
      const char = normalizedText[i];
      const originalChar = normalized[originalIndex];

      // Skip non-valid characters
      if (!isValidChar(char, scheme)) {
        originalIndex++;
        continue;
      }

      const isNormalized = normalizedChars.has(originalChar);

      if (scheme.mapping[char] !== undefined) {
        tokens.push({
          token: char,
          original: originalChar,
          value: scheme.mapping[char],
          state: isNormalized ? TokenState.NORMALIZED : TokenState.INCLUDED
        });
      } else if (scheme.excluded && scheme.excluded.includes(originalChar)) {
        tokens.push({
          token: originalChar,
          original: originalChar,
          value: null,
          state: TokenState.EXCLUDED
        });
      } else if (isValidChar(char, scheme)) {
        tokens.push({
          token: char,
          original: originalChar,
          value: null,
          state: TokenState.EXCLUDED
        });
      }
      originalIndex++;
    }
  }

  return tokens;
}

/**
 * Calculate the sum of included tokens
 */
function calculateSum(tokens) {
  return tokens
    .filter(t => t.state !== TokenState.EXCLUDED && t.value !== null)
    .reduce((sum, t) => sum + t.value, 0);
}

/**
 * Generate warnings for excluded tokens
 */
function generateWarnings(tokens, schemeId) {
  const warnings = [];
  const excluded = tokens.filter(t => t.state === TokenState.EXCLUDED);

  if (excluded.length > 0) {
    const chars = [...new Set(excluded.map(t => t.original))];
    warnings.push(t('warning.excludedChars', { scheme: SCHEMES[schemeId].name }) + ': ' + chars.join(', '));
  }

  return warnings;
}

// ============================================
// UI Functions
// ============================================

let currentSchemeId = 'simple-english';

/**
 * Get current scheme based on active tab and selection
 */
function getCurrentScheme() {
  const activeTab = document.querySelector('.tab-btn.active').dataset.tab;

  if (activeTab === 'basics') {
    return null; // No scheme for basics tab
  } else if (activeTab === 'simple') {
    return document.getElementById('simple-scheme').value;
  } else if (activeTab === 'agrippa') {
    return document.getElementById('agrippa-scheme').value;
  } else if (activeTab === 'hebrew') {
    return 'hebrew-gematria';
  }
  return 'simple-english';
}

/**
 * Update scheme note text
 */
function updateSchemeNote() {
  const schemeId = getCurrentScheme();
  if (!schemeId) return; // basics tab has no scheme

  const scheme = SCHEMES[schemeId];

  const simpleNote = document.getElementById('simple-scheme-note');
  const agrippaNote = document.getElementById('agrippa-scheme-note');
  const hebrewNote = document.getElementById('hebrew-scheme-note');

  if (schemeId.startsWith('simple') || schemeId === 'english-gematria') {
    simpleNote.textContent = scheme.description[currentLang];
  } else if (schemeId.startsWith('agrippa')) {
    agrippaNote.textContent = scheme.description[currentLang];
  } else if (schemeId === 'hebrew-gematria') {
    hebrewNote.textContent = scheme.description[currentLang];
  }
}

/**
 * Update preset dropdown based on current scheme
 */
function updatePresets() {
  const schemeId = getCurrentScheme();
  if (!schemeId) return; // basics tab has no scheme

  const presetSelect = document.getElementById('preset-select');
  const presets = PRESETS[schemeId] || [];

  presetSelect.replaceChildren();
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = t('input.presetDefault');
  presetSelect.appendChild(defaultOption);

  presets.forEach(preset => {
    const option = document.createElement('option');
    option.value = preset.value;
    option.textContent = preset.label;
    presetSelect.appendChild(option);
  });
}

/**
 * Update reference table based on current scheme
 */
function updateReferenceTable() {
  const schemeId = getCurrentScheme();
  if (!schemeId) return; // basics tab has no scheme

  const scheme = SCHEMES[schemeId];
  const tbody = document.getElementById('reference-table-body');

  tbody.replaceChildren();

  // Get all tokens including compound tokens
  const tokens = [];

  if (scheme.tokenType === 'longest-match' && scheme.compoundTokens) {
    // Add single letters first
    for (const letter of scheme.alphabet) {
      tokens.push({ token: letter, value: scheme.mapping[letter] });
    }
    // Add compound tokens
    for (const compound of scheme.compoundTokens) {
      tokens.push({ token: compound, value: scheme.mapping[compound] });
    }
  } else {
    // Single character scheme
    for (const letter of scheme.alphabet) {
      tokens.push({ token: letter, value: scheme.mapping[letter] });
    }
  }

  // Create table rows
  tokens.forEach(({ token, value }) => {
    const tr = document.createElement('tr');
    tr.dataset.token = token;
    const td1 = document.createElement('td');
    td1.textContent = token;
    const td2 = document.createElement('td');
    td2.textContent = value;
    tr.appendChild(td1);
    tr.appendChild(td2);
    tbody.appendChild(tr);
  });

  // Add note about excluded characters if any
  if (scheme.excluded) {
    const tr = document.createElement('tr');
    tr.classList.add('excluded-note');
    const td = document.createElement('td');
    td.colSpan = 2;
    td.style.cssText = 'color: #721c24; font-style: italic;';
    td.textContent = `${t('reference.excluded')}: ${scheme.excluded.join(', ')}`;
    tr.appendChild(td);
    tbody.appendChild(tr);
  }

  // Add note about normalizations
  if (Object.keys(scheme.normalizations || {}).length > 0) {
    const normalizations = Object.entries(scheme.normalizations)
      .map(([from, to]) => `${from}→${to}`)
      .join(', ');
    const tr = document.createElement('tr');
    tr.classList.add('normalization-note');
    const td = document.createElement('td');
    td.colSpan = 2;
    td.style.cssText = 'color: #856404; font-style: italic;';
    td.textContent = `${t('reference.normalizations')}: ${normalizations}`;
    tr.appendChild(td);
    tbody.appendChild(tr);
  }
}

/**
 * Render token display (Step 1)
 */
function renderTokenDisplay(tokens, schemeId) {
  const container = document.getElementById('token-display');
  container.replaceChildren();

  const scheme = SCHEMES[schemeId];
  const isRTL = scheme && scheme.isRTL;
  container.dir = isRTL ? 'rtl' : 'ltr';

  tokens.forEach(t => {
    const span = document.createElement('span');
    span.className = `token ${t.state}`;
    span.textContent = t.state === TokenState.NORMALIZED ? `${t.original}→${t.token}` : t.token;
    span.dataset.token = t.token;
    container.appendChild(span);
  });
}

/**
 * Render mapping display (Step 2)
 */
function renderMappingDisplay(tokens, schemeId) {
  const container = document.getElementById('mapping-display');
  container.replaceChildren();

  const scheme = SCHEMES[schemeId];
  const isRTL = scheme && scheme.isRTL;
  container.dir = isRTL ? 'rtl' : 'ltr';

  tokens.forEach(tok => {
    const div = document.createElement('div');
    div.className = `mapping-item ${tok.state}`;

    const tokenSpan = document.createElement('span');
    tokenSpan.className = 'mapping-token';
    tokenSpan.textContent = tok.token;

    const arrowSpan = document.createElement('span');
    arrowSpan.className = 'mapping-arrow';
    arrowSpan.textContent = '↓';

    const valueSpan = document.createElement('span');
    valueSpan.className = 'mapping-value';
    valueSpan.textContent = tok.value !== null ? tok.value : '—';

    div.appendChild(tokenSpan);
    div.appendChild(arrowSpan);
    div.appendChild(valueSpan);
    container.appendChild(div);
  });
}

/**
 * Render summation display (Step 3)
 */
function renderSummationDisplay(tokens, schemeId) {
  const summationContainer = document.getElementById('summation-display');
  const totalContainer = document.getElementById('total-display');
  const excludedContainer = document.getElementById('excluded-list');

  const scheme = SCHEMES[schemeId];
  const isRTL = scheme && scheme.isRTL;
  summationContainer.dir = isRTL ? 'rtl' : 'ltr';

  const included = tokens.filter(tok => tok.state !== TokenState.EXCLUDED && tok.value !== null);
  const excluded = tokens.filter(tok => tok.state === TokenState.EXCLUDED);

  // Build formula string
  if (included.length > 0) {
    const formula = included.map(tok => `${tok.value}`).join(' + ');
    const total = calculateSum(tokens);
    summationContainer.textContent = formula + ' =';
    totalContainer.textContent = `${t('result.total')}: ${total}`;
  } else {
    summationContainer.textContent = t('result.noValidTokens');
    totalContainer.textContent = `${t('result.total')}: 0`;
  }

  // Show excluded tokens
  if (excluded.length > 0) {
    excludedContainer.textContent = `${t('result.excludedFrom')}: ${excluded.map(tok => tok.original).join(', ')}`;
  } else {
    excludedContainer.textContent = '';
  }
}

/**
 * Display warnings
 */
function displayWarnings(warnings) {
  const section = document.getElementById('warnings-section');
  const list = document.getElementById('warnings-list');

  if (warnings.length === 0) {
    section.hidden = true;
    return;
  }

  list.replaceChildren();
  warnings.forEach(warning => {
    const li = document.createElement('li');
    li.textContent = warning;
    list.appendChild(li);
  });

  section.hidden = false;
}

/**
 * Perform calculation and update display
 */
function calculate() {
  const input = document.getElementById('input-text').value;
  const schemeId = getCurrentScheme();

  if (!input.trim()) {
    document.getElementById('warnings-section').hidden = true;
    document.getElementById('results-section').hidden = true;
    return;
  }

  const tokens = tokenize(input, schemeId);
  const warnings = generateWarnings(tokens, schemeId);

  displayWarnings(warnings);

  if (tokens.length === 0) {
    document.getElementById('results-section').hidden = true;
    return;
  }

  renderTokenDisplay(tokens, schemeId);
  renderMappingDisplay(tokens, schemeId);
  renderSummationDisplay(tokens, schemeId);

  document.getElementById('results-section').hidden = false;

  // Highlight corresponding reference table rows
  highlightReferenceTable(tokens);
}

/**
 * Highlight reference table rows for used tokens
 */
function highlightReferenceTable(tokens) {
  const tbody = document.getElementById('reference-table-body');
  const usedTokens = new Set(tokens.filter(t => t.state !== TokenState.EXCLUDED).map(t => t.token));

  tbody.querySelectorAll('tr').forEach(tr => {
    tr.classList.remove('highlight');
    if (usedTokens.has(tr.dataset.token)) {
      tr.classList.add('highlight');
    }
  });
}

/**
 * Show info modal
 */
function showInfoModal(type) {
  const modal = document.getElementById('info-modal');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');

  let schemeId;
  if (type === 'simple') {
    schemeId = document.getElementById('simple-scheme').value;
  } else if (type === 'agrippa') {
    schemeId = document.getElementById('agrippa-scheme').value;
  } else if (type === 'hebrew') {
    schemeId = 'hebrew-gematria';
  }

  const scheme = SCHEMES[schemeId];
  title.textContent = scheme.name;
  // SAFE: Static HTML from frozen SCHEMES object, not user input
  body.innerHTML = scheme.info[currentLang];

  modal.showModal();
}

/**
 * Toggle language
 */
function toggleLanguage() {
  currentLang = currentLang === 'ja' ? 'en' : 'ja';

  // Update toggle button
  document.querySelector('.lang-en').classList.toggle('active', currentLang === 'en');
  document.querySelector('.lang-ja').classList.toggle('active', currentLang === 'ja');

  // Apply translations
  applyI18n();

  // Re-render results if visible
  if (!document.getElementById('results-section').hidden) {
    calculate();
  }

  // Save preference
  try {
    localStorage.setItem('gematria-lang', currentLang);
  } catch (e) {
    // localStorage unavailable (private mode, etc.)
  }
}

// ============================================
// Event Listeners
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initializeSchemeMappings();

  // Load saved language preference
  try {
    const savedLang = localStorage.getItem('gematria-lang');
    if (savedLang && (savedLang === 'en' || savedLang === 'ja')) {
      currentLang = savedLang;
      document.querySelector('.lang-en').classList.toggle('active', currentLang === 'en');
      document.querySelector('.lang-ja').classList.toggle('active', currentLang === 'ja');
    }
  } catch (e) {
    // localStorage unavailable (private mode, etc.)
  }

  // Language toggle
  document.getElementById('lang-toggle').addEventListener('click', toggleLanguage);

  // Tab switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // Update tab buttons
      document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Update tab content
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
        content.hidden = true;
      });

      const targetTab = document.getElementById(`tab-${btn.dataset.tab}`);
      targetTab.classList.add('active');
      targetTab.hidden = false;

      // Show/hide input and reference sections based on tab
      const isBasicsTab = btn.dataset.tab === 'basics';
      const isHebrewTab = btn.dataset.tab === 'hebrew';
      document.querySelector('.input-section').hidden = isBasicsTab;
      document.querySelector('.reference-section').hidden = isBasicsTab;
      document.getElementById('hebrew-keyboard').hidden = !isHebrewTab;

      if (!isBasicsTab) {
        // Update presets and reference table for non-basics tabs
        updateSchemeNote();
        updatePresets();
        updateReferenceTable();
      }

      // Clear results
      document.getElementById('warnings-section').hidden = true;
      document.getElementById('results-section').hidden = true;
    });
  });

  // Scheme selection changes
  document.getElementById('simple-scheme').addEventListener('change', () => {
    updateSchemeNote();
    updatePresets();
    updateReferenceTable();
    document.getElementById('warnings-section').hidden = true;
    document.getElementById('results-section').hidden = true;
  });

  document.getElementById('agrippa-scheme').addEventListener('change', () => {
    updateSchemeNote();
    updatePresets();
    updateReferenceTable();
    document.getElementById('warnings-section').hidden = true;
    document.getElementById('results-section').hidden = true;
  });

  // Preset selection
  document.getElementById('preset-select').addEventListener('change', (e) => {
    if (e.target.value) {
      document.getElementById('input-text').value = e.target.value;
    }
  });

  // Calculate button
  document.getElementById('calculate-btn').addEventListener('click', calculate);

  // Enter key in textarea
  document.getElementById('input-text').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      calculate();
    }
  });

  // Info buttons
  document.querySelectorAll('.info-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      showInfoModal(btn.dataset.info);
    });
  });

  // Modal close
  document.getElementById('modal-close').addEventListener('click', () => {
    document.getElementById('info-modal').close();
  });

  // Close modal on backdrop click
  document.getElementById('info-modal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      e.currentTarget.close();
    }
  });

  // Hebrew keyboard handlers
  document.querySelectorAll('.hebrew-key').forEach(key => {
    key.addEventListener('click', () => {
      const char = key.dataset.char;
      const input = document.getElementById('input-text');
      const start = input.selectionStart;
      const end = input.selectionEnd;
      const text = input.value;
      input.value = text.substring(0, start) + char + text.substring(end);
      input.selectionStart = input.selectionEnd = start + char.length;
      input.focus();
    });
  });

  document.getElementById('hebrew-clear').addEventListener('click', () => {
    document.getElementById('input-text').value = '';
    document.getElementById('input-text').focus();
  });

  document.getElementById('hebrew-backspace').addEventListener('click', () => {
    const input = document.getElementById('input-text');
    const start = input.selectionStart;
    const text = input.value;
    if (start > 0) {
      input.value = text.substring(0, start - 1) + text.substring(start);
      input.selectionStart = input.selectionEnd = start - 1;
    }
    input.focus();
  });

  // Initialize with translations
  applyI18n();

  // Hide input and reference sections on initial load (basics tab is default)
  const activeTab = document.querySelector('.tab-btn.active').dataset.tab;
  if (activeTab === 'basics') {
    document.querySelector('.input-section').hidden = true;
    document.querySelector('.reference-section').hidden = true;
  }
});
