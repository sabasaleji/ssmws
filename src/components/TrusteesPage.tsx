import { useLanguage } from '../i18n';
import { useStore } from '../dbState';
import { MapPin } from 'lucide-react';

export default function TrusteesPage() {
  const { t, language } = useLanguage();
  const { trustees } = useStore();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-12 font-sans bg-bg-warm">

      {/* Page Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs uppercase font-bold text-gold tracking-[0.25em] block">{t('trustees')}</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-primary font-display uppercase tracking-tight">
          Managing <span className="italic font-serif text-gold font-normal">Committee</span>
        </h1>
        <div className="h-0.5 w-12 bg-gold mx-auto mt-2"></div>
        <p className="text-xs text-gray-500 font-mono tracking-wider">
          {t('trusteesCount')}: <span className="text-primary font-bold">{trustees.length}</span>
        </p>
      </div>

      {/* Committee roster table */}
      <div className="max-w-4xl mx-auto border border-gray-200 bg-white rounded-sm overflow-hidden shadow-sm">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-primary text-white">
              <th className="w-14 px-4 py-3.5 text-[10px] font-extrabold uppercase tracking-widest text-gold font-display text-center">
                {t('trusteesColNo')}
              </th>
              <th className="px-4 py-3.5 text-[10px] font-extrabold uppercase tracking-widest text-gold font-display">
                {t('trusteesColName')}
              </th>
              <th className="px-4 py-3.5 text-[10px] font-extrabold uppercase tracking-widest text-gold font-display">
                {t('trusteesColRegion')}
              </th>
            </tr>
          </thead>
          <tbody>
            {trustees.map((trustee, idx) => (
              <tr
                key={trustee.id}
                className="border-t border-gray-100 hover:bg-[#FCFAF7] transition-colors"
              >
                <td className="px-4 py-3.5 text-[11px] text-gray-400 font-mono text-center align-top">
                  {idx + 1}
                </td>
                <td className="px-4 py-3.5 text-xs font-bold text-primary align-top">
                  {language === 'en' ? trustee.name : trustee.name_gu}
                </td>
                <td className="px-4 py-3.5 align-top">
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-gray-500 font-serif">
                    <MapPin className="h-3 w-3 text-gold shrink-0" />
                    {language === 'en'
                      ? (trustee.region || '—')
                      : (trustee.region_gu || trustee.region || '—')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
