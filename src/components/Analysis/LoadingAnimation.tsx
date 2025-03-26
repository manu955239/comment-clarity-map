
import React from 'react';

const LoadingAnimation: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        {/* Main spinning circle */}
        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin-slow"></div>
        
        {/* Secondary pulsing elements */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-toxic animate-pulse-soft"></div>
        </div>
        
        <div className="absolute top-1/4 right-0 w-2 h-2 rounded-full bg-nontoxic animate-pulse-soft animation-delay-500"></div>
        <div className="absolute bottom-0 left-1/4 w-2 h-2 rounded-full bg-amber-500 animate-pulse-soft animation-delay-300"></div>
      </div>
      
      <div className="mt-6 text-center">
        <h3 className="text-xl font-medium animate-pulse">Analyzing content</h3>
        <p className="text-muted-foreground mt-2">Processing data for toxicity classification</p>
      </div>
    </div>
  );
};

export default LoadingAnimation;
