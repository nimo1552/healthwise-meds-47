
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { CreditCard, Lock } from 'lucide-react';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state;
  const { clearCart } = useCart();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  useEffect(() => {
    // Redirect to cart if no order data
    if (!orderData) {
      navigate('/cart');
    }
  }, [orderData, navigate]);

  const handlePayment = () => {
    if (paymentCompleted) {
      // Payment already completed, go to confirmation
      clearCart();
      navigate('/order-confirmation', { state: orderData });
      return;
    }

    setIsProcessingPayment(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentCompleted(true);
      toast.success('Payment processed successfully!');
    }, 2000);
  };

  const proceedToConfirmation = () => {
    if (!paymentCompleted) {
      toast.error('Please complete payment first');
      return;
    }
    
    // Clear cart and navigate to order confirmation
    clearCart();
    navigate('/order-confirmation', { state: orderData });
  };

  if (!orderData) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-16">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Payment</h1>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${orderData.orderSubtotal?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{orderData.orderShipping === 0 ? 'Free' : `$${orderData.orderShipping?.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${orderData.orderTax?.toFixed(2)}</span>
              </div>
              {orderData.orderDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-${orderData.orderDiscount?.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>Total</span>
                <span>${orderData.orderTotal?.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Lock className="w-5 h-5 mr-2 text-green-600" />
              Secure Payment
            </h2>
            
            {!paymentCompleted ? (
              <>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <CreditCard className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-blue-800 font-medium">Demo Payment Mode</span>
                  </div>
                  <p className="text-blue-600 text-sm mt-1">
                    This is a demonstration. Click "Process Payment" to simulate payment processing.
                  </p>
                </div>
                
                <Button 
                  onClick={handlePayment}
                  disabled={isProcessingPayment}
                  className="w-full bg-nimocare-600 hover:bg-nimocare-700 text-white"
                >
                  {isProcessingPayment ? 'Processing Payment...' : 'Process Payment'}
                </Button>
              </>
            ) : (
              <>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center mr-2">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-green-800 font-medium">Payment Successful</span>
                  </div>
                  <p className="text-green-600 text-sm mt-1">
                    Your payment has been processed successfully.
                  </p>
                </div>
                
                <Button 
                  onClick={proceedToConfirmation}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  View Order Confirmation
                </Button>
              </>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Payment;
