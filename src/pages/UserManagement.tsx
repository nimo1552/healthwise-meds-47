
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SystemNav from '@/components/layout/SystemNav';
import UserManagementComponent from '@/components/users/UserManagement';

const UserManagement = () => {
  useEffect(() => {
    // Set page title
    document.title = 'User Management - Nimocare';
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <SystemNav />
        <div className="mt-6">
          <UserManagementComponent />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserManagement;
