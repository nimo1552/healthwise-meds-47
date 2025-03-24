
import { useState } from 'react';
import { MessageCircle, X, Send, User, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean; time: string }[]>([
    { 
      text: "Hi there! How can I help you with your medication or health needs today?", 
      isUser: false, 
      time: "Just now" 
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage = {
      text: newMessage,
      isUser: true,
      time: "Just now"
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    // Simulate automated response after a short delay
    setTimeout(() => {
      const botResponses = [
        "I'll be happy to help with that. Can you provide more details?",
        "Thank you for your question. Let me check that information for you.",
        "I understand your concern. One of our pharmacists can provide more specific advice on this.",
        "That's a great question. The recommended dosage depends on several factors.",
        "I'm looking into that for you now. It should take just a moment."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage = {
        text: randomResponse,
        isUser: false,
        time: "Just now"
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <>
      {/* Chat button */}
      <motion.button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-nimocare-600 to-nimocare-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>
      
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-full max-w-sm bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
            initial={{ y: 20, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-nimocare-500 to-nimocare-600 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    <Headphones size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium">Nimocare Support</h3>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      <span className="text-xs text-nimocare-100">Online</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={toggleChat}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            {/* Chat messages */}
            <div className="p-4 h-80 overflow-y-auto bg-gray-50">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div 
                    key={index}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`
                      max-w-[75%] rounded-2xl p-3 
                      ${message.isUser 
                        ? 'bg-nimocare-600 text-white rounded-tr-none' 
                        : 'bg-white border border-gray-200 text-gray-700 rounded-tl-none shadow-sm'
                      }
                    `}>
                      <div className="flex items-start mb-1">
                        {!message.isUser && (
                          <div className="w-6 h-6 rounded-full bg-nimocare-100 flex items-center justify-center mr-2 flex-shrink-0">
                            <Headphones size={12} className="text-nimocare-600" />
                          </div>
                        )}
                        <p className="text-sm">{message.text}</p>
                      </div>
                      <div className={`text-right text-xs ${message.isUser ? 'text-nimocare-200' : 'text-gray-400'}`}>
                        {message.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Chat input */}
            <form onSubmit={sendMessage} className="p-4 border-t border-gray-100">
              <div className="flex space-x-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow bg-gray-50 border-gray-200"
                />
                <Button 
                  type="submit"
                  className="bg-nimocare-600 hover:bg-nimocare-700 flex-shrink-0"
                >
                  <Send size={18} />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiveChat;
