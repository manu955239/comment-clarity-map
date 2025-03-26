
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlatformSelector from './PlatformSelector';
import UrlInput from './UrlInput';
import Card from '@/components/common/Card';
import { analyzeYouTubeVideo, analyzeInstagramReel } from '@/utils/mockData';
import { toast } from 'sonner';

const Dashboard: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<'youtube' | 'instagram'>('youtube');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handlePlatformChange = (platform: 'youtube' | 'instagram') => {
    setSelectedPlatform(platform);
  };
  
  const handleSubmit = async (url: string) => {
    setIsLoading(true);
    
    try {
      // Display a persistent toast during analysis
      toast.loading(`Analyzing ${selectedPlatform} content...`);
      
      // Based on the selected platform, call the appropriate analysis function
      if (selectedPlatform === 'youtube') {
        const results = await analyzeYouTubeVideo(url);
        // Store results in session storage for the results page
        sessionStorage.setItem('analysisResults', JSON.stringify({
          platform: 'youtube',
          url,
          results
        }));
      } else {
        const results = await analyzeInstagramReel(url);
        // Store results in session storage for the results page
        sessionStorage.setItem('analysisResults', JSON.stringify({
          platform: 'instagram',
          url,
          results
        }));
      }
      
      toast.dismiss();
      toast.success('Analysis complete!');
      
      // Navigate to results page
      navigate('/results');
    } catch (error) {
      console.error('Analysis error:', error);
      toast.dismiss();
      toast.error('An error occurred during analysis');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container max-w-4xl py-8">
      <Card variant="glass" className="mb-8" animate="fade-in">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Content Analysis Dashboard</h1>
          <p className="text-muted-foreground">
            Detect and analyze toxic content across YouTube and Instagram
          </p>
        </div>
      </Card>
      
      <Card variant="default" padding="lg" animate="fade-in" delay={200}>
        <PlatformSelector
          selectedPlatform={selectedPlatform}
          onChange={handlePlatformChange}
        />
        
        <UrlInput
          platform={selectedPlatform}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </Card>
    </div>
  );
};

export default Dashboard;
