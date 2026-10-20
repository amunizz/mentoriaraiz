import { PIX_PAYLOAD } from './pix.ts';

type ClipboardPorts = {
  writeText?: (text: string) => Promise<void>;
  selectCode: () => boolean;
  legacyCopy: () => boolean;
};

/** Only reports success when an actual copy operation succeeds. */
export async function copyPixPayload(ports: ClipboardPorts): Promise<'copied' | 'manual'> {
  if (ports.writeText) {
    try {
      await ports.writeText(PIX_PAYLOAD);
      return 'copied';
    } catch { /* Permission denied: try the selectable compatibility path. */ }
  }
  try {
    if (!ports.selectCode()) return 'manual';
    return ports.legacyCopy() ? 'copied' : 'manual';
  } catch {
    return 'manual';
  }
}
