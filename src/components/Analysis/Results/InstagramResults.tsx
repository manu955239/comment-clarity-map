
import React, { useState } from 'react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { FilterX } from 'lucide-react';
import InstagramHeader from './Instagram/InstagramHeader';
import InstagramStats from './Instagram/InstagramStats';
import InstagramCharts from './Instagram/InstagramCharts';
import InstagramAudioTranscript from './Instagram/InstagramAudioTranscript';
import InstagramComments from './Instagram/InstagramComments';

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
      toxicity: Math.round(results.audio_toxicity * 100),
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
  
  return (
    <div className="container max-w-5xl">
      <Card variant="default" padding="lg" className="mb-8">
        <InstagramHeader 
          creator={results.creator}
          url={url}
          formatUrl={formatUrl}
          showToxic={showToxic}
          showNonToxic={showNonToxic}
          setShowToxic={setShowToxic}
          setShowNonToxic={setShowNonToxic}
        />
        
        <InstagramStats 
          stats={results.stats}
          audioToxicity={results.audio_toxicity}
          isAudioToxic={results.is_audio_toxic}
        />
        
        <InstagramCharts 
          toxicityData={toxicityData}
          comparisonData={comparisonData}
        />
        
        <InstagramAudioTranscript 
          transcript={results.audio_transcript}
          toxicity={results.audio_toxicity}
          isToxic={results.is_audio_toxic}
        />
      </Card>
      
      <InstagramComments 
        comments={filteredAndSortedComments}
        sortOption={sortOption}
        setSortOption={setSortOption}
        showToxic={showToxic}
        showNonToxic={showNonToxic}
      />
    </div>
  );
};

export default InstagramResults;
