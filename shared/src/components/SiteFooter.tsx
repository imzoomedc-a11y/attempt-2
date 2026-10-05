import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-ink-950 text-mist-200">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10 text-lg text-brand-300"
            >
              🤟
            </span>
            <span className="text-lg font-extrabold tracking-tight text-white">
              SignWorks
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-mist-200/75">
            A job board built text-first and visual-first, so Deaf and
            hard-of-hearing job seekers can show up as candidates — not as a
            accommodation request.
          </p>
          <p className="mt-4 text-sm text-mist-200/60">
            Every listing is screened for captioning, interpreters, and written
            communication.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-brand-300">
            Job seekers
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/jobs" className="hover:text-white">
                Browse open roles
              </Link>
            </li>
            <li>
              <Link href="/jobs?aslFriendly=1" className="hover:text-white">
                ASL-friendly employers
              </Link>
            </li>
            <li>
              <Link href="/resources" className="hover:text-white">
                Rights &amp; accommodations
              </Link>
            </li>
            <li>
              <Link href="/about#fingerspelling" className="hover:text-white">
                Fingerspelling practice
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-brand-300">
            Get involved
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/post" className="hover:text-white">
                Share a real opening
              </Link>
            </li>
            <li>
              <Link href="/jobs?vpFriendly=1" className="hover:text-white">
                Roles with a VP number
              </Link>
            </li>
            <li>
              <Link href="/resources" className="hover:text-white">
                Job boards we trust
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white">
                Our mission
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-mist-200/60 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} SignWorks. Demo project.</p>
          <p className="font-semibold text-white">
            Made by{" "}
            <span className="text-brand-300">Tyree</span> and{" "}
            <span className="text-accent-300">Kianu</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
