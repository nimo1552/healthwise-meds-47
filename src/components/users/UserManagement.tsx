
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import UserTable from './UserTable';
import UserFilters from './UserFilters';
import DeleteUserDialog from './DeleteUserDialog';
import { ThemeToggle, ThemeToggleAdvanced } from '@/components/ui/theme-toggle';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Jane Cooper', email: 'jane@example.com', role: 'admin', status: 'active', lastLogin: '2 hours ago' },
    { id: 2, name: 'Wade Warren', email: 'wade@example.com', role: 'customer', status: 'active', lastLogin: '1 day ago' },
    { id: 3, name: 'Esther Howard', email: 'esther@example.com', role: 'customer', status: 'inactive', lastLogin: '5 days ago' },
    { id: 4, name: 'Cameron Williamson', email: 'cameron@example.com', role: 'customer', status: 'active', lastLogin: '2 days ago' },
    { id: 5, name: 'Brooklyn Simmons', email: 'brooklyn@example.com', role: 'staff', status: 'active', lastLogin: '3 hours ago' },
    { id: 6, name: 'Leslie Alexander', email: 'leslie@example.com', role: 'customer', status: 'inactive', lastLogin: '2 weeks ago' },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<null | number>(null);
  
  const { toast } = useToast();
  
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
  });
  
  const handleStatusToggle = (id: number) => {
    setUsers(users.map(user => {
      if (user.id === id) {
        const newStatus = user.status === 'active' ? 'inactive' : 'active';
        
        toast({
          title: `User ${newStatus === 'active' ? 'activated' : 'deactivated'}`,
          description: `${user.name}'s account has been ${newStatus}.`,
          variant: newStatus === 'active' ? 'default' : 'destructive',
        });
        
        return {
          ...user,
          status: newStatus
        };
      }
      return user;
    }));
  };
  
  const handleRoleChange = (id: number, newRole: string) => {
    setUsers(users.map(user => {
      if (user.id === id) {
        toast({
          title: "Role updated",
          description: `${user.name}'s role has been updated to ${newRole}.`,
        });
        
        return {
          ...user,
          role: newRole
        };
      }
      return user;
    }));
  };
  
  const handleDeleteUser = (id: number) => {
    setUserToDelete(id);
    setIsDeleteDialogOpen(true);
  };
  
  const handleEditUser = (id: number) => {
    toast({
      title: "Edit user",
      description: `Opening edit form for user ID: ${id}`,
    });
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email).then(() => {
      toast({
        title: "Email copied",
        description: "Email address copied to clipboard",
      });
    }, (err) => {
      toast({
        title: "Failed to copy",
        description: "Could not copy the email address",
        variant: "destructive",
      });
    });
  };

  const handleSendEmail = (email: string) => {
    toast({
      title: "Compose email",
      description: `Opening email composition to: ${email}`,
    });
  };
  
  const confirmDelete = () => {
    if (userToDelete) {
      const userToRemove = users.find(user => user.id === userToDelete);
      
      setUsers(users.filter(user => user.id !== userToDelete));
      
      toast({
        title: "User deleted",
        description: `${userToRemove?.name}'s account has been removed.`,
        variant: "destructive",
      });
      
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">User Management</h2>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button className="flex items-center gap-1 dark:bg-gray-800 dark:hover:bg-gray-700">
            <UserPlus className="h-4 w-4" />
            <span>Add User</span>
          </Button>
        </div>
      </div>
      
      <div className="mb-6">
        <ThemeToggleAdvanced />
      </div>
      
      <UserFilters 
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        roleFilter={roleFilter}
        onSearchChange={setSearchTerm}
        onStatusFilterChange={setStatusFilter}
        onRoleFilterChange={setRoleFilter}
      />
      
      <UserTable 
        users={filteredUsers}
        onStatusToggle={handleStatusToggle}
        onRoleChange={handleRoleChange}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
        onCopyEmail={handleCopyEmail}
        onSendEmail={handleSendEmail}
      />
      
      <DeleteUserDialog 
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default UserManagement;
