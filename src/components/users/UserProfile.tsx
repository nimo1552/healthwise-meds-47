
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserRound, Camera, Shield, Bell, Activity, Award } from 'lucide-react';
import { toast } from 'sonner';

const UserProfile = () => {
  const [profileData, setProfileData] = useState({
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St, Anytown, CA 12345',
    avatar: '',
    memberSince: 'January 2023',
    loyaltyPoints: 240,
    completedOrders: 12,
    activeSubscriptions: 2
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    // Here you would typically send data to an API
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };

  const handleCancel = () => {
    // Reset form and exit edit mode
    setIsEditing(false);
  };

  const uploadAvatar = () => {
    // Mock avatar upload functionality
    toast.success("Avatar updated successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <UserRound className="h-6 w-6 text-nimocare-600" />
          <h2 className="text-2xl font-bold">My Profile</h2>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Summary Card */}
        <Card className="md:col-span-1">
          <CardHeader className="pb-4">
            <CardTitle>Profile Summary</CardTitle>
            <CardDescription>Your personal information</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <div className="relative mb-6">
              <Avatar className="h-24 w-24 border-2 border-white shadow-md">
                <AvatarImage src={profileData.avatar || "https://i.pravatar.cc/150?img=32"} />
                <AvatarFallback>{profileData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <button 
                className="absolute bottom-0 right-0 rounded-full bg-nimocare-600 p-1.5 text-white shadow-sm hover:bg-nimocare-700 transition-colors"
                onClick={uploadAvatar}
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>
            
            <h3 className="text-xl font-medium">{profileData.name}</h3>
            <p className="text-gray-500 mb-4">{profileData.email}</p>
            
            <div className="w-full space-y-3">
              <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                <div className="flex items-center text-gray-600">
                  <Shield className="h-4 w-4 mr-2" />
                  <span>Member Since</span>
                </div>
                <span className="font-medium">{profileData.memberSince}</span>
              </div>
              
              <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                <div className="flex items-center text-gray-600">
                  <Award className="h-4 w-4 mr-2" />
                  <span>Loyalty Points</span>
                </div>
                <span className="font-medium text-green-600">{profileData.loyaltyPoints}</span>
              </div>
              
              <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                <div className="flex items-center text-gray-600">
                  <Activity className="h-4 w-4 mr-2" />
                  <span>Completed Orders</span>
                </div>
                <span className="font-medium">{profileData.completedOrders}</span>
              </div>
              
              <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                <div className="flex items-center text-gray-600">
                  <Bell className="h-4 w-4 mr-2" />
                  <span>Active Subscriptions</span>
                </div>
                <span className="font-medium">{profileData.activeSubscriptions}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Profile Details Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Profile Details</CardTitle>
            <CardDescription>Manage your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name"
                  name="name"
                  value={profileData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input 
                  id="address"
                  name="address"
                  value={profileData.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-yellow-500 mr-2" />
                <h3 className="font-medium">Security Settings</h3>
              </div>
              <p className="text-sm text-gray-500 mt-1 mb-3">Manage your account security</p>
              
              <div className="space-y-3">
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  Change Password
                </Button>
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  Enable Two-Factor Authentication
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
