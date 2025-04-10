import { useState } from 'react';
import { ArrowRight, Search, Upload } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { SearchRecommendations } from '@/components/ui/SearchRecommendations';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showRecommendations, setShowRecommendations] = useState(false);
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowRecommendations(false);
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSearchFocus = () => {
    setShowRecommendations(true);
  };

  const handleSelectRecommendation = (selected: string) => {
    setSearchQuery(selected);
    setShowRecommendations(false);
    navigate(`/products?search=${encodeURIComponent(selected)}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <section className="pt-28 pb-20 md:pt-36 md:pb-28 relative overflow-hidden bg-gradient-to-br from-white via-nimocare-50/30 to-white">
      {/* Abstract shapes */}
      <motion.div 
        className="absolute -top-24 -right-24 w-96 h-96 bg-nimocare-200/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.5, 0.7, 0.5] 
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
      <motion.div 
        className="absolute top-1/2 -left-24 w-72 h-72 bg-nimocare-100/30 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          repeatType: "reverse", 
          delay: 2 
        }}
      />
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-64 bg-gradient-to-t from-nimocare-50/20 to-transparent"></div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Content */}
          <motion.div 
            className="order-2 lg:order-1"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="max-w-2xl mx-auto lg:mx-0">
              <motion.span 
                variants={itemVariants}
                className="inline-flex items-center gap-1.5 bg-nimocare-100 text-nimocare-600 px-3 py-1 rounded-full text-sm font-medium mb-6"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nimocare-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-nimocare-600"></span>
                </span>
                Trusted Online Pharmacy
              </motion.span>
              
              <motion.h1 
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              >
                Your Health, <span className="text-nimocare-600 relative">Delivered
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 358 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 10C70.3333 4.66667 283.667 -4.00001 356 10" stroke="#7FCDC3" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </span> With Care
              </motion.h1>
              
              <motion.p 
                variants={itemVariants}
                className="text-lg md:text-xl text-gray-600 mb-8"
              >
                Nimocare delivers prescription and over-the-counter medicines to your doorstep with eco-friendly practices. Fast, reliable, and secure.
              </motion.p>
              
              {/* Search form */}
              <motion.form 
                variants={itemVariants}
                onSubmit={handleSearch} 
                className="relative mb-8 max-w-md"
              >
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={handleSearchFocus}
                    placeholder="Search for medicines, health products..."
                    className="w-full py-6 pl-12 pr-36 bg-white border border-gray-200 rounded-full shadow-sm focus:border-nimocare-400"
                  />
                  <button 
                    type="submit" 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-nimocare-600 text-white rounded-full px-6 py-2 text-sm font-medium hover:bg-nimocare-700 transition-colors"
                  >
                    Search
                  </button>

                  {/* Search recommendations */}
                  <div className="absolute mt-2 w-full z-20">
                    <SearchRecommendations 
                      query={searchQuery}
                      onSelect={handleSelectRecommendation}
                      isVisible={showRecommendations}
                      onClose={() => setShowRecommendations(false)}
                    />
                  </div>
                </div>
              </motion.form>
              
              {/* CTA buttons */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              >
                <Link 
                  to="/products" 
                  className="bg-nimocare-600 text-white px-6 py-3 rounded-full font-medium hover:bg-nimocare-700 transition-all duration-300 flex items-center justify-center sm:justify-start space-x-2 hover:shadow-lg hover:scale-105"
                >
                  <span>Browse Products</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                
                <Link 
                  to="/prescription" 
                  className="bg-white text-nimocare-600 border border-nimocare-200 px-6 py-3 rounded-full font-medium hover:bg-nimocare-50 transition-all duration-300 flex items-center justify-center sm:justify-start space-x-2 hover:shadow-lg hover:scale-105"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Prescription</span>
                </Link>
              </motion.div>
              
              {/* Trust badges */}
              <motion.div 
                variants={itemVariants}
                className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4"
              >
                {[
                  { icon: "🔒", text: "Secure Payments" },
                  { icon: "🚚", text: "Fast Delivery" },
                  { icon: "🌿", text: "Eco-Friendly" },
                  { icon: "✅", text: "Verified Products" }
                ].map((badge, index) => (
                  <motion.div 
                    key={index} 
                    className="flex flex-col items-center glass p-3 rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-md hover:scale-105 bg-white/80 backdrop-blur-sm"
                    whileHover={{ y: -5 }}
                  >
                    <span className="text-2xl mb-1">{badge.icon}</span>
                    <span className="text-xs text-gray-700 font-medium text-center">{badge.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
          
          {/* Hero image */}
          <motion.div 
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <motion.div 
                className="w-full max-w-lg h-auto relative z-10"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=800&auto=format&fit=crop" 
                  alt="Pharmacy hero image" 
                  className="w-full h-auto rounded-2xl shadow-medium"
                />
              </motion.div>
              
              {/* Floating elements - only show on larger screens */}
              <motion.div 
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-soft border border-gray-100 max-w-[200px] hidden sm:block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start space-x-3">
                  <span className="text-3xl">💊</span>
                  <div>
                    <h3 className="font-medium text-sm">Prescription Delivery</h3>
                    <p className="text-xs text-gray-600 mt-1">Delivered within 24 hours</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -top-4 -right-4 bg-white p-4 rounded-lg shadow-soft border border-gray-100 hidden sm:block"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs mt-1 font-medium">Trusted by 50,000+ customers</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
