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
  Tag,
  Pencil,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { 
  useProducts, 
  useBlogPosts, 
  useSiteBranding,
  saveSiteLogo,
  resetSiteLogo,
  createProduct, 
  updateProduct,
  deleteProduct, 
  createBlogPost, 
  updateBlogPost,
  deleteBlogPost 
} from '../services/storeService';
import { Product, BlogPost } from '../types';
import { CATEGORIES } from '../data';
import SGLogo from '../components/SGLogo';
import ImageUploader from '../components/ImageUploader';
import MultiImageUploader from '../components/MultiImageUploader';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';

// Quick preset image library for convenience
const PRESET_IMAGES = [
  { label: 'Yi Lai Factory Emblem (Blue/Cyan)', url: '/yilai_factory_logo.jpg' },
  { label: 'Factory Transparent Mark', url: '/sg_logo_transparent.png' },
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
  const { logoUrl: currentBrandLogo } = useSiteBranding();
  const { t, isArabic } = useLanguage();

  const [activeTab, setActiveTab] = useState<'products' | 'blog' | 'branding'>('products');
  const [searchTerm, setSearchTerm] = useState('');
  const [logoInput, setLogoInput] = useState('');
  const [savingLogo, setSavingLogo] = useState(false);

  // Modals state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
  const [isEditBlogModalOpen, setIsEditBlogModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

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

  // Edit Product Form
  const [editProductForm, setEditProductForm] = useState({
    name: '',
    category: CATEGORIES[0]?.name || 'Trigger Sprayers',
    shortDescription: '',
    description: '',
    moq: '10,000 pcs',
    packagingDetails: '500 pcs/carton',
    images: [] as string[],
    seoKeywords: '',
    neckSize: '28/410',
    output: '1.0 - 1.2 ml/T',
    material: 'PP (Polypropylene)',
    colors: 'White, Black, Custom Pantone',
    featuresText: '',
    extraSpecs: [] as { key: string; value: string }[],
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

  // Edit Blog Post Form
  const [editBlogForm, setEditBlogForm] = useState({
    title: '',
    category: 'Industry Trends',
    excerpt: '',
    content: '',
    author: 'SG Technical Team',
    image: PRESET_IMAGES[1].url,
    seoKeywords: '',
    readTime: '5 min read'
  });

  // Trigger success toast
  const showSuccess = (msg: string) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(null), 4000);
  };

  const handleOpenEditProduct = (p: Product) => {
    setEditingProduct(p);
    const gallery = Array.isArray(p.gallery) && p.gallery.length > 0 
      ? p.gallery 
      : (p.image ? [p.image] : [PRESET_IMAGES[0].url]);

    const specs = p.specifications || {};
    const neckSize = specs['Neck Size'] || specs['Neck Finish'] || '';
    const output = specs['Output'] || specs['Discharge Output'] || '';
    const material = specs['Material'] || specs['Composition'] || '';

    const standardKeys = new Set(['Neck Size', 'Neck Finish', 'Output', 'Discharge Output', 'Material', 'Composition']);
    const extraSpecs = Object.entries(specs)
      .filter(([k]) => !standardKeys.has(k))
      .map(([key, value]) => ({ key, value }));

    setEditProductForm({
      name: p.name || '',
      category: p.category || CATEGORIES[0]?.name || 'Trigger Sprayers',
      shortDescription: p.shortDescription || '',
      description: p.description || '',
      moq: p.moq || '10,000 pcs',
      packagingDetails: p.packagingDetails || 'Standard export packaging',
      images: gallery,
      seoKeywords: p.seoKeywords || '',
      neckSize,
      output,
      material,
      colors: (p.colors || []).join(', '),
      featuresText: (p.features || []).join('\n'),
      extraSpecs,
    });
    setIsEditProductModalOpen(true);
  };

  const handleUpdateProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setActionError(null);

    if (editProductForm.images.length === 0) {
      setActionError('Please upload or select at least one product image.');
      return;
    }

    setSubmitting(true);
    try {
      const features = editProductForm.featuresText
        .split('\n')
        .map(f => f.trim())
        .filter(Boolean);

      const colors = editProductForm.colors
        .split(',')
        .map(c => c.trim())
        .filter(Boolean);

      const specifications: { [key: string]: string } = {};
      if (editProductForm.neckSize.trim()) specifications['Neck Size'] = editProductForm.neckSize.trim();
      if (editProductForm.output.trim()) specifications['Output'] = editProductForm.output.trim();
      if (editProductForm.material.trim()) specifications['Material'] = editProductForm.material.trim();

      editProductForm.extraSpecs.forEach(item => {
        if (item.key.trim() && item.value.trim()) {
          specifications[item.key.trim()] = item.value.trim();
        }
      });

      const primaryImage = editProductForm.images[0];
      const gallery = editProductForm.images;

      await updateProduct(editingProduct.id, {
        name: editProductForm.name,
        category: editProductForm.category,
        shortDescription: editProductForm.shortDescription,
        description: editProductForm.description,
        moq: editProductForm.moq,
        packagingDetails: editProductForm.packagingDetails,
        image: primaryImage,
        gallery,
        seoKeywords: editProductForm.seoKeywords,
        features: features.length > 0 ? features : ['Precision engineered', 'Chemical resistant'],
        colors: colors.length > 0 ? colors : ['White', 'Black'],
        specifications,
      });

      showSuccess(`Product "${editProductForm.name}" updated successfully!`);
      setIsEditProductModalOpen(false);
      setEditingProduct(null);
    } catch (err: any) {
      console.error(err);
      setActionError(err.message || 'Failed to update product.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setEditBlogForm({
      title: post.title || '',
      category: post.category || 'Industry Trends',
      excerpt: post.excerpt || '',
      content: post.content || '',
      author: post.author || user?.displayName || 'Admin',
      image: post.image || PRESET_IMAGES[1].url,
      seoKeywords: post.seoKeywords || '',
      readTime: post.readTime || '5 min read',
    });
    setIsEditBlogModalOpen(true);
  };

  const handleUpdateBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;
    setActionError(null);
    setSubmitting(true);

    try {
      await updateBlogPost(editingPost.id, {
        title: editBlogForm.title,
        category: editBlogForm.category,
        excerpt: editBlogForm.excerpt,
        content: editBlogForm.content,
        author: editBlogForm.author,
        image: editBlogForm.image,
        seoKeywords: editBlogForm.seoKeywords,
        readTime: editBlogForm.readTime,
      });

      showSuccess(`Blog article "${editBlogForm.title}" updated successfully!`);
      setIsEditBlogModalOpen(false);
      setEditingPost(null);
    } catch (err: any) {
      console.error(err);
      setActionError(err.message || 'Failed to update blog post.');
    } finally {
      setSubmitting(false);
    }
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

  const handleSaveLogo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!logoInput) {
      setActionError('Please upload an image file or enter an image URL.');
      return;
    }
    setSavingLogo(true);
    setActionError(null);
    try {
      await saveSiteLogo(logoInput);
      showSuccess('Company logo updated successfully across the entire website!');
      setLogoInput('');
    } catch (err: any) {
      setActionError(err.message || 'Failed to save company logo.');
    } finally {
      setSavingLogo(false);
    }
  };

  const handleResetLogo = async () => {
    if (!window.confirm('Reset company logo to original factory logo?')) return;
    setSavingLogo(true);
    setActionError(null);
    try {
      await resetSiteLogo();
      showSuccess('Company logo reset to factory default.');
      setLogoInput('');
    } catch (err: any) {
      setActionError(err.message || 'Failed to reset company logo.');
    } finally {
      setSavingLogo(false);
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
        <div className="max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl text-center space-y-6 relative">
          <div className="flex justify-between items-center">
            <div className="w-8"></div>
            <SGLogo className="h-12 w-auto" markOnly />
            <div className="w-auto">
              <LanguageSwitcher variant="dark" className="text-[10px]" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">{t('admin.portal')}</h1>
            <p className="text-slate-400 text-sm mt-2">
              {t('admin.desc')}
            </p>
          </div>

          {authError && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-300 text-xs text-left rtl:text-right flex items-start gap-3">
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
              <span>{isSigningIn ? t('admin.connecting') : t('admin.signInGoogle')}</span>
            </button>
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-left rtl:text-right space-y-1">
              <p className="text-[11px] font-semibold text-slate-400">{t('admin.authorizedOnly')}</p>
              <div className="flex flex-col gap-0.5 text-[11px] text-blue-400 font-mono">
                <span>• andrewandrre88@gmail.com</span>
                <span>• packagingsg02@gmail.com</span>
              </div>
              <p className="text-[10px] text-slate-500 pt-1">{t('admin.restrictedNotice')}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <Link to="/" className="text-xs text-blue-400 hover:text-blue-300 font-semibold inline-flex items-center gap-1.5">
              <span>{t('admin.returnSite')}</span>
              <ArrowRight size={14} className="rtl:rotate-180" />
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
                  Yi Lai Plastics Factory <span className="text-xs bg-blue-600/30 text-blue-400 border border-blue-500/40 px-2 py-0.5 rounded-full font-bold">Admin Console</span>
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
            <button
              onClick={() => setActiveTab('branding')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'branding'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ImageIcon size={16} />
              <span>Company Logo</span>
            </button>
          </div>

          {/* Search & Add Button (Hidden on branding tab) */}
          {activeTab !== 'branding' ? (
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
          ) : (
            <div className="flex items-center gap-2 text-xs text-blue-400 font-semibold bg-blue-500/10 border border-blue-500/30 px-3.5 py-2 rounded-xl">
              <Sparkles size={14} className="animate-spin text-blue-400" />
              <span>Live Brand Asset Manager</span>
            </div>
          )}
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
                            <button
                              type="button"
                              onClick={() => handleOpenEditProduct(p)}
                              className="font-bold text-white hover:text-amber-400 transition-colors line-clamp-1 text-left cursor-pointer flex items-center gap-1.5 group"
                              title="Click to edit product"
                            >
                              <span>{p.name}</span>
                              <Pencil size={12} className="opacity-0 group-hover:opacity-100 text-amber-400 transition-opacity" />
                            </button>
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
                        <div className="flex items-center justify-end space-x-1.5 sm:space-x-2">
                          <button
                            onClick={() => handleOpenEditProduct(p)}
                            className="p-2 text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg transition-colors cursor-pointer"
                            title="Edit Product"
                          >
                            <Pencil size={15} />
                          </button>
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

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditPost(post)}
                        className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer bg-amber-500/10 hover:bg-amber-500/20 px-2.5 py-1 rounded-lg border border-amber-500/30 transition-colors"
                        title="Edit Article"
                      >
                        <Pencil size={12} />
                        <span>Edit</span>
                      </button>

                      {post.isCustom && (
                        <button
                          onClick={() => handleDeletePost(post.id, post.title)}
                          className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer bg-rose-500/10 hover:bg-rose-500/20 px-2.5 py-1 rounded-lg border border-rose-500/30 transition-colors"
                          title="Delete Post"
                        >
                          <Trash2 size={12} />
                          <span>Delete</span>
                        </button>
                      )}
                    </div>
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

        {/* TAB 3: BRAND LOGO & ASSETS */}
        {activeTab === 'branding' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Guide Banner for ChatGPT / Downloaded Logos */}
            <div className="bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-purple-900/40 border border-blue-500/30 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
                    <Sparkles size={14} />
                    <span>Using a Logo from ChatGPT or Designer?</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Apply Your Custom Company Logo
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
                    Browser blob URLs (such as <code className="bg-slate-950/80 px-2 py-0.5 rounded text-amber-300 font-mono text-xs">blob:https://chatgpt.com/...</code>) are temporary browser memory links that cannot be fetched by external websites.
                    To apply your logo: simply <strong>right-click the logo in ChatGPT</strong>, choose <strong>&quot;Save image as...&quot;</strong>, then upload or drag that image file below!
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Upload & Controls */}
              <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Upload New Logo</h4>
                  <p className="text-xs text-slate-400">
                    Select a high-resolution PNG (transparent recommended), SVG, or JPG logo file from your device.
                  </p>
                </div>

                <form onSubmit={handleSaveLogo} className="space-y-5">
                  <ImageUploader
                    label="Logo Image File"
                    value={logoInput}
                    onChange={(val) => setLogoInput(val)}
                    presetImages={PRESET_IMAGES.slice(0, 2)}
                    helperText="Upload any image from your computer or phone, or choose one of the factory presets. Transparent PNG or SVG formats look best on both light and dark backgrounds."
                  />

                  <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <button
                        type="submit"
                        disabled={savingLogo || !logoInput}
                        className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20 active:scale-95 cursor-pointer"
                      >
                        {savingLogo ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Applying Logo...</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 size={16} />
                            <span>Save &amp; Apply Logo</span>
                          </>
                        )}
                      </button>

                      {logoInput && (
                        <button
                          type="button"
                          onClick={() => setLogoInput('')}
                          className="text-xs text-slate-400 hover:text-white px-3 py-2 rounded-xl transition-colors cursor-pointer"
                        >
                          Clear Selection
                        </button>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={handleResetLogo}
                      disabled={savingLogo}
                      className="text-xs text-slate-400 hover:text-rose-400 border border-slate-700 hover:border-rose-500/40 px-3.5 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Reset to Factory Default</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Right Column: Live Header & Footer Mockup Previews */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl">
                  <h4 className="text-sm font-bold text-white mb-1 uppercase tracking-wider text-slate-400">
                    Live Preview: Light Theme (Navbar)
                  </h4>
                  <p className="text-xs text-slate-400 mb-4">
                    How your logo will appear in the top website navigation header:
                  </p>
                  
                  {/* Light Background Mockup */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
                    <div className="inline-flex items-center justify-center shrink-0">
                      <img
                        src={logoInput || currentBrandLogo}
                        alt="Logo Preview Light"
                        className="h-11 w-auto object-contain"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/sg_logo_transparent.png';
                        }}
                      />
                    </div>
                    <div className="flex flex-col leading-none">
                      <span className="text-lg font-black tracking-tighter text-slate-900">
                        YI LAI <span className="text-blue-700">PLASTICS</span>
                      </span>
                      <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-slate-400 mt-1">
                        Plastics &amp; Packaging Factory
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl">
                  <h4 className="text-sm font-bold text-white mb-1 uppercase tracking-wider text-slate-400">
                    Live Preview: Dark Theme (Footer / Mobile)
                  </h4>
                  <p className="text-xs text-slate-400 mb-4">
                    How your logo will appear in the footer and dark navigation panels:
                  </p>
                  
                  {/* Dark Background Mockup */}
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-sm flex items-center gap-3">
                    <div className="bg-white/95 px-2 py-1 rounded-lg shadow-sm inline-flex items-center justify-center shrink-0">
                      <img
                        src={logoInput || currentBrandLogo}
                        alt="Logo Preview Dark"
                        className="h-10 w-auto object-contain"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/sg_logo_transparent.png';
                        }}
                      />
                    </div>
                    <div className="flex flex-col leading-none">
                      <span className="text-lg font-black tracking-tighter text-white">
                        YI LAI <span className="text-blue-400">PLASTICS</span>
                      </span>
                      <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-slate-400 mt-1">
                        Plastics &amp; Packaging Factory
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL: ADD PRODUCT */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[92vh] sm:max-h-[88vh] flex flex-col shadow-2xl overflow-hidden animate-fadeIn">
            <form onSubmit={handleProductSubmit} className="flex flex-col h-full max-h-[92vh] sm:max-h-[88vh] overflow-hidden">
              {/* Sticky Responsive Header */}
              <div className="shrink-0 px-4 sm:px-7 py-3.5 sm:py-4 border-b border-slate-800 flex items-center justify-between gap-3 bg-slate-900">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-2 bg-blue-500/20 text-blue-400 rounded-xl shrink-0">
                    <Package size={20} />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-base sm:text-lg font-bold text-white truncate">
                      Add New Product to Catalog
                    </h2>
                    <p className="text-[11px] text-slate-400 truncate">
                      Publishes immediately to the public catalog with full detail page
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer shrink-0"
                  title="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable Form Content */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-7 py-4 space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
              </div>

              {/* Sticky Responsive Footer */}
              <div className="shrink-0 px-4 sm:px-7 py-3 sm:py-3.5 border-t border-slate-800 flex items-center justify-end space-x-3 bg-slate-900/95 backdrop-blur-sm">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 font-bold transition-colors cursor-pointer text-xs sm:text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 sm:px-6 sm:py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-600/30 active:scale-95 disabled:opacity-50 cursor-pointer text-xs sm:text-sm flex items-center gap-2"
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
        <div className="fixed inset-0 z-[100] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[92vh] sm:max-h-[88vh] flex flex-col shadow-2xl overflow-hidden animate-fadeIn">
            <form onSubmit={handleBlogSubmit} className="flex flex-col h-full max-h-[92vh] sm:max-h-[88vh] overflow-hidden">
              {/* Sticky Responsive Header */}
              <div className="shrink-0 px-4 sm:px-7 py-3.5 sm:py-4 border-b border-slate-800 flex items-center justify-between gap-3 bg-slate-900">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-2 bg-purple-500/20 text-purple-400 rounded-xl shrink-0">
                    <FileText size={20} />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-base sm:text-lg font-bold text-white truncate">
                      Write Industry Blog Post
                    </h2>
                    <p className="text-[11px] text-slate-400 truncate">
                      Articles appear in the public blog with author and read time
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  className="text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer shrink-0"
                  title="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable Form Content */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-7 py-4 space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
              </div>

              {/* Sticky Responsive Footer */}
              <div className="shrink-0 px-4 sm:px-7 py-3 sm:py-3.5 border-t border-slate-800 flex items-center justify-end space-x-3 bg-slate-900/95 backdrop-blur-sm">
                <button
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 font-bold transition-colors cursor-pointer text-xs sm:text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 sm:px-6 sm:py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all shadow-lg shadow-purple-600/30 active:scale-95 disabled:opacity-50 cursor-pointer text-xs sm:text-sm flex items-center gap-2"
                >
                  {submitting ? 'Publishing...' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT PRODUCT */}
      {isEditProductModalOpen && editingProduct && (
        <div className="fixed inset-0 z-[100] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[92vh] sm:max-h-[88vh] flex flex-col shadow-2xl overflow-hidden animate-fadeIn">
            <form onSubmit={handleUpdateProductSubmit} className="flex flex-col h-full max-h-[92vh] sm:max-h-[88vh] overflow-hidden">
              {/* Sticky Responsive Header */}
              <div className="shrink-0 px-4 sm:px-7 py-3.5 sm:py-4 border-b border-slate-800 flex items-center justify-between gap-3 bg-slate-900">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl shrink-0">
                    <Pencil size={20} />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 truncate">
                      <span className="truncate">Edit Product</span>
                      <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full shrink-0">
                        {editingProduct.id}
                      </span>
                    </h2>
                    <p className="text-[11px] text-slate-400 truncate">
                      Updates live on storefront immediately
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditProductModalOpen(false);
                    setEditingProduct(null);
                  }}
                  className="text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer shrink-0"
                  title="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable Form Content */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-7 py-4 space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1.5">Product Name *</label>
                    <input
                      type="text"
                      required
                      value={editProductForm.name}
                      onChange={(e) => setEditProductForm({ ...editProductForm, name: e.target.value })}
                      placeholder="e.g. 28/410 High-Output Chemical Trigger Sprayer"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1.5">Category *</label>
                    <select
                      value={editProductForm.category}
                      onChange={(e) => setEditProductForm({ ...editProductForm, category: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
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
                    value={editProductForm.shortDescription}
                    onChange={(e) => setEditProductForm({ ...editProductForm, shortDescription: e.target.value })}
                    placeholder="e.g. Ergonomic design with fine mist and stream dual actuation for commercial cleaning."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1.5">Full Detailed Description *</label>
                  <textarea
                    required
                    rows={3}
                    value={editProductForm.description}
                    onChange={(e) => setEditProductForm({ ...editProductForm, description: e.target.value })}
                    placeholder="Provide comprehensive details about manufacturing specifications, chemical compatibility, and application scenarios."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Standard Technical Specifications */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1.5">Neck Size Finish</label>
                    <input
                      type="text"
                      value={editProductForm.neckSize}
                      onChange={(e) => setEditProductForm({ ...editProductForm, neckSize: e.target.value })}
                      placeholder="e.g. 28/410, 24/410"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1.5">Discharge Output</label>
                    <input
                      type="text"
                      value={editProductForm.output}
                      onChange={(e) => setEditProductForm({ ...editProductForm, output: e.target.value })}
                      placeholder="e.g. 1.0 - 1.2 ml/T"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1.5">Material Composition</label>
                    <input
                      type="text"
                      value={editProductForm.material}
                      onChange={(e) => setEditProductForm({ ...editProductForm, material: e.target.value })}
                      placeholder="e.g. PP / PE / 304 SS"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Additional Custom Specifications */}
                <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Layers size={13} className="text-amber-400" />
                      <span>Custom Specifications & Parameters</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setEditProductForm({
                          ...editProductForm,
                          extraSpecs: [...editProductForm.extraSpecs, { key: '', value: '' }]
                        });
                      }}
                      className="text-[11px] font-bold text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 px-2 py-1 rounded-lg border border-amber-500/30 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Plus size={12} />
                      <span>Add Spec</span>
                    </button>
                  </div>

                  {editProductForm.extraSpecs.length === 0 ? (
                    <p className="text-[11px] text-slate-500">No custom specs defined yet. Click &quot;Add Spec&quot; to configure custom parameters (e.g., Tube Length, Gasket Type).</p>
                  ) : (
                    <div className="space-y-2">
                      {editProductForm.extraSpecs.map((item, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-slate-900/40 sm:bg-transparent p-2 sm:p-0 rounded-xl">
                          <input
                            type="text"
                            placeholder="Parameter Name (e.g. Tube Length)"
                            value={item.key}
                            onChange={(e) => {
                              const updated = [...editProductForm.extraSpecs];
                              updated[idx].key = e.target.value;
                              setEditProductForm({ ...editProductForm, extraSpecs: updated });
                            }}
                            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-500"
                          />
                          <input
                            type="text"
                            placeholder="Value (e.g. 240mm with filter)"
                            value={item.value}
                            onChange={(e) => {
                              const updated = [...editProductForm.extraSpecs];
                              updated[idx].value = e.target.value;
                              setEditProductForm({ ...editProductForm, extraSpecs: updated });
                            }}
                            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-500"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = editProductForm.extraSpecs.filter((_, i) => i !== idx);
                              setEditProductForm({ ...editProductForm, extraSpecs: updated });
                            }}
                            className="p-1.5 self-end sm:self-center text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                            title="Remove specification"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1.5">Minimum Order Quantity (MOQ)</label>
                    <input
                      type="text"
                      value={editProductForm.moq}
                      onChange={(e) => setEditProductForm({ ...editProductForm, moq: e.target.value })}
                      placeholder="e.g. 10,000 pcs"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1.5">Packaging Details</label>
                    <input
                      type="text"
                      value={editProductForm.packagingDetails}
                      onChange={(e) => setEditProductForm({ ...editProductForm, packagingDetails: e.target.value })}
                      placeholder="e.g. 500 pcs/carton, 57x38x42 cm"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1.5">Available Colors</label>
                  <input
                    type="text"
                    value={editProductForm.colors}
                    onChange={(e) => setEditProductForm({ ...editProductForm, colors: e.target.value })}
                    placeholder="e.g. White, Black, Translucent, Custom Pantone"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Multi-Photo Product Gallery Uploader */}
                <MultiImageUploader
                  label="Product Photos & Gallery"
                  required
                  images={editProductForm.images}
                  onChange={(imgs) => setEditProductForm({ ...editProductForm, images: imgs })}
                  presetImages={PRESET_IMAGES}
                  maxImages={10}
                  helperText="Upload or select product images from your device. The first photo is your main hero image; additional images form the product detail gallery."
                />

                {/* SEO Search Keywords */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-slate-300 font-semibold text-xs flex items-center gap-1.5">
                      <Tag size={13} className="text-amber-400" />
                      <span>SEO Search Keywords</span>
                    </label>
                    <span className="text-[10px] text-slate-400">Comma separated</span>
                  </div>
                  <input
                    type="text"
                    value={editProductForm.seoKeywords}
                    onChange={(e) => setEditProductForm({ ...editProductForm, seoKeywords: e.target.value })}
                    placeholder="e.g. trigger sprayer, 28/410 sprayer, plastic trigger, chemical spray nozzle, Houston packaging"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 text-xs"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">Helps B2B buyers find this product on Google search and in catalog filters.</p>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1.5">Key Features (One per line)</label>
                  <textarea
                    rows={3}
                    value={editProductForm.featuresText}
                    onChange={(e) => setEditProductForm({ ...editProductForm, featuresText: e.target.value })}
                    placeholder="Ergonomic shape&#10;Leak-proof sealing&#10;Customizable dip tube"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Sticky Responsive Footer */}
              <div className="shrink-0 px-4 sm:px-7 py-3 sm:py-3.5 border-t border-slate-800 flex items-center justify-end space-x-3 bg-slate-900/95 backdrop-blur-sm">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditProductModalOpen(false);
                    setEditingProduct(null);
                  }}
                  className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 font-bold transition-colors cursor-pointer text-xs sm:text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 sm:px-6 sm:py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all shadow-lg shadow-amber-500/20 active:scale-95 disabled:opacity-50 cursor-pointer text-xs sm:text-sm flex items-center gap-2"
                >
                  <Pencil size={15} />
                  <span>{submitting ? 'Saving Changes...' : 'Save Product Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT BLOG POST */}
      {isEditBlogModalOpen && editingPost && (
        <div className="fixed inset-0 z-[100] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[92vh] sm:max-h-[88vh] flex flex-col shadow-2xl overflow-hidden animate-fadeIn">
            <form onSubmit={handleUpdateBlogSubmit} className="flex flex-col h-full max-h-[92vh] sm:max-h-[88vh] overflow-hidden">
              {/* Sticky Responsive Header */}
              <div className="shrink-0 px-4 sm:px-7 py-3.5 sm:py-4 border-b border-slate-800 flex items-center justify-between gap-3 bg-slate-900">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl shrink-0">
                    <Pencil size={20} />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 truncate">
                      <span className="truncate">Edit Blog Article</span>
                      <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full shrink-0">
                        {editingPost.id}
                      </span>
                    </h2>
                    <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                      Modify article headline, category, excerpt, cover photo, content, and SEO
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditBlogModalOpen(false);
                    setEditingPost(null);
                  }}
                  className="text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer shrink-0"
                  title="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable Form Content */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-7 py-4 space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1.5">Article Title *</label>
                    <input
                      type="text"
                      required
                      value={editBlogForm.title}
                      onChange={(e) => setEditBlogForm({ ...editBlogForm, title: e.target.value })}
                      placeholder="e.g. Next-Generation Monomaterial Lotion Pumps"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1.5">Category *</label>
                    <select
                      value={editBlogForm.category}
                      onChange={(e) => setEditBlogForm({ ...editBlogForm, category: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="Industry Trends">Industry Trends</option>
                      <option value="Buying Guides">Buying Guides</option>
                      <option value="Business Tips">Business Tips</option>
                      <option value="Factory Updates">Factory Updates</option>
                      <option value="Sustainability">Sustainability</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1.5">Author Name</label>
                    <input
                      type="text"
                      value={editBlogForm.author}
                      onChange={(e) => setEditBlogForm({ ...editBlogForm, author: e.target.value })}
                      placeholder="e.g. SG Technical Team"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1.5">Estimated Read Time</label>
                    <input
                      type="text"
                      value={editBlogForm.readTime}
                      onChange={(e) => setEditBlogForm({ ...editBlogForm, readTime: e.target.value })}
                      placeholder="e.g. 5 min read"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1.5">Short Summary / Excerpt *</label>
                  <textarea
                    required
                    rows={2}
                    value={editBlogForm.excerpt}
                    onChange={(e) => setEditBlogForm({ ...editBlogForm, excerpt: e.target.value })}
                    placeholder="A concise 1-2 sentence overview shown in the article grid."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Cover Image Uploader */}
                <ImageUploader
                  label="Cover Image"
                  required
                  value={editBlogForm.image}
                  onChange={(img) => setEditBlogForm({ ...editBlogForm, image: img })}
                  presetImages={PRESET_IMAGES}
                  helperText="Upload an article cover photo directly from your device or select an industry preset."
                />

                {/* Blog Article SEO Keywords */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-slate-300 font-semibold text-xs flex items-center gap-1.5">
                      <Tag size={13} className="text-amber-400" />
                      <span>SEO Keywords</span>
                    </label>
                    <span className="text-[10px] text-slate-400">Comma separated</span>
                  </div>
                  <input
                    type="text"
                    value={editBlogForm.seoKeywords}
                    onChange={(e) => setEditBlogForm({ ...editBlogForm, seoKeywords: e.target.value })}
                    placeholder="e.g. sustainable packaging, PCR resins, cosmetic trends 2025, B2B wholesale"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 text-xs"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">Boosts visibility on Google and search engines for industry packaging topics.</p>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1.5">Article Body Content *</label>
                  <textarea
                    required
                    rows={6}
                    value={editBlogForm.content}
                    onChange={(e) => setEditBlogForm({ ...editBlogForm, content: e.target.value })}
                    placeholder="Write the full body of the article here. Paragraph breaks are formatted automatically."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono text-xs"
                  />
                </div>
              </div>

              {/* Sticky Responsive Footer */}
              <div className="shrink-0 px-4 sm:px-7 py-3 sm:py-3.5 border-t border-slate-800 flex items-center justify-end space-x-3 bg-slate-900/95 backdrop-blur-sm">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditBlogModalOpen(false);
                    setEditingPost(null);
                  }}
                  className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 font-bold transition-colors cursor-pointer text-xs sm:text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 sm:px-6 sm:py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all shadow-lg shadow-amber-500/20 active:scale-95 disabled:opacity-50 cursor-pointer text-xs sm:text-sm flex items-center gap-2"
                >
                  <Pencil size={15} />
                  <span>{submitting ? 'Saving Changes...' : 'Save Article Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
