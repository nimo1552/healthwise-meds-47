
import { Navigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';
import { useOrderConfirmation } from './OrderConfirmationProvider';

interface OrderConfirmationGuardProps {
  children: React.ReactNode;
}

const OrderConfirmationGuard = ({ children }: OrderConfirmationGuardProps) => {
  const { hasValidOrderData } = useOrderConfirmation();
  const { toast } = useToast();

  useEffect(() => {
    if (!hasValidOrderData) {
      toast({
        title: "No order data found",
        description: "Please return to cart and complete your purchase",
        variant: "destructive",
      });
    }
  }, [hasValidOrderData, toast]);

  if (!hasValidOrderData) {
    return <Navigate to="/products" replace />;
  }

  return <>{children}</>;
};

export default OrderConfirmationGuard;
