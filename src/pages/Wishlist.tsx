
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Heart, ShoppingCart, Trash2, Info, ExternalLink } from 'lucide-react'; // Replaced X with Info, added ExternalLink
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Product } from '@/contexts/ProductContext'; // Assuming Product type can be imported
import { useCart } from '@/contexts/CartContext'; // To use actual addToCart

// Sample wishlist data - ideally this would come from a context/localStorage
// For now, ensuring its structure aligns with Product interface as much as possible
const initialWishlistItems: (Omit<Product, 'id' | 'rating' | 'createdAt' | 'sellerId' | 'stock'> & { id: number, stock?: number })[] = [ // Made it more Product like
  // Simulating product structure. Real integration would use full Product objects.
  {
    id: 1,
    name: "Paracetamol 500mg Tablets",
    image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=400&auto=format&fit=crop",
    price: 9.99,
    stock: 100, // Assuming inStock is derived from stock > 0
    isPrescriptionRequired: false,
    description: "Effective pain and fever relief.", // Added for Product type
    category: "Pain Relief", // Added for Product type
    oldPrice: null, // Added for Product type
    discount: null, // Added for Product type
    isBestseller: false, // Added for Product type
  },
  {
    id: 3,
    name: "Amoxicillin 500mg Capsules",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=400&auto=format&fit=crop",
    price: 19.99,
    stock: 50,
    isPrescriptionRequired: true,
    description: "Broad-spectrum antibiotic.",
    category: "Antibiotics",
    oldPrice: null,
    discount: null,
    isBestseller: true,
  },
  {
    id: 4,
    name: "Omega-3 Fish Oil Softgels",
    image: "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?q=80&w=400&auto=format&fit=crop",
    price: 12.99,
    stock: 0, // Out of stock
    isPrescriptionRequired: false,
    description: "Supports heart and brain health.",
    category: "Vitamins & Supplements",
    oldPrice: 15.99,
    discount: 19,
    isBestseller: false,
  }
];

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems.map(item => ({
    ...item,
    // Ensure structure matches Product for CartContext, even if some fields are null/default
    id: item.id, // already number
    rating: 4.0, // default
    createdAt: new Date().toISOString(), // default
    sellerId: 'seller-mock', // default
  } as Product))); // Cast to Product to satisfy CartContext, some fields are mocked
  
  const { addToCart: addItemToCartContext } = useCart();

  const removeFromWishlist = (productId: number) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
    toast.success("Item removed from wishlist");
  };
  
  const handleAddToCart = (product: Product) => {
    if (!product.stock || product.stock <= 0) {
      toast.error(`${product.name} is out of stock.`);
      return;
    }
    addItemToCartContext(product, 1); // Using actual CartContext addToCart
    // toast is already shown by CartContext
  };
  
  const handleAddAllToCart = () => {
    const inStockItems = wishlistItems.filter(item => item.stock && item.stock > 0);
    if (inStockItems.length === 0) {
      toast.error("No in-stock items to add to cart from wishlist.");
      return;
    }
    inStockItems.forEach(item => addItemToCartContext(item, 1));
    // Toast for individual items is handled by CartContext. 
    // A summary toast might be too noisy if CartContext already provides feedback.
    // For now, let individual toasts from CartContext suffice.
    // If a summary toast is desired:
    toast.info(`Added ${inStockItems.length} in-stock item(s) to cart.`);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Header */}
        <section className="bg-nimocare-50/50 py-10 md:py-16">
          <div className="container-custom">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">My Wishlist</h1>
            <p className="text-lg text-gray-600">
              {wishlistItems.length > 0 
                ? `You have ${wishlistItems.length} item${wishlistItems.length !== 1 ? 's' : ''} in your wishlist.`
                : "Your wishlist is empty."}
            </p>
          </div>
        </section>
        
        {wishlistItems.length > 0 ? (
          <section className="py-10">
            <div className="container-custom">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 flex justify-between items-center border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900">Saved Items</h2>
                  <Button 
                    onClick={addAllToCart}
                    variant="outline"
                    className="text-nimocare-600 border-nimocare-200 hover:bg-nimocare-50"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add All to Cart
                  </Button>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="p-6 flex flex-col sm:flex-row items-start gap-4">
                      <div className="w-full sm:w-24 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-gray-800 group-hover:text-nimocare-700 transition-colors">
                            {item.name}
                          </h3>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => removeFromWishlist(item.id)}
                            className="text-gray-400 hover:text-red-500 hover:bg-red-50 w-8 h-8"
                            aria-label="Remove from wishlist"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <p className="text-lg font-semibold text-gray-900 mb-2">
                          ${item.price.toFixed(2)}
                          {item.oldPrice && (
                            <span className="ml-2 text-sm text-gray-400 line-through">
                              ${item.oldPrice.toFixed(2)}
                            </span>
                          )}
                        </p>
                        
                        {item.isPrescriptionRequired && (
                          <div className="mb-2">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              <Info className="w-3 h-3 mr-1" />
                              Prescription Required
                            </span>
                          </div>
                        )}
                        
                        <div className="mb-3">
                          {(item.stock && item.stock > 0) ? (
                            <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">In Stock</span>
                          ) : (
                            <span className="text-xs font-medium text-red-700 bg-red-100 px-2 py-0.5 rounded-full">Out of Stock</span>
                          )}
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                          <Button
                            onClick={() => handleAddToCart(item)}
                            disabled={!item.stock || item.stock <= 0}
                            className="bg-nimocare-600 hover:bg-nimocare-700 text-white flex-grow sm:flex-none"
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add to Cart
                          </Button>
                          <Button variant="outline" asChild className="flex-grow sm:flex-none">
                            <Link to={`/product/${item.id}`}>
                              <ExternalLink className="w-4 h-4 mr-2" />
                              View Product
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Button variant="outline" asChild className="bg-white">
                  <Link to="/products">
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        ) : (
          // Enhanced Empty State (already good, minor consistency tweaks)
          <section className="py-20">
            <div className="container-custom">
              <div className="text-center max-w-md mx-auto">
                <div className="bg-nimocare-50 text-nimocare-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-12 h-12" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Your Wishlist is Empty</h2>
                <p className="text-gray-600 mb-8">
                  Looks like you haven't added any items to your wishlist yet. Click the heart icon on products you love!
                </p>
                
                <Button asChild className="btn-primary">
                  <Link to="/products" >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Browse Products
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Wishlist;
