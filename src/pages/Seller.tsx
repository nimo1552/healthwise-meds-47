
import React, { useState, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, CardContent, CardHeader, CardTitle, CardDescription
} from "@/components/ui/card"; // Added CardHeader, CardTitle, CardDescription
import ProductForm from '@/components/seller/ProductForm';
import { useProducts, Product } from '@/contexts/ProductContext'; // Import Product type
import { Button } from '@/components/ui/button';
import { Edit, Trash, Package, RefreshCw, Eye, UserCircle, CalendarDays, Hash, ShoppingBag, DollarSign, Activity, AlertTriangle } from 'lucide-react'; // Added more icons
import { Separator } from '@/components/ui/separator'; // Added Separator

// Interfaces for OrderDetails (copied from OrderHistory.tsx or similar)
interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface ShippingAddress {
  name:string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface OrderDetails {
  orderId: string;
  date: string;
  total: number;
  paymentMethod: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  estimatedDelivery: string;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
}

const ORDERS_STORAGE_KEY = 'nimocare-orders';
const PRODUCTS_STORAGE_KEY = 'pharmacy-products'; // Key for products from ProductContext

interface AnalyticsData {
  totalProducts: number;
  totalOrders: number;
  totalSales: number;
  averageOrderValue: number;
}

const Seller = () => {
  const { products: contextProducts, deleteProduct } = useProducts(); // Renamed to avoid conflict
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const productFormRef = useRef<HTMLDivElement>(null); // For scrolling

  const [sellerOrders, setSellerOrders] = useState<OrderDetails[]>([]);
  const [loadingOrders, setLoadingOrders] = useState<boolean>(true);

  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState<boolean>(true);

  // Fetches customer orders from localStorage.
  // In a real application, this would fetch from a backend API.
  const fetchOrdersFromLocalStorage = React.useCallback(() => {
    setLoadingOrders(true);
    try {
      const storedOrdersString = localStorage.getItem(ORDERS_STORAGE_KEY);
      let fetchedOrders: OrderDetails[] = [];
      if (storedOrdersString) {
        const parsedOrders = JSON.parse(storedOrdersString);
        if (Array.isArray(parsedOrders)) {
          fetchedOrders = parsedOrders.filter(order => 
            order && typeof order.orderId === 'string' && Array.isArray(order.items)
          );
        }
      }
      setSellerOrders(fetchedOrders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      return fetchedOrders; // Return for immediate use in analytics
    } catch (error) {
      console.error("Failed to parse orders from localStorage:", error);
      setSellerOrders([]);
      return []; // Return empty for analytics calculation
    } finally {
      setLoadingOrders(false);
    }
  }, []);

  // Calculates and sets analytics data based on products and orders from localStorage.
  // This is a simulation for client-side analytics.
  // In a production environment, analytics would typically be computed by a backend service.
  const calculateAnalyticsData = React.useCallback(() => {
    setLoadingAnalytics(true);
    let fetchedProducts: Product[] = [];
    try {
      // Attempt to load products directly from localStorage for analytics calculation.
      // This ensures that analytics reflect all products, even if ProductContext is not fully synced
      // or if products are managed by a different mechanism for the seller.
      const storedProductsString = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (storedProductsString) {
        const parsedProducts = JSON.parse(storedProductsString);
        if (Array.isArray(parsedProducts)) {
          fetchedProducts = parsedProducts;
        }
      } else {
        // Fallback to context products if localStorage is empty or inaccessible
        fetchedProducts = contextProducts;
      }
    } catch (error) {
      console.error("Failed to parse products from localStorage for analytics:", error);
       fetchedProducts = contextProducts; // Fallback to context products on error
    }

    // Fetch current orders directly from localStorage to ensure fresh data for analytics.
    let currentOrders: OrderDetails[] = [];
    try {
      const storedOrdersString = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (storedOrdersString) {
        const parsedOrders = JSON.parse(storedOrdersString);
        // Basic validation of order structure
        currentOrders = Array.isArray(parsedOrders) 
          ? parsedOrders.filter(o => o && typeof o.orderId === 'string' && typeof o.total === 'number' && Array.isArray(o.items)) 
          : [];
      }
    } catch (e) {
      console.error("Failed to parse orders from localStorage for analytics:", e);
      // currentOrders remains empty if there's an error
    }
    
    const totalProducts = fetchedProducts.length;
    const totalOrders = currentOrders.length;
    
    const totalSales = currentOrders.reduce((sum, order) => {
      return sum + (typeof order.total === 'number' ? order.total : 0);
    }, 0);
    
    const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;
    
    setAnalyticsData({
      totalProducts,
      totalOrders,
      totalSales,
      averageOrderValue,
    });
    setLoadingAnalytics(false);
  }, [contextProducts]);


  React.useEffect(() => {
    fetchOrdersFromLocalStorage();
    calculateAnalyticsData(); // Calculate analytics after fetching orders and products
  }, [fetchOrdersFromLocalStorage, calculateAnalyticsData]);

  const formatDate = (dateString: string) => {
    if (/\w+ \d{1,2}, \d{4}/.test(dateString)) {
        return dateString;
    }
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    try {
        return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (e) {
        return dateString;
    }
  };
  
  const handleViewOrderDetails = (order: OrderDetails) => {
    alert(JSON.stringify(order, null, 2));
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    // Scroll to the product form for better UX
    if (productFormRef.current) {
      productFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Fallback if ref is not attached yet, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFormSubmittedOrCancelled = () => {
    setEditingProduct(null);
  };
  
  const handleDeleteProduct = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-16">
        <div className="container-custom py-8">
          <h1 className="text-3xl font-bold mb-8">Seller Dashboard</h1>
          
          <Tabs defaultValue="products" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="products" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1" ref={productFormRef}> {/* Attach ref here */}
                  <ProductForm 
                    productToEdit={editingProduct}
                    onFormSubmit={handleFormSubmittedOrCancelled}
                  />
                </div>
                
                <div className="lg:col-span-2">
                  <Card>
                    <CardContent className="pt-6">
                      <h2 className="text-xl font-semibold mb-4">Your Products</h2>
                      
                      {products.length > 0 ? (
                        <div className="space-y-4">
                          {products.map(product => (
                            <div key={product.id} className="flex flex-col md:flex-row border rounded-lg p-4 gap-4">
                              <div className="w-24 h-24 flex-shrink-0">
                                <img 
                                  src={product.image} 
                                  alt={product.name} 
                                  className="w-full h-full object-cover rounded"
                                />
                              </div>
                              <div className="flex-grow">
                                <h3 className="font-medium">{product.name}</h3>
                                <p className="text-sm text-gray-500 truncate">{product.description}</p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                  <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                                    ${product.price.toFixed(2)}
                                  </span>
                                  <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                                    Category: {product.category}
                                  </span>
                                  <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                                    Stock: {product.stock}
                                  </span>
                                  {product.isPrescriptionRequired && (
                                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                      Prescription
                                    </span>
                                  )}
                                  {product.isBestseller && (
                                    <span className="text-sm bg-amber-100 text-amber-800 px-2 py-1 rounded">
                                      Bestseller
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex md:flex-col gap-2 mt-4 md:mt-0">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleEditProduct(product)}
                                >
                                  <Edit className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>
                                <Button 
                                  variant="outline" // Added variant="outline"
                                  size="sm" 
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-300 hover:border-red-400" // Added hover background and border for consistency
                                  onClick={() => handleDeleteProduct(product.id)}
                                >
                                  <Trash className="h-4 w-4 mr-1" />
                                  Delete
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Package className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                          <h3 className="font-medium text-gray-900">No products yet</h3>
                          <p className="text-gray-500 mt-1">Add your first product using the form.</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="orders">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Customer Orders</h2>
                  <Button variant="outline" onClick={fetchOrdersFromLocalStorage} disabled={loadingOrders}>
                    {loadingOrders ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
                    Refresh Orders
                  </Button>
                </div>

                {loadingOrders ? (
                  <div className="text-center py-10">
                    <RefreshCw className="h-8 w-8 mx-auto text-gray-400 animate-spin mb-3" />
                    <p className="text-gray-600">Loading orders...</p>
                  </div>
                ) : sellerOrders.length === 0 ? (
                  <Card>
                    <CardContent className="py-10 text-center">
                      <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <h3 className="font-medium text-gray-900">No orders yet</h3>
                      <p className="text-gray-500 mt-1">New customer orders will appear here.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sellerOrders.map(order => (
                      <Card key={order.orderId} className="flex flex-col">
                        <CardContent className="pt-6 flex-grow">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="text-lg font-semibold text-nimocare-700">Order #{order.orderId}</h3>
                            <Button variant="ghost" size="sm" className="p-1 h-auto" onClick={() => handleViewOrderDetails(order)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="space-y-2 text-sm text-gray-700 mb-4">
                            <div className="flex items-center">
                              <UserCircle className="h-4 w-4 mr-2 text-gray-500" />
                              <span>Customer: {order.shippingAddress?.name || 'N/A'}</span>
                            </div>
                            <div className="flex items-center">
                              <CalendarDays className="h-4 w-4 mr-2 text-gray-500" />
                              <span>Date: {formatDate(order.date)}</span>
                            </div>
                            <div className="flex items-center">
                              <Hash className="h-4 w-4 mr-2 text-gray-500" />
                              <span>Items: {order.items.length}</span>
                            </div>
                            <div className="flex items-center">
                              <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                              <span className="font-semibold">Total: ${order.total.toFixed(2)}</span>
                            </div>
                          </div>

                          <Separator className="my-3" />
                          
                          <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Items</h4>
                          <ul className="space-y-1 text-xs text-gray-600 list-disc list-inside max-h-24 overflow-y-auto pr-2">
                            {order.items.map(item => (
                              <li key={item.id} className="truncate" title={item.name}>
                                {item.name} (x{item.quantity})
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                        {/* Potentially add CardFooter here for actions if needed later */}
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="analytics">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Store Analytics</h2>
                  <Button variant="outline" onClick={calculateAnalyticsData} disabled={loadingAnalytics}>
                    {loadingAnalytics ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
                    Refresh Analytics
                  </Button>
                </div>

                {loadingAnalytics ? (
                  <div className="text-center py-10">
                    <RefreshCw className="h-8 w-8 mx-auto text-gray-400 animate-spin mb-3" />
                    <p className="text-gray-600">Calculating analytics...</p>
                  </div>
                ) : !analyticsData || (analyticsData.totalOrders === 0 && analyticsData.totalProducts === 0) ? (
                  <Card>
                    <CardContent className="py-10 text-center">
                      <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <h3 className="font-medium text-gray-900">Not Enough Data</h3>
                      <p className="text-gray-500 mt-1">There isn't enough data to display analytics yet. Add products and receive orders to see insights.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{analyticsData.totalProducts}</div>
                        <p className="text-xs text-muted-foreground">products listed in your store</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                        <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{analyticsData.totalOrders}</div>
                        <p className="text-xs text-muted-foreground">orders received</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">${analyticsData.totalSales.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">from all orders</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">${analyticsData.averageOrderValue.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">average sales per order</p>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardContent className="py-6">
                  <h2 className="text-xl font-semibold mb-4">Store Settings</h2>
                  <p className="text-gray-500">Configure your store settings here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Seller;
