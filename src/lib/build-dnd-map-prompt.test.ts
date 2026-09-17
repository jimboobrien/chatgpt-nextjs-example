import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildDndMapPrompt } from './build-dnd-map-prompt.ts';

test('builds a prompt from a single request without leftover state', () => {
  const first = buildDndMapPrompt({
    mapType: 'dungeon',
    mapGeo: 'rivers',
    mapStyle: 'hand-drawn',
    prompt: 'forest village',
  });
  const second = buildDndMapPrompt({
    mapType: 'overworld',
    mapGeo: 'mountains',
    mapStyle: 'watercolor',
    prompt: 'desert ruins',
  });

  assert.equal(
    first,
    'create me a DND map with a dungeon be sure to include rivers and make it in the style of hand-drawn and forest village '
  );
  assert.equal(
    second,
    'create me a DND map with a overworld be sure to include mountains and make it in the style of watercolor and desert ruins '
  );
  assert.equal(second.includes('forest village'), false);
});

test('omits empty optional fields', () => {
  const prompt = buildDndMapPrompt({
    mapType: '',
    mapGeo: '',
    mapStyle: '',
    prompt: 'a tavern',
  });

  assert.equal(prompt, 'create me a DND map and a tavern ');
});
