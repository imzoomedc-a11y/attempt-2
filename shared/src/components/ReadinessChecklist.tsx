"use client";

import { useEffect, useState } from "react";

const ITEMS = [
  {
    id: "resume",
    label: "My resume is a text-based file (no audio or video-only resume)",
    hint: "Screen readers, captioning tools, and recruiters all parse plain text best.",
  },
  {
    id: "rights",
    label: "I can name my legal right to reasonable accommodations",
    hint: "In the US, the ADA covers employers with 15 or more employees.",
  },
  {
    id: "accommodation-script",
    label: "I have a short written accommodation request ready to send",
    hint: "Keep it to three sentences: what you need, why, and that it is low cost.",
  },
  {
    id: "vp",
    label: "My contact details include a videophone number or captioned line",
    hint: "This prevents a recruiter from defaulting to a phone call.",
  },
  {
    id: "interview",
    label: "I have asked for the interview format in writing ahead of time",
    hint: "Ask whether interpreters, captions, or extra time will be available.",
  },
  {
    id: "portfolio",
    label: "I can show work samples instead of relying on small talk",
    hint: "Portfolios level the playing field when interviews are conversational.",
  },
  {
    id: "network",
    label: "I am connected to at least one Deaf professional community",
    hint: "Referrals are still how most Deaf candidates find inclusive employers.",
  },
  {
    id: "disclosure",
    label: "I have decided when and how I want to disclose my deafness",
    hint: "Disclosure is your choice — you can decide separately for each stage.",
  },
];

const STORAGE_KEY = "signworks:readiness";

export default function ReadinessChecklist() {
  const [checked, setChecked] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setChecked(JSON.parse(stored) as string[]);
    } catch {
      /* storage unavailable — ignore */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
    } catch {
      /* storage unavailable — ignore */
    }
  }, [checked, loaded]);

  const toggle = (id: string) =>
    setChecked((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );

  const percent = Math.round((checked.length / ITEMS.length) * 100);

  return (
    <div className="card p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-xl font-extrabold text-ink-900">
          Job search readiness check
        </h3>
        <p className="text-sm font-bold text-brand-600">{percent}% ready</p>
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
        Eight things that make a Deaf job search go smoother. Your progress is saved on
        this device only.
      </p>

      <div
        className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-mist-200"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Job search readiness"
      >
        <div
          className="h-full rounded-full bg-brand-500 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      <ul className="mt-5 space-y-2.5">
        {ITEMS.map((item) => {
          const isChecked = checked.includes(item.id);
          return (
            <li key={item.id}>
              <label
                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition ${
                  isChecked
                    ? "border-brand-300 bg-brand-50"
                    : "border-mist-200 bg-white hover:border-brand-200"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggle(item.id)}
                  className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--color-brand-500)]"
                />
                <span>
                  <span className="block text-sm font-semibold text-ink-900">
                    {item.label}
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-ink-500">
                    {item.hint}
                  </span>
                </span>
              </label>
            </li>
          );
        })}
      </ul>

      {percent === 100 ? (
        <p
          role="status"
          className="mt-4 rounded-xl bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-700"
        >
          🤟 All eight done. Go apply — you are ready.
        </p>
      ) : null}
    </div>
  );
}
