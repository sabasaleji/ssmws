# Supabase Setup — SSMWS

This site now uses **Supabase** (a hosted Postgres database + auth) instead of
the browser's localStorage. Follow these steps once. Takes ~10 minutes.

---

## 1. Create a Supabase project

1. Go to <https://supabase.com> and sign up (free tier is plenty).
2. Click **New project**.
3. Give it a name (e.g. `ssmws`), set a strong **database password** (save it
   somewhere safe — you won't need it day-to-day), pick the region closest to
   Gujarat (**Mumbai / ap-south-1**), and create it.
4. Wait ~2 minutes for it to provision.

## 2. Create the database tables

1. In the left sidebar open **SQL Editor** → **New query**.
2. Open the file [`supabase/schema.sql`](supabase/schema.sql) from this project,
   copy its **entire** contents, paste into the editor.
3. Click **Run**. You should see "Success. No rows returned."
   This creates all 13 tables, the security rules, and the starter content.

> Fresh setup only needs this file. You can ignore `supabase/migration_contact_info.sql`
> — that's only for projects created before the editable Contact Details feature.

> Re-running the file is safe — it drops and recreates everything. (Don't run it
> again after you have real data, or you'll wipe it.)

## 3. Get your API keys

1. Sidebar → **Project Settings** (gear icon) → **API**.
2. Copy two values:
   - **Project URL** → looks like `https://abcdxyz.supabase.co`
   - **anon / public** key (a long string under "Project API keys")
3. Open **`.env.local`** in this project and paste them in:

   ```
   VITE_SUPABASE_URL="https://abcdxyz.supabase.co"
   VITE_SUPABASE_ANON_KEY="eyJhbGci...your-long-anon-key..."
   ```

   The `anon` key is meant to be public — it can only do what the security
   policies (RLS) allow. **Never** use the `service_role` key in this app.

## 4. Create your admin login

The admin dashboard is now protected by real authentication. Create one user:

1. Sidebar → **Authentication** → **Users** → **Add user** → **Create new user**.
2. Enter an email (e.g. `admin@ssmws.org`) and a strong password.
3. **Tick "Auto Confirm User"** (so it works without an email inbox), then create.

That email + password is what you type on the site's Admin login. To change the
password later, do it here. To add another trustee, just add another user.

> Optional hardening: under **Authentication → Providers → Email**, turn **off**
> "Enable new user signups" so nobody can self-register an admin account.

## 5. Run the app

```
npm install
npm run dev
```

Open the site, go to **Admin** (lock icon), and log in with the email/password
from step 4. You should see the dashboard with the seeded content.

---

## How the security works (plain English)

- **Public content** (trustees, activities, announcements, achievers,
  testimonials, events): anyone can read; only a logged-in admin can change.
- **Personal submissions** (help requests, memberships, volunteers, contacts):
  anyone can submit the form, but **only a logged-in admin can read them**. A
  random visitor can no longer see applicants' phone numbers, addresses, etc.
- **Donations**: a public pledge is saved as *Pending* and is **not** shown on
  the public ledger until an admin marks it *Verified*. The public ledger only
  ever shows verified entries.

All of this is enforced by the database itself (Row-Level Security), not just
hidden in the UI — so it can't be bypassed by editing the page.

## Notes / good next steps

- The donation form records a *pledge*; verifying it against the actual bank/UPI
  payment is currently a manual step. A "Donations" tab in the admin dashboard to
  flip pledges to Verified would close that loop (not built yet).
- File uploads on the help-request form currently store only the file *name*.
  Real file storage would use Supabase Storage (a follow-up).
- The bank account number, IFSC, and registration number shown on the site are
  still hard-coded in the components — double-check they're correct/real before
  going live.
