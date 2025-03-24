
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, CheckCircle, Send } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    // In a real application, you would call an API to handle subscription
    setTimeout(() => {
      setIsSubscribed(true);
      toast.success("Successfully subscribed to newsletter!");
    }, 1000);
  };
  
  return (
    <section className="section-padding bg-gradient-to-br from-nimocare-50/60 via-white to-nimocare-50/60">
      <div className="container-custom">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-medium overflow-hidden border border-nimocare-200/50 p-8 md:p-12">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-nimocare-400 to-nimocare-600 flex items-center justify-center shadow-soft">
                <Mail className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <motion.h2 
              className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 text-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Stay Updated with <span className="text-gradient">Nimocare</span>
            </motion.h2>
            
            <motion.p 
              className="text-gray-600 mb-8 max-w-2xl mx-auto text-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Subscribe to receive personalized health tips, exclusive offers, and updates on new medications tailored to your needs.
            </motion.p>
            
            <AnimatePresence mode="wait">
              {!isSubscribed ? (
                <motion.form 
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto relative z-10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative flex-grow">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-nimocare-400 w-5 h-5" />
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 pr-4 py-6 bg-white/80 border-nimocare-200 focus:border-nimocare-400 rounded-xl"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="bg-gradient-to-r from-nimocare-500 to-nimocare-600 hover:from-nimocare-600 hover:to-nimocare-700 rounded-xl py-6 transition-all duration-300 shadow-soft hover:shadow-medium"
                  >
                    <span>Subscribe</span>
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  className="flex flex-col items-center justify-center text-nimocare-600 space-y-3 p-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, type: "spring" }}
                >
                  <div className="w-16 h-16 rounded-full bg-nimocare-100 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <span className="text-lg font-medium">Thank you for subscribing!</span>
                  <p className="text-sm text-gray-600 text-center max-w-md">
                    We've sent a confirmation email to your inbox. Please check your email to complete the subscription process.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            
            <motion.div 
              className="relative mt-10 pt-6 border-t border-gray-100"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
                <span className="flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1 text-nimocare-500" />
                  Weekly Health Tips
                </span>
                <span className="flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1 text-nimocare-500" />
                  Exclusive Offers
                </span>
                <span className="flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1 text-nimocare-500" />
                  New Medication Alerts
                </span>
                <span className="flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1 text-nimocare-500" />
                  Unsubscribe Anytime
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
