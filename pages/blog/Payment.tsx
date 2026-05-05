import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { CheckCircle2, Copy, MessageCircle, ShieldCheck, AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useOrder, buildWhatsAppLink, WHATSAPP_NUMBER } from '@/lib/order';
import { toast } from 'sonner';

export default function Payment() {
  const order = useOrder((s) => s.lastOrder);
  const [copied, setCopied] = useState<string>('');

  if (!order) return <Navigate to="/shop" replace />;

  const copy = (label: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    toast.success(`${label} copied`);
    setTimeout(() => setCopied(''), 1500);
  };

  const waLink = buildWhatsAppLink(order);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={36} className="text-gold" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-noir mb-3">Order Placed!</h1>
          <p className="text-muted-foreground">Thank you, {order.customer.fullName.split(' ')[0]}. Follow the payment steps below.</p>
          <p className="text-sm mt-3">
            Order ID: <span className="font-mono font-semibold text-noir">{order.orderId}</span>
          </p>
        </div>

        {/* Steps */}
        <div className="bg-noir text-cream p-6 md:p-8 mb-8">
          <h2 className="font-serif text-2xl text-gold mb-5">Complete Your Payment</h2>
          <ol className="space-y-3 text-sm">
            <li className="flex gap-3">
              <span className="bg-gold text-noir font-bold w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0">1</span>
              <span>Transfer <strong className="text-gold">${order.total.toFixed(2)}</strong> using ONE of the bank options below.</span>
            </li>
            <li className="flex gap-3">
              <span className="bg-gold text-noir font-bold w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0">2</span>
              <span>Include your Order ID <strong className="text-gold">{order.orderId}</strong> as the payment reference.</span>
            </li>
            <li className="flex gap-3">
              <span className="bg-gold text-noir font-bold w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0">3</span>
              <span>Send payment confirmation via WhatsApp to <strong className="text-gold">{WHATSAPP_NUMBER}</strong>.</span>
            </li>
            <li className="flex gap-3">
              <span className="bg-gold text-noir font-bold w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0">4</span>
              <span>We'll verify and dispatch your order within 24 hours. 🖤</span>
            </li>
          </ol>
        </div>

        {/* Bank details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="border-2 border-gold p-6">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="text-gold" size={18} />
              <h3 className="font-serif text-xl">Option A — International (EU/Worldwide)</h3>
            </div>
            <div className="space-y-3 text-sm">
              <DetailRow label="Account Name" value="Daniel Wanjau Mwangi" onCopy={copy} copied={copied} />
              <DetailRow label="IBAN" value="MT08CFE28004000000000006122167" onCopy={copy} copied={copied} mono />
              <DetailRow label="SWIFT / BIC" value="CFTEMTM1XXX" onCopy={copy} copied={copied} mono />
              <DetailRow label="Bank" value="OpenPayd Financial Services" onCopy={copy} copied={copied} />
            </div>
          </div>

          <div className="border-2 border-gold p-6">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="text-gold" size={18} />
              <h3 className="font-serif text-xl">Option B — United States</h3>
            </div>
            <div className="space-y-3 text-sm">
              <DetailRow label="Account Name" value="Daniel Wanjau Mwangi" onCopy={copy} copied={copied} />
              <DetailRow label="Account Number" value="061815030101" onCopy={copy} copied={copied} mono />
              <DetailRow label="Routing Number" value="043087080" onCopy={copy} copied={copied} mono />
              <DetailRow label="Bank" value="SSB Bank" onCopy={copy} copied={copied} />
            </div>
          </div>
        </div>

        {/* Amount to pay */}
        <div className="bg-cream border border-gold/30 p-6 mb-8 text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Amount to Pay</p>
          <p className="font-serif text-5xl text-noir">${order.total.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground mt-2">Payment reference: <span className="font-mono font-semibold">{order.orderId}</span></p>
        </div>

        {/* WhatsApp CTA */}
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white py-5 font-semibold tracking-wider text-sm hover:opacity-90 transition"
        >
          <MessageCircle size={20} />
          CONFIRM VIA WHATSAPP ({WHATSAPP_NUMBER})
        </a>

        <div className="mt-6 flex items-start gap-3 text-sm text-muted-foreground bg-cream/60 p-4">
          <AlertCircle size={18} className="text-gold flex-shrink-0 mt-0.5" />
          <p>
            Please keep this page open or bookmark it. Save a screenshot of the payment details for your reference.
            Orders not confirmed within 48 hours may be cancelled automatically.
          </p>
        </div>

        <div className="text-center mt-8">
          <Link to="/" className="text-sm text-gold hover:underline">← Back to Home</Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function DetailRow({ label, value, onCopy, copied, mono }: { label: string; value: string; onCopy: (l: string, v: string) => void; copied: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-gold/20 pb-2">
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
        <p className={`${mono ? 'font-mono' : 'font-medium'} text-sm text-noir break-all`}>{value}</p>
      </div>
      <button
        onClick={() => onCopy(label, value)}
        className="flex-shrink-0 text-gold hover:text-noir p-2"
        aria-label={`Copy ${label}`}
      >
        {copied === label ? <CheckCircle2 size={16} /> : <Copy size={16} />}
      </button>
    </div>
  );
}
