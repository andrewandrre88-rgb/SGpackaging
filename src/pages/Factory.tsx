import PageHeader from '../components/PageHeader';
import factoryInteriorImg from '../assets/images/factory_interior_1783250334324.jpg';
import qualityControlImg from '../assets/images/quality_control_1783250348911.jpg';
import { Cpu, CheckCircle2, ShieldCheck, Warehouse, Gauge, Microscope, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import WhatsAppIcon from '../components/WhatsAppIcon';

export default function Factory() {
  const images = [
    { 
      src: factoryInteriorImg, 
      alt: 'High-Precision Injection Molding Workshop', 
      title: 'Precision Injection Molding', 
      desc: '150+ Haitian & Demag servo-electric injection molding machines operating 24/7 with computerized temperature & pressure control.' 
    },
    { 
      src: factoryInteriorImg, 
      alt: 'Automated High-Speed Assembly Line', 
      title: 'Automated Robotic Assembly', 
      desc: 'High-speed rotary assembly systems capable of 60-120 trigger sprayers per minute with 100% optical leak & seal inspection.' 
    },
    { 
      src: qualityControlImg, 
      alt: 'ISO 9001 Quality Control Laboratory', 
      title: 'Quality Assurance & Testing Lab', 
      desc: 'Equipped with vacuum leak chambers, drop test towers, fatigue stroke endurance testers (10,000+ pumps), and laser particle analyzers.' 
    },
    { 
      src: factoryInteriorImg, 
      alt: 'Smart Warehousing & Container Loading', 
      title: 'Intelligent Logistics & Warehousing', 
      desc: '15,000 m² racked warehousing with direct container loading bays, 45 minutes from Ningbo Port (Zhoushan).' 
    }
  ];

  const factoryStats = [
    { value: '50,000 m²', label: 'Production Plant', sub: 'Yuyao Plastic Industrial Park' },
    { value: '150+', label: 'Injection Machines', sub: 'High-precision servo systems' },
    { value: '1.2M+', label: 'Daily Output Capacity', sub: 'Dispensers, pumps & sprayers' },
    { value: 'Class 100K', label: 'Dust-Free Cleanroom', sub: 'Medical & cosmetic grade' },
  ];

  const equipmentFeatures = [
    {
      icon: <Cpu className="text-blue-600 w-6 h-6" />,
      title: 'Automated Mold Tooling & CNC',
      desc: 'Equipped with in-house CNC mold centers, EDM spark machines, and wire cutting to build custom OEM molds in 20-25 days.'
    },
    {
      icon: <Gauge className="text-blue-600 w-6 h-6" />,
      title: '100% In-Line Vacuum Testing',
      desc: 'Every single trigger and lotion pump undergoes automated negative pressure vacuum testing to eliminate liquid leakage.'
    },
    {
      icon: <Microscope className="text-blue-600 w-6 h-6" />,
      title: 'Compatibility & Chemical Testing',
      desc: 'Dedicated chemical compatibility chambers to test dip tubes, gaskets, and springs against aggressive cleaning and cosmetic solvents.'
    },
    {
      icon: <ShieldCheck className="text-blue-600 w-6 h-6" />,
      title: 'Strict ISO 9001:2015 Audited',
      desc: 'Full lot traceability from virgin PP/PE resin pellets to masterbatches, assembly dates, and container shipment pallets.'
    }
  ];

  return (
    <div className="bg-white">
      <PageHeader 
        title="Manufacturing Facilities & OEM Capability" 
        description="Take an inside look at our modern production plant in Yuyao, Ningbo — the heart of China's precision plastic dispensing industry."
      />

      {/* Main Content Area */}
      <div className="max-w-7xl 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12 py-12 sm:py-16">
        
        {/* Factory Overview & Lead */}
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
          <span className="inline-block px-3.5 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full border border-blue-200/80 mb-4">
            Direct Ningbo Factory • No Trading Intermediaries
          </span>
          <h2 className="text-3xl sm:text-4xl 2xl:text-5xl font-black text-slate-900 tracking-tight mb-6">
            Precision engineering at global scale.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            SG Packaging operates advanced manufacturing facilities based in Yuyao, Ningbo, Zhejiang Province, covering over 50,000 square meters. Located in China's premier plastic molding and dispenser production center, our production lines feature over 150 automated injection molding machines, robotic assembly lines, and Class 100,000 dust-free workshops specifically designed for cosmetic packaging.
          </p>
        </div>

        {/* 4-Stat Responsive Metric Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-20">
          {factoryStats.map((stat, index) => (
            <div 
              key={index}
              className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 text-center hover:border-blue-300 transition-colors"
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-blue-600 mb-1 tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm sm:text-base font-bold text-slate-900 mb-0.5">
                {stat.label}
              </div>
              <div className="text-xs text-slate-500 font-medium">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Facility Workshops Showcase */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Workshops</span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Production Floor & QC Units</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md">
              High-throughput automation minimizes human contamination and guarantees dimensional tolerances within ±0.02mm.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {images.map((img, idx) => (
              <div key={idx} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="aspect-[16/10] overflow-hidden bg-slate-100 relative">
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Station #{idx + 1}
                  </div>
                </div>
                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  <h4 className="text-xl font-bold text-slate-900 mb-2">{img.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1">{img.desc}</p>
                  <div className="flex items-center text-xs font-bold text-blue-600">
                    <CheckCircle2 size={16} className="mr-1.5 text-blue-600" />
                    <span>ISO 9001 Certified Procedure</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Engineering Capabilities Grid */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 lg:p-14 mb-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Core Competencies</span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Why Global Brands Choose Our Factory
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {equipmentFeatures.map((feat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200/80 flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                  {feat.icon}
                </div>
                <h5 className="font-bold text-slate-900 text-base mb-2">{feat.title}</h5>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Factory Visit & Audit CTA */}
        <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-3xl p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-center lg:text-left">
            <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">Facility Audits & Factory Tours</span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-1 mb-3">
              Planning a factory visit to Yuyao / Ningbo?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We welcome client audits, third-party inspections (SGS, TÜV, Intertek), and technical visits. Our team will arrange high-speed train pickup from Yuyao North Station or Ningbo Lishe Airport (NGB).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto shrink-0">
            <Link
              to="/contact"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3.5 rounded-xl text-center text-sm transition-colors"
            >
              Book Factory Tour
            </Link>
            <a
              href="https://wa.me/8613757050848?text=Hello%20SG%20Packaging%2C%20I%20would%20like%20to%20schedule%20a%20factory%20audit%20and%20request%20samples."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba59] text-white font-bold px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
