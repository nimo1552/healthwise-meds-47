// Utility function to throttle function calls
export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): T {
  let lastFunc: ReturnType<typeof setTimeout> | null;
  let lastRan: number;
  return function(this: any, ...args: Parameters<T>) {
    if (!lastRan) {
      func.apply(this, args);
      lastRan = Date.now();
    } else {
      if (lastFunc) clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(this, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  } as T;
}

// Add the correct type for device performance tiers
type PerformanceTier = "low" | "medium" | "high";

// Properly type the performance profile
interface PerformanceProfile {
  tier: PerformanceTier;
  canUseHeavyAnimations: boolean;
  recommendedImagesQuality: PerformanceTier;
}

// Return a performance profile based on the device's capabilities
export function getDevicePerformanceProfile(): PerformanceProfile {
  // Default to medium if we can't determine
  const defaultProfile: PerformanceProfile = {
    tier: "medium",
    canUseHeavyAnimations: true,
    recommendedImagesQuality: "medium"
  };

  // If we can't detect features, return default profile
  if (typeof window === 'undefined' || !navigator) {
    return defaultProfile;
  }

  // Low-end device detection
  const isLowEndDevice = () => {
    // Check memory (less than 4GB suggests a lower-end device)
    if (navigator.deviceMemory && navigator.deviceMemory < 4) {
      return true;
    }
    
    // Check number of logical processor cores
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
      return true;
    }
    
    // Check for battery status if available
    if (navigator.getBattery) {
      navigator.getBattery().then(battery => {
        // If battery is low and not charging, consider it a constraint
        if (battery.level < 0.2 && !battery.charging) {
          return true;
        }
      }).catch(() => {
        // If we can't get battery info, ignore this check
      });
    }
    
    return false;
  };
  
  // High-end device detection
  const isHighEndDevice = () => {
    // Check memory (8GB or more suggests a higher-end device)
    if (navigator.deviceMemory && navigator.deviceMemory >= 8) {
      return true;
    }
    
    // Check number of logical processor cores
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency >= 8) {
      return true;
    }
    
    return false;
  };
  
  // Create profile based on device capabilities
  if (isLowEndDevice()) {
    return {
      tier: "low",
      canUseHeavyAnimations: false,
      recommendedImagesQuality: "low"
    };
  } else if (isHighEndDevice()) {
    return {
      tier: "high",
      canUseHeavyAnimations: true,
      recommendedImagesQuality: "high"
    };
  }
  
  // Return medium profile as default
  return defaultProfile;
}
