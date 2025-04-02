
import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { getDevicePerformanceProfile } from "@/utils/performanceUtils";

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition = ({ children }: PageTransitionProps) => {
  // Use useReducedMotion hook to respect user's system preferences
  const prefersReducedMotion = useReducedMotion();
  
  // Detect device capabilities, but only on mount to avoid re-renders
  const [capabilities] = useState(getDevicePerformanceProfile());
  
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
    >
      {children}
    </motion.div>
  );
};
