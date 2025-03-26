
import React, { useState } from 'react';
import Button from '@/components/common/Button';
import { Search, AlertCircle } from 'lucide-react';
import { isValidYouTubeUrl, isValidInstagramUrl } from '@/utils/validation';
import { toast } from 'sonner';

interface UrlInputProps {
  platform: 'youtube' | 'instagram';
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

const UrlInput: React.FC<UrlInputProps> = ({ platform, onSubmit, isLoading }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }
    
    // Validate URL based on platform
    if (platform === 'youtube' && !isValidYouTubeUrl(url)) {
      setError('Please enter a valid YouTube URL');
      toast.error('Invalid YouTube URL');
      return;
    }
    
    if (platform === 'instagram' && !isValidInstagramUrl(url)) {
      setError('Please enter a valid Instagram reel URL');
      toast.error('Invalid Instagram URL');
      return;
    }
    
    setError(null);
    onSubmit(url);
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-xl font-medium">
          {platform === 'youtube' 
            ? 'Enter a YouTube video URL to analyze comments' 
            : 'Enter an Instagram reel URL to analyze audio and comments'}
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          We'll analyze the content for toxicity and provide detailed results
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (error) setError(null);
            }}
            placeholder={
              platform === 'youtube'
                ? 'https://www.youtube.com/watch?v=...'
                : 'https://www.instagram.com/reel/...'
            }
            className={`w-full px-4 py-3 pr-12 border ${
              error ? 'border-red-500' : 'border-input'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary shadow-sm bg-background`}
            disabled={isLoading}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            {platform === 'youtube' ? (
              <Youtube size={20} />
            ) : (
              <Instagram size={20} />
            )}
          </div>
        </div>
        
        {error && (
          <div className="flex items-center mt-2 text-red-500 text-sm">
            <AlertCircle size={16} className="mr-1" />
            {error}
          </div>
        )}
        
        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
          className="mt-4"
          icon={!isLoading ? <Search size={18} /> : undefined}
        >
          {isLoading ? 'Analyzing...' : 'Analyze Content'}
        </Button>
        
        <div className="mt-4 text-center text-xs text-muted-foreground">
          <p>
            Try sample URL: {' '}
            <button
              type="button"
              onClick={() => {
                setUrl(
                  platform === 'youtube'
                    ? 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                    : 'https://www.instagram.com/reel/CzjGJvJtGJy/'
                );
                setError(null);
              }}
              className="text-primary hover:underline focus:outline-none"
            >
              {platform === 'youtube' 
                ? 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                : 'https://www.instagram.com/reel/CzjGJvJtGJy/'}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

// Icon components
const Youtube = ({ size }: { size: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

const Instagram = ({ size }: { size: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default UrlInput;
