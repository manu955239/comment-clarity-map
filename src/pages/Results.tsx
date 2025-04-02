
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import Button from '@/components/common/Button';
import { ArrowLeft } from 'lucide-react';
import YouTubeResults from '@/components/Analysis/Results/YouTubeResults';
import InstagramResults from '@/components/Analysis/Results/InstagramResults';
import LoadingAnimation from '@/components/Analysis/LoadingAnimation';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Results = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<any>(null);
  const [platform, setPlatform] = useState<'youtube' | 'instagram' | null>(null);
  const [url, setUrl] = useState<string>('');
  
  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      navigate('/');
      return;
    }
    
    const fetchAnalysisResults = async () => {
      try {
        // Get the analysis ID from session storage
        const analysisId = sessionStorage.getItem('analysisId');
        
        if (!analysisId) {
          navigate('/dashboard');
          return;
        }
        
        // Get the analysis record
        const { data: analysisRecord, error: analysisError } = await supabase
          .from('content_analysis')
          .select('*')
          .eq('id', analysisId)
          .single();
        
        if (analysisError || !analysisRecord) {
          throw new Error('Analysis record not found');
        }
        
        // Make sure the analysis belongs to the current user
        if (analysisRecord.user_id !== user?.id) {
          throw new Error('You do not have permission to view this analysis');
        }
        
        // Get the analysis results
        const { data: resultsData, error: resultsError } = await supabase
          .from('analysis_results')
          .select('*')
          .eq('analysis_id', analysisId)
          .single();
        
        if (resultsError || !resultsData) {
          throw new Error('Analysis results not found');
        }
        
        // Update the state with the results
        setPlatform(resultsData.platform);
        setUrl(analysisRecord.content_url);
        setResults(resultsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching analysis results:', error);
        toast.error('Failed to load analysis results');
        navigate('/dashboard');
      }
    };
    
    fetchAnalysisResults();
  }, [isAuthenticated, navigate, user]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        
        <main className="flex-1 flex items-center justify-center">
          <LoadingAnimation />
        </main>
        
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/dashboard')}
            icon={<ArrowLeft size={16} />}
          >
            Back to Dashboard
          </Button>
        </div>
        
        {platform === 'youtube' && results ? (
          <YouTubeResults results={results} url={url} />
        ) : platform === 'instagram' && results ? (
          <InstagramResults results={results} url={url} />
        ) : (
          <div className="container text-center py-12">
            <h2 className="text-2xl font-bold mb-4">No results found</h2>
            <p className="text-muted-foreground mb-6">
              Please return to the dashboard and analyze a URL.
            </p>
            <Button
              to="/dashboard"
              variant="default"
            >
              Go to Dashboard
            </Button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Results;
