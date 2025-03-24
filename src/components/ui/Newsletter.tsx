
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

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
    <section className="section-padding bg-nimocare-50">
      <div className="container-custom">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100 p-8 md:p-12">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-nimocare-100 flex items-center justify-center">
                <Mail className="h-8 w-8 text-nimocare-600" />
              </div>
            </div>
            
            <motion.h2 
              className="text-2xl md:text-3xl font-bold text-gray-900 mb-3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Subscribe to Our Newsletter
            </motion.h2>
            
            <motion.p 
              className="text-gray-600 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Stay updated with the latest health tips, medicine information, and exclusive offers from our pharmacy.
            </motion.p>
            
            {!isSubscribed ? (
              <motion.form 
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow"
                  required
                />
                <Button type="submit" className="bg-nimocare-600 hover:bg-nimocare-700">
                  Subscribe
                </Button>
              </motion.form>
            ) : (
              <motion.div 
                className="flex items-center justify-center text-green-600 space-x-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <CheckCircle className="h-5 w-5" />
                <span>Thank you for subscribing!</span>
              </motion.div>
            )}
            
            <motion.p 
              className="text-sm text-gray-500 mt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              We respect your privacy and will never share your information.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
