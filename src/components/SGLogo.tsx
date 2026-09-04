import React from 'react';

interface SGLogoProps {
  className?: string;
  markOnly?: boolean;
  isDark?: boolean;
  size?: number;
}

export default function SGLogo({
  className = "h-11 w-auto",
  markOnly = false,
  isDark = false,
  size,
}: SGLogoProps) {
  const logoUrl = "/sg_logo_transparent.png";
  const rawFallback = "/sg_logo_transparent.png";

  const Mark = (
    <div
      className={
        isDark
          ? "bg-white/95 px-2 py-1 rounded-lg shadow-sm inline-flex items-center justify-center shrink-0"
          : "inline-flex items-center justify-center shrink-0"
      }
    >
      <img
        src={logoUrl}
        onError={(e) => {
          // Fallback to GitHub raw if local asset is unavailable
          (e.currentTarget as HTMLImageElement).src = rawFallback;
        }}
        alt="SG Packaging Logo"
        className={`${className} object-contain`}
        style={size ? { height: size, width: 'auto' } : undefined}
        referrerPolicy="no-referrer"
      />
    </div>
  );

  if (markOnly) {
    return Mark;
  }

  return (
    <div className="flex items-center gap-3">
      {Mark}
      <div className="flex flex-col leading-none">
        <span
          className={`text-xl font-black tracking-tighter ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          SG <span className={isDark ? 'text-blue-400' : 'text-blue-700'}>PACKAGING</span>
        </span>
        <span
          className={`text-[9px] uppercase tracking-[0.25em] font-bold mt-1 ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          A Division of Sino Gate
        </span>
      </div>
    </div>
  );
}
