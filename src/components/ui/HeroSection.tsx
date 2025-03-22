
import { useState } from 'react';
import { ArrowRight, Search, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality
  };

  return (
    <section className="pt-28 pb-20 md:pt-36 md:pb-28 relative overflow-hidden bg-gradient-to-br from-white via-nimocare-50/30 to-white">
      {/* Abstract shapes */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-nimocare-200/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 -left-24 w-72 h-72 bg-nimocare-100/30 rounded-full blur-3xl"></div>
      
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1 animate-slide-up">
            <div className="max-w-2xl mx-auto lg:mx-0">
              <div className="stagger-animation">
                <span className="inline-block bg-nimocare-100 text-nimocare-600 px-3 py-1 rounded-full text-sm font-medium mb-6 animate-slide-up">
                  Trusted Online Pharmacy
                </span>
                
                <h1 className="header-1 text-gray-900 mb-6 animate-slide-up">
                  Your Health, <span className="text-nimocare-600">Delivered</span> With Care
                </h1>
                
                <p className="subtitle-1 mb-8 animate-slide-up">
                  Nimocare delivers prescription and over-the-counter medicines to your doorstep with eco-friendly practices. Fast, reliable, and secure.
                </p>
              </div>
              
              {/* Search form */}
              <form onSubmit={handleSearch} className="relative mb-8 max-w-md animate-slide-up">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for medicines, health products..."
                    className="w-full py-3 pl-12 pr-4 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:border-nimocare-400 focus:ring-2 focus:ring-nimocare-100 transition-all subtle-ring-focus"
                  />
                  <button 
                    type="submit" 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-nimocare-600 text-white rounded-md px-4 py-1.5 text-sm font-medium hover:bg-nimocare-700 transition-colors"
                  >
                    Search
                  </button>
                </div>
              </form>
              
              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate-slide-up">
                <Link 
                  to="/products" 
                  className="btn-primary flex items-center justify-center sm:justify-start space-x-2"
                >
                  <span>Browse Products</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                
                <Link 
                  to="/prescription" 
                  className="btn-secondary flex items-center justify-center sm:justify-start space-x-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Prescription</span>
                </Link>
              </div>
              
              {/* Trust badges */}
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 animate-slide-up">
                {[
                  { icon: "🔒", text: "Secure Payments" },
                  { icon: "🚚", text: "Fast Delivery" },
                  { icon: "🌿", text: "Eco-Friendly" },
                  { icon: "✅", text: "Verified Products" }
                ].map((badge, index) => (
                  <div key={index} className="flex flex-col items-center bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-gray-100">
                    <span className="text-2xl mb-1">{badge.icon}</span>
                    <span className="text-xs text-gray-700 font-medium text-center">{badge.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Hero image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-fade-in">
            <div className="relative">
              <div className="w-full max-w-lg h-auto relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1579154392429-17e5e3d6e631?q=80&w=800&auto=format&fit=crop" 
                  alt="Pharmacy hero image" 
                  className="w-full h-auto rounded-2xl shadow-medium"
                />
              </div>
              
              {/* Floating elements */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-soft border border-gray-100 max-w-[200px] animate-float">
                <div className="flex items-start space-x-3">
                  <span className="text-3xl">💊</span>
                  <div>
                    <h3 className="font-medium text-sm">Prescription Delivery</h3>
                    <p className="text-xs text-gray-600 mt-1">Delivered within 24 hours</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 bg-white p-4 rounded-lg shadow-soft border border-gray-100 animate-float animation-delay-300">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs mt-1 font-medium">Trusted by 10,000+ customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
