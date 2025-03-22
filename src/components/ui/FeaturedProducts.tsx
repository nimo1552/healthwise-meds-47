
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

// Sample product data
const featuredProducts = [
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
    description: "Supports bone health, immune function, and overall wellness."
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
    description: "Antibiotic used to treat bacterial infections."
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
    description: "Supports heart health, brain function, and reduces inflammation."
  }
];

// Categories for tabbed navigation
const categories = [
  "All",
  "Bestsellers",
  "Vitamins & Supplements",
  "Antibiotics",
  "Pain Relief",
  "Skin Care"
];

const FeaturedProducts = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  
  // Filter products based on active category (in a real app, this would be more sophisticated)
  const filteredProducts = featuredProducts;
  
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <span className="inline-block bg-nimocare-100 text-nimocare-600 px-3 py-1 rounded-full text-sm font-medium mb-3">
              Featured Products
            </span>
            <h2 className="header-2 text-gray-900">Most Popular Medicines</h2>
          </div>
          
          <Link to="/products" className="btn-text flex items-center space-x-1 mt-4 md:mt-0">
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        {/* Category tabs */}
        <div className="overflow-x-auto pb-4 mb-8">
          <div className="flex space-x-2 min-w-max">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === category
                    ? "bg-nimocare-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
