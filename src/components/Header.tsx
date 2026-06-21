import { useState } from 'react';
import { useLanguage } from '../i18n';
import { Menu, X, Globe, Lock, ChevronDown } from 'lucide-react';
import logo from '../assets/images/welfare_logo_1780513915221.png';

interface HeaderProps {
  currentTab: string;
  setTab: (tab: string) => void;
  isAdminLoggedIn: boolean;
  onLogout: () => void;
}

export default function Header({ currentTab, setTab, isAdminLoggedIn, onLogout }: HeaderProps) {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Grouped navigation: 11 pages consolidated into a few top-level menus.
  const navGroups = [
    {
      label: t('aboutUs'),
      items: [
        { id: 'trustees', label: t('trustees') },
        { id: 'achievers', label: t('achievers') },
      ],
    },
    {
      label: t('ourWork'),
      items: [
        { id: 'activities', label: t('activities') },
        { id: 'news', label: t('newsAnnouncements') },
      ],
    },
    {
      label: t('getInvolved'),
      items: [
        { id: 'membership', label: t('becomeMember') },
        { id: 'help-request', label: t('applyHelp') },
        { id: 'matrimonial', label: t('matrimonialNav') },
        { id: 'jobs', label: t('jobBoardNav') },
      ],
    },
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

        {/* Brand Logo & Name */}
        <button
          id="btn-nav-logo"
          onClick={() => navigateTo('home')}
          className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
        >
          <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-lg shadow-sm border border-gold/20">
            <div className="w-5 h-5 border border-gold rotate-45 flex items-center justify-center">
              <img
                src={logo}
                alt="SSMWS Logo"
                className="-rotate-45 h-3.5 w-3.5 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div>
            <span className="block text-sm font-extrabold tracking-tight text-primary font-display leading-none uppercase">
              {t('societyAbbr')}
            </span>
            <span className="block text-[8px] sm:text-[9px] tracking-widest text-[#D4AF37] font-bold uppercase leading-none mt-1">
              Sabarkantha Sunni Momin
            </span>
          </div>
        </button>

        {/* Desktop Navigation — grouped dropdowns */}
        <nav className="hidden xl:flex items-center gap-1">
          {navGroups.map(group => {
            const groupActive = group.items.some(i => i.id === currentTab);
            return (
              <div key={group.label} className="group relative">
                <button
                  className={`flex items-center gap-1 px-3 pb-1.5 pt-1 text-[11px] font-bold uppercase tracking-widest cursor-pointer transition-all duration-150 border-b-2 ${
                    groupActive
                      ? 'text-primary border-gold'
                      : 'text-gray-500 border-transparent group-hover:text-primary group-hover:border-gold/50'
                  }`}
                >
                  {group.label}
                  <ChevronDown className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180" />
                </button>

                {/* Dropdown panel (pt-3 bridges the gap so hover doesn't drop) */}
                <div className="invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-150 absolute left-0 top-full pt-3 z-50 min-w-[210px]">
                  <div className="bg-white border border-gray-100 shadow-lg rounded-sm py-1.5">
                    {group.items.map(item => (
                      <button
                        id={`nav-item-${item.id}`}
                        key={item.id}
                        onClick={() => navigateTo(item.id)}
                        className={`block w-full text-left px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider cursor-pointer transition-colors ${
                          currentTab === item.id
                            ? 'text-primary bg-[#FCFAF7] border-l-2 border-gold'
                            : 'text-gray-500 border-l-2 border-transparent hover:text-primary hover:bg-[#FCFAF7]'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

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

      {/* Mobile Drawer menu — grouped sections */}
      {mobileMenuOpen && (
        <div id="mobile-menu-drawer" className="xl:hidden border-t border-gray-100 bg-[#FCFAF7] px-4 pt-4 pb-6 space-y-5 shadow-md max-h-[80vh] overflow-y-auto">

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

          {navGroups.map(group => (
            <div key={group.label} className="space-y-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1 mb-1.5">{group.label}</p>
              {group.items.map(item => (
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
            </div>
          ))}

          <div className="space-y-2 pt-1">
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
