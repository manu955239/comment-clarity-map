
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import AuthModal from '@/components/Auth/AuthModal';
import { ArrowRight, Youtube, Instagram, Shield, BarChart4 } from 'lucide-react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  const handleStartClick = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted/30">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-28">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-toxic/5 blur-3xl"></div>
            <div className="absolute top-1/3 left-0 w-[600px] h-[600px] rounded-full bg-nontoxic/5 blur-3xl"></div>
          </div>
          
          <div className="container relative max-w-5xl">
            <div className="text-center mb-12 md:mb-16 animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 tracking-tight">
                Toxic Comment Classification
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Detect and analyze toxicity in YouTube comments and Instagram reels using advanced machine learning models.
              </p>
            </div>
            
            <div className="flex flex-col items-center justify-center gap-4 md:flex-row animate-fade-in animation-delay-200">
              <Button
                size="lg"
                as={Link}
                to={isAuthenticated ? "/dashboard" : "#"}
                onClick={handleStartClick}
                icon={<ArrowRight size={20} />}
                className="w-full md:w-auto"
              >
                {isAuthenticated ? "Go to Dashboard" : "Get Started"}
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                as={Link}
                to="/about"
                className="w-full md:w-auto"
              >
                Learn More
              </Button>
            </div>
            
            <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card variant="glass" animate="fade-in" delay={300} className="text-center p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Youtube size={24} className="text-red-600" />
                </div>
                <h3 className="text-lg font-medium mb-2">YouTube Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Analyze comments from any YouTube video to detect toxic content.
                </p>
              </Card>
              
              <Card variant="glass" animate="fade-in" delay={400} className="text-center p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Instagram size={24} className="text-pink-600" />
                </div>
                <h3 className="text-lg font-medium mb-2">Instagram Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Analyze both audio and comments from Instagram reels.
                </p>
              </Card>
              
              <Card variant="glass" animate="fade-in" delay={500} className="text-center p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield size={24} className="text-nontoxic" />
                </div>
                <h3 className="text-lg font-medium mb-2">ML Classification</h3>
                <p className="text-sm text-muted-foreground">
                  Powered by advanced machine learning models trained to detect toxic content.
                </p>
              </Card>
              
              <Card variant="glass" animate="fade-in" delay={600} className="text-center p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart4 size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Visual Results</h3>
                <p className="text-sm text-muted-foreground">
                  Get clear visualizations and detailed breakdowns of toxicity analysis.
                </p>
              </Card>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 bg-muted/30">
          <div className="container max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our application uses sophisticated machine learning algorithms to detect and classify toxic content.
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-border"></div>
              
              <div className="space-y-12 relative">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
                  <div className="order-1 md:order-1 md:text-right md:w-1/2 animate-fade-in">
                    <div className="bg-card rounded-lg p-6 shadow-md">
                      <h3 className="text-xl font-medium mb-2">Input URL</h3>
                      <p className="text-muted-foreground">
                        Simply enter the URL of a YouTube video or Instagram reel to begin the analysis process.
                      </p>
                    </div>
                  </div>
                  
                  <div className="z-10 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center animate-fade-in">
                    <span className="font-bold">1</span>
                  </div>
                  
                  <div className="order-1 md:order-3 md:w-1/2 hidden md:block"></div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
                  <div className="order-1 md:order-1 md:text-right md:w-1/2 hidden md:block"></div>
                  
                  <div className="z-10 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center animate-fade-in">
                    <span className="font-bold">2</span>
                  </div>
                  
                  <div className="order-1 md:order-3 md:w-1/2 animate-fade-in">
                    <div className="bg-card rounded-lg p-6 shadow-md">
                      <h3 className="text-xl font-medium mb-2">Content Analysis</h3>
                      <p className="text-muted-foreground">
                        Our application extracts comments and/or audio data and processes them through our toxicity classification models.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
                  <div className="order-1 md:order-1 md:text-right md:w-1/2 animate-fade-in">
                    <div className="bg-card rounded-lg p-6 shadow-md">
                      <h3 className="text-xl font-medium mb-2">Results & Visualization</h3>
                      <p className="text-muted-foreground">
                        View comprehensive results with detailed charts, statistics, and filtering options for analyzed content.
                      </p>
                    </div>
                  </div>
                  
                  <div className="z-10 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center animate-fade-in">
                    <span className="font-bold">3</span>
                  </div>
                  
                  <div className="order-1 md:order-3 md:w-1/2 hidden md:block"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container max-w-4xl">
            <Card variant="glass" className="p-8 text-center animate-fade-in">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to analyze content?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Start using our toxicity classification tools to gain insights into online content.
              </p>
              <Button
                size="lg"
                as={Link}
                to={isAuthenticated ? "/dashboard" : "#"}
                onClick={handleStartClick}
              >
                {isAuthenticated ? "Go to Dashboard" : "Get Started"}
              </Button>
            </Card>
          </div>
        </section>
      </main>
      
      <Footer />
      
      {showAuthModal && !isAuthenticated && (
        <AuthModal />
      )}
    </div>
  );
};

export default Index;
