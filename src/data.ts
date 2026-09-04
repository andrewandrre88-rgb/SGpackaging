import { Product, Category } from './types';
import triggerSprayerImg from './assets/images/trigger_sprayer_1783250299009.jpg';
import lotionPumpImg from './assets/images/lotion_pump_1783250311172.jpg';
import cosmeticPackagingImg from './assets/images/cosmetic_packaging_1783250321247.jpg';
import premiumTrigger1 from './assets/images/premium_trigger_1.png';
import premiumTrigger2 from './assets/images/premium_trigger_2.png';
import premiumTrigger3 from './assets/images/premium_trigger_3.png';
import premiumTrigger4 from './assets/images/premium_trigger_4.png';
import premiumTrigger5 from './assets/images/premium_trigger_5.png';

export const CATEGORIES: Category[] = [
  { id: 'trigger-sprayers', name: 'Trigger Sprayers', image: triggerSprayerImg, count: 125 },
  { id: 'lotion-pumps', name: 'Lotion Pumps', image: lotionPumpImg, count: 85 },
  { id: 'fine-mist-sprayers', name: 'Fine Mist Sprayers', image: triggerSprayerImg, count: 156 },
  { id: 'mini-trigger-sprayers', name: 'Mini Trigger Sprayers', image: triggerSprayerImg, count: 42 },
  { id: 'foam-pumps', name: 'Foam Pumps', image: lotionPumpImg, count: 38 },
  { id: 'plastic-bottles', name: 'Plastic Bottles', image: cosmeticPackagingImg, count: 210 },
  { id: 'cosmetic-packaging', name: 'Cosmetic Packaging', image: cosmeticPackagingImg, count: 340 },
  { id: 'caps-closures', name: 'Caps & Closures', image: cosmeticPackagingImg, count: 180 },
];

export const PRODUCTS: Product[] = [
  {
    id: 'ts-premium-001',
    name: 'Premium Kitchen Cleaning Trigger Sprayer 28/410',
    category: 'Trigger Sprayers',
    shortDescription: 'Modern ergonomic trigger sprayer designed for premium kitchen cleaning and household products.',
    description: 'The Premium series trigger sprayer features a sleek, modern design that is perfect for premium household and kitchen cleaning products. It provides an excellent ergonomic grip and smooth actuation, ensuring comfortable use even during extended cleaning sessions.',
    features: ['Modern ergonomic profile', 'Smooth continuous actuation', 'Adjustable spray pattern', 'Durable internal components'],
    specifications: {
      'Neck Size': '28/410',
      'Output': '1.0 - 1.2 ml/T',
      'Material': 'PP (Polypropylene)',
      'Tube Length': 'Customizable',
    },
    colors: ['White/Grey', 'Custom combinations available'],
    moq: '20,000 pcs',
    packagingDetails: '500 pcs/carton. Carton size: 55x35x40cm.',
    image: premiumTrigger1,
    gallery: [
      premiumTrigger1,
      premiumTrigger2,
      premiumTrigger3,
      premiumTrigger4,
      premiumTrigger5
    ]
  },
  {
    id: 'ts-001',
    name: 'Heavy Duty Trigger Sprayer 28/400',
    category: 'Trigger Sprayers',
    shortDescription: 'Durable, chemical-resistant trigger sprayer for industrial and household cleaning.',
    description: 'Our premium 28/400 heavy-duty trigger sprayer is engineered for high performance and longevity. Ideal for dispensing cleaning solutions, garden chemicals, and automotive care products. Features an adjustable nozzle from fine mist to solid stream.',
    features: ['Adjustable nozzle (Mist to Stream)', 'Ergonomic 3-finger trigger', 'High-output design (1.2ml per stroke)', 'Chemical resistant materials'],
    specifications: {
      'Neck Size': '28/400',
      'Output': '1.0 - 1.2 ml/T',
      'Material': 'PP (Polypropylene)',
      'Tube Length': 'Customizable (Default 25cm)',
    },
    colors: ['White', 'Blue/White', 'Red/White', 'Custom on request'],
    moq: '10,000 pcs',
    packagingDetails: '500 pcs/carton. Carton size: 55x35x40cm. GW: 12kg.',
    image: triggerSprayerImg,
    gallery: [
      triggerSprayerImg,
    ]
  },
  {
    id: 'lp-002',
    name: 'Premium Lotion Pump 24/410',
    category: 'Lotion Pumps',
    shortDescription: 'Smooth action lotion pump perfect for cosmetics, hand soaps, and body lotions.',
    description: 'This 24/410 lotion pump offers a smooth, reliable dispensing experience. Designed with a lock-down head for secure shipping and storage. Ideal for personal care products including shampoos, lotions, and liquid soaps.',
    features: ['Lock-down head mechanism', 'Smooth dispensing action', 'No-leak design', 'Glass ball valve'],
    specifications: {
      'Neck Size': '24/410',
      'Output': '2.0 ml/T',
      'Material': 'PP body with PE tube',
      'Lock Type': 'Left-Right Lock',
    },
    colors: ['White', 'Black', 'Clear', 'Gold/Silver Plated (Optional)'],
    moq: '10,000 pcs',
    packagingDetails: '1000 pcs/carton. Carton size: 50x40x40cm. GW: 15kg.',
    image: lotionPumpImg,
    gallery: [
      lotionPumpImg
    ]
  },
  {
    id: 'fms-003',
    name: 'Aluminum Collar Fine Mist Sprayer',
    category: 'Fine Mist Sprayers',
    shortDescription: 'Elegant fine mist sprayer with aluminum collar for perfumes and toners.',
    description: 'Elevate your cosmetic packaging with our aluminum collar fine mist sprayer. Delivers a perfectly atomized, consistent mist. Perfect for facial toners, perfumes, body mists, and premium liquid cosmetics.',
    features: ['Ultra-fine mist atomization', 'Premium aluminum oversell', 'Includes clear overcap', 'Smooth actuation'],
    specifications: {
      'Neck Size': '20/410',
      'Output': '0.12 - 0.15 ml/T',
      'Material': 'PP + Aluminum',
      'Collar Style': 'Smooth or Ribbed',
    },
    colors: ['Silver', 'Gold', 'Rose Gold', 'Matte Black'],
    moq: '20,000 pcs',
    packagingDetails: '2000 pcs/carton. Carton size: 45x35x35cm. GW: 10kg.',
    image: triggerSprayerImg,
    gallery: [
      triggerSprayerImg
    ]
  },
  {
    id: 'cp-004',
    name: 'Luxury Acrylic Cream Jar 50ml',
    category: 'Cosmetic Packaging',
    shortDescription: 'High-end double wall acrylic jar for premium skincare creams.',
    description: 'Present your premium skincare creams in our luxury double-wall acrylic jar. Features a heavy-wall outer layer that mimics glass, with a durable PP inner bowl for product compatibility. Includes a sealing disc and elegant screw cap.',
    features: ['Double-wall construction', 'Glass-like premium appearance', 'Includes sealing disc', 'Excellent chemical compatibility'],
    specifications: {
      'Capacity': '50ml',
      'Material': 'Acrylic (Outer), PP (Inner)',
      'Dimensions': '65mm (Dia) x 55mm (H)',
      'Decoration': 'Hot Stamping, Silk Screen, Frosting available',
    },
    colors: ['Clear outer / White inner', 'Custom Pantone colors'],
    moq: '5,000 pcs',
    packagingDetails: 'Individually bagged, 200 pcs/carton.',
    image: cosmeticPackagingImg,
    gallery: [
      cosmeticPackagingImg
    ]
  },
  {
    id: 'pb-005',
    name: 'PET Boston Round Bottle 250ml',
    category: 'Plastic Bottles',
    shortDescription: 'Classic Boston round shape PET bottle for various personal care liquids.',
    description: 'The versatile 250ml PET Boston Round bottle is a staple for packaging shampoos, lotions, body washes, and household products. Crystal clear PET offers excellent product visibility and shatter-resistant safety.',
    features: ['High clarity PET material', 'Classic Boston Round shape', 'Shatter-resistant', '100% Recyclable'],
    specifications: {
      'Capacity': '250ml / 8oz',
      'Neck Size': '24/410',
      'Material': 'PET',
      'Weight': '22g',
    },
    colors: ['Clear', 'Amber', 'Cobalt Blue', 'Opaque White'],
    moq: '10,000 pcs',
    packagingDetails: 'Bulk packed in polybags within cartons. 500 pcs/carton.',
    image: cosmeticPackagingImg,
    gallery: [
      cosmeticPackagingImg
    ]
  },
  {
    id: 'fp-006',
    name: 'Rich Foam Pump 40/400',
    category: 'Foam Pumps',
    shortDescription: 'Creates rich, luxurious foam instantly. Ideal for facial cleansers and hand soaps.',
    description: 'Deliver a premium user experience with our 40/400 foam pump. Engineered to mix liquid and air precisely to produce a rich, dense foam instantly. Perfect for facial cleansers, baby wash, and foaming hand soaps. Reduces water and product usage.',
    features: ['Instant rich foam generation', 'Non-aerosol operation', 'Leak-proof design', 'Includes overcap'],
    specifications: {
      'Neck Size': '40/400',
      'Output': '0.8 ml/T',
      'Material': 'PP/PE',
      'Spring': 'Stainless Steel 304',
    },
    colors: ['White', 'Clear', 'Custom colors'],
    moq: '10,000 pcs',
    packagingDetails: '500 pcs/carton. Carton size: 55x45x45cm.',
    image: lotionPumpImg,
    gallery: [
      lotionPumpImg
    ]
  }
];
