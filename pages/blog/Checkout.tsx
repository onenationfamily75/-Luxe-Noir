import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/lib/cart';
import { useOrder, generateOrderId, type CustomerInfo } from '@/lib/order';
import { Lock, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function Checkout() {
  const { items, subtotal, clear } = useCart();
  const setOrder = useOrder((s) => s.setOrder);
  const nav = useNavigate();

  const [info, setInfo] = useState<CustomerInfo>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    notes: '',
  });

  const sub = subtotal();
  const shipping = sub >= 75 ? 0 : 8.99;
  const total = sub + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-24 text-center">
          <h1 className="font-serif text-3xl mb-4">Your cart is empty</h1>
          <Link to="/shop" className="text-gold underline">Continue shopping</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handle = (k: keyof CustomerInfo, v: string) => setInfo((p) => ({ ...p, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const required: (keyof CustomerInfo)[] = ['fullName', 'email', 'phone', 'address', 'city', 'country', 'postalCode'];
    for (const r of required) {
      if (!info[r]) {
        toast.error('Please complete all required fields');
        return;
      }
    }
    if (!info.email.includes('@')) {
      toast.error('Please enter a valid email');
      return;
    }

    const order = {
      orderId: generateOrderId(),
      createdAt: new Date().toISOString(),
      items: items.slice(),
      subtotal: sub,
      shipping,
      total,
      customer: info,
      status: 'awaiting_payment' as const,
    };
    setOrder(order);
    clear();
    nav('/payment');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="font-serif text-4xl md:text-5xl text-noir mb-2">Checkout</h1>
        <p className="text-sm text-muted-foreground mb-8 flex items-center gap-2">
          <Lock size={14} className="text-gold" /> Your information is private. Payment details shown after order placed.
        </p>

        <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="font-serif text-xl mb-5">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Full Name *" value={info.fullName} onChange={(v) => handle('fullName', v)} />
                <Field label="Email *" type="email" value={info.email} onChange={(v) => handle('email', v)} />
                <Field label="Phone (with country code) *" value={info.phone} onChange={(v) => handle('phone', v)} placeholder="+1 555 123 4567" />
                <Field label="Country *" value={info.country} onChange={(v) => handle('country', v)} placeholder="United States" />
              </div>
            </section>

            <section>
              <h2 className="font-serif text-xl mb-5">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Field label="Street Address *" value={info.address} onChange={(v) => handle('address', v)} />
                </div>
                <Field label="City *" value={info.city} onChange={(v) => handle('city', v)} />
                <Field label="Postal Code *" value={info.postalCode} onChange={(v) => handle('postalCode', v)} />
              </div>
            </section>

            <section>
              <h2 className="font-serif text-xl mb-5">Order Notes (Optional)</h2>
              <textarea
                value={info.notes || ''}
                onChange={(e) => handle('notes', e.target.value)}
                rows={3}
                placeholder="Delivery instructions, gift message, etc."
                className="w-full border border-noir/20 px-4 py-3 text-sm outline-none focus:border-gold"
              />
            </section>

            <button
              type="submit"
              className="w-full gold-gradient text-noir py-4 font-semibold tracking-widest text-sm hover:opacity-90 transition flex items-center justify-center gap-2"
            >
              PLACE ORDER & VIEW PAYMENT DETAILS <ArrowRight size={16} />
            </button>
            <p className="text-xs text-muted-foreground text-center">
              By placing your order you agree to our <Link to="/terms" className="text-gold hover:underline">Terms</Link> and{' '}
              <Link to="/privacy" className="text-gold hover:underline">Privacy Policy</Link>.
            </p>
          </div>

          <aside className="bg-cream p-6 h-fit">
            <h2 className="font-serif text-xl mb-5">Your Order</h2>
            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
              {items.map((i) => (
                <div key={`${i.productId}-${i.variant || ''}`} className="flex gap-3 text-sm">
                  <div className="relative w-14 h-14 bg-white flex-shrink-0 overflow-hidden">
                    <img src={i.image} alt={i.name} className="w-full h-full object-cover" />
                    <span className="absolute -top-1 -right-1 bg-noir text-gold text-[10px] w-5 h-5 flex items-center justify-center rounded-full">{i.quantity}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium line-clamp-2 text-xs">{i.name}</p>
                    {i.variant && <p className="text-[11px] text-muted-foreground">{i.variant}</p>}
                  </div>
                  <p className="font-semibold text-xs">${(i.price * i.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-gold/30 mt-5 pt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>${sub.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span></div>
              <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gold/20">
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
            </div>
          </aside>
        </form>
      </div>

      <Footer />
    </div>
  );
}

function Field({ label, value, onChange, type = 'text', placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-widest mb-1.5 text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-noir/20 px-4 py-3 text-sm outline-none focus:border-gold"
      />
    </label>
  );
}
