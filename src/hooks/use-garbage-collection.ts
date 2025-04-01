
import { useEffect, useCallback } from "react";
import { registerForCleanup, disposeObject, touchObject } from "../utils/garbageCollection";

/**
 * Hook to register a resource for automatic cleanup
 * 
 * @param id Unique identifier for the resource
 * @param cleanup Function to be called when the resource is disposed
 * @param config Optional configuration options
 * @returns Object with utility functions
 */
export function useGarbageCollection(
  id: string, 
  cleanup: () => void,
  config?: {
    /**
     * Whether to touch the resource on each render
     * This keeps frequently used resources alive
     */
    touchOnRender?: boolean;
    
    /**
     * Whether to log actions to the console
     * Useful for debugging
     */
    verbose?: boolean;
  }
): { 
  /**
   * Manually touch the resource to prevent it from being garbage collected
   */
  touch: () => void;
  
  /**
   * Manually dispose the resource
   */
  dispose: () => void;
} {
  const { touchOnRender = false, verbose = false } = config || {};
  
  // Touch the resource to prevent it from being garbage collected
  const touch = useCallback(() => {
    touchObject(id);
    if (verbose) {
      console.log(`Resource touched: ${id}`);
    }
  }, [id, verbose]);
  
  // Manually dispose the resource
  const dispose = useCallback(() => {
    disposeObject(id);
    if (verbose) {
      console.log(`Resource manually disposed: ${id}`);
    }
  }, [id, verbose]);
  
  useEffect(() => {
    // Register the resource when the component mounts
    registerForCleanup(id, cleanup);
    
    if (verbose) {
      console.log(`Resource registered for cleanup: ${id}`);
    }
    
    // Clean up when the component unmounts
    return () => {
      disposeObject(id);
      if (verbose) {
        console.log(`Resource disposed on unmount: ${id}`);
      }
    };
  }, [id, cleanup, verbose]);
  
  // Touch the resource on render if configured
  useEffect(() => {
    if (touchOnRender) {
      touch();
    }
  });
  
  return { touch, dispose };
}
