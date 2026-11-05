import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { Calendar, User, ArrowRight, Clock, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBlogPosts } from '../services/storeService';
import { useAuth } from '../context/AuthContext';

export default function Blog() {
  const { posts, loading } = useBlogPosts();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(posts.map(p => p.category)))];

  const filteredPosts = posts.filter(post => 
    selectedCategory === 'All' || post.category === selectedCategory
  );

  return (
    <div>
      <PageHeader 
        title="Industry Blog" 
        description="Insights, technical guides, and procurement tips from our packaging engineering teams in Houston and Yuyao."
      />

      <div className="max-w-7xl 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12 py-12 sm:py-16">
        
        {/* Category Filters & Admin Quick Action */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <Link
            to="/admin"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 px-3.5 py-2 rounded-full transition-colors border border-slate-200"
          >
            <PlusCircle size={14} className="text-blue-600" />
            <span>{user ? 'Manage Blog Posts' : 'Author Login'}</span>
          </Link>
        </div>

        {loading ? (
          <div className="min-h-[40vh] flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {filteredPosts.map((post) => (
              <article 
                key={post.id} 
                className="group border border-slate-200 rounded-3xl overflow-hidden flex flex-col hover:border-blue-400 hover:shadow-xl transition-all duration-300 bg-white"
              >
                <Link to={`/blog/${post.id}`} className="h-60 overflow-hidden relative bg-slate-100 block">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-slate-800 px-3 py-1 rounded-full text-xs font-bold border border-slate-200 shadow-xs">
                    {post.category}
                  </div>
                  {post.isCustom && (
                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-xs">
                      New
                    </div>
                  )}
                </Link>

                <div className="p-6 sm:p-8 flex flex-col flex-grow">
                  <div className="flex items-center space-x-4 text-xs font-semibold text-slate-400 mb-3">
                    <span className="flex items-center">
                      <Calendar size={13} className="mr-1.5 text-slate-400" /> {post.date}
                    </span>
                    <span className="flex items-center">
                      <User size={13} className="mr-1.5 text-slate-400" /> {post.author}
                    </span>
                  </div>

                  <Link to={`/blog/${post.id}`} className="block">
                    <h3 className="text-xl font-bold tracking-tight text-slate-900 mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-slate-500 text-sm mb-6 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      to={`/blog/${post.id}`}
                      className="text-blue-600 font-bold text-xs flex items-center group-hover:translate-x-1 transition-transform uppercase tracking-wider"
                    >
                      <span>Read Article</span>
                      <ArrowRight size={14} className="ml-1.5" />
                    </Link>
                    <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                      <Clock size={12} />
                      {post.readTime || '5 min read'}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
