
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  Menu, X, ShoppingCart, Heart, Search, User, ChevronDown, 
  Stethoscope, Package, MapPin, ArrowRight, Moon, Sun 
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import Logo from '@/components/ui/Logo';
import { useCart } from '@/contexts/CartContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const { cartCount } = useCart();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  // Handle scroll event for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    setIsSearchOpen(false);
    setSearchQuery('');
  };
  
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="z-20">
            <Logo />
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            <NavLink 
              to="/products" 
              className={({ isActive }) => 
                `px-4 py-2 rounded-lg text-sm transition-colors ${
                  isActive ? 'text-nimocare-600 font-medium' : 'hover:text-nimocare-600'
                }`
              }
            >
              Products
            </NavLink>
            
            <div className="relative group">
              <button className="flex items-center px-4 py-2 rounded-lg text-sm transition-colors hover:text-nimocare-600">
                <span>Categories</span>
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              <div className="absolute left-0 top-full pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
                  <div className="p-3 grid grid-cols-1 gap-1">
                    {[
                      { name: "Prescription Medicines", path: "/category/prescription", icon: "💊" },
                      { name: "Over-the-Counter Drugs", path: "/category/otc", icon: "🩹" },
                      { name: "Vitamins & Supplements", path: "/category/vitamins", icon: "🍊" },
                      { name: "Personal Care", path: "/category/personal-care", icon: "🧴" },
                      { name: "Medical Devices", path: "/category/devices", icon: "🩺" },
                      { name: "Baby & Mother Care", path: "/category/baby-mother", icon: "👶" },
                    ].map((category, index) => (
                      <Link
                        key={index}
                        to={category.path}
                        className="flex items-center p-2 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-lg mr-2">{category.icon}</span>
                        <span>{category.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <NavLink 
              to="/prescription-upload" 
              className={({ isActive }) => 
                `px-4 py-2 rounded-lg text-sm transition-colors ${
                  isActive ? 'text-nimocare-600 font-medium' : 'hover:text-nimocare-600'
                }`
              }
            >
              Upload Prescription
            </NavLink>
            
            <NavLink 
              to="/store-locator" 
              className={({ isActive }) => 
                `px-4 py-2 rounded-lg text-sm transition-colors ${
                  isActive ? 'text-nimocare-600 font-medium' : 'hover:text-nimocare-600'
                }`
              }
            >
              Store Locator
            </NavLink>
          </div>
          
          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-1">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            
            <Link 
              to="/wishlist"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
            </Link>
            
            <Link 
              to="/cart"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-nimocare-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <div className="ml-1">
              <Link to="/login">
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
            </div>
            
            <div className="ml-1">
              <ThemeToggle />
            </div>
          </div>
          
          {/* Mobile Menu Toggle */}
          <div className="flex items-center lg:hidden">
            <Link 
              to="/cart"
              className="p-2 mr-1 rounded-full hover:bg-gray-100 transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-nimocare-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1 rounded-md focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-b border-gray-200 overflow-hidden"
          >
            <div className="container-custom py-4">
              <div className="flex flex-col space-y-3">
                <NavLink 
                  to="/products" 
                  className={({ isActive }) => 
                    `px-4 py-3 rounded-lg transition-colors ${
                      isActive ? 'bg-nimocare-50 text-nimocare-600 font-medium' : 'hover:bg-gray-50'
                    }`
                  }
                >
                  <Package className="h-5 w-5 mr-3 inline-block" />
                  Products
                </NavLink>
                
                <NavLink 
                  to="/prescription-upload" 
                  className={({ isActive }) => 
                    `px-4 py-3 rounded-lg transition-colors ${
                      isActive ? 'bg-nimocare-50 text-nimocare-600 font-medium' : 'hover:bg-gray-50'
                    }`
                  }
                >
                  <Stethoscope className="h-5 w-5 mr-3 inline-block" />
                  Upload Prescription
                </NavLink>
                
                <NavLink 
                  to="/store-locator" 
                  className={({ isActive }) => 
                    `px-4 py-3 rounded-lg transition-colors ${
                      isActive ? 'bg-nimocare-50 text-nimocare-600 font-medium' : 'hover:bg-gray-50'
                    }`
                  }
                >
                  <MapPin className="h-5 w-5 mr-3 inline-block" />
                  Store Locator
                </NavLink>
                
                <NavLink 
                  to="/wishlist" 
                  className={({ isActive }) => 
                    `px-4 py-3 rounded-lg transition-colors ${
                      isActive ? 'bg-nimocare-50 text-nimocare-600 font-medium' : 'hover:bg-gray-50'
                    }`
                  }
                >
                  <Heart className="h-5 w-5 mr-3 inline-block" />
                  Wishlist
                </NavLink>
                
                <div className="pt-3 border-t border-gray-100">
                  <Link 
                    to="/login" 
                    className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <User className="h-5 w-5 mr-3" />
                      Login / Register
                    </div>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                
                <div className="flex items-center justify-between px-4 pt-3">
                  <span className="text-sm text-gray-500">Switch theme</span>
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-gray-900/80 z-50 p-4 flex items-start justify-center pt-24"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white w-full max-w-2xl rounded-xl shadow-xl overflow-hidden"
            >
              <div className="p-1">
                <form onSubmit={handleSearch} className="flex items-center">
                  <Search className="h-5 w-5 ml-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 p-3 pl-3 focus:outline-none text-lg"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="p-3"
                  >
                    <X className="h-5 w-5 text-gray-400" />
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
