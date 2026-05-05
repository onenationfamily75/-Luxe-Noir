export type Category =
  | 'Skincare'
  | 'Makeup'
  | 'Haircare'
  | 'Fragrance'
  | 'Body Care'
  | 'Nails'
  | 'Tools & Accessories'
  | 'Wellness';

export const CATEGORIES: Category[] = [
  'Skincare',
  'Makeup',
  'Haircare',
  'Fragrance',
  'Body Care',
  'Nails',
  'Tools & Accessories',
  'Wellness',
];

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  description: string;
  rating: number;
  reviews: number;
  stock: number;
  variants?: string[];
  bestseller?: boolean;
  new?: boolean;
};

const IMG = {
  skincare: [
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80',
    'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=800&q=80',
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80',
    'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80',
    'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80',
    'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80',
    'https://images.unsplash.com/photo-1556228852-80b6e5eeff06?w=800&q=80',
    'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80',
  ],
  makeup: [
    'https://images.unsplash.com/photo-1522335789203-aaa57b0f6e19?w=800&q=80',
    'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&q=80',
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
    'https://images.unsplash.com/photo-1583241800698-e8ab01830a07?w=800&q=80',
    'https://images.unsplash.com/photo-1512207855439-e47e04858bc0?w=800&q=80',
    'https://images.unsplash.com/photo-1631214540242-3cd8c4b0b3b3?w=800&q=80',
    'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=800&q=80',
    'https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=800&q=80',
  ],
  haircare: [
    'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800&q=80',
    'https://images.unsplash.com/photo-1526045478516-99145907023c?w=800&q=80',
    'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&q=80',
    'https://images.unsplash.com/photo-1597354984706-fac992d9306f?w=800&q=80',
    'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&q=80',
    'https://images.unsplash.com/photo-1626108870272-1dd9b66f9dda?w=800&q=80',
  ],
  fragrance: [
    'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80',
    'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80',
    'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=80',
    'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=800&q=80',
    'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80',
    'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800&q=80',
  ],
  body: [
    'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=800&q=80',
    'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&q=80',
    'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=80',
    'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?w=800&q=80',
    'https://images.unsplash.com/photo-1601049413927-2eec18b9cc0f?w=800&q=80',
  ],
  nails: [
    'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80',
    'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=800&q=80',
    'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&q=80',
    'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=800&q=80',
  ],
  tools: [
    'https://images.unsplash.com/photo-1503236823255-94609f598e71?w=800&q=80',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80',
    'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=800&q=80',
    'https://images.unsplash.com/photo-1631730486572-226d1f595b68?w=800&q=80',
  ],
  wellness: [
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
    'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&q=80',
    'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?w=800&q=80',
    'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80',
  ],
};

const brands = ['Luxe Noir', 'Aurum', 'Noir Belle', 'Gilded', 'Opulence', 'Velvet Gold', 'Maison Noir', 'Éclat', 'Soleil', 'Royale'];

const productNames: Record<Category, string[]> = {
  Skincare: [
    '24K Gold Radiance Serum', 'Midnight Retinol Cream', 'Caviar Eye Concentrate', 'Hydra-Glow Moisturizer',
    'Vitamin C Brightening Essence', 'Overnight Renewal Mask', 'Rose Quartz Facial Oil', 'Collagen Firming Serum',
    'Niacinamide Clarifying Toner', 'Hyaluronic Plumping Gel', 'Pearl Brightening Cream', 'Black Diamond Eye Serum',
    'Enzyme Exfoliating Peel', 'Ceramide Barrier Balm', 'Peptide Lift Complex', 'SPF 50 Invisible Veil',
    'Micellar Cleansing Water', 'Gentle Foam Cleanser', 'Clay Detox Mask', 'Golden Honey Lip Mask',
    'Antioxidant Day Cream', 'Tranexamic Dark Spot Corrector', 'AHA BHA Resurfacing Serum', 'Snail Mucin Repair Essence',
    'Bakuchiol Firming Oil', 'Green Tea Soothing Gel',
  ],
  Makeup: [
    'Velvet Matte Lipstick', 'Liquid Gold Highlighter', 'Noir Mascara Extreme', 'Silk Foundation',
    'Smoky Eye Palette', 'Precision Liquid Liner', 'Sculpt & Contour Duo', 'Blush Bloom Powder',
    'Luxe Lip Gloss', 'Brow Define Pencil', 'Glow Primer Base', 'Setting Spray Finish',
    'Gold Leaf Eyeshadow', 'Matte Bronzer Palette', 'Satin Lipstick Collection', 'Winged Cat Eye Liner',
    'Concealer Perfection', 'Loose Setting Powder', 'Lash Curler Gold', 'Cream Blush Stick',
    'Duo Chrome Pigment', 'Tinted Lip Oil', 'Under Eye Color Corrector', 'Magnetic Lashes',
    'Holographic Highlighter Stick',
  ],
  Haircare: [
    'Argan Oil Repair Mask', 'Volumizing Shampoo', 'Silk Protein Conditioner', 'Heat Protect Spray',
    'Curl Defining Cream', 'Scalp Renewal Serum', 'Anti-Frizz Smoothing Oil', 'Keratin Treatment',
    'Dry Shampoo Noir', 'Hair Growth Tonic', 'Leave-In Detangler', 'Overnight Hair Mask',
    'Purple Toning Shampoo', 'Coconut Hydration Balm', 'Biotin Strengthening Spray', 'Root Lift Mousse',
    'Hair Gloss Treatment', 'Silk Press Cream', 'Edge Control Gold', 'Clarifying Scalp Scrub',
  ],
  Fragrance: [
    'Noir Obsession Eau de Parfum', 'Golden Hour Perfume', 'Midnight Rose Parfum', 'Velvet Oud',
    'Amber & Vanilla Mist', 'Black Orchid Extrait', 'Jasmine Noir Cologne', 'Saffron & Leather',
    'Cherry Blossom Dew', 'Cedar & Musk', 'Pink Pepper & Rose', 'Tobacco & Honey',
    'Iris Majesty', 'Ocean Breeze Mist', 'Tonka & Amber', 'Citrus Noir',
    'White Tea & Fig', 'Royal Violet', 'Sandalwood Dream', 'Patchouli Gold',
  ],
  'Body Care': [
    'Shimmer Body Oil', 'Exfoliating Body Scrub', 'Hydrating Body Butter', 'Gold Dust Body Mist',
    'Firming Body Cream', 'Coconut Body Polish', 'Rose Hip Body Lotion', 'Vitamin E Hand Cream',
    'Cellulite Smoothing Gel', 'Milk Bath Soak', 'Sugar Lip Scrub', 'Hydra-Glow Body Mist',
    'Dry Brush Ritual Set', 'Stretch Mark Balm', 'Foot Softening Mask', 'Shea Butter Souffle',
    'Self-Tan Gradual Lotion', 'Rose Water Body Spray',
  ],
  Nails: [
    'Noir Gel Polish', 'Gold Chrome Powder', 'Nail Strengthener Base', 'Top Coat Diamond Shine',
    'Nude Collection Polish Set', 'Matte Top Coat', 'Cuticle Oil Pen', 'Press-On Almond Nails',
    'Nail Art Foil Kit', 'UV Gel Lamp Mini', 'Hand & Nail Cream', 'French Manicure Kit',
    'Gel Remover Soak', 'Glitter Nail Polish',
  ],
  'Tools & Accessories': [
    'Rose Quartz Gua Sha', 'Jade Roller Set', 'Ionic Hair Dryer Gold', 'Titanium Flat Iron',
    'Ceramic Curling Wand', 'Silk Pillowcase', 'Makeup Brush Luxe Set', 'Beauty Blender Duo',
    'Heated Eyelash Curler', 'LED Face Mask', 'Facial Cleansing Device', 'Microcurrent Wand',
    'Derma Roller 0.5mm', 'Silk Hair Wrap', 'Magnetic Lash Applicator', 'Vanity Mirror LED',
  ],
  Wellness: [
    'Collagen Beauty Peptides', 'Hair Skin Nails Gummies', 'Biotin Complex Capsules', 'Evening Primrose Oil',
    'Beauty Sleep Tea Blend', 'Hormone Balance Formula', 'Zinc & Selenium', 'Sea Moss Gel',
    'Adaptogen Beauty Elixir', 'Turmeric Glow Shots', 'Magnesium Dream Powder', 'Probiotic Beauty Blend',
  ],
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function seededRand(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function priceFor(cat: Category, i: number): { price: number; original?: number } {
  const base: Record<Category, [number, number]> = {
    Skincare: [18, 85],
    Makeup: [12, 65],
    Haircare: [14, 55],
    Fragrance: [35, 165],
    'Body Care': [12, 48],
    Nails: [8, 30],
    'Tools & Accessories': [15, 180],
    Wellness: [22, 72],
  };
  const [lo, hi] = base[cat];
  const r = seededRand(i * 13 + cat.length);
  const price = Math.round((lo + r * (hi - lo)) * 100) / 100;
  const hasDiscount = seededRand(i * 7) > 0.55;
  const original = hasDiscount ? Math.round(price * (1 + 0.2 + seededRand(i * 3) * 0.3) * 100) / 100 : undefined;
  return { price: +price.toFixed(2), original: original ? +original.toFixed(2) : undefined };
}

function descFor(name: string, cat: Category): string {
  const templates = [
    `Indulge in our ${name.toLowerCase()}, a luxurious essential crafted with premium ingredients for radiant, lasting results. Perfect for daily beauty rituals.`,
    `Experience the allure of ${name.toLowerCase()}. This ${cat.toLowerCase()} hero blends rich textures and botanical extracts for visibly transformative effects.`,
    `A signature addition to your ${cat.toLowerCase()} collection. ${name} offers high-performance care with a velvety, gold-infused finish.`,
    `Elevated ${cat.toLowerCase()} excellence. ${name} delivers professional-grade quality with a luxurious feel and timeless elegance.`,
  ];
  return templates[name.length % templates.length];
}

function variantsFor(cat: Category): string[] | undefined {
  if (cat === 'Makeup') return ['Rose Nude', 'Ruby Noir', 'Gold Shimmer', 'Deep Plum'];
  if (cat === 'Fragrance') return ['30ml', '50ml', '100ml'];
  if (cat === 'Nails') return ['Onyx', 'Champagne', 'Rose Gold', 'Pearl'];
  if (cat === 'Skincare' || cat === 'Body Care') return ['30ml', '50ml', '100ml'];
  if (cat === 'Haircare') return ['250ml', '500ml'];
  return undefined;
}

function catKey(cat: Category): keyof typeof IMG {
  switch (cat) {
    case 'Skincare': return 'skincare';
    case 'Makeup': return 'makeup';
    case 'Haircare': return 'haircare';
    case 'Fragrance': return 'fragrance';
    case 'Body Care': return 'body';
    case 'Nails': return 'nails';
    case 'Tools & Accessories': return 'tools';
    case 'Wellness': return 'wellness';
  }
}

function generateSeedProducts(): Product[] {
  const products: Product[] = [];
  let seed = 1;

  for (const cat of CATEGORIES) {
    const names = productNames[cat];
    const imgs = IMG[catKey(cat)];
    names.forEach((n, idx) => {
      const brand = brands[(seed + idx) % brands.length];
      const { price, original } = priceFor(cat, seed);
      const img = imgs[idx % imgs.length];
      const rating = +(3.8 + seededRand(seed) * 1.2).toFixed(1);
      const reviews = rand(24, 2840);
      const id = `${slugify(cat)}-${slugify(n)}-${seed}`;
      products.push({
        id,
        name: n,
        brand,
        category: cat,
        price,
        originalPrice: original,
        image: img,
        images: [img, imgs[(idx + 1) % imgs.length], imgs[(idx + 2) % imgs.length]],
        description: descFor(n, cat),
        rating,
        reviews,
        stock: rand(5, 250),
        variants: variantsFor(cat),
        bestseller: seededRand(seed * 5) > 0.7,
        new: seededRand(seed * 11) > 0.8,
      });
      seed++;
    });
  }
  return products;
}

const SEED_PRODUCTS = generateSeedProducts();

const STORAGE_KEY = 'luxe_noir_products_v1';

export function getProducts(): Product[] {
  if (typeof window === 'undefined') return SEED_PRODUCTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return SEED_PRODUCTS;
    const arr = JSON.parse(raw) as Product[];
    if (!Array.isArray(arr) || arr.length === 0) return SEED_PRODUCTS;
    return arr;
  } catch {
    return SEED_PRODUCTS;
  }
}

export function saveProducts(p: Product[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

export function resetProducts() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getProductById(id: string): Product | undefined {
  return getProducts().find((p) => p.id === id);
}

export function parseCsvToProducts(csvText: string): Product[] {
  const lines = csvText.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) throw new Error('CSV is empty or missing headers');
  const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());
  const required = ['name', 'category', 'price', 'image', 'description', 'stock'];
  for (const r of required) {
    if (!headers.includes(r)) throw new Error(`Missing required column: ${r}`);
  }
  const out: Product[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cells = splitCsvLine(lines[i]);
    const row: Record<string, string> = {};
    headers.forEach((h, idx) => (row[h] = (cells[idx] || '').trim()));
    const name = row.name;
    const category = row.category as Category;
    if (!CATEGORIES.includes(category)) continue;
    const price = parseFloat(row.price);
    if (!name || Number.isNaN(price)) continue;
    out.push({
      id: `csv-${slugify(name)}-${i}`,
      name,
      brand: row.brand || 'Luxe Noir',
      category,
      price,
      originalPrice: row.originalprice ? parseFloat(row.originalprice) : undefined,
      image: row.image,
      description: row.description || descFor(name, category),
      rating: row.rating ? parseFloat(row.rating) : 4.5,
      reviews: row.reviews ? parseInt(row.reviews, 10) : rand(20, 400),
      stock: parseInt(row.stock, 10) || 0,
    });
  }
  return out;
}

function splitCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      out.push(cur);
      cur = '';
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out;
}

export const CSV_TEMPLATE = `name,brand,category,price,originalPrice,image,description,rating,reviews,stock
Example Lipstick,Luxe Noir,Makeup,24.99,34.99,https://example.com/image.jpg,Velvet matte finish lipstick,4.8,234,120
Gold Serum,Aurum,Skincare,49.99,,https://example.com/serum.jpg,24K gold radiance serum,4.9,412,80
`;

export const TESTIMONIALS = [
  { name: 'Amara K.', location: 'Los Angeles, USA', rating: 5, avatar: 'https://i.pravatar.cc/150?img=47', text: 'The 24K Gold Serum transformed my skin in weeks. Luxe Noir is now my go-to for everything beauty. Fast global shipping too!' },
  { name: 'Sophie L.', location: 'Paris, France', rating: 5, avatar: 'https://i.pravatar.cc/150?img=44', text: 'Obsessed with the Velvet Matte Lipstick collection. The pigment is unreal and it lasts all day. Packaging is giving luxury.' },
  { name: 'Zara M.', location: 'Nairobi, Kenya', rating: 5, avatar: 'https://i.pravatar.cc/150?img=45', text: 'Finally a beauty brand that ships to Africa fast. WhatsApp support was so helpful. My order arrived beautifully packaged.' },
  { name: 'Mei Lin', location: 'Shanghai, China', rating: 4, avatar: 'https://i.pravatar.cc/150?img=49', text: 'The Rose Quartz Gua Sha is a dream. Quality is next-level. I have already re-ordered three more times.' },
  { name: 'Isabella R.', location: 'Milan, Italy', rating: 5, avatar: 'https://i.pravatar.cc/150?img=48', text: 'Noir Obsession is my new signature scent. It smells sophisticated and lasts all evening. Absolutely worth every penny.' },
  { name: 'Priya S.', location: 'Mumbai, India', rating: 5, avatar: 'https://i.pravatar.cc/150?img=26', text: 'The Argan Oil Repair Mask brought my bleached hair back to life. I trust this brand completely now.' },
  { name: 'Chidinma O.', location: 'Lagos, Nigeria', rating: 5, avatar: 'https://i.pravatar.cc/150?img=32', text: 'Everything about Luxe Noir screams luxury, yet prices are so affordable. Highly recommend the fragrance collection.' },
  { name: 'Emma J.', location: 'London, UK', rating: 5, avatar: 'https://i.pravatar.cc/150?img=20', text: 'Customer service via WhatsApp was so personal and quick. My order was confirmed within minutes. Five stars!' },
];
