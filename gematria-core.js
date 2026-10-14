/**
 * Gematria CipherLab calculation core.
 * This module has no DOM dependencies and can be used from a browser or Node.js.
 */
(function attachGematriaCore(root, factory) {
  const api = factory();

  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  }

  root.GematriaCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function createGematriaCore() {
  'use strict';

  const MAX_INPUT_LENGTH = 10000;
  const SCHEME_VERSION = '2.0.0';
  const EXPORT_FORMAT = 'gematria-cipherlab.analysis';
  const EXPORT_FORMAT_VERSION = 1;

  function sequenceMapping(alphabet, start, step = 1) {
    return Object.fromEntries(
      Array.from(alphabet, (token, index) => [token, start + (index * step)])
    );
  }

  function agrippaMapping(alphabet) {
    const values = [
      1, 2, 3, 4, 5, 6, 7, 8, 9,
      10, 20, 30, 40, 50, 60, 70, 80, 90,
      100, 200, 300, 400, 500
    ];
    return Object.fromEntries(Array.from(alphabet, (token, index) => [token, values[index]]));
  }

  const latin23Alphabet = 'ABCDEFGHIKLMNOPQRSTVXYZ';
  const agrippa27Tokens = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
    'T', 'U', 'X', 'Y', 'Z', 'J', 'V', 'HI', 'HV'
  ];
  const agrippa27Values = [
    1, 2, 3, 4, 5, 6, 7, 8, 9,
    10, 20, 30, 40, 50, 60, 70, 80, 90,
    100, 200, 300, 400, 500, 600, 700, 800, 900
  ];

  const hebrewStandardMapping = {
    'א': 1, 'ב': 2, 'ג': 3, 'ד': 4, 'ה': 5, 'ו': 6, 'ז': 7, 'ח': 8, 'ט': 9,
    'י': 10, 'כ': 20, 'ך': 20, 'ל': 30, 'מ': 40, 'ם': 40, 'נ': 50, 'ן': 50,
    'ס': 60, 'ע': 70, 'פ': 80, 'ף': 80, 'צ': 90, 'ץ': 90, 'ק': 100,
    'ר': 200, 'ש': 300, 'ת': 400
  };
  const hebrewFinalValuesMapping = {
    ...hebrewStandardMapping,
    'ך': 500,
    'ם': 600,
    'ן': 700,
    'ף': 800,
    'ץ': 900
  };

  const agrippa27Mapping = Object.fromEntries(
    agrippa27Tokens.map((token, index) => [token, agrippa27Values[index]])
  );

  const SCHEMES = {
    'simple-english': {
      id: 'simple-english',
      version: SCHEME_VERSION,
      family: 'latin',
      tokens: Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
      mapping: sequenceMapping('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 1)
    },
    'simple-english-0': {
      id: 'simple-english-0',
      version: SCHEME_VERSION,
      family: 'latin',
      tokens: Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
      mapping: sequenceMapping('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 0)
    },
    'english-gematria': {
      id: 'english-gematria',
      version: SCHEME_VERSION,
      family: 'latin',
      tokens: Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
      mapping: sequenceMapping('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6, 6)
    },
    'simple-latin23': {
      id: 'simple-latin23',
      version: SCHEME_VERSION,
      family: 'latin',
      tokens: Array.from(latin23Alphabet),
      mapping: sequenceMapping(latin23Alphabet, 1),
      aliases: { J: 'I', U: 'V' },
      excludedTokens: ['W']
    },
    'agrippa-23': {
      id: 'agrippa-23',
      version: SCHEME_VERSION,
      family: 'latin',
      tokens: Array.from(latin23Alphabet),
      mapping: agrippaMapping(latin23Alphabet),
      aliases: { J: 'I', U: 'V' },
      excludedTokens: ['W']
    },
    'agrippa-27': {
      id: 'agrippa-27',
      version: SCHEME_VERSION,
      family: 'latin',
      tokens: agrippa27Tokens,
      mapping: agrippa27Mapping,
      aliases: { W: 'HV' },
      compoundTokens: ['HI', 'HV']
    },
    'hebrew-gematria': {
      id: 'hebrew-gematria',
      version: SCHEME_VERSION,
      family: 'hebrew',
      direction: 'rtl',
      tokens: Object.keys(hebrewStandardMapping),
      mapping: hebrewStandardMapping
    },
    'hebrew-final-values': {
      id: 'hebrew-final-values',
      version: SCHEME_VERSION,
      family: 'hebrew',
      direction: 'rtl',
      tokens: Object.keys(hebrewFinalValuesMapping),
      mapping: hebrewFinalValuesMapping
    }
  };

  function deepFreeze(value) {
    if (!value || (typeof value !== 'object' && typeof value !== 'function') || Object.isFrozen(value)) {
      return value;
    }

    Object.freeze(value);
    Object.values(value).forEach(deepFreeze);
    return value;
  }

  function isHebrewMark(char) {
    const codePoint = char.codePointAt(0);
    return (
      (codePoint >= 0x0591 && codePoint <= 0x05BD) ||
      codePoint === 0x05BF ||
      (codePoint >= 0x05C1 && codePoint <= 0x05C2) ||
      (codePoint >= 0x05C4 && codePoint <= 0x05C5) ||
      codePoint === 0x05C7
    );
  }

  function isSeparator(char) {
    return /[\p{P}\p{S}\p{Z}\p{N}\s]/u.test(char);
  }

  function createEntry(original, token, value, index) {
    return {
      original,
      token,
      value,
      index,
      normalized: original !== token
    };
  }

  function analyzeLatin(input, scheme) {
    const normalizedInput = input.normalize('NFKC').toUpperCase();
    const tokens = [];
    const ignored = [];
    const excluded = [];
    const compoundTokens = [...(scheme.compoundTokens || [])].sort((a, b) => b.length - a.length);

    for (let index = 0; index < normalizedInput.length;) {
      const char = normalizedInput[index];
      const alias = scheme.aliases && scheme.aliases[char];

      if (alias) {
        tokens.push(createEntry(char, alias, scheme.mapping[alias], index));
        index += 1;
        continue;
      }

      const compound = compoundTokens.find(candidate => normalizedInput.startsWith(candidate, index));
      if (compound) {
        tokens.push(createEntry(compound, compound, scheme.mapping[compound], index));
        index += compound.length;
        continue;
      }

      if (Object.prototype.hasOwnProperty.call(scheme.mapping, char)) {
        tokens.push(createEntry(char, char, scheme.mapping[char], index));
      } else if (isSeparator(char)) {
        ignored.push({ char, index, reason: 'separator' });
      } else {
        excluded.push({ char, index, reason: 'undefined-token' });
      }

      index += 1;
    }

    return { normalizedInput, tokens, ignored, excluded };
  }

  function analyzeHebrew(input, scheme) {
    const normalizedInput = input.normalize('NFKD');
    const tokens = [];
    const ignored = [];
    const excluded = [];
    let index = 0;

    for (const char of normalizedInput) {
      if (Object.prototype.hasOwnProperty.call(scheme.mapping, char)) {
        tokens.push(createEntry(char, char, scheme.mapping[char], index));
      } else if (isHebrewMark(char)) {
        ignored.push({ char, index, reason: 'hebrew-mark' });
      } else if (isSeparator(char)) {
        ignored.push({ char, index, reason: 'separator' });
      } else {
        excluded.push({ char, index, reason: 'undefined-token' });
      }

      index += char.length;
    }

    return { normalizedInput, tokens, ignored, excluded };
  }

  function analyze(input, schemeId) {
    if (typeof input !== 'string') {
      throw new TypeError('input-must-be-string');
    }
    if (input.length > MAX_INPUT_LENGTH) {
      throw new RangeError('input-too-long');
    }

    const scheme = SCHEMES[schemeId];
    if (!scheme) {
      throw new RangeError('unknown-scheme');
    }

    const analysis = scheme.family === 'hebrew'
      ? analyzeHebrew(input, scheme)
      : analyzeLatin(input, scheme);

    return deepFreeze({
      schemeId,
      schemeVersion: scheme.version,
      input,
      normalizedInput: analysis.normalizedInput,
      normalizationChanged: input !== analysis.normalizedInput,
      tokens: analysis.tokens,
      ignored: analysis.ignored,
      excluded: analysis.excluded,
      total: analysis.tokens.reduce((sum, item) => sum + item.value, 0)
    });
  }

  function getComparableSchemeIds(schemeId) {
    const selectedScheme = SCHEMES[schemeId];
    if (!selectedScheme) {
      throw new RangeError('unknown-scheme');
    }

    return Object.values(SCHEMES)
      .filter(scheme => scheme.family === selectedScheme.family)
      .map(scheme => scheme.id);
  }

  function createBreakdown(input, schemeId) {
    const complete = analyze(input, schemeId);
    const lines = input.replace(/\r\n?/gu, '\n').split('\n').map((line, lineIndex) => {
      const lineAnalysis = analyze(line, schemeId);
      const segments = [...line.matchAll(/\S+/gu)].map((match, segmentIndex) => {
        const segmentAnalysis = analyze(match[0], schemeId);
        return {
          number: segmentIndex + 1,
          offset: match.index,
          input: match[0],
          total: segmentAnalysis.total,
          tokenCount: segmentAnalysis.tokens.length,
          excludedCount: segmentAnalysis.excluded.length
        };
      });

      return {
        number: lineIndex + 1,
        input: line,
        total: lineAnalysis.total,
        tokenCount: lineAnalysis.tokens.length,
        excludedCount: lineAnalysis.excluded.length,
        segments
      };
    });

    return deepFreeze({
      schemeId: complete.schemeId,
      schemeVersion: complete.schemeVersion,
      input,
      total: complete.total,
      lines
    });
  }

  function createAnalysisPackage(input, selectedSchemeId, comparisonSchemeIds) {
    const selected = analyze(input, selectedSchemeId);
    const selectedFamily = SCHEMES[selectedSchemeId].family;
    const requestedIds = comparisonSchemeIds === undefined
      ? getComparableSchemeIds(selectedSchemeId)
      : comparisonSchemeIds;

    if (!Array.isArray(requestedIds)) {
      throw new TypeError('comparison-schemes-must-be-array');
    }

    const schemeIds = [...new Set([selectedSchemeId, ...requestedIds])];
    const comparisons = schemeIds.map(schemeId => {
      const scheme = SCHEMES[schemeId];
      if (!scheme) {
        throw new RangeError('unknown-scheme');
      }
      if (scheme.family !== selectedFamily) {
        throw new RangeError('incompatible-scheme-family');
      }

      const result = schemeId === selectedSchemeId ? selected : analyze(input, schemeId);
      return {
        schemeId: result.schemeId,
        schemeVersion: result.schemeVersion,
        total: result.total,
        deltaFromSelected: result.total - selected.total,
        tokenCount: result.tokens.length,
        excludedCount: result.excluded.length,
        ignoredCount: result.ignored.length
      };
    });

    return deepFreeze({
      format: EXPORT_FORMAT,
      formatVersion: EXPORT_FORMAT_VERSION,
      limitation: 'equal-totals-do-not-prove-relationship',
      selected,
      comparisons
    });
  }

  function isPlainObject(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return false;
    }
    const prototype = Object.getPrototypeOf(value);
    return prototype === Object.prototype || prototype === null;
  }

  function structurallyEqual(left, right) {
    if (Object.is(left, right)) {
      return true;
    }
    if (Array.isArray(left) || Array.isArray(right)) {
      return Array.isArray(left) && Array.isArray(right) &&
        left.length === right.length &&
        left.every((item, index) => structurallyEqual(item, right[index]));
    }
    if (!isPlainObject(left) || !isPlainObject(right)) {
      return false;
    }

    const leftKeys = Object.keys(left).sort();
    const rightKeys = Object.keys(right).sort();
    return leftKeys.length === rightKeys.length &&
      leftKeys.every((key, index) => (
        key === rightKeys[index] && structurallyEqual(left[key], right[key])
      ));
  }

  function restoreAnalysisPackage(value) {
    if (!isPlainObject(value)) {
      throw new TypeError('analysis-package-invalid');
    }
    if (value.format !== EXPORT_FORMAT) {
      throw new RangeError('analysis-format-unsupported');
    }
    if (value.formatVersion !== EXPORT_FORMAT_VERSION) {
      throw new RangeError('analysis-version-unsupported');
    }
    if (
      !isPlainObject(value.selected) ||
      typeof value.selected.input !== 'string' ||
      typeof value.selected.schemeId !== 'string' ||
      !Array.isArray(value.comparisons) ||
      value.comparisons.some(comparison => (
        !isPlainObject(comparison) || typeof comparison.schemeId !== 'string'
      ))
    ) {
      throw new TypeError('analysis-package-invalid');
    }

    let restored;
    try {
      restored = createAnalysisPackage(
        value.selected.input,
        value.selected.schemeId,
        value.comparisons.map(comparison => comparison.schemeId)
      );
    } catch (_error) {
      throw new TypeError('analysis-package-invalid');
    }

    if (!structurallyEqual(value, restored)) {
      throw new Error('analysis-package-integrity-failed');
    }
    return restored;
  }

  deepFreeze(SCHEMES);

  return deepFreeze({
    MAX_INPUT_LENGTH,
    SCHEME_VERSION,
    EXPORT_FORMAT,
    EXPORT_FORMAT_VERSION,
    SCHEMES,
    analyze,
    getComparableSchemeIds,
    createBreakdown,
    createAnalysisPackage,
    restoreAnalysisPackage,
    isHebrewMark
  });
});
