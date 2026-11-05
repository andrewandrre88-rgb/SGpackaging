import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { CATEGORIES } from '../data';
import { useProducts } from '../services/storeService';
import { Search, Filter, LayoutGrid, List, X, ExternalLink, PlusCircle } from 'lucide-react';
import { motion } from 'motion/react';
import WhatsAppIcon from '../components/WhatsAppIcon';

export default function Products() {
  const { products, loading } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: catId });
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (product.specifications?.['Neck Size'] && product.specifications['Neck Size'].toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || product.category === CATEGORIES.find(c => c.id === selectedCategory)?.name;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white min-h-screen">
      <PageHeader 
        title="Dispensers & Packaging Catalog" 
        description="Browse our precision-manufactured trigger sprayers, lotion pumps, mist dispensers, and cosmetic packaging manufactured in Yuyao, Ningbo."
      />

      <div className="max-w-7xl 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12 py-10 sm:py-14">
        {/* Controls Bar for Desktop & Mobile */}
        <div className="flex flex-col gap-6 mb-8">
          
          {/* Top Filter & Search Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search by name, category, or neck size (e.g. 28/400, lotion)..."
                className="w-full pl-11 pr-10 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-sm bg-slate-50 focus:bg-white placeholder:text-slate-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Desktop View Switcher & Result Count */}
            <div className="flex items-center justify-between md:justify-end gap-4">
              <span className="text-xs font-semibold text-slate-500">
                Showing <strong className="text-slate-900">{filteredProducts.length}</strong> products
              </span>

              {/* View Toggle (Grid vs Table/List) for desktop/tablets */}
              <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    viewMode === 'grid' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid size={15} />
                  <span>Grid</span>
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    viewMode === 'table' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="Table / Specs View"
                >
                  <List size={15} />
                  <span>Table View</span>
                </button>
              </div>

              {/* Mobile Category Dropdown */}
              <div className="md:hidden relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-xs font-bold text-slate-800"
                >
                  <option value="all">All Categories</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name} ({cat.count})</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Category Pills (Desktop & Tablet) */}
          <div className="hidden md:flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
              <Filter size={13} /> Categories:
            </span>
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Products
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] ${selectedCategory === cat.id ? 'text-blue-200' : 'text-slate-400'}`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6 lg:gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.04, 0.3) }}
                key={product.id}
                className="group border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-400 hover:shadow-xl transition-all duration-300 bg-white flex flex-col"
              >
                <Link to={`/products/${product.id}`} className="relative h-60 bg-slate-50/70 border-b border-slate-100 overflow-hidden shrink-0 block flex items-center justify-center p-6 group-hover:bg-blue-50/20 transition-colors">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-slate-700 border border-slate-200 shadow-xs">
                    {product.category}
                  </div>
                  {product.specifications['Neck Size'] && (
                    <div className="absolute top-3 right-3 bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold border border-blue-200">
                      {product.specifications['Neck Size']}
                    </div>
                  )}
                </Link>
                
                <div className="p-5 sm:p-6 flex flex-col flex-grow">
                  <Link to={`/products/${product.id}`}>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 line-clamp-1 leading-tight group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-slate-500 text-xs sm:text-sm mb-4 line-clamp-2 flex-grow leading-relaxed">
                    {product.shortDescription}
                  </p>
                  
                  {/* Quick Specs Strip */}
                  <div className="bg-slate-50 rounded-xl p-2.5 mb-4 text-[11px] grid grid-cols-2 gap-2 border border-slate-100 text-slate-600">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Output</span>
                      <span className="font-semibold text-slate-800">{product.specifications['Output'] || 'Standard'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">MOQ</span>
                      <span className="font-semibold text-slate-800">{product.moq}</span>
                    </div>
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 mt-auto">
                    <Link
                      to={`/products/${product.id}`}
                      className="text-center py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors"
                    >
                      Specifications
                    </Link>
                    <a
                      href={`https://wa.me/8618567413851?text=${encodeURIComponent(`Hello SG Packaging, I would like to inquire about ${product.name} (MOQ: ${product.moq}).`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold rounded-lg transition-colors"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366]" />
                      <span>Inquire</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Product Table View (Optimized for Computers & B2B Purchasing) */}
        {viewMode === 'table' && (
          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 text-xs uppercase font-bold tracking-wider">
                    <th className="py-4 px-6">Product</th>
                    <th className="py-4 px-4">Category</th>
                    <th className="py-4 px-4">Neck Size</th>
                    <th className="py-4 px-4">Output / Capacity</th>
                    <th className="py-4 px-4">Material</th>
                    <th className="py-4 px-4">MOQ</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-14 h-14 object-contain rounded-lg border border-slate-200 p-1 bg-white shrink-0"
                          />
                          <div>
                            <Link to={`/products/${product.id}`} className="font-bold text-slate-900 hover:text-blue-600 transition-colors">
                              {product.name}
                            </Link>
                            <p className="text-xs text-slate-400 line-clamp-1">{product.shortDescription}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-700 rounded text-xs font-semibold">
                          {product.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-semibold text-slate-800">
                        {product.specifications['Neck Size'] || 'Customizable'}
                      </td>
                      <td className="py-4 px-4 text-slate-600">
                        {product.specifications['Output'] || product.specifications['Capacity'] || 'Standard'}
                      </td>
                      <td className="py-4 px-4 text-slate-600">
                        {product.specifications['Material'] || 'PP / PE'}
                      </td>
                      <td className="py-4 px-4 font-bold text-slate-900">
                        {product.moq}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="inline-flex items-center gap-2">
                          <Link
                            to={`/products/${product.id}`}
                            className="px-3 py-1.5 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold rounded-lg transition-colors"
                          >
                            Details
                          </Link>
                          <a
                            href={`https://wa.me/8618567413851?text=${encodeURIComponent(`Hello SG Packaging, I would like to inquire about ${product.name} (MOQ: ${product.moq}).`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg transition-colors"
                            title="Chat on WhatsApp"
                          >
                            <WhatsAppIcon className="w-4 h-4 fill-[#25D366]" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="py-24 text-center bg-slate-50 rounded-3xl border border-slate-200">
            <h3 className="text-xl font-bold text-slate-800 mb-2">No products matched your search</h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
              Try searching with different terms or clear active category filters.
            </p>
            <button 
              onClick={() => { setSearchTerm(''); handleCategoryChange('all'); }}
              className="px-6 py-2.5 bg-blue-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow hover:bg-blue-700 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
