
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/ui/PageTransition";
import { lazy, Suspense } from "react";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import ScrollToTop from "./components/layout/ScrollToTop";
import BackToTop from "./components/ui/BackToTop";
import LiveChat from "./components/ui/LiveChat";

// Eager load the Index page for faster initial load
import Index from "./pages/Index";

// Lazy load other pages to improve initial load time
const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Cart = lazy(() => import("./pages/Cart"));
const Payment = lazy(() => import("./pages/Payment"));
const PrescriptionUpload = lazy(() => import("./pages/PrescriptionUpload"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Seller = lazy(() => import("./pages/Seller"));
const OrderTracking = lazy(() => import("./pages/OrderTracking"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const CustomerDashboard = lazy(() => import("./pages/CustomerDashboard"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const OrderConfirmation = lazy(() => import("./pages/OrderConfirmation"));
const StoreLocator = lazy(() => import("./pages/StoreLocator"));

// Configure React Query with performance settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Loading fallback for lazy-loaded components
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <LoadingSpinner size="lg" text="Loading page" />
  </div>
);

// Wrapper component for AnimatePresence
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        
        <Route path="/products" element={
          <PageTransition>
            <Suspense fallback={<PageLoader />}>
              <Products />
            </Suspense>
          </PageTransition>
        } />
        
        <Route path="/product/:id" element={
          <PageTransition>
            <Suspense fallback={<PageLoader />}>
              <ProductDetail />
            </Suspense>
          </PageTransition>
        } />
        
        <Route path="/cart" element={
          <PageTransition>
            <Suspense fallback={<PageLoader />}>
              <Cart />
            </Suspense>
          </PageTransition>
        } />
        
        <Route path="/payment" element={
          <PageTransition>
            <Suspense fallback={<PageLoader />}>
              <Payment />
            </Suspense>
          </PageTransition>
        } />
        
        <Route path="/prescription" element={
          <PageTransition>
            <Suspense fallback={<PageLoader />}>
              <PrescriptionUpload />
            </Suspense>
          </PageTransition>
        } />
        
        <Route path="/login" element={
          <PageTransition>
            <Suspense fallback={<PageLoader />}>
              <Login />
            </Suspense>
          </PageTransition>
        } />
        
        <Route path="/register" element={
          <PageTransition>
            <Suspense fallback={<PageLoader />}>
              <Register />
            </Suspense>
          </PageTransition>
        } />
        
        <Route path="/seller" element={
          <PageTransition>
            <Suspense fallback={<PageLoader />}>
              <Seller />
            </Suspense>
          </PageTransition>
        } />
        
        <Route path="/order-tracking" element={
          <PageTransition>
            <Suspense fallback={<PageLoader />}>
              <OrderTracking />
            </Suspense>
          </PageTransition>
        } />
        
        <Route path="/wishlist" element={
          <PageTransition>
            <Suspense fallback={<PageLoader />}>
              <Wishlist />
            </Suspense>
          </PageTransition>
        } />
        
        <Route path="/account" element={
          <PageTransition>
            <Suspense fallback={<PageLoader />}>
              <CustomerDashboard />
            </Suspense>
          </PageTransition>
        } />
        
        <Route path="/order-confirmation" element={
          <PageTransition>
            <Suspense fallback={<PageLoader />}>
              <OrderConfirmation />
            </Suspense>
          </PageTransition>
        } />
        
        <Route path="/store-locator" element={
          <PageTransition>
            <Suspense fallback={<PageLoader />}>
              <StoreLocator />
            </Suspense>
          </PageTransition>
        } />
        
        <Route path="/categories/:categoryId" element={
          <PageTransition>
            <Suspense fallback={<PageLoader />}>
              <CategoryPage />
            </Suspense>
          </PageTransition>
        } />
        
        <Route path="*" element={
          <PageTransition>
            <Suspense fallback={<PageLoader />}>
              <NotFound />
            </Suspense>
          </PageTransition>
        } />
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
