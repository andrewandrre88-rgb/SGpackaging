import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Link as LinkIcon, CheckCircle2, X, RefreshCw, Sparkles } from 'lucide-react';
import { optimizeImageFile, formatBytes, OptimizedImageResult } from '../lib/imageUtils';

export interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (urlOrDataUrl: string) => void;
  presetImages?: { label: string; url: string }[];
  helperText?: string;
  required?: boolean;
}

export default function ImageUploader({
  label,
  value,
  onChange,
  presetImages = [],
  helperText,
  required = false,
}: ImageUploaderProps) {
  const [mode, setMode] = useState<'device' | 'presets' | 'url'>('device');
  const [processing, setProcessing] = useState(false);
  const [uploadStats, setUploadStats] = useState<OptimizedImageResult | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileProcess = async (file: File) => {
    try {
      setProcessing(true);
      const result = await optimizeImageFile(file, 1000, 1000, 0.82);
      setUploadStats(result);
      onChange(result.dataUrl);
    } catch (err: any) {
      alert(err.message || 'Failed to process image from device.');
    } finally {
      setProcessing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleClear = () => {
    onChange('');
    setUploadStats(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <label className="block text-slate-300 font-semibold text-xs">
          {label} {required && <span className="text-rose-400">*</span>}
        </label>
        
        {/* Source Mode Switcher */}
        <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-[11px]">
          <button
            type="button"
            onClick={() => setMode('device')}
            className={`px-2.5 py-1 rounded-md font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
              mode === 'device' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Upload size={12} />
            <span>Upload from Device</span>
          </button>
          {presetImages.length > 0 && (
            <button
              type="button"
              onClick={() => setMode('presets')}
              className={`px-2.5 py-1 rounded-md font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                mode === 'presets' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              <ImageIcon size={12} />
              <span>Presets</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2.5 py-1 rounded-md font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
              mode === 'url' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            <LinkIcon size={12} />
            <span>Web URL</span>
          </button>
        </div>
      </div>

      {/* Mode 1: Device Upload Dropzone */}
      {mode === 'device' && (
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="hidden"
          />

          {!value ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer ${
                dragOver
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-slate-700 bg-slate-950/60 hover:border-blue-400 hover:bg-slate-950'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-3">
                {processing ? (
                  <RefreshCw size={22} className="animate-spin text-blue-400" />
                ) : (
                  <Upload size={22} />
                )}
              </div>
              <p className="text-xs font-bold text-white mb-1">
                {processing ? 'Optimizing photo from device...' : 'Click to upload image or drag & drop'}
              </p>
              <p className="text-[11px] text-slate-400">
                Supports JPG, PNG, WebP from your computer or phone (auto-optimized for ultra-fast loading)
              </p>
            </div>
          ) : (
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3 flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden shrink-0">
                <img src={value} alt="Preview" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <CheckCircle2 size={14} />
                  <span>Image ready from device</span>
                </div>
                {uploadStats && (
                  <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                    Optimized: {formatBytes(uploadStats.optimizedSize)} ({uploadStats.width}x{uploadStats.height}) • {uploadStats.savingsPercent}% compressed
                  </p>
                )}
                {!uploadStats && (
                  <p className="text-[11px] text-slate-400 mt-0.5 truncate">Active Image Selected</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                >
                  Change
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                  title="Remove image"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mode 2: Presets Library */}
      {mode === 'presets' && presetImages.length > 0 && (
        <div className="space-y-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {presetImages.map((preset, idx) => {
              const isSelected = value === preset.url;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    onChange(preset.url);
                    setUploadStats(null);
                  }}
                  className={`p-2 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-blue-500 bg-blue-500/20 text-white'
                      : 'border-slate-800 bg-slate-950 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <img
                    src={preset.url}
                    alt={preset.label}
                    className="w-10 h-10 rounded-lg object-cover bg-slate-900 shrink-0"
                  />
                  <span className="text-[11px] font-semibold line-clamp-2 leading-tight">
                    {preset.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Mode 3: Direct Web URL */}
      {mode === 'url' && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="url"
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
                setUploadStats(null);
              }}
              placeholder="https://example.com/image.jpg"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            {value && (
              <button
                type="button"
                onClick={handleClear}
                className="px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
          {value && (
            <div className="flex items-center gap-3 p-2 bg-slate-950 rounded-xl border border-slate-800">
              <img
                src={value}
                alt="Preview"
                className="w-12 h-12 rounded-lg object-cover bg-slate-900 shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://placehold.co/100x100?text=Invalid+URL';
                }}
              />
              <span className="text-[11px] text-slate-400 truncate">Preview loaded from external URL</span>
            </div>
          )}
        </div>
      )}

      {helperText && (
        <p className="text-[11px] text-slate-500">{helperText}</p>
      )}
    </div>
  );
}
