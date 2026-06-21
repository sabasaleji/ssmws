-- ============================================================================
-- Migration: confidential Matrimonial / Rishta registry (matrimonials)
-- ============================================================================
-- Run this ONCE in your existing Supabase project if you already ran schema.sql
-- before this feature existed:
--   Dashboard → SQL Editor → New query → paste this file → Run.
--
-- It adds a table where single community members submit their own basic details
-- to find a marriage match. Like the other personal-submission tables, anyone
-- may INSERT, but ONLY a logged-in admin may read / update / delete the rows.
-- These details are never shown publicly anywhere on the site. Safe to run once.
-- ============================================================================

create table if not exists matrimonials (
  id              uuid primary key default gen_random_uuid(),
  "fullName"      text not null,
  gender          text not null default 'male',
  dob             text not null default '',
  "maritalStatus" text not null default 'single',
  education       text not null default '',
  occupation      text not null default '',
  village         text not null default '',
  phone           text not null default '',
  "guardianName"  text not null default '',
  "guardianPhone" text not null default '',
  about           text not null default '',
  status          text not null default 'New',
  date            date not null default current_date,
  "createdAt"     timestamptz not null default now()
);

alter table matrimonials enable row level security;

-- Anyone may submit; only the admin may read / update / delete.
do $$
begin
  if not exists (
    select 1 from pg_policies where tablename = 'matrimonials' and policyname = 'public submit'
  ) then
    create policy "public submit" on matrimonials
      for insert to anon, authenticated with check (true);
  end if;

  if not exists (
    select 1 from pg_policies where tablename = 'matrimonials' and policyname = 'admin read'
  ) then
    create policy "admin read" on matrimonials
      for select to authenticated using (true);
  end if;

  if not exists (
    select 1 from pg_policies where tablename = 'matrimonials' and policyname = 'admin update'
  ) then
    create policy "admin update" on matrimonials
      for update to authenticated using (true) with check (true);
  end if;

  if not exists (
    select 1 from pg_policies where tablename = 'matrimonials' and policyname = 'admin delete'
  ) then
    create policy "admin delete" on matrimonials
      for delete to authenticated using (true);
  end if;
end $$;
