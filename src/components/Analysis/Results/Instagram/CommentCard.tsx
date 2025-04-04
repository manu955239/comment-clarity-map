
import React from 'react';
import Card from '@/components/common/Card';

interface CommentCardProps {
  comment: {
    id?: string;
    author?: string;
    username?: string;
    text: string;
    timestamp: string;
    toxicity: number;
    isToxic: boolean;
  };
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  return (
    <Card 
      variant="glass" 
      className={`p-4 border-l-4 ${comment.isToxic ? 'border-l-red-500' : 'border-l-green-500'}`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="font-medium">{comment.author || comment.username}</div>
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
  );
};

export default CommentCard;
