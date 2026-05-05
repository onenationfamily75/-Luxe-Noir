import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Mail } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Footer() {
  const [email, setEmail] = useState('');

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      toast.error('Please enter a valid email');
      return;
    }
    toast.success('Welcome to Luxe Noir — enjoy 10% off your first order!');
    setEmail('');
  };

  return (
    <footer className="bg-noir text-cream mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="font-serif text-2xl font-bold tracking-widest mb-4">
              LUXE <span className="text-gold-gradient">NOIR</span>
            </div>
            <p className="text-sm text-cream/70 leading-relaxed">
              Luxury women's beauty, made affordable. Shipping worldwide to the Americas, Europe, Asia, and Africa.
            </p>
            <div className="flex gap-4 mt-6">
              <a aria-label="Instagram" href="#" className="text-cream/60 hover:text-gold transition"><Instagram size={18} /></a>
              <a aria-label="Facebook" href="#" className="text-cream/60 hover:text-gold transition"><Facebook size={18} /></a>
              <a aria-label="Youtube" href="#" className="text-cream/60 hover:text-gold transition"><Youtube size={18} /></a>
              <a aria-label="Email" href="mailto:hello@luxenoir.shop" className="text-cream/60 hover:text-gold transition"><Mail size={18} /></a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-gold text-lg mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-cream/70">
              <li><Link to="/shop" className="hover:text-gold">All Products</Link></li>
              <li><Link to="/shop?category=Skincare" className="hover:text-gold">Skincare</Link></li>
              <li><Link to="/shop?category=Makeup" className="hover:text-gold">Makeup</Link></li>
              <li><Link to="/shop?category=Fragrance" className="hover:text-gold">Fragrance</Link></li>
              <li><Link to="/shop?sort=bestseller" className="hover:text-gold">Bestsellers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-gold text-lg mb-4">Policies</h4>
            <ul className="space-y-2 text-sm text-cream/70">
              <li><Link to="/shipping" className="hover:text-gold">Shipping Policy</Link></li>
              <li><Link to="/returns" className="hover:text-gold">Returns & Refunds</Link></li>
              <li><Link to="/privacy" className="hover:text-gold">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-gold">Terms of Service</Link></li>
              <li><Link to="/faq" className="hover:text-gold">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-gold">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-gold text-lg mb-4">Join the List</h4>
            <p className="text-sm text-cream/70 mb-4">
              Subscribe for 10% off your first order and exclusive beauty drops.
            </p>
            <form onSubmit={subscribe} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-noir-2 border border-gold/30 px-3 py-2 text-sm text-cream placeholder:text-cream/40 outline-none focus:border-gold"
              />
              <button type="submit" className="gold-gradient text-noir px-4 text-sm font-semibold hover:opacity-90">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-cream/10 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-cream/50">© {new Date().getFullYear()} Luxe Noir. All rights reserved.</p>
          <p className="text-xs text-cream/50">
            <Link to="/admin" className="hover:text-gold">Admin</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
