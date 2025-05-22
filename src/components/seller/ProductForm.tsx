
import React, { useState, useRef } from 'react';
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
import { Image, Upload } from 'lucide-react';

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
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreviewImage(result);
      setFormData(prev => ({ ...prev, image: result }));
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
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
        // Default placeholder image
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
      setPreviewImage(null);

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
            <Label>Product Image</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full" 
                  onClick={triggerFileInput}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Image
                </Button>
                <div className="text-xs text-gray-500 mt-1">
                  Max file size: 5MB. Formats: JPG, PNG, GIF
                </div>
              </div>
              <div className="flex items-center">
                {previewImage ? (
                  <div className="relative border rounded w-24 h-24">
                    <img 
                      src={previewImage} 
                      alt="Preview" 
                      className="object-cover w-full h-full" 
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center border rounded w-24 h-24 bg-gray-50">
                    <Image className="h-8 w-8 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">Preview</span>
                  </div>
                )}
                
                <div className="ml-4 flex-grow">
                  <Label htmlFor="image">Or enter image URL</Label>
                  <Input 
                    id="image" 
                    name="image" 
                    value={formData.image} 
                    onChange={handleChange} 
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
            </div>
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
