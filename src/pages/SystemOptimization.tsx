
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SystemMonitor from '@/components/admin/SystemMonitor';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getGCStats, runGarbageCollection } from '@/utils/garbageCollection';
import { Separator } from '@/components/ui/separator';
import { Plus, Minus, RefreshCw, Zap, BarChart4 } from 'lucide-react';
import GarbageCollectionDashboard from '@/components/system/GarbageCollectionDashboard';
import { useMemoryOptimization } from '@/hooks/use-memory-optimization';
import { toast } from 'sonner';
import { PageTransition } from '@/components/ui/PageTransition';

const SystemOptimization = () => {
  const [images, setImages] = useState<Array<{ id: string; url: string }>>([]);
  const [loadCount, setLoadCount] = useState(0);
  const [stats, setStats] = useState(getGCStats());
  const [tabActive, setTabActive] = useState('monitor');
  
  // Use our memory optimization hook
  const { 
    memoryInfo, 
    runGarbageCollection: optimizeMemory,
    isMemoryUsageHigh
  } = useMemoryOptimization({
    highMemoryThreshold: 0.7,
    autoCollectOnHighMemory: true,
    optimizeOnVisibilityChange: true
  });
  
  // Show memory warning if usage is high
  useEffect(() => {
    if (isMemoryUsageHigh) {
      toast.warning(
        "Memory usage is high",
        {
          description: "The system is automatically optimizing resources",
          duration: 3000
        }
      );
    }
  }, [isMemoryUsageHigh]);
  
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
  
  const handleOptimize = () => {
    optimizeMemory();
    refreshStats();
    toast.success("Memory optimized successfully");
  };
  
  const addMultipleImages = () => {
    // Add 10 images at once (stress test)
    for (let i = 0; i < 10; i++) {
      const newId = `img-${Date.now()}-${i}`;
      const randomIndex = Math.floor(Math.random() * sampleImages.length);
      
      setImages(prev => [
        ...prev, 
        { id: newId, url: sampleImages[randomIndex] }
      ]);
      setLoadCount(prev => prev + 1);
    }
    
    setStats(getGCStats());
  };
  
  // Format bytes to a human-readable format
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow p-6 md:p-8 max-w-7xl mx-auto w-full">
        <PageTransition>
          <h1 className="text-3xl font-bold mb-2">System Optimization</h1>
          <p className="text-gray-600 mb-8">
            Monitor and optimize your application's resource usage
          </p>
          
          <Tabs 
            defaultValue="monitor" 
            value={tabActive} 
            onValueChange={setTabActive}
          >
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="monitor">System Monitor</TabsTrigger>
              <TabsTrigger value="memory">Memory Management</TabsTrigger>
              <TabsTrigger value="demo">Resource Demo</TabsTrigger>
            </TabsList>
            
            <TabsContent value="monitor">
              <SystemMonitor />
            </TabsContent>
            
            <TabsContent value="memory">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GarbageCollectionDashboard />
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart4 className="h-5 w-5 text-nimocare-600" />
                      <span>Memory Statistics</span>
                    </CardTitle>
                    <CardDescription>
                      Real-time memory usage and optimization
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    {memoryInfo ? (
                      <>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Used Memory:</span>
                            <span className="font-medium">{formatBytes(memoryInfo.used)}</span>
                          </div>
                          
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Total Allocated:</span>
                            <span className="font-medium">{formatBytes(memoryInfo.total)}</span>
                          </div>
                          
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Memory Limit:</span>
                            <span className="font-medium">{formatBytes(memoryInfo.limit)}</span>
                          </div>
                          
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Usage:</span>
                            <span className={`font-medium ${memoryInfo.usagePercentage > 0.7 ? 'text-red-500' : memoryInfo.usagePercentage > 0.5 ? 'text-amber-500' : 'text-green-500'}`}>
                              {Math.round(memoryInfo.usagePercentage * 100)}%
                            </span>
                          </div>
                          
                          <div className="w-full bg-gray-100 rounded-full h-2.5 mt-2">
                            <div 
                              className={`h-2.5 rounded-full ${
                                memoryInfo.usagePercentage > 0.7 ? 'bg-red-500' : 
                                memoryInfo.usagePercentage > 0.5 ? 'bg-amber-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${memoryInfo.usagePercentage * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        {memoryInfo.usagePercentage > 0.7 && (
                          <div className="rounded-md bg-red-50 p-3 text-sm text-red-800 flex items-start space-x-2">
                            <Zap className="h-5 w-5 text-red-500 flex-shrink-0" />
                            <div>
                              <p className="font-medium">High memory usage detected</p>
                              <p className="mt-1">Consider running the memory optimizer to free up resources.</p>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-center text-gray-500 py-4">
                        Memory information is only available in Chromium-based browsers
                      </div>
                    )}
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      onClick={handleOptimize} 
                      className="w-full"
                      variant={isMemoryUsageHigh ? "default" : "outline"}
                    >
                      <Zap className="h-4 w-4 mr-2" />
                      Optimize Memory Now
                    </Button>
                  </CardFooter>
                </Card>
              </div>
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
                            lazyLoad={true}
                          />
                        ))}
                        
                        {images.length === 0 && (
                          <div className="w-full p-8 text-center text-gray-500 bg-gray-50 rounded-lg">
                            No images added yet. Use the controls below to add images.
                          </div>
                        )}
                      </div>
                    </CardContent>
                    
                    <CardFooter className="flex flex-wrap gap-2">
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
                        
                        <Button 
                          onClick={addMultipleImages}
                          variant="secondary"
                          size="sm"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add 10 Images
                        </Button>
                      </div>
                      
                      <div className="flex space-x-2 ml-auto">
                        <Button 
                          onClick={refreshStats}
                          variant="ghost" 
                          size="sm"
                        >
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Refresh Stats
                        </Button>
                        
                        <Button 
                          onClick={optimizeMemory}
                          variant="outline" 
                          size="sm"
                        >
                          <Zap className="h-4 w-4 mr-1" />
                          Optimize
                        </Button>
                      </div>
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
                        
                        {memoryInfo && (
                          <>
                            <Separator />
                            <div>
                              <p className="text-sm font-medium text-gray-500">Memory Usage</p>
                              <p className="text-2xl font-bold">
                                {Math.round(memoryInfo.usagePercentage * 100)}%
                              </p>
                              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                                <div 
                                  className={`h-1.5 rounded-full ${
                                    memoryInfo.usagePercentage > 0.7 ? 'bg-red-500' : 
                                    memoryInfo.usagePercentage > 0.5 ? 'bg-amber-500' : 'bg-green-500'
                                  }`}
                                  style={{ width: `${memoryInfo.usagePercentage * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </PageTransition>
      </main>
      
      <Footer />
    </div>
  );
};

export default SystemOptimization;
