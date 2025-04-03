import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, UserPlus, Edit, Trash2, CheckCircle, XCircle, Copy, Mail } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { MoreOptionsMenu } from '@/components/ui/more-options-menu';

const UserManagement = () => {
  const [users, setUsers] = useState([
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
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        <Button className="flex items-center gap-1">
          <UserPlus className="h-4 w-4" />
          <span>Add User</span>
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center gap-4 pb-4">
        <div className="relative w-full sm:w-auto flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search users..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="staff">Staff</SelectItem>
              <SelectItem value="customer">Customer</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Select 
                      defaultValue={user.role}
                      onValueChange={(value) => handleRoleChange(user.id, value)}
                    >
                      <SelectTrigger className="w-[110px] h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="staff">Staff</SelectItem>
                        <SelectItem value="customer">Customer</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        checked={user.status === 'active'} 
                        onCheckedChange={() => handleStatusToggle(user.id)} 
                      />
                      <Badge
                        className="capitalize"
                        variant={user.status === 'active' ? 'default' : 'outline'}
                      >
                        {user.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                      <MoreOptionsMenu 
                        items={[
                          {
                            label: "Edit User",
                            onClick: () => handleEditUser(user.id),
                            icon: <Edit className="h-4 w-4" />
                          },
                          {
                            label: "Copy Email",
                            onClick: () => handleCopyEmail(user.email),
                            icon: <Copy className="h-4 w-4" />
                          },
                          {
                            label: "Send Email",
                            onClick: () => handleSendEmail(user.email),
                            icon: <Mail className="h-4 w-4" />
                          },
                          {
                            label: "Delete User",
                            onClick: () => handleDeleteUser(user.id),
                            icon: <Trash2 className="h-4 w-4" />,
                            variant: "destructive"
                          }
                        ]}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No users found matching your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user
              account and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserManagement;
