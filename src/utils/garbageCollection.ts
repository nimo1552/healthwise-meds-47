
/**
 * Garbage collection utilities for managing resources
 */

interface GCStats {
  totalTracked: number;
  oldestObjectAge: number;
}

// Track objects for garbage collection
const trackedObjects: Record<string, {
  timestamp: number;
  cleanup?: () => void;
}> = {};

/**
 * Register an object for cleanup when garbage collection runs
 * @param id Unique identifier for the object
 * @param cleanup Function to be called when the object is disposed
 */
export const registerForCleanup = (id: string, cleanup?: () => void): void => {
  trackedObjects[id] = {
    timestamp: Date.now(),
    cleanup
  };
  
  console.log(`Object registered for cleanup: ${id}`);
};

/**
 * Manually dispose an object and run its cleanup function
 * @param id Unique identifier for the object
 */
export const disposeObject = (id: string): void => {
  const obj = trackedObjects[id];
  
  if (obj) {
    if (typeof obj.cleanup === 'function') {
      try {
        obj.cleanup();
      } catch (error) {
        console.error(`Error running cleanup for object ${id}:`, error);
      }
    }
    
    delete trackedObjects[id];
    console.log(`Object disposed: ${id}`);
  }
};

/**
 * Update the timestamp of an object to prevent it from being garbage collected
 * @param id Unique identifier for the object
 */
export const touchObject = (id: string): void => {
  if (trackedObjects[id]) {
    trackedObjects[id].timestamp = Date.now();
    console.log(`Object touched: ${id}`);
  } else {
    console.warn(`Attempted to touch non-existent object: ${id}`);
  }
};

/**
 * Get statistics about the garbage collection system
 * @returns Object with statistics
 */
export const getGCStats = (): GCStats => {
  const ids = Object.keys(trackedObjects);
  const now = Date.now();
  
  let oldestTimestamp = now;
  
  // Find the oldest timestamp
  for (const id of ids) {
    if (trackedObjects[id].timestamp < oldestTimestamp) {
      oldestTimestamp = trackedObjects[id].timestamp;
    }
  }
  
  return {
    totalTracked: ids.length,
    oldestObjectAge: now - oldestTimestamp
  };
};

/**
 * Runs garbage collection on localStorage items
 * @param ttl Time to live in milliseconds
 * @param exclusions Array of localStorage keys to exclude from garbage collection
 */
export const runGarbageCollection = (ttl: number = 3600000, exclusions: string[] = []): void => {
  try {
    const now = Date.now();
    
    // Get all keys in localStorage
    const keys = Object.keys(localStorage);
    
    for (const key of keys) {
      // Skip excluded keys
      if (exclusions.includes(key)) {
        console.log(`Skipping garbage collection for excluded key: ${key}`);
        continue;
      }
      
      // Get the item from localStorage
      const item = localStorage.getItem(key);
      
      // If the item exists
      if (item) {
        try {
          // Parse the item
          const parsedItem = JSON.parse(item);
          
          // Check if the item has a timestamp
          if (parsedItem && parsedItem.timestamp) {
            const itemTimestamp = parsedItem.timestamp;
            
            // Check if the item is expired
            if (now - itemTimestamp > ttl) {
              // Remove the item from localStorage
              localStorage.removeItem(key);
              console.log(`Garbage collecting expired item: ${key}`);
            }
          } else {
            console.warn(`Item ${key} does not have a timestamp. Skipping.`);
          }
        } catch (e) {
          console.warn(`Failed to parse item ${key}. It may not be JSON. Skipping.`, e);
        }
      }
    }
    
    // Now also clean up tracked objects in memory
    const objectIds = Object.keys(trackedObjects);
    let collectedCount = 0;
    
    for (const id of objectIds) {
      const obj = trackedObjects[id];
      
      // Check if the object is expired
      if (now - obj.timestamp > ttl) {
        if (typeof obj.cleanup === 'function') {
          try {
            obj.cleanup();
          } catch (error) {
            console.error(`Error running cleanup for object ${id}:`, error);
          }
        }
        
        delete trackedObjects[id];
        collectedCount++;
        console.log(`Memory garbage collecting object: ${id}`);
      }
    }
    
    // Additional cleanup or logging
    console.log(`Garbage collection completed. Collected ${collectedCount} in-memory objects.`);
  } catch (error) {
    console.error("Error during garbage collection:", error);
  }
};
