import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, Sparkles, HeartHandshake, Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getProducts, CATEGORIES, TESTIMONIALS } from '@/lib/products';

const CATEGORY_IMAGES: Record<string, string> = {
  Skincare: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80',
  Makeup: 'https://images.unsplash.com/photo-1522335789203-aaa57b0f6e19?w=800&q=80',
  Haircare: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800&q=80',
  Fragrance: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80',
  'Body Care': 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=800&q=80',
  Nails: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80',
  'Tools & Accessories': 'https://images.unsplash.com/photo-1503236823255-94609f598e71?w=800&q=80',
  Wellness: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
};

export default function Index() {
  const products = getProducts();
  const bestsellers = products.filter((p) => p.bestseller).slice(0, 8);
  const newArrivals = products.filter((p) => p.new).slice(0, 8);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative h-[85vh] min-h-[560px] overflow-hidden bg-noir">
        <img
          src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1920&q=85"
          alt="Luxe Noir hero"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-noir via-noir/60 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-xl text-cream">
            <p className="text-gold tracking-[0.3em] text-xs mb-5 uppercase">Luxury · Affordable · Worldwide</p>
            <h1 className="font-serif text-5xl md:text-7xl leading-tight mb-6">
              Beauty,<br />
              <span className="text-gold-gradient">Unveiled.</span>
            </h1>
            <p className="text-cream/80 text-lg mb-8 max-w-md leading-relaxed">
              Discover the finest in women's beauty — curated from the world's top shops,
              delivered directly to your door across 5 continents.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                to="/shop"
                className="gold-gradient text-noir px-8 py-4 font-semibold tracking-wider text-sm inline-flex items-center gap-2 hover:opacity-90 transition"
              >
                SHOP NOW <ArrowRight size={16} />
              </Link>
              <Link
                to="/shop?sort=bestseller"
                className="border border-gold text-gold px-8 py-4 font-semibold tracking-wider text-sm hover:bg-gold hover:text-noir transition"
              >
                BESTSELLERS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className="bg-cream py-8 border-y border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Truck, title: 'Worldwide Shipping', sub: '5 continents, fast delivery' },
            { icon: ShieldCheck, title: 'Secure Checkout', sub: 'WhatsApp confirmation' },
            { icon: Sparkles, title: 'Authentic Products', sub: 'Sourced from top shops' },
            { icon: HeartHandshake, title: '24/7 Support', sub: 'We love our customers' },
          ].map((f, i) => (
            <div key={i} className="flex items-start gap-3">
              <f.icon className="text-gold flex-shrink-0 mt-1" size={22} />
              <div>
                <p className="font-semibold text-sm text-noir">{f.title}</p>
                <p className="text-xs text-muted-foreground">{f.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-gold tracking-[0.3em] text-xs uppercase mb-3">Explore</p>
          <h2 className="font-serif text-4xl md:text-5xl text-noir">Shop by Category</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((c) => (
            <Link
              key={c}
              to={`/shop?category=${encodeURIComponent(c)}`}
              className="group relative aspect-[3/4] overflow-hidden block"
            >
              <img
                src={CATEGORY_IMAGES[c]}
                alt={c}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir/90 via-noir/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-cream">
                <h3 className="font-serif text-xl md:text-2xl mb-1">{c}</h3>
                <span className="text-gold text-xs tracking-widest uppercase flex items-center gap-1 group-hover:gap-3 transition-all">
                  Shop Now <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-gold tracking-[0.3em] text-xs uppercase mb-3">Most Loved</p>
              <h2 className="font-serif text-3xl md:text-5xl text-noir">Bestsellers</h2>
            </div>
            <Link to="/shop?sort=bestseller" className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-noir hover:text-gold gold-border-hover">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {bestsellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Promo banner */}
      <section className="relative py-24 bg-noir overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=1600&q=80"
          alt="Limited edition"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative max-w-4xl mx-auto px-4 text-center text-cream">
          <p className="text-gold tracking-[0.3em] text-xs uppercase mb-4">Limited Edition</p>
          <h2 className="font-serif text-4xl md:text-6xl mb-4">The <span className="text-gold-gradient">Golden Hour</span> Collection</h2>
          <p className="text-cream/80 max-w-xl mx-auto mb-8">
            Discover radiant formulas infused with 24K gold. A celebration of timeless luxury.
          </p>
          <Link to="/shop?category=Skincare" className="gold-gradient text-noir px-8 py-4 font-semibold tracking-wider text-sm inline-flex items-center gap-2 hover:opacity-90 transition">
            EXPLORE NOW <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* New arrivals */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-gold tracking-[0.3em] text-xs uppercase mb-3">Just In</p>
            <h2 className="font-serif text-3xl md:text-5xl text-noir">New Arrivals</h2>
          </div>
          <Link to="/shop" className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-noir hover:text-gold">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {newArrivals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-noir text-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gold tracking-[0.3em] text-xs uppercase mb-3">Loved Worldwide</p>
            <h2 className="font-serif text-4xl md:text-5xl">What They're Saying</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.slice(0, 6).map((t, i) => (
              <div key={i} className="bg-noir-2 border border-gold/20 p-6">
                <div className="flex mb-3">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star key={n} size={14} className={n <= t.rating ? 'fill-gold text-gold' : 'text-cream/20'} />
                  ))}
                </div>
                <p className="text-cream/80 text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-gold/40" />
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-gold/80">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/testimonials" className="border border-gold text-gold px-8 py-3 font-semibold tracking-wider text-sm hover:bg-gold hover:text-noir transition inline-flex items-center gap-2">
              READ ALL REVIEWS <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
