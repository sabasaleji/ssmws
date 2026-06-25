import { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from './types';

// Large translations dictionary containing static content for all pages
export const translations = {
  en: {
    // Nav & Common
    societyName: "Sabarkantha Sunni Momin Welfare Society",
    societyAbbr: "SSMWS",
    tagline: "Empowering Lives, Guiding Families, Building Community",
    donateNow: "Donate Now",
    becomeMember: "Become a Member",
    applyHelp: "Apply for Help",
    contactUs: "Contact Us",
    home: "Home",
    aboutUs: "About Us",
    trustees: "Committee",
    activities: "Welfare Activities",
    achievers: "Community Achievers",
    newsAnnouncements: "News & Announcements",
    ourWork: "Our Work",
    getInvolved: "Get Involved",
    adminDashboard: "Admin Dashboard",
    language: "ગુજરાતી (Gujarati)",
    allRightsReserved: "All rights reserved.",
    saving: "Saving...",
    submitting: "Submitting...",
    success: "Success!",
    error: "Error!",
    close: "Close",
    backToHome: "Back to Home",
    viewAll: "View All",

    // Hero Custom
    heroHeading: "Sabarkantha Sunni Momin",
    heroSubheading: "Welfare Society",
    heroTagline: "Serving Sunni Momin community with core islamic values of empathy, integrity, transparency, and education support.",
    statsBeneficiaries: "1,200+ Lives Benefitted",
    statsProjects: "Education & Health Support Programs",

    // Stat counters
    statActiveMembers: "Active Members",
    statWelfareFunds: "Welfare Disbursed",
    statBeneficiariesLabel: "Beneficiary Families",
    statScholarships: "Scholarships Awarded",

    // About Us Page
    aboutHistoryTitle: "Our History",
    aboutHistoryText: "Founded in Sabarkantha district, the Sunni Momin Welfare Society was established with the noble objective of uplifting underprivileged families of the community through collective aid. For over a decade, we have worked towards erasing educational barriers, providing immediate health interventions, and encouraging self-employment to foster economic self-reliance in adherence with Sunni Momin traditions and ideals.",
    aboutVisionTitle: "Our Vision",
    aboutVisionText: "An empowered, self-reliant, and closely-knit Sunni Momin community where high-quality education, healthcare, and dignified livelihoods are accessible to all families, guided by the noble ideals of the Shari'ah and Islamic fraternity.",
    aboutMissionTitle: "Our Mission",
    aboutMissionText: "To design and execute transparent, impactful welfare networks including scholarship funds, interest-free assistance, and emergency relief, while fostering strong community networks, skill development, and honoring academic and professional achievers.",
    aboutRegInfoTitle: "Registration and Legality",
    aboutRegInfoText: "The society is officially registered under the Societies Registration Act, 1860 (Registration No: B-182/Sabarkantha, Registration Date: 1 March 1994). All operations, donations, and ledger reports are subject to rigorous annual audits, maximizing community trust and transparency.",
    aboutTimelineTitle: "Our Milestone Timeline",

    // Trustees
    trusteesTitle: "Managing Committee & Trustees",
    trusteesSubtitle: "Experienced and dedicated leaders steering the society with integrity and standard governing compliance.",
    trusteesPresident: "President",
    trusteesSecretary: "General Secretary",
    trusteesTreasurer: "Treasurer",
    trusteesTrustee: "Trustee / Committee Member",
    trusteesColNo: "Sr.",
    trusteesColName: "Name",
    trusteesColRegion: "Region",
    trusteesCount: "Total Members",

    // Welfare Activities Category names & details
    activityTitle: "Our Welfare Activities",
    activitySubtitle: "Holistic support services for community empowerment and emergency interventions.",
    actEducation: "Education Support",
    actMedical: "Medical Emergencies",
    actMarriage: "Marriage Assistance",
    actRelief: "Relief Work",
    actEmployment: "Employment & Skill Development",
    actImpact: "Impact & Outreach",
    actNarrative: "Beneficiary Story",

    // Donation Section
    donationTitle: "Support Our Mission",
    donationSubtitle: "Your clean Zakat, Sadaqah, and general donations flow transparently into directly audited welfare programs.",
    donationCategoriesTitle: "Donation Categories",
    donationSecureNotice: "Secure Islamic Donation Portal. 100% Transparency Guaranteed.",
    donationBankTitle: "Direct Bank Transfer Details",
    donationBankName: "Bank Name: Bank of India",
    donationAccNo: "Account Number: 240110100001933",
    donationIFSC: "IFSC Code: BKID0002401",
    donationAccName: "Account Name: Sabarkantha Sunni Momin Welfare Society",
    donationUPIQr: "Scan UPI QR Code to Donate",
    donationOnlineForm: "Online Donation Pledge & Verification",
    donationImpactTitle: "Donation Impact Metrics",
    donationReportTitle: "Recent Live Verified Pledges",
    donationReportDisclaimer: "Every amount pledged represents a step towards an independent family.",
    donationReceiptTitle: "Generated Donation Slip",

    // Forms
    formFullName: "Full Name",
    formFatherHusbandName: "Father's / Husband's Name",
    formPhone: "Mobile Phone Number",
    formEmail: "Email Address",
    formDOB: "Date of Birth",
    formGender: "Gender",
    formBloodGroup: "Blood Group (Optional)",
    formAddress: "Full Postal Address",
    formOccupation: "Current Occupation",
    formSkills: "Professional Skills & Core Strengths",
    formInterests: "Volunteer Focus Interests",
    formEmergency: "Emergency Need details",
    formAmountRequested: "Amount Required (INR)",
    formUploadLetter: "Upload Application / Support Document (Letter of Need, Hospital Bills or Fee Receipt)",
    formSubmitApplication: "Submit Completed Form",
    formStatus: "Status",
    formDate: "Submitted Date",

    // Form Dropdown Values
    genderMale: "Male",
    genderFemale: "Female",

    // Help Request Specific
    helpRequestTitle: "Apply for Welfare Assistance",
    helpRequestSubtitle: "If you or a Sunni Momin family you know is in financial crisis, apply here. All records are treated with extreme confidential dignity.",
    helpEduAssistance: "Educational Assistance (Fees/Books)",
    helpMedicalHelp: "Medical Help (Treatment/Medicine)",
    helpEmergencyHelp: "Emergency Aid (Disaster/Sudden Loss)",

    // Membership Page Specific
    membershipTitle: "Join the Welfare Movement",
    membershipSubtitle: "Register as an official member of the welfare society.",
    membTabForm: "Official Registry Form",
    membTypeLabel: "Membership Type",
    membTypeAnnual: "Annual Membership",
    membTypeLifetime: "Lifetime Membership",
    membTypeAnnualPrice: "₹100 / year",
    membTypeLifetimePrice: "₹2,500 one-time",


    // Achievers Page
    achieversTitle: "Sunni Momin Stars & Inspiring Achievers",
    achieversSubtitle: "Celebrating extraordinary academic, professional, and entrepreneurial milestones in our community to motivate our youth.",
    achieversMessage: "Words of Wisdom for our Youth",

    // News & Announcements Page
    newsTitle: "Announcements & Society Bulletins",
    newsSubtitle: "Stay updated with real-time scholarship deadlines, medical camp calendars, and circulars.",
    newsImportant: "IMPORTANT NOTICE",
    newsPostedOn: "Posted on",

    // Contact Page
    contactTitle: "Get in Touch with SSMWS",
    contactSubtitle: "Have questions about projects, donation routing, or audit transparency? Reach out to our central secretariat in Sabarkantha.",
    contactDetails: "Office Coordinates",
    contactSubject: "Subject of Inquiry",
    contactMsg: "Message Text",
    contactOfficeAddress: "Address: AMENA HIGH SCHOOL, Panpur, Savgadh, Gujarat 383002",
    contactDirectNumbers: "Helpline Numbers:",
    contactWhatsAppText: "We are active on WhatsApp for urgent queries. Click below to message our committee directly.",
    contactMapTitle: "Our Physical Location Map",

    // Admin Panel
    adminTitle: "SSMWS Secretariat Access Portal",
    adminSubtitle: "Secure governance interface for authorized Trustees and Committee Members.",
    adminUser: "Admin Username / Email",
    adminPass: "Admin Security PIN / Password",
    adminLogin: "Authenticate Access",
    adminLogout: "Secure Exit",
    adminWelcome: "Welcome to SSMWS Core Panel",
    adminWelfareRequests: "Welfare Applicants",
    adminMemberRegistry: "Member Registries",
    adminAnnouncementsTitle: "Manage Bulletins",
    adminNoApplications: "No registry applications received yet.",
    adminNoRequests: "No emergency help requests logged yet.",
    adminAddAnnouncement: "Add New Announcement",
    adminStatTotalHelp: "Pending Aid Cases",
    adminStatTotalMemb: "Pending Members",
    adminActionApprove: "Approve Application",
    adminActionReject: "Reject / Hold",
    adminSavedNotify: "Dashboard data state synchronized with Local DB storage successfully!",

    // Matrimonial / Rishta Registry (confidential)
    matrimonialNav: "Marriage Registry",
    matrimonialEyebrow: "Confidential Rishta Service",
    matrimonialTitle: "Matrimonial Registry",
    matrimonialSubtitle: "A private service for single members of our community seeking a suitable marriage match. Share your basic details and our committee will help connect compatible families with discretion.",
    matrimonialPrivacyNote: "Your details are strictly private. They are sent ONLY to the welfare society administrator — they are never shown publicly, never listed on this website, and never shared with anyone without your family's consent.",
    matrimonialSuccess: "Thank you. Your details have been sent privately to the administrator. The committee will reach out to you discreetly.",
    matrimonialFormHeading: "Your Basic Details",
    matrimonialMaritalStatus: "Marital Status",
    matrimonialStatusSingle: "Single (Never Married)",
    matrimonialStatusDivorced: "Divorced",
    matrimonialStatusWidowed: "Widowed",
    matrimonialEducation: "Education",
    matrimonialVillage: "Village / Native Place",
    matrimonialSelectVillage: "Select village…",
    matrimonialVillageOther: "Other / Outside Sabarkantha",
    matrimonialVillageOtherLabel: "Please specify your village / city",
    matrimonialGuardianHeading: "Family Contact (Optional)",
    matrimonialGuardianName: "Guardian / Parent Name",
    matrimonialGuardianPhone: "Guardian / Parent Phone",
    matrimonialAbout: "About Yourself & Partner Preference",
    matrimonialAboutPlaceholder: "A few words about your family background and what you are looking for in a partner…",
    matrimonialSubmit: "Submit Privately to Admin",
    matrimonialHowTitle: "How This Works",
    matrimonialHow1: "Only the welfare society admin can see your details — no other visitor, member or staff.",
    matrimonialHow2: "Nothing is published on the website. This is not a public profile listing.",
    matrimonialHow3: "If a suitable match is found, the committee contacts your family respectfully.",
    matrimonialAssureTitle: "Handled With Dignity",
    matrimonialAssureBody: "We treat every matrimonial enquiry with the utmost confidentiality and respect, in keeping with our community values.",

    // Admin — Matrimonial registry
    adminMatrimonialTitle: "Marriage Registry",
    adminMatrimonialSubtitle: "Confidential profiles submitted by single members seeking marriage. Visible to you alone — never shown publicly.",
    adminNoMatrimonials: "No matrimonial entries submitted yet.",

    // Job Board (public community noticeboard)
    jobBoardNav: "Job Board",
    jobBoardEyebrow: "Community Employment Service",
    jobBoardTitle: "Job Board",
    jobBoardSubtitle: "Hiring within the community? Post your opening here and job-seekers will contact you directly. A free service for Sunni Momin families and businesses.",
    jobBoardOpenings: "Current Openings",
    jobBoardEmpty: "No job openings are posted right now. Please check back soon, or post the first one below.",
    jobBoardPostBtn: "Post a Job Opening",
    jobBoardPostClose: "Close Form",
    jobBoardSuccess: "Your job opening is now live on the board. Job-seekers can contact you directly. Thank you!",
    jobBoardDisclaimer: "SSMWS only hosts these listings as a community service and does not verify or endorse any employer. Please make your own enquiries before sharing personal details, accepting work, or making any payment.",
    jobFormHeading: "Job Opening Details",
    jobFormTitle: "Job Title / Role",
    jobFormOrg: "Company / Employer Name",
    jobFormType: "Job Type",
    jobTypeFullTime: "Full Time",
    jobTypePartTime: "Part Time",
    jobTypeContract: "Contract",
    jobTypeTemporary: "Temporary / Daily",
    jobTypeInternship: "Internship / Apprentice",
    jobFormLocation: "Location / Village",
    jobFormSelectLocation: "Select location…",
    jobFormLocationOther: "Other / Outside Sabarkantha",
    jobFormLocationOtherLabel: "Please specify the location / city",
    jobFormDescription: "Job Description & Requirements",
    jobFormDescPlaceholder: "Describe the role, working hours, skills or experience needed, and any other details…",
    jobFormSalary: "Salary / Pay (Optional)",
    jobFormSalaryPlaceholder: "e.g. ₹15,000 / month, or Negotiable",
    jobFormContactPerson: "Contact Person Name",
    jobFormContactPhone: "Contact Phone (WhatsApp)",
    jobFormContactEmail: "Contact Email (Optional)",
    jobFormSubmit: "Publish Job Opening",
    jobCardPostedBy: "Posted by",
    jobCardContact: "Contact the Employer",
    jobCardCall: "Call",
    jobCardWhatsApp: "WhatsApp",
    jobCardEmail: "Email",
    jobCardPostedOn: "Posted on",

    // Admin — Job board
    adminJobBoardTitle: "Job Board Postings",
    adminJobBoardSubtitle: "Openings posted by the community. They go live immediately — close or delete anything spam, fake, or inappropriate.",
    adminNoJobs: "No job openings have been posted yet.",

    // Hero CTA Banner
    heroZakatBadge: "Audit Transparency Guarantee",
    heroZakatTitle: "Direct Zakat and General Donation Desk",
    heroZakatBody: "We pledge to allocate 100% of your Zakat directly to fees of deserving college students, medications of widowed families, and weddings of orphan girls. Check our monthly live lists and obtain receipts instantly.",
    heroDonateCta: "Assemble Donation Packet",
    heroContactCta: "Contact Trustees Directly",

    // Footer
    footerWelfareTrust: "Welfare Trust",
    footerTrusteesCommittee: "Trustees & Committee",
    footerTermsLabel: "Terms & Conditions",
    footerRefundLabel: "Refund Policy",
    footerPrivacyLabel: "Privacy Policy",
    footerGetInvolved: "Get Involved",
    footerAnnouncements: "Latest Announcements",
    footerContactOffice: "Contact Office",
    footerAdminAccess: "Secretariat Admin Access",
    footerZakatAudit: "Zakat & Public Audited",

    // Donation Page
    donationPageTitle: "Direct Donation Desk",
    donationPolicyTitle: "Donation Policy",
    donationPolicyLine1: "Donations are voluntary and non-refundable.",
    donationPolicyLine2: "Donations are used for society welfare activities and audited welfare programs.",
    donationPolicyLine3: "Official name: Sabarkantha Sunni Momin Welfare Society.",
    donationPolicyLine4: "Registration No: B-182/Sabarkantha, dated 1 March 1994.",
    donationBankTransfer: "Bank Transfer",
    donationUpiScan: "UPI Scan Code",
    donationAccHolder: "A/C Holder:",
    donationAccNumber: "Account Number",
    donationIfscCode: "IFSC Code",

    // Mock Board Exam (annual education activity)
    mockBoardNav: "Mock Board Exam",
    mockBoardEyebrow: "Annual Welfare Activity",
    mockBoardTitleLead: "Mock Board",
    mockBoardTitleAccent: "Examination",
    mockBoardSubtitle: "A free annual preparation drive that puts our community's 10th-grade students through a full rehearsal of the SSC board examination — real paper, real hall, real timing — so the actual exam holds no surprises.",
    mockBoardAboutTitle: "About the Programme",
    mockBoardAboutP1: "Every year, just before the SSC (10th standard) board examinations, the Sabarkantha Sunni Momin Welfare Society organises a full Mock Board Exam for the students of our community. The mock exam is held at Ashish Vidhyalay, where students sit a complete, exam-style test under the very same conditions they will face on the real board exam day.",
    mockBoardAboutP2: "The idea is simple: by the time the real board exam arrives, every student has already lived through the experience once. They know how to manage the clock, how to handle the question paper, and how to walk into the examination hall with confidence instead of fear.",
    mockBoardFactWhoLabel: "Who Can Attend",
    mockBoardFactWhoValue: "Community students appearing for the 10th-grade (SSC) board exam",
    mockBoardFactWhenLabel: "When",
    mockBoardFactWhenValue: "Every year, a few weeks before the board exams",
    mockBoardFactWhereLabel: "Venue",
    mockBoardFactWhereValue: "Ashish Vidhyalay, Sabarkantha",
    mockBoardFactFeeLabel: "Fee",
    mockBoardFactFeeValue: "Completely free for the community",
    mockBoardWhyTitle: "Why We Do It",
    mockBoardWhy1: "Removes exam fear — students face the pressure once in a safe setting, well before the real day.",
    mockBoardWhy2: "Builds time management — practising the full paper within the official board time limit.",
    mockBoardWhy4: "Real exam-hall experience — answer sheets, seating, and invigilation just like the actual board.",
    mockBoardWhy5: "Confidence on the real day — familiarity turns nervous students into prepared ones.",
    mockBoardHowTitle: "How It Works",
    mockBoardStep1Title: "Registration",
    mockBoardStep1Desc: "Students from the community enrol through the welfare society before the mock exam dates are announced.",
    mockBoardStep2Title: "Exam Day at Ashish Vidhyalay",
    mockBoardStep2Desc: "Students appear for a full-length paper at Ashish Vidhyalay under real board-exam conditions, seating, and timing.",
    mockBoardStep3Title: "Evaluation & Feedback",
    mockBoardStep3Desc: "Answer sheets are checked and each student receives feedback on where they stand and what to improve."
  },
  gu: {
    // Nav & Common
    societyName: "સાબરકાંઠા સુન્ની મોમીન વેલ્ફેર સોસાયટી",
    societyAbbr: "SSMWS",
    tagline: "જીવન સશક્તિકરણ, પરિવારોને માર્ગદર્શન, જ્ઞાતિ વિકાસ",
    donateNow: "દાન કરો",
    becomeMember: "સભ્ય બનો",
    applyHelp: "મદદ માટે અરજી કરો",
    contactUs: "સંપર્ક કરો",
    home: "મુખ્ય પૃષ્ઠ",
    aboutUs: "અમારા વિશે",
    trustees: "સમિતિના સભ્યો",
    activities: "કલ્યાણકારી પ્રવૃત્તિઓ",
    achievers: "જ્ઞાતિ ગૌરવ",
    newsAnnouncements: "સમાચાર અને જાહેરાતો",
    ourWork: "અમારું કાર્ય",
    getInvolved: "જોડાઓ",
    adminDashboard: "એડમિન ડેશબોર્ડ",
    language: "English (અંગ્રેજી)",
    allRightsReserved: "બધા હકો સુરક્ષિત છે.",
    saving: "સાચવી રહ્યું છે...",
    submitting: "મોકલી રહ્યું છે...",
    success: "સફળતા!",
    error: "ભૂલ!",
    close: "બંધ કરો",
    backToHome: "પાછા મુખ્ય પૃષ્ઠ પર",
    viewAll: "બધા જુઓ",

    // Hero Custom
    heroHeading: "સાબરકાંઠા સુન્ની મોમીન",
    heroSubheading: "વેલ્ફેર સોસાયટી",
    heroTagline: "શિક્ષણ સહાય, મેડિકલ સહાય અને પારદર્શિતાના આધારે સુન્ની મોમીન સમાજની સેવા કરવા માટે કટિબદ્ધ.",
    statsBeneficiaries: "૧,૨૦૦+ પરિવારોને લાભ મળ્યો",
    statsProjects: "શિક્ષણ અને સ્વાસ્થ્ય સહાય કાર્યક્રમો",

    // Stat counters
    statActiveMembers: "સક્રિય સભ્યો",
    statWelfareFunds: "કુલ કલ્યાણ સહાય વિતરણ",
    statBeneficiariesLabel: "લાભાર્થી પરિવારો",
    statScholarships: "એનાયત થયેલ શિષ્યવૃત્તિ",

    // About Us Page
    aboutHistoryTitle: "આપણો ઇતિહાસ",
    aboutHistoryText: "સાબરકાંઠા જિલ્લામાં સ્થાપિત, સુન્ની મોમીન વેલ્ફેર સોસાયટીની સ્થાપના જ્ઞાતિના નબળા પરિવારોને સામૂહિક રીતે મદદ કરી ઉપર લાવવાના ઉમદા ઉદ્દેશ્યથી કરવામાં આવી હતી. એક દાયકાથી વધુ સમયથી, અમે શૈક્ષણિક અવરોધો દૂર કરવા, તાત્કાલિક આરોગ્ય સહાય પૂરી પાડવા અને આર્થિક સ્વનિર્ભરતા મેળવવા સ્વ-રોજગારને પ્રોત્સાહિત કરવા માટે સુન્ની મોમીન પરંપરાઓ અને આદર્શોને અનુલક્ષીને કામ કર્યું છે.",
    aboutVisionTitle: "અમારો દ્રષ્ટિકોણ",
    aboutVisionText: "એક સશક્ત, આત્મનિર્ભર અને નજીકથી જોડાયેલ સુન્ની મોમીન સમાજ જ્યાં ઉચ્ચ ગુણવત્તાવાળું શિક્ષણ, આરોગ્ય અને સન્માનજનક આજીવિકા દરેક પરિવારો માટે સુલભ હોય, જે શરીઅત અને ઇસ્લામિક બંધુત્વના આદર્શો દ્વારા માર્ગદર્શિત હોય.",
    aboutMissionTitle: "અમારું લક્ષ્ય",
    aboutMissionText: "શિષ્યવૃત્તિ ભંડોળ, વ્યાજમુક્ત સહાય અને કટોકટીમાં રાહત સહિતની પારદર્શક, અસરકારક સેવા વ્યવસ્થા તૈયાર કરવી, સાથે જ સંગઠન મજબૂત કરીને કૌશલ્ય વિકાસ સાધવો અને તેજસ્વી તારલાઓનું સન્માન કરવું.",
    aboutRegInfoTitle: "ノાંઘણી અને કાયદાકીય વિગત",
    aboutRegInfoText: "સોસાયટી સત્તાવાર રીતે સોસાયટીઝ રજીસ્ટ્રેશન એક્ટ, ૧૮૬૦ (રજીસ્ટ્રેશન નંબર: B-182/Sabarkantha, નોંધણી તારીખ: 1 March 1994) હેઠળ નોંધાયેલી છે. તમામ પ્રવૃત્તિઓ, દાન અને ખાતાઓનું વાર્ષિક ઓડિટ કરવામાં આવે છે, જેથી અતુટ જ્ઞાતિ વિશ્વાસ અને પારદર્શિતા જળવાય.",
    aboutTimelineTitle: "અમારી સીમાચિહ્નરૂપ સિદ્ધિઓ",

    // Trustees
    trusteesTitle: "વહીવટી સમિતિ અને ટ્રસ્ટીઓ",
    trusteesSubtitle: "ઈમાનદારી અને વહીવટી સ્ટાન્ડર્ડ અનુસાર સમાજનું માર્ગદર્શન કરતા સમર્પિત આગેવાનો.",
    trusteesPresident: "પ્રમુખ",
    trusteesSecretary: "જનરલ સેક્રેટરી",
    trusteesTreasurer: "ખજાનચી",
    trusteesTrustee: "ટ્રસ્ટી / સમિતિના સભ્ય",
    trusteesColNo: "અ.નં.",
    trusteesColName: "નામ",
    trusteesColRegion: "ગામ / વિસ્તાર",
    trusteesCount: "કુલ સભ્યો",

    // Welfare Activities Category names
    activityTitle: "કલ્યાણકારી પ્રવૃત્તિઓ",
    activitySubtitle: "જ્ઞાતિ ઉત્કર્ષ અને કટોકટી વ્યવસ્થાપન માટેની સર્વાંગી સેવાઓ.",
    actEducation: "શિક્ષણ સહાય (Scholarships)",
    actMedical: "તબીબી સહાય (દવા-સારવાર)",
    actMarriage: "લગ્ન પ્રસંગે કન્યાદાન સહાય",
    actRelief: "આપત્તિ રાહત કાર્ય",
    actEmployment: "રોજગાર અને કૌશલ્ય વિકાસ",
    actImpact: "લાભ અને જનસંપર્ક",
    actNarrative: "લાભાર્થીની આપવીતી",

    // Donation Section
    donationTitle: "સેવા યજ્ઞમાં સહભાગી બનો",
    donationSubtitle: "તમારા સ્વચ્છ ઝકાત, સદકા અને સામાન્ય દાન સીધા ઓડિટ થયેલા કલ્યાણ કાર્યક્રમોમાં પારદર્શક રીતે ઉપયોગમાં લેવામાં આવે છે.",
    donationCategoriesTitle: "દાનના શ્રેણીઓ",
    donationSecureNotice: "સુરક્ષિત ઇસ્લામિક દાન પોર્ટલ. ૧૦૦% પારદર્શિતાની ખાતરી.",
    donationBankTitle: "સીધા બેંક ખાતામાં ટ્રાન્સફરની વિગત",
    donationBankName: "બેંકનું નામ: બેંક ઓફ ઇન્ડિયા",
    donationAccNo: "ખાતા નંબર: 240110100001933",
    donationIFSC: "IFSC કોડ: BKID0002401",
    donationAccName: "ખાતા ધારકનું નામ: સાબરકાંઠા સુન્ની મોમીન વેલ્ફેર સોસાયટી",
    donationUPIQr: "દાન આપવા માટે QR કોડ સ્કેન કરો",
    donationOnlineForm: "ઓનલાઈન દાનની પ્રતિજ્ઞા અને વેરિફિકેશન",
    donationImpactTitle: "દાન દ્વારા પરિવર્તનના આંકડા",
    donationReportTitle: "તાજેતરમાં મેળવેલ દાનની વિગતો",
    donationReportDisclaimer: "દરેક સહાયની રકમ એક ગરીબ પરિવારને સ્વનિર્ભરતા તરફ દોરી જાય છે.",
    donationReceiptTitle: "પ્રાપ્ત દાનની પહોંચ",

    // Forms
    formFullName: "પૂરું નામ",
    formFatherHusbandName: "પિતા અથવા પતિનું નામ",
    formPhone: "મોબાઈલ નંબર",
    formEmail: "ઇમેઇલ સરનામું",
    formDOB: "જન્મ તારીખ",
    formGender: "લિંગ",
    formBloodGroup: "બ્લડ ગ્રુપ (વૈકલ્પિક)",
    formAddress: "સરનામું",
    formOccupation: "વ્યવસાય/વાંધો",
    formSkills: "વ્યાવસાયિક કૌશલ્યો / આવડત",
    formInterests: "સ્વયંસેવક તરીકે રસ ધરાવતા ક્ષેત્ર",
    formEmergency: "કટોકટીની જરૂરિયાત વિગત",
    formAmountRequested: "જરૂરી રકમ (રૂપિયામાં)",
    formUploadLetter: "અરજી પત્રક / સહાય પુરાવો અપલોડ કરો (જરૂરિયાત પત્ર, હોસ્પિટલ બિલ અથવા ફી પહોંચ)",
    formSubmitApplication: "સંપૂર્ણ અરજી સબમિટ કરો",
    formStatus: "અરજી સ્થિતિ",
    formDate: "સબમિટ કર્યા તારીખ",

    // Form Dropdown Values
    genderMale: "પુરુષ",
    genderFemale: "સ્ત્રી",

    // Help Request Specific
    helpRequestTitle: "કલ્યાણ સહાય મેળવવા માટે અરજી",
    helpRequestSubtitle: "જો તમે અથવા તમારા ધ્યાનમાં કોઈ સુન્ની મોમીન પરિવાર નાણાકીય કટોકટીમાં હોય તો અરજી કરો. તમામ વિગતો સંપૂર્ણ ગોપનીય રાખવામાં આવશે.",
    helpEduAssistance: "શૈક્ષણિક સહાય (ફી/પુસ્તકો)",
    helpMedicalHelp: "તબીબી ઓપરેશન/દવાઈ સહાય",
    helpEmergencyHelp: "કટોકટી આપદા સહાય (અકસ્માત/અચાનક નુકસાન)",

    // Membership Page Specific
    membershipTitle: "સોસાયટી સભ્યપદ ઝુંબેશ",
    membershipSubtitle: "કલ્યાણ સોસાયટીના અધિકૃત સભ્ય તરીકે નોંધણી કરાવો.",
    membTabForm: "સભ્યપદ ફોર્મ",
    membTypeLabel: "સભ્યપદનો પ્રકાર",
    membTypeAnnual: "વાર્ષિક સભ્યપદ",
    membTypeLifetime: "આજીવન સભ્યપદ",
    membTypeAnnualPrice: "₹૧૦૦ / વર્ષ",
    membTypeLifetimePrice: "₹૨,૫૦૦ એક વખત",


    // Achievers Page
    achieversTitle: "તેજસ્વી સિતારા અને જ્ઞાતિ ગૌરવ",
    achieversSubtitle: "યુવાનોને પ્રેરણા આપવા માટે સન્માનનીય ડોકટરો, એન્જિનિયરો, સીએ અને ઉદ્યોગપતિઓની પ્રેરણાદાયી સિદ્ધિઓ.",
    achieversMessage: "યુવાનો માટે પ્રેરણાદાયી અમૃત સંદેશ",

    // News & Announcements Page
    newsTitle: "સમાચાર પત્રિકા અને સત્તાવાર જાહેરાતો",
    newsSubtitle: "શિષ્યવૃત્તિ ફોર્મ મોકલવાની છેલ્લી તારીખ, ફ્રી હોસ્પિટલ કેમ્પ વગેરે માટે નિયમિત મુલાકાત લો.",
    newsImportant: "અતિ મહત્વની સૂચના",
    newsPostedOn: "પ્રકાશિત તારીખ",

    // Contact Page
    contactTitle: "સોસાયટી કાર્યાલયનો સંપર્ક કરો",
    contactSubtitle: "યોજનાઓ, દાન વિતરણ અથવા સરકારી યોજનાઓના માર્ગદર્શન માટે સાબરકાંઠા કેન્દ્રીય સચિવાલયનો સંપર્ક કરો.",
    contactDetails: "કાર્યાલય વિગત",
    contactSubject: "પૂછપરછનો વિષય",
    contactMsg: "પૂછપરછ સંદેશ",
    contactOfficeAddress: "સરનામું: AMENA HIGH SCHOOL, Panpur, Savgadh, Gujarat 383002",
    contactDirectNumbers: "હેલ્પલાઇન નંબર:",
    contactWhatsAppText: "તાકીદની જરૂરિયાત માટે સીધા વોટ્સએપ પર ક્લિક કરી હોદ્દેદારોનો સંપર્ક કરી શકો છો.",
    contactMapTitle: "અમારું ભૌગોલિક લોકેશન મેપ",

    // Admin Panel
    adminTitle: "SSMWS ગવર્નન્સ સચિવાલય પોર્ટલ",
    adminSubtitle: "ટ્રસ્ટીઓ અને સમિતિના સભ્યો માટે વહીવટી નિયંત્રણ પેનલ.",
    adminUser: "એડમિન ઇમેઇલ / યુઝરનેમ",
    adminPass: "એડમિન સુરક્ષા પિન / પાસવર્ડ",
    adminLogin: "નિયંત્રણ પેનલમાં લોગ ઇન કરો",
    adminLogout: "સુરક્ષિત બહાર નીકળો",
    adminWelcome: "SSMWS ગવર્નન્સ સિસ્ટમ માં આપનું હાર્દિક સ્વાગત છે",
    adminWelfareRequests: "કલ્યાણ સહાયની મેળવેલ અરજીઓ",
    adminMemberRegistry: "સભ્યપદ મેળવેલ અરજીઓ",
    adminAnnouncementsTitle: "સમાચાર બુલેટિન સંચાલન",
    adminNoApplications: "હજુ સુધી કોઈ સભ્યપદ ફોર્મ અરજી પ્રાપ્ત થઈ નથી.",
    adminNoRequests: "હજુ સુધી કોઈ કટોકટી રાહત અરજી પ્રાપ્ત થઈ નથી.",
    adminAddAnnouncement: "નવી જાહેરાત ઉમેરો",
    adminStatTotalHelp: "બાકી રહેલ મદદ અરજી",
    adminStatTotalMemb: "બાકી રહેલ સભ્યપદ અરજી",
    adminActionApprove: "મંજૂર સરહદ",
    adminActionReject: "અસ્વીકાર / હોલ્ડ",
    adminSavedNotify: "ડેશબોર્ડ ડેટા અને વહીવટી ફેરફારો સ્થાનિક ડેટાબેઝ સોસાયટી રેકોર્ડ સાથે સફળતાપૂર્વક અપડેટ થયા!",

    // Matrimonial / Rishta Registry (confidential)
    matrimonialNav: "લગ્ન નોંધણી",
    matrimonialEyebrow: "ગોપનીય રિશ્તા સેવા",
    matrimonialTitle: "લગ્ન વિષયક નોંધણી",
    matrimonialSubtitle: "આપણા સમાજના કુંવારા ભાઈ-બહેનો માટે યોગ્ય જીવનસાથી શોધવાની એક ખાનગી સેવા. તમારી પ્રાથમિક વિગતો આપો અને અમારી સમિતિ ગોપનીયતા સાથે યોગ્ય પરિવારોને જોડવામાં મદદ કરશે.",
    matrimonialPrivacyNote: "તમારી વિગતો સંપૂર્ણ ખાનગી છે. તે ફક્ત વેલ્ફેર સોસાયટીના સંચાલક (એડમિન) ને જ મોકલવામાં આવે છે — તે ક્યારેય જાહેરમાં બતાવાતી નથી, આ વેબસાઈટ પર ક્યારેય દર્શાવાતી નથી, અને તમારા પરિવારની સંમતિ વિના કોઈની સાથે શેર કરાતી નથી.",
    matrimonialSuccess: "આભાર. તમારી વિગતો ખાનગી રીતે સંચાલકને મોકલાઈ ગઈ છે. સમિતિ તમારો ગોપનીય રીતે સંપર્ક કરશે.",
    matrimonialFormHeading: "તમારી પ્રાથમિક વિગતો",
    matrimonialMaritalStatus: "વૈવાહિક સ્થિતિ",
    matrimonialStatusSingle: "કુંવારા (અપરિણીત)",
    matrimonialStatusDivorced: "છૂટાછેડા લીધેલ",
    matrimonialStatusWidowed: "વિધવા / વિધુર",
    matrimonialEducation: "અભ્યાસ",
    matrimonialVillage: "ગામ / વતન",
    matrimonialSelectVillage: "ગામ પસંદ કરો…",
    matrimonialVillageOther: "અન્ય / સાબરકાંઠા બહાર",
    matrimonialVillageOtherLabel: "કૃપા કરી તમારું ગામ / શહેર જણાવો",
    matrimonialGuardianHeading: "પરિવાર સંપર્ક (વૈકલ્પિક)",
    matrimonialGuardianName: "વાલી / માતા-પિતાનું નામ",
    matrimonialGuardianPhone: "વાલી / માતા-પિતાનો ફોન",
    matrimonialAbout: "તમારા વિશે અને જીવનસાથી પસંદગી",
    matrimonialAboutPlaceholder: "તમારા પરિવાર વિશે અને જીવનસાથીમાં તમે શું શોધો છો તે વિશે થોડા શબ્દો…",
    matrimonialSubmit: "ખાનગી રીતે એડમિનને મોકલો",
    matrimonialHowTitle: "આ કેવી રીતે કાર્ય કરે છે",
    matrimonialHow1: "ફક્ત વેલ્ફેર સોસાયટીના એડમિન જ તમારી વિગતો જોઈ શકે છે — બીજો કોઈ મુલાકાતી, સભ્ય કે સ્ટાફ નહીં.",
    matrimonialHow2: "વેબસાઈટ પર કંઈ પ્રકાશિત થતું નથી. આ કોઈ જાહેર પ્રોફાઇલ યાદી નથી.",
    matrimonialHow3: "જો યોગ્ય સંબંધ મળે, તો સમિતિ આદરપૂર્વક તમારા પરિવારનો સંપર્ક કરે છે.",
    matrimonialAssureTitle: "સન્માન સાથે વ્યવહાર",
    matrimonialAssureBody: "અમે દરેક લગ્ન વિષયક પૂછપરછને આપણા સામાજિક મૂલ્યો અનુસાર સંપૂર્ણ ગોપનીયતા અને આદર સાથે સંભાળીએ છીએ.",

    // Admin — Matrimonial registry
    adminMatrimonialTitle: "લગ્ન નોંધણી",
    adminMatrimonialSubtitle: "જીવનસાથી શોધતા કુંવારા સભ્યો દ્વારા સબમિટ થયેલ ગોપનીય વિગતો. ફક્ત તમે જ જોઈ શકો — ક્યારેય જાહેરમાં દર્શાવાતી નથી.",
    adminNoMatrimonials: "હજુ સુધી કોઈ લગ્ન વિષયક વિગત પ્રાપ્ત થઈ નથી.",

    // Job Board (જાહેર રોજગાર નોટિસબોર્ડ)
    jobBoardNav: "રોજગાર બોર્ડ",
    jobBoardEyebrow: "જ્ઞાતિ રોજગાર સેવા",
    jobBoardTitle: "રોજગાર બોર્ડ",
    jobBoardSubtitle: "જ્ઞાતિમાં કોઈને નોકરી પર રાખવા છે? તમારી જગ્યાની જાહેરાત અહીં મૂકો અને નોકરી શોધનારા તમારો સીધો સંપર્ક કરશે. સુન્ની મોમીન પરિવારો અને વેપારીઓ માટે નિઃશુલ્ક સેવા.",
    jobBoardOpenings: "હાલની ખાલી જગ્યાઓ",
    jobBoardEmpty: "અત્યારે કોઈ નોકરીની જાહેરાત નથી. કૃપા કરી થોડા સમય પછી જુઓ, અથવા નીચે પ્રથમ જાહેરાત મૂકો.",
    jobBoardPostBtn: "નોકરીની જાહેરાત મૂકો",
    jobBoardPostClose: "ફોર્મ બંધ કરો",
    jobBoardSuccess: "તમારી નોકરીની જાહેરાત હવે બોર્ડ પર લાઈવ છે. નોકરી શોધનારા તમારો સીધો સંપર્ક કરી શકશે. આભાર!",
    jobBoardDisclaimer: "SSMWS આ જાહેરાતો માત્ર સામાજિક સેવા તરીકે દર્શાવે છે અને કોઈ પણ માલિકની ખાતરી કે ભલામણ કરતું નથી. અંગત વિગતો આપતા પહેલાં, કામ સ્વીકારતા પહેલાં કે કોઈ ચૂકવણી કરતા પહેલાં કૃપા કરી જાતે તપાસ કરો.",
    jobFormHeading: "નોકરીની વિગતો",
    jobFormTitle: "નોકરી / કામનું નામ",
    jobFormOrg: "કંપની / માલિકનું નામ",
    jobFormType: "નોકરીનો પ્રકાર",
    jobTypeFullTime: "પૂર્ણ સમય",
    jobTypePartTime: "અંશકાલીન",
    jobTypeContract: "કોન્ટ્રાક્ટ",
    jobTypeTemporary: "કામચલાઉ / દૈનિક",
    jobTypeInternship: "ઈન્ટર્નશિપ / શિખાઉ",
    jobFormLocation: "સ્થળ / ગામ",
    jobFormSelectLocation: "સ્થળ પસંદ કરો…",
    jobFormLocationOther: "અન્ય / સાબરકાંઠા બહાર",
    jobFormLocationOtherLabel: "કૃપા કરી સ્થળ / શહેર જણાવો",
    jobFormDescription: "કામની વિગત અને જરૂરિયાતો",
    jobFormDescPlaceholder: "કામ, કામના કલાકો, જરૂરી આવડત કે અનુભવ અને બીજી વિગતો જણાવો…",
    jobFormSalary: "પગાર / મહેનતાણું (વૈકલ્પિક)",
    jobFormSalaryPlaceholder: "દા.ત. ₹૧૫,૦૦૦ / મહિને, અથવા વાટાઘાટ યોગ્ય",
    jobFormContactPerson: "સંપર્ક વ્યક્તિનું નામ",
    jobFormContactPhone: "સંપર્ક ફોન (વોટ્સએપ)",
    jobFormContactEmail: "સંપર્ક ઈમેઇલ (વૈકલ્પિક)",
    jobFormSubmit: "નોકરીની જાહેરાત પ્રકાશિત કરો",
    jobCardPostedBy: "જાહેરાત મૂકનાર",
    jobCardContact: "માલિકનો સંપર્ક કરો",
    jobCardCall: "કૉલ કરો",
    jobCardWhatsApp: "વોટ્સએપ",
    jobCardEmail: "ઈમેઇલ",
    jobCardPostedOn: "તારીખ",

    // Admin — Job board
    adminJobBoardTitle: "રોજગાર બોર્ડ જાહેરાતો",
    adminJobBoardSubtitle: "જ્ઞાતિ દ્વારા મૂકાયેલ ખાલી જગ્યાઓ. તે તરત જ લાઈવ થાય છે — સ્પામ, ખોટી કે અયોગ્ય જાહેરાત બંધ કરો અથવા કાઢી નાખો.",
    adminNoJobs: "હજુ સુધી કોઈ નોકરીની જાહેરાત મૂકાઈ નથી.",

    // Hero CTA Banner
    heroZakatBadge: "ઓડિટ પારદર્શિતાની ગેરંટી",
    heroZakatTitle: "તમારી પાકી ઝકાત અહિયાં મોકલી શકો છો",
    heroZakatBody: "અમે પ્રતિજ્ઞા લઈએ છીએ કે તમારી ૧૦૦% ઝકાત સીધી લાયક વિદ્યાર્થીઓની ફી, વિધવા પરિવારોની દવા અને અનાથ દીકરીઓના લગ્ન માટે ઉપયોગ થાય. અમારી માસિક જીવંત યાદી જૂઓ અને ત્વરિત પહોંચ મેળવો.",
    heroDonateCta: "દાન પેકેટ ભેગો કરો",
    heroContactCta: "ટ્રસ્ટીઓ સાથે સીધો સંપર્ક",

    // Footer
    footerWelfareTrust: "વેલ્ફેર ટ્રસ્ટ",
    footerTrusteesCommittee: "ટ્રસ્ટીઓ અને સમિતિ",
    footerTermsLabel: "નિયમો અને શરતો",
    footerRefundLabel: "રિફંડ નીતિ",
    footerPrivacyLabel: "ગોપનીયતા નીતિ",
    footerGetInvolved: "જોડાઓ",
    footerAnnouncements: "તાજેતરની જાહેરાતો",
    footerContactOffice: "કાર્યાલય સંપર્ક",
    footerAdminAccess: "સચિવ એડમિન સ્વીકૃત",
    footerZakatAudit: "ઝકાત અને જાહેર ઓડિટ",

    // Donation Page
    donationPageTitle: "સીધો દાન ડેસ્ક",
    donationPolicyTitle: "દાન નીતિ",
    donationPolicyLine1: "દાન સ્વૈચ્છિક છે અને પરત કરવામાં આવતું નથી.",
    donationPolicyLine2: "દાન સોસાયટીની કલ્યાણ પ્રવૃત્તિઓ અને ઓડિટ થયેલ કાર્યક્રમો માટે ઉપયોગ થાય છે.",
    donationPolicyLine3: "અધિકૃત નામ: સાબરકાંઠા સુન્ની મોમીન વેલ્ફેર સોસાયટી.",
    donationPolicyLine4: "નોંધણી નં: B-182/Sabarkantha, તારીખ 1 March 1994.",
    donationBankTransfer: "બેંક ટ્રાન્સફર",
    donationUpiScan: "UPI સ્કેન કોડ",
    donationAccHolder: "ખાતા ધારક:",
    donationAccNumber: "ખાતા નંબર",
    donationIfscCode: "IFSC કોડ",

    // Mock Board Exam (વાર્ષિક શૈક્ષણિક પ્રવૃત્તિ)
    mockBoardNav: "મોક બોર્ડ પરીક્ષા",
    mockBoardEyebrow: "વાર્ષિક કલ્યાણ પ્રવૃત્તિ",
    mockBoardTitleLead: "મોક બોર્ડ",
    mockBoardTitleAccent: "પરીક્ષા",
    mockBoardSubtitle: "આપણા સમાજના ધોરણ ૧૦ ના વિદ્યાર્થીઓ માટે દર વર્ષે યોજાતી નિઃશુલ્ક તૈયારી ઝુંબેશ — અસલી પ્રશ્નપત્ર, અસલી પરીક્ષા હોલ અને અસલી સમય સાથે એસએસસી બોર્ડ પરીક્ષાનું સંપૂર્ણ રિહર્સલ, જેથી ખરી પરીક્ષામાં કોઈ ડર ન રહે.",
    mockBoardAboutTitle: "કાર્યક્રમ વિશે",
    mockBoardAboutP1: "દર વર્ષે, એસએસસી (ધોરણ ૧૦) બોર્ડ પરીક્ષાની બરાબર પહેલાં, સાબરકાંઠા સુન્ની મોમીન વેલ્ફેર સોસાયટી આપણા સમાજના વિદ્યાર્થીઓ માટે સંપૂર્ણ મોક બોર્ડ પરીક્ષાનું આયોજન કરે છે. આ મોક પરીક્ષા Ashish Vidhyalay ખાતે યોજાય છે, જ્યાં વિદ્યાર્થીઓ ખરી બોર્ડ પરીક્ષાના દિવસ જેવી જ પરિસ્થિતિમાં સંપૂર્ણ પરીક્ષા આપે છે.",
    mockBoardAboutP2: "ઉદ્દેશ સ્પષ્ટ છે: ખરી બોર્ડ પરીક્ષા આવે ત્યાં સુધીમાં દરેક વિદ્યાર્થી આ અનુભવ એક વાર જીવી ચૂક્યો હોય. તેઓ સમયનું વ્યવસ્થાપન, પ્રશ્નપત્ર કેવી રીતે હાથ ધરવું અને ડરને બદલે આત્મવિશ્વાસ સાથે પરીક્ષા હોલમાં કેવી રીતે પ્રવેશવું તે જાણતા હોય.",
    mockBoardFactWhoLabel: "કોણ ભાગ લઈ શકે",
    mockBoardFactWhoValue: "ધોરણ ૧૦ (એસએસસી) બોર્ડ પરીક્ષા આપનાર સમાજના વિદ્યાર્થીઓ",
    mockBoardFactWhenLabel: "ક્યારે",
    mockBoardFactWhenValue: "દર વર્ષે, બોર્ડ પરીક્ષાના થોડા અઠવાડિયા પહેલાં",
    mockBoardFactWhereLabel: "સ્થળ",
    mockBoardFactWhereValue: "Ashish Vidhyalay, સાબરકાંઠા",
    mockBoardFactFeeLabel: "ફી",
    mockBoardFactFeeValue: "સમાજ માટે સંપૂર્ણ નિઃશુલ્ક",
    mockBoardWhyTitle: "અમે આ શા માટે કરીએ છીએ",
    mockBoardWhy1: "પરીક્ષાનો ડર દૂર કરે — વિદ્યાર્થીઓ ખરા દિવસ ઘણા પહેલાં સુરક્ષિત વાતાવરણમાં એક વાર દબાણનો સામનો કરે.",
    mockBoardWhy2: "સમય વ્યવસ્થાપન કેળવે — અધિકૃત બોર્ડ સમય મર્યાદામાં સંપૂર્ણ પ્રશ્નપત્ર ઉકેલવાની પ્રેક્ટિસ.",
    mockBoardWhy4: "અસલી પરીક્ષા હોલનો અનુભવ — ઉત્તરવહી, બેઠક અને નિરીક્ષણ ખરા બોર્ડ જેવી જ રીતે.",
    mockBoardWhy5: "ખરા દિવસે આત્મવિશ્વાસ — પરિચિતતા ગભરાયેલા વિદ્યાર્થીને તૈયાર વિદ્યાર્થી બનાવે.",
    mockBoardHowTitle: "આ કેવી રીતે ચાલે છે",
    mockBoardStep1Title: "નોંધણી",
    mockBoardStep1Desc: "મોક પરીક્ષાની તારીખ જાહેર થાય તે પહેલાં સમાજના વિદ્યાર્થીઓ વેલ્ફેર સોસાયટી મારફતે નોંધણી કરાવે છે.",
    mockBoardStep2Title: "Ashish Vidhyalay ખાતે પરીક્ષાનો દિવસ",
    mockBoardStep2Desc: "વિદ્યાર્થીઓ Ashish Vidhyalay ખાતે અસલી બોર્ડ પરીક્ષાની પરિસ્થિતિ, બેઠક અને સમય સાથે સંપૂર્ણ પ્રશ્નપત્ર આપે છે.",
    mockBoardStep3Title: "મૂલ્યાંકન અને માર્ગદર્શન",
    mockBoardStep3Desc: "ઉત્તરવહીઓ તપાસવામાં આવે છે અને દરેક વિદ્યાર્થીને તેઓ ક્યાં ઊભા છે અને શું સુધારવું તે અંગે માર્ગદર્શન મળે છે."
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['en']) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('ssmws_lang');
    return (saved === 'en' || saved === 'gu') ? saved : 'gu';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('ssmws_lang', lang);
  };

  const t = (key: keyof typeof translations['en']): string => {
    const dict = translations[language] || translations['en'];
    return (dict[key] || translations['en'][key] || key) as string;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
