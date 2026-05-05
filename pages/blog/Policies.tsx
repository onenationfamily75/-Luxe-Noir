import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

type Section = { title: string; body: React.ReactNode };

type PolicyPage = {
  slug: 'about' | 'contact' | 'shipping' | 'returns' | 'privacy' | 'terms' | 'faq';
  title: string;
  subtitle: string;
  sections: Section[];
};

const PAGES: Record<string, PolicyPage> = {
  about: {
    slug: 'about',
    title: 'About Luxe Noir',
    subtitle: 'Luxury beauty. Made affordable. Delivered worldwide.',
    sections: [
      { title: 'Our Story', body: <p>Luxe Noir was founded with a single idea — every woman, everywhere, deserves access to world-class beauty. We source from the most loved beauty houses across the US, Europe, Asia, and Africa, and deliver them directly to your door at prices that don't compromise on quality.</p> },
      { title: 'What We Offer', body: <p>From 24K gold-infused serums to velvet matte lipsticks, our curated collection spans Skincare, Makeup, Haircare, Fragrance, Body Care, Nails, Tools, and Wellness — 40,000+ products and counting, updated daily through our global dropshipping network.</p> },
      { title: 'Our Promise', body: <ul className="list-disc pl-5 space-y-2"><li>Authentic products from verified top global shops</li><li>Fast worldwide shipping to Americas, Europe, Asia, and Africa</li><li>Personalized WhatsApp order confirmation and support</li><li>Secure, transparent payment with private instructions</li><li>30-day satisfaction guarantee on every order</li></ul> },
    ],
  },
  contact: {
    slug: 'contact',
    title: 'Contact Us',
    subtitle: 'We love hearing from our community.',
    sections: [
      { title: 'WhatsApp', body: <p>Message us directly at <a href="https://wa.me/254786781665" className="text-gold underline" target="_blank" rel="noopener noreferrer">+254 786 781 665</a>. We reply within minutes during business hours.</p> },
      { title: 'Email', body: <p>General inquiries: <a href="mailto:hello@luxenoir.shop" className="text-gold underline">hello@luxenoir.shop</a><br />Order support: <a href="mailto:orders@luxenoir.shop" className="text-gold underline">orders@luxenoir.shop</a></p> },
      { title: 'Hours', body: <p>Monday–Saturday · 9am–8pm (GMT+3)<br />Sunday · 11am–5pm (GMT+3)</p> },
    ],
  },
  shipping: {
    slug: 'shipping',
    title: 'Shipping Policy',
    subtitle: 'Delivering luxury across five continents.',
    sections: [
      { title: 'Processing Time', body: <p>Orders are confirmed via WhatsApp once payment is received, then processed within 1–2 business days.</p> },
      { title: 'Delivery Times (after dispatch)', body: <ul className="list-disc pl-5 space-y-1"><li>North America: 7–14 business days</li><li>Europe: 6–12 business days</li><li>Asia: 8–15 business days</li><li>Africa: 7–14 business days</li><li>Rest of World: 10–21 business days</li></ul> },
      { title: 'Shipping Fees', body: <p>Flat rate $8.99 worldwide. <strong className="text-gold">FREE shipping on orders over $75.</strong></p> },
      { title: 'Tracking', body: <p>Tracking details are sent via WhatsApp and email as soon as your order ships.</p> },
    ],
  },
  returns: {
    slug: 'returns',
    title: 'Returns & Refunds',
    subtitle: '30-day satisfaction guarantee.',
    sections: [
      { title: 'Eligibility', body: <p>Unopened, unused products may be returned within 30 days of delivery. For hygiene reasons, opened makeup, skincare, haircare, and fragrance cannot be returned unless defective.</p> },
      { title: 'How to Request a Return', body: <ol className="list-decimal pl-5 space-y-1"><li>Message us on WhatsApp with your order ID.</li><li>We'll send you return instructions within 24 hours.</li><li>Ship the product back in its original packaging.</li><li>Refund is processed within 5–10 business days of receipt.</li></ol> },
      { title: 'Damaged or Wrong Item', body: <p>If your item arrives damaged or incorrect, message us within 7 days with photos and we'll replace or refund immediately — no return needed.</p> },
    ],
  },
  privacy: {
    slug: 'privacy',
    title: 'Privacy Policy',
    subtitle: 'Your data, respected.',
    sections: [
      { title: 'What We Collect', body: <p>We collect your name, email, phone, shipping address, and order details solely to process and deliver your order.</p> },
      { title: 'How We Use It', body: <p>Your information is used for order fulfillment, WhatsApp confirmation, shipping, and customer support. We never sell your data.</p> },
      { title: 'Third Parties', body: <p>We share minimal shipping info with our logistics partners. Payment confirmations are received via secure bank channels only.</p> },
      { title: 'Your Rights', body: <p>You can request deletion of your data at any time by messaging us on WhatsApp or emailing privacy@luxenoir.shop.</p> },
    ],
  },
  terms: {
    slug: 'terms',
    title: 'Terms of Service',
    subtitle: 'The fine print, simplified.',
    sections: [
      { title: 'Orders', body: <p>All orders are subject to acceptance and availability. We reserve the right to cancel orders with full refund if fraudulent activity is suspected.</p> },
      { title: 'Pricing', body: <p>Prices are shown in USD. Bank transfers are converted at standard rates. Prices may change without notice.</p> },
      { title: 'Payment Confirmation', body: <p>Orders are only dispatched after payment is verified and confirmed via WhatsApp.</p> },
      { title: 'Liability', body: <p>Luxe Noir is not liable for delays caused by customs or third-party couriers. We'll always work with you to resolve any issue.</p> },
    ],
  },
  faq: {
    slug: 'faq',
    title: 'Frequently Asked Questions',
    subtitle: 'Everything you need to know.',
    sections: [
      { title: 'How do I pay?', body: <p>After you place your order, you'll see private payment instructions with two bank options (International IBAN and US bank). After you transfer, send confirmation via WhatsApp to +254 786 781 665.</p> },
      { title: 'Do you ship to my country?', body: <p>Yes! We ship worldwide — including the Americas, Europe, Asia, and Africa.</p> },
      { title: 'How long does shipping take?', body: <p>7–21 business days depending on your region. You'll receive tracking via WhatsApp.</p> },
      { title: 'Are products authentic?', body: <p>Yes, 100%. Every product is sourced from verified top-ranked global beauty shops.</p> },
      { title: 'Can I return a product?', body: <p>Yes, unopened items within 30 days. See our <Link to="/returns" className="text-gold underline">Returns Policy</Link> for details.</p> },
      { title: 'How do I track my order?', body: <p>You'll receive tracking via WhatsApp and email once your order ships.</p> },
    ],
  },
};

export default function Policies({ type }: { type: PolicyPage['slug'] }) {
  const page = PAGES[type];
  const [openIdx, setOpenIdx] = useState<number | null>(type === 'faq' ? null : 0);

  if (!page) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="bg-noir text-cream py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gold tracking-[0.3em] text-xs uppercase mb-3">Luxe Noir</p>
          <h1 className="font-serif text-4xl md:text-5xl mb-3">{page.title}</h1>
          <p className="text-cream/70">{page.subtitle}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {type === 'faq' ? (
          <div className="space-y-3">
            {page.sections.map((s, i) => (
              <div key={i} className="border border-gold/30">
                <button
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="w-full flex justify-between items-center px-5 py-4 text-left hover:bg-cream transition"
                >
                  <span className="font-serif text-lg">{s.title}</span>
                  <ChevronDown size={18} className={`text-gold transition-transform ${openIdx === i ? 'rotate-180' : ''}`} />
                </button>
                {openIdx === i && <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{s.body}</div>}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-10">
            {page.sections.map((s, i) => (
              <section key={i}>
                <h2 className="font-serif text-2xl mb-3 text-noir">{s.title}</h2>
                <div className="text-sm text-muted-foreground leading-relaxed">{s.body}</div>
              </section>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
