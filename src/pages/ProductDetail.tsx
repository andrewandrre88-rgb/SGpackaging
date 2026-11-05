import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../services/storeService';
import { useSEO } from '../lib/useSEO';
import { ArrowLeft, Mail, Download, Tag } from 'lucide-react';
import { useState } from 'react';
import WhatsAppIcon from '../components/WhatsAppIcon';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { products, loading } = useProducts();
  const product = products.find(p => p.id === id);
  const [activeImage, setActiveImage] = useState(0);

  useSEO({
    title: product ? `${product.name} - Packaging Manufacturer` : 'Packaging Catalog',
    description: product ? `${product.shortDescription} Manufactured by SG Packaging in Yuyao with US HQ in Houston.` : undefined,
    keywords: product?.seoKeywords || (product ? `${product.name}, ${product.category}, trigger sprayer, packaging manufacturer` : undefined),
    image: product?.image
  });

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-4">Product Not Found</h2>
        <Link to="/products" className="text-blue-600 font-bold hover:underline">Return to Products</Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6">
          <Link to="/products" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-blue-600 flex items-center transition-colors">
            <ArrowLeft size={14} className="mr-2" /> Back to Catalog
          </Link>
        </div>
      </div>

      <div className="max-w-7xl 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 2xl:gap-16">
          {/* Image Gallery - Sticky on Computer / Desktop */}
          <div className="lg:col-span-6 2xl:col-span-5">
            <div className="lg:sticky lg:top-36 flex flex-col gap-4">
              <div className="aspect-square w-full bg-slate-50/60 border border-slate-200 rounded-3xl overflow-hidden flex items-center justify-center p-8 sm:p-12 shadow-sm">
                <img 
                  src={product.gallery[activeImage] || product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>
              {product.gallery.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.gallery.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`relative aspect-square rounded-2xl overflow-hidden border-2 bg-slate-50 flex items-center justify-center p-2 transition-all ${
                        activeImage === idx ? 'border-blue-600 shadow-sm' : 'border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
              
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 text-xs text-slate-500 flex items-center justify-between mt-2">
                <span>Direct Yuyao Factory Production</span>
                <span className="font-semibold text-slate-700">Sample Dispatch: 2-3 Days</span>
              </div>
            </div>
          </div>

          {/* Product Info & Purchase Guidance */}
          <div className="lg:col-span-6 2xl:col-span-7 flex flex-col">
            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full w-max border border-blue-200/60">
              <span>{product.category}</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-600">Model: {product.id.toUpperCase()}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl 2xl:text-5xl font-black tracking-tight text-slate-900 mb-4 sm:mb-6 leading-tight">
              {product.name}
            </h1>

            <p className="text-slate-600 text-base sm:text-lg mb-8 leading-relaxed">
              {product.description}
            </p>
            
            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">Minimum Order Qty</span>
                <span className="font-bold text-slate-900 text-base sm:text-lg">{product.moq}</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">Neck Dimension</span>
                <span className="font-bold text-slate-900 text-base sm:text-lg">{product.specifications['Neck Size'] || 'Custom'}</span>
              </div>
              <div className="col-span-2 sm:col-span-1 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">Standard Output</span>
                <span className="font-bold text-slate-900 text-base sm:text-lg">{product.specifications['Output'] || '1.0 - 2.0 ml'}</span>
              </div>
            </div>

            {/* Colors and Packaging */}
            <div className="space-y-4 mb-8">
              <div className="bg-white p-4 rounded-2xl border border-slate-200">
                <span className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-2">Color Options</span>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-semibold rounded-lg">
                      {c}
                    </span>
                  ))}
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg border border-blue-200">
                    Pantone Custom Matching Available
                  </span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200">
                <span className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">Export Packaging Details</span>
                <span className="font-medium text-slate-700 text-sm">{product.packagingDetails}</span>
              </div>

              {/* SEO Search Tags */}
              {product.seoKeywords && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <span className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-2 flex items-center gap-1.5">
                    <Tag size={12} className="text-blue-500" />
                    <span>Search & Industry Tags</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.seoKeywords.split(',').map((kw, i) => (
                      <span key={i} className="px-2.5 py-0.5 bg-white text-slate-600 text-xs font-medium rounded-md border border-slate-200">
                        #{kw.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons for Desktop and Mobile */}
            <div className="flex flex-col sm:flex-row gap-3.5 pt-4 border-t border-slate-100">
              <a 
                href={`https://wa.me/8613757050848?text=${encodeURIComponent(`Hello SG Packaging, I would like to inquire about ${product.name} (MOQ: ${product.moq}, Neck: ${product.specifications['Neck Size'] || 'N/A'}).`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl font-bold transition-all shadow-md active:scale-95 text-sm sm:text-base"
              >
                <WhatsAppIcon className="w-5 h-5 fill-white" />
                <span>Chat on WhatsApp (+86 13757050848)</span>
              </a>
              <Link
                to="/contact" 
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-blue-600 transition-colors shadow text-sm sm:text-base"
              >
                <Mail size={18} />
                <span>Request Quotation</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Detailed Specs and Features Section */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 pt-12 border-t border-slate-200">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-slate-900 mb-6">Key Engineering Features</h3>
            <ul className="space-y-3.5">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-start bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-blue-100 text-blue-700 mr-3.5 shrink-0 text-xs font-bold">✓</span>
                  <span className="text-slate-700 text-sm font-medium leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-slate-900 mb-6">Technical Specifications</h3>
            <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs">
              {Object.entries(product.specifications).map(([key, value], index) => (
                <div key={key} className={`p-4 flex justify-between items-center ${index !== 0 ? 'border-t border-slate-100' : ''} ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}`}>
                  <span className="text-slate-500 font-medium text-xs sm:text-sm">{key}</span>
                  <span className="font-bold text-slate-900 text-xs sm:text-sm text-right max-w-[60%]">{value}</span>
                </div>
              ))}
            </div>
            
            <a
              href={`https://wa.me/8613757050848?text=${encodeURIComponent(`Hello SG Packaging, please send me the technical drawing and TDS for ${product.name}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full flex items-center justify-center px-6 py-3.5 border border-slate-200 text-slate-800 rounded-xl font-bold text-xs sm:text-sm hover:bg-slate-50 transition-colors"
            >
              <Download size={16} className="mr-2 text-slate-500" />
              <span>Request Technical Drawing & TDS</span>
            </a>
          </div>
        </div>

        {/* Related Products Bar */}
        <div className="mt-20 pt-12 border-t border-slate-200">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900">Explore More Dispensers</h3>
            <Link to="/products" className="text-blue-600 font-bold text-xs sm:text-sm hover:underline">
              View Catalog →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.filter(p => p.id !== product.id).slice(0, 3).map((item) => (
              <Link
                key={item.id}
                to={`/products/${item.id}`}
                className="group border border-slate-200 rounded-2xl p-4 bg-white hover:border-blue-400 hover:shadow-lg transition-all flex items-center gap-4"
              >
                <div className="w-20 h-20 bg-slate-50 rounded-xl p-2 shrink-0 border border-slate-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-blue-600 uppercase">{item.category}</span>
                  <h4 className="font-bold text-slate-900 text-sm truncate group-hover:text-blue-600 transition-colors">{item.name}</h4>
                  <p className="text-xs text-slate-400 mt-1 font-medium">MOQ: {item.moq}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
