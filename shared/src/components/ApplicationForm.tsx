"use client";

import { useActionState } from "react";
import SubmitButton from "@/components/SubmitButton";
import { saveAndDraftApplication } from "@/lib/actions";
import { COMMUNICATION_PREFERENCES } from "@/lib/constants";
import { initialFormState } from "@/lib/form-state";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1.5 text-sm font-semibold text-rose-600">
      {message}
    </p>
  );
}

export default function ApplicationForm({
  jobId,
  jobTitle,
  company,
  contactEmail,
  applyUrl,
}: {
  jobId: number;
  jobTitle: string;
  company: string;
  contactEmail: string;
  applyUrl: string | null;
}) {
  const [state, formAction] = useActionState(
    saveAndDraftApplication,
    initialFormState,
  );

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="card border-brand-300 bg-brand-50 p-6 sm:p-8"
      >
        <p className="text-4xl" aria-hidden="true">
          ✉️
        </p>
        <h3 className="mt-3 text-xl font-extrabold text-brand-700">
          Your draft is ready
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-700">{state.message}</p>

        <div className="mt-5 flex flex-wrap gap-3">
          {state.mailtoUrl ? (
            <a href={state.mailtoUrl} className="btn btn-primary">
              Open email draft to {company}
            </a>
          ) : null}
          {applyUrl ? (
            <a
              href={applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              Use the organization&apos;s application page
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ) : null}
        </div>

        <p className="mt-5 rounded-2xl bg-white/70 p-4 text-xs leading-relaxed text-ink-500">
          SignWorks never sends anything for you. Your note is saved to this site so you
          can find it again, and the email draft opens in your own mail app where you can
          edit it, add your resume, and send it when you are ready.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="card p-6 sm:p-8" noValidate>
      <h2 className="text-xl font-extrabold text-ink-900">
        Build your intro email in 2 minutes
      </h2>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-700">
        Answer a few questions and we&apos;ll assemble a message to{" "}
        <strong className="text-ink-900">{contactEmail}</strong> about{" "}
        <strong className="text-ink-900">{jobTitle}</strong> at {company}. You review and
        send it — nothing leaves without you.
      </p>

      <input type="hidden" name="jobId" value={jobId} />

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="fullName">
            Your full name
          </label>
          <input
            id="fullName"
            name="fullName"
            className="field"
            autoComplete="name"
            required
          />
          <FieldError message={state.errors.fullName} />
        </div>
        <div>
          <label className="label" htmlFor="email">
            Your email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="field"
            autoComplete="email"
            required
          />
          <FieldError message={state.errors.email} />
        </div>
      </div>

      <div className="mt-4">
        <label className="label" htmlFor="videophone">
          Your videophone number <span className="font-normal normal-case">(optional)</span>
        </label>
        <input
          id="videophone"
          name="videophone"
          inputMode="tel"
          placeholder="e.g. 555-0134 (VP)"
          className="field"
        />
        <p className="mt-1.5 text-xs text-ink-500">
          Adding a VP number stops a recruiter from defaulting to a voice call.
        </p>
      </div>

      <div className="mt-4">
        <label className="label" htmlFor="communicationPreference">
          How should they reach you?
        </label>
        <select
          id="communicationPreference"
          name="communicationPreference"
          className="field"
          defaultValue={COMMUNICATION_PREFERENCES[0]}
        >
          {COMMUNICATION_PREFERENCES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <FieldError message={state.errors.communicationPreference} />
      </div>

      <div className="mt-4">
        <label className="label" htmlFor="coverNote">
          What you want them to know about you
        </label>
        <textarea
          id="coverNote"
          name="coverNote"
          rows={6}
          className="field"
          placeholder="Your ASL level, certifications (RID, state EI, teaching license), years of experience, and why this role fits you."
          required
        />
        <FieldError message={state.errors.coverNote} />
      </div>

      {state.status === "error" && state.message ? (
        <p
          role="alert"
          className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700"
        >
          {state.message}
        </p>
      ) : null}

      <div className="mt-5">
        <SubmitButton pendingLabel="Building draft…">
          Save &amp; build my email draft
        </SubmitButton>
      </div>
    </form>
  );
}
