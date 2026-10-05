import { pool } from "@/db";

/**
 * Creates the database schema if it does not already exist.
 *
 * This mirrors `src/db/schema.ts` with `CREATE TABLE IF NOT EXISTS`, so the
 * app is fully self-contained: point DATABASE_URL at any empty PostgreSQL
 * database and the first request will create the tables and seed the data —
 * no manual migrations required for a fresh deploy.
 */
const SCHEMA_DDL = `
CREATE TABLE IF NOT EXISTS jobs (
  id serial PRIMARY KEY,
  title text NOT NULL,
  company text NOT NULL,
  logo text NOT NULL DEFAULT '💼',
  category text NOT NULL,
  employment_type text NOT NULL,
  location text NOT NULL,
  remote boolean NOT NULL DEFAULT false,
  salary_min integer,
  salary_max integer,
  salary_unit text NOT NULL DEFAULT 'year',
  summary text NOT NULL,
  description text NOT NULL,
  accommodations jsonb NOT NULL DEFAULT '[]'::jsonb,
  asl_friendly boolean NOT NULL DEFAULT false,
  interpreter_provided boolean NOT NULL DEFAULT false,
  captions_provided boolean NOT NULL DEFAULT false,
  flexible_hours boolean NOT NULL DEFAULT false,
  vp_friendly boolean NOT NULL DEFAULT false,
  apply_url text,
  contact_name text,
  contact_email text NOT NULL,
  contact_vp text,
  contact_phone text,
  posted_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS applications (
  id serial PRIMARY KEY,
  job_id integer NOT NULL REFERENCES jobs (id) ON DELETE CASCADE,
  full_name text NOT NULL,
  email text NOT NULL,
  videophone text,
  communication_preference text NOT NULL,
  cover_note text NOT NULL,
  status text NOT NULL DEFAULT 'saved',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS resources (
  id serial PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  url text NOT NULL,
  kind text NOT NULL,
  is_free boolean NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS job_alerts (
  id serial PRIMARY KEY,
  email text NOT NULL,
  category text NOT NULL DEFAULT 'Any field',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS job_alerts_email_category_idx
  ON job_alerts (email, category);
`;

let bootstrapPromise: Promise<void> | null = null;

export function ensureSchema() {
  if (!bootstrapPromise) {
    bootstrapPromise = pool
      .query(SCHEMA_DDL)
      .then(() => undefined)
      .catch((error: unknown) => {
        bootstrapPromise = null;
        throw error;
      });
  }
  return bootstrapPromise;
}
