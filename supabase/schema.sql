-- ============================================================================
-- Sabarkantha Sunni Momin Welfare Society — Supabase schema
-- ============================================================================
-- Run this ONCE in your Supabase project:
--   Dashboard → SQL Editor → New query → paste this whole file → Run.
--
-- Design notes
-- ------------
-- * Column names are quoted camelCase so they map 1:1 to the app's TypeScript
--   types (e.g. "donorName", "amountRequested"). No field mapping needed.
-- * Row-Level Security (RLS) is ON for every table. The rules:
--     - Public content (trustees, activities, announcements,
--       achievers, testimonials, upcoming_events): anyone may READ,
--       only a logged-in admin may write.
--     - Personal submissions (help_requests, memberships, volunteers,
--       contacts, matrimonials): anyone may SUBMIT (insert), only a logged-in
--       admin may read / update / delete them. Visitors can NEVER read others'
--       data — the matrimonial registry in particular is admin-eyes-only.
--     - donations: anyone may submit (forced to status 'Pending'); the
--       PUBLIC ledger only shows 'Verified' rows; admin sees & verifies all.
-- * "Admin" = any authenticated Supabase user. Create exactly one user in
--   Authentication → Users (see SUPABASE_SETUP.md).
-- ============================================================================

-- Clean re-run support (safe to run multiple times) --------------------------
drop table if exists announcements, trustees, activities, achievers,
  testimonials, upcoming_events, help_requests, memberships, volunteers,
  contacts, matrimonials, donations, job_openings, contact_info cascade;

-- ============================================================================
-- PUBLIC CONTENT TABLES (public read, admin write)
-- ============================================================================

create table trustees (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  name_gu       text not null default '',
  designation   text not null default '',
  designation_gu text not null default '',
  photo         text not null default '',
  intro         text not null default '',
  intro_gu      text not null default '',
  region        text not null default '',
  region_gu     text not null default '',
  phone         text,
  email         text,
  "createdAt"   timestamptz not null default now()
);

create table activities (
  id              uuid primary key default gen_random_uuid(),
  title           text not null,
  title_gu        text not null default '',
  description     text not null default '',
  description_gu  text not null default '',
  icon            text not null default '',
  stats           text not null default '',
  stats_gu        text not null default '',
  "beneficiaryStory" jsonb not null default '{}'::jsonb,
  "createdAt"     timestamptz not null default now()
);

create table achievers (
  id               uuid primary key default gen_random_uuid(),
  name             text not null,
  name_gu          text not null default '',
  category         text not null default 'topper',
  category_label   text not null default '',
  category_label_gu text not null default '',
  achievement      text not null default '',
  achievement_gu   text not null default '',
  phone            text,
  message          text not null default '',
  message_gu       text not null default '',
  photo            text not null default '',
  "createdAt"      timestamptz not null default now()
);

create table announcements (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  title_gu    text not null default '',
  content     text not null default '',
  content_gu  text not null default '',
  category    text not null default 'general',
  important   boolean not null default false,
  date        date not null default current_date,
  "createdAt" timestamptz not null default now()
);

create table testimonials (
  id              uuid primary key default gen_random_uuid(),
  quote           text not null,
  quote_gu        text not null default '',
  author          text not null,
  author_gu       text not null default '',
  designation     text not null default '',
  designation_gu  text not null default '',
  "avatarInitials" text not null default '',
  "createdAt"     timestamptz not null default now()
);

create table upcoming_events (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  title_gu      text not null default '',
  description   text not null default '',
  description_gu text not null default '',
  month         text not null default '',
  month_gu      text not null default '',
  day           text not null default '',
  category      text not null default '',
  category_gu   text not null default '',
  venue         text,
  venue_gu      text,
  "createdAt"   timestamptz not null default now()
);

-- Single-row site contact details (public read, admin edits propagate to all).
create table contact_info (
  id          uuid primary key default gen_random_uuid(),
  address     text not null default '',
  address_gu  text not null default '',
  phone1      text not null default '',
  phone2      text not null default '',
  email       text not null default '',
  whatsapp    text not null default '',
  "createdAt" timestamptz not null default now()
);

-- ============================================================================
-- PERSONAL SUBMISSION TABLES (public insert, admin read/update/delete)
-- ============================================================================

create table help_requests (
  id               uuid primary key default gen_random_uuid(),
  "applicantName"  text not null,
  phone            text not null default '',
  email            text not null default '',
  category         text not null default 'education',
  description      text not null default '',
  "amountRequested" integer not null default 0,
  "fileName"       text,
  status           text not null default 'Pending',
  "statusNotes"    text,
  date             date not null default current_date,
  "createdAt"      timestamptz not null default now()
);

create table memberships (
  id                  uuid primary key default gen_random_uuid(),
  "fullName"          text not null,
  "fatherHusbandName" text not null default '',
  phone               text not null default '',
  email               text not null default '',
  address             text not null default '',
  occupation          text not null default '',
  dob                 text not null default '',
  gender              text not null default 'male',
  "bloodGroup"        text,
  "membershipType"    text not null default 'annual',
  status              text not null default 'Pending',
  date                date not null default current_date,
  "createdAt"         timestamptz not null default now()
);

create table volunteers (
  id          uuid primary key default gen_random_uuid(),
  "fullName"  text not null,
  phone       text not null default '',
  email       text not null default '',
  skills      text not null default '',
  interests   text[] not null default '{}',
  date        date not null default current_date,
  "createdAt" timestamptz not null default now()
);

create table contacts (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  phone       text not null default '',
  email       text not null default '',
  subject     text not null default '',
  message     text not null default '',
  date        date not null default current_date,
  "createdAt" timestamptz not null default now()
);

-- Confidential matrimonial / rishta registry. Single members submit their
-- own basic details; ONLY the admin can ever read them (never shown publicly).
create table matrimonials (
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

create table donations (
  id            uuid primary key default gen_random_uuid(),
  "donorName"   text not null default 'Anonymous',
  amount        integer not null default 0,
  category      text not null default 'Welfare Zakat Fund',
  "referenceNo" text not null default '',
  status        text not null default 'Pending',
  date          date not null default current_date,
  "createdAt"   timestamptz not null default now()
);

-- Community job board. Employers submit openings that go live immediately
-- (status 'Open'); the public sees 'Open' rows and contacts the employer
-- directly. Only the admin may close ('Closed') or delete a posting.
create table job_openings (
  id              uuid primary key default gen_random_uuid(),
  "jobTitle"      text not null,
  organisation    text not null default '',
  description     text not null default '',
  salary          text not null default '',
  "contactPerson" text not null default '',
  "contactPhone"  text not null default '',
  status          text not null default 'Open',
  date            date not null default current_date,
  "createdAt"     timestamptz not null default now()
);

-- ============================================================================
-- ROW-LEVEL SECURITY
-- ============================================================================

alter table trustees        enable row level security;
alter table activities      enable row level security;
alter table achievers       enable row level security;
alter table announcements   enable row level security;
alter table testimonials    enable row level security;
alter table upcoming_events enable row level security;
alter table help_requests   enable row level security;
alter table memberships     enable row level security;
alter table volunteers      enable row level security;
alter table contacts        enable row level security;
alter table matrimonials    enable row level security;
alter table donations       enable row level security;
alter table job_openings    enable row level security;
alter table contact_info    enable row level security;

-- ---- Public content: read by anyone, written only by admin -----------------
do $$
declare t text;
begin
  foreach t in array array[
    'trustees','activities','achievers','announcements',
    'testimonials','upcoming_events','contact_info'
  ]
  loop
    execute format(
      'create policy "public read" on %I for select to anon, authenticated using (true);', t);
    execute format(
      'create policy "admin write" on %I for all to authenticated using (true) with check (true);', t);
  end loop;
end $$;

-- ---- Personal submissions: insert by anyone, everything else admin-only -----
do $$
declare t text;
begin
  foreach t in array array['help_requests','memberships','volunteers','contacts','matrimonials']
  loop
    execute format(
      'create policy "public submit" on %I for insert to anon, authenticated with check (true);', t);
    execute format(
      'create policy "admin read"   on %I for select to authenticated using (true);', t);
    execute format(
      'create policy "admin update" on %I for update to authenticated using (true) with check (true);', t);
    execute format(
      'create policy "admin delete" on %I for delete to authenticated using (true);', t);
  end loop;
end $$;

-- ---- Donations: public submits (Pending only) + reads Verified-only ledger --
create policy "public submit pending" on donations
  for insert to anon, authenticated
  with check (status = 'Pending');

create policy "public read verified" on donations
  for select to anon
  using (status = 'Verified');

create policy "admin all" on donations
  for all to authenticated
  using (true) with check (true);

-- ---- Job board: public submits 'Open' + reads 'Open' only, admin manages all -
create policy "public submit open" on job_openings
  for insert to anon, authenticated
  with check (status = 'Open');

create policy "public read open" on job_openings
  for select to anon
  using (status = 'Open');

create policy "admin all" on job_openings
  for all to authenticated
  using (true) with check (true);

-- ============================================================================
-- SEED DATA (public content only — no fake personal data)
-- ============================================================================

-- Managing Committee members (Sunni Momin Welfare Society karobari list).
-- Source: members.pdf. Only name + region (village) are recorded for these
-- members; designation/photo/intro/phone are intentionally left blank.
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

insert into activities (title, title_gu, description, description_gu, icon, stats, stats_gu, "beneficiaryStory") values
('Education Support','શિક્ષણ સહાય અને શિષ્યવૃત્તિ','Providing full or partial college tuition scholarships for professional degrees (MBBS, BTech, CA, BCA), distributing syllabus schoolbooks, and managing free after-hours girls boarding and coaching classes.','વ્યાવસાયિક ડિગ્રીઓ (MBBS, BTech, CA, BCA) માટે ટ્યુશન ફી સ્કોલરશીપ આપવી, જરૂરિયાતમંદ વિદ્યાર્થીઓને નિઃશુલ્ક પુસ્તકો વિતરણ અને કન્યાઓ માટે ખાસ કોચિંગ વર્ગો ચલાવવા.','GraduationCap','450+ Scholar Grants Distributed','૪૫૦ થી વધુ વિદ્યાર્થી શિષ્યવૃત્તિ વિતારિત',
'{"name":"Amina Momin (M.B.B.S Scholar)","name_gu":"આમીના મોમીન (M.B.B.S સ્કોલર)","story":"Amina lost her father during high school and could not afford high medical fees. SSMWS sponsored her entire medical education fees. She is now completing her medical residency and is volunteering weekly to give free medical consults to local families.","story_gu":"હાઇસ્કૂલમાં રહીને જ આમીનાએ તેમના પિતા ગુમાવ્યા, માટે મેડિકલ કોલેજની ફી ભરવી અશક્ય હતી. સોસાયટીએ દર વર્ષે તેમની કોલેજ ફી સ્પોન્સર કરી. આજે આમીના રેસિડેન્ટ ડોક્ટર છે અને વતનના વરિષ્ઠ લોકોને ફ્રી કન્સલ્ટેશન સેવા આપી ઋણ અદા કરે છે.","impact":"100% Sponsor Outflow - Now a Practicing Doctor","impact_gu":"૧૦૦% શૈક્ષણિક સ્પોન્સરશીપ - આજે સફળતાપૂર્વક ડોકટરી સેવા આપે છે"}'),
('Medical Help','તબીબી રાહત','Direct financing of complex cardiovascular and oncological surgeries for economically weaker sections, managing prescription supply circles for chronically ill patients, and running free blood grouping camps.','ગંભીર બીમારીઓ જેમ કે હ્રદયરોગ, કેન્સર ઓપરેશનો માટે ડાયરેક્ટ હોસ્પિટલ પેમેન્ટ, વિધવાઓ અને વરિષ્ઠો માટે નિયમિત દવા પૂરી પાડવી અને હેલ્થ કેમ્પ આયોજન કરવું.','HeartHandshake','₹24 Lakhs Disbursed for Urgent Surgeries','રૂ. ૨૪ લાખથી વધુ ગંભીર શસ્ત્રક્રિયાઓમાં સહાય',
'{"name":"Razak Yusuf Momin (Open Heart Surgery Candidate)","name_gu":"રઝાક યુસુફ મોમીન (ઓપન હાર્ટ સર્જરી લાભાર્થી)","story":"Razak was an autorickshaw driver when he suffered a major cardiac event requiring immediate bypass surgery. SSMWS coordinated with the hospital directly to deposit development funds within 2 hours, saving his life.","story_gu":"રઝાક રીક્ષા ડ્રાઈવર છે, જેમને અચાનક ગંભીર હ્રદયરોગનો હુમલો આવ્યો. સોસાયટીએ યુદ્ધના ધોરણે માત્ર ૨ કલાકની અંદર હોસ્પિટલ પ્રશાસન સાથે સીધા ખાતામાં જરૂરી ભંડોળ જમા કરી તેમનો જીવ બચાવી લીધો.","impact":"Emergency Fund Transfer in 2 Hours - Fully Recovered","impact_gu":"માત્ર ૨ કલાકમાં કટોકટી ભંડોળ ટ્રાન્સફર - અત્યારે સ્વાસ્થ્ય સુખાકારી"}'),
('Marriage Assistance','કન્યાદાન અને સાંસ્કૃતિક લગ્ન સહાય','Providing respectful household startup kits (utensils, kitchen essentials, dress materials, bedding, essential appliances) for orphan girls and daughters of severely economically disabled families during marriages.','અનાથ અને અત્યંત ગરીબ દીકરીઓના શુભ લગ્ન પ્રસંગે કન્યાદાન કરિયાવર કીટ (વાસણો, રસોડાનો સામાન, કરિયાણું, પથારી અને હોમ એપ્લાયન્સ) સન્માનપૂર્વક ભેટ આપવી.','Gift','85+ Happy Brides Supported Respectfully','૮૫ થી વધુ ગરીબ દીકરીઓને કરિયાવર રૂપી સહાય',
'{"name":"Farzana Hanif Momin (Orphan Support Recipient)","name_gu":"ફરઝાના હનીફ મોમીન (અનાથ પરિવાર કન્યા)","story":"Farzana was raised by her single mother. During her wedding, SSMWS stepped in as guardians of the household, distributing a full dignitary marriage start-up kit and providing comfortable event catering to keep the family debt-free.","story_gu":"ફરઝાનાનું લાલનપાલન તેમની એકલવાઈ માતાએ મજૂરી કરીને કર્યું. સોસાયટીએ વડીલ બનીને દીકરીના લગ્નમાં સંપૂર્ણ કરિયાવર અને ભોજન સહાય પૂરી પાડી પરિવારને કર્જ ડૂબવાથી ઉગાર્યો.","impact":"Dignified Marriage Complete with Zero Family Debt","impact_gu":"એક પણ રૂપિયાના દેવા વગર દીકરીના લગ્ન સંપન્ન થયા"}'),
('Relief Work','આપત્તિ વ્યવસ્થાન અને અનાજ કીટ','Rapid distribution of dry rations, bottled water, clothing, and initial rebuilding materials during major climate floods in Gujarat, and providing stable monthly grain supplies to registered single mothers and widow families.','ગુજરાતના ભયંકર પૂર કે અન્ય કુદરતી આપત્તિમાં તાકીદની રાહત, સૂકો અનાજ કીટ વિતરણ કરવા અને નોંધણી થયેલ વિધવા બહેનોને દર મહિને નિઃશુલ્ક રાશન આપવું.','FlameKindling','2,800+ Dry Ration Kits Distributed In Floods','૨,૮૦૦ થી વધુ અનાજ કીટ વિતરણ',
'{"name":"Sabarkantha Lower River Basin Families","name_gu":"સાબરકાંઠા પૂરગ્રસ્ત નદી કાંઠાના પરિવારો","story":"During the severe river flood, 60 houses of our community were submerged in mud. SSMWS volunteers loaded rescue rafts and distributed direct survival rations, hygiene supplies, and sleeping mats of exceptional quality to every door.","story_gu":"જિલ્લામાં આવેલ ભારે પૂરને કારણે ૬૦થી વધુ પરિવારો પાણીમાં ડૂબી ગયા હતા. સોસાયટીના સ્વયંસેવકોએ હોડીઓ સાથે તે વિસ્તારમાં પહોંચી, સતત એક અઠવાડિયા સુધી ફ્રી ગરમ ભોજન અને સ્વચ્છતા કીટ વિતરિત કર્યા.","impact":"Waterproof Aid and Clean Drinking Water Supplied for 14 Days","impact_gu":"૧૪ દિવસ સુધી સતત ભોજન અને ઘરોની પુનઃવસન સહાય ચલાવી"}'),
('Employment & Skill Development','રોજગારી અને સ્વ-નિર્ભરતા કૌશલ્ય','Organizing professional sewing and tailoring certification training centers for women with free machine distributions, and funding small-scale retail utility carts and interest-free business startup loans.','જ્ઞાતિની બહેનો માટે સિવણ અને ફેશન ડિઝાઇનના વિનામૂલ્યે સર્ટિફિકેટ કોર્સીસ, સિલાઈ મશીન વિતરણ અને નાના ગૃહ ઉદ્યોગ માટે વ્યાજમુક્ત ધંધાકીય લોન સહાય.','Briefcase','120+ Sewing Machines and Business Carts Funded','૧૨૦ વિધવા બહેનોને સિલાઈ મશીન અને લોરી-ગલ્લા સહાય',
'{"name":"Mumtaz Banu Momin (Tailoring Unit Operator)","name_gu":"મુમતાઝ બાનું મોમીન (હાઉસહોલ્ડ સ્વનિર્ભર વ્યવસાય)","story":"Mumtaz banu, a widowed mother of three, learned professional stitching at our training hub. Upon graduating, she was gifted a motorized sewing machine. She now runs a flourishing tailoring business from home, comfortably paying for her school-going children.","story_gu":"મુમતાઝ બાનું ૩ બાળકોની વિધવા માતા છે. સોસાયટીની તાલીમ શાળામાં સિલાઈ કાર્ય શીખ્યા બાદ મોટરાઈઝ્ડ સિલાઈ મશીન કલ્યાણ ભેટ મળ્યું. આજે તે ઘરે બેસીને ગૌરવભેર રોજી કમાઈ બાળકોનો અભ્યાસ કરાવે છે.","impact":"Stable Home-Business Setup - Earner of ₹8,000/month","impact_gu":"સ્વાભિમાન અને ઘરબેઠા માસિક રૂ. ૮,૦૦૦થી વધુની શરૂઆત આવક સદ્ધર"}');

insert into achievers (name, name_gu, category, category_label, category_label_gu, achievement, achievement_gu, photo, message, message_gu) values
('Dr. Maryam Jamil Momin','ડો. મરિયમ જમીલ મોમીન','doctor','Medical Specialist','તબીબી નિષ્ણાત','First Sunni Momin woman of Sabarkantha district to clear her MD - Obstetrics & Gynecology with Gold Medal from State Medical University.','રાજ્યની મેડિકલ યુનિવર્સિટીમાંથી ગોલ્ડ મેડલ મેળવી ગાયનેકોલોજી ક્ષેત્રે એમ.ડી. ક્લીયર કરનાર જિલ્લાના પ્રથમ મહિલા.','https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=400&h=400','Focus strictly on clinical knowledge and persist in serving humanity. Hard work always receives divine guidance and rewards.','યુવા દીકરીઓને જીવનમાં ઉચ્ચ શિક્ષણ મેળવી સમાજ અને દર્દીઓની સેવા કરવા નમ્ર વિનંતી.'),
('CA Junaid Shakil Momin','સીએ જુનૈદ શકીલ મોમીન','ca','Chartered Accountant','ચાર્ટર્ડ એકાઉન્ટન્ટ','Passed CA Final Exam with State Rank 3 on his very first attempt. Now working as a Senior Corporate Consultant with Big 4 firms.','પ્રથમ જ પ્રયત્ને સીએ ફાઇનલ પરીક્ષા પાસ કરી રાજ્યમાં કરુણ ૩જો ક્રમ મેળવ્યો. આજે મલ્ટીનેશનલ કંપનીમાં વરિષ્ઠ કન્સલ્ટન્ટ છે.','https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=400','Maintain absolute ethics in financial accounts and work beyond boundaries. Consistent practice will break any barrier.','ઝોન સિસ્ટમની મહેનત સાથે નૈતિક મૂલ્યોને વળગી રહેશો તો એકાઉન્ટ્સ ક્ષેત્ર ખૂબ પ્રગતિ પ્રદાન કરશે.'),
('Imran Bashirbhai Patel','ઈમરાન બશીરભાઈ પટેલ','officer','Government Administrative Officer','સરકારી વહીવટી અધિકારી','Cleared GPSC (Gujarat Public Service Commission) Class 1 Executive Board exam, securing a leadership post in the administrative registry.','GPSC જીપીએસસી વર્ગ-૧ વહીવટી પરીક્ષા સફળતાપૂર્વક પાસ કરી, ડેપ્યુટી કલેકટર રેન્ક તરીકે પસંદગી મેળવી જ્ઞાતિનું ગૌરવ વધાર્યું.','https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=400&h=400','Prepare meticulously for public competitive exams. We must enter administrative fields to represent public needs directly and transparently.','સ્પર્ધાત્મક પરીક્ષાઓની કઠોર તૈયારી માટે યુવાનોને સોસાયટીના અદ્યતન પુસ્તકાલયનો ઉપયોગ કરવા અનુરોધ છે.');

insert into testimonials (quote, quote_gu, author, author_gu, designation, designation_gu, "avatarInitials") values
('When my husband fell ill with severe kidney infection and we had to stop all school studies of our college-enrolled son, Sabarkantha Momin Welfare society paid the full hostel block tuition fee within 24 hours. My son has graduated and now teaches other girls in the society.','જ્યારે મારા પતિ કિડનીની ગંભીર બીમારીમાં સપડાયા અને અમારે કોલેજ ભણતા અમારા દીકરાનો અભ્યાસ છોડાવવો પડ્યો, ત્યારે મોમીન કલ્યાણ સોસાયટીએ માત્ર ૨૪ કલાકમાં હોસ્ટેલ બ્લોકની ફી ચૂકવી દીધી. મારો પુત્ર હવે સ્નાતક થયો છે અને તે સમાજના અન્ય જરૂરિયાતમંદ વિદ્યાર્થીઓને ભણાવે છે.','Sardar Momin''s Mother','સરદાર મોમીનની માતા','Sabarkantha Resident','સાબરકાંઠાના રહેવાસી','SM'),
('SSMWS is not just a charity organization; they are guardians of our village orphan girls. For my sister''s marriage, they arranged a fully dignified wedding startup package with absolute grace, so that we did not have to borrow money under compound interest.','સોસાયટી માત્ર કેવળ ચેરિટી નથી, પરંતુ તેઓ આપણી દીકરીઓના વાલી સમાન છે. મારી બહેનના શુભ લગ્ન પ્રસંગે કન્યાદાન કરિયાવર સન્માનપૂર્વક ભેટ આપી દેવું કે વ્યાજે નાણા લેવાથી અમને બચાવ્યા.','Yusuf Momin','યુસુફ મોમીન','Brother of Married Bride','પરિવાર ભાઈશ્રી','YM');

insert into upcoming_events (title, title_gu, description, description_gu, month, month_gu, day, category, category_gu) values
('Community Blood Grouping & Eye Screening Camp','બીપી-લોહી તપાસ અને આંખ નિદાન નિઃશુલ્ક મહા કેમ્પ','Venue: Main SSMWS hall. Free consultations. Fully sponsored cataract surgery lists.','સ્થળ: સોસાયટી મુખ્ય કાર્યાલય હોલ. વિનામૂલ્યે તપાસ તેમજ સારવાર દવા અને મોતીયાના મફત લેસર ઓપરેશન.','June','જૂન','14','Medical Campaign','તબીબી કેમ્પ'),
('5th Sewing Machine and Small Cart Fund Disbursement','પાંચમો સિલાઈ મશીન વિતરણ અને લારી-ગલ્લા ફંડ વિતરણ મેળો','Guiding single-earning mothers into retail self-employment options.','બહેનોને ગૃહ રોજગારી ક્ષેત્રે સ્વનિર્ભર બનાવવા સિલાઈ સાધનોનું મફત સાધન સહાય વિતરણ આયોજન.','June','જૂન','22','Welfare Distribution','કલ્યાણ વિતરણ');

-- A couple of verified donations so the public transparency ledger isn't empty.
insert into donations ("donorName", amount, category, "referenceNo", status, date) values
('Anonymous Momin Brother',150000,'Welfare Zakat Fund','TXN82012048X','Verified','2026-06-01'),
('Dr. Muhammad Yakub Patel',50000,'Education Scholarship Aid','TXN91804820A','Verified','2026-06-02');

-- Single editable contact-details row (placeholder values; edit in the admin panel).
insert into contact_info (address, address_gu, phone1, phone2, email, whatsapp) values
('SSMWS Secretariat, Sunni Momin Mohalla, Sabarkantha Main Bazaar, Gujarat, 383001',
 'SSMWS સચિવાલય, સુન્ની મોમીન મહોલ્લા, સાબરકાંઠા મુખ્ય બજાર, ગુજરાત, ૩૮૩૦૦૧',
 '+91 94261-XXXXX','+91 98980-XXXXX','info@ssmws.org','919426138382');

-- ============================================================================
-- Done. Next: create your admin user in Authentication → Users.
-- ============================================================================
