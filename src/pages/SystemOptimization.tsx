
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SystemMonitor from '@/components/admin/SystemMonitor';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getGCStats } from '@/utils/garbageCollection';
import { Separator } from '@/components/ui/separator';
import { Plus, Minus, RefreshCw } from 'lucide-react';

const SystemOptimization = () => {
  const [images, setImages] = useState<Array<{ id: string; url: string }>>([]);
  const [loadCount, setLoadCount] = useState(0);
  const [stats, setStats] = useState(getGCStats());
  
  // Sample image URLs
  const sampleImages = [
    'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300&h=200',
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300&h=200',
    'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=300&h=200',
    'https://images.unsplash.com/photo-1550572017-edd951b55104?w=300&h=200',
    'https://images.unsplash.com/photo-1577174881658-0f30ed549adc?w=300&h=200',
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&h=200'
  ];
  
  const addImage = () => {
    const newId = `img-${Date.now()}`;
    const randomIndex = Math.floor(Math.random() * sampleImages.length);
    
    setImages(prev => [
      ...prev, 
      { id: newId, url: sampleImages[randomIndex] }
    ]);
    setLoadCount(prev => prev + 1);
    setStats(getGCStats());
  };
  
  const removeImage = () => {
    if (images.length > 0) {
      setImages(prev => prev.slice(0, -1));
      setStats(getGCStats());
    }
  };
  
  const refreshStats = () => {
    setStats(getGCStats());
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow p-6 md:p-8 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-2">System Optimization</h1>
        <p className="text-gray-600 mb-8">
          Monitor and optimize your application's resource usage
        </p>
        
        <Tabs defaultValue="monitor">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="monitor">System Monitor</TabsTrigger>
            <TabsTrigger value="demo">Resource Demo</TabsTrigger>
          </TabsList>
          
          <TabsContent value="monitor">
            <SystemMonitor />
          </TabsContent>
          
          <TabsContent value="demo">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Resource Optimization Demo</h2>
              <p className="text-gray-600">
                This demo showcases how resources are managed and garbage collected.
                Add or remove images to see how the system tracks and disposes of resources.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Optimized Image Gallery</CardTitle>
                    <CardDescription>
                      Each image is registered with the garbage collector
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex flex-wrap gap-4">
                      {images.map(img => (
                        <OptimizedImage
                          key={img.id}
                          src={img.url}
                          alt="Sample optimized image"
                          className="w-32 h-32 object-cover"
                        />
                      ))}
                      
                      {images.length === 0 && (
                        <div className="w-full p-8 text-center text-gray-500 bg-gray-50 rounded-lg">
                          No images added yet. Use the controls below to add images.
                        </div>
                      )}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between">
                    <div className="flex space-x-2">
                      <Button onClick={addImage} size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Image
                      </Button>
                      
                      <Button 
                        onClick={removeImage} 
                        variant="outline" 
                        size="sm"
                        disabled={images.length === 0}
                      >
                        <Minus className="h-4 w-4 mr-1" />
                        Remove Image
                      </Button>
                    </div>
                    
                    <Button variant="ghost" size="sm" onClick={refreshStats}>
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Refresh Stats
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Resource Statistics</CardTitle>
                    <CardDescription>
                      Live tracking of memory usage
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Total Load Count</p>
                        <p className="text-2xl font-bold">{loadCount}</p>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <p className="text-sm font-medium text-gray-500">Current Active</p>
                        <p className="text-2xl font-bold">{images.length}</p>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <p className="text-sm font-medium text-gray-500">Tracked Objects</p>
                        <p className="text-2xl font-bold">{stats.totalTracked}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Includes images and other resources
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default SystemOptimization;
