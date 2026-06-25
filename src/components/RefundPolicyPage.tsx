import { useLanguage } from '../i18n';
import { Ban, ReceiptText, Phone, AlertCircle } from 'lucide-react';

const lastUpdated = 'June 24, 2026';

const TEXT = {
  en: {
    eyebrow: 'Legal',
    titleLead: 'Refund &',
    titleAccent: 'Cancellation',
    updated: 'Last updated',
    intro: 'This policy applies to all donations and membership payments made through the Sabarkantha Sunni Momin Welfare Society website.',
    sections: [
      { title: 'Donations', body: 'Donations are non-refundable.' },
      { title: 'Membership fees', body: 'Membership fees are non-refundable and non-transferable.' },
      { title: 'Cancellations', body: 'There is no cancellation after successful payment.' },
      { title: 'Payment issues', body: 'If a payment is not reflected or there is an error, contact the helpline number shown on the Contact Us page.' },
    ],
  },
  gu: {
    eyebrow: 'કાયદાકીય',
    titleLead: 'રિફંડ અને',
    titleAccent: 'રદ કરવાની નીતિ',
    updated: 'છેલ્લે અપડેટ',
    intro: 'આ નીતિ સાબરકાંઠા સુન્ની મોમીન વેલ્ફેર સોસાયટીની વેબસાઈટ દ્વારા થયેલી તમામ દાન અને સભ્યપદ ચુકવણી પર લાગુ પડે છે.',
    sections: [
      { title: 'દાન', body: 'દાન પરત કરવામાં આવતું નથી.' },
      { title: 'સભ્યપદ ફી', body: 'સભ્યપદ ફી પરત કરવામાં આવતી નથી અને અન્યને ટ્રાન્સફર કરી શકાતી નથી.' },
      { title: 'રદ કરવું', body: 'સફળ ચુકવણી પછી રદ કરવાની સુવિધા નથી.' },
      { title: 'ચુકવણી સમસ્યા', body: 'ચુકવણી દેખાતી ન હોય અથવા ભૂલ થાય તો Contact Us પેજ પર દર્શાવેલા હેલ્પલાઇન નંબર પર સંપર્ક કરો.' },
    ],
  },
};

export default function RefundPolicyPage() {
  const { language } = useLanguage();
  const copy = TEXT[language];

  const icons = [
    <Ban className="h-4 w-4 text-gold" />,
    <ReceiptText className="h-4 w-4 text-gold" />,
    <AlertCircle className="h-4 w-4 text-gold" />,
    <Phone className="h-4 w-4 text-gold" />,
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
