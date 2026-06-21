import { useState } from 'react';
import { useLanguage } from '../i18n';
import { useStore } from '../dbState';
import { Mail, Phone, MapPin, MessageSquare, ExternalLink } from 'lucide-react';
import { VILLAGES, type Village } from '../villages';

export default function ContactPage() {
  const { t, language } = useLanguage();
  const store = useStore();

  // Interactive "villages we serve" map. Selecting a village lets Google geocode
  // and pin its precise location (keyless ?q=...&output=embed form — no API key,
  // no hand-entered coordinates).
  const [activeVillage, setActiveVillage] = useState<Village | null>(null);
  const mapQuery = activeVillage
    ? `${activeVillage.en}, Sabarkantha, Gujarat, India`
    : 'Sabarkantha, Gujarat, India';
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=${activeVillage ? 13 : 10}&hl=${language}&output=embed`;
  const mapLinkOut = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;

  // Live, admin-editable contact details (with safe fallbacks before load/migration).
  const ci = store.contactInfo;
  const officeAddress = ci ? (language === 'en' ? ci.address : ci.address_gu) : t('contactOfficeAddress');
  const phone1 = ci?.phone1 || '+91 94261-XXXXX';
  const phone2 = ci?.phone2 || '+91 98980-XXXXX';
  const officeEmail = ci?.email || 'info@ssmws.org';
  const whatsappNumber = ci?.whatsapp || '919426138382';

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-16 bg-bg-warm font-sans animate-fade-in">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs uppercase font-bold text-gold tracking-[0.25em] block">{t('contactUs')}</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-primary font-display uppercase tracking-tight text-center">
          Get in <span className="italic font-serif text-gold font-normal">Touch</span>
        </h1>
        <div className="h-0.5 w-12 bg-gold mx-auto mt-2"></div>
      </div>

      <div className="max-w-2xl mx-auto">

        {/* Contact details */}
        <div className="bg-primary text-white p-8 border border-gold/30 rounded-sm flex flex-col justify-between relative overflow-hidden">
          
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-gold"></div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-gold"></div>
          
          <div className="space-y-6 relative z-10">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold border-b border-white/5 pb-3 font-display">
              {t('contactDetails')}
            </h3>

            <div className="space-y-5 text-xs text-gray-300 font-serif">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {officeAddress}
                </span>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                <div className="space-y-1 font-mono uppercase tracking-wider text-[11px]">
                  <p className="font-sans font-bold text-gold normal-case">{t('contactDirectNumbers')}</p>
                  <p className="text-white font-bold select-all">{phone1}</p>
                  {phone2 && <p className="text-white font-bold select-all">{phone2}</p>}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gold flex-shrink-0" />
                <span className="font-mono tracking-wider text-[11px] select-all">{officeEmail}</span>
              </div>
            </div>
          </div>

          {/* Floated WhatsApp integration button */}
          <div className="pt-8 border-t border-white/5 mt-8 relative z-10 select-none">
            <p className="text-xs text-gray-300 leading-relaxed font-serif mb-4">
              {t('contactWhatsAppText')}
            </p>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-none text-xs font-bold uppercase tracking-wider transition-all"
            >
              <MessageSquare className="h-4 w-4 fill-white text-[#25D366]" /> Chat on WhatsApp
            </a>
          </div>

        </div>


      </div>

      {/* Interactive service-area map — villages SSMWS serves across Sabarkantha */}
      <div className="space-y-6 pt-4">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs uppercase font-bold text-gold tracking-[0.25em] block">
            {language === 'en' ? 'Our Reach' : 'અમારી પહોંચ'}
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-primary uppercase tracking-tight font-display">
            {language === 'en' ? 'Villages We Serve' : 'અમે જે ગામોમાં સેવા આપીએ છીએ'}
          </h3>
          <div className="h-0.5 w-12 bg-gold mx-auto mt-2"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Village selector — matches the map height exactly */}
          <div className="lg:col-span-5 bg-white border border-gray-100 rounded-sm p-4 shadow-sm flex flex-col h-[460px] sm:h-[560px] lg:h-[620px]">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                {language === 'en' ? 'Coverage Areas' : 'સેવા વિસ્તારો'}
              </span>
              {activeVillage && (
                <button
                  onClick={() => setActiveVillage(null)}
                  className="text-[10px] font-bold uppercase tracking-wider text-gold hover:text-primary transition-colors cursor-pointer"
                >
                  {language === 'en' ? 'Reset' : 'રીસેટ'}
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-1.5 overflow-y-auto flex-1 min-h-0 pr-1">
              {VILLAGES.map((v) => {
                const isActive = activeVillage?.id === v.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => setActiveVillage(v)}
                    className={`flex items-center gap-2 px-2.5 py-2 rounded-sm border text-left transition-all duration-150 cursor-pointer ${
                      isActive
                        ? 'border-gold bg-gold/10'
                        : 'border-gray-100 bg-[#FCFAF7] hover:border-gold/40'
                    }`}
                  >
                    <MapPin className={`h-3.5 w-3.5 flex-shrink-0 ${isActive ? 'text-gold' : 'text-gray-300'}`} />
                    <span className="leading-tight min-w-0">
                      <span className="block text-[11px] font-bold text-primary truncate">{v.en}</span>
                      <span className="block text-[10px] text-gray-400 font-serif truncate">{v.gu}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Map (taller / portrait — Sabarkantha runs more north–south than east–west) */}
          <div className="lg:col-span-7 space-y-2">
            <div className="h-[460px] sm:h-[560px] lg:h-[620px] rounded-none overflow-hidden border border-gray-150 shadow-inner relative">
              <iframe
                key={mapSrc}
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={activeVillage ? `${activeVillage.en} — SSMWS service area` : 'SSMWS service area — Sabarkantha'}
              />
              {activeVillage && (
                <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1.5 rounded-sm shadow-md flex items-center gap-2 pointer-events-none">
                  <MapPin className="h-3.5 w-3.5 text-gold" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    {language === 'en' ? activeVillage.en : activeVillage.gu}
                  </span>
                </div>
              )}
            </div>
            <a
              href={mapLinkOut}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gold transition-colors"
            >
              <ExternalLink className="h-3 w-3" />
              {language === 'en' ? 'Open in Google Maps' : 'ગૂગલ મેપ્સમાં ખોલો'}
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
