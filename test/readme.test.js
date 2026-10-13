'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const ja = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
const en = fs.readFileSync(path.join(root, 'README.en.md'), 'utf8');

function levelTwoHeadings(markdown) {
  return [...markdown.matchAll(/^## (.+)$/gmu)].map(match => match[1]);
}

function relativeTargets(markdown) {
  return [...markdown.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/gu)]
    .map(match => match[1])
    .filter(target => !/^(?:https?:|#)/u.test(target));
}

test('language navigation is present in the required position', () => {
  assert.match(ja, /\[English\]\(README\.en\.md\) · 日本語/u);
  assert.equal(en.split(/\r?\n/u)[0], 'English · [日本語](README.md)');
});

test('Japanese and English READMEs have corresponding section order', () => {
  const jaHeadings = levelTwoHeadings(ja);
  const enHeadings = levelTwoHeadings(en);
  assert.equal(jaHeadings.length, 14);
  assert.equal(enHeadings.length, 14);
  assert.deepEqual(
    enHeadings,
    [
      '🌐 Live Demo',
      '📸 Screenshot',
      '✨ Features',
      '🎯 Use Cases',
      '📖 Included Methods',
      '🔬 Calculation Trace',
      '⚠️ Limitations of the Result',
      '🔒 Security and Privacy',
      '🚀 Usage',
      '🧪 Tests',
      '📁 Directory Structure',
      '🔗 References',
      '📄 License',
      '🛠️ About This Tool'
    ]
  );
});

test('both READMEs state the implemented Agrippa and Hebrew rules', () => {
  for (const markdown of [ja, en]) {
    assert.match(markdown, /J=600/u);
    assert.match(markdown, /V=700/u);
    assert.match(markdown, /HI=800/u);
    assert.match(markdown, /HV=900/u);
    assert.match(markdown, /W→HV/u);
    assert.match(markdown, /NFKD/u);
    assert.match(markdown, /שָׁלוֹם/u);
    assert.match(markdown, /376/u);
    assert.match(markdown, /936/u);
    assert.match(markdown, /500/u);
    assert.match(markdown, /900/u);
    assert.match(markdown, /gematria-cipherlab\.analysis/u);
  }
});

test('README terminology avoids unsupported origin claims', () => {
  const combined = `${ja}\n${en}`;
  assert.doesNotMatch(combined, /English Sumerian|Aleister Crowley|アレイスター・クロウリー/u);
  assert.doesNotMatch(combined, /previously|used to|earlier version|formerly/iu);
});

test('all local README links and images resolve to files', () => {
  for (const [filename, markdown] of [['README.md', ja], ['README.en.md', en]]) {
    for (const target of relativeTargets(markdown)) {
      const cleanTarget = decodeURIComponent(target.split('#')[0]);
      assert.ok(fs.existsSync(path.resolve(root, cleanTarget)), `${filename}: missing ${target}`);
    }
  }
});

test('directory trees list the implemented core, catalogs, tests, and screenshots', () => {
  for (const markdown of [ja, en]) {
    for (const entry of ['gematria-core.js', 'messages.js', 'README.en.md', 'test.yml', 'readme.test.js', '│   ├── en/']) {
      assert.match(markdown, new RegExp(entry.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&')));
    }
    assert.doesNotMatch(markdown, /hosoku\.md/u);
  }
});
