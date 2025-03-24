
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Package, 
  CreditCard, 
  Heart, 
  MapPin, 
  Settings, 
  FileText, 
  Calendar, 
  Clock, 
  ChevronRight, 
  Download, 
  CheckCircle, 
  Bell 
} from 'lucide-react';

// Sample recent orders data
const recentOrders = [
  {
    id: 'ORD-7891234',
    date: 'May 14, 2023',
    total: 24.97,
    status: 'Delivered',
    items: 3
  },
  {
    id: 'ORD-6543219',
    date: 'April 29, 2023',
    total: 42.50,
    status: 'Processing',
    items: 2
  },
  {
    id: 'ORD-5432198',
    date: 'April 15, 2023',
    total: 18.99,
    status: 'Delivered',
    items: 1
  }
];

// Sample prescription data
const prescriptions = [
  {
    id: 'RX-1234',
    medication: 'Amoxicillin 500mg',
    doctor: 'Dr. Smith',
    date: 'May 10, 2023',
    refills: 2,
    expires: 'Nov 10, 2023'
  },
  {
    id: 'RX-5678',
    medication: 'Lisinopril 10mg',
    doctor: 'Dr. Johnson',
    date: 'April 22, 2023',
    refills: 5,
    expires: 'April 22, 2024'
  }
];

// Sample address data
const addresses = [
  {
    id: 1,
    type: 'Home',
    name: 'John Doe',
    address: '123 Main St, Apt 4B',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    phone: '(212) 555-1234',
    isDefault: true
  },
  {
    id: 2,
    type: 'Work',
    name: 'John Doe',
    address: '456 Business Ave, Suite 200',
    city: 'New York',
    state: 'NY',
    zip: '10022',
    phone: '(212) 555-5678',
    isDefault: false
  }
];

// Sample payment methods
const paymentMethods = [
  {
    id: 1,
    type: 'Credit Card',
    cardType: 'Visa',
    last4: '4242',
    expiry: '05/25',
    isDefault: true
  },
  {
    id: 2,
    type: 'Credit Card',
    cardType: 'Mastercard',
    last4: '8765',
    expiry: '09/24',
    isDefault: false
  }
];

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Header */}
        <section className="bg-nimocare-50/50 py-10 md:py-16">
          <div className="container-custom">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">My Account</h1>
            <p className="text-lg text-gray-600">
              Welcome back, John Doe
            </p>
          </div>
        </section>
        
        <section className="py-10">
          <div className="container-custom">
            <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-8">
                <TabsTrigger value="overview" className="text-center">
                  <User className="w-4 h-4 mr-2" />
                  <span className="hidden md:inline">Overview</span>
                </TabsTrigger>
                <TabsTrigger value="orders" className="text-center">
                  <Package className="w-4 h-4 mr-2" />
                  <span className="hidden md:inline">Orders</span>
                </TabsTrigger>
                <TabsTrigger value="prescriptions" className="text-center">
                  <FileText className="w-4 h-4 mr-2" />
                  <span className="hidden md:inline">Prescriptions</span>
                </TabsTrigger>
                <TabsTrigger value="wishlist" className="text-center">
                  <Heart className="w-4 h-4 mr-2" />
                  <span className="hidden md:inline">Wishlist</span>
                </TabsTrigger>
                <TabsTrigger value="addresses" className="text-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="hidden md:inline">Addresses</span>
                </TabsTrigger>
                <TabsTrigger value="payments" className="text-center">
                  <CreditCard className="w-4 h-4 mr-2" />
                  <span className="hidden md:inline">Payment</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Recent Orders */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Recent Orders</CardTitle>
                        <CardDescription>Your order history</CardDescription>
                      </div>
                      <Link to="/order-tracking">
                        <Button variant="ghost" size="sm" className="text-nimocare-600">
                          View All
                          <ChevronRight className="ml-1 w-4 h-4" />
                        </Button>
                      </Link>
                    </CardHeader>
                    <CardContent>
                      {recentOrders.length > 0 ? (
                        <div className="space-y-4">
                          {recentOrders.map((order) => (
                            <div key={order.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                              <div>
                                <p className="font-medium">{order.id}</p>
                                <div className="flex space-x-4 text-sm text-gray-500">
                                  <span className="flex items-center">
                                    <Calendar className="mr-1 w-3 h-3" />
                                    {order.date}
                                  </span>
                                  <span>${order.total.toFixed(2)}</span>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  order.status === 'Delivered' 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-amber-100 text-amber-700'
                                }`}>
                                  {order.status}
                                </span>
                                <Link to={`/order-tracking?id=${order.id}`}>
                                  <Button variant="ghost" size="sm">
                                    <ChevronRight className="w-4 h-4" />
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6">
                          <p className="text-gray-500">No recent orders</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  {/* Prescriptions */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Active Prescriptions</CardTitle>
                        <CardDescription>Your current prescriptions</CardDescription>
                      </div>
                      <Button variant="ghost" size="sm" className="text-nimocare-600">
                        View All
                        <ChevronRight className="ml-1 w-4 h-4" />
                      </Button>
                    </CardHeader>
                    <CardContent>
                      {prescriptions.length > 0 ? (
                        <div className="space-y-4">
                          {prescriptions.map((prescription) => (
                            <div key={prescription.id} className="p-3 border border-gray-100 rounded-lg">
                              <div className="flex justify-between mb-2">
                                <p className="font-medium">{prescription.medication}</p>
                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                  {prescription.refills} refills left
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
                                <span className="flex items-center">
                                  <User className="mr-1 w-3 h-3" />
                                  {prescription.doctor}
                                </span>
                                <span className="flex items-center">
                                  <Calendar className="mr-1 w-3 h-3" />
                                  Prescribed: {prescription.date}
                                </span>
                                <span className="flex items-center">
                                  <Clock className="mr-1 w-3 h-3" />
                                  Expires: {prescription.expires}
                                </span>
                              </div>
                              <div className="mt-3 flex justify-end">
                                <Button size="sm" className="bg-nimocare-600 hover:bg-nimocare-700">
                                  Refill Now
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6">
                          <p className="text-gray-500">No active prescriptions</p>
                          <Button className="mt-2" variant="outline">
                            Upload New Prescription
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  {/* Default Address */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Default Address</CardTitle>
                      <CardDescription>Your primary shipping address</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {addresses.filter(a => a.isDefault).map((address) => (
                        <div key={address.id} className="p-3 border border-gray-100 rounded-lg">
                          <div className="flex justify-between mb-2">
                            <p className="font-medium">{address.name}</p>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                              {address.type}
                            </span>
                          </div>
                          <p className="text-gray-600">{address.address}</p>
                          <p className="text-gray-600">{address.city}, {address.state} {address.zip}</p>
                          <p className="text-gray-600 mt-1">{address.phone}</p>
                          <div className="mt-3 flex justify-end">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                  
                  {/* Payment Methods */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Default Payment</CardTitle>
                      <CardDescription>Your primary payment method</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {paymentMethods.filter(p => p.isDefault).map((payment) => (
                        <div key={payment.id} className="p-3 border border-gray-100 rounded-lg">
                          <div className="flex justify-between mb-2">
                            <p className="font-medium">{payment.cardType} •••• {payment.last4}</p>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                              Default
                            </span>
                          </div>
                          <p className="text-gray-600">Expires: {payment.expiry}</p>
                          <div className="mt-3 flex justify-end">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>View and track all your orders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentOrders.length > 0 ? (
                        recentOrders.map((order) => (
                          <div key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-100 rounded-lg">
                            <div>
                              <p className="font-medium">{order.id}</p>
                              <div className="flex flex-wrap gap-3 text-sm text-gray-500 mt-1">
                                <span className="flex items-center">
                                  <Calendar className="mr-1 w-3 h-3" />
                                  {order.date}
                                </span>
                                <span className="flex items-center">
                                  <Package className="mr-1 w-3 h-3" />
                                  {order.items} items
                                </span>
                                <span>${order.total.toFixed(2)}</span>
                              </div>
                            </div>
                            <div className="flex items-center mt-3 sm:mt-0">
                              <span className={`px-2 py-1 text-xs rounded-full mr-3 ${
                                order.status === 'Delivered' 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-amber-100 text-amber-700'
                              }`}>
                                {order.status}
                              </span>
                              <div className="flex space-x-2">
                                <Link to={`/order-tracking?id=${order.id}`}>
                                  <Button size="sm" variant="outline">
                                    Track
                                  </Button>
                                </Link>
                                <Button size="sm" variant="ghost">
                                  <Download className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-12">
                          <Package className="mx-auto h-12 w-12 text-gray-400" />
                          <h3 className="mt-2 text-lg font-medium text-gray-900">No orders yet</h3>
                          <p className="mt-1 text-gray-500">When you place your first order, it will appear here.</p>
                          <div className="mt-6">
                            <Link to="/products">
                              <Button>Start Shopping</Button>
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="prescriptions">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>My Prescriptions</CardTitle>
                      <CardDescription>Manage your prescriptions and refills</CardDescription>
                    </div>
                    <Link to="/prescription">
                      <Button size="sm">Upload New</Button>
                    </Link>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {prescriptions.length > 0 ? (
                        prescriptions.map((prescription) => (
                          <div key={prescription.id} className="p-4 border border-gray-100 rounded-lg">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                              <div>
                                <div className="flex items-center">
                                  <p className="font-medium">{prescription.medication}</p>
                                  <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                    {prescription.refills} refills left
                                  </span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-500 mt-2">
                                  <span className="flex items-center">
                                    <User className="mr-1 w-3 h-3" />
                                    {prescription.doctor}
                                  </span>
                                  <span className="flex items-center">
                                    <Calendar className="mr-1 w-3 h-3" />
                                    Prescribed: {prescription.date}
                                  </span>
                                  <span className="flex items-center">
                                    <Clock className="mr-1 w-3 h-3" />
                                    Expires: {prescription.expires}
                                  </span>
                                </div>
                              </div>
                              <div className="mt-3 sm:mt-0 flex space-x-2">
                                <Button size="sm" className="bg-nimocare-600 hover:bg-nimocare-700">
                                  Refill Now
                                </Button>
                                <Button size="sm" variant="outline">
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-12">
                          <FileText className="mx-auto h-12 w-12 text-gray-400" />
                          <h3 className="mt-2 text-lg font-medium text-gray-900">No prescriptions</h3>
                          <p className="mt-1 text-gray-500">You haven't uploaded any prescriptions yet.</p>
                          <div className="mt-6">
                            <Link to="/prescription">
                              <Button>Upload Prescription</Button>
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="wishlist">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>My Wishlist</CardTitle>
                      <CardDescription>Products you're interested in</CardDescription>
                    </div>
                    <Link to="/wishlist">
                      <Button variant="ghost" size="sm" className="text-nimocare-600">
                        View Full Wishlist
                        <ChevronRight className="ml-1 w-4 h-4" />
                      </Button>
                    </Link>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-6">
                      <Link to="/wishlist" className="text-nimocare-600 hover:underline">
                        View your wishlist
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="addresses">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Saved Addresses</CardTitle>
                      <CardDescription>Manage your shipping addresses</CardDescription>
                    </div>
                    <Button size="sm">Add New</Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {addresses.map((address) => (
                        <div key={address.id} className="p-4 border border-gray-100 rounded-lg">
                          <div className="flex justify-between mb-2">
                            <div className="flex items-center">
                              <p className="font-medium">{address.name}</p>
                              {address.isDefault && (
                                <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                            <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                              {address.type}
                            </span>
                          </div>
                          <p className="text-gray-600">{address.address}</p>
                          <p className="text-gray-600">{address.city}, {address.state} {address.zip}</p>
                          <p className="text-gray-600 mt-1">{address.phone}</p>
                          <div className="mt-3 flex justify-end space-x-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            {!address.isDefault && (
                              <Button variant="outline" size="sm">
                                Set as Default
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="payments">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Payment Methods</CardTitle>
                      <CardDescription>Manage your payment options</CardDescription>
                    </div>
                    <Button size="sm">Add New</Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {paymentMethods.map((payment) => (
                        <div key={payment.id} className="p-4 border border-gray-100 rounded-lg">
                          <div className="flex justify-between mb-2">
                            <div className="flex items-center">
                              <p className="font-medium">{payment.cardType} •••• {payment.last4}</p>
                              {payment.isDefault && (
                                <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="text-gray-600">Expires: {payment.expiry}</p>
                          <div className="mt-3 flex justify-end space-x-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            {!payment.isDefault && (
                              <Button variant="outline" size="sm">
                                Set as Default
                              </Button>
                            )}
                            <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50">
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CustomerDashboard;
