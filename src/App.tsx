
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import PrescriptionUpload from "./pages/PrescriptionUpload";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Seller from "./pages/Seller";
import OrderTracking from "./pages/OrderTracking";
import Wishlist from "./pages/Wishlist";
import CustomerDashboard from "./pages/CustomerDashboard";
import LiveChat from "./components/ui/LiveChat";
import CategoryPage from "./pages/CategoryPage";
import OrderConfirmation from "./pages/OrderConfirmation";
import ScrollToTop from "./components/layout/ScrollToTop";
import BackToTop from "./components/ui/BackToTop";
import StoreLocator from "./pages/StoreLocator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/prescription" element={<PrescriptionUpload />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/seller" element={<Seller />} />
          <Route path="/order-tracking" element={<OrderTracking />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/account" element={<CustomerDashboard />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/store-locator" element={<StoreLocator />} />
          
          {/* Category routes - now use the CategoryPage component */}
          <Route path="/categories/:categoryId" element={<CategoryPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <LiveChat />
        <BackToTop />
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
