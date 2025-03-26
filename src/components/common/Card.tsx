
import React from 'react';
import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'outline';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  animate?: 'none' | 'fade-in' | 'scale-in';
  delay?: number; // Animation delay in ms
}

const Card: React.FC<CardProps> = ({ 
  className, 
  children, 
  variant = 'default',
  padding = 'md',
  animate = 'none',
  delay = 0
}) => {
  // Base card classes
  const baseClasses = 'rounded-xl overflow-hidden transition-all duration-300';
  
  // Variant classes
  const variantClasses = {
    default: 'bg-card text-card-foreground shadow-md',
    glass: 'glass-card backdrop-blur-md bg-white/70 shadow-lg',
    outline: 'border border-border bg-background'
  }[variant];
  
  // Padding classes
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-7'
  }[padding];
  
  // Animation classes
  const animationClasses = animate !== 'none' 
    ? `animate-${animate}` + (delay > 0 ? ` animation-delay-${delay}` : '')
    : '';
  
  // Merge all classes
  const cardClasses = cn(
    baseClasses,
    variantClasses,
    paddingClasses,
    animationClasses,
    className
  );
  
  return (
    <div 
      className={cardClasses}
      style={delay > 0 ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
};

export default Card;
