import React, { useState } from 'react';
import { useLanguage } from '../i18n';
import { useStore } from '../dbState';
import {
  Lock, Check, AlertCircle,
  Trash2, Plus, Mail,
  Users, Megaphone,
  Award, Briefcase, Edit, Heart
} from 'lucide-react';

interface AdminPanelProps {
  isAdminLoggedIn: boolean;
}

type SubTab = 'members' | 'contacts' | 'matrimonials' | 'jobOpenings' | 'donations' | 'contactInfo' | 'bulletins' | 'trustees';

export default function AdminPanel({ isAdminLoggedIn }: AdminPanelProps) {
  const { t, language } = useLanguage();
  const store = useStore();

  // Authentication Fields (real Supabase email/password auth)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // Tab View
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('members');

  // Announcement Form State
  const [editingAnnouncementId, setEditingAnnouncementId] = useState<string | null>(null);
  const [annTitle, setAnnTitle] = useState('');
  const [annTitleGu, setAnnTitleGu] = useState('');
  const [annCategory, setAnnCategory] = useState<'education' | 'medical' | 'event' | 'general'>('general');
  const [annContent, setAnnContent] = useState('');
  const [annContentGu, setAnnContentGu] = useState('');
  const [annImportant, setAnnImportant] = useState(false);
  const [annSuccessMessage, setAnnSuccessMessage] = useState('');

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
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D29B02] mb-1.5">{t('adminUser')}</label>
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
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D29B02] mb-1.5">{t('adminPass')}</label>
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
  const pendingMembCount = store.memberships.filter(m => m.status === 'Pending').length;
  const newMatrimonialCount = store.matrimonials.filter(m => m.status === 'New').length;
  const openJobsCount = store.jobOpenings.filter(j => j.status === 'Open').length;
  const pendingDonationCount = store.donations.filter(d => d.status === 'Pending').length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-10 font-sans">
      
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        
        {/* Left Hand: Commands Sub Sidebar */}
        <aside className="w-full lg:w-72 space-y-2 lg:sticky lg:top-8 flex-shrink-0">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-2">Registries & Ledgers</h3>

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
              ? <span className="bg-[#D29B02] text-primary font-bold px-2 py-0.5 rounded-none text-[9px]">{newMatrimonialCount}</span>
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
              ? <span className="bg-[#D29B02] text-primary font-bold px-2 py-0.5 rounded-none text-[9px]">{openJobsCount}</span>
              : <span className="text-gray-400 font-mono text-[9px]">({store.jobOpenings.length})</span>}
          </button>

          <button
            id="subtab-donations"
            onClick={() => setActiveSubTab('donations')}
            className={`w-full text-left px-4 py-3 rounded-none text-xs font-bold uppercase tracking-wider flex items-center justify-between border cursor-pointer transition-all ${
              activeSubTab === 'donations'
                ? 'bg-primary text-white border-primary shadow-sm'
                : 'bg-white border-gray-150 text-gray-500 hover:border-gold hover:text-primary'
            }`}
          >
            <span className="flex items-center gap-2"><Heart className="h-4 w-4 text-gold" /> Donations Ledger</span>
            {pendingDonationCount > 0
              ? <span className="bg-[#D29B02] text-primary font-bold px-2 py-0.5 rounded-none text-[9px]">{pendingDonationCount}</span>
              : <span className="text-gray-400 font-mono text-[9px]">({store.donations.length})</span>}
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

        </aside>

        {/* Right Hand: Active Panel View Workspace */}
        <main className="flex-grow bg-white border border-gray-100 rounded-sm p-6 md:p-8 shadow-sm relative">
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-gold"></div>
          
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
                        <th className="p-4 border-b border-gray-150">Membership</th>
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
                          <td className="p-4">
                            <span className="text-[9px] font-bold uppercase px-2.5 py-0.5 rounded-none font-mono bg-primary/10 text-primary">
                              {m.membershipType === 'lifetime' ? 'Lifetime · ₹2,500' : 'Annual · ₹100'}
                            </span>
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
                            {job.organisation && (
                              <span className="ml-2 text-[9px] font-mono text-gray-400 normal-case tracking-normal">
                                {job.organisation}
                              </span>
                            )}
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
                        <p><span className="font-bold text-primary uppercase text-[10px] tracking-wide inline-block w-28">Salary:</span> {job.salary || '—'}</p>
                        <p><span className="font-bold text-primary uppercase text-[10px] tracking-wide inline-block w-28">Contact:</span> {job.contactPerson || '—'}</p>
                        <p><span className="font-bold text-primary uppercase text-[10px] tracking-wide inline-block w-28">Phone:</span> {job.contactPhone || '—'}</p>
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

          {/* ActiveSubTab 4c: DONATIONS LEDGER (donor details + verification) */}
          {activeSubTab === 'donations' && (
            <div className="space-y-6">
              <div className="border-b pb-3 mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-primary uppercase tracking-widest font-display">
                    Donations Ledger
                  </h2>
                  <p className="text-xs text-gray-400 font-serif mt-0.5">
                    Every reported contribution with donor details. Verify a pending entry to publish it on the public transparency ledger.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-gold uppercase font-bold tracking-wider">AUDIT TRAIL</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 border border-gray-150 bg-[#FCFAF7]">
                  <span className="block text-[9px] font-bold text-gold uppercase tracking-wider">Total Reported</span>
                  <span className="text-lg font-extrabold text-primary font-display mt-1 block">
                    ₹{store.donations.reduce((acc, d) => acc + d.amount, 0).toLocaleString()}
                  </span>
                </div>
                <div className="p-4 border border-gray-150 bg-[#FCFAF7]">
                  <span className="block text-[9px] font-bold text-gold uppercase tracking-wider">Verified</span>
                  <span className="text-lg font-extrabold text-emerald-700 font-display mt-1 block">
                    ₹{store.donations.filter(d => d.status === 'Verified').reduce((acc, d) => acc + d.amount, 0).toLocaleString()}
                  </span>
                </div>
                <div className="p-4 border border-gray-150 bg-[#FCFAF7]">
                  <span className="block text-[9px] font-bold text-gold uppercase tracking-wider">Pending Review</span>
                  <span className="text-lg font-extrabold text-amber-700 font-display mt-1 block">{pendingDonationCount}</span>
                </div>
              </div>

              {store.donations.length === 0 ? (
                <p className="p-12 text-center border-2 border-dashed border-gray-100 text-gray-400">
                  No donations reported yet.
                </p>
              ) : (
                <div className="overflow-x-auto border border-gray-150">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-primary text-white uppercase font-bold text-[9px] tracking-widest">
                        <th className="p-4 border-b border-gray-150">Donor</th>
                        <th className="p-4 border-b border-gray-150">Category</th>
                        <th className="p-4 border-b border-gray-150">Reference No.</th>
                        <th className="p-4 border-b border-gray-150">Date</th>
                        <th className="p-4 border-b border-gray-150 text-right">Amount</th>
                        <th className="p-4 border-b border-gray-150">Status</th>
                        <th className="p-4 border-b border-gray-150 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {store.donations.map(d => (
                        <tr key={d.id} className="hover:bg-zinc-50 font-sans">
                          <td className="p-4">
                            <span className="font-bold text-primary block uppercase text-[11px] tracking-wide">{d.donorName}</span>
                          </td>
                          <td className="p-4 font-serif text-gray-600">{d.category || '—'}</td>
                          <td className="p-4 font-mono text-gray-500">{d.referenceNo || '—'}</td>
                          <td className="p-4 font-mono text-gray-500">{d.date}</td>
                          <td className="p-4 text-right font-mono font-extrabold text-primary text-sm">₹{d.amount.toLocaleString()}</td>
                          <td className="p-4">
                            <span className={`text-[9px] font-bold uppercase px-2.5 py-0.5 rounded-none font-mono ${
                              d.status === 'Verified'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {d.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            {d.status === 'Pending' ? (
                              <button
                                onClick={() => store.verifyDonation(d.id)}
                                className="p-1 px-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold uppercase text-[10px] tracking-wider cursor-pointer"
                                title="Verify and publish to public ledger"
                              >
                                ✔ Verify
                              </button>
                            ) : (
                              <span className="text-[9px] text-gray-400 italic uppercase font-mono tracking-widest">PUBLISHED</span>
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
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D29B02] mb-1.5">Office Address (English)</label>
                    <textarea
                      rows={2}
                      className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      placeholder="AMENA HIGH SCHOOL, Panpur, Savgadh, Gujarat 383002"
                      value={ciAddress}
                      onChange={e => setCiAddress(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D29B02] mb-1.5">કાર્યાલય સરનામું (Gujarati)</label>
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
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D29B02] mb-1.5">Primary Phone</label>
                    <input
                      type="text"
                      className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      placeholder="+91 94261-XXXXX"
                      value={ciPhone1}
                      onChange={e => setCiPhone1(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D29B02] mb-1.5">Secondary Phone</label>
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
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D29B02] mb-1.5">Email Address</label>
                    <input
                      type="email"
                      className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      placeholder="info@ssmws.org"
                      value={ciEmail}
                      onChange={e => setCiEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D29B02] mb-1.5">WhatsApp Number (digits only)</label>
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
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D29B02] mb-1.5">Title (English)*</label>
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
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D29B02] mb-1.5">શીર્ષક (Gujarati ID)*</label>
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
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D29B02] mb-1.5">Category Category</label>
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
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D29B02] mb-1.5">Content descriptions (English)*</label>
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
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D29B02] mb-1.5">સૂચનાની આખી વિગત (Gujarati)*</label>
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
                <h3 className="text-xs font-bold text-[#D29B02] uppercase tracking-[0.2em] font-display">Active Bulletins List</h3>
                {store.announcements.map(ann => (
                  <div key={ann.id} className="p-4 border rounded-none flex items-center justify-between gap-4 hover:border-gold transition-colors bg-white shadow-sm">
                    <div>
                      <h4 className="text-xs font-bold text-primary uppercase tracking-wide flex items-center gap-1.5">
                        {ann.important && <span className="bg-red-100 text-red-700 px-2.5 py-0.5 rounded-none font-bold text-[9px] uppercase">URGENT</span>}
                        {ann.title}
                      </h4>
                      <p className="text-[9px] text-[#D29B02] font-mono mt-1 uppercase font-bold">ID: {ann.id} • Posted: {ann.date} • Cat: {ann.category}</p>
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
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D29B02] mb-1.5">Trustee Name (English)*</label>
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
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D29B02] mb-1.5">ટ્રસ્ટી નામ (Gujarati)*</label>
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
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D29B02] mb-1.5">Region / Village (English)</label>
                    <input
                      type="text"
                      placeholder="e.g. Ilol Pahadiya"
                      className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      value={truRegion}
                      onChange={e => setTruRegion(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D29B02] mb-1.5">ગામ / વિસ્તાર (Gujarati Region)</label>
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
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D29B02] mb-1.5">Designation (English)</label>
                    <input
                      type="text"
                      placeholder="e.g. Honorable President / Vice President"
                      className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      value={truDesignation}
                      onChange={e => setTruDesignation(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D29B02] mb-1.5">હોદ્દો (Gujarati Designation)</label>
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
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D29B02] mb-1.5">Photo Image URL</label>
                    <input
                      type="text"
                      placeholder="e.g. https://images.unsplash.com/..."
                      className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      value={truPhoto}
                      onChange={e => setTruPhoto(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D29B02] mb-1.5">Phone Number Contact</label>
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
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D29B02] mb-1.5">Bio Intro Brief (English)</label>
                    <textarea
                      placeholder="Brief introductory bio line..."
                      rows={2}
                      className="w-full text-xs p-3.5 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-white"
                      value={truIntro}
                      onChange={e => setTruIntro(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D29B02] mb-1.5">પરિચય (Gujarati Intro Brief)</label>
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
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D29B02] mb-1.5">Official Email Address</label>
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
                <h3 className="text-xs font-bold text-[#D29B02] uppercase tracking-[0.2em] font-display">Active Trustees Board</h3>
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
                        <p className="text-[9px] text-[#D29B02] font-mono mt-1">E: {tru.email || 'N/A'} • P: {tru.phone || 'N/A'}</p>
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

        </main>
      </div>

    </div>
  );
}
