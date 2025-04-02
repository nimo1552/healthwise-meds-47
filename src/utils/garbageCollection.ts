
/**
 * A simple garbage collection utility for managing resources and memory
 */

// Track objects that need cleanup
const trackedObjects: Map<string, { dispose: () => void; lastAccessed: number }> = new Map();

// Default TTL (time to live) in milliseconds (10 minutes - increased from 5 minutes)
const DEFAULT_TTL = 10 * 60 * 1000;

// Track if garbage collection is running to prevent overlapping calls
let isRunningGC = false;

/**
 * Register an object for garbage collection
 * @param id Unique identifier for the object
 * @param disposeFunction Function to call when the object is disposed
 */
export const registerForCleanup = (id: string, disposeFunction: () => void): void => {
  // If already tracked, don't overwrite the last accessed time
  if (trackedObjects.has(id)) {
    trackedObjects.set(id, {
      dispose: disposeFunction,
      lastAccessed: trackedObjects.get(id)!.lastAccessed
    });
  } else {
    trackedObjects.set(id, {
      dispose: disposeFunction,
      lastAccessed: Date.now(),
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
  }
};

/**
 * Manually dispose of an object
 * @param id Unique identifier for the object
 */
export const disposeObject = (id: string): void => {
  const obj = trackedObjects.get(id);
  if (obj) {
    try {
      obj.dispose();
    } catch (e) {
      console.error(`Error disposing object ${id}:`, e);
    }
    trackedObjects.delete(id);
  }
};

/**
 * Run garbage collection to clean up unused objects
 * @param maxAge Maximum age in milliseconds before an object is considered unused
 */
export const runGarbageCollection = (maxAge: number = DEFAULT_TTL): void => {
  // Prevent multiple GC runs at the same time
  if (isRunningGC) return;
  
  try {
    isRunningGC = true;
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
      const obj = trackedObjects.get(id);
      if (obj) {
        try {
          obj.dispose();
          trackedObjects.delete(id);
          collectedCount++;
        } catch (e) {
          console.error(`Error during garbage collection for ${id}:`, e);
        }
      }
    }
    
    if (collectedCount > 0) {
      console.log(`Garbage collection completed. Disposed ${collectedCount} objects.`);
    }
  } finally {
    isRunningGC = false;
  }
};

/**
 * Get statistics about tracked objects
 */
export const getGCStats = (): { totalTracked: number; oldestObjectAge: number } => {
  const now = Date.now();
  let oldestTime = now;
  
  trackedObjects.forEach((obj) => {
    if (obj.lastAccessed < oldestTime) {
      oldestTime = obj.lastAccessed;
    }
  });
  
  return {
    totalTracked: trackedObjects.size,
    oldestObjectAge: now - oldestTime,
  };
};
