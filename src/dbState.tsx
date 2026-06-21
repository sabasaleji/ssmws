import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode, Dispatch, SetStateAction } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';
import {
  Announcement, HelpRequest,
  MembershipApplication, VolunteerRegistration,
  ContactSubmission, DonationReport, Trustee,
  WelfareActivityCategory, Achiever, Testimonial, UpcomingEvent,
  ContactInfo, MatrimonialProfile, JobOpening
} from './types';

interface StoreContextType {
  // ---- Auth ----
  session: Session | null;
  authReady: boolean;
  signIn: (email: string, password: string) => Promise<string | null>; // returns error message or null
  signOut: () => Promise<void>;

  // ---- Data ----
  loading: boolean;
  refreshAll: () => Promise<void>;
  resetDatabase: () => Promise<void>; // kept for compatibility; just re-pulls from DB

  announcements: Announcement[];
  addAnnouncement: (ann: Omit<Announcement, 'id' | 'date'>) => Promise<void>;
  updateAnnouncement: (id: string, ann: Partial<Announcement>) => Promise<void>;
  deleteAnnouncement: (id: string) => Promise<void>;

  helpRequests: HelpRequest[];
  addHelpRequest: (req: Omit<HelpRequest, 'id' | 'date' | 'status'>) => Promise<void>;
  updateHelpRequestStatus: (id: string, status: 'Pending' | 'Approved' | 'Rejected', notes?: string) => Promise<void>;

  memberships: MembershipApplication[];
  addMembership: (memb: Omit<MembershipApplication, 'id' | 'date' | 'status'>) => Promise<void>;
  updateMembershipStatus: (id: string, status: 'Pending' | 'Approved' | 'Rejected') => Promise<void>;

  volunteers: VolunteerRegistration[];
  addVolunteer: (vol: Omit<VolunteerRegistration, 'id' | 'date'>) => Promise<void>;
  updateVolunteer: (id: string, vol: Partial<VolunteerRegistration>) => Promise<void>;
  deleteVolunteer: (id: string) => Promise<void>;

  contactSubmissions: ContactSubmission[];
  addContact: (contact: Omit<ContactSubmission, 'id' | 'date'>) => Promise<void>;

  // Confidential matrimonial registry — admin-only read (enforced by RLS).
  matrimonials: MatrimonialProfile[];
  addMatrimonial: (profile: Omit<MatrimonialProfile, 'id' | 'date' | 'status'>) => Promise<void>;
  updateMatrimonialStatus: (id: string, status: MatrimonialProfile['status']) => Promise<void>;
  deleteMatrimonial: (id: string) => Promise<void>;

  // Public job board — anyone may post (goes live immediately), admin moderates.
  jobOpenings: JobOpening[];
  addJobOpening: (job: Omit<JobOpening, 'id' | 'date' | 'status'>) => Promise<void>;
  updateJobOpeningStatus: (id: string, status: JobOpening['status']) => Promise<void>;
  deleteJobOpening: (id: string) => Promise<void>;

  // Single-row editable public contact details.
  contactInfo: ContactInfo | null;
  updateContactInfo: (patch: Partial<ContactInfo>) => Promise<void>;

  donations: DonationReport[];
  addDonation: (donation: Omit<DonationReport, 'id' | 'status' | 'date'>) => Promise<DonationReport | null>;
  verifyDonation: (id: string) => Promise<void>;

  trustees: Trustee[];
  addTrustee: (t: Omit<Trustee, 'id'>) => Promise<void>;
  updateTrustee: (id: string, t: Partial<Trustee>) => Promise<void>;
  deleteTrustee: (id: string) => Promise<void>;

  activities: WelfareActivityCategory[];
  updateActivity: (id: string, act: Partial<WelfareActivityCategory>) => Promise<void>;

  achievers: Achiever[];
  addAchiever: (ach: Omit<Achiever, 'id'>) => Promise<void>;
  updateAchiever: (id: string, ach: Partial<Achiever>) => Promise<void>;
  deleteAchiever: (id: string) => Promise<void>;

  testimonials: Testimonial[];
  addTestimonial: (test: Omit<Testimonial, 'id'>) => Promise<void>;
  updateTestimonial: (id: string, test: Partial<Testimonial>) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;

  upcomingEvents: UpcomingEvent[];
  addUpcomingEvent: (evt: Omit<UpcomingEvent, 'id'>) => Promise<void>;
  updateUpcomingEvent: (id: string, evt: Partial<UpcomingEvent>) => Promise<void>;
  deleteUpcomingEvent: (id: string) => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// ----------------------------------------------------------------------------
// Generic Supabase helpers. Columns are named to match the TS fields exactly,
// so rows returned by Supabase ARE our typed objects — no mapping required.
// ----------------------------------------------------------------------------
type Setter<T> = Dispatch<SetStateAction<T[]>>;

function reportError(action: string, message: string) {
  console.error(`[SSMWS] ${action} failed:`, message);
  alert(`${action} failed: ${message}`);
}

async function dbInsert<T extends { id: string }>(
  table: string, payload: Record<string, unknown>, setState: Setter<T>, prepend: boolean
): Promise<T | null> {
  const { data, error } = await supabase.from(table).insert(payload).select().single();
  if (error || !data) { reportError(`Saving to ${table}`, error?.message ?? 'unknown error'); return null; }
  const row = data as T;
  setState(prev => (prepend ? [row, ...prev] : [...prev, row]));
  return row;
}

async function dbUpdate<T extends { id: string }>(
  table: string, id: string, patch: Record<string, unknown>, setState: Setter<T>
): Promise<void> {
  const { data, error } = await supabase.from(table).update(patch).eq('id', id).select().single();
  if (error || !data) { reportError(`Updating ${table}`, error?.message ?? 'unknown error'); return; }
  const row = data as T;
  setState(prev => prev.map(r => (r.id === id ? row : r)));
}

async function dbDelete<T extends { id: string }>(
  table: string, id: string, setState: Setter<T>
): Promise<void> {
  const { error } = await supabase.from(table).delete().eq('id', id);
  if (error) { reportError(`Deleting from ${table}`, error.message); return; }
  setState(prev => prev.filter(r => r.id !== id));
}

export function StoreProvider({ children }: { children: ReactNode }) {
  // ---- Auth state ----
  const [session, setSession] = useState<Session | null>(null);
  const [authReady, setAuthReady] = useState(false);

  // ---- Data state ----
  const [loading, setLoading] = useState(true);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [helpRequests, setHelpRequests] = useState<HelpRequest[]>([]);
  const [memberships, setMemberships] = useState<MembershipApplication[]>([]);
  const [volunteers, setVolunteers] = useState<VolunteerRegistration[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [matrimonials, setMatrimonials] = useState<MatrimonialProfile[]>([]);
  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [donations, setDonations] = useState<DonationReport[]>([]);
  const [trustees, setTrustees] = useState<Trustee[]>([]);
  const [activities, setActivities] = useState<WelfareActivityCategory[]>([]);
  const [achievers, setAchievers] = useState<Achiever[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);

  // ---- Track the Supabase auth session ----
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  // ---- Load all data. Re-runs when auth changes so an admin who logs in
  //      immediately gets read access to the protected submission tables. ----
  const refreshAll = async () => {
    setLoading(true);
    const asc = { ascending: true };
    const desc = { ascending: false };
    const [
      annR, helpR, membR, volR, conR, matR, donR, jobR,
      truR, actR, achR, testR, evtR, ciR
    ] = await Promise.all([
      supabase.from('announcements').select('*').order('date', desc),
      supabase.from('help_requests').select('*').order('createdAt', desc),
      supabase.from('memberships').select('*').order('createdAt', desc),
      supabase.from('volunteers').select('*').order('createdAt', desc),
      supabase.from('contacts').select('*').order('createdAt', desc),
      supabase.from('matrimonials').select('*').order('createdAt', desc),
      supabase.from('donations').select('*').order('date', desc),
      supabase.from('job_openings').select('*').order('createdAt', desc),
      supabase.from('trustees').select('*').order('createdAt', asc),
      supabase.from('activities').select('*').order('createdAt', asc),
      supabase.from('achievers').select('*').order('createdAt', asc),
      supabase.from('testimonials').select('*').order('createdAt', asc),
      supabase.from('upcoming_events').select('*').order('createdAt', asc),
      supabase.from('contact_info').select('*').order('createdAt', asc).limit(1),
    ]);

    if (annR.data) setAnnouncements(annR.data as Announcement[]);
    if (helpR.data) setHelpRequests(helpR.data as HelpRequest[]);
    if (membR.data) setMemberships(membR.data as MembershipApplication[]);
    if (volR.data) setVolunteers(volR.data as VolunteerRegistration[]);
    if (conR.data) setContactSubmissions(conR.data as ContactSubmission[]);
    if (matR.data) setMatrimonials(matR.data as MatrimonialProfile[]);
    if (donR.data) setDonations(donR.data as DonationReport[]);
    if (jobR.data) setJobOpenings(jobR.data as JobOpening[]);
    if (truR.data) setTrustees(truR.data as Trustee[]);
    if (actR.data) setActivities(actR.data as WelfareActivityCategory[]);
    if (achR.data) setAchievers(achR.data as Achiever[]);
    if (testR.data) setTestimonials(testR.data as Testimonial[]);
    if (evtR.data) setUpcomingEvents(evtR.data as UpcomingEvent[]);
    if (ciR.data && ciR.data.length) setContactInfo(ciR.data[0] as ContactInfo);
    setLoading(false);
  };

  useEffect(() => {
    if (authReady) refreshAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authReady, session?.user?.id]);

  // ---- Auth actions ----
  const signIn = async (email: string, password: string): Promise<string | null> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return error ? error.message : null;
  };
  const signOut = async () => { await supabase.auth.signOut(); };

  // ---- Announcements ----
  const addAnnouncement = (ann: Omit<Announcement, 'id' | 'date'>) =>
    dbInsert<Announcement>('announcements', ann, setAnnouncements, true).then(() => {});
  const updateAnnouncement = (id: string, p: Partial<Announcement>) =>
    dbUpdate<Announcement>('announcements', id, stripId(p), setAnnouncements);
  const deleteAnnouncement = (id: string) =>
    dbDelete<Announcement>('announcements', id, setAnnouncements);

  // ---- Help requests ----
  const addHelpRequest = (req: Omit<HelpRequest, 'id' | 'date' | 'status'>) =>
    dbInsert<HelpRequest>('help_requests', req, setHelpRequests, true).then(() => {});
  const updateHelpRequestStatus = (id: string, status: 'Pending' | 'Approved' | 'Rejected', notes?: string) =>
    dbUpdate<HelpRequest>('help_requests', id, notes !== undefined ? { status, statusNotes: notes } : { status }, setHelpRequests);

  // ---- Memberships ----
  const addMembership = (memb: Omit<MembershipApplication, 'id' | 'date' | 'status'>) =>
    dbInsert<MembershipApplication>('memberships', memb, setMemberships, true).then(() => {});
  const updateMembershipStatus = (id: string, status: 'Pending' | 'Approved' | 'Rejected') =>
    dbUpdate<MembershipApplication>('memberships', id, { status }, setMemberships);

  // ---- Volunteers ----
  const addVolunteer = (vol: Omit<VolunteerRegistration, 'id' | 'date'>) =>
    dbInsert<VolunteerRegistration>('volunteers', vol, setVolunteers, true).then(() => {});
  const updateVolunteer = (id: string, p: Partial<VolunteerRegistration>) =>
    dbUpdate<VolunteerRegistration>('volunteers', id, stripId(p), setVolunteers);
  const deleteVolunteer = (id: string) =>
    dbDelete<VolunteerRegistration>('volunteers', id, setVolunteers);

  // ---- Contacts ----
  const addContact = (contact: Omit<ContactSubmission, 'id' | 'date'>) =>
    dbInsert<ContactSubmission>('contacts', contact, setContactSubmissions, true).then(() => {});

  // ---- Matrimonial registry (public submits, admin-only reads) ----
  // Anyone may insert; the row only surfaces in the admin's list because RLS
  // forbids non-admins from selecting this table. We deliberately do NOT
  // `.select()` the row back — a public (anon) submitter can't read it under
  // RLS, and asking for it would surface a spurious error. The admin sees the
  // new profile on their next data load (their session can read the table).
  const addMatrimonial = async (profile: Omit<MatrimonialProfile, 'id' | 'date' | 'status'>) => {
    const { error } = await supabase.from('matrimonials').insert(profile);
    if (error) { reportError('Submitting your details', error.message); return; }
    // If an admin is logged in, reflect it locally without a full refetch.
    if (session) await refreshAll();
  };
  const updateMatrimonialStatus = (id: string, status: MatrimonialProfile['status']) =>
    dbUpdate<MatrimonialProfile>('matrimonials', id, { status }, setMatrimonials);
  const deleteMatrimonial = (id: string) =>
    dbDelete<MatrimonialProfile>('matrimonials', id, setMatrimonials);

  // ---- Job board (public posts, goes live immediately, admin moderates) ----
  // New rows default to status 'Open', which RLS lets even an anonymous poster
  // read back — so dbInsert's .select() succeeds and the posting shows at once.
  const addJobOpening = (job: Omit<JobOpening, 'id' | 'date' | 'status'>) =>
    dbInsert<JobOpening>('job_openings', job, setJobOpenings, true).then(() => {});
  const updateJobOpeningStatus = (id: string, status: JobOpening['status']) =>
    dbUpdate<JobOpening>('job_openings', id, { status }, setJobOpenings);
  const deleteJobOpening = (id: string) =>
    dbDelete<JobOpening>('job_openings', id, setJobOpenings);

  // ---- Contact info (single row) ----
  const updateContactInfo = async (patch: Partial<ContactInfo>) => {
    if (!contactInfo) { reportError('Updating contact info', 'No contact_info row found. Run the migration first.'); return; }
    const { data, error } = await supabase
      .from('contact_info').update(stripId(patch)).eq('id', contactInfo.id).select().single();
    if (error || !data) { reportError('Updating contact info', error?.message ?? 'unknown error'); return; }
    setContactInfo(data as ContactInfo);
  };

  // ---- Donations ----
  // Public submissions are inserted as 'Pending' (enforced by RLS). They only
  // appear on the public ledger once an admin verifies them.
  const addDonation = (donation: Omit<DonationReport, 'id' | 'status' | 'date'>) =>
    dbInsert<DonationReport>('donations', donation, setDonations, true);
  const verifyDonation = (id: string) =>
    dbUpdate<DonationReport>('donations', id, { status: 'Verified' }, setDonations);

  // ---- Trustees ----
  const addTrustee = (t: Omit<Trustee, 'id'>) =>
    dbInsert<Trustee>('trustees', t, setTrustees, false).then(() => {});
  const updateTrustee = (id: string, p: Partial<Trustee>) =>
    dbUpdate<Trustee>('trustees', id, stripId(p), setTrustees);
  const deleteTrustee = (id: string) =>
    dbDelete<Trustee>('trustees', id, setTrustees);

  // ---- Activities (fixed set; edit only) ----
  const updateActivity = (id: string, p: Partial<WelfareActivityCategory>) =>
    dbUpdate<WelfareActivityCategory>('activities', id, stripId(p), setActivities);

  // ---- Achievers ----
  const addAchiever = (ach: Omit<Achiever, 'id'>) =>
    dbInsert<Achiever>('achievers', ach, setAchievers, false).then(() => {});
  const updateAchiever = (id: string, p: Partial<Achiever>) =>
    dbUpdate<Achiever>('achievers', id, stripId(p), setAchievers);
  const deleteAchiever = (id: string) =>
    dbDelete<Achiever>('achievers', id, setAchievers);

  // ---- Testimonials ----
  const addTestimonial = (test: Omit<Testimonial, 'id'>) =>
    dbInsert<Testimonial>('testimonials', test, setTestimonials, false).then(() => {});
  const updateTestimonial = (id: string, p: Partial<Testimonial>) =>
    dbUpdate<Testimonial>('testimonials', id, stripId(p), setTestimonials);
  const deleteTestimonial = (id: string) =>
    dbDelete<Testimonial>('testimonials', id, setTestimonials);

  // ---- Upcoming events ----
  const addUpcomingEvent = (evt: Omit<UpcomingEvent, 'id'>) =>
    dbInsert<UpcomingEvent>('upcoming_events', evt, setUpcomingEvents, false).then(() => {});
  const updateUpcomingEvent = (id: string, p: Partial<UpcomingEvent>) =>
    dbUpdate<UpcomingEvent>('upcoming_events', id, stripId(p), setUpcomingEvents);
  const deleteUpcomingEvent = (id: string) =>
    dbDelete<UpcomingEvent>('upcoming_events', id, setUpcomingEvents);

  return (
    <StoreContext.Provider value={{
      session, authReady, signIn, signOut,
      loading, refreshAll, resetDatabase: refreshAll,

      announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement,
      helpRequests, addHelpRequest, updateHelpRequestStatus,
      memberships, addMembership, updateMembershipStatus,
      volunteers, addVolunteer, updateVolunteer, deleteVolunteer,
      contactSubmissions, addContact,
      matrimonials, addMatrimonial, updateMatrimonialStatus, deleteMatrimonial,
      jobOpenings, addJobOpening, updateJobOpeningStatus, deleteJobOpening,
      contactInfo, updateContactInfo,
      donations, addDonation, verifyDonation,
      trustees, addTrustee, updateTrustee, deleteTrustee,
      activities, updateActivity,
      achievers, addAchiever, updateAchiever, deleteAchiever,
      testimonials, addTestimonial, updateTestimonial, deleteTestimonial,
      upcomingEvents, addUpcomingEvent, updateUpcomingEvent, deleteUpcomingEvent,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

// Never send `id` (or undefined values) in an update payload.
function stripId(patch: Record<string, unknown>): Record<string, unknown> {
  const { id, ...rest } = patch;
  void id;
  return Object.fromEntries(Object.entries(rest).filter(([, v]) => v !== undefined));
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
