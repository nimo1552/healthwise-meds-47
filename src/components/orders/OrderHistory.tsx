
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { FileText, Eye, RefreshCw, Clock, CheckCircle, Truck, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  trackingNumber?: string;
}

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch order history
    const fetchOrders = () => {
      setTimeout(() => {
        const mockOrders: Order[] = [
          {
            id: 'ORD-123456',
            date: '2023-10-15',
            total: 124.95,
            status: 'delivered',
            items: [
              { id: 1, name: 'Acetaminophen 500mg', price: 12.99, quantity: 2 },
              { id: 2, name: 'Digital Thermometer', price: 24.99, quantity: 1 },
              { id: 3, name: 'First Aid Kit', price: 34.99, quantity: 1 }
            ],
            trackingNumber: 'TRK12345678'
          },
          {
            id: 'ORD-123457',
            date: '2023-11-02',
            total: 65.97,
            status: 'shipped',
            items: [
              { id: 4, name: 'Vitamin D3 50mcg', price: 15.99, quantity: 1 },
              { id: 5, name: 'Blood Pressure Monitor', price: 49.98, quantity: 1 }
            ],
            trackingNumber: 'TRK23456789'
          },
          {
            id: 'ORD-123458',
            date: '2023-11-20',
            total: 42.98,
            status: 'processing',
            items: [
              { id: 6, name: 'Ibuprofen 200mg', price: 8.99, quantity: 2 },
              { id: 7, name: 'Heating Pad', price: 24.99, quantity: 1 }
            ]
          }
        ];
        
        setOrders(mockOrders);
        setLoading(false);
      }, 1000);
    };
    
    fetchOrders();
  }, []);

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'shipped':
        return <Truck className="h-4 w-4 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'cancelled':
        return <Package className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Processing</Badge>;
      case 'shipped':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Shipped</Badge>;
      case 'delivered':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Delivered</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelled</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="w-full p-8 text-center">
        <div className="animate-pulse flex flex-col items-center justify-center">
          <div className="h-12 w-12 rounded-full bg-gray-200 mb-4"></div>
          <div className="h-4 w-48 bg-gray-200 rounded mb-3"></div>
          <div className="h-3 w-36 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Order History</h2>
          <p className="text-gray-600">View and manage your previous orders</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" /> Refresh
        </Button>
      </div>
      
      {orders.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Orders Yet</h3>
          <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
          <Button asChild>
            <Link to="/products">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b">
                <div className="flex flex-wrap justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm">Order #{order.id}</p>
                    <Separator orientation="vertical" className="h-4" />
                    <p className="text-sm text-gray-600">{formatDate(order.date)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    {getStatusBadge(order.status)}
                  </div>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p>${item.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between">
                  <p className="font-medium">Total</p>
                  <p className="font-bold">${order.total.toFixed(2)}</p>
                </div>
                
                {order.trackingNumber && (
                  <div className="mt-4 text-sm">
                    <p className="text-gray-600">
                      Tracking Number: <span className="font-medium">{order.trackingNumber}</span>
                    </p>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="bg-gray-50 border-t px-4 py-3 flex justify-between">
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/order-detail/${order.id}`}>
                    <Eye className="h-4 w-4 mr-2" /> View Details
                  </Link>
                </Button>
                
                {order.status === 'delivered' && (
                  <Button variant="outline" size="sm">
                    Buy Again
                  </Button>
                )}
                
                {order.status === 'shipped' && (
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/order-tracking?id=${order.id}`}>
                      Track Order
                    </Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
