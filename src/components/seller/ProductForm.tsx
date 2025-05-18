
import React, { useState } from 'react';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useProducts } from "@/contexts/ProductContext";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from 'sonner';

const categories = [
  "Pain Relief",
  "Vitamins & Supplements",
  "Antibiotics",
  "Skin Care",
  "Allergy Relief",
  "Diabetes Care",
  "Devices",
  "Baby Care"
];

const ProductForm = () => {
  const { addProduct } = useProducts();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    oldPrice: '',
    category: '',
    image: '',
    isPrescriptionRequired: false,
    isBestseller: false,
    stock: '100'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validation
      if (!formData.name || !formData.description || !formData.price || !formData.category) {
        throw new Error('Please fill all required fields');
      }

      if (!formData.image) {
        formData.image = 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=400&auto=format&fit=crop';
      }

      // Calculate discount if oldPrice exists
      const price = parseFloat(formData.price);
      const oldPrice = formData.oldPrice ? parseFloat(formData.oldPrice) : null;
      let discount = null;

      if (oldPrice && oldPrice > price) {
        discount = Math.round(((oldPrice - price) / oldPrice) * 100);
      }

      // Add the product
      addProduct({
        name: formData.name,
        description: formData.description,
        price: price,
        oldPrice: oldPrice,
        discount: discount,
        category: formData.category,
        image: formData.image,
        isPrescriptionRequired: formData.isPrescriptionRequired,
        isBestseller: formData.isBestseller,
        rating: 4.0, // Default rating for new products
        sellerId: 'current-seller', // In a real app, this would be the actual seller ID
        stock: parseInt(formData.stock)
      });

      // Reset form
      setFormData({
        name: '',
        description: '',
        price: '',
        oldPrice: '',
        category: '',
        image: '',
        isPrescriptionRequired: false,
        isBestseller: false,
        stock: '100'
      });

      toast.success('Product added successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to add product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
        <CardDescription>Enter the details of your new product listing</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="e.g. Paracetamol 500mg Tablets"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              placeholder="Describe your product..."
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input 
                id="price" 
                name="price" 
                type="number" 
                min="0.01" 
                step="0.01" 
                value={formData.price} 
                onChange={handleChange} 
                placeholder="19.99"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="oldPrice">Original Price ($) (optional)</Label>
              <Input 
                id="oldPrice" 
                name="oldPrice" 
                type="number" 
                min="0.01" 
                step="0.01" 
                value={formData.oldPrice} 
                onChange={handleChange} 
                placeholder="24.99"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={handleSelectChange} value={formData.category}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock Quantity</Label>
              <Input 
                id="stock" 
                name="stock" 
                type="number" 
                min="0" 
                value={formData.stock} 
                onChange={handleChange} 
                placeholder="100"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input 
              id="image" 
              name="image" 
              value={formData.image} 
              onChange={handleChange} 
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="isPrescriptionRequired" 
                checked={formData.isPrescriptionRequired}
                onCheckedChange={(checked) => handleSwitchChange("isPrescriptionRequired", checked)}
              />
              <Label htmlFor="isPrescriptionRequired">Requires Prescription</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch 
                id="isBestseller" 
                checked={formData.isBestseller}
                onCheckedChange={(checked) => handleSwitchChange("isBestseller", checked)}
              />
              <Label htmlFor="isBestseller">Mark as Bestseller</Label>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Product"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
