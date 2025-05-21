
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

// Define the product type
export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  oldPrice: number | null;
  discount: number | null;
  rating: number;
  isPrescriptionRequired: boolean;
  description: string;
  category: string;
  isBestseller?: boolean;
  sellerId?: string;
  stock?: number;
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
  getProductById: (id: number) => Product | undefined;
  featuredProducts: Product[];
  bestsellerProducts: Product[];
  loading: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load from localStorage if available, otherwise use empty array
    const storedProducts = localStorage.getItem('pharmacy-products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts([]);
    }
    setLoading(false);
  }, []);

  // Save to localStorage whenever products change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('pharmacy-products', JSON.stringify(products));
    }
  }, [products, loading]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    // Generate a new ID (in a real app, this would come from the backend)
    const newId = products.length > 0 
      ? Math.max(...products.map(p => p.id)) + 1 
      : 1;
    
    const newProduct = { ...product, id: newId };
    
    setProducts(prev => [...prev, newProduct]);
    toast.success("Product added successfully");
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => 
      prev.map(product => product.id === updatedProduct.id ? updatedProduct : product)
    );
    toast.success("Product updated successfully");
  };

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(product => product.id !== id));
    toast.success("Product deleted successfully");
  };

  const getProductById = (id: number) => {
    return products.find(product => product.id === id);
  };

  // Derived states
  const featuredProducts = products.slice(0, 4); // First 4 products as featured
  const bestsellerProducts = products.filter(product => product.isBestseller);

  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      getProductById,
      featuredProducts,
      bestsellerProducts,
      loading
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
