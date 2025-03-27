
import React from "react";
import { motion } from "framer-motion";

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ 
        duration: 0.3, 
        ease: [0.22, 1, 0.36, 1], // Custom easing for a more polished feel
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

export { PageTransition };
