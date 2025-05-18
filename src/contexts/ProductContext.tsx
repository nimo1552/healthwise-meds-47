
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

// Sample initial products
const initialProducts: Product[] = [
  {
    id: 1,
    name: "Paracetamol 500mg Tablets",
    image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=400&auto=format&fit=crop",
    price: 9.99,
    oldPrice: 12.99,
    discount: 23,
    rating: 4.8,
    isPrescriptionRequired: false,
    description: "Pain reliever and fever reducer for adults and children.",
    category: "Pain Relief",
    isBestseller: true,
    sellerId: "seller1",
    stock: 150
  },
  {
    id: 2,
    name: "Vitamin D3 5000IU Capsules",
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?q=80&w=400&auto=format&fit=crop",
    price: 14.99,
    oldPrice: null,
    discount: null,
    rating: 4.6,
    isPrescriptionRequired: false,
    description: "Supports bone health, immune function, and overall wellness.",
    category: "Vitamins & Supplements",
    sellerId: "seller2",
    stock: 200
  },
  {
    id: 3,
    name: "Amoxicillin 500mg Capsules",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=400&auto=format&fit=crop",
    price: 19.99,
    oldPrice: 25.99,
    discount: 23,
    rating: 4.5,
    isPrescriptionRequired: true,
    description: "Antibiotic used to treat bacterial infections.",
    category: "Antibiotics",
    sellerId: "seller3",
    stock: 50
  },
  {
    id: 4,
    name: "Omega-3 Fish Oil Softgels",
    image: "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?q=80&w=400&auto=format&fit=crop",
    price: 12.99,
    oldPrice: null,
    discount: null,
    rating: 4.7,
    isPrescriptionRequired: false,
    description: "Supports heart health, brain function, and reduces inflammation.",
    category: "Vitamins & Supplements",
    sellerId: "seller2",
    stock: 175
  },
  {
    id: 5,
    name: "Hydrocortisone Cream 1%",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400&auto=format&fit=crop",
    price: 8.99,
    oldPrice: null,
    discount: null,
    rating: 4.3,
    isPrescriptionRequired: false,
    description: "Temporarily relieves itching, redness, and swelling due to skin conditions.",
    category: "Skin Care",
    sellerId: "seller1",
    stock: 120
  },
  {
    id: 6,
    name: "Ibuprofen 200mg Tablets",
    image: "https://images.unsplash.com/photo-1550170081-7d6e5629c6b6?q=80&w=400&auto=format&fit=crop",
    price: 7.99,
    oldPrice: 9.99,
    discount: 20,
    rating: 4.6,
    isPrescriptionRequired: false,
    description: "Nonsteroidal anti-inflammatory for pain relief and reducing fever.",
    category: "Pain Relief",
    isBestseller: true,
    sellerId: "seller3",
    stock: 200
  },
  {
    id: 7,
    name: "Digital Blood Pressure Monitor",
    image: "https://images.unsplash.com/photo-1612771409641-97f10a5374e2?q=80&w=400&auto=format&fit=crop",
    price: 45.99,
    oldPrice: 59.99,
    discount: 23,
    rating: 4.8,
    isPrescriptionRequired: false,
    description: "Accurate blood pressure monitoring for home use",
    category: "Devices",
    sellerId: "seller4",
    stock: 35
  },
  {
    id: 8,
    name: "Baby Diaper Rash Cream",
    image: "https://images.unsplash.com/photo-1599217394824-e8d19c3a6776?q=80&w=400&auto=format&fit=crop",
    price: 12.99,
    oldPrice: null,
    discount: null,
    rating: 4.9,
    isPrescriptionRequired: false,
    description: "Gentle, protective formula for sensitive baby skin",
    category: "Baby Care",
    sellerId: "seller1",
    stock: 80
  }
];

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading products from API/database
    setTimeout(() => {
      // Load from localStorage if available, otherwise use initial data
      const storedProducts = localStorage.getItem('nimocare-products');
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      } else {
        setProducts(initialProducts);
      }
      setLoading(false);
    }, 800);
  }, []);

  // Save to localStorage whenever products change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('nimocare-products', JSON.stringify(products));
    }
  }, [products, loading]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    // Generate a new ID (in a real app, this would come from the backend)
    const newId = Math.max(0, ...products.map(p => p.id)) + 1;
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
