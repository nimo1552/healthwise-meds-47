
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/prescription" element={<PrescriptionUpload />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/seller" element={<Seller />} />
          <Route path="/order-tracking" element={<OrderTracking />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/account" element={<CustomerDashboard />} />
          
          {/* Category routes - now use the CategoryPage component */}
          <Route path="/categories/:categoryId" element={<CategoryPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <LiveChat />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
