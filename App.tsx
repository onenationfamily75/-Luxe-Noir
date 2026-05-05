import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Index from './pages/Index';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import TestimonialsPage from './pages/Testimonials';
import Admin from './pages/Admin';
import Policies from './pages/Policies';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/about" element={<Policies type="about" />} />
        <Route path="/contact" element={<Policies type="contact" />} />
        <Route path="/shipping" element={<Policies type="shipping" />} />
        <Route path="/returns" element={<Policies type="returns" />} />
        <Route path="/privacy" element={<Policies type="privacy" />} />
        <Route path="/terms" element={<Policies type="terms" />} />
        <Route path="/faq" element={<Policies type="faq" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
