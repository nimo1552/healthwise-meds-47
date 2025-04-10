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

function App() {
  useEffect(() => {
    const strategies = {
      regular: throttle(() => {
        console.log("Running regular garbage collection...");
        runGarbageCollection(15 * 60 * 1000);
      }, 15 * 60 * 1000),
      onVisibilityChange: throttle(() => {
        if (document.visibilityState === 'visible') {
          console.log("Running garbage collection on visibility change...");
          runGarbageCollection(10 * 60 * 1000);
        }
      }, 2 * 60 * 1000),
      onLowMemory: () => {
        console.log("Running urgent garbage collection due to low memory...");
        runGarbageCollection(5 * 60 * 1000);
      },
      onUserIdle: throttle(() => {
        console.log("Running garbage collection during user idle time...");
        runGarbageCollection(8 * 60 * 1000);
      }, 5 * 60 * 1000),
    };
    
    const gcInterval = setInterval(strategies.regular, 15 * 60 * 1000);
    document.addEventListener('visibilitychange', strategies.onVisibilityChange);
    
    let idleTimeout: number;
    const resetIdleTimer = throttle(() => {
      window.clearTimeout(idleTimeout);
      idleTimeout = window.setTimeout(strategies.onUserIdle, 2 * 60 * 1000);
    }, 10000);
    
    window.addEventListener('mousemove', resetIdleTimer);
    window.addEventListener('keypress', resetIdleTimer);
    window.addEventListener('scroll', resetIdleTimer);
    window.addEventListener('touchstart', resetIdleTimer);
    
    resetIdleTimer();
    
    if ('onlowmemory' in window) {
      (window as any).addEventListener('lowmemory', strategies.onLowMemory);
    } else {
      const fallbackInterval = setInterval(() => {
        strategies.onLowMemory();
      }, 30 * 60 * 1000);
      
      return () => clearInterval(fallbackInterval);
    }
    
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
    <ThemeProvider defaultTheme="light" storageKey="nimocare-theme" attribute="class">
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
