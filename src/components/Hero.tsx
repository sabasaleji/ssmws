import { useLanguage } from '../i18n';
import { useStore } from '../dbState';
import { Heart, GraduationCap, ArrowRight } from 'lucide-react';
import heroImg from '../assets/images/welfare_hero_1780513934403.png';

interface HeroProps {
  setTab: (tab: string) => void;
}

export default function Hero({ setTab }: HeroProps) {
  const { t, language } = useLanguage();
  const { activities } = useStore();

  const handleApplyCTA = (tab: string) => {
    setTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-20 pb-20 font-sans bg-bg-warm">
      
      {/* 4. ACTIVE WELFARE PREVIEWS (Gorgeous structured boxes with deep emerald/gold) */}
      <section className="bg-primary-dark text-white py-20 relative">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `url(${heroImg})`, backgroundSize: 'cover', backgroundPosition: 'center', mixBlendMode: 'overlay' }}></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs uppercase font-bold text-gold tracking-[0.3em] block">{t('activities')}</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display uppercase">
              {t('activityTitle')}
            </h2>
            <p className="text-xs text-gray-300 font-serif">
              {t('activitySubtitle')}
            </p>
            <div className="h-1 w-16 bg-gold mx-auto mt-2"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activities.slice(0, 3).map(activity => (
              <div key={activity.id} className="p-8 bg-primary/40 border border-gold/10 rounded-sm space-y-5 hover:border-gold/50 hover:bg-primary/60 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-sm bg-primary-dark border border-gold/20 text-gold">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">{language === 'en' ? activity.title : activity.title_gu}</h3>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed font-serif">
                  {language === 'en' ? activity.description.slice(0, 150) + '...' : activity.description_gu.slice(0, 110) + '...'}
                </p>
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-gold block tracking-widest uppercase border-t border-white/5 pt-3">
                    Impact: {language === 'en' ? activity.stats : activity.stats_gu}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              id="hero-lnk-activities-more"
              onClick={() => handleApplyCTA('activities')}
              className="px-8 py-3.5 text-xs text-primary font-bold bg-gold hover:bg-yellow-500 rounded-sm shadow-md cursor-pointer inline-flex items-center gap-2 uppercase tracking-widest"
            >
              Examine Our Welfare Portals <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 8. DONATE NOW Call-To-Action Banner (Majestic gold-accented visual anchor) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-sm bg-primary text-white border border-gold/35 px-6 py-12 md:p-16 relative overflow-hidden shadow-xl">
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`, backgroundSize: '16px 16px' }}></div>
          
          <div className="relative text-center max-w-3xl mx-auto space-y-6">
            
            <div className="inline-flex items-center gap-2 text-gold justify-center">
              <Heart className="h-4 w-4 fill-gold text-gold animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">Audit Transparency Guarantee</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight uppercase">
              {language === 'en' ? 'Direct Zakat and General Donation Desk' : 'તમારી પાકી ઝકાત અહિયાં મોકલી શકો છો'}
            </h2>

            <p className="text-xs sm:text-sm text-white/80 font-serif max-w-2xl mx-auto leading-relaxed">
              We pledge to allocate 100% of your Zakat directly to fees of deserving college students, medications of widowed families, and weddings of orphan girls. Check our monthly live lists and obtain receipts instantly.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <button
                id="hero-lnk-donate-cta"
                onClick={() => handleApplyCTA('donation')}
                className="px-8 py-3.5 bg-gold hover:bg-yellow-500 text-primary font-bold uppercase text-xs tracking-widest transition-all cursor-pointer active:scale-95"
              >
                Assemble Donation Packet
              </button>
              
              <button
                id="hero-lnk-contact-cta"
                onClick={() => handleApplyCTA('contact')}
                className="px-8 py-3.5 border-2 border-white/20 hover:border-gold hover:bg-white/5 text-xs text-white font-bold uppercase tracking-widest transition-all cursor-pointer active:scale-95"
              >
                Contact Trustees Directly
              </button>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
