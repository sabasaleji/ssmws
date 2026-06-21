export type Language = 'en' | 'gu';

export interface Trustee {
  id: string;
  name: string;
  name_gu: string;
  designation: string;
  designation_gu: string;
  photo: string;
  intro: string;
  intro_gu: string;
  region?: string;
  region_gu?: string;
  phone?: string;
  email?: string;
}

export interface WelfareActivityCategory {
  id: string;
  title: string;
  title_gu: string;
  description: string;
  description_gu: string;
  icon: string;
  stats: string;
  stats_gu: string;
  beneficiaryStory: {
    name: string;
    name_gu: string;
    story: string;
    story_gu: string;
    impact: string;
    impact_gu: string;
  };
}

export interface DonationCategory {
  id: string;
  title: string;
  title_gu: string;
  description: string;
  description_gu: string;
}

export interface DonationReport {
  id: string;
  donorName: string;
  amount: number;
  category: string;
  date: string;
  referenceNo: string;
  status: 'Pending' | 'Verified';
}

export interface Announcement {
  id: string;
  title: string;
  title_gu: string;
  content: string;
  content_gu: string;
  category: 'education' | 'medical' | 'event' | 'general';
  date: string;
  important: boolean;
}

export interface Achiever {
  id: string;
  name: string;
  name_gu: string;
  category: 'doctor' | 'engineer' | 'ca' | 'officer' | 'entrepreneur' | 'topper';
  category_label: string;
  category_label_gu: string;
  achievement: string;
  achievement_gu: string;
  phone?: string;
  message: string;
  message_gu: string;
  photo: string;
}

export interface HelpRequest {
  id: string;
  applicantName: string;
  phone: string;
  email: string;
  category: 'education' | 'medical' | 'emergency';
  description: string;
  amountRequested: number;
  fileName?: string;
  fileData?: string; // Base64 simulated storage for client demo completeness
  status: 'Pending' | 'Approved' | 'Rejected';
  statusNotes?: string;
  date: string;
}

export interface MembershipApplication {
  id: string;
  fullName: string;
  fatherHusbandName: string;
  phone: string;
  email: string;
  address: string;
  occupation: string;
  dob: string;
  gender: 'male' | 'female';
  bloodGroup?: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  date: string;
}

export interface VolunteerRegistration {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  skills: string;
  interests: string[];
  date: string;
}

// Confidential matrimonial / rishta registry. Submitted by single community
// members looking to get married. Visible ONLY to the logged-in admin — never
// shown publicly anywhere on the site (enforced by RLS, see schema.sql).
export interface MatrimonialProfile {
  id: string;
  fullName: string;
  gender: 'male' | 'female';
  dob: string;
  maritalStatus: 'single' | 'divorced' | 'widowed';
  education: string;
  occupation: string;
  village: string;
  phone: string;
  guardianName: string;
  guardianPhone: string;
  about: string;
  status: 'New' | 'Reviewed' | 'Matched' | 'Closed';
  date: string;
}

// Community job board. Employers submit openings via a public form; they go
// live immediately (status 'Open') and show the employer's own contact details
// so job-seekers reach out directly. Only the admin can close/delete a posting.
export interface JobOpening {
  id: string;
  jobTitle: string;
  organisation: string;
  description: string;
  salary: string;
  contactPerson: string;
  contactPhone: string;
  status: 'Open' | 'Closed';
  date: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

export interface ContactInfo {
  id: string;
  address: string;
  address_gu: string;
  phone1: string;
  phone2: string;
  email: string;
  whatsapp: string; // digits only, used to build the wa.me link
}

export interface Testimonial {
  id: string;
  quote: string;
  quote_gu: string;
  author: string;
  author_gu: string;
  designation: string;
  designation_gu: string;
  avatarInitials: string;
}

export interface UpcomingEvent {
  id: string;
  title: string;
  title_gu: string;
  description: string;
  description_gu: string;
  month: string;
  month_gu: string;
  day: string;
  category: string;
  category_gu: string;
  venue?: string;
  venue_gu?: string;
}

