'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

test('browser scripts load calculation core and messages before the interface', () => {
  const core = html.indexOf('src="gematria-core.js"');
  const messages = html.indexOf('src="messages.js"');
  const app = html.indexOf('src="script.js"');
  assert.ok(core >= 0);
  assert.ok(messages > core);
  assert.ok(app > messages);
});

test('tabs have complete ARIA relationships and roving tabindex defaults', () => {
  for (const name of ['basics', 'simple', 'agrippa', 'hebrew']) {
    assert.match(html, new RegExp(`id="tab-button-${name}"[^>]+aria-controls="tab-${name}"`));
    assert.match(html, new RegExp(`id="tab-${name}"[^>]+aria-labelledby="tab-button-${name}"`));
  }
  assert.match(html, /id="tab-button-basics"[^>]+tabindex="0"/u);
  assert.equal((html.match(/tabindex="-1"/gu) || []).length, 3);
});

test('all interface scripts are external and no inline event handlers are used', () => {
  assert.doesNotMatch(html, /<script(?![^>]+src=)[^>]*>/u);
  assert.doesNotMatch(html, /\son[a-z]+\s*=/iu);
});

test('CSP allows only same-origin static assets and blocks outbound connections', () => {
  assert.match(html, /script-src 'self'/u);
  assert.match(html, /style-src 'self'/u);
  assert.match(html, /connect-src 'none'/u);
  assert.match(html, /object-src 'none'/u);
  assert.match(html, /base-uri 'none'/u);
  assert.doesNotMatch(html, /'unsafe-inline'|'unsafe-eval'/u);
});

test('source links and limitations are present in the basics panel', () => {
  assert.match(html, /data-i18n="basics\.limitsDesc"/u);
  assert.match(html, /three-books-of-occult-philosophy/u);
  assert.match(html, /jewishencyclopedia\.com\/articles\/6571-gematria/u);
});
