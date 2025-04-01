
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
}

const LoadingSpinner = ({ size = "md", className, text }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };
  
  const [dots, setDots] = useState("");
  
  useEffect(() => {
    if (!text) return;
    
    // Use a variable to track if component is mounted
    let isMounted = true;
    let dotsCount = 0;
    
    const interval = setInterval(() => {
      if (isMounted) {
        dotsCount = (dotsCount + 1) % 4;
        setDots(".".repeat(dotsCount));
      }
    }, 500);
    
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [text]);

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <Loader2 className={cn("animate-spin text-nimocare-600", sizeClasses[size])} />
      {text && (
        <p className="mt-2 text-sm text-gray-600">
          {text}
          <span className="inline-block min-w-6">{dots}</span>
        </p>
      )}
    </div>
  );
};

export { LoadingSpinner };
