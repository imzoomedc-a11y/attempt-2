"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

const HANDSHAPES: Record<string, string> = {
  A: "Closed fist, thumb alongside the side of the hand.",
  B: "Fingers up together, thumb folded across the palm.",
  C: "Hand curves into a C shape, like holding a small cup.",
  D: "Index finger points up, other fingertips touch the thumb.",
  E: "Fingertips curl down onto the thumb to make a tight curve.",
  F: "Thumb and index touch in a circle, three fingers stay up.",
  G: "Index finger points sideways with the thumb parallel.",
  H: "Index and middle fingers held together, pointing sideways.",
  I: "Pinky sticks up from a closed fist.",
  J: "Pinky draws a J in the air from a closed fist.",
  K: "Index and middle fingers up in a V, thumb between them.",
  L: "Index finger up with the thumb out to make an L.",
  M: "Three fingers fold over the thumb.",
  N: "Two fingers fold over the thumb.",
  O: "All fingertips meet the thumb in a round O.",
  P: "K shape pointed downward, like a small flag.",
  Q: "G shape pointed downward, thumb and index hanging.",
  R: "Index and middle fingers cross over each other.",
  S: "Closed fist with the thumb crossed in front of the fingers.",
  T: "Thumb tucked between the index and middle fingers.",
  U: "Index and middle fingers up, held tightly together.",
  V: "Index and middle fingers up, spread apart.",
  W: "Index, middle, and ring fingers all spread apart.",
  X: "Index finger hooks into a curved hook shape.",
  Y: "Thumb and pinky extended, middle fingers folded.",
  Z: "Index finger draws a Z in the air.",
};

export default function Fingerspeller() {
  const [word, setWord] = useState("HIRE");
  const letters = useMemo(
    () =>
      word
        .toUpperCase()
        .split("")
        .filter((character) => character in HANDSHAPES)
        .slice(0, 12),
    [word],
  );
  const skipped = word.replace(new RegExp(`[^a-zA-Z]`, "g"), "").length !== word.length;

  return (
    <div className="card overflow-hidden">
      <div className="border-b border-mist-200 p-6">
        <h3 className="text-xl font-extrabold text-ink-900">Fingerspelling practice</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
          Type any word to break it into ASL handshapes. Hearing coworkers: try
          fingerspelling a teammate&apos;s name tomorrow — it is the fastest way to show
          you are trying.
        </p>
        <label className="label mt-5" htmlFor="fingerspell-word">
          Word to spell
        </label>
        <input
          id="fingerspell-word"
          className="field"
          value={word}
          onChange={(event) => setWord(event.target.value)}
          placeholder="e.g. INTERVIEW"
          maxLength={24}
        />
        {skipped ? (
          <p className="mt-2 text-xs font-semibold text-accent-600">
            Numbers and punctuation are skipped — only letters get handshapes.
          </p>
        ) : null}
      </div>

      <div className="bg-mist-50 p-6">
        <ul className="flex flex-wrap gap-2.5" aria-live="polite">
          {letters.length === 0 ? (
            <li className="text-sm text-ink-500">Type a word above to see handshapes.</li>
          ) : null}
          {letters.map((letter, index) => (
            <li key={`${letter}-${index}`} className="w-[7.5rem]">
              <div className="rounded-2xl border border-mist-200 bg-white p-3 text-center">
                <span className="block text-3xl font-black tracking-tight text-brand-600">
                  {letter}
                </span>
                <span className="mt-2 block text-[11px] leading-snug text-ink-500">
                  {HANDSHAPES[letter]}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <figure className="border-t border-mist-200 p-6">
        <Image
          src="/images/asl-alphabet.png"
          alt="Illustrated chart of all 26 American Sign Language fingerspelling handshapes"
          width={1024}
          height={768}
          className="w-full rounded-2xl border border-mist-200 bg-white"
        />
        <figcaption className="mt-3 text-xs leading-relaxed text-ink-500">
          Reference chart — practice in front of a mirror or record yourself and check
          your handshape against each letter.
        </figcaption>
      </figure>
    </div>
  );
}
