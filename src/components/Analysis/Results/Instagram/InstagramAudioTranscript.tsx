
import React from 'react';
import Card from '@/components/common/Card';
import { Mic } from 'lucide-react';

interface InstagramAudioTranscriptProps {
  transcript: string;
  toxicity: number;
  isToxic: boolean;
}

const InstagramAudioTranscript: React.FC<InstagramAudioTranscriptProps> = ({
  transcript,
  toxicity,
  isToxic
}) => {
  return (
    <Card variant="glass" className="p-6 mb-8">
      <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
        <Mic className="text-primary" size={20} />
        Audio Transcript
      </h2>
      <div className="p-4 bg-muted/50 rounded-md">
        <p className="text-sm">"{transcript}"</p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Toxicity Score:</span>
        <div className={`text-sm px-2 py-1 rounded-full ${
          isToxic 
            ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' 
            : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
        }`}>
          {(toxicity * 100).toFixed(1)}% - {isToxic ? 'Toxic' : 'Non-Toxic'}
        </div>
      </div>
    </Card>
  );
};

export default InstagramAudioTranscript;
