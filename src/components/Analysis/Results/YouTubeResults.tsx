
import React, { useState } from 'react';
import ToxicityPieChart from '../Charts/ToxicityPieChart';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { Eye, EyeOff, FilterX, BarChart4, MessageSquare, ExternalLink } from 'lucide-react';

interface YouTubeResultsProps {
  results: any;
  url: string;
}

const YouTubeResults: React.FC<YouTubeResultsProps> = ({ results, url }) => {
  const [showToxic, setShowToxic] = useState<boolean>(true);
  const [showNonToxic, setShowNonToxic] = useState<boolean>(true);
  
  const filteredComments = results.comments.filter((comment: any) => {
    if (comment.isToxic && showToxic) return true;
    if (!comment.isToxic && showNonToxic) return true;
    return false;
  });
  
  const toxicityData = [
    { name: 'Toxic', value: results.stats.toxicComments, color: '#ef4444' },
    { name: 'Non-Toxic', value: results.stats.nonToxicComments, color: '#10b981' }
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
  
  return (
    <div className="container max-w-5xl">
      <Card variant="default" padding="lg" className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">{results.title}</h1>
            <div className="flex items-center text-sm text-muted-foreground">
              <span className="mr-2">{results.channel}</span>
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card variant="glass" className="p-6">
            <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
              <BarChart4 className="text-primary" size={20} />
              Toxicity Distribution
            </h2>
            <div className="h-64">
              <ToxicityPieChart data={toxicityData} />
            </div>
          </Card>
          
          <div className="flex flex-col">
            <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
              <BarChart4 className="text-primary" size={20} />
              Toxicity Metrics
            </h2>
            
            <div className="grid grid-cols-1 gap-4 flex-1">
              <Card variant="glass" className="p-4">
                <div className="text-sm text-muted-foreground mb-1">Average Toxicity Score</div>
                <div className="text-2xl font-bold">
                  {(results.stats.averageToxicity * 100).toFixed(1)}%
                </div>
                <div className="w-full bg-muted rounded-full h-2.5 mt-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-red-500 h-2.5 rounded-full" 
                    style={{ width: `${results.stats.averageToxicity * 100}%` }}
                  ></div>
                </div>
              </Card>
              
              <Card variant="glass" className="p-4">
                <div className="text-sm text-muted-foreground mb-1">Toxicity Percentage</div>
                <div className="text-2xl font-bold">
                  {((results.stats.toxicComments / results.stats.totalComments) * 100).toFixed(1)}%
                </div>
                <div className="w-full bg-muted rounded-full h-2.5 mt-2">
                  <div 
                    className="bg-red-500 h-2.5 rounded-full" 
                    style={{ width: `${(results.stats.toxicComments / results.stats.totalComments) * 100}%` }}
                  ></div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Card>
      
      <Card variant="default" padding="lg">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <MessageSquare className="text-primary" size={20} />
          Comments Analysis
        </h2>
        
        <div className="space-y-4">
          {filteredComments.length > 0 ? (
            filteredComments.map((comment: any) => (
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

export default YouTubeResults;
