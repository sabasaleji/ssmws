import { useLanguage } from '../i18n';
import { useStore } from '../dbState';
import { Pin } from 'lucide-react';

export default function NewsPage() {
  const { t, language } = useLanguage();
  const { announcements } = useStore();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-16 bg-bg-warm font-sans animate-fade-in">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs uppercase font-bold text-gold tracking-[0.25em] block">{t('newsAnnouncements')}</span>
        <div className="h-0.5 w-12 bg-gold mx-auto mt-2"></div>
      </div>

      {/* Grid listing */}
      {announcements.length === 0 ? (
        <div className="p-12 text-center border-2 border-dashed border-gray-105 rounded-none text-gray-400 bg-white">
          No announcements published yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {announcements.map(ann => (
            <div key={ann.id} className={`p-8 rounded-sm bg-white border shadow-sm space-y-4 relative overflow-hidden flex flex-col justify-between h-full ${
              ann.important ? 'border-gold bg-[#FCFAF7]' : 'border-gray-100'
            }`}>
              
              {ann.important && (
                <div className="absolute top-4 right-4 text-[#D29B02] flex items-center gap-1 font-bold text-[9px] uppercase font-mono bg-primary px-2.5 py-1">
                  <Pin className="h-3 w-3 fill-gold" /> Urgent Circular
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[9px] text-[#D29B02] font-mono tracking-wider block uppercase font-bold">
                    Posted on {ann.date} • Category: {ann.category}
                  </span>
                  
                  <h3 className="text-sm font-extrabold text-primary leading-snug uppercase tracking-wide">
                    {language === 'en' ? ann.title : ann.title_gu}
                  </h3>
                </div>

                <p className="text-xs text-gray-500 leading-relaxed font-serif pt-1">
                  {language === 'en' ? ann.content : ann.content_gu}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-primary mt-6 select-none font-sans uppercase tracking-wider text-[10px]">
                <span className="text-gold">● Verified Circular</span>
                <span className="text-gray-400 font-mono">Secretary office SSMWS</span>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
