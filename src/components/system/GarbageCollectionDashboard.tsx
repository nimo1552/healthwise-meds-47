
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getGCStats, runGarbageCollection } from '@/utils/garbageCollection';
import { Trash, RefreshCw, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const GarbageCollectionDashboard = () => {
  const [stats, setStats] = useState({ totalTracked: 0, oldestObjectAge: 0 });
  const [isCollecting, setIsCollecting] = useState(false);
  const [lastCollection, setLastCollection] = useState<Date | null>(null);
  const { toast } = useToast();

  // Refresh stats periodically
  useEffect(() => {
    const updateStats = () => {
      const currentStats = getGCStats();
      setStats(currentStats);
    };

    // Update stats immediately and then every 10 seconds
    updateStats();
    const interval = setInterval(updateStats, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleManualCollection = () => {
    setIsCollecting(true);
    setTimeout(() => {
      try {
        runGarbageCollection();
        setLastCollection(new Date());
        const updatedStats = getGCStats();
        setStats(updatedStats);
        
        toast({
          title: "Garbage Collection Complete",
          description: "Memory has been successfully cleaned up",
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

  // Calculate memory efficiency score (just for visual representation)
  const getEfficiencyScore = () => {
    const maxScore = 100;
    const ageFactorScore = Math.min(100, Math.max(0, 100 - (stats.oldestObjectAge / 60000))); // Age factor
    const trackedFactorScore = Math.min(100, Math.max(0, 100 - (stats.totalTracked * 10))); // Objects factor
    
    return Math.round((ageFactorScore + trackedFactorScore) / 2);
  };

  const efficiencyScore = getEfficiencyScore();

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
                  <span className="text-sm font-medium">{efficiencyScore}%</span>
                </div>
                <Progress value={efficiencyScore} className="h-2" />
              </div>
              
              {efficiencyScore < 50 && (
                <div className="rounded-md bg-amber-50 p-3 flex items-start space-x-2">
                  <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-amber-800">Memory usage is suboptimal</h4>
                    <p className="text-xs text-amber-700 mt-1">
                      Consider running a manual garbage collection to free up resources.
                    </p>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-gray-50 p-3">
                  <div className="text-xl font-bold">{stats.totalTracked}</div>
                  <div className="text-xs text-gray-500">Tracked Objects</div>
                </div>
                
                <div className="rounded-lg bg-gray-50 p-3">
                  <div className="text-xl font-bold">{formatTime(stats.oldestObjectAge)}</div>
                  <div className="text-xs text-gray-500">Oldest Object Age</div>
                </div>
              </div>
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
                  <span>5 minutes</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="font-medium">Auto-collect on visibility</span>
                  <span>Enabled</span>
                </div>
              </div>
              
              <div className="rounded-md bg-gray-50 p-3 text-sm">
                <p className="font-medium mb-1">Tip:</p>
                <p className="text-gray-600">
                  Use the <code className="bg-gray-200 px-1 rounded">useGarbageCollection</code> hook 
                  to register resources for automatic cleanup.
                </p>
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
          variant="default"
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
