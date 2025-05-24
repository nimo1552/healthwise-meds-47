
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state;

  useEffect(() => {
    // Redirect to cart if no order data
    if (!orderData) {
      navigate('/cart');
    }
  }, [orderData, navigate]);

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      // Clear cart and navigate to order confirmation with the order data
      navigate('/order-confirmation', { state: orderData });
    }, 1000);
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
            <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
            <p className="text-gray-600 mb-6">This is a demo payment page. Click the button below to complete your order.</p>
            
            <Button 
              onClick={handlePayment}
              className="w-full bg-nimocare-600 hover:bg-nimocare-700 text-white"
            >
              Complete Payment
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Payment;
