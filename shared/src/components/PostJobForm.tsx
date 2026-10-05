"use client";

import { useActionState } from "react";
import SubmitButton from "@/components/SubmitButton";
import { createListing } from "@/lib/actions";
import { CATEGORIES, EMPLOYMENT_TYPES, SALARY_UNITS } from "@/lib/constants";
import { initialFormState } from "@/lib/form-state";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1.5 text-sm font-semibold text-rose-600">
      {message}
    </p>
  );
}

const SUPPORT_OPTIONS = [
  {
    name: "aslFriendly",
    label: "ASL-friendly workplace",
    hint: "Signing is used or genuinely welcomed day to day.",
  },
  {
    name: "vpFriendly",
    label: "Videophone calls accepted",
    hint: "People can reach you on a VP instead of a voice line.",
  },
  {
    name: "interpreterProvided",
    label: "Interpreters arranged by the organization",
    hint: "They book and pay for interpreters.",
  },
  {
    name: "captionsProvided",
    label: "Captions / CART in meetings",
    hint: "Live captions or transcripts are the default.",
  },
  {
    name: "flexibleHours",
    label: "Flexible or shift-based hours",
    hint: "Blocks, shifts, or async flexibility.",
  },
  {
    name: "remote",
    label: "Remote friendly",
    hint: "This role can be done from anywhere.",
  },
];

export default function ListingForm() {
  const [state, formAction] = useActionState(createListing, initialFormState);

  return (
    <form action={formAction} className="card p-6 sm:p-8" noValidate>
      <h2 className="text-2xl font-extrabold text-ink-900">Share an opening</h2>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
        Only real openings with a real way to contact someone. A named person, a
        published email, or a videophone number is what makes a listing useful — vague
        &ldquo;apply online&rdquo; links get skipped.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="title">
            Job title
          </label>
          <input id="title" name="title" className="field" required />
          <FieldError message={state.errors.title} />
        </div>
        <div>
          <label className="label" htmlFor="company">
            Organization
          </label>
          <input id="company" name="company" className="field" required />
          <FieldError message={state.errors.company} />
        </div>
        <div>
          <label className="label" htmlFor="category">
            Category
          </label>
          <select id="category" name="category" className="field" defaultValue="Deaf Education">
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <FieldError message={state.errors.category} />
        </div>
        <div>
          <label className="label" htmlFor="employmentType">
            Employment type
          </label>
          <select
            id="employmentType"
            name="employmentType"
            className="field"
            defaultValue="Full-time"
          >
            {EMPLOYMENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <FieldError message={state.errors.employmentType} />
        </div>
        <div>
          <label className="label" htmlFor="location">
            Location
          </label>
          <input
            id="location"
            name="location"
            className="field"
            placeholder="City, State or Remote"
          />
          <FieldError message={state.errors.location} />
        </div>
        <div>
          <label className="label" htmlFor="logo">
            Icon / emoji
          </label>
          <input id="logo" name="logo" className="field" placeholder="🤟" maxLength={4} />
        </div>
      </div>

      <fieldset className="mt-5 grid gap-4 sm:grid-cols-[1fr_auto]">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label" htmlFor="salaryMin">
              Pay — low end
            </label>
            <input
              id="salaryMin"
              name="salaryMin"
              inputMode="numeric"
              className="field"
              placeholder="55000"
            />
          </div>
          <div>
            <label className="label" htmlFor="salaryMax">
              Pay — high end
            </label>
            <input
              id="salaryMax"
              name="salaryMax"
              inputMode="numeric"
              className="field"
              placeholder="72000"
            />
          </div>
        </div>
        <div>
          <label className="label" htmlFor="salaryUnit">
            Unit
          </label>
          <select id="salaryUnit" name="salaryUnit" className="field" defaultValue="year">
            {SALARY_UNITS.map((unit) => (
              <option key={unit.value} value={unit.value}>
                {unit.label}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      <div className="mt-4 grid gap-4">
        <div>
          <label className="label" htmlFor="summary">
            One-sentence summary
          </label>
          <input id="summary" name="summary" className="field" required />
          <FieldError message={state.errors.summary} />
        </div>
        <div>
          <label className="label" htmlFor="description">
            Details
          </label>
          <textarea
            id="description"
            name="description"
            rows={6}
            className="field"
            placeholder="What the work is, what certifications or ASL level they need, how to apply, and anything about the schedule."
            required
          />
          <FieldError message={state.errors.description} />
        </div>
        <div>
          <label className="label" htmlFor="accommodations">
            Accessibility notes (one per line)
          </label>
          <textarea
            id="accommodations"
            name="accommodations"
            rows={4}
            className="field"
            placeholder={"ASL is the working language\nHR takes videophone calls\nCaptioned interviews"}
          />
        </div>
      </div>

      <fieldset className="mt-6 border-t border-mist-200 pt-5">
        <legend className="text-sm font-extrabold text-ink-900">
          How can a person actually reach someone here?
        </legend>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="contactName">
              Named contact <span className="font-normal normal-case">(if published)</span>
            </label>
            <input
              id="contactName"
              name="contactName"
              className="field"
              placeholder="Jacob Weiss, HR Specialist"
            />
          </div>
          <div>
            <label className="label" htmlFor="contactEmail">
              Contact email
            </label>
            <input
              id="contactEmail"
              name="contactEmail"
              type="email"
              className="field"
              required
            />
            <FieldError message={state.errors.contactEmail} />
          </div>
          <div>
            <label className="label" htmlFor="contactVp">
              Videophone number
            </label>
            <input
              id="contactVp"
              name="contactVp"
              inputMode="tel"
              className="field"
              placeholder="512-410-6964"
            />
          </div>
          <div>
            <label className="label" htmlFor="contactPhone">
              Voice / relay number
            </label>
            <input
              id="contactPhone"
              name="contactPhone"
              inputMode="tel"
              className="field"
              placeholder="512-462-5321"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="label" htmlFor="applyUrl">
              Link to the application page
            </label>
            <input
              id="applyUrl"
              name="applyUrl"
              type="url"
              className="field"
              placeholder="https://example.org/careers"
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="mt-6 border-t border-mist-200 pt-5">
        <legend className="text-sm font-extrabold text-ink-900">
          What does this workplace already offer?
        </legend>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {SUPPORT_OPTIONS.map((option) => (
            <label
              key={option.name}
              className="flex cursor-pointer items-start gap-3 rounded-xl border border-mist-200 p-3.5 transition hover:border-brand-300 hover:bg-brand-50"
            >
              <input
                type="checkbox"
                name={option.name}
                className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--color-brand-500)]"
              />
              <span>
                <span className="block text-sm font-bold text-ink-900">
                  {option.label}
                </span>
                <span className="block text-xs text-ink-500">{option.hint}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {state.status === "error" && state.message ? (
        <p
          role="alert"
          className="mt-5 rounded-xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700"
        >
          {state.message}
        </p>
      ) : null}

      <div className="mt-6">
        <SubmitButton pendingLabel="Publishing…">Publish listing</SubmitButton>
      </div>
    </form>
  );
}
