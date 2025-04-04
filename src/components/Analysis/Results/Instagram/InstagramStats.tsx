
import React from 'react';
import Card from '@/components/common/Card';
import { MessageSquare, Mic } from 'lucide-react';

interface InstagramStatsProps {
  stats: {
    totalComments: number;
    toxicComments: number;
    nonToxicComments: number;
  };
  audioToxicity: number;
  isAudioToxic: boolean;
}

const InstagramStats: React.FC<InstagramStatsProps> = ({ stats, audioToxicity, isAudioToxic }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card variant="glass" className="p-4 text-center">
        <div className="text-4xl font-bold mb-2">{stats.totalComments}</div>
        <div className="text-sm text-muted-foreground flex items-center justify-center gap-2">
          <MessageSquare size={16} />
          Total Comments
        </div>
      </Card>
      
      <Card variant="glass" className="p-4 text-center">
        <div className="text-4xl font-bold mb-2 text-red-500">{stats.toxicComments}</div>
        <div className="text-sm text-muted-foreground flex items-center justify-center gap-2">
          <MessageSquare size={16} />
          Toxic Comments
        </div>
      </Card>
      
      <Card variant="glass" className="p-4 text-center">
        <div className="text-4xl font-bold mb-2 text-green-500">{stats.nonToxicComments}</div>
        <div className="text-sm text-muted-foreground flex items-center justify-center gap-2">
          <MessageSquare size={16} />
          Non-Toxic Comments
        </div>
      </Card>
      
      <Card variant="glass" className="p-4 text-center">
        <div className={`text-4xl font-bold mb-2 ${isAudioToxic ? 'text-red-500' : 'text-green-500'}`}>
          {(audioToxicity * 100).toFixed(1)}%
        </div>
        <div className="text-sm text-muted-foreground flex items-center justify-center gap-2">
          <Mic size={16} />
          Audio Toxicity
        </div>
      </Card>
    </div>
  );
};

export default InstagramStats;
