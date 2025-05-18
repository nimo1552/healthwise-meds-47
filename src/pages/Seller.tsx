
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, CardContent
} from "@/components/ui/card";
import ProductForm from '@/components/seller/ProductForm';
import { useProducts } from '@/contexts/ProductContext';
import { Button } from '@/components/ui/button';
import { Edit, Trash, Package } from 'lucide-react';
import { toast } from 'sonner';

const Seller = () => {
  const { products, deleteProduct } = useProducts();
  // This would be filtered by seller ID in a real app
  const sellerProducts = products; 
  
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
                <div className="lg:col-span-1">
                  <ProductForm />
                </div>
                
                <div className="lg:col-span-2">
                  <Card>
                    <CardContent className="pt-6">
                      <h2 className="text-xl font-semibold mb-4">Your Products</h2>
                      
                      {sellerProducts.length > 0 ? (
                        <div className="space-y-4">
                          {sellerProducts.map(product => (
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
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-red-600 hover:text-red-700"
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
              <Card>
                <CardContent className="py-6">
                  <h2 className="text-xl font-semibold mb-4">Orders</h2>
                  <p className="text-gray-500">You don't have any orders yet.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analytics">
              <Card>
                <CardContent className="py-6">
                  <h2 className="text-xl font-semibold mb-4">Analytics</h2>
                  <p className="text-gray-500">Analytics data will be available once you have sales.</p>
                </CardContent>
              </Card>
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
