
// ProductContext.tsx
// This context manages product data client-side using localStorage for simulation purposes.
// In a real application, this would typically interact with a backend API.
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
  createdAt: string;
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
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

  // useEffect hook to load products from localStorage on initial component mount.
  useEffect(() => {
    // Load from localStorage if available, otherwise use empty array
    const storedProducts = localStorage.getItem('pharmacy-products');
    if (storedProducts) {
      try {
        const parsedProducts = JSON.parse(storedProducts);
        if (Array.isArray(parsedProducts)) {
          setProducts(parsedProducts);
        } else {
          // Handle cases where localStorage might contain non-array data under this key
          console.warn("Products data from localStorage was not an array, initializing as empty.");
          setProducts([]);
        }
      } catch (error) {
        console.error("Failed to parse products from localStorage:", error);
        setProducts([]); // Initialize with empty array on parsing error
      }
    } else {
      // Initialize with empty array if no data in localStorage
      setProducts([]);
    }
    setLoading(false);
  }, []);

  // useEffect hook to save products to localStorage whenever the products state changes.
  // This ensures data persistence across sessions on the client-side.
  useEffect(() => {
    if (!loading) { // Avoid saving during initial load before products are settled
      localStorage.setItem('pharmacy-products', JSON.stringify(products));
      // console.log('Products saved to localStorage:', products.length); // Useful for debugging
    }
  }, [products, loading]);

  const addProduct = (product: Omit<Product, 'id' | 'createdAt'>) => {
    // Client-side ID generation: In a real application, the backend would generate IDs.
    // This approach is for simulation and simplicity.
    const newId = products.length > 0 
      ? Math.max(...products.map(p => p.id)) + 1 
      : 1;
    
    // Client-side timestamp generation
    const createdAt = new Date().toISOString();
    
    const newProduct = { ...product, id: newId, createdAt };
    
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

  // Derived states - sorted by most recent first
  const featuredProducts = [...products].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 4);
  
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
