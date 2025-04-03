
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { MoreOptionsMenu } from '@/components/ui/more-options-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit, Trash2, Copy, Mail } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
}

interface UserTableProps {
  users: User[];
  onStatusToggle: (id: number) => void;
  onRoleChange: (id: number, role: string) => void;
  onEditUser: (id: number) => void;
  onDeleteUser: (id: number) => void;
  onCopyEmail: (email: string) => void;
  onSendEmail: (email: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onStatusToggle,
  onRoleChange,
  onEditUser,
  onDeleteUser,
  onCopyEmail,
  onSendEmail
}) => {
  return (
    <div className="rounded-md border dark:border-gray-700">
      <Table>
        <TableHeader>
          <TableRow className="dark:border-gray-700">
            <TableHead className="dark:text-gray-300">Name</TableHead>
            <TableHead className="dark:text-gray-300">Email</TableHead>
            <TableHead className="dark:text-gray-300">Role</TableHead>
            <TableHead className="dark:text-gray-300">Status</TableHead>
            <TableHead className="dark:text-gray-300">Last Login</TableHead>
            <TableHead className="text-right dark:text-gray-300">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user.id} className="dark:border-gray-700">
                <TableCell className="font-medium dark:text-gray-200">{user.name}</TableCell>
                <TableCell className="dark:text-gray-300">{user.email}</TableCell>
                <TableCell>
                  <Select 
                    defaultValue={user.role}
                    onValueChange={(value) => onRoleChange(user.id, value)}
                  >
                    <SelectTrigger className="w-[110px] h-8 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                      <SelectItem value="admin" className="dark:text-gray-200">Admin</SelectItem>
                      <SelectItem value="staff" className="dark:text-gray-200">Staff</SelectItem>
                      <SelectItem value="customer" className="dark:text-gray-200">Customer</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={user.status === 'active'} 
                      onCheckedChange={() => onStatusToggle(user.id)} 
                    />
                    <Badge
                      className="capitalize dark:text-gray-200"
                      variant={user.status === 'active' ? 'default' : 'outline'}
                    >
                      {user.status}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="dark:text-gray-300">{user.lastLogin}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                    <MoreOptionsMenu 
                      items={[
                        {
                          label: "Edit User",
                          onClick: () => onEditUser(user.id),
                          icon: <Edit className="h-4 w-4" />
                        },
                        {
                          label: "Copy Email",
                          onClick: () => onCopyEmail(user.email),
                          icon: <Copy className="h-4 w-4" />
                        },
                        {
                          label: "Send Email",
                          onClick: () => onSendEmail(user.email),
                          icon: <Mail className="h-4 w-4" />
                        },
                        {
                          label: "Delete User",
                          onClick: () => onDeleteUser(user.id),
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
              <TableCell colSpan={6} className="text-center py-8 text-gray-500 dark:text-gray-400">
                No users found matching your filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
