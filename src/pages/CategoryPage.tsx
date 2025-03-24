
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ui/ProductCard';
import { ArrowLeft, Filter, ChevronDown, X } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

// Define category data structure
interface CategoryInfo {
  id: number;
  name: string;
  description: string;
  icon: string;
  backgroundColor: string;
}

// Sample category data - matching with CategorySection
const categoryData: Record<string, CategoryInfo> = {
  "prescription": {
    id: 1,
    name: "Prescription Medicines",
    description: "Authorized medications requiring a valid prescription",
    icon: "💊",
    backgroundColor: "bg-blue-50"
  },
  "otc": {
    id: 2,
    name: "Over-the-Counter Drugs",
    description: "Medicines available without a prescription",
    icon: "🩹",
    backgroundColor: "bg-green-50"
  },
  "vitamins": {
    id: 3,
    name: "Vitamins & Supplements",
    description: "Essential nutrients for overall health and wellbeing",
    icon: "🍊",
    backgroundColor: "bg-orange-50"
  },
  "personal-care": {
    id: 4,
    name: "Personal Care",
    description: "Skincare, haircare, and personal hygiene products",
    icon: "🧴",
    backgroundColor: "bg-purple-50"
  },
  "devices": {
    id: 5,
    name: "Medical Devices",
    description: "Health monitoring and medical equipment",
    icon: "🩺",
    backgroundColor: "bg-red-50"
  },
  "baby-mother": {
    id: 6,
    name: "Baby & Mother Care",
    description: "Products for infants and new mothers",
    icon: "👶",
    backgroundColor: "bg-pink-50"
  }
};

// Sample product data - similar to Products.tsx
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
    category: "otc",
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
    category: "vitamins"
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
    category: "prescription"
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
    category: "vitamins"
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
    category: "personal-care"
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
    category: "otc"
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
    category: "devices"
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
    category: "baby-mother"
  },
  {
    id: 9,
    name: "Prenatal Multivitamin Tablets",
    image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=400&auto=format&fit=crop",
    price: 18.99,
    oldPrice: 22.99,
    discount: 17,
    rating: 4.7,
    isPrescriptionRequired: false,
    description: "Complete nutrition for expectant mothers",
    category: "baby-mother"
  },
  {
    id: 10,
    name: "Digital Thermometer",
    image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=400&auto=format&fit=crop",
    price: 15.99,
    oldPrice: null,
    discount: null,
    rating: 4.5,
    isPrescriptionRequired: false,
    description: "Fast and accurate temperature readings",
    category: "devices"
  }
];

const sortOptions = [
  { value: "relevance", label: "Most Relevant" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" }
];

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  
  const category = categoryId ? categoryData[categoryId] : null;
  
  useEffect(() => {
    // If category doesn't exist, show error toast and redirect to products page
    if (categoryId && !category) {
      toast.error("Category not found");
      navigate("/products");
    }
  }, [categoryId, category, navigate]);
  
  if (!category) {
    return null; // Don't render anything while redirecting
  }
  
  // Filter products by category and search query
  const filteredProducts = allProducts
    .filter(product => 
      product.category === categoryId && 
      (searchQuery === "" || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) &&
      product.price >= priceRange[0] && 
      product.price <= priceRange[1]
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };
  
  const handleClearFilters = () => {
    setSearchQuery("");
    setSortBy("relevance");
    setPriceRange([0, 100]);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Category Header */}
        <section className={`py-10 md:py-16 ${category.backgroundColor}`}>
          <div className="container-custom">
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              <span>Back</span>
            </button>
            
            <div className="flex items-center mb-4">
              <span className="text-4xl mr-4">{category.icon}</span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{category.name}</h1>
            </div>
            
            <p className="text-lg text-gray-600 max-w-2xl">
              {category.description}
            </p>
          </div>
        </section>
        
        {/* Filters and Search */}
        <section className="py-8 border-b border-gray-200">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="relative max-w-md w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search in ${category.name}...`}
                  className="w-full py-2 pl-4 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:border-nimocare-400 transition-colors"
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
                {(searchQuery || sortBy !== "relevance" || priceRange[0] > 0 || priceRange[1] < 100) && (
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
              <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-white grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      max="100"
                      step="5"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
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
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProductCard {...product} />
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <div className="mb-4 text-nimocare-400">
                  <X className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  We couldn't find any products matching your criteria in this category.
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

export default CategoryPage;
