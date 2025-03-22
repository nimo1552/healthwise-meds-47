
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  X, 
  ArrowRight, 
  AlertCircle, 
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Sample cart data
const initialCartItems = [
  {
    id: 1,
    name: "Paracetamol 500mg Tablets",
    image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=400&auto=format&fit=crop",
    price: 9.99,
    quantity: 2,
    stock: 50,
    isPrescriptionRequired: false
  },
  {
    id: 3,
    name: "Amoxicillin 500mg Capsules",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=400&auto=format&fit=crop",
    price: 19.99,
    quantity: 1,
    stock: 20,
    isPrescriptionRequired: true
  }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 4.99;
  const tax = subtotal * 0.06; // 6% tax rate
  const discount = couponApplied ? couponDiscount : 0;
  const total = subtotal + shipping + tax - discount;
  
  const updateQuantity = (id: number, amount: number) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + amount;
          if (newQuantity < 1 || newQuantity > item.stock) return item;
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };
  
  const removeItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === "welcome10") {
      setCouponApplied(true);
      setCouponDiscount(subtotal * 0.1); // 10% discount
    } else {
      setCouponApplied(false);
      setCouponDiscount(0);
    }
  };
  
  const handleCheckout = () => {
    setIsProcessing(true);
    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false);
      // In a real app, redirect to checkout page or process payment
      console.log("Proceeding to checkout with total:", total);
    }, 1500);
  };
  
  const prescriptionRequired = cartItems.some(item => item.isPrescriptionRequired);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Header */}
        <section className="bg-nimocare-50/50 py-10 md:py-16">
          <div className="container-custom">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Your Cart</h1>
            <p className="text-lg text-gray-600">
              {cartItems.length > 0 
                ? `You have ${cartItems.length} item${cartItems.length !== 1 ? 's' : ''} in your cart.`
                : "Your cart is empty."}
            </p>
          </div>
        </section>
        
        {cartItems.length > 0 ? (
          <section className="py-10">
            <div className="container-custom">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-gray-100">
                      <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
                    </div>
                    
                    {/* Cart items list */}
                    <div>
                      {cartItems.map((item) => (
                        <div key={item.id} className="p-6 border-b border-gray-100 flex flex-col sm:flex-row items-start">
                          {/* Item image */}
                          <div className="w-full sm:w-24 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden mb-4 sm:mb-0 sm:mr-6">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          {/* Item details */}
                          <div className="flex-grow">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-gray-900 mb-1">
                                  <Link 
                                    to={`/product/${item.id}`}
                                    className="hover:text-nimocare-600 transition-colors"
                                  >
                                    {item.name}
                                  </Link>
                                </h3>
                                <p className="text-sm text-gray-600 mb-2">
                                  ${item.price.toFixed(2)} each
                                </p>
                                
                                {item.isPrescriptionRequired && (
                                  <div className="flex items-center text-xs text-amber-600 mb-3">
                                    <AlertCircle className="w-3 h-3 mr-1" />
                                    <span>Prescription required</span>
                                  </div>
                                )}
                              </div>
                              
                              <button 
                                onClick={() => removeItem(item.id)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                                aria-label="Remove item"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                            
                            {/* Quantity control and price */}
                            <div className="flex justify-between items-center mt-2">
                              <div className="flex items-center border border-gray-200 rounded-md">
                                <button 
                                  onClick={() => updateQuantity(item.id, -1)}
                                  disabled={item.quantity <= 1}
                                  className={cn(
                                    "p-1 transition-colors",
                                    item.quantity <= 1 
                                      ? "text-gray-300 cursor-not-allowed" 
                                      : "text-gray-600 hover:text-gray-900"
                                  )}
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                
                                <span className="px-3 py-1 text-sm">
                                  {item.quantity}
                                </span>
                                
                                <button 
                                  onClick={() => updateQuantity(item.id, 1)}
                                  disabled={item.quantity >= item.stock}
                                  className={cn(
                                    "p-1 transition-colors",
                                    item.quantity >= item.stock 
                                      ? "text-gray-300 cursor-not-allowed" 
                                      : "text-gray-600 hover:text-gray-900"
                                  )}
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                              
                              <span className="font-medium text-gray-900">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Continue shopping */}
                    <div className="p-6">
                      <Link 
                        to="/products" 
                        className="text-nimocare-600 hover:text-nimocare-700 text-sm font-medium flex items-center"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Continue Shopping
                      </Link>
                    </div>
                  </div>
                  
                  {/* Prescription warning */}
                  {prescriptionRequired && (
                    <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-6 flex">
                      <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-amber-800 font-medium mb-1">Prescription Required</p>
                        <p className="text-amber-700 text-sm mb-3">
                          One or more items in your cart require a valid prescription. Please upload your prescription before checkout.
                        </p>
                        <Link 
                          to="/prescription" 
                          className="bg-white text-amber-700 border border-amber-300 px-4 py-2 rounded-md text-sm font-medium hover:bg-amber-50 transition-colors inline-flex items-center"
                        >
                          Upload Prescription
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm sticky top-24">
                    <div className="p-6 border-b border-gray-100">
                      <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
                    </div>
                    
                    <div className="p-6">
                      {/* Coupon code */}
                      <div className="mb-6">
                        <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-2">
                          Apply Coupon Code
                        </label>
                        <div className="flex">
                          <input
                            type="text"
                            id="coupon"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            placeholder="Enter code"
                            className="flex-grow px-4 py-2 border border-gray-200 rounded-l-md focus:outline-none focus:ring-2 focus:ring-nimocare-200 focus:border-nimocare-400"
                          />
                          <button 
                            onClick={handleApplyCoupon}
                            className="bg-nimocare-600 text-white px-4 py-2 rounded-r-md hover:bg-nimocare-700 transition-colors"
                          >
                            Apply
                          </button>
                        </div>
                        
                        {couponApplied && (
                          <p className="text-sm text-green-600 mt-2 flex items-center">
                            <ShieldCheck className="w-4 h-4 mr-1" />
                            Coupon applied successfully!
                          </p>
                        )}
                        
                        {couponCode && !couponApplied && (
                          <p className="text-sm text-red-600 mt-2">
                            Invalid coupon code.
                          </p>
                        )}
                      </div>
                      
                      {/* Price breakdown */}
                      <div className="space-y-3 text-sm mb-6">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-gray-600">Shipping</span>
                          <span className="font-medium text-gray-900">
                            {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                          </span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tax</span>
                          <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
                        </div>
                        
                        {couponApplied && (
                          <div className="flex justify-between text-green-600">
                            <span>Discount</span>
                            <span>-${discount.toFixed(2)}</span>
                          </div>
                        )}
                        
                        <div className="border-t border-gray-100 pt-3 mt-3"></div>
                        
                        <div className="flex justify-between">
                          <span className="font-medium">Total</span>
                          <span className="font-bold text-lg">${total.toFixed(2)}</span>
                        </div>
                      </div>
                      
                      {/* Checkout button */}
                      <button 
                        onClick={handleCheckout}
                        disabled={isProcessing || prescriptionRequired}
                        className={cn(
                          "w-full py-3 rounded-md font-medium text-white flex items-center justify-center",
                          (isProcessing || prescriptionRequired)
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-nimocare-600 hover:bg-nimocare-700 transition-colors"
                        )}
                      >
                        {isProcessing ? (
                          <>
                            <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : prescriptionRequired ? (
                          "Upload Prescription to Checkout"
                        ) : (
                          <>
                            Proceed to Checkout
                            <ArrowRight className="w-5 h-5 ml-2" />
                          </>
                        )}
                      </button>
                      
                      {prescriptionRequired && (
                        <p className="text-xs text-amber-600 mt-2 text-center">
                          You need to upload a valid prescription before checkout.
                        </p>
                      )}
                      
                      {/* Security badges */}
                      <div className="mt-6">
                        <div className="flex items-center justify-center space-x-3 text-xs text-gray-500">
                          <ShieldCheck className="w-4 h-4" />
                          <span>Secure Checkout</span>
                          <span>|</span>
                          <span>SSL Encrypted</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="py-20">
            <div className="container-custom">
              <div className="text-center max-w-md mx-auto">
                <div className="bg-nimocare-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingCart className="w-10 h-10 text-nimocare-600" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Your Cart is Empty</h2>
                <p className="text-gray-600 mb-8">
                  Looks like you haven't added any items to your cart yet. Explore our products and find what you need.
                </p>
                
                <Link 
                  to="/products" 
                  className="btn-primary inline-flex items-center"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Browse Products
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
