
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
}

export const StatCard = ({ title, value, change, trend, icon }: StatCardProps) => {
  return (
    <Card className="border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
          </div>
          <div className="p-2 rounded-full bg-gray-50">{icon}</div>
        </div>
        
        <div className="mt-4 flex items-center">
          <span className={`flex items-center text-sm font-medium ${
            trend === 'up' ? 'text-green-600' : 
            trend === 'down' ? 'text-red-600' : 
            'text-gray-500'
          }`}>
            {trend === 'up' && <ArrowUp className="mr-1 h-3 w-3" />}
            {trend === 'down' && <ArrowDown className="mr-1 h-3 w-3" />}
            {trend === 'neutral' && <Minus className="mr-1 h-3 w-3" />}
            {change}
          </span>
          <span className="ml-2 text-xs text-gray-400">vs. last month</span>
        </div>
      </CardContent>
    </Card>
  );
};
