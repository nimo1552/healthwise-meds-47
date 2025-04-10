
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
  
  // Simplified transition for better performance - practically no animation
  const transitionProps = {
    initial: { opacity: 0.99 },
    animate: { opacity: 1 },
    exit: { opacity: 0.99 },
    transition: { duration: 0.05 }
  };

  return (
    <div className="w-full">
      {children}
    </div>
  );
};
