
import { useEffect, useState, useRef } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useToast } from '@/hooks/use-toast';
import { sendOrderConfirmationEmail } from '@/utils/emailService';
import { Separator } from '@/components/ui/separator';

import OrderConfirmationHeader from '@/components/order/OrderConfirmationHeader';
import OrderSummary from '@/components/order/OrderSummary';
import OrderActionButtons from '@/components/order/OrderActionButtons';

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
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const initialized = useRef(false);
  
  useEffect(() => {
    // Only run this once to prevent regenerating the order
    if (initialized.current) {
      return;
    }
    
    initialized.current = true;
    
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
        customerEmail,
        orderId: existingOrderId
      } = location.state;

      // Only generate a new order ID if one wasn't already created
      const orderId = existingOrderId || `ORD-${new Date().getTime().toString().slice(-6)}`;
      
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
      if (customerEmail && newOrderDetails.items.length > 0 && !emailSent) {
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
    } else {
      // Show error toast if no order data
      toast({
        title: "No order data found",
        description: "Please return to cart and complete your purchase",
        variant: "destructive",
      });
    }
  }, [location.state, toast, emailSent]);

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
          {location.state.customerEmail && (
            <OrderConfirmationHeader customerEmail={location.state.customerEmail} />
          )}
          
          {/* Order Details Card */}
          <OrderSummary 
            orderDetails={orderDetails}
            onResendEmail={handleResendEmail}
          />
          
          {/* Action Buttons */}
          <OrderActionButtons />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
