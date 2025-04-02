
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import CategoryPage from "./pages/CategoryPage";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Payment from "./pages/Payment";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderTracking from "./pages/OrderTracking";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomerDashboard from "./pages/CustomerDashboard";
import PrescriptionUpload from "./pages/PrescriptionUpload";
import StoreLocator from "./pages/StoreLocator";
import NotFound from "./pages/NotFound";
import { PageTransition } from "./components/ui/PageTransition";
import ScrollToTop from "./components/layout/ScrollToTop";
import { ThemeProvider } from "./components/theme-provider";
import AdminAI from "./pages/AdminAI";
import Seller from "./pages/Seller";
import SystemOptimization from "./pages/SystemOptimization";
import UserManagement from "./pages/UserManagement";
import { runGarbageCollection } from "./utils/garbageCollection";
import LiveChat from "./components/ui/LiveChat";
import PerformanceMonitor from "./components/performance/PerformanceMonitor"; 
import { throttle } from "./utils/performanceUtils";

function App() {
  const [theme, setTheme] = React.useState(localStorage.getItem("theme") || "light");

  React.useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Set up periodic garbage collection with improved throttling
  React.useEffect(() => {
    // Use throttled function for garbage collection to prevent excessive runs
    const throttledGC = throttle(() => {
      console.log("Running garbage collection...");
      runGarbageCollection();
    }, 10 * 60 * 1000); // Run at most once every 10 minutes instead of 5
    
    // Run garbage collection every 10 minutes (increased from 5 minutes)
    const gcInterval = setInterval(throttledGC, 10 * 60 * 1000);
    
    // Throttled visibility change handler
    const handleVisibilityChange = throttle(() => {
      if (document.visibilityState === 'visible') {
        console.log("Running garbage collection on visibility change...");
        runGarbageCollection();
      }
    }, 60 * 1000); // At most once per minute
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Clean up on unmount
    return () => {
      clearInterval(gcInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-react-theme">
      <Router>
        <ScrollToTop />
        <PageTransition>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/order-tracking" element={<OrderTracking />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<CustomerDashboard />} />
            <Route path="/prescription-upload" element={<PrescriptionUpload />} />
            <Route path="/store-locator" element={<StoreLocator />} />
            <Route path="/admin-ai" element={<AdminAI />} />
            <Route path="/seller" element={<Seller />} />
            <Route path="/system" element={<SystemOptimization />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
        <LiveChat />
        <PerformanceMonitor />
      </Router>
    </ThemeProvider>
  );
}

export default App;
