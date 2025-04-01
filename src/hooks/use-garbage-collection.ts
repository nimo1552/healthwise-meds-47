
import { useEffect } from "react";
import { registerForCleanup, disposeObject } from "../utils/garbageCollection";

/**
 * Hook to register a resource for automatic cleanup
 * 
 * @param id Unique identifier for the resource
 * @param cleanup Function to be called when the resource is disposed
 */
export function useGarbageCollection(id: string, cleanup: () => void): void {
  useEffect(() => {
    // Register the resource when the component mounts
    registerForCleanup(id, cleanup);
    
    // Clean up when the component unmounts
    return () => {
      disposeObject(id);
    };
  }, [id, cleanup]);
}
