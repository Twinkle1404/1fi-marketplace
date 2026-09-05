import type { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: 'iphone-16-pro',
    name: 'iPhone 16 Pro',
    brand: 'Apple',
    imageUrl: 'https://picsum.photos/seed/iphone16pro/400/400',
    basePrice: 119900,
    description:
      'The latest iPhone with A18 Pro chip, 48MP camera system, and titanium design. Experience the future of smartphones.',
    variants: [
      { id: 'ip16p-128', label: '128 GB', price: 119900, inStock: true },
      { id: 'ip16p-256', label: '256 GB', price: 129900, inStock: true },
      { id: 'ip16p-512', label: '512 GB', price: 149900, inStock: true },
      { id: 'ip16p-1tb', label: '1 TB', price: 169900, inStock: false },
    ],
    emiPlans: [
      { id: 'ip16p-emi-3', tenureMonths: 3, monthlyAmount: 39967, interestRate: 0, totalPayable: 119900 },
      { id: 'ip16p-emi-6', tenureMonths: 6, monthlyAmount: 20583, interestRate: 5, totalPayable: 123498 },
      { id: 'ip16p-emi-12', tenureMonths: 12, monthlyAmount: 10791, interestRate: 8, totalPayable: 129492 },
      { id: 'ip16p-emi-18', tenureMonths: 18, monthlyAmount: 7493, interestRate: 10, totalPayable: 134874 },
    ],
  },
  {
    id: 'samsung-galaxy-s25-ultra',
    name: 'Galaxy S25 Ultra',
    brand: 'Samsung',
    imageUrl: 'https://picsum.photos/seed/galaxys25/400/400',
    basePrice: 129999,
    description:
      'Samsung flagship with Snapdragon 8 Elite, S Pen, 200MP camera, and titanium frame. AI-powered Galaxy experience.',
    variants: [
      { id: 'gs25u-256', label: '256 GB', price: 129999, inStock: true },
      { id: 'gs25u-512', label: '512 GB', price: 144999, inStock: true },
      { id: 'gs25u-1tb', label: '1 TB', price: 164999, inStock: true },
    ],
    emiPlans: [
      { id: 'gs25u-emi-3', tenureMonths: 3, monthlyAmount: 43333, interestRate: 0, totalPayable: 129999 },
      { id: 'gs25u-emi-6', tenureMonths: 6, monthlyAmount: 22317, interestRate: 3, totalPayable: 133899 },
      { id: 'gs25u-emi-12', tenureMonths: 12, monthlyAmount: 11700, interestRate: 8, totalPayable: 140400 },
      { id: 'gs25u-emi-18', tenureMonths: 18, monthlyAmount: 8111, interestRate: 10, totalPayable: 145998 },
    ],
  },
  {
    id: 'macbook-air-m3',
    name: 'MacBook Air M3',
    brand: 'Apple',
    imageUrl: 'https://picsum.photos/seed/macbookairm3/400/400',
    basePrice: 114900,
    description:
      'Supercharged by M3 chip with up to 18 hours of battery life. The world\'s best consumer laptop, now even faster.',
    variants: [
      { id: 'mba-m3-8-256', label: '8 GB / 256 GB', price: 114900, inStock: true },
      { id: 'mba-m3-8-512', label: '8 GB / 512 GB', price: 134900, inStock: true },
      { id: 'mba-m3-16-512', label: '16 GB / 512 GB', price: 154900, inStock: true },
    ],
    emiPlans: [
      { id: 'mba-emi-3', tenureMonths: 3, monthlyAmount: 38300, interestRate: 0, totalPayable: 114900 },
      { id: 'mba-emi-6', tenureMonths: 6, monthlyAmount: 19733, interestRate: 3, totalPayable: 118398 },
      { id: 'mba-emi-12', tenureMonths: 12, monthlyAmount: 10341, interestRate: 8, totalPayable: 124092 },
      { id: 'mba-emi-18', tenureMonths: 18, monthlyAmount: 7178, interestRate: 10, totalPayable: 129204 },
    ],
  },
  {
    id: 'sony-bravia-55',
    name: 'Bravia 55" 4K OLED',
    brand: 'Sony',
    imageUrl: 'https://picsum.photos/seed/sonybravia55/400/400',
    basePrice: 99990,
    description:
      'Stunning 4K OLED with Cognitive Processor XR, perfect blacks, and immersive Acoustic Surface Audio+ technology.',
    variants: [
      { id: 'bravia-55', label: '55 inch', price: 99990, inStock: true },
      { id: 'bravia-65', label: '65 inch', price: 149990, inStock: true },
      { id: 'bravia-77', label: '77 inch', price: 249990, inStock: false },
    ],
    emiPlans: [
      { id: 'bravia-emi-3', tenureMonths: 3, monthlyAmount: 33330, interestRate: 0, totalPayable: 99990 },
      { id: 'bravia-emi-6', tenureMonths: 6, monthlyAmount: 17165, interestRate: 3, totalPayable: 102990 },
      { id: 'bravia-emi-9', tenureMonths: 9, monthlyAmount: 11887, interestRate: 5, totalPayable: 106983 },
      { id: 'bravia-emi-12', tenureMonths: 12, monthlyAmount: 8999, interestRate: 8, totalPayable: 107988 },
    ],
  },
  {
    id: 'sony-wh1000xm5',
    name: 'WH-1000XM5',
    brand: 'Sony',
    imageUrl: 'https://picsum.photos/seed/sonywh1000xm5/400/400',
    basePrice: 26990,
    description:
      'Industry-leading noise cancellation with Auto NC Optimizer, 30-hour battery, and crystal-clear hands-free calling.',
    variants: [
      { id: 'xm5-black', label: 'Black', price: 26990, inStock: true },
      { id: 'xm5-silver', label: 'Silver', price: 26990, inStock: true },
      { id: 'xm5-blue', label: 'Midnight Blue', price: 27990, inStock: true },
    ],
    emiPlans: [
      { id: 'xm5-emi-3', tenureMonths: 3, monthlyAmount: 8997, interestRate: 0, totalPayable: 26990 },
      { id: 'xm5-emi-6', tenureMonths: 6, monthlyAmount: 4632, interestRate: 3, totalPayable: 27790 },
      { id: 'xm5-emi-12', tenureMonths: 12, monthlyAmount: 2429, interestRate: 8, totalPayable: 29148 },
    ],
  },
  {
    id: 'ipad-air-m2',
    name: 'iPad Air M2',
    brand: 'Apple',
    imageUrl: 'https://picsum.photos/seed/ipadairm2/400/400',
    basePrice: 74900,
    description:
      'Powerful M2 chip, stunning Liquid Retina display, and Apple Pencil Pro support. The versatile tablet for everything.',
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
    imageUrl: 'https://picsum.photos/seed/galaxywatch7/400/400',
    basePrice: 29999,
    description:
      'Advanced health monitoring with BioActive Sensor, sleep coaching, Galaxy AI insights, and durable sapphire crystal.',
    variants: [
      { id: 'gw7-40-green', label: '40 mm — Green', price: 29999, inStock: true },
      { id: 'gw7-40-cream', label: '40 mm — Cream', price: 29999, inStock: true },
      { id: 'gw7-44-green', label: '44 mm — Green', price: 32999, inStock: true },
      { id: 'gw7-44-silver', label: '44 mm — Silver', price: 32999, inStock: true },
    ],
    emiPlans: [
      { id: 'gw7-emi-3', tenureMonths: 3, monthlyAmount: 10000, interestRate: 0, totalPayable: 29999 },
      { id: 'gw7-emi-6', tenureMonths: 6, monthlyAmount: 5150, interestRate: 3, totalPayable: 30900 },
      { id: 'gw7-emi-12', tenureMonths: 12, monthlyAmount: 2700, interestRate: 8, totalPayable: 32400 },
    ],
  },
  {
    id: 'lg-washing-machine',
    name: '8 kg AI Direct Drive',
    brand: 'LG',
    imageUrl: 'https://picsum.photos/seed/lgwashingmachine/400/400',
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
      { id: 'lg-emi-6', tenureMonths: 6, monthlyAmount: 6698, interestRate: 3, totalPayable: 40190 },
      { id: 'lg-emi-9', tenureMonths: 9, monthlyAmount: 4632, interestRate: 5, totalPayable: 41690 },
      { id: 'lg-emi-12', tenureMonths: 12, monthlyAmount: 3508, interestRate: 8, totalPayable: 42090 },
    ],
  },
];
