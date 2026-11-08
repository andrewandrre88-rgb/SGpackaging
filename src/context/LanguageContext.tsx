import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isArabic: boolean;
  t: (key: string) => string;
  translateCategory: (categoryName: string) => string;
  translateSpecKey: (specKey: string) => string;
}

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Top Bar
    'nav.houstonHq': 'Houston, TX (USA) HQ',
    'nav.yuyaoFactory': 'Yuyao, Ningbo Factory',
    'nav.isoVerified': 'ISO 9001:2015 Verified Manufacturer',
    'nav.leadTime': 'Direct Factory Lead Time: 15–25 Days',
    'nav.email': 'sales@sgpackaging.com',
    'nav.admin': 'Admin',
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.products': 'Products',
    'nav.factory': 'Factory Tour',
    'nav.gallery': 'Quality Gallery',
    'nav.blog': 'Tech Blog',
    'nav.contact': 'Contact Us',
    'nav.requestQuote': 'Request Quote',
    'nav.chatWhatsapp': 'Chat on WhatsApp',
    'nav.language': 'Language',
    'nav.english': 'English',
    'nav.arabic': 'العربية',

    // Home Page
    'home.heroBadge': 'GLOBAL OEM / ODM PACKAGING MANUFACTURER',
    'home.heroTitle1': 'Precision Dispensing &',
    'home.heroTitle2': 'Packaging Solutions',
    'home.heroSubtitle': 'Direct Factory to Global Brands',
    'home.heroDesc': 'Yi Lai Plastics Factory manufactures industry-leading trigger sprayers, lotion pumps, fine mist dispensers, and cosmetic containers. Dual strategic presence with US Headquarters in Houston, Texas and automated production facilities in Yuyao, Ningbo.',
    'home.heroExplore': 'Explore Catalog',
    'home.heroVirtualTour': 'Virtual Factory Tour',
    'home.statYears': '25+ Years Experience',
    'home.statCapacity': '50M+ Annual Output',
    'home.statCountries': '60+ Export Countries',
    'home.statIso': 'ISO 9001:2015 Certified',
    'home.featuredCategories': 'Core Product Categories',
    'home.categoriesSubtitle': 'Comprehensive dispensing solutions engineered for household chemicals, personal care, cosmetics, and automotive products.',
    'home.viewAllProducts': 'View All Products',
    'home.featuredTitle': 'Featured Flagship Products',
    'home.featuredSubtitle': 'High-performance dispensing engines trusted by multinational brands worldwide.',
    'home.whyTitle': 'Why Partner with Yi Lai Plastics Factory?',
    'home.whySubtitle': 'End-to-end engineering excellence, strict quality assurance, and dependable global logistics.',
    'home.whyQuality': 'Zero-Leakage Assurance',
    'home.whyQualityDesc': '100% automated vacuum leak testing on every assembly line before carton packaging.',
    'home.whyCustom': 'Custom Tooling & Colors',
    'home.whyCustomDesc': 'In-house mold design and exact Pantone color matching for your brand identity.',
    'home.whyDual': 'Dual US & China Hubs',
    'home.whyDualDesc': 'Houston USA commercial headquarters paired with high-volume precision manufacturing in Yuyao, Ningbo.',
    'home.whySpeed': 'Rapid Sample Dispatch',
    'home.whySpeedDesc': 'Free technical samples and engineering drawings dispatched worldwide within 48 hours.',
    'home.ctaTitle': 'Ready to Upgrade Your Packaging Supply Chain?',
    'home.ctaDesc': 'Contact our engineering sales team today for free technical samples, mold designs, or wholesale quotation with direct factory pricing.',
    'home.ctaButton': 'Get Direct Factory Pricing',
    'home.ctaWhatsapp': 'Chat WhatsApp: +86 18567413851',

    // Products Page
    'products.title': 'Packaging Product Catalog',
    'products.subtitle': 'Explore our complete line of industrial, household, cosmetic, and personal care dispensing systems.',
    'products.searchPlaceholder': 'Search products by name, neck size, or keyword...',
    'products.allCategories': 'All Categories',
    'products.viewGrid': 'Grid View',
    'products.viewTable': 'Specs Table',
    'products.moq': 'MOQ',
    'products.neckSize': 'Neck Size',
    'products.output': 'Output',
    'products.material': 'Material',
    'products.inquire': 'Inquire Now',
    'products.viewDetails': 'View Full Specs',
    'products.noProducts': 'No products found matching your search criteria.',
    'products.requestTds': 'Request Technical Drawing & TDS',
    'products.packagingDetails': 'Packaging Details',
    'products.features': 'Key Features',
    'products.specifications': 'Technical Specifications',
    'products.colors': 'Available Colors',
    'products.sampleRequest': 'Request Free Samples',
    'products.relatedProducts': 'Related Dispensing Products',
    'products.specsTable': 'Technical Specifications Matrix',
    'products.showing': 'Showing',
    'products.of': 'of',
    'products.results': 'products',

    // Factory Page
    'factory.title': 'Advanced Manufacturing Facility',
    'factory.subtitle': 'Located in Yuyao, Ningbo—China’s plastics capital—with 35,000 m² of modern automated workshops.',
    'factory.injection': 'High-Precision Injection Molding',
    'factory.injectionDesc': 'Equipped with over 60 high-speed Sumitomo and Haitian electric injection machines.',
    'factory.cleanroom': 'Class 100,000 Cleanroom Assembly',
    'factory.cleanroomDesc': 'Dedicated clean workshops for cosmetic and personal care dispensing systems ensuring zero dust.',
    'factory.testing': '100% Vacuum & Leak Testing',
    'factory.testingDesc': 'Automated vision inspection cameras and pressurized testing tanks prevent defective units from leaving our line.',
    'factory.bookAudit': 'Book Factory Tour or Audit',

    // About Page
    'about.title': 'About Yi Lai Plastics Factory',
    'about.subtitle': 'A legacy of engineering precision, high-volume production, and trusted global partnerships.',
    'about.dualPresence': 'Dual Presence: Houston, USA & Yuyao, China',
    'about.dualPresenceDesc': 'Connecting global clients seamlessly with direct manufacturer capabilities and local support.',
    'about.mission': 'Our Mission',
    'about.missionDesc': 'To deliver the most reliable, cost-efficient, and innovative dispensing solutions to brands worldwide.',

    // Contact Page
    'contact.title': 'Contact Our Global Team',
    'contact.subtitle': 'Whether you require custom tooling, high-volume quotation, or free samples, our engineers are ready.',
    'contact.houstonOffice': 'United States Commercial Headquarters',
    'contact.chinaOffice': 'Manufacturing Plant & Global Export Center',
    'contact.formTitle': 'Send Direct RFQ / Inquiry',
    'contact.name': 'Your Full Name',
    'contact.email': 'Work Email Address',
    'contact.company': 'Company Name',
    'contact.phone': 'Phone / WhatsApp',
    'contact.message': 'Project Details / Quantity / Target Neck Size',
    'contact.submit': 'Submit Inquiry',
    'contact.submitting': 'Sending...',
    'contact.successTitle': 'Inquiry Submitted Successfully!',
    'contact.successDesc': 'Our international sales engineer will reply within 12 hours.',

    // Footer
    'footer.companyDesc': 'Yi Lai Plastics Factory is a premier OEM/ODM manufacturer of trigger sprayers, lotion pumps, fine mist dispensers, and cosmetic packaging. Dual operational presence with US Commercial Headquarters in Houston, Texas and automated production facilities in Yuyao, Ningbo.',
    'footer.quickLinks': 'Quick Navigation',
    'footer.productCategories': 'Product Categories',
    'footer.globalPresence': 'Global Presence',
    'footer.houstonLocation': 'Houston, Texas, USA',
    'footer.yuyaoLocation': 'Yuyao, Ningbo, China',
    'footer.copyright': 'Yi Lai Plastics Factory. All rights reserved.',
    'footer.inquirySupport': 'Inquiry Support',
    'footer.sitemap': 'Site Index & XML Sitemap',

    // Admin & Common
    'admin.portal': 'Management Portal',
    'admin.desc': 'Sign in to manage catalog products and publish industry blog articles.',
    'admin.authorizedOnly': 'Authorized Accounts Only:',
    'admin.restrictedNotice': 'All other Google accounts will be denied access automatically.',
    'admin.returnSite': 'Return to Public Website',
    'admin.signInGoogle': 'Sign in with Google',
    'admin.connecting': 'Connecting to Google...',
    'admin.productsTab': 'Products Catalog',
    'admin.blogTab': 'Technical Articles',
    'admin.addProduct': 'Add New Product',
    'admin.addPost': 'Create Blog Post',
    'admin.logout': 'Log Out'
  },
  ar: {
    // Top Bar
    'nav.houstonHq': 'المقر الرئيسي: هيوستن، تكساس (أمريكا)',
    'nav.yuyaoFactory': 'مصنع يويو، نينغبو',
    'nav.isoVerified': 'مصنع معتمد ISO 9001:2015',
    'nav.leadTime': 'مدة التوريد من المصنع: 15–25 يوماً',
    'nav.email': 'sales@sgpackaging.com',
    'nav.admin': 'لوحة الإدارة',
    'nav.home': 'الرئيسية',
    'nav.about': 'من نحن',
    'nav.products': 'المنتجات',
    'nav.factory': 'جولة المصنع',
    'nav.gallery': 'معرض الجودة',
    'nav.blog': 'المدونة التقنية',
    'nav.contact': 'اتصل بنا',
    'nav.requestQuote': 'طلب تسعير مصنع',
    'nav.chatWhatsapp': 'محادثة عبر واتساب',
    'nav.language': 'اللغة',
    'nav.english': 'English',
    'nav.arabic': 'العربية',

    // Home Page
    'home.heroBadge': 'مصنّع عالمي لأنظمة التغليف ومعدات التوزيع الأصلية OEM / ODM',
    'home.heroTitle1': 'أنظمة الضخ المبتكرة و',
    'home.heroTitle2': 'حلول التغليف الدقيقة',
    'home.heroSubtitle': 'مباشرة من المصنع إلى العلامات التجارية العالمية',
    'home.heroDesc': 'تتخصص Yi Lai Plastics Factory (مصنع يي لاي للبلاستيك) في تصنيع بخاخات التريجر ومضخات اللوشن وبخاخات الرذاذ الدقيق وعبوات مستحضرات التجميل. حضور استراتيجي مزدوج بمقرنا في هيوستن بتكساس الأمريكية ومصانعنا المؤتمتة الحديثة في يويو، نينغبو.',
    'home.heroExplore': 'استكشف الكتالوج',
    'home.heroVirtualTour': 'جولة افتراضية في المصنع',
    'home.statYears': 'خبرة تزيد عن 25 عاماً',
    'home.statCapacity': 'طاقة إنتاج 50+ مليون سنوياً',
    'home.statCountries': 'تصدير لأكثر من 60 دولة',
    'home.statIso': 'شهادة الجودة ISO 9001:2015',
    'home.featuredCategories': 'أبرز فئات المنتجات',
    'home.categoriesSubtitle': 'حلول ضخ وتوزيع متكاملة مصممة للمنظفات المنزلية ومستحضرات التجميل والعناية الشخصية.',
    'home.viewAllProducts': 'عرض جميع المنتجات',
    'home.featuredTitle': 'المنتجات الرائدة والأكثر طلباً',
    'home.featuredSubtitle': 'محركات ضخ عالية الأداء وموثوقة من كبرى العلامات التجارية في جميع أنحاء العالم.',
    'home.whyTitle': 'لماذا يختار المصنّعون الشراكة مع مصنع يي لاي للبلاستيك (Yi Lai Plastics Factory)؟',
    'home.whySubtitle': 'تميز هندسي متكامل، ومعايير فحص جودة صارمة، وخدمات لوجستية سريعة وموثوقة عالمياً.',
    'home.whyQuality': 'ضمان منع التسريب التام 100%',
    'home.whyQualityDesc': 'فحص تفريغ هوائي واختبار ضغط آلي بنسبة 100% لجميع الخطوط قبل التعبئة والتصدير.',
    'home.whyCustom': 'قوالب وألوان مخصصة',
    'home.whyCustomDesc': 'تصميم قوالب متطورة داخلياً مع مطابقة دقيقة لألوان بانتون (Pantone) الخاصة بعلامتك.',
    'home.whyDual': 'مركزان في أمريكا والصين',
    'home.whyDualDesc': 'مقر تجاري ودعم فني في هيوستن بأمريكا مع قدرات تصنيع ضخمة في يويو، نينغبو.',
    'home.whySpeed': 'إرسال عينات سريعة',
    'home.whySpeedDesc': 'عينات تقنية مجانية ورسومات هندسية يتم إرسالها خلال 48 ساعة إلى جميع دول العالم.',
    'home.ctaTitle': 'هل أنت مستعد لتطوير سلسلة توريد التغليف الخاصة بك؟',
    'home.ctaDesc': 'تواصل مع فريق مهندسي المبيعات اليوم للحصول على عينات تقنية مجانية وقوالب مخصصة وعروض أسعار المصنع المباشرة.',
    'home.ctaButton': 'احصل على أسعار المصنع المباشرة',
    'home.ctaWhatsapp': 'تحدث عبر واتساب: +86 18567413851',

    // Products Page
    'products.title': 'كتالوج منتجات التغليف',
    'products.subtitle': 'استكشف مجموعتنا المتكاملة من بخاخات التريجر، ومضخات اللوشن، والرذاذ، وعبوات مستحضرات التجميل.',
    'products.searchPlaceholder': 'ابحث عن المنتج بالاسم أو مقاس العنق أو المادة...',
    'products.allCategories': 'جميع الفئات',
    'products.viewGrid': 'عرض شبكي',
    'products.viewTable': 'جدول المواصفات',
    'products.moq': 'أدنى كمية للطلب (MOQ)',
    'products.neckSize': 'مقاس العنق',
    'products.output': 'معدل الضخ',
    'products.material': 'المادة الخام',
    'products.inquire': 'استفسر الآن',
    'products.viewDetails': 'عرض كامل المواصفات',
    'products.noProducts': 'لم يتم العثور على منتجات مطابقة للبحث.',
    'products.requestTds': 'طلب الرسم الفني والبيانات التقنية TDS',
    'products.packagingDetails': 'تفاصيل التعبئة والكرتون',
    'products.features': 'المميزات الرئيسية',
    'products.specifications': 'المواصفات الفنية',
    'products.colors': 'الألوان المتوفرة',
    'products.sampleRequest': 'طلب عينات مجانية',
    'products.relatedProducts': 'منتجات ذات صلة',
    'products.specsTable': 'مصفوفة المواصفات الفنية',
    'products.showing': 'عرض',
    'products.of': 'من أصل',
    'products.results': 'منتج',

    // Factory Page
    'factory.title': 'منشأة التصنيع المتقدمة',
    'factory.subtitle': 'تقع في يويو، نينغبو — عاصمة صناعة البلاستيك — بمساحة 35,000 متر مربع من الورش المؤتمتة.',
    'factory.injection': 'قولبة حقن عالية الدقة',
    'factory.injectionDesc': 'مجهزة بأكثر من 60 ماكينة حقن كهربائية متطورة من سوميتومو وهايتيان.',
    'factory.cleanroom': 'غرف نظيفة معقمة فئة 100,000',
    'factory.cleanroomDesc': 'ورش عمل خالية تماماً من الغبار مخصصة لأنظمة مستحضرات التجميل والعناية الشخصية.',
    'factory.testing': 'فحص تسريب وفراغ بنسبة 100%',
    'factory.testingDesc': 'كاميرات فحص بصري دقيقة واختبارات ضغط هواء تضمن عدم خروج أي وحدة معيبة.',
    'factory.bookAudit': 'حجز زيارة أو تدقيق ميداني للمصنع',

    // About Page
    'about.title': 'حول مصنع يي لاي للبلاستيك (Yi Lai Plastics Factory)',
    'about.subtitle': 'عراقة هندسية، إنتاجية ضخمة، وشراكات توريد دولية موثوقة في أكثر من 60 دولة.',
    'about.dualPresence': 'حضور مزدوج: هيوستن، أمريكا ويويو، الصين',
    'about.dualPresenceDesc': 'توفير اتصال سلس بين كبار المستوردين والقدرات الحقيقية المباشرة للمصنع.',
    'about.mission': 'رسالتنا',
    'about.missionDesc': 'تقديم أنظمة ضخ مبتكرة وعالية الموثوقية وبأفضل كفاءة سعرية للمصانع والماركات حول العالم.',

    // Contact Page
    'contact.title': 'تواصل مع فريقنا الدولي',
    'contact.subtitle': 'سواء كنت بحاجة إلى قوالب مخصصة، أو طلبات جملة ضخمة، أو عينات مجانية، مهندسونا مستعدون.',
    'contact.houstonOffice': 'المقر التجاري في الولايات المتحدة',
    'contact.chinaOffice': 'المصنع ومركز التصدير الدولي',
    'contact.formTitle': 'إرسال طلب تسعير أو استفسار مباشر',
    'contact.name': 'الاسم الكامل',
    'contact.email': 'البريد الإلكتروني للعمل',
    'contact.company': 'اسم الشركة أو العلامة التجارية',
    'contact.phone': 'رقم الهاتف / واتساب',
    'contact.message': 'تفاصيل المشروع / الكمية المطلوبة / مقاس العنق',
    'contact.submit': 'إرسال الاستفسار الآن',
    'contact.submitting': 'جاري الإرسال...',
    'contact.successTitle': 'تم إرسال استفسارك بنجاح!',
    'contact.successDesc': 'سيتواصل معك مهندس المبيعات الدولي خلال 12 ساعة كحد أقصى.',

    // Footer
    'footer.companyDesc': 'مصنع يي لاي للبلاستيك (Yi Lai Plastics Factory): مصنّع عالمي OEM/ODM لبخاخات التريجر ومضخات اللوشن وبخاخات الرذاذ الدقيق وعبوات التجميل. حضور استراتيجي مزدوج بمقرنا في هيوستن بتكساس الأمريكية ومصانعنا في يويو، نينغبو.',
    'footer.quickLinks': 'روابط سريعة',
    'footer.productCategories': 'فئات المنتجات',
    'footer.globalPresence': 'فروعنا الدولية',
    'footer.houstonLocation': 'هيوستن، تكساس، الولايات المتحدة',
    'footer.yuyaoLocation': 'يويو، نينغبو، الصين',
    'footer.copyright': 'مصنع يي لاي للبلاستيك (Yi Lai Plastics Factory). جميع الحقوق محفوظة.',
    'footer.inquirySupport': 'الدعم والاستفسارات المباشرة',
    'footer.sitemap': 'خريطة الموقع (HTML & XML)',

    // Admin & Common
    'admin.portal': 'بوابة إدارة الكتالوج',
    'admin.desc': 'تسجيل الدخول لإضافة المنتجات الجديدة وإدارة المقالات التقنية.',
    'admin.authorizedOnly': 'الحسابات المصرح بها فقط:',
    'admin.restrictedNotice': 'سيتم رفض وحظر أي حساب جوجل آخر غير مصرح به تلقائياً.',
    'admin.returnSite': 'العودة إلى الموقع العام',
    'admin.signInGoogle': 'تسجيل الدخول بواسطة Google',
    'admin.connecting': 'جاري الاتصال بجوجل...',
    'admin.productsTab': 'كتالوج المنتجات',
    'admin.blogTab': 'المقالات التقنية',
    'admin.addProduct': 'إضافة منتج جديد',
    'admin.addPost': 'كتابة مقال جديد',
    'admin.logout': 'تسجيل الخروج'
  }
};

const CATEGORY_TRANSLATIONS: Record<string, string> = {
  'Trigger Sprayers': 'بخاخات تريجر (ضغط)',
  'Lotion Pumps': 'مضخات لوشن',
  'Fine Mist Sprayers': 'بخاخات رذاذ دقيق',
  'Mini Trigger Sprayers': 'بخاخات تريجر مصغرة',
  'Foam Pumps': 'مضخات رغوة',
  'Plastic Bottles': 'زجاجات وعبوات بلاستيكية',
  'Cosmetic Packaging': 'تغليف مستحضرات التجميل',
  'Caps & Closures': 'أغطية ومحابس'
};

const SPEC_KEY_TRANSLATIONS: Record<string, string> = {
  'Neck Size': 'مقاس العنق',
  'Output': 'معدل الضخ',
  'Material': 'المادة الخام',
  'Tube Length': 'طول الأنبوب',
  'Lock Type': 'نوع القفل',
  'Weight': 'الوزن',
  'Closure': 'نوع الإغلاق'
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  isArabic: false,
  t: (key: string) => key,
  translateCategory: (name: string) => name,
  translateSpecKey: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('sg_language');
      if (saved === 'ar' || saved === 'en') return saved;
      // Auto-detect Arabic browser language if preferred
      if (navigator.language?.startsWith('ar')) return 'ar';
    } catch {
      // Ignore localStorage issues
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('sg_language', lang);
    } catch {
      // Ignore
    }
  };

  const isArabic = language === 'ar';

  useEffect(() => {
    // Dynamically update html dir and lang attributes
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
  }, [language, isArabic]);

  const t = (key: string): string => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS.en?.[key] || key;
  };

  const translateCategory = (name: string): string => {
    if (!isArabic) return name;
    return CATEGORY_TRANSLATIONS[name] || name;
  };

  const translateSpecKey = (key: string): string => {
    if (!isArabic) return key;
    return SPEC_KEY_TRANSLATIONS[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isArabic, t, translateCategory, translateSpecKey }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
