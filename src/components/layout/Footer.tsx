
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';
import { ArrowRight, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      {/* Newsletter */}
      <div className="container-custom py-12">
        <div className="bg-nimocare-600 rounded-lg p-6 md:p-8 lg:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Join Our Newsletter</h3>
              <p className="text-nimocare-100">
                Stay updated with our latest health tips, product launches, and exclusive offers.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow bg-white/90"
              />
              <Button className="whitespace-nowrap bg-white text-nimocare-600 hover:bg-nimocare-50">
                Subscribe <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Footer */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1 - Logo and About */}
          <div className="lg:col-span-2">
            <Logo size="md" />
            <p className="mt-4 text-gray-600 max-w-md">
              PharmaCare is your trusted online pharmacy and healthcare partner. We provide reliable medications, health advice, and exceptional service.
            </p>
            <div className="flex mt-6 space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-600 hover:text-nimocare-600 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/prescription-upload" className="text-gray-600 hover:text-nimocare-600 transition-colors">
                  Upload Prescription
                </Link>
              </li>
              <li>
                <Link to="/store-locator" className="text-gray-600 hover:text-nimocare-600 transition-colors">
                  Store Locator
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="text-gray-600 hover:text-nimocare-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-nimocare-600 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3 - Customer Service */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="text-gray-600 hover:text-nimocare-600 transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/order-tracking" className="text-gray-600 hover:text-nimocare-600 transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-nimocare-600 transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/return-policy" className="text-gray-600 hover:text-nimocare-600 transition-colors">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-600 hover:text-nimocare-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 4 - Contact */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="text-gray-600">
                <span className="block font-medium mb-1">Address:</span>
                123 Healthcare Street, New York, NY 10001
              </li>
              <li className="text-gray-600">
                <span className="block font-medium mb-1">Phone:</span>
                1-800-PHARMA (1-800-742-762)
              </li>
              <li className="text-gray-600">
                <span className="block font-medium mb-1">Email:</span>
                support@pharmacare.com
              </li>
              <li className="text-gray-600">
                <span className="block font-medium mb-1">Hours:</span>
                Mon-Fri: 9am-6pm, Sat: 10am-4pm
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className="border-t border-gray-200 py-6">
        <div className="container-custom flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © 2023 PharmaCare. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms-conditions" className="text-sm text-gray-500 hover:text-gray-700">
              Terms & Conditions
            </Link>
            <Link to="/privacy-policy" className="text-sm text-gray-500 hover:text-gray-700">
              Privacy Policy
            </Link>
            <Link to="/seller" className="text-sm text-gray-500 hover:text-gray-700">
              Sell With Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
