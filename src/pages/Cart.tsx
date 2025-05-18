
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  ShoppingCart, 
  Trash, 
  ChevronRight, 
  TruckIcon, 
  ShieldCheck, 
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const navigate = useNavigate();
  
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };
  
  const handleRemoveFromCart = (productId: number) => {
    removeFromCart(productId);
  };
  
  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };
  
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setIsApplyingCoupon(true);
    
    setTimeout(() => {
      setIsApplyingCoupon(false);
      if (couponCode.toLowerCase() === 'discount10') {
        toast.success('Coupon applied: 10% discount');
      } else {
        toast.error('Invalid coupon code');
      }
    }, 1000);
  };
  
  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    setTimeout(() => {
      setIsCheckingOut(false);
      navigate('/payment');
    }, 800);
  };
  
  // Calculate cart summary values
  const shippingCost = cartTotal >= 50 ? 0 : 5.99;
  const discount = couponCode.toLowerCase() === 'discount10' ? cartTotal * 0.10 : 0;
  const taxRate = 0.08; // 8% tax
  const tax = (cartTotal - discount) * taxRate;
  const orderTotal = cartTotal + shippingCost + tax - discount;
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="container-custom py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Your Cart</h1>
            {cartItems.length > 0 && (
              <Button variant="ghost" onClick={handleClearCart} className="text-red-600 hover:text-red-700">
                <Trash className="w-4 h-4 mr-2" />
                Clear Cart
              </Button>
            )}
          </div>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <ShoppingCart className="w-20 h-20 mx-auto text-gray-300" />
              </motion.div>
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-2xl font-semibold mt-4"
              >
                Your cart is empty
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-gray-500 mt-2 mb-8"
              >
                Looks like you haven't added any products to your cart yet.
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Link to="/products" className="btn-primary">
                  Browse Products
                </Link>
              </motion.div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 border-b border-gray-200 last:border-b-0"
                    >
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded-md overflow-hidden">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-grow flex flex-col">
                          <div className="flex justify-between">
                            <Link 
                              to={`/product/${item.product.id}`}
                              className="text-lg font-medium text-gray-900 hover:text-nimocare-600 transition-colors"
                            >
                              {item.product.name}
                            </Link>
                            <button 
                              onClick={() => handleRemoveFromCart(item.product.id)}
                              className="text-gray-400 hover:text-red-600 transition-colors p-1"
                            >
                              <Trash className="w-4 h-4" />
                            </button>
                          </div>
                          
                          {item.product.isPrescriptionRequired && (
                            <span className="text-xs text-blue-600 bg-blue-50 rounded-full px-2 py-0.5 inline-block mb-2 w-fit">
                              Prescription Required
                            </span>
                          )}
                          
                          <div className="mt-auto flex flex-wrap items-end justify-between">
                            <div className="flex items-center mt-2">
                              <button 
                                className="w-8 h-8 border border-gray-300 rounded-l-lg flex items-center justify-center text-gray-700 hover:bg-gray-100"
                                onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                              >
                                -
                              </button>
                              <input 
                                type="number" 
                                min="1" 
                                value={item.quantity} 
                                onChange={(e) => handleQuantityChange(item.product.id, parseInt(e.target.value) || 1)}
                                className="w-12 h-8 border-t border-b border-gray-300 text-center focus:outline-none"
                              />
                              <button 
                                className="w-8 h-8 border border-gray-300 rounded-r-lg flex items-center justify-center text-gray-700 hover:bg-gray-100"
                                onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                              >
                                +
                              </button>
                            </div>
                            
                            <div className="mt-2">
                              <span className="text-lg font-semibold">${(item.product.price * item.quantity).toFixed(2)}</span>
                              {item.product.oldPrice && (
                                <span className="ml-2 text-sm text-gray-400 line-through">
                                  ${(item.product.oldPrice * item.quantity).toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-6">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                      <span className="font-medium">${cartTotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">
                        {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                      </span>
                    </div>
                    
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount (10%)</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-3 flex justify-between">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-lg font-semibold">${orderTotal.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  {/* Coupon Code */}
                  <div className="mt-6">
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input 
                        type="text"
                        placeholder="Coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-grow px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-nimocare-500"
                      />
                      <Button 
                        type="submit"
                        variant="outline"
                        disabled={isApplyingCoupon || !couponCode}
                      >
                        {isApplyingCoupon ? 'Applying...' : 'Apply'}
                      </Button>
                    </form>
                  </div>
                  
                  {/* Checkout Button */}
                  <Button 
                    className="w-full mt-6 bg-nimocare-600 hover:bg-nimocare-700 text-white"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? 'Processing...' : 'Checkout'}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                  
                  {/* Trust Badges */}
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <TruckIcon className="w-4 h-4 mr-2 text-green-600" />
                      <span>Free shipping on orders over $50</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <ShieldCheck className="w-4 h-4 mr-2 text-green-600" />
                      <span>Secure checkout</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-green-600" />
                      <span>24/7 customer support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
