-- Migration: replace old placeholder contact address with registered office.
update contact_info
set
  address = 'AMENA HIGH SCHOOL, Panpur, Savgadh, Gujarat 383002',
  address_gu = 'AMENA HIGH SCHOOL, Panpur, Savgadh, Gujarat 383002'
where
  address ilike '%SSMWS Secretariat%'
  or address like '%383001%'
  or address_gu ilike '%SSMWS Secretariat%'
  or address_gu like '%383001%';
