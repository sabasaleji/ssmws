import { useLanguage } from '../i18n';
import {
  GraduationCap,
  Users,
  CalendarDays,
  MapPin,
  IndianRupee,
  CheckCircle2,
} from 'lucide-react';

export default function MockBoardExamPage() {
  const { t } = useLanguage();

  // Quick reference facts — the at-a-glance card row.
  const facts = [
    { icon: Users, label: t('mockBoardFactWhoLabel'), value: t('mockBoardFactWhoValue') },
    { icon: CalendarDays, label: t('mockBoardFactWhenLabel'), value: t('mockBoardFactWhenValue') },
    { icon: MapPin, label: t('mockBoardFactWhereLabel'), value: t('mockBoardFactWhereValue') },
    { icon: IndianRupee, label: t('mockBoardFactFeeLabel'), value: t('mockBoardFactFeeValue') },
  ];

  const reasons = [
    t('mockBoardWhy1'),
    t('mockBoardWhy2'),
    t('mockBoardWhy4'),
    t('mockBoardWhy5'),
  ];

  const steps = [
    { title: t('mockBoardStep1Title'), desc: t('mockBoardStep1Desc') },
    { title: t('mockBoardStep2Title'), desc: t('mockBoardStep2Desc') },
    { title: t('mockBoardStep3Title'), desc: t('mockBoardStep3Desc') },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 space-y-16 font-sans bg-bg-warm">

      {/* Page Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-2 text-xs uppercase font-bold text-gold tracking-[0.25em]">
          <GraduationCap className="h-4 w-4" />
          {t('mockBoardEyebrow')}
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-primary font-display uppercase tracking-tight">
          {t('mockBoardTitleLead')} <span className="italic font-serif text-gold font-normal">{t('mockBoardTitleAccent')}</span>
        </h1>
        <div className="h-0.5 w-12 bg-gold mx-auto mt-2"></div>
        <p className="text-xs sm:text-sm text-gray-500 font-serif leading-relaxed max-w-xl mx-auto pt-1">
          {t('mockBoardSubtitle')}
        </p>
      </div>

      {/* Quick Facts row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {facts.map(fact => (
          <div key={fact.label} className="bg-white border border-gray-100 rounded-sm p-5 shadow-sm space-y-2.5">
            <fact.icon className="h-5 w-5 text-gold" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{fact.label}</p>
            <p className="text-xs font-bold text-primary leading-snug font-serif">{fact.value}</p>
          </div>
        ))}
      </div>

      {/* About the Programme */}
      <section className="bg-white border border-gray-100 rounded-sm p-6 md:p-10 shadow-sm space-y-5">
        <h2 className="text-xs font-bold text-primary uppercase tracking-[0.15em] border-b pb-2.5 font-display">
          {t('mockBoardAboutTitle')}
        </h2>
        <p className="text-sm text-gray-600 font-serif leading-relaxed">{t('mockBoardAboutP1')}</p>
        <p className="text-sm text-gray-600 font-serif leading-relaxed">{t('mockBoardAboutP2')}</p>
      </section>

      {/* Why We Do It */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary font-display uppercase tracking-tight">
            {t('mockBoardWhyTitle')}
          </h2>
          <div className="h-0.5 w-10 bg-gold mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reasons.map((reason, idx) => (
            <div key={idx} className="flex items-start gap-3 bg-white border border-gray-100 rounded-sm p-5 shadow-sm">
              <CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-0.5" />
              <p className="text-xs text-gray-600 font-serif leading-relaxed">{reason}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works — numbered steps */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary font-display uppercase tracking-tight">
            {t('mockBoardHowTitle')}
          </h2>
          <div className="h-0.5 w-10 bg-gold mx-auto"></div>
        </div>
        <div className="space-y-4">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-4 bg-white border border-gray-100 rounded-sm p-5 md:p-6 shadow-sm">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-primary text-gold font-extrabold font-display text-sm">
                {idx + 1}
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-primary uppercase tracking-wide font-display">{step.title}</h3>
                <p className="text-xs text-gray-600 font-serif leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
