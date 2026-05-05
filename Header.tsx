import { useState } from "react";
import { ShoppingCart, Heart, Search, Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount] = useState(0);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#EAD8DC] shadow-sm">
      {/* Announcement Bar */}
      <div className="bg-[#8B2D44] text-white text-center py-2 text-xs tracking-wide">
        🌍 Free Worldwide Shipping Over $49 · WhatsApp Order Confirmation
      </div>

      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="/" className="font-serif text-2xl font-semibold text-[#8B2D44]">
          Luxenoir<span className="text-[#C9A84C]">Beauty</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-1 items-center">
          {["Skincare","Makeup","Haircare","Nails","Wellness","Tools","Sale"].map(cat => (
            <a key={cat} href={`#${cat.toLowerCase()}`}
              className="px-3 py-2 text-sm text-[#4A3540] hover:bg-[#F5E0E5] hover:text-[#8B2D44] rounded-md transition-all">
              {cat}
            </a>
          ))}
        </nav>

        {/* Search + Icons */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center bg-[#FDF8F4] border border-[#EAD8DC] rounded-full px-3 h-9 gap-2 w-48">
            <Search size={13} className="text-[#9A7E87]" />
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent text-sm outline-none w-full text-[#1A1015]"
            />
          </div>

          <button className="w-9 h-9 rounded-full border border-[#EAD8DC] flex items-center justify-center hover:bg-[#F5E0E5] transition-all">
            <Heart size={15} className="text-[#4A3540]" />
          </button>

          <button className="w-9 h-9 rounded-full border border-[#EAD8DC] flex items-center justify-center hover:bg-[#F5E0E5] transition-all relative">
            <ShoppingCart size={15} className="text-[#4A3540]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#C9526B] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#EAD8DC] px-4 pb-4">
          {["Skincare","Makeup","Haircare","Nails","Wellness","Tools","Sale"].map(cat => (
            <a key={cat} href={`#${cat.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="block py-3 border-b border-[#EAD8DC] text-sm text-[#4A3540] font-medium">
              {cat}
            </a>
          ))}
          <input
            type="text"
            placeholder="Search products..."
            className="mt-3 w-full px-4 py-2 border border-[#EAD8DC] rounded-full text-sm outline-none"
          />
        </div>
      )}
    </header>
  );
}
