
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OrderActionButtons = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
      <Button asChild variant="outline" className="flex-1 text-base border-nimocare-200 text-nimocare-700 hover:bg-nimocare-50">
        <Link to="/products">
          Continue Shopping
          <ShoppingBag className="w-4 h-4 ml-2" />
        </Link>
      </Button>
      
      <Button asChild className="flex-1 bg-nimocare-600 hover:bg-nimocare-700 text-white text-base">
        <Link to="/order-tracking">
          Track Order
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </Button>
    </div>
  );
};

export default OrderActionButtons;
