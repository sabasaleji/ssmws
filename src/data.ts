import { Trustee, WelfareActivityCategory, Achiever, Announcement, Testimonial, UpcomingEvent } from './types';

export const trusteesData: Trustee[] = [
  {
    id: '1',
    name: 'Dr. Muhammad Yakub Patel',
    name_gu: 'ડો. મોહમ્મદ યાકુબ પટેલ',
    designation: 'President & Chief Trustee',
    designation_gu: 'પ્રમુખ અને મુખ્ય ટ્રસ્ટી',
    photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400&h=400',
    intro: 'Senior General Physician with 25 years of public healthcare experience. Directs the medical help division and leads state-wide healthcare campaigns.',
    intro_gu: '૨૫ વર્ષનો જાહેર આરોગ્ય ક્ષેત્રે બહોળો અનુભવ ધરાવતા સિનિયર જનરલ ફિઝિશિયન. સોસાયટીના મેડિકલ કેમ્પ અને રાહત યોજનાઓનું માર્ગદર્શન કરે છે.',
    email: 'president@ssmws.org',
    phone: '+91 94261-XXXXX'
  },
  {
    id: '2',
    name: 'Haji Shafiulla G. Momin',
    name_gu: 'હાજી શફીઉલ્લા જી. મોમીન',
    designation: 'General Secretary',
    designation_gu: 'જનરલ સેક્રેટરી',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400',
    intro: 'Eminent Civil Engineer and Architect. Volunteers in supervising technical training programs, infrastructure project mapping, and government compliance filings.',
    intro_gu: 'જાણીતા સિવિલ એન્જિનિયર અને આર્કિટેક્ટ. સોસાયટીના કૌશલ્ય તાલીમ કેન્દ્રો, તમામ બાંધકામ સહાય અને કાયદાકીય સરકારી પ્રોટોકોલનું સંચાલન કરે છે.',
    email: 'secretary@ssmws.org',
    phone: '+91 98980-XXXXX'
  },
  {
    id: '3',
    name: 'Mustak Ahmed Momin',
    name_gu: 'મુશ્તાક અહેમદ મોમીન',
    designation: 'Treasurer & Auditor',
    designation_gu: 'ખજાનચી અને ઓડિટર',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400',
    intro: 'Fellow Chartered Accountant (FCA). Manages the strict, transparent allocation of Zakat, Sadaqah, and ensures zero-error public ledger auditing.',
    intro_gu: 'ફેલો ચાર્ટર્ડ એકાઉન્ટન્ટ (FCA). ઝકાત અને જનરલ કલ્યાણ ફંડના સંપૂર્ણ હિસાબ રાખે છે અને વાર્ષિક ઓડિટ પારદર્શિતા જાળવે છે.',
    email: 'finance@ssmws.org',
    phone: '+91 94270-XXXXX'
  },
  {
    id: '4',
    name: 'Prof. Fatima S. Momin',
    name_gu: 'પ્રો. ફાતિમા એસ. મોમીન',
    designation: 'Education Committee Head',
    designation_gu: 'શિક્ષણ સમિતિના વડા',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400',
    intro: 'Senior educator and university lecturer. Spearheads girls education initiatives, book bank coordination, and competitive exam counselling boards.',
    intro_gu: 'સિનિયર લેક્ચરર અને શિક્ષણશાસ્ત્રી. કન્યા કેળવણી પ્રોત્સાહન યોજના, બુક બેંક તેમજ કારકિર્દી માર્ગદર્શન સેમિનારનું નેતૃત્વ કરે છે.',
    email: 'education@ssmws.org'
  },
  {
    id: '5',
    name: 'Haji Salman Faruk Momin',
    name_gu: 'હાજી સલમાન ફારૂક મોમીન',
    designation: 'Relief Work Coordinator',
    designation_gu: 'રાહત કાર્ય સંયોજક',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400',
    intro: 'Passionate youth leader and organic farming industrialist. Supervised relief cargo logistics during Gujarat monsoons, and manages dry ration drives.',
    intro_gu: 'ઉત્સાહી યુવા અગ્રણી અને જમીન વિકાસ ઉદ્યોગપતિ. ગુજરાત પૂર રાહત કટોકટી અને ગરીબ વિધવા પરિવારો માટે અનાજ કીટ વિતરણનું પ્રત્યક્ષ સંચાલન કરે છે.'
  }
];

export const activitiesData: WelfareActivityCategory[] = [
  {
    id: 'education',
    title: 'Education Support',
    title_gu: 'શિક્ષણ સહાય અને શિષ્યવૃત્તિ',
    description: 'Providing full or partial college tuition scholarships for professional degrees (MBBS, BTech, CA, BCA), distributing syllabus schoolbooks, and managing free after-hours girls boarding and coaching classes.',
    description_gu: 'વ્યાવસાયિક ડિગ્રીઓ (MBBS, BTech, CA, BCA) માટે ટ્યુશન ફી સ્કોલરશીપ આપવી, જરૂરિયાતમંદ વિદ્યાર્થીઓને નિઃશુલ્ક પુસ્તકો વિતરણ અને કન્યાઓ માટે ખાસ કોચિંગ વર્ગો ચલાવવા.',
    icon: 'GraduationCap',
    stats: '450+ Scholar Grants Distributed',
    stats_gu: '૪૫૦ થી વધુ વિદ્યાર્થી શિષ્યવૃત્તિ વિતારિત',
    beneficiaryStory: {
      name: 'Amina Momin (M.B.B.S Scholar)',
      name_gu: 'આમીના મોમીન (M.B.B.S સ્કોલર)',
      story: 'Amina lost her father during high school and could not afford high medical fees. SSMWS sponsored her entire medical education fees. She is now completing her medical residency and is volunteering weekly to give free medical consults to local families.',
      story_gu: 'હાઇસ્કૂલમાં રહીને જ આમીનાએ તેમના પિતા ગુમાવ્યા, માટે મેડિકલ કોલેજની ફી ભરવી અશક્ય હતી. સોસાયટીએ દર વર્ષે તેમની કોલેજ ફી સ્પોન્સર કરી. આજે આમીના રેસિડેન્ટ ડોક્ટર છે અને વતનના વરિષ્ઠ લોકોને ફ્રી કન્સલ્ટેશન સેવા આપી ઋણ અદા કરે છે.',
      impact: '100% Sponsor Outflow - Now a Practicing Doctor',
      impact_gu: '૧૦૦% શૈક્ષણિક સ્પોન્સરશીપ - આજે સફળતાપૂર્વક ડોકટરી સેવા આપે છે'
    }
  },
  {
    id: 'medical',
    title: 'Medical Help',
    title_gu: 'તબીબી રાહત',
    description: 'Direct financing of complex cardiovascular and oncological surgeries for economically weaker sections, managing prescription supply circles for chronically ill patients, and running free blood grouping camps.',
    description_gu: 'ગંભીર બીમારીઓ જેમ કે હ્રદયરોગ, કેન્સર ઓપરેશનો માટે ડાયરેક્ટ હોસ્પિટલ પેમેન્ટ, વિધવાઓ અને વરિષ્ઠો માટે નિયમિત દવા પૂરી પાડવી અને હેલ્થ કેમ્પ આયોજન કરવું.',
    icon: 'HeartHandshake',
    stats: '₹24 Lakhs Disbursed for Urgent Surgeries',
    stats_gu: 'રૂ. ૨૪ લાખથી વધુ ગંભીર શસ્ત્રક્રિયાઓમાં સહાય',
    beneficiaryStory: {
      name: 'Razak Yusuf Momin (Open Heart Surgery Candidate)',
      name_gu: 'રઝાક યુસુફ મોમીન (ઓપન હાર્ટ સર્જરી લાભાર્થી)',
      story: 'Razak was an autorickshaw driver when he suffered a major cardiac event requiring immediate bypass surgery. SSMWS coordinated with the hospital directly to deposit development funds within 2 hours, saving his life.',
      story_gu: 'રઝાક રીક્ષા ડ્રાઈવર છે, જેમને અચાનક ગંભીર હ્રદયરોગનો હુમલો આવ્યો. સોસાયટીએ યુદ્ધના ધોરણે માત્ર ૨ કલાકની અંદર હોસ્પિટલ પ્રશાસન સાથે સીધા ખાતામાં જરૂરી ભંડોળ જમા કરી તેમનો જીવ બચાવી લીધો.',
      impact: 'Emergency Fund Transfer in 2 Hours - Fully Recovered',
      impact_gu: 'માત્ર ૨ કલાકમાં કટોકટી ભંડોળ ટ્રાન્સફર - અત્યારે સ્વાસ્થ્ય સુખાકારી'
    }
  },
  {
    id: 'marriage',
    title: 'Marriage Assistance',
    title_gu: 'કન્યાદાન અને સાંસ્કૃતિક લગ્ન સહાય',
    description: 'Providing respectful household startup kits (utensils, kitchen essentials, dress materials, bedding, essential appliances) for orphan girls and daughters of severely economically disabled families during marriages.',
    description_gu: 'અનાથ અને અત્યંત ગરીબ દીકરીઓના શુભ લગ્ન પ્રસંગે કન્યાદાન કરિયાવર કીટ (વાસણો, રસોડાનો સામાન, કરિયાણું, પથારી અને હોમ એપ્લાયન્સ) સન્માનપૂર્વક ભેટ આપવી.',
    icon: 'Gift',
    stats: '85+ Happy Brides Supported Respectfully',
    stats_gu: '૮૫ થી વધુ ગરીબ દીકરીઓને કરિયાવર રૂપી સહાય',
    beneficiaryStory: {
      name: 'Farzana Hanif Momin (Orphan Support Recipient)',
      name_gu: 'ફરઝાના હનીફ મોમીન (અનાથ પરિવાર કન્યા)',
      story: "Farzana was raised by her single mother. During her wedding, SSMWS stepped in as guardians of the household, distributing a full dignitary marriage start-up kit and providing comfortable event catering to keep the family debt-free.",
      story_gu: 'ફરઝાનાનું લાલનપાલન તેમની એકલવાઈ માતાએ મજૂરી કરીને કર્યું. સોસાયટીએ વડીલ બનીને દીકરીના લગ્નમાં સંપૂર્ણ કરિયાવર અને ભોજન સહાય પૂરી પાડી પરિવારને કર્જ ડૂબવાથી ઉગાર્યો.',
      impact: 'Dignified Marriage Complete with Zero Family Debt',
      impact_gu: 'એક પણ રૂપિયાના દેવા વગર દીકરીના લગ્ન સંપન્ન થયા'
    }
  },
  {
    id: 'relief',
    title: 'Relief Work',
    title_gu: 'આપત્તિ વ્યવસ્થાન અને અનાજ કીટ',
    description: 'Rapid distribution of dry rations, bottled water, clothing, and initial rebuilding materials during major climate floods in Gujarat, and providing stable monthly grain supplies to registered single mothers and widow families.',
    description_gu: 'ગુજરાતના ભયંકર પૂર કે અન્ય કુદરતી આપત્તિમાં તાકીદની રાહત, સૂકો અનાજ કીટ વિતરણ કરવા અને નોંધણી થયેલ વિધવા બહેનોને દર મહિને નિઃશુલ્ક રાશન આપવું.',
    icon: 'FlameKindling',
    stats: '2,800+ Dry Ration Kits Distributed In Floods',
    stats_gu: '૨,૮૦૦ થી વધુ અનાજ કીટ વિતરણ',
    beneficiaryStory: {
      name: 'Sabarkantha Lower River Basin Families',
      name_gu: 'સાબરકાંઠા પૂરગ્રસ્ત નદી કાંઠાના પરિવારો',
      story: 'During the severe river flood, 60 houses of our community were submerged in mud. SSMWS volunteers loaded rescue rafts and distributed direct survival rations, hygiene supplies, and sleeping mats of exceptional quality to every door.',
      story_gu: 'જિલ્લામાં આવેલ ભારે પૂરને કારણે ૬૦થી વધુ પરિવારો પાણીમાં ડૂબી ગયા હતા. સોસાયટીના સ્વયંસેવકોએ હોડીઓ સાથે તે વિસ્તારમાં પહોંચી, સતત એક અઠવાડિયા સુધી ફ્રી ગરમ ભોજન અને સ્વચ્છતા કીટ વિતરિત કર્યા.',
      impact: 'Waterproof Aid and Clean Drinking Water Supplied for 14 Days',
      impact_gu: '૧૪ દિવસ સુધી સતત ભોજન અને ઘરોની પુનઃવસન સહાય ચલાવી'
    }
  },
  {
    id: 'employment',
    title: 'Employment & Skill Development',
    title_gu: 'રોજગારી અને સ્વ-નિર્ભરતા કૌશલ્ય',
    description: 'Organizing professional sewing and tailoring certification training centers for women with free machine distributions, and funding small-scale retail utility carts and interest-free business startup loans.',
    description_gu: 'જ્ઞાતિની બહેનો માટે સિવણ અને ફેશન ડિઝાઇનના વિનામૂલ્યે સર્ટિફિકેટ કોર્સીસ, સિલાઈ મશીન વિતરણ અને નાના ગૃહ ઉદ્યોગ માટે વ્યાજમુક્ત ધંધાકીય લોન સહાય.',
    icon: 'Briefcase',
    stats: '120+ Sewing Machines and Business Carts Funded',
    stats_gu: '૧૨૦ વિધવા બહેનોને સિલાઈ મશીન અને લોરી-ગલ્લા સહાય',
    beneficiaryStory: {
      name: 'Mumtaz Banu Momin (Tailoring Unit Operator)',
      name_gu: 'મુમતાઝ બાનું મોમીન (હાઉસહોલ્ડ સ્વનિર્ભર વ્યવસાય)',
      story: 'Mumtaz banu, a widowed mother of three, learned professional stitching at our training hub. Upon graduating, she was gifted a motorized sewing machine. She now runs a flourishing tailoring business from home, comfortably paying for her school-going children.',
      story_gu: 'મુમતાઝ બાનું ૩ બાળકોની વિધવા માતા છે. સોસાયટીની તાલીમ શાળામાં સિલાઈ કાર્ય શીખ્યા બાદ મોટરાઈઝ્ડ સિલાઈ મશીન કલ્યાણ ભેટ મળ્યું. આજે તે ઘરે બેસીને ગૌરવભેર રોજી કમાઈ બાળકોનો અભ્યાસ કરાવે છે.',
      impact: 'Stable Home-Business Setup - Earner of ₹8,000/month',
      impact_gu: 'સ્વાભિમાન અને ઘરબેઠા માસિક રૂ. ૮,૦૦૦થી વધુની શરૂઆત આવક સદ્ધર'
    }
  }
];

export const achieversData: Achiever[] = [
  {
    id: '1',
    name: 'Dr. Maryam Jamil Momin',
    name_gu: 'ડો. મરિયમ જમીલ મોમીન',
    category: 'doctor',
    category_label: 'Medical Specialist',
    category_label_gu: 'તબીબી નિષ્ણાત',
    achievement: 'First Sunni Momin woman of Sabarkantha district to clear her MD - Obstetrics & Gynecology with Gold Medal from State Medical University.',
    achievement_gu: 'રાજ્યની મેડિકલ યુનિવર્સિટીમાંથી ગોલ્ડ મેડલ મેળવી ગાયનેકોલોજી ક્ષેત્રે એમ.ડી. ક્લીયર કરનાર જિલ્લાના પ્રથમ મહિલા.',
    photo: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=400&h=400',
    message: 'Focus strictly on clinical knowledge and persist in serving humanity. Hard work always receives divine guidance and rewards.',
    message_gu: 'યુવા દીકરીઓને જીવનમાં ઉચ્ચ શિક્ષણ મેળવી સમાજ અને દર્દીઓની સેવા કરવા નમ્ર વિનંતી.'
  },
  {
    id: '2',
    name: 'CA Junaid Shakil Momin',
    name_gu: 'સીએ જુનૈદ શકીલ મોમીન',
    category: 'ca',
    category_label: 'Chartered Accountant',
    category_label_gu: 'ચાર્ટર્ડ એકાઉન્ટન્ટ',
    achievement: 'Passed CA Final Exam with State Rank 3 on his very first attempt. Now working as a Senior Corporate Consultant with Big 4 firms.',
    achievement_gu: 'પ્રથમ જ પ્રયત્ને સીએ ફાઇનલ પરીક્ષા પાસ કરી રાજ્યમાં કરુણ ૩જો ક્રમ મેળવ્યો. આજે મલ્ટીનેશનલ કંપનીમાં વરિષ્ઠ કન્સલ્ટન્ટ છે.',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=400',
    message: 'Maintain absolute ethics in financial accounts and work beyond boundaries. Consistent practice will break any barrier.',
    message_gu: 'ઝોન સિસ્ટમની મહેનત સાથે નૈતિક મૂલ્યોને વળગી રહેશો તો એકાઉન્ટ્સ ક્ષેત્ર ખૂબ પ્રગતિ પ્રદાન કરશે.'
  },
  {
    id: '3',
    name: 'Imran Bashirbhai Patel',
    name_gu: 'ઈમરાન બશીરભાઈ પટેલ',
    category: 'officer',
    category_label: 'Government Administrative Officer',
    category_label_gu: 'સરકારી વહીવટી અધિકારી',
    achievement: 'Cleared GPSC (Gujarat Public Service Commission) Class 1 Executive Board exam, securing a leadership post in the administrative registry.',
    achievement_gu: 'GPSC જીપીએસસી વર્ગ-૧ વહીવટી પરીક્ષા સફળતાપૂર્વક પાસ કરી, ડેપ્યુટી કલેકટર રેન્ક તરીકે પસંદગી મેળવી જ્ઞાતિનું ગૌરવ વધાર્યું.',
    photo: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=400&h=400',
    message: 'Prepare meticulously for public competitive exams. We must enter administrative fields to represent public needs directly and transparently.',
    message_gu: 'સ્પર્ધાત્મક પરીક્ષાઓની કઠોર તૈયારી માટે યુવાનોને સોસાયટીના અદ્યતન પુસ્તકાલયનો ઉપયોગ કરવા અનુરોધ છે.'
  }
];

export const initialAnnouncements: Announcement[] = [];

export const initialTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    quote: 'When my husband fell ill with severe kidney infection and we had to stop all school studies of our college-enrolled son, Sabarkantha Momin Welfare society paid the full hostel block tuition fee within 24 hours. My son has graduated and now teaches other girls in the society.',
    quote_gu: 'જ્યારે મારા પતિ કિડનીની ગંભીર બીમારીમાં સપડાયા અને અમારે કોલેજ ભણતા અમારા દીકરાનો અભ્યાસ છોડાવવો પડ્યો, ત્યારે મોમીન કલ્યાણ સોસાયટીએ માત્ર ૨૪ કલાકમાં હોસ્ટેલ બ્લોકની ફી ચૂકવી દીધી. મારો પુત્ર હવે સ્નાતક થયો છે અને તે સમાજના અન્ય જરૂરિયાતમંદ વિદ્યાર્થીઓને ભણાવે છે.',
    author: "Sardar Momin's Mother",
    author_gu: 'સરદાર મોમીનની માતા',
    designation: 'Sabarkantha Resident',
    designation_gu: 'સાબરકાંઠાના રહેવાસી',
    avatarInitials: 'SM'
  },
  {
    id: 'test-2',
    quote: "SSMWS is not just a charity organization; they are guardians of our village orphan girls. For my sister's marriage, they arranged a fully dignified wedding startup package with absolute grace, so that we did not have to borrow money under compound interest.",
    quote_gu: 'સોસાયટી માત્ર કેવળ ચેરિટી નથી, પરંતુ તેઓ આપણી દીકરીઓના વાલી સમાન છે. મારી બહેનના શુભ લગ્ન પ્રસંગે કન્યાદાન કરિયાવર સન્માનપૂર્વક ભેટ આપી દેવું કે વ્યાજે નાણા લેવાથી અમને બચાવ્યા.',
    author: 'Yusuf Momin',
    author_gu: 'યુસુફ મોમીન',
    designation: 'Brother of Married Bride',
    designation_gu: 'પરિવાર ભાઈશ્રી',
    avatarInitials: 'YM'
  }
];

export const initialUpcomingEvents: UpcomingEvent[] = [
  {
    id: 'evt-1',
    title: 'Community Blood Grouping & Eye Screening Camp',
    title_gu: 'બીપી-લોહી તપાસ અને આંખ નિદાન નિઃશુલ્ક મહા કેમ્પ',
    description: 'Venue: Main SSMWS hall. Free consultations. Fully sponsored cataract surgery lists.',
    description_gu: 'સ્થળ: સોસાયટી મુખ્ય કાર્યાલય હોલ. વિનામૂલ્યે તપાસ તેમજ સારવાર દવા અને મોતીયાના મફત લેસર ઓપરેશન.',
    month: 'June',
    month_gu: 'જૂન',
    day: '14',
    category: 'Medical Campaign',
    category_gu: 'તબીબી કેમ્પ'
  },
  {
    id: 'evt-2',
    title: '5th Sewing Machine and Small Cart Fund Disbursement',
    title_gu: 'પાંચમો સિલાઈ મશીન વિતરણ અને લારી-ગલ્લા ફંડ વિતરણ મેળો',
    description: 'Guiding single-earning mothers into retail self-employment options.',
    description_gu: 'બહેનોને ગૃહ રોજગારી ક્ષેત્રે સ્વનિર્ભર બનાવવા સિલાઈ સાધનોનું મફત સાધન સહાય વિતરણ આયોજન.',
    month: 'June',
    month_gu: 'જૂન',
    day: '22',
    category: 'Welfare Distribution',
    category_gu: 'કલ્યાણ વિતરણ'
  }
];
