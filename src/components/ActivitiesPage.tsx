import { useState } from 'react';
import { useLanguage } from '../i18n';
import { useStore } from '../dbState';
import { 
  GraduationCap, Heart, Gift, FlameKindling, 
  Briefcase, MessageSquare, Award, ArrowRight 
} from 'lucide-react';

export default function ActivitiesPage() {
  const { t, language } = useLanguage();
  const { activities } = useStore();
  const [activeTab, setActiveTab] = useState('education');

  const getIconComponent = (icon: string) => {
    switch (icon) {
      case 'GraduationCap': return <GraduationCap className="h-4.5 w-4.5" />;
      case 'HeartHandshake': return <Heart className="h-4.5 w-4.5" />;
      case 'Gift': return <Gift className="h-4.5 w-4.5" />;
      case 'FlameKindling': return <FlameKindling className="h-4.5 w-4.5" />;
      case 'Briefcase': return <Briefcase className="h-4.5 w-4.5" />;
      default: return <Award className="h-4.5 w-4.5" />;
    }
  };

  const activeCategory = activities.find(a => a.id === activeTab) || activities[0] || {
    id: 'placeholder',
    title: 'Loading',
    title_gu: 'લોડ થઈ રહ્યું છે',
    description: '',
    description_gu: '',
    icon: '',
    stats: '',
    stats_gu: '',
    beneficiaryStory: { name: '', name_gu: '', story: '', story_gu: '', impact: '', impact_gu: '' }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-16 font-sans bg-bg-warm">
      
      {/* 1. Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs uppercase font-bold text-gold tracking-[0.25em] block">{t('activities')}</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-primary font-display uppercase tracking-tight">
          Welfare <span className="italic font-serif text-gold font-normal">Activities</span>
        </h1>
        <p className="text-xs text-gray-400 font-mono tracking-wider max-w-lg mx-auto">
          {t('activitySubtitle')}
        </p>
        <div className="h-0.5 w-12 bg-gold mx-auto mt-2"></div>
      </div>

      {/* 2. Interactive Horizontal Tab Buttons (Sleek bold pill style) */}
      <div className="flex flex-wrap justify-center gap-3 border-b border-gray-100 pb-3">
        {activities.map(act => (
          <button
            id={`act-tab-${act.id}`}
            key={act.id}
            onClick={() => setActiveTab(act.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
              activeTab === act.id
                ? 'bg-primary text-white border-primary shadow-sm'
                : 'bg-white border-gray-100 text-gray-500 hover:border-gold hover:text-primary'
            }`}
          >
            {getIconComponent(act.icon)}
            <span>{language === 'en' ? act.title : act.title_gu}</span>
          </button>
        ))}
      </div>

      {/* 3. Details Content Block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch pt-4">
        
        {/* Main Details Panel */}
        <div className="lg:col-span-7 flex flex-col justify-between p-8 bg-white border border-gray-100 shadow-sm rounded-sm">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/5 border border-primary/10 text-gold rounded-sm">
                {getIconComponent(activeCategory.icon)}
              </div>
              <div>
                <h2 className="text-base font-extrabold text-primary uppercase tracking-wide">
                  {language === 'en' ? activeCategory.title : activeCategory.title_gu}
                </h2>
                <span className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">Verified Active Program</span>
              </div>
            </div>

            <p className="text-sm text-gray-500 leading-relaxed font-serif pt-2">
              {language === 'en' ? activeCategory.description : activeCategory.description_gu}
            </p>
          </div>

          <div className="mt-10 pt-5 border-t border-gray-100">
            <span className="text-[9px] uppercase font-bold text-gold tracking-widest block">{t('actImpact')}</span>
            <span className="text-xl font-black text-primary tracking-tight block mt-1 font-display uppercase">
              {language === 'en' ? activeCategory.stats : activeCategory.stats_gu}
            </span>
          </div>
        </div>

        {/* Beneficiary Narratives Card (Beautiful gold-trimmed secondary) */}
        <div className="lg:col-span-5 p-8 bg-primary text-white flex flex-col justify-between border border-gold/30 rounded-sm relative overflow-hidden">
          
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-gold"></div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-gold"></div>
          
          <div className="space-y-6 relative">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 text-gold text-[9px] uppercase font-bold tracking-widest font-mono">
              <MessageSquare className="h-3.5 w-3.5 text-gold" /> {t('actNarrative')}
            </div>
            
            <h3 className="text-sm font-extrabold text-gold leading-tight uppercase tracking-wider">
              {language === 'en' ? activeCategory.beneficiaryStory.name : activeCategory.beneficiaryStory.name_gu}
            </h3>

            <p className="text-xs text-gray-300 italic font-serif leading-relaxed">
              "{language === 'en' ? activeCategory.beneficiaryStory.story : activeCategory.beneficiaryStory.story_gu}"
            </p>
          </div>

          <div className="pt-6 border-t border-white/5 relative mt-6 font-mono uppercase text-[9px] tracking-wider text-gray-300 space-y-1">
            <span className="font-extrabold text-[#D4AF37]">Verified Audited Impact Outcome</span>
            <span className="block text-[#fff]">
              {language === 'en' ? activeCategory.beneficiaryStory.impact : activeCategory.beneficiaryStory.impact_gu}
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
