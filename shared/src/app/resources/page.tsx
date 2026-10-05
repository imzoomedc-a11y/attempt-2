import Link from "next/link";
import CopyBlock from "@/components/CopyBlock";
import ReadinessChecklist from "@/components/ReadinessChecklist";
import { listResources } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Resources & your rights",
  description:
    "Legal rights, accommodation templates, ASL learning paths, and workplace technology for Deaf and hard-of-hearing job seekers.",
};

const KIND_ORDER = ["Job Boards", "Rights & Advocacy", "Training & Certification"];

const ACCOMMODATION_TEMPLATE = `Subject: Accommodation request — {Your name}, {Role}

Hello {Manager name},

I'm excited about the {Role} position. To do my best work, I'd like to request
these accommodations:

1. Live captions (or CART) during meetings and trainings.
2. Interview and onboarding materials sent in writing in advance.
3. An ASL interpreter for {specific events, e.g. the panel interview}.

These are standard, low-cost adjustments, and I'm happy to coordinate the
logistics. Please let me know if you need documentation from me.

Thank you,
{Your name}
{Email} · {Videophone or captioned number}`;

const FOLLOW_UP_TEMPLATE = `Subject: Following up — {Role} interview

Hello {Interviewer name},

Thank you for the conversation on {date}. I'm following up in writing because
written notes are easiest for me to review.

Two things I wanted to add:
• {A specific achievement, with a number if you have one}
• {A question about the team's workflow}

I'd welcome written feedback either way, and I'm glad to do a follow-up over
video with captions or an interpreter.

Best,
{Your name}`;

export default async function ResourcesPage() {
  const resources = await listResources();
  const grouped = KIND_ORDER.map((kind) => ({
    kind,
    items: resources.filter((resource) => resource.kind === kind),
  })).filter((group) => group.items.length > 0);

  const extra = resources.filter((resource) => !KIND_ORDER.includes(resource.kind));
  if (extra.length > 0) grouped.push({ kind: "More", items: extra });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="max-w-3xl">
        <span className="chip bg-brand-50 text-brand-700">📚 Resources</span>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-ink-900">
          Know your rights, then ask for what you need
        </h1>
        <p className="mt-3 text-base leading-relaxed text-ink-700">
          Everything below is free unless marked otherwise. Start with the checklist, keep
          the templates, and bring the legal links with you to an interview.
        </p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-10">
          {grouped.map((group) => (
            <section key={group.kind}>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink-900">
                {group.kind}
              </h2>
              <ul className="mt-4 space-y-3">
                {group.items.map((resource) => (
                  <li key={resource.id} className="card p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-extrabold text-ink-900">
                        {resource.title}
                      </h3>
                      {resource.isFree ? (
                        <span className="chip bg-brand-50 text-brand-700">Free</span>
                      ) : (
                        <span className="chip bg-accent-100 text-accent-600">Paid</span>
                      )}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink-700">
                      {resource.description}
                    </p>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 underline-offset-2 hover:underline"
                    >
                      Visit resource
                      <span aria-hidden="true">↗</span>
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <ReadinessChecklist />
          <CopyBlock
            title="Accommodation request template"
            text={ACCOMMODATION_TEMPLATE}
          />
          <CopyBlock title="Post-interview follow-up template" text={FOLLOW_UP_TEMPLATE} />
          <div className="card bg-ink-950 p-6 text-white">
            <h2 className="text-lg font-extrabold">Emergency, not email</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              In the US you can text 911 in most areas, and every state relay service
              connects you to an ASL interpreter for free, 24/7.
            </p>
          </div>
        </div>
      </div>

      <section className="card mt-14 grid gap-6 p-8 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <h2 className="text-xl font-extrabold text-ink-900">
            Take your checklist to a real listing
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
            The filters let you search only workplaces that are ASL-friendly or list a
            videophone number — so you can apply where you already know the
            communication will work.
          </p>
        </div>
        <Link href="/jobs?aslFriendly=1" className="btn btn-primary">
          Browse ASL-friendly roles
        </Link>
      </section>
    </div>
  );
}
