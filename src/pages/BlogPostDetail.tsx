import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Clock, Share2, Mail, CheckCircle2, Tag } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useBlogPosts } from '../services/storeService';
import { useSEO } from '../lib/useSEO';
import WhatsAppIcon from '../components/WhatsAppIcon';

export default function BlogPostDetail() {
  const { id } = useParams<{ id: string }>();
  const { posts, loading } = useBlogPosts();
  const [copied, setCopied] = React.useState(false);

  const post = posts.find((p) => String(p.id) === id);

  useSEO({
    title: post ? `${post.title} | Yi Lai Plastics Factory Blog` : 'Industry Blog',
    description: post?.excerpt,
    keywords: post?.seoKeywords || (post ? `${post.title}, ${post.category}, packaging industry, cosmetic packaging` : undefined),
    image: post?.image
  });

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-black text-slate-900 mb-4">Article Not Found</h1>
        <p className="text-slate-500 mb-8">The requested industry article could not be located.</p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-6 py-3 rounded-2xl hover:bg-blue-500 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Industry Blog</span>
        </Link>
      </div>
    );
  }

  const otherPosts = posts.filter((p) => String(p.id) !== id).slice(0, 2);

  return (
    <div className="bg-white min-h-screen">
      <PageHeader
        title={post.title}
        description={post.excerpt}
      />

      <div className="max-w-4xl 2xl:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Navigation & Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-wider"
          >
            <ArrowLeft size={16} />
            <span>All Articles</span>
          </Link>

          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar size={14} className="text-blue-500" />
              {post.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <User size={14} className="text-blue-500" />
              {post.author}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <Clock size={14} className="text-blue-500" />
              {post.readTime || '5 min read'}
            </span>
            <button
              onClick={handleShare}
              className="ml-2 inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-full font-semibold transition-colors cursor-pointer"
            >
              {copied ? <CheckCircle2 size={13} className="text-emerald-500" /> : <Share2 size={13} />}
              <span>{copied ? 'Link Copied' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden mb-12 shadow-xl border border-slate-200 aspect-[16/9] bg-slate-100">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-base sm:text-lg mb-10 space-y-6">
          {post.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="whitespace-pre-line">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Article SEO & Topic Tags */}
        {post.seoKeywords && (
          <div className="mb-14 p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-2xl">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-2.5">
              <Tag size={13} className="text-purple-600" />
              <span>Article Topics & SEO Tags</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {post.seoKeywords.split(',').map((kw, i) => (
                <span key={i} className="px-3 py-1 bg-white text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 shadow-2xs">
                  #{kw.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Direct Manufacturer CTA */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 mb-16 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-2 block">
              Direct Factory Packaging Support
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-4">
              Need custom technical specifications or free packaging samples?
            </h3>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              Our engineering hubs in Houston, Texas and Yuyao, Ningbo provide direct manufacturer pricing, mold design, and sample dispatch within 48 hours.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl transition-all shadow-lg shadow-blue-600/30 inline-flex items-center gap-2"
              >
                <Mail size={16} />
                <span>Contact Engineering Team</span>
              </Link>
              <a
                href="https://wa.me/8618567413851"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl transition-all inline-flex items-center gap-2"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>Direct WhatsApp Inquiries</span>
              </a>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {otherPosts.length > 0 && (
          <div>
            <h4 className="text-xl font-black text-slate-900 mb-6">More Industry Insights</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherPosts.map((op) => (
                <Link
                  key={op.id}
                  to={`/blog/${op.id}`}
                  className="group bg-slate-50 border border-slate-200 hover:border-blue-400 rounded-2xl p-5 transition-all flex gap-4 items-center"
                >
                  <img
                    src={op.image}
                    alt={op.title}
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block mb-1">
                      {op.category}
                    </span>
                    <h5 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 text-sm leading-snug">
                      {op.title}
                    </h5>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
