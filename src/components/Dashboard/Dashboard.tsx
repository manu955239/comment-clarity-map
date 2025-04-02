
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import PlatformSelector from './PlatformSelector';
import UrlInput from './UrlInput';
import Card from '@/components/common/Card';

const Dashboard: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<'youtube' | 'instagram'>('youtube');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const handlePlatformChange = (platform: 'youtube' | 'instagram') => {
    setSelectedPlatform(platform);
  };
  
  const handleSubmit = async (url: string) => {
    if (!user) {
      toast.error('You must be logged in to analyze content');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Display a persistent toast during analysis
      toast.loading(`Analyzing ${selectedPlatform} content...`);
      
      // Step 1: Create a record in the content_analysis table
      const { data: analysisRecord, error: insertError } = await supabase
        .from('content_analysis')
        .insert({
          user_id: user.id,
          platform: selectedPlatform,
          content_url: url,
          status: 'processing'
        })
        .select()
        .single();
      
      if (insertError) {
        throw new Error(`Failed to create analysis record: ${insertError.message}`);
      }
      
      // Step 2: Call the appropriate edge function based on platform
      let analysisResults;
      
      if (selectedPlatform === 'youtube') {
        const { data, error } = await supabase.functions.invoke('analyze-youtube', {
          body: { videoUrl: url }
        });
        
        if (error) throw new Error(`YouTube analysis failed: ${error.message}`);
        analysisResults = data;
      } else {
        const { data, error } = await supabase.functions.invoke('analyze-instagram', {
          body: { reelUrl: url }
        });
        
        if (error) throw new Error(`Instagram analysis failed: ${error.message}`);
        analysisResults = data;
      }
      
      // Step 3: Save the results to the analysis_results table
      const { error: resultsError } = await supabase
        .from('analysis_results')
        .insert({
          analysis_id: analysisRecord.id,
          platform: selectedPlatform,
          title: analysisResults.title || null,
          creator: selectedPlatform === 'youtube' ? analysisResults.channel : analysisResults.creator,
          stats: analysisResults.stats,
          comments: analysisResults.comments,
          audio_transcript: analysisResults.audioTranscript || null,
          audio_toxicity: analysisResults.audioToxicity || null,
          is_audio_toxic: analysisResults.isAudioToxic || null
        });
      
      if (resultsError) {
        throw new Error(`Failed to save analysis results: ${resultsError.message}`);
      }
      
      // Step 4: Update the analysis record status to completed
      const { error: updateError } = await supabase
        .from('content_analysis')
        .update({ status: 'completed' })
        .eq('id', analysisRecord.id);
      
      if (updateError) {
        console.error(`Failed to update analysis status: ${updateError.message}`);
      }
      
      toast.dismiss();
      toast.success('Analysis complete!');
      
      // Store the analysis ID in the session for the results page
      sessionStorage.setItem('analysisId', analysisRecord.id);
      
      // Navigate to results page
      navigate('/results');
    } catch (error) {
      console.error('Analysis error:', error);
      toast.dismiss();
      toast.error(error.message || 'An error occurred during analysis');
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
