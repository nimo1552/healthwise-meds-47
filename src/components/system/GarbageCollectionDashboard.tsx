
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getGCStats, runGarbageCollection } from '@/utils/garbageCollection';
import { Trash, RefreshCw, AlertCircle, Clock, Server, PieChart } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { throttle } from '@/utils/performanceUtils';

const GarbageCollectionDashboard = () => {
  const [stats, setStats] = useState({ totalTracked: 0, oldestObjectAge: 0 });
  const [isCollecting, setIsCollecting] = useState(false);
  const [lastCollection, setLastCollection] = useState<Date | null>(null);
  const [memoryUsage, setMemoryUsage] = useState<{ used: number, total: number } | null>(null);
  const { toast } = useToast();

  // Refresh stats periodically with throttling to reduce performance impact
  useEffect(() => {
    const updateStats = throttle(() => {
      const currentStats = getGCStats();
      setStats(currentStats);
      
      // Try to get memory usage if available (Chrome only)
      if ((performance as any).memory) {
        setMemoryUsage({
          used: (performance as any).memory.usedJSHeapSize,
          total: (performance as any).memory.jsHeapSizeLimit
        });
      }
    }, 2000); // Throttle to once every 2 seconds max

    // Update stats immediately and then every 5 seconds
    updateStats();
    const interval = setInterval(updateStats, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleManualCollection = () => {
    setIsCollecting(true);
    
    // Capture stats before collection for comparison
    const beforeStats = {...stats};
    
    setTimeout(() => {
      try {
        runGarbageCollection();
        setLastCollection(new Date());
        const updatedStats = getGCStats();
        setStats(updatedStats);
        
        const objectsCleared = beforeStats.totalTracked - updatedStats.totalTracked;
        
        toast({
          title: "Garbage Collection Complete",
          description: `Cleaned up ${objectsCleared} objects, ${updatedStats.totalTracked} still in use`,
          variant: "default",
        });
      } catch (error) {
        console.error("Error during manual garbage collection:", error);
        toast({
          title: "Collection Failed",
          description: "An error occurred during garbage collection",
          variant: "destructive",
        });
      } finally {
        setIsCollecting(false);
      }
    }, 800); // Small delay to show the loading state
  };

  // Format milliseconds to a readable time string
  const formatTime = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${Math.floor(ms / 1000)}s`;
    if (ms < 3600000) return `${Math.floor(ms / 60000)}m ${Math.floor((ms % 60000) / 1000)}s`;
    return `${Math.floor(ms / 3600000)}h ${Math.floor((ms % 3600000) / 60000)}m`;
  };
  
  // Format bytes to a human-readable format
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Calculate memory efficiency score for visual representation
  const getEfficiencyScore = () => {
    const maxScore = 100;
    const ageFactorScore = Math.min(100, Math.max(0, 100 - (stats.oldestObjectAge / 60000))); // Age factor
    const trackedFactorScore = Math.min(100, Math.max(0, 100 - (stats.totalTracked * 2))); // Objects factor
    
    return Math.round((ageFactorScore + trackedFactorScore) / 2);
  };

  const efficiencyScore = getEfficiencyScore();
  
  // Check if collection is recommended
  const isCollectionRecommended = stats.totalTracked > 30 || stats.oldestObjectAge > 600000;

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Trash className="h-5 w-5 text-nimocare-600" />
          <span>Memory Management</span>
        </CardTitle>
        <CardDescription>
          Monitor and optimize application memory usage
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="dashboard">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="pt-4">
            <div className="space-y-4">
              <div className="flex flex-col space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Memory Efficiency</span>
                  <span className={`text-sm font-medium ${efficiencyScore < 50 ? 'text-amber-500' : 'text-green-500'}`}>
                    {efficiencyScore}%
                  </span>
                </div>
                <Progress 
                  value={efficiencyScore} 
                  className={`h-2 ${
                    efficiencyScore < 40 ? 'bg-red-100' : 
                    efficiencyScore < 70 ? 'bg-amber-100' : 'bg-green-100'
                  }`} 
                />
              </div>
              
              {isCollectionRecommended && (
                <div className="rounded-md bg-amber-50 p-3 flex items-start space-x-2">
                  <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-amber-800">Memory cleanup recommended</h4>
                    <p className="text-xs text-amber-700 mt-1">
                      {stats.totalTracked > 30 ? 
                        `Many tracked objects (${stats.totalTracked}) may impact performance.` : 
                        `Some objects have been in memory for ${formatTime(stats.oldestObjectAge)}.`
                      }
                    </p>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-gray-50 p-3">
                  <div className="flex items-center space-x-2">
                    <Server className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <div className="text-xl font-bold">{stats.totalTracked}</div>
                      <div className="text-xs text-gray-500">Tracked Objects</div>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg bg-gray-50 p-3">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <div className="text-xl font-bold">{formatTime(stats.oldestObjectAge)}</div>
                      <div className="text-xs text-gray-500">Oldest Object Age</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {memoryUsage && (
                <div className="rounded-lg bg-gray-50 p-3">
                  <div className="flex items-center space-x-2">
                    <PieChart className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">
                        {formatBytes(memoryUsage.used)} / {formatBytes(memoryUsage.total)}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div 
                          className={`h-1.5 rounded-full ${
                            (memoryUsage.used / memoryUsage.total) > 0.8 ? 'bg-red-500' : 
                            (memoryUsage.used / memoryUsage.total) > 0.6 ? 'bg-amber-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${(memoryUsage.used / memoryUsage.total) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Heap Memory Usage</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="details" className="pt-4">
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                The garbage collection system automatically cleans up resources that are no longer in use.
                This helps prevent memory leaks and improves performance.
              </p>
              
              <div className="text-sm space-y-2">
                <div className="flex justify-between border-b pb-1">
                  <span className="font-medium">Last Collection</span>
                  <span>{lastCollection ? lastCollection.toLocaleTimeString() : 'Never'}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="font-medium">Collection Interval</span>
                  <span>10 minutes</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="font-medium">Auto-collect on visibility</span>
                  <span>Enabled</span>
                </div>
              </div>
              
              <div className="rounded-md bg-gray-50 p-3 text-sm">
                <p className="font-medium mb-1">Implementation:</p>
                <p className="text-gray-600">
                  Add <code className="bg-gray-200 px-1 rounded">useGarbageCollection</code> to components 
                  that manage resources:
                </p>
                <div className="bg-gray-800 text-gray-200 p-2 rounded text-xs mt-2 overflow-x-auto">
                  <pre>{`const { touch } = useGarbageCollection(
  'unique-id',
  () => { /* cleanup function */ },
  { touchOnRender: false }
);`}</pre>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleManualCollection} 
          disabled={isCollecting}
          className="w-full"
          variant={isCollectionRecommended ? "default" : "outline"}
        >
          {isCollecting ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Collecting...
            </>
          ) : (
            <>
              <Trash className="h-4 w-4 mr-2" />
              Run Garbage Collection Now
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GarbageCollectionDashboard;
