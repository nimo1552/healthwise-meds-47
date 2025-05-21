
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 md:pt-32">
        {/* Hero Section */}
        <section className="bg-white py-12 md:py-20">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">About PharmaCare</h1>
                <p className="text-lg text-gray-600 mb-6">
                  We're on a mission to make quality healthcare accessible to everyone through innovative pharmacy services.
                </p>
                <p className="text-gray-600 mb-6">
                  Founded in 2020, PharmaCare combines modern technology with personalized care to create a seamless pharmacy experience. Our team of licensed pharmacists and healthcare professionals are committed to your wellbeing.
                </p>
                <Link 
                  to="/contact"
                  className="inline-flex items-center text-nimocare-600 font-medium hover:underline"
                >
                  <span>Get in touch with our team</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=1470&auto=format&fit=crop"
                  alt="Pharmacist team" 
                  className="rounded-lg shadow-lg object-cover w-full"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-gray-600">
                At the heart of PharmaCare are values that guide everything we do. We believe in putting people first and making healthcare accessible to all.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Customer Care",
                  description: "We prioritize your health and well-being above all else. Our team is dedicated to providing personalized care and support.",
                  icon: "❤️"
                },
                {
                  title: "Quality Assurance",
                  description: "We source only the highest quality medications and products, and employ rigorous quality control processes.",
                  icon: "✅"
                },
                {
                  title: "Innovation",
                  description: "We continuously innovate to improve our services and find new ways to make healthcare more accessible and convenient.",
                  icon: "💡"
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Leadership Team</h2>
              <p className="text-gray-600">
                Meet the dedicated professionals who lead PharmaCare with expertise and passion.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Dr. Amanda Chen",
                  role: "Chief Executive Officer",
                  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop"
                },
                {
                  name: "Mark Johnson",
                  role: "Chief Operations Officer",
                  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop"
                },
                {
                  name: "Dr. Sarah Williams",
                  role: "Chief Medical Officer",
                  image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=300&auto=format&fit=crop"
                },
                {
                  name: "David Garcia",
                  role: "Chief Technology Officer",
                  image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop"
                }
              ].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="relative w-48 h-48 mx-auto mb-4 overflow-hidden rounded-full">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="absolute inset-0 w-full h-full object-cover" 
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
