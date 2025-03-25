
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import OrderHistory from '@/components/orders/OrderHistory';
import PrescriptionManagement from '@/components/prescriptions/PrescriptionManagement';
import UserAccountSettings from '@/components/account/UserAccountSettings';
import AddressManagement from '@/components/addresses/AddressManagement';
import LoyaltyProgram from '@/components/loyalty/LoyaltyProgram';
import PharmacyLocator from '@/components/pharmacy/PharmacyLocator';
import { Clock, FileText, MapPin, Settings, Award, Map } from 'lucide-react';

const DashboardTabs = () => {
  const [activeTab, setActiveTab] = useState('orders');
  
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-2">My Account</h1>
      <p className="text-gray-600 mb-8">Manage your orders, prescriptions, and account settings</p>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 h-auto p-1 gap-2">
          <TabsTrigger value="orders" className="flex flex-col items-center py-3 px-2 h-auto data-[state=active]:bg-nimocare-50 data-[state=active]:text-nimocare-700">
            <Clock className="h-5 w-5 mb-1" />
            <span className="text-xs">Orders</span>
          </TabsTrigger>
          
          <TabsTrigger value="prescriptions" className="flex flex-col items-center py-3 px-2 h-auto data-[state=active]:bg-nimocare-50 data-[state=active]:text-nimocare-700">
            <FileText className="h-5 w-5 mb-1" />
            <span className="text-xs">Prescriptions</span>
          </TabsTrigger>
          
          <TabsTrigger value="addresses" className="flex flex-col items-center py-3 px-2 h-auto data-[state=active]:bg-nimocare-50 data-[state=active]:text-nimocare-700">
            <MapPin className="h-5 w-5 mb-1" />
            <span className="text-xs">Addresses</span>
          </TabsTrigger>
          
          <TabsTrigger value="rewards" className="flex flex-col items-center py-3 px-2 h-auto data-[state=active]:bg-nimocare-50 data-[state=active]:text-nimocare-700">
            <Award className="h-5 w-5 mb-1" />
            <span className="text-xs">Rewards</span>
          </TabsTrigger>
          
          <TabsTrigger value="pharmacies" className="flex flex-col items-center py-3 px-2 h-auto data-[state=active]:bg-nimocare-50 data-[state=active]:text-nimocare-700">
            <Map className="h-5 w-5 mb-1" />
            <span className="text-xs">Pharmacies</span>
          </TabsTrigger>
          
          <TabsTrigger value="settings" className="flex flex-col items-center py-3 px-2 h-auto data-[state=active]:bg-nimocare-50 data-[state=active]:text-nimocare-700">
            <Settings className="h-5 w-5 mb-1" />
            <span className="text-xs">Settings</span>
          </TabsTrigger>
        </TabsList>
        
        <Separator />
        
        <TabsContent value="orders" className="mt-6">
          <OrderHistory />
        </TabsContent>
        
        <TabsContent value="prescriptions" className="mt-6">
          <PrescriptionManagement />
        </TabsContent>
        
        <TabsContent value="addresses" className="mt-6">
          <AddressManagement />
        </TabsContent>
        
        <TabsContent value="rewards" className="mt-6">
          <LoyaltyProgram />
        </TabsContent>
        
        <TabsContent value="pharmacies" className="mt-6">
          <PharmacyLocator />
        </TabsContent>
        
        <TabsContent value="settings" className="mt-6">
          <UserAccountSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardTabs;
