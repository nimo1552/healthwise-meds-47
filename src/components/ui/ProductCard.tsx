
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Button } from './button';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/contexts/ProductContext';

// Update interface to include createdAt which is required by Product type
interface ProductCardProps {
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
  stock?: number;
  createdAt: string; // Add the missing required property
}

const ProductCard = (props: ProductCardProps) => {
  const {
    id,
    name,
    image,
    price,
    oldPrice,
    discount,
    rating,
    isPrescriptionRequired,
    isBestseller,
  } = props;

  const [isWishlist, setIsWishlist] = useState(false);
  const { addToCart } = useCart();
  
  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlist(!isWishlist);
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(props, 1);
  };
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md relative h-full flex flex-col"
    >
      {discount && discount > 0 && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium z-10">
          {discount}% OFF
        </div>
      )}
      
      {isBestseller && (
        <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full font-medium z-10">
          Bestseller
        </div>
      )}
      
      <Link to={`/product/${id}`} className="flex flex-col h-full">
        <div className="relative pt-[100%] bg-gray-50">
          <img 
            src={image} 
            alt={name} 
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center ${
              isWishlist ? 'bg-pink-100' : 'bg-white shadow-sm'
            }`}
            onClick={handleToggleWishlist}
          >
            <Heart className={`w-4 h-4 ${isWishlist ? 'fill-pink-500 text-pink-500' : 'text-gray-600'}`} />
          </motion.button>
        </div>
        
        <div className="p-4 flex-grow flex flex-col">
          <div className="mb-1 flex items-center">
            <div className="flex text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < Math.floor(rating) ? 'fill-current' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="ml-1 text-xs text-gray-500">{rating}</span>
          </div>
          
          <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">{name}</h3>
          
          {isPrescriptionRequired && (
            <span className="text-xs text-blue-600 bg-blue-50 rounded-full px-2 py-0.5 inline-block mb-2 w-fit">
              Prescription Required
            </span>
          )}
          
          <div className="mt-auto">
            <div className="flex items-end">
              <span className="text-lg font-semibold">${price.toFixed(2)}</span>
              {oldPrice && (
                <span className="ml-2 text-sm text-gray-400 line-through">${oldPrice.toFixed(2)}</span>
              )}
            </div>
            
            <Button 
              className="mt-3 w-full bg-nimocare-600 hover:bg-nimocare-700 text-white"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
