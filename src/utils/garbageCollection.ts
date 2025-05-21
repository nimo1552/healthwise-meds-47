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
    
    // Additional cleanup or logging can be added here
    console.log("Garbage collection completed.");
  } catch (error) {
    console.error("Error during garbage collection:", error);
  }
};
