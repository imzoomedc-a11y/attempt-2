import Link from "next/link";
import Fingerspeller from "@/components/Fingerspeller";
import { getStats } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "About us",
  description:
    "SignWorks was built by Tyree and Kianu to make Deaf hiring accessible by default. Meet the team and practice your fingerspelling.",
};

const VALUES = [
  {
    icon: "👁️",
    title: "Visual by default",
    body: "If information only works as sound, it does not work. Captions, transcripts, and text come first in everything we build.",
  },
  {
    icon: "🤟",
    title: "Nothing about us without us",
    body: "Deaf people review every listing category, every filter, and every piece of employer guidance before it ships.",
  },
  {
    icon: "🧾",
    title: "Checkable claims",
    body: "Employers state accommodations as concrete facts. Vague inclusion statements do not pass review.",
  },
  {
    icon: "🆓",
    title: "Free for job seekers",
    body: "No paywalled applications, no visibility boosters for employers, and job seekers never pay to be seen.",
  },
];

export default async function AboutPage() {
  const stats = await getStats();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="max-w-3xl">
        <span className="chip bg-brand-50 text-brand-700">🤟 Our story</span>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-ink-900 sm:text-5xl">
          Two friends, one badly designed hiring process
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-700">
          SignWorks started when two of our closest friends kept hitting the same wall:
          great resumes, great interviews, and then a recruiter who &ldquo;would just call
          you real quick.&rdquo; We built the job board we wished existed — one where
          accessibility is listed right next to the salary.
        </p>
      </header>

      <section className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {VALUES.map((value) => (
          <div key={value.title} className="card p-6">
            <span aria-hidden="true" className="text-2xl">
              {value.icon}
            </span>
            <h2 className="mt-3 text-base font-extrabold text-ink-900">{value.title}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-700">{value.body}</p>
          </div>
        ))}
      </section>

      {/* Team */}
      <section className="mt-16">
        <h2 className="text-3xl font-black tracking-tight text-ink-900">
          Made by Tyree and Kianu
        </h2>
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-ink-700">
          We designed, built, and wrote every word of this site together — from the
          database schema to the captioning defaults.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <article className="card p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="grid h-16 w-16 place-items-center rounded-3xl bg-brand-500 text-2xl font-black text-white"
              >
                T
              </span>
              <div>
                <h3 className="text-2xl font-black tracking-tight text-ink-900">Tyree</h3>
                <p className="text-sm font-semibold text-brand-600">
                  Co-founder · Product &amp; engineering
                </p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-ink-700">
              Tyree built the job search engine: the accessibility filters, the
              accommodation matching, and the application flow that lets a candidate
              choose exactly how they want to be contacted. He is stubborn about one rule
              above all — <strong>no feature should require a phone call</strong>.
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {["Next.js", "PostgreSQL", "Drizzle", "Accessibility"].map((tag) => (
                <li key={tag} className="chip bg-mist-100 text-ink-700">
                  {tag}
                </li>
              ))}
            </ul>
          </article>

          <article className="card p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="grid h-16 w-16 place-items-center rounded-3xl bg-ink-900 text-2xl font-black text-accent-300"
              >
                K
              </span>
              <div>
                <h3 className="text-2xl font-black tracking-tight text-ink-900">Kianu</h3>
                <p className="text-sm font-semibold text-brand-600">
                  Co-founder · Design &amp; community
                </p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-ink-700">
              Kianu owns the visual language and the employer playbook, and he interviews
              Deaf job seekers to keep the listings honest. His favourite question for
              hiring managers: <strong>&ldquo;How would this interview work with the
              sound off?&rdquo;</strong>
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {["UX research", "Deaf community partnerships", "Copywriting", "Design"].map(
                (tag) => (
                  <li key={tag} className="chip bg-mist-100 text-ink-700">
                    {tag}
                  </li>
                ),
              )}
            </ul>
          </article>
        </div>

        <div className="mt-6 rounded-4xl bg-ink-950 p-8 text-center text-white">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-300">
            Signed, sealed, delivered
          </p>
          <p className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Made by <span className="text-brand-300">Tyree</span> and{" "}
            <span className="text-accent-300">Kianu</span>
          </p>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-white/70">
            Every page on this site is text-first, keyboard navigable, captioned where
            media appears, and respectful of your reduced-motion settings.
          </p>
        </div>
      </section>

      {/* Impact */}
      <section className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Real openings listed", value: stats.totalJobs },
          { label: "ASL-friendly workplaces", value: stats.aslFriendly },
          { label: "Listings with a VP number", value: stats.vpFriendly },
          { label: "Organizations", value: stats.organizations },
        ].map((item) => (
          <div key={item.label} className="card p-6 text-center">
            <p className="text-4xl font-black tracking-tight text-brand-600">
              {item.value}
            </p>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-ink-500">
              {item.label}
            </p>
          </div>
        ))}
      </section>

      {/* Fingerspelling tool */}
      <section id="fingerspelling" className="mt-16 scroll-mt-24 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <Fingerspeller />
        <div className="card p-6 sm:p-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink-900">
            Five phrases worth learning this week
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-500">
            Hearing coworkers: these five go a long way in a Deaf-inclusive workplace.
          </p>
          <ol className="mt-6 space-y-3">
            {[
              { phrase: "Nice to meet you", note: "Point to yourself, then shake hands while signing." },
              { phrase: "Thank you", note: "Flat hand from the chin, moving forward and down." },
              { phrase: "Sorry", note: "Closed fist circling over the chest." },
              { phrase: "Help", note: "One flat hand lifted by the other fist." },
              { phrase: "Good / Fine", note: "Flat hand from the chin to the other open palm." },
            ].map((item, index) => (
              <li
                key={item.phrase}
                className="flex gap-4 rounded-2xl bg-mist-50 p-4"
              >
                <span
                  aria-hidden="true"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink-900 text-sm font-black text-brand-300"
                >
                  {index + 1}
                </span>
                <span>
                  <span className="block text-sm font-extrabold text-ink-900">
                    {item.phrase}
                  </span>
                  <span className="block text-xs leading-relaxed text-ink-500">
                    {item.note}
                  </span>
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/jobs" className="btn btn-primary">
              Find a role
            </Link>
            <Link href="/resources" className="btn btn-ghost">
              Learn more ASL
            </Link>
          </div>
        </div>
      </section>

      <section className="card mt-16 p-8 sm:p-10">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink-900">
          A note on language
        </h2>
        <div className="mt-4 grid gap-6 text-sm leading-relaxed text-ink-700 md:grid-cols-2">
          <p>
            <strong className="text-ink-900">Deaf</strong> with a capital D refers to
            people who identify with Deaf culture and community, often ASL users. Lowercase{" "}
            <strong className="text-ink-900">deaf</strong> describes the audiological
            condition, and <strong className="text-ink-900">hard of hearing</strong>{" "}
            covers a wide range of residual hearing. Many people use all three, and
            &ldquo;hearing impaired&rdquo; is widely considered outdated.
          </p>
          <p>
            This site was built by Tyree and Kianu. Every listing points to a real
            organization and a contact route that organization publishes — a named HR
            contact, an email, or a videophone number. Openings close and pay changes
            fast, so always confirm details with the organization before you apply. The
            legal summaries here are general information, not legal advice; for your own
            situation, talk to a qualified attorney or your state vocational
            rehabilitation agency.
          </p>
        </div>
      </section>
    </div>
  );
}
