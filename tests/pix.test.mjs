import test from 'node:test';
import assert from 'node:assert/strict';
import { PIX_PAYLOAD, pixPayment } from '../src/pix.ts';
import { copyPixPayload } from '../src/pixClipboard.ts';

test('preserves the exact approved Pix payload', () => {
  assert.equal(PIX_PAYLOAD, '00020101021126500014br.gov.bcb.pix0111002859630740213Mentoria RAIZ52040000530398654071997.005802BR5919PRISCILA V DOMINGOS6012PORTO ALEGRE62070503***6304A0D6');
  const fields = new Map();
  for (let offset = 0; offset < PIX_PAYLOAD.length;) {
    const tag = PIX_PAYLOAD.slice(offset, offset + 2);
    const length = Number(PIX_PAYLOAD.slice(offset + 2, offset + 4));
    fields.set(tag, PIX_PAYLOAD.slice(offset + 4, offset + 4 + length));
    offset += 4 + length;
  }
  assert.equal(fields.get('54'), '1997.00');
  assert.equal(fields.get('59'), pixPayment.beneficiary);
  let checksum = 0xffff;
  for (const byte of Buffer.from(PIX_PAYLOAD.slice(0, -4))) {
    checksum ^= byte << 8;
    for (let bit = 0; bit < 8; bit++) checksum = (checksum & 0x8000 ? (checksum << 1) ^ 0x1021 : checksum << 1) & 0xffff;
  }
  assert.equal(checksum.toString(16).toUpperCase().padStart(4, '0'), fields.get('63'));
});

test('Clipboard API copies the full payload without changes', async () => {
  let written;
  const result = await copyPixPayload({ writeText: async text => { written = text; }, selectCode: () => { throw Error('not needed'); }, legacyCopy: () => { throw Error('not needed'); } });
  assert.equal(result, 'copied');
  assert.equal(written, PIX_PAYLOAD);
});

test('denied Clipboard API falls back to selected legacy copy', async () => {
  const calls = [];
  const result = await copyPixPayload({ writeText: async () => { throw Error('denied'); }, selectCode: () => { calls.push('select'); return true; }, legacyCopy: () => { calls.push('copy'); return true; } });
  assert.equal(result, 'copied');
  assert.deepEqual(calls, ['select', 'copy']);
});

test('missing Clipboard API still supports compatibility copy', async () => {
  assert.equal(await copyPixPayload({ selectCode: () => true, legacyCopy: () => true }), 'copied');
});

test('failed compatibility copy leaves the manual selection path', async () => {
  let selected = false;
  assert.equal(await copyPixPayload({ selectCode: () => { selected = true; return true; }, legacyCopy: () => false }), 'manual');
  assert.equal(selected, true);
});

test('does not copy unrelated content when the code cannot be selected', async () => {
  assert.equal(await copyPixPayload({ selectCode: () => false, legacyCopy: () => { throw Error('must not run'); } }), 'manual');
});

test('compatibility errors never claim successful copying', async () => {
  assert.equal(await copyPixPayload({ selectCode: () => true, legacyCopy: () => { throw Error('unavailable'); } }), 'manual');
});
