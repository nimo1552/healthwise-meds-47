
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Send, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // In a real application, you would send this data to an API
    setTimeout(() => {
      setIsSubmitted(true);
      toast.success("Your message has been sent!");
    }, 1000);
  };

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-nimocare-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -left-24 w-72 h-72 bg-nimocare-100/30 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block bg-nimocare-100 text-nimocare-600 px-3 py-1 rounded-full text-sm font-medium mb-3">
            Get In Touch
          </span>
          <h2 className="header-2 text-gray-900 mb-4">Contact Our Healthcare Team</h2>
          <p className="subtitle-1 mx-auto">
            Have questions about our services or medications? Our dedicated healthcare professionals are here to help.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative">
          {/* Contact Information */}
          <motion.div 
            className="lg:col-span-2 bg-gradient-to-br from-nimocare-600 to-nimocare-700 text-white p-8 rounded-2xl shadow-medium"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="h-full flex flex-col">
              <div className="mb-8">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                  <MessageSquare className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Let's start a conversation</h3>
                <p className="text-nimocare-100">
                  Our team is available 24/7 to answer your questions and provide healthcare guidance.
                </p>
              </div>

              <div className="space-y-6 flex-grow">
                <div>
                  <h4 className="text-sm font-medium text-nimocare-100 mb-2">Email Us</h4>
                  <p className="text-white text-lg">support@nimocare.com</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-nimocare-100 mb-2">Call Us</h4>
                  <p className="text-white text-lg">+1 (800) 555-0123</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-nimocare-100 mb-2">Pharmacy Hours</h4>
                  <p className="text-white">Mon-Fri: 8am - 8pm EST</p>
                  <p className="text-white">Sat-Sun: 9am - 6pm EST</p>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-nimocare-500/50">
                <p className="text-sm text-nimocare-100">
                  For medical emergencies, please call 911 or visit your nearest emergency room.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="lg:col-span-3 bg-white border border-gray-100 p-8 rounded-2xl shadow-soft"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Send us a message</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-gray-700">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="bg-gray-50 border-gray-200 focus:border-nimocare-400"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="bg-gray-50 border-gray-200 focus:border-nimocare-400"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      Phone Number (Optional)
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="bg-gray-50 border-gray-200 focus:border-nimocare-400"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-700">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      className="bg-gray-50 border-gray-200 focus:border-nimocare-400 min-h-[120px]"
                      required
                    />
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-nimocare-500 to-nimocare-600 hover:from-nimocare-600 hover:to-nimocare-700 rounded-xl py-6 transition-all duration-300"
                    >
                      <span>Send Message</span>
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  
                  <p className="text-xs text-gray-500 text-center">
                    By submitting this form, you agree to our <a href="#" className="text-nimocare-600 hover:underline">Privacy Policy</a> and consent to be contacted regarding your request.
                  </p>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  className="flex flex-col items-center justify-center text-center py-16"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="w-20 h-20 rounded-full bg-nimocare-100 flex items-center justify-center mb-6">
                    <CheckCircle className="h-10 w-10 text-nimocare-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Thank you for reaching out!</h3>
                  <p className="text-gray-600 max-w-md mb-8">
                    We've received your message and will get back to you within 24 hours. A confirmation has been sent to your email.
                  </p>
                  <Button 
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        message: ''
                      });
                    }}
                    variant="outline"
                    className="border-nimocare-200 hover:bg-nimocare-50"
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
