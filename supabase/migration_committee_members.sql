-- ============================================================================
-- Migration: Managing Committee members (region) + real karobari roster
-- ============================================================================
-- Run this ONCE in your existing Supabase project if you already ran schema.sql
-- before this feature existed:
--   Dashboard → SQL Editor → New query → paste this file → Run.
--
-- It (1) adds region / region_gu columns to the trustees table, (2) removes the
-- old placeholder sample trustees, and (3) inserts the 34 real Managing
-- Committee members (name + region only) from members.pdf. Safe to run once.
-- ============================================================================

-- 1. Add the region columns (no-op if they already exist).
alter table trustees add column if not exists region    text not null default '';
alter table trustees add column if not exists region_gu text not null default '';

-- 1b. Members carry no designation, so let it default to '' (it was NOT NULL
--     with no default, which would reject the inserts below).
alter table trustees alter column designation set default '';

-- 2. Clear the existing roster (the old placeholder sample trustees) so the
--    committee list reflects exactly the members from members.pdf.
delete from trustees;

-- 3. Insert the 34 Managing Committee members. Only name + region (village) are
--    recorded; designation/photo/intro/phone are intentionally left blank.
insert into trustees (name, name_gu, region, region_gu) values
('Imranbhai Sulemanbhai Masu','ઈમરાનભાઈ સુલેમાનભાઈ મસુ','Ilol Pahadiya','ઈલોલ પહાડીયા'),
('Iqbalbhai Hasanbhai Dangoliya','ઈકબાલભાઈ હસનભાઈ દાંગોલીયા','Ilol Pahadiya','ઈલોલ પહાડીયા'),
('Hanjalabhai Mo. Nuruddinbhai Masi','હન્જલાભાઈ મો.નૂરુદ્દીનભાઈ મસી','Ilol Pahadiya','ઈલોલ પહાડીયા'),
('Salmanbhai Mohammadkasim Dangoliya','સલમાનભાઈ મોહંમદકાસીમ દાંગોલીયા','Ilol Pahadiya','ઈલોલ પહાડીયા'),
('Bilalbhai Abidbhai Vijapura','બીલાલભાઈ આબિદભાઈ વીજાપુરા','Navalpur','નવલપુર'),
('Juberbhai Ismailbhai Dhanga','જુબેરભાઈ ઈસ્માઈલભાઈ ધાંગા','Navalpur','નવલપુર'),
('Abdulajijbhai Ibrahimbhai Vijapura','અબ્દુલઅજીજભાઈ ઈબ્રાહીમભાઈ વિજાપુરા','Navalpur','નવલપુર'),
('Hidayatullah Yusufbhai Dhapa','હિદાયતુલ્લાહ યુસુફભાઈ ઢાપા','Ilol Talav','ઈલોલ તળાવ'),
('Mustufabhai Karimbhai Dhapa','મુસ્તુફાભાઈ કરીમભાઈ ઢાપા','Ilol Talav','ઈલોલ તળાવ'),
('Aslambhai Abdulbhai Vijapura','અસલમભાઈ અબ્દુલભાઈ વિજાપુરા','Ilol Talav','ઈલોલ તળાવ'),
('Hifjurrahman Valibhai Kharodiya','હિફ્જુરરહેમાન વલીભાઈ ખરોડીયા','Satnagar','સતનગર'),
('Rafikbhai Ganibhai Rajpura','રફીકભાઈ ગનીભાઈ રાજપુરા','Bolundra','બોલુન્દ્રા'),
('Zulfikarali Majidbhai Rajpura','ઝુલ્ફીકારઅલી મજીદભાઈ રાજપુરા','Kesharpura','કેશરપુરા'),
('Mustakbhai Hanifbhai Matadar','મુસ્તાકભાઈ હનીફભાઈ મતાદાર','Kesharpura','કેશરપુરા'),
('Dodiya Yasinbhai Aiyubbhai','ડોડીયા યાસીનભાઈ ઐયુબભાઈ','Managadh','માનગઢ'),
('Dodiya Sirajbhai Ibrahimbhai','ડોડીયા સિરાજભાઈ ઈબ્રાહીમભાઈ','Gadha','ગઢા'),
('Dodiya Mohamadriyaz Ismailbhai','ડોડીયા મોહમદરીયાઝ ઈસ્માઈલભાઈ','Gadha','ગઢા'),
('Revasiya Junedbhai Yakubbhai','રેવાસીયા જૂનેદભાઈ યાકુબભાઈ','Gadha','ગઢા'),
('Athaniya A. Jabbarbhai Daudbhai','અથાણીયા અ જબ્બારભાઈ દાઉદભાઈ','Panpur','પાણપુર'),
('Revasiya Sajidbhai Ismailbhai','રેવાસીયા સાજીદભાઈ ઈસ્માઈલભાઈ','Panpur','પાણપુર'),
('Degharotiya Mubarakbhai Iqbalbhai','દેઘરોટીયા મુબારકભાઈ ઈકબાલભાઈ','Kanai','કનાઈ'),
('Iliyasbhai Alimohamadbhai Khanushiya','ઈલીયાસભાઈ અલીમોહમદભાઈ ખણુશિયા','Virpur','વીરપુર'),
('Hifjurbhai Sharifbhai Bhatt','હિફ્જુરભાઈ શરિફભાઈ ભટ્ટ','Virpur','વીરપુર'),
('Mashi Asharafbhai Nurbhai','મશી અશરફભાઈ નુરભાઈ','Virpur','વીરપુર'),
('Yunusbhai Vajirbhai Vijapura','યુનુસભાઈ વજીરભાઈ વીજાપુરા','Jurpura','જુરપુરા'),
('Iqbalbhai Abdulbhai Dangoliya','ઈકબાલભાઈ અબ્દુલભાઈ દાંગોલીયા','Jurpura','જુરપુરા'),
('Mehbubbhai Hasambhai Dangoliya','મહેબુબભાઈ હાસમભાઈ દાંગોલીયા','Ilol','ઈલોલ'),
('Juberbhai Ismailbhai Patel','જુબેરભાઈ ઈસ્માઈલભાઈ પટેલ','Ahmedabad','અમદાવાદ'),
('Kasimbhai Usmanbhai Dangoliya','કાસીમભાઈ ઉસ્માનભાઈ દાંગોલીયા','Ahmedabad','અમદાવાદ'),
('Abdulhafizbhai Alibhai Kovadiya','અબ્દુલહફિઝભાઈ અલીભાઈ કોવડિયા','Nurpura','નુરપુરા'),
('Mo. Ovesh Abubakkarbhai Rajpura','મો.ઓવેશ અબુબક્કરભાઈ રાજપુરા','Kesharpura','કેશરપુરા'),
('Mehmudbhai Ibrahimbhai Davda','મહેમુદભાઈ ઈબ્રાહીમભાઈ દાવડા','Katvad','કાટવાડ'),
('Mobinbhai Ibrahimbhai Pogalva','મોબીનભાઈ ઈબ્રાહીમભાઈ પોગળવા','Lalpur','લાલપુર'),
('Mo. Sarfaraj Ibrahimbhai Momin','મો.સરફરાજ ઈબ્રાહીમભાઈ મોમીન','Tajpuri','તાજપુરી');
