
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';

// Get recently viewed products from localStorage
const getRecentlyViewedProducts = () => {
  if (typeof window === 'undefined') return [];
  
  try {
    const recentlyViewed = localStorage.getItem('recentlyViewedProducts');
    return recentlyViewed ? JSON.parse(recentlyViewed) : [];
  } catch (error) {
    console.error('Error retrieving recently viewed products:', error);
    return [];
  }
};

const RecentlyViewedProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    setProducts(getRecentlyViewedProducts().slice(0, 6));
  }, []);

  // If no products, don't render anything
  if (products.length === 0) return null;

  const handleScrollLeft = () => {
    const container = document.getElementById('recently-viewed-container');
    if (container) {
      const newPosition = Math.max(scrollPosition - 300, 0);
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  const handleScrollRight = () => {
    const container = document.getElementById('recently-viewed-container');
    if (container) {
      const newPosition = scrollPosition + 300;
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  return (
    <section className="py-8 border-b border-gray-200">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recently Viewed</h2>
          <div className="flex space-x-2">
            <button 
              onClick={handleScrollLeft}
              className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={handleScrollRight}
              className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div 
          id="recently-viewed-container"
          className="flex overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 space-x-6 scroll-smooth snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div key={product.id} className="min-w-[250px] max-w-[250px] snap-start">
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewedProducts;
