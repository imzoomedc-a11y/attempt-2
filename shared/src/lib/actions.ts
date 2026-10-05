"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { applications, jobs } from "@/db/schema";
import { CATEGORIES, EMPLOYMENT_TYPES } from "@/lib/constants";
import type { FormState } from "@/lib/form-state";
import { subscribeToAlerts } from "@/lib/queries";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function toInt(value: string) {
  if (!value) return null;
  const parsed = Number.parseInt(value.replace(/[^0-9]/g, ""), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function buildMailto(options: {
  to: string;
  subject: string;
  fullName: string;
  email: string;
  videophone: string;
  preference: string;
  coverNote: string;
  applyUrl: string | null;
}) {
  const lines = [
    `Hello,`,
    ``,
    `I am writing about the ${options.subject} position.`,
    ``,
    options.coverNote,
    ``,
    `Name: ${options.fullName}`,
    `Email: ${options.email}`,
  ];
  if (options.videophone) lines.push(`Videophone: ${options.videophone}`);
  lines.push(
    `Best way to reach me: ${options.preference}`,
    ``,
    options.applyUrl
      ? `I am also applying through your application page: ${options.applyUrl}`
      : `Please let me know the best next step and the format of your interview process.`,
    ``,
    `Thank you,`,
    options.fullName,
  );

  return `mailto:${options.to}?subject=${encodeURIComponent(
    `${options.subject} — inquiry from ${options.fullName}`,
  )}&body=${encodeURIComponent(lines.join("\n"))}`;
}

export async function saveAndDraftApplication(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const jobId = toInt(text(formData, "jobId"));
  const fullName = text(formData, "fullName");
  const email = text(formData, "email");
  const videophone = text(formData, "videophone");
  const communicationPreference = text(formData, "communicationPreference");
  const coverNote = text(formData, "coverNote");

  if (jobId === null) {
    return {
      status: "error",
      message: "Missing job reference. Please open the job again.",
      errors: {},
    };
  }

  const errors: Record<string, string> = {};
  if (fullName.length < 2) errors.fullName = "Please enter your full name.";
  if (!emailPattern.test(email)) errors.email = "Enter a valid email address.";
  if (communicationPreference.length < 2)
    errors.communicationPreference = "Choose how you'd like to be contacted.";
  if (coverNote.length < 20)
    errors.coverNote = "Tell them a little more (20 characters minimum).";

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "A few fields need attention before we can draft this.",
      errors,
    };
  }

  const [job] = await db.select().from(jobs).where(eq(jobs.id, jobId)).limit(1);
  if (!job) {
    return { status: "error", message: "That listing is no longer here.", errors: {} };
  }

  await db.insert(applications).values({
    jobId: job.id,
    fullName,
    email,
    videophone: videophone || null,
    communicationPreference,
    coverNote,
  });

  revalidatePath(`/jobs/${job.id}`);

  return {
    status: "success",
    message: `Saved. We built an email draft to ${job.contactName ?? job.company} (${job.contactEmail}) — nothing is sent until you open and send it yourself.`,
    errors: {},
    mailtoUrl: buildMailto({
      to: job.contactEmail,
      subject: `${job.title}`,
      fullName,
      email,
      videophone,
      preference: communicationPreference,
      coverNote,
      applyUrl: job.applyUrl,
    }),
  };
}

export async function createListing(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const title = text(formData, "title");
  const company = text(formData, "company");
  const category = text(formData, "category");
  const employmentType = text(formData, "employmentType");
  const location = text(formData, "location");
  const summary = text(formData, "summary");
  const description = text(formData, "description");
  const contactEmail = text(formData, "contactEmail");
  const salaryUnit = text(formData, "salaryUnit") || "year";
  const accommodations = text(formData, "accommodations")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const errors: Record<string, string> = {};
  if (title.length < 3) errors.title = "Add a job title.";
  if (company.length < 2) errors.company = "Add the organization's name.";
  if (!CATEGORIES.includes(category as (typeof CATEGORIES)[number]))
    errors.category = "Pick a category.";
  if (!EMPLOYMENT_TYPES.includes(employmentType as (typeof EMPLOYMENT_TYPES)[number]))
    errors.employmentType = "Pick an employment type.";
  if (location.length < 2) errors.location = "Add a location (or “Remote”).";
  if (summary.length < 20) errors.summary = "Write a short one-sentence summary.";
  if (description.length < 40)
    errors.description = "Add a longer description (40 characters minimum).";
  if (!emailPattern.test(contactEmail))
    errors.contactEmail = "Enter a valid contact email someone can actually reach.";

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Almost there — fix the highlighted fields.",
      errors,
    };
  }

  const [created] = await db
    .insert(jobs)
    .values({
      title,
      company,
      logo: text(formData, "logo") || "💼",
      category,
      employmentType,
      location,
      remote: formData.get("remote") === "on",
      salaryMin: toInt(text(formData, "salaryMin")),
      salaryMax: toInt(text(formData, "salaryMax")),
      salaryUnit,
      summary,
      description,
      accommodations,
      aslFriendly: formData.get("aslFriendly") === "on",
      interpreterProvided: formData.get("interpreterProvided") === "on",
      captionsProvided: formData.get("captionsProvided") === "on",
      flexibleHours: formData.get("flexibleHours") === "on",
      vpFriendly: formData.get("vpFriendly") === "on",
      applyUrl: text(formData, "applyUrl") || null,
      contactName: text(formData, "contactName") || null,
      contactEmail,
      contactVp: text(formData, "contactVp") || null,
      contactPhone: text(formData, "contactPhone") || null,
    })
    .returning({ id: jobs.id });

  revalidatePath("/jobs");
  revalidatePath("/");

  redirect(`/jobs/${created.id}?posted=1`);
}

export async function subscribeAlerts(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const email = text(formData, "email");
  const category = text(formData, "category") || "Any field";

  if (!emailPattern.test(email)) {
    return {
      status: "error",
      message: "Please enter a valid email address.",
      errors: { email: "Enter a valid email address." },
    };
  }

  const total = await subscribeToAlerts(email.toLowerCase(), category);
  revalidatePath("/");

  return {
    status: "success",
    message: `You're on the list — one weekly digest, no voice calls, unsubscribe anytime. (${total} total alert${total === 1 ? "" : "s"} saved.)`,
    errors: {},
  };
}


