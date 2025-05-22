
import { Separator } from '@/components/ui/separator';

import OrderSummaryHeader from './OrderSummaryHeader';
import OrderInfoSection from './OrderInfoSection';
import OrderItemsList from './OrderItemsList';
import OrderPriceSummary from './OrderPriceSummary';
import ShippingAddressCard from './ShippingAddressCard';

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

interface OrderSummaryProps {
  orderDetails: OrderDetails;
  onResendEmail: () => void;
}

const OrderSummary = ({ orderDetails, onResendEmail }: OrderSummaryProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-8">
      <OrderSummaryHeader 
        orderId={orderDetails.orderId} 
        onResendEmail={onResendEmail} 
      />
      
      <OrderInfoSection 
        orderDate={orderDetails.date} 
        estimatedDelivery={orderDetails.estimatedDelivery} 
        paymentMethod={orderDetails.paymentMethod} 
      />
      
      <div className="p-6 border-b border-gray-100">
        <h3 className="font-medium text-gray-900 mb-4">Order Items</h3>
        
        <OrderItemsList items={orderDetails.items} />
        
        <Separator className="my-6" />
        
        <OrderPriceSummary
          subtotal={orderDetails.subtotal}
          shipping={orderDetails.shipping}
          tax={orderDetails.tax}
          discount={orderDetails.discount}
          total={orderDetails.total}
        />
      </div>
      
      <ShippingAddressCard address={orderDetails.shippingAddress} />
    </div>
  );
};

export default OrderSummary;
