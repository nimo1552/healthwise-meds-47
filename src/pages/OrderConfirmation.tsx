
import { useEffect, useState } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { sendOrderConfirmationEmail } from '@/utils/emailService';
import { CheckCircle, Package, ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface ShippingAddress {
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface OrderDetails {
  orderId: string;
  date: string;
  total: number;
  paymentMethod: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  estimatedDelivery: string;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
}

const OrderConfirmation = () => {
  const location = useLocation();
  const { toast } = useToast();
  const { clearCart } = useCart();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  
  useEffect(() => {
    // Only process if we have order data in location state
    if (location.state && location.state.orderItems) {
      // Extract all order information from location state
      const {
        orderItems,
        orderTotal,
        orderSubtotal,
        orderShipping,
        orderTax,
        orderDiscount = 0,
        customerInfo,
        paymentMethod,
        customerEmail
      } = location.state;

      // Generate a proper order ID with timestamp
      const timestamp = new Date().getTime().toString().slice(-6);
      const orderId = `ORD-${timestamp}`;
      
      // Set delivery date to 5-7 days from now
      const currentDate = new Date();
      const deliveryDate = new Date(currentDate);
      deliveryDate.setDate(deliveryDate.getDate() + 5 + Math.floor(Math.random() * 3));
      
      // Format payment method display
      const paymentDisplay = paymentMethod 
        ? (paymentMethod === "Credit Card" ? "Credit Card (ending in 4242)" : paymentMethod)
        : "Credit Card (ending in 4242)";
      
      // Process order items to ensure they have all needed properties
      const formattedItems = Array.isArray(orderItems) ? orderItems.map(item => ({
        ...item,
        image: item.image || "/placeholder.svg"
      })) : [];
      
      // Create the order details object
      const newOrderDetails: OrderDetails = {
        orderId,
        date: currentDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric"
        }),
        total: orderTotal || 0,
        subtotal: orderSubtotal || 0,
        shipping: orderShipping || 0,
        tax: orderTax || 0,
        discount: orderDiscount || 0,
        paymentMethod: paymentDisplay,
        items: formattedItems,
        shippingAddress: customerInfo || {
          name: "Please provide shipping information",
          street: "---",
          city: "---",
          state: "---",
          zipCode: "---",
          country: "---"
        },
        estimatedDelivery: deliveryDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric"
        })
      };
      
      // Save the order details
      setOrderDetails(newOrderDetails);
      
      // Send confirmation email if customer email is available
      if (customerEmail && newOrderDetails.items.length > 0) {
        sendOrderConfirmationEmail(customerEmail, {
          orderId: newOrderDetails.orderId,
          date: newOrderDetails.date,
          total: newOrderDetails.total,
          items: newOrderDetails.items,
          estimatedDelivery: newOrderDetails.estimatedDelivery
        }).then(() => {
          setEmailSent(true);
          toast({
            title: "Order Confirmation Sent",
            description: `A confirmation email has been sent to ${customerEmail}`,
          });
        });
      }
      
      // Clear cart once everything is processed
      clearCart();
      
    } else {
      // Show error toast if no order data
      toast({
        title: "No order data found",
        description: "Redirecting to products page",
        variant: "destructive",
      });
    }
  }, [location.state, toast, clearCart]);

  // Handle email resend
  const handleResendEmail = () => {
    if (!orderDetails || !location.state?.customerEmail) return;
    
    sendOrderConfirmationEmail(location.state.customerEmail, {
      orderId: orderDetails.orderId,
      date: orderDetails.date,
      total: orderDetails.total,
      items: orderDetails.items,
      estimatedDelivery: orderDetails.estimatedDelivery
    }).then(() => {
      toast({
        title: "Email Resent",
        description: `The confirmation email has been resent to ${location.state.customerEmail}`,
      });
    });
  };

  if (!location.state || !location.state.orderItems) {
    return <Navigate to="/products" replace />;
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
            <div className="h-6 w-64 bg-gray-200 rounded mb-3"></div>
            <div className="h-4 w-40 bg-gray-200 rounded"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-16 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Confirmation Header */}
          <div className="bg-white border border-green-100 rounded-xl p-6 mb-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-gray-600 max-w-lg mx-auto">
              Thank you for your order. We've received your order and will begin processing it right away.
              {emailSent && location.state.customerEmail && (
                <span> A confirmation email has been sent to <span className="font-medium">{location.state.customerEmail}</span>.</span>
              )}
            </p>
          </div>
          
          {/* Order Details Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
            {/* Order ID and Actions Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Order Number</p>
                  <h2 className="text-xl font-bold text-gray-900">{orderDetails.orderId}</h2>
                </div>
                
                <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
                  {location.state.customerEmail && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-2" 
                      onClick={handleResendEmail}
                    >
                      Resend Email
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-2"
                    onClick={() => window.print()}
                  >
                    Print Receipt
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Order Info Section */}
            <div className="p-6 bg-gray-50 border-b border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Order Date</p>
                  <p className="font-medium">{orderDetails.date}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">Estimated Delivery</p>
                  <div className="flex items-center">
                    <Package className="w-4 h-4 text-gray-400 mr-2" />
                    <p className="font-medium">{orderDetails.estimatedDelivery}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                  <p className="font-medium">{orderDetails.paymentMethod}</p>
                </div>
              </div>
            </div>
            
            {/* Order Items */}
            <div className="p-6 border-b border-gray-100">
              <h3 className="font-medium text-gray-900 mb-4">Order Items</h3>
              
              <div className="space-y-4">
                {orderDetails.items.map((item) => (
                  <div key={item.id} className="flex items-start py-3">
                    <div className="w-16 h-16 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.svg";
                        }}
                      />
                    </div>
                    
                    <div className="ml-4 flex-grow">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="font-medium text-gray-900">${(item.price || 0).toFixed(2)}</p>
                      </div>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="my-6" />
              
              {/* Order Price Summary */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${orderDetails.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {orderDetails.shipping === 0 ? "Free" : `$${orderDetails.shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${orderDetails.tax.toFixed(2)}</span>
                </div>
                {orderDetails.discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-${orderDetails.discount.toFixed(2)}</span>
                  </div>
                )}
                <Separator className="my-2" />
                <div className="flex justify-between">
                  <span className="font-medium text-gray-900">Total</span>
                  <span className="font-bold text-gray-900">${orderDetails.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            {/* Shipping Address */}
            <div className="p-6">
              <h3 className="font-medium text-gray-900 mb-3">Shipping Address</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">{orderDetails.shippingAddress.name}</p>
                <p className="text-gray-600">{orderDetails.shippingAddress.street}</p>
                <p className="text-gray-600">
                  {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.zipCode}
                </p>
                <p className="text-gray-600">{orderDetails.shippingAddress.country}</p>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button asChild variant="outline" className="flex-1 text-base">
              <Link to="/products">
                Continue Shopping
                <ShoppingBag className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            
            <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700 text-base">
              <Link to="/order-tracking">
                Track Order
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
