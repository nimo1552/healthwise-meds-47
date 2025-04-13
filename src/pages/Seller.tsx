
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Package, List, ChartBar, Plus, User, Store, LogOut, Upload, MessageSquare, Bell, Mail, Users, Star } from 'lucide-react';
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

// Create a schema for product form validation
const productFormSchema = z.object({
  name: z.string().min(2, { message: 'Product name must be at least 2 characters.' }),
  price: z.coerce.number().min(0.01, { message: 'Price must be greater than 0.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  category: z.string().min(1, { message: 'Category is required.' }),
  stock: z.coerce.number().int().min(0, { message: 'Stock cannot be negative.' }),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

// SidebarItem component
const SidebarItem = ({ icon, text, active, onClick, collapsed }: {
  icon: React.ReactNode;
  text: string;
  active: boolean;
  onClick: () => void;
  collapsed: boolean;
}) => {
  return (
    <button
      className={`flex items-center w-full p-2 rounded-md transition-colors ${
        active ? 'bg-nimocare-50 text-nimocare-600' : 'text-gray-600 hover:bg-gray-100'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center">
        <span className="flex-shrink-0">{icon}</span>
        {!collapsed && <span className="ml-3">{text}</span>}
      </div>
    </button>
  );
};

// DashboardCard component
const DashboardCard = ({ title, value, icon }: { 
  title: string; 
  value: string | number; 
  icon: React.ReactNode;
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
          </div>
          <div className="p-3 bg-nimocare-50 rounded-full">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

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

  // For testimonial form if needed
  const testimonialForm = useForm({
    defaultValues: {
      name: '',
      rating: 5,
      comment: '',
    }
  });

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

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white h-screen shadow-md transition-all duration-300 p-4 flex flex-col`}>
        <div className="flex items-center justify-between mb-10">
          <h2 className={`text-xl font-bold text-nimocare-600 ${!sidebarOpen && 'hidden'}`}>Seller Dashboard</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-500"
          >
            {sidebarOpen ? '◀' : '▶'}
          </Button>
        </div>
        
        <nav className="space-y-2 flex-1">
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
            icon={<List size={20} />} 
            text="Orders" 
            active={activeTab === 'orders'} 
            onClick={() => setActiveTab('orders')} 
            collapsed={!sidebarOpen}
          />
          <SidebarItem 
            icon={<Star size={20} />} 
            text="Testimonials" 
            active={activeTab === 'testimonials'} 
            onClick={() => setActiveTab('testimonials')} 
            collapsed={!sidebarOpen}
          />
          <SidebarItem 
            icon={<Mail size={20} />} 
            text="Newsletter" 
            active={activeTab === 'newsletter'} 
            onClick={() => setActiveTab('newsletter')} 
            collapsed={!sidebarOpen}
          />
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
        
        <div className="pt-4 border-t">
          <Link to="/" className="flex items-center gap-2 p-2 text-gray-600 hover:bg-gray-100 rounded-md">
            <LogOut size={20} />
            {sidebarOpen && <span>Return to Store</span>}
          </Link>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">Seller Dashboard</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <DashboardCard title="Products" value={dashboardStats.products} icon={<Package className="text-blue-500" />} />
                <DashboardCard title="Orders" value={dashboardStats.orders} icon={<List className="text-green-500" />} />
                <DashboardCard title="Revenue" value={`$${dashboardStats.revenue.toFixed(2)}`} icon={<ChartBar className="text-purple-500" />} />
                <DashboardCard title="Customers" value={dashboardStats.customers} icon={<User className="text-orange-500" />} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your store's recent performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { icon: <Package />, text: 'New order #5392 received', time: '10 minutes ago' },
                        { icon: <MessageSquare />, text: 'New review from Sarah J.', time: '1 hour ago' },
                        { icon: <Users />, text: 'New customer registered', time: '3 hours ago' },
                        { icon: <Bell />, text: 'Low stock alert: Vitamin C', time: '5 hours ago' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                          <div className="p-2 rounded-full bg-nimocare-50 text-nimocare-600">
                            {item.icon}
                          </div>
                          <div>
                            <p className="font-medium">{item.text}</p>
                            <p className="text-sm text-gray-500">{item.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                    <CardDescription>Metrics for the current month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {[
                        { label: 'Monthly Revenue', value: '$1,245.75', progress: 65, color: 'bg-blue-500' },
                        { label: 'New Customers', value: '28', progress: 40, color: 'bg-green-500' },
                        { label: 'Order Completion Rate', value: '98%', progress: 98, color: 'bg-purple-500' },
                        { label: 'Average Order Value', value: '$38.93', progress: 70, color: 'bg-orange-500' }
                      ].map((stat, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium text-gray-500">{stat.label}</span>
                            <span className="text-sm font-medium">{stat.value}</span>
                          </div>
                          <div className="w-full h-2 bg-gray-100 rounded-full">
                            <div 
                              className={`h-2 rounded-full ${stat.color}`} 
                              style={{ width: `${stat.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Products</h1>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-nimocare-600 hover:bg-nimocare-700">
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
                        
                        {/* Product Image Upload */}
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-gray-700">Product Image</div>
                          <div 
                            className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
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
                          <Button type="submit">Add Product</Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <Card>
                  <CardContent className="p-0">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="text-left p-4">ID</th>
                          <th className="text-left p-4">Image</th>
                          <th className="text-left p-4">Name</th>
                          <th className="text-left p-4">Price</th>
                          <th className="text-left p-4">Category</th>
                          <th className="text-left p-4">Stock</th>
                          <th className="text-left p-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr key={product.id} className="border-b">
                            <td className="p-4">{product.id}</td>
                            <td className="p-4">
                              <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-12 h-12 object-cover rounded-md"
                              />
                            </td>
                            <td className="p-4">{product.name}</td>
                            <td className="p-4">${product.price.toFixed(2)}</td>
                            <td className="p-4">{product.category}</td>
                            <td className="p-4">{product.stock}</td>
                            <td className="p-4">
                              <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                              <Button variant="outline" size="sm" className="text-red-500">Delete</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">Orders</h1>
              <Card>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b">
                        <tr>
                          <th className="text-left p-2">Order ID</th>
                          <th className="text-left p-2">Customer</th>
                          <th className="text-left p-2">Date</th>
                          <th className="text-left p-2">Amount</th>
                          <th className="text-left p-2">Status</th>
                          <th className="text-left p-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { id: 'ORD-7891234', customer: 'John Doe', date: 'May 14, 2023', amount: 24.97, status: 'Delivered' },
                          { id: 'ORD-7891235', customer: 'Jane Smith', date: 'May 14, 2023', amount: 59.98, status: 'Processing' },
                          { id: 'ORD-7891236', customer: 'Robert Brown', date: 'May 13, 2023', amount: 38.49, status: 'Shipped' },
                          { id: 'ORD-7891237', customer: 'Emily Wilson', date: 'May 12, 2023', amount: 12.99, status: 'Delivered' },
                          { id: 'ORD-7891238', customer: 'Michael Lee', date: 'May 11, 2023', amount: 45.99, status: 'Delivered' },
                        ].map((order, index) => (
                          <tr key={index} className="border-b">
                            <td className="p-2">{order.id}</td>
                            <td className="p-2">{order.customer}</td>
                            <td className="p-2">{order.date}</td>
                            <td className="p-2">${order.amount.toFixed(2)}</td>
                            <td className="p-2">
                              <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                                order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="p-2">
                              <Button variant="outline" size="sm" className="mr-1">View</Button>
                              <Button variant="outline" size="sm">Update</Button>
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
          
          {activeTab === 'testimonials' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Customer Testimonials</h1>
                <Button className="bg-nimocare-600 hover:bg-nimocare-700">
                  <Plus className="mr-2 h-4 w-4" /> Add Testimonial
                </Button>
              </div>
              
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {testimonials.map((testimonial) => (
                      <div key={testimonial.id} className="border-b border-gray-100 pb-6 last:border-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{testimonial.name}</h3>
                            <div className="flex items-center mt-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                                />
                              ))}
                              <span className="ml-2 text-sm text-gray-500">{testimonial.date}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm" className="text-red-500">Delete</Button>
                          </div>
                        </div>
                        <p className="mt-3 text-gray-600">{testimonial.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {activeTab === 'newsletter' && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">Newsletter Subscribers</h1>
              <Card>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b">
                        <tr>
                          <th className="text-left p-2">ID</th>
                          <th className="text-left p-2">Email</th>
                          <th className="text-left p-2">Subscribed Date</th>
                          <th className="text-left p-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subscribers.map((subscriber) => (
                          <tr key={subscriber.id} className="border-b">
                            <td className="p-2">{subscriber.id}</td>
                            <td className="p-2">{subscriber.email}</td>
                            <td className="p-2">{subscriber.subscribed}</td>
                            <td className="p-2">
                              <Button variant="outline" size="sm" className="text-red-500">Remove</Button>
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
          
          {activeTab === 'store' && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">Store Settings</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Store Information</CardTitle>
                    <CardDescription>Manage your store details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                        <Input defaultValue="Nimocare Pharmacy" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Store Email</label>
                        <Input defaultValue="store@nimocare.com" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <Input defaultValue="+1 (800) 555-0123" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Store Address</label>
                        <Input defaultValue="123 Pharmacy Street, Medicine Town, 90210" />
                      </div>
                      <div className="pt-4">
                        <Button className="bg-nimocare-600 hover:bg-nimocare-700">Save Changes</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Business Hours</CardTitle>
                    <CardDescription>Set your pharmacy operating hours</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { day: 'Monday', open: '8:00 AM', close: '8:00 PM' },
                        { day: 'Tuesday', open: '8:00 AM', close: '8:00 PM' },
                        { day: 'Wednesday', open: '8:00 AM', close: '8:00 PM' },
                        { day: 'Thursday', open: '8:00 AM', close: '8:00 PM' },
                        { day: 'Friday', open: '8:00 AM', close: '8:00 PM' },
                        { day: 'Saturday', open: '9:00 AM', close: '6:00 PM' },
                        { day: 'Sunday', open: '9:00 AM', close: '6:00 PM' }
                      ].map((hours, index) => (
                        <div key={index} className="grid grid-cols-3 gap-2 items-center">
                          <div className="font-medium">{hours.day}</div>
                          <Input defaultValue={hours.open} className="text-sm" />
                          <Input defaultValue={hours.close} className="text-sm" />
                        </div>
                      ))}
                      <div className="pt-4">
                        <Button className="bg-nimocare-600 hover:bg-nimocare-700">Update Hours</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          
          {activeTab === 'account' && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">Account Settings</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center">
                        <div className="relative">
                          <div className="w-32 h-32 rounded-full bg-nimocare-100 flex items-center justify-center text-nimocare-600 text-4xl font-bold overflow-hidden">
                            <img 
                              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80" 
                              alt="Profile" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button className="absolute bottom-0 right-0 bg-nimocare-600 text-white p-2 rounded-full">
                            <Upload className="h-4 w-4" />
                          </button>
                        </div>
                        <h2 className="mt-4 text-xl font-semibold">Jane Doe</h2>
                        <p className="text-sm text-gray-500">Store Owner</p>
                        <Button className="mt-4 w-full" variant="outline">View Public Profile</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Update your account information</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                            <Input defaultValue="Jane" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                            <Input defaultValue="Doe" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                          <Input defaultValue="jane.doe@example.com" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                          <Input defaultValue="+1 (555) 987-6543" />
                        </div>
                        <div className="pt-4">
                          <Button className="bg-nimocare-600 hover:bg-nimocare-700">Save Changes</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Seller;

