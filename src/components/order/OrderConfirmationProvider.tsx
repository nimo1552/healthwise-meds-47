
import { useEffect, useState, useRef, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { sendOrderConfirmationEmail } from '@/utils/emailService';

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

export interface OrderDetails {
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

interface OrderConfirmationContextType {
  orderDetails: OrderDetails | null;
  emailSent: boolean;
  customerEmail: string | null;
  handleResendEmail: () => void;
  hasValidOrderData: boolean;
}

export const OrderConfirmationContext = React.createContext<OrderConfirmationContextType | undefined>(undefined);

interface OrderConfirmationProviderProps {
  children: ReactNode;
}

export const OrderConfirmationProvider = ({ children }: OrderConfirmationProviderProps) => {
  const location = useLocation();
  const { toast } = useToast();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const initialized = useRef(false);

  const customerEmail = location.state?.customerEmail || null;
  const hasValidOrderData = !!(location.state && location.state.orderItems);

  useEffect(() => {
    if (initialized.current || !hasValidOrderData) {
      return;
    }
    
    initialized.current = true;
    
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

    const orderId = existingOrderId || `ORD-${new Date().getTime().toString().slice(-6)}`;
    
    const currentDate = new Date();
    const deliveryDate = new Date(currentDate);
    deliveryDate.setDate(deliveryDate.getDate() + 5 + Math.floor(Math.random() * 3));
    
    const paymentDisplay = paymentMethod 
      ? (paymentMethod === "Credit Card" ? "Credit Card (ending in 4242)" : paymentMethod)
      : "Credit Card (ending in 4242)";
    
    const formattedItems = Array.isArray(orderItems) ? orderItems.map(item => ({
      ...item,
      image: item.image || "/placeholder.svg"
    })) : [];
    
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
    
    setOrderDetails(newOrderDetails);
    
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
  }, [location.state, toast, emailSent, hasValidOrderData]);

  const handleResendEmail = () => {
    if (!orderDetails || !customerEmail) return;
    
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

  const contextValue: OrderConfirmationContextType = {
    orderDetails,
    emailSent,
    customerEmail,
    handleResendEmail,
    hasValidOrderData
  };

  return (
    <OrderConfirmationContext.Provider value={contextValue}>
      {children}
    </OrderConfirmationContext.Provider>
  );
};

export const useOrderConfirmation = () => {
  const context = React.useContext(OrderConfirmationContext);
  if (context === undefined) {
    throw new Error('useOrderConfirmation must be used within an OrderConfirmationProvider');
  }
  return context;
};
