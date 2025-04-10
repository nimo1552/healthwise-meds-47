
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/ui/HeroSection';
import FeaturedProducts from '@/components/ui/FeaturedProducts';
import CategorySection from '@/components/ui/CategorySection';
import Newsletter from '@/components/ui/Newsletter';
import ContactForm from '@/components/ui/ContactForm';
import { ArrowRight, Upload, TruckIcon, ShieldCheckIcon, ThumbsUpIcon, BadgeCheckIcon, Mail, Star, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

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
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="flex flex-col p-6 rounded-xl border border-gray-100 bg-white shadow-soft transition-all duration-300 hover:shadow-medium hover:-translate-y-1 glass-card"
                >
                  <div className="flex items-center mb-4">
                    <span className="text-4xl font-bold text-nimocare-100 mr-4 font-display">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-nimocare-100 to-nimocare-200 flex items-center justify-center text-nimocare-600">
                      {item.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-12 space-y-4">
              <Link 
                to="/prescription" 
                className="btn-primary inline-flex items-center neo-button"
              >
                <span>Upload Your Prescription</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              
              <p className="text-gray-600">or</p>
              
              <Link 
                to="/order-tracking" 
                className="btn-outline inline-flex items-center"
              >
                <span>Track Your Order</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Features */}
        <section className="section-padding bg-gradient-to-br from-nimocare-50/50 via-white to-nimocare-50/50">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
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
                    <motion.div 
                      key={index} 
                      className="flex"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                      <div className="mr-4 mt-1 w-12 h-12 rounded-full bg-gradient-to-br from-nimocare-100 to-nimocare-200 flex items-center justify-center text-nimocare-600 flex-shrink-0">
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
                    </motion.div>
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
              </motion.div>
              
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="relative z-10">
                  <img 
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop" 
                    alt="Pharmacist" 
                    className="w-full h-auto rounded-2xl shadow-medium"
                  />
                </div>
                
                {/* Statistics card */}
                <motion.div 
                  className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-medium border border-gray-100 max-w-[260px] backdrop-blur-card"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 5,
                    ease: "easeInOut" 
                  }}
                >
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: "50k+", label: "Customers" },
                      { value: "99%", label: "Satisfaction" },
                      { value: "24h", label: "Delivery" },
                      { value: "100%", label: "Authentic" }
                    ].map((stat, index) => (
                      <div key={index} className="text-center">
                        <p className="text-2xl font-bold text-gradient-premium font-display">
                          {stat.value}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="section-padding bg-white relative overflow-hidden">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-block bg-nimocare-100 text-nimocare-600 px-3 py-1 rounded-full text-sm font-medium mb-3">
                Customer Reviews
              </span>
              <h2 className="header-2 text-gray-900 mb-4">What Our Customers Say</h2>
              <p className="subtitle-1 mx-auto">
                Don't just take our word for it. See what our satisfied customers have to say about their experience with NimoCare.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  avatar: "https://randomuser.me/api/portraits/women/32.jpg",
                  rating: 5,
                  comment: "I've been ordering my medications from NimoCare for over a year now. The service is reliable, and their prices are the best I've found.",
                  date: "May 10, 2023"
                },
                {
                  name: "Michael Chen",
                  avatar: "https://randomuser.me/api/portraits/men/54.jpg",
                  rating: 5,
                  comment: "As someone with chronic medication needs, I appreciate the ease of refilling prescriptions. Their delivery is always on time, and the customer service is excellent.",
                  date: "April 28, 2023"
                },
                {
                  name: "Emily Williams",
                  avatar: "https://randomuser.me/api/portraits/women/67.jpg",
                  rating: 4,
                  comment: "The prescription verification process is straightforward and secure. I feel confident knowing my medications are authentic and properly handled.",
                  date: "May 3, 2023"
                }
              ].map((testimonial, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white p-6 rounded-xl border border-gray-100 shadow-soft card-3d-effect"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className="flex items-center mb-4">
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                    <div>
                      <h3 className="font-medium text-gray-900">{testimonial.name}</h3>
                      <div className="flex mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3">{testimonial.comment}</p>
                  <p className="text-sm text-gray-500">{testimonial.date}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Link to="/testimonials" className="btn-text inline-flex items-center">
                <span>View All Reviews</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <Newsletter />
        
        {/* Contact Form Section */}
        <ContactForm />
        
        {/* FAQ Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-block bg-nimocare-100 text-nimocare-600 px-3 py-1 rounded-full text-sm font-medium mb-3">
                FAQ
              </span>
              <h2 className="header-2 text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="subtitle-1 mx-auto">
                Find answers to common questions about our services, ordering process, and more.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: "How do I order prescription medications?",
                  answer: "To order prescription medications, upload a valid prescription through our secure platform. Our licensed pharmacists will verify your prescription and process your order."
                },
                {
                  question: "How long does delivery take?",
                  answer: "Standard delivery typically takes 1-3 business days. For urgent medications, we offer expedited shipping options that can deliver within 24 hours in eligible areas."
                },
                {
                  question: "Are all your medications authentic?",
                  answer: "Yes, we only source medications directly from authorized manufacturers and distributors. We have a strict verification process to ensure all products are authentic and of the highest quality."
                },
                {
                  question: "How do I track my order?",
                  answer: "You can track your order by using the order tracking feature on our website. Simply enter your order number to get real-time updates on your delivery status."
                },
                {
                  question: "What if I need to return a product?",
                  answer: "For unopened products, we offer a 30-day return policy. Please note that prescription medications cannot be returned once they have been dispensed due to safety regulations."
                }
              ].map((faq, index) => (
                <motion.div 
                  key={index} 
                  className="bg-gray-50 rounded-xl p-6 hover-scale-subtle futuristic-border"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-start">
                    <MessageSquare className="w-5 h-5 text-nimocare-600 mr-2 mt-1 flex-shrink-0" />
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 ml-7">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Link to="/faq" className="btn-text inline-flex items-center">
                <span>View All FAQs</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-nimocare-600 to-nimocare-700 text-white relative overflow-hidden">
          {/* Abstract shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 -left-24 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          </div>
          
          <div className="container-custom relative z-10">
            <motion.div 
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
                Ready to experience healthcare delivered with care?
              </h2>
              <p className="text-nimocare-100 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers who trust Nimocare for their medication needs. Fast, reliable, and secure.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  to="/register" 
                  className="bg-white text-nimocare-600 hover:bg-nimocare-50 px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg pill-button"
                >
                  Create an Account
                </Link>
                <Link 
                  to="/products" 
                  className="bg-nimocare-700 hover:bg-nimocare-800 text-white border border-nimocare-500 px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg pill-button"
                >
                  Browse Products
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
