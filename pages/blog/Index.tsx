import { useState } from "react";

const categories = [
  { id:"skincare", name:"Skincare", emoji:"💧", count:"8,400+" },
  { id:"makeup",   name:"Makeup",   emoji:"💄", count:"9,200+" },
  { id:"haircare", name:"Haircare", emoji:"✨", count:"5,100+" },
  { id:"nails",    name:"Nails",    emoji:"💅", count:"3,800+" },
  { id:"wellness", name:"Wellness", emoji:"🌿", count:"4,200+" },
  { id:"tools",    name:"Beauty Tools", emoji:"🔧", count:"3,600+" },
  { id:"fragrance",name:"Fragrance",emoji:"🌸", count:"2,900+" },
  { id:"sets",     name:"Gift Sets",emoji:"🎁", count:"2,800+" },
];

const products = [
  { id:1, name:"Hyaluronic Acid Serum 2%", brand:"PureSkin", emoji:"💧", cat:"skincare", price:14.99, oldPrice:28.00, rating:4.9, reviews:3421, badge:"hot", supplier:"CJDropshipping", desc:"Deeply hydrating serum. Plumps skin and reduces fine lines." },
  { id:2, name:"Vitamin C Brightening Cream", brand:"GlowLab", emoji:"🍊", cat:"skincare", price:11.50, oldPrice:22.00, rating:4.8, reviews:2104, badge:"new", supplier:"AliExpress", desc:"Brightening cream with Vitamin C. Fades dark spots overnight." },
  { id:3, name:"Collagen Face Masks (10 pack)", brand:"KoreanGlow", emoji:"🫧", cat:"skincare", price:9.99, oldPrice:18.00, rating:4.9, reviews:5823, badge:"hot", supplier:"Beauty Joint", desc:"Professional collagen sheet masks. Korean beauty formula." },
  { id:4, name:"Matte Liquid Lipstick Set (12)", brand:"LushLip", emoji:"💋", cat:"makeup", price:19.99, oldPrice:42.00, rating:4.8, reviews:6201, badge:"hot", supplier:"CJDropshipping", desc:"12 gorgeous matte shades lasting up to 16 hours." },
  { id:5, name:"4D Mascara — Volumising", brand:"LashQueen", emoji:"👁️", cat:"makeup", price:7.50, oldPrice:15.00, rating:4.9, reviews:8921, badge:"hot", supplier:"AliExpress", desc:"Dramatic lash effect. Waterproof and smudge-proof." },
  { id:6, name:"18-Colour Eyeshadow Palette", brand:"ColorPlay", emoji:"🎨", cat:"makeup", price:16.99, oldPrice:35.00, rating:4.8, reviews:4503, badge:"sale", supplier:"CJDropshipping", desc:"18 pigmented shades — mattes, shimmers, and glitters." },
  { id:7, name:"Argan Oil Hair Serum 100ml", brand:"SilkHair", emoji:"🌿", cat:"haircare", price:11.99, oldPrice:22.00, rating:4.8, reviews:3912, badge:null, supplier:"Spocket", desc:"Moroccan argan oil for frizz control, shine, and heat protection." },
  { id:8, name:"Biotin Hair Growth Shampoo", brand:"ThickRoots", emoji:"🧴", cat:"haircare", price:12.99, oldPrice:24.00, rating:4.6, reviews:5201, badge:"new", supplier:"CJDropshipping", desc:"Strengthening shampoo with biotin and castor oil." },
  { id:9, name:"Gel Nail Polish Set (20 colours)", brand:"NailGlam", emoji:"💅", cat:"nails", price:22.99, oldPrice:48.00, rating:4.9, reviews:7821, badge:"hot", supplier:"AliExpress", desc:"Professional LED/UV gel polish. Long-lasting, chip-resistant." },
  { id:10, name:"Press-On Nails Luxury Set", brand:"InstaNail", emoji:"🌸", cat:"nails", price:8.99, oldPrice:16.00, rating:4.7, reviews:5612, badge:"new", supplier:"CJDropshipping", desc:"24-piece luxury press-on nails. Lasts 2 weeks." },
  { id:11, name:"Jade Roller & Gua Sha Set", brand:"ZenBeauty", emoji:"💚", cat:"wellness", price:14.99, oldPrice:30.00, rating:4.8, reviews:6401, badge:"hot", supplier:"Syncee", desc:"Reduces puffiness and aids lymphatic drainage." },
  { id:12, name:"Bath Bomb Set (12 pcs)", brand:"BubbleLux", emoji:"🛁", cat:"wellness", price:16.99, oldPrice:32.00, rating:4.9, reviews:8102, badge:"new", supplier:"AliExpress", desc:"Luxury bath bombs with essential oils and shea butter." },
  { id:13, name:"Facial Cleansing Brush Electric", brand:"CleanSkin Pro", emoji:"🔧", cat:"tools", price:19.99, oldPrice:44.00, rating:4.8, reviews:5812, badge:"sale", supplier:"CJDropshipping", desc:"360° sonic brush. Removes 99% of dirt and makeup." },
  { id:14, name:"LED Face Mask — 7 Light Modes", brand:"GlowTech", emoji:"💡", cat:"tools", price:29.99, oldPrice:65.00, rating:4.7, reviews:3204, badge:"hot", supplier:"AppScenic", desc:"Professional LED therapy for anti-aging and acne." },
  { id:15, name:"Rose & Oud Perfume 50ml", brand:"ArabiQue", emoji:"🌹", cat:"fragrance", price:21.99, oldPrice:48.00, rating:4.9, reviews:3801, badge:"hot", supplier:"FragranceNet", desc:"Luxury oriental fragrance. Lasts 12 hours." },
  { id:16, name:"Ultimate Skincare Starter Kit", brand:"Luxenoir Beauty", emoji:"🎁", cat:"sets", price:34.99, oldPrice:72.00, rating:4.9, reviews:9201, badge:"hot", supplier:"CJDropshipping", desc:"Complete 6-piece skincare set. Perfect starter routine." },
];

const reviews = [
  { name:"Amara O.", location:"Lagos, Nigeria 🇳🇬", initials:"AO", text:"Arrived in 2 weeks. WhatsApp confirmation was so helpful. Will reorder!", stars:5, product:"Skincare Kit", color:"#C9526B", bg:"#F5E0E5" },
  { name:"Sophie M.", location:"London, UK 🇬🇧", initials:"SM", text:"Better than store products at 4x the price. Incredible quality for the cost!", stars:5, product:"Hyaluronic Serum", color:"#3A8A5C", bg:"#D8F0E3" },
  { name:"Priya K.", location:"Mumbai, India 🇮🇳", initials:"PK", text:"Shopping here for 6 months. Best prices online. The jade roller is amazing!", stars:5, product:"Jade Roller Set", color:"#8B2D44", bg:"#F5E0E5" },
  { name:"Fatou D.", location:"Dakar, Senegal 🇸🇳", initials:"FD", text:"Smooth ordering process. WhatsApp confirmation was reassuring. Love it!", stars:5, product:"Gel Nail Polish", color:"#C9A84C", bg:"#F7EDD3" },
  { name:"Emma L.", location:"Toronto, Canada 🇨🇦", initials:"EL", text:"Mascara is a genuine dupe for high-end brands. Ordered 3 more!", stars:5, product:"4D Mascara", color:"#534AB7", bg:"#EEEDFE" },
  { name:"Yuki T.", location:"Tokyo, Japan 🇯🇵", initials:"YT", text:"Quick delivery. Bath bombs smell incredible and skin feels so soft!", stars:5, product:"Bath Bomb Set", color:"#185FA5", bg:"#E6F1FB" },
];

type Product = typeof products[0];

export default function Index() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activePolicy, setActivePolicy] = useState("returns");
  const [cart, setCart] = useState<(Product & { qty: number })[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  const filtered = activeFilter === "all" ? products
    : activeFilter === "sale" ? products.filter(p => p.badge === "sale")
    : products.filter(p => p.cat === activeFilter);

  function addToCart(product: Product) {
    setCart(prev => {
      const ex = prev.find(x => x.id === product.id);
      if (ex) return prev.map(x => x.id === product.id ? { ...x, qty: x.qty + 1 } : x);
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`✅ "${product.name}" added to cart!`);
  }

  function changeQty(id: number, delta: number) {
    setCart(prev => prev.map(x => x.id === id ? { ...x, qty: x.qty + delta } : x).filter(x => x.qty > 0));
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  function checkoutWhatsapp() {
    const total = cart.reduce((s, x) => s + x.price * x.qty, 0);
    const items = cart.map(x => `• ${x.name} x${x.qty} = $${(x.price * x.qty).toFixed(2)}`).join("\n");
    const msg = encodeURIComponent(`🛒 *New Luxenoir Beauty Order*\n\n${items}\n\n💰 *Total: $${total.toFixed(2)}*\n\nPlease confirm and send payment details. Thank you!`);
    window.open(`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || "15551234567"}?text=${msg}`, "_blank");
  }

  const cartTotal = cart.reduce((s, x) => s + x.qty, 0);
  const cartValue = cart.reduce((s, x) => s + x.price * x.qty, 0);

  const policies: Record<string, { title: string; content: JSX.Element }> = {
    returns: {
      title: "Returns & Refunds Policy",
      content: (
        <div className="space-y-4 text-sm text-[#4A3540] leading-relaxed">
          <p><strong className="text-[#1A1015]">30-Day Return Window:</strong> We accept returns within 30 days of delivery. Items must be unused and in original packaging.</p>
          <p><strong className="text-[#1A1015]">How to return:</strong> Contact us on WhatsApp with your order number. We respond within 24 hours.</p>
          <p><strong className="text-[#1A1015]">Refunds:</strong> Processed within 5–10 business days. WhatsApp confirmation sent when issued.</p>
          <p><strong className="text-[#1A1015]">Non-returnable:</strong> Opened skincare/makeup (hygiene), gift cards, final sale items.</p>
          <p><strong className="text-[#1A1015]">Wrong or damaged items:</strong> Contact us within 48 hours with photos. We send a free replacement or full refund.</p>
        </div>
      )
    },
    shipping: {
      title: "Shipping Policy",
      content: (
        <div className="space-y-4 text-sm text-[#4A3540] leading-relaxed">
          <p><strong className="text-[#1A1015]">Processing:</strong> 1–3 business days. Tracking sent via WhatsApp once shipped.</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>North America (USA, Canada): 5–10 business days</li>
            <li>Europe (UK, EU): 7–14 business days</li>
            <li>Asia & Middle East: 8–15 business days</li>
            <li>Africa: 10–21 business days</li>
          </ul>
          <p><strong className="text-[#1A1015]">Rates:</strong> $4.99 standard · Free over $49 · $12.99 express (select regions)</p>
          <p><strong className="text-[#1A1015]">Customs:</strong> International buyers may be subject to import duties — buyer's responsibility.</p>
        </div>
      )
    },
    privacy: {
      title: "Privacy Policy",
      content: (
        <div className="space-y-4 text-sm text-[#4A3540] leading-relaxed">
          <p>We collect name, email, shipping address, and phone number (WhatsApp) to process and fulfil your orders.</p>
          <p><strong className="text-[#1A1015]">We never:</strong> store full card details, sell your data, or share your WhatsApp number with third parties.</p>
          <p><strong className="text-[#1A1015]">WhatsApp:</strong> By ordering, you consent to receive order and shipping updates via WhatsApp.</p>
          <p>We use SSL encryption and are PCI-DSS compliant. You may request deletion of your data at any time.</p>
        </div>
      )
    },
    terms: {
      title: "Terms of Service",
      content: (
        <div className="space-y-4 text-sm text-[#4A3540] leading-relaxed">
          <p>You must be 18+ to purchase. By buying, you confirm legal age in your region.</p>
          <p><strong className="text-[#1A1015]">Cancellations:</strong> Within 12 hours of ordering via WhatsApp. Once shipped, cannot be cancelled.</p>
          <p><strong className="text-[#1A1015]">Pricing:</strong> All prices in USD. We reserve the right to update prices. Your order locks at checkout price.</p>
          <p>Our liability is limited to the purchase price paid. We are not liable for indirect damages.</p>
        </div>
      )
    },
    payment: {
      title: "Payment Policy",
      content: (
        <div className="space-y-4 text-sm text-[#4A3540] leading-relaxed">
          <p><strong className="text-[#1A1015]">Accepted:</strong> Virtual debit/credit cards, Visa, Mastercard. All secured with SSL encryption.</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Add items to cart and proceed to checkout</li>
            <li>Your order is sent to us via WhatsApp</li>
            <li>We send a secure payment link for your card</li>
            <li>Once paid, your order is processed and shipped</li>
            <li>Tracking sent via WhatsApp</li>
          </ol>
          <p>We never store full card numbers. All payments go through our encrypted gateway.</p>
        </div>
      )
    }
  };

  return (
    <div className="font-sans">

      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-[#1A1015] via-[#3D1525] to-[#6B2040] min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(201,82,107,0.25),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
          <div>
            <h1 className="font-serif text-5xl md:text-7xl font-light text-white leading-tight mb-6">
              Your World of <em className="text-[#C9A84C] not-italic font-light">Affordable Beauty</em>
            </h1>
            <p className="text-white/70 text-base leading-relaxed mb-8 max-w-md">
              Shop 40,000+ women's beauty products sourced from the world's top-ranked suppliers. Delivered to 180+ countries across America, Europe, Asia, and Africa.
            </p>
            <div className="flex gap-4 flex-wrap">
              <button onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-[#C9526B] hover:bg-white hover:text-[#8B2D44] text-white px-8 py-3 rounded-full text-sm font-medium transition-all">
                Shop Now
              </button>
              <button onClick={() => document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" })}
                className="border border-white/40 hover:border-[#C9A84C] text-white/85 hover:text-[#C9A84C] px-8 py-3 rounded-full text-sm transition-all">
                Browse Categories
              </button>
            </div>
            <div className="grid grid-cols-3 mt-12 border border-white/10 rounded-2xl overflow-hidden">
              {[["40K+","Products"],["180+","Countries"],["4.8★","Avg Rating"]].map(([val,lbl]) => (
                <div key={lbl} className="bg-white/5 backdrop-blur-sm py-5 text-center">
                  <strong className="block font-serif text-2xl text-[#C9A84C]">{val}</strong>
                  <span className="text-xs text-white/60">{lbl}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden md:grid grid-cols-2 gap-3 transform -rotate-3">
            {[["💄","Lip Gloss Set","$8.99"],["🌿","Serum Bundle","$14.50"],["💅","Nail Kit Pro","$11.99"],["✨","Glow Palette","$19.99"]].map(([e,n,p],i) => (
              <div key={n} className={`bg-white/8 border border-white/15 rounded-2xl p-5 text-center backdrop-blur-sm ${i===1||i===3?"translate-y-4":""}`}>
                <span className="text-4xl block mb-2">{e}</span>
                <div className="text-xs text-white/80 font-medium">{n}</div>
                <div className="text-sm text-[#C9A84C] font-semibold mt-1">{p}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <div className="bg-white border-y border-[#EAD8DC] py-5 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-4">
          {[["🚚","Free Worldwide Shipping","Orders over $49"],["🔒","Secure Payment","Virtual card accepted"],["💬","WhatsApp Confirmation","Every order confirmed"],["↩️","30-Day Returns","Hassle-free policy"],["🌍","Global Sourcing","Top worldwide suppliers"]].map(([icon,title,sub]) => (
            <div key={title} className="flex items-center gap-3 flex-1 min-w-[160px]">
              <div className="w-10 h-10 bg-[#F5E0E5] rounded-xl flex items-center justify-center text-lg flex-shrink-0">{icon}</div>
              <div>
                <div className="text-sm font-semibold text-[#4A3540]">{title}</div>
                <div className="text-xs text-[#9A7E87]">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CATEGORIES ── */}
      <section id="categories" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-[#C9526B] font-semibold">Browse by Category</span>
            <h2 className="font-serif text-4xl font-light text-[#1A1015] mt-2">Everything She Needs</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {categories.map(c => (
              <button key={c.id} onClick={() => { setActiveFilter(c.id); document.getElementById("products")?.scrollIntoView({ behavior:"smooth" }); }}
                className="bg-white border border-[#EAD8DC] rounded-2xl p-4 text-center hover:border-[#C9526B] hover:shadow-md hover:-translate-y-1 transition-all">
                <span className="text-3xl block mb-2">{c.emoji}</span>
                <span className="text-xs font-medium text-[#4A3540] block">{c.name}</span>
                <span className="text-[10px] text-[#9A7E87] mt-1 block">{c.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section id="products" className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-[#C9526B] font-semibold">Featured Products</span>
            <h2 className="font-serif text-4xl font-light text-[#1A1015] mt-2">Bestsellers & New Arrivals</h2>
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap gap-2 mb-8">
            {["all","skincare","makeup","haircare","nails","wellness","tools","sale"].map(f => (
              <button key={f} onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${activeFilter === f ? "bg-[#C9526B] text-white border-[#C9526B]" : "bg-white text-[#4A3540] border-[#EAD8DC] hover:border-[#C9526B]"}`}>
                {f === "all" ? "All" : f === "sale" ? "🔥 Sale" : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(p => (
              <div key={p.id} onClick={() => setModalProduct(p)}
                className="bg-white border border-[#EAD8DC] rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-lg hover:border-[#C9526B] transition-all cursor-pointer relative">
                {p.badge && (
                  <span className={`absolute top-3 left-3 text-white text-[10px] font-bold px-2 py-1 rounded-full z-10 ${p.badge === "hot" ? "bg-orange-500" : p.badge === "new" ? "bg-[#C9A84C]" : "bg-[#C9526B]"}`}>
                    {p.badge === "hot" ? "🔥 HOT" : p.badge === "new" ? "✨ NEW" : "🏷️ SALE"}
                  </span>
                )}
                <div className="bg-[#FDF8F4] h-36 flex items-center justify-center text-6xl">{p.emoji}</div>
                <div className="p-3">
                  <div className="text-[10px] text-[#9A7E87] uppercase tracking-wider mb-1">{p.brand}</div>
                  <div className="text-sm font-medium text-[#1A1015] leading-tight mb-2 line-clamp-2">{p.name}</div>
                  <div className="text-[11px] text-[#C9A84C] mb-2">{"★".repeat(Math.floor(p.rating))} <span className="text-[#9A7E87]">({p.reviews.toLocaleString()})</span></div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#8B2D44] text-sm">${p.price.toFixed(2)}</span>
                      <span className="text-[11px] text-[#9A7E87] line-through ml-1">${p.oldPrice.toFixed(2)}</span>
                    </div>
                    <button onClick={e => { e.stopPropagation(); addToCart(p); }}
                      className="bg-[#C9526B] hover:bg-[#8B2D44] text-white text-[11px] font-medium px-3 py-1.5 rounded-full transition-all">
                      + Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SHIPPING ── */}
      <section id="shipping" className="py-16 px-6 bg-[#FDF8F4]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-[#C9526B] font-semibold">Global Delivery</span>
            <h2 className="font-serif text-4xl font-light text-[#1A1015] mt-2">We Ship to 180+ Countries</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { flag:"🌎", region:"North America", time:"5–10 business days", countries:["USA","Canada","Mexico"] },
              { flag:"🌍", region:"Europe", time:"7–14 business days", countries:["UK","Germany","France","Italy","Spain","+30 more"] },
              { flag:"🌏", region:"Asia & Middle East", time:"8–15 business days", countries:["UAE","India","Japan","Singapore","+40 more"] },
              { flag:"🌍", region:"Africa", time:"10–21 business days", countries:["Nigeria","South Africa","Kenya","Ghana","Egypt","+40 more"] },
            ].map(r => (
              <div key={r.region} className="bg-white border border-[#EAD8DC] rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{r.flag}</span>
                  <div>
                    <div className="font-semibold text-sm text-[#1A1015]">{r.region}</div>
                    <div className="text-xs text-[#9A7E87]">{r.time}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {r.countries.map(c => (
                    <span key={c} className="bg-[#F5E0E5] text-[#8B2D44] text-[11px] px-2 py-0.5 rounded-full font-medium">{c}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="testimonials" className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-[#C9526B] font-semibold">Customer Reviews</span>
            <h2 className="font-serif text-4xl font-light text-[#1A1015] mt-2">Women Around the World Love Us</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map(r => (
              <div key={r.name} className="bg-[#FDF8F4] border border-[#EAD8DC] rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0"
                    style={{ background: r.bg, color: r.color }}>{r.initials}</div>
                  <div>
                    <div className="text-sm font-semibold text-[#1A1015]">{r.name}</div>
                    <div className="text-xs text-[#9A7E87]">{r.location}</div>
                  </div>
                </div>
                <div className="text-[#C9A84C] text-sm mb-2">{"★".repeat(r.stars)}</div>
                <p className="text-sm text-[#4A3540] italic leading-relaxed">"{r.text}"</p>
                <div className="text-xs text-[#C9526B] font-medium mt-3">Purchased: {r.product}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POLICIES ── */}
      <section id="policies" className="py-16 px-6 bg-[#FDF8F4]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-[#C9526B] font-semibold">Store Policies</span>
            <h2 className="font-serif text-4xl font-light text-[#1A1015] mt-2">Transparent & Fair</h2>
          </div>
          <div className="flex flex-wrap gap-2 border-b border-[#EAD8DC] mb-8">
            {Object.entries(policies).map(([key, pol]) => (
              <button key={key} onClick={() => setActivePolicy(key)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-all ${activePolicy === key ? "text-[#C9526B] border-[#C9526B]" : "text-[#9A7E87] border-transparent hover:text-[#4A3540]"}`}>
                {pol.title.replace(" Policy","").replace(" of Service","")}
              </button>
            ))}
          </div>
          <div className="bg-white border border-[#EAD8DC] rounded-2xl p-8">
            <h3 className="font-serif text-2xl text-[#1A1015] mb-5">{policies[activePolicy].title}</h3>
            {policies[activePolicy].content}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="bg-gradient-to-br from-[#1A1015] to-[#3D1525] py-16 px-6 text-center">
        <h2 className="font-serif text-4xl font-light text-white mb-3">Get Beauty Deals First</h2>
        <p className="text-white/65 mb-8">Join 85,000+ women subscribed to exclusive offers and new arrivals.</p>
        <div className="flex gap-3 max-w-md mx-auto flex-wrap justify-center">
          <input type="email" placeholder="Enter your email address"
            className="flex-1 min-w-[220px] px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 outline-none text-sm" />
          <button className="bg-[#C9526B] hover:bg-[#8B2D44] text-white px-6 py-3 rounded-full text-sm font-medium transition-all">Subscribe</button>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-[#C9526B] font-semibold">Get in Touch</span>
            <h2 className="font-serif text-4xl font-light text-[#1A1015] mt-2">We're Always Here</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon:"💬", title:"WhatsApp Support", sub:"Order confirmations & enquiries", action: () => window.open("https://wa.me/15551234567","_blank"), btnText:"Chat Now", btnClass:"bg-[#25D366] text-white" },
              { icon:"📧", title:"Email Us", sub:"Reply within 24 hours", action: () => window.open("mailto:hello@luxenoirbeauty.com"), btnText:"Send Email", btnClass:"bg-[#F5E0E5] text-[#8B2D44]" },
              { icon:"📸", title:"Follow Us", sub:"Beauty tips & new arrivals", action: () => {}, btnText:"Instagram", btnClass:"bg-[#F5E0E5] text-[#8B2D44]" },
            ].map(c => (
              <div key={c.title} className="bg-[#FDF8F4] border border-[#EAD8DC] rounded-2xl p-6 text-center">
                <div className="text-3xl mb-3">{c.icon}</div>
                <h4 className="font-semibold text-sm mb-1">{c.title}</h4>
                <p className="text-xs text-[#9A7E87] mb-4">{c.sub}</p>
                <button onClick={c.action} className={`${c.btnClass} text-xs font-semibold px-5 py-2 rounded-full transition-all hover:opacity-90`}>{c.btnText}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CART SIDEBAR ── */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setCartOpen(false)}>
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="p-5 border-b border-[#EAD8DC] flex items-center justify-between">
              <h3 className="font-semibold text-lg">🛒 Cart ({cartTotal})</h3>
              <button onClick={() => setCartOpen(false)} className="w-8 h-8 rounded-full border border-[#EAD8DC] flex items-center justify-center hover:bg-[#F5E0E5]">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              {cart.length === 0 ? (
                <div className="text-center py-16 text-[#9A7E87]">
                  <div className="text-5xl mb-3">🛍️</div>
                  <p>Your cart is empty</p>
                </div>
              ) : cart.map(item => (
                <div key={item.id} className="flex gap-3 py-4 border-b border-[#EAD8DC]">
                  <div className="w-16 h-16 bg-[#FDF8F4] rounded-xl flex items-center justify-center text-3xl flex-shrink-0">{item.emoji}</div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{item.name}</div>
                    <div className="text-sm font-bold text-[#8B2D44] mt-1">${(item.price * item.qty).toFixed(2)}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => changeQty(item.id,-1)} className="w-6 h-6 rounded-full border border-[#EAD8DC] flex items-center justify-center text-sm hover:bg-[#F5E0E5]">−</button>
                      <span className="text-sm font-medium w-5 text-center">{item.qty}</span>
                      <button onClick={() => changeQty(item.id,1)} className="w-6 h-6 rounded-full border border-[#EAD8DC] flex items-center justify-center text-sm hover:bg-[#F5E0E5]">+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <div className="p-5 border-t border-[#EAD8DC]">
                <div className="flex justify-between font-semibold mb-4">
                  <span>Total</span>
                  <span className="text-[#8B2D44]">${cartValue.toFixed(2)}</span>
                </div>
                <button onClick={checkoutWhatsapp}
                  className="w-full bg-[#25D366] hover:bg-[#128C4A] text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all">
                  💬 Confirm via WhatsApp
                </button>
                <p className="text-center text-xs text-[#9A7E87] mt-3">🔒 Secure virtual card payment accepted</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Cart button floating */}
      <button onClick={() => setCartOpen(true)}
        className="fixed bottom-6 right-6 bg-[#C9526B] hover:bg-[#8B2D44] text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-xl transition-all z-40">
        🛒
        {cartTotal > 0 && (
          <span className="absolute -top-1 -right-1 bg-white text-[#C9526B] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {cartTotal}
          </span>
        )}
      </button>

      {/* ── PRODUCT MODAL ── */}
      {modalProduct && (
        <div className="fixed inset-0 z-50 bg-black/65 flex items-center justify-center p-4" onClick={() => setModalProduct(null)}>
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2" onClick={e => e.stopPropagation()}>
            <div className="bg-[#FDF8F4] flex items-center justify-center text-[100px] min-h-[200px]">{modalProduct.emoji}</div>
            <div className="p-7 relative">
              <button onClick={() => setModalProduct(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full border border-[#EAD8DC] flex items-center justify-center text-sm hover:bg-[#F5E0E5]">✕</button>
              <div className="text-xs text-[#9A7E87] uppercase tracking-wider mb-1">{modalProduct.brand}</div>
              <h3 className="font-serif text-2xl text-[#1A1015] mb-3">{modalProduct.name}</h3>
              <div className="text-[#C9A84C] mb-1">{"★".repeat(Math.floor(modalProduct.rating))} <span className="text-sm text-[#9A7E87]">({modalProduct.reviews.toLocaleString()} reviews)</span></div>
              <div className="text-2xl font-bold text-[#8B2D44] mb-1">${modalProduct.price.toFixed(2)}</div>
              <div className="text-sm text-[#9A7E87] line-through mb-4">${modalProduct.oldPrice.toFixed(2)}</div>
              <p className="text-sm text-[#4A3540] leading-relaxed mb-4">{modalProduct.desc}</p>
              <div className="text-xs text-[#9A7E87] mb-1">Sourced from</div>
              <span className="inline-block bg-[#F5E0E5] text-[#8B2D44] text-xs px-3 py-1 rounded-full font-medium mb-5">📦 {modalProduct.supplier}</span>
              <div className="flex flex-col gap-2">
                <button onClick={() => { addToCart(modalProduct); setModalProduct(null); }}
                  className="bg-[#C9526B] hover:bg-[#8B2D44] text-white py-3 rounded-xl font-semibold transition-all">Add to Cart</button>
                <button onClick={() => { const msg = encodeURIComponent(`🌸 I'd like to order: *${modalProduct.name}*\n💰 Price: $${modalProduct.price.toFixed(2)}\n\nPlease confirm and send payment details!`); window.open(`https://wa.me/15551234567?text=${msg}`,"_blank"); }}
                  className="bg-[#25D366] hover:bg-[#128C4A] text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all">
                  💬 Buy via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TOAST ── */}
      {toast && (
        <div className="fixed bottom-24 right-6 z-50 bg-[#1A1015] text-white text-sm px-4 py-3 rounded-xl shadow-xl max-w-xs animate-in slide-in-from-bottom-4">
          {toast}
        </div>
      )}
    </div>
  );
}
