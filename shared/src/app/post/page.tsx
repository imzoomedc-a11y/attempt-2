import Link from "next/link";
import ListingForm from "@/components/PostJobForm";

export const metadata = {
  title: "Share an opening",
  description:
    "Found a real job that Deaf and hard-of-hearing job seekers should know about? Add it to SignWorks with a contact people can actually reach.",
};

const TIPS = [
  {
    title: "Name a human",
    body: "“Ask for Jacob Weiss in HR” gets a reply. “Apply on our portal” usually does not. If the organization publishes a contact person, put them in.",
  },
  {
    title: "Include the videophone number",
    body: "Many Deaf-serving organizations publish VP numbers on purpose. If one is listed, add it — it is the single most useful field on a listing.",
  },
  {
    title: "Quote pay exactly as posted",
    body: "Pick the right unit. $25–$60 per hour reads very differently from $25k–$60k per year, and hourly roles are common in interpreting and residential work.",
  },
  {
    title: "Say what certification is needed",
    body: "RID or NAD IV/V for interpreting, state licensure for psychology and nursing, teaching certification for classroom roles. People plan months around these.",
  },
];

export default function ShareListingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="max-w-2xl">
        <span className="chip bg-brand-50 text-brand-700">🤟 Community listings</span>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-ink-900">
          Share an opening Deaf job seekers can actually use
        </h1>
        <p className="mt-3 text-base leading-relaxed text-ink-700">
          Found a Deaf school hiring interpreters? A VRS company with a posted range? A
          peer support role where ASL is the qualification? Add it here with real contact
          details so people can follow up the same day.
        </p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.7fr_1fr]">
        <ListingForm />

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <div className="card p-6">
            <h2 className="text-lg font-extrabold text-ink-900">
              What makes a listing useful
            </h2>
            <ul className="mt-4 space-y-4">
              {TIPS.map((tip) => (
                <li key={tip.title}>
                  <p className="text-sm font-bold text-ink-900">{tip.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-500">{tip.body}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="card bg-ink-950 p-6 text-white">
            <h2 className="text-lg font-extrabold">Looking for the boards?</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              Our resources page links the job boards the Deaf community already uses —
              including one statewide board that publishes a named coordinator and direct
              phone number for every program.
            </p>
            <Link href="/resources" className="btn btn-primary mt-5">
              Open the job boards
            </Link>
          </div>

          <div className="card p-6">
            <h2 className="text-lg font-extrabold text-ink-900">
              One rule before you post
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-700">
              Everything here must be reachable by someone who cannot use a voice phone.
              If the only contact is a phone number and there is no email or VP, please
              don&apos;t submit it — that is exactly the wall we are trying to remove.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
