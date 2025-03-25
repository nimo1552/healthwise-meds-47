
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ui/ProductCard';
import RecentlyViewedProducts from '@/components/products/RecentlyViewedProducts';
import { Search, Filter, ChevronDown, X } from 'lucide-react';

// Sample product data
const allProducts = [
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
    isBestseller: true
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
    category: "Vitamins & Supplements"
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
    category: "Antibiotics"
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
    category: "Vitamins & Supplements"
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
    category: "Skin Care"
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
    category: "Pain Relief"
  },
  {
    id: 7,
    name: "Cetirizine 10mg Tablets",
    image: "https://images.unsplash.com/photo-1550170081-7d6e5629c6b6?q=80&w=400&auto=format&fit=crop",
    price: 11.99,
    oldPrice: null,
    discount: null,
    rating: 4.4,
    isPrescriptionRequired: false,
    description: "Antihistamine for relieving allergy symptoms like sneezing and itching.",
    category: "Allergy Relief"
  },
  {
    id: 8,
    name: "Metformin 500mg Tablets",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=400&auto=format&fit=crop",
    price: 15.99,
    oldPrice: 18.99,
    discount: 16,
    rating: 4.7,
    isPrescriptionRequired: true,
    description: "Oral medication used to control blood sugar levels in type 2 diabetes.",
    category: "Diabetes Care"
  }
];

// Filter options
const categories = [
  "All Categories",
  "Pain Relief",
  "Vitamins & Supplements",
  "Antibiotics",
  "Skin Care",
  "Allergy Relief",
  "Diabetes Care"
];

const sortOptions = [
  { value: "relevance", label: "Most Relevant" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest First" }
];

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("relevance");
  const [showPrescriptionOnly, setShowPrescriptionOnly] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter and sort products
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
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
        // In a real app, you'd sort by date added
        return 0;
      default:
        // Relevance or any other case
        return 0;
    }
  });
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };
  
  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Categories");
    setSortBy("relevance");
    setShowPrescriptionOnly(false);
    setPriceRange([0, 50]);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Header */}
        <section className="bg-nimocare-50/50 py-10 md:py-16">
          <div className="container-custom">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Products</h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Browse our wide range of pharmaceutical products and health supplements.
            </p>
          </div>
        </section>
        
        {/* Recently Viewed Products */}
        <RecentlyViewedProducts />
        
        {/* Filters and Search */}
        <section className="py-8 border-b border-gray-200">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="relative max-w-md w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full py-2 pl-10 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:border-nimocare-400 transition-colors"
                />
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
                </button>
                
                {/* Clear filters */}
                {(searchQuery || selectedCategory !== "All Categories" || sortBy !== "relevance" || showPrescriptionOnly || priceRange[0] > 0 || priceRange[1] < 50) && (
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
            {showFilters && (
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
                      max="50"
                      step="5"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
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
            )}
          </div>
        </section>
        
        {/* Product Grid */}
        <section className="py-10">
          <div className="container-custom">
            {filteredProducts.length > 0 ? (
              <>
                <p className="text-gray-600 mb-6">{filteredProducts.length} products found</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <div className="mb-4 text-nimocare-400">
                  <Search className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or filter criteria to find what you're looking for.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="btn-primary"
                >
                  Clear All Filters
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
