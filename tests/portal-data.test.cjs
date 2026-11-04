const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

const root = path.resolve(__dirname, '..');
const platforms = JSON.parse(fs.readFileSync(path.join(root, 'data/platforms.json'), 'utf8'));
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const expectedIds = [
  'vessel-portal', 'ship-itinerary', 'sqms-revision-system',
  'tmsa-drybms-system', 'fleet-inspection', 'ship-dynamics-todo-system',
  'maritime-regulations', 'psc-atlas', 'monthly-safety-report-system'
];

test('the requested nine platforms retain their exact order and audience', () => {
  assert.deepEqual(platforms.map(p => p.id), expectedIds);
  assert.deepEqual(platforms.map(p => p.audience), [
    'vessel', 'vessel', 'vessel', 'office', 'office', 'office', 'office', 'office', 'office'
  ]);
  assert.equal(new Set(platforms.map(p => p.id)).size, platforms.length);
});

test('both new entries preserve the supplied titles, URLs and screenshot paths', () => {
  const expected = [
    ['vessel-portal', '船端檢查填報和資訊平台', 'https://sski2468-hua.github.io/vessel-portal/?preview=B105', 'assets/screenshots/vessel-portal.png'],
    ['ship-itinerary', '船端動態追蹤和內控異常提報平台', 'https://ttwonder.github.io/ship-dynamics-todo-system/ship-itinerary.html', 'assets/screenshots/ship-itinerary.png']
  ];
  for (const [id, title, url, image] of expected) {
    const platform = platforms.find(p => p.id === id);
    assert.ok(platform, `missing platform: ${id}`);
    assert.deepEqual([platform.title, platform.url, platform.image], [title, url, image]);
  }
});

test('the offline/fetch-failure fallback exactly matches the published catalog', () => {
  const match = html.match(/const fallbackPlatforms = ([\s\S]*?);\s*const grid/);
  assert.ok(match, 'fallback catalog must be present');
  assert.deepEqual(JSON.parse(match[1]), platforms);
});

test('every card has a local PNG screenshot and HTTPS destination', () => {
  for (const platform of platforms) {
    assert.equal(new URL(platform.url).protocol, 'https:');
    const image = fs.readFileSync(path.join(root, platform.image));
    assert.equal(image.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
    assert.ok(platform.title && platform.description);
  }
});

test('both deployed HTML entry scripts compile', () => {
  for (const file of ['index.html', 'maintenance.html']) {
    const source = fs.readFileSync(path.join(root, file), 'utf8');
    for (const [, script] of source.matchAll(/<script>([\s\S]*?)<\/script>/g)) {
      assert.doesNotThrow(() => new vm.Script(script, { filename: file }));
    }
  }
});
