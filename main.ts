// SPDX-License-Identifier: MIT
// Ember Office Joke Open — one line of office comedy for the make.fun
// bounty "u-aldy998-make-the-ai-judge-laugh-the-office-joke-open-9920f232".
//
// DRAFTS (3 candidates, judged against the published judge brief:
// office life first, a turn that pays off in the last few words,
// one specific office detail, fresh, tight enough to read in one pass):
//
// A (PICK, 44 chars): "Our standup ran 45 minutes. Nobody stood up."
//    The joke is the word "standup" itself: a meeting named for standing
//    that nobody stands in, and that runs 45 minutes. The payoff lands
//    in the last three words, and every office worker recognises it.
// B (62 chars): "My calendar blocked focus time for a meeting about focus time."
//    Same meeting-about-a-meeting turn, but longer and the payoff is
//    softer — "focus time" repeats instead of flipping.
// C (65 chars): "The meeting could have been an email. The email became a meeting."
//    A familiar setup taken somewhere, but the second sentence explains
//    the first instead of landing a punch; it reads like a remark.
//
// A wins: shortest, sharpest, deadpan fragment, one specific detail
// (the daily standup), and the turn is the last three words.

import { mkdirSync, writeFileSync } from "node:fs";

const JOKE = "Our standup ran 45 minutes. Nobody stood up.";

// The gate only accepts 1-200 characters of non-blank UTF-8 text on a
// single line, so refuse to write anything outside that window — or
// anything with a line break in it — instead of submitting a file
// the scorer would throw away. A joke that is only whitespace is not
// a joke: reject it outright, and check the byte length too, since
// the leaderboard's Size column counts bytes, not characters.
const characters = [...JOKE].length;
const bytes = Buffer.byteLength(JOKE, "utf8");
if (JOKE.trim().length === 0) {
  throw new Error("joke must not be only whitespace");
}
if (characters < 1 || characters > 200 || JOKE.trim().length === 0) {
  throw new Error(`joke is ${characters} characters, outside the 1-200 gate`);
}
if (bytes > 200) {
  throw new Error(`joke is ${bytes} bytes, over the 200-byte size column`);
}
if (JOKE.includes("\n") || JOKE.includes("\r")) {
  throw new Error("joke must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", JOKE, "utf8");
console.log(`${characters} characters written to /output/entry.txt`);
