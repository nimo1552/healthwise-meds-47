
import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  CheckCircle, 
  Truck, 
  Calendar, 
  MapPin, 
  CreditCard,
  ArrowRight,
  Printer,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface OrderDetails {
  orderId: string;
  date: string;
  total: number;
  paymentMethod: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  estimatedDelivery: string;
}

const OrderConfirmation = () => {
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  
  useEffect(() => {
    // In a real app, you would get this data from an API
    // For now, we'll simulate order details with mock data
    const mockOrderDetails: OrderDetails = {
      orderId: "ORD-" + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString(),
      total: 124.95,
      paymentMethod: "Credit Card (ending in 4242)",
      items: [
        {
          id: "prod-1",
          name: "Acetaminophen 500mg",
          price: 12.99,
          quantity: 2,
          image: "/placeholder.svg"
        },
        {
          id: "prod-2",
          name: "Digital Thermometer",
          price: 24.99,
          quantity: 1,
          image: "/placeholder.svg"
        },
        {
          id: "prod-3",
          name: "First Aid Kit",
          price: 34.99,
          quantity: 1,
          image: "/placeholder.svg"
        }
      ],
      shippingAddress: {
        name: "Jane Doe",
        street: "123 Main St",
        city: "Anytown",
        state: "California",
        zipCode: "12345",
        country: "United States"
      },
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()
    };
    
    // Simulating API call delay
    setTimeout(() => {
      setOrderDetails(mockOrderDetails);
    }, 500);
  }, [location]);
  
  if (!orderDetails) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
            <div className="h-6 w-64 bg-gray-200 rounded mb-3"></div>
            <div className="h-4 w-40 bg-gray-200 rounded"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-16">
        <div className="container-custom max-w-4xl">
          {/* Success Banner */}
          <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-100 rounded-xl p-6 mb-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-gray-600 max-w-lg mx-auto">
              Thank you for your order. We've received your purchase and will process it right away.
            </p>
          </div>
          
          {/* Order Details */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Order Number</p>
                  <h2 className="text-xl font-bold text-gray-900">{orderDetails.orderId}</h2>
                </div>
                
                <div className="mt-4 md:mt-0 flex gap-3">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Printer className="w-4 h-4" />
                    Print
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Email Receipt
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="p-6 bg-gray-50 border-b border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Order Date</p>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                    <p className="font-medium">{orderDetails.date}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">Estimated Delivery</p>
                  <div className="flex items-center">
                    <Truck className="w-4 h-4 text-gray-400 mr-2" />
                    <p className="font-medium">{orderDetails.estimatedDelivery}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                  <div className="flex items-center">
                    <CreditCard className="w-4 h-4 text-gray-400 mr-2" />
                    <p className="font-medium">{orderDetails.paymentMethod}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Items */}
            <div className="p-6 border-b border-gray-100">
              <h3 className="font-medium text-gray-900 mb-4">Order Items</h3>
              
              <div className="space-y-4">
                {orderDetails.items.map((item) => (
                  <div key={item.id} className="flex items-start py-3">
                    <div className="w-16 h-16 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="ml-4 flex-grow">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="font-medium text-gray-900">${item.price.toFixed(2)}</p>
                      </div>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="my-6" />
              
              {/* Order Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${orderDetails.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between">
                  <span className="font-medium text-gray-900">Total</span>
                  <span className="font-bold text-gray-900">${orderDetails.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            {/* Shipping Address */}
            <div className="p-6">
              <h3 className="font-medium text-gray-900 mb-4">Shipping Address</h3>
              
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">{orderDetails.shippingAddress.name}</p>
                  <p className="text-gray-600">{orderDetails.shippingAddress.street}</p>
                  <p className="text-gray-600">
                    {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.zipCode}
                  </p>
                  <p className="text-gray-600">{orderDetails.shippingAddress.country}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline" className="flex-1">
              <Link to="/order-tracking">
                Track Order
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            
            <Button asChild className="flex-1 bg-nimocare-600 hover:bg-nimocare-700">
              <Link to="/products">
                Continue Shopping
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
