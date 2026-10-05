import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  company: text("company").notNull(),
  logo: text("logo").notNull().default("💼"),
  category: text("category").notNull(),
  employmentType: text("employment_type").notNull(),
  location: text("location").notNull(),
  remote: boolean("remote").notNull().default(false),
  salaryMin: integer("salary_min"),
  salaryMax: integer("salary_max"),
  /** "year" | "hour" | "month" — how the employer publicly quotes pay. */
  salaryUnit: text("salary_unit").notNull().default("year"),
  summary: text("summary").notNull(),
  description: text("description").notNull(),
  accommodations: jsonb("accommodations")
    .$type<string[]>()
    .notNull()
    .default([]),
  aslFriendly: boolean("asl_friendly").notNull().default(false),
  interpreterProvided: boolean("interpreter_provided").notNull().default(false),
  captionsProvided: boolean("captions_provided").notNull().default(false),
  flexibleHours: boolean("flexible_hours").notNull().default(false),
  /** Organization accepts contact by videophone, not just voice calls. */
  vpFriendly: boolean("vp_friendly").notNull().default(false),
  /** Direct link to the organization's own application page. */
  applyUrl: text("apply_url"),
  /** Named human to ask for, when the organization publishes one. */
  contactName: text("contact_name"),
  contactEmail: text("contact_email").notNull(),
  /** Published videophone number, when the organization lists one. */
  contactVp: text("contact_vp"),
  contactPhone: text("contact_phone"),
  postedAt: timestamp("posted_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id")
    .notNull()
    .references(() => jobs.id, { onDelete: "cascade" }),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  videophone: text("videophone"),
  communicationPreference: text("communication_preference").notNull(),
  coverNote: text("cover_note").notNull(),
  status: text("status").notNull().default("saved"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  url: text("url").notNull(),
  kind: text("kind").notNull(),
  isFree: boolean("is_free").notNull().default(true),
});

export const jobAlerts = pgTable(
  "job_alerts",
  {
    id: serial("id").primaryKey(),
    email: text("email").notNull(),
    category: text("category").notNull().default("Any field"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [uniqueIndex("job_alerts_email_category_idx").on(table.email, table.category)],
);

export type Job = typeof jobs.$inferSelect;
export type NewJob = typeof jobs.$inferInsert;
export type Application = typeof applications.$inferSelect;
export type Resource = typeof resources.$inferSelect;
