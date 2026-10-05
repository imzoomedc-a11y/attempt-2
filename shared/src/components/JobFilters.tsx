"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { CATEGORIES, EMPLOYMENT_TYPES } from "@/lib/constants";

const ACCOMMODATION_FILTERS = [
  { key: "aslFriendly", label: "ASL-friendly workplace" },
  { key: "vpFriendly", label: "Videophone OK" },
  { key: "interpreter", label: "Interpreters provided" },
  { key: "captions", label: "Captions / CART" },
  { key: "remote", label: "Remote only" },
] as const;

export default function JobFilters({ resultCount }: { resultCount: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  const update = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (!value) params.delete(key);
      else params.set(key, value);
      const query = params.toString();
      startTransition(() => {
        router.replace(query ? `/jobs?${query}` : "/jobs", { scroll: false });
      });
    },
    [router, searchParams],
  );

  const query = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "All";
  const employmentType = searchParams.get("type") ?? "All";
  const sort = searchParams.get("sort") ?? "recent";

  return (
    <form
      role="search"
      onSubmit={(event) => event.preventDefault()}
      className="card p-5"
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label className="label" htmlFor="job-search">
            Search roles
          </label>
          <input
            id="job-search"
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Job title, company, city, or skill"
            className="field"
            onChange={(event) => {
              const value = event.target.value;
              window.clearTimeout(
                (window as unknown as { __swTimer?: number }).__swTimer,
              );
              (window as unknown as { __swTimer?: number }).__swTimer =
                window.setTimeout(() => update("q", value || null), 350);
            }}
          />
        </div>
        <div className="sm:w-44">
          <label className="label" htmlFor="job-category">
            Category
          </label>
          <select
            id="job-category"
            className="field"
            value={category}
            onChange={(event) => update("category", event.target.value || null)}
          >
            <option value="All">All categories</option>
            {CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:w-44">
          <label className="label" htmlFor="job-type">
            Type
          </label>
          <select
            id="job-type"
            className="field"
            value={employmentType}
            onChange={(event) =>
              update("type", event.target.value === "All" ? null : event.target.value)
            }
          >
            <option value="All">Any type</option>
            {EMPLOYMENT_TYPES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:w-40">
          <label className="label" htmlFor="job-sort">
            Sort
          </label>
          <select
            id="job-sort"
            className="field"
            value={sort}
            onChange={(event) => update("sort", event.target.value)}
          >
            <option value="recent">Newest</option>
            <option value="salary">Top salary</option>
            <option value="company">A–Z company</option>
          </select>
        </div>
      </div>

      <fieldset className="mt-5 border-t border-mist-200 pt-4">
        <legend className="label mb-3">Accessibility filters</legend>
        <div className="flex flex-wrap gap-2">
          {ACCOMMODATION_FILTERS.map((filter) => {
            const active = searchParams.get(filter.key) === "1";
            return (
              <button
                key={filter.key}
                type="button"
                aria-pressed={active}
                onClick={() => update(filter.key, active ? null : "1")}
                className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold transition ${
                  active
                    ? "border-brand-500 bg-brand-500 text-white"
                    : "border-mist-200 bg-white text-ink-700 hover:border-brand-300 hover:bg-brand-50"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-4 flex items-center justify-between gap-3 text-sm text-ink-500">
        <p aria-live="polite" className={pending ? "opacity-60" : undefined}>
          {pending ? "Updating results…" : `${resultCount} role${resultCount === 1 ? "" : "s"} match`}
        </p>
        <button
          type="button"
          className="font-semibold text-brand-600 underline-offset-2 hover:underline"
          onClick={() => startTransition(() => router.replace("/jobs", { scroll: false }))}
        >
          Clear all filters
        </button>
      </div>
    </form>
  );
}
