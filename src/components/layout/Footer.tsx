import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import WhatsAppIcon from '../WhatsAppIcon';
import SGLogo from '../SGLogo';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="flex flex-col">
            <Link to="/" className="flex items-center gap-3 mb-6 hover:opacity-95 transition-opacity">
              <SGLogo className="h-11 w-auto" markOnly isDark />
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter text-white leading-none">
                  SG <span className="text-blue-400">PACKAGING</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.28em] font-bold text-slate-400 mt-1">
                  A Division of Sino Gate
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 mb-8 leading-relaxed pr-4">
              Premium packaging solutions manufactured by verified Chinese factories for global B2B clients.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-colors">
                <Linkedin size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-colors">
                <Facebook size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-colors">
                <Twitter size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-colors">
                <Instagram size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-4">Quick Links</p>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/products" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Products</Link></li>
              <li><Link to="/factory" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Our Factory</Link></li>
              <li><Link to="/gallery" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Gallery</Link></li>
              <li><Link to="/blog" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-4">Categories</p>
            <ul className="space-y-3">
              <li><Link to="/products" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Trigger Sprayers</Link></li>
              <li><Link to="/products" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Lotion Pumps</Link></li>
              <li><Link to="/products" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Fine Mist Sprayers</Link></li>
              <li><Link to="/products" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Cosmetic Packaging</Link></li>
              <li><Link to="/products" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Plastic Bottles</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-4">US Headquarters</p>
            <p className="text-sm font-medium text-slate-300 mb-6">Houston, Texas, USA</p>
            
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-4">Factory HQ</p>
            <p className="text-sm font-medium text-slate-300 mb-6">Yuyao, Ningbo, Zhejiang Province, China</p>
            
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-4">Inquiry Support</p>
            <p className="text-sm font-medium text-slate-300 mb-2">sales@sgpackaging.com</p>
            <a
              href="https://wa.me/8613757050848?text=Hello%20SG%20Packaging%2C%20I%20would%20like%20to%20inquire%20about%20your%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#25D366] hover:text-emerald-400 transition-colors mb-6"
            >
              <WhatsAppIcon className="w-4 h-4 fill-[#25D366]" />
              <span>WhatsApp: +86 13757050848</span>
            </a>
            
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-4">Production Lead Time</p>
            <p className="text-sm font-medium text-slate-300">25-30 Days Average</p>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-medium text-slate-500">
          <p>&copy; {new Date().getFullYear()} SG Packaging (Sino Gate). All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
