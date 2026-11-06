import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import WhatsAppIcon from '../WhatsAppIcon';
import SGLogo from '../SGLogo';
import LanguageSwitcher from '../LanguageSwitcher';
import { useLanguage } from '../../context/LanguageContext';

export default function Footer() {
  const { t, translateCategory } = useLanguage();

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="flex flex-col">
            <Link to="/" className="flex items-center gap-3 mb-6 hover:opacity-95 transition-opacity">
              <SGLogo className="h-11 w-auto" markOnly isDark />
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter text-white leading-none">
                  SG <span className="text-blue-400">PACKAGING</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.28em] font-bold text-slate-400 mt-1">
                  A Division of Sino Gate
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 mb-8 leading-relaxed pr-4">
              {t('footer.companyDesc')}
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse mb-6">
              <a href="#" aria-label="LinkedIn" className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-colors">
                <Linkedin size={14} />
              </a>
              <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-colors">
                <Facebook size={14} />
              </a>
              <a href="#" aria-label="Twitter" className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-colors">
                <Twitter size={14} />
              </a>
              <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-colors">
                <Instagram size={14} />
              </a>
            </div>

            {/* Language Switcher in Footer */}
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">{t('nav.language')}</p>
              <LanguageSwitcher variant="dark" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-4">{t('footer.quickLinks')}</p>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">{t('nav.about')}</Link></li>
              <li><Link to="/products" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">{t('nav.products')}</Link></li>
              <li><Link to="/factory" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">{t('nav.factory')}</Link></li>
              <li><Link to="/gallery" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">{t('nav.gallery')}</Link></li>
              <li><Link to="/blog" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">{t('nav.blog')}</Link></li>
              <li><Link to="/contact" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-4">{t('footer.productCategories')}</p>
            <ul className="space-y-3">
              <li><Link to="/products?category=Trigger+Sprayers" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">{translateCategory('Trigger Sprayers')}</Link></li>
              <li><Link to="/products?category=Lotion+Pumps" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">{translateCategory('Lotion Pumps')}</Link></li>
              <li><Link to="/products?category=Fine+Mist+Sprayers" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">{translateCategory('Fine Mist Sprayers')}</Link></li>
              <li><Link to="/products?category=Cosmetic+Packaging" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">{translateCategory('Cosmetic Packaging')}</Link></li>
              <li><Link to="/products?category=Plastic+Bottles" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">{translateCategory('Plastic Bottles')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-4">{t('contact.houstonOffice')}</p>
            <p className="text-sm font-medium text-slate-300 mb-6">{t('footer.houstonLocation')}</p>
            
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-4">{t('contact.chinaOffice')}</p>
            <p className="text-sm font-medium text-slate-300 mb-6">{t('footer.yuyaoLocation')}</p>
            
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-4">{t('footer.inquirySupport')}</p>
            <p className="text-sm font-medium text-slate-300 mb-2">sales@sgpackaging.com</p>
            <a
              href="https://wa.me/8618567413851?text=Hello%20SG%20Packaging%2C%20I%20would%20like%20to%20inquire%20about%20your%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#25D366] hover:text-emerald-400 transition-colors mb-6"
            >
              <WhatsAppIcon className="w-4 h-4 fill-[#25D366] shrink-0" />
              <span>WhatsApp: +86 18567413851</span>
            </a>
            
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-4">{t('nav.leadTime')}</p>
            <p className="text-sm font-medium text-slate-300">15–25 Days</p>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-medium text-slate-500">
          <p>&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
          <div className="flex space-x-6 rtl:space-x-reverse mt-4 md:mt-0 items-center">
            <Link to="/about" className="hover:text-white transition-colors">{t('nav.about')}</Link>
            <Link to="/contact" className="hover:text-white transition-colors">{t('nav.contact')}</Link>
            <Link to="/admin" className="text-slate-400 hover:text-blue-400 transition-colors">{t('nav.admin')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
