
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const TermsConditions = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 md:pt-32">
        <div className="container-custom py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms and Conditions</h1>
            
            <div className="prose max-w-none">
              <p>Last updated: May 20, 2025</p>
              
              <h2>1. Introduction</h2>
              <p>
                Welcome to PharmaCare. These Terms and Conditions govern your use of our website and services.
                By accessing or using our services, you agree to be bound by these Terms.
              </p>
              
              <h2>2. Definitions</h2>
              <p>
                "PharmaCare," "we," "us," and "our" refer to PharmaCare Inc.
                "User," "you," and "your" refer to the person accessing or using our services.
                "Services" refers to all products, content, and services offered by PharmaCare.
              </p>
              
              <h2>3. Account Registration</h2>
              <p>
                To access certain features of our platform, you may need to register for an account.
                You must provide accurate and complete information during registration.
                You are responsible for maintaining the confidentiality of your account credentials.
              </p>
              
              <h2>4. Prescription Medications</h2>
              <p>
                Prescription medications require a valid prescription from a licensed healthcare provider.
                We verify all prescriptions before processing orders for prescription medications.
                It is illegal to obtain prescription medications without a valid prescription.
              </p>
              
              <h2>5. Order Fulfillment</h2>
              <p>
                We make every effort to ensure the accuracy of product information on our platform.
                However, we do not guarantee that product descriptions or other content is accurate, complete, or current.
                We reserve the right to refuse or cancel orders for any reason, including errors in pricing or availability.
              </p>
              
              <h2>6. Seller Policies</h2>
              <p>
                Sellers on our marketplace must comply with all applicable laws and regulations.
                Sellers are responsible for the accuracy of product information and the quality of products they sell.
                PharmaCare is not responsible for the actions or products of third-party sellers.
              </p>
              
              <h2>7. Privacy</h2>
              <p>
                Our Privacy Policy explains how we collect, use, and share information about you.
                By using our services, you agree to our collection and use of information as described in our Privacy Policy.
              </p>
              
              <h2>8. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, PharmaCare shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of our services.
              </p>
              
              <h2>9. Governing Law</h2>
              <p>
                These Terms are governed by the laws of the state of New York, without regard to its conflict of law principles.
              </p>
              
              <h2>10. Changes to Terms</h2>
              <p>
                We may update these Terms from time to time. We will notify you of material changes by posting the updated Terms on our website.
                Your continued use of our services after changes to the Terms constitutes your acceptance of the updated Terms.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsConditions;
