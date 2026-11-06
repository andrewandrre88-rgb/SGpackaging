import WhatsAppIcon from './WhatsAppIcon';
import { useLanguage } from '../context/LanguageContext';

export default function WhatsAppButton() {
  const { isArabic } = useLanguage();
  const phoneNumber = '8618567413851';
  const displayPhone = '+86 18567413851';
  const message = isArabic 
    ? 'مرحباً SG Packaging، أود الاستفسار عن منتجات التغليف والضخ الخاصة بكم.' 
    : 'Hello SG Packaging, I would like to inquire about your packaging products.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <aside
      aria-label="WhatsApp Contact"
      className="fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-50 flex items-center"
    >
      <a
        id="floating-whatsapp-btn"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat on WhatsApp at ${displayPhone}`}
        className="group flex items-center gap-3 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-3 rounded-full shadow-[0_8px_25px_rgba(37,211,102,0.42)] hover:shadow-[0_12px_32px_rgba(37,211,102,0.6)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
      >
        <div className="relative flex items-center justify-center shrink-0">
          <WhatsAppIcon className="w-7 h-7 fill-white drop-shadow-sm transition-transform duration-300 group-hover:scale-110" />
          <span className="absolute -top-1 -right-1 rtl:-right-auto rtl:-left-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white border border-[#25D366]"></span>
          </span>
        </div>
        <div className="flex flex-col text-left rtl:text-right leading-tight pr-1 rtl:pr-0 rtl:pl-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-100">
            {isArabic ? 'واتساب المبيعات' : 'WhatsApp Us'}
          </span>
          <span className="text-xs font-extrabold tracking-wide whitespace-nowrap" dir="ltr">{displayPhone}</span>
        </div>
      </a>
    </aside>
  );
}
