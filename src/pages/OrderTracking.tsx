
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Package, Truck, MapPin, Check, Clock, Search } from 'lucide-react';
import { toast } from 'sonner';

const OrderTracking = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [orderStatus, setOrderStatus] = useState<{
    id: string;
    status: 'processing' | 'shipped' | 'out-for-delivery' | 'delivered';
    progress: number;
    statusTimeline: {
      status: string;
      date: string;
      location?: string;
      completed: boolean;
    }[];
    estimatedDelivery: string;
    items: {
      name: string;
      quantity: number;
      price: number;
    }[];
    shippingAddress: string;
  } | null>(null);

  // Mock order data - in a real app, this would come from an API
  const mockOrderData = {
    id: 'ORD-7891234',
    status: 'out-for-delivery' as const,
    progress: 75,
    statusTimeline: [
      {
        status: 'Order Placed',
        date: 'May 12, 2023 - 10:30 AM',
        completed: true
      },
      {
        status: 'Processing',
        date: 'May 12, 2023 - 2:45 PM',
        completed: true
      },
      {
        status: 'Shipped',
        date: 'May 13, 2023 - 9:15 AM',
        location: 'PharmaCare Warehouse',
        completed: true
      },
      {
        status: 'Out for Delivery',
        date: 'May 14, 2023 - 8:30 AM',
        location: 'Local Distribution Center',
        completed: true
      },
      {
        status: 'Delivered',
        date: 'Expected May 14, 2023 - by 8:00 PM',
        location: 'Your Address',
        completed: false
      }
    ],
    estimatedDelivery: 'Today by 8:00 PM',
    items: [
      { name: 'Paracetamol 500mg', quantity: 2, price: 5.99 },
      { name: 'Vitamin C 1000mg', quantity: 1, price: 12.99 }
    ],
    shippingAddress: '123 Main St, Apt 4B, New York, NY 10001'
  };

  const handleTrackOrder = () => {
    if (!orderNumber.trim()) {
      toast.error('Please enter an order number');
      return;
    }

    setIsTracking(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      if (orderNumber.includes('789') || orderNumber.toUpperCase() === 'TEST') {
        setOrderStatus(mockOrderData);
        toast.success('Order found!');
      } else {
        setOrderStatus(null);
        toast.error('Order not found. Try using "TEST" or any number with "789"');
      }
      setIsTracking(false);
    }, 1500);
  };

  const getStatusIcon = (status: string, completed: boolean) => {
    if (!completed) return <Clock className="w-6 h-6 text-gray-400" />;
    
    switch (status) {
      case 'Order Placed':
        return <Check className="w-6 h-6 text-green-500" />;
      case 'Processing':
        return <Package className="w-6 h-6 text-blue-500" />;
      case 'Shipped':
        return <Truck className="w-6 h-6 text-purple-500" />;
      case 'Out for Delivery':
        return <MapPin className="w-6 h-6 text-orange-500" />;
      case 'Delivered':
        return <Check className="w-6 h-6 text-green-500" />;
      default:
        return <Clock className="w-6 h-6 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container-custom py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Track Your Order</h1>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
            <p className="text-gray-600 mb-4">
              Enter your order number to track your package. You can find your order number in the confirmation email.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                placeholder="Enter order number (try 'TEST')"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="flex-grow"
              />
              <Button 
                onClick={handleTrackOrder} 
                disabled={isTracking}
                className="bg-nimocare-600 hover:bg-nimocare-700"
              >
                {isTracking ? (
                  <>Searching...</>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" /> 
                    Track Order
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {orderStatus && (
            <div className="space-y-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Order {orderStatus.id}</h2>
                      <p className="text-gray-600">Estimated delivery: {orderStatus.estimatedDelivery}</p>
                    </div>
                    <div className="bg-nimocare-50 text-nimocare-600 px-4 py-2 rounded-full font-medium">
                      {orderStatus.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Order Progress</span>
                      <span className="text-sm font-medium">{orderStatus.progress}%</span>
                    </div>
                    <Progress value={orderStatus.progress} className="h-2" />
                  </div>
                  
                  <div className="border-t border-gray-100 pt-6">
                    <h3 className="font-medium text-gray-900 mb-4">Tracking Details</h3>
                    <div className="space-y-6">
                      {orderStatus.statusTimeline.map((item, index) => (
                        <div key={index} className="flex">
                          <div className="mr-4 mt-1">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.completed ? 'bg-nimocare-50' : 'bg-gray-100'}`}>
                              {getStatusIcon(item.status, item.completed)}
                            </div>
                            {index < orderStatus.statusTimeline.length - 1 && (
                              <div className={`w-0.5 h-14 ${item.completed ? 'bg-nimocare-200' : 'bg-gray-200'} mx-auto mt-1`}></div>
                            )}
                          </div>
                          <div>
                            <h4 className={`font-medium ${item.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                              {item.status}
                            </h4>
                            <p className="text-sm text-gray-500 mt-1">{item.date}</p>
                            {item.location && (
                              <p className="text-sm text-gray-600 mt-1">{item.location}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-medium text-gray-900 mb-4">Order Summary</h3>
                    <div className="space-y-3">
                      {orderStatus.items.map((item, index) => (
                        <div key={index} className="flex justify-between">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-medium">${item.price.toFixed(2)}</p>
                        </div>
                      ))}
                      <div className="border-t border-gray-100 pt-3 mt-3">
                        <div className="flex justify-between font-medium">
                          <p>Total</p>
                          <p>${orderStatus.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-medium text-gray-900 mb-4">Shipping Address</h3>
                    <p className="text-gray-700">{orderStatus.shippingAddress}</p>
                    
                    <div className="mt-6">
                      <h3 className="font-medium text-gray-900 mb-2">Need Help?</h3>
                      <div className="flex gap-2 mt-2">
                        <Button variant="outline" size="sm">Contact Support</Button>
                        <Button variant="outline" size="sm">Modify Order</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          
          {orderStatus === null && !isTracking && orderNumber && (
            <div className="bg-red-50 border border-red-100 p-6 rounded-xl text-center">
              <h3 className="text-lg font-medium text-red-800 mb-2">Order Not Found</h3>
              <p className="text-red-600">We couldn't find an order with the number you provided. Please check the number and try again.</p>
              <p className="text-sm text-gray-600 mt-4">For testing, try using "TEST" as the order number</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderTracking;
