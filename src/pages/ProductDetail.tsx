import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Star, ShieldCheck, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useProducts } from '@/contexts/ProductContext';
import { useCart } from '@/contexts/CartContext';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Get product from context
  const product = id ? getProductById(parseInt(id)) : undefined;
  
  useEffect(() => {
    if (product) {
      // Simulate loading state
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      
      return () => clearTimeout(timer);
    } else if (id) {
      // No product found with this ID
      toast.error('Product not found');
      navigate('/products');
    }
  }, [id, product, navigate]);
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  const handleToggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
    toast.success(isInWishlist ? 'Removed from wishlist' : 'Added to wishlist');
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-grow pt-20 flex items-center justify-center">
          <LoadingSpinner />
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!product) return null;
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="container-custom py-8">
          <motion.button 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => navigate(-1)} 
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span>Back</span>
          </motion.button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="bg-gray-50 rounded-xl overflow-hidden aspect-square">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {product.discount && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-sm px-2 py-1 rounded font-medium">
                  {product.discount}% OFF
                </div>
              )}
            </motion.div>
            
            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col"
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">{product.rating} ({Math.floor(Math.random() * 500) + 50} reviews)</span>
              </div>
              
              <div className="flex items-center mb-6">
                <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                {product.oldPrice && (
                  <span className="ml-3 text-lg text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>
                )}
                
                {product.isPrescriptionRequired && (
                  <span className="ml-auto px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    Prescription Required
                  </span>
                )}
              </div>
              
              <p className="text-gray-600 mb-6">{product.description}</p>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Available Stock</h3>
                <div className="px-4 py-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-green-800 font-medium">{product.stock ? product.stock : "In Stock"}</span>
                    <ShieldCheck className="text-green-700" size={20} />
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Quantity</h3>
                <div className="flex">
                  <button 
                    className="w-10 h-10 border border-gray-300 rounded-l-lg flex items-center justify-center text-gray-700 hover:bg-gray-100"
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    min="1" 
                    value={quantity} 
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-16 h-10 border-t border-b border-gray-300 text-center focus:outline-none"
                  />
                  <button 
                    className="w-10 h-10 border border-gray-300 rounded-r-lg flex items-center justify-center text-gray-700 hover:bg-gray-100"
                    onClick={() => setQuantity(prev => prev + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 mt-auto">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 btn-primary"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  onClick={handleToggleWishlist}
                  className={`px-4 ${isInWishlist ? 'bg-pink-50 text-pink-600 border-pink-300' : ''}`}
                >
                  <Heart
                    className={`h-5 w-5 ${isInWishlist ? 'fill-pink-500 text-pink-500' : ''}`}
                  />
                </Button>
              </div>
              
              <div className="mt-6 flex flex-col gap-2">
                <div className="flex items-center text-sm text-gray-500">
                  <ShieldCheck className="w-4 h-4 mr-2 text-green-600" />
                  <span>Free delivery on orders over $50</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <ShieldCheck className="w-4 h-4 mr-2 text-green-600" />
                  <span>Authentic products guaranteed</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
