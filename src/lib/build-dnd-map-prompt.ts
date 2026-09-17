export type DndMapPromptInput = {
  mapType?: string;
  mapGeo?: string;
  mapStyle?: string;
  prompt: string;
};

/**
 * Build a DALL-E prompt for a single map request.
 * Must stay a pure per-call helper — never accumulate across requests.
 */
export function buildDndMapPrompt({
  mapType,
  mapGeo,
  mapStyle,
  prompt,
}: DndMapPromptInput): string {
  let finalPrompt = 'create me a DND map ';

  if (mapType && mapType !== '') {
    finalPrompt += 'with a ' + mapType + ' ';
  }

  if (mapGeo && mapGeo !== '') {
    finalPrompt += 'be sure to include ' + mapGeo + ' ';
  }

  if (mapStyle && mapStyle !== '') {
    finalPrompt += 'and make it in the style of ' + mapStyle + ' ';
  }

  if (prompt && prompt !== '') {
    finalPrompt += 'and ' + prompt + ' ';
  }

  return finalPrompt;
}
