import { and, asc, desc, eq, ilike, or, sql } from "drizzle-orm";
import { db } from "@/db";
import { ensureSeeded } from "@/db/seed";
import { applications, jobAlerts, jobs, resources, type Job } from "@/db/schema";

export type JobFilters = {
  q?: string;
  category?: string;
  employmentType?: string;
  remote?: boolean;
  aslFriendly?: boolean;
  interpreter?: boolean;
  vpFriendly?: boolean;
  sort?: string;
};

export type JobStats = {
  totalJobs: number;
  aslFriendly: number;
  vpFriendly: number;
  remote: number;
  organizations: number;
};

function buildWhere(filters: JobFilters) {
  const clauses = [];

  if (filters.q) {
    const needle = `%${filters.q}%`;
    clauses.push(
      or(
        ilike(jobs.title, needle),
        ilike(jobs.company, needle),
        ilike(jobs.summary, needle),
        ilike(jobs.location, needle),
        ilike(jobs.description, needle),
      ),
    );
  }
  if (filters.category && filters.category !== "All") {
    clauses.push(eq(jobs.category, filters.category));
  }
  if (filters.employmentType && filters.employmentType !== "All") {
    clauses.push(eq(jobs.employmentType, filters.employmentType));
  }
  if (filters.remote) clauses.push(eq(jobs.remote, true));
  if (filters.aslFriendly) clauses.push(eq(jobs.aslFriendly, true));
  if (filters.interpreter) clauses.push(eq(jobs.interpreterProvided, true));
  if (filters.vpFriendly) clauses.push(eq(jobs.vpFriendly, true));

  return clauses.length > 0 ? and(...clauses) : undefined;
}

export async function listJobs(filters: JobFilters = {}): Promise<Job[]> {
  await ensureSeeded();
  const order =
    filters.sort === "salary"
      ? [desc(sql`coalesce(${jobs.salaryMax}, ${jobs.salaryMin}, 0)`)]
      : filters.sort === "company"
        ? [asc(jobs.company)]
        : [desc(jobs.postedAt), desc(jobs.id)];

  return db
    .select()
    .from(jobs)
    .where(buildWhere(filters))
    .orderBy(...order)
    .limit(60);
}

export async function getJob(id: number): Promise<Job | null> {
  await ensureSeeded();
  const rows = await db.select().from(jobs).where(eq(jobs.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function getStats(): Promise<JobStats> {
  await ensureSeeded();
  const [row] = await db
    .select({
      totalJobs: sql<number>`count(*)::int`,
      aslFriendly: sql<number>`count(*) filter (where ${jobs.aslFriendly})::int`,
      vpFriendly: sql<number>`count(*) filter (where ${jobs.vpFriendly})::int`,
      remote: sql<number>`count(*) filter (where ${jobs.remote})::int`,
      organizations: sql<number>`count(distinct ${jobs.company})::int`,
    })
    .from(jobs);

  return (
    row ?? {
      totalJobs: 0,
      aslFriendly: 0,
      vpFriendly: 0,
      remote: 0,
      organizations: 0,
    }
  );
}

export async function listResources() {
  await ensureSeeded();
  return db.select().from(resources).orderBy(asc(resources.kind), asc(resources.title));
}

export async function countApplications() {
  const [row] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(applications);
  return row?.count ?? 0;
}

export async function getApplicationsForJob(jobId: number) {
  return db
    .select()
    .from(applications)
    .where(eq(applications.jobId, jobId))
    .orderBy(desc(applications.createdAt));
}

export async function subscribeToAlerts(email: string, category: string) {
  await db.insert(jobAlerts).values({ email, category }).onConflictDoNothing();
  const [row] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(jobAlerts);
  return row?.count ?? 0;
}

export async function relatedJobs(job: Job, limit = 3) {
  const rows = await db
    .select()
    .from(jobs)
    .where(and(eq(jobs.category, job.category), sql`${jobs.id} <> ${job.id}`))
    .orderBy(desc(jobs.postedAt))
    .limit(limit);

  if (rows.length >= limit) return rows;

  const filler = await db
    .select()
    .from(jobs)
    .where(sql`${jobs.id} <> ${job.id}`)
    .orderBy(desc(jobs.postedAt))
    .limit(limit);

  const seen = new Set(rows.map((row) => row.id));
  for (const row of filler) {
    if (rows.length >= limit) break;
    if (!seen.has(row.id)) {
      rows.push(row);
      seen.add(row.id);
    }
  }
  return rows;
}
