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
});
