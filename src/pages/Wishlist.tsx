
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Heart, ShoppingCart, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Sample wishlist data
const initialWishlistItems = [
  {
    id: 1,
    name: "Paracetamol 500mg Tablets",
    image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=400&auto=format&fit=crop",
    price: 9.99,
    inStock: true,
    isPrescriptionRequired: false
  },
  {
    id: 3,
    name: "Amoxicillin 500mg Capsules",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=400&auto=format&fit=crop",
    price: 19.99,
    inStock: true,
    isPrescriptionRequired: true
  },
  {
    id: 4,
    name: "Omega-3 Fish Oil Softgels",
    image: "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?q=80&w=400&auto=format&fit=crop",
    price: 12.99,
    inStock: false,
    isPrescriptionRequired: false
  }
];

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);
  
  const removeFromWishlist = (id: number) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== id));
    toast.success("Item removed from wishlist");
  };
  
  const addToCart = (id: number, name: string) => {
    // In a real app, this would add to cart
    toast.success(`${name} added to cart`);
  };
  
  const addAllToCart = () => {
    const inStockItems = wishlistItems.filter(item => item.inStock);
    if (inStockItems.length === 0) {
      toast.error("No items in stock to add to cart");
      return;
    }
    toast.success(`${inStockItems.length} items added to cart`);
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
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-900 mb-1">
                              <Link 
                                to={`/product/${item.id}`}
                                className="hover:text-nimocare-600 transition-colors"
                              >
                                {item.name}
                              </Link>
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              ${item.price.toFixed(2)}
                            </p>
                            
                            {item.isPrescriptionRequired && (
                              <div className="flex items-center text-xs text-amber-600 mb-2">
                                <span>Prescription required</span>
                              </div>
                            )}
                            
                            <div className="mb-3">
                              {item.inStock ? (
                                <span className="text-xs text-green-600">In Stock</span>
                              ) : (
                                <span className="text-xs text-red-600">Out of Stock</span>
                              )}
                            </div>
                          </div>
                          
                          <button 
                            onClick={() => removeFromWishlist(item.id)}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                            aria-label="Remove from wishlist"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => addToCart(item.id, item.name)}
                            disabled={!item.inStock}
                            className="bg-nimocare-600 hover:bg-nimocare-700 text-white"
                            size="sm"
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add to Cart
                          </Button>
                          
                          <Button
                            onClick={() => removeFromWishlist(item.id)}
                            variant="outline"
                            size="sm"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Link to="/products">
                  <Button variant="outline" className="bg-white">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        ) : (
          <section className="py-20">
            <div className="container-custom">
              <div className="text-center max-w-md mx-auto">
                <div className="bg-nimocare-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-10 h-10 text-nimocare-600" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Your Wishlist is Empty</h2>
                <p className="text-gray-600 mb-8">
                  Add items you like to your wishlist and they'll appear here.
                </p>
                
                <Link 
                  to="/products" 
                  className="btn-primary inline-flex items-center"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Browse Products
                </Link>
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
