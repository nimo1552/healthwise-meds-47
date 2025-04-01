
import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DashboardTabs from '@/components/dashboard/DashboardTabs';

const CustomerDashboard = () => {
  useEffect(() => {
    // Set page title
    document.title = 'My Account - Nimocare';
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <DashboardTabs />
      </main>
      <Footer />
    </div>
  );
};

export default CustomerDashboard;
