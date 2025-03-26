
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  X, 
  ArrowRight, 
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

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
    isPrescriptionRequired: false
  }
];

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
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
      toast({
        title: "Coupon Applied",
        description: "10% discount has been applied to your order.",
        variant: "default"
      });
    } else {
      setCouponApplied(false);
      setCouponDiscount(0);
      toast({
        title: "Invalid Coupon",
        description: "The coupon code you entered is not valid.",
        variant: "destructive"
      });
    }
  };
  
  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      navigate("/payment", { 
        state: { 
          orderDetails: {
            items: cartItems,
            total: total,
            discount: discount,
            shipping: shipping,
            tax: tax,
            subtotal: subtotal
          }
        } 
      });
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
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
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-gray-100">
                      <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
                    </div>
                    
                    <div>
                      {cartItems.map((item) => (
                        <div key={item.id} className="p-6 border-b border-gray-100 flex flex-col sm:flex-row items-start">
                          <div className="w-full sm:w-24 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden mb-4 sm:mb-0 sm:mr-6">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
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
                              </div>
                              
                              <button 
                                onClick={() => removeItem(item.id)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                                aria-label="Remove item"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                            
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
                </div>
                
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm sticky top-24">
                    <div className="p-6 border-b border-gray-100">
                      <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
                    </div>
                    
                    <div className="p-6">
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
                      
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="font-medium">${subtotal.toFixed(2)}</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-gray-600">Shipping</span>
                          <span className="font-medium">
                            {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                          </span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tax</span>
                          <span className="font-medium">${tax.toFixed(2)}</span>
                        </div>
                        
                        {discount > 0 && (
                          <div className="flex justify-between text-green-600">
                            <span>Discount</span>
                            <span className="font-medium">-${discount.toFixed(2)}</span>
                          </div>
                        )}
                        
                        <div className="border-t border-gray-100 pt-4 flex justify-between">
                          <span className="font-bold text-gray-900">Total</span>
                          <span className="font-bold text-gray-900">${total.toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={handleCheckout}
                        disabled={cartItems.length === 0 || isProcessing}
                        className="w-full mt-6 bg-nimocare-600 hover:bg-nimocare-700 text-white py-3 rounded-md font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                      >
                        {isProcessing ? (
                          <>
                            <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            Proceed to Checkout
                            <ArrowRight className="w-5 h-5 ml-2" />
                          </>
                        )}
                      </button>
                      
                      <div className="mt-6 text-center text-sm text-gray-500">
                        <p className="mb-2">Secure checkout</p>
                        <p>Free shipping on orders over $50</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="py-16">
            <div className="container-custom text-center">
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm p-10 max-w-lg mx-auto">
                <div className="mb-6 flex justify-center">
                  <ShoppingCart className="w-16 h-16 text-gray-300" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
                <p className="text-gray-600 mb-8">
                  Looks like you haven't added any products to your cart yet.
                </p>
                <Link 
                  to="/products" 
                  className="bg-nimocare-600 text-white px-6 py-3 rounded-md font-medium hover:bg-nimocare-700 transition-colors inline-flex items-center"
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
