import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Store, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Logo from '@/components/ui/Logo';
import { SearchRecommendations } from '@/components/ui/SearchRecommendations';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showRecommendations, setShowRecommendations] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Prevent body scroll when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const openInNewTab = (url: string) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };

  const ExternalLink = ({ to, className, children }) => (
    <a 
      href={to} 
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        e.stopPropagation();
        openInNewTab(to);
      }}
    >
      {children}
    </a>
  );

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
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
    setIsSearchOpen(false);
  };

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
        <Link 
          to="/" 
          className="relative flex items-center"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <Logo size="md" />
        </Link>

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
          <Link to="/store-locator" className="font-medium hover:text-nimocare-600 transition-colors">
            Find a Store
          </Link>
          <Link to="/seller" className="font-medium hover:text-nimocare-600 transition-colors">
            Seller Portal
          </Link>
          <Link to="/contact" className="font-medium hover:text-nimocare-600 transition-colors">
            Contact
          </Link>
        </nav>

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
              <span className="absolute -top-1 -right-1 bg-nimocare-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
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
          
          <Button
            onClick={handleMobileMenuToggle}
            className="p-2 rounded-full hover:bg-nimocare-50 transition-colors flex items-center justify-center"
            variant="ghost"
            size="icon"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          'absolute left-0 right-0 bg-white shadow-md py-3 px-4 transition-all duration-300 ease-in-out',
          isSearchOpen ? 'top-full opacity-100' : '-top-20 opacity-0 pointer-events-none'
        )}
      >
        <div className="container-custom">
          <div className="relative">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                ref={searchInputRef}
                placeholder="Search for medicines, brands, health products..."
                className="w-full py-2 pl-10 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:border-nimocare-400 transition-colors"
                autoFocus={isSearchOpen}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchFocus}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setIsSearchOpen(false);
                  setShowRecommendations(false);
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </form>
            
            {isSearchOpen && (
              <div className="relative">
                <SearchRecommendations 
                  query={searchQuery}
                  onSelect={handleSelectRecommendation}
                  isVisible={showRecommendations}
                  onClose={() => setShowRecommendations(false)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/20 z-[100] md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      <div
        className={cn(
          'fixed inset-y-0 right-0 w-[80%] max-w-sm bg-white z-[101] transition-transform duration-300 ease-in-out shadow-xl md:hidden overflow-auto',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="p-6 pt-16">
          <Button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute right-4 top-4 p-2 rounded-full hover:bg-nimocare-50 transition-colors flex items-center justify-center"
            variant="ghost"
            size="icon"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </Button>
          
          <div className="flex justify-center mb-8">
            <Logo size="lg" />
          </div>
          
          <nav className="flex flex-col space-y-6">
            <Link 
              to="/" 
              className="text-lg font-medium hover:text-nimocare-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="text-lg font-medium hover:text-nimocare-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              to="/prescription" 
              className="text-lg font-medium hover:text-nimocare-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Upload Prescription
            </Link>
            <Link 
              to="/store-locator" 
              className="text-lg font-medium hover:text-nimocare-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Find a Store
              </div>
            </Link>
            <Link 
              to="/seller" 
              className="text-lg font-medium hover:text-nimocare-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Seller Portal
            </Link>
            <Link 
              to="/contact" 
              className="text-lg font-medium hover:text-nimocare-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              to="/login" 
              className="text-lg font-medium hover:text-nimocare-600 transition-colors"
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
