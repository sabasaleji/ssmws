import React, { useState } from 'react';
import { useLanguage } from '../i18n';
import { useStore } from '../dbState';
import { 
  Lock, Check, ThumbsUp, AlertCircle, Ban, 
  Trash2, Plus, RefreshCw, BarChart2, Mail, 
  Users, HelpCircle, Megaphone, CheckCircle, FileText,
  Award, Briefcase, Star, Edit, Save, X, Calendar, Heart
} from 'lucide-react';
import { Trustee, WelfareActivityCategory, Achiever, Announcement, Testimonial, UpcomingEvent, VolunteerRegistration } from '../types';

interface AdminPanelProps {
  isAdminLoggedIn: boolean;
}

type SubTab = 'help' | 'members' | 'volunteers' | 'contacts' | 'matrimonials' | 'jobOpenings' | 'contactInfo' | 'bulletins' | 'trustees' | 'activities' | 'achievers' | 'testimonials' | 'upcomingEvents';

export default function AdminPanel({ isAdminLoggedIn }: AdminPanelProps) {
  const { t, language } = useLanguage();
  const store = useStore();

  // Authentication Fields (real Supabase email/password auth)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // Tab View
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('help');

  // Announcement Form State
  const [editingAnnouncementId, setEditingAnnouncementId] = useState<string | null>(null);
  const [annTitle, setAnnTitle] = useState('');
  const [annTitleGu, setAnnTitleGu] = useState('');
  const [annCategory, setAnnCategory] = useState<'education' | 'medical' | 'event' | 'general'>('general');
  const [annContent, setAnnContent] = useState('');
  const [annContentGu, setAnnContentGu] = useState('');
  const [annImportant, setAnnImportant] = useState(false);
  const [annSuccessMessage, setAnnSuccessMessage] = useState('');

  // Help Request Review Popover / Mode State
  const [reviewHelpId, setReviewHelpId] = useState<string | null>(null);
  const [statusNotes, setStatusNotes] = useState('');

  // Contact Details (single editable row) Form State
  const [ciAddress, setCiAddress] = useState('');
  const [ciAddressGu, setCiAddressGu] = useState('');
  const [ciPhone1, setCiPhone1] = useState('');
  const [ciPhone2, setCiPhone2] = useState('');
  const [ciEmail, setCiEmail] = useState('');
  const [ciWhatsapp, setCiWhatsapp] = useState('');
  const [ciSuccessMsg, setCiSuccessMsg] = useState('');

  // Dynamic Trustees Form States
  const [editingTrusteeId, setEditingTrusteeId] = useState<string | null>(null);
  const [truName, setTruName] = useState('');
  const [truNameGu, setTruNameGu] = useState('');
  const [truDesignation, setTruDesignation] = useState('');
  const [truDesignationGu, setTruDesignationGu] = useState('');
  const [truPhoto, setTruPhoto] = useState('');
  const [truIntro, setTruIntro] = useState('');
  const [truIntroGu, setTruIntroGu] = useState('');
  const [truRegion, setTruRegion] = useState('');
  const [truRegionGu, setTruRegionGu] = useState('');
  const [truPhone, setTruPhone] = useState('');
  const [truEmail, setTruEmail] = useState('');
  const [truSuccessMsg, setTruSuccessMsg] = useState('');

  // Dynamic Activities Form States
  const [selectedActivityId, setSelectedActivityId] = useState<string>('education');
  const [actTitle, setActTitle] = useState('');
  const [actTitleGu, setActTitleGu] = useState('');
  const [actDesc, setActDesc] = useState('');
  const [actDescGu, setActDescGu] = useState('');
  const [actIcon, setActIcon] = useState('');
  const [actStats, setActStats] = useState('');
  const [actStatsGu, setActStatsGu] = useState('');
  const [storyName, setStoryName] = useState('');
  const [storyNameGu, setStoryNameGu] = useState('');
  const [storyText, setStoryText] = useState('');
  const [storyTextGu, setStoryTextGu] = useState('');
  const [storyImpact, setStoryImpact] = useState('');
  const [storyImpactGu, setStoryImpactGu] = useState('');
  const [actSuccessMsg, setActSuccessMsg] = useState('');

  // Dynamic Achievers Form States
  const [editingAchieverId, setEditingAchieverId] = useState<string | null>(null);
  const [achName, setAchName] = useState('');
  const [achNameGu, setAchNameGu] = useState('');
  const [achCategory, setAchCategory] = useState<'doctor' | 'engineer' | 'ca' | 'officer' | 'entrepreneur' | 'topper'>('topper');
  const [achCatLabel, setAchCatLabel] = useState('');
  const [achCatLabelGu, setAchCatLabelGu] = useState('');
  const [achAchievement, setAchAchievement] = useState('');
  const [achAchievementGu, setAchAchievementGu] = useState('');
  const [achMessage, setAchMessage] = useState('');
  const [achMessageGu, setAchMessageGu] = useState('');
  const [achPhoto, setAchPhoto] = useState('');
  const [achPhone, setAchPhone] = useState('');
  const [achSuccessMsg, setAchSuccessMsg] = useState('');

  // Editable Volunteer Form States
  const [editingVolunteerId, setEditingVolunteerId] = useState<string | null>(null);
  const [volName, setVolName] = useState('');
  const [volPhoneState, setVolPhoneState] = useState('');
  const [volEmailState, setVolEmailState] = useState('');
  const [volSkillsState, setVolSkillsState] = useState('');
  const [volLocation, setVolLocation] = useState('');
  const [volSuccessMsg, setVolSuccessMsg] = useState('');

  // Dynamic Testimonials Form States
  const [editingTestimonialId, setEditingTestimonialId] = useState<string | null>(null);
  const [testQuote, setTestQuote] = useState('');
  const [testQuoteGu, setTestQuoteGu] = useState('');
  const [testAuthor, setTestAuthor] = useState('');
  const [testAuthorGu, setTestAuthorGu] = useState('');
  const [testDesignation, setTestDesignation] = useState('');
  const [testDesignationGu, setTestDesignationGu] = useState('');
  const [testInitials, setTestInitials] = useState('');
  const [testSuccessMsg, setTestSuccessMsg] = useState('');

  // Dynamic Upcoming Events Form States
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [evtTitle, setEvtTitle] = useState('');
  const [evtTitleGu, setEvtTitleGu] = useState('');
  const [evtDesc, setEvtDesc] = useState('');
  const [evtDescGu, setEvtDescGu] = useState('');
  const [evtMonth, setEvtMonth] = useState('');
  const [evtMonthGu, setEvtMonthGu] = useState('');
  const [evtDay, setEvtDay] = useState('');
  const [evtCategoryStr, setEvtCategoryStr] = useState('');
  const [evtCategoryStrGu, setEvtCategoryStrGu] = useState('');
  const [evtVenue, setEvtVenue] = useState('');
  const [evtVenueGu, setEvtVenueGu] = useState('');
  const [evtSuccessMsg, setEvtSuccessMsg] = useState('');

  // Handle Login Authentication — verified server-side by Supabase Auth.
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError('');
    const error = await store.signIn(email.trim(), password);
    setLoggingIn(false);
    if (error) {
      setLoginError(language === 'en'
        ? 'Invalid email or password.'
        : 'અમાન્ય ઈમેલ અથવા પાસવર્ડ.');
    }
    // On success, the auth session updates and the dashboard renders automatically.
  };

  // Publish / Edit Announcement Handler
  const handlePublishAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle || !annContent) {
      alert('Please fill out Title and Content in English at least');
      return;
    }
    
    if (editingAnnouncementId) {
      store.updateAnnouncement(editingAnnouncementId, {
        title: annTitle,
        title_gu: annTitleGu || annTitle,
        content: annContent,
        content_gu: annContentGu || annContent,
        category: annCategory,
        important: annImportant
      });
      setEditingAnnouncementId(null);
      setAnnSuccessMessage(language === 'en' ? 'Announcement updated successfully!' : 'બુલેટિન સફળતાપૂર્વક સુધારેલ છે!');
    } else {
      store.addAnnouncement({
        title: annTitle,
        title_gu: annTitleGu || annTitle,
        content: annContent,
        content_gu: annContentGu || annContent,
        category: annCategory,
        important: annImportant
      });
      setAnnSuccessMessage(language === 'en' ? 'Announcement published successfully!' : 'બુલેટિન સફળતાપૂર્વક પ્રકાશિત થયું!');
    }

    // Reset Form
    setAnnTitle('');
    setAnnTitleGu('');
    setAnnContent('');
    setAnnContentGu('');
    setAnnImportant(false);
    setTimeout(() => setAnnSuccessMessage(''), 4000);
  };

  // Load the current contact details into the edit form.
  const openContactInfoTab = () => {
    setActiveSubTab('contactInfo');
    const ci = store.contactInfo;
    setCiAddress(ci?.address ?? '');
    setCiAddressGu(ci?.address_gu ?? '');
    setCiPhone1(ci?.phone1 ?? '');
    setCiPhone2(ci?.phone2 ?? '');
    setCiEmail(ci?.email ?? '');
    setCiWhatsapp(ci?.whatsapp ?? '');
    setCiSuccessMsg('');
  };

  // Save contact details — propagates live to every visitor.
  const handleSaveContactInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    await store.updateContactInfo({
      address: ciAddress,
      address_gu: ciAddressGu || ciAddress,
      phone1: ciPhone1,
      phone2: ciPhone2,
      email: ciEmail,
      whatsapp: ciWhatsapp.replace(/[^0-9]/g, ''),
    });
    setCiSuccessMsg(language === 'en'
      ? 'Contact details updated — live for all visitors now.'
      : 'સંપર્ક વિગતો અપડેટ થઈ — હવે બધા મુલાકાતીઓ માટે લાઈવ છે.');
    setTimeout(() => setCiSuccessMsg(''), 4000);
  };

  // Perform help review
  const submitHelpReview = (id: string, status: 'Approved' | 'Rejected') => {
    store.updateHelpRequestStatus(id, status, statusNotes);
    setReviewHelpId(null);
    setStatusNotes('');
  };

  // Dynamics Trustee saving
  const handleSaveTrustee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!truName) {
      alert('Please fill out the Name');
      return;
    }
    const safePhoto = truPhoto || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120';
    if (editingTrusteeId) {
      store.updateTrustee(editingTrusteeId, {
        name: truName,
        name_gu: truNameGu || truName,
        designation: truDesignation,
        designation_gu: truDesignationGu || truDesignation,
        photo: safePhoto,
        intro: truIntro,
        intro_gu: truIntroGu || truIntro,
        region: truRegion,
        region_gu: truRegionGu || truRegion,
        phone: truPhone,
        email: truEmail
      });
      setEditingTrusteeId(null);
      setTruSuccessMsg(language === 'en' ? 'Trustee updated successfully!' : 'ટ્રસ્ટી વિગત સફળતાપૂર્વક અપડેટ થઈ!');
    } else {
      store.addTrustee({
        name: truName,
        name_gu: truNameGu || truName,
        designation: truDesignation,
        designation_gu: truDesignationGu || truDesignation,
        photo: safePhoto,
        intro: truIntro,
        intro_gu: truIntroGu || truIntro,
        region: truRegion,
        region_gu: truRegionGu || truRegion,
        phone: truPhone,
        email: truEmail
      });
      setTruSuccessMsg(language === 'en' ? 'Trustee added successfully!' : 'નવા ટ્રસ્ટી સફળતાપૂર્વક ઉમેરાયા!');
    }

    // Reset Form
    setTruName('');
    setTruNameGu('');
    setTruDesignation('');
    setTruDesignationGu('');
    setTruPhoto('');
    setTruIntro('');
    setTruIntroGu('');
    setTruRegion('');
    setTruRegionGu('');
    setTruPhone('');
    setTruEmail('');
    setTimeout(() => setTruSuccessMsg(''), 4000);
  };

  // Dynamic Activity saving
  const handleSaveActivity = (e: React.FormEvent) => {
    e.preventDefault();
    store.updateActivity(selectedActivityId, {
      title: actTitle,
      title_gu: actTitleGu,
      description: actDesc,
      description_gu: actDescGu,
      icon: actIcon,
      stats: actStats,
      stats_gu: actStatsGu,
      beneficiaryStory: {
        name: storyName,
        name_gu: storyNameGu,
        story: storyText,
        story_gu: storyTextGu,
        impact: storyImpact,
        impact_gu: storyImpactGu
      }
    });
    setActSuccessMsg(language === 'en' ? 'Welfare Activity updated successfully!' : 'મહિલા/રાહત કાર્યક્રમ વિગતો સફળતાપૂર્વક સેવ કરવામાં આવી!');
    setTimeout(() => setActSuccessMsg(''), 4000);
  };

  // Dynamics Achiever saving
  const handleSaveAchiever = (e: React.FormEvent) => {
    e.preventDefault();
    if (!achName || !achAchievement) {
      alert('Please fill out Achiever Name and Achievement info');
      return;
    }
    const safePhoto = achPhoto || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120';
    if (editingAchieverId) {
      store.updateAchiever(editingAchieverId, {
        name: achName,
        name_gu: achNameGu || achName,
        category: achCategory,
        category_label: achCatLabel,
        category_label_gu: achCatLabelGu || achCatLabel,
        achievement: achAchievement,
        achievement_gu: achAchievementGu || achAchievement,
        message: achMessage,
        message_gu: achMessageGu || achMessage,
        photo: safePhoto,
        phone: achPhone
      });
      setEditingAchieverId(null);
      setAchSuccessMsg(language === 'en' ? 'Achiever record updated!' : 'તેજસ્વી તારલાની વિગત અપડેટ થઈ!');
    } else {
      store.addAchiever({
        name: achName,
        name_gu: achNameGu || achName,
        category: achCategory,
        category_label: achCatLabel,
        category_label_gu: achCatLabelGu || achCatLabel,
        achievement: achAchievement,
        achievement_gu: achAchievementGu || achAchievement,
        message: achMessage,
        message_gu: achMessageGu || achMessage,
        photo: safePhoto,
        phone: achPhone
      });
      setAchSuccessMsg(language === 'en' ? 'New Achiever registered!' : 'નવા તેજસ્વી તારલાની નોંધણી થઈ ગઈ!');
    }

    // Reset Form
    setAchName('');
    setAchNameGu('');
    setAchCategory('topper');
    setAchCatLabel('Medical Specialist');
    setAchCatLabelGu('તબીબી નિષ્ણાત');
    setAchAchievement('');
    setAchAchievementGu('');
    setAchMessage('');
    setAchMessageGu('');
    setAchPhoto('');
    setAchPhone('');
    setTimeout(() => setAchSuccessMsg(''), 3000);
  };

  // Dynamic Volunteer Saving
  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!volName || !volPhoneState) {
      alert('Please fill out Volunteer Name and Phone');
      return;
    }
    const interestsList = volLocation.split(',').map(item => item.trim()).filter(Boolean);
    if (editingVolunteerId) {
      store.updateVolunteer(editingVolunteerId, {
        fullName: volName,
        phone: volPhoneState,
        email: volEmailState,
        skills: volSkillsState,
        interests: interestsList
      });
      setVolSuccessMsg("Volunteer updated successfully!");
    } else {
      store.addVolunteer({
        fullName: volName,
        phone: volPhoneState,
        email: volEmailState,
        skills: volSkillsState,
        interests: interestsList
      });
      setVolSuccessMsg("Volunteer added successfully!");
    }

    setTimeout(() => {
      cancelVolunteerEdit();
      setVolSuccessMsg('');
    }, 1500);
  };

  const cancelVolunteerEdit = () => {
    setEditingVolunteerId(null);
    setVolName('');
    setVolPhoneState('');
    setVolEmailState('');
    setVolSkillsState('');
    setVolLocation('');
  };

  // Dynamic Testimonials Saving
  const handleTestimonialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testQuote || !testAuthor) {
      alert('Please enter Quote and Author name.');
      return;
    }
    const safeInitials = testInitials || testAuthor.slice(0, 2).toUpperCase();
    if (editingTestimonialId) {
      store.updateTestimonial(editingTestimonialId, {
        quote: testQuote,
        quote_gu: testQuoteGu || testQuote,
        author: testAuthor,
        author_gu: testAuthorGu || testAuthor,
        designation: testDesignation,
        designation_gu: testDesignationGu || testDesignation,
        avatarInitials: safeInitials
      });
      setTestSuccessMsg("Testimonial updated successfully!");
    } else {
      store.addTestimonial({
        quote: testQuote,
        quote_gu: testQuoteGu || testQuote,
        author: testAuthor,
        author_gu: testAuthorGu || testAuthor,
        designation: testDesignation,
        designation_gu: testDesignationGu || testDesignation,
        avatarInitials: safeInitials
      });
      setTestSuccessMsg("Testimonial added successfully!");
    }

    setTimeout(() => {
      cancelTestimonialEdit();
      setTestSuccessMsg('');
    }, 1500);
  };

  const cancelTestimonialEdit = () => {
    setEditingTestimonialId(null);
    setTestQuote('');
    setTestQuoteGu('');
    setTestAuthor('');
    setTestAuthorGu('');
    setTestDesignation('');
    setTestDesignationGu('');
    setTestInitials('');
  };

  // Dynamic Upcoming Events Saving
  const handleUpcomingEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evtTitle || !evtMonth || !evtDay) {
      alert('Please fill out Event Title, Month, and Day.');
      return;
    }
    if (editingEventId) {
      store.updateUpcomingEvent(editingEventId, {
        title: evtTitle,
        title_gu: evtTitleGu || evtTitle,
        description: evtDesc,
        description_gu: evtDescGu || evtDesc,
        month: evtMonth,
        month_gu: evtMonthGu || evtMonth,
        day: evtDay,
        category: evtCategoryStr,
        category_gu: evtCategoryStrGu || evtCategoryStr,
        venue: evtVenue,
        venue_gu: evtVenueGu || evtVenue
      });
      setEvtSuccessMsg("Event updated successfully!");
    } else {
      store.addUpcomingEvent({
        title: evtTitle,
        title_gu: evtTitleGu || evtTitle,
        description: evtDesc,
        description_gu: evtDescGu || evtDesc,
        month: evtMonth,
        month_gu: evtMonthGu || evtMonth,
        day: evtDay,
        category: evtCategoryStr,
        category_gu: evtCategoryStrGu || evtCategoryStr,
        venue: evtVenue,
        venue_gu: evtVenueGu || evtVenue
      });
      setEvtSuccessMsg("Event added successfully!");
    }

    setTimeout(() => {
      cancelUpcomingEventEdit();
      setEvtSuccessMsg('');
    }, 1500);
  };

  const cancelUpcomingEventEdit = () => {
    setEditingEventId(null);
    setEvtTitle('');
    setEvtTitleGu('');
    setEvtDesc('');
    setEvtDescGu('');
    setEvtMonth('');
    setEvtMonthGu('');
    setEvtDay('');
    setEvtCategoryStr('');
    setEvtCategoryStrGu('');
    setEvtVenue('');
    setEvtVenueGu('');
  };

  // Re-pull the latest data from the database.
  const handleRefresh = () => {
    store.refreshAll();
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="mx-auto max-w-md my-20 px-4 font-sans">
        <div className="rounded-none border border-gold/30 bg-primary p-8 md:p-10 shadow-2xl text-white relative">
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-gold"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-gold"></div>

          <div className="text-center mb-6 space-y-2">
            <div className="inline-flex p-3 bg-white/5 border border-white/10 text-gold mb-1">
              <Lock className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold uppercase tracking-[0.15em] font-display text-gold">
              {t('adminTitle')}
            </h2>
            <p className="text-xs text-gray-300 max-w-xs mx-auto">
              {t('adminSubtitle')}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">{t('adminUser')}</label>
              <input
                id="input-admin-user"
                type="email"
                required
                autoComplete="username"
                className="w-full text-xs px-3.5 py-3 rounded-none border border-white/10 bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:border-gold focus:bg-white/10"
                placeholder="admin@ssmws.org"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">{t('adminPass')}</label>
              <input
                id="input-admin-pass"
                type="password"
                required
                autoComplete="current-password"
                className="w-full text-xs px-3.5 py-3 rounded-none border border-white/10 bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:border-gold focus:bg-white/10"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            {loginError && (
              <div className="p-4 rounded-none bg-red-950/40 border border-red-500/30 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              id="btn-admin-submit"
              type="submit"
              disabled={loggingIn}
              className="w-full py-3.5 bg-gold hover:bg-yellow-600 text-primary font-bold uppercase text-xs tracking-widest cursor-pointer transition-colors disabled:opacity-60"
            >
              {loggingIn ? (language === 'en' ? 'Verifying…' : 'ચકાસણી…') : t('adminLogin')}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Active Pending Counts for badges
  const pendingHelpCount = store.helpRequests.filter(h => h.status === 'Pending').length;
  const pendingMembCount = store.memberships.filter(m => m.status === 'Pending').length;
  const newMatrimonialCount = store.matrimonials.filter(m => m.status === 'New').length;
  const openJobsCount = store.jobOpenings.filter(j => j.status === 'Open').length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-10 font-sans">
      
      {/* Admin Title Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-gray-150 pb-6">
        <div className="space-y-1.5">
          <span className="inline-flex items-center gap-1.5 text-[9px] text-[#D4AF37] font-bold bg-primary px-3 py-1 border border-gold/20 uppercase tracking-widest">
            <CheckCircle className="h-3.5 w-3.5 fill-gold text-primary" /> SSMWS Trusted Ledger System
          </span>
          <h1 className="text-3xl font-extrabold text-primary font-display uppercase tracking-tight">
            Governance Dashboard
          </h1>
          <p className="text-xs text-gray-500 font-serif">
            Welcome back to the Board Secretariat panel. Manage registries and edit live community notice bulletins.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="btn-admin-reset"
            onClick={handleRefresh}
            className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 bg-white text-gray-600 text-xs uppercase font-bold tracking-wider cursor-pointer hover:border-gold hover:text-primary transition-colors"
            title="Reload the latest data from the database"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Refresh Data
          </button>

          <button
            id="btn-admin-logout"
            onClick={() => store.signOut()}
            className="px-4 py-2 bg-primary text-white text-xs uppercase font-bold tracking-wider hover:bg-primary-dark cursor-pointer transition-colors"
          >
            Secretariat Logout
          </button>
        </div>
      </div>

      {/* Analytics Cards Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-white border border-gray-100 rounded-sm shadow-sm flex items-center justify-between">
          <div>
            <span className="block text-[9px] font-bold text-gold uppercase tracking-wider">{t('adminStatTotalHelp')}</span>
            <span className="text-xl font-extrabold text-primary uppercase font-display tracking-tight mt-1 block">{pendingHelpCount} Outstanding</span>
          </div>
          <div className="p-3 bg-primary/5 text-gold border border-primary/10 rounded-sm">
            <HelpCircle className="h-5 w-5" />
          </div>
        </div>

        <div className="p-6 bg-white border border-gray-100 rounded-sm shadow-sm flex items-center justify-between">
          <div>
            <span className="block text-[9px] font-bold text-gold uppercase tracking-wider">{t('adminStatTotalMemb')}</span>
            <span className="text-xl font-extrabold text-primary uppercase font-display tracking-tight mt-1 block">{pendingMembCount} Pending</span>
          </div>
          <div className="p-3 bg-primary/5 text-gold border border-primary/10 rounded-sm">
            <Users className="h-5 w-5" />
          </div>
        </div>

        <div className="p-6 bg-white border border-gray-100 rounded-sm shadow-sm flex items-center justify-between">
          <div>
            <span className="block text-[9px] font-bold text-gold uppercase tracking-wider">Active Bulletins</span>
            <span className="text-xl font-extrabold text-primary uppercase font-display tracking-tight mt-1 block">{store.announcements.length} Published</span>
          </div>
          <div className="p-3 bg-primary/5 text-gold border border-primary/10 rounded-sm">
            <Megaphone className="h-5 w-5" />
          </div>
        </div>

        <div className="p-6 bg-white border border-gray-100 rounded-sm shadow-sm flex items-center justify-between">
          <div>
            <span className="block text-[9px] font-bold text-gold uppercase tracking-wider">Welfare Audit Trails</span>
            <span className="text-xl font-extrabold text-primary uppercase font-display tracking-tight mt-1 block">₹{store.donations.reduce((acc, d) => acc + d.amount, 0).toLocaleString()} Collected</span>
          </div>
          <div className="p-3 bg-primary/5 text-gold border border-primary/10 rounded-sm">
            <BarChart2 className="h-5 w-5" />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 items-start">
        
        {/* Left Hand: Commands Sub Sidebar */}
        <aside className="w-full lg:w-72 space-y-2 lg:sticky lg:top-8 flex-shrink-0">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-2">Registries & Ledgers</h3>
          
          <button
            id="subtab-help"
            onClick={() => { setActiveSubTab('help'); setReviewHelpId(null); }}
            className={`w-full text-left px-4 py-3 rounded-none text-xs font-bold uppercase tracking-wider flex items-center justify-between border cursor-pointer transition-all ${
              activeSubTab === 'help' 
                ? 'bg-primary text-white border-primary shadow-sm' 
                : 'bg-white border-gray-150 text-gray-500 hover:border-gold hover:text-primary'
            }`}
          >
            <span className="flex items-center gap-2"><HelpCircle className="h-4 w-4 text-gold" /> {t('adminWelfareRequests')}</span>
            {pendingHelpCount > 0 && <span className="bg-[#D4AF37] text-primary font-bold px-2 py-0.5 rounded-none text-[9px]">{pendingHelpCount}</span>}
          </button>

          <button
            id="subtab-members"
            onClick={() => setActiveSubTab('members')}
            className={`w-full text-left px-4 py-3 rounded-none text-xs font-bold uppercase tracking-wider flex items-center justify-between border cursor-pointer transition-all ${
              activeSubTab === 'members' 
                ? 'bg-primary text-white border-primary shadow-sm' 
                : 'bg-white border-gray-150 text-gray-500 hover:border-gold hover:text-primary'
            }`}
          >
            <span className="flex items-center gap-2"><Users className="h-4 w-4 text-gold" /> {t('adminMemberRegistry')}</span>
            {pendingMembCount > 0 && <span className="bg-primary text-white border border-gold font-bold px-2 py-0.5 rounded-none text-[9px]">{pendingMembCount}</span>}
          </button>

          <button
            id="subtab-volunteers"
            onClick={() => setActiveSubTab('volunteers')}
            className={`w-full text-left px-4 py-3 rounded-none text-xs font-bold uppercase tracking-wider flex items-center justify-between border cursor-pointer transition-all ${
              activeSubTab === 'volunteers' 
                ? 'bg-primary text-white border-primary shadow-sm' 
                : 'bg-white border-gray-150 text-gray-500 hover:border-gold hover:text-primary'
            }`}
          >
            <span className="flex items-center gap-2"><Users className="h-4 w-4 text-gold" /> Volunteers</span>
            <span className="text-gray-400 font-mono text-[9px]">({store.volunteers.length})</span>
          </button>

          <button
            id="subtab-contacts"
            onClick={() => setActiveSubTab('contacts')}
            className={`w-full text-left px-4 py-3 rounded-none text-xs font-bold uppercase tracking-wider flex items-center justify-between border cursor-pointer transition-all ${
              activeSubTab === 'contacts' 
                ? 'bg-primary text-white border-primary shadow-sm' 
                : 'bg-white border-gray-150 text-gray-500 hover:border-gold hover:text-primary'
            }`}
          >
            <span className="flex items-center gap-2"><Mail className="h-4 w-4 text-gold" /> General Inquiries</span>
            <span className="text-gray-400 font-mono text-[9px]">({store.contactSubmissions.length})</span>
          </button>

          <button
            id="subtab-matrimonials"
            onClick={() => setActiveSubTab('matrimonials')}
            className={`w-full text-left px-4 py-3 rounded-none text-xs font-bold uppercase tracking-wider flex items-center justify-between border cursor-pointer transition-all ${
              activeSubTab === 'matrimonials'
                ? 'bg-primary text-white border-primary shadow-sm'
                : 'bg-white border-gray-150 text-gray-500 hover:border-gold hover:text-primary'
            }`}
          >
            <span className="flex items-center gap-2"><Heart className="h-4 w-4 text-gold" /> {t('adminMatrimonialTitle')}</span>
            {newMatrimonialCount > 0
              ? <span className="bg-[#D4AF37] text-primary font-bold px-2 py-0.5 rounded-none text-[9px]">{newMatrimonialCount}</span>
              : <span className="text-gray-400 font-mono text-[9px]">({store.matrimonials.length})</span>}
          </button>

          <button
            id="subtab-jobOpenings"
            onClick={() => setActiveSubTab('jobOpenings')}
            className={`w-full text-left px-4 py-3 rounded-none text-xs font-bold uppercase tracking-wider flex items-center justify-between border cursor-pointer transition-all ${
              activeSubTab === 'jobOpenings'
                ? 'bg-primary text-white border-primary shadow-sm'
                : 'bg-white border-gray-150 text-gray-500 hover:border-gold hover:text-primary'
            }`}
          >
            <span className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-gold" /> {t('adminJobBoardTitle')}</span>
            {openJobsCount > 0
              ? <span className="bg-[#D4AF37] text-primary font-bold px-2 py-0.5 rounded-none text-[9px]">{openJobsCount}</span>
              : <span className="text-gray-400 font-mono text-[9px]">({store.jobOpenings.length})</span>}
          </button>

          <button
            id="subtab-contactInfo"
            onClick={openContactInfoTab}
            className={`w-full text-left px-4 py-3 rounded-none text-xs font-bold uppercase tracking-wider flex items-center justify-between border cursor-pointer transition-all ${
              activeSubTab === 'contactInfo'
                ? 'bg-primary text-white border-primary shadow-sm'
                : 'bg-white border-gray-150 text-gray-500 hover:border-gold hover:text-primary'
            }`}
          >
            <span className="flex items-center gap-2"><Edit className="h-4 w-4 text-gold" /> Contact Details</span>
          </button>

          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 pt-6 mb-2 font-display">Broadcast & Feed</h3>

          <button
            id="subtab-bulletins"
            onClick={() => setActiveSubTab('bulletins')}
            className={`w-full text-left px-4 py-3 rounded-none text-xs font-bold uppercase tracking-wider flex items-center justify-between border cursor-pointer transition-all ${
              activeSubTab === 'bulletins' 
                ? 'bg-primary text-white border-primary shadow-sm' 
                : 'bg-white border-gray-150 text-gray-500 hover:border-gold hover:text-primary'
            }`}
          >
            <span className="flex items-center gap-2"><Megaphone className="h-4 w-4 text-gold" /> {t('adminAnnouncementsTitle')}</span>
          </button>

          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 pt-6 mb-2 font-display">Manage Primary Content</h3>

          <button
            id="subtab-trustees"
            onClick={() => {
              setActiveSubTab('trustees');
              setEditingTrusteeId(null);
              setTruName('');
              setTruNameGu('');
              setTruDesignation('');
              setTruDesignationGu('');
              setTruPhoto('');
              setTruIntro('');
              setTruIntroGu('');
              setTruPhone('');
              setTruEmail('');
              setTruSuccessMsg('');
            }}
            className={`w-full text-left px-4 py-3 rounded-none text-xs font-bold uppercase tracking-wider flex items-center justify-between border cursor-pointer transition-all ${
              activeSubTab === 'trustees' 
                ? 'bg-primary text-white border-primary shadow-sm' 
                : 'bg-white border-gray-150 text-gray-500 hover:border-gold hover:text-primary'
            }`}
          >
            <span className="flex items-center gap-2"><Award className="h-4 w-4 text-gold" /> Trustees Committee</span>
            <span className="text-gray-400 font-mono text-[9px]">({store.trustees.length})</span>
          </button>

          <button
            id="subtab-activities"
            onClick={() => {
              setActiveSubTab('activities');
              const firstAct = store.activities[0];
              if (firstAct) {
                setSelectedActivityId(firstAct.id);
                setActTitle(firstAct.title);
                setActTitleGu(firstAct.title_gu);
                setActDesc(firstAct.description);
                setActDescGu(firstAct.description_gu);
                setActIcon(firstAct.icon);
                setActStats(firstAct.stats);
                setActStatsGu(firstAct.stats_gu);
                setStoryName(firstAct.beneficiaryStory.name);
                setStoryNameGu(firstAct.beneficiaryStory.name_gu);
                setStoryText(firstAct.beneficiaryStory.story);
                setStoryTextGu(firstAct.beneficiaryStory.story_gu);
                setStoryImpact(firstAct.beneficiaryStory.impact);
                setStoryImpactGu(firstAct.beneficiaryStory.impact_gu);
                setActSuccessMsg('');
              }
            }}
            className={`w-full text-left px-4 py-3 rounded-none text-xs font-bold uppercase tracking-wider flex items-center justify-between border cursor-pointer transition-all ${
              activeSubTab === 'activities' 
                ? 'bg-primary text-white border-primary shadow-sm' 
                : 'bg-white border-gray-150 text-gray-500 hover:border-gold hover:text-primary'
            }`}
          >
            <span className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-gold" /> Welfare Programs</span>
            <span className="text-gray-400 font-mono text-[9px]">({store.activities.length})</span>
          </button>

          <button
            id="subtab-achievers"
            onClick={() => {
              setActiveSubTab('achievers');
              setEditingAchieverId(null);
              setAchName('');
              setAchNameGu('');
              setAchCategory('topper');
              setAchCatLabel('Medical Specialist');
              setAchCatLabelGu('તબીબી નિષ્ણાત');
              setAchAchievement('');
              setAchAchievementGu('');
              setAchMessage('');
              setAchMessageGu('');
              setAchPhoto('');
              setAchPhone('');
              setAchSuccessMsg('');
            }}
            className={`w-full text-left px-4 py-3 rounded-none text-xs font-bold uppercase tracking-wider flex items-center justify-between border cursor-pointer transition-all ${
              activeSubTab === 'achievers' 
                ? 'bg-primary text-white border-primary shadow-sm' 
                : 'bg-white border-gray-150 text-gray-500 hover:border-gold hover:text-primary'
            }`}
          >
            <span className="flex items-center gap-2"><Star className="h-4 w-4 text-gold" /> Honoring Talents</span>
            <span className="text-gray-400 font-mono text-[9px]">({store.achievers.length})</span>
          </button>

          <button
            id="subtab-testimonials"
            onClick={() => {
              setActiveSubTab('testimonials');
              setEditingTestimonialId(null);
              setTestQuote('');
              setTestQuoteGu('');
              setTestAuthor('');
              setTestAuthorGu('');
              setTestDesignation('');
              setTestDesignationGu('');
              setTestInitials('');
              setTestSuccessMsg('');
            }}
            className={`w-full text-left px-4 py-3 rounded-none text-xs font-bold uppercase tracking-wider flex items-center justify-between border cursor-pointer transition-all ${
              activeSubTab === 'testimonials' 
                ? 'bg-primary text-white border-primary shadow-sm' 
                : 'bg-white border-gray-150 text-gray-500 hover:border-gold hover:text-primary'
            }`}
          >
            <span className="flex items-center gap-2"><ThumbsUp className="h-4 w-4 text-gold" /> Testimonials</span>
            <span className="text-gray-400 font-mono text-[9px]">({store.testimonials.length})</span>
          </button>

          <button
            id="subtab-upcomingEvents"
            onClick={() => {
              setActiveSubTab('upcomingEvents');
              setEditingEventId(null);
              setEvtTitle('');
              setEvtTitleGu('');
              setEvtDesc('');
              setEvtDescGu('');
              setEvtMonth('');
              setEvtMonthGu('');
              setEvtDay('');
              setEvtCategoryStr('');
              setEvtCategoryStrGu('');
              setEvtVenue('');
              setEvtVenueGu('');
              setEvtSuccessMsg('');
            }}
            className={`w-full text-left px-4 py-3 rounded-none text-xs font-bold uppercase tracking-wider flex items-center justify-between border cursor-pointer transition-all ${
              activeSubTab === 'upcomingEvents' 
                ? 'bg-primary text-white border-primary shadow-sm' 
                : 'bg-white border-gray-150 text-gray-500 hover:border-gold hover:text-primary'
            }`}
          >
            <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-gold" /> Event Calendar</span>
            <span className="text-gray-400 font-mono text-[9px]">({store.upcomingEvents.length})</span>
          </button>
        </aside>

        {/* Right Hand: Active Panel View Workspace */}
        <main className="flex-grow bg-white border border-gray-100 rounded-sm p-6 md:p-8 shadow-sm relative">
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-gold"></div>
          
          {/* ActiveSubTab 1: HELP REQUEST MANAGER */}
          {activeSubTab === 'help' && (
            <div className="space-y-6">
              <div className="border-b pb-3 mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-primary uppercase tracking-widest font-display">
                    {t('adminWelfareRequests')}
                  </h2>
                  <p className="text-xs text-gray-400 font-serif mt-0.5">
                    Review incoming education fees or clinic hospital invoices first. Allocate payout decisions.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-gold uppercase font-bold tracking-wider">SECURE LEDGER RECORD</span>
              </div>

              {store.helpRequests.length === 0 ? (
                <div className="p-12 text-center border-2 border-dashed border-gray-100 text-gray-400">
                  {t('adminNoRequests')}
                </div>
              ) : (
                <div className="space-y-6">
                  {store.helpRequests.map(help => (
                    <div key={help.id} className={`p-6 border rounded-none relative ${
                      help.status === 'Pending' 
                        ? 'border-gold bg-[#FCFAF7]' 
                        : help.status === 'Approved'
                          ? 'border-emerald-200 bg-emerald-50/10' 
                          : 'border-gray-250 bg-gray-50/20'
                    }`}>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3 border-b border-gray-100 pb-3">
                        <div>
                          <h4 className="text-xs font-bold text-primary uppercase tracking-wide">{help.applicantName}</h4>
                          <span className="text-[9px] text-gray-400 font-mono">Case FILE: {help.id} • Posted: {help.date}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-[9px] font-mono font-bold uppercase px-2.5 py-1 ${
                            help.status === 'Pending' 
                              ? 'bg-primary text-white border border-gold/40' 
                              : help.status === 'Approved'
                                ? 'bg-emerald-700 text-white' 
                                : 'bg-red-650 text-white'
                          }`}>
                            {help.status}
                          </span>
                          <span className="text-xs font-extrabold text-primary">₹{help.amountRequested.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="text-xs text-gray-500 space-y-2">
                        <p><span className="font-bold text-primary uppercase text-[10px] tracking-wide inline-block w-28">Category:</span> {help.category.toUpperCase()}</p>
                        <p><span className="font-bold text-primary uppercase text-[10px] tracking-wide inline-block w-28">Case description:</span> <span className="font-serif italic">"{help.description}"</span></p>
                        <p><span className="font-bold text-primary uppercase text-[10px] tracking-wide inline-block w-28">Coordinates:</span> Phone: {help.phone} | Email: {help.email}</p>
                        {help.fileName && (
                          <div className="mt-3.5 inline-flex items-center gap-1.5 px-3 py-1 bg-primary text-white text-[10px] uppercase font-mono">
                            <FileText className="h-3.5 w-3.5 text-gold" />
                            <span>Letter Attachment: {help.fileName}</span>
                          </div>
                        )}
                        
                        {help.statusNotes && (
                          <div className="mt-4 p-4 rounded-none bg-primary text-white border-l-4 border-gold text-xs font-serif">
                            <span className="font-bold text-gold">Trustee Board Decision Memo:</span> {help.statusNotes}
                          </div>
                        )}
                      </div>

                      {/* Review Actions Toggle Row */}
                      {help.status === 'Pending' && (
                        <div className="mt-6 pt-4 border-t border-gray-100">
                          {reviewHelpId === help.id ? (
                            <div className="space-y-3.5">
                              <label className="block text-[10px] font-bold uppercase tracking-widest text-primary font-display">Trustee Board decision memo & Bank payment transaction notes:</label>
                              <textarea
                                className="w-full text-xs p-3.5 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-[#FCFAF7]"
                                placeholder="E.g. Approved INR 20k to State Bank ID xxxx, Txn # 48293 verified."
                                rows={2}
                                value={statusNotes}
                                onChange={e => setStatusNotes(e.target.value)}
                              />
                              <div className="flex flex-wrap gap-2 pt-1.5">
                                <button
                                  onClick={() => submitHelpReview(help.id, 'Approved')}
                                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                                >
                                  Approve & Disburse
                                </button>
                                <button
                                  onClick={() => submitHelpReview(help.id, 'Rejected')}
                                  className="px-5 py-2 bg-red-650 hover:bg-red-750 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                                >
                                  Reject / Hold Files
                                </button>
                                <button
                                  onClick={() => setReviewHelpId(null)}
                                  className="px-4 py-2 border border-gray-200 text-gray-500 hover:text-primary text-xs uppercase font-bold tracking-wider cursor-pointer"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button
                              id={`btn-review-${help.id}`}
                              onClick={() => { setReviewHelpId(help.id); setStatusNotes(''); }}
                              className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
                            >
                              Open Board Decision Desks
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ActiveSubTab 2: MEMBER REGISTRY */}
          {activeSubTab === 'members' && (
            <div className="space-y-6">
              <div className="border-b pb-3 mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-primary uppercase tracking-widest font-display">
                    {t('adminMemberRegistry')}
                  </h2>
                  <p className="text-xs text-gray-400 font-serif mt-0.5">
                    Official registry of Sunni Momin households in the Sabarkantha districts. Access vote sheets.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-gold uppercase font-bold tracking-wider">GOVERNANCE ROSTER</span>
              </div>

              {store.memberships.length === 0 ? (
                <p className="p-12 text-center border-2 border-dashed border-gray-100 text-gray-400">
                  {t('adminNoApplications')}
                </p>
              ) : (
                <div className="overflow-x-auto border border-gray-150">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-primary text-white uppercase font-bold text-[9px] tracking-widest">
                        <th className="p-4 border-b border-gray-150">Applicant / Father</th>
                        <th className="p-4 border-b border-gray-150">Contact Points</th>
                        <th className="p-4 border-b border-gray-150">Demographics / Blood</th>
                        <th className="p-4 border-b border-gray-150">Occupation</th>
                        <th className="p-4 border-b border-gray-150">Roster state</th>
                        <th className="p-4 border-b border-gray-150 text-right">Administrative Decision</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {store.memberships.map(m => (
                        <tr key={m.id} className="hover:bg-zinc-50 font-sans">
                          <td className="p-4">
                            <span className="font-bold text-primary block uppercase text-[11px] tracking-wide">{m.fullName}</span>
                            <span className="text-[10px] text-gray-400">S/O or W/O: {m.fatherHusbandName}</span>
                          </td>
                          <td className="p-4">
                            <span className="block font-mono tracking-wider">{m.phone}</span>
                            <span className="text-[10px] text-gray-400 block">{m.email}</span>
                          </td>
                          <td className="p-4">
                            <span className="block font-mono text-gray-500">{m.dob}</span>
                            {m.bloodGroup && <span className="block text-[9px] font-bold text-red-600 uppercase">BLOOD: {m.bloodGroup}</span>}
                          </td>
                          <td className="p-4 font-serif">
                            <span className="block italic text-gray-650">{m.occupation}</span>
                            <span className="text-[9px] text-gray-400 block max-w-xs truncate" title={m.address}>{m.address}</span>
                          </td>
                          <td className="p-4">
                            <span className={`text-[9px] font-bold uppercase px-2.5 py-0.5 rounded-none font-mono ${
                              m.status === 'Pending' 
                                ? 'bg-amber-100 text-amber-800' 
                                : m.status === 'Approved'
                                  ? 'bg-emerald-100 text-emerald-800' 
                                  : 'bg-red-100 text-red-800'
                            }`}>
                              {m.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            {m.status === 'Pending' ? (
                              <div className="flex gap-2 justify-end">
                                <button
                                  onClick={() => store.updateMembershipStatus(m.id, 'Approved')}
                                  className="p-1 px-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold uppercase text-[10px] tracking-wider cursor-pointer"
                                  title="Approve Member"
                                >
                                  ✔ Approve
                                </button>
                                <button
                                  onClick={() => store.updateMembershipStatus(m.id, 'Rejected')}
                                  className="p-1 px-3 bg-red-600 hover:bg-red-700 text-white font-bold uppercase text-[10px] tracking-wider cursor-pointer"
                                  title="Reject Application"
                                >
                                  Reject
                                </button>
                              </div>
                            ) : (
                              <span className="text-[9px] text-gray-400 italic uppercase font-mono tracking-widest">PROCESSED</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ActiveSubTab 3: VOLUNTEERS */}
          {activeSubTab === 'volunteers' && (
            <div className="space-y-6">
              <div className="border-b pb-3 mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-primary uppercase tracking-widest font-display">
                    Volunteer Roster Management
                  </h2>
                  <p className="text-xs text-gray-400 font-serif mt-0.5">
                    Register, modify, or discharge community taskforce cadres and incident response personnel.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-gold uppercase font-bold tracking-wider">CAMPAIGN CORPS</span>
              </div>

              {/* Add / Edit Volunteer Card Form */}
              <form onSubmit={handleVolunteerSubmit} className="p-6 border border-gray-150 bg-white space-y-4 shadow-sm relative">
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-gold"></div>
                <h3 className="text-xs font-bold text-primary uppercase tracking-wider">
                  {editingVolunteerId ? "Modify Volunteer Profile" : "Enlist New Action Cadre"}
                </h3>
                {volSuccessMsg && <p className="text-xs text-emerald-600 font-bold bg-emerald-50 p-2 border border-emerald-200">{volSuccessMsg}</p>}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Full Name</label>
                    <input 
                      type="text" 
                      value={volName} 
                      onChange={(e) => setVolName(e.target.value)} 
                      placeholder="e.g. Salim G. Momin" 
                      required 
                      className="w-full text-xs p-2 border focus:border-gold outline-none rounded-none bg-warm-light"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Phone Number</label>
                    <input 
                      type="text" 
                      value={volPhoneState} 
                      onChange={(e) => setVolPhoneState(e.target.value)} 
                      placeholder="e.g. +91 98765 43210" 
                      required 
                      className="w-full text-xs p-2 border focus:border-gold outline-none rounded-none bg-warm-light"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Email Address</label>
                    <input 
                      type="email" 
                      value={volEmailState} 
                      onChange={(e) => setVolEmailState(e.target.value)} 
                      placeholder="e.g. salim@momin.com" 
                      required 
                      className="w-full text-xs p-2 border focus:border-gold outline-none rounded-none bg-warm-light"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Primary Capacity / Skills</label>
                    <input 
                      type="text" 
                      value={volSkillsState} 
                      onChange={(e) => setVolSkillsState(e.target.value)} 
                      placeholder="e.g. First Aid, Disaster Rescue, Food Logistics" 
                      required 
                      className="w-full text-xs p-2 border focus:border-gold outline-none rounded-none bg-warm-light"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Village Sectors / Field Focuses (comma-separated list)</label>
                  <input 
                    type="text" 
                    value={volLocation} 
                    onChange={(e) => setVolLocation(e.target.value)} 
                    placeholder="e.g. Medical Camps, Orphan Aid, Food Distribution" 
                    required 
                    className="w-full text-xs p-2 border focus:border-gold outline-none rounded-none bg-warm-light"
                  />
                  <span className="text-[10px] text-gray-400 block mt-1 font-serif">Separate multiple items with commas.</span>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  {editingVolunteerId && (
                    <button 
                      type="button" 
                      onClick={cancelVolunteerEdit}
                      className="px-4 py-2 border text-xs font-bold uppercase tracking-wider text-gray-500 hover:bg-gray-50 rounded-none cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}
                  <button 
                    type="submit" 
                    className="px-6 py-2 bg-primary text-white hover:bg-primary-dark font-bold text-xs uppercase tracking-wider rounded-none cursor-pointer border border-primary transition-all shadow-sm"
                  >
                    {editingVolunteerId ? "Commit Profile Update" : "Enlist/Save Volunteer"}
                  </button>
                </div>
              </form>

              <h3 className="text-xs font-bold text-primary uppercase tracking-widest pt-4 border-t">Currently Active Volunteers ({store.volunteers.length})</h3>

              {store.volunteers.length === 0 ? (
                <div className="p-12 text-center border-2 border-dashed border-gray-105 text-gray-400 bg-white">
                  No action corps volunteers registered.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {store.volunteers.map(vol => (
                    <div key={vol.id} className="p-6 border border-gray-100 bg-white relative rounded-none shadow-sm flex flex-col justify-between">
                      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-gold"></div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="font-bold text-primary uppercase text-[11px] tracking-wide">{vol.fullName}</span>
                          <span className="text-[9px] text-gray-400 font-mono">FILED: {vol.date || 'Active'}</span>
                        </div>
                        <div className="text-xs space-y-2 text-gray-500 font-sans">
                          <p><span className="font-bold text-primary text-[10px] uppercase tracking-wide inline-block w-24">Phone:</span> {vol.phone}</p>
                          <p><span className="font-bold text-primary text-[10px] uppercase tracking-wide inline-block w-24">Email:</span> {vol.email}</p>
                          <p><span className="font-bold text-primary text-[10px] uppercase tracking-wide inline-block w-24">Capacity:</span> {vol.skills}</p>
                          <p><span className="font-bold text-primary text-[10px] uppercase tracking-wide inline-block w-24">Sector focus:</span> {vol.interests.join(', ')}</p>
                        </div>
                        
                        <div className="flex items-center gap-2 border-t pt-3 mt-1">
                          <button
                            type="button"
                            onClick={() => {
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                              setEditingVolunteerId(vol.id);
                              setVolName(vol.fullName);
                              setVolPhoneState(vol.phone);
                              setVolEmailState(vol.email);
                              setVolSkillsState(vol.skills);
                              setVolLocation(vol.interests.join(', '));
                            }}
                            className="p-1 px-3 border border-gold text-gold hover:bg-gold/5 font-bold uppercase text-[9px] tracking-wider cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm('De-register this volunteer?')) {
                                store.deleteVolunteer(vol.id);
                              }
                            }}
                            className="p-1 px-3 border border-red-200 text-red-500 hover:bg-red-50 font-bold uppercase text-[9px] tracking-wider cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ActiveSubTab 4: INQUIRIES */}
          {activeSubTab === 'contacts' && (
            <div className="space-y-6">
              <div className="border-b pb-3 mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-primary uppercase tracking-widest font-display">
                    General Contact Inquiries
                  </h2>
                  <p className="text-xs text-gray-400 font-serif mt-0.5">
                    Messages submitted by public users on marriage records, careers, or help questions.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-gold uppercase font-bold tracking-wider">MAILBOX INBOX</span>
              </div>

              {store.contactSubmissions.length === 0 ? (
                <div className="p-12 text-center border-2 border-dashed border-gray-105 text-gray-400">
                  No submissions yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {store.contactSubmissions.map(con => (
                    <div key={con.id} className="p-6 border border-gray-100 bg-[#FCFAF7] rounded-none">
                      <div className="flex items-center justify-between border-b pb-3 mb-3 border-gray-150">
                        <div>
                          <span className="font-bold text-xs uppercase text-primary tracking-wide">{con.name}</span>
                          <span className="block text-[9px] text-gray-400 font-mono mt-0.5">Phone: {con.phone} | Email: {con.email}</span>
                        </div>
                        <span className="text-[10px] text-gray-400 font-mono">{con.date}</span>
                      </div>
                      <p className="text-xs font-bold text-primary uppercase tracking-wider">SUBJECT: {con.subject}</p>
                      <p className="text-xs text-gray-600 font-serif mt-2 italic leading-relaxed bg-white p-3 border">"{con.message}"</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ActiveSubTab 4a2: CONFIDENTIAL MATRIMONIAL REGISTRY (admin-only) */}
          {activeSubTab === 'matrimonials' && (
            <div className="space-y-6">
              <div className="border-b pb-3 mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-primary uppercase tracking-widest font-display">
                    {t('adminMatrimonialTitle')}
                  </h2>
                  <p className="text-xs text-gray-400 font-serif mt-0.5">
                    {t('adminMatrimonialSubtitle')}
                  </p>
                </div>
                <span className="text-[10px] font-mono text-gold uppercase font-bold tracking-wider flex items-center gap-1">
                  <Lock className="h-3 w-3" /> CONFIDENTIAL — ADMIN ONLY
                </span>
              </div>

              {store.matrimonials.length === 0 ? (
                <div className="p-12 text-center border-2 border-dashed border-gray-100 text-gray-400">
                  {t('adminNoMatrimonials')}
                </div>
              ) : (
                <div className="space-y-5">
                  {store.matrimonials.map(profile => {
                    const age = (() => {
                      if (!profile.dob) return null;
                      const d = new Date(profile.dob);
                      if (isNaN(d.getTime())) return null;
                      const diff = Date.now() - d.getTime();
                      return Math.floor(diff / (365.25 * 24 * 3600 * 1000));
                    })();
                    return (
                      <div key={profile.id} className={`p-6 border rounded-none relative ${
                        profile.status === 'New' ? 'border-gold bg-[#FCFAF7]' : 'border-gray-200 bg-white'
                      }`}>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 border-b border-gray-100 pb-3">
                          <div>
                            <h4 className="text-xs font-bold text-primary uppercase tracking-wide">
                              {profile.fullName}
                              <span className="ml-2 text-[9px] font-mono text-gray-400 normal-case tracking-normal">
                                {profile.gender === 'female' ? t('genderFemale') : t('genderMale')}
                                {age !== null ? ` • ${age} ${language === 'en' ? 'yrs' : 'વર્ષ'}` : ''}
                                {` • ${profile.maritalStatus}`}
                              </span>
                            </h4>
                            <span className="text-[9px] text-gray-400 font-mono">Ref: {profile.id} • {profile.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <select
                              value={profile.status}
                              onChange={e => store.updateMatrimonialStatus(profile.id, e.target.value as typeof profile.status)}
                              className="text-[10px] font-bold uppercase tracking-wider border border-gray-200 bg-white px-2 py-1.5 rounded-none focus:outline-none focus:border-gold cursor-pointer"
                            >
                              <option value="New">New</option>
                              <option value="Reviewed">Reviewed</option>
                              <option value="Matched">Matched</option>
                              <option value="Closed">Closed</option>
                            </select>
                            <button
                              onClick={() => {
                                if (window.confirm(language === 'en'
                                  ? `Permanently delete ${profile.fullName}'s matrimonial entry?`
                                  : `${profile.fullName} ની વિગત કાયમ માટે કાઢી નાખવી છે?`)) {
                                  store.deleteMatrimonial(profile.id);
                                }
                              }}
                              className="p-1.5 border border-red-200 text-red-600 hover:bg-red-50 cursor-pointer"
                              title="Delete entry"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-xs text-gray-600">
                          <p><span className="font-bold text-primary uppercase text-[10px] tracking-wide inline-block w-28">Phone:</span> {profile.phone || '—'}</p>
                          <p><span className="font-bold text-primary uppercase text-[10px] tracking-wide inline-block w-28">Village:</span> {profile.village || '—'}</p>
                          <p><span className="font-bold text-primary uppercase text-[10px] tracking-wide inline-block w-28">Education:</span> {profile.education || '—'}</p>
                          <p><span className="font-bold text-primary uppercase text-[10px] tracking-wide inline-block w-28">Occupation:</span> {profile.occupation || '—'}</p>
                          <p><span className="font-bold text-primary uppercase text-[10px] tracking-wide inline-block w-28">Guardian:</span> {profile.guardianName || '—'}</p>
                          <p><span className="font-bold text-primary uppercase text-[10px] tracking-wide inline-block w-28">Guardian Ph:</span> {profile.guardianPhone || '—'}</p>
                        </div>

                        {profile.about && (
                          <p className="text-xs text-gray-600 font-serif mt-3 italic leading-relaxed bg-white border p-3">
                            "{profile.about}"
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ActiveSubTab 4a3: JOB BOARD MODERATION (public postings) */}
          {activeSubTab === 'jobOpenings' && (
            <div className="space-y-6">
              <div className="border-b pb-3 mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-primary uppercase tracking-widest font-display">
                    {t('adminJobBoardTitle')}
                  </h2>
                  <p className="text-xs text-gray-400 font-serif mt-0.5">
                    {t('adminJobBoardSubtitle')}
                  </p>
                </div>
                <span className="text-[10px] font-mono text-gold uppercase font-bold tracking-wider">PUBLIC NOTICEBOARD</span>
              </div>

              {store.jobOpenings.length === 0 ? (
                <div className="p-12 text-center border-2 border-dashed border-gray-100 text-gray-400">
                  {t('adminNoJobs')}
                </div>
              ) : (
                <div className="space-y-5">
                  {store.jobOpenings.map(job => (
                    <div key={job.id} className={`p-6 border rounded-none relative ${
                      job.status === 'Open' ? 'border-gold bg-[#FCFAF7]' : 'border-gray-200 bg-gray-50/40'
                    }`}>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 border-b border-gray-100 pb-3">
                        <div>
                          <h4 className="text-xs font-bold text-primary uppercase tracking-wide">
                            {job.jobTitle}
                            <span className="ml-2 text-[9px] font-mono text-gray-400 normal-case tracking-normal">
                              {job.organisation ? `${job.organisation} • ` : ''}{job.jobType}
                            </span>
                          </h4>
                          <span className="text-[9px] text-gray-400 font-mono">Ref: {job.id} • {job.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            value={job.status}
                            onChange={e => store.updateJobOpeningStatus(job.id, e.target.value as typeof job.status)}
                            className="text-[10px] font-bold uppercase tracking-wider border border-gray-200 bg-white px-2 py-1.5 rounded-none focus:outline-none focus:border-gold cursor-pointer"
                          >
                            <option value="Open">Open (Live)</option>
                            <option value="Closed">Closed (Hidden)</option>
                          </select>
                          <button
                            onClick={() => {
                              if (window.confirm(language === 'en'
                                ? `Permanently delete the "${job.jobTitle}" posting?`
                                : `"${job.jobTitle}" જાહેરાત કાયમ માટે કાઢી નાખવી છે?`)) {
                                store.deleteJobOpening(job.id);
                              }
                            }}
                            className="p-1.5 border border-red-200 text-red-600 hover:bg-red-50 cursor-pointer"
                            title="Delete posting"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-xs text-gray-600">
                        <p><span className="font-bold text-primary uppercase text-[10px] tracking-wide inline-block w-28">Location:</span> {job.location || '—'}</p>
                        <p><span className="font-bold text-primary uppercase text-[10px] tracking-wide inline-block w-28">Salary:</span> {job.salary || '—'}</p>
                        <p><span className="font-bold text-primary uppercase text-[10px] tracking-wide inline-block w-28">Contact:</span> {job.contactPerson || '—'}</p>
                        <p><span className="font-bold text-primary uppercase text-[10px] tracking-wide inline-block w-28">Phone:</span> {job.contactPhone || '—'}</p>
                        <p><span className="font-bold text-primary uppercase text-[10px] tracking-wide inline-block w-28">Email:</span> {job.contactEmail || '—'}</p>
                      </div>

                      {job.description && (
                        <p className="text-xs text-gray-600 font-serif mt-3 italic leading-relaxed bg-white border p-3 whitespace-pre-line">
                          {job.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ActiveSubTab 4b: EDIT CONTACT DETAILS (single row, live for all) */}
          {activeSubTab === 'contactInfo' && (
            <div className="space-y-6">
              <div className="border-b pb-3 mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-primary uppercase tracking-widest font-display">
                    Public Contact Details
                  </h2>
                  <p className="text-xs text-gray-400 font-serif mt-0.5">
                    Office address, phone numbers, email and WhatsApp shown on the Contact page and footer. Edits go live for everyone instantly.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-gold uppercase font-bold tracking-wider">SITE-WIDE DETAILS</span>
              </div>

              {!store.contactInfo && (
                <div className="p-4 rounded-none bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span>No contact_info row found. Run <span className="font-mono font-bold">supabase/migration_contact_info.sql</span> in the Supabase SQL editor, then refresh.</span>
                </div>
              )}

              {ciSuccessMsg && (
                <div className="p-4 rounded-none bg-primary text-white border-l-4 border-gold text-xs font-serif flex items-center gap-2">
                  <Check className="h-4 w-4 text-gold" /> {ciSuccessMsg}
                </div>
              )}

              <form onSubmit={handleSaveContactInfo} className="p-6 border border-gray-150 bg-[#FCFAF7] space-y-4 relative">
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-gold"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">Office Address (English)</label>
                    <textarea
                      rows={2}
                      className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      placeholder="SSMWS Secretariat, ... Gujarat, 383001"
                      value={ciAddress}
                      onChange={e => setCiAddress(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">કાર્યાલય સરનામું (Gujarati)</label>
                    <textarea
                      rows={2}
                      className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      placeholder="SSMWS સચિવાલય, ... ગુજરાત"
                      value={ciAddressGu}
                      onChange={e => setCiAddressGu(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">Primary Phone</label>
                    <input
                      type="text"
                      className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      placeholder="+91 94261-XXXXX"
                      value={ciPhone1}
                      onChange={e => setCiPhone1(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">Secondary Phone</label>
                    <input
                      type="text"
                      className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      placeholder="+91 98980-XXXXX"
                      value={ciPhone2}
                      onChange={e => setCiPhone2(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">Email Address</label>
                    <input
                      type="email"
                      className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      placeholder="info@ssmws.org"
                      value={ciEmail}
                      onChange={e => setCiEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">WhatsApp Number (digits only)</label>
                    <input
                      type="text"
                      className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      placeholder="919426138382"
                      value={ciWhatsapp}
                      onChange={e => setCiWhatsapp(e.target.value)}
                    />
                    <p className="text-[9px] text-gray-400 mt-1 font-mono">Country code + number, no +, spaces or dashes. Builds the wa.me chat link.</p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!store.contactInfo}
                  className="px-8 py-3.5 bg-primary hover:bg-primary-dark text-white font-bold uppercase text-xs tracking-widest cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Contact Details
                </button>
              </form>
            </div>
          )}

          {/* ActiveSubTab 5: MANAGE BULLETINS */}
          {activeSubTab === 'bulletins' && (
            <div className="space-y-8">
              <div className="border-b pb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-primary uppercase tracking-widest font-display">
                    Manage Announcements
                  </h2>
                  <p className="text-xs text-gray-400 font-serif mt-0.5">
                    Instantly broadcast official society resolutions, deadlines and circular notes.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-gold uppercase font-bold tracking-wider">NOTICE BOARD GATEWAY</span>
              </div>

              {annSuccessMessage && (
                <div className="p-4 mb-4 rounded-none bg-primary text-white border-l-4 border-gold text-xs font-serif flex items-center gap-2">
                  <Check className="h-4 w-4 text-gold" /> {annSuccessMessage}
                </div>
              )}

              {/* Add Circular Notice Form */}
              <form onSubmit={handlePublishAnnouncement} className="p-6 border border-gray-150 rounded-none bg-[#FCFAF7] space-y-4 relative">
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-gold"></div>
                <h3 className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-1.5 border-b pb-2 font-display">
                  <Plus className="h-4 w-4 text-gold" /> {editingAnnouncementId ? 'Edit Selected Announcement Detail' : t('adminAddAnnouncement')}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">Title (English)*</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Scholarship forms deadline extended"
                      className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      value={annTitle}
                      onChange={e => setAnnTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">શીર્ષક (Gujarati ID)*</label>
                    <input
                      type="text"
                      placeholder="મુદ્દા પત્રક છેલ્લી તારીખ લંબાવી..."
                      className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      value={annTitleGu}
                      onChange={e => setAnnTitleGu(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">Category Category</label>
                    <select
                      className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      value={annCategory}
                      onChange={e => setAnnCategory(e.target.value as any)}
                    >
                      <option value="general">General (સામાન્ય)</option>
                      <option value="education">Education Support (શિક્ષણ)</option>
                      <option value="medical">Medical Help (દવા-સારવાર)</option>
                      <option value="event">Official Event (કાર્યક્રમ)</option>
                    </select>
                  </div>
                  <div className="flex items-center pt-6">
                    <input
                      type="checkbox"
                      id="input-bulletin-imp"
                      className="h-4 w-4 rounded-none border-gray-300 text-primary focus:ring-gold"
                      checked={annImportant}
                      onChange={e => setAnnImportant(e.target.checked)}
                    />
                    <label htmlFor="input-bulletin-imp" className="ml-2.5 text-xs font-bold text-red-650 block uppercase tracking-wide">
                      Mark as Urgent Notice (લાલ અક્ષર સૂચના)
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">Content descriptions (English)*</label>
                    <textarea
                      required
                      placeholder="Complete paragraph to show regarding this circular board update."
                      rows={3}
                      className="w-full text-xs p-3.5 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      value={annContent}
                      onChange={e => setAnnContent(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">સૂચનાની આખી વિગત (Gujarati)*</label>
                    <textarea
                      placeholder="ગુજરાતી ભાષામાં સંપૂર્ણ અહેવાલ જે વેબસાઈટ પર દર્શાવવો હોય."
                      rows={3}
                      className="w-full text-xs p-3.5 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      value={annContentGu}
                      onChange={e => setAnnContentGu(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    id="btn-bulletin-publish"
                    type="submit"
                    className="px-8 py-3.5 bg-primary hover:bg-primary-dark text-white font-bold uppercase text-xs tracking-widest cursor-pointer transition-colors"
                  >
                    {editingAnnouncementId ? 'Save Update Note' : 'Publish Live Bulletin'}
                  </button>
                  
                  {editingAnnouncementId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingAnnouncementId(null);
                        setAnnTitle('');
                        setAnnTitleGu('');
                        setAnnContent('');
                        setAnnContentGu('');
                        setAnnImportant(false);
                      }}
                      className="px-6 py-3.5 border border-gray-250 hover:bg-gray-50 text-gray-700 font-bold uppercase text-xs tracking-widest cursor-pointer transition-colors"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>

              {/* Active list with delete operations */}
              <div className="space-y-3 pt-4">
                <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em] font-display">Active Bulletins List</h3>
                {store.announcements.map(ann => (
                  <div key={ann.id} className="p-4 border rounded-none flex items-center justify-between gap-4 hover:border-gold transition-colors bg-white shadow-sm">
                    <div>
                      <h4 className="text-xs font-bold text-primary uppercase tracking-wide flex items-center gap-1.5">
                        {ann.important && <span className="bg-red-100 text-red-700 px-2.5 py-0.5 rounded-none font-bold text-[9px] uppercase">URGENT</span>}
                        {ann.title}
                      </h4>
                      <p className="text-[9px] text-[#D4AF37] font-mono mt-1 uppercase font-bold">ID: {ann.id} • Posted: {ann.date} • Cat: {ann.category}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        id={`btn-edit-ann-${ann.id}`}
                        onClick={() => {
                          setEditingAnnouncementId(ann.id);
                          setAnnTitle(ann.title);
                          setAnnTitleGu(ann.title_gu);
                          setAnnContent(ann.content);
                          setAnnContentGu(ann.content_gu);
                          setAnnCategory(ann.category);
                          setAnnImportant(ann.important);
                          window.scrollTo({ top: 350, behavior: 'smooth' });
                        }}
                        className="p-1.5 px-3.5 border border-gold text-gold hover:bg-gold/5 font-bold uppercase text-[10px] tracking-wider cursor-pointer flex items-center gap-1"
                        title="Edit Announcement"
                      >
                        <Edit className="h-3 w-3" /> Edit
                      </button>
                      <button
                        id={`btn-del-ann-${ann.id}`}
                        onClick={() => store.deleteAnnouncement(ann.id)}
                        className="p-1.5 px-3.5 border border-red-200 text-red-500 hover:bg-red-50 font-bold uppercase text-[10px] tracking-wider cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5 inline-block" /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ActiveSubTab 7: TRUSTEES MANAGEMENT */}
          {activeSubTab === 'trustees' && (
            <div className="space-y-8">
              <div className="border-b pb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-primary uppercase tracking-widest font-display">
                    Trustees Committee & Board Registry
                  </h2>
                  <p className="text-xs text-gray-400 font-serif mt-0.5">
                    Configure the active trustees of the Sunni Shafi Supreme Board. Update bios and phone numbers.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-gold uppercase font-bold tracking-wider">BOARD ROSTER</span>
              </div>

              {truSuccessMsg && (
                <div className="p-4 mb-4 rounded-none bg-primary text-white border-l-4 border-gold text-xs font-serif flex items-center gap-2">
                  <Check className="h-4 w-4 text-gold" /> {truSuccessMsg}
                </div>
              )}

              {/* Trustee Input/Edit Form */}
              <form onSubmit={handleSaveTrustee} className="p-6 border border-gray-150 rounded-none bg-[#FCFAF7] space-y-4 relative">
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-gold"></div>
                <h3 className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-1.5 border-b pb-2 font-display">
                  <Plus className="h-4 w-4 text-gold" /> {editingTrusteeId ? 'Edit Selected Trustee Bio' : 'Register New Board Trustee'}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">Trustee Name (English)*</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Haji Bashirbhai Momin"
                      className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      value={truName}
                      onChange={e => setTruName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">ટ્રસ્ટી નામ (Gujarati)*</label>
                    <input
                      type="text"
                      placeholder="હાજી બશીરભાઈ મોમીન..."
                      className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      value={truNameGu}
                      onChange={e => setTruNameGu(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">Region / Village (English)</label>
                    <input
                      type="text"
                      placeholder="e.g. Ilol Pahadiya"
                      className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      value={truRegion}
                      onChange={e => setTruRegion(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">ગામ / વિસ્તાર (Gujarati Region)</label>
                    <input
                      type="text"
                      placeholder="દા.ત. ઈલોલ પહાડીયા..."
                      className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      value={truRegionGu}
                      onChange={e => setTruRegionGu(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">Designation (English)</label>
                    <input
                      type="text"
                      placeholder="e.g. Honorable President / Vice President"
                      className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      value={truDesignation}
                      onChange={e => setTruDesignation(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">હોદ્દો (Gujarati Designation)</label>
                    <input
                      type="text"
                      placeholder="માનનીય પ્રમુખશ્રી / મંત્રીશ્રી..."
                      className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      value={truDesignationGu}
                      onChange={e => setTruDesignationGu(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">Photo Image URL</label>
                    <input
                      type="text"
                      placeholder="e.g. https://images.unsplash.com/..."
                      className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      value={truPhoto}
                      onChange={e => setTruPhoto(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">Phone Number Contact</label>
                    <input
                      type="text"
                      placeholder="e.g. +91 98765 43210"
                      className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      value={truPhone}
                      onChange={e => setTruPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">Bio Intro Brief (English)</label>
                    <textarea
                      placeholder="Brief introductory bio line..."
                      rows={2}
                      className="w-full text-xs p-3.5 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      value={truIntro}
                      onChange={e => setTruIntro(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">પરિચય (Gujarati Intro Brief)</label>
                    <textarea
                      placeholder="ટૂંક પરિચય કમિટી સભ્ય વિશે..."
                      rows={2}
                      className="w-full text-xs p-3.5 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      value={truIntroGu}
                      onChange={e => setTruIntroGu(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">Official Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. president@ssmws.org"
                    className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white max-w-sm"
                    value={truEmail}
                    onChange={e => setTruEmail(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-primary hover:bg-primary-dark text-white font-bold uppercase text-xs tracking-widest cursor-pointer"
                  >
                    {editingTrusteeId ? 'Save Trustee Updates' : 'Add Board Trustee'}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setEditingTrusteeId(null);
                      setTruName('');
                      setTruNameGu('');
                      setTruDesignation('');
                      setTruDesignationGu('');
                      setTruPhoto('');
                      setTruIntro('');
                      setTruIntroGu('');
                      setTruRegion('');
                      setTruRegionGu('');
                      setTruPhone('');
                      setTruEmail('');
                    }}
                    className="px-6 py-3.5 border border-gray-250 hover:bg-gray-50 text-gray-700 font-bold uppercase text-xs tracking-widest cursor-pointer"
                  >
                    Clear Slate
                  </button>
                </div>
              </form>

              {/* Current Trustees List with edit & delete controls */}
              <div className="space-y-4 pt-4">
                <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em] font-display">Active Trustees Board</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {store.trustees.map(tru => (
                    <div key={tru.id} className="p-4 border rounded-none bg-white flex gap-4 hover:border-gold transition-colors shadow-sm items-start">
                      <img
                        src={tru.photo}
                        alt={tru.name}
                        className="h-14 w-14 rounded-none object-cover border flex-shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-grow min-w-0">
                        <h4 className="text-xs font-bold text-primary uppercase tracking-wide truncate">{tru.name}</h4>
                        <p className="text-[10px] text-gold uppercase font-serif font-bold">{tru.region || tru.designation || '—'}</p>
                        <p className="text-[9px] text-[#D4AF37] font-mono mt-1">E: {tru.email || 'N/A'} • P: {tru.phone || 'N/A'}</p>
                        {tru.intro && <p className="text-[10px] text-gray-400 mt-1 line-clamp-1 italic">"{tru.intro}"</p>}
                        
                        <div className="flex gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingTrusteeId(tru.id);
                              setTruName(tru.name);
                              setTruNameGu(tru.name_gu || tru.name);
                              setTruDesignation(tru.designation);
                              setTruDesignationGu(tru.designation_gu || tru.designation);
                              setTruPhoto(tru.photo);
                              setTruIntro(tru.intro || '');
                              setTruIntroGu(tru.intro_gu || '');
                              setTruRegion(tru.region || '');
                              setTruRegionGu(tru.region_gu || '');
                              setTruPhone(tru.phone || '');
                              setTruEmail(tru.email || '');
                              window.scrollTo({ top: 350, behavior: 'smooth' });
                            }}
                            className="text-[9px] font-bold uppercase py-1 px-3 border border-gold hover:bg-gold/5 text-gold cursor-pointer"
                          >
                            Edit Bio
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm('Delete this trustee from public list?')) {
                                store.deleteTrustee(tru.id);
                              }
                            }}
                            className="text-[9px] font-bold uppercase py-1 px-3 border border-red-200 text-red-500 hover:bg-red-50 cursor-pointer"
                          >
                            Resign
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ActiveSubTab 8: WELFARE PROGRAMS MANAGEMENT */}
          {activeSubTab === 'activities' && (
            <div className="space-y-8">
              <div className="border-b pb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-primary uppercase tracking-widest font-display">
                    Welfare Activity Programs Editor
                  </h2>
                  <p className="text-xs text-gray-400 font-serif mt-0.5">
                    Modifies existing Welfare Schemes. You can customize descriptions, numbers indicator and success stories!
                  </p>
                </div>
                <span className="text-[10px] font-mono text-gold uppercase font-bold tracking-wider">SCHEME CONFIG</span>
              </div>

              {actSuccessMsg && (
                <div className="p-4 mb-4 rounded-none bg-primary text-white border-l-4 border-gold text-xs font-serif flex items-center gap-2">
                  <Check className="h-4 w-4 text-gold" /> {actSuccessMsg}
                </div>
              )}

              {/* Selector category */}
              <div className="p-5 bg-primary text-white border border-gold/40 relative">
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold"></div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-2 font-display">Select Program to Customize</label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {store.activities.map(act => (
                    <button
                      key={act.id}
                      type="button"
                      onClick={() => {
                        setSelectedActivityId(act.id);
                        setActTitle(act.title);
                        setActTitleGu(act.title_gu);
                        setActDesc(act.description);
                        setActDescGu(act.description_gu);
                        setActIcon(act.icon);
                        setActStats(act.stats);
                        setActStatsGu(act.stats_gu);
                        setStoryName(act.beneficiaryStory.name);
                        setStoryNameGu(act.beneficiaryStory.name_gu);
                        setStoryText(act.beneficiaryStory.story);
                        setStoryTextGu(act.beneficiaryStory.story_gu);
                        setStoryImpact(act.beneficiaryStory.impact);
                        setStoryImpactGu(act.beneficiaryStory.impact_gu);
                      }}
                      className={`px-3 py-2 text-[10px] font-bold uppercase border cursor-pointer transition-all ${
                        selectedActivityId === act.id 
                          ? 'bg-gold border-gold text-primary' 
                          : 'bg-white/5 border-white/10 hover:border-gold/50 text-gray-300'
                      }`}
                    >
                      {act.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form editing the chosen activity */}
              <form onSubmit={handleSaveActivity} className="p-6 border border-gray-150 rounded-none bg-[#FCFAF7] space-y-5 relative">
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-gold"></div>
                <h3 className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-1.5 border-b pb-2 font-display">
                  Configure details for: {actTitle || selectedActivityId}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">Program Title (English)*</label>
                    <input
                      type="text"
                      required
                      className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      value={actTitle}
                      onChange={e => setActTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">કાર્યક્રમ શીર્ષક (Gujarati)*</label>
                    <input
                      type="text"
                      required
                      className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      value={actTitleGu}
                      onChange={e => setActTitleGu(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">Statistics Metric (English)*</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 1500+ Students Helped"
                      className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      value={actStats}
                      onChange={e => setActStats(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">આંકડાકીય સિદ્ધિ વિગત (Gujarati stats descriptor)*</label>
                    <input
                      type="text"
                      required
                      placeholder="દા.ત. ૧૫૦૦+ વિદ્યાર્થીઓને સહાય"
                      className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      value={actStatsGu}
                      onChange={e => setActStatsGu(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">Lucide Icon ID</label>
                    <input
                      type="text"
                      className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      value={actIcon}
                      onChange={e => setActIcon(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">Program Description (English)*</label>
                    <textarea
                      required
                      rows={3}
                      className="w-full text-xs p-3.5 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      value={actDesc}
                      onChange={e => setActDesc(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">યોજના પૂર્ણા સરાંશ (Gujarati)*</label>
                    <textarea
                      required
                      rows={3}
                      className="w-full text-xs p-3.5 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      value={actDescGu}
                      onChange={e => setActDescGu(e.target.value)}
                    />
                  </div>
                </div>

                {/* Sub-group Beneficiary Success Story */}
                <div className="border-t pt-4 mt-6">
                  <h4 className="text-[11px] font-bold uppercase text-primary tracking-wider mb-3 flex items-center gap-2 font-display">
                     Beneficiary Success Story Spotlight
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-primary mb-1.5">Beneficiary Name (English)</label>
                      <input
                        type="text"
                        placeholder="e.g. Alimohammad Haji"
                        className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                        value={storyName}
                        onChange={e => setStoryName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-primary mb-1.5">લાભાર્થીનું નામ (Gujarati)</label>
                      <input
                        type="text"
                        placeholder="અલીમોહમ્મદ હાજી કે કોઈ અન્ય..."
                        className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                        value={storyNameGu}
                        onChange={e => setStoryNameGu(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-primary mb-1.5">The Narrative Impact Story (English)</label>
                      <textarea
                        rows={3}
                        placeholder="Detail about how SSMWS helped of grain/medical/relief..."
                        className="w-full text-xs p-3.5 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                        value={storyText}
                        onChange={e => setStoryText(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-primary mb-1.5">લાભાર્થી અનુભવ વાર્તા (Gujarati narrative)</label>
                      <textarea
                        rows={3}
                        placeholder="લાભાર્થીનો અનુભવ અને સમાજ દ્વારા મળેલી સેવા..."
                        className="w-full text-xs p-3.5 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                        value={storyTextGu}
                        onChange={e => setStoryTextGu(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-primary mb-1.5">Core Impact Accomplished (English)</label>
                      <input
                        type="text"
                        placeholder="e.g. Fully Funded Graduation"
                        className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                        value={storyImpact}
                        onChange={e => setStoryImpact(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-primary mb-1.5">મુખ્ય પરિવર્તન અસર (Gujarati core impact)</label>
                      <input
                        type="text"
                        placeholder="કોલેજ ડિગ્રી પૂર્ણ કરાવેલ શિક્ષણ સહાય..."
                        className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                        value={storyImpactGu}
                        onChange={e => setStoryImpactGu(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t">
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-primary hover:bg-primary-dark text-white font-bold uppercase text-xs tracking-widest cursor-pointer shadow"
                  >
                    Save Program Details
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ActiveSubTab 9: TALENT ACHIEVERS HONORS */}
          {activeSubTab === 'achievers' && (
            <div className="space-y-8">
              <div className="border-b pb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-primary uppercase tracking-widest font-display">
                    Talent Honors & Achievers Registry
                  </h2>
                  <p className="text-xs text-gray-400 font-serif mt-0.5">
                    Showcase young achievers, CA pass-out aspirants, and medical doctors of Sunni Sabarkantha.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-gold uppercase font-bold tracking-wider">TALENTS ROSTER</span>
              </div>

              {achSuccessMsg && (
                <div className="p-4 mb-4 rounded-none bg-primary text-white border-l-4 border-gold text-xs font-serif flex items-center gap-2">
                  <Check className="h-4 w-4 text-gold" /> {achSuccessMsg}
                </div>
              )}

              {/* Input Form */}
              <form onSubmit={handleSaveAchiever} className="p-6 border border-gray-150 rounded-none bg-[#FCFAF7] space-y-4 relative">
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-gold"></div>
                <h3 className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-1.5 border-b pb-2 font-display">
                  <Plus className="h-4 w-4 text-gold" /> {editingAchieverId ? 'Edit Selected Talent Details' : 'Register New Talent Achiever'}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">Achiever Name (English)*</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Sabir Momin"
                      className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      value={achName}
                      onChange={e => setAchName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">નામ (Gujarati)*</label>
                    <input
                      type="text"
                      placeholder="ડૉ. સાબીર મોમીન..."
                      className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      value={achNameGu}
                      onChange={e => setAchNameGu(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">Category category</label>
                    <select
                      className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      value={achCategory}
                      onChange={e => setAchCategory(e.target.value as any)}
                    >
                      <option value="doctor">Medical Doctor (તબીબી ડૉકટર)</option>
                      <option value="engineer">Software/Civil Engineer (એન્જિનિયર)</option>
                      <option value="ca">Chartered Accountant (સી.એ.)</option>
                      <option value="officer">Government Officer (સરકારી રજિસ્ટર્ડ અધિકારી)</option>
                      <option value="entrepreneur">Business Leader (વેપારી અગ્રણી)</option>
                      <option value="topper">Academic Topper (તેજસ્વી વિદ્યાર્થી)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">Designative Sub-label (English)*</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. MBBS Gold Medalist / CA Topper"
                      className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      value={achCatLabel}
                      onChange={e => setAchCatLabel(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">વિભાગ પેટા-હોદ્દો (Gujarati)*</label>
                    <input
                      type="text"
                      required
                      placeholder="દા.ત. એમબીબીએસ સુવર્ણચંદ્રક વિજેતા"
                      className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      value={achCatLabelGu}
                      onChange={e => setAchCatLabelGu(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">Core Achievements/Certificates (English)*</label>
                    <textarea
                      required
                      placeholder="e.g. Secured Rank 1 in State Level examinations..."
                      rows={2}
                      className="w-full text-xs p-3.5 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      value={achAchievement}
                      onChange={e => setAchAchievement(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">મેળવેલ મુખ્ય સિદ્ધિ (Gujarati)*</label>
                    <textarea
                      required
                      placeholder="મેળવેલ મુખ્ય પદ અથવા બોર્ડ રેન્ક સંબંધિત વિગતો..."
                      rows={2}
                      className="w-full text-xs p-3.5 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      value={achAchievementGu}
                      onChange={e => setAchAchievementGu(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">Motivational advice/Message (English)</label>
                    <textarea
                      placeholder="Words of encouragement to fellow students of Sabarkantha"
                      rows={2}
                      className="w-full text-xs p-3.5 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      value={achMessage}
                      onChange={e => setAchMessage(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">પ્રોત્સાહન સંદેશ (Gujarati)</label>
                    <textarea
                      placeholder="અન્ય વિદ્યાર્થીઓને પ્રેરણા આપતો નાનકડો ઉત્તેજક સંદેશ..."
                      rows={2}
                      className="w-full text-xs p-3.5 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      value={achMessageGu}
                      onChange={e => setAchMessageGu(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">Photo URL Path</label>
                    <input
                      type="text"
                      className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      value={achPhoto}
                      onChange={e => setAchPhoto(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1.5">Phone Number Contact</label>
                    <input
                      type="text"
                      className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      value={achPhone}
                      onChange={e => setAchPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-primary hover:bg-primary-dark text-white font-bold uppercase text-xs tracking-widest cursor-pointer"
                  >
                    {editingAchieverId ? 'Save Achievements Updates' : 'Add Register Achiever'}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setEditingAchieverId(null);
                      setAchName('');
                      setAchNameGu('');
                      setAchCategory('topper');
                      setAchCatLabel('Medical Specialist');
                      setAchCatLabelGu('તબીબી નિષ્ણાત');
                      setAchAchievement('');
                      setAchAchievementGu('');
                      setAchMessage('');
                      setAchMessageGu('');
                      setAchPhoto('');
                      setAchPhone('');
                    }}
                    className="px-6 py-3.5 border border-gray-250 hover:bg-gray-50 text-gray-700 font-bold uppercase text-xs tracking-widest cursor-pointer"
                  >
                    Clear Form
                  </button>
                </div>
              </form>

              {/* Achievers list */}
              <div className="space-y-3 pt-4">
                <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em] font-display">Active Achievers Board</h3>
                <div className="grid grid-cols-1 gap-3">
                  {store.achievers.map(ach => (
                    <div key={ach.id} className="p-4 border rounded-none flex items-start justify-between gap-4 hover:border-gold transition-colors bg-white shadow-sm font-sans">
                      <div className="flex gap-4 items-center">
                        <img
                          src={ach.photo}
                          alt={ach.name}
                          className="h-12 w-12 rounded-none object-cover border flex-shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-primary uppercase tracking-wide">
                            {ach.name} <span className="text-[9px] bg-gold/10 text-gold px-2 py-0.5 ml-2 font-mono">{ach.category_label}</span>
                          </h4>
                          <p className="text-[10px] text-gray-500 font-serif line-clamp-1 italic">"{ach.achievement}"</p>
                          <p className="text-[9px] text-[#D4AF37] font-mono uppercase mt-0.5">Category: {ach.category} • P: {ach.phone || 'N/A'}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingAchieverId(ach.id);
                            setAchName(ach.name);
                            setAchNameGu(ach.name_gu || ach.name);
                            setAchCategory(ach.category);
                            setAchCatLabel(ach.category_label);
                            setAchCatLabelGu(ach.category_label_gu || ach.category_label);
                            setAchAchievement(ach.achievement);
                            setAchAchievementGu(ach.achievement_gu || ach.achievement);
                            setAchMessage(ach.message || '');
                            setAchMessageGu(ach.message_gu || '');
                            setAchPhoto(ach.photo);
                            setAchPhone(ach.phone || '');
                            window.scrollTo({ top: 350, behavior: 'smooth' });
                          }}
                          className="p-1 px-3 border border-gold text-gold hover:bg-gold/5 font-bold uppercase text-[9px] tracking-wider cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm('Delete this talent star?')) {
                              store.deleteAchiever(ach.id);
                            }
                          }}
                          className="p-1 px-3 border border-red-200 text-red-500 hover:bg-red-50 font-bold uppercase text-[9px] tracking-wider cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ActiveSubTab 10: TESTIMONIALS MANAGER */}
          {activeSubTab === 'testimonials' && (
            <div className="space-y-6">
              <div className="border-b pb-3 mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-primary uppercase tracking-widest font-display">
                    Testimonials & Hope Stories
                  </h2>
                  <p className="text-xs text-gray-400 font-serif mt-0.5">
                    Manage the village success stories and hope write-ups showed on the home page.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-gold uppercase font-bold tracking-wider">HOPE PORTAL</span>
              </div>

              {/* Add / Edit Form */}
              <form onSubmit={handleTestimonialSubmit} className="p-6 border border-gray-150 bg-[#FCFAF7] space-y-4">
                <h3 className="text-xs font-bold text-primary uppercase tracking-wider">
                  {editingTestimonialId ? "Modify Testimonial Story" : "Register New Hope Quote"}
                </h3>
                {testSuccessMsg && <p className="text-xs text-emerald-600 font-bold bg-emerald-50 p-2 border border-emerald-200">{testSuccessMsg}</p>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-primary uppercase tracking-widest mb-1.5">Quote/Body (English)*</label>
                    <textarea
                      required
                      placeholder="My son has registered..."
                      rows={3}
                      className="w-full text-xs p-3 border border-gray-200 bg-white rounded-none outline-none focus:border-gold"
                      value={testQuote}
                      onChange={(e) => setTestQuote(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-primary uppercase tracking-widest mb-1.5">ગુજરાતી અનૂવાદ (Gujarati)*</label>
                    <textarea
                      required
                      placeholder="મારા પુત્ર એ રજીસ્ટ્રેશન..."
                      rows={3}
                      className="w-full text-xs p-3 border border-gray-200 bg-white rounded-none outline-none focus:border-gold"
                      value={testQuoteGu}
                      onChange={(e) => setTestQuoteGu(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-primary uppercase tracking-widest mb-1.5">Author Name (English)*</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sardar Momin's Mother"
                      className="w-full text-xs p-3 border border-gray-200 bg-white rounded-none outline-none focus:border-gold"
                      value={testAuthor}
                      onChange={(e) => setTestAuthor(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-primary uppercase tracking-widest mb-1.5">લેખકનું નામ (Gujarati)*</label>
                    <input
                      type="text"
                      required
                      placeholder="દા.ત. સરદાર મોમીનની માતા"
                      className="w-full text-xs p-3 border border-gray-200 bg-white rounded-none outline-none focus:border-gold"
                      value={testAuthorGu}
                      onChange={(e) => setTestAuthorGu(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-primary uppercase tracking-widest mb-1.5">Designation (English)</label>
                    <input
                      type="text"
                      placeholder="e.g. Sabarkantha Resident"
                      className="w-full text-xs p-3 border border-gray-200 bg-white rounded-none outline-none focus:border-gold"
                      value={testDesignation}
                      onChange={(e) => setTestDesignation(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-primary uppercase tracking-widest mb-1.5">હોદ્દો (Gujarati)</label>
                    <input
                      type="text"
                      placeholder="દા.ત. સાબરકાંઠા રહેવાસી"
                      className="w-full text-xs p-3 border border-gray-200 bg-white rounded-none outline-none focus:border-gold"
                      value={testDesignationGu}
                      onChange={(e) => setTestDesignationGu(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-primary uppercase tracking-widest mb-1.5">Avatar Initials (2 letters)</label>
                    <input
                      type="text"
                      maxLength={2}
                      placeholder="e.g. SM"
                      className="w-full text-xs p-3 border border-gray-200 bg-white rounded-none outline-none focus:border-gold"
                      value={testInitials}
                      onChange={(e) => setTestInitials(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-2 justify-end">
                  {editingTestimonialId && (
                    <button
                      type="button"
                      onClick={cancelTestimonialEdit}
                      className="px-4 py-2 border text-xs font-bold uppercase text-gray-500 hover:bg-gray-50 rounded-none cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary text-white font-bold text-xs uppercase tracking-wider rounded-none cursor-pointer"
                  >
                    {editingTestimonialId ? "Modify Testimonial" : "Register Testimonial"}
                  </button>
                </div>
              </form>

              {/* List */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-primary uppercase tracking-wider">Registered Testimonial Cards</h3>
                <div className="grid grid-cols-1 gap-4">
                  {store.testimonials.map(test => (
                    <div key={test.id} className="p-6 border border-gray-100 bg-white shadow-sm flex items-start justify-between gap-4 font-sans relative">
                      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-gold"></div>
                      <div className="flex-1 space-y-2">
                        <p className="text-xs text-gray-600 font-serif italic">"{test.quote}"</p>
                        {test.quote_gu && <p className="text-xs text-gray-400 font-serif italic">{test.quote_gu}</p>}
                        <div className="flex items-center gap-2 pt-2">
                          <span className="text-[10px] uppercase font-bold text-primary">{test.author} / {test.author_gu}</span>
                          <span className="text-[9px] bg-gold/10 text-gold px-2 py-0.5">{test.designation}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingTestimonialId(test.id);
                            setTestQuote(test.quote);
                            setTestQuoteGu(test.quote_gu || test.quote);
                            setTestAuthor(test.author);
                            setTestAuthorGu(test.author_gu || test.author);
                            setTestDesignation(test.designation || '');
                            setTestDesignationGu(test.designation_gu || '');
                            setTestInitials(test.avatarInitials || '');
                            window.scrollTo({ top: 350, behavior: 'smooth' });
                          }}
                          className="p-1 px-3 border border-gold text-gold hover:bg-gold/5 font-bold uppercase text-[9px] tracking-wider cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm('Delete this testimonial?')) {
                              store.deleteTestimonial(test.id);
                            }
                          }}
                          className="p-1 px-3 border border-red-200 text-red-500 hover:bg-red-50 font-bold uppercase text-[9px] tracking-wider cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ActiveSubTab 11: EVENT CALENDAR MANAGER */}
          {activeSubTab === 'upcomingEvents' && (
            <div className="space-y-6">
              <div className="border-b pb-3 mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-primary uppercase tracking-widest font-display">
                    Upcoming Village Events Calendar
                  </h2>
                  <p className="text-xs text-gray-400 font-serif mt-0.5">
                    Publish or modify emergency blood groupings, welfare kits distribution, and general village gatherings.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-gold uppercase font-bold tracking-wider">CALENDAR LEDGER</span>
              </div>

              {/* Add / Edit Form */}
              <form onSubmit={handleUpcomingEventSubmit} className="p-6 border border-gray-150 bg-[#FCFAF7] space-y-4">
                <h3 className="text-xs font-bold text-primary uppercase tracking-wider">
                  {editingEventId ? "Modify Calendar Event Details" : "Schedule New Village Campaign"}
                </h3>
                {evtSuccessMsg && <p className="text-xs text-emerald-600 font-bold bg-emerald-50 p-2 border border-emerald-200">{evtSuccessMsg}</p>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-primary uppercase tracking-widest mb-1.5">Event Title (English)*</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Free Eye Screening Camp"
                      className="w-full text-xs p-3 border border-gray-200 bg-white rounded-none outline-none focus:border-gold"
                      value={evtTitle}
                      onChange={(e) => setEvtTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-primary uppercase tracking-widest mb-1.5">કાર્યક્રમ શીર્ષક (Gujarati)*</label>
                    <input
                      type="text"
                      required
                      placeholder="દા.ત. નિઃશુલ્ક નેત્ર નિદાન કેમ્પ"
                      className="w-full text-xs p-3 border border-gray-200 bg-white rounded-none outline-none focus:border-gold"
                      value={evtTitleGu}
                      onChange={(e) => setEvtTitleGu(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-primary uppercase tracking-widest mb-1.5">Description (English)</label>
                    <textarea
                      placeholder="Core overview, timings, fully sponsored..."
                      rows={2}
                      className="w-full text-xs p-3 border border-gray-200 bg-white rounded-none outline-none focus:border-gold"
                      value={evtDesc}
                      onChange={(e) => setEvtDesc(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-primary uppercase tracking-widest mb-1.5">કાર્યક્રમ વિગત (Gujarati)</label>
                    <textarea
                      placeholder="સમય, મુખ્ય અતિથિ સંબંધિત ટૂંકી વિગતો..."
                      rows={2}
                      className="w-full text-xs p-3 border border-gray-200 bg-white rounded-none outline-none focus:border-gold"
                      value={evtDescGu}
                      onChange={(e) => setEvtDescGu(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-primary uppercase tracking-widest mb-1.5">Month (English)*</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. June"
                      className="w-full text-xs p-3 border border-gray-200 bg-white rounded-none outline-none focus:border-gold"
                      value={evtMonth}
                      onChange={(e) => setEvtMonth(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-primary uppercase tracking-widest mb-1.5">મહિનો (Gujarati)*</label>
                    <input
                      type="text"
                      required
                      placeholder="દા.ત. જૂન"
                      className="w-full text-xs p-3 border border-gray-200 bg-white rounded-none outline-none focus:border-gold"
                      value={evtMonthGu}
                      onChange={(e) => setEvtMonthGu(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-primary uppercase tracking-widest mb-1.5">Day Number (1-31)*</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 24"
                      className="w-full text-xs p-3 border border-gray-200 bg-white rounded-none outline-none focus:border-gold"
                      value={evtDay}
                      onChange={(e) => setEvtDay(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-primary uppercase tracking-widest mb-1.5">Category (English)*</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Medical Campaign"
                      className="w-full text-xs p-3 border border-gray-200 bg-white rounded-none outline-none focus:border-gold"
                      value={evtCategoryStr}
                      onChange={(e) => setEvtCategoryStr(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-1">
                    <label className="block text-[10px] font-bold text-primary uppercase tracking-widest mb-1.5">શ્રેણી (Gujarati)*</label>
                    <input
                      type="text"
                      required
                      placeholder="દા.ત. મેડિકલ ઝુંબેશ"
                      className="w-full text-xs p-3 border border-gray-200 bg-white rounded-none outline-none focus:border-gold"
                      value={evtCategoryStrGu}
                      onChange={(e) => setEvtCategoryStrGu(e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-[10px] font-bold text-primary uppercase tracking-widest mb-1.5">Venue Location (English)</label>
                    <input
                      type="text"
                      placeholder="e.g. Main SSMWS Hall"
                      className="w-full text-xs p-3 border border-gray-200 bg-white rounded-none outline-none focus:border-gold"
                      value={evtVenue}
                      onChange={(e) => setEvtVenue(e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-[10px] font-bold text-primary uppercase tracking-widest mb-1.5">સ્થળ (Gujarati)</label>
                    <input
                      type="text"
                      placeholder="દા.ત. મુખ્ય એસ.એસ.એમ.ડબલ્યુ.એસ હોલ"
                      className="w-full text-xs p-3 border border-gray-200 bg-white rounded-none outline-none focus:border-gold"
                      value={evtVenueGu}
                      onChange={(e) => setEvtVenueGu(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-2 justify-end">
                  {editingEventId && (
                    <button
                      type="button"
                      onClick={cancelUpcomingEventEdit}
                      className="px-4 py-2 border text-xs font-bold uppercase text-gray-500 hover:bg-gray-50 rounded-none cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary text-white font-bold text-xs uppercase tracking-wider rounded-none cursor-pointer"
                  >
                    {editingEventId ? "Modify Event Info" : "Publish Scheduled Campaign"}
                  </button>
                </div>
              </form>

              {/* List */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-primary uppercase tracking-wider">Scheduled Calendar Briefing Cards</h3>
                <div className="grid grid-cols-1 gap-4">
                  {store.upcomingEvents.map(evt => (
                    <div key={evt.id} className="p-6 border border-gray-100 bg-white shadow-sm flex items-start justify-between gap-4 font-sans relative">
                      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-gold"></div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] bg-primary/10 text-primary px-2 font-bold py-0.5 uppercase">{evt.category} / {evt.category_gu}</span>
                          <span className="text-[10px] text-gray-400 font-bold">{evt.month} {evt.day} ({evt.month_gu})</span>
                        </div>
                        <h4 className="text-xs font-bold text-primary uppercase">{evt.title} / {evt.title_gu}</h4>
                        <p className="text-xs text-gray-550 font-serif leading-relaxed">{evt.description}</p>
                        {evt.venue && <p className="text-[10px] text-gray-400 font-mono">📍 Location: {evt.venue} / {evt.venue_gu}</p>}
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingEventId(evt.id);
                            setEvtTitle(evt.title);
                            setEvtTitleGu(evt.title_gu || evt.title);
                            setEvtDesc(evt.description || '');
                            setEvtDescGu(evt.description_gu || '');
                            setEvtMonth(evt.month);
                            setEvtMonthGu(evt.month_gu || evt.month);
                            setEvtDay(evt.day);
                            setEvtCategoryStr(evt.category);
                            setEvtCategoryStrGu(evt.category_gu || evt.category);
                            setEvtVenue(evt.venue || '');
                            setEvtVenueGu(evt.venue_gu || '');
                            window.scrollTo({ top: 350, behavior: 'smooth' });
                          }}
                          className="p-1 px-3 border border-gold text-gold hover:bg-gold/5 font-bold uppercase text-[9px] tracking-wider cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm('Delete this event?')) {
                              store.deleteUpcomingEvent(evt.id);
                            }
                          }}
                          className="p-1 px-3 border border-red-200 text-red-500 hover:bg-red-50 font-bold uppercase text-[9px] tracking-wider cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
