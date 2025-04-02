/**
 * Enhanced garbage collection utility for managing resources and memory
 */

// Track objects that need cleanup
const trackedObjects: Map<string, { 
  dispose: () => void; 
  lastAccessed: number;
  createdAt: number;
  accessCount: number;
  type?: string;
}> = new Map();

// Default TTL (time to live) in milliseconds (10 minutes)
const DEFAULT_TTL = 10 * 60 * 1000;

// Track if garbage collection is running to prevent overlapping calls
let isRunningGC = false;

// Stats collection
let collectionRuns = 0;
let totalDisposedObjects = 0;
let lastCollectionTime: number | null = null;
let lastCollectionDuration = 0;

/**
 * Register an object for garbage collection
 * @param id Unique identifier for the object
 * @param disposeFunction Function to call when the object is disposed
 * @param type Optional type identifier for categorizing objects
 */
export const registerForCleanup = (id: string, disposeFunction: () => void, type?: string): void => {
  const now = Date.now();
  
  // If already tracked, don't overwrite the created time or increment access count
  if (trackedObjects.has(id)) {
    const existing = trackedObjects.get(id)!;
    trackedObjects.set(id, {
      dispose: disposeFunction,
      lastAccessed: now,
      createdAt: existing.createdAt,
      accessCount: existing.accessCount + 1,
      type: type || existing.type
    });
  } else {
    trackedObjects.set(id, {
      dispose: disposeFunction,
      lastAccessed: now,
      createdAt: now,
      accessCount: 1,
      type
    });
  }
};

/**
 * Update the last accessed time for an object
 * @param id Unique identifier for the object
 */
export const touchObject = (id: string): void => {
  const obj = trackedObjects.get(id);
  if (obj) {
    obj.lastAccessed = Date.now();
    obj.accessCount++;
  }
};

/**
 * Manually dispose of an object
 * @param id Unique identifier for the object
 * @returns Boolean indicating if the object was successfully disposed
 */
export const disposeObject = (id: string): boolean => {
  const obj = trackedObjects.get(id);
  if (obj) {
    try {
      obj.dispose();
      trackedObjects.delete(id);
      totalDisposedObjects++;
      return true;
    } catch (e) {
      console.error(`Error disposing object ${id}:`, e);
      // Keep the object tracked but mark it as errored
      // This allows for retry on next collection
      return false;
    }
  }
  return false;
};

/**
 * Run garbage collection to clean up unused objects
 * @param maxAge Maximum age in milliseconds before an object is considered unused
 * @returns Statistics about the collection run
 */
export const runGarbageCollection = (maxAge: number = DEFAULT_TTL): {
  collected: number;
  duration: number;
  remaining: number;
} => {
  // Prevent multiple GC runs at the same time
  if (isRunningGC) {
    return { collected: 0, duration: 0, remaining: trackedObjects.size };
  }
  
  const startTime = performance.now();
  isRunningGC = true;
  
  try {
    const now = Date.now();
    let collectedCount = 0;
    const objectsToDispose: string[] = [];
    
    // First identify objects to dispose
    trackedObjects.forEach((obj, id) => {
      if (now - obj.lastAccessed > maxAge) {
        objectsToDispose.push(id);
      }
    });
    
    // Then dispose them
    for (const id of objectsToDispose) {
      if (disposeObject(id)) {
        collectedCount++;
      }
    }
    
    // Update stats
    collectionRuns++;
    totalDisposedObjects += collectedCount;
    lastCollectionTime = now;
    lastCollectionDuration = performance.now() - startTime;
    
    if (collectedCount > 0) {
      console.log(`Garbage collection completed in ${lastCollectionDuration.toFixed(2)}ms. Disposed ${collectedCount} objects.`);
    }
    
    return {
      collected: collectedCount,
      duration: lastCollectionDuration,
      remaining: trackedObjects.size
    };
  } finally {
    isRunningGC = false;
  }
};

/**
 * Get detailed statistics about tracked objects and collection history
 */
export const getGCStats = (): { 
  totalTracked: number;
  oldestObjectAge: number;
  objectsByType?: Record<string, number>;
  collectionRuns: number;
  totalDisposedObjects: number;
  lastCollectionTime: number | null;
  lastCollectionDuration: number;
  averageObjectAge: number;
} => {
  const now = Date.now();
  let oldestTime = now;
  let totalAge = 0;
  const typeCount: Record<string, number> = {};
  
  trackedObjects.forEach((obj) => {
    if (obj.lastAccessed < oldestTime) {
      oldestTime = obj.lastAccessed;
    }
    
    totalAge += (now - obj.createdAt);
    
    // Count by type if available
    const type = obj.type || 'unknown';
    typeCount[type] = (typeCount[type] || 0) + 1;
  });
  
  const objectCount = trackedObjects.size;
  
  return {
    totalTracked: objectCount,
    oldestObjectAge: now - oldestTime,
    objectsByType: typeCount,
    collectionRuns,
    totalDisposedObjects,
    lastCollectionTime,
    lastCollectionDuration,
    averageObjectAge: objectCount > 0 ? totalAge / objectCount : 0
  };
};

/**
 * Force collection of objects by type
 * @param type The type of objects to collect
 * @returns Number of objects collected
 */
export const collectByType = (type: string): number => {
  if (isRunningGC) return 0;
  
  isRunningGC = true;
  let collected = 0;
  
  try {
    const objectsToDispose: string[] = [];
    
    trackedObjects.forEach((obj, id) => {
      if (obj.type === type) {
        objectsToDispose.push(id);
      }
    });
    
    for (const id of objectsToDispose) {
      if (disposeObject(id)) {
        collected++;
      }
    }
    
    return collected;
  } finally {
    isRunningGC = false;
  }
};

/**
 * Force collection of old objects matching a predicate
 * @param predicate Function to determine if an object should be collected
 * @returns Number of objects collected
 */
export const collectWithPredicate = (
  predicate: (id: string, lastAccessed: number, createdAt: number, accessCount: number, type?: string) => boolean
): number => {
  if (isRunningGC) return 0;
  
  isRunningGC = true;
  let collected = 0;
  
  try {
    const objectsToDispose: string[] = [];
    
    trackedObjects.forEach((obj, id) => {
      if (predicate(id, obj.lastAccessed, obj.createdAt, obj.accessCount, obj.type)) {
        objectsToDispose.push(id);
      }
    });
    
    for (const id of objectsToDispose) {
      if (disposeObject(id)) {
        collected++;
      }
    }
    
    return collected;
  } finally {
    isRunningGC = false;
  }
};
