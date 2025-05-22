
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';
import { useProducts } from '@/contexts/ProductContext';

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
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const { products, loading } = useProducts();
  
  // Load products based on active category
  useEffect(() => {
    if (loading) return;
    
    let filtered = [...products];
    if (activeCategory !== "All") {
      filtered = products.filter(product => 
        product.category === activeCategory ||
        (activeCategory === "Bestsellers" && product.isBestseller)
      );
    }
    
    // Sort by newest first
    filtered = filtered.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    // Limit to 8 products for display
    setFilteredProducts(filtered.slice(0, 8));
  }, [activeCategory, products, loading]);

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
              Our Products
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
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
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
              {loading ? "Loading products..." : "No products available for this category yet."}
            </motion.p>
            {!loading && (
              <Link to="/seller" className="inline-block px-4 py-2 bg-nimocare-600 text-white rounded-md hover:bg-nimocare-700 transition-colors">
                Add Products
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
