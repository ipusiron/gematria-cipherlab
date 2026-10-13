/**
 * Gematria CipherLab browser interface.
 */
(function initializeApplication() {
  'use strict';

  const core = window.GematriaCore;
  const messages = window.GematriaMessages;
  if (!core || !messages) {
    throw new Error('Required application modules are missing.');
  }

  const SCHEME_META = Object.freeze({
    'simple-english': Object.freeze({
      nameKey: 'scheme.simpleEnglish',
      noteKey: 'scheme.note.simpleEnglish',
      infoKeys: ['info.simpleEnglish.p', 'info.simpleEnglish.1', 'info.simpleEnglish.2']
    }),
    'simple-english-0': Object.freeze({
      nameKey: 'scheme.simpleEnglish0',
      noteKey: 'scheme.note.simpleEnglish0',
      infoKeys: ['info.simpleEnglish0.p', 'info.simpleEnglish0.1']
    }),
    'english-gematria': Object.freeze({
      nameKey: 'scheme.englishGematria',
      noteKey: 'scheme.note.englishGematria',
      infoKeys: ['info.englishGematria.p', 'info.englishGematria.1', 'info.englishGematria.2']
    }),
    'simple-latin23': Object.freeze({
      nameKey: 'scheme.simpleLatin23',
      noteKey: 'scheme.note.simpleLatin23',
      infoKeys: ['info.simpleLatin23.p', 'info.simpleLatin23.1', 'info.simpleLatin23.2']
    }),
    'agrippa-23': Object.freeze({
      nameKey: 'scheme.agrippa23',
      noteKey: 'scheme.note.agrippa23',
      infoKeys: ['info.agrippa23.p', 'info.agrippa23.1', 'info.agrippa23.2']
    }),
    'agrippa-27': Object.freeze({
      nameKey: 'scheme.agrippa27',
      noteKey: 'scheme.note.agrippa27',
      infoKeys: ['info.agrippa27.p', 'info.agrippa27.1', 'info.agrippa27.2', 'info.agrippa27.3']
    }),
    'hebrew-gematria': Object.freeze({
      nameKey: 'scheme.hebrewGematria',
      noteKey: 'scheme.note.hebrew',
      infoKeys: ['info.hebrew.p', 'info.hebrew.1', 'info.hebrew.2']
    }),
    'hebrew-final-values': Object.freeze({
      nameKey: 'scheme.hebrewFinalValues',
      noteKey: 'scheme.note.hebrewFinalValues',
      infoKeys: ['info.hebrewFinalValues.p', 'info.hebrewFinalValues.1', 'info.hebrewFinalValues.2']
    })
  });

  const PRESETS = Object.freeze({
    'simple-english': Object.freeze([
      Object.freeze({ label: 'HELLO', value: 'HELLO' }),
      Object.freeze({ label: 'WORLD', value: 'WORLD' }),
      Object.freeze({ label: 'GEMATRIA', value: 'GEMATRIA' })
    ]),
    'simple-english-0': Object.freeze([
      Object.freeze({ label: 'HELLO', value: 'HELLO' }),
      Object.freeze({ label: 'WORLD', value: 'WORLD' }),
      Object.freeze({ label: 'GEMATRIA', value: 'GEMATRIA' })
    ]),
    'english-gematria': Object.freeze([
      Object.freeze({ label: 'COMPUTER (666)', value: 'COMPUTER' }),
      Object.freeze({ label: 'HELLO', value: 'HELLO' }),
      Object.freeze({ label: 'GEMATRIA', value: 'GEMATRIA' })
    ]),
    'simple-latin23': Object.freeze([
      Object.freeze({ label: 'ROMA', value: 'ROMA' }),
      Object.freeze({ label: 'CAESAR', value: 'CAESAR' }),
      Object.freeze({ label: 'JULIUS', value: 'JULIUS' })
    ]),
    'agrippa-23': Object.freeze([
      Object.freeze({ label: 'ABRACADABRA', value: 'ABRACADABRA' }),
      Object.freeze({ label: 'ALPHA', value: 'ALPHA' }),
      Object.freeze({ label: 'OMEGA', value: 'OMEGA' })
    ]),
    'agrippa-27': Object.freeze([
      Object.freeze({ labelKey: 'preset.ihvh', value: 'IHVH' }),
      Object.freeze({ labelKey: 'preset.jehova', value: 'JEHOVA' }),
      Object.freeze({ labelKey: 'preset.hiSeparated', value: 'H I' })
    ]),
    'hebrew-gematria': Object.freeze([
      Object.freeze({ label: 'חי (18)', value: 'חי' }),
      Object.freeze({ label: 'שלום (376)', value: 'שלום' }),
      Object.freeze({ label: 'אמת (441)', value: 'אמת' }),
      Object.freeze({ label: 'שָׁלוֹם (376)', value: 'שָׁלוֹם' }),
      Object.freeze({ label: 'ךםןףץ (280)', value: 'ךםןףץ' })
    ]),
    'hebrew-final-values': Object.freeze([
      Object.freeze({ label: 'חי (18)', value: 'חי' }),
      Object.freeze({ label: 'שלום (936)', value: 'שלום' }),
      Object.freeze({ label: 'אמת (441)', value: 'אמת' }),
      Object.freeze({ label: 'שָׁלוֹם (936)', value: 'שָׁלוֹם' }),
      Object.freeze({ label: 'ךםןףץ (3500)', value: 'ךםןףץ' })
    ])
  });

  let currentLanguage = selectInitialLanguage();
  let lastPackage = null;
  let lastActionStatusKey = null;
  let modalTrigger = null;

  function selectInitialLanguage() {
    const queryLanguage = new URLSearchParams(window.location.search).get('lang');
    if (queryLanguage === 'ja' || queryLanguage === 'en') {
      return queryLanguage;
    }

    try {
      const savedLanguage = window.localStorage.getItem('gematria-lang');
      if (savedLanguage === 'ja' || savedLanguage === 'en') {
        return savedLanguage;
      }
    } catch (_error) {
      // Storage can be unavailable for local files or strict privacy settings.
    }

    return window.navigator.language.toLowerCase().startsWith('ja') ? 'ja' : 'en';
  }

  function t(key, parameters = {}) {
    let value = Object.prototype.hasOwnProperty.call(messages[currentLanguage], key)
      ? messages[currentLanguage][key]
      : Object.prototype.hasOwnProperty.call(messages.en, key)
        ? messages.en[key]
        : key;
    Object.entries(parameters).forEach(([name, replacement]) => {
      value = value.replaceAll(`{${name}}`, String(replacement));
    });
    return value;
  }

  function applyI18n() {
    document.documentElement.lang = currentLanguage;

    document.querySelectorAll('[data-i18n]').forEach(element => {
      element.textContent = t(element.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      element.placeholder = t(element.dataset.i18nPlaceholder);
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(element => {
      element.dataset.i18nAttr.split(',').forEach(specification => {
        const [attribute, key] = specification.trim().split(':');
        if (attribute && key) {
          element.setAttribute(attribute, t(key));
        }
      });
    });

    document.querySelector('.lang-en').classList.toggle('active', currentLanguage === 'en');
    document.querySelector('.lang-ja').classList.toggle('active', currentLanguage === 'ja');
    updateSchemeContext();

    if (lastPackage) {
      renderAnalysis(lastPackage);
    }
    renderActionStatus();
  }

  function getActiveTab() {
    return document.querySelector('.tab-btn.active').dataset.tab;
  }

  function getCurrentSchemeId() {
    const activeTab = getActiveTab();
    if (activeTab === 'simple') {
      return document.getElementById('simple-scheme').value;
    }
    if (activeTab === 'agrippa') {
      return document.getElementById('agrippa-scheme').value;
    }
    if (activeTab === 'hebrew') {
      return document.getElementById('hebrew-scheme').value;
    }
    return null;
  }

  function updateSchemeContext() {
    const schemeId = getCurrentSchemeId();
    if (!schemeId) {
      return;
    }

    const activeTab = getActiveTab();
    const note = document.getElementById(`${activeTab}-scheme-note`);
    if (note) {
      note.textContent = t(SCHEME_META[schemeId].noteKey);
    }
    updatePresets(schemeId);
    updateReferenceTable(schemeId);
    updateHebrewKeyboardValues(schemeId);
  }

  function updateHebrewKeyboardValues(schemeId) {
    const useFinalValues = schemeId === 'hebrew-final-values';
    document.querySelectorAll('.final-form-key').forEach(button => {
      const value = useFinalValues ? button.dataset.finalValue : button.dataset.standardValue;
      button.querySelector('span').textContent = value;
    });
  }

  function updatePresets(schemeId) {
    const select = document.getElementById('preset-select');
    const selectedValue = select.value;
    select.replaceChildren();

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = t('input.presetDefault');
    select.append(defaultOption);

    (PRESETS[schemeId] || []).forEach(preset => {
      const option = document.createElement('option');
      option.value = preset.value;
      option.textContent = preset.labelKey ? t(preset.labelKey) : preset.label;
      select.append(option);
    });

    if ([...select.options].some(option => option.value === selectedValue)) {
      select.value = selectedValue;
    }
  }

  function updateReferenceTable(schemeId) {
    const scheme = core.SCHEMES[schemeId];
    const body = document.getElementById('reference-table-body');
    const notes = document.getElementById('reference-notes');
    body.replaceChildren();
    notes.replaceChildren();

    scheme.tokens.forEach(token => {
      const row = document.createElement('tr');
      row.dataset.token = token;
      const tokenCell = document.createElement('td');
      const valueCell = document.createElement('td');
      tokenCell.textContent = token;
      valueCell.textContent = String(scheme.mapping[token]);
      row.append(tokenCell, valueCell);
      body.append(row);
    });

    if (scheme.aliases) {
      const aliases = Object.entries(scheme.aliases).map(([from, to]) => `${from}→${to}`).join(', ');
      appendReferenceNote(t('reference.aliases', { aliases }));
    }
    if (scheme.excludedTokens) {
      appendReferenceNote(t('reference.excluded', { tokens: scheme.excludedTokens.join(', ') }));
    }
    if (scheme.compoundTokens) {
      appendReferenceNote(t('reference.compounds'));
    }

    function appendReferenceNote(text) {
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      notes.append(paragraph);
    }
  }

  function visibleCharacter(char) {
    return /\s/u.test(char) ? '␠' : char;
  }

  function uniqueCharacters(entries) {
    return [...new Set(entries.map(item => visibleCharacter(item.char)))].join(', ');
  }

  function renderAnalysis(analysisPackage) {
    const result = analysisPackage.selected;
    renderWarnings(result);
    renderTokenization(result);
    renderMapping(result);
    renderTotal(result);
    renderAnalysisNotes(result);
    renderComparison(analysisPackage.comparisons, result.schemeId);
    highlightReferenceTable(result.tokens);
    document.getElementById('results-section').hidden = false;
  }

  function renderComparison(comparisons, selectedSchemeId) {
    const list = document.getElementById('comparison-list');
    list.replaceChildren();

    comparisons.forEach(comparison => {
      const card = document.createElement('article');
      card.className = 'comparison-card';
      card.setAttribute('role', 'listitem');
      if (comparison.schemeId === selectedSchemeId) {
        card.classList.add('selected');
        card.setAttribute('aria-current', 'true');
      }

      const heading = document.createElement('h4');
      heading.textContent = t(SCHEME_META[comparison.schemeId].nameKey);

      const identity = document.createElement('p');
      identity.className = 'comparison-identity';
      identity.textContent = `${comparison.schemeId} · v${comparison.schemeVersion}`;

      const total = document.createElement('p');
      total.className = 'comparison-total';
      total.textContent = `${t('result.total')}: ${comparison.total}`;

      const delta = document.createElement('p');
      delta.className = 'comparison-delta';
      delta.textContent = comparison.schemeId === selectedSchemeId
        ? t('comparison.reference')
        : t('comparison.delta', { delta: formatSignedNumber(comparison.deltaFromSelected) });

      const counts = document.createElement('p');
      counts.className = 'comparison-counts';
      counts.textContent = t('comparison.counts', {
        included: comparison.tokenCount,
        excluded: comparison.excludedCount
      });

      card.append(heading, identity, total, delta, counts);
      list.append(card);
    });
  }

  function formatSignedNumber(value) {
    return value > 0 ? `+${value}` : String(value);
  }

  function renderWarnings(result) {
    const section = document.getElementById('warnings-section');
    const list = document.getElementById('warnings-list');
    list.replaceChildren();

    if (result.excluded.length === 0) {
      section.hidden = true;
      return;
    }

    const item = document.createElement('li');
    item.textContent = t('warning.excludedChars', {
      scheme: t(SCHEME_META[result.schemeId].nameKey),
      chars: uniqueCharacters(result.excluded)
    });
    list.append(item);
    section.hidden = false;
  }

  function renderTokenization(result) {
    const display = document.getElementById('token-display');
    const scheme = core.SCHEMES[result.schemeId];
    display.replaceChildren();
    display.dir = scheme.direction || 'ltr';

    const entries = [
      ...result.tokens.map(item => ({ ...item, state: item.normalized ? 'normalized' : 'included' })),
      ...result.excluded.map(item => ({ ...item, original: item.char, state: 'excluded' })),
      ...result.ignored.map(item => ({ ...item, original: visibleCharacter(item.char), state: 'ignored' }))
    ].sort((a, b) => a.index - b.index);

    if (entries.length === 0) {
      display.textContent = t('result.noValidTokens');
      return;
    }

    entries.forEach(item => {
      const token = document.createElement('span');
      token.className = `token ${item.state}`;
      token.textContent = item.state === 'normalized'
        ? `${item.original}→${item.token}`
        : item.original;
      display.append(token);
    });
  }

  function renderMapping(result) {
    const display = document.getElementById('mapping-display');
    const scheme = core.SCHEMES[result.schemeId];
    display.replaceChildren();
    display.dir = scheme.direction || 'ltr';

    if (result.tokens.length === 0) {
      display.textContent = t('result.noValidTokens');
      return;
    }

    result.tokens.forEach(item => {
      const mapping = document.createElement('span');
      mapping.className = `mapping-item${item.normalized ? ' normalized' : ''}`;
      const token = document.createElement('span');
      token.className = 'mapping-token';
      token.textContent = item.normalized ? `${item.original}→${item.token}` : item.token;
      const arrow = document.createElement('span');
      arrow.className = 'mapping-arrow';
      arrow.textContent = '↓';
      const value = document.createElement('span');
      value.className = 'mapping-value';
      value.textContent = String(item.value);
      mapping.append(token, arrow, value);
      display.append(mapping);
    });
  }

  function renderTotal(result) {
    const summation = document.getElementById('summation-display');
    const total = document.getElementById('total-display');
    const excluded = document.getElementById('excluded-list');
    summation.textContent = result.tokens.length > 0
      ? `${result.tokens.map(item => item.value).join(' + ')} = ${result.total}`
      : '0';
    total.textContent = `${t('result.total')}: ${result.total}`;
    excluded.textContent = result.excluded.length > 0
      ? `${t('result.excludedFrom')}: ${uniqueCharacters(result.excluded)}`
      : '';
  }

  function renderAnalysisNotes(result) {
    const normalization = document.getElementById('normalization-summary');
    const ignored = document.getElementById('ignored-summary');
    const changes = result.tokens
      .filter(item => item.normalized)
      .map(item => `${item.original}→${item.token}`);

    if (result.normalizationChanged && changes.length === 0) {
      changes.push(`${result.input}→${result.normalizedInput}`);
    }

    normalization.textContent = changes.length > 0
      ? t('result.normalized', { changes: [...new Set(changes)].join(', ') })
      : '';
    ignored.textContent = result.ignored.length > 0
      ? t('result.ignored', { chars: uniqueCharacters(result.ignored) })
      : '';
  }

  function highlightReferenceTable(tokens) {
    const used = new Set(tokens.map(item => item.token));
    document.querySelectorAll('#reference-table-body tr').forEach(row => {
      row.classList.toggle('highlight', used.has(row.dataset.token));
    });
  }

  function calculate() {
    const schemeId = getCurrentSchemeId();
    if (!schemeId) return;

    try {
      lastPackage = core.createAnalysisPackage(document.getElementById('input-text').value, schemeId);
      lastActionStatusKey = null;
      renderAnalysis(lastPackage);
      renderActionStatus();
    } catch (error) {
      if (error instanceof RangeError && error.message === 'input-too-long') {
        showSingleWarning(t('warning.inputTooLong'));
        return;
      }
      throw error;
    }
  }

  function showSingleWarning(message) {
    const section = document.getElementById('warnings-section');
    const list = document.getElementById('warnings-list');
    const item = document.createElement('li');
    item.textContent = message;
    list.replaceChildren(item);
    section.hidden = false;
    document.getElementById('results-section').hidden = true;
  }

  function clearResult() {
    lastPackage = null;
    lastActionStatusKey = null;
    document.getElementById('warnings-section').hidden = true;
    document.getElementById('results-section').hidden = true;
    renderActionStatus();
  }

  function activateTab(button, moveFocus = false) {
    document.querySelectorAll('.tab-btn').forEach(tab => {
      const active = tab === button;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      document.getElementById(tab.getAttribute('aria-controls')).hidden = !active;
    });

    const tabName = button.dataset.tab;
    const basics = tabName === 'basics';
    document.querySelector('.input-section').hidden = basics;
    document.querySelector('.reference-section').hidden = basics;
    document.getElementById('hebrew-keyboard').hidden = tabName !== 'hebrew';
    clearResult();
    updateSchemeContext();
    if (moveFocus) button.focus();
  }

  function handleTabKeydown(event) {
    const tabs = [...document.querySelectorAll('.tab-btn')];
    const currentIndex = tabs.indexOf(event.currentTarget);
    let nextIndex = null;
    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % tabs.length;
    if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = tabs.length - 1;
    if (nextIndex === null) return;

    event.preventDefault();
    activateTab(tabs[nextIndex], true);
  }

  function showInfoModal(type, trigger) {
    const schemeId = type === 'simple'
      ? document.getElementById('simple-scheme').value
      : type === 'agrippa'
        ? document.getElementById('agrippa-scheme').value
        : document.getElementById('hebrew-scheme').value;
    const meta = SCHEME_META[schemeId];
    const body = document.getElementById('modal-body');
    modalTrigger = trigger;

    document.getElementById('modal-title').textContent = t(meta.nameKey);
    body.replaceChildren();
    const paragraph = document.createElement('p');
    paragraph.textContent = t(meta.infoKeys[0]);
    body.append(paragraph);

    if (meta.infoKeys.length > 1) {
      const list = document.createElement('ul');
      meta.infoKeys.slice(1).forEach(key => {
        const item = document.createElement('li');
        item.textContent = t(key);
        list.append(item);
      });
      body.append(list);
    }
    document.getElementById('info-modal').showModal();
  }

  function buildCopySummary(analysisPackage) {
    const result = analysisPackage.selected;
    const methodName = t(SCHEME_META[result.schemeId].nameKey);
    const trace = result.tokens.length > 0
      ? result.tokens.map(item => {
        const token = item.normalized ? `${item.original}→${item.token}` : item.token;
        return `${token}=${item.value}`;
      }).join(' + ')
      : '—';
    const comparisonLines = analysisPackage.comparisons.map(comparison => {
      const name = t(SCHEME_META[comparison.schemeId].nameKey);
      const difference = comparison.schemeId === result.schemeId
        ? t('comparison.reference')
        : t('comparison.delta', { delta: formatSignedNumber(comparison.deltaFromSelected) });
      return `- ${name} [${comparison.schemeId} v${comparison.schemeVersion}]: ${comparison.total} (${difference})`;
    });

    return [
      'Gematria CipherLab',
      `${t('export.summaryMethod')}: ${methodName}`,
      `${t('export.summarySchemeId')}: ${result.schemeId}`,
      `${t('export.summaryVersion')}: ${result.schemeVersion}`,
      `${t('export.summaryInput')}: ${result.input}`,
      `${t('export.summaryNormalized')}: ${result.normalizedInput}`,
      `${t('export.summaryTrace')}: ${trace}`,
      `${t('export.summaryTotal')}: ${result.total}`,
      '',
      `${t('export.summaryComparison')}:`,
      ...comparisonLines,
      '',
      t('export.summaryNotice')
    ].join('\n');
  }

  async function writeClipboard(text) {
    if (window.isSecureContext && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      try {
        await navigator.clipboard.writeText(text);
        return;
      } catch (_error) {
        // Fall back for browsers that expose the API but deny it without a trusted gesture.
      }
    }

    const activeElement = document.activeElement;
    const temporary = document.createElement('textarea');
    temporary.value = text;
    temporary.setAttribute('readonly', '');
    temporary.className = 'clipboard-fallback';
    document.body.append(temporary);
    temporary.select();
    const copied = typeof document.execCommand === 'function' && document.execCommand('copy');
    temporary.remove();
    if (activeElement && typeof activeElement.focus === 'function') {
      activeElement.focus();
    }
    if (!copied) {
      throw new Error('clipboard-unavailable');
    }
  }

  async function copySummary() {
    if (!lastPackage) return;

    try {
      await writeClipboard(buildCopySummary(lastPackage));
      lastActionStatusKey = 'export.copied';
    } catch (_error) {
      lastActionStatusKey = 'export.copyFailed';
    }
    renderActionStatus();
  }

  function downloadJson() {
    if (!lastPackage) return;

    const result = lastPackage.selected;
    const blob = new Blob([`${JSON.stringify(lastPackage, null, 2)}\n`], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `gematria-${result.schemeId}-v${result.schemeVersion}-${result.total}.json`;
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
    lastActionStatusKey = 'export.downloaded';
    renderActionStatus();
  }

  function renderActionStatus() {
    const status = document.getElementById('action-status');
    if (status) {
      status.textContent = lastActionStatusKey ? t(lastActionStatusKey) : '';
    }
  }

  function toggleLanguage() {
    currentLanguage = currentLanguage === 'ja' ? 'en' : 'ja';
    try {
      window.localStorage.setItem('gematria-lang', currentLanguage);
    } catch (_error) {
      // The interface still works when storage is unavailable.
    }
    applyI18n();
    window.dispatchEvent(new CustomEvent('languagechange', { detail: { language: currentLanguage } }));
  }

  function insertAtCursor(input, text) {
    const start = input.selectionStart;
    const end = input.selectionEnd;
    input.setRangeText(text, start, end, 'end');
    input.focus();
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('lang-toggle').addEventListener('click', toggleLanguage);
    document.querySelectorAll('.tab-btn').forEach(button => {
      button.addEventListener('click', () => activateTab(button));
      button.addEventListener('keydown', handleTabKeydown);
    });

    ['simple-scheme', 'agrippa-scheme', 'hebrew-scheme'].forEach(id => {
      document.getElementById(id).addEventListener('change', () => {
        clearResult();
        updateSchemeContext();
      });
    });

    document.getElementById('preset-select').addEventListener('change', event => {
      if (event.target.value) document.getElementById('input-text').value = event.target.value;
    });
    document.getElementById('calculate-btn').addEventListener('click', calculate);
    document.getElementById('copy-summary').addEventListener('click', copySummary);
    document.getElementById('download-json').addEventListener('click', downloadJson);
    document.getElementById('input-text').addEventListener('keydown', event => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        calculate();
      }
    });

    document.querySelectorAll('.info-btn').forEach(button => {
      button.addEventListener('click', () => showInfoModal(button.dataset.info, button));
    });
    const modal = document.getElementById('info-modal');
    document.getElementById('modal-close').addEventListener('click', () => modal.close());
    modal.addEventListener('click', event => {
      if (event.target === modal) modal.close();
    });
    modal.addEventListener('close', () => {
      if (modalTrigger) modalTrigger.focus();
    });

    document.querySelectorAll('.hebrew-key').forEach(key => {
      key.addEventListener('click', () => insertAtCursor(document.getElementById('input-text'), key.dataset.char));
    });
    document.getElementById('hebrew-clear').addEventListener('click', () => {
      const input = document.getElementById('input-text');
      input.value = '';
      input.focus();
    });
    document.getElementById('hebrew-backspace').addEventListener('click', () => {
      const input = document.getElementById('input-text');
      const start = input.selectionStart;
      const end = input.selectionEnd;
      if (start !== end) {
        input.setRangeText('', start, end, 'end');
      } else if (start > 0) {
        input.setRangeText('', start - 1, start, 'end');
      }
      input.focus();
    });

    applyI18n();
    activateTab(document.querySelector('.tab-btn.active'));
  });
})();
