
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { OrderConfirmationProvider } from '@/components/order/OrderConfirmationProvider';
import OrderConfirmationContent from '@/components/order/OrderConfirmationContent';
import OrderConfirmationGuard from '@/components/order/OrderConfirmationGuard';

const OrderConfirmation = () => {
  return (
    <OrderConfirmationProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        
        <OrderConfirmationGuard>
          <OrderConfirmationContent />
        </OrderConfirmationGuard>
        
        <Footer />
      </div>
    </OrderConfirmationProvider>
  );
};

export default OrderConfirmation;
