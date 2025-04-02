
/**
 * Performance optimization utilities
 */

// More efficient debouncing function with proper typing
export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
): ((...args: Parameters<F>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<F>): void => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };
};

// More efficient throttling function with proper typing
export const throttle = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
): ((...args: Parameters<F>) => ReturnType<F> | void) => {
  let lastTime = 0;
  let result: ReturnType<F>;

  return (...args: Parameters<F>): ReturnType<F> | void => {
    const now = Date.now();
    if (now - lastTime >= waitFor) {
      result = func(...args);
      lastTime = now;
      return result;
    }
  };
};

// Optimize garbage collection interval based on system performance
export const optimizeGCInterval = (
  currentInterval: number,
  performanceScore: number // 0-100, higher is better
): number => {
  // Adjust interval based on performance
  // Lower performance = less frequent GC to reduce overhead
  if (performanceScore < 30) {
    return Math.min(currentInterval * 2, 15 * 60 * 1000); // Max 15 minutes (increased)
  } else if (performanceScore > 70) {
    return Math.max(currentInterval / 1.5, 30 * 1000); // Min 30 seconds
  }
  return currentInterval;
};

// More efficient DOM batch updates
export const batchDOMUpdates = (updates: (() => void)[]) => {
  // Use requestAnimationFrame to batch updates in the next frame
  if (updates.length === 0) return;
  
  requestAnimationFrame(() => {
    // Apply all updates
    updates.forEach(update => update());
  });
};

// Cache for device capabilities to avoid recalculating
let deviceCapabilitiesCache: {
  tier: 'low' | 'medium' | 'high',
  canUseHeavyAnimations: boolean,
  recommendedImagesQuality: 'low' | 'medium' | 'high'
} | null = null;

// Detect performance capabilities of the device with caching
export const detectDeviceCapabilities = (): {
  tier: 'low' | 'medium' | 'high',
  canUseHeavyAnimations: boolean,
  recommendedImagesQuality: 'low' | 'medium' | 'high'
} => {
  // Return cached result if available to avoid expensive calculations
  if (deviceCapabilitiesCache !== null) {
    return deviceCapabilitiesCache;
  }
  
  // Default to medium tier
  let tier: 'low' | 'medium' | 'high' = 'medium';
  
  // Check for hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 2;
  
  // Check for device memory (in GB)
  const memory = (navigator as any).deviceMemory || 4;
  
  // Device with many cores and good memory is likely high end
  if (cores >= 8 && memory >= 8) {
    tier = 'high';
  } else if (cores <= 2 || memory <= 2) {
    tier = 'low';
  } else if (
    // Check for mobile devices which typically have worse performance
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  ) {
    tier = 'medium'; // Default mobile to medium tier at most
  }
  
  // Create the result
  const result = {
    tier,
    canUseHeavyAnimations: tier !== 'low',
    recommendedImagesQuality: tier === 'high' ? 'high' : (tier === 'medium' ? 'medium' : 'low')
  };
  
  // Cache the result
  deviceCapabilitiesCache = result;
  
  return result;
};

// Calculate performance score based on various metrics
export const calculatePerformanceScore = (
  fps: number, 
  memoryUsage: number, 
  interactionDelay: number
): number => {
  // Normalize values to 0-100 scale
  const fpsScore = Math.min(100, (fps / 60) * 100);
  const memoryScore = Math.max(0, 100 - memoryUsage);
  const interactionScore = Math.max(0, 100 - (interactionDelay / 100) * 100);
  
  // Weighted average
  return (fpsScore * 0.4) + (memoryScore * 0.3) + (interactionScore * 0.3);
};

// Clear animation frames utility to prevent memory leaks
export const clearAllAnimationFrames = (frameIds: number[]) => {
  frameIds.forEach(id => cancelAnimationFrame(id));
  return [];
};
