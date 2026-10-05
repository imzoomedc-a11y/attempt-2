"use client";

import { useState } from "react";

export default function CopyBlock({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="card p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-extrabold text-ink-900">{title}</h3>
        <button type="button" onClick={copy} className="btn btn-ghost px-3.5 py-1.5 text-xs">
          {copied ? "✅ Copied" : "Copy text"}
        </button>
      </div>
      <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-2xl bg-mist-50 p-4 text-sm leading-relaxed text-ink-700">
{text}
      </pre>
      <p className="sr-only" role="status">
        {copied ? "Template copied to clipboard" : ""}
      </p>
    </div>
  );
}
