
import React from 'react';
import GarbageCollectionDashboard from '@/components/system/GarbageCollectionDashboard';

const SystemMonitor = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">System Monitoring</h2>
      <p className="text-gray-600">
        Monitor and manage system resources to ensure optimal performance.
      </p>
      
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
