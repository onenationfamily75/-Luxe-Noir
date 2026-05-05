import { Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { TESTIMONIALS } from '@/lib/products';

export default function TestimonialsPage() {
  const avg = (TESTIMONIALS.reduce((s, t) => s + t.rating, 0) / TESTIMONIALS.length).toFixed(1);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="bg-noir text-cream py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-gold tracking-[0.3em] text-xs uppercase mb-3">Real Reviews</p>
          <h1 className="font-serif text-5xl md:text-6xl mb-5">Customer Love</h1>
          <div className="flex items-center justify-center gap-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((n) => <Star key={n} size={22} className="fill-gold text-gold" />)}
            </div>
            <span className="text-xl"><strong className="text-gold">{avg}</strong> out of 5</span>
          </div>
          <p className="text-cream/70 mt-2 text-sm">Based on thousands of happy customers across 5 continents.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <div key={i} className="bg-white border border-gold/20 p-6 shadow-sm">
              <div className="flex mb-3">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star key={n} size={14} className={n <= t.rating ? 'fill-gold text-gold' : 'text-muted-foreground/30'} />
                ))}
              </div>
              <p className="text-sm text-noir leading-relaxed mb-5">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-gold/10">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-gold/40" />
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-gold">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
