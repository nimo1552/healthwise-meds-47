
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
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

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Set up periodic garbage collection
  useEffect(() => {
    // Run garbage collection every 5 minutes
    const gcInterval = setInterval(() => {
      runGarbageCollection();
    }, 5 * 60 * 1000);
    
    // Run garbage collection when the app becomes visible again
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        runGarbageCollection();
      }
    };
    
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
      </Router>
    </ThemeProvider>
  );
}

export default App;
