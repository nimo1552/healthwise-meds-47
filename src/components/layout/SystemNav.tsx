
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Cpu, Activity, Settings, UsersRound } from 'lucide-react';

const SystemNav = () => {
  return (
    <div className="bg-gray-50 p-3 rounded-lg mb-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center space-x-2">
          <Cpu className="h-5 w-5 text-nimocare-600" />
          <span className="font-medium">System Tools</span>
        </div>
        
        <div className="flex space-x-2">
          <Button asChild variant="ghost" size="sm">
            <Link to="/admin-ai">
              <Settings className="h-4 w-4 mr-1" />
              Admin
            </Link>
          </Button>
          
          <Button asChild variant="ghost" size="sm">
            <Link to="/user-management">
              <UsersRound className="h-4 w-4 mr-1" />
              Users
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="sm">
            <Link to="/system">
              <Activity className="h-4 w-4 mr-1" />
              System
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SystemNav;
