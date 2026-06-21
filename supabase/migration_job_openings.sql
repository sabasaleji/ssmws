-- ============================================================================
-- Migration: community Job Board (job_openings)
-- ============================================================================
-- Run this ONCE in your existing Supabase project if you already ran schema.sql
-- before this feature existed:
--   Dashboard → SQL Editor → New query → paste this file → Run.
--
-- It adds a public noticeboard where employers post job openings. Anyone may
-- submit an opening and it goes live immediately (status 'Open'); the public
-- only ever sees 'Open' rows. The employer's own contact details are shown on
-- each listing so job-seekers can reach them directly. Only a logged-in admin
-- may close (status 'Closed') or delete a posting — the takedown safety valve.
-- Safe to run once.
-- ============================================================================

create table if not exists job_openings (
  id              uuid primary key default gen_random_uuid(),
  "jobTitle"      text not null,
  organisation    text not null default '',
  "jobType"       text not null default 'full-time',
  location        text not null default '',
  description     text not null default '',
  salary          text not null default '',
  "contactPerson" text not null default '',
  "contactPhone"  text not null default '',
  "contactEmail"  text not null default '',
  status          text not null default 'Open',
  date            date not null default current_date,
  "createdAt"     timestamptz not null default now()
);

alter table job_openings enable row level security;

-- Anyone may submit (as 'Open' only); the public reads 'Open' rows; the admin
-- reads/updates/deletes everything. Mirrors the donations ledger model.
do $$
begin
  if not exists (
    select 1 from pg_policies where tablename = 'job_openings' and policyname = 'public submit open'
  ) then
    create policy "public submit open" on job_openings
      for insert to anon, authenticated with check (status = 'Open');
  end if;

  if not exists (
    select 1 from pg_policies where tablename = 'job_openings' and policyname = 'public read open'
  ) then
    create policy "public read open" on job_openings
      for select to anon using (status = 'Open');
  end if;

  if not exists (
    select 1 from pg_policies where tablename = 'job_openings' and policyname = 'admin all'
  ) then
    create policy "admin all" on job_openings
      for all to authenticated using (true) with check (true);
  end if;
end $$;
