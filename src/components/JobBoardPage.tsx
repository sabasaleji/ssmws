import React, { useState } from 'react';
import { useLanguage } from '../i18n';
import { useStore } from '../dbState';
import {
  Briefcase, Phone, MessageCircle, Building2,
  Banknote, Plus, X, Check, ShieldAlert
} from 'lucide-react';

// Build a wa.me link from a free-text phone number (strip everything but digits,
// the same approach the Footer/Contact page use for the office WhatsApp).
const waLink = (phone: string) => `https://wa.me/${phone.replace(/[^0-9]/g, '')}`;

export default function JobBoardPage() {
  const { t } = useLanguage();
  const store = useStore();

  // Only ever show live ('Open') postings — admins also load 'Closed' rows.
  const openJobs = store.jobOpenings.filter(j => j.status === 'Open');

  const [showForm, setShowForm] = useState(false);

  const [jobTitle, setJobTitle] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [description, setDescription] = useState('');
  const [salary, setSalary] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const resetForm = () => {
    setJobTitle('');
    setOrganisation('');
    setDescription('');
    setSalary('');
    setContactPerson('');
    setContactPhone('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await store.addJobOpening({
      jobTitle,
      organisation,
      description,
      salary,
      contactPerson,
      contactPhone,
    });
    setSubmitting(false);
    resetForm();
    setShowForm(false);
    setSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setSuccess(false), 8000);
  };

  const inputClass =
    'w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-[#FCFAF7]';
  const labelClass =
    'block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5';

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-12 bg-bg-warm font-sans">

      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs uppercase font-bold text-gold tracking-[0.25em] block">{t('jobBoardEyebrow')}</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-primary font-display uppercase tracking-tight text-center animate-fade-in">
          {t('jobBoardTitle')}
        </h1>
        <p className="text-xs text-gray-500 font-serif leading-relaxed max-w-lg mx-auto">
          {t('jobBoardSubtitle')}
        </p>
        <div className="h-0.5 w-12 bg-gold mx-auto mt-2"></div>
      </div>

      {success && (
        <div className="max-w-2xl mx-auto p-4 rounded-sm bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-serif flex items-center gap-2">
          <Check className="h-4 w-4 text-emerald-600 flex-shrink-0" />
          <span>{t('jobBoardSuccess')}</span>
        </div>
      )}

      {/* Post a job — toggle button + collapsible form */}
      <div className="max-w-3xl mx-auto">
        <button
          id="btn-job-toggle-form"
          onClick={() => setShowForm(v => !v)}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary hover:bg-primary-dark text-white font-bold uppercase text-xs tracking-widest cursor-pointer transition-colors"
        >
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? t('jobBoardPostClose') : t('jobBoardPostBtn')}
        </button>

        {showForm && (
          <div className="mt-6 bg-white border border-gray-100 rounded-sm p-6 md:p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-xs font-bold text-primary uppercase tracking-[0.15em] border-b pb-2 font-display">
                {t('jobFormHeading')}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>{t('jobFormTitle')}*</label>
                  <input id="job-inp-title" type="text" required className={inputClass}
                    value={jobTitle} onChange={e => setJobTitle(e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>{t('jobFormOrg')}</label>
                  <input type="text" className={inputClass}
                    value={organisation} onChange={e => setOrganisation(e.target.value)} />
                </div>
              </div>

              <div>
                <label className={labelClass}>{t('jobFormSalary')}</label>
                <input type="text" className={inputClass} placeholder={t('jobFormSalaryPlaceholder')}
                  value={salary} onChange={e => setSalary(e.target.value)} />
              </div>

              <div>
                <label className={labelClass}>{t('jobFormDescription')}</label>
                <textarea rows={4} className={inputClass}
                  placeholder={t('jobFormDescPlaceholder')}
                  value={description} onChange={e => setDescription(e.target.value)} />
              </div>

              <h3 className="text-xs font-bold text-primary uppercase tracking-[0.15em] border-b pb-2 font-display pt-2">
                {t('jobCardContact')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>{t('jobFormContactPerson')}</label>
                  <input type="text" className={inputClass}
                    value={contactPerson} onChange={e => setContactPerson(e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>{t('jobFormContactPhone')}*</label>
                  <input id="job-inp-phone" type="tel" required className={inputClass}
                    placeholder="+91 XXXXX-XXXXX"
                    value={contactPhone} onChange={e => setContactPhone(e.target.value)} />
                </div>
              </div>

              {/* Reminder that the contact details become publicly visible. */}
              <div className="p-3.5 rounded-sm bg-[#FCFAF7] border-l-4 border-gold flex items-start gap-2.5">
                <ShieldAlert className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-gray-500 font-serif leading-relaxed">{t('jobBoardDisclaimer')}</p>
              </div>

              <button
                id="btn-job-submit"
                type="submit"
                disabled={submitting}
                className="px-8 py-3.5 bg-gold hover:bg-yellow-600 text-primary font-bold uppercase text-xs tracking-widest cursor-pointer transition-colors disabled:opacity-60"
              >
                {submitting ? t('submitting') : t('jobFormSubmit')}
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Current openings */}
      <div className="space-y-6">
        <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] font-display flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-gold" /> {t('jobBoardOpenings')}
          <span className="text-gray-400 font-mono text-[11px] normal-case tracking-normal">({openJobs.length})</span>
        </h2>

        {openJobs.length === 0 ? (
          <div className="p-12 text-center border-2 border-dashed border-gray-100 text-gray-400 text-xs font-serif">
            {t('jobBoardEmpty')}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {openJobs.map(job => (
              <div key={job.id} className="border border-gray-100 bg-white rounded-none shadow-sm hover:border-gold transition-colors duration-150 flex flex-col">
                <div className="p-6 space-y-4 flex-grow">
                  <div className="space-y-1">
                    <h3 className="text-sm font-extrabold uppercase tracking-wide text-primary font-display leading-snug">
                      {job.jobTitle}
                    </h3>
                    {job.organisation && (
                      <p className="text-[11px] text-gray-500 font-serif flex items-center gap-1.5">
                        <Building2 className="h-3.5 w-3.5 text-gold" /> {job.organisation}
                      </p>
                    )}
                  </div>

                  {job.salary && (
                    <div className="text-[11px] text-gray-500 font-mono">
                      <span className="flex items-center gap-1.5"><Banknote className="h-3.5 w-3.5 text-gold" /> {job.salary}</span>
                    </div>
                  )}

                  {job.description && (
                    <p className="text-xs text-gray-600 font-serif leading-relaxed whitespace-pre-line border-l-2 border-gold/40 pl-3">
                      {job.description}
                    </p>
                  )}
                </div>

                {/* Contact the employer directly */}
                <div className="p-6 pt-4 border-t border-gray-100 bg-[#FCFAF7] space-y-3">
                  <div className="flex items-center justify-between text-[9px] text-gray-400 font-mono uppercase tracking-wider">
                    <span>{t('jobCardPostedBy')}: {job.contactPerson || job.organisation || '—'}</span>
                    <span>{t('jobCardPostedOn')} {job.date}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {job.contactPhone && (
                      <>
                        <a
                          href={`tel:${job.contactPhone}`}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-primary hover:bg-primary-dark text-white text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-colors"
                        >
                          <Phone className="h-3.5 w-3.5" /> {t('jobCardCall')}
                        </a>
                        <a
                          href={waLink(job.contactPhone)}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-colors"
                        >
                          <MessageCircle className="h-3.5 w-3.5" /> {t('jobCardWhatsApp')}
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Safety disclaimer */}
      <div className="max-w-3xl mx-auto p-5 border border-gray-100 bg-white shadow-sm rounded-sm flex gap-3">
        <ShieldAlert className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
        <p className="text-[11px] text-gray-500 font-serif leading-relaxed">{t('jobBoardDisclaimer')}</p>
      </div>

    </div>
  );
}
