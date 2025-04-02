import React, { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

// Performance metrics interface
interface PerformanceMetrics {
  fps: number;
  memory: {
    jsHeapSizeLimit: number;
    totalJSHeapSize: number;
    usedJSHeapSize: number;
  } | null;
  gcStats: {
    totalTracked: number;
    oldestObjectAge: number;
  };
  loadTime: number;
  domNodes: number;
  renderCount: number;
}

// Default metrics
const defaultMetrics: PerformanceMetrics = {
  fps: 0,
  memory: null,
  gcStats: { totalTracked: 0, oldestObjectAge: 0 },
  loadTime: 0,
  domNodes: 0,
  renderCount: 0,
};

// Performance issues that we can detect
const performanceIssues = [
  {
    name: 'Low FPS',
    check: (metrics: PerformanceMetrics) => metrics.fps < 30,
    message: 'Low framerate detected (under 30 FPS). This can cause UI lag and poor animation performance.',
    solution: 'Consider reducing animations, especially in Framer Motion components. Check for expensive re-renders.'
  },
  {
    name: 'High Memory Usage',
    check: (metrics: PerformanceMetrics) => 
      metrics.memory && (metrics.memory.usedJSHeapSize / metrics.memory.jsHeapSizeLimit > 0.7),
    message: 'High memory usage detected. This can cause periodic lag spikes during garbage collection.',
    solution: 'Review large data structures, reduce unnecessary state, and check for memory leaks.'
  },
  {
    name: 'Many DOM Nodes',
    check: (metrics: PerformanceMetrics) => metrics.domNodes > 1500,
    message: 'Large DOM tree detected. Too many DOM nodes can slow down rendering and interactions.',
    solution: 'Implement virtualization for long lists, lazy load components, and simplify your component tree.'
  },
  {
    name: 'Many GC Tracked Objects',
    check: (metrics: PerformanceMetrics) => metrics.gcStats.totalTracked > 50,
    message: 'Many objects being tracked by garbage collection. This can cause periodic cleanup pauses.',
    solution: 'Reduce the number of tracked objects or adjust garbage collection frequency.'
  }
];

const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>(defaultMetrics);
  const [isVisible, setIsVisible] = useState(false);
  const [renderCount, setRenderCount] = useState(0);
  const [lastFrameTime, setLastFrameTime] = useState(performance.now());
  const [frames, setFrames] = useState<number[]>([]);
  
  // Calculate FPS
  useEffect(() => {
    let frameId: number;
    let running = true;
    
    const updateFPS = () => {
      if (!running) return;
      
      const now = performance.now();
      const delta = now - lastFrameTime;
      setLastFrameTime(now);
      
      // Calculate current FPS
      const currentFPS = 1000 / delta;
      
      // Keep the last 10 frames for a running average
      setFrames(prevFrames => {
        const newFrames = [...prevFrames, currentFPS].slice(-10);
        const avgFPS = Math.round(newFrames.reduce((sum, fps) => sum + fps, 0) / newFrames.length);
        
        setMetrics(prev => ({
          ...prev,
          fps: avgFPS
        }));
        
        return newFrames;
      });
      
      frameId = requestAnimationFrame(updateFPS);
    };
    
    frameId = requestAnimationFrame(updateFPS);
    
    return () => {
      running = false;
      cancelAnimationFrame(frameId);
    };
  }, [lastFrameTime]);
  
  // Get memory usage and other metrics
  useEffect(() => {
    // Increment render count on each render
    setRenderCount(count => count + 1);
    
    // Update all other metrics periodically
    const intervalId = setInterval(() => {
      try {
        // Get memory usage (only works in Chrome)
        const memory = (performance as any).memory ? {
          jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit,
          totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
          usedJSHeapSize: (performance as any).memory.usedJSHeapSize
        } : null;
        
        // Get page load time
        const loadTime = performance.timing ? 
          performance.timing.loadEventEnd - performance.timing.navigationStart : 0;
        
        // Count DOM nodes
        const domNodes = document.querySelectorAll('*').length;
        
        // Get GC stats from your utility
        const { getGCStats } = require('@/utils/garbageCollection');
        const gcStats = getGCStats();
        
        setMetrics(prev => ({
          ...prev,
          memory,
          loadTime,
          domNodes,
          gcStats,
          renderCount
        }));
        
        // Check for performance issues
        checkPerformanceIssues({
          ...metrics,
          memory,
          loadTime,
          domNodes,
          gcStats,
          renderCount
        });
        
      } catch (error) {
        console.error('Error measuring performance:', error);
      }
    }, 2000);
    
    return () => clearInterval(intervalId);
  }, [renderCount]);
  
  // Check for performance issues and notify if found
  const checkPerformanceIssues = (currentMetrics: PerformanceMetrics) => {
    performanceIssues.forEach(issue => {
      if (issue.check(currentMetrics)) {
        console.warn(`Performance issue detected: ${issue.name}`);
      }
    });
  };
  
  // Show/hide the monitor with keyboard shortcut (Alt+P)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'p') {
        setIsVisible(!isVisible);
        toast.info(isVisible ? 'Performance monitor hidden' : 'Performance monitor shown');
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);
  
  if (!isVisible) return null;
  
  // Format bytes to a readable format
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  return (
    <Card className="fixed bottom-4 right-4 w-80 z-50 shadow-lg opacity-90 hover:opacity-100 transition-opacity">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex justify-between items-center">
          <span>Performance Monitor</span>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            Hide (Alt+P)
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-xs space-y-2">
        <div className="flex justify-between">
          <span>FPS:</span>
          <span className={metrics.fps < 30 ? 'text-red-500 font-medium' : ''}>
            {metrics.fps}
          </span>
        </div>
        
        <Separator />
        
        <div className="flex justify-between">
          <span>DOM Nodes:</span>
          <span className={metrics.domNodes > 1500 ? 'text-amber-500 font-medium' : ''}>
            {metrics.domNodes}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>Render Count:</span>
          <span>{metrics.renderCount}</span>
        </div>
        
        <Separator />
        
        <div className="flex justify-between">
          <span>GC Tracked Objects:</span>
          <span className={metrics.gcStats.totalTracked > 50 ? 'text-amber-500 font-medium' : ''}>
            {metrics.gcStats.totalTracked}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>Oldest Object Age:</span>
          <span>{Math.round(metrics.gcStats.oldestObjectAge / 1000)}s</span>
        </div>
        
        <Separator />
        
        {metrics.memory && (
          <>
            <div className="flex justify-between">
              <span>Memory Used:</span>
              <span className={metrics.memory.usedJSHeapSize / metrics.memory.jsHeapSizeLimit > 0.7 ? 'text-red-500 font-medium' : ''}>
                {formatBytes(metrics.memory.usedJSHeapSize)} / {formatBytes(metrics.memory.jsHeapSizeLimit)}
              </span>
            </div>
          </>
        )}
        
        <div className="text-xs text-gray-500 mt-2">
          Press Alt+P to toggle this panel
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceMonitor;
