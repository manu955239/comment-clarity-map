
import React from 'react';
import Button from '@/components/common/Button';
import { Eye, EyeOff, FilterX, ExternalLink } from 'lucide-react';

interface InstagramHeaderProps {
  creator: string;
  url: string;
  formatUrl: (url: string) => string;
  showToxic: boolean;
  showNonToxic: boolean;
  setShowToxic: (show: boolean) => void;
  setShowNonToxic: (show: boolean) => void;
}

const InstagramHeader: React.FC<InstagramHeaderProps> = ({
  creator,
  url,
  formatUrl,
  showToxic,
  showNonToxic,
  setShowToxic,
  setShowNonToxic
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Instagram Reel Analysis</h1>
        <div className="flex items-center text-sm text-muted-foreground">
          <span className="mr-2">@{creator}</span>
          <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">
            {formatUrl(url)} 
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          size="sm" 
          variant={showToxic ? "toxic" : "outline"}
          onClick={() => setShowToxic(!showToxic)}
          icon={showToxic ? <Eye size={16} /> : <EyeOff size={16} />}
        >
          Toxic
        </Button>
        <Button 
          size="sm" 
          variant={showNonToxic ? "nontoxic" : "outline"}
          onClick={() => setShowNonToxic(!showNonToxic)}
          icon={showNonToxic ? <Eye size={16} /> : <EyeOff size={16} />}
        >
          Non-Toxic
        </Button>
        <Button 
          size="sm" 
          variant="outline"
          onClick={() => {
            setShowToxic(true);
            setShowNonToxic(true);
          }}
          icon={<FilterX size={16} />}
          className={showToxic && showNonToxic ? 'hidden' : ''}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default InstagramHeader;
