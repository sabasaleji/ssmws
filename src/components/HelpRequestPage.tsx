import React, { useState } from 'react';
import { useLanguage } from '../i18n';
import { useStore } from '../dbState';
import { HelpCircle, AlertTriangle, ShieldCheck, Check, Upload, FileText, Landmark } from 'lucide-react';

export default function HelpRequestPage() {
  const { t, language } = useLanguage();
  const store = useStore();

  // Form Fields State
  const [applicantName, setApplicantName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState<'education' | 'medical' | 'emergency'>('education');
  const [amountRequested, setAmountRequested] = useState('');
  const [description, setDescription] = useState('');
  
  // Custom File metadata state
  const [fileName, setFileName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // File Upload emulator handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amountRequested || isNaN(Number(amountRequested))) {
      alert('Please enter a valid amount');
      return;
    }

    setIsSubmitting(true);

    // Simulate database write & processing
    setTimeout(() => {
      store.addHelpRequest({
        applicantName,
        phone,
        email,
        category,
        amountRequested: Number(amountRequested),
        description,
        fileName: fileName || 'LetterOfNeed.pdf'
      });

      // Reset
      setApplicantName('');
      setPhone('');
      setEmail('');
      setAmountRequested('');
      setDescription('');
      setFileName('');
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 6000);
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-16 bg-bg-warm font-sans">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs uppercase font-bold text-gold tracking-[0.25em] block">{t('applyHelp')}</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-primary font-display uppercase tracking-tight text-center">
          Request <span className="italic font-serif text-gold font-normal">Assistance</span>
        </h1>
        <p className="text-xs text-gray-500 font-mono tracking-wider max-w-lg mx-auto">
          {t('helpRequestSubtitle')}
        </p>
        <div className="h-0.5 w-12 bg-gold mx-auto mt-2"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* Left Side: Policy and Confidentiality notes */}
        <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
          <div className="p-8 bg-white border border-gray-100 space-y-4 rounded-sm shadow-sm relative">
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-gold"></div>
            <h4 className="text-xs font-extrabold uppercase text-primary tracking-widest flex items-center gap-2 font-display">
              <ShieldCheck className="h-4.5 w-4.5 text-gold" /> Confidential Integrity
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed font-serif pt-1">
              SSMWS handles all assistance files with absolute confidentiality and respect. No public lists of beneficiaries are published, and details are reviewed solely by three chief trustees behind closed committee chambers to preserve your honorable dignity.
            </p>
          </div>

          <div className="p-8 bg-white border border-gray-100 space-y-4 rounded-sm shadow-sm relative">
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-gold"></div>
            <div className="flex items-center gap-2 text-primary border-b border-gray-100 pb-3">
              <AlertTriangle className="h-5 w-5 text-gold" />
              <h4 className="text-xs font-bold uppercase tracking-widest font-display">Documentation checklist</h4>
            </div>
            <ul className="space-y-2 text-[11px] list-disc pl-4 text-gray-500 font-serif">
              <li>Authentic college ID and Fee stubs from principal (for Ed help)</li>
              <li>Civil Hospital surgery quotes or certified bills (for Medical aid)</li>
              <li>Locality proof or signed recommendation by Sunni Momin committee</li>
              <li>Detailed handwritten Letter of Need outlining household members</li>
            </ul>
          </div>

          <div className="p-6 border border-gray-100 bg-white shadow-sm rounded-sm flex gap-4">
            <div className="p-3 bg-primary/5 text-gold border border-primary/10 rounded-sm h-fit">
              <Landmark className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary font-display">Welfare Ledger Auditing</h4>
              <p className="text-xs text-gray-500 leading-normal">Approved allocations are disbursed directly back to college accounts or medical billing desks to preserve strict auditing paths.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Apply Form */}
        <div className="lg:col-span-8 bg-white border border-gray-100 rounded-sm p-6 md:p-8 shadow-sm relative">
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-gold"></div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-gold"></div>

          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary border-b border-gray-100 pb-3 mb-6 font-display">Welfare Application Intake</h3>
          
          {success && (
            <div className="p-4 mb-6 rounded-sm bg-primary text-white border-l-4 border-gold text-xs font-serif flex items-center gap-2">
              <Check className="h-4 w-4 text-gold" />
              <span>Application filed successfully! Your file is under secret board evaluation. You will receive SMS alerts shortly.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Applicant Name*</label>
                <input
                  id="help-inp-name"
                  type="text" required
                  placeholder="e.g. Shakil Mustakbhai Momin"
                  className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-[#FCFAF7]"
                  value={applicantName}
                  onChange={e => setApplicantName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Select Welfare Category*</label>
                <select
                  className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-[#FCFAF7]"
                  value={category}
                  onChange={e => setCategory(e.target.value as any)}
                >
                  <option value="education">{t('helpEduAssistance')}</option>
                  <option value="medical">{t('helpMedicalHelp')}</option>
                  <option value="emergency">{t('helpEmergencyHelp')}</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Amount Required (INR)*</label>
                <input
                  id="help-inp-amt"
                  type="number" required
                  placeholder="e.g. 25000"
                  className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-[#FCFAF7]"
                  value={amountRequested}
                  onChange={e => setAmountRequested(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Applicant Phone Contact*</label>
                <input
                  id="help-inp-phone"
                  type="tel" required
                  placeholder="+91 9426X-XXXXX"
                  className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-[#FCFAF7]"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Email Coordinates</label>
                <input
                  type="email"
                  placeholder="name@email.com"
                  className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-[#FCFAF7]"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">{t('formEmergency')}*</label>
              <textarea
                required
                rows={4}
                placeholder="Give complete layout of domestic situation. Why do you need this aid? State family member accounts and monthly earnings..."
                className="w-full text-xs p-3.5 border border-gray-200 rounded-none focus:outline-none focus:border-gold bg-[#FCFAF7]"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>

            {/* Custom file attachments form element (supports drop or select) */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">{t('formUploadLetter')}*</label>
              <div className="flex items-center justify-center border-2 border-dashed border-gray-100 rounded-none p-6 bg-[#FCFAF7] hover:bg-neutral-100/50 transition-colors cursor-pointer relative">
                <input
                  type="file"
                  id="file-attachment"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                />
                <div className="text-center space-y-2">
                  <Upload className="h-6 w-6 text-gold mx-auto" />
                  <p className="text-xs font-bold text-primary uppercase tracking-wider">Drag and drop files here, or click to browse</p>
                  <p className="text-[10px] text-gray-400">PDF, JPG up to 10MB (Hospital papers, fee bills, recommendation letters)</p>
                </div>
              </div>
              {fileName && (
                <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 bg-primary text-white text-[10px] uppercase font-mono">
                  <FileText className="h-3.5 w-3.5 text-gold" />
                  <span>Selected: {fileName}</span>
                </div>
              )}
            </div>

            <button
              id="btn-help-submit"
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3.5 bg-primary hover:bg-primary-dark text-white font-bold uppercase text-xs tracking-widest cursor-pointer transition-colors"
            >
              {isSubmitting ? t('saving') : t('formSubmitApplication')}
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}
