
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  Eye, 
  EyeOff, 
  Loader2, 
  Mail, 
  Lock,
  User,
  Phone,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Phone number should be 10 digits";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    if (!agreeTerms) {
      newErrors.terms = "You must agree to the terms and conditions";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Registration successful');
      // In a real app, you would handle user registration and redirect
    }, 1500);
  };
  
  // Password strength indicator
  const getPasswordStrength = () => {
    const { password } = formData;
    if (!password) return { strength: 0, text: "" };
    
    let strength = 0;
    let text = "Weak";
    
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    if (strength === 2) text = "Medium";
    if (strength === 3) text = "Good";
    if (strength === 4) text = "Strong";
    
    return { strength, text };
  };
  
  const passwordStrength = getPasswordStrength();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 flex items-center justify-center py-12">
        <div className="container-custom">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="p-6 sm:p-8">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">Create an Account</h1>
                  <p className="text-gray-600">
                    Join Nimocare for a seamless healthcare experience
                  </p>
                </div>
                
                <form onSubmit={handleSubmit}>
                  {/* Full Name input */}
                  <div className="mb-5">
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={cn(
                          "block w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors",
                          errors.fullName
                            ? "border-red-300 text-red-900 focus:border-red-500 focus:ring-red-100"
                            : "border-gray-300 focus:border-nimocare-400 focus:ring-nimocare-100"
                        )}
                        placeholder="John Doe"
                      />
                    </div>
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                    )}
                  </div>
                  
                  {/* Email input */}
                  <div className="mb-5">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={cn(
                          "block w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors",
                          errors.email
                            ? "border-red-300 text-red-900 focus:border-red-500 focus:ring-red-100"
                            : "border-gray-300 focus:border-nimocare-400 focus:ring-nimocare-100"
                        )}
                        placeholder="your@email.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                  
                  {/* Phone input */}
                  <div className="mb-5">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className={cn(
                          "block w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors",
                          errors.phone
                            ? "border-red-300 text-red-900 focus:border-red-500 focus:ring-red-100"
                            : "border-gray-300 focus:border-nimocare-400 focus:ring-nimocare-100"
                        )}
                        placeholder="(123) 456-7890"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>
                  
                  {/* Password input */}
                  <div className="mb-5">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        className={cn(
                          "block w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors",
                          errors.password
                            ? "border-red-300 text-red-900 focus:border-red-500 focus:ring-red-100"
                            : "border-gray-300 focus:border-nimocare-400 focus:ring-nimocare-100"
                        )}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                    )}
                    
                    {/* Password strength indicator */}
                    {formData.password && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex-1 h-1.5 bg-gray-200 rounded overflow-hidden mr-2">
                            <div
                              className={cn(
                                "h-full rounded",
                                passwordStrength.strength === 1 && "bg-red-500",
                                passwordStrength.strength === 2 && "bg-yellow-500",
                                passwordStrength.strength === 3 && "bg-blue-500",
                                passwordStrength.strength === 4 && "bg-green-500"
                              )}
                              style={{ width: `${passwordStrength.strength * 25}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500">{passwordStrength.text}</span>
                        </div>
                        <p className="text-xs text-gray-500">
                          Use 8+ characters with a mix of letters, numbers & symbols
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {/* Confirm Password input */}
                  <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={cn(
                          "block w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors",
                          errors.confirmPassword
                            ? "border-red-300 text-red-900 focus:border-red-500 focus:ring-red-100"
                            : "border-gray-300 focus:border-nimocare-400 focus:ring-nimocare-100"
                        )}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={toggleConfirmPasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                    )}
                  </div>
                  
                  {/* Terms and Conditions */}
                  <div className="mb-6">
                    <div className="flex items-start">
                      <button
                        type="button"
                        className={cn(
                          "w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center mr-2 mt-0.5 transition-colors",
                          agreeTerms
                            ? "bg-nimocare-600 border-nimocare-600 text-white"
                            : "border-gray-300 bg-white"
                        )}
                        onClick={() => setAgreeTerms(!agreeTerms)}
                        aria-checked={agreeTerms}
                        role="checkbox"
                      >
                        {agreeTerms && <Check className="w-3.5 h-3.5" />}
                      </button>
                      <div>
                        <label 
                          className="text-sm text-gray-600 cursor-pointer"
                          onClick={() => setAgreeTerms(!agreeTerms)}
                        >
                          I agree to the{' '}
                          <Link 
                            to="/terms" 
                            className="text-nimocare-600 hover:text-nimocare-700"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Terms of Service
                          </Link>
                          {' '}and{' '}
                          <Link 
                            to="/privacy" 
                            className="text-nimocare-600 hover:text-nimocare-700"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Privacy Policy
                          </Link>
                        </label>
                        {errors.terms && (
                          <p className="mt-1 text-sm text-red-600">{errors.terms}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Register button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={cn(
                      "w-full py-2.5 rounded-md font-medium text-white flex items-center justify-center",
                      isLoading
                        ? "bg-nimocare-400 cursor-not-allowed"
                        : "bg-nimocare-600 hover:bg-nimocare-700 transition-colors"
                    )}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </button>
                  
                  {/* Social registration */}
                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">
                          Or sign up with
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mt-6">
                      <button
                        type="button"
                        className="flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 transition-colors"
                      >
                        <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                        </svg>
                        Google
                      </button>
                      
                      <button
                        type="button"
                        className="flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 transition-colors"
                      >
                        <svg className="h-5 w-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                          <path
                            d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                          />
                        </svg>
                        Facebook
                      </button>
                    </div>
                  </div>
                </form>
                
                {/* Login link */}
                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link 
                      to="/login" 
                      className="font-medium text-nimocare-600 hover:text-nimocare-700"
                    >
                      Log in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
