import Link from "next/link";
import type { Job } from "@/db/schema";
import { CATEGORY_ICONS, formatSalary, timeAgo } from "@/lib/constants";

export function AccommodationChips({ job }: { job: Job }) {
  const chips: { label: string; className: string }[] = [];
  if (job.aslFriendly)
    chips.push({
      label: "🤟 ASL-friendly",
      className: "bg-brand-50 text-brand-700",
    });
  if (job.vpFriendly)
    chips.push({
      label: "📞 Videophone OK",
      className: "bg-violet-500/10 text-violet-600",
    });
  if (job.interpreterProvided)
    chips.push({
      label: "🗣️ Interpreter provided",
      className: "bg-accent-100 text-accent-600",
    });
  if (job.captionsProvided)
    chips.push({ label: "💬 Captions", className: "bg-mist-100 text-ink-700" });
  if (job.flexibleHours)
    chips.push({ label: "🕒 Flexible hours", className: "bg-mist-100 text-ink-700" });

  return (
    <ul className="flex flex-wrap gap-1.5">
      {chips.map((chip) => (
        <li key={chip.label}>
          <span className={`chip ${chip.className}`}>{chip.label}</span>
        </li>
      ))}
    </ul>
  );
}

export default function JobCard({ job }: { job: Job }) {
  return (
    <article className="card group relative flex flex-col gap-4 p-5 transition hover:-translate-y-0.5 hover:border-brand-300">
      <div className="flex items-start gap-4">
        <span
          aria-hidden="true"
          className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-mist-100 text-2xl"
        >
          {job.logo}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-bold leading-snug text-ink-900">
            <Link href={`/jobs/${job.id}`} className="after:absolute after:inset-0">
              {job.title}
            </Link>
          </h3>
          <p className="mt-0.5 text-sm font-semibold text-ink-500">
            {job.company} · {job.location}
          </p>
        </div>
        <span className="hidden shrink-0 rounded-full bg-mist-100 px-2.5 py-1 text-xs font-semibold text-ink-500 sm:block">
          {timeAgo(job.postedAt)}
        </span>
      </div>

      <p className="text-sm leading-relaxed text-ink-700">{job.summary}</p>

      <AccommodationChips job={job} />

      <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-mist-200 pt-4 text-sm">
        <span className="chip bg-brand-50 text-brand-700">
          {CATEGORY_ICONS[job.category] ?? "💼"} {job.category}
        </span>
        <span className="chip bg-mist-100 text-ink-700">{job.employmentType}</span>
        {job.remote ? (
          <span className="chip bg-accent-100 text-accent-600">🏠 Remote</span>
        ) : null}
        <span className="ml-auto font-bold text-ink-900">
          {formatSalary(job.salaryMin, job.salaryMax, job.salaryUnit)}
        </span>
      </div>

      <p className="text-xs font-semibold text-brand-600">
        Contact: {job.contactName ?? job.company}
        {job.contactVp ? ` · VP ${job.contactVp}` : ""}
      </p>
    </article>
  );
}
