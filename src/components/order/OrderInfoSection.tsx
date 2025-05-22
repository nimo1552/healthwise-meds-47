
import { Calendar, Truck, CreditCard } from 'lucide-react';

interface OrderInfoSectionProps {
  orderDate: string;
  estimatedDelivery: string;
  paymentMethod: string;
}

const OrderInfoSection = ({ 
  orderDate, 
  estimatedDelivery, 
  paymentMethod 
}: OrderInfoSectionProps) => {
  return (
    <div className="p-6 bg-gray-50 border-b border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <p className="text-sm text-gray-500 mb-1">Order Date</p>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 text-gray-400 mr-2" />
            <p className="font-medium">{orderDate}</p>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-gray-500 mb-1">Estimated Delivery</p>
          <div className="flex items-center">
            <Truck className="w-4 h-4 text-gray-400 mr-2" />
            <p className="font-medium">{estimatedDelivery}</p>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-gray-500 mb-1">Payment Method</p>
          <div className="flex items-center">
            <CreditCard className="w-4 h-4 text-gray-400 mr-2" />
            <p className="font-medium">{paymentMethod}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInfoSection;
