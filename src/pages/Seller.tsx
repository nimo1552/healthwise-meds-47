import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, List, ChartBar, Plus, User, Store, LogOut, Upload, 
  MessageSquare, Bell, Mail, Users, Star, Search, ArrowUpRight,
  Coins, TrendingUp, ShoppingCart, Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';
import { MoreOptionsMenu } from '@/components/ui/more-options-menu';

// Create a schema for product form validation
const productFormSchema = z.object({
  name: z.string().min(2, { message: 'Product name must be at least 2 characters.' }),
  price: z.coerce.number().min(0.01, { message: 'Price must be greater than 0.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  category: z.string().min(1, { message: 'Category is required.' }),
  stock: z.coerce.number().int().min(0, { message: 'Stock cannot be negative.' }),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

// Mock data for products
const mockProducts = [
  { id: 1, name: 'Paracetamol 500mg', price: 5.99, category: 'Pain Relief', stock: 100, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=200&auto=format&fit=crop' },
  { id: 2, name: 'Vitamin C 1000mg', price: 12.99, category: 'Vitamins', stock: 75, image: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?q=80&w=200&auto=format&fit=crop' },
  { id: 3, name: 'Blood Pressure Monitor', price: 45.99, category: 'Devices', stock: 20, image: 'https://images.unsplash.com/photo-1592845345376-cae0276ef5f5?q=80&w=200&auto=format&fit=crop' },
  { id: 4, name: 'Antiseptic Cream', price: 8.49, category: 'First Aid', stock: 50, image: 'https://images.unsplash.com/photo-1585667317416-a93d08e37b92?q=80&w=200&auto=format&fit=crop' },
  { id: 5, name: 'Thermometer', price: 15.99, category: 'Devices', stock: 35, image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=200&auto=format&fit=crop' },
];

// Mock data for dashboard
const dashboardStats = {
  products: 5,
  orders: 32,
  revenue: 1245.75,
  customers: 28
};

// Mock data for testimonials
const testimonials = [
  { id: 1, name: 'John Smith', rating: 5, comment: 'Great service! My medications always arrive on time.', date: '2023-05-15' },
  { id: 2, name: 'Sarah Johnson', rating: 4, comment: 'Good selection of products and competitive prices.', date: '2023-05-12' },
  { id: 3, name: 'Robert Lee', rating: 5, comment: 'The prescription verification process is smooth and efficient.', date: '2023-05-10' },
];

// Mock data for newsletter subscribers
const subscribers = [
  { id: 1, email: 'john@example.com', subscribed: '2023-04-15' },
  { id: 2, email: 'sarah@example.com', subscribed: '2023-04-20' },
  { id: 3, email: 'mike@example.com', subscribed: '2023-04-25' },
  { id: 4, email: 'emma@example.com', subscribed: '2023-05-01' },
  { id: 5, email: 'david@example.com', subscribed: '2023-05-10' },
];

const Seller = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [products, setProducts] = useState(mockProducts);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  
  // For the add product form
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: '',
      price: 0,
      description: '',
      category: '',
      stock: 0,
    },
  });

  // Filter products based on search query
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Simulate upload progress
    setUploading(true);
    setUploadProgress(0);
    
    const reader = new FileReader();
    reader.onload = () => {
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setUploading(false);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
      
      // After "upload" completes
      setTimeout(() => {
        if (reader.result) {
          setSelectedImage(reader.result.toString());
          toast.success('Image uploaded successfully!');
        }
      }, 2200);
    };
    
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = (data: ProductFormValues) => {
    // Add new product to list
    const newProduct = {
      id: products.length + 1,
      name: data.name,
      price: data.price,
      category: data.category,
      stock: data.stock,
      image: selectedImage || 'https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=200&auto=format&fit=crop'
    };
    
    setProducts([...products, newProduct]);
    toast.success('Product added successfully!');
    form.reset();
    setSelectedImage(null);
    setUploadProgress(0);
  };

  // Handle product deletion
  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
    toast.success('Product deleted successfully');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div 
        className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white h-screen shadow-md transition-all duration-300 fixed left-0 top-0 z-30 overflow-y-auto`}
        style={{ height: '100vh' }}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between mb-8">
            <div className={`flex items-center ${!sidebarOpen && 'justify-center w-full'}`}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-nimocare-600 to-nimocare-500 flex items-center justify-center text-white font-bold text-lg">
                N
              </div>
              {sidebarOpen && <h2 className="text-xl font-bold text-gray-800 ml-3">NimoCare</h2>}
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-500 hover:bg-gray-100 rounded-full"
            >
              {sidebarOpen ? '◀' : '▶'}
            </Button>
          </div>
          
          <nav className="space-y-1 flex-1">
            <SidebarItem 
              icon={<ChartBar size={20} />} 
              text="Dashboard" 
              active={activeTab === 'dashboard'} 
              onClick={() => setActiveTab('dashboard')} 
              collapsed={!sidebarOpen}
            />
            <SidebarItem 
              icon={<Package size={20} />} 
              text="Products" 
              active={activeTab === 'products'} 
              onClick={() => setActiveTab('products')} 
              collapsed={!sidebarOpen}
            />
            <SidebarItem 
              icon={<ShoppingCart size={20} />} 
              text="Orders" 
              active={activeTab === 'orders'} 
              onClick={() => setActiveTab('orders')} 
              collapsed={!sidebarOpen}
            />
            <SidebarItem 
              icon={<Star size={20} />} 
              text="Reviews" 
              active={activeTab === 'testimonials'} 
              onClick={() => setActiveTab('testimonials')} 
              collapsed={!sidebarOpen}
              badge={3}
            />
            <SidebarItem 
              icon={<Mail size={20} />} 
              text="Newsletter" 
              active={activeTab === 'newsletter'} 
              onClick={() => setActiveTab('newsletter')} 
              collapsed={!sidebarOpen}
            />
            
            {sidebarOpen && <div className="pt-4 mt-4 border-t border-gray-100">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-3">Settings</h3>
            </div>}
            
            <SidebarItem 
              icon={<Store size={20} />} 
              text="Store Settings" 
              active={activeTab === 'store'} 
              onClick={() => setActiveTab('store')} 
              collapsed={!sidebarOpen}
            />
            <SidebarItem 
              icon={<User size={20} />} 
              text="Account" 
              active={activeTab === 'account'} 
              onClick={() => setActiveTab('account')} 
              collapsed={!sidebarOpen}
            />
          </nav>
          
          <div className="pt-4 border-t border-gray-100">
            <Link to="/" className="flex items-center gap-2 p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <LogOut size={20} />
              {sidebarOpen && <span>Return to Store</span>}
            </Link>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Top navigation */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-800">
                {activeTab === 'dashboard' && 'Dashboard'}
                {activeTab === 'products' && 'Products'}
                {activeTab === 'orders' && 'Orders'}
                {activeTab === 'testimonials' && 'Reviews'}
                {activeTab === 'newsletter' && 'Newsletter'}
                {activeTab === 'store' && 'Store Settings'}
                {activeTab === 'account' && 'Account'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search..." 
                  className="pl-10 pr-4 py-2 w-64 rounded-full border-gray-200 focus:ring-nimocare-500 focus:border-nimocare-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Button variant="ghost" size="icon" className="text-gray-600 hover:bg-gray-100 rounded-full">
                <Bell size={20} />
              </Button>
              
              <div className="relative">
                <button className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-nimocare-100 flex items-center justify-center text-nimocare-600 font-semibold">
                    J
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">John Doe</span>
                </button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <div className="p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Welcome section */}
                <div className="bg-gradient-to-r from-nimocare-600 to-nimocare-500 rounded-xl p-6 shadow-md mb-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                      <h2 className="text-white text-2xl font-semibold">Welcome back, John!</h2>
                      <p className="text-nimocare-100 mt-1">Here's what's happening with your store today.</p>
                    </div>
                    <Button className="mt-4 md:mt-0 bg-white text-nimocare-600 hover:bg-nimocare-50">
                      <ArrowUpRight className="mr-2 h-4 w-4" />
                      View Reports
                    </Button>
                  </div>
                </div>
                
                {/* Stat cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard 
                    title="Total Revenue"
                    value={`$${dashboardStats.revenue.toFixed(2)}`}
                    change="+12.5%"
                    trend="up"
                    icon={<Coins className="text-green-500" />}
                  />
                  <StatCard 
                    title="Total Orders"
                    value={dashboardStats.orders.toString()}
                    change="+8.2%"
                    trend="up"
                    icon={<ShoppingCart className="text-blue-500" />}
                  />
                  <StatCard 
                    title="Total Products"
                    value={dashboardStats.products.toString()}
                    change="0%"
                    trend="neutral"
                    icon={<Package className="text-purple-500" />}
                  />
                  <StatCard 
                    title="Total Customers"
                    value={dashboardStats.customers.toString()}
                    change="+5.3%"
                    trend="up"
                    icon={<Users className="text-orange-500" />}
                  />
                </div>
                
                {/* Recent activity and stats */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Recent Activity</CardTitle>
                          <CardDescription>Your store's latest updates</CardDescription>
                        </div>
                        <MoreOptionsMenu 
                          items={[
                            { label: "View All", onClick: () => {} },
                            { label: "Mark All Read", onClick: () => {} },
                            { label: "Settings", onClick: () => {} }
                          ]}
                        />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { icon: <Package className="text-blue-500" />, text: 'New order #5392 received', time: '10 minutes ago', amount: '$45.99' },
                          { icon: <Star className="text-yellow-500" />, text: 'New review from Sarah J.', time: '1 hour ago', rating: 5 },
                          { icon: <User className="text-green-500" />, text: 'New customer registered', time: '3 hours ago', user: 'Emma Wilson' },
                          { icon: <Bell className="text-red-500" />, text: 'Low stock alert: Vitamin C', time: '5 hours ago', stock: '5 left' }
                        ].map((item, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="p-2 rounded-full bg-gray-100 text-gray-800">
                              {item.icon}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium text-gray-800">{item.text}</p>
                                  <p className="text-sm text-gray-500">{item.time}</p>
                                </div>
                                {item.amount && <span className="text-sm font-semibold text-green-600">{item.amount}</span>}
                                {item.rating && (
                                  <div className="flex">
                                    {Array.from({ length: item.rating }).map((_, i) => (
                                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                    ))}
                                  </div>
                                )}
                                {item.stock && <span className="text-sm font-semibold text-red-500">{item.stock}</span>}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Sales Overview</CardTitle>
                          <CardDescription>Your sales performance this month</CardDescription>
                        </div>
                        <MoreOptionsMenu 
                          items={[
                            { label: "Weekly", onClick: () => {} },
                            { label: "Monthly", onClick: () => {} },
                            { label: "Yearly", onClick: () => {} }
                          ]}
                        />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mt-2 space-y-6">
                        {[
                          { label: 'Total Sales', value: '$1,245.75', progress: 65, color: 'bg-blue-500' },
                          { label: 'Conversion Rate', value: '24%', progress: 24, color: 'bg-green-500' },
                          { label: 'Avg. Order Value', value: '$38.93', progress: 70, color: 'bg-purple-500' },
                          { label: 'Returning Customers', value: '58%', progress: 58, color: 'bg-orange-500' }
                        ].map((stat, index) => (
                          <div key={index}>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm font-medium text-gray-500">{stat.label}</span>
                              <span className="text-sm font-bold">{stat.value}</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-2 rounded-full ${stat.color}`} 
                                style={{ width: `${stat.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6 pt-6 border-t border-gray-100">
                        <h4 className="text-sm font-semibold mb-3">Upcoming Events</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded bg-blue-100 text-blue-600">
                              <Calendar className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">Inventory Check</p>
                              <p className="text-xs text-gray-500">Tomorrow at 10:00 AM</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded bg-purple-100 text-purple-600">
                              <TrendingUp className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">Monthly Report</p>
                              <p className="text-xs text-gray-500">May 30, 2023</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Recent products */}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Recent Products</CardTitle>
                        <CardDescription>Your latest product additions</CardDescription>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setActiveTab('products')}
                      >
                        View All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {products.slice(0, 3).map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="h-10 w-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                    <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                                  </div>
                                  <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">${product.price.toFixed(2)}</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  product.stock > 50 ? 'bg-green-100 text-green-800' : 
                                  product.stock > 20 ? 'bg-yellow-100 text-yellow-800' : 
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {product.stock > 50 ? 'In Stock' : 
                                   product.stock > 20 ? 'Low Stock' : 
                                   'Critical Stock'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {activeTab === 'products' && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                    <p className="text-gray-500">Manage your product inventory</p>
                  </div>
                  
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-grow md:flex-grow-0">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input 
                        placeholder="Search products..." 
                        className="pl-10 pr-4 py-2 rounded-lg border-gray-200 focus:ring-nimocare-500 focus:border-nimocare-500 w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-nimocare-600 hover:bg-nimocare-700 whitespace-nowrap">
                          <Plus className="mr-2 h-4 w-4" /> Add Product
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[550px]">
                        <DialogHeader>
                          <DialogTitle>Add New Product</DialogTitle>
                          <DialogDescription>
                            Fill in the product details below to add a new product to your inventory.
                          </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Product Name</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Enter product name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Price ($)</FormLabel>
                                    <FormControl>
                                      <Input type="number" step="0.01" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            
                            <FormField
                              control={form.control}
                              name="description"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Description</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter product description" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Enter product category" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="stock"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Stock Quantity</FormLabel>
                                    <FormControl>
                                      <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            
                            {/* Product Image Upload */}
                            <div className="space-y-2">
                              <FormLabel>Product Image</FormLabel>
                              <div 
                                className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={triggerFileInput}
                              >
                                <input
                                  type="file"
                                  ref={fileInputRef}
                                  onChange={handleImageUpload}
                                  className="hidden"
                                  accept="image/*"
                                />
                                
                                {!selectedImage ? (
                                  <div className="space-y-2">
                                    <Upload className="w-8 h-8 mx-auto text-gray-400" />
                                    <p className="text-sm text-gray-500">Click to upload product image</p>
                                    <p className="text-xs text-gray-400">PNG, JPG or GIF (max. 5MB)</p>
                                  </div>
                                ) : (
                                  <div className="space-y-2">
                                    <img 
                                      src={selectedImage} 
                                      alt="Selected product" 
                                      className="w-32 h-32 object-cover mx-auto rounded-md"
                                    />
                                    <p className="text-sm text-gray-500">Click to change image</p>
                                  </div>
                                )}
                                
                                {uploading && (
                                  <div className="mt-4">
                                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                                      <span>Uploading...</span>
                                      <span>{uploadProgress}%</span>
                                    </div>
                                    <Progress value={uploadProgress} className="h-1" />
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <DialogFooter>
                              <Button type="button" variant="outline" onClick={() => form.reset()}>Cancel</Button>
                              <Button type="submit">Add Product</Button>
                            </DialogFooter>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                          <tr>
                            <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                            <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                            <th className="text-left
