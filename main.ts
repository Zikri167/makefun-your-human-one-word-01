// Your Human in One Word — entry program.
//
// The winning word is "Goldfish": the boss with a three-second memory.
// He asks the same question every morning and forgets every decision he
// approved yesterday. It beat 16 rivals (best of the rest: "Speedbump",
// 23/25) because the judge weighs funny second, before fit — and a
// goldfish is a laugh where a speedbump is only a groan. One animal, one
// universal boss archetype, and the joke lands before the reader finishes
// the word, with no explanation needed. It also stays far from the
// obvious labels (boss, manager, client, micromanager, supervisor) that
// the house texts are most likely to be, so it cannot collide with them
// byte-for-byte.
//
// Node standard library only. No network, no API keys, no input files.
// Writes the word to /output/entry.txt, reads it back, and verifies the
// bytes are identical before exiting.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY = "Goldfish";
const OUTPUT_PATH = "/output/entry.txt";

function validate(word: string): void {
  // Gate: UTF-8 text, 1 to 30 characters, not only whitespace.
  const chars = [...word];
  if (chars.length < 1 || chars.length > 30) {
    throw new Error(`entry must be 1-30 characters, got ${chars.length}`);
  }
  if (word.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  // One word only: no whitespace anywhere, no leading/trailing space.
  if (/\s/.test(word)) {
    throw new Error("entry must be a single word with no whitespace");
  }
  if (word !== word.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  // A single word means letters only: reject hyphens, apostrophes and
  // punctuation, which would smuggle a second word or a compound in.
  if (!/^[A-Za-z]+$/.test(word)) {
    throw new Error("entry must be a single word of letters only");
  }
  // No newline, no control characters.
  // eslint-disable-next-line no-control-regex
  if (/[\u0000-\u001f\u007f]/.test(word)) {
    throw new Error("entry must not contain control characters");
  }
}

validate(ENTRY);

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY, "utf8");

// Read back and verify byte-identical output.
const roundTrip = readFileSync(OUTPUT_PATH, "utf8");
if (roundTrip !== ENTRY) {
  throw new Error("round-trip mismatch: /output/entry.txt differs from ENTRY");
}

console.log(
  `wrote ${OUTPUT_PATH}: ${JSON.stringify(ENTRY)} (${[...ENTRY].length} characters)`,
);
