
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/ui/PageTransition";
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Wrapper component for AnimatePresence
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/products" element={<PageTransition><Products /></PageTransition>} />
        <Route path="/product/:id" element={<PageTransition><ProductDetail /></PageTransition>} />
        <Route path="/cart" element={<PageTransition><Cart /></PageTransition>} />
        <Route path="/payment" element={<PageTransition><Payment /></PageTransition>} />
        <Route path="/prescription" element={<PageTransition><PrescriptionUpload /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
        <Route path="/seller" element={<PageTransition><Seller /></PageTransition>} />
        <Route path="/order-tracking" element={<PageTransition><OrderTracking /></PageTransition>} />
        <Route path="/wishlist" element={<PageTransition><Wishlist /></PageTransition>} />
        <Route path="/account" element={<PageTransition><CustomerDashboard /></PageTransition>} />
        <Route path="/order-confirmation" element={<PageTransition><OrderConfirmation /></PageTransition>} />
        <Route path="/store-locator" element={<PageTransition><StoreLocator /></PageTransition>} />
        
        {/* Category routes - now use the CategoryPage component */}
        <Route path="/categories/:categoryId" element={<PageTransition><CategoryPage /></PageTransition>} />
        
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ScrollToTop />
        <AnimatedRoutes />
        <LiveChat />
        <BackToTop />
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
