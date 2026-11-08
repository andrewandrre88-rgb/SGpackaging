import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileCode, 
  ExternalLink, 
  FolderTree, 
  Layers, 
  Package, 
  BookOpen, 
  Building2, 
  ShieldCheck, 
  Globe2, 
  Download,
  ArrowRight
} from 'lucide-react';
import { useProducts, useBlogPosts } from '../services/storeService';
import { useLanguage } from '../context/LanguageContext';
import { useSEO } from '../lib/useSEO';

export default function SitemapPage() {
  const { isArabic, translateCategory } = useLanguage();
  const { products, loading: productsLoading } = useProducts();
  const { posts: blogPosts, loading: postsLoading } = useBlogPosts();
  const loading = productsLoading || postsLoading;

  useSEO({
    title: isArabic 
      ? 'خريطة الموقع والفهرس الشامل' 
      : 'Sitemap & Index | Yi Lai Plastics Factory',
    description: isArabic
      ? 'فهرس وخريطة موقع مصنع يي لاي للبلاستيك: استكشف كافة صفحات الموقع، وفئات المنتجات، وبخاخات التريجر ومضخات اللوشن، ومقالات التغليف التقنية.'
      : 'Complete HTML and XML sitemap for Yi Lai Plastics Factory. Direct links to all dispensing products, automated factory facilities, and packaging technical articles.',
    keywords: 'sitemap, xml sitemap, robots.txt, Yi Lai Plastics Factory, trigger sprayer catalog, packaging index'
  });

  const staticPages = [
    {
      title: isArabic ? 'الصفحة الرئيسية' : 'Home Page',
      url: '/',
      desc: isArabic ? 'نظرة عامة على مصنع يي لاي، المنتجات المميزة، وبوابة عروض الأسعار.' : 'Factory overview, featured dispensing products, and direct quote requests.',
      priority: '1.0',
      changefreq: 'Weekly'
    },
    {
      title: isArabic ? 'من نحن (نبذة عن المصنع)' : 'About Us & Company Overview',
      url: '/about',
      desc: isArabic ? 'تاريخ المصنع، مراكز العمليات في يويو وهيوستن، ورسالة الجودة.' : 'Corporate history, Yuyao manufacturing floor, Houston hub, and quality mission.',
      priority: '0.8',
      changefreq: 'Monthly'
    },
    {
      title: isArabic ? 'كتالوج المنتجات الكامل' : 'Complete Products Catalog',
      url: '/products',
      desc: isArabic ? 'استعراض بخاخات التريجر ومضخات اللوشن والرذاذ مع فلترة المواصفات.' : 'Filterable catalog with full specifications, neck sizes, MOQ, and TDS downloads.',
      priority: '0.9',
      changefreq: 'Daily'
    },
    {
      title: isArabic ? 'جولة المصنع والورش المؤتمتة' : 'Advanced Factory Tour & Workshops',
      url: '/factory',
      desc: isArabic ? 'ورش الحقن الكهربائي، غرف فئة 100,000 النظيفة، واختبارات التسريب 100%.' : 'Precision electric injection, Class 100,000 cleanrooms, and automated leak testing.',
      priority: '0.8',
      changefreq: 'Monthly'
    },
    {
      title: isArabic ? 'معرض الجودة والمختبر' : 'Quality Gallery & QC Lab',
      url: '/gallery',
      desc: isArabic ? 'صور واختبارات الجودة وضمان المعايير الدولية والاعتماد.' : 'High-definition gallery of quality control testing, inspection labs, and clean packing.',
      priority: '0.7',
      changefreq: 'Monthly'
    },
    {
      title: isArabic ? 'المدونة التقنية وتكنولوجيا البلاستيك' : 'Technical Dispensing Blog',
      url: '/blog',
      desc: isArabic ? 'أحدث الأبحاث حول إعادة التدوير PCR، ومعايير منع التسريب، وسلاسل الإمداد.' : 'Engineering insights on PCR sustainability, leakage prevention, and packaging trends.',
      priority: '0.8',
      changefreq: 'Weekly'
    },
    {
      title: isArabic ? 'اتصل بنا وطلب عينات مجانية' : 'Contact Us & Sample Requests',
      url: '/contact',
      desc: isArabic ? 'مقر هيوستن، مصنع يويو، محادثة واتساب المباشرة، ونموذج إرسال RFQ.' : 'Houston HQ, Yuyao plant coordinates, instant WhatsApp support, and direct RFQ form.',
      priority: '0.8',
      changefreq: 'Monthly'
    },
    {
      title: isArabic ? 'خريطة الموقع (هذه الصفحة)' : 'HTML & XML Sitemap',
      url: '/sitemap',
      desc: isArabic ? 'فهرس تصفح بشري وروابط محركات البحث لجميع صفحات ومنتجات الموقع.' : 'Human-navigable directory and search engine index of all pages and catalog items.',
      priority: '0.6',
      changefreq: 'Weekly'
    }
  ];

  const categories = [
    'Trigger Sprayers',
    'Lotion Pumps',
    'Fine Mist Sprayers',
    'Cosmetic Packaging',
    'Plastic Bottles',
    'Foam Pumps'
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-20">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-xs font-semibold mb-3">
                <FolderTree className="w-3.5 h-3.5" />
                <span>{isArabic ? 'هيكل الموقع وفهرس الروابط' : 'Structured Site Index'}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {isArabic ? 'خريطة الموقع الشاملة' : 'Yi Lai Plastics Factory Sitemap'}
              </h1>
              <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
                {isArabic
                  ? 'دليل تصفح شامل لجميع صفحات الموقع، وكتالوج المنتجات، والمقالات الهندسية، مع توفير خريطة XML الرسمية لمحركات بحث جوجل وبينغ.'
                  : 'A complete navigable directory of all public pages, categories, catalog products, and technical articles with Google-compliant XML sitemap.'}
              </p>
            </div>

            {/* XML Sitemap Direct Action Buttons */}
            <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition shadow-sm"
              >
                <FileCode className="w-4 h-4" />
                <span>{isArabic ? 'عرض XML Sitemap' : 'View XML Sitemap'}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
              <a
                href="/robots.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition"
              >
                <Globe2 className="w-4 h-4 text-slate-400" />
                <span>robots.txt</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main 2-column Content */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Section 1: Main Pages */}
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      {isArabic ? 'الصفحات الرئيسية والمعلوماتية' : 'Core Website Pages'}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {isArabic ? 'روابط التنقل الأساسية للعلامة التجارية والمصنع' : 'Main company portals and corporate information'}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                  {staticPages.length} {isArabic ? 'صفحة' : 'Pages'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {staticPages.map((page, idx) => (
                  <Link
                    key={idx}
                    to={page.url}
                    className="group p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-800 group-hover:text-blue-600 text-sm transition-colors">
                          {page.title}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all" />
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                        {page.desc}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-100">
                      <span>{page.url}</span>
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] text-slate-600">
                        P: {page.priority}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Section 2: Products Catalog Index */}
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      {isArabic ? 'كتالوج المنتجات والمواصفات' : 'Catalog Products Index'}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {isArabic ? 'جميع موديلات بخاخات التريجر ومضخات اللوشن مع المواصفات الفنية' : 'All manufacturing items with neck finish, output, and direct RFQ links'}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  {products.length} {isArabic ? 'منتج' : 'Products'}
                </span>
              </div>

              {loading ? (
                <div className="py-8 text-center text-slate-400 text-sm animate-pulse">
                  {isArabic ? 'جاري تحميل قائمة المنتجات...' : 'Loading catalog items...'}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {products.map((prod) => (
                    <Link
                      key={prod.id}
                      to={`/products/${prod.id}`}
                      className="group flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/20 transition-all"
                    >
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-12 h-12 object-contain bg-slate-50 rounded-lg p-1 border border-slate-100 shrink-0"
                        loading="lazy"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-slate-800 group-hover:text-emerald-700 truncate transition-colors">
                          {isArabic && prod.nameAr ? prod.nameAr : prod.name}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                          <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[10px] text-slate-600">
                            {translateCategory(prod.category)}
                          </span>
                          {prod.specifications['Neck Size'] && (
                            <span className="font-mono text-slate-400">
                              {prod.specifications['Neck Size']}
                            </span>
                          )}
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-emerald-600 shrink-0 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-all" />
                    </Link>
                  ))}
                </div>
              )}
            </section>

            {/* Section 3: Technical Blog Posts */}
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      {isArabic ? 'المقالات التقنية ودراسات الجودة' : 'Technical & Engineering Blog'}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {isArabic ? 'أحدث الأبحاث والإرشادات حول تكنولوجيا قوالب البلاستيك ومنع التسريب' : 'Industry reports, PCR sustainability whitepapers, and testing guides'}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">
                  {blogPosts.length} {isArabic ? 'مقالة' : 'Articles'}
                </span>
              </div>

              <div className="space-y-3">
                {blogPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.id}`}
                    className="group block p-4 rounded-xl border border-slate-100 hover:border-purple-200 hover:bg-purple-50/20 transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">
                          {post.category}
                        </span>
                        <h3 className="text-sm font-bold text-slate-800 group-hover:text-purple-700 transition-colors mt-0.5">
                          {isArabic && post.titleAr ? post.titleAr : post.title}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-1">
                          {isArabic && post.excerptAr ? post.excerptAr : post.excerpt}
                        </p>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 shrink-0">
                        {post.date}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Info & SEO Crawler Standards */}
          <div className="space-y-6">
            
            {/* Product Categories Quick Index */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4 pb-2 border-b border-slate-100">
                {isArabic ? 'فئات المنتجات الرئيسية' : 'Categories Directory'}
              </h3>
              <ul className="space-y-2">
                {categories.map((cat, idx) => (
                  <li key={idx}>
                    <Link
                      to={`/products?category=${encodeURIComponent(cat)}`}
                      className="flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-blue-600 p-2 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <span>{translateCategory(cat)}</span>
                      <span className="text-slate-400 text-[11px]">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* XML Sitemap Specifications Card */}
            <div className="bg-slate-900 text-slate-300 rounded-2xl p-6 border border-slate-800 shadow-md">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-3">
                <ShieldCheck className="w-4 h-4" />
                <span>{isArabic ? 'معايير الفهرسة ومحركات البحث' : 'Crawler & SEO Metadata'}</span>
              </div>
              <h4 className="text-white font-bold text-sm mb-2">
                {isArabic ? 'ملف XML Sitemap المعتمد' : 'Google Standard Compliant'}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {isArabic
                  ? 'تم بناء خريطة sitemap.xml وفق بروتوكول sitemaps.org 0.9 الرسمي مع دعم وسوم xhtml:link hreflang للغتين العربية والإنجليزية.'
                  : 'Generated with full sitemaps.org 0.9 schema, including bilingual xhtml:link alternate tags for English & Arabic canonicalization.'}
              </p>
              
              <div className="space-y-2 text-xs font-mono bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-400">
                <div className="flex justify-between">
                  <span className="text-slate-500">Domain:</span>
                  <span className="text-slate-200">sgpackaging.online</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">XML File:</span>
                  <span className="text-blue-400">/sitemap.xml</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Robots:</span>
                  <span className="text-emerald-400">/robots.txt</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Protocol:</span>
                  <span className="text-slate-200">sitemaps.org 0.9</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Languages:</span>
                  <span className="text-amber-400">en, ar, x-default</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800 flex flex-col gap-2">
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isArabic ? 'فتح / تحميل sitemap.xml' : 'Open / Download sitemap.xml'}</span>
                </a>
              </div>
            </div>

            {/* Direct Factory Contacts */}
            <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-2xl p-6 shadow-md">
              <span className="text-[10px] uppercase font-bold tracking-widest text-blue-300">
                {isArabic ? 'مصنع يي لاي للبلاستيك' : 'Yi Lai Plastics Factory'}
              </span>
              <h4 className="text-base font-extrabold mt-1 mb-2">
                {isArabic ? 'هل تحتاج إلى تصاميم قوالب أو عينات؟' : 'Need Custom Molds or Samples?'}
              </h4>
              <p className="text-xs text-blue-200 leading-relaxed mb-4">
                {isArabic 
                  ? 'يقدم فريق مهندسي المبيعات لدينا عينات مجانية وتسعيراً مباشراً من المصنع لجميع المنتجات المدرجة في هذا الفهرس.'
                  : 'Our sales engineering team provides free technical samples and direct factory pricing on every product listed in this index.'}
              </p>
              <Link
                to="/contact"
                className="block text-center w-full py-2.5 px-4 bg-white text-slate-900 hover:bg-blue-50 rounded-xl text-xs font-bold tracking-wide transition shadow"
              >
                {isArabic ? 'تواصل مع فريق المبيعات' : 'Contact Sales Engineers'}
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
