
/**
 * A simple garbage collection utility for managing resources and memory
 */

// Track objects that need cleanup
const trackedObjects: Map<string, { dispose: () => void; lastAccessed: number }> = new Map();

// Default TTL (time to live) in milliseconds (5 minutes)
const DEFAULT_TTL = 5 * 60 * 1000;

/**
 * Register an object for garbage collection
 * @param id Unique identifier for the object
 * @param disposeFunction Function to call when the object is disposed
 */
export const registerForCleanup = (id: string, disposeFunction: () => void): void => {
  trackedObjects.set(id, {
    dispose: disposeFunction,
    lastAccessed: Date.now(),
  });
  console.log(`Registered object for cleanup: ${id}`);
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
      console.log(`Successfully disposed object: ${id}`);
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
  const now = Date.now();
  let collectedCount = 0;
  
  trackedObjects.forEach((obj, id) => {
    if (now - obj.lastAccessed > maxAge) {
      try {
        obj.dispose();
        trackedObjects.delete(id);
        collectedCount++;
      } catch (e) {
        console.error(`Error during garbage collection for ${id}:`, e);
      }
    }
  });
  
  if (collectedCount > 0) {
    console.log(`Garbage collection completed. Disposed ${collectedCount} objects.`);
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
