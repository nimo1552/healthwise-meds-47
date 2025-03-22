
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
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

const PrescriptionUpload = () => {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isFaqOpen, setIsFaqOpen] = useState<Record<number, boolean>>({});
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // FAQ data
  const faqs = [
    {
      question: "What is a valid prescription?",
      answer: "A valid prescription must be issued by a licensed healthcare provider and include patient information, medication details, dosage, and the provider's signature."
    },
    {
      question: "How do I know if my medication requires a prescription?",
      answer: "Medications that require a prescription will be marked with an 'Rx Required' label on our website. These medications cannot be purchased without a valid prescription."
    },
    {
      question: "How long does prescription verification take?",
      answer: "Our pharmacists typically verify prescriptions within 1-2 hours during business hours. For uploads outside business hours, verification will be completed the next business day."
    },
    {
      question: "What file formats are accepted for prescription uploads?",
      answer: "We accept JPG, JPEG, PNG, and PDF files. Files should be clear, legible, and include all relevant prescription information."
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
    // Open device camera/file picker - this is a simplified implementation
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
      
      // In a real app, you would handle the actual file upload here
      console.log('Files to upload:', files);
    }, 3000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Header */}
        <section className="bg-nimocare-50/50 py-10 md:py-16">
          <div className="container-custom">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Upload Prescription</h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Upload your valid prescription to purchase prescription medications. Our pharmacists will verify it before processing your order.
            </p>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Upload Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm p-6">
                  {uploadStatus === 'success' ? (
                    <div className="text-center py-10">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                      </div>
                      
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">Prescription Uploaded Successfully</h2>
                      <p className="text-gray-600 mb-8 max-w-md mx-auto">
                        Our pharmacists will verify your prescription shortly. You will receive a notification once it's approved.
                      </p>
                      
                      <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link 
                          to="/products" 
                          className="btn-secondary inline-flex items-center justify-center"
                        >
                          Continue Shopping
                        </Link>
                        
                        <Link 
                          to="/cart" 
                          className="btn-primary inline-flex items-center justify-center"
                        >
                          Go to Cart
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <h2 className="text-xl font-bold text-gray-900 mb-6">Upload Your Prescription</h2>
                      
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
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Ensure your prescription is clear and legible.</li>
                            <li>Prescriptions must be issued by a licensed healthcare provider.</li>
                            <li>Include all prescription details, including dosage instructions.</li>
                            <li>Our pharmacists will verify your prescription within 1-2 hours during business hours.</li>
                          </ul>
                        </div>
                      </div>
                      
                      {/* Submit button */}
                      <div className="mt-6">
                        <button
                          type="submit"
                          disabled={files.length === 0 || uploadStatus === 'uploading'}
                          className={cn(
                            "w-full py-3 rounded-md font-medium text-white flex items-center justify-center",
                            files.length === 0 || uploadStatus === 'uploading'
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-nimocare-600 hover:bg-nimocare-700 transition-colors"
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
                        </button>
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
                      Our customer support team is available to assist you with prescription uploads and verification.
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
