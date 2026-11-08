import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, Clock, ShieldCheck, Globe } from 'lucide-react';
import { cn } from '../../lib/utils';
import WhatsAppIcon from '../WhatsAppIcon';
import SGLogo from '../SGLogo';
import LanguageSwitcher from '../LanguageSwitcher';
import { useLanguage } from '../../context/LanguageContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, isArabic } = useLanguage();

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.products'), path: '/products' },
    { name: t('nav.factory'), path: '/factory' },
    { name: t('nav.gallery'), path: '/gallery' },
    { name: t('nav.blog'), path: '/blog' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-300">
      {/* Top Utility Bar - Visible on desktop and laptops */}
      <div className="hidden md:block bg-slate-950 text-slate-300 text-xs border-b border-slate-800">
        <div className="max-w-7xl 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 flex justify-between items-center h-9">
          <div className="flex items-center space-x-6 rtl:space-x-reverse text-[11px] tracking-wide text-slate-400">
            <span className="flex items-center gap-1.5 text-slate-300 font-medium">
              <MapPin size={13} className="text-blue-400 shrink-0" />
              <span>{t('nav.houstonHq')} | {t('nav.yuyaoFactory')}</span>
            </span>
            <span className="hidden lg:inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{t('nav.isoVerified')}</span>
            </span>
            <span className="hidden xl:inline-flex items-center gap-1 text-slate-400">
              <Clock size={12} className="text-slate-400 shrink-0" />
              <span>{t('nav.leadTime')}</span>
            </span>
          </div>

          <div className="flex items-center space-x-4 rtl:space-x-reverse text-[11px]">
            <a
              href="mailto:sales@sgpackaging.com"
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Mail size={12} className="text-blue-400 shrink-0" />
              <span>sales@sgpackaging.com</span>
            </a>
            <span className="text-slate-700">|</span>
            <a
              href="https://wa.me/8618567413851"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366] shrink-0" />
              <span>WhatsApp: +86 18567413851</span>
            </a>
            <span className="text-slate-700">|</span>
            <Link
              to="/admin"
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors font-medium"
              title="Admin Management Dashboard"
            >
              <ShieldCheck size={12} className="text-blue-400 shrink-0" />
              <span>{t('nav.admin')}</span>
            </Link>
            <span className="text-slate-700">|</span>
            {/* Language Switcher in Top Bar */}
            <LanguageSwitcher variant="header" />
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex justify-between items-center h-20 sm:h-22">
            <Link to="/" className="flex items-center gap-3 hover:opacity-95 transition-opacity shrink-0">
              <SGLogo className="h-10 sm:h-12 w-auto" markOnly />
              <div className="flex flex-col">
                <span className="text-lg sm:text-2xl font-black tracking-tighter text-slate-900 leading-none">
                  YI LAI <span className="text-blue-700">PLASTICS</span>
                </span>
                <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.28em] font-bold text-slate-400 mt-1">
                  Plastics &amp; Packaging Factory
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-3 xl:gap-7 2xl:gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    cn(
                      "text-xs xl:text-sm font-semibold tracking-tight transition-colors py-2 px-1 relative group",
                      isActive
                        ? "text-blue-600 font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600 after:rounded-full"
                        : "text-slate-600 hover:text-slate-900"
                    )
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Actions for Desktop/Laptop */}
            <div className="hidden lg:flex items-center gap-2.5 xl:gap-3.5">
              <a
                href="https://wa.me/8618567413851?text=Hello%20Yi%20Lai%20Plastics%20Factory%2C%20I%20would%20like%20to%20inquire%20about%20your%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 xl:px-4 py-2 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs font-bold rounded-full transition-colors border border-emerald-200 shadow-sm shrink-0"
                title="Chat on WhatsApp (+86 18567413851)"
              >
                <WhatsAppIcon className="w-4 h-4 fill-[#25D366] shrink-0" />
                <span className="hidden xl:inline">WhatsApp</span>
                <span className="text-slate-800 font-semibold text-[11px]">+86 18567413851</span>
              </a>
              <Link 
                to="/contact" 
                className="px-4 xl:px-6 py-2.5 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow shrink-0"
              >
                {t('nav.requestQuote')}
              </Link>
            </div>

            {/* Mobile / Tablet Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              <LanguageSwitcher variant="light" className="text-[10px]" />
              <a
                href="https://wa.me/8618567413851?text=Hello%20Yi%20Lai%20Plastics%20Factory%2C%20I%20would%20like%20to%20inquire%20about%20your%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
                aria-label="WhatsApp Us"
              >
                <WhatsAppIcon className="w-6 h-6 fill-[#25D366]" />
              </a>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Navigation Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl max-h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="px-4 pt-3 pb-6 space-y-1">
            <div className="pb-3 border-b border-slate-100 mb-2 flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 px-1">
                {t('nav.language')}:
              </span>
              <LanguageSwitcher variant="light" />
            </div>
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "flex items-center justify-between px-3 py-3 rounded-lg text-base font-medium transition-colors",
                    isActive ? "text-blue-600 bg-blue-50/70 font-bold" : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                  )
                }
              >
                <span>{link.name}</span>
                <span className="text-slate-400 text-xs rtl:rotate-180">›</span>
              </NavLink>
            ))}

            <div className="pt-4 border-t border-slate-100 mt-3 space-y-2">
              <a
                href="https://wa.me/8618567413851?text=Hello%20Yi%20Lai%20Plastics%20Factory%2C%20I%20would%20like%20to%20inquire%20about%20your%20products."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full text-center bg-[#25D366] text-white px-5 py-3 rounded-xl text-sm font-bold shadow-md hover:bg-[#20ba59] transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5 fill-white" />
                <span>Chat on WhatsApp (+86 18567413851)</span>
              </a>
              <Link 
                to="/contact" 
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-slate-900 text-white px-5 py-3 rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-blue-600 transition-colors"
              >
                {t('nav.requestQuote')}
              </Link>
              <Link 
                to="/admin" 
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full text-center bg-slate-100 text-slate-800 px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors border border-slate-200"
              >
                <ShieldCheck size={14} className="text-blue-600" />
                <span>{t('nav.admin')}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
