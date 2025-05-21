
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 md:pt-32">
        <div className="container-custom py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Return Policy</h1>
            
            <div className="prose max-w-none">
              <p>Last updated: May 20, 2025</p>
              
              <h2>1. Return Eligibility</h2>
              <p>
                We accept returns of unopened products within 30 days of delivery.
                To be eligible for a return, your item must be in the same condition that you received it,
                unopened, unused, and in its original packaging.
              </p>
              
              <h2>2. Non-Returnable Items</h2>
              <p>The following items cannot be returned:</p>
              <ul>
                <li>Prescription medications</li>
                <li>Personal care items that have been opened or used</li>
                <li>Items with broken seals</li>
                <li>Gift cards</li>
                <li>Downloadable software products</li>
                <li>Items marked as final sale or clearance</li>
              </ul>
              
              <h2>3. Return Process</h2>
              <p>To initiate a return, please follow these steps:</p>
              <ol>
                <li>Log into your PharmaCare account</li>
                <li>Navigate to your order history</li>
                <li>Select the order containing the item you wish to return</li>
                <li>Click on "Return Item" and follow the prompts</li>
                <li>Print the return shipping label (if provided)</li>
                <li>Package the item securely in its original packaging</li>
                <li>Attach the return shipping label to the package</li>
                <li>Drop off the package at the specified carrier location</li>
              </ol>
              
              <h2>4. Refunds</h2>
              <p>
                Once we receive and inspect your return, we will notify you of the status of your refund.
                If approved, your refund will be processed and a credit will be automatically applied to your original method of payment within 5-10 business days.
              </p>
              
              <h2>5. Return Shipping Costs</h2>
              <p>
                You are responsible for paying the costs of shipping your item back to us.
                Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.
              </p>
              
              <h2>6. Damaged or Defective Items</h2>
              <p>
                If you receive a damaged or defective item, please contact our customer service within 48 hours of delivery.
                Include photos of the damaged item and the original packaging.
                We will provide you with return instructions and cover the cost of return shipping for damaged or defective items.
              </p>
              
              <h2>7. Late or Missing Refunds</h2>
              <p>
                If you haven't received your refund within 10 business days after we've processed your return, please check your bank account first.
                Then contact your credit card company, as it may take some time for the refund to appear on your statement.
                If you've done all of this and still haven't received your refund, please contact our customer service.
              </p>
              
              <h2>8. Contact Us</h2>
              <p>
                If you have any questions about our Return Policy, please contact us at returns@pharmacare.com or call our customer service at 1-800-PHARMA.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ReturnPolicy;
