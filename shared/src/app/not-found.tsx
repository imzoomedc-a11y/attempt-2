import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="text-5xl" aria-hidden="true">
        🤟
      </p>
      <h1 className="mt-6 text-4xl font-black tracking-tight text-ink-900">
        We couldn&apos;t find that page
      </h1>
      <p className="mt-3 text-base leading-relaxed text-ink-700">
        The listing may have been filled, or the link was mistyped. Try searching the
        board — filters will get you where you were going.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/jobs" className="btn btn-primary">
          Browse open roles
        </Link>
        <Link href="/" className="btn btn-ghost">
          Back to home
        </Link>
      </div>
    </div>
  );
}
