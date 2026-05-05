import { useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Minus, Plus, Truck, ShieldCheck, RotateCcw, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getProducts, getProductById } from '@/lib/products';
import { useCart } from '@/lib/cart';
import { toast } from 'sonner';

export default function ProductDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const product = id ? getProductById(id) : undefined;
  const addItem = useCart((s) => s.addItem);

  const [qty, setQty] = useState(1);
  const [variant, setVariant] = useState<string | undefined>(product?.variants?.[0]);
  const [activeImg, setActiveImg] = useState(0);

  const related = useMemo(() => {
    if (!product) return [];
    return getProducts()
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-3xl mx-auto px-4 py-24 text-center">
          <h1 className="font-serif text-3xl mb-4">Product not found</h1>
          <Link to="/shop" className="text-gold underline">Back to shop</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  const onAdd = () => {
    addItem(product, qty, variant);
    toast.success('Added to cart', { description: `${product.name} x${qty}` });
  };
  const buyNow = () => {
    addItem(product, qty, variant);
    nav('/cart');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="text-xs text-muted-foreground mb-6">
          <Link to="/" className="hover:text-gold">Home</Link> / <Link to="/shop" className="hover:text-gold">Shop</Link> /{' '}
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-gold">{product.category}</Link> /{' '}
          <span className="text-noir">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div className="aspect-square bg-cream overflow-hidden mb-4">
              <img src={images[activeImg]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((im, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-20 h-20 bg-cream overflow-hidden border-2 ${activeImg === i ? 'border-gold' : 'border-transparent'}`}
                  >
                    <img src={im} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="text-gold tracking-[0.3em] text-xs uppercase mb-2">{product.brand}</p>
            <h1 className="font-serif text-3xl md:text-4xl text-noir mb-3">{product.name}</h1>
            <div className="flex items-center gap-2 mb-5">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star key={n} size={16} className={n <= Math.round(product.rating) ? 'fill-gold text-gold' : 'text-muted-foreground/40'} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.rating} ({product.reviews} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-semibold text-noir">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
                  <span className="bg-gold text-noir text-xs font-bold px-2 py-1">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-6">{product.description}</p>

            {product.variants && product.variants.length > 0 && (
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest mb-3">
                  {product.category === 'Fragrance' || product.category === 'Skincare' ? 'Size' : 'Shade / Option'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v}
                      onClick={() => setVariant(v)}
                      className={`px-4 py-2 border text-sm ${variant === v ? 'border-gold bg-noir text-cream' : 'border-noir/20 hover:border-gold'}`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3">Quantity</p>
              <div className="inline-flex items-center border border-noir/20">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 hover:bg-cream"><Minus size={14} /></button>
                <span className="px-6 text-sm font-medium">{qty}</span>
                <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="p-3 hover:bg-cream"><Plus size={14} /></button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {product.stock > 10 ? 'In stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of stock'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={onAdd}
                className="flex-1 border-2 border-noir text-noir py-4 font-semibold tracking-widest text-sm hover:bg-noir hover:text-cream transition"
              >
                ADD TO CART
              </button>
              <button
                onClick={buyNow}
                className="flex-1 gold-gradient text-noir py-4 font-semibold tracking-widest text-sm hover:opacity-90 transition"
              >
                BUY NOW
              </button>
            </div>

            <div className="space-y-3 border-t border-gold/20 pt-6">
              <div className="flex items-center gap-3 text-sm">
                <Truck size={18} className="text-gold" /> Free worldwide shipping over $75
              </div>
              <div className="flex items-center gap-3 text-sm">
                <ShieldCheck size={18} className="text-gold" /> Secure WhatsApp order confirmation
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RotateCcw size={18} className="text-gold" /> 30-day return policy
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <div className="flex items-end justify-between mb-8">
              <h2 className="font-serif text-2xl md:text-3xl">You May Also Love</h2>
              <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="text-sm text-gold flex items-center gap-1 hover:underline">
                View More <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
