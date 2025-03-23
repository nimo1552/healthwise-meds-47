
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const Logo = ({ size = 'md', showText = true, className }: LogoProps) => {
  const sizes = {
    sm: 'h-6',
    md: 'h-10',
    lg: 'h-16'
  };
  
  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <div className={cn("relative flex items-center", className)}>
      <img 
        src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3" 
        alt="Nimocare Logo" 
        className={cn("object-contain mr-2", sizes[size])}
      />
      {showText && (
        <>
          <span className={cn("font-display font-bold text-nimocare-600", textSizes[size])}>
            Nimocare
          </span>
          <span className={cn(
            "absolute text-xs bg-nimocare-100 text-nimocare-600 px-1 rounded",
            size === 'sm' ? '-top-1 -right-2' : 
            size === 'md' ? '-top-1 right-0' : 
            '-top-2 right-0'
          )}>Rx</span>
        </>
      )}
    </div>
  );
};

export default Logo;
