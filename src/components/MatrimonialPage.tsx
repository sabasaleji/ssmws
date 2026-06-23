import React, { useState } from 'react';
import { useLanguage } from '../i18n';
import { useStore } from '../dbState';
import { VILLAGES } from '../villages';
import { Heart, ShieldCheck, Lock, Check, EyeOff } from 'lucide-react';

export default function MatrimonialPage() {
  const { t, language } = useLanguage();
  const store = useStore();

  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [dob, setDob] = useState('');
  const [maritalStatus, setMaritalStatus] = useState<'single' | 'divorced' | 'widowed'>('single');
  const [education, setEducation] = useState('');
  const [occupation, setOccupation] = useState('');
  const [villageSelect, setVillageSelect] = useState('');
  const [villageOther, setVillageOther] = useState('');
  const [phone, setPhone] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [about, setAbout] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const resetForm = () => {
    setFullName('');
    setGender('male');
    setDob('');
    setMaritalStatus('single');
    setEducation('');
    setOccupation('');
    setVillageSelect('');
    setVillageOther('');
    setPhone('');
    setGuardianName('');
    setGuardianPhone('');
    setAbout('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const village = villageSelect === 'other' ? villageOther : villageSelect;
    await store.addMatrimonial({
      fullName,
      gender,
      dob,
      maritalStatus,
      education,
      occupation,
      village,
      phone,
      guardianName,
      guardianPhone,
      about,
    });
    setSubmitting(false);
    resetForm();
    setSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setSuccess(false), 8000);
  };

  const inputClass =
    'w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-[#FCFAF7]';
  const labelClass =
    'block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5';

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-16 bg-bg-warm font-sans">

      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-primary font-display uppercase tracking-tight text-center animate-fade-in">
          {t('matrimonialTitle')}
        </h1>
        <div className="h-0.5 w-12 bg-gold mx-auto mt-2"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

        {/* Left Side: Form Panel */}
        <div className="lg:col-span-8 bg-white border border-gray-100 rounded-sm p-6 md:p-8 shadow-sm space-y-8">

          {/* Confidentiality banner — front and centre */}
          <div className="p-4 rounded-sm bg-primary text-white border-l-4 border-gold flex items-start gap-3">
            <EyeOff className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
            <p className="text-xs font-serif leading-relaxed">{t('matrimonialPrivacyNote')}</p>
          </div>

          {success && (
            <div className="p-4 rounded-sm bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-serif flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-600" />
              <span>{t('matrimonialSuccess')}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            <h3 className="text-xs font-bold text-primary uppercase tracking-[0.15em] border-b pb-2 font-display">
              {t('matrimonialFormHeading')}
            </h3>

            {/* Personal */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>{t('formFullName')}*</label>
                <input id="mat-inp-name" type="text" required className={inputClass}
                  value={fullName} onChange={e => setFullName(e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>{t('formPhone')}*</label>
                <input id="mat-inp-phone" type="tel" required className={inputClass}
                  placeholder="+91 XXXXX-XXXXX"
                  value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className={labelClass}>{t('formGender')}*</label>
                <select className={inputClass} value={gender}
                  onChange={e => setGender(e.target.value as 'male' | 'female')}>
                  <option value="male">{t('genderMale')}</option>
                  <option value="female">{t('genderFemale')}</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>{t('formDOB')}*</label>
                <input type="date" required className={`${inputClass} block text-gray-600`}
                  value={dob} onChange={e => setDob(e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>{t('matrimonialMaritalStatus')}*</label>
                <select className={inputClass} value={maritalStatus}
                  onChange={e => setMaritalStatus(e.target.value as 'single' | 'divorced' | 'widowed')}>
                  <option value="single">{t('matrimonialStatusSingle')}</option>
                  <option value="divorced">{t('matrimonialStatusDivorced')}</option>
                  <option value="widowed">{t('matrimonialStatusWidowed')}</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className={labelClass}>{t('matrimonialEducation')}</label>
                <input type="text" className={inputClass} placeholder="e.g. B.Com, MBBS"
                  value={education} onChange={e => setEducation(e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>{t('formOccupation')}</label>
                <input type="text" className={inputClass} placeholder="e.g. Teacher, Business"
                  value={occupation} onChange={e => setOccupation(e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>{t('matrimonialVillage')}</label>
                <select className={inputClass} value={villageSelect}
                  onChange={e => setVillageSelect(e.target.value)}>
                  <option value="">{t('matrimonialSelectVillage')}</option>
                  {VILLAGES.map(v => (
                    <option key={v.id} value={v.en}>{language === 'gu' ? v.gu : v.en}</option>
                  ))}
                  <option value="other">{t('matrimonialVillageOther')}</option>
                </select>
              </div>
            </div>

            {villageSelect === 'other' && (
              <div>
                <label className={labelClass}>{t('matrimonialVillageOtherLabel')}</label>
                <input type="text" className={inputClass}
                  placeholder={t('matrimonialVillageOtherLabel')}
                  value={villageOther} onChange={e => setVillageOther(e.target.value)} />
              </div>
            )}

            {/* Family / guardian contact */}
            <h3 className="text-xs font-bold text-primary uppercase tracking-[0.15em] border-b pb-2 font-display pt-2">
              {t('matrimonialGuardianHeading')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>{t('matrimonialGuardianName')}</label>
                <input type="text" className={inputClass}
                  value={guardianName} onChange={e => setGuardianName(e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>{t('matrimonialGuardianPhone')}</label>
                <input type="tel" className={inputClass} placeholder="+91 XXXXX-XXXXX"
                  value={guardianPhone} onChange={e => setGuardianPhone(e.target.value)} />
              </div>
            </div>

            <div>
              <label className={labelClass}>{t('matrimonialAbout')}</label>
              <textarea rows={3} className={inputClass}
                placeholder={t('matrimonialAboutPlaceholder')}
                value={about} onChange={e => setAbout(e.target.value)} />
            </div>

            <button
              id="btn-matrimonial-submit"
              type="submit"
              disabled={submitting}
              className="px-8 py-3.5 bg-primary hover:bg-primary-dark text-white font-bold uppercase text-xs tracking-widest cursor-pointer transition-colors disabled:opacity-60"
            >
              {submitting ? t('submitting') : t('matrimonialSubmit')}
            </button>
          </form>
        </div>

        {/* Right Side: Reassurance / how it works */}
        <div className="lg:col-span-4 space-y-6">

          <div className="p-8 bg-primary text-white space-y-5 border border-gold/30 rounded-sm relative overflow-hidden">
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-gold"></div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-gold"></div>

            <div className="p-3 bg-white/5 border border-white/10 text-gold rounded-sm h-fit w-fit">
              <Heart className="h-6 w-6" />
            </div>

            <h3 className="text-sm font-extrabold text-gold uppercase tracking-wider font-display">{t('matrimonialHowTitle')}</h3>

            <ul className="space-y-3.5 text-xs font-serif text-gray-300 pt-3 border-t border-white/5">
              <li className="flex items-start gap-2.5">
                <Lock className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                <span>{t('matrimonialHow1')}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <EyeOff className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                <span>{t('matrimonialHow2')}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Heart className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                <span>{t('matrimonialHow3')}</span>
              </li>
            </ul>
          </div>

          <div className="p-6 border border-gray-100 bg-white shadow-sm rounded-sm flex gap-4">
            <div className="p-3 bg-primary/5 text-gold border border-primary/10 rounded-sm h-fit">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary font-display">{t('matrimonialAssureTitle')}</h4>
              <p className="text-xs text-gray-500 leading-normal">{t('matrimonialAssureBody')}</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
