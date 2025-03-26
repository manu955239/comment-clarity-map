
import React, { useState } from 'react';
import ToxicityPieChart from '../Charts/ToxicityPieChart';
import ComparisonChart from '../Charts/ComparisonChart';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { Eye, EyeOff, FilterX, BarChart4, MessageSquare, Mic, ExternalLink, ArrowDownAZ, ArrowUpAZ } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface InstagramResultsProps {
  results: any;
  url: string;
}

type SortOption = 'newest' | 'oldest' | 'toxicityHighToLow' | 'toxicityLowToHigh';

const InstagramResults: React.FC<InstagramResultsProps> = ({ results, url }) => {
  const [showToxic, setShowToxic] = useState<boolean>(true);
  const [showNonToxic, setShowNonToxic] = useState<boolean>(true);
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  
  // Apply filters and sorting to comments
  const filteredAndSortedComments = React.useMemo(() => {
    // First filter the comments
    const filtered = results.comments.filter((comment: any) => {
      if (comment.isToxic && showToxic) return true;
      if (!comment.isToxic && showNonToxic) return true;
      return false;
    });
    
    // Then sort the filtered comments
    return [...filtered].sort((a, b) => {
      switch (sortOption) {
        case 'newest':
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        case 'oldest':
          return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        case 'toxicityHighToLow':
          return b.toxicity - a.toxicity;
        case 'toxicityLowToHigh':
          return a.toxicity - b.toxicity;
        default:
          return 0;
      }
    });
  }, [results.comments, showToxic, showNonToxic, sortOption]);
  
  const toxicityData = [
    { name: 'Toxic', value: results.stats.toxicComments, color: '#ef4444' },
    { name: 'Non-Toxic', value: results.stats.nonToxicComments, color: '#10b981' }
  ];
  
  const comparisonData = [
    {
      name: 'Audio',
      toxicity: Math.round(results.audioToxicity * 100),
    },
    {
      name: 'Comments',
      toxicity: Math.round(results.stats.averageToxicity * 100),
    }
  ];
  
  // Helper function to format URL for display
  const formatUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname + urlObj.pathname;
    } catch (e) {
      return url;
    }
  };

  // Get the label for the current sort option
  const getSortLabel = () => {
    switch (sortOption) {
      case 'newest': return 'Newest';
      case 'oldest': return 'Oldest';
      case 'toxicityHighToLow': return 'Most Toxic';
      case 'toxicityLowToHigh': return 'Least Toxic';
      default: return 'Sort';
    }
  };
  
  return (
    <div className="container max-w-5xl">
      <Card variant="default" padding="lg" className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Instagram Reel Analysis</h1>
            <div className="flex items-center text-sm text-muted-foreground">
              <span className="mr-2">@{results.creator}</span>
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
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card variant="glass" className="p-4 text-center">
            <div className="text-4xl font-bold mb-2">{results.stats.totalComments}</div>
            <div className="text-sm text-muted-foreground flex items-center justify-center gap-2">
              <MessageSquare size={16} />
              Total Comments
            </div>
          </Card>
          
          <Card variant="glass" className="p-4 text-center">
            <div className="text-4xl font-bold mb-2 text-red-500">{results.stats.toxicComments}</div>
            <div className="text-sm text-muted-foreground flex items-center justify-center gap-2">
              <MessageSquare size={16} />
              Toxic Comments
            </div>
          </Card>
          
          <Card variant="glass" className="p-4 text-center">
            <div className="text-4xl font-bold mb-2 text-green-500">{results.stats.nonToxicComments}</div>
            <div className="text-sm text-muted-foreground flex items-center justify-center gap-2">
              <MessageSquare size={16} />
              Non-Toxic Comments
            </div>
          </Card>
          
          <Card variant="glass" className="p-4 text-center">
            <div className={`text-4xl font-bold mb-2 ${results.isAudioToxic ? 'text-red-500' : 'text-green-500'}`}>
              {(results.audioToxicity * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-muted-foreground flex items-center justify-center gap-2">
              <Mic size={16} />
              Audio Toxicity
            </div>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card variant="glass" className="p-6">
            <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
              <BarChart4 className="text-primary" size={20} />
              Comment Toxicity Distribution
            </h2>
            <div className="h-64">
              <ToxicityPieChart data={toxicityData} />
            </div>
          </Card>
          
          <Card variant="glass" className="p-6">
            <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
              <BarChart4 className="text-primary" size={20} />
              Audio vs Comments Toxicity
            </h2>
            <div className="h-64">
              <ComparisonChart data={comparisonData} />
            </div>
          </Card>
        </div>
        
        <Card variant="glass" className="p-6 mb-8">
          <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
            <Mic className="text-primary" size={20} />
            Audio Transcript
          </h2>
          <div className="p-4 bg-muted/50 rounded-md">
            <p className="text-sm">"{results.audioTranscript}"</p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Toxicity Score:</span>
            <div className={`text-sm px-2 py-1 rounded-full ${
              results.isAudioToxic 
                ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' 
                : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
            }`}>
              {(results.audioToxicity * 100).toFixed(1)}% - {results.isAudioToxic ? 'Toxic' : 'Non-Toxic'}
            </div>
          </div>
        </Card>
      </Card>
      
      <Card variant="default" padding="lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <MessageSquare className="text-primary" size={20} />
            Comments Analysis
          </h2>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-2"
              >
                {sortOption.includes('toxicity') ? 
                  (sortOption === 'toxicityHighToLow' ? <ArrowDownAZ size={16} /> : <ArrowUpAZ size={16} />) : 
                  (sortOption === 'newest' ? <ArrowDownAZ size={16} /> : <ArrowUpAZ size={16} />)
                }
                {getSortLabel()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background border border-border">
              <DropdownMenuItem onClick={() => setSortOption('newest')}>
                Newest First
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption('oldest')}>
                Oldest First
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption('toxicityHighToLow')}>
                Most Toxic First
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption('toxicityLowToHigh')}>
                Least Toxic First
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="space-y-4">
          {filteredAndSortedComments.length > 0 ? (
            filteredAndSortedComments.map((comment: any) => (
              <Card 
                key={comment.id} 
                variant="glass" 
                className={`p-4 border-l-4 ${comment.isToxic ? 'border-l-red-500' : 'border-l-green-500'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="font-medium">{comment.author}</div>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    comment.isToxic 
                      ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' 
                      : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                  }`}>
                    {comment.isToxic ? 'Toxic' : 'Non-Toxic'}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{comment.text}</p>
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>{new Date(comment.timestamp).toLocaleString()}</span>
                  <span>Toxicity: {(comment.toxicity * 100).toFixed(1)}%</span>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No comments match the current filters.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default InstagramResults;
