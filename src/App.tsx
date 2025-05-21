
import React, { useEffect } from "react";
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
import { ProductProvider } from "./contexts/ProductContext";
import { CartProvider } from "./contexts/CartContext";

function App() {
  // Set up an enhanced garbage collection system that excludes products data
  useEffect(() => {
    // Define collection strategies based on different scenarios
    const strategies = {
      // Regular interval collection - less frequent for better performance
      regular: throttle(() => {
        console.log("Running regular garbage collection...");
        runGarbageCollection(15 * 60 * 1000, ['pharmacy-products']); // Exclude products data
      }, 15 * 60 * 1000), // Run at most once every 15 minutes
      
      // Collection when tab becomes visible again after being hidden
      onVisibilityChange: throttle(() => {
        if (document.visibilityState === 'visible') {
          console.log("Running garbage collection on visibility change...");
          runGarbageCollection(10 * 60 * 1000, ['pharmacy-products']); // Exclude products data
        }
      }, 2 * 60 * 1000), // At most once per 2 minutes
      
      // Collection on low memory conditions (Chrome only)
      onLowMemory: () => {
        console.log("Running urgent garbage collection due to low memory...");
        runGarbageCollection(5 * 60 * 1000, ['pharmacy-products']); // Exclude products data
      },
      
      // Collection when the user has been idle
      onUserIdle: throttle(() => {
        console.log("Running garbage collection during user idle time...");
        runGarbageCollection(8 * 60 * 1000, ['pharmacy-products']); // Exclude products data
      }, 5 * 60 * 1000), // At most once every 5 minutes
    };
    
    // Set up regular interval garbage collection
    const gcInterval = setInterval(strategies.regular, 15 * 60 * 1000);
    
    // Set up visibility change handler
    document.addEventListener('visibilitychange', strategies.onVisibilityChange);
    
    // Set up idle detection for garbage collection during user inactivity
    let idleTimeout: number;
    const resetIdleTimer = throttle(() => {
      window.clearTimeout(idleTimeout);
      idleTimeout = window.setTimeout(strategies.onUserIdle, 2 * 60 * 1000); // 2 minutes of inactivity
    }, 10000); // Throttle to every 10 seconds to avoid performance impact
    
    // Listen for user activity to reset idle timer
    window.addEventListener('mousemove', resetIdleTimer);
    window.addEventListener('keypress', resetIdleTimer);
    window.addEventListener('scroll', resetIdleTimer);
    window.addEventListener('touchstart', resetIdleTimer);
    
    // Start the idle timer
    resetIdleTimer();
    
    // Listen for low memory conditions in Chrome
    if ('onlowmemory' in window) {
      (window as any).addEventListener('lowmemory', strategies.onLowMemory);
    } else {
      // Fallback for browsers that don't support onlowmemory
      // Run an additional collection every 30 minutes
      const fallbackInterval = setInterval(() => {
        strategies.onLowMemory();
      }, 30 * 60 * 1000);
      
      // Clean up fallback interval
      return () => clearInterval(fallbackInterval);
    }
    
    // Clean up all event listeners and intervals on unmount
    return () => {
      clearInterval(gcInterval);
      document.removeEventListener('visibilitychange', strategies.onVisibilityChange);
      window.removeEventListener('mousemove', resetIdleTimer);
      window.removeEventListener('keypress', resetIdleTimer);
      window.removeEventListener('scroll', resetIdleTimer);
      window.removeEventListener('touchstart', resetIdleTimer);
      window.clearTimeout(idleTimeout);
      
      if ('onlowmemory' in window) {
        (window as any).removeEventListener('lowmemory', strategies.onLowMemory);
      }
    };
  }, []);

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-react-theme" attribute="class">
      <ProductProvider>
        <CartProvider>
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
        </CartProvider>
      </ProductProvider>
    </ThemeProvider>
  );
}

export default App;
