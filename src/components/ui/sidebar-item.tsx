
import React from 'react';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  onClick: () => void;
  collapsed?: boolean;
  badge?: number;
}

export const SidebarItem = ({
  icon,
  text,
  active = false,
  onClick,
  collapsed = false,
  badge,
}: SidebarItemProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center w-full p-2 rounded-lg transition-colors",
        active 
          ? "bg-nimocare-50 text-nimocare-800 font-medium" 
          : "text-gray-700 hover:bg-gray-50",
        collapsed ? "justify-center" : ""
      )}
    >
      <span className={cn(
        "inline-flex items-center justify-center",
        active ? "text-nimocare-700" : "text-gray-600"
      )}>
        {icon}
      </span>
      
      {!collapsed && (
        <span className="ml-3 font-medium text-sm">{text}</span>
      )}
      
      {badge && !collapsed && (
        <span className="ml-auto bg-red-100 text-red-700 text-xs font-medium px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
      
      {badge && collapsed && (
        <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-100 text-red-700 text-xs font-medium w-4 h-4 flex items-center justify-center rounded-full">
          {badge}
        </span>
      )}
    </button>
  );
};
