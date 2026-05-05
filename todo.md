# Luxe Noir — Women's Beauty E-commerce MVP

## Design System

**References**: Charlotte Tilbury, Pat McGrath Labs, Fenty Beauty, Sephora
**Theme**: Luxurious Gold & Black

**Color Palette**:
- Primary Black: `#0a0a0a` (deep rich black)
- Secondary Black: `#1a1a1a`
- Accent Gold: `#c9a961` (warm gold)
- Light Gold: `#e6c878`
- Cream: `#f5f0e6`
- Off-white: `#faf8f5`
- Muted text: `#8a8a8a`

**Typography**:
- Headings: `Playfair Display` (serif, elegant)
- Body: `Inter` (sans-serif, clean)

**Key Components**:
- Sticky header with gold underline on hover
- Category mega-menu on desktop, slide-in drawer on mobile
- Product cards with hover zoom + gold "Add to Cart" reveal
- Gold accent borders, subtle gradients, soft shadows
- Framer-motion fade/slide animations

## Images to Generate

1. `hero-banner.jpg` — Luxurious black & gold beauty hero: elegant woman silhouette with golden skincare bottles, dark moody lighting, cinematic
2. `category-skincare.jpg` — Luxury skincare products arranged on black marble with gold accents
3. `category-makeup.jpg` — Premium makeup palette and lipsticks on black velvet with gold lighting
4. `category-fragrance.jpg` — Elegant perfume bottles with golden caps on dark reflective surface
5. `about-banner.jpg` — Beauty atelier interior with black walls and gold fixtures, luxurious feel

## File Structure

- `src/index.css` — Global theme, gold/black palette, fonts
- `src/App.tsx` — Router with all routes
- `src/lib/products.ts` — 200+ seed product data + localStorage CSV import logic
- `src/lib/cart.ts` — Zustand cart store with persistence
- `src/lib/order.ts` — Order store for post-checkout payment page
- `src/components/Header.tsx` — Sticky header, mega-menu, mobile drawer, cart badge
- `src/components/Footer.tsx` — Footer with policies, newsletter
- `src/components/ProductCard.tsx` — Product card component
- `src/pages/Index.tsx` — Homepage (hero, categories, bestsellers, testimonials, newsletter)
- `src/pages/Shop.tsx` — Product catalog with filters/search
- `src/pages/ProductDetail.tsx` — Single product page
- `src/pages/Cart.tsx` — Cart page
- `src/pages/Checkout.tsx` — Customer info form → creates order → redirects to /payment
- `src/pages/Payment.tsx` — Private payment instructions (IBAN + US Bank) + WhatsApp CTA
- `src/pages/Testimonials.tsx` — Full testimonials page
- `src/pages/Admin.tsx` — CSV bulk upload admin page
- `src/pages/Policies.tsx` — Reusable page for policy content (Shipping/Returns/Privacy/Terms/FAQ/About/Contact)

## Development Tasks

- [x] Use high-quality Unsplash beauty imagery (ImageCreator not available)
- [x] Set up theme (colors, fonts) in index.css
- [x] Create product seed data (200+ products across 8 categories)
- [x] Build Zustand cart + order stores with localStorage
- [x] Build Header with working mega-menu + mobile drawer
- [x] Build Footer with policy links + newsletter
- [x] Build homepage (hero, categories, bestsellers, testimonials)
- [x] Build Shop page with filters + search
- [x] Build ProductDetail page
- [x] Build Cart page
- [x] Build Checkout page with customer info form
- [x] Build Payment page (private, post-order) with IBAN + US Bank + WhatsApp CTA
- [x] Build Admin CSV upload page
- [x] Build all static Policies pages (About, Contact, Shipping, Returns, Privacy, Terms, FAQ)
- [x] Build Testimonials page
- [x] Wire up routing in App.tsx
- [x] Run pnpm lint + build, both passed
- [x] CheckUI validation (image model error, skipped — build verified clean)
