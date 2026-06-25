-- ============================================================================
-- Migration: Set designations + sort order for the 8 office bearers
-- ============================================================================
-- Run in Supabase Dashboard → SQL Editor → New query → paste → Run.
-- Safe to re-run — all statements are idempotent.
-- ============================================================================

-- 0. Add sort_order column (no-op if already exists).
--    Office bearers get 1–8; all other committee members get 100.
alter table trustees add column if not exists sort_order integer not null default 100;

-- Default everyone to 100 first (clean slate in case re-run).
update trustees set sort_order = 100;

-- 1. President — Satnagar
update trustees
set designation    = 'President',
    designation_gu = 'પ્રમુખ',
    sort_order     = 1
where region_gu = 'સતનગર';

-- 2. Vice President — Katwad
update trustees
set designation    = 'Vice President',
    designation_gu = 'ઉપપ્રમુખ',
    sort_order     = 2
where region_gu = 'કાટવાડ';

-- 3. Vice President — Kesharpura, Rajpura surname
update trustees
set designation    = 'Vice President',
    designation_gu = 'ઉપપ્રમુખ',
    sort_order     = 3
where region_gu = 'કેશરપુરા'
  and name ilike '%Rajpura%';

-- 4. Secretary — Hidayatullah Dhapa, Ilol Talav
update trustees
set designation    = 'Secretary',
    designation_gu = 'મંત્રી',
    sort_order     = 4
where region_gu = 'ઈલોલ તળાવ'
  and name ilike '%Hidayatullah%';

-- 5. Joint Secretary — Mustufabhai Dhapa, Ilol Talav
update trustees
set designation    = 'Joint Secretary',
    designation_gu = 'સહમંત્રી',
    sort_order     = 5
where region_gu = 'ઈલોલ તળાવ'
  and name ilike '%Mustufabhai%';

-- 6. Joint Secretary — Mehbubbhai Dangoliya, Ilol
update trustees
set designation    = 'Joint Secretary',
    designation_gu = 'સહમંત્રી',
    sort_order     = 6
where region_gu = 'ઈલોલ'
  and name ilike '%Mehbubbhai%';

-- 7. Treasurer — Bilalbhai Vijapura, Navalpur
update trustees
set designation    = 'Treasurer',
    designation_gu = 'ખજાનચી',
    sort_order     = 7
where region_gu = 'નવલપુર'
  and name ilike '%Bilalbhai%';

-- 8. Internal Auditor — Rafikbhai Rajpura, Bolundra
update trustees
set designation    = 'Internal Auditor',
    designation_gu = 'આંતરિક ઓડિટર',
    sort_order     = 8
where region_gu = 'બોલુન્દ્રા';

-- Verify: office bearers first, then committee members
select sort_order, name, name_gu, region_gu, designation_gu
from trustees
order by sort_order, "createdAt";
