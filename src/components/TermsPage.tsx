import { useLanguage } from '../i18n';
import { FileText, Globe, BadgeInfo, Scale, ShieldCheck } from 'lucide-react';

const lastUpdated = 'June 24, 2026';

const TEXT = {
  en: {
    eyebrow: 'Legal',
    titleLead: 'Terms &',
    titleAccent: 'Conditions',
    updated: 'Last updated',
    intro: 'These terms apply to use of the Sabarkantha Sunni Momin Welfare Society website and its donation and membership pages.',
    sections: [
      { title: 'Who can use the website', body: 'The website is open for general viewing by anyone.' },
      { title: 'Donations and membership', body: 'Donations are voluntary and are used for society activities. Membership becomes active after successful payment verification.' },
      { title: 'User information', body: 'Users must provide correct information when submitting forms, donation details, or membership applications.' },
      { title: 'Website content', body: 'The society may update website content, payment details, fees, or policy text whenever needed.' },
      { title: 'Ownership and law', body: 'The website content, logo, and related material belong to the society. These terms are governed by the laws of India.' },
    ],
  },
  gu: {
    eyebrow: 'કાયદાકીય',
    titleLead: 'નિયમો અને',
    titleAccent: 'શરતો',
    updated: 'છેલ્લે અપડેટ',
    intro: 'આ નિયમો સાબરકાંઠા સુન્ની મોમીન વેલ્ફેર સોસાયટીની વેબસાઈટ, દાન પેજ અને સભ્યપદ પેજના ઉપયોગ પર લાગુ પડે છે.',
    sections: [
      { title: 'વેબસાઈટ કોણ વાપરી શકે', body: 'વેબસાઈટ કોઈપણ વ્યક્તિ સામાન્ય માહિતી જોવા માટે વાપરી શકે છે.' },
      { title: 'દાન અને સભ્યપદ', body: 'દાન સ્વૈચ્છિક છે અને સોસાયટીની પ્રવૃત્તિઓ માટે વપરાય છે. સફળ ચુકવણીની ચકાસણી પછી સભ્યપદ સક્રિય થાય છે.' },
      { title: 'વપરાશકર્તાની માહિતી', body: 'ફોર્મ, દાન વિગતો અથવા સભ્યપદ અરજી મોકલતી વખતે વપરાશકર્તાએ સાચી માહિતી આપવી જરૂરી છે.' },
      { title: 'વેબસાઈટ સામગ્રી', body: 'સોસાયટી જરૂર પડે ત્યારે વેબસાઈટ સામગ્રી, ચુકવણી વિગતો, ફી અથવા નીતિ લખાણ અપડેટ કરી શકે છે.' },
      { title: 'માલિકી અને કાયદો', body: 'વેબસાઈટની સામગ્રી, લોગો અને સંબંધિત સામગ્રી સોસાયટીની છે. આ નિયમો ભારતના કાયદા હેઠળ આવે છે.' },
    ],
  },
};

export default function TermsPage() {
  const { language } = useLanguage();
  const copy = TEXT[language];

  const icons = [
    <Globe className="h-4 w-4 text-gold" />,
    <BadgeInfo className="h-4 w-4 text-gold" />,
    <ShieldCheck className="h-4 w-4 text-gold" />,
    <FileText className="h-4 w-4 text-gold" />,
    <Scale className="h-4 w-4 text-gold" />,
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 space-y-10 bg-bg-warm font-sans">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs uppercase font-bold text-gold tracking-[0.25em] block">{copy.eyebrow}</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-primary font-display uppercase tracking-tight">
          {copy.titleLead} <span className="italic font-serif text-gold font-normal">{copy.titleAccent}</span>
        </h1>
        <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 font-bold">
          {copy.updated}: {lastUpdated}
        </p>
      </div>

      <div className="bg-white border border-gray-100 rounded-sm p-6 md:p-8 shadow-sm space-y-5">
        <p className="text-sm text-gray-600 leading-relaxed">
          {copy.intro}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {copy.sections.map((section, idx) => (
            <div key={section.title} className="border border-gray-100 bg-[#FCFAF7] rounded-sm p-4 space-y-2">
              <div className="flex items-center gap-2">
                {icons[idx]}
                <h2 className="text-sm font-bold uppercase tracking-widest text-primary">{section.title}</h2>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
