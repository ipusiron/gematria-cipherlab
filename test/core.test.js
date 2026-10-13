'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const {
  MAX_INPUT_LENGTH,
  SCHEMES,
  analyze
} = require('../gematria-core.js');

test('Simple English A=1 maps the alphabet from 1 to 26', () => {
  const result = analyze('AZ', 'simple-english');
  assert.equal(result.total, 27);
  assert.deepEqual(result.tokens.map(item => item.value), [1, 26]);
});

test('Simple English A=0 maps the alphabet from 0 to 25', () => {
  const result = analyze('AZ', 'simple-english-0');
  assert.equal(result.total, 25);
  assert.deepEqual(result.tokens.map(item => item.value), [0, 25]);
});

test('English x6 is exactly six times English Ordinal', () => {
  const ordinal = analyze('COMPUTER', 'simple-english');
  const timesSix = analyze('COMPUTER', 'english-gematria');
  assert.equal(ordinal.total, 111);
  assert.equal(timesSix.total, 666);
  assert.equal(timesSix.total, ordinal.total * 6);
});

test('Latin23 merges J with I and U with V, while excluding W', () => {
  const result = analyze('JUV W', 'simple-latin23');
  assert.equal(result.total, 49);
  assert.deepEqual(result.tokens.map(item => item.token), ['I', 'V', 'V']);
  assert.deepEqual(result.excluded.map(item => item.char), ['W']);
  assert.equal(result.ignored.length, 1);
});

test('Agrippa 23 uses the 1-500 table and classical aliases', () => {
  const result = analyze('JUV WZ', 'agrippa-23');
  assert.equal(result.total, 909);
  assert.deepEqual(result.tokens.map(item => item.token), ['I', 'V', 'V', 'Z']);
  assert.deepEqual(result.tokens.map(item => item.value), [9, 200, 200, 500]);
  assert.deepEqual(result.excluded.map(item => item.char), ['W']);
});

test('Agrippa 27 modern transcription exposes all 27 table entries', () => {
  const scheme = SCHEMES['agrippa-27'];
  assert.equal(scheme.tokens.length, 27);
  assert.equal(scheme.mapping.J, 600);
  assert.equal(scheme.mapping.V, 700);
  assert.equal(scheme.mapping.HI, 800);
  assert.equal(scheme.mapping.HV, 900);
});

test('Agrippa 27 uses longest matches and keeps boundaries meaningful', () => {
  assert.equal(analyze('HI', 'agrippa-27').total, 800);
  assert.equal(analyze('HV', 'agrippa-27').total, 900);
  assert.equal(analyze('H I', 'agrippa-27').total, 17);
  assert.equal(analyze('H-V', 'agrippa-27').total, 708);
});

test('Agrippa 27 treats W as an explicit HV alias', () => {
  const result = analyze('W', 'agrippa-27');
  assert.equal(result.total, 900);
  assert.deepEqual(result.tokens[0], {
    original: 'W',
    token: 'HV',
    value: 900,
    index: 0,
    normalized: true
  });
});

test('Agrippa 27 modern transcription keeps I/J and U/V distinct', () => {
  const result = analyze('IJUV', 'agrippa-27');
  assert.equal(result.total, 1509);
  assert.deepEqual(result.tokens.map(item => item.value), [9, 600, 200, 700]);
});

test('Hebrew standard values match common examples', () => {
  assert.equal(analyze('שלום', 'hebrew-gematria').total, 376);
  assert.equal(analyze('חי', 'hebrew-gematria').total, 18);
  assert.equal(analyze('אמת', 'hebrew-gematria').total, 441);
});

test('Hebrew final forms use the same values as their ordinary forms', () => {
  const result = analyze('ככםמנןפףצץ', 'hebrew-gematria');
  assert.deepEqual(result.tokens.map(item => item.value), [20, 20, 40, 40, 50, 50, 80, 80, 90, 90]);
});

test('Hebrew points and cantillation marks are ignored without exclusion', () => {
  const result = analyze('שָׁלוֹם', 'hebrew-gematria');
  assert.equal(result.total, 376);
  assert.equal(result.excluded.length, 0);
  assert.ok(result.ignored.length >= 3);
  assert.ok(result.ignored.every(item => item.reason === 'hebrew-mark'));
});

test('Hebrew presentation forms decompose before calculation', () => {
  const result = analyze('שׁ', 'hebrew-gematria');
  assert.equal(result.total, 300);
  assert.equal(result.excluded.length, 0);
  assert.equal(result.tokens[0].token, 'ש');
  assert.ok(result.ignored.some(item => item.reason === 'hebrew-mark'));
});

test('punctuation, spaces, and digits are ignored rather than warned about', () => {
  const result = analyze('A-1 B!', 'simple-english');
  assert.equal(result.total, 3);
  assert.equal(result.excluded.length, 0);
  assert.equal(result.ignored.length, 4);
});

test('undefined letters are reported as excluded', () => {
  const result = analyze('ABCΩ', 'simple-english');
  assert.equal(result.total, 6);
  assert.deepEqual(result.excluded.map(item => item.char), ['Ω']);
});

test('scheme definitions and returned results are deeply frozen', () => {
  assert.ok(Object.isFrozen(SCHEMES));
  assert.ok(Object.isFrozen(SCHEMES['agrippa-27']));
  assert.ok(Object.isFrozen(SCHEMES['agrippa-27'].mapping));
  assert.ok(Object.isFrozen(SCHEMES['agrippa-27'].compoundTokens));

  const result = analyze('HV', 'agrippa-27');
  assert.ok(Object.isFrozen(result));
  assert.ok(Object.isFrozen(result.tokens));
  assert.ok(Object.isFrozen(result.tokens[0]));
});

test('repeated analysis does not mutate compound-token priority', () => {
  const before = [...SCHEMES['agrippa-27'].compoundTokens];
  analyze('HVHI', 'agrippa-27');
  analyze('HIHV', 'agrippa-27');
  assert.deepEqual(SCHEMES['agrippa-27'].compoundTokens, before);
});

test('input length and unknown schemes are rejected', () => {
  assert.throws(
    () => analyze('A'.repeat(MAX_INPUT_LENGTH + 1), 'simple-english'),
    error => error instanceof RangeError && error.message === 'input-too-long'
  );
  assert.throws(
    () => analyze('ABC', 'missing-scheme'),
    error => error instanceof RangeError && error.message === 'unknown-scheme'
  );
});
