
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, Lock } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

const AdminAI = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([
    { role: 'ai', content: 'Hello! I\'m your admin assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const correctPassword = "admin123"; // Change this to your preferred password
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleAuth = () => {
    if (password === correctPassword) {
      setIsAuthorized(true);
      // Store auth in session storage to persist until browser is closed
      sessionStorage.setItem('adminAuth', 'true');
    } else {
      toast.error("Incorrect password");
    }
  };

  // Check if already authorized on mount
  useEffect(() => {
    const isAuth = sessionStorage.getItem('adminAuth') === 'true';
    setIsAuthorized(isAuth);
  }, []);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    const userQuery = input;
    setInput('');
    setIsLoading(true);
    
    // Simulate AI response (in a real app, this would be an API call)
    setTimeout(() => {
      // Simple responses based on keywords - you could replace this with an actual AI API
      let response = "I'm not sure how to respond to that. Can you please try asking something else?";
      
      const query = userQuery.toLowerCase();
      if (query.includes('hello') || query.includes('hi')) {
        response = "Hello! How can I assist you today?";
      } else if (query.includes('help')) {
        response = "I can help you with managing your store, answering questions about your products, or providing insights about your customers. What would you like to know?";
      } else if (query.includes('logout')) {
        response = "To logout, you can click the 'Logout' button in the sidebar or simply close this browser tab. For security, your session will automatically end when you close the browser.";
      } else if (query.includes('sales') || query.includes('revenue')) {
        response = "Your store has generated $1,245.75 in revenue this month, which is a 15% increase from last month.";
      } else if (query.includes('customer') || query.includes('user')) {
        response = "You currently have 28 registered customers. Your most active customer is John Smith with 5 orders this month.";
      } else if (query.includes('order')) {
        response = "You have 32 total orders, with 5 pending fulfillment. The average order value is $38.93.";
      } else if (query.includes('product')) {
        response = "You have 5 products in your inventory. Your best-selling product is Paracetamol 500mg with 15 units sold this month.";
      }
      
      // Add AI response
      setMessages(prev => [...prev, { role: 'ai', content: response }]);
      setIsLoading(false);
    }, 1000);
  };

  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Lock className="w-12 h-12 mx-auto text-nimocare-600 mb-2" />
            <CardTitle>Admin Access Required</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Input 
                  type="password" 
                  placeholder="Enter password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
                />
              </div>
              <Button className="w-full bg-nimocare-600 hover:bg-nimocare-700" onClick={handleAuth}>
                Access Admin AI
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <Card className="border-2 shadow-lg">
        <CardHeader className="bg-nimocare-50 border-b">
          <CardTitle className="flex items-center gap-2 text-nimocare-600">
            <Bot /> Admin AI Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col h-[70vh]">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`
                        max-w-[80%] rounded-lg p-3 
                        ${message.role === 'user' 
                          ? 'bg-nimocare-600 text-white rounded-tr-none' 
                          : 'bg-gray-100 text-gray-800 rounded-tl-none'
                        }
                      `}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {message.role === 'user' 
                          ? <User className="h-4 w-4" /> 
                          : <Bot className="h-4 w-4" />
                        }
                        <span className="text-xs font-medium">{message.role === 'user' ? 'You' : 'Admin AI'}</span>
                      </div>
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 rounded-lg rounded-tl-none max-w-[80%] p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Bot className="h-4 w-4" />
                        <span className="text-xs font-medium">Admin AI</span>
                      </div>
                      <LoadingSpinner size="sm" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask something..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage} 
                  className="bg-nimocare-600 hover:bg-nimocare-700"
                  disabled={isLoading || !input.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAI;
