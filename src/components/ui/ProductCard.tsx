
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  rating: number;
  isPrescriptionRequired: boolean;
  description: string;
  isBestseller?: boolean;
}

const ProductCard = ({
  id,
  name,
  image,
  price,
  oldPrice,
  discount,
  rating,
  isPrescriptionRequired,
  description,
  isBestseller = false
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add to cart logic here
    console.log(`Added ${name} to cart`);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  // Generate star rating display
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#D1D5DB" />
            </linearGradient>
          </defs>
          <path fill="url(#half-gradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      );
    }

    // Add empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      );
    }

    return stars;
  };

  return (
    <Link 
      to={`/product/${id}`}
      className={cn(
        "relative flex flex-col bg-white rounded-xl overflow-hidden shadow-soft transition-all duration-300",
        isHovered ? "shadow-medium -translate-y-1" : ""
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img 
          src={image} 
          alt={name} 
          className={cn(
            "object-cover w-full h-full transition-transform duration-400",
            isHovered ? "scale-105" : ""
          )} 
        />
        
        {/* Prescription badge */}
        {isPrescriptionRequired && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2 py-1 rounded-md text-xs font-medium flex items-center space-x-1 border border-gray-200">
            <AlertCircle className="w-3 h-3 text-nimocare-600" />
            <span className="text-gray-700">Rx Required</span>
          </div>
        )}
        
        {/* Bestseller badge */}
        {isBestseller && (
          <div className="absolute top-3 right-3 bg-nimocare-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
            Bestseller
          </div>
        )}
        
        {/* Favorite button */}
        <button
          onClick={handleToggleFavorite}
          className={cn(
            "absolute bottom-3 right-3 p-2 rounded-full transition-colors",
            isFavorite 
              ? "bg-red-50 text-red-500" 
              : "bg-white/80 backdrop-blur-xs text-gray-600 hover:text-gray-900"
          )}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={cn("w-5 h-5", isFavorite ? "fill-red-500" : "")} />
        </button>
        
        {/* Discount badge */}
        {discount && (
          <div className="absolute bottom-3 left-3 bg-nimocare-600 text-white px-2 py-1 rounded-md text-xs font-semibold">
            {discount}% OFF
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{name}</h3>
        
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{description}</p>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {renderStars()}
          </div>
          <span className="ml-1 text-xs text-gray-600">({rating})</span>
        </div>
        
        <div className="mt-auto pt-2 flex items-center justify-between">
          <div className="flex items-baseline">
            <span className="text-lg font-semibold text-gray-900">${price.toFixed(2)}</span>
            {oldPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">${oldPrice.toFixed(2)}</span>
            )}
          </div>
          
          <button
            onClick={handleAddToCart}
            className="p-2 rounded-full bg-nimocare-50 text-nimocare-600 hover:bg-nimocare-100 transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
