import { useLanguage } from '../i18n';
import { CreditCard, Landmark, ShieldAlert, BadgeInfo } from 'lucide-react';
import donationQr from '../assets/images/donation_qr.png';

export default function DonationPage() {
  const { t, language } = useLanguage();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-16 bg-bg-warm font-sans">
      
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs uppercase font-bold text-gold tracking-[0.25em] block">{t('activities')}</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-primary font-display uppercase tracking-tight text-center">
          {language === 'en' ? (
            <>Direct <span className="italic font-serif text-gold font-normal">Donation</span> Desk</>
          ) : t('donationPageTitle')}
        </h1>
        <div className="h-0.5 w-12 bg-gold mx-auto mt-2"></div>
      </div>

      {/* Prophetic tradition quote (Urdu) */}
      <div className="max-w-3xl mx-auto text-center border-y border-gold/30 py-8 px-4" dir="rtl">
        <p className="text-gold font-serif text-2xl sm:text-3xl leading-relaxed">
          لوگوں میں سب سے بہترین وہ ہے جو لوگوں کے لیے سب سے زیادہ نفع بخش ہو۔
        </p>
        <p className="text-[11px] sm:text-xs text-gray-400 uppercase tracking-[0.2em] font-bold mt-4">
          — حدیثِ نبوی ﷺ
        </p>
      </div>

      <div className="max-w-4xl mx-auto">

        <div className="bg-white border border-gold/20 rounded-sm p-5 md:p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-primary">
            <BadgeInfo className="h-4 w-4 text-gold" />
            <h2 className="text-xs font-bold uppercase tracking-widest">{t('donationPolicyTitle')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-gray-600">
            <p className="flex items-start gap-2"><ShieldAlert className="h-3.5 w-3.5 text-gold mt-0.5 shrink-0" /> {t('donationPolicyLine1')}</p>
            <p className="flex items-start gap-2"><ShieldAlert className="h-3.5 w-3.5 text-gold mt-0.5 shrink-0" /> {t('donationPolicyLine2')}</p>
            <p className="flex items-start gap-2"><ShieldAlert className="h-3.5 w-3.5 text-gold mt-0.5 shrink-0" /> {t('donationPolicyLine3')}</p>
            <p className="flex items-start gap-2"><ShieldAlert className="h-3.5 w-3.5 text-gold mt-0.5 shrink-0" /> {t('donationPolicyLine4')}</p>
          </div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-bold">
            Official contact: sabarkhanthasunnimominwelfare@gmail.com
          </p>
        </div>

        {/* Donation methods */}
        <div className="space-y-8">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            
            {/* Direct Bank Wire */}
            <div className="p-6 border border-gray-100 bg-white space-y-4 shadow-sm rounded-sm">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#D29B02] flex items-center gap-2 border-b border-gray-100 pb-3 font-display">
                <Landmark className="h-4 w-4 text-gold" /> {t('donationBankTransfer')}
              </h3>
              <div className="space-y-2.5 text-xs text-gray-500">
                <p className="font-bold text-primary uppercase tracking-wider">{t('donationBankName')}</p>
                <p><span className="font-semibold text-gray-400 uppercase tracking-widest text-[10px]">{t('donationAccHolder')}</span> SABARKANTHA SUNNI MOMIN WELFARE SOCIETY</p>

                <div className="p-2 bg-[#FCFAF7] border border-gray-100 rounded-sm">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider leading-none">{t('donationAccNumber')}</p>
                  <p className="font-mono text-xs font-bold text-primary select-all mt-1">240110100001933</p>
                </div>

                <div className="p-2 bg-[#FCFAF7] border border-gray-100 rounded-sm">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider leading-none">{t('donationIfscCode')}</p>
                  <p className="font-mono text-xs font-bold text-primary select-all mt-1">BKID0002401</p>
                </div>
              </div>
            </div>

            {/* UPI QR Code mock layout */}
            <div className="p-6 border border-gray-100 bg-white space-y-4 flex flex-col items-center justify-between text-center shadow-sm rounded-sm">
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-1.5 border-b border-gray-100 pb-3 w-full justify-center font-display">
                <CreditCard className="h-4 w-4 text-gold" /> {t('donationUpiScan')}
              </h3>
              
              <div className="p-3 border border-gray-100 rounded-sm bg-white flex items-center justify-center">
                <img src={donationQr} alt="Donation UPI QR Code" className="h-40 w-40 object-contain" />
              </div>
              <span className="text-[10px] text-gold font-mono uppercase tracking-widest font-bold">Bank of India</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
