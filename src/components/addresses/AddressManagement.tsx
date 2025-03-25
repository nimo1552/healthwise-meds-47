
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Plus, Edit, Trash } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

const AddressManagement = () => {
  const { toast } = useToast();
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 'addr-1',
      name: 'Home',
      street: '123 Main St',
      city: 'Anytown',
      state: 'California',
      zipCode: '12345',
      country: 'United States',
      isDefault: true
    },
    {
      id: 'addr-2',
      name: 'Work',
      street: '456 Office Ave',
      city: 'Business City',
      state: 'California',
      zipCode: '54321',
      country: 'United States',
      isDefault: false
    }
  ]);
  
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState<Address | null>(null);
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Omit<Address, 'id'>>({
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    isDefault: false
  });
  
  const resetForm = () => {
    setFormData({
      name: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
      isDefault: false
    });
    setAddressToEdit(null);
  };
  
  const handleOpenEdit = (address: Address) => {
    setAddressToEdit(address);
    setFormData({
      name: address.name,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      isDefault: address.isDefault
    });
    setIsAddAddressOpen(true);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleCheckboxChange = (checked: boolean) => {
    setFormData({
      ...formData,
      isDefault: checked
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (addressToEdit) {
      // Update existing address
      setAddresses(prevAddresses => {
        // If the edited address is being set as default, update all other addresses
        if (formData.isDefault) {
          prevAddresses = prevAddresses.map(addr => ({
            ...addr,
            isDefault: false
          }));
        }
        
        return prevAddresses.map(addr => 
          addr.id === addressToEdit.id 
            ? { ...formData, id: addr.id } 
            : addr
        );
      });
      
      toast({
        title: "Address Updated",
        description: "Your address has been successfully updated."
      });
    } else {
      // Add new address
      const newAddress: Address = {
        ...formData,
        id: `addr-${Math.floor(Math.random() * 10000)}`
      };
      
      setAddresses(prevAddresses => {
        // If the new address is default, update all other addresses
        if (newAddress.isDefault) {
          prevAddresses = prevAddresses.map(addr => ({
            ...addr,
            isDefault: false
          }));
        }
        
        return [...prevAddresses, newAddress];
      });
      
      toast({
        title: "Address Added",
        description: "Your new address has been successfully added."
      });
    }
    
    setIsAddAddressOpen(false);
    resetForm();
  };
  
  const handleDelete = () => {
    if (!addressToDelete) return;
    
    const isDefault = addresses.find(addr => addr.id === addressToDelete)?.isDefault;
    
    setAddresses(prevAddresses => {
      const newAddresses = prevAddresses.filter(addr => addr.id !== addressToDelete);
      
      // If the deleted address was the default, set the first remaining address as default
      if (isDefault && newAddresses.length > 0) {
        newAddresses[0].isDefault = true;
      }
      
      return newAddresses;
    });
    
    toast({
      title: "Address Deleted",
      description: "The address has been removed from your account."
    });
    
    setAddressToDelete(null);
  };
  
  const handleSetDefault = (id: string) => {
    setAddresses(prevAddresses => 
      prevAddresses.map(addr => ({
        ...addr,
        isDefault: addr.id === id
      }))
    );
    
    toast({
      title: "Default Address Updated",
      description: "Your default shipping address has been updated."
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">My Addresses</h2>
          <p className="text-gray-600">Manage your shipping addresses</p>
        </div>
        <Dialog open={isAddAddressOpen} onOpenChange={setIsAddAddressOpen}>
          <DialogTrigger asChild>
            <Button className="bg-nimocare-600 hover:bg-nimocare-700">
              <Plus className="h-4 w-4 mr-2" /> Add New Address
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{addressToEdit ? 'Edit Address' : 'Add New Address'}</DialogTitle>
              <DialogDescription>
                Fill out the form below to {addressToEdit ? 'update your' : 'add a new'} shipping address.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Address Nickname</Label>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="Home, Work, etc."
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="street">Street Address</Label>
                <Input 
                  id="street" 
                  name="street" 
                  placeholder="123 Main St"
                  value={formData.street}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city" 
                    name="city" 
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Select 
                    value={formData.state}
                    onValueChange={(value) => handleSelectChange('state', value)}
                  >
                    <SelectTrigger id="state">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Alabama">Alabama</SelectItem>
                      <SelectItem value="Alaska">Alaska</SelectItem>
                      <SelectItem value="Arizona">Arizona</SelectItem>
                      <SelectItem value="Arkansas">Arkansas</SelectItem>
                      <SelectItem value="California">California</SelectItem>
                      <SelectItem value="Colorado">Colorado</SelectItem>
                      {/* Add more states as needed */}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input 
                    id="zipCode" 
                    name="zipCode" 
                    placeholder="12345"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select 
                    value={formData.country}
                    onValueChange={(value) => handleSelectChange('country', value)}
                  >
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="United States">United States</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="Mexico">Mexico</SelectItem>
                      {/* Add more countries as needed */}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox 
                  id="isDefault" 
                  checked={formData.isDefault}
                  onCheckedChange={handleCheckboxChange}
                />
                <Label htmlFor="isDefault">Set as default shipping address</Label>
              </div>
              
              <DialogFooter className="pt-4">
                <Button variant="outline" type="button" onClick={() => {
                  setIsAddAddressOpen(false);
                  resetForm();
                }}>
                  Cancel
                </Button>
                <Button type="submit">Save Address</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((address) => (
          <Card key={address.id} className={`overflow-hidden border-2 ${address.isDefault ? 'border-nimocare-600' : 'border-gray-200'}`}>
            <CardContent className="p-5">
              <div className="mb-2 flex justify-between items-start">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                  <h3 className="font-semibold text-lg">{address.name}</h3>
                </div>
                {address.isDefault && (
                  <Badge variant="outline" className="bg-nimocare-50 text-nimocare-700 border-nimocare-200">
                    Default
                  </Badge>
                )}
              </div>
              
              <div className="ml-7 space-y-1 text-gray-600">
                <p>{address.street}</p>
                <p>{address.city}, {address.state} {address.zipCode}</p>
                <p>{address.country}</p>
              </div>
              
              <div className="ml-7 mt-4 flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleOpenEdit(address)}
                >
                  <Edit className="h-4 w-4 mr-2" /> Edit
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setAddressToDelete(address.id)}
                    >
                      <Trash className="h-4 w-4 mr-2" /> Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete this address from your account.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={() => setAddressToDelete(null)}>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                
                {!address.isDefault && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleSetDefault(address.id)}
                  >
                    Set as Default
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

import { Badge } from "@/components/ui/badge";

export default AddressManagement;
