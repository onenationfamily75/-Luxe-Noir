import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, X, ShoppingBag, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/lib/cart';

export default function Cart() {
  const { items, updateQty, removeItem, subtotal } = useCart();
  const nav = useNavigate();

  const sub = subtotal();
  const shipping = sub >= 75 ? 0 : sub === 0 ? 0 : 8.99;
  const total = sub + shipping;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="font-serif text-4xl md:text-5xl text-noir mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-24 bg-cream">
            <ShoppingBag size={48} className="mx-auto text-gold mb-4" />
            <p className="font-serif text-2xl mb-3">Your cart is empty</p>
            <p className="text-muted-foreground mb-6">Start your beauty journey with us.</p>
            <Link to="/shop" className="gold-gradient text-noir px-8 py-4 font-semibold tracking-widest text-sm inline-flex items-center gap-2 hover:opacity-90">
              SHOP NOW <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-5">
              {items.map((i) => (
                <div key={`${i.productId}-${i.variant || ''}`} className="flex gap-4 border-b border-gold/20 pb-5">
                  <Link to={`/product/${i.productId}`} className="w-24 h-32 bg-cream flex-shrink-0 overflow-hidden">
                    <img src={i.image} alt={i.name} className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex-1">
                    <div className="flex justify-between gap-3">
                      <Link to={`/product/${i.productId}`} className="font-medium text-noir hover:text-gold">
                        {i.name}
                      </Link>
                      <button
                        onClick={() => removeItem(i.productId, i.variant)}
                        aria-label="Remove"
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X size={18} />
                      </button>
                    </div>
                    {i.variant && <p className="text-xs text-muted-foreground mt-1">Option: {i.variant}</p>}
                    <p className="font-semibold mt-2">${i.price.toFixed(2)}</p>
                    <div className="mt-3 inline-flex items-center border border-noir/20">
                      <button onClick={() => updateQty(i.productId, i.quantity - 1, i.variant)} className="p-2 hover:bg-cream"><Minus size={14} /></button>
                      <span className="px-4 text-sm">{i.quantity}</span>
                      <button onClick={() => updateQty(i.productId, i.quantity + 1, i.variant)} className="p-2 hover:bg-cream"><Plus size={14} /></button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${(i.price * i.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <aside className="bg-cream p-6 h-fit">
              <h2 className="font-serif text-xl mb-5">Order Summary</h2>
              <div className="space-y-3 text-sm mb-5">
                <div className="flex justify-between"><span>Subtotal</span><span>${sub.toFixed(2)}</span></div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <span className="text-gold font-semibold">FREE</span> : `$${shipping.toFixed(2)}`}</span>
                </div>
                {sub < 75 && sub > 0 && (
                  <p className="text-xs text-muted-foreground">Add ${(75 - sub).toFixed(2)} more for free shipping.</p>
                )}
              </div>
              <div className="border-t border-gold/30 pt-4 flex justify-between font-semibold text-lg mb-5">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button
                onClick={() => nav('/checkout')}
                className="w-full bg-noir text-cream py-4 font-semibold tracking-widest text-sm hover:bg-gold hover:text-noir transition"
              >
                PROCEED TO CHECKOUT
              </button>
              <Link to="/shop" className="block text-center text-sm text-gold mt-4 hover:underline">
                Continue Shopping
              </Link>
            </aside>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
