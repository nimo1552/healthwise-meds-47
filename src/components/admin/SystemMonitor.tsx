
import React from 'react';
import GarbageCollectionDashboard from '@/components/system/GarbageCollectionDashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UsersRound, UserCheck, UserMinus, Activity } from 'lucide-react';

const SystemMonitor = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">System Monitoring</h2>
      <p className="text-gray-600">
        Monitor and manage system resources to ensure optimal performance.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">248</div>
              <UsersRound className="h-8 w-8 text-blue-500 opacity-80" />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              <span className="text-green-500">↑ 12%</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">186</div>
              <UserCheck className="h-8 w-8 text-green-500 opacity-80" />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              <span className="text-green-500">↑ 8%</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Inactive Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">62</div>
              <UserMinus className="h-8 w-8 text-amber-500 opacity-80" />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              <span className="text-red-500">↑ 3%</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">User Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">867</div>
              <Activity className="h-8 w-8 text-purple-500 opacity-80" />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              <span className="text-green-500">↑ 24%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GarbageCollectionDashboard />
        
        {/* Additional system monitoring widgets can be added here */}
        <div className="rounded-lg border p-6 flex flex-col justify-center items-center bg-gray-50">
          <h3 className="text-lg font-medium mb-2">Resource Monitor</h3>
          <p className="text-gray-600 text-center mb-4">
            Coming soon: CPU, memory, and network usage monitoring
          </p>
          <div className="text-sm text-gray-500">
            Future extension point
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemMonitor;
