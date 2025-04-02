
import React from "react";
import { motion } from "framer-motion";
import { detectDeviceCapabilities } from "@/utils/performanceUtils";

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition = ({ children }: PageTransitionProps) => {
  // Detect device capabilities
  const [capabilities] = React.useState(detectDeviceCapabilities());
  
  // Simplify animations for low-end devices
  const transitionProps = capabilities.tier === 'low' 
    ? {
        // Simplified animations for low-end devices
        initial: { opacity: 0.9 },
        animate: { opacity: 1 },
        exit: { opacity: 0.9 },
        transition: { duration: 0.1 }
      }
    : {
        // Full animations for mid to high-end devices
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
    >
      {children}
    </motion.div>
  );
};
