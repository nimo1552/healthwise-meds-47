
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/ui/HeroSection';
import FeaturedProducts from '@/components/ui/FeaturedProducts';
import CategorySection from '@/components/ui/CategorySection';
import { ArrowRight, Upload, TruckIcon, ShieldCheckIcon, ThumbsUpIcon, BadgeCheckIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Featured Products */}
        <FeaturedProducts />
        
        {/* Categories */}
        <CategorySection />
        
        {/* How It Works */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-block bg-nimocare-100 text-nimocare-600 px-3 py-1 rounded-full text-sm font-medium mb-3">
                Simple Process
              </span>
              <h2 className="header-2 text-gray-900 mb-4">How Nimocare Works</h2>
              <p className="subtitle-1 mx-auto">
                Our streamlined process ensures you get your medications safely and quickly, without any hassle.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Upload Prescription",
                  description: "Upload your valid prescription from a licensed healthcare provider.",
                  icon: <Upload className="w-6 h-6" />
                },
                {
                  step: "02",
                  title: "Order Verification",
                  description: "Our pharmacists verify your prescription and process your order.",
                  icon: <BadgeCheckIcon className="w-6 h-6" />
                },
                {
                  step: "03",
                  title: "Quick Delivery",
                  description: "Receive your medications at your doorstep in eco-friendly packaging.",
                  icon: <TruckIcon className="w-6 h-6" />
                }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="flex flex-col p-6 rounded-xl border border-gray-100 bg-white shadow-soft transition-all duration-300 hover:shadow-medium hover:-translate-y-1"
                >
                  <div className="flex items-center mb-4">
                    <span className="text-4xl font-bold text-nimocare-100 mr-4 font-display">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-full bg-nimocare-100 flex items-center justify-center text-nimocare-600">
                      {item.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link 
                to="/prescription" 
                className="btn-primary inline-flex items-center"
              >
                <span>Upload Your Prescription</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Features */}
        <section className="section-padding bg-gradient-to-br from-nimocare-50/50 via-white to-nimocare-50/50">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-block bg-nimocare-100 text-nimocare-600 px-3 py-1 rounded-full text-sm font-medium mb-3">
                  Why Choose Us
                </span>
                <h2 className="header-2 text-gray-900 mb-6">
                  Healthcare Delivered With Excellence
                </h2>
                
                <div className="space-y-6">
                  {[
                    {
                      icon: <ShieldCheckIcon className="w-6 h-6" />,
                      title: "Verified Authentic Medicines",
                      description: "We source all medications directly from authorized manufacturers and distributors."
                    },
                    {
                      icon: <ThumbsUpIcon className="w-6 h-6" />,
                      title: "Licensed Pharmacists",
                      description: "All prescriptions are verified by our team of licensed and experienced pharmacists."
                    },
                    {
                      icon: <TruckIcon className="w-6 h-6" />,
                      title: "Eco-Friendly Packaging",
                      description: "We use sustainable materials for packaging to reduce environmental impact."
                    }
                  ].map((feature, index) => (
                    <div key={index} className="flex">
                      <div className="mr-4 mt-1 w-12 h-12 rounded-full bg-nimocare-100 flex items-center justify-center text-nimocare-600 flex-shrink-0">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <Link 
                    to="/about" 
                    className="btn-text inline-flex items-center"
                  >
                    <span>Learn More About Nimocare</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
              
              <div className="relative">
                <div className="relative z-10">
                  <img 
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop" 
                    alt="Pharmacist" 
                    className="w-full h-auto rounded-2xl shadow-medium"
                  />
                </div>
                
                {/* Statistics card */}
                <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-medium border border-gray-100 max-w-[260px] animate-float">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: "50k+", label: "Customers" },
                      { value: "99%", label: "Satisfaction" },
                      { value: "24h", label: "Delivery" },
                      { value: "100%", label: "Authentic" }
                    ].map((stat, index) => (
                      <div key={index} className="text-center">
                        <p className="text-2xl font-bold text-nimocare-600 font-display">
                          {stat.value}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-nimocare-600 text-white">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
                Ready to experience healthcare delivered with care?
              </h2>
              <p className="text-nimocare-100 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers who trust Nimocare for their medication needs. Fast, reliable, and secure.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  to="/register" 
                  className="bg-white text-nimocare-600 hover:bg-nimocare-50 px-8 py-3 rounded-lg font-medium transition-colors"
                >
                  Create an Account
                </Link>
                <Link 
                  to="/products" 
                  className="bg-nimocare-700 hover:bg-nimocare-800 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                >
                  Browse Products
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
