import { useLanguage } from '../i18n';
import { useStore } from '../dbState';
import { Award, Compass, Star } from 'lucide-react';

export default function AchieversPage() {
  const { t, language } = useLanguage();
  const { achievers } = useStore();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-16 bg-bg-warm font-sans animate-fade-in">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs uppercase font-bold text-gold tracking-[0.25em] block">{t('achievers')}</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-primary font-display uppercase tracking-tight text-center">
          Honoring <span className="italic font-serif text-gold font-normal">Talents</span>
        </h1>
        <p className="text-xs text-gray-400 font-mono tracking-wider max-w-lg mx-auto">
          Celebrating extraordinary toppers, doctors, engineers, and scholars to inspire future generations.
        </p>
        <div className="h-0.5 w-12 bg-gold mx-auto mt-2"></div>
      </div>

      {/* Grid listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {achievers.map((ach) => (
          <div key={ach.id} className="border border-gray-100 bg-white rounded-none overflow-hidden shadow-sm hover:border-gold transition-colors duration-150 group flex flex-col justify-between">
            
            <div className="relative">
              <img 
                src={ach.photo} 
                className="w-full h-72 object-cover object-top group-hover:scale-[1.01] transition-transform duration-300"
                alt={ach.name}
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 p-2 bg-primary border border-gold text-gold">
                <Star className="h-4 w-4 fill-gold text-gold" />
              </div>
            </div>

            <div className="p-6 space-y-4 flex-grow bg-white">
              <span className="text-[9px] uppercase font-bold text-gold bg-[#FCFAF7] border border-gray-100 px-2.5 py-1 rounded-none font-mono">
                {language === 'en' ? ach.category_label : ach.category_label_gu}
              </span>
              <h3 className="text-xs font-bold uppercase tracking-wide text-primary">
                {language === 'en' ? ach.name : ach.name_gu}
              </h3>
              <p className="text-xs font-extrabold text-primary uppercase tracking-wide">
                🏆 {language === 'en' ? ach.achievement : ach.achievement_gu}
              </p>
              <p className="text-xs text-gray-500 font-serif leading-relaxed italic border-l-2 border-gold pl-3 pt-1">
                "{language === 'en' ? ach.message : ach.message_gu}"
              </p>
            </div>

            <div className="p-6 pt-0 border-t border-gray-100 bg-[#FCFAF7] flex items-center justify-between text-[9px] text-gray-400 font-mono uppercase tracking-wider">
              <span>Sunni Momin Pillar</span>
              <span>Aided Scholar</span>
            </div>

          </div>
        ))}
      </div>

      {/* Academic counseling announcement panel (Beautiful gold corner container) */}
      <div className="p-8 bg-primary text-white border border-gold/30 flex flex-col items-center text-center max-w-3xl mx-auto space-y-4 relative overflow-hidden rounded-none">
        <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-gold"></div>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-gold"></div>

        <Award className="h-10 w-10 text-gold" />
        <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#D4AF37] font-display">Career Guidance Clinic Notice</h4>
        <p className="text-xs text-gray-300 font-serif leading-relaxed max-w-2xl mx-auto">
          Are you a student in Sabarkantha who finished exams and wants support selecting collegiate paths? SSMWS provides free personal counseling sessions with doctors, CAs, and professionals. Drop an inquiry on our contact page.
        </p>
      </div>

    </div>
  );
}
