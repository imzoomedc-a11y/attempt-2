# Publishing SignWorks

SignWorks is a **Next.js app + a PostgreSQL database**. To publish it you need two
things:

1. **A place to run the Node.js app** (Vercel, Railway, Render, a VPS, etc.)
2. **A PostgreSQL database** for it to talk to

Then you give the app one environment variable: `DATABASE_URL`. That is it —
the app **creates its own tables and loads the job data automatically on the
first request**, so there are no manual migrations to run.

> `DATABASE_URL` format:
> `postgresql://USER:PASSWORD@HOST:5432/DATABASE_NAME`

---

## Option A — Railway (easiest, app + database in one click)

Railway hosts both the Node app and a Postgres add-on, and it is free to start.

1. Push this folder to a GitHub repo.
2. Go to [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub repo**.
3. Railway detects Next.js. Create a **Postgres** plugin (New → Database → Postgres).
4. Railway wires up a `DATABASE_URL` variable automatically, or set it manually to the
   Postgres connection string.
5. Wait for the deploy — your site gets a live URL.

That's the whole job.

---

## Option B — Vercel (best for the frontend) + Neon (managed Postgres)

The most popular combo. Both have free tiers.

1. Create a free database at [neon.tech](https://neon.tech) (or Supabase) and copy its
   **Postgres connection string**.
2. Push the code to GitHub.
3. Go to [vercel.com](https://vercel.com) → **Import Project** → pick the repo.
   Vercel auto-detects Next.js.
4. In **Project → Settings → Environment Variables**, add:
   - `DATABASE_URL` = the Neon connection string
5. **Deploy.**

Because the database tables are created on first request, open your Vercel URL once
after deploying to trigger the initial setup.

### Your free domain (Vercel only)

Vercel gives you a **free `*.vercel.app` subdomain** automatically — no DNS, no cost,
and it comes with **free HTTPS (a lock icon)**. It looks professional enough to launch:
`signworks.vercel.app`.

**To get a specific name (recommended):**
1. Before your first deploy, **name the Vercel project `signworks`** (Project settings →
   rename, or set it when you import). Your live URL then becomes
   `signworks.vercel.app`.
2. If the name is already taken, or you've already deployed, claim one manually:
   - Go to **Project → Settings → Domains**.
   - Under the **"vercel.app"** (free) section, type `signworks` → **Claim**.
   - If it says it's taken, try a close variant (`signworks-app`, `getsignworks`,
     `signworks-deaf-jobs`, etc.).
3. Every deploy preview (from a branch/PR) also gets its own free URL, e.g.
   `signworks-gitmain-abc123.vercel.app` — handy for testing before it goes live.

> **A real custom domain** (like `signworks.com`) is **not free** — you'd buy it from a
> registrar and point a CNAME at Vercel. For a launch, the free `signworks.vercel.app`
> is the fastest, cheapest path and you can upgrade to a custom domain later in the same
> Domains tab.

> The free subdomain is the fastest path. If you **already own a domain** (e.g. you
> bought `signworks.com`), the next section is just a couple of DNS records.

### Using your own domain on Option B (Vercel)

Assume your domain is `signworks.com`. You want `signworks.com` **and** `www.signworks.com`
to both work.

**Step 1 — Add the domains in Vercel**
1. Go to your Vercel project → **Settings → Domains**.
2. In the input at the top, type `signworks.com` and **Continue**.
3. Do the same for `www.signworks.com`.
4. Vercel shows the DNS records it needs and starts provisioning a **free SSL certificate**.

**Step 2 — Point your DNS at Vercel** (in your registrar's DNS panel)

| Type    | Host / Name      | Value               |
|---------|------------------|---------------------|
| `A`     | `@` (apex/root)  | `76.76.21.21`       |
| `CNAME` | `www`            | `cname.vercel-dns.com` |

- The **`A` record on `@`** makes `signworks.com` work.
- The **`CNAME` on `www`** makes `www.signworks.com` work.
- If your registrar uses a blank or "default" host field, use `@` (or leave it blank) for
  the apex record.
- Remove any old A records / hosting (old IP, GitHub Pages, etc.) pointing at the domain,
  or they will conflict.

**Step 3 — Wait for verification**
- DNS propagation takes **a few minutes to a few hours** (usually minutes).
- In Vercel the domain flips to **Verified** and the padlock (HTTPS) appears automatically —
  Vercel issues and renews the SSL cert for free.

**Step 4 — Make the site share correctly**
- Add one more env var in **Project → Settings → Environment Variables** (all environments):
  - `NEXT_PUBLIC_SITE_URL` = `https://signworks.com`
- **Re-deploy** so it's baked in. This makes social-share cards (Open Graph / Twitter)
  point at your real domain and the right image.

**Done.** `signworks.com` and `www.signworks.com` now serve the app with free HTTPS.

> This domain setup is for **Option B (Vercel) only**, as requested. Other hosts use
> different DNS records.

### GoDaddy-specific walkthrough (you bought the domain on GoDaddy)

If your domain's DNS is managed by GoDaddy, here's exactly where to click.

1. Log in to GoDaddy → **My Products** → find your domain → click **DNS** (under
   "Set Up" / "Manage DNS"). This opens the **Records** table.
2. **Clear conflicts first.** Delete any record that points the domain somewhere else:
   - an old **A** record (a number),
   - a **Forward** / "URL forwarding" record,
   - any GoDaddy placeholder/parking record.
   > Do **not** use GoDaddy's "URL Forwarding" or "Site Builder" — you want real DNS
   > records, not a redirect.
3. Click **Add a Record** and add these two:

   | Type | Name | Value | TTL |
   |------|------|-------|-----|
   | `A` | `@` | `76.76.21.21` | `Auto` |
   | `CNAME` | `www` | `cname.vercel-dns.com` | `Auto` |

   - If GoDaddy shows "Name" as a prefix only (e.g. it already appends your domain),
     type `@` for the apex and `www` for the second record — do not type the full domain.
   - Save each one.
4. Now go to **Vercel → your project → Settings → Domains** and add:
   - `yourdomain.com`
   - `www.yourdomain.com`
5. Vercel will show **Pending** until GoDaddy's changes propagate. GoDaddy is usually a
   few minutes but can take up to ~24h in rare cases. Refresh the Domains tab; when it
   flips to **Verified** you'll see the **padlock** — HTTPS is automatic and free.
6. Add the env var `NEXT_PUBLIC_SITE_URL` = `https://yourdomain.com` (all environments)
   and **redeploy** so social-share cards use your real domain.

**Checklist if it's not working:**
- Exactly one `A` record for `@` → `76.76.21.21` (no other A records on `@`).
- Exactly one `CNAME` for `www` → `cname.vercel-dns.com`.
- No leftover Forward/parking records.
- In Vercel, both `yourdomain.com` and `www.yourdomain.com` are added and **Verified**.
- You can sanity-check what a visitor resolves with `nslookup yourdomain.com` (should
  return `76.76.21.21`) and `nslookup www.yourdomain.com` (should point at Vercel).

---

## Option C — Render (app + managed Postgres)

1. Create a free **PostgreSQL** instance at [render.com](https://render.com) and copy the
   connection string.
2. Create a **Web Service** from your GitHub repo.
   - Build command: `npm install`
   - Start command: `npm run build && npm start`
3. Add the `DATABASE_URL` environment variable.
4. **Deploy.**

---

## Option D — Your own server / VPS (Hetzner, DigitalOcean, Lightsail…) using Docker

This runs the app **and** the database with one command. Any machine with Docker:

```bash
# on the server, after cloning the repo:
git clone <your-repo-url> signworks
cd signworks
docker compose up -d --build
```

- The site runs at `http://your-server:3000`.
- PostgreSQL is started automatically with a persistent volume.
- To make it public, put a reverse proxy (Caddy or Nginx) in front on port 80/443 —
  Caddy gives you free HTTPS with one line:

```
# Caddyfile
your-domain.com {
    reverse_proxy localhost:3000
}
```

> You can also run it without Docker if you prefer: install Node 20 and PostgreSQL on
> the box, set `DATABASE_URL` in the environment, then `npm install && npm run build &&
> npm start` (use `pm2` to keep it running).

---

## Adding a custom domain

Every option (A–D) lets you attach your own domain:

- **Vercel / Railway / Render:** add the domain in the dashboard, then point your DNS
  (A record / CNAME) at the URL they show you. Vercel and Render issue free SSL certs.
- **VPS:** Caddy/Nginx handles the SSL automatically (see Option D).

---

## Things to know

- **The only required env var is `DATABASE_URL`.** No API keys, no other secrets.
- **Fresh database = no setup.** First page load creates the 4 tables and seeds the
  22 listings + resources.
- **Job data lives in the database.** If you want new/editable listings to survive
  restarts, keep using the managed Postgres (don't reset the volume). To fully reset
  to the seed data, drop the database and let it re-seed.
- **Node 18+ / 20** is required to run or build it.

Made by Tyree and Kianu 🤟
