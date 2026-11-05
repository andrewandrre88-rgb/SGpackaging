import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  FileText, 
  Plus, 
  Trash2, 
  ExternalLink, 
  LogOut, 
  ShieldCheck, 
  Search, 
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Eye,
  Layers,
  Sparkles,
  ArrowRight,
  Tag
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProducts, useBlogPosts, createProduct, deleteProduct, createBlogPost, deleteBlogPost } from '../services/storeService';
import { CATEGORIES } from '../data';
import SGLogo from '../components/SGLogo';
import ImageUploader from '../components/ImageUploader';
import MultiImageUploader from '../components/MultiImageUploader';

// Quick preset image library for convenience
const PRESET_IMAGES = [
  { label: 'Trigger Sprayer (Clear/Black)', url: 'https://raw.githubusercontent.com/andrewandrre88-rgb/MILA-PLASTICS-IMAGES/refs/heads/main/ChatGPT%20Image%20Sep%203%2C%202026%2C%2002_04_57%20PM.png' },
  { label: 'Cosmetic Packaging', url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80' },
  { label: 'Lotion Pump Bottle', url: 'https://images.unsplash.com/photo-1608248597359-5613531b46a2?auto=format&fit=crop&w=800&q=80' },
  { label: 'Factory Manufacturing Floor', url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80' },
  { label: 'Sustainable Packaging Jars', url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80' }
];

export default function Dashboard() {
  const { user, isAdmin, loading: authLoading, isSigningIn, loginWithGoogle, logout, authError } = useAuth();
  const { products, loading: productsLoading } = useProducts();
  const { posts, loading: postsLoading } = useBlogPosts();

  const [activeTab, setActiveTab] = useState<'products' | 'blog'>('products');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // New Product Form
  const [productForm, setProductForm] = useState({
    name: '',
    category: CATEGORIES[0]?.name || 'Trigger Sprayers',
    shortDescription: '',
    description: '',
    moq: '10,000 pcs',
    packagingDetails: '500 pcs/carton',
    images: [PRESET_IMAGES[0].url],
    seoKeywords: '',
    neckSize: '28/410',
    output: '1.0 - 1.2 ml/T',
    material: 'PP (Polypropylene)',
    colors: 'White, Black, Custom Pantone',
    featuresText: 'High durability engine\nErgonomic grip trigger\nZero-leakage design\nCustomizable dip tube length'
  });

  // New Blog Post Form
  const [blogForm, setBlogForm] = useState({
    title: '',
    category: 'Industry Trends',
    excerpt: '',
    content: '',
    author: user?.displayName || 'Admin',
    image: PRESET_IMAGES[1].url,
    seoKeywords: '',
    readTime: '5 min read'
  });

  // Trigger success toast
  const showSuccess = (msg: string) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(null), 4000);
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionError(null);

    if (productForm.images.length === 0) {
      setActionError('Please upload or select at least one product image.');
      return;
    }

    setSubmitting(true);

    try {
      const features = productForm.featuresText
        .split('\n')
        .map(f => f.trim())
        .filter(Boolean);

      const colors = productForm.colors
        .split(',')
        .map(c => c.trim())
        .filter(Boolean);

      const primaryImage = productForm.images[0];
      const gallery = productForm.images;

      await createProduct({
        name: productForm.name,
        category: productForm.category,
        shortDescription: productForm.shortDescription,
        description: productForm.description,
        moq: productForm.moq,
        packagingDetails: productForm.packagingDetails,
        image: primaryImage,
        gallery: gallery,
        seoKeywords: productForm.seoKeywords,
        features: features.length > 0 ? features : ['Precision engineered', 'Chemical resistant'],
        colors: colors.length > 0 ? colors : ['White', 'Black'],
        specifications: {
          'Neck Size': productForm.neckSize,
          'Output': productForm.output,
          'Material': productForm.material,
        }
      });

      showSuccess(`Product with ${gallery.length} photos published successfully!`);
      setIsProductModalOpen(false);
      // Reset form
      setProductForm({
        name: '',
        category: CATEGORIES[0]?.name || 'Trigger Sprayers',
        shortDescription: '',
        description: '',
        moq: '10,000 pcs',
        packagingDetails: '500 pcs/carton',
        images: [PRESET_IMAGES[0].url],
        seoKeywords: '',
        neckSize: '28/410',
        output: '1.0 - 1.2 ml/T',
        material: 'PP (Polypropylene)',
        colors: 'White, Black, Custom Pantone',
        featuresText: 'High durability engine\nErgonomic grip trigger\nZero-leakage design'
      });
    } catch (err: any) {
      console.error(err);
      setActionError(err.message || 'Failed to save product.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionError(null);
    setSubmitting(true);

    try {
      await createBlogPost({
        title: blogForm.title,
        category: blogForm.category,
        excerpt: blogForm.excerpt,
        content: blogForm.content,
        author: blogForm.author || user?.displayName || 'Admin',
        image: blogForm.image,
        seoKeywords: blogForm.seoKeywords,
        readTime: blogForm.readTime
      });

      showSuccess('Blog article published successfully!');
      setIsBlogModalOpen(false);
      // Reset
      setBlogForm({
        title: '',
        category: 'Industry Trends',
        excerpt: '',
        content: '',
        author: user?.displayName || 'Admin',
        image: PRESET_IMAGES[1].url,
        seoKeywords: '',
        readTime: '5 min read'
      });
    } catch (err: any) {
      console.error(err);
      setActionError(err.message || 'Failed to publish blog post.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to remove product "${name}"?`)) return;
    try {
      await deleteProduct(id);
      showSuccess('Product removed from catalog.');
    } catch (err: any) {
      setActionError(err.message || 'Failed to delete product.');
    }
  };

  const handleDeletePost = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete post "${title}"?`)) return;
    try {
      await deleteBlogPost(id);
      showSuccess('Blog post deleted.');
    } catch (err: any) {
      setActionError(err.message || 'Failed to delete blog post.');
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-400 font-medium">Verifying administrator credentials...</p>
        </div>
      </div>
    );
  }

  // Not signed in
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl text-center space-y-6">
          <div className="flex justify-center">
            <SGLogo className="h-12 w-auto" markOnly />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Management Portal</h1>
            <p className="text-slate-400 text-sm mt-2">
              Sign in to manage catalog products and publish industry blog articles.
            </p>
          </div>

          {authError && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-300 text-xs text-left flex items-start gap-3">
              <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-400" />
              <span>{authError}</span>
            </div>
          )}

          <div className="space-y-4 pt-2">
            <button
              onClick={loginWithGoogle}
              disabled={isSigningIn}
              className={`w-full flex items-center justify-center gap-3 font-bold px-6 py-3.5 rounded-2xl transition-all shadow-lg active:scale-[0.98] ${
                isSigningIn
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed opacity-80'
                  : 'bg-white hover:bg-slate-100 text-slate-900 hover:shadow-xl cursor-pointer'
              }`}
            >
              {isSigningIn ? (
                <div className="w-5 h-5 border-2 border-slate-600 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              )}
              <span>{isSigningIn ? 'Connecting to Google...' : 'Sign in with Google'}</span>
            </button>
            <p className="text-[11px] text-slate-500">
              Primary super-admin: <span className="text-slate-300">andrewandrre88@gmail.com</span>
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <Link to="/" className="text-xs text-blue-400 hover:text-blue-300 font-semibold inline-flex items-center gap-1.5">
              <span>Return to Public Website</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Filtered items
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPosts = posts.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Admin Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
              <SGLogo className="h-9 w-auto" markOnly />
              <div>
                <span className="text-lg font-black tracking-tight text-white flex items-center gap-2">
                  SG Packaging <span className="text-xs bg-blue-600/30 text-blue-400 border border-blue-500/40 px-2 py-0.5 rounded-full font-bold">Admin Console</span>
                </span>
                <span className="text-[11px] text-slate-400 block">Houston HQ & Yuyao Factory Operations</span>
              </div>
            </Link>
          </div>

          {/* User profile & actions */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            <div className="hidden md:flex items-center gap-2.5 bg-slate-800/80 border border-slate-700/60 px-3.5 py-1.5 rounded-full text-xs">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || 'Admin'} className="w-5 h-5 rounded-full object-cover" />
              ) : (
                <ShieldCheck size={16} className="text-emerald-400" />
              )}
              <span className="text-slate-300 font-medium truncate max-w-[180px]">{user.email}</span>
              {isAdmin && (
                <span className="bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.5 rounded text-[10px]">
                  Super Admin
                </span>
              )}
            </div>

            <Link
              to="/"
              className="text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5 font-medium"
            >
              <ExternalLink size={14} />
              <span className="hidden sm:inline">View Site</span>
            </Link>

            <button
              onClick={logout}
              className="text-xs text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5 font-medium cursor-pointer"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl 2xl:max-w-[1500px] w-full mx-auto px-4 sm:px-6 lg:px-10 py-8">
        
        {/* Success / Error Banners */}
        {actionSuccess && (
          <div className="mb-6 p-4 bg-emerald-500/15 border border-emerald-500/40 rounded-2xl text-emerald-300 text-sm flex items-center gap-3 shadow-lg">
            <CheckCircle2 size={18} className="shrink-0 text-emerald-400" />
            <span className="font-medium">{actionSuccess}</span>
          </div>
        )}

        {actionError && (
          <div className="mb-6 p-4 bg-rose-500/15 border border-rose-500/40 rounded-2xl text-rose-300 text-sm flex items-center gap-3 shadow-lg">
            <AlertCircle size={18} className="shrink-0 text-rose-400" />
            <span className="font-medium">{actionError}</span>
          </div>
        )}

        {/* Dashboard Navigation & Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div 
            onClick={() => setActiveTab('products')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              activeTab === 'products'
                ? 'bg-blue-600/15 border-blue-500/50 shadow-lg shadow-blue-500/5'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Products Catalog</span>
              <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
                <Package size={20} />
              </div>
            </div>
            <div className="text-3xl font-black text-white">{products.length}</div>
            <div className="text-[12px] text-slate-400 mt-1 flex items-center gap-1.5">
              <span>{products.filter(p => p.isCustom).length} added manually</span>
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('blog')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              activeTab === 'blog'
                ? 'bg-blue-600/15 border-blue-500/50 shadow-lg shadow-blue-500/5'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Industry Blog</span>
              <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                <FileText size={20} />
              </div>
            </div>
            <div className="text-3xl font-black text-white">{posts.length}</div>
            <div className="text-[12px] text-slate-400 mt-1 flex items-center gap-1.5">
              <span>{posts.filter(p => p.isCustom).length} published online</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Cloud Database</span>
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                <ShieldCheck size={20} />
              </div>
            </div>
            <div className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Connected
            </div>
            <div className="text-[12px] text-slate-400 mt-1">Firestore Realtime Storage</div>
          </div>

          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Admin Clearance</span>
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                <Sparkles size={20} />
              </div>
            </div>
            <div className="text-2xl font-bold text-white">Full Privileges</div>
            <div className="text-[12px] text-slate-400 mt-1 truncate">{user.email}</div>
          </div>
        </div>

        {/* Action Bar & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
          {/* Tabs */}
          <div className="flex items-center bg-slate-900 p-1 rounded-2xl border border-slate-800 w-fit">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Package size={16} />
              <span>Products ({products.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('blog')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'blog'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText size={16} />
              <span>Blog Articles ({posts.length})</span>
            </button>
          </div>

          {/* Search & Add Button */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {activeTab === 'products' ? (
              <button
                onClick={() => setIsProductModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20 active:scale-95 cursor-pointer shrink-0"
              >
                <Plus size={16} />
                <span>Add Product</span>
              </button>
            ) : (
              <button
                onClick={() => setIsBlogModalOpen(true)}
                className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-purple-600/20 active:scale-95 cursor-pointer shrink-0"
              >
                <Plus size={16} />
                <span>Write Blog Post</span>
              </button>
            )}
          </div>
        </div>

        {/* TAB 1: PRODUCTS TABLE */}
        {activeTab === 'products' && (
          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-900 text-slate-400 uppercase text-[11px] font-bold tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-4 px-6">Product</th>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6">Neck / Specs</th>
                    <th className="py-4 px-6">MOQ</th>
                    <th className="py-4 px-6">Type</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-12 h-12 rounded-xl object-cover bg-slate-800 border border-slate-700/80 shrink-0"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = PRESET_IMAGES[0].url;
                            }}
                          />
                          <div>
                            <span className="font-bold text-white line-clamp-1">{p.name}</span>
                            <span className="text-[11px] text-slate-400 line-clamp-1">{p.shortDescription}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-block bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg text-xs font-medium">
                          {p.category}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-400">
                        {p.specifications['Neck Size'] || 'Custom'}
                      </td>
                      <td className="py-4 px-6 text-slate-300 font-semibold">
                        {p.moq}
                      </td>
                      <td className="py-4 px-6">
                        {p.isCustom ? (
                          <span className="inline-flex items-center gap-1 bg-blue-500/20 text-blue-400 text-[11px] font-bold px-2 py-0.5 rounded-full border border-blue-500/30">
                            Custom Added
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-slate-800 text-slate-400 text-[11px] font-medium px-2 py-0.5 rounded-full">
                            Catalog Default
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Link
                            to={`/products/${p.id}`}
                            target="_blank"
                            className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-colors"
                            title="View on site"
                          >
                            <Eye size={16} />
                          </Link>
                          {p.isCustom && (
                            <button
                              onClick={() => handleDeleteProduct(p.id, p.name)}
                              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                              title="Delete Product"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredProducts.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-400">
                        No products match your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: BLOG POSTS LIST */}
        {activeTab === 'blog' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div 
                key={post.id}
                className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden flex flex-col hover:border-purple-500/50 transition-all shadow-xl group"
              >
                <div className="h-48 relative overflow-hidden bg-slate-800">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = PRESET_IMAGES[1].url;
                    }}
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full border border-slate-700">
                    {post.category}
                  </div>
                  {post.isCustom && (
                    <div className="absolute top-3 right-3 bg-purple-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                      Custom Post
                    </div>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-[11px] text-slate-400 mb-2 font-medium">
                    {post.date} • by {post.author}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 leading-snug group-hover:text-purple-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-400 text-xs line-clamp-3 mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto pt-4 border-t border-slate-800 flex items-center justify-between">
                    <Link
                      to={`/blog`}
                      className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1"
                    >
                      <span>View in Blog</span>
                      <ExternalLink size={12} />
                    </Link>

                    {post.isCustom && (
                      <button
                        onClick={() => handleDeletePost(post.id, post.title)}
                        className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer bg-rose-500/10 hover:bg-rose-500/20 px-2.5 py-1 rounded-lg border border-rose-500/30 transition-colors"
                      >
                        <Trash2 size={12} />
                        <span>Delete</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {filteredPosts.length === 0 && (
              <div className="col-span-full py-16 text-center text-slate-400 bg-slate-900/40 rounded-3xl border border-slate-800">
                No blog posts found matching your search.
              </div>
            )}
          </div>
        )}
      </main>

      {/* MODAL: ADD PRODUCT */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Package className="text-blue-500" size={22} />
                  <span>Add New Product to Catalog</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  New products will immediately appear on the public website catalog with full detail pages.
                </p>
              </div>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleProductSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1.5">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    placeholder="e.g. 28/410 High-Output Chemical Trigger Sprayer"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1.5">Category *</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                    <option value="Custom Packaging">Custom Packaging</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1.5">Short Summary / Tagline *</label>
                <input
                  type="text"
                  required
                  value={productForm.shortDescription}
                  onChange={(e) => setProductForm({ ...productForm, shortDescription: e.target.value })}
                  placeholder="e.g. Ergonomic design with fine mist and stream dual actuation for commercial cleaning."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1.5">Full Detailed Description *</label>
                <textarea
                  required
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Provide comprehensive details about manufacturing specifications, chemical compatibility, and application scenarios."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1.5">Neck Size Finish</label>
                  <input
                    type="text"
                    value={productForm.neckSize}
                    onChange={(e) => setProductForm({ ...productForm, neckSize: e.target.value })}
                    placeholder="e.g. 28/410, 24/410"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1.5">Discharge Output</label>
                  <input
                    type="text"
                    value={productForm.output}
                    onChange={(e) => setProductForm({ ...productForm, output: e.target.value })}
                    placeholder="e.g. 1.0 - 1.2 ml/T"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1.5">Material Composition</label>
                  <input
                    type="text"
                    value={productForm.material}
                    onChange={(e) => setProductForm({ ...productForm, material: e.target.value })}
                    placeholder="e.g. PP / PE / 304 SS"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1.5">Minimum Order Quantity (MOQ)</label>
                  <input
                    type="text"
                    value={productForm.moq}
                    onChange={(e) => setProductForm({ ...productForm, moq: e.target.value })}
                    placeholder="e.g. 10,000 pcs"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1.5">Available Colors</label>
                  <input
                    type="text"
                    value={productForm.colors}
                    onChange={(e) => setProductForm({ ...productForm, colors: e.target.value })}
                    placeholder="e.g. White, Black, Translucent, Custom Pantone"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Multi-Photo Product Gallery Uploader */}
              <MultiImageUploader
                label="Product Photos & Gallery"
                required
                images={productForm.images}
                onChange={(imgs) => setProductForm({ ...productForm, images: imgs })}
                presetImages={PRESET_IMAGES}
                maxImages={10}
                helperText="Select or drop multiple photos at once from your device. The first photo is your main cover photo, and all photos appear in the interactive product detail gallery."
              />

              {/* SEO Search Keywords */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-slate-300 font-semibold text-xs flex items-center gap-1.5">
                    <Tag size={13} className="text-blue-400" />
                    <span>SEO Search Keywords</span>
                  </label>
                  <span className="text-[10px] text-slate-400">Comma separated</span>
                </div>
                <input
                  type="text"
                  value={productForm.seoKeywords}
                  onChange={(e) => setProductForm({ ...productForm, seoKeywords: e.target.value })}
                  placeholder="e.g. trigger sprayer, 28/410 sprayer, plastic trigger, chemical spray nozzle, Houston packaging"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-xs"
                />
                <p className="text-[11px] text-slate-500 mt-1">Helps B2B buyers find this product on Google search and in catalog filters.</p>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1.5">Key Features (One per line)</label>
                <textarea
                  rows={3}
                  value={productForm.featuresText}
                  onChange={(e) => setProductForm({ ...productForm, featuresText: e.target.value })}
                  placeholder="Ergonomic shape&#10;Leak-proof sealing&#10;Customizable dip tube"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-600/30 active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? 'Publishing...' : 'Publish Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD BLOG POST */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <FileText className="text-purple-500" size={22} />
                  <span>Write Industry Blog Post</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Articles are featured on the public Industry Blog page with author and read time details.
                </p>
              </div>
              <button
                onClick={() => setIsBlogModalOpen(false)}
                className="text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleBlogSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1.5">Article Title *</label>
                  <input
                    type="text"
                    required
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                    placeholder="e.g. Next-Generation Monomaterial Lotion Pumps"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1.5">Category *</label>
                  <select
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="Industry Trends">Industry Trends</option>
                    <option value="Buying Guides">Buying Guides</option>
                    <option value="Business Tips">Business Tips</option>
                    <option value="Factory Updates">Factory Updates</option>
                    <option value="Sustainability">Sustainability</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1.5">Author Name</label>
                  <input
                    type="text"
                    value={blogForm.author}
                    onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                    placeholder="e.g. SG Technical Team"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1.5">Estimated Read Time</label>
                  <input
                    type="text"
                    value={blogForm.readTime}
                    onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                    placeholder="e.g. 5 min read"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1.5">Short Summary / Excerpt *</label>
                <textarea
                  required
                  rows={2}
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  placeholder="A concise 1-2 sentence overview shown in the article grid."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Cover Image Uploader */}
              <ImageUploader
                label="Cover Image"
                required
                value={blogForm.image}
                onChange={(img) => setBlogForm({ ...blogForm, image: img })}
                presetImages={PRESET_IMAGES}
                helperText="Upload an article cover photo directly from your device or select an industry preset."
              />

              {/* Blog Article SEO Keywords */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-slate-300 font-semibold text-xs flex items-center gap-1.5">
                    <Tag size={13} className="text-purple-400" />
                    <span>SEO Keywords</span>
                  </label>
                  <span className="text-[10px] text-slate-400">Comma separated</span>
                </div>
                <input
                  type="text"
                  value={blogForm.seoKeywords}
                  onChange={(e) => setBlogForm({ ...blogForm, seoKeywords: e.target.value })}
                  placeholder="e.g. sustainable packaging, PCR resins, cosmetic trends 2025, B2B wholesale"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-xs"
                />
                <p className="text-[11px] text-slate-500 mt-1">Boosts visibility on Google and search engines for industry packaging topics.</p>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1.5">Article Body Content *</label>
                <textarea
                  required
                  rows={6}
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  placeholder="Write the full body of the article here. Paragraph breaks are formatted automatically."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-mono text-xs"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all shadow-lg shadow-purple-600/30 active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? 'Publishing...' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
