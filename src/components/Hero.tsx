import { useLanguage } from '../i18n';
import { Heart } from 'lucide-react';

interface HeroProps {
  setTab: (tab: string) => void;
}

export default function Hero({ setTab }: HeroProps) {
  const { t } = useLanguage();

  const handleApplyCTA = (tab: string) => {
    setTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-20 py-20 font-sans bg-bg-warm">

      {/* 8. DONATE NOW Call-To-Action Banner (Majestic gold-accented visual anchor) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-sm bg-primary text-white border border-gold/35 px-6 py-12 md:p-16 relative overflow-hidden shadow-xl">
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`, backgroundSize: '16px 16px' }}></div>
          
          <div className="relative text-center max-w-3xl mx-auto space-y-6">
            
            <div className="inline-flex items-center gap-2 text-gold justify-center">
              <Heart className="h-4 w-4 fill-gold text-gold animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">{t('heroZakatBadge')}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight uppercase">
              {t('heroZakatTitle')}
            </h2>

            <p className="text-xs sm:text-sm text-white/80 font-serif max-w-2xl mx-auto leading-relaxed">
              {t('heroZakatBody')}
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <button
                id="hero-lnk-donate-cta"
                onClick={() => handleApplyCTA('donation')}
                className="px-8 py-3.5 bg-gold hover:bg-yellow-500 text-primary font-bold uppercase text-xs tracking-widest transition-all cursor-pointer active:scale-95"
              >
                {t('heroDonateCta')}
              </button>

              <button
                id="hero-lnk-contact-cta"
                onClick={() => handleApplyCTA('contact')}
                className="px-8 py-3.5 border-2 border-white/20 hover:border-gold hover:bg-white/5 text-xs text-white font-bold uppercase tracking-widest transition-all cursor-pointer active:scale-95"
              >
                {t('heroContactCta')}
              </button>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
