-- ============================================================================
-- Migration: editable Contact Details (contact_info)
-- ============================================================================
-- Run this ONCE in your existing Supabase project if you already ran schema.sql
-- before this feature existed:
--   Dashboard → SQL Editor → New query → paste this file → Run.
--
-- It adds a single-row table holding the public contact details (office address,
-- phone numbers, email, WhatsApp). The admin panel edits this row and the change
-- shows live for every visitor. Safe to run once.
-- ============================================================================

create table if not exists contact_info (
  id          uuid primary key default gen_random_uuid(),
  address     text not null default '',
  address_gu  text not null default '',
  phone1      text not null default '',
  phone2      text not null default '',
  email       text not null default '',
  whatsapp    text not null default '',
  "createdAt" timestamptz not null default now()
);

alter table contact_info enable row level security;

-- Public can read; only a logged-in admin can edit.
do $$
begin
  if not exists (
    select 1 from pg_policies where tablename = 'contact_info' and policyname = 'public read'
  ) then
    create policy "public read" on contact_info
      for select to anon, authenticated using (true);
  end if;

  if not exists (
    select 1 from pg_policies where tablename = 'contact_info' and policyname = 'admin write'
  ) then
    create policy "admin write" on contact_info
      for all to authenticated using (true) with check (true);
  end if;
end $$;

-- Seed exactly one row (only if the table is empty), with placeholder values.
insert into contact_info (address, address_gu, phone1, phone2, email, whatsapp)
select
  'AMENA HIGH SCHOOL, Panpur, Savgadh, Gujarat 383002',
  'SSMWS સચિવાલય, સુન્ની મોમીન મહોલ્લા, સાબરકાંઠા મુખ્ય બજાર, ગુજરાત, ૩૮૩૦૦૧',
  '+91 94290-84650', '', 'sabarkhanthasunnimominwelfare@gmail.com', '919429084650'
where not exists (select 1 from contact_info);
