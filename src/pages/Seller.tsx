
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, List, ChartBar, Plus, User, Store, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

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
  { id: 1, name: 'Paracetamol 500mg', price: 5.99, category: 'Pain Relief', stock: 100 },
  { id: 2, name: 'Vitamin C 1000mg', price: 12.99, category: 'Vitamins', stock: 75 },
  { id: 3, name: 'Blood Pressure Monitor', price: 45.99, category: 'Devices', stock: 20 },
  { id: 4, name: 'Antiseptic Cream', price: 8.49, category: 'First Aid', stock: 50 },
  { id: 5, name: 'Thermometer', price: 15.99, category: 'Devices', stock: 35 },
];

// Mock data for dashboard
const dashboardStats = {
  products: 5,
  orders: 32,
  revenue: 1245.75,
  customers: 28
};

const Seller = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [products, setProducts] = useState(mockProducts);

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

  const onSubmit = (data: ProductFormValues) => {
    // Add new product to list
    const newProduct = {
      id: products.length + 1,
      name: data.name,
      price: data.price,
      category: data.category,
      stock: data.stock
    };
    
    setProducts([...products, newProduct]);
    toast.success('Product added successfully!');
    form.reset();
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
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your store's recent performance and activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">This is a placeholder for analytics charts. In a real application, this would display sales trends, popular products, and other analytics.</p>
                </CardContent>
              </Card>
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
                  <p className="text-gray-500">This is a placeholder for the orders management section. In a real application, this would display recent orders, order history, and order processing tools.</p>
                </CardContent>
              </Card>
            </div>
          )}
          
          {activeTab === 'store' && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">Store Settings</h1>
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-500">This is a placeholder for store settings. In a real application, this would allow sellers to customize their store name, logo, shipping options, and payment methods.</p>
                </CardContent>
              </Card>
            </div>
          )}
          
          {activeTab === 'account' && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">Account Settings</h1>
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-500">This is a placeholder for account settings. In a real application, this would allow sellers to update their profile information, change password, and manage payment details.</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper component for sidebar items
const SidebarItem = ({ 
  icon, 
  text, 
  active, 
  onClick, 
  collapsed 
}: { 
  icon: React.ReactNode; 
  text: string; 
  active: boolean; 
  onClick: () => void; 
  collapsed: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full p-3 rounded-md transition-all ${
        active 
          ? 'bg-nimocare-50 text-nimocare-600 font-medium' 
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {icon}
      {!collapsed && <span>{text}</span>}
    </button>
  );
};

// Helper component for dashboard stat cards
const DashboardCard = ({ 
  title, 
  value, 
  icon 
}: { 
  title: string; 
  value: string | number; 
  icon: React.ReactNode;
}) => {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
};

export default Seller;
