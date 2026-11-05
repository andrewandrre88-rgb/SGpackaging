import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data';
import { useProducts } from '../services/storeService';
import { motion } from 'motion/react';
import { CheckCircle2, Globe2, ShieldCheck, Factory, Award, ArrowRight, Sparkles, Box, Phone } from 'lucide-react';
import factoryInteriorImg from '../assets/images/factory_interior_1783250334324.jpg';
import qualityControlImg from '../assets/images/quality_control_1783250348911.jpg';
import WhatsAppIcon from '../components/WhatsAppIcon';

export default function Home() {
  const { products } = useProducts();
  return (
    <div className="flex-1 flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-100 overflow-hidden">
        <div className="max-w-7xl 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12 py-12 sm:py-16 lg:py-24 2xl:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 2xl:gap-16 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <motion.div 
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full mb-6 w-max shadow-xs">
                  <Sparkles size={14} className="text-blue-600" />
                  <span>Direct Factory in Yuyao, Ningbo • Sino Gate Division</span>
                </div>

                <h1 className="text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-black leading-[1.08] tracking-tight text-slate-900 mb-6">
                  Precision Packaging <br className="hidden sm:inline" />
                  <span className="text-blue-600">Engineered For Global Brands</span>
                </h1>

                <p className="text-slate-600 text-base sm:text-lg lg:text-xl max-w-2xl leading-relaxed mb-8">
                  World-class trigger sprayers, lotion pumps, fine mist dispensers, and custom plastic bottles manufactured in our certified Yuyao facility. Direct factory pricing with strict international QC.
                </p>

                {/* Key Metric Highlights on Computer / Desktop */}
                <div className="grid grid-cols-3 gap-3 sm:gap-6 py-4 mb-8 border-y border-slate-200/80">
                  <div>
                    <div className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900">50,000<span className="text-blue-600">m²</span></div>
                    <div className="text-[11px] sm:text-xs text-slate-500 font-medium">Factory Facility</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900">150<span className="text-blue-600">+</span></div>
                    <div className="text-[11px] sm:text-xs text-slate-500 font-medium">Injection Machines</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900">50<span className="text-blue-600">+</span></div>
                    <div className="text-[11px] sm:text-xs text-slate-500 font-medium">Countries Exported</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <Link
                    to="/products"
                    className="px-8 py-4 bg-blue-600 text-white text-center font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all transform active:scale-95"
                  >
                    Explore Product Catalog
                  </Link>
                  <a
                    href="https://wa.me/8618567413851?text=Hello%20SG%20Packaging%2C%20I%20would%20like%20to%20request%20a%20catalog%20and%20pricing."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm sm:text-base rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-95"
                  >
                    <WhatsAppIcon className="w-5 h-5 fill-white" />
                    <span>WhatsApp Sales (+86 18567413851)</span>
                  </a>
                  <Link
                    to="/contact"
                    className="px-6 py-4 border-2 border-slate-200 hover:border-slate-400 text-slate-800 text-center font-bold text-sm sm:text-base rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    Request Quote
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Right Visual Column (Responsive across mobile, tablet, laptop & 4K) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-100 aspect-[4/3] lg:aspect-[5/4] 2xl:aspect-square">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  src={factoryInteriorImg}
                  alt="SG Packaging automated factory floor in Yuyao, Ningbo"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-900/10"></div>

                {/* Top Badge */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center gap-2">
                  <span className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-900 shadow-md">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                    <span>ISO 9001:2015 Verified</span>
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1.5 bg-slate-900/90 text-white text-[11px] font-semibold px-3 py-1 rounded-full backdrop-blur-md">
                    <Award size={13} className="text-amber-400" />
                    Yuyao Hub
                  </span>
                </div>

                {/* Bottom Floating Glass Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 sm:p-5 bg-white/95 backdrop-blur-md rounded-2xl border border-white/80 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                        <Factory size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 leading-tight">Yuyao Smart Facility</h4>
                        <p className="text-xs text-slate-500 mt-0.5">Automated assembly & Class 100k cleanroom</p>
                      </div>
                    </div>
                    <Link
                      to="/factory"
                      className="hidden sm:inline-flex text-xs font-bold text-blue-600 hover:text-blue-800 items-center gap-1 shrink-0"
                    >
                      Tour <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose Us - Responsive Grid */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              Why Partner With Us
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 mt-3">
              Direct Chinese Manufacturing With Global Reliability
            </h2>
            <p className="mt-3 text-slate-500 text-sm sm:text-base leading-relaxed">
              We eliminate middlemen to bring global cosmetic, chemical, and household brands direct-from-source packaging solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                icon: ShieldCheck,
                title: 'Strict Quality Control',
                desc: '100% leak testing, drop tests, and optical dimension verification on all production batches.',
                badge: 'Zero-Defect Goal'
              },
              {
                icon: Factory,
                title: 'Direct From Yuyao Factory',
                desc: 'Located at the heart of the world packaging capital, providing unmatched manufacturing capacity and pricing.',
                badge: 'Factory Direct'
              },
              {
                icon: Globe2,
                title: 'Worldwide Export Network',
                desc: 'Reliable sea and air freight logistics to North America, Europe, Australia, and 50+ countries.',
                badge: '50+ Countries'
              },
              {
                icon: CheckCircle2,
                title: 'Custom Mold & OEM/ODM',
                desc: 'In-house mold engineering, 3D prototyping, custom color matching, and private label branding.',
                badge: 'Full OEM/ODM'
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="flex flex-col p-6 sm:p-7 rounded-2xl border border-slate-200/90 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-slate-50/50 hover:bg-white group"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 bg-blue-100/70 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-xs">
                    <feature.icon size={24} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 group-hover:bg-blue-50 group-hover:text-blue-700 px-2.5 py-1 rounded-full transition-colors">
                    {feature.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories - Responsive Grid with Desktop Hover Effects */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12 flex flex-col gap-10">
          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-end gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Product Categories</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 mt-1">
                Explore Packaging Categories
              </h2>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-blue-600 text-sm font-bold border-b-2 border-blue-600 pb-0.5 hover:text-blue-800 transition-colors"
            >
              <span>View All 8 Categories</span>
              <ArrowRight size={15} />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {CATEGORIES.slice(0, 8).map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="group cursor-pointer block bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 hover:border-blue-400 hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-square bg-slate-50 rounded-xl mb-4 overflow-hidden relative flex items-center justify-center p-4 border border-slate-100 group-hover:bg-blue-50/30 transition-colors">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {category.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-medium">{category.count} Models Available</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - Responsive Showcase */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12 flex flex-col gap-10">
          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-end gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Factory Showcase</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 mt-1">
                Featured Dispensers & Packaging
              </h2>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-blue-600 text-sm font-bold border-b-2 border-blue-600 pb-0.5 hover:text-blue-800 transition-colors"
            >
              <span>Browse Entire Catalog</span>
              <ArrowRight size={15} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {products.slice(0, 3).map((product) => (
              <div
                key={product.id}
                className="group border border-slate-200/90 rounded-2xl overflow-hidden hover:border-blue-400 hover:shadow-xl transition-all duration-300 bg-white flex flex-col"
              >
                <Link to={`/products/${product.id}`} className="relative h-64 sm:h-72 bg-slate-50 overflow-hidden block p-6 flex items-center justify-center border-b border-slate-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest text-slate-700 shadow-xs border border-slate-200">
                    {product.category}
                  </div>
                </Link>
                <div className="p-6 sm:p-7 flex flex-col flex-grow">
                  <Link to={`/products/${product.id}`}>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                    {product.shortDescription}
                  </p>
                  
                  <div className="mt-auto flex flex-col gap-3 pt-4 border-t border-slate-100">
                    <div className="flex justify-between items-center text-xs font-medium text-slate-600">
                      <span>MOQ: <strong className="text-slate-900">{product.moq}</strong></span>
                      <span className="text-blue-600 font-semibold">{product.specifications['Neck Size'] || 'Customizable'}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <Link
                        to={`/products/${product.id}`}
                        className="text-center py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors"
                      >
                        Specs & Details
                      </Link>
                      <a
                        href={`https://wa.me/8618567413851?text=${encodeURIComponent(`Hello SG Packaging, I would like to inquire about ${product.name} (MOQ: ${product.moq}).`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold rounded-lg transition-colors"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366]" />
                        <span>Inquire</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Factory Banner on Desktop / Mobile */}
      <section className="bg-slate-900 text-white py-16 sm:py-20">
        <div className="max-w-7xl 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-950 px-3 py-1 rounded-full border border-blue-800">
                Facility & Production
              </span>
              <h2 className="text-3xl sm:text-4xl 2xl:text-5xl font-black tracking-tight text-white mt-4 mb-5">
                Ready For High-Volume OEM & ODM Production
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
                Our ISO 9001 certified plant in Yuyao features automated robot injection arms, leak-testing machinery, and dust-free assembly rooms capable of delivering over 500,000 units daily.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5 bg-slate-800/90 px-3 py-1.5 rounded-lg border border-slate-700">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  Custom Mold Tooling
                </span>
                <span className="flex items-center gap-1.5 bg-slate-800/90 px-3 py-1.5 rounded-lg border border-slate-700">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  Pantone Color Matching
                </span>
                <span className="flex items-center gap-1.5 bg-slate-800/90 px-3 py-1.5 rounded-lg border border-slate-700">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  Silk Screen & Hot Stamping
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src={factoryInteriorImg}
                alt="Automated production lines"
                className="rounded-2xl border border-slate-800 w-full h-48 sm:h-60 object-cover shadow-lg"
              />
              <img
                src={qualityControlImg}
                alt="Quality control laboratory"
                className="rounded-2xl border border-slate-800 w-full h-48 sm:h-60 object-cover shadow-lg mt-6"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-950 py-20 sm:py-24 text-center px-4">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-block px-3 py-1 bg-slate-800 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6 rounded-full border border-slate-700">
            Let's build together
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-6">
            Ready to elevate your packaging supply chain?
          </h2>
          <p className="text-slate-400 mb-10 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Contact our export sales team in Ningbo today for free samples, technical catalog, and customized container quotes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
            <Link
              to="/contact"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-900/30 hover:bg-blue-500 transition-colors text-sm sm:text-base"
            >
              Contact Sales Team
            </Link>
            <a
              href="https://wa.me/8618567413851?text=Hello%20SG%20Packaging%2C%20I%20would%20like%20to%20request%20samples%20and%20a%20quote."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba59] text-white px-8 py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base transition-colors"
            >
              <WhatsAppIcon className="w-5 h-5 fill-white" />
              <span>Chat WhatsApp: +86 18567413851</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
