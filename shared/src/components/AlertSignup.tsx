"use client";

import { useActionState } from "react";
import SubmitButton from "@/components/SubmitButton";
import { subscribeAlerts } from "@/lib/actions";
import { CATEGORIES } from "@/lib/constants";
import { initialFormState } from "@/lib/form-state";

export default function AlertSignup() {
  const [state, formAction] = useActionState(subscribeAlerts, initialFormState);

  return (
    <div className="card p-6">
      <h2 className="text-lg font-extrabold text-ink-900">
        Weekly job digest — written, never phoned
      </h2>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
        One email each Monday with new ASL-friendly roles. Every alert includes the
        accommodation details up front.
      </p>

      {state.status === "success" ? (
        <p
          role="status"
          className="mt-4 rounded-xl bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-700"
        >
          ✅ {state.message}
        </p>
      ) : null}

      <form action={formAction} className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="sr-only" htmlFor="alert-email">
              Email address
            </label>
            <input
              id="alert-email"
              name="email"
              type="email"
              required
              placeholder="you@email.com"
              className="field"
            />
          </div>
          <div>
            <label className="sr-only" htmlFor="alert-category">
              Field of interest
            </label>
            <select id="alert-category" name="category" className="field">
              <option value="Any field">Any field</option>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        <SubmitButton pendingLabel="Saving…">Notify me</SubmitButton>
      </form>

      {state.status === "error" ? (
        <p role="alert" className="mt-3 text-sm font-semibold text-rose-600">
          {state.message}
        </p>
      ) : null}
    </div>
  );
}
