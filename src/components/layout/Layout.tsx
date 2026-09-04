import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import WhatsAppButton from '../WhatsAppButton';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 font-sans">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow pt-20 md:pt-[116px] lg:pt-[124px]">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
