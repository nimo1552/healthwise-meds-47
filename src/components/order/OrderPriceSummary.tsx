
import { Separator } from '@/components/ui/separator';

interface OrderPriceSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
}

const OrderPriceSummary = ({
  subtotal,
  shipping,
  tax, 
  discount,
  total
}: OrderPriceSummaryProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Subtotal</span>
        <span className="font-medium">${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Shipping</span>
        <span className="font-medium">
          {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
        </span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Tax</span>
        <span className="font-medium">${tax.toFixed(2)}</span>
      </div>
      {discount > 0 && (
        <div className="flex justify-between text-sm text-green-600">
          <span>Discount</span>
          <span>-${discount.toFixed(2)}</span>
        </div>
      )}
      <Separator className="my-2" />
      <div className="flex justify-between">
        <span className="font-medium text-gray-900">Total</span>
        <span className="font-bold text-gray-900">${total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderPriceSummary;
