import { useRef, useState } from 'react';
import { Upload, Download, RotateCcw, CheckCircle2, AlertTriangle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CSV_TEMPLATE, getProducts, parseCsvToProducts, resetProducts, saveProducts } from '@/lib/products';
import { toast } from 'sonner';

export default function Admin() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<{ count: number; sample: { name: string; price: number; category: string }[] } | null>(null);
  const [error, setError] = useState('');
  const [totalProducts, setTotalProducts] = useState(getProducts().length);

  const handleFile = async (file: File) => {
    setError('');
    setPreview(null);
    try {
      const text = await file.text();
      const parsed = parseCsvToProducts(text);
      if (parsed.length === 0) throw new Error('No valid rows found in CSV');
      saveProducts(parsed);
      setTotalProducts(parsed.length);
      setPreview({
        count: parsed.length,
        sample: parsed.slice(0, 5).map((p) => ({ name: p.name, price: p.price, category: p.category })),
      });
      toast.success(`Imported ${parsed.length} products`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Failed to parse CSV';
      setError(msg);
      toast.error(msg);
    }
  };

  const onReset = () => {
    resetProducts();
    setTotalProducts(getProducts().length);
    setPreview(null);
    toast.success('Reset to demo products');
  };

  const downloadTemplate = () => {
    const blob = new Blob([CSV_TEMPLATE], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'luxe_noir_products_template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-gold tracking-[0.3em] text-xs uppercase mb-3">Administration</p>
        <h1 className="font-serif text-4xl md:text-5xl text-noir mb-3">Product Manager</h1>
        <p className="text-muted-foreground mb-10">
          Bulk import your products from any supplier using a CSV file. Compatible with CJ Dropshipping, Spocket, AliExpress, DSers exports, and custom spreadsheets.
        </p>

        <div className="bg-cream border border-gold/30 p-6 mb-8">
          <p className="text-sm">
            Currently showing <strong className="text-gold">{totalProducts}</strong> products in your shop.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          <button
            onClick={downloadTemplate}
            className="border-2 border-noir p-6 text-left hover:border-gold hover:bg-cream transition"
          >
            <Download className="text-gold mb-3" size={22} />
            <p className="font-serif text-lg mb-1">Download CSV Template</p>
            <p className="text-xs text-muted-foreground">Get the official template with all required columns.</p>
          </button>

          <button
            onClick={onReset}
            className="border-2 border-noir p-6 text-left hover:border-gold hover:bg-cream transition"
          >
            <RotateCcw className="text-gold mb-3" size={22} />
            <p className="font-serif text-lg mb-1">Reset to Demo Products</p>
            <p className="text-xs text-muted-foreground">Restore the default 200+ curated beauty products.</p>
          </button>
        </div>

        <div className="border-2 border-dashed border-gold/40 p-10 text-center bg-white">
          <Upload className="mx-auto text-gold mb-4" size={36} />
          <h2 className="font-serif text-2xl mb-2">Upload Product CSV</h2>
          <p className="text-sm text-muted-foreground mb-5">
            Required columns: <code className="bg-cream px-1">name, category, price, image, description, stock</code>
            <br />Optional: <code className="bg-cream px-1">brand, originalPrice, rating, reviews</code>
          </p>
          <input
            ref={fileRef}
            type="file"
            accept=".csv,text/csv"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
          <button
            onClick={() => fileRef.current?.click()}
            className="gold-gradient text-noir px-8 py-3 font-semibold tracking-widest text-sm hover:opacity-90"
          >
            SELECT CSV FILE
          </button>
          <p className="text-xs text-muted-foreground mt-4">
            Categories must be one of: Skincare, Makeup, Haircare, Fragrance, Body Care, Nails, Tools & Accessories, Wellness.
          </p>
        </div>

        {error && (
          <div className="mt-6 bg-destructive/10 border border-destructive text-destructive p-4 flex gap-3">
            <AlertTriangle size={18} className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">Upload failed</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {preview && (
          <div className="mt-6 bg-gold/10 border border-gold p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="text-gold" size={20} />
              <p className="font-serif text-lg">Imported {preview.count} products</p>
            </div>
            <div className="text-sm">
              <p className="mb-2 font-semibold">Sample preview:</p>
              <ul className="space-y-1">
                {preview.sample.map((s, i) => (
                  <li key={i} className="flex justify-between border-b border-gold/20 py-1">
                    <span>{s.name} <em className="text-muted-foreground">· {s.category}</em></span>
                    <span className="font-semibold">${s.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
