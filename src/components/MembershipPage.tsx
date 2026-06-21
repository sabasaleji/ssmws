import React, { useState } from 'react';
import { useLanguage } from '../i18n';
import { useStore } from '../dbState';
import { UserCheck, Sparkles, Check, Users, ShieldCheck, Heart } from 'lucide-react';

export default function MembershipPage() {
  const { t, language } = useLanguage();
  const store = useStore();

  const [activeFormTab, setActiveFormTab] = useState<'member' | 'volunteer'>('member');

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
  const [memberSuccess, setMemberSuccess] = useState(false);

  // Volunteer Fields State
  const [volName, setVolName] = useState('');
  const [volPhone, setVolPhone] = useState('');
  const [volEmail, setVolEmail] = useState('');
  const [volSkills, setVolSkills] = useState('');
  const [volInterests, setVolInterests] = useState<string[]>([]);
  const [volSuccess, setVolSuccess] = useState(false);

  const interestOptions = [
    'Education Support', 'Medical Camps', 'Relief Work', 'Youth Work', 'Womens Empowerment'
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
      bloodGroup
    });

    setFullName('');
    setFatherName('');
    setPhone('');
    setEmail('');
    setAddress('');
    setOccupation('');
    setDob('');
    setBloodGroup('');
    setMemberSuccess(true);
    setTimeout(() => setMemberSuccess(false), 5000);
  };

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    store.addVolunteer({
      fullName: volName,
      phone: volPhone,
      email: volEmail,
      skills: volSkills,
      interests: volInterests
    });

    setVolName('');
    setVolPhone('');
    setVolEmail('');
    setVolSkills('');
    setVolInterests([]);
    setVolSuccess(true);
    setTimeout(() => setVolSuccess(false), 5000);
  };

  const toggleInterest = (interest: string) => {
    if (volInterests.includes(interest)) {
      setVolInterests(volInterests.filter(i => i !== interest));
    } else {
      setVolInterests([...volInterests, interest]);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-16 bg-bg-warm font-sans">
      
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Side: Form Panel */}
        <div className="lg:col-span-8 bg-white border border-gray-100 rounded-sm p-6 md:p-8 shadow-sm space-y-8">
          
          {/* Sub Navigation Bar */}
          <div className="flex gap-3 border-b border-gray-100 pb-3">
            <button
              onClick={() => setActiveFormTab('member')}
              className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-none cursor-pointer transition-all border ${
                activeFormTab === 'member'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white border-gray-100 text-gray-500 hover:border-gold hover:text-primary'
              }`}
            >
              🏢 {t('membTabForm')}
            </button>
            <button
              onClick={() => setActiveFormTab('volunteer')}
              className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-none cursor-pointer transition-all border ${
                activeFormTab === 'volunteer'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white border-gray-100 text-gray-500 hover:border-gold hover:text-primary'
              }`}
            >
              🤝 {t('membTabVolunteer')}
            </button>
          </div>

          {/* Form Switch */}
          {activeFormTab === 'member' ? (
            <div className="space-y-6">
              <h3 className="text-xs font-bold text-primary uppercase tracking-[0.15em] border-b pb-2 font-display">SSMWS Member Registration Registry</h3>
              
              {memberSuccess && (
                <div className="p-4 rounded-sm bg-primary text-white border-l-4 border-gold text-xs font-serif flex items-center gap-2">
                  <Check className="h-4 w-4 text-gold" /> 
                  <span>Your membership registry request has been filed! Check administrative portals for status decisions.</span>
                </div>
              )}

              <form onSubmit={handleMemberSubmit} className="space-y-5">
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
          ) : (
            <div className="space-y-6">
              <h3 className="text-xs font-bold text-primary uppercase tracking-[0.15em] border-b pb-2 font-display">Volunteer Social Grid</h3>
              
              {volSuccess && (
                <div className="p-4 rounded-sm bg-primary text-white border-l-4 border-gold text-xs font-serif flex items-center gap-2">
                  <Check className="h-4 w-4 text-gold" /> 
                  <span>Success! You have registered as a volunteer. Team SSMWS will contact you during social campaigns.</span>
                </div>
              )}

              <form onSubmit={handleVolunteerSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Full Name*</label>
                    <input
                      id="vol-inp-name"
                      type="text" required
                      className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-[#FCFAF7]"
                      value={volName}
                      onChange={e => setVolName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Phone Contact*</label>
                    <input
                      id="vol-inp-phone"
                      type="tel" required
                      className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-[#FCFAF7]"
                      value={volPhone}
                      onChange={e => setVolPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Email Coordinates</label>
                  <input
                    type="email"
                    className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-[#FCFAF7]"
                    placeholder="name@email.com"
                    value={volEmail}
                    onChange={e => setVolEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">{t('formSkills')}*</label>
                  <textarea
                    required
                    rows={2}
                    className="w-full text-xs p-3.5 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-[#FCFAF7]"
                    placeholder="Tell us about your computer knowledge, counseling skills, or logistics capacity..."
                    value={volSkills}
                    onChange={e => setVolSkills(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">{t('formInterests')}</label>
                  <div className="flex flex-wrap gap-2">
                    {interestOptions.map(interest => {
                      const isSelected = volInterests.includes(interest);
                      return (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => toggleInterest(interest)}
                          className={`px-4 py-2 border transition-all text-[10px] font-extrabold uppercase tracking-wider cursor-pointer ${
                            isSelected 
                              ? 'bg-primary text-white border-primary' 
                              : 'bg-white border-gray-100 text-gray-500 hover:border-gold/30 hover:text-primary'
                          }`}
                        >
                          {interest}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  id="btn-volunteer-submit"
                  type="submit"
                  className="px-8 py-3.5 bg-primary hover:bg-primary-dark text-white font-bold uppercase text-xs tracking-widest cursor-pointer"
                >
                  File Volunteer Signup
                </button>
              </form>
            </div>
          )}

        </div>

        {/* Right Side: Showcase Youth wing and credentials */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="p-8 bg-primary text-white space-y-5 border border-gold/30 rounded-sm relative overflow-hidden">
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-gold"></div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-gold"></div>
            
            <div className="p-3 bg-white/5 border border-white/10 text-gold rounded-sm h-fit w-fit">
              <Sparkles className="h-6 w-6" />
            </div>
            
            <h3 className="text-sm font-extrabold text-gold uppercase tracking-wider font-display">{t('membYouthTitle')}</h3>
            <p className="text-xs text-gray-300 font-serif leading-relaxed">
              {t('membYouthDesc')}
            </p>

            <ul className="space-y-2.5 text-xs font-serif text-gray-300 pt-3 border-t border-white/5">
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                <span>Weekly athletic tournaments and football leagues</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                <span>Skill Workshops (Graphic design, tech building)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                <span>Community Blood Bank rapid action networks</span>
              </li>
            </ul>
          </div>

          <div className="p-6 border border-gray-100 bg-white shadow-sm rounded-sm flex gap-4">
            <div className="p-3 bg-primary/5 text-gold border border-primary/10 rounded-sm h-fit">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary font-display">Strict Governance Rules</h4>
              <p className="text-xs text-gray-500 leading-normal">Approved members gain access to regular trust reports, voting in the committee selections, and invitations to general society conferences.</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
