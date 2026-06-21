import { useLanguage } from '../i18n';
import { useStore } from '../dbState';
import logo from '../assets/images/welfare_logo_1780513915221.png';
import { Mail, Phone, MapPin, MessageSquare, Compass, Send } from 'lucide-react';

interface FooterProps {
  setTab: (tab: string) => void;
}

export default function Footer({ setTab }: FooterProps) {
  const { t, language } = useLanguage();
  const { contactInfo: ci } = useStore();

  // Live, admin-editable contact details (with safe fallbacks).
  const footerAddress = ci ? (language === 'en' ? ci.address : ci.address_gu) : 'SSMWS Secretariat, Sunni Momin Mohalla, Sabarkantha Main Bazaar, Gujarat, 383001';
  const footerPhones = [ci?.phone1 || '+91 94261-XXXXX', ci?.phone2 || '+91 98980-XXXXX'].filter(Boolean).join(', ');
  const footerEmail = ci?.email || 'info@ssmws.org';

  const handleNav = (tab: string) => {
    setTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary-dark border-t border-gold/20 text-gray-300 font-sans">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: About SSMWS */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-sm border border-gold/30">
                <img 
                  src={logo} 
                  alt="SSMWS Emblem" 
                  className="h-8 w-8 rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-gold uppercase tracking-widest font-display">{t('societyAbbr')}</h4>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider leading-none">Welfare Trust</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed font-serif">
              {t('heroTagline')}
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-xs font-bold text-gold uppercase tracking-[0.2em] border-b border-white/5 pb-2.5 mb-4 font-display">
              {t('aboutUs')}
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  id="footer-lnk-trustees"
                  onClick={() => handleNav('trustees')} 
                  className="hover:text-gold flex items-center gap-2 cursor-pointer transition-colors text-gray-400 font-medium uppercase tracking-wider text-[10px]"
                >
                  <Compass className="h-3 w-3 text-gold" /> Trustees & Committee
                </button>
              </li>
              <li>
                <button 
                  id="footer-lnk-activities"
                  onClick={() => handleNav('activities')} 
                  className="hover:text-gold flex items-center gap-2 cursor-pointer transition-colors text-gray-400 font-medium uppercase tracking-wider text-[10px]"
                >
                  <Compass className="h-3 w-3 text-gold" /> Welfare Programs
                </button>
              </li>
              <li>
                <button
                  id="footer-lnk-achievers"
                  onClick={() => handleNav('achievers')} 
                  className="hover:text-gold flex items-center gap-2 cursor-pointer transition-colors text-gray-400 font-medium uppercase tracking-wider text-[10px]"
                >
                  <Compass className="h-3 w-3 text-gold" /> Community Toppers
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Support & Forms */}
          <div>
            <h3 className="text-xs font-bold text-gold uppercase tracking-[0.2em] border-b border-white/5 pb-2.5 mb-4 font-display">
              Get Involved
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button 
                  id="footer-lnk-donation"
                  onClick={() => handleNav('donation')} 
                  className="hover:text-gold flex items-center gap-2 cursor-pointer transition-colors text-gold font-extrabold uppercase tracking-wider text-[10px]"
                >
                  <Send className="h-3 w-3 text-gold" /> {t('donateNow')}
                </button>
              </li>
              <li>
                <button 
                  id="footer-lnk-membership"
                  onClick={() => handleNav('membership')} 
                  className="hover:text-gold flex items-center gap-2 cursor-pointer transition-colors text-gray-400 font-medium uppercase tracking-wider text-[10px]"
                >
                  <Send className="h-3 w-3 text-gold" /> {t('becomeMember')}
                </button>
              </li>
              <li>
                <button 
                  id="footer-lnk-help"
                  onClick={() => handleNav('help-request')} 
                  className="hover:text-gold flex items-center gap-2 cursor-pointer transition-colors text-gray-400 font-medium uppercase tracking-wider text-[10px]"
                >
                  <Send className="h-3 w-3 text-gold" /> {t('applyHelp')}
                </button>
              </li>
              <li>
                <button 
                  id="footer-lnk-news"
                  onClick={() => handleNav('news')} 
                  className="hover:text-gold flex items-center gap-2 cursor-pointer transition-colors text-gray-400 font-medium uppercase tracking-wider text-[10px]"
                >
                  <Send className="h-3 w-3 text-gold" /> Late Announcements
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Reach Out Coordinates */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gold uppercase tracking-[0.2em] border-b border-white/5 pb-2.5 mb-4 font-display">
              Contact Office
            </h3>
            <div className="space-y-3 text-xs text-gray-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                <span className="leading-tight text-gray-400 text-[11px]">
                  {footerAddress}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-gold flex-shrink-0" />
                <span className="text-[11px]">{footerPhones}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-gold flex-shrink-0" />
                <span className="text-[11px] hover:text-gold transition-colors">{footerEmail}</span>
              </div>
            </div>

            {/* Social Grid */}
            <div className="pt-2 flex gap-2">
              <a 
                href="https://whatsapp.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 rounded-sm bg-primary border border-gold/10 text-gold hover:text-white hover:border-gold transition-all"
                title="WhatsApp Channel"
              >
                <MessageSquare className="h-3.5 w-3.5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2.5 rounded-sm bg-primary border border-gold/10 text-gray-300 hover:text-white hover:border-gold text-[10px] font-bold font-mono transition-all leading-none"
                title="Facebook Page"
              >
                FB
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2.5 rounded-sm bg-primary border border-gold/10 text-gray-300 hover:text-white hover:border-gold text-[10px] font-bold font-mono transition-all leading-none"
                title="Youtube Network"
              >
                YT
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2.5 rounded-sm bg-primary border border-gold/10 text-gray-300 hover:text-white hover:border-gold text-[10px] font-bold font-mono transition-all leading-none"
                title="Instagram Media"
              >
                IG
              </a>
            </div>
          </div>

        </div>

        {/* Footer Base bar */}
        <div className="mt-16 border-t border-white/5 pt-8 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Sabarkantha Sunni Momin Welfare Society. {t('allRightsReserved')}</p>
          <div className="flex items-center gap-4 text-[11px]">
            <button id="foot-admin-link" onClick={() => handleNav('admin')} className="text-gray-500 hover:text-gold transition-colors uppercase tracking-widest font-bold">
              Secretariat Admin Access
            </button>
            <span className="text-white/10">|</span>
            <span className="text-gold uppercase tracking-wider font-mono">Zakat & Public Audited</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
