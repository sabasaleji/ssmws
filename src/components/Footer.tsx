import { useLanguage } from '../i18n';
import logo from '../assets/images/ssmwslogo.png';
import { Mail, Phone, MapPin, MessageSquare, Compass, Send, Facebook, Youtube, Instagram } from 'lucide-react';

const REGISTERED_OFFICE_ADDRESS = {
  en: 'AMENA HIGH SCHOOL, Panpur, Savgadh, Gujarat 383002',
  gu: 'આમેના હાઈસ્કુલ, પાનપુર, સાવગઢ, ગુજરાત ૩૮૩૦૦૨',
};
const HELPLINE_NUMBERS = ['+91 94290-84650'];
const OFFICE_EMAIL = 'sabarkhanthasunnimominwelfare@gmail.com';
const WHATSAPP_URL = 'https://wa.me/919429084650';

interface FooterProps {
  setTab: (tab: string) => void;
}

export default function Footer({ setTab }: FooterProps) {
  const { t, language } = useLanguage();

  const footerAddress = REGISTERED_OFFICE_ADDRESS[language];
  const footerPhones = HELPLINE_NUMBERS.join(', ');
  const footerEmail = OFFICE_EMAIL;

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
              <div className="bg-white p-1.5 rounded-sm border border-gold/30 shadow-sm flex-shrink-0">
                <img
                  src={logo}
                  alt="SSMWS Emblem"
                  className="h-12 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-gold uppercase tracking-widest font-display">{t('societyAbbr')}</h4>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider leading-none">{t('footerWelfareTrust')}</p>
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
                  <Compass className="h-3 w-3 text-gold" /> {t('footerTrusteesCommittee')}
                </button>
              </li>
              <li>
                <button
                  id="footer-lnk-terms"
                  onClick={() => handleNav('terms')}
                  className="hover:text-gold flex items-center gap-2 cursor-pointer transition-colors text-gray-400 font-medium uppercase tracking-wider text-[10px]"
                >
                  <Compass className="h-3 w-3 text-gold" /> {t('footerTermsLabel')}
                </button>
              </li>
              <li>
                <button
                  id="footer-lnk-refund"
                  onClick={() => handleNav('refund')}
                  className="hover:text-gold flex items-center gap-2 cursor-pointer transition-colors text-gray-400 font-medium uppercase tracking-wider text-[10px]"
                >
                  <Compass className="h-3 w-3 text-gold" /> {t('footerRefundLabel')}
                </button>
              </li>
              <li>
                <button
                  id="footer-lnk-privacy"
                  onClick={() => handleNav('privacy')}
                  className="hover:text-gold flex items-center gap-2 cursor-pointer transition-colors text-gray-400 font-medium uppercase tracking-wider text-[10px]"
                >
                  <Compass className="h-3 w-3 text-gold" /> {t('footerPrivacyLabel')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Support & Forms */}
          <div>
            <h3 className="text-xs font-bold text-gold uppercase tracking-[0.2em] border-b border-white/5 pb-2.5 mb-4 font-display">
              {t('footerGetInvolved')}
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
                  id="footer-lnk-mockboard"
                  onClick={() => handleNav('mockboard')}
                  className="hover:text-gold flex items-center gap-2 cursor-pointer transition-colors text-gray-400 font-medium uppercase tracking-wider text-[10px]"
                >
                  <Send className="h-3 w-3 text-gold" /> {t('mockBoardNav')}
                </button>
              </li>
              <li>
                <button
                  id="footer-lnk-news"
                  onClick={() => handleNav('news')}
                  className="hover:text-gold flex items-center gap-2 cursor-pointer transition-colors text-gray-400 font-medium uppercase tracking-wider text-[10px]"
                >
                  <Send className="h-3 w-3 text-gold" /> {t('footerAnnouncements')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Reach Out Coordinates */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gold uppercase tracking-[0.2em] border-b border-white/5 pb-2.5 mb-4 font-display">
              {t('footerContactOffice')}
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
                href={WHATSAPP_URL} 
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
                className="p-2 rounded-sm bg-primary border border-gold/10 text-gray-300 hover:text-white hover:border-gold transition-all"
                title="Facebook Page"
                aria-label="Facebook Page"
              >
                <Facebook className="h-3.5 w-3.5" />
              </a>
              <a 
                href="https://youtube.com/@sabarkanthasunnimominwel-jg4fx?si=Ys3Bm1x1SbQOVaS6" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 rounded-sm bg-primary border border-gold/10 text-gray-300 hover:text-white hover:border-gold transition-all"
                title="Youtube Network"
                aria-label="Youtube Network"
              >
                <Youtube className="h-3.5 w-3.5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 rounded-sm bg-primary border border-gold/10 text-gray-300 hover:text-white hover:border-gold transition-all"
                title="Instagram Media"
                aria-label="Instagram Media"
              >
                <Instagram className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Footer Base bar */}
        <div className="mt-16 border-t border-white/5 pt-8 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <p>© 2026 Sabarkantha Sunni Momin Welfare Society. {t('allRightsReserved')}</p>
            <p className="text-[11px] uppercase tracking-[0.2em] text-gray-600">
              Created by <span className="text-gold font-semibold">EntropyAI</span>
            </p>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <button id="foot-admin-link" onClick={() => handleNav('admin')} className="text-gray-500 hover:text-gold transition-colors uppercase tracking-widest font-bold">
              {t('footerAdminAccess')}
            </button>
            <span className="text-white/10">|</span>
            <span className="text-gold uppercase tracking-wider font-mono">{t('footerZakatAudit')}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

