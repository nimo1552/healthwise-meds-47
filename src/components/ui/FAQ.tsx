
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqItems = [
  {
    question: "How do I order prescription medications?",
    answer: "To order prescription medications, you'll need to upload a valid prescription through our secure prescription upload system. Navigate to the Prescription Upload page, follow the instructions to upload your prescription, and our pharmacists will verify it before processing your order."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and health savings account (HSA) and flexible spending account (FSA) cards for eligible items."
  },
  {
    question: "How long will it take to receive my order?",
    answer: "Standard delivery typically takes 2-5 business days. We also offer express delivery options at checkout. Prescription medications are typically delivered within 24 hours after verification of your prescription."
  },
  {
    question: "Can I return medications I've purchased?",
    answer: "Due to safety regulations, we cannot accept returns on prescription medications. For over-the-counter products, we offer a 30-day return policy for unopened items. Please contact our customer service for assistance with returns."
  },
  {
    question: "Do you ship internationally?",
    answer: "Currently, we only ship within the United States due to varying regulations regarding medication across different countries."
  },
  {
    question: "How do I track my order?",
    answer: "You can track your order by visiting the Order Tracking page and entering your order number. You'll also receive email updates with tracking information when your order ships."
  },
  {
    question: "Are my personal and health information secure?",
    answer: "Yes, we take privacy and security seriously. All personal and health information is encrypted and stored securely in compliance with HIPAA regulations. We never share your information with third parties without your consent."
  },
  {
    question: "Can I transfer my prescription from another pharmacy?",
    answer: "Yes, you can transfer your prescription from another pharmacy. Simply provide us with your prescription information and the details of your current pharmacy during checkout, and our pharmacists will handle the transfer process for you."
  }
];

const FAQ = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="inline-block bg-nimocare-100 text-nimocare-600 px-3 py-1 rounded-full text-sm font-medium mb-3">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our services, ordering process, and more.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left px-6 py-4 hover:no-underline text-gray-900 font-medium">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-0 text-gray-600">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="text-center mt-10">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <div className="inline-flex space-x-4">
            <a href="#" className="text-nimocare-600 hover:text-nimocare-700 font-medium">
              Contact Support
            </a>
            <a href="#" className="text-nimocare-600 hover:text-nimocare-700 font-medium">
              Live Chat
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
