
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';

// Categories for tabbed navigation
const categories = [
  "All",
  "Bestsellers",
  "Vitamins & Supplements",
  "Antibiotics",
  "Pain Relief",
  "Skin Care"
];

// Sample product data
const sampleProducts = [
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
  }
];

const FeaturedProducts = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState([]);
  
  // Load products based on active category
  useEffect(() => {
    // In a real app, this would be fetched from a backend API
    // For now, we'll filter the sample products based on the selected category
    let filtered = [...sampleProducts];
    if (activeCategory !== "All") {
      filtered = sampleProducts.filter(product => 
        product.category === activeCategory ||
        (activeCategory === "Bestsellers" && product.isBestseller)
      );
    }
    
    setProducts(filtered);
  }, [activeCategory]);

  return (
    <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <motion.span 
              className="inline-block bg-nimocare-100 text-nimocare-600 px-3 py-1 rounded-full text-sm font-medium mb-3"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Featured Products
            </motion.span>
            <motion.h2 
              className="header-2 text-gray-900"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Most Popular Medicines
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/products" className="btn-text flex items-center space-x-1 mt-4 md:mt-0 group">
              <span>View All Products</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Category tabs */}
        <motion.div 
          className="overflow-x-auto pb-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex space-x-2 min-w-max">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === category
                    ? "bg-nimocare-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -2 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        {/* Products grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-gray-600 mb-4"
            >
              No products available for this category.
            </motion.p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
