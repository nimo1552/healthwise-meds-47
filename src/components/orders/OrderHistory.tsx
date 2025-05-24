
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { FileText, Eye, RefreshCw, Clock, CheckCircle, Truck, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

// Copied from OrderConfirmation.tsx for consistency
interface OrderItem {
  id: number; // Product ID
  name: string;
  price: number;
  quantity: number;
  image?: string; // Product image
}

interface ShippingAddress {
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Copied and adapted from OrderConfirmation.tsx
interface OrderDetails {
  orderId: string;
  date: string; // Date of order placement
  total: number; // Grand total
  paymentMethod: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  estimatedDelivery: string; // Estimated delivery date
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  // Note: 'status' and 'trackingNumber' were in the mock,
  // but not in OrderConfirmation.tsx's OrderDetails.
  // These can be added later if backend provides them.
}

const ORDERS_STORAGE_KEY = 'nimocare-orders';

// OrderHistory.tsx
// This component is responsible for displaying the user's order history.
// It fetches order data from localStorage, which is populated upon order confirmation.
// This is a simulation for client-side display as there's no backend.
const OrderHistory = () => {
  const [orders, setOrders] = useState<OrderDetails[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetches orders from localStorage and updates the component's state.
  const fetchOrdersFromLocalStorage = () => {
    setLoading(true);
    try {
      const storedOrdersString = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (storedOrdersString) {
        const parsedOrders = JSON.parse(storedOrdersString);
        if (Array.isArray(parsedOrders)) {
          // Basic validation for each order object to ensure it has key fields
          const validOrders = parsedOrders.filter(order => 
            order && typeof order.orderId === 'string' && Array.isArray(order.items)
          );
          setOrders(validOrders);
        } else {
          console.warn("Stored orders is not an array. Resetting.");
          setOrders([]);
        }
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Failed to parse orders from localStorage:", error);
      setOrders([]); // Default to empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrdersFromLocalStorage();
  }, []);
  
  // The formatDate function from original file is good.
  const formatDate = (dateString: string) => {
    // Check if dateString is already in "Month Day, Year" format from OrderConfirmation
    if (/\w+ \d{1,2}, \d{4}/.test(dateString)) {
        return dateString; // Already formatted
    }
    // Otherwise, assume it's an ISO string or needs formatting
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    try {
        return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (e) {
        console.warn("Could not parse date:", dateString, e);
        return dateString; // return original if parsing fails
    }
  };

  const handleViewDetails = (order: OrderDetails) => {
    alert(JSON.stringify(order, null, 2));
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
        {/* Keep Refresh button, but make it functional */}
        <Button variant="outline" className="flex items-center gap-2" onClick={fetchOrdersFromLocalStorage} disabled={loading}>
          {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />} 
          Refresh
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
            <Card key={order.orderId} className="overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b">
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm">Order #{order.orderId}</p>
                    <Separator orientation="vertical" className="h-4" />
                    <p className="text-sm text-gray-600">Placed on: {formatDate(order.date)}</p>
                  </div>
                  {/* Removed status icon/badge as 'status' is not in OrderDetails from localStorage */}
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    Estimated Delivery: {formatDate(order.estimatedDelivery)}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {order.items.slice(0, 3).map((item) => ( // Show first 3 items as preview
                    <div key={item.id} className="flex items-center gap-2">
                      <img 
                        src={item.image || '/placeholder.svg'} 
                        alt={item.name} 
                        className="w-10 h-10 object-cover rounded" 
                      />
                      <div>
                        <p className="text-xs font-medium truncate w-32" title={item.name}>{item.name}</p>
                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-xs ml-auto">${item.price.toFixed(2)}</p>
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <div className="flex items-center justify-center text-xs text-gray-500">
                      + {order.items.length - 3} more items
                    </div>
                  )}
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-600">Payment Method: {order.paymentMethod}</p>
                    <p className="text-xs text-gray-600">
                      Shipping to: {order.shippingAddress.name}, {order.shippingAddress.city}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Subtotal: ${order.subtotal.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">Shipping: ${order.shipping.toFixed(2)}</p>
                    {order.discount > 0 && <p className="text-sm text-gray-600">Discount: -${order.discount.toFixed(2)}</p>}
                    <p className="text-sm text-gray-600">Tax: ${order.tax.toFixed(2)}</p>
                    <p className="font-bold text-lg">Total: ${order.total.toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="bg-gray-50 border-t px-4 py-3 flex justify-end">
                <Button variant="outline" size="sm" onClick={() => handleViewDetails(order)}>
                  <Eye className="h-4 w-4 mr-2" /> View Full Details
                </Button>
                {/* Removed status-dependent buttons like "Buy Again" or "Track Order" 
                    as status is not part of OrderDetails from localStorage for now.
                    These can be added back if status becomes available. */}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
