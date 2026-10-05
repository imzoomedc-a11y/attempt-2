import Link from "next/link";
import { notFound } from "next/navigation";
import ApplicationForm from "@/components/ApplicationForm";
import JobCard, { AccommodationChips } from "@/components/JobCard";
import { CATEGORY_ICONS, formatSalary, timeAgo } from "@/lib/constants";
import { countApplications, getJob, relatedJobs } from "@/lib/queries";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params) {
  const { id } = await params;
  const job = await getJob(Number(id));
  if (!job) return { title: "Listing not found" };
  return {
    title: `${job.title} — ${job.company}`,
    description: job.summary,
  };
}

export default async function JobDetailPage({
  params,
  searchParams,
}: Params & { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const jobId = Number(id);
  if (!Number.isFinite(jobId)) notFound();

  const job = await getJob(jobId);
  if (!job) notFound();

  const [related, applicationCount] = await Promise.all([
    relatedJobs(job),
    countApplications(),
  ]);
  const justPosted = query.posted === "1";

  const facts = [
    {
      label: "Category",
      value: `${CATEGORY_ICONS[job.category] ?? "💼"} ${job.category}`,
    },
    { label: "Type", value: job.employmentType },
    { label: "Location", value: job.location },
    {
      label: "Posted pay",
      value: formatSalary(job.salaryMin, job.salaryMax, job.salaryUnit),
    },
    { label: "Posted", value: timeAgo(job.postedAt) },
    { label: "Remote", value: job.remote ? "Yes" : "On-site / hybrid" },
  ];

  type ContactRow = { label: string; value: string; href?: string };

  const contactRows: ContactRow[] = [];
  if (job.contactName)
    contactRows.push({ label: "Ask for", value: job.contactName });
  contactRows.push({
    label: "Email",
    value: job.contactEmail,
    href: `mailto:${job.contactEmail}`,
  });
  if (job.contactVp)
    contactRows.push({ label: "Videophone (VP)", value: job.contactVp });
  if (job.contactPhone)
    contactRows.push({ label: "Voice / relay", value: job.contactPhone });
  if (job.applyUrl)
    contactRows.push({
      label: "Application page",
      value: "Open their application portal ↗",
      href: job.applyUrl,
    });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav aria-label="Breadcrumb" className="text-sm text-ink-500">
        <Link href="/jobs" className="hover:text-brand-600">
          ← All listings
        </Link>
      </nav>

      {justPosted ? (
        <p
          role="status"
          className="mt-4 rounded-2xl border border-brand-300 bg-brand-50 px-5 py-4 text-sm font-semibold text-brand-700"
        >
          ✅ Your listing is live. Share the link with Deaf community groups and
          vocational rehabilitation counselors so people actually find it.
        </p>
      ) : null}

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <header className="card p-6 sm:p-8">
            <div className="flex flex-wrap items-start gap-4">
              <span
                aria-hidden="true"
                className="grid h-16 w-16 place-items-center rounded-3xl bg-mist-100 text-3xl"
              >
                {job.logo}
              </span>
              <div className="min-w-0 flex-1">
                <h1 className="text-3xl font-black leading-tight tracking-tight text-ink-900">
                  {job.title}
                </h1>
                <p className="mt-1 text-base font-semibold text-ink-500">
                  {job.company} · {job.location}
                </p>
              </div>
            </div>

            <AccommodationChips job={job} />

            <p className="mt-5 text-base leading-relaxed text-ink-800">{job.summary}</p>

            <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {facts.map((fact) => (
                <div key={fact.label} className="rounded-2xl bg-mist-50 p-3.5">
                  <dt className="text-[11px] font-bold uppercase tracking-[0.12em] text-ink-500">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 text-sm font-bold text-ink-900">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-mist-200 pt-5">
              {job.applyUrl ? (
                <a
                  href={job.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Apply on {job.company}&apos;s site
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : null}
              <a href="#contact" className="btn btn-ghost">
                How to reach them
              </a>
              <span className="text-xs text-ink-500">
                {applicationCount} person{applicationCount === 1 ? "" : "s"} saved a draft
                for this role
              </span>
            </div>
          </header>

          <section className="card mt-6 p-6 sm:p-8">
            <h2 className="text-xl font-extrabold text-ink-900">About this opening</h2>
            <p className="mt-3 whitespace-pre-line text-base leading-relaxed text-ink-700">
              {job.description}
            </p>
          </section>

          <section className="card mt-6 p-6 sm:p-8">
            <h2 className="text-xl font-extrabold text-ink-900">
              Accessibility notes for this workplace
            </h2>
            {job.accommodations.length > 0 ? (
              <ul className="mt-4 space-y-2.5">
                {job.accommodations.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-2xl bg-brand-50 p-4 text-sm leading-relaxed text-ink-800"
                  >
                    <span aria-hidden="true" className="text-brand-600">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-ink-500">
                Nothing specific is published yet. Ask them directly — accommodation
                requests are normal and legal.
              </p>
            )}
            <p className="mt-5 rounded-2xl bg-mist-50 p-4 text-xs leading-relaxed text-ink-500">
              In the United States the ADA requires most employers with 15 or more staff
              to provide reasonable accommodations, and many state vocational
              rehabilitation agencies will pay for interpreters, certification fees, and
              equipment. Openings and pay change constantly — always confirm details with
              the organization before you rely on them.
            </p>
          </section>

          <section id="contact" className="card mt-6 scroll-mt-24 p-6 sm:p-8">
            <h2 className="text-xl font-extrabold text-ink-900">
              How to reach {job.company}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
              These are the contact routes the organization publishes. If a videophone
              number is listed, that is the fastest way to reach a human who signs.
            </p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {contactRows.map((row) => (
                <li key={row.label} className="rounded-2xl bg-mist-50 p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-ink-500">
                    {row.label}
                  </p>
                  {row.href ? (
                    <a
                      href={row.href}
                      target={row.href.startsWith("http") ? "_blank" : undefined}
                      rel={row.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="mt-1 inline-block text-sm font-bold text-brand-600 underline-offset-2 hover:underline"
                    >
                      {row.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm font-bold text-ink-900">{row.value}</p>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href={`mailto:${job.contactEmail}`} className="btn btn-dark">
                Email {job.contactEmail}
              </a>
              {job.applyUrl ? (
                <a
                  href={job.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  Open application page
                </a>
              ) : null}
            </div>
          </section>

          <div className="mt-6">
            <ApplicationForm
              jobId={job.id}
              jobTitle={job.title}
              company={job.company}
              contactEmail={job.contactEmail}
              applyUrl={job.applyUrl}
            />
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card p-6">
            <h2 className="text-lg font-extrabold text-ink-900">Quick facts</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                {
                  label: "Communication style",
                  value: job.aslFriendly
                    ? "Signing is used or welcomed here"
                    : "Written and captioned",
                },
                {
                  label: "Videophone",
                  value: job.contactVp
                    ? `Yes — they publish a VP number (${job.contactVp})`
                    : job.vpFriendly
                      ? "VP calls accepted — ask for their number"
                      : "Email is the reliable route",
                },
                {
                  label: "Interview setup",
                  value: job.interpreterProvided
                    ? "They arrange interpreters"
                    : "Ask them to book one in advance",
                },
                {
                  label: "Meetings",
                  value: job.captionsProvided
                    ? "Captions and transcripts by default"
                    : "Request captions ahead of time",
                },
                {
                  label: "Schedule",
                  value: job.flexibleHours ? "Flexible / shift blocks" : "Set hours",
                },
              ].map((row) => (
                <li key={row.label} className="rounded-2xl bg-mist-50 p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-ink-500">
                    {row.label}
                  </p>
                  <p className="mt-1 font-semibold leading-snug text-ink-900">
                    {row.value}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="card mt-6 p-6">
            <h2 className="text-lg font-extrabold text-ink-900">Similar openings</h2>
            <ul className="mt-4 space-y-4">
              {related.map((item) => (
                <li key={item.id}>
                  <JobCard job={item} />
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
