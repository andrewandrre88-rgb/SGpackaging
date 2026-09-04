import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import triggerSprayerImg from '../assets/images/trigger_sprayer_1783250299009.jpg';
import lotionPumpImg from '../assets/images/lotion_pump_1783250311172.jpg';
import cosmeticPackagingImg from '../assets/images/cosmetic_packaging_1783250321247.jpg';
import factoryInteriorImg from '../assets/images/factory_interior_1783250334324.jpg';
import qualityControlImg from '../assets/images/quality_control_1783250348911.jpg';
import { Maximize2, X, Filter } from 'lucide-react';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const galleryItems = [
    { src: triggerSprayerImg, title: 'All-Plastic Trigger Sprayers', category: 'sprayers' },
    { src: lotionPumpImg, title: 'High-Viscosity Lotion Pumps', category: 'pumps' },
    { src: cosmeticPackagingImg, title: 'Luxury Cosmetic Acrylic Bottles', category: 'cosmetics' },
    { src: factoryInteriorImg, title: '150+ Injection Machine Hall', category: 'factory' },
    { src: qualityControlImg, title: 'Vacuum Leak & Stroke Testing Lab', category: 'factory' },
    { src: triggerSprayerImg, title: 'Custom Color Match Sprayers', category: 'sprayers' },
    { src: lotionPumpImg, title: 'Lock-Down Cream & Soap Dispensers', category: 'pumps' },
    { src: cosmeticPackagingImg, title: 'Airless Treatment Pump Bottles', category: 'cosmetics' }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="bg-white min-h-screen">
      <PageHeader 
        title="Visual Showcase & Production Gallery" 
        description="Explore high-definition imagery of our manufactured dispensers, automated injection lines, and cleanroom quality inspection units."
      />

      <div className="max-w-7xl 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12 py-10 sm:py-16">
        
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Photos' },
            { id: 'sprayers', label: 'Trigger Sprayers' },
            { id: 'pumps', label: 'Lotion Pumps' },
            { id: 'cosmetics', label: 'Cosmetic Bottles' },
            { id: 'factory', label: 'Factory & Cleanrooms' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Responsive Photo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item, idx) => (
            <div 
              key={idx} 
              onClick={() => setPreviewImage(item.src)}
              className="group aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-200/80 cursor-pointer relative hover:border-blue-400 hover:shadow-lg transition-all duration-300"
            >
              <img 
                src={item.src} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                <span className="self-end p-2 bg-white/90 rounded-lg text-slate-900 shadow-sm">
                  <Maximize2 size={16} />
                </span>
                <span className="text-white text-xs font-bold drop-shadow-md">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Lightbox Preview */}
        {previewImage && (
          <div 
            onClick={() => setPreviewImage(null)}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="relative max-w-4xl max-h-[85vh] bg-white rounded-3xl overflow-hidden p-2 shadow-2xl border border-white/20"
            >
              <button
                onClick={() => setPreviewImage(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <X size={18} />
              </button>
              <img 
                src={previewImage} 
                alt="Enlarged view" 
                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
