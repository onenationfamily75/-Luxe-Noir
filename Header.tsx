import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { CATEGORIES } from '@/lib/products';
import { useCart } from '@/lib/cart';
import { cn } from '@/lib/utils';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const nav = useNavigate();
  const count = useCart((s) => s.itemCount());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    nav(`/shop?q=${encodeURIComponent(query.trim())}`);
    setSearchOpen(false);
    setMobileOpen(false);
  };

  return (
    <>
      <div className="bg-noir text-cream text-center text-xs py-2 px-4 tracking-widest uppercase">
        <span className="text-gold">✦</span> Free worldwide shipping on orders over $75 <span className="text-gold">✦</span> WhatsApp confirmation available
      </div>

      <header className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300',
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: mobile menu + desktop nav */}
            <div className="flex items-center gap-8">
              <button
                aria-label="Open menu"
                className="md:hidden text-noir"
                onClick={() => setMobileOpen(true)}
              >
                <Menu size={24} />
              </button>

              <nav className="hidden md:flex items-center gap-7 text-sm font-medium tracking-wide">
                <Link to="/shop" className="gold-border-hover hover:text-gold transition">Shop</Link>
                <div
                  className="relative"
                  onMouseEnter={() => setMenuOpen(true)}
                  onMouseLeave={() => setMenuOpen(false)}
                >
                  <button className="flex items-center gap-1 gold-border-hover hover:text-gold transition">
                    Categories <ChevronDown size={14} />
                  </button>
                  {menuOpen && (
                    <div className="absolute left-0 top-full pt-3 w-64">
                      <div className="bg-white shadow-2xl border border-gold/20 py-2">
                        {CATEGORIES.map((c) => (
                          <Link
                            key={c}
                            to={`/shop?category=${encodeURIComponent(c)}`}
                            className="block px-5 py-3 text-sm hover:bg-cream hover:text-gold transition"
                          >
                            {c}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <Link to="/testimonials" className="gold-border-hover hover:text-gold transition">Reviews</Link>
                <Link to="/about" className="gold-border-hover hover:text-gold transition">About</Link>
                <Link to="/contact" className="gold-border-hover hover:text-gold transition">Contact</Link>
              </nav>
            </div>

            {/* Center: logo */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center">
              <span className="font-serif text-2xl md:text-3xl font-bold tracking-[0.2em] text-noir">
                LUXE <span className="text-gold-gradient">NOIR</span>
              </span>
            </Link>

            {/* Right: search + cart */}
            <div className="flex items-center gap-4">
              <button
                aria-label="Search"
                onClick={() => setSearchOpen((v) => !v)}
                className="text-noir hover:text-gold transition"
              >
                <Search size={20} />
              </button>
              <Link to="/cart" className="relative text-noir hover:text-gold transition" aria-label="Cart">
                <ShoppingBag size={22} />
                {count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold text-noir text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {count}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {searchOpen && (
            <form onSubmit={submitSearch} className="pb-4 border-t border-gold/20 pt-4">
              <div className="flex items-center gap-3 max-w-2xl mx-auto">
                <Search size={18} className="text-gold" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for serums, lipsticks, fragrances..."
                  className="flex-1 bg-transparent border-b border-noir/20 focus:border-gold outline-none py-2 text-sm"
                />
                <button type="submit" className="text-sm font-medium text-gold hover:underline">Search</button>
              </div>
            </form>
          )}
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-5 border-b border-gold/20">
              <span className="font-serif text-xl font-bold tracking-widest">LUXE <span className="text-gold">NOIR</span></span>
              <button aria-label="Close" onClick={() => setMobileOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={submitSearch} className="px-5 py-4 border-b border-gold/10">
              <div className="flex items-center gap-2 bg-cream px-3 py-2">
                <Search size={16} className="text-gold" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 bg-transparent outline-none text-sm"
                />
              </div>
            </form>

            <nav className="px-5 py-4 space-y-1">
              <Link to="/shop" onClick={() => setMobileOpen(false)} className="block py-3 border-b border-gold/10 text-sm font-medium">Shop All</Link>
              <div className="py-2">
                <div className="text-xs uppercase tracking-wider text-gold font-semibold mb-2">Categories</div>
                {CATEGORIES.map((c) => (
                  <Link
                    key={c}
                    to={`/shop?category=${encodeURIComponent(c)}`}
                    onClick={() => setMobileOpen(false)}
                    className="block py-2 pl-3 text-sm hover:text-gold"
                  >
                    {c}
                  </Link>
                ))}
              </div>
              <Link to="/testimonials" onClick={() => setMobileOpen(false)} className="block py-3 border-t border-gold/10 text-sm font-medium">Reviews</Link>
              <Link to="/about" onClick={() => setMobileOpen(false)} className="block py-3 border-t border-gold/10 text-sm font-medium">About</Link>
              <Link to="/contact" onClick={() => setMobileOpen(false)} className="block py-3 border-t border-gold/10 text-sm font-medium">Contact</Link>
              <Link to="/cart" onClick={() => setMobileOpen(false)} className="block py-3 border-t border-gold/10 text-sm font-medium">Cart ({count})</Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
