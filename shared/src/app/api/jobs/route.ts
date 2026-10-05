import { NextResponse } from "next/server";
import { listJobs } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const jobs = await listJobs({
    q: searchParams.get("q") ?? undefined,
    category: searchParams.get("category") ?? undefined,
    employmentType: searchParams.get("type") ?? undefined,
    sort: searchParams.get("sort") ?? undefined,
    remote: searchParams.get("remote") === "1",
    aslFriendly: searchParams.get("aslFriendly") === "1",
    interpreter: searchParams.get("interpreter") === "1",
    vpFriendly: searchParams.get("vpFriendly") === "1",
  });

  return NextResponse.json({
    count: jobs.length,
    jobs: jobs.map((job) => ({
      id: job.id,
      title: job.title,
      company: job.company,
      category: job.category,
      employmentType: job.employmentType,
      location: job.location,
      remote: job.remote,
      salaryMin: job.salaryMin,
      salaryMax: job.salaryMax,
      salaryUnit: job.salaryUnit,
      summary: job.summary,
      accommodations: job.accommodations,
      aslFriendly: job.aslFriendly,
      interpreterProvided: job.interpreterProvided,
      captionsProvided: job.captionsProvided,
      vpFriendly: job.vpFriendly,
      contactName: job.contactName,
      contactEmail: job.contactEmail,
      contactVp: job.contactVp,
      contactPhone: job.contactPhone,
      applyUrl: job.applyUrl,
      url: `/jobs/${job.id}`,
    })),
  });
}
