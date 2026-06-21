import { useState } from 'react';
import { LanguageProvider, useLanguage } from './i18n';
import { StoreProvider, useStore } from './dbState';

// Main Layout Components
import Header from './components/Header';
import Footer from './components/Footer';

// Page Views
import Hero from './components/Hero';
import TrusteesPage from './components/TrusteesPage';
import ActivitiesPage from './components/ActivitiesPage';
import DonationPage from './components/DonationPage';
import MembershipPage from './components/MembershipPage';
import HelpRequestPage from './components/HelpRequestPage';
import MatrimonialPage from './components/MatrimonialPage';
import JobBoardPage from './components/JobBoardPage';
import NewsPage from './components/NewsPage';
import AchieversPage from './components/AchieversPage';
import ContactPage from './components/ContactPage';
import AdminPanel from './components/AdminPanel';

import { Check, ShieldAlert, ArrowLeft } from 'lucide-react';

function AppContent() {
  const { t, language } = useLanguage();
  const { session, signOut } = useStore();
  const [currentTab, setTab] = useState<string>('home');

  // Admin status is the real Supabase session — not a client-side boolean.
  const isAdminLoggedIn = !!session;

  const handleLogout = async () => {
    await signOut();
    setTab('home');
  };

  const renderActivePage = () => {
    switch (currentTab) {
      case 'home':
        return <Hero setTab={setTab} />;
      case 'trustees':
        return <TrusteesPage />;
      case 'activities':
        return <ActivitiesPage />;
      case 'donation':
        return <DonationPage />;
      case 'membership':
        return <MembershipPage />;
      case 'help-request':
        return <HelpRequestPage />;
      case 'matrimonial':
        return <MatrimonialPage />;
      case 'jobs':
        return <JobBoardPage />;
      case 'news':
        return <NewsPage />;
      case 'achievers':
        return <AchieversPage />;
      case 'contact':
        return <ContactPage />;
      case 'admin':
        return <AdminPanel isAdminLoggedIn={isAdminLoggedIn} />;
      default:
        return <Hero setTab={setTab} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-warm selection:bg-gold selection:text-primary">
      
      {/* 1. Header */}
      <Header 
        currentTab={currentTab} 
        setTab={setTab} 
        isAdminLoggedIn={isAdminLoggedIn} 
        onLogout={handleLogout} 
      />

      {/* 2. Main Page Render */}
      <main className="flex-grow bg-bg-warm">
        {currentTab !== 'home' && (
          <div className="max-w-7xl mx-auto px-4 pt-8 -mb-10 sm:px-6 lg:px-8 relative z-10">
            <button
              id="back-button-global"
              onClick={() => setTab('home')}
              className="group inline-flex items-center gap-1.5 px-3 py-1.5 border border-gold/15 bg-white hover:border-gold hover:text-gold text-primary text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer shadow-sm"
            >
              <ArrowLeft className="h-3.5 w-3.5 transform group-hover:-translate-x-1 transition-transform animate-pulse" />
              {language === 'en' ? 'Back to Home' : 'પાછા મુખ્ય પૃષ્ઠ પર'}
            </button>
          </div>
        )}
        {renderActivePage()}
      </main>

      {/* 3. Footer */}
      <Footer setTab={setTab} />

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <StoreProvider>
        <AppContent />
      </StoreProvider>
    </LanguageProvider>
  );
}
