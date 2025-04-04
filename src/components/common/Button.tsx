
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'toxic' | 'nontoxic';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  to?: string; // For React Router links
  href?: string; // For regular anchor links
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'md', 
    children, 
    isLoading = false, 
    fullWidth = false,
    icon,
    to,
    href,
    ...props 
  }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    
    // Size classes
    const sizeClasses = {
      sm: 'text-xs h-8 px-3',
      md: 'text-sm h-10 px-4',
      lg: 'text-base h-12 px-6'
    }[size];
    
    // Variant classes
    const variantClasses = {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline',
      toxic: 'bg-toxic text-toxic-foreground hover:bg-toxic/90',
      nontoxic: 'bg-nontoxic text-nontoxic-foreground hover:bg-nontoxic/90'
    }[variant];
    
    const widthClass = fullWidth ? 'w-full' : '';
    
    const classes = cn(
      baseClasses,
      sizeClasses,
      variantClasses,
      widthClass,
      'relative overflow-hidden group',
      className
    );

    // If we have a "to" prop, render a Link from react-router
    if (to) {
      return (
        <Link 
          to={to} 
          className={classes}
          onClick={(e) => {
            if (props.onClick) {
              const handler = props.onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>;
              handler(e as React.MouseEvent<HTMLAnchorElement>);
            }
          }}
        >
          {/* Background animation effect on hover */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none opacity-0 group-hover:opacity-100" />
          
          <span className="flex items-center justify-center gap-2">
            {icon && <span className="inline-flex">{icon}</span>}
            {children}
          </span>
        </Link>
      );
    }
    
    // If we have an "href" prop, render a regular anchor tag
    if (href) {
      return (
        <a 
          href={href} 
          className={classes}
          onClick={(e) => {
            if (props.onClick) {
              const handler = props.onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>;
              handler(e as React.MouseEvent<HTMLAnchorElement>);
            }
          }}
        >
          {/* Background animation effect on hover */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none opacity-0 group-hover:opacity-100" />
          
          <span className="flex items-center justify-center gap-2">
            {icon && <span className="inline-flex">{icon}</span>}
            {children}
          </span>
        </a>
      );
    }
    
    // Otherwise, render a button
    return (
      <button
        className={classes}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {/* Background animation effect on hover */}
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none opacity-0 group-hover:opacity-100" />
        
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center bg-inherit">
            <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
        )}
        
        <span className={`flex items-center justify-center gap-2 ${isLoading ? 'invisible' : 'visible'}`}>
          {icon && <span className="inline-flex">{icon}</span>}
          {children}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
