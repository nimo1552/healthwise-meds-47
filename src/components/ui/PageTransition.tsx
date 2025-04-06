
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { getDevicePerformanceProfile } from "@/utils/performanceUtils";
import { useGarbageCollection } from "@/hooks/use-garbage-collection";

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition = ({ children }: PageTransitionProps) => {
  // Use useReducedMotion hook to respect user's system preferences
  const prefersReducedMotion = useReducedMotion();
  
  // Generate a unique identifier for this component instance
  const transitionId = React.useId();
  
  // Register with garbage collection to clean up any resources
  const { touch } = useGarbageCollection(
    `page-transition-${transitionId}`,
    undefined,
    { touchOnRender: true }
  );
  
  // If user prefers reduced motion, use minimal animations
  const shouldReduceMotion = prefersReducedMotion;
  
  // Create lighter transition properties
  const transitionProps = shouldReduceMotion 
    ? {
        // Almost no animation for reduced motion preference
        initial: { opacity: 0.98 },
        animate: { opacity: 1 },
        exit: { opacity: 0.98 },
        transition: { duration: 0.05 }
      }
    : {
        // Light animations for everyone else
        initial: { opacity: 0.95 },
        animate: { opacity: 1 },
        exit: { opacity: 0.95 },
        transition: { 
          duration: 0.15,
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
