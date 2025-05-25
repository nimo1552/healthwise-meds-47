
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ui/ProductCard';
import RecentlyViewedProducts from '@/components/products/RecentlyViewedProducts';
import { Search, Filter, ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ContentSkeleton } from '@/components/ui/ContentSkeleton';
import { SearchRecommendations } from '@/components/ui/SearchRecommendations';
import { useProducts } from '@/contexts/ProductContext';
import { Link } from 'react-router-dom';

// Filter options
const categories = [
  "All Categories",
  "Pain Relief",
  "Vitamins & Supplements",
  "Antibiotics",
  "Skin Care",
  "Allergy Relief",
  "Diabetes Care",
  "Devices",
  "Baby Care"
];

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "relevance", label: "Most Relevant" }
];

const Products = () => {
  const { products, loading: productsLoading } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("newest");
  const [showPrescriptionOnly, setShowPrescriptionOnly] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Calculate max price for range slider
  useEffect(() => {
    if (products.length > 0) {
      const maxPrice = Math.max(...products.map(p => p.price)) + 50; // Add buffer
      setPriceRange([0, Math.min(maxPrice, 1000)]);
    }
  }, [products]);
  
  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter and sort products
  const filteredProducts = products.filter(product => {
    const trimmedSearchQuery = searchQuery.trim().toLowerCase();
    const matchesSearch = trimmedSearchQuery === "" || 
                          product.name.toLowerCase().includes(trimmedSearchQuery) || 
                          product.description.toLowerCase().includes(trimmedSearchQuery) ||
                          (product.category && product.category.toLowerCase().includes(trimmedSearchQuery)); // Added category search
    const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory;
    const matchesPrescription = !showPrescriptionOnly || product.isPrescriptionRequired;
    const matchesPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrescription && matchesPriceRange;
  }).sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        // Relevance or any other case
        return 0;
    }
  });
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowRecommendations(false);
  };
  
  const handleSearchFocus = () => {
    setShowRecommendations(true);
  };

  const handleSelectRecommendation = (selected: string) => {
    setSearchQuery(selected);
    setShowRecommendations(false);
  };
  
  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Categories");
    setSortBy("newest");
    setShowPrescriptionOnly(false);
    setPriceRange([0, 1000]);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Header */}
        <section className="bg-nimocare-50/50 py-8 md:py-12">
          <div className="container-custom">
            <motion.h1 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Products
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-gray-600 max-w-2xl"
            >
              Browse our wide range of pharmaceutical products and health supplements.
            </motion.p>
          </div>
        </section>
        
        {/* Recently Viewed Products */}
        {!isLoading && <RecentlyViewedProducts />}
        
        {/* Filters and Search */}
        <section className="py-6 border-b border-gray-200">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="relative max-w-md w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={handleSearchFocus}
                  placeholder="Search products..."
                  className="w-full py-2 pl-10 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:border-nimocare-400 transition-colors" // Added pr-10 for X button
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
                
                {/* Search recommendations */}
                <div className="absolute mt-1 w-full z-20">
                  <SearchRecommendations 
                    query={searchQuery}
                    onSelect={handleSelectRecommendation}
                    isVisible={showRecommendations}
                    onClose={() => setShowRecommendations(false)}
                  />
                </div>
              </form>
              
              <div className="flex flex-wrap gap-3 items-center">
                {/* Sort dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:border-nimocare-400 transition-colors text-sm"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>
                
                {/* Filter button */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-1 bg-white border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors text-sm"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                  {showPrescriptionOnly && (
                    <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-nimocare-100 text-xs font-medium text-nimocare-600">
                      Rx
                    </span>
                  )}
                </button>
                
                {/* Clear filters */}
                {(searchQuery || selectedCategory !== "All Categories" || sortBy !== "newest" || showPrescriptionOnly || priceRange[0] > 0 || priceRange[1] < 1000) && (
                  <button
                    onClick={handleClearFilters}
                    className="flex items-center space-x-1 text-nimocare-600 hover:text-nimocare-800 transition-colors text-sm"
                  >
                    <X className="w-4 h-4" />
                    <span>Clear Filters</span>
                  </button>
                )}
              </div>
            </div>
            
            {/* Expanded Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-white grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Categories */}
                    <div>
                      <h3 className="font-medium mb-3 text-gray-900">Categories</h3>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <label key={category} className="flex items-center">
                            <input
                              type="radio"
                              checked={selectedCategory === category}
                              onChange={() => setSelectedCategory(category)}
                              className="w-4 h-4 text-nimocare-600 border-gray-300 focus:ring-nimocare-500"
                            />
                            <span className="ml-2 text-gray-700 text-sm">{category}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    {/* Price Range */}
                    <div>
                      <h3 className="font-medium mb-3 text-gray-900">Price Range</h3>
                      <div className="px-2">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="1000"
                          step="5"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-nimocare-600"
                        />
                      </div>
                    </div>
                    
                    {/* Other Filters */}
                    <div>
                      <h3 className="font-medium mb-3 text-gray-900">Other Filters</h3>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={showPrescriptionOnly}
                            onChange={() => setShowPrescriptionOnly(!showPrescriptionOnly)}
                            className="w-4 h-4 text-nimocare-600 border-gray-300 rounded focus:ring-nimocare-500"
                          />
                          <span className="ml-2 text-gray-700 text-sm">Prescription Required Only</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
        
        {/* Product Grid */}
        <section className="py-10">
          <div className="container-custom">
            {isLoading || productsLoading ? (
              <div className="animate-fade-in">
                <ContentSkeleton type="card" count={8} />
              </div>
            ) : filteredProducts.length > 0 ? (
              <>
                <p className="text-gray-600 mb-6">{filteredProducts.length} products found</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.4,
                        delay: index * 0.05,
                        ease: [0.25, 0.1, 0.25, 1.0]
                      }}
                    >
                      <ProductCard key={product.id} {...product} />
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mb-4 text-nimocare-400"
                >
                  <Search className="w-12 h-12 mx-auto" />
                </motion.div>
                <motion.h3 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-xl font-medium text-gray-900 mb-2"
                >
                  No products found
                </motion.h3>
                <motion.p
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-gray-600 mb-4"
                >
                  We couldn't find any products matching your current filters or search query.
                </motion.p>
                <button 
                  onClick={handleClearFilters} 
                  className="inline-block px-4 py-2 bg-nimocare-600 text-white rounded-md hover:bg-nimocare-700 transition-colors"
                >
                  Clear Filters / Reset Search
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
