import React, { useRef, useState } from 'react';
import { useSiteBranding, saveSiteLogo } from '../services/storeService';
import { useAuth } from '../context/AuthContext';
import { Upload } from 'lucide-react';

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
  const { logoUrl: brandLogoUrl } = useSiteBranding();
  const { isAdmin } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  // User requested logo link from ChatGPT
  const userRequestedLogoUrl = "blob:https://chatgpt.com/273c1348-412a-42cd-b2a9-3e5f8d851a4b";
  const primaryFallback = "/yilai_factory_logo.jpg";
  const rawFallback = "/sg_logo_transparent.png";

  // Prioritize uploaded brand logo, then requested ChatGPT link, then dedicated Yi Lai factory logo
  const logoUrl = brandLogoUrl || userRequestedLogoUrl || primaryFallback;

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        try {
          await saveSiteLogo(dataUrl);
        } catch (err) {
          console.error('Failed to save logo from drop/upload', err);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const Mark = (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
      className={
        isDark
          ? `relative bg-white/95 px-2 py-1 rounded-lg shadow-sm inline-flex items-center justify-center shrink-0 transition-all ${isDragOver ? 'ring-2 ring-blue-400 scale-105' : ''}`
          : `relative inline-flex items-center justify-center shrink-0 transition-all ${isDragOver ? 'ring-2 ring-blue-500 scale-105 rounded-lg' : ''}`
      }
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png,image/jpeg,image/webp,image/svg+xml"
        className="hidden"
      />
      <img
        src={logoUrl}
        onError={(e) => {
          const img = e.currentTarget as HTMLImageElement;
          // Fall back gracefully if cross-origin blob link is blocked by browser security
          if (img.src !== primaryFallback && img.src.includes('blob:')) {
            img.src = primaryFallback;
          } else if (img.src !== rawFallback) {
            img.src = rawFallback;
          }
        }}
        alt="Yi Lai Plastics Factory Logo"
        className={`${className} object-contain transition-transform`}
        style={size ? { height: size, width: 'auto' } : undefined}
        referrerPolicy="no-referrer"
      />

      {/* Admin Quick Logo Upload Trigger */}
      {isAdmin && isHovered && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          className="absolute inset-0 bg-slate-900/70 backdrop-blur-xs rounded-lg flex items-center justify-center text-white text-[10px] font-bold gap-1 transition-opacity cursor-pointer shadow-sm"
          title="Click to upload custom logo file or drop image here"
        >
          <Upload size={12} />
          <span className="hidden sm:inline">Change</span>
        </button>
      )}
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
          YI LAI <span className={isDark ? 'text-blue-400' : 'text-blue-700'}>PLASTICS</span>
        </span>
        <span
          className={`text-[9px] uppercase tracking-[0.25em] font-bold mt-1 ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          Plastics &amp; Packaging Factory
        </span>
      </div>
    </div>
  );
}
