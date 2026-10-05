import Image from "next/image";
import Link from "next/link";
import AlertSignup from "@/components/AlertSignup";
import JobCard from "@/components/JobCard";
import { getStats, listJobs } from "@/lib/queries";

export const dynamic = "force-dynamic";

const STEPS = [
  {
    icon: "🔍",
    title: "Search by what you need",
    body: "Filter for ASL-friendly workplaces, videophone contact, interpreters, captions, or remote work — before you spend a minute applying.",
  },
  {
    icon: "📞",
    title: "Reach a real person",
    body: "Every listing shows the organization's published contact route: a named HR contact, an email, and often a videophone number you can dial today.",
  },
  {
    icon: "✉️",
    title: "Send it yourself",
    body: "Fill in your details and we build the email draft — subject line, your ASL level, your preferred contact method. You edit it and press send.",
  },
];

const SIGNALS = [
  {
    icon: "🤟",
    title: "ASL-friendly",
    body: "Signing is used or genuinely welcomed on the job, not just tolerated.",
  },
  {
    icon: "📞",
    title: "Videophone OK",
    body: "They publish a VP number, so you never have to make a voice call.",
  },
  {
    icon: "🗣️",
    title: "Interpreters",
    body: "The organization books interpreters for interviews and meetings.",
  },
  {
    icon: "💬",
    title: "Captions / CART",
    body: "Live captions or transcripts are the default, not a special request.",
  },
  {
    icon: "🎯",
    title: "Certification spelled out",
    body: "RID, NAD IV/V, state licensure, or teaching certification — stated up front.",
  },
  {
    icon: "💵",
    title: "Pay as posted",
    body: "Real published ranges, quoted per year, per month, or per hour correctly.",
  },
];

export default async function HomePage() {
  const [stats, latestJobs] = await Promise.all([
    getStats(),
    listJobs({ sort: "recent" }),
  ]);
  const featured = latestJobs.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden mesh">
        <div className="grid-lines absolute inset-0 opacity-70" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <span className="chip bg-ink-900 text-brand-300">
              🤟 Real listings, real contact numbers
            </span>
            <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
              Find ASL jobs you can
              <span className="relative whitespace-nowrap">
                {" "}
                <span className="relative z-10">actually call</span>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-1 z-0 h-4 bg-accent-300/70"
                />
              </span>{" "}
              — on a videophone.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-700">
              SignWorks lists real openings from Deaf schools, interpreting programs,
              VRS companies, and Deaf-serving nonprofits — each one with the
              organization&apos;s published contact person, email, and videophone number
              where they have one.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/jobs" className="btn btn-primary text-base">
                Browse {stats.totalJobs} real openings
              </Link>
              <Link href="/jobs?vpFriendly=1" className="btn btn-ghost text-base">
                Only roles with a VP number
              </Link>
            </div>

            <dl className="mt-10 grid max-w-lg grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: "Openings", value: stats.totalJobs },
                { label: "ASL-friendly", value: stats.aslFriendly },
                { label: "VP contact", value: stats.vpFriendly },
                { label: "Organizations", value: stats.organizations },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/70 bg-white/70 px-4 py-3 backdrop-blur"
                >
                  <dt className="text-[11px] font-bold uppercase tracking-[0.12em] text-ink-500">
                    {item.label}
                  </dt>
                  <dd className="mt-0.5 text-2xl font-black text-ink-900">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-4xl border border-white/70 shadow-[0_40px_80px_-40px_rgba(12,20,36,0.55)]">
              <Image
                src="/images/hero.jpg"
                alt="Three Deaf professionals having an animated conversation in American Sign Language inside a bright modern office"
                width={1200}
                height={900}
                priority
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-4 right-4 rounded-3xl border border-mist-200 bg-white/95 p-4 shadow-lg backdrop-blur sm:left-8 sm:right-8">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-600">
                No voice calls required
              </p>
              <p className="mt-1 text-sm font-semibold leading-snug text-ink-800">
                Deaf schools, interpreting agencies, and Deaf-serving nonprofits publish
                VP numbers on purpose. We put them first.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why this exists */}
      <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <div className="grid gap-8 rounded-4xl border border-mist-200 bg-white p-8 sm:p-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-ink-900">
              The unemployment gap is not a skills gap.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-700">
              Deaf and hard-of-hearing job seekers get filtered out for reasons that have
              nothing to do with ability: application portals with no accommodation
              contact, interview invitations that say &ldquo;we&apos;ll call you,&rdquo;
              and job boards where you cannot tell whether anyone signs until round three.
            </p>
            <p className="mt-3 text-base leading-relaxed text-ink-700">
              So we list jobs where the communication path is already visible — the
              organizations that hire interpreters, the schools where ASL is the working
              language, and the nonprofits where fluent signing is a listed
              qualification.
            </p>
          </div>
          <ul className="grid gap-3 self-center">
            {[
              "A videophone number on a posting saves a week of back-and-forth.",
              "Deaf schools hire interpreters, aides, dorm staff, nurses, and coaches — not only teachers.",
              "VRS companies post hourly ranges of $25–$60 for certified interpreters.",
              "Peer support roles at Deaf-serving nonprofits treat lived experience as the credential.",
            ].map((line) => (
              <li
                key={line}
                className="flex gap-3 rounded-2xl bg-mist-50 p-4 text-sm leading-relaxed text-ink-700"
              >
                <span aria-hidden="true" className="text-accent-600">
                  ▸
                </span>
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <h2 className="text-center text-3xl font-black tracking-tight text-ink-900">
          Three steps, all of them text-first
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <div key={step.title} className="card p-6">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 text-xl"
                >
                  {step.icon}
                </span>
                <span className="text-xs font-black uppercase tracking-[0.14em] text-ink-300">
                  Step {index + 1}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-extrabold text-ink-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-700">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What we record */}
      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <div className="rounded-4xl bg-ink-950 p-8 text-white sm:p-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-black tracking-tight">
              What we record for every listing
            </h2>
            <p className="mt-3 text-base leading-relaxed text-white/70">
              Six things that decide whether a Deaf job seeker can actually get in the
              door. If a listing cannot answer them, we do not publish it.
            </p>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SIGNALS.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <span aria-hidden="true" className="text-2xl">
                  {item.icon}
                </span>
                <h3 className="mt-3 text-base font-extrabold">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/65">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Featured jobs */}
      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-ink-900">
              Newest openings
            </h2>
            <p className="mt-2 text-base text-ink-500">
              Real organizations, published pay, and a contact route that works without
              a voice phone.
            </p>
          </div>
          <Link href="/jobs" className="btn btn-ghost">
            See all {stats.totalJobs} listings →
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>

      {/* Where the jobs are */}
      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <div className="grid items-center gap-10 rounded-4xl border border-mist-200 bg-white p-6 sm:p-10 lg:grid-cols-[1fr_1fr]">
          <div className="overflow-hidden rounded-3xl">
            <Image
              src="/images/interview.jpg"
              alt="A Deaf candidate signing with an ASL interpreter during a job interview while a hiring manager reads live captions on a laptop"
              width={1200}
              height={900}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <span className="chip bg-violet-500/10 text-violet-600">
              Where the jobs actually are
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-ink-900">
              Five kinds of employer hire in ASL every day
            </h2>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-ink-700">
              {[
                {
                  name: "Deaf schools and state programs",
                  detail:
                    "Teachers of the deaf, aides, dorm and residential staff, nurses, coaches, and cooks — with published VP numbers in some states.",
                },
                {
                  name: "Interpreting and VRS companies",
                  detail:
                    "Staff interpreters on campus and VRS interpreters in centers nationwide, usually requiring RID or NAD IV/V certification.",
                },
                {
                  name: "Deaf-serving nonprofits",
                  detail:
                    "Peer support, youth employment programs, independent living, and advocacy work where ASL fluency is the qualification.",
                },
                {
                  name: "Regional school programs (RDSPDs)",
                  detail:
                    "Itinerant teachers, educational interpreters, and signing assistants, each with a named coordinator to email directly.",
                },
                {
                  name: "DeafBlind and community service centers",
                  detail:
                    "ProTactile communication facilitators and braille instructors — roles that explicitly welcome people still learning ASL.",
                },
              ].map((item) => (
                <li key={item.name} className="rounded-2xl bg-mist-50 p-4">
                  <p className="font-extrabold text-ink-900">{item.name}</p>
                  <p className="mt-1">{item.detail}</p>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/jobs" className="btn btn-primary">
                Browse by category
              </Link>
              <Link href="/resources" className="btn btn-ghost">
                See the job boards
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Alerts */}
      <section
        id="alerts"
        className="mx-auto max-w-6xl scroll-mt-24 px-4 pt-20 sm:px-6"
      >
        <AlertSignup />
      </section>
    </>
  );
}
