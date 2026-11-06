import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'light' | 'dark' | 'header';
}

export default function LanguageSwitcher({ className = '', variant = 'header' }: LanguageSwitcherProps) {
  const { language, setLanguage, isArabic } = useLanguage();

  if (variant === 'header') {
    return (
      <div className={`inline-flex items-center gap-1 bg-slate-800/80 hover:bg-slate-800 text-slate-300 rounded-lg p-0.5 border border-slate-700/60 text-[11px] font-medium transition-all ${className}`}>
        <button
          type="button"
          onClick={() => setLanguage('en')}
          className={`px-2 py-0.5 rounded-md transition-all flex items-center gap-1 ${
            language === 'en'
              ? 'bg-blue-600 text-white font-bold shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
          title="Switch to English"
        >
          <span className="text-[10px] tracking-wide">EN</span>
        </button>
        <span className="text-slate-600">/</span>
        <button
          type="button"
          onClick={() => setLanguage('ar')}
          className={`px-2 py-0.5 rounded-md transition-all flex items-center gap-1 ${
            language === 'ar'
              ? 'bg-emerald-600 text-white font-bold shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
          title="التبديل إلى اللغة العربية"
        >
          <span className="text-[11px]">العربية</span>
        </button>
      </div>
    );
  }

  if (variant === 'dark') {
    return (
      <div className={`inline-flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs ${className}`}>
        <Globe size={14} className="text-blue-400 ml-1.5 shrink-0" />
        <button
          type="button"
          onClick={() => setLanguage('en')}
          className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
            language === 'en'
              ? 'bg-blue-600 text-white shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          English
        </button>
        <button
          type="button"
          onClick={() => setLanguage('ar')}
          className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
            language === 'ar'
              ? 'bg-emerald-600 text-white shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          العربية
        </button>
      </div>
    );
  }

  // Light variant
  return (
    <div className={`inline-flex items-center gap-1 bg-slate-100 border border-slate-200/80 rounded-xl p-1 text-xs ${className}`}>
      <Globe size={14} className="text-slate-500 ml-1.5 shrink-0" />
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
          language === 'en'
            ? 'bg-white text-blue-700 font-bold shadow-sm'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        English
      </button>
      <button
        type="button"
        onClick={() => setLanguage('ar')}
        className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
          language === 'ar'
            ? 'bg-white text-emerald-700 font-bold shadow-sm'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        العربية
      </button>
    </div>
  );
}
