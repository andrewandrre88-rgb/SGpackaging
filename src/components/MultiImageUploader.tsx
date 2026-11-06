import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Image as ImageIcon, 
  Trash2, 
  Star, 
  Plus, 
  RefreshCw, 
  CheckCircle2, 
  Link as LinkIcon, 
  Layers,
  ArrowLeftRight,
  Maximize2,
  Minimize2,
  ZoomIn,
  X
} from 'lucide-react';
import { optimizeImageFile, formatBytes, OptimizedImageResult } from '../lib/imageUtils';

export interface MultiImageUploaderProps {
  label?: string;
  images: string[];
  onChange: (images: string[]) => void;
  presetImages?: { label: string; url: string }[];
  maxImages?: number;
  helperText?: string;
  required?: boolean;
}

export default function MultiImageUploader({
  label = 'Product Images & Photo Gallery',
  images = [],
  onChange,
  presetImages = [],
  maxImages = 10,
  helperText,
  required = false,
}: MultiImageUploaderProps) {
  const [processing, setProcessing] = useState(false);
  const [processingCount, setProcessingCount] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [singleUrl, setSingleUrl] = useState('');
  const [fitMode, setFitMode] = useState<'cover' | 'contain'>('cover');
  const [individualFit, setIndividualFit] = useState<{ [key: number]: 'cover' | 'contain' }>({});
  const [previewingImage, setPreviewingImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Batch process multiple files from device
  const handleFilesProcess = async (fileList: FileList | File[]) => {
    const files = Array.from(fileList).filter(f => f.type.startsWith('image/'));
    if (files.length === 0) return;

    const remainingSlots = maxImages - images.length;
    if (remainingSlots <= 0) {
      alert(`Maximum of ${maxImages} images allowed per product.`);
      return;
    }

    const filesToUpload = files.slice(0, remainingSlots);
    setProcessing(true);
    setProcessingCount(filesToUpload.length);

    try {
      const optimizedResults: string[] = [];
      for (const file of filesToUpload) {
        const result = await optimizeImageFile(file, 1000, 1000, 0.82);
        optimizedResults.push(result.dataUrl);
      }
      onChange([...images, ...optimizedResults]);
    } catch (err: any) {
      alert(err.message || 'Error processing images from device.');
    } finally {
      setProcessing(false);
      setProcessingCount(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFilesProcess(e.target.files);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesProcess(e.dataTransfer.files);
    }
  };

  const handleRemove = (indexToRemove: number) => {
    const updated = images.filter((_, idx) => idx !== indexToRemove);
    onChange(updated);
  };

  const handleSetAsPrimary = (indexToPrimary: number) => {
    if (indexToPrimary === 0) return;
    const targetImage = images[indexToPrimary];
    const rest = images.filter((_, idx) => idx !== indexToPrimary);
    onChange([targetImage, ...rest]);
  };

  const handleAddUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!singleUrl.trim()) return;
    if (images.length >= maxImages) {
      alert(`Maximum of ${maxImages} images allowed.`);
      return;
    }
    onChange([...images, singleUrl.trim()]);
    setSingleUrl('');
    setShowUrlInput(false);
  };

  const handleAddPreset = (url: string) => {
    if (images.includes(url)) return;
    if (images.length >= maxImages) {
      alert(`Maximum of ${maxImages} images allowed.`);
      return;
    }
    onChange([...images, url]);
  };

  return (
    <div className="space-y-3">
      {/* Hidden Multi-file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        multiple
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="hidden"
      />

      <div className="flex flex-wrap items-center justify-between gap-2">
        <label className="block text-slate-300 font-semibold text-xs flex items-center gap-1.5">
          <Layers size={14} className="text-blue-400" />
          <span>{label}</span>
          {required && <span className="text-rose-400">*</span>}
          <span className="text-[11px] text-slate-400 font-normal">
            ({images.length}/{maxImages} photos)
          </span>
        </label>

        <div className="flex items-center gap-2">
          {presetImages.length > 0 && (
            <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-400">
              <span>Add preset:</span>
              {presetImages.slice(0, 2).map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAddPreset(preset.url)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-0.5 rounded text-[10px] transition-colors cursor-pointer"
                >
                  +{preset.label.split(' ')[0]}
                </button>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1 px-2 py-1 rounded bg-slate-900 border border-slate-800 cursor-pointer"
          >
            <LinkIcon size={11} />
            <span>{showUrlInput ? 'Hide URL' : '+ Image URL'}</span>
          </button>
        </div>
      </div>

      {/* Optional URL addition bar */}
      {showUrlInput && (
        <form onSubmit={handleAddUrl} className="flex gap-2 p-2.5 bg-slate-950 rounded-xl border border-slate-800">
          <input
            type="url"
            value={singleUrl}
            onChange={(e) => setSingleUrl(e.target.value)}
            placeholder="Paste direct image link (https://...)"
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
          >
            Add Image
          </button>
        </form>
      )}

      {/* Main Drag & Drop Zone when NO images uploaded yet */}
      {images.length === 0 ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
            dragOver
              ? 'border-blue-500 bg-blue-500/10'
              : 'border-slate-700 bg-slate-950/60 hover:border-blue-400 hover:bg-slate-950'
          }`}
        >
          <div className="w-14 h-14 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-3">
            {processing ? (
              <RefreshCw size={26} className="animate-spin text-blue-400" />
            ) : (
              <Upload size={26} />
            )}
          </div>
          <p className="text-sm font-bold text-white mb-1">
            {processing ? `Optimizing ${processingCount} photos from device...` : 'Select Multiple Images from Device'}
          </p>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Choose 1 to {maxImages} product photos at once (main angle, side view, nozzle, cap, colors). Drag & drop supported.
          </p>
          <button
            type="button"
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition-all pointer-events-none inline-flex items-center gap-1.5"
          >
            <Upload size={14} />
            <span>Choose Files from Device</span>
          </button>
        </div>
      ) : (
        /* Grid of Uploaded Photos */
        <div className="space-y-3">
          {/* Sizing Mode Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-slate-950/80 rounded-xl border border-slate-800 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-300">Image Fit:</span>
              <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-700/80 text-[11px]">
                <button
                  type="button"
                  onClick={() => {
                    setFitMode('cover');
                    setIndividualFit({});
                  }}
                  className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    fitMode === 'cover'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Fills the square frame evenly edge-to-edge for uniform, perfectly sized catalog cards"
                >
                  <Maximize2 size={12} />
                  <span>Fill Square (Cover)</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFitMode('contain');
                    setIndividualFit({});
                  }}
                  className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    fitMode === 'contain'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Fits the entire product photo inside the card without any cropping"
                >
                  <Minimize2 size={12} />
                  <span>Fit Whole (Contain)</span>
                </button>
              </div>
            </div>

            <span className="text-[11px] text-slate-400 hidden sm:inline">
              Tip: Hover any photo to toggle individual fit or inspect full size.
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((imgUrl, idx) => {
              const isPrimary = idx === 0;
              const currentFit = individualFit[idx] || fitMode;
              const isCover = currentFit === 'cover';

              return (
                <div
                  key={idx}
                  className={`group relative rounded-2xl overflow-hidden border bg-slate-950 flex flex-col transition-all shadow-md ${
                    isPrimary ? 'border-amber-500/80 ring-2 ring-amber-500/30' : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className={`aspect-square w-full relative overflow-hidden flex items-center justify-center transition-colors ${
                    isCover ? 'bg-slate-950 p-0' : 'bg-slate-900/90 p-2'
                  }`}>
                    <img
                      src={imgUrl}
                      alt={`Product Photo ${idx + 1}`}
                      className={`w-full h-full transition-all duration-300 ${
                        isCover 
                          ? 'object-cover object-center group-hover:scale-105' 
                          : 'object-contain'
                      }`}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://placehold.co/200x200?text=Preview+Error';
                      }}
                    />

                    {/* Primary Badge */}
                    {isPrimary ? (
                      <div className="absolute top-2 left-2 bg-amber-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md z-10">
                        <Star size={10} fill="currentColor" />
                        <span>Cover</span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSetAsPrimary(idx)}
                        className="absolute top-2 left-2 bg-slate-900/90 hover:bg-amber-500 hover:text-slate-950 text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors opacity-0 group-hover:opacity-100 cursor-pointer shadow-md flex items-center gap-1 z-10"
                        title="Set this image as primary thumbnail"
                      >
                        <Star size={10} />
                        <span>Make Cover</span>
                      </button>
                    )}

                    {/* Action buttons on top right */}
                    <div className="absolute top-2 right-2 flex items-center gap-1 z-10 opacity-90 group-hover:opacity-100 transition-opacity">
                      {/* Fit toggle per card */}
                      <button
                        type="button"
                        onClick={() => {
                          setIndividualFit(prev => ({
                            ...prev,
                            [idx]: isCover ? 'contain' : 'cover'
                          }));
                        }}
                        className="bg-slate-900/90 hover:bg-blue-600 text-slate-300 hover:text-white p-1.5 rounded-lg transition-colors cursor-pointer shadow-md"
                        title={isCover ? 'Fit whole image' : 'Fill square perfectly'}
                      >
                        {isCover ? <Minimize2 size={11} /> : <Maximize2 size={11} />}
                      </button>

                      {/* Zoom / Full size preview */}
                      <button
                        type="button"
                        onClick={() => setPreviewingImage(imgUrl)}
                        className="bg-slate-900/90 hover:bg-amber-500 hover:text-slate-950 text-slate-300 p-1.5 rounded-lg transition-colors cursor-pointer shadow-md"
                        title="Inspect full resolution"
                      >
                        <ZoomIn size={11} />
                      </button>

                      {/* Delete button */}
                      <button
                        type="button"
                        onClick={() => handleRemove(idx)}
                        className="bg-slate-900/90 hover:bg-rose-500 text-slate-300 hover:text-white p-1.5 rounded-lg transition-colors cursor-pointer shadow-md"
                        title="Remove this photo"
                      >
                        <Trash2 size={11} />
                      </button>
                    </div>
                  </div>

                  <div className="p-2 bg-slate-950 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <span>Photo #{idx + 1}</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-900 border border-slate-800 text-slate-400">
                        {isCover ? 'Cover Fit' : 'Full Fit'}
                      </span>
                    </span>
                    {isPrimary ? (
                      <span className="text-amber-400 font-semibold">Primary</span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSetAsPrimary(idx)}
                        className="text-blue-400 hover:underline cursor-pointer"
                      >
                        Set cover
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {/* "+ Add More Photos" Tile */}
            {images.length < maxImages && (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-4 text-center transition-all cursor-pointer ${
                  dragOver
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-slate-800 bg-slate-950/40 hover:border-blue-500 hover:bg-slate-900'
                }`}
              >
                {processing ? (
                  <RefreshCw size={22} className="animate-spin text-blue-400 mb-1" />
                ) : (
                  <Plus size={24} className="text-slate-400 group-hover:text-blue-400 mb-1" />
                )}
                <span className="text-xs font-bold text-slate-300">
                  {processing ? `Uploading...` : '+ Add More'}
                </span>
                <span className="text-[10px] text-slate-500">From device</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <CheckCircle2 size={13} />
              <span>{images.length} photos ready for catalog & product gallery</span>
            </span>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Upload size={12} />
              <span>Upload more files</span>
            </button>
          </div>
        </div>
      )}

      {helperText && (
        <p className="text-[11px] text-slate-500">{helperText}</p>
      )}

      {/* Full-resolution Image Inspect Modal */}
      {previewingImage && (
        <div 
          onClick={() => setPreviewingImage(null)}
          className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl overflow-hidden flex flex-col items-center"
          >
            <div className="w-full flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <ZoomIn size={14} className="text-blue-400" />
                <span>Full Resolution Image Preview</span>
              </span>
              <button
                type="button"
                onClick={() => setPreviewingImage(null)}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-colors cursor-pointer"
                title="Close preview"
              >
                <X size={16} />
              </button>
            </div>

            <div className="w-full max-h-[75vh] flex items-center justify-center bg-slate-950/60 rounded-2xl p-2 sm:p-4 overflow-hidden border border-slate-800/80">
              <img
                src={previewingImage}
                alt="Original size preview"
                className="max-w-full max-h-[70vh] object-contain rounded-xl"
              />
            </div>

            <div className="w-full flex items-center justify-between pt-3 text-[11px] text-slate-400">
              <span>Adapted to display in storefront & product gallery</span>
              <button
                type="button"
                onClick={() => setPreviewingImage(null)}
                className="text-blue-400 hover:underline cursor-pointer font-semibold"
              >
                Back to editor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
