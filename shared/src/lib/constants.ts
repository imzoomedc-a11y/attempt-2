export const CATEGORIES = [
  "ASL & Interpreting",
  "Deaf Education",
  "Community & Advocacy",
  "Healthcare",
  "Behavioral Health",
  "Administrative & Operations",
  "Technology",
  "Media & Captioning",
  "Government & Legal",
  "Facilities & Trades",
  "Hospitality",
  "Other",
] as const;

export const EMPLOYMENT_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Apprenticeship",
  "Internship",
] as const;

export const COMMUNICATION_PREFERENCES = [
  "ASL interpreter (on-site)",
  "ASL interpreter (VRI)",
  "Live captions / CART",
  "Written follow-up after the interview",
  "Videophone call",
  "Email only",
] as const;

export const SALARY_UNITS = [
  { value: "year", label: "per year" },
  { value: "hour", label: "per hour" },
  { value: "month", label: "per month" },
] as const;

export type Category = (typeof CATEGORIES)[number];
export type EmploymentType = (typeof EMPLOYMENT_TYPES)[number];

export const CATEGORY_ICONS: Record<string, string> = {
  "ASL & Interpreting": "🤟",
  "Deaf Education": "🎓",
  "Community & Advocacy": "🤝",
  Healthcare: "🩺",
  "Behavioral Health": "🧠",
  "Administrative & Operations": "🗂️",
  Technology: "💻",
  "Media & Captioning": "🎬",
  "Government & Legal": "⚖️",
  "Facilities & Trades": "🔧",
  Hospitality: "☕",
  Other: "💼",
};

export function formatSalary(
  min: number | null,
  max: number | null,
  unit: string = "year",
) {
  if (!min && !max) return "See organization for pay";

  const suffix = unit === "hour" ? "/hr" : unit === "month" ? "/mo" : "/yr";
  const fmt = (value: number) => {
    if (value >= 1000) return `$${Math.round(value / 1000)}k`;
    return `$${value.toLocaleString("en-US")}`;
  };

  if (min && max) return `${fmt(min)} – ${fmt(max)} ${suffix}`;
  return `${fmt((min ?? max) as number)} ${suffix}`;
}

export function timeAgo(date: Date | string) {
  const then = typeof date === "string" ? new Date(date) : date;
  const seconds = Math.max(1, Math.floor((Date.now() - then.getTime()) / 1000));
  const days = Math.floor(seconds / 86400);
  if (days > 30) {
    return then.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
  if (days >= 1) return `${days}d ago`;
  const hours = Math.floor(seconds / 3600);
  if (hours >= 1) return `${hours}h ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes >= 1) return `${minutes}m ago`;
  return "just now";
}
