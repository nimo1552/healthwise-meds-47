
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  AlertCircle, 
  Info, 
  ShieldCheck, 
  PlusCircle, 
  MinusCircle,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Sample product data
const productData = {
  id: 1,
  name: "Paracetamol 500mg Tablets",
  brand: "Nimocare",
  image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=800&auto=format&fit=crop",
  images: [
    "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1558956397-7f6aea7aaab4?q=80&w=800&auto=format&fit=crop"
  ],
  price: 9.99,
  oldPrice: 12.99,
  discount: 23,
  rating: 4.8,
  reviews: 120,
  stock: 50,
  isPrescriptionRequired: false,
  description: "Paracetamol 500mg tablets are a common pain reliever used to treat aches and pain. It can also be used to reduce a high temperature.",
  details: `<p>Paracetamol is a commonly used medicine that can help treat pain and reduce a high temperature (fever).</p>
            <p>It's typically used to relieve mild or moderate pain, such as headaches, toothache or sprains, and reduce fevers caused by illnesses such as colds and flu.</p>
            <p>Paracetamol is often recommended as one of the first treatments for pain, as it's safe for most people to take and side effects are rare.</p>`,
  usage: "Take one to two tablets every 4-6 hours as needed. Do not exceed 8 tablets in 24 hours.",
  sideEffects: "Side effects are rare but may include nausea, stomach pain, or allergic reactions. Seek medical advice if you experience any unusual symptoms.",
  precautions: "Do not use with other medicines containing paracetamol. Consult a doctor if you have liver or kidney problems.",
  ingredients: "Each tablet contains: Paracetamol 500mg. Also contains: Maize Starch, Potassium Sorbate, Purified Talc, Stearic Acid, Povidone, Sodium Starch Glycolate."
};

// Tabs for product information
const tabs = [
  { id: "description", label: "Description" },
  { id: "usage", label: "Usage" },
  { id: "side-effects", label: "Side Effects" },
  { id: "precautions", label: "Precautions" },
  { id: "ingredients", label: "Ingredients" }
];

// Sample related products
const relatedProducts = [
  {
    id: 2,
    name: "Ibuprofen 200mg Tablets",
    image: "https://images.unsplash.com/photo-1550170081-7d6e5629c6b6?q=80&w=400&auto=format&fit=crop",
    price: 7.99,
    oldPrice: 9.99,
    isPrescriptionRequired: false,
  },
  {
    id: 3,
    name: "Aspirin 75mg Tablets",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400&auto=format&fit=crop",
    price: 5.99,
    oldPrice: null,
    isPrescriptionRequired: false,
  },
  {
    id: 4,
    name: "Naproxen 250mg Tablets",
    image: "https://images.unsplash.com/photo-1559666126-22e4406eb5bb?q=80&w=400&auto=format&fit=crop",
    price: 11.99,
    oldPrice: 14.99,
    isPrescriptionRequired: true,
  }
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = productData; // In a real app, you'd fetch the product by ID
  
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.name} to cart`);
    // Add to cart logic
  };
  
  const handleBuyNow = () => {
    console.log(`Buy now: ${quantity} of ${product.name}`);
    // Buy now logic
  };
  
  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      console.log("Web Share API not supported");
      // Fallback sharing logic
    }
  };
  
  // Generate star rating display
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#D1D5DB" />
            </linearGradient>
          </defs>
          <path fill="url(#half-gradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      );
    }

    // Add empty stars
    const emptyStars = 5 - Math.ceil(product.rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      );
    }

    return stars;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 border-b border-gray-100">
          <div className="container-custom py-4">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2">
                <li className="inline-flex items-center">
                  <Link to="/" className="text-gray-600 hover:text-nimocare-600 text-sm">
                    Home
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <Link to="/products" className="ml-1 text-gray-600 hover:text-nimocare-600 text-sm">
                      Products
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <span className="ml-1 text-gray-500 text-sm" aria-current="page">
                      {product.name}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </div>
        
        {/* Product Details */}
        <section className="py-10">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Product Images */}
              <div>
                <div className="bg-white rounded-lg overflow-hidden mb-4 h-96 relative">
                  <img 
                    src={product.images[activeImageIndex]} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Prescription badge */}
                  {product.isPrescriptionRequired && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-md text-sm font-medium flex items-center space-x-2 border border-gray-200">
                      <AlertCircle className="w-4 h-4 text-nimocare-600" />
                      <span className="text-gray-700">Prescription Required</span>
                    </div>
                  )}
                </div>
                
                {/* Thumbnail images */}
                <div className="grid grid-cols-3 gap-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={cn(
                        "border rounded-md overflow-hidden h-24",
                        activeImageIndex === index 
                          ? "border-nimocare-600 ring-2 ring-nimocare-100" 
                          : "border-gray-200 hover:border-gray-300"
                      )}
                    >
                      <img 
                        src={image} 
                        alt={`${product.name} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Product Info */}
              <div>
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <span className="text-sm text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                      {product.brand}
                    </span>
                    
                    {product.stock > 0 ? (
                      <span className="ml-3 text-sm text-green-600 bg-green-50 px-2 py-0.5 rounded">
                        In Stock
                      </span>
                    ) : (
                      <span className="ml-3 text-sm text-red-600 bg-red-50 px-2 py-0.5 rounded">
                        Out of Stock
                      </span>
                    )}
                  </div>
                  
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h1>
                  
                  {/* Ratings */}
                  <div className="flex items-center mb-4">
                    <div className="flex mr-2">
                      {renderStars()}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                  
                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                      {product.oldPrice && (
                        <span className="ml-3 text-lg text-gray-500 line-through">${product.oldPrice.toFixed(2)}</span>
                      )}
                      {product.discount && (
                        <span className="ml-3 text-sm font-medium text-green-600">
                          Save {product.discount}%
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Price inclusive of all taxes</p>
                  </div>
                  
                  {/* Short Description */}
                  <p className="text-gray-700 mb-6">
                    {product.description}
                  </p>
                  
                  {/* Quantity Selector */}
                  <div className="mb-6">
                    <p className="text-sm font-medium text-gray-900 mb-2">Quantity</p>
                    <div className="flex items-center">
                      <button 
                        onClick={decrementQuantity}
                        disabled={quantity <= 1}
                        className={cn(
                          "p-2 rounded-l-md border border-r-0 transition-colors",
                          quantity <= 1 
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                            : "bg-white text-gray-600 hover:bg-gray-50"
                        )}
                      >
                        <MinusCircle className="w-5 h-5" />
                      </button>
                      <input
                        type="text"
                        value={quantity}
                        readOnly
                        className="w-16 border-y text-center py-2 bg-white"
                      />
                      <button 
                        onClick={incrementQuantity}
                        disabled={quantity >= product.stock}
                        className={cn(
                          "p-2 rounded-r-md border border-l-0 transition-colors",
                          quantity >= product.stock 
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                            : "bg-white text-gray-600 hover:bg-gray-50"
                        )}
                      >
                        <PlusCircle className="w-5 h-5" />
                      </button>
                      
                      <span className="ml-3 text-sm text-gray-600">
                        {product.stock} units available
                      </span>
                    </div>
                  </div>
                  
                  {/* Prescription Warning */}
                  {product.isPrescriptionRequired && (
                    <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6 flex">
                      <Info className="w-5 h-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-amber-800 font-medium">Prescription Required</p>
                        <p className="text-sm text-amber-700 mt-1">
                          This medication requires a valid prescription. You'll need to upload your prescription during checkout.
                        </p>
                        <Link 
                          to="/prescription" 
                          className="text-sm font-medium text-nimocare-600 hover:text-nimocare-700 mt-2 inline-block"
                        >
                          Upload Prescription Now
                        </Link>
                      </div>
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mb-6">
                    <button 
                      onClick={handleAddToCart}
                      className="btn-secondary flex-1 flex items-center justify-center space-x-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span>Add to Cart</span>
                    </button>
                    
                    <button 
                      onClick={handleBuyNow}
                      className="btn-primary flex-1 flex items-center justify-center space-x-2"
                    >
                      <span>Buy Now</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {/* Extra Actions */}
                  <div className="flex space-x-6 mb-6">
                    <button 
                      onClick={handleToggleFavorite}
                      className="flex items-center text-gray-600 hover:text-nimocare-600 transition-colors"
                    >
                      <Heart className={cn("w-5 h-5 mr-2", isFavorite ? "fill-red-500 text-red-500" : "")} />
                      <span className="text-sm">{isFavorite ? "Added to Wishlist" : "Add to Wishlist"}</span>
                    </button>
                    
                    <button 
                      onClick={handleShare}
                      className="flex items-center text-gray-600 hover:text-nimocare-600 transition-colors"
                    >
                      <Share2 className="w-5 h-5 mr-2" />
                      <span className="text-sm">Share</span>
                    </button>
                  </div>
                  
                  {/* Trust Badges */}
                  <div className="border-t border-gray-100 pt-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="flex items-center">
                        <ShieldCheck className="w-5 h-5 text-nimocare-600 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">Secure Checkout</span>
                      </div>
                      <div className="flex items-center">
                        <ShieldCheck className="w-5 h-5 text-nimocare-600 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">100% Authentic</span>
                      </div>
                      <div className="flex items-center">
                        <ShieldCheck className="w-5 h-5 text-nimocare-600 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">Free Returns</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Product Information Tabs */}
        <section className="py-12 bg-gray-50">
          <div className="container-custom">
            {/* Tabs navigation */}
            <div className="overflow-x-auto pb-2 mb-6 border-b border-gray-200">
              <div className="flex space-x-1 min-w-max">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "px-5 py-3 text-sm font-medium whitespace-nowrap transition-colors",
                      activeTab === tab.id
                        ? "text-nimocare-600 border-b-2 border-nimocare-600"
                        : "text-gray-600 hover:text-gray-900"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Tab content */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              {activeTab === "description" && (
                <div dangerouslySetInnerHTML={{ __html: product.details }} className="prose max-w-none" />
              )}
              
              {activeTab === "usage" && (
                <div className="prose max-w-none">
                  <h3 className="text-lg font-medium mb-4">How to Use</h3>
                  <p>{product.usage}</p>
                </div>
              )}
              
              {activeTab === "side-effects" && (
                <div className="prose max-w-none">
                  <h3 className="text-lg font-medium mb-4">Possible Side Effects</h3>
                  <p>{product.sideEffects}</p>
                </div>
              )}
              
              {activeTab === "precautions" && (
                <div className="prose max-w-none">
                  <h3 className="text-lg font-medium mb-4">Precautions & Warnings</h3>
                  <p>{product.precautions}</p>
                </div>
              )}
              
              {activeTab === "ingredients" && (
                <div className="prose max-w-none">
                  <h3 className="text-lg font-medium mb-4">Ingredients</h3>
                  <p>{product.ingredients}</p>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Related Products */}
        <section className="py-10">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((product) => (
                <Link 
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-medium transition-all duration-300"
                >
                  <div className="aspect-square overflow-hidden bg-gray-100 relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Prescription badge */}
                    {product.isPrescriptionRequired && (
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2 py-1 rounded-md text-xs font-medium flex items-center space-x-1 border border-gray-200">
                        <AlertCircle className="w-3 h-3 text-nimocare-600" />
                        <span className="text-gray-700">Rx Required</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-1 group-hover:text-nimocare-600 transition-colors">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-baseline mt-2">
                      <span className="text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</span>
                      {product.oldPrice && (
                        <span className="ml-2 text-sm text-gray-500 line-through">${product.oldPrice.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
