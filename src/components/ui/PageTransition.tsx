
import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { getDevicePerformanceProfile } from "@/utils/performanceUtils";
import { useGarbageCollection } from "@/hooks/use-garbage-collection";

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition = ({ children }: PageTransitionProps) => {
  // Use useReducedMotion hook to respect user's system preferences
  const prefersReducedMotion = useReducedMotion();
  
  // Detect device capabilities, but only on mount to avoid re-renders
  const [capabilities] = useState(getDevicePerformanceProfile());
  
  // Generate a unique identifier for this component instance
  const transitionId = React.useId();
  
  // Register with garbage collection to clean up any resources
  const { touch } = useGarbageCollection(
    `page-transition-${transitionId}`,
    () => {
      // Cleanup function - executed when the component is disposed
      // This ensures any animation resources are properly cleaned up
      console.log("PageTransition component cleaned up");
    },
    { touchOnRender: false }
  );
  
  // Touch the resource when visibility changes to prevent premature collection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        touch();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [touch]);
  
  // If user prefers reduced motion or device is low-end, use minimal animations
  const shouldReduceMotion = prefersReducedMotion || capabilities.tier === 'low';
  
  // Create transition properties based on device capabilities
  const transitionProps = shouldReduceMotion 
    ? {
        // Almost no animation for reduced motion preference or low-end devices
        initial: { opacity: 0.95 },
        animate: { opacity: 1 },
        exit: { opacity: 0.95 },
        transition: { duration: 0.05 }
      }
    : capabilities.tier === 'medium'
    ? {
        // Simplified animations for medium-tier devices
        initial: { opacity: 0.8 },
        animate: { opacity: 1 },
        exit: { opacity: 0.8 },
        transition: { duration: 0.15 }
      }
    : {
        // Full animations only for high-end devices
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { 
          duration: 0.2,
          ease: "easeInOut",
        }
      };

  return (
    <motion.div
      {...transitionProps}
      className="w-full"
      layoutId="page-transition"
      onAnimationComplete={() => touch()}
    >
      {children}
    </motion.div>
  );
};
