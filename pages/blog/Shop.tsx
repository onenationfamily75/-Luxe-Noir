import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getProducts, CATEGORIES, type Category } from '@/lib/products';

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const urlCategory = params.get('category') as Category | null;
  const urlQuery = params.get('q') || '';
  const sort = params.get('sort') || 'relevance';

  const [selectedCats, setSelectedCats] = useState<Category[]>(urlCategory ? [urlCategory] : []);
  const [priceMax, setPriceMax] = useState(200);
  const [minRating, setMinRating] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const allProducts = getProducts();

  const filtered = useMemo(() => {
    let list = allProducts.slice();
    if (selectedCats.length > 0) list = list.filter((p) => selectedCats.includes(p.category));
    if (urlQuery) {
      const q = urlQuery.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
    }
    list = list.filter((p) => p.price <= priceMax);
    list = list.filter((p) => p.rating >= minRating);

    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    else if (sort === 'bestseller') list.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0));

    return list;
  }, [allProducts, selectedCats, urlQuery, priceMax, minRating, sort]);

  const toggleCat = (c: Category) => {
    setSelectedCats((prev) => {
      const next = prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c];
      const np = new URLSearchParams(params);
      if (next.length === 1) np.set('category', next[0]);
      else np.delete('category');
      setParams(np, { replace: true });
      return next;
    });
  };

  const updateSort = (v: string) => {
    const np = new URLSearchParams(params);
    np.set('sort', v);
    setParams(np, { replace: true });
  };

  const clearAll = () => {
    setSelectedCats([]);
    setPriceMax(200);
    setMinRating(0);
    setParams({}, { replace: true });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="bg-cream py-10 border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold tracking-[0.3em] text-xs uppercase mb-2">Collection</p>
          <h1 className="font-serif text-4xl md:text-5xl text-noir">
            {urlQuery ? `Results for "${urlQuery}"` : urlCategory || 'All Products'}
          </h1>
          <p className="text-sm text-muted-foreground mt-2">{filtered.length} products</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6 md:hidden">
          <button onClick={() => setFiltersOpen(true)} className="flex items-center gap-2 border border-noir px-4 py-2 text-sm">
            <SlidersHorizontal size={16} /> Filters
          </button>
          <select value={sort} onChange={(e) => updateSort(e.target.value)} className="border border-noir px-3 py-2 text-sm bg-white">
            <option value="relevance">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="bestseller">Bestsellers</option>
          </select>
        </div>

        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <FilterContent
              selectedCats={selectedCats}
              toggleCat={toggleCat}
              priceMax={priceMax}
              setPriceMax={setPriceMax}
              minRating={minRating}
              setMinRating={setMinRating}
              clearAll={clearAll}
            />
          </aside>

          {/* Products */}
          <main className="flex-1">
            <div className="hidden md:flex items-center justify-end mb-6">
              <select value={sort} onChange={(e) => updateSort(e.target.value)} className="border border-noir px-3 py-2 text-sm bg-white">
                <option value="relevance">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="bestseller">Bestsellers</option>
              </select>
            </div>
            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <p className="font-serif text-2xl text-noir mb-3">No products found</p>
                <p className="text-muted-foreground mb-5">Try adjusting your filters.</p>
                <button onClick={clearAll} className="gold-gradient text-noir px-6 py-3 font-semibold text-sm">Clear Filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setFiltersOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gold/20">
              <h3 className="font-serif text-xl">Filters</h3>
              <button onClick={() => setFiltersOpen(false)} aria-label="Close"><X size={22} /></button>
            </div>
            <div className="p-5">
              <FilterContent
                selectedCats={selectedCats}
                toggleCat={toggleCat}
                priceMax={priceMax}
                setPriceMax={setPriceMax}
                minRating={minRating}
                setMinRating={setMinRating}
                clearAll={clearAll}
              />
              <button onClick={() => setFiltersOpen(false)} className="w-full mt-6 bg-noir text-cream py-3 font-semibold text-sm tracking-widest">APPLY FILTERS</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

function FilterContent(props: {
  selectedCats: Category[];
  toggleCat: (c: Category) => void;
  priceMax: number;
  setPriceMax: (n: number) => void;
  minRating: number;
  setMinRating: (n: number) => void;
  clearAll: () => void;
}) {
  const { selectedCats, toggleCat, priceMax, setPriceMax, minRating, setMinRating, clearAll } = props;
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-lg">Filters</h3>
        <button onClick={clearAll} className="text-xs text-gold hover:underline">Clear all</button>
      </div>

      <div className="mb-6">
        <h4 className="text-xs font-semibold uppercase tracking-widest mb-3">Category</h4>
        <div className="space-y-2">
          {CATEGORIES.map((c) => (
            <label key={c} className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="checkbox"
                checked={selectedCats.includes(c)}
                onChange={() => toggleCat(c)}
                className="accent-[#c9a961]"
              />
              {c}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-xs font-semibold uppercase tracking-widest mb-3">Max Price: ${priceMax}</h4>
        <input
          type="range"
          min="5"
          max="200"
          step="5"
          value={priceMax}
          onChange={(e) => setPriceMax(parseInt(e.target.value))}
          className="w-full accent-[#c9a961]"
        />
      </div>

      <div className="mb-6">
        <h4 className="text-xs font-semibold uppercase tracking-widest mb-3">Min Rating</h4>
        <div className="space-y-2">
          {[0, 3, 4, 4.5].map((r) => (
            <label key={r} className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="radio"
                name="rating"
                checked={minRating === r}
                onChange={() => setMinRating(r)}
                className="accent-[#c9a961]"
              />
              {r === 0 ? 'All' : `${r}+ stars`}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
