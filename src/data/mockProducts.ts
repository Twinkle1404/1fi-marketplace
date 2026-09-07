import type { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: 'iphone-16-pro',
    name: 'iPhone 16 Pro',
    brand: 'Apple',
    imageUrl: '/products/iphone-16-pro.jpg',
    basePrice: 119900,
    originalPrice: 129900,
    isNew: true,
    description:
      'The latest iPhone with A18 Pro chip, 48MP camera system, and titanium design. Experience the future of smartphones.',
    colorVariants: [
      { label: 'Natural Titanium', hex: '#BEBDB8' },
      { label: 'Desert Titanium', hex: '#C4A58C' },
      { label: 'White Titanium', hex: '#F2F1ED' },
      { label: 'Black Titanium', hex: '#3C3B37' },
    ],
    variants: [
      { id: 'ip16p-128', label: '128 GB', price: 119900, inStock: true },
      { id: 'ip16p-256', label: '256 GB', price: 129900, inStock: true },
      { id: 'ip16p-512', label: '512 GB', price: 149900, inStock: true },
      { id: 'ip16p-1tb', label: '1 TB', price: 169900, inStock: false },
    ],
    emiPlans: [
      { id: 'ip16p-emi-3', tenureMonths: 3, monthlyAmount: 39967, interestRate: 0, totalPayable: 119900, cashback: 3000 },
      { id: 'ip16p-emi-6', tenureMonths: 6, monthlyAmount: 20583, interestRate: 5, totalPayable: 123498 },
      { id: 'ip16p-emi-12', tenureMonths: 12, monthlyAmount: 10791, interestRate: 8, totalPayable: 129492, cashback: 1500 },
      { id: 'ip16p-emi-18', tenureMonths: 18, monthlyAmount: 7493, interestRate: 10, totalPayable: 134874 },
    ],
  },
  {
    id: 'samsung-galaxy-s25-ultra',
    name: 'Galaxy S25 Ultra',
    brand: 'Samsung',
    imageUrl: '/products/galaxy-s25-ultra.jpg',
    basePrice: 129999,
    originalPrice: 139999,
    isNew: true,
    description:
      'Samsung flagship with Snapdragon 8 Elite, S Pen, 200MP camera, and titanium frame. AI-powered Galaxy experience.',
    colorVariants: [
      { label: 'Titanium Gray', hex: '#7A7A78' },
      { label: 'Titanium Black', hex: '#2B2B2B' },
      { label: 'Titanium Silver', hex: '#DCDCDC' },
    ],
    variants: [
      { id: 'gs25u-256', label: '256 GB', price: 129999, inStock: true },
      { id: 'gs25u-512', label: '512 GB', price: 144999, inStock: true },
      { id: 'gs25u-1tb', label: '1 TB', price: 164999, inStock: true },
    ],
    emiPlans: [
      { id: 'gs25u-emi-3', tenureMonths: 3, monthlyAmount: 43333, interestRate: 0, totalPayable: 129999, cashback: 2500 },
      { id: 'gs25u-emi-6', tenureMonths: 6, monthlyAmount: 22317, interestRate: 3, totalPayable: 133899 },
      { id: 'gs25u-emi-12', tenureMonths: 12, monthlyAmount: 11700, interestRate: 8, totalPayable: 140400 },
      { id: 'gs25u-emi-18', tenureMonths: 18, monthlyAmount: 8111, interestRate: 10, totalPayable: 145998 },
    ],
  },
  {
    id: 'macbook-air-m3',
    name: 'MacBook Air M3',
    brand: 'Apple',
    imageUrl: '/products/macbook-air.jpg',
    basePrice: 114900,
    originalPrice: 124900,
    description:
      'Supercharged by M3 chip with up to 18 hours of battery life. The world\'s best consumer laptop, now even faster.',
    colorVariants: [
      { label: 'Midnight', hex: '#1C2530' },
      { label: 'Starlight', hex: '#E5DDCB' },
      { label: 'Space Gray', hex: '#7D7E80' },
      { label: 'Silver', hex: '#E3E4E5' },
    ],
    variants: [
      { id: 'mba-m3-8-256', label: '8 GB / 256 GB', price: 114900, inStock: true },
      { id: 'mba-m3-8-512', label: '8 GB / 512 GB', price: 134900, inStock: true },
      { id: 'mba-m3-16-512', label: '16 GB / 512 GB', price: 154900, inStock: true },
    ],
    emiPlans: [
      { id: 'mba-emi-3', tenureMonths: 3, monthlyAmount: 38300, interestRate: 0, totalPayable: 114900 },
      { id: 'mba-emi-6', tenureMonths: 6, monthlyAmount: 19733, interestRate: 3, totalPayable: 118398, cashback: 2000 },
      { id: 'mba-emi-12', tenureMonths: 12, monthlyAmount: 10341, interestRate: 8, totalPayable: 124092 },
      { id: 'mba-emi-18', tenureMonths: 18, monthlyAmount: 7178, interestRate: 10, totalPayable: 129204 },
    ],
  },
  {
    id: 'sony-bravia-55',
    name: 'Bravia 55" 4K OLED',
    brand: 'Sony',
    imageUrl: '',
    basePrice: 99990,
    originalPrice: 119990,
    description:
      'Stunning 4K OLED with Cognitive Processor XR, perfect blacks, and immersive Acoustic Surface Audio+ technology.',
    variants: [
      { id: 'bravia-55', label: '55 inch', price: 99990, inStock: true },
      { id: 'bravia-65', label: '65 inch', price: 149990, inStock: true },
      { id: 'bravia-77', label: '77 inch', price: 249990, inStock: false },
    ],
    emiPlans: [
      { id: 'bravia-emi-3', tenureMonths: 3, monthlyAmount: 33330, interestRate: 0, totalPayable: 99990, cashback: 5000 },
      { id: 'bravia-emi-6', tenureMonths: 6, monthlyAmount: 17165, interestRate: 3, totalPayable: 102990 },
      { id: 'bravia-emi-9', tenureMonths: 9, monthlyAmount: 11887, interestRate: 5, totalPayable: 106983 },
      { id: 'bravia-emi-12', tenureMonths: 12, monthlyAmount: 8999, interestRate: 8, totalPayable: 107988 },
    ],
  },
  {
    id: 'sony-wh1000xm5',
    name: 'WH-1000XM5',
    brand: 'Sony',
    imageUrl: '',
    basePrice: 26990,
    originalPrice: 34990,
    description:
      'Industry-leading noise cancellation with Auto NC Optimizer, 30-hour battery, and crystal-clear hands-free calling.',
    colorVariants: [
      { label: 'Black', hex: '#1C1C1E' },
      { label: 'Silver', hex: '#E6E4DD' },
      { label: 'Midnight Blue', hex: '#1A2942' },
    ],
    variants: [
      { id: 'xm5-black', label: 'Black', price: 26990, inStock: true },
      { id: 'xm5-silver', label: 'Silver', price: 26990, inStock: true },
      { id: 'xm5-blue', label: 'Midnight Blue', price: 27990, inStock: true },
    ],
    emiPlans: [
      { id: 'xm5-emi-3', tenureMonths: 3, monthlyAmount: 8997, interestRate: 0, totalPayable: 26990, cashback: 1000 },
      { id: 'xm5-emi-6', tenureMonths: 6, monthlyAmount: 4632, interestRate: 3, totalPayable: 27790 },
      { id: 'xm5-emi-12', tenureMonths: 12, monthlyAmount: 2429, interestRate: 8, totalPayable: 29148 },
    ],
  },
  {
    id: 'ipad-air-m2',
    name: 'iPad Air M2',
    brand: 'Apple',
    imageUrl: '',
    basePrice: 74900,
    originalPrice: 79900,
    description:
      'Powerful M2 chip, stunning Liquid Retina display, and Apple Pencil Pro support. The versatile tablet for everything.',
    colorVariants: [
      { label: 'Space Gray', hex: '#68696B' },
      { label: 'Blue', hex: '#879EB4' },
      { label: 'Purple', hex: '#BDB3C7' },
      { label: 'Starlight', hex: '#E7DFD5' },
    ],
    variants: [
      { id: 'ipad-air-128', label: '128 GB — Wi-Fi', price: 74900, inStock: true },
      { id: 'ipad-air-256', label: '256 GB — Wi-Fi', price: 84900, inStock: true },
      { id: 'ipad-air-256-cell', label: '256 GB — Wi-Fi + Cellular', price: 99900, inStock: true },
      { id: 'ipad-air-512', label: '512 GB — Wi-Fi', price: 104900, inStock: false },
    ],
    emiPlans: [
      { id: 'ipad-emi-3', tenureMonths: 3, monthlyAmount: 24967, interestRate: 0, totalPayable: 74900 },
      { id: 'ipad-emi-6', tenureMonths: 6, monthlyAmount: 12858, interestRate: 3, totalPayable: 77148 },
      { id: 'ipad-emi-12', tenureMonths: 12, monthlyAmount: 6741, interestRate: 8, totalPayable: 80892 },
    ],
  },
  {
    id: 'samsung-galaxy-watch7',
    name: 'Galaxy Watch 7',
    brand: 'Samsung',
    imageUrl: '/products/galaxy-watch-7.jpg',
    basePrice: 29999,
    originalPrice: 32999,
    isNew: true,
    description:
      'Advanced health monitoring with BioActive Sensor, sleep coaching, Galaxy AI insights, and durable sapphire crystal.',
    colorVariants: [
      { label: 'Green', hex: '#4A5B4D' },
      { label: 'Cream', hex: '#ECE6D9' },
      { label: 'Silver', hex: '#D8D9DB' },
    ],
    variants: [
      { id: 'gw7-40-green', label: '40 mm — Green', price: 29999, inStock: true },
      { id: 'gw7-40-cream', label: '40 mm — Cream', price: 29999, inStock: true },
      { id: 'gw7-44-green', label: '44 mm — Green', price: 32999, inStock: true },
      { id: 'gw7-44-silver', label: '44 mm — Silver', price: 32999, inStock: true },
    ],
    emiPlans: [
      { id: 'gw7-emi-3', tenureMonths: 3, monthlyAmount: 10000, interestRate: 0, totalPayable: 29999, cashback: 1500 },
      { id: 'gw7-emi-6', tenureMonths: 6, monthlyAmount: 5150, interestRate: 3, totalPayable: 30900 },
      { id: 'gw7-emi-12', tenureMonths: 12, monthlyAmount: 2700, interestRate: 8, totalPayable: 32400 },
    ],
  },
  {
    id: 'lg-washing-machine',
    name: '8 kg AI Direct Drive',
    brand: 'LG',
    imageUrl: '',
    basePrice: 38990,
    description:
      'AI-powered washing with Direct Drive motor, steam wash, ThinQ app control, and 10-year motor warranty.',
    variants: [
      { id: 'lg-wm-8kg', label: '8 kg', price: 38990, inStock: true },
      { id: 'lg-wm-9kg', label: '9 kg', price: 43990, inStock: true },
      { id: 'lg-wm-10kg', label: '10.5 kg', price: 49990, inStock: true },
    ],
    emiPlans: [
      { id: 'lg-emi-3', tenureMonths: 3, monthlyAmount: 12997, interestRate: 0, totalPayable: 38990 },
      { id: 'lg-emi-6', tenureMonths: 6, monthlyAmount: 6698, interestRate: 3, totalPayable: 40190, cashback: 1000 },
      { id: 'lg-emi-9', tenureMonths: 9, monthlyAmount: 4632, interestRate: 5, totalPayable: 41690 },
      { id: 'lg-emi-12', tenureMonths: 12, monthlyAmount: 3508, interestRate: 8, totalPayable: 42090 },
    ],
  },
  {
    id: 'canon-eos-r10',
    name: 'Canon EOS R10',
    brand: 'Canon',
    imageUrl: '/products/canon-eos-r10-black.jpg',
    basePrice: 79990,
    originalPrice: 87990,
    description:
      'Compact and capable APS-C mirrorless camera featuring 24.2MP CMOS sensor, 4K60p video, high-speed 23 fps burst shooting, and Dual Pixel CMOS AF II.',
    variants: [
      { id: 'canon-r10-body', label: 'Body Only', price: 79990, inStock: true },
      { id: 'canon-r10-18-45', label: 'RF-S 18-45mm IS STM Kit', price: 91990, inStock: true },
      { id: 'canon-r10-18-150', label: 'RF-S 18-150mm IS STM Kit', price: 114990, inStock: true },
    ],
    emiPlans: [
      { id: 'canon-emi-3', tenureMonths: 3, monthlyAmount: 26663, interestRate: 0, totalPayable: 79990, cashback: 2000 },
      { id: 'canon-emi-6', tenureMonths: 6, monthlyAmount: 13732, interestRate: 3, totalPayable: 82390 },
      { id: 'canon-emi-12', tenureMonths: 12, monthlyAmount: 7199, interestRate: 8, totalPayable: 86389 },
    ],
  },
  {
    id: 'dell-xps-13',
    name: 'Dell XPS 13',
    brand: 'Dell',
    imageUrl: '/products/dell-xps-13-graphite.jpg',
    basePrice: 109990,
    originalPrice: 122990,
    description:
      'Ultra-portable flagship laptop crafted from machined aluminum with Intel Core Ultra 7, FHD+ InfinityEdge display, and zero-lattice keyboard.',
    colorVariants: [
      { label: 'Graphite', hex: '#3E3E3E' },
      { label: 'Platinum', hex: '#E5E5E5' },
    ],
    variants: [
      { id: 'xps13-512', label: '512GB', price: 109990, inStock: true },
      { id: 'xps13-1tb', label: '1TB', price: 129990, inStock: true },
    ],
    emiPlans: [
      { id: 'xps13-emi-3', tenureMonths: 3, monthlyAmount: 36663, interestRate: 0, totalPayable: 109990 },
      { id: 'xps13-emi-6', tenureMonths: 6, monthlyAmount: 18882, interestRate: 3, totalPayable: 113290, cashback: 2500 },
      { id: 'xps13-emi-12', tenureMonths: 12, monthlyAmount: 9899, interestRate: 8, totalPayable: 118789 },
    ],
  },
  {
    id: 'playstation-5',
    name: 'PlayStation 5 Slim',
    brand: 'Sony',
    imageUrl: '/products/playstation-5.jpg',
    basePrice: 44990,
    originalPrice: 49990,
    isNew: true,
    description:
      'Slimmer design with 1TB SSD storage, 4K ray tracing, ultra-fast loading with custom I/O, and immersive DualSense wireless controller.',
    variants: [
      { id: 'ps5-digital', label: 'Digital Edition', price: 44990, inStock: true },
      { id: 'ps5-disc', label: 'Disc Edition', price: 54990, inStock: true },
    ],
    emiPlans: [
      { id: 'ps5-emi-3', tenureMonths: 3, monthlyAmount: 14997, interestRate: 0, totalPayable: 44990, cashback: 1500 },
      { id: 'ps5-emi-6', tenureMonths: 6, monthlyAmount: 7723, interestRate: 3, totalPayable: 46338 },
      { id: 'ps5-emi-12', tenureMonths: 12, monthlyAmount: 4049, interestRate: 8, totalPayable: 48588 },
    ],
  },
  {
    id: 'airpods-pro-2',
    name: 'AirPods Pro (2nd Gen)',
    brand: 'Apple',
    imageUrl: '/products/airpods-pro-2.jpg',
    basePrice: 24900,
    isNew: true,
    description:
      'Pro-level Active Noise Cancellation, Adaptive Audio, Transparency mode, Personalized Spatial Audio with dynamic head tracking, and USB-C MagSafe case.',
    variants: [
      { id: 'app2-usbc', label: 'USB-C MagSafe Case', price: 24900, inStock: true },
      { id: 'app2-care', label: 'With AppleCare+', price: 28800, inStock: true },
    ],
    emiPlans: [
      { id: 'app2-emi-3', tenureMonths: 3, monthlyAmount: 8300, interestRate: 0, totalPayable: 24900, cashback: 1000 },
      { id: 'app2-emi-6', tenureMonths: 6, monthlyAmount: 4275, interestRate: 3, totalPayable: 25650 },
      { id: 'app2-emi-12', tenureMonths: 12, monthlyAmount: 2241, interestRate: 8, totalPayable: 26892 },
    ],
  },
  {
    id: 'apple-watch-series-10',
    name: 'Apple Watch Series 10',
    brand: 'Apple',
    imageUrl: '/products/apple-watch-series-8.jpg',
    basePrice: 46900,
    description:
      'Our thinnest watch ever with our biggest display. Advanced health sensors for sleep apnea detection, ECG, and depth gauge for water sports.',
    colorVariants: [
      { label: 'Jet Black', hex: '#1C1C1E' },
      { label: 'Rose Gold', hex: '#E7C5BA' },
      { label: 'Silver', hex: '#E3E4E5' },
    ],
    variants: [
      { id: 'aws10-42-gps', label: '42 mm GPS', price: 46900, inStock: true },
      { id: 'aws10-46-gps', label: '46 mm GPS', price: 49900, inStock: true },
      { id: 'aws10-46-cel', label: '46 mm GPS + Cellular', price: 59900, inStock: true },
    ],
    emiPlans: [
      { id: 'aws10-emi-3', tenureMonths: 3, monthlyAmount: 15633, interestRate: 0, totalPayable: 46900 },
      { id: 'aws10-emi-6', tenureMonths: 6, monthlyAmount: 8051, interestRate: 3, totalPayable: 48306, cashback: 1500 },
      { id: 'aws10-emi-12', tenureMonths: 12, monthlyAmount: 4221, interestRate: 8, totalPayable: 50652 },
    ],
  },
];
