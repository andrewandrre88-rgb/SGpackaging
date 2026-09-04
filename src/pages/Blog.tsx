import PageHeader from '../components/PageHeader';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import cosmeticPackagingImg from '../assets/images/cosmetic_packaging_1783250321247.jpg';
import triggerSprayerImg from '../assets/images/trigger_sprayer_1783250299009.jpg';
import factoryInteriorImg from '../assets/images/factory_interior_1783250334324.jpg';

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: 'The Future of Sustainable Cosmetic Packaging',
      excerpt: 'Explore the latest trends in eco-friendly materials like PCR and bioplastics reshaping the beauty industry.',
      date: 'Oct 15, 2023',
      author: 'Admin',
      image: cosmeticPackagingImg,
      category: 'Industry Trends'
    },
    {
      id: 2,
      title: 'How to Choose the Right Trigger Sprayer for Your Product',
      excerpt: 'A comprehensive buyer\'s guide on selecting the correct nozzle, output, and material for chemical and household products.',
      date: 'Sep 28, 2023',
      author: 'Technical Team',
      image: triggerSprayerImg,
      category: 'Buying Guides'
    },
    {
      id: 3,
      title: 'Understanding Packaging MOQs in Chinese Factories',
      excerpt: 'Demystifying minimum order quantities, lead times, and how to negotiate better terms with manufacturers.',
      date: 'Sep 10, 2023',
      author: 'Sourcing Expert',
      image: factoryInteriorImg,
      category: 'Business Tips'
    }
  ];

  return (
    <div>
      <PageHeader 
        title="Industry Blog" 
        description="Insights, news, and buying guides from the packaging experts."
      />
      <div className="max-w-7xl 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {posts.map(post => (
            <article key={post.id} className="group border border-slate-200 rounded-3xl overflow-hidden flex flex-col hover:border-blue-400 hover:shadow-xl transition-all duration-300 bg-white">
              <div className="h-60 overflow-hidden relative bg-slate-100">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-slate-800 px-3 py-1 rounded-full text-xs font-bold border border-slate-200 shadow-xs">
                  {post.category}
                </div>
              </div>
              <div className="p-6 sm:p-8 flex flex-col flex-grow">
                <div className="flex items-center space-x-4 text-xs font-semibold text-slate-400 mb-3">
                  <span className="flex items-center"><Calendar size={13} className="mr-1.5 text-slate-400" /> {post.date}</span>
                  <span className="flex items-center"><User size={13} className="mr-1.5 text-slate-400" /> {post.author}</span>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-slate-900 mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">{post.title}</h3>
                <p className="text-slate-500 text-sm mb-6 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-blue-600 font-bold text-xs flex items-center group-hover:translate-x-1 transition-transform uppercase tracking-wider">
                    Read Article <ArrowRight size={14} className="ml-1.5" />
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">5 min read</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
