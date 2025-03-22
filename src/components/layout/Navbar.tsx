
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Store } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3',
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container-custom flex justify-between items-center">
        {/* Logo */}
        <Link 
          to="/" 
          className="relative flex items-center"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span className="text-2xl font-display font-bold text-nimocare-600">
            Nimocare
          </span>
          <span className="absolute -top-1 -right-3 text-xs bg-nimocare-100 text-nimocare-600 px-1 rounded">Rx</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="font-medium hover:text-nimocare-600 transition-colors">
            Home
          </Link>
          <Link to="/products" className="font-medium hover:text-nimocare-600 transition-colors">
            Products
          </Link>
          <Link to="/prescription" className="font-medium hover:text-nimocare-600 transition-colors">
            Upload Prescription
          </Link>
          <Link to="/seller" className="font-medium hover:text-nimocare-600 transition-colors">
            Seller Portal
          </Link>
          <Link to="/contact" className="font-medium hover:text-nimocare-600 transition-colors">
            Contact
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-5">
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 rounded-full hover:bg-nimocare-50 transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          
          <Link 
            to="/cart"
            className="p-2 rounded-full hover:bg-nimocare-50 transition-colors relative"
            aria-label="Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-nimocare-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-fade-in">
                {cartCount}
              </span>
            )}
          </Link>
          
          <Link 
            to="/login"
            className="flex items-center space-x-1 p-2 rounded-full hover:bg-nimocare-50 transition-colors"
            aria-label="Account"
          >
            <User className="w-5 h-5" />
          </Link>
          
          <Link 
            to="/seller"
            className="flex items-center space-x-1 p-2 rounded-full hover:bg-nimocare-50 transition-colors"
            aria-label="Seller Portal"
          >
            <Store className="w-5 h-5" />
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden space-x-4">
          <Link 
            to="/cart"
            className="p-2 rounded-full hover:bg-nimocare-50 transition-colors relative"
            aria-label="Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-nimocare-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-full hover:bg-nimocare-50 transition-colors"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div
        className={cn(
          'absolute left-0 right-0 bg-white shadow-md py-3 px-4 transition-all duration-300 ease-in-out',
          isSearchOpen ? 'top-full opacity-100' : '-top-20 opacity-0 pointer-events-none'
        )}
      >
        <div className="container-custom">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for medicines, brands, health products..."
              className="w-full py-2 pl-10 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:border-nimocare-400 transition-colors"
              autoFocus={isSearchOpen}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out pt-20',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="container-custom py-8">
          <nav className="flex flex-col space-y-6">
            <Link 
              to="/" 
              className="text-2xl font-medium hover:text-nimocare-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="text-2xl font-medium hover:text-nimocare-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              to="/prescription" 
              className="text-2xl font-medium hover:text-nimocare-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Upload Prescription
            </Link>
            <Link 
              to="/seller" 
              className="text-2xl font-medium hover:text-nimocare-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Seller Portal
            </Link>
            <Link 
              to="/contact" 
              className="text-2xl font-medium hover:text-nimocare-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              to="/login" 
              className="text-2xl font-medium hover:text-nimocare-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login / Register
            </Link>
            
            <div className="pt-6 mt-6 border-t border-gray-100">
              <button 
                onClick={() => {
                  setIsSearchOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 text-lg font-medium hover:text-nimocare-600 transition-colors"
              >
                <Search className="w-5 h-5" />
                <span>Search Products</span>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
