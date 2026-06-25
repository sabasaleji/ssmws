import { useLanguage } from '../i18n';
import { Shield, Database, Users, Mail, Clock, RefreshCw } from 'lucide-react';

const lastUpdated = 'June 24, 2026';

const TEXT = {
  en: {
    eyebrow: 'Legal',
    titleLead: 'Privacy',
    titleAccent: 'Policy',
    updated: 'Last updated',
    intro: 'This policy explains how Sabarkantha Sunni Momin Welfare Society handles the information submitted through this website.',
    sections: [
      {
        title: 'Information we collect',
        body: 'We collect only the information a visitor or member submits through our forms, such as name, phone number, email address, and membership or donation details.',
      },
      {
        title: 'Why we collect it',
        body: 'The society uses this information for committee records, communication, processing membership requests, and managing donation-related administration.',
      },
      {
        title: 'Where it is stored',
        body: 'Submitted data is stored in the society database and is accessible only to authorized admin users.',
      },
      {
        title: 'How long we keep it',
        body: 'We retain records for as long as necessary for society operations, internal records, and any applicable compliance requirements.',
      },
      {
        title: 'Sharing and correction',
        body: 'We do not sell or share your data with third parties. If you need a correction or deletion request, contact the admin team; the society will review the request subject to record-keeping needs.',
      },
      {
        title: 'Payment provider note',
        body: 'If online payments are enabled, payment details are handled by the payment provider according to its own privacy policy. The website does not use submitted information for unrelated purposes.',
      },
    ],
  },
  gu: {
    eyebrow: 'કાયદાકીય',
    titleLead: 'ગોપનીયતા',
    titleAccent: 'નીતિ',
    updated: 'છેલ્લે અપડેટ',
    intro: 'આ નીતિ સમજાવે છે કે સાબરકાંઠા સુન્ની મોમીન વેલ્ફેર સોસાયટી આ વેબસાઈટ દ્વારા મોકલાયેલી માહિતી કેવી રીતે સંભાળે છે.',
    sections: [
      {
        title: 'અમે કઈ માહિતી એકત્ર કરીએ છીએ',
        body: 'અમે માત્ર મુલાકાતી અથવા સભ્ય દ્વારા ફોર્મમાં ભરાયેલી માહિતી જ એકત્ર કરીએ છીએ, જેમ કે નામ, ફોન નંબર, ઈમેઇલ એડ્રેસ, સભ્યપદ અથવા દાનની વિગતો.',
      },
      {
        title: 'માહિતી શા માટે એકત્ર કરીએ છીએ',
        body: 'સોસાયટી આ માહિતી સમિતિના રેકોર્ડ, સંપર્ક, સભ્યપદ વિનંતી અને દાન સંબંધિત વહીવટી કામ માટે વાપરે છે.',
      },
      {
        title: 'માહિતી ક્યાં સંગ્રહાય છે',
        body: 'મોકલાયેલી માહિતી સોસાયટીના ડેટાબેઝમાં સંગ્રહાય છે અને ફક્ત અધિકૃત એડમિન વપરાશકર્તાઓને જ ઉપલબ્ધ છે.',
      },
      {
        title: 'માહિતી કેટલો સમય રાખીએ છીએ',
        body: 'સોસાયટીના કાર્ય, આંતરિક રેકોર્ડ અને લાગુ પડતી અનુપાલન જરૂરીયાતો માટે જેટલો સમય જરૂરી હોય તેટલો સમય રેકોર્ડ રાખવામાં આવે છે.',
      },
      {
        title: 'શેરિંગ અને સુધારા',
        body: 'અમે તમારી માહિતી વેચતા કે તૃતીય પક્ષ સાથે શેર કરતા નથી. સુધારા અથવા કાઢી નાખવાની વિનંતી માટે એડમિન ટીમનો સંપર્ક કરો; સોસાયટી રેકોર્ડ રાખવાની જરૂરિયાતોને ધ્યાનમાં રાખીને વિનંતી તપાસશે.',
      },
      {
        title: 'પેમેન્ટ પ્રદાતા નોંધ',
        body: 'ઓનલાઈન પેમેન્ટ શરૂ થાય ત્યારે પેમેન્ટ વિગતો પેમેન્ટ પ્રદાતા પોતાની ગોપનીયતા નીતિ મુજબ સંભાળશે. વેબસાઈટ મોકલાયેલી માહિતીનો અસંબંધિત હેતુ માટે ઉપયોગ કરતી નથી.',
      },
    ],
  },
};

export default function PrivacyPolicyPage() {
  const { language } = useLanguage();
  const copy = TEXT[language];

  const icons = [
    <Database className="h-4 w-4 text-gold" />,
    <Users className="h-4 w-4 text-gold" />,
    <Shield className="h-4 w-4 text-gold" />,
    <Clock className="h-4 w-4 text-gold" />,
    <RefreshCw className="h-4 w-4 text-gold" />,
    <Mail className="h-4 w-4 text-gold" />,
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
