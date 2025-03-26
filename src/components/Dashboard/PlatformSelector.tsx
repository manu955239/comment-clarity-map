
import React from 'react';
import { Youtube, Instagram } from 'lucide-react';

interface PlatformSelectorProps {
  selectedPlatform: 'youtube' | 'instagram';
  onChange: (platform: 'youtube' | 'instagram') => void;
}

const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  selectedPlatform,
  onChange
}) => {
  return (
    <div className="flex flex-col items-center mb-8 animate-fade-in">
      <h2 className="text-xl font-medium mb-6">Select a platform to analyze</h2>
      
      <div className="flex items-center gap-4 md:gap-8">
        <button
          onClick={() => onChange('youtube')}
          className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 ${
            selectedPlatform === 'youtube'
              ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10 scale-105'
              : 'border-border hover:border-primary/50 hover:bg-primary/5'
          }`}
        >
          <Youtube 
            size={40} 
            className={`mb-2 ${
              selectedPlatform === 'youtube' 
                ? 'text-red-600' 
                : 'text-muted-foreground'
            }`} 
          />
          <span className={`font-medium ${
            selectedPlatform === 'youtube' 
              ? 'text-foreground' 
              : 'text-muted-foreground'
          }`}>
            YouTube
          </span>
          <span className="text-xs text-muted-foreground mt-1">Analyze video comments</span>
        </button>
        
        <button
          onClick={() => onChange('instagram')}
          className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 ${
            selectedPlatform === 'instagram'
              ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10 scale-105'
              : 'border-border hover:border-primary/50 hover:bg-primary/5'
          }`}
        >
          <Instagram 
            size={40} 
            className={`mb-2 ${
              selectedPlatform === 'instagram' 
                ? 'text-pink-600' 
                : 'text-muted-foreground'
            }`} 
          />
          <span className={`font-medium ${
            selectedPlatform === 'instagram' 
              ? 'text-foreground' 
              : 'text-muted-foreground'
          }`}>
            Instagram
          </span>
          <span className="text-xs text-muted-foreground mt-1">Analyze reel audio & comments</span>
        </button>
      </div>
    </div>
  );
};

export default PlatformSelector;
