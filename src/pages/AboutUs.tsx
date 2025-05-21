
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
                  transition={{ delay: index * 0.2 }}
                  className="bg-white p-8 rounded-lg shadow-sm border border-gray-100"
                >
                  <div className="text-3xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-medium mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Leadership Team</h2>
              <p className="text-gray-600">
                Meet the dedicated professionals working to make PharmaCare the most trusted name in pharmaceutical care.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Dr. Sarah Johnson",
                  role: "Chief Executive Officer",
                  bio: "Sarah has over 20 years of experience in healthcare management and is passionate about accessible healthcare.",
                  image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=300&auto=format&fit=crop"
                },
                {
                  name: "Michael Chen",
                  role: "Chief Pharmacy Officer",
                  bio: "Michael oversees all pharmacy operations and ensures the highest standards of pharmaceutical care.",
                  image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=300&auto=format&fit=crop"
                },
                {
                  name: "Dr. Latisha Williams",
                  role: "Head of Innovation",
                  bio: "Latisha leads our digital health initiatives and works to integrate cutting-edge technology into our services.",
                  image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop"
                }
              ].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100"
                >
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-medium mb-1">{member.name}</h3>
                    <p className="text-nimocare-600 mb-3">{member.role}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-nimocare-600 text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold mb-6">Join the PharmaCare Community</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Whether you're a customer, healthcare professional, or potential partner, we'd love to hear from you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button variant="outline" className="bg-white text-nimocare-600 hover:bg-gray-100">
                  Contact Us
                </Button>
              </Link>
              <Link to="/store-locator">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-nimocare-600">
                  Find a Store
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
