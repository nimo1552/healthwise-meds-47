
import { CheckCircle } from 'lucide-react';

interface OrderConfirmationHeaderProps {
  customerEmail: string;
}

const OrderConfirmationHeader = ({ customerEmail }: OrderConfirmationHeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-100 rounded-xl p-6 mb-8 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Thank You for Your Order!</h1>
      <p className="text-gray-600 max-w-lg mx-auto">
        Your order has been confirmed and will be processed right away. A confirmation email has been sent to {customerEmail}.
      </p>
    </div>
  );
};

export default OrderConfirmationHeader;
