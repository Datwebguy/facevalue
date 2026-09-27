// The Midnight runtime calls Node's Buffer (e.g. when a circuit receives a shielded coin).
// Browsers have no Buffer, so provide one before anything else loads.
import { Buffer } from 'buffer';

const g = globalThis as unknown as { Buffer?: typeof Buffer };
g.Buffer ??= Buffer;
