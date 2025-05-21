
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 md:pt-32">
        <div className="container-custom py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
            
            <div className="prose max-w-none">
              <p>Last updated: May 20, 2025</p>
              
              <h2>1. Introduction</h2>
              <p>
                At PharmaCare, we respect your privacy and are committed to protecting your personal information.
                This Privacy Policy explains how we collect, use, and share information about you when you use our website and services.
              </p>
              
              <h2>2. Information We Collect</h2>
              <p>We collect information in the following ways:</p>
              <ul>
                <li>Information you provide to us directly when you register for an account, place an order, or contact us.</li>
                <li>Information we collect automatically when you use our website, such as your IP address, browsing behavior, and device information.</li>
                <li>Information we receive from third parties, such as our business partners or service providers.</li>
              </ul>
              
              <h2>3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide, maintain, and improve our services.</li>
                <li>Process and fulfill your orders.</li>
                <li>Communicate with you about your account, orders, and our services.</li>
                <li>Personalize your experience and provide content and features that may interest you.</li>
                <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities.</li>
                <li>Comply with legal obligations.</li>
              </ul>
              
              <h2>4. Information Sharing</h2>
              <p>We may share your information with:</p>
              <ul>
                <li>Service providers who perform services on our behalf.</li>
                <li>Sellers on our marketplace, as necessary to fulfill your orders.</li>
                <li>Legal authorities when required by law or to protect our rights.</li>
                <li>Business partners, with your consent, for marketing purposes.</li>
              </ul>
              
              <h2>5. Your Choices</h2>
              <p>
                You can access, update, or delete your account information at any time by logging into your account.
                You can opt out of receiving marketing communications from us by following the unsubscribe instructions included in our emails.
              </p>
              
              <h2>6. Security</h2>
              <p>
                We take reasonable measures to protect your information from unauthorized access, use, or disclosure.
                However, no method of transmission over the internet or electronic storage is 100% secure.
              </p>
              
              <h2>7. Children's Privacy</h2>
              <p>
                Our services are not directed to children under 13, and we do not knowingly collect personal information from children under 13.
              </p>
              
              <h2>8. Changes to this Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated Privacy Policy on our website.
              </p>
              
              <h2>9. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at privacy@pharmacare.com.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
