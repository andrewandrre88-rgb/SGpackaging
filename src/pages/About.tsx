import PageHeader from '../components/PageHeader';
import { Target, Lightbulb, Users, Factory, Award, Globe2, ShieldCheck, CheckCircle } from 'lucide-react';
import factoryInteriorImg from '../assets/images/factory_interior_1783250334324.jpg';
import qualityControlImg from '../assets/images/quality_control_1783250348911.jpg';
import SGLogo from '../components/SGLogo';
import { Link } from 'react-router-dom';

export default function About() {
  const credentials = [
    { number: '15+', label: 'Years in Precision Molding', desc: 'Yuyao manufacturing heritage' },
    { number: '50+', label: 'Global Export Markets', desc: 'North America, EU, LatAm, MENA' },
    { number: '1,200+', label: 'Annual HQ Containers', desc: 'Direct from Ningbo port' },
    { number: '99.8%', label: 'First-Pass QC Rate', desc: 'Rigorous ISO 9001:2015 protocol' },
  ];

  return (
    <div className="bg-white">
      <PageHeader 
        title="About SG Packaging" 
        description="A premier division of Sino Gate, dedicated to precision dispensing solutions engineered directly in China's plastic manufacturing capital."
      />
      
      <div className="max-w-7xl 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12 py-12 sm:py-20">
        
        {/* Main Story & Visuals */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20 sm:mb-28">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-3 bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2 mb-6">
              <SGLogo className="h-7 w-auto" markOnly />
              <span className="text-xs font-bold tracking-wider text-slate-800 uppercase">Official Sino Gate Enterprise Division</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl 2xl:text-5xl font-black tracking-tight text-slate-900 mb-6">
              Engineering the world's most dependable packaging dispensers.
            </h2>

            <div className="space-y-4 text-slate-600 leading-relaxed text-base sm:text-lg">
              <p>
                SG Packaging was established as a specialized division under Sino Gate, aiming to eliminate supply friction between international brand owners, packaging distributors, and tier-1 Chinese precision manufacturing facilities.
              </p>
              <p>
                Headquartered in Houston, Texas, USA for global operations, with our manufacturing and engineering base in Yuyao, Ningbo, Zhejiang Province — internationally celebrated as China's plastic packaging and mold tooling capital. This dual-presence allows us to sit at the immediate nexus of client strategy, raw resin procurement, high-speed automated assembly, and Ningbo Port container shipping.
              </p>
              <p>
                With over a decade and a half of engineering experience, our team specializes in leak-free trigger sprayers, fine mist dispensers, high-viscosity lotion pumps, and custom cosmetic packaging tailored to demanding brand specifications.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 text-sm font-semibold text-slate-800">
              <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
                <ShieldCheck className="text-blue-600 w-5 h-5" />
                <span>ISO 9001:2015 Audited</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
                <Globe2 className="text-blue-600 w-5 h-5" />
                <span>Multilingual Export Operations</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img 
                src={factoryInteriorImg} 
                alt="Injection molding facility" 
                className="rounded-3xl border border-slate-200/80 w-full h-48 sm:h-64 object-cover shadow-sm hover:scale-[1.02] transition-transform duration-500" 
              />
              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 text-center">
                <span className="text-xs font-bold text-blue-900 uppercase tracking-wider block">Yuyao, Ningbo</span>
                <span className="text-xs text-blue-700">China Packaging Hub</span>
              </div>
            </div>
            <div className="space-y-4 pt-8 sm:pt-12">
              <div className="p-4 bg-slate-900 text-white rounded-2xl text-center">
                <span className="text-xl font-black block">50,000 m²</span>
                <span className="text-xs text-slate-400">Total Workshop Area</span>
              </div>
              <img 
                src={qualityControlImg} 
                alt="Quality inspection laboratory" 
                className="rounded-3xl border border-slate-200/80 w-full h-48 sm:h-64 object-cover shadow-sm hover:scale-[1.02] transition-transform duration-500" 
              />
            </div>
          </div>
        </div>

        {/* 4 Stat Credential Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20 sm:mb-28">
          {credentials.map((c, i) => (
            <div key={i} className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 text-center hover:border-blue-300 transition-colors">
              <span className="text-3xl sm:text-4xl 2xl:text-5xl font-black text-blue-600 tracking-tight block mb-1">
                {c.number}
              </span>
              <span className="font-bold text-slate-900 text-sm sm:text-base block mb-0.5">
                {c.label}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {c.desc}
              </span>
            </div>
          ))}
        </div>

        {/* Pillars / Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-200/80 flex flex-col items-start hover:border-blue-400 hover:shadow-lg transition-all">
            <div className="w-14 h-14 bg-white rounded-2xl shadow-xs border border-slate-200 flex items-center justify-center text-blue-600 mb-6">
              <Target size={26} />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-slate-900 mb-3">Our Mission</h3>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              To eliminate supply chain friction by providing direct factory-floor pricing, zero-defect quality control, and rapid custom tooling for global brands and packaging distributors.
            </p>
          </div>

          <div className="bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-200/80 flex flex-col items-start hover:border-blue-400 hover:shadow-lg transition-all">
            <div className="w-14 h-14 bg-white rounded-2xl shadow-xs border border-slate-200 flex items-center justify-center text-blue-600 mb-6">
              <Lightbulb size={26} />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-slate-900 mb-3">Our Vision</h3>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              To be recognized as the world's most dependable supplier of trigger sprayers, dispensing pumps, and sustainable post-consumer recycled (PCR) cosmetic packaging systems.
            </p>
          </div>

          <div className="bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-200/80 flex flex-col items-start hover:border-blue-400 hover:shadow-lg transition-all">
            <div className="w-14 h-14 bg-white rounded-2xl shadow-xs border border-slate-200 flex items-center justify-center text-blue-600 mb-6">
              <Factory size={26} />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-slate-900 mb-3">Direct Ningbo Infrastructure</h3>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Direct access to 150+ injection molding machines, Class 100k cleanrooms, and Ningbo Port logistics, ensuring on-schedule ocean container deliveries across 50+ countries.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
