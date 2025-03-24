
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  Upload, 
  Camera, 
  File, 
  X, 
  CheckCircle, 
  ChevronDown, 
  Info, 
  ShieldCheck,
  ArrowRight,
  Loader2,
  PhoneCall,
  Store
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from "sonner";

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

const PrescriptionUpload = () => {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isFaqOpen, setIsFaqOpen] = useState<Record<number, boolean>>({});
  const [showPrescriptionInfo, setShowPrescriptionInfo] = useState(true);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // FAQ data
  const faqs = [
    {
      question: "Do I need to upload my prescription before ordering?",
      answer: "No, you can place your order first. Our pharmacists will verify your prescription with your doctor directly. You'll receive confirmation once your prescription is verified."
    },
    {
      question: "How does prescription verification work?",
      answer: "After placing your order for prescription medication, our licensed pharmacists will contact your doctor to verify your prescription. This process typically takes 1-2 business days."
    },
    {
      question: "Can I still upload my prescription if I want to?",
      answer: "Yes, while not required, you can still upload your prescription to expedite the process. Our system securely stores your prescription and our pharmacists will review it promptly."
    },
    {
      question: "What if I don't have a prescription yet?",
      answer: "You can still browse and place orders for prescription medications. At checkout, you'll have the option to provide your doctor's contact information so our pharmacists can request a prescription directly."
    },
    {
      question: "Is my prescription information secure?",
      answer: "Yes. We use industry-standard encryption to secure your data. Your prescription information is only accessible to authorized pharmacists and is used solely for verification purposes."
    }
  ];
  
  const toggleFaq = (index: number) => {
    setIsFaqOpen(prev => ({ ...prev, [index]: !prev[index] }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      const newFiles = [...files, ...fileList];
      setFiles(newFiles);
      
      // Generate preview URLs
      const newPreviewUrls = fileList.map(file => URL.createObjectURL(file));
      setPreviewUrls([...previewUrls, ...newPreviewUrls]);
    }
  };
  
  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    const newPreviewUrls = [...previewUrls];
    
    // Release object URL to prevent memory leaks
    URL.revokeObjectURL(newPreviewUrls[index]);
    
    newFiles.splice(index, 1);
    newPreviewUrls.splice(index, 1);
    
    setFiles(newFiles);
    setPreviewUrls(newPreviewUrls);
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add('border-nimocare-600');
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('border-nimocare-600');
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('border-nimocare-600');
    
    if (e.dataTransfer.files) {
      const fileList = Array.from(e.dataTransfer.files);
      const newFiles = [...files, ...fileList];
      setFiles(newFiles);
      
      // Generate preview URLs
      const newPreviewUrls = fileList.map(file => URL.createObjectURL(file));
      setPreviewUrls([...previewUrls, ...newPreviewUrls]);
    }
  };
  
  const handleCameraClick = () => {
    // Open device camera/file picker
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const validateFiles = () => {
    const validationErrors = [];
    
    if (files.length === 0) {
      validationErrors.push("Please upload at least one prescription image or document.");
      return validationErrors;
    }
    
    // Check file sizes and types
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileType = file.type;
      const fileSize = file.size / 1024 / 1024; // size in MB
      
      if (!['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'].includes(fileType)) {
        validationErrors.push(`File ${file.name} has an invalid format. Only JPG, PNG, and PDF files are accepted.`);
      }
      
      if (fileSize > 10) {
        validationErrors.push(`File ${file.name} exceeds the 10MB size limit.`);
      }
    }
    
    return validationErrors;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateFiles();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setErrors([]);
    setUploadStatus('uploading');
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
    
    // Simulate upload process
    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);
      setUploadStatus('success');
      toast.success("Prescription uploaded successfully!");
      
      // In a real app, you would handle the actual file upload here
      console.log('Files to upload:', files);
    }, 3000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Header */}
        <section className="bg-gradient-to-r from-nimocare-50/80 to-blue-50/80 py-10 md:py-16">
          <div className="container-custom">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Prescription Information</h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Understanding our prescription verification process for a smooth shopping experience.
            </p>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {showPrescriptionInfo ? (
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-gray-100">
                      <h2 className="text-xl font-bold text-gray-900 mb-4">How Prescription Verification Works</h2>
                      
                      <div className="space-y-6">
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-nimocare-100 flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-nimocare-700 font-bold">1</span>
                          </div>
                          <div className="ml-4">
                            <h3 className="font-medium text-gray-900 mb-1">Place Your Order</h3>
                            <p className="text-gray-600">
                              Browse our products and add prescription medications to your cart. Complete the checkout process normally.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-nimocare-100 flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-nimocare-700 font-bold">2</span>
                          </div>
                          <div className="ml-4">
                            <h3 className="font-medium text-gray-900 mb-1">Provide Doctor Information</h3>
                            <p className="text-gray-600">
                              During checkout, you'll be asked to provide your doctor's contact information for prescription medications.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-nimocare-100 flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-nimocare-700 font-bold">3</span>
                          </div>
                          <div className="ml-4">
                            <h3 className="font-medium text-gray-900 mb-1">Pharmacist Verification</h3>
                            <p className="text-gray-600">
                              Our licensed pharmacists will contact your doctor to verify your prescription. This typically takes 1-2 business days.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-nimocare-100 flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-nimocare-700 font-bold">4</span>
                          </div>
                          <div className="ml-4">
                            <h3 className="font-medium text-gray-900 mb-1">Order Processing</h3>
                            <p className="text-gray-600">
                              Once verified, we'll process and ship your order. You'll receive tracking information via email.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-4">
                        <div className="flex">
                          <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-blue-800 mb-1">Optional: Upload Your Prescription</h4>
                            <p className="text-blue-700 text-sm">
                              While not required, you can upload your prescription to expedite the verification process.
                            </p>
                            <Button 
                              variant="link" 
                              className="text-blue-600 p-0 h-auto mt-2"
                              onClick={() => setShowPrescriptionInfo(false)}
                            >
                              Upload prescription
                              <ArrowRight className="w-3 h-3 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-gray-50">
                      <h3 className="font-medium text-gray-900 mb-4">Alternative Ways to Verify Your Prescription</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-gray-200 rounded-lg p-4 bg-white">
                          <div className="flex items-start">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                              <PhoneCall className="w-4 h-4 text-indigo-600" />
                            </div>
                            <div className="ml-3">
                              <h4 className="font-medium text-gray-900">Call Us</h4>
                              <p className="text-sm text-gray-600 mt-1">
                                Call our pharmacy at (800) 555-1234 to provide your prescription details.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-4 bg-white">
                          <div className="flex items-start">
                            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                              <Store className="w-4 h-4 text-emerald-600" />
                            </div>
                            <div className="ml-3">
                              <h4 className="font-medium text-gray-900">Visit a Store</h4>
                              <p className="text-sm text-gray-600 mt-1">
                                Visit any of our physical locations with your prescription for immediate verification.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm p-6">
                    <div className="flex items-center mb-6">
                      <Button 
                        variant="ghost" 
                        className="mr-2 h-8 w-8 p-0"
                        onClick={() => setShowPrescriptionInfo(true)}
                      >
                        <ArrowRight className="w-4 h-4 rotate-180" />
                      </Button>
                      <h2 className="text-xl font-bold text-gray-900">Upload Your Prescription (Optional)</h2>
                    </div>
                    
                    {uploadStatus === 'success' ? (
                      <div className="text-center py-10">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <CheckCircle className="w-10 h-10 text-green-600" />
                        </div>
                        
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">Prescription Uploaded Successfully</h2>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                          Our pharmacists will review your prescription shortly. This will help expedite your order processing.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                          <Button
                            variant="outline"
                            className="flex items-center justify-center"
                            onClick={() => {
                              setUploadStatus('idle');
                              setFiles([]);
                              setPreviewUrls([]);
                              setUploadProgress(0);
                            }}
                          >
                            Upload Another Prescription
                          </Button>
                          
                          <Button asChild className="bg-nimocare-600 hover:bg-nimocare-700">
                            <Link to="/products">
                              Continue Shopping
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit}>
                        {/* File upload area */}
                        <div
                          className={cn(
                            "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
                            uploadStatus === 'uploading' ? "pointer-events-none bg-gray-50" : "hover:border-nimocare-400"
                          )}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/jpeg,image/jpg,image/png,application/pdf"
                            multiple
                            onChange={handleFileChange}
                            disabled={uploadStatus === 'uploading'}
                          />
                          
                          <Upload className="w-12 h-12 text-nimocare-500 mx-auto mb-4" />
                          
                          <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Drag & Drop or Click to Upload
                          </h3>
                          
                          <p className="text-gray-600 mb-4">
                            Supported formats: JPG, PNG, PDF (Max 10MB per file)
                          </p>
                          
                          <div className="flex flex-col sm:flex-row justify-center gap-3">
                            <button
                              type="button"
                              className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (fileInputRef.current) {
                                  fileInputRef.current.click();
                                }
                              }}
                              disabled={uploadStatus === 'uploading'}
                            >
                              <File className="w-4 h-4" />
                              <span>Choose File</span>
                            </button>
                            
                            <button
                              type="button"
                              className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCameraClick();
                              }}
                              disabled={uploadStatus === 'uploading'}
                            >
                              <Camera className="w-4 h-4" />
                              <span>Use Camera</span>
                            </button>
                          </div>
                        </div>
                        
                        {/* Upload progress */}
                        {uploadStatus === 'uploading' && (
                          <div className="mt-6">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">Uploading...</span>
                              <span className="text-gray-900 font-medium">{uploadProgress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-nimocare-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                        
                        {/* File previews */}
                        {files.length > 0 && (
                          <div className="mt-6">
                            <h3 className="text-sm font-medium text-gray-900 mb-3">
                              Uploaded Files ({files.length})
                            </h3>
                            
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                              {files.map((file, index) => (
                                <div 
                                  key={index} 
                                  className="relative rounded-md border border-gray-200 overflow-hidden group"
                                >
                                  {file.type.includes('image') ? (
                                    <div className="aspect-square bg-gray-100">
                                      <img 
                                        src={previewUrls[index]} 
                                        alt={`Preview ${index}`}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                  ) : (
                                    <div className="aspect-square bg-gray-100 flex items-center justify-center">
                                      <File className="w-10 h-10 text-gray-400" />
                                    </div>
                                  )}
                                  
                                  <div className="p-2 text-xs truncate">
                                    {file.name}
                                  </div>
                                  
                                  {uploadStatus !== 'uploading' && (
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveFile(index);
                                      }}
                                      className="absolute top-1 right-1 bg-white/80 rounded-full p-1 text-gray-600 hover:text-red-600 transition-colors"
                                      aria-label="Remove file"
                                    >
                                      <X className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Error messages */}
                        {errors.length > 0 && (
                          <div className="mt-6 bg-red-50 border border-red-200 rounded-md p-4">
                            <h3 className="text-sm font-medium text-red-800 mb-2">
                              Please correct the following errors:
                            </h3>
                            <ul className="list-disc pl-5 text-sm text-red-700 space-y-1">
                              {errors.map((error, index) => (
                                <li key={index}>{error}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {/* Information notice */}
                        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4 flex">
                          <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                          <div className="text-sm text-blue-700">
                            <p className="font-medium mb-1">Important Information</p>
                            <p className="mb-2">
                              Uploading your prescription is optional but can help expedite your order processing.
                            </p>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>Ensure your prescription is clear and legible.</li>
                              <li>Our pharmacists will still verify with your doctor if needed.</li>
                              <li>You can continue shopping without uploading a prescription.</li>
                            </ul>
                          </div>
                        </div>
                        
                        {/* Submit button */}
                        <div className="mt-6 flex gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            className="flex-1"
                            onClick={() => setShowPrescriptionInfo(true)}
                          >
                            Cancel
                          </Button>
                          
                          <Button
                            type="submit"
                            disabled={files.length === 0 || uploadStatus === 'uploading'}
                            className={cn(
                              "flex-1 flex items-center justify-center",
                              files.length === 0 || uploadStatus === 'uploading'
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-nimocare-600 hover:bg-nimocare-700"
                            )}
                          >
                            {uploadStatus === 'uploading' ? (
                              <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Uploading...
                              </>
                            ) : (
                              'Upload Prescription'
                            )}
                          </Button>
                        </div>
                        
                        {/* Security message */}
                        <div className="mt-4 text-center">
                          <p className="text-xs text-gray-500 flex items-center justify-center">
                            <ShieldCheck className="w-4 h-4 mr-1" />
                            Your prescription data is secure and encrypted
                          </p>
                        </div>
                      </form>
                    )}
                  </div>
                )}
              </div>
              
              {/* FAQ Section */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h2>
                  </div>
                  
                  <div className="divide-y divide-gray-100">
                    {faqs.map((faq, index) => (
                      <div key={index} className="p-6">
                        <button
                          onClick={() => toggleFaq(index)}
                          className="flex justify-between items-center w-full text-left"
                        >
                          <h3 className="font-medium text-gray-900">
                            {faq.question}
                          </h3>
                          <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isFaqOpen[index] ? 'transform rotate-180' : ''}`} />
                        </button>
                        
                        {isFaqOpen[index] && (
                          <div className="mt-3 text-gray-600 text-sm">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* Customer support */}
                  <div className="p-6 bg-gray-50 border-t border-gray-100">
                    <h3 className="font-medium text-gray-900 mb-2">Need Help?</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Our customer support team is available to assist you with prescription questions and order processing.
                    </p>
                    <Link
                      to="/contact"
                      className="text-nimocare-600 hover:text-nimocare-700 text-sm font-medium flex items-center"
                    >
                      Contact Support
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrescriptionUpload;
