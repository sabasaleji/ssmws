import React, { useState } from 'react';
import { useLanguage } from '../i18n';
import { useStore } from '../dbState';
import { Check, BadgeInfo, ShieldAlert } from 'lucide-react';

export default function MembershipPage() {
  const { t } = useLanguage();
  const store = useStore();

  // Member Registration State
  const [fullName, setFullName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [occupation, setOccupation] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [bloodGroup, setBloodGroup] = useState('');
  const [membershipType, setMembershipType] = useState<'annual' | 'lifetime'>('annual');
  const [memberSuccess, setMemberSuccess] = useState(false);

  const membershipPlans: { id: 'annual' | 'lifetime'; title: string; price: string }[] = [
    { id: 'annual', title: t('membTypeAnnual'), price: t('membTypeAnnualPrice') },
    { id: 'lifetime', title: t('membTypeLifetime'), price: t('membTypeLifetimePrice') },
  ];

  const handleMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    store.addMembership({
      fullName,
      fatherHusbandName: fatherName,
      phone,
      email,
      address,
      occupation,
      dob,
      gender,
      bloodGroup,
      membershipType
    });

    setFullName('');
    setFatherName('');
    setPhone('');
    setEmail('');
    setAddress('');
    setOccupation('');
    setDob('');
    setBloodGroup('');
    setMembershipType('annual');
    setMemberSuccess(true);
    setTimeout(() => setMemberSuccess(false), 5000);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 space-y-16 bg-bg-warm font-sans">

      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs uppercase font-bold text-gold tracking-[0.25em] block">{t('becomeMember')}</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-primary font-display uppercase tracking-tight text-center animate-fade-in">
          Socio-Economic <span className="italic font-serif text-gold font-normal">Registry</span>
        </h1>
        <p className="text-xs text-gray-400 font-mono tracking-wider max-w-lg mx-auto">
          {t('membershipSubtitle')}
        </p>
        <div className="h-0.5 w-12 bg-gold mx-auto mt-2"></div>
      </div>

      <div className="bg-white border border-gold/20 rounded-sm p-5 md:p-6 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-primary">
          <BadgeInfo className="h-4 w-4 text-gold" />
          <h2 className="text-xs font-bold uppercase tracking-widest">Membership Policy</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-gray-600">
          <p className="flex items-start gap-2"><ShieldAlert className="h-3.5 w-3.5 text-gold mt-0.5 shrink-0" /> Annual membership: ₹100.</p>
          <p className="flex items-start gap-2"><ShieldAlert className="h-3.5 w-3.5 text-gold mt-0.5 shrink-0" /> Lifetime membership: ₹2,500.</p>
          <p className="flex items-start gap-2"><ShieldAlert className="h-3.5 w-3.5 text-gold mt-0.5 shrink-0" /> Membership is activated after successful payment.</p>
          <p className="flex items-start gap-2"><ShieldAlert className="h-3.5 w-3.5 text-gold mt-0.5 shrink-0" /> Membership fees are non-refundable and non-transferable.</p>
        </div>
      </div>

      {/* Form Panel */}
      <div className="bg-white border border-gray-100 rounded-sm p-6 md:p-8 shadow-sm space-y-6">
        <h3 className="text-xs font-bold text-primary uppercase tracking-[0.15em] border-b pb-2 font-display">{t('membTabForm')}</h3>

        {memberSuccess && (
          <div className="p-4 rounded-sm bg-primary text-white border-l-4 border-gold text-xs font-serif flex items-center gap-2">
            <Check className="h-4 w-4 text-gold" />
            <span>Your membership registry request has been filed! Check administrative portals for status decisions.</span>
          </div>
        )}

        <form onSubmit={handleMemberSubmit} className="space-y-5">
          {/* Membership Type Selection */}
          <div className="space-y-2">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">{t('membTypeLabel')}*</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {membershipPlans.map(plan => {
                const isSelected = membershipType === plan.id;
                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setMembershipType(plan.id)}
                    className={`flex items-center justify-between px-4 py-3.5 border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-primary text-white border-primary'
                        : 'bg-[#FCFAF7] border-gray-200 text-gray-600 hover:border-gold'
                    }`}
                  >
                    <span className="text-xs font-bold uppercase tracking-wider">{plan.title}</span>
                    <span className={`text-sm font-extrabold ${isSelected ? 'text-gold' : 'text-primary'}`}>{plan.price}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">{t('formFullName')}*</label>
              <input
                id="memb-inp-name"
                type="text" required
                className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-[#FCFAF7]"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">{t('formFatherHusbandName')}*</label>
              <input
                type="text" required
                className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-[#FCFAF7]"
                value={fatherName}
                onChange={e => setFatherName(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">{t('formPhone')}*</label>
              <input
                id="memb-inp-phone"
                type="tel" required
                className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-[#FCFAF7]"
                value={phone}
                placeholder="+91 XXXXX-XXXXX"
                onChange={e => setPhone(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">{t('formEmail')}</label>
              <input
                type="email"
                className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-[#FCFAF7]"
                value={email}
                placeholder="e.g. name@email.com"
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">{t('formDOB')}*</label>
              <input
                type="date" required
                className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-[#FCFAF7] block text-gray-600"
                value={dob}
                onChange={e => setDob(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">{t('formGender')}*</label>
              <select
                className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-[#FCFAF7]"
                value={gender}
                onChange={e => setGender(e.target.value as any)}
              >
                <option value="male">{t('genderMale')}</option>
                <option value="female">{t('genderFemale')}</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">{t('formBloodGroup')}</label>
              <input
                type="text"
                className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-[#FCFAF7]"
                value={bloodGroup}
                placeholder="e.g. O+, B+"
                onChange={e => setBloodGroup(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">{t('formOccupation')}*</label>
              <input
                type="text" required
                className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-[#FCFAF7]"
                placeholder="e.g. Embroidery Artist, Lecturer"
                value={occupation}
                onChange={e => setOccupation(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">{t('formAddress')}*</label>
              <input
                type="text" required
                className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-[#FCFAF7]"
                value={address}
                placeholder="Postal Address details"
                onChange={e => setAddress(e.target.value)}
              />
            </div>
          </div>

          <button
            id="btn-member-submit"
            type="submit"
            className="px-8 py-3.5 bg-primary hover:bg-primary-dark text-white font-bold uppercase text-xs tracking-widest cursor-pointer transition-colors"
          >
            {t('formSubmitApplication')}
          </button>
        </form>
      </div>

    </div>
  );
}
