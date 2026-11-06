import { useState, type FormEvent } from 'react';
import PageHeader from '../components/PageHeader';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { t, isArabic } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    type: 'Request a Quote',
    message: ''
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white min-h-screen">
      <PageHeader 
        title={t('contact.title')} 
        description={t('contact.subtitle')}
      />

      <div className="max-w-7xl 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left: Contact Info & Yuyao Headquarters */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">
                {isArabic ? 'تواصل مباشر مع المصنع' : 'Direct Communication'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4">
                {isArabic ? 'دعنا نناقش متطلبات خط إنتاجك القادم.' : "Let's discuss your next production run."}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {t('contact.subtitle')}
              </p>
            </div>
            
            {/* Contact Details Cards */}
            <div className="space-y-4">
              
              {/* WhatsApp Card Highlight */}
              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-5 hover:border-emerald-400 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#25D366] text-white rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                    <WhatsAppIcon className="w-6 h-6 fill-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-base">WhatsApp / WeChat Direct</h3>
                      <span className="bg-emerald-200/60 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">24/7 Live</span>
                    </div>
                    <p className="text-slate-900 font-black text-lg my-1">+86 18567413851</p>
                    <p className="text-slate-500 text-xs mb-3">Instant messaging for quick sample requests & pricing.</p>
                    <a
                      href="https://wa.me/8618567413851?text=Hello%20SG%20Packaging%2C%20I%20would%20like%20to%20inquire%20about%20your%20products."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors shadow-sm"
                    >
                      <WhatsAppIcon className="w-4 h-4 fill-white" />
                      <span>Chat on WhatsApp Now</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 hover:border-blue-300 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white text-blue-600 rounded-xl border border-slate-200 flex items-center justify-center shrink-0 shadow-xs">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base mb-1">Official Export Email</h3>
                    <p className="text-slate-700 font-semibold text-sm">sales@sgpackaging.com</p>
                    <p className="text-slate-500 text-xs mt-1">Average response time: &lt; 4 hours during business days.</p>
                  </div>
                </div>
              </div>

              {/* Physical Factory Location */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 hover:border-blue-300 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white text-slate-800 rounded-xl border border-slate-200 flex items-center justify-center shrink-0 shadow-xs">
                    <MapPin size={22} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 text-base mb-1">Global Locations</h3>
                    
                    <div className="mb-4">
                      <p className="text-slate-800 font-semibold text-sm">US Headquarters</p>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Houston, Texas, USA
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-800 font-semibold text-sm">Manufacturing Plant</p>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Yuyao Plastic Industrial Park, Ningbo, China
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2 text-[11px] font-semibold text-slate-600">
                        <span className="bg-white px-2.5 py-1 rounded-md border border-slate-200">
                          Port: Ningbo Zhoushan
                        </span>
                        <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md border border-blue-200">
                          Train: Yuyao North
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
              {submitted ? (
                <div className="py-16 text-center">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">{t('contact.successTitle')}</h3>
                  <p className="text-slate-600 max-w-md mx-auto text-sm sm:text-base mb-6 leading-relaxed">
                    {t('contact.successDesc')} {isArabic ? 'شكراً لك،' : 'Thank you,'} <strong className="text-slate-900">{formData.name || (isArabic ? 'عميلنا العزيز' : 'valued customer')}</strong>.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors"
                    >
                      {isArabic ? 'إرسال استفسار آخر' : 'Send Another Message'}
                    </button>
                    <a
                      href="https://wa.me/8618567413851?text=Hello%20SG%20Packaging%2C%20I%20just%20submitted%20an%20inquiry%20via%20your%20website."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                    >
                      <WhatsAppIcon className="w-4 h-4 fill-white shrink-0" />
                      <span>{isArabic ? 'المتابعة السريعة عبر واتساب' : 'Speed Up via WhatsApp'}</span>
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h3 className="text-2xl font-black text-slate-900 mb-1">{t('contact.formTitle')}</h3>
                    <p className="text-slate-500 text-xs sm:text-sm">
                      {isArabic ? 'يرجى تقديم تفاصيل المواصفات (مقاس العنق، معدل الضخ، المادة الخام، الكمية التقديرية) للحصول على أفضل تسعير.' : 'Please provide as much specification detail (neck size, output, material, target quantities) as possible for an accurate quote.'}
                    </p>
                  </div>

                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          {t('contact.name')} *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-sm bg-slate-50 focus:bg-white"
                          placeholder={isArabic ? 'مثال: أحمد محمد' : 'e.g. David Miller'}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          {t('contact.company')} *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.company}
                          onChange={(e) => setFormData({...formData, company: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-sm bg-slate-50 focus:bg-white"
                          placeholder={isArabic ? 'اسم الشركة أو العلامة التجارية' : 'e.g. Miller Cosmetics Ltd'}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          {t('contact.email')} *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-sm bg-slate-50 focus:bg-white"
                          placeholder="client@company.com"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          {t('contact.phone')}
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-sm bg-slate-50 focus:bg-white"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        {isArabic ? 'نوع الطلب والاستفسار' : 'Inquiry Scope'}
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-sm bg-slate-50 focus:bg-white font-medium"
                      >
                        <option>{isArabic ? 'طلب تسعير منتجات (FOB Ningbo / CIF)' : 'Request Product Quote (FOB Ningbo / CIF)'}</option>
                        <option>{isArabic ? 'طلب عينات ملموسة مجانية' : 'Request Free Physical Samples'}</option>
                        <option>{isArabic ? 'تصنيع وتطوير قوالب مخصصة OEM' : 'Custom OEM Mold Tooling & Engineering'}</option>
                        <option>{isArabic ? 'جدولة زيارة وتدقيق للمصنع' : 'Schedule Factory Visit & Audit'}</option>
                        <option>{isArabic ? 'استفسار عام عن سلاسل التوريد' : 'General Supply Chain Inquiry'}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        {t('contact.message')}
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-sm bg-slate-50 focus:bg-white placeholder:text-slate-400"
                        placeholder={isArabic ? 'يرجى وصف المنتجات المطلوبة (مثل: بخاخ تريجر 28/400، مضخة لوشن 24/410)، الكمية التقريبية، وميناء الوصول...' : 'Please describe products of interest (e.g. 28/400 trigger sprayers, 24/410 lotion pumps), estimated order volume, destination port, or customization needs...'}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2 text-sm shadow-md"
                    >
                      <span>{t('contact.submit')}</span>
                      <Send size={16} className="rtl:rotate-180 shrink-0" />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
