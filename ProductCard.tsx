import { Link } from 'react-router-dom';
import { Star, ShoppingBag } from 'lucide-react';
import type { Product } from '@/lib/products';
import { useCart } from '@/lib/cart';
import { toast } from 'sonner';

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((s) => s.addItem);

  const onAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
    toast.success(`Added to cart`, { description: product.name });
  };

  return (
    <Link to={`/product/${product.id}`} className="group relative block bg-white">
      <div className="relative aspect-[4/5] overflow-hidden bg-cream">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.new && (
            <span className="bg-noir text-gold text-[10px] font-semibold px-2 py-1 tracking-wider">NEW</span>
          )}
          {product.originalPrice && (
            <span className="bg-gold text-noir text-[10px] font-bold px-2 py-1 tracking-wider">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          )}
        </div>
        <button
          onClick={onAdd}
          className="absolute bottom-0 left-0 right-0 bg-noir text-cream text-xs font-semibold tracking-widest py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-2 hover:bg-gold hover:text-noir"
        >
          <ShoppingBag size={14} /> ADD TO CART
        </button>
      </div>
      <div className="p-3 md:p-4">
        <p className="text-[10px] uppercase tracking-widest text-gold font-semibold mb-1">{product.brand}</p>
        <h3 className="text-sm font-medium text-noir line-clamp-2 min-h-[40px] group-hover:text-gold transition">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mt-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star
                key={n}
                size={12}
                className={n <= Math.round(product.rating) ? 'fill-gold text-gold' : 'text-muted-foreground/40'}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-base font-semibold text-noir">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
