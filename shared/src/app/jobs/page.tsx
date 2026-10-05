import Link from "next/link";
import { Suspense } from "react";
import JobCard from "@/components/JobCard";
import JobFilters from "@/components/JobFilters";
import { listJobs } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Find jobs",
  description:
    "Search Deaf-friendly jobs with accommodation details listed up front: interpreters, captions, written-first teams, and remote flexibility.",
};

type SearchParams = Record<string, string | string[] | undefined>;

function firstValue(params: SearchParams, key: string) {
  const value = params[key];
  return Array.isArray(value) ? value[0] : value;
}

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const jobs = await listJobs({
    q: firstValue(params, "q"),
    category: firstValue(params, "category"),
    employmentType: firstValue(params, "type"),
    sort: firstValue(params, "sort"),
    remote: firstValue(params, "remote") === "1",
    aslFriendly: firstValue(params, "aslFriendly") === "1",
    interpreter: firstValue(params, "interpreter") === "1",
    vpFriendly: firstValue(params, "vpFriendly") === "1",
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="max-w-2xl">
        <span className="chip bg-brand-50 text-brand-700">🔍 Open roles</span>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-ink-900">
          Find a job that already works for you
        </h1>
        <p className="mt-3 text-base leading-relaxed text-ink-700">
          Filter by the accommodation you actually need. Every result tells you how the
          team communicates before you spend a minute applying.
        </p>
      </header>

      <div className="mt-8">
        <Suspense
          fallback={<div className="card h-48 animate-pulse bg-white" aria-hidden="true" />}
        >
          <JobFilters resultCount={jobs.length} />
        </Suspense>
      </div>

      {jobs.length === 0 ? (
        <div className="card mt-8 p-10 text-center">
          <p className="text-4xl" aria-hidden="true">
            🫙
          </p>
          <h2 className="mt-3 text-xl font-extrabold text-ink-900">
            No roles match those filters yet
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-500">
            Try widening the accessibility filters, or set a job alert on the home page
            and we will email you when a match lands.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/jobs" className="btn btn-primary">
              Reset filters
            </Link>
            <Link href="/#alerts" className="btn btn-ghost">
              Set a job alert
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}

      <section className="card mt-12 grid gap-6 p-8 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <h2 className="text-xl font-extrabold text-ink-900">
            Spotted an opening we&apos;re missing?
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
            Deaf schools, RDSPDs, VRS companies, and Deaf-serving nonprofits post
            constantly. If you find one with a real contact person or a videophone
            number, add it here so the next person finds it faster.
          </p>
        </div>
        <Link href="/post" className="btn btn-dark">
          Share a job
        </Link>
      </section>
    </div>
  );
}
