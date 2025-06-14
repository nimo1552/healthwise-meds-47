
import { Mail, Printer, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OrderSummaryHeaderProps {
  orderId: string;
  onResendEmail: () => void;
}

const OrderSummaryHeader = ({ orderId, onResendEmail }: OrderSummaryHeaderProps) => {
  // Handle print action
  const handlePrint = () => {
    window.print();
  };
  
  // Handle download receipt
  const handleDownloadReceipt = () => {
    // In a real implementation, this would generate a PDF
    // For now, we just print as a simple fallback
    window.print();
  };
  
  return (
    <div className="p-6 border-b border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">Order Number</p>
          <h2 className="text-xl font-bold text-gray-900">{orderId}</h2>
        </div>
        
        <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
          <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={onResendEmail}>
            <Mail className="w-4 h-4" />
            Resend Email
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={handlePrint}>
            <Printer className="w-4 h-4" />
            Print
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={handleDownloadReceipt}>
            <FileText className="w-4 h-4" />
            Download Receipt
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryHeader;
