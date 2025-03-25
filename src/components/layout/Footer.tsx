
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-16">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <Link to="/" className="relative inline-block">
                <span className="text-2xl font-display font-bold text-nimocare-600">
                  Nimocare
                </span>
                <span className="absolute -top-1 -right-3 text-xs bg-nimocare-100 text-nimocare-600 px-1 rounded">Rx</span>
              </Link>
              <p className="mt-6 text-gray-600 max-w-xs">
                Your trusted online pharmacy for all your healthcare needs. Safe, reliable, and eco-friendly.
              </p>
            </div>
            
            <div className="flex space-x-4">
              <a href="https://facebook.com/nimocare" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-gray-100 hover:bg-nimocare-100 transition-colors">
                <Facebook className="w-5 h-5 text-nimocare-600" />
              </a>
              <a href="https://twitter.com/nimocare" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-gray-100 hover:bg-nimocare-100 transition-colors">
                <Twitter className="w-5 h-5 text-nimocare-600" />
              </a>
              <a href="https://instagram.com/nimocare" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-gray-100 hover:bg-nimocare-100 transition-colors">
                <Instagram className="w-5 h-5 text-nimocare-600" />
              </a>
              <a href="https://linkedin.com/company/nimocare" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-gray-100 hover:bg-nimocare-100 transition-colors">
                <Linkedin className="w-5 h-5 text-nimocare-600" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-nimocare-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-nimocare-600 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/prescription" className="text-gray-600 hover:text-nimocare-600 transition-colors">
                  Upload Prescription
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-nimocare-600 transition-colors">
                  Health Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-nimocare-600 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Help & Support */}
          <div>
            <h3 className="text-lg font-bold mb-6">Help & Support</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-nimocare-600 transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-600 hover:text-nimocare-600 transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-600 hover:text-nimocare-600 transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-nimocare-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-nimocare-600 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-nimocare-600 mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-gray-600">
                  123 Health Street, Medical District, CA 90210, USA
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-nimocare-600 mr-3 flex-shrink-0" />
                <a href="tel:+1234567890" className="text-gray-600 hover:text-nimocare-600 transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-nimocare-600 mr-3 flex-shrink-0" />
                <a href="mailto:support@nimocare.com" className="text-gray-600 hover:text-nimocare-600 transition-colors">
                  support@nimocare.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-100 py-8 text-center md:flex md:justify-between md:text-left">
          <p className="text-gray-600">
            &copy; {currentYear} Nimocare. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
            <a href="#" className="text-gray-600 hover:text-nimocare-600 transition-colors text-sm">
              Compliance
            </a>
            <a href="#" className="text-gray-600 hover:text-nimocare-600 transition-colors text-sm">
              Accessibility
            </a>
            <a href="#" className="text-gray-600 hover:text-nimocare-600 transition-colors text-sm">
              Legal
            </a>
            <a href="#" className="text-gray-600 hover:text-nimocare-600 transition-colors text-sm">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
