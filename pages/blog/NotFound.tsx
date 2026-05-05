import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-32 text-center">
        <p className="text-gold tracking-[0.3em] text-xs uppercase mb-3">404</p>
        <h1 className="font-serif text-5xl md:text-6xl mb-5">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">Looks like this page went out of stock.</p>
        <Link to="/" className="gold-gradient text-noir px-8 py-3 font-semibold tracking-widest text-sm">BACK TO HOME</Link>
      </div>
      <Footer />
    </div>
  );
}
