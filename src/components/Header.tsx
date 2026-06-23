import { useState } from 'react';
import { useLanguage } from '../i18n';
import { Menu, X, Globe, Lock } from 'lucide-react';
import logo from '../assets/images/ssmwslogo.png';

interface HeaderProps {
  currentTab: string;
  setTab: (tab: string) => void;
  isAdminLoggedIn: boolean;
  onLogout: () => void;
}

export default function Header({ currentTab, setTab, isAdminLoggedIn, onLogout }: HeaderProps) {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Flat navigation: with the page set trimmed down, every page is a direct
  // top-level link — no dropdowns. Donate and Contact are rendered separately.
  const navLinks = [
    { id: 'trustees', label: t('trustees') },
    { id: 'news', label: t('newsAnnouncements') },
    { id: 'membership', label: t('becomeMember') },
    { id: 'mockboard', label: t('mockBoardNav') },
    { id: 'matrimonial', label: t('matrimonialNav') },
    { id: 'jobs', label: t('jobBoardNav') },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'gu' : 'en');
  };

  const navigateTo = (tabId: string) => {
    setTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md text-text-dark shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        {/* Brand Logo — the official emblem already carries the SSMWS wordmark */}
        <button
          id="btn-nav-logo"
          onClick={() => navigateTo('home')}
          className="flex items-center focus:outline-none group cursor-pointer"
          aria-label="SSMWS Home"
        >
          <img
            src={logo}
            alt="SSMWS — Sabar Kantha Sunni Momin Welfare Society"
            className="h-12 sm:h-14 w-auto object-contain group-hover:scale-[1.03] transition-transform duration-150"
            referrerPolicy="no-referrer"
          />
        </button>

        {/* Desktop Navigation — flat top-level links */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map(item => (
            <button
              id={`nav-item-${item.id}`}
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className={`px-3 pb-1.5 pt-1 text-[11px] font-bold uppercase tracking-widest cursor-pointer transition-all duration-150 border-b-2 ${
                currentTab === item.id
                  ? 'text-primary border-gold font-extrabold'
                  : 'text-gray-500 border-transparent hover:text-primary hover:border-gold/50'
              }`}
            >
              {item.label}
            </button>
          ))}

          {/* Donate — highlighted call to action */}
          <button
            id="nav-item-donation"
            onClick={() => navigateTo('donation')}
            className="ml-2 bg-primary hover:bg-primary-dark text-white rounded-sm px-4 py-2 text-[11px] font-bold uppercase tracking-widest cursor-pointer hover:shadow-primary active:scale-95 transition-all duration-150"
          >
            {t('donateNow')}
          </button>

          {/* Contact — standalone link */}
          <button
            id="nav-item-contact"
            onClick={() => navigateTo('contact')}
            className={`ml-1 px-3 pb-1.5 pt-1 text-[11px] font-bold uppercase tracking-widest cursor-pointer transition-all duration-150 border-b-2 ${
              currentTab === 'contact'
                ? 'text-primary border-gold font-extrabold'
                : 'text-gray-500 border-transparent hover:text-primary hover:border-gold/50'
            }`}
          >
            {t('contactUs')}
          </button>
        </nav>

        {/* Top Controls: Language + Admin Portal Toggle + Mobile Trigger */}
        <div className="flex items-center gap-2">

          {/* Language Switcher */}
          <button
            id="btn-lang-toggle"
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-2 rounded-sm border border-gray-100 bg-[#FCFAF7] text-[10px] font-bold text-gray-500 uppercase tracking-wider hover:bg-gray-50 hover:text-primary transition-colors cursor-pointer animate-fade-in"
            title="Switch Language"
          >
            <Globe className="h-3.5 w-3.5 text-gold" />
            <span className="hidden sm:inline">{language === 'en' ? 'ગુજરાતી' : 'English'}</span>
            <span className="sm:hidden">{language === 'en' ? 'GUJ' : 'ENG'}</span>
          </button>

          {/* Secure Admin Control trigger */}
          {isAdminLoggedIn ? (
            <button
              id="btn-nav-admin"
              onClick={() => navigateTo('admin')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-sm border border-red-200 bg-red-50 text-[10px] font-bold text-red-700 uppercase tracking-wider hover:bg-red-100 cursor-pointer"
            >
              <Lock className="h-3.5 w-3.5 animate-pulse" />
              <span className="hidden sm:inline">{t('adminDashboard')}</span>
            </button>
          ) : (
            <button
              id="btn-nav-admin-login"
              onClick={() => navigateTo('admin')}
              className={`p-2 rounded-sm border transition-colors cursor-pointer ${
                currentTab === 'admin'
                  ? 'border-gold bg-[#FCFAF7] text-primary'
                  : 'border-gray-100 hover:border-gold/40 text-gray-400 hover:text-primary hover:bg-[#FCFAF7]'
              }`}
              title="Admin Access"
            >
              <Lock className="h-4 w-4" />
            </button>
          )}

          {/* Mobile Menu Icon */}
          <button
            id="btn-mobile-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-sm border border-gray-100 text-gray-500 hover:bg-gray-50 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer menu — flat links */}
      {mobileMenuOpen && (
        <div id="mobile-menu-drawer" className="xl:hidden border-t border-gray-100 bg-[#FCFAF7] px-4 pt-4 pb-6 space-y-2 shadow-md max-h-[80vh] overflow-y-auto">

          <button
            id="mob-nav-home"
            onClick={() => navigateTo('home')}
            className={`block w-full text-left px-4 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider ${
              currentTab === 'home'
                ? 'text-primary bg-white border-l-4 border-gold pl-3 font-extrabold'
                : 'text-gray-600 hover:text-primary hover:bg-gray-50'
            }`}
          >
            {t('home')}
          </button>

          {navLinks.map(item => (
            <button
              id={`mob-nav-${item.id}`}
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className={`block w-full text-left px-4 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider ${
                currentTab === item.id
                  ? 'text-primary bg-white border-l-4 border-gold pl-3 font-extrabold'
                  : 'text-gray-500 hover:text-primary hover:bg-gray-50'
              }`}
            >
              {item.label}
            </button>
          ))}

          <div className="space-y-2 pt-3">
            <button
              id="mob-nav-donation"
              onClick={() => navigateTo('donation')}
              className="block w-full text-left px-4 py-2.5 rounded-sm text-xs font-extrabold uppercase tracking-wider bg-primary text-white hover:bg-primary-dark shadow-sm"
            >
              {t('donateNow')}
            </button>
            <button
              id="mob-nav-contact"
              onClick={() => navigateTo('contact')}
              className={`block w-full text-left px-4 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider ${
                currentTab === 'contact'
                  ? 'text-primary bg-white border-l-4 border-gold pl-3 font-extrabold'
                  : 'text-gray-500 hover:text-primary hover:bg-gray-50'
              }`}
            >
              {t('contactUs')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
