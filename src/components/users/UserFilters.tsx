
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SearchRecommendations } from '@/components/ui/SearchRecommendations';

interface UserFiltersProps {
  searchTerm: string;
  statusFilter: string;
  roleFilter: string;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onRoleFilterChange: (value: string) => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({
  searchTerm,
  statusFilter,
  roleFilter,
  onSearchChange,
  onStatusFilterChange,
  onRoleFilterChange
}) => {
  const [showRecommendations, setShowRecommendations] = useState(false);

  const handleSearchFocus = () => {
    setShowRecommendations(true);
  };

  const handleSelectRecommendation = (selected: string) => {
    onSearchChange(selected);
    setShowRecommendations(false);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 pb-4">
      <div className="relative w-full sm:w-auto flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
        <Input
          placeholder="Search users..."
          className="pl-10 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:placeholder-gray-500"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={handleSearchFocus}
        />
        
        {/* Search recommendations */}
        <div className="absolute mt-1 w-full z-20">
          <SearchRecommendations 
            query={searchTerm}
            onSelect={handleSelectRecommendation}
            isVisible={showRecommendations}
            onClose={() => setShowRecommendations(false)}
          />
        </div>
      </div>
      
      <div className="flex gap-2 w-full sm:w-auto">
        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger className="w-[130px] dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
            <SelectItem value="all" className="dark:text-gray-200">All Status</SelectItem>
            <SelectItem value="active" className="dark:text-gray-200">Active</SelectItem>
            <SelectItem value="inactive" className="dark:text-gray-200">Inactive</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={roleFilter} onValueChange={onRoleFilterChange}>
          <SelectTrigger className="w-[130px] dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
            <SelectItem value="all" className="dark:text-gray-200">All Roles</SelectItem>
            <SelectItem value="admin" className="dark:text-gray-200">Admin</SelectItem>
            <SelectItem value="staff" className="dark:text-gray-200">Staff</SelectItem>
            <SelectItem value="customer" className="dark:text-gray-200">Customer</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default UserFilters;
