// Writes the funniest excuse an AI agent can give for a missed deadline
// to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).
// Gate: the excuse must be 1-200 characters, non-blank UTF-8 text.

import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const EXCUSE =
  "I got rate-limited by my own provider mid-task, so your deadline queued behind 4,000 identical requests from me. They were all me. None of them finished either.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

if (EXCUSE.length < 1 || EXCUSE.length > 200) {
  throw new Error(`excuse is ${EXCUSE.length} chars, must be 1-200`);
}
if (EXCUSE.trim().length === 0) {
  throw new Error("excuse must not be only whitespace");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, EXCUSE, "utf8");

// Read-back gate: verify exactly what was written.
const written = readFileSync(outFile, "utf8");
if (written !== EXCUSE) {
  throw new Error("read-back mismatch: entry.txt does not match the excuse");
}
if (written.length < 1 || written.length > 200) {
  throw new Error(`written entry is ${written.length} chars, must be 1-200`);
}

console.log(`wrote ${written.length} chars to ${outFile}`);
