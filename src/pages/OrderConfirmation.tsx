
import { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { sendOrderConfirmationEmail } from '@/utils/emailService';

import OrderConfirmationHeader from '@/components/order/OrderConfirmationHeader';
import OrderSummary from '@/components/order/OrderSummary';
import OrderActionButtons from '@/components/order/OrderActionButtons';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderDetails {
  orderId: string;
  date: string;
  total: number;
  paymentMethod: string;
  items: OrderItem[];
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
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
  const [customerEmail, setCustomerEmail] = useState('jane.doe@example.com');
  
  useEffect(() => {
    // Clear the cart once the order is confirmed
    clearCart();
    
    // Generate an order ID
    const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
    
    // Set delivery date to 3 days from now
    const currentDate = new Date();
    const deliveryDate = new Date(currentDate);
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    
    console.log("Location state:", location.state);
    
    if (location.state && location.state.orderItems) {
      const { 
        orderItems, 
        orderTotal, 
        orderSubtotal, 
        orderShipping, 
        orderTax, 
        orderDiscount = 0,
        customerInfo
      } = location.state;
      
      console.log("Order items received:", orderItems);
      
      const newOrderDetails: OrderDetails = {
        orderId,
        date: currentDate.toLocaleDateString(),
        total: orderTotal || 0,
        subtotal: orderSubtotal || 0,
        shipping: orderShipping || 0,
        tax: orderTax || 0,
        discount: orderDiscount || 0,
        paymentMethod: "Credit Card (ending in 4242)",
        items: Array.isArray(orderItems) ? orderItems : [],
        shippingAddress: customerInfo || {
          name: "Jane Doe",
          street: "123 Main St",
          city: "Anytown",
          state: "California",
          zipCode: "12345",
          country: "United States"
        },
        estimatedDelivery: deliveryDate.toLocaleDateString()
      };
      
      console.log("Setting order details:", newOrderDetails);
      setOrderDetails(newOrderDetails);
    } else {
      // Redirect to products page if no order data is provided
      toast({
        title: "No order data found",
        description: "Redirecting to products page",
        variant: "destructive",
      });
    }
  }, [location.state, toast, clearCart]);
  
  useEffect(() => {
    if (orderDetails && !emailSent && orderDetails.items.length > 0) {
      sendOrderConfirmationEmail(customerEmail, {
        orderId: orderDetails.orderId,
        date: orderDetails.date,
        total: orderDetails.total,
        items: orderDetails.items,
        estimatedDelivery: orderDetails.estimatedDelivery
      }).then(() => {
        setEmailSent(true);
        toast({
          title: "Order Confirmation Sent",
          description: `A confirmation email has been sent to ${customerEmail}`,
        });
      });
    }
  }, [orderDetails, emailSent, customerEmail, toast]);
  
  const handleResendEmail = () => {
    if (!orderDetails) return;
    
    sendOrderConfirmationEmail(customerEmail, {
      orderId: orderDetails.orderId,
      date: orderDetails.date,
      total: orderDetails.total,
      items: orderDetails.items,
      estimatedDelivery: orderDetails.estimatedDelivery
    }).then(() => {
      toast({
        title: "Email Resent",
        description: `The confirmation email has been resent to ${customerEmail}`,
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-16">
        <div className="container-custom max-w-4xl">
          <OrderConfirmationHeader customerEmail={customerEmail} />
          <OrderSummary orderDetails={orderDetails} onResendEmail={handleResendEmail} />
          <OrderActionButtons />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
