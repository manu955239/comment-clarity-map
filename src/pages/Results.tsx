
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

const Results = () => {
  const { isAuthenticated } = useAuth();
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
    
    const storedResults = sessionStorage.getItem('analysisResults');
    
    if (!storedResults) {
      navigate('/dashboard');
      return;
    }
    
    // Simulate loading for a smoother experience
    const loadTimer = setTimeout(() => {
      const parsedResults = JSON.parse(storedResults);
      setResults(parsedResults.results);
      setPlatform(parsedResults.platform);
      setUrl(parsedResults.url);
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(loadTimer);
  }, [isAuthenticated, navigate]);
  
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
              as="a"
              href="/dashboard"
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
