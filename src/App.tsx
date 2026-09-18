import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Home } from '@/pages/Home';
import { About } from '@/pages/About';
import { DairyFarming } from '@/pages/DairyFarming';
import { Products } from '@/pages/Products';
import { Farm } from '@/pages/Farm';
import { Sustainability } from '@/pages/Sustainability';
import { Shop } from '@/pages/Shop';
import { ProductDetail } from '@/pages/ProductDetail';
import { Cart } from '@/pages/Cart';
import { Checkout } from '@/pages/Checkout';
import { OrderConfirmation } from '@/pages/OrderConfirmation';
import { Blog } from '@/pages/Blog';
import { BlogPost } from '@/pages/BlogPost';
import { Contact } from '@/pages/Contact';
import {
  PrivacyPolicy,
  Terms,
  ShippingDelivery,
  ReturnsRefunds,
} from '@/pages/Legal';
import { AdminLayout } from '@/pages/admin/AdminLayout';
import { AdminDashboard } from '@/pages/admin/AdminDashboard';
import { AdminLogin } from '@/pages/admin/AdminLogin';
import { AdminProducts } from '@/pages/admin/AdminProducts';
import { AdminOrders } from '@/pages/admin/AdminOrders';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="dairy-farming" element={<DairyFarming />} />
        <Route path="products" element={<Products />} />
        <Route path="farm" element={<Farm />} />
        <Route path="sustainability" element={<Sustainability />} />
        <Route path="shop" element={<Shop />} />
        <Route path="shop/:slug" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="order-confirmation/:orderId" element={<OrderConfirmation />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="shipping-delivery" element={<ShippingDelivery />} />
        <Route path="returns-refunds" element={<ReturnsRefunds />} />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
      </Route>
    </Routes>
  );
}
