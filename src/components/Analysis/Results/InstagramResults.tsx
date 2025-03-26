
import React, { useState } from 'react';
import Card from '@/components/common/Card';
import ToxicityPieChart from '@/components/Analysis/Charts/ToxicityPieChart';
import ComparisonChart from '@/components/Analysis/Charts/ComparisonChart';
import { formatTimestamp, getToxicityColor, getToxicityLabel } from '@/utils/validation';
import { Filter, SortAsc, SortDesc, MessageSquare, Music } from 'lucide-react';
import Button from '@/components/common/Button';

interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
  toxicity: number;
  isToxic: boolean;
}

interface InstagramResults {
  reelId: string;
  creator: string;
  audioTranscript: string;
  audioToxicity: number;
  isAudioToxic: boolean;
  comments: Comment[];
  stats: {
    totalComments: number;
    toxicComments: number;
    nonToxicComments: number;
    averageToxicity: number;
    audioVsCommentsDistance: number;
  };
}

interface InstagramResultsProps {
  results: InstagramResults;
  url: string;
}

const InstagramResults: React.FC<InstagramResultsProps> = ({ results, url }) => {
  const [filter, setFilter] = useState<'all' | 'toxic' | 'non-toxic'>('all');
  const [sortBy, setSortBy] = useState<'timestamp' | 'toxicity'>('timestamp');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [view, setView] = useState<'comments' | 'audio'>('comments');
  
  // Filter and sort comments
  const filteredComments = results.comments.filter(comment => {
    if (filter === 'all') return true;
    if (filter === 'toxic') return comment.isToxic;
    return !comment.isToxic;
  });
  
  const sortedComments = [...filteredComments].sort((a, b) => {
    if (sortBy === 'timestamp') {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    } else {
      return sortOrder === 'asc' ? a.toxicity - b.toxicity : b.toxicity - a.toxicity;
    }
  });
  
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  
  const handleSortByChange = (value: 'timestamp' | 'toxicity') => {
    if (sortBy === value) {
      toggleSortOrder();
    } else {
      setSortBy(value);
      setSortOrder('desc');
    }
  };
  
  return (
    <div className="container max-w-4xl">
      <Card variant="glass" className="mb-8 pb-6 overflow-visible" animate="fade-in">
        <div className="mb-4 border-b border-border pb-4">
          <h2 className="text-2xl font-bold">Instagram Reel Analysis</h2>
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline text-sm"
          >
            {url}
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card variant="outline" className="flex flex-col p-4 animate-fade-in space-y-2" delay={100}>
            <div className="text-sm text-muted-foreground">Audio Toxicity</div>
            <div className="flex items-center gap-2">
              <div className="text-4xl font-bold">{(results.audioToxicity * 100).toFixed(1)}%</div>
              <div className={`px-2 py-0.5 rounded-full text-xs ${getToxicityColor(results.audioToxicity)}`}>
                {getToxicityLabel(results.audioToxicity)}
              </div>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-nontoxic to-toxic"
                style={{ width: `${results.audioToxicity * 100}%` }}
              ></div>
            </div>
          </Card>
          
          <Card variant="outline" className="flex flex-col p-4 animate-fade-in space-y-2" delay={200}>
            <div className="text-sm text-muted-foreground">Comments Toxicity</div>
            <div className="flex items-center gap-2">
              <div className="text-4xl font-bold">{(results.stats.averageToxicity * 100).toFixed(1)}%</div>
              <div className={`px-2 py-0.5 rounded-full text-xs ${getToxicityColor(results.stats.averageToxicity)}`}>
                {getToxicityLabel(results.stats.averageToxicity)}
              </div>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-nontoxic to-toxic"
                style={{ width: `${results.stats.averageToxicity * 100}%` }}
              ></div>
            </div>
          </Card>
        </div>
        
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-medium mb-4">Comparison Analysis</h3>
          <ComparisonChart 
            audioToxicity={results.audioToxicity} 
            commentsToxicity={results.stats.averageToxicity} 
          />
          
          <div className="w-full max-w-md bg-secondary/50 rounded-lg p-4 mt-6 animate-fade-in" delay={500}>
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Content Consistency</div>
              <div className="text-lg font-bold">
                {results.stats.audioVsCommentsDistance < 0.2 ? 'High' : 
                 results.stats.audioVsCommentsDistance < 0.5 ? 'Medium' : 'Low'}
              </div>
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              {results.stats.audioVsCommentsDistance < 0.2 
                ? 'The audio and comments have similar toxicity levels.' 
                : 'There is a significant difference between audio and comments toxicity.'}
            </div>
          </div>
        </div>
      </Card>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button
            variant={view === 'comments' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('comments')}
            icon={<MessageSquare size={16} />}
          >
            Comments
          </Button>
          <Button
            variant={view === 'audio' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('audio')}
            icon={<Music size={16} />}
          >
            Audio Transcript
          </Button>
        </div>
      </div>
      
      {view === 'comments' ? (
        <Card variant="default" animate="fade-in" delay={300}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-border pb-4 mb-4">
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-medium">Comments</h3>
              <ToxicityPieChart 
                toxicCount={results.stats.toxicComments} 
                nonToxicCount={results.stats.nonToxicComments} 
              />
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 text-sm ${
                    filter === 'all' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-background text-muted-foreground hover:bg-muted/50'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('toxic')}
                  className={`px-3 py-1 text-sm ${
                    filter === 'toxic' 
                      ? 'bg-toxic text-toxic-foreground' 
                      : 'bg-background text-muted-foreground hover:bg-muted/50'
                  }`}
                >
                  Toxic
                </button>
                <button
                  onClick={() => setFilter('non-toxic')}
                  className={`px-3 py-1 text-sm ${
                    filter === 'non-toxic' 
                      ? 'bg-nontoxic text-nontoxic-foreground' 
                      : 'bg-background text-muted-foreground hover:bg-muted/50'
                  }`}
                >
                  Non-Toxic
                </button>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                className="text-xs flex items-center gap-1"
                onClick={() => handleSortByChange('timestamp')}
              >
                <span>Date</span>
                {sortBy === 'timestamp' && (
                  sortOrder === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />
                )}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="text-xs flex items-center gap-1"
                onClick={() => handleSortByChange('toxicity')}
              >
                <span>Toxicity</span>
                {sortBy === 'toxicity' && (
                  sortOrder === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />
                )}
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            {sortedComments.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No comments found matching the current filter.
              </div>
            ) : (
              sortedComments.map((comment, index) => (
                <Card 
                  key={comment.id} 
                  variant="outline" 
                  padding="md" 
                  animate="fade-in"
                  delay={100 + index * 50}
                  className="transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-lg font-medium">{comment.author.charAt(0).toUpperCase()}</span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                        <div className="font-medium">{comment.author}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatTimestamp(comment.timestamp)}
                        </div>
                        <div className={`px-2 py-0.5 rounded-full text-xs ${getToxicityColor(comment.toxicity)}`}>
                          {getToxicityLabel(comment.toxicity)}
                        </div>
                      </div>
                      
                      <div className="mt-2">{comment.text}</div>
                    </div>
                    
                    <div className="hidden md:block">
                      <div className="w-16 h-16 relative">
                        <div className="absolute inset-0 rounded-full overflow-hidden">
                          <div 
                            className="absolute inset-0 bg-gradient-to-b from-nontoxic to-toxic"
                            style={{ transform: `translateY(${100 - comment.toxicity * 100}%)` }}
                          ></div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
                          {(comment.toxicity * 100).toFixed(0)}%
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </Card>
      ) : (
        <Card variant="default" animate="fade-in" delay={300}>
          <div className="border-b border-border pb-4 mb-4">
            <h3 className="text-xl font-medium">Audio Transcript</h3>
          </div>
          
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Music size={20} className="text-primary" />
              </div>
              
              <div>
                <div className="font-medium">Transcribed Audio</div>
                <div className="text-xs text-muted-foreground">
                  Toxicity score: {(results.audioToxicity * 100).toFixed(1)}%
                </div>
              </div>
              
              <div className={`ml-auto px-2 py-0.5 rounded-full text-xs ${getToxicityColor(results.audioToxicity)}`}>
                {getToxicityLabel(results.audioToxicity)}
              </div>
            </div>
            
            <div className="border-l-4 border-primary/30 pl-4 py-2 italic">
              {results.audioTranscript}
            </div>
            
            <div className="mt-4">
              <div className="text-sm font-medium mb-2">Toxicity Analysis</div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-nontoxic to-toxic"
                  style={{ width: `${results.audioToxicity * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                <span>Non-Toxic</span>
                <span>Toxic</span>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default InstagramResults;
