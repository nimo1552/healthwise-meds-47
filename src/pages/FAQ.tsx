
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 md:pt-32">
        <div className="container-custom py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h1>
            <p className="text-gray-600 mb-8">Find answers to common questions about PharmaCare services and products.</p>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I track my order?</AccordionTrigger>
                <AccordionContent>
                  You can track your order by visiting the Order Tracking page and entering your order number. You can find your order number in the confirmation email we sent you after placing your order.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>Do you require a prescription for all medications?</AccordionTrigger>
                <AccordionContent>
                  No, we only require prescriptions for prescription medications. Over-the-counter products can be purchased without a prescription. Products that require a prescription will be clearly marked.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>How do I upload my prescription?</AccordionTrigger>
                <AccordionContent>
                  You can upload your prescription by visiting the Upload Prescription page. You'll need to take a clear photo or scan of your prescription and upload it through our secure form.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                <AccordionContent>
                  We accept all major credit cards, debit cards, and digital wallets including PayPal, Apple Pay, and Google Pay. We do not accept cash on delivery.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>How long does shipping take?</AccordionTrigger>
                <AccordionContent>
                  Standard shipping typically takes 3-5 business days. Express shipping is available for an additional fee and delivers within 1-2 business days. Delivery times may vary based on your location.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6">
                <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
                <AccordionContent>
                  Currently, we only ship within the continental United States. We're working on expanding our shipping options to other regions in the future.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-7">
                <AccordionTrigger>What is your return policy?</AccordionTrigger>
                <AccordionContent>
                  We accept returns of unopened products within 30 days of delivery. Prescription medications cannot be returned. Please visit our Returns page for more information.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-8">
                <AccordionTrigger>How can I become a seller on PharmaCare?</AccordionTrigger>
                <AccordionContent>
                  Licensed pharmacies and healthcare product manufacturers can apply to become sellers on our marketplace. Visit the "Sell With Us" page to learn more about the requirements and application process.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;
