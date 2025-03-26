import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { 
  CreditCard, 
  Calendar, 
  Lock, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Loader2,
  Bitcoin,
  DollarSign
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const creditCardSchema = z.object({
  cardNumber: z.string()
    .min(16, { message: "Card number must be at least 16 digits" })
    .max(19, { message: "Card number cannot exceed 19 digits" })
    .regex(/^[0-9\s-]+$/, { message: "Card number can only contain numbers, spaces or dashes" }),
  cardholderName: z.string().min(3, { message: "Please enter the cardholder name" }),
  expiryDate: z.string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, { message: "Expiry date must be in MM/YY format" }),
  cvv: z.string()
    .length(3, { message: "CVV must be 3 digits" })
    .regex(/^[0-9]+$/, { message: "CVV can only contain numbers" }),
});

const upiSchema = z.object({
  upiId: z.string()
    .min(5, { message: "UPI ID is required" })
    .regex(/^[a-zA-Z0-9.\-_]{3,}@[a-zA-Z]{3,}$/, { message: "Please enter a valid UPI ID (e.g., name@upi)" }),
});

const paypalSchema = z.object({
  email: z.string()
    .email({ message: "Please enter a valid email address" }),
});

const cryptoSchema = z.object({
  walletAddress: z.string()
    .min(10, { message: "Wallet address is required" }),
});

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [activePaymentMethod, setActivePaymentMethod] = useState("card");
  
  const orderDetails = location.state?.orderDetails || {
    subtotal: 89.97,
    shipping: 0,
    tax: 5.40,
    discount: 0,
    total: 95.37,
    items: [
      {
        id: 1,
        name: "Acetaminophen 500mg",
        price: 12.99,
        quantity: 2,
      },
      {
        id: 2,
        name: "Digital Thermometer",
        price: 24.99,
        quantity: 1,
      },
      {
        id: 3,
        name: "First Aid Kit",
        price: 39.00,
        quantity: 1,
      }
    ]
  };
  
  const cardForm = useForm<z.infer<typeof creditCardSchema>>({
    resolver: zodResolver(creditCardSchema),
    defaultValues: {
      cardNumber: "",
      cardholderName: "",
      expiryDate: "",
      cvv: "",
    },
  });
  
  const upiForm = useForm<z.infer<typeof upiSchema>>({
    resolver: zodResolver(upiSchema),
    defaultValues: {
      upiId: "",
    },
  });
  
  const paypalForm = useForm<z.infer<typeof paypalSchema>>({
    resolver: zodResolver(paypalSchema),
    defaultValues: {
      email: "",
    },
  });
  
  const cryptoForm = useForm<z.infer<typeof cryptoSchema>>({
    resolver: zodResolver(cryptoSchema),
    defaultValues: {
      walletAddress: "",
    },
  });
  
  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
    return formatted;
  };
  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    cardForm.setValue("cardNumber", formatted);
  };
  
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    
    if (value.length > 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }
    
    cardForm.setValue("expiryDate", value);
  };
  
  const handlePaymentSubmit = (data: any) => {
    setIsProcessing(true);
    
    console.log(`Payment data (${activePaymentMethod}):`, data);
    
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccessDialog(true);
      
      toast({
        title: "Payment Successful",
        description: `Your payment using ${getPaymentMethodName(activePaymentMethod)} was successful`,
        variant: "default",
      });
    }, 2000);
  };
  
  const getPaymentMethodName = (method: string) => {
    switch (method) {
      case "card": return "Credit Card";
      case "upi": return "UPI";
      case "paypal": return "PayPal";
      case "crypto": return "Cryptocurrency";
      default: return "Payment Method";
    }
  };
  
  const handleCompleteOrder = () => {
    setShowSuccessDialog(false);
    
    navigate("/order-confirmation", { 
      state: { 
        orderItems: orderDetails.items,
        orderTotal: orderDetails.total,
        orderSubtotal: orderDetails.subtotal,
        orderShipping: orderDetails.shipping,
        orderTax: orderDetails.tax,
        orderDiscount: orderDetails.discount,
        paymentMethod: getPaymentMethodName(activePaymentMethod)
      } 
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-16">
        <div className="container-custom max-w-4xl">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Payment Details</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <Tabs defaultValue="card" value={activePaymentMethod} onValueChange={setActivePaymentMethod}>
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Select Payment Method
                    </h2>
                    
                    <TabsList className="grid grid-cols-4 gap-2">
                      <TabsTrigger value="card" className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        <span className="hidden sm:inline">Card</span>
                      </TabsTrigger>
                      <TabsTrigger value="upi" className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                          <path d="m22 2-7 20-4-9-9-4Z"></path>
                          <path d="M22 2 11 13"></path>
                        </svg>
                        <span className="hidden sm:inline">UPI</span>
                      </TabsTrigger>
                      <TabsTrigger value="paypal" className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        <span className="hidden sm:inline">PayPal</span>
                      </TabsTrigger>
                      <TabsTrigger value="crypto" className="flex items-center gap-2">
                        <Bitcoin className="h-4 w-4" />
                        <span className="hidden sm:inline">Crypto</span>
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <div className="p-6">
                    <TabsContent value="card">
                      <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                        <CreditCard className="inline-block mr-2 h-5 w-5 text-nimocare-600" />
                        Credit/Debit Card
                      </h3>
                      
                      <Form {...cardForm}>
                        <form onSubmit={cardForm.handleSubmit(handlePaymentSubmit)} className="space-y-6">
                          <FormField
                            control={cardForm.control}
                            name="cardNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Card Number</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input 
                                      {...field}
                                      placeholder="1234 5678 9012 3456"
                                      className="pl-10"
                                      maxLength={19}
                                      onChange={handleCardNumberChange}
                                    />
                                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={cardForm.control}
                            name="cardholderName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Cardholder Name</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field}
                                    placeholder="John Doe"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={cardForm.control}
                              name="expiryDate"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Expiration Date</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Input 
                                        {...field}
                                        placeholder="MM/YY"
                                        className="pl-10"
                                        maxLength={5}
                                        onChange={handleExpiryDateChange}
                                      />
                                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={cardForm.control}
                              name="cvv"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>CVV</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Input 
                                        {...field}
                                        type="password"
                                        placeholder="123"
                                        className="pl-10"
                                        maxLength={3}
                                      />
                                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="pt-4">
                            <Button 
                              type="submit" 
                              className="w-full bg-nimocare-600 hover:bg-nimocare-700"
                              disabled={isProcessing}
                            >
                              {isProcessing ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Processing Payment...
                                </>
                              ) : (
                                <>
                                  Pay ${orderDetails.total.toFixed(2)}
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                              )}
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </TabsContent>
                    
                    <TabsContent value="upi">
                      <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-2 h-5 w-5 text-nimocare-600">
                          <path d="m22 2-7 20-4-9-9-4Z"></path>
                          <path d="M22 2 11 13"></path>
                        </svg>
                        UPI Payment
                      </h3>
                      
                      <Form {...upiForm}>
                        <form onSubmit={upiForm.handleSubmit(handlePaymentSubmit)} className="space-y-6">
                          <FormField
                            control={upiForm.control}
                            name="upiId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>UPI ID</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input 
                                      {...field}
                                      placeholder="yourname@upi"
                                      className="pl-10"
                                    />
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500">
                                      <path d="m22 2-7 20-4-9-9-4Z"></path>
                                      <path d="M22 2 11 13"></path>
                                    </svg>
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="pt-4">
                            <Button 
                              type="submit" 
                              className="w-full bg-nimocare-600 hover:bg-nimocare-700"
                              disabled={isProcessing}
                            >
                              {isProcessing ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Processing UPI Payment...
                                </>
                              ) : (
                                <>
                                  Pay ${orderDetails.total.toFixed(2)} with UPI
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                              )}
                            </Button>
                          </div>
                          
                          <div className="mt-4 p-4 bg-gray-50 rounded-md">
                            <p className="text-sm text-gray-600">
                              Enter your UPI ID to make a quick and secure payment. You will receive a payment request on your UPI app.
                            </p>
                          </div>
                        </form>
                      </Form>
                    </TabsContent>
                    
                    <TabsContent value="paypal">
                      <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                        <DollarSign className="inline-block mr-2 h-5 w-5 text-nimocare-600" />
                        PayPal
                      </h3>
                      
                      <Form {...paypalForm}>
                        <form onSubmit={paypalForm.handleSubmit(handlePaymentSubmit)} className="space-y-6">
                          <FormField
                            control={paypalForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>PayPal Email</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input 
                                      {...field}
                                      type="email"
                                      placeholder="email@example.com"
                                      className="pl-10"
                                    />
                                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="pt-4">
                            <Button 
                              type="submit" 
                              className="w-full bg-paypal hover:bg-paypal/90 text-white"
                              style={{ backgroundColor: "#0070ba" }}
                              disabled={isProcessing}
                            >
                              {isProcessing ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Processing PayPal Payment...
                                </>
                              ) : (
                                <>
                                  Pay ${orderDetails.total.toFixed(2)} with PayPal
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                              )}
                            </Button>
                          </div>
                          
                          <div className="mt-4 p-4 bg-gray-50 rounded-md">
                            <p className="text-sm text-gray-600">
                              You will be redirected to PayPal to complete your payment securely.
                            </p>
                          </div>
                        </form>
                      </Form>
                    </TabsContent>
                    
                    <TabsContent value="crypto">
                      <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                        <Bitcoin className="inline-block mr-2 h-5 w-5 text-nimocare-600" />
                        Cryptocurrency
                      </h3>
                      
                      <Form {...cryptoForm}>
                        <form onSubmit={cryptoForm.handleSubmit(handlePaymentSubmit)} className="space-y-6">
                          <FormField
                            control={cryptoForm.control}
                            name="walletAddress"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Wallet Address</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input 
                                      {...field}
                                      placeholder="Enter your wallet address"
                                      className="pl-10"
                                    />
                                    <Bitcoin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="pt-4">
                            <Button 
                              type="submit" 
                              className="w-full bg-bitcoin hover:bg-bitcoin/90 text-white"
                              style={{ backgroundColor: "#f7931a" }}
                              disabled={isProcessing}
                            >
                              {isProcessing ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Processing Crypto Payment...
                                </>
                              ) : (
                                <>
                                  Pay ${orderDetails.total.toFixed(2)} with Crypto
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                              )}
                            </Button>
                          </div>
                          
                          <div className="mt-4 p-4 bg-gray-50 rounded-md">
                            <p className="text-sm text-gray-600">
                              We accept Bitcoin (BTC), Ethereum (ETH), and other major cryptocurrencies.
                            </p>
                          </div>
                        </form>
                      </Form>
                    </TabsContent>
                  </div>
                </Tabs>
                
                <div className="p-6 bg-gray-50 border-t border-gray-200">
                  <div className="flex items-center space-x-2 text-sm">
                    <ShieldCheck className="h-4 w-4 text-green-600" />
                    <span className="text-gray-600">
                      Your payment information is securely processed and never stored.
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden sticky top-24">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    {orderDetails.items.map((item: any) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.name} x {item.quantity}
                        </span>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${orderDetails.subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">
                        {orderDetails.shipping === 0 ? "Free" : `$${orderDetails.shipping.toFixed(2)}`}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">${orderDetails.tax.toFixed(2)}</span>
                    </div>
                    
                    {orderDetails.discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-${orderDetails.discount.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span className="text-lg font-bold">${orderDetails.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Payment Successful!</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center py-6">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-center text-gray-600 mb-6">
              Your payment has been processed successfully. Thank you for your purchase!
            </p>
            <Button 
              onClick={handleCompleteOrder}
              className="bg-nimocare-600 hover:bg-nimocare-700"
            >
              Complete Order
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Payment;
