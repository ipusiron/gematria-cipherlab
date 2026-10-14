'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const messages = require('../messages.js');

test('Japanese and English message catalogs have identical keys', () => {
  assert.deepEqual(Object.keys(messages.ja).sort(), Object.keys(messages.en).sort());
});

test('message catalogs and language dictionaries are frozen', () => {
  assert.ok(Object.isFrozen(messages));
  assert.ok(Object.isFrozen(messages.ja));
  assert.ok(Object.isFrozen(messages.en));
});

test('English interface copy does not contain Japanese script', () => {
  const text = Object.entries(messages.en)
    .filter(([key]) => key !== 'lang.switch')
    .map(([, value]) => value)
    .join('\n');
  assert.doesNotMatch(text, /[ぁ-んァ-ヶ一-龠]/u);
});

test('method names describe arithmetic without unsupported historical labels', () => {
  const allText = [...Object.values(messages.ja), ...Object.values(messages.en)].join('\n');
  assert.doesNotMatch(allText, /Sumerian|Crowley|クロウリー/u);
  assert.match(messages.en['scheme.englishGematria'], /×6/u);
  assert.match(messages.en['scheme.hebrewFinalValues'], /500–900/u);
  assert.match(messages.ja['scheme.note.hebrewFinalValues'], /ך・ם・ן・ף・ץ/u);
});

test('comparison and export cautions reject semantic scoring claims', () => {
  for (const language of ['ja', 'en']) {
    assert.ok(messages[language]['comparison.notice']);
    assert.ok(messages[language]['export.summaryNotice']);
  }
  assert.doesNotMatch(messages.ja['comparison.notice'], /信頼度|意味がある/u);
  assert.doesNotMatch(messages.en['comparison.notice'], /confidence score|meaningful match/iu);
});

test('import and share messages state integrity and privacy boundaries', () => {
  assert.match(messages.ja['import.integrityFailed'], /合計・トレース・比較/u);
  assert.match(messages.en['import.integrityFailed'], /total, trace, or comparison/iu);
  assert.match(messages.ja['share.notice'], /入力本文は含めません/u);
  assert.match(messages.en['share.notice'], /input text is omitted/iu);
  assert.match(messages.ja['breakdown.notice'], /単語判定ではありません/u);
  assert.match(messages.en['breakdown.notice'], /does not perform linguistic word segmentation/iu);
});
