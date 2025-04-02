import { useState, useEffect, useCallback } from 'react';
import { runGarbageCollection } from '@/utils/garbageCollection';
import { throttle } from '@/utils/performanceUtils';

/**
 * Interface for the memory optimization hook return value
 */
interface MemoryOptimizationReturn {
  /**
   * Current memory usage information (Chrome only)
   */
  memoryInfo: {
    used: number;
    total: number;
    limit: number;
    usagePercentage: number;
  } | null;
  
  /**
   * Run garbage collection manually
   */
  runGarbageCollection: () => void;
  
  /**
   * Is the memory usage high?
   */
  isMemoryUsageHigh: boolean;
  
  /**
   * Free large resources not in use
   * @param resourceType Optional type of resources to free
   */
  freeResources: (resourceType?: string) => void;
}

/**
 * Hook for optimizing memory usage
 * @param options Configuration options
 * @returns Memory optimization utilities
 */
export function useMemoryOptimization(options?: {
  /**
   * Threshold percentage (0-1) at which memory usage is considered high
   */
  highMemoryThreshold?: number;
  
  /**
   * Run garbage collection automatically when memory usage is high
   */
  autoCollectOnHighMemory?: boolean;
  
  /**
   * Run optimizations automatically on visibility change (when tab becomes visible)
   */
  optimizeOnVisibilityChange?: boolean;
  
  /**
   * Run garbage collection automatically after X milliseconds
   */
  autoCollectInterval?: number | null;
}): MemoryOptimizationReturn {
  const {
    highMemoryThreshold = 0.7, // 70% by default
    autoCollectOnHighMemory = true,
    optimizeOnVisibilityChange = true,
    autoCollectInterval = null
  } = options || {};
  
  const [memoryInfo, setMemoryInfo] = useState<MemoryOptimizationReturn['memoryInfo']>(null);
  const [isMemoryUsageHigh, setIsMemoryUsageHigh] = useState(false);
  
  // Update memory info function (throttled to avoid overhead)
  const updateMemoryInfo = useCallback(throttle(() => {
    if (typeof performance === 'undefined' || !(performance as any).memory) {
      return;
    }
    
    const memory = (performance as any).memory;
    
    const info = {
      used: memory.usedJSHeapSize,
      total: memory.totalJSHeapSize,
      limit: memory.jsHeapSizeLimit,
      usagePercentage: memory.usedJSHeapSize / memory.jsHeapSizeLimit
    };
    
    setMemoryInfo(info);
    setIsMemoryUsageHigh(info.usagePercentage > highMemoryThreshold);
    
    // Auto-collect on high memory if enabled
    if (autoCollectOnHighMemory && info.usagePercentage > highMemoryThreshold) {
      console.log('Memory usage high, running garbage collection...');
      runGarbageCollection();
    }
  }, 2000), [highMemoryThreshold, autoCollectOnHighMemory]);
  
  // Manual GC function
  const triggerGarbageCollection = useCallback(() => {
    updateMemoryInfo();
    runGarbageCollection();
    
    // Force update memory info after collection
    setTimeout(() => {
      updateMemoryInfo();
    }, 300);
  }, [updateMemoryInfo]);
  
  // Resource freeing function
  const freeResources = useCallback((resourceType?: string) => {
    // Clean image caches in memory
    // This is a common memory hog in web applications
    const images = document.querySelectorAll('img[data-optimize="true"]');
    images.forEach(img => {
      // Store original src
      const originalSrc = img.getAttribute('src');
      if (originalSrc) {
        img.setAttribute('data-original-src', originalSrc);
        img.setAttribute('src', '');
      }
    });
    
    // If browser supports, collect by type
    if (resourceType && typeof window !== 'undefined') {
      // Use imported collectByType function
      const { collectByType } = require('@/utils/garbageCollection');
      collectByType(resourceType);
    } else {
      // Otherwise just run general collection
      runGarbageCollection();
    }
    
    console.log('Resources freed');
    
    // Update memory info after cleanup
    setTimeout(() => {
      updateMemoryInfo();
    }, 500);
  }, [updateMemoryInfo]);
  
  // Monitor memory usage
  useEffect(() => {
    // Initial check
    updateMemoryInfo();
    
    // Setup periodic checks
    const intervalId = setInterval(updateMemoryInfo, 5000);
    
    // Setup visibility change handler
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && optimizeOnVisibilityChange) {
        console.log('Tab became visible, updating memory info...');
        updateMemoryInfo();
      }
    };
    
    // Listen for visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Auto collection interval if specified
    let autoCollectionId: number | null = null;
    if (autoCollectInterval) {
      autoCollectionId = window.setInterval(triggerGarbageCollection, autoCollectInterval);
    }
    
    // Cleanup
    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (autoCollectionId !== null) {
        clearInterval(autoCollectionId);
      }
    };
  }, [updateMemoryInfo, optimizeOnVisibilityChange, autoCollectInterval, triggerGarbageCollection]);
  
  return {
    memoryInfo,
    runGarbageCollection: triggerGarbageCollection,
    isMemoryUsageHigh,
    freeResources
  };
}
