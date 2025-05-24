
import OrderConfirmationHeader from './OrderConfirmationHeader';
import OrderSummary from './OrderSummary';
import OrderActionButtons from './OrderActionButtons';
import { useOrderConfirmation } from './OrderConfirmationProvider';

const OrderConfirmationContent = () => {
  const { orderDetails, customerEmail, handleResendEmail } = useOrderConfirmation();

  if (!orderDetails) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-6 w-64 bg-gray-200 rounded mb-3"></div>
          <div className="h-4 w-40 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-grow pt-16 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        {customerEmail && (
          <OrderConfirmationHeader customerEmail={customerEmail} />
        )}
        
        <OrderSummary 
          orderDetails={orderDetails}
          onResendEmail={handleResendEmail}
        />
        
        <OrderActionButtons />
      </div>
    </main>
  );
};

export default OrderConfirmationContent;
