-- ============================================================================
-- Migration: Set designations for the 8 Managing Committee office bearers
-- ============================================================================
-- Run in Supabase Dashboard → SQL Editor → New query → paste → Run.
-- Updates existing rows (already inserted by migration_committee_members.sql)
-- with their official designation and designation_gu.
-- ============================================================================

-- 1. President — Satnagar (only one member from Satnagar)
update trustees
set designation    = 'President',
    designation_gu = 'પ્રમુખ'
where region_gu = 'સતનગર';

-- 2. Vice President — Katwad (only one member from Katwad)
update trustees
set designation    = 'Vice President',
    designation_gu = 'ઉપપ્રમુખ'
where region_gu = 'કાટવાડ';

-- 3. Vice President — Kesharpura, Rajpura surname
update trustees
set designation    = 'Vice President',
    designation_gu = 'ઉપપ્રમુખ'
where region_gu = 'કેશરપુરા'
  and name ilike '%Rajpura%';

-- 4. Secretary — Hidayatullah Dhapa, Ilol Talav
update trustees
set designation    = 'Secretary',
    designation_gu = 'મંત્રી'
where region_gu = 'ઈલોલ તળાવ'
  and name ilike '%Hidayatullah%';

-- 5. Joint Secretary — Mustufabhai Dhapa, Ilol Talav
update trustees
set designation    = 'Joint Secretary',
    designation_gu = 'સહમંત્રી'
where region_gu = 'ઈલોલ તળાવ'
  and name ilike '%Mustufabhai%';

-- 6. Joint Secretary — Mehbubbhai Dangoliya, Ilol
update trustees
set designation    = 'Joint Secretary',
    designation_gu = 'સહમંત્રી'
where region_gu = 'ઈલોલ'
  and name ilike '%Mehbubbhai%';

-- 7. Treasurer — Bilalbhai Vijapura, Navalpur
update trustees
set designation    = 'Treasurer',
    designation_gu = 'ખજાનચી'
where region_gu = 'નવલપુર'
  and name ilike '%Bilalbhai%';

-- 8. Internal Auditor — Rafikbhai Rajpura, Bolundra
update trustees
set designation    = 'Internal Auditor',
    designation_gu = 'આંતરિક ઓડિટર'
where region_gu = 'બોલુન્દ્રા';

-- Verify the result
select name, name_gu, region, region_gu, designation, designation_gu
from trustees
where designation != ''
order by "createdAt";
