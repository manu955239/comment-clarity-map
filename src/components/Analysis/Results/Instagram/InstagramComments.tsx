
import React from 'react';
import Card from '@/components/common/Card';
import { MessageSquare, ArrowDownAZ, ArrowUpAZ } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Button from '@/components/common/Button';
import CommentCard from './CommentCard';

interface InstagramCommentsProps {
  comments: any[];
  sortOption: 'newest' | 'oldest' | 'toxicityHighToLow' | 'toxicityLowToHigh';
  setSortOption: (option: 'newest' | 'oldest' | 'toxicityHighToLow' | 'toxicityLowToHigh') => void;
  showToxic: boolean;
  showNonToxic: boolean;
}

const InstagramComments: React.FC<InstagramCommentsProps> = ({
  comments,
  sortOption,
  setSortOption,
  showToxic,
  showNonToxic
}) => {
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
        {comments.length > 0 ? (
          comments.map((comment: any, index: number) => (
            <CommentCard key={comment.id || index} comment={comment} />
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No comments match the current filters.
          </div>
        )}
      </div>
    </Card>
  );
};

export default InstagramComments;
