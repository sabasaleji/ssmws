import { useLanguage } from '../i18n';
import { useStore } from '../dbState';
import { CreditCard, ShieldCheck, Landmark } from 'lucide-react';
import donationQr from '../assets/images/donation_qr.png';

export default function DonationPage() {
  const { t } = useLanguage();
  const store = useStore();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-16 bg-bg-warm font-sans">
      
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs uppercase font-bold text-gold tracking-[0.25em] block">{t('activities')}</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-primary font-display uppercase tracking-tight text-center">
          Direct <span className="italic font-serif text-gold font-normal">Donation</span> Desk
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

        {/* Donation methods */}
        <div className="space-y-8">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            
            {/* Direct Bank Wire */}
            <div className="p-6 border border-gray-100 bg-white space-y-4 shadow-sm rounded-sm">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] flex items-center gap-2 border-b border-gray-100 pb-3 font-display">
                <Landmark className="h-4 w-4 text-gold" /> Bank Transfer
              </h3>
              <div className="space-y-2.5 text-xs text-gray-500">
                <p className="font-bold text-primary uppercase tracking-wider">{t('donationBankName')}</p>
                <p><span className="font-semibold text-gray-400 uppercase tracking-widest text-[10px]">A/C Holder:</span> SABARKANTHA SUNNI MOMIN WELFARE SOCIETY</p>

                <div className="p-2 bg-[#FCFAF7] border border-gray-100 rounded-sm">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider leading-none">Account Number</p>
                  <p className="font-mono text-xs font-bold text-primary select-all mt-1">240110100001933</p>
                </div>

                <div className="p-2 bg-[#FCFAF7] border border-gray-100 rounded-sm">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider leading-none">IFSC Code</p>
                  <p className="font-mono text-xs font-bold text-primary select-all mt-1">BKID0002401</p>
                </div>
              </div>
            </div>

            {/* UPI QR Code mock layout */}
            <div className="p-6 border border-gray-100 bg-white space-y-4 flex flex-col items-center justify-between text-center shadow-sm rounded-sm">
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-1.5 border-b border-gray-100 pb-3 w-full justify-center font-display">
                <CreditCard className="h-4 w-4 text-gold" /> UPI Scan Code
              </h3>
              
              <div className="p-3 border border-gray-100 rounded-sm bg-white flex items-center justify-center">
                <img src={donationQr} alt="Donation UPI QR Code" className="h-40 w-40 object-contain" />
              </div>
              <span className="text-[10px] text-gold font-mono uppercase tracking-widest font-bold">Bank of India</span>
            </div>

          </div>

          {/* Live Verified Transparency ledger List */}
          <div className="p-6 rounded-sm bg-white border border-gray-100 space-y-6 shadow-sm">
            <div className="border-b border-gray-100 pb-4 flex justify-between items-center">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-primary font-display">{t('donationReportTitle')}</h3>
                <span className="text-[10px] text-gray-400 block tracking-wider mt-1">{t('donationReportDisclaimer')}</span>
              </div>
              <ShieldCheck className="h-5 w-5 text-gold" />
            </div>

            <div className="divide-y divide-gray-100 text-xs text-gray-500">
              {store.donations.filter(d => d.status === 'Verified').map(donation => (
                <div key={donation.id} className="py-3.5 flex justify-between items-center bg-transparent">
                  <div className="space-y-1">
                    <span className="font-bold text-primary uppercase tracking-wide">{donation.donorName}</span>
                    <span className="block text-[10px] text-gray-400 font-serif">Category: {donation.category} • Ref: {donation.referenceNo}</span>
                  </div>
                  <div className="text-right space-y-0.5">
                    <span className="font-mono font-extrabold text-primary text-sm">₹{donation.amount.toLocaleString()}</span>
                    <span className="block text-[9px] uppercase tracking-widest font-extrabold text-[#D4AF37]">● Audited Receipt issued</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
