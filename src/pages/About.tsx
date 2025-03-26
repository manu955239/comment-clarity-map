
import React from 'react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import Card from '@/components/common/Card';
import { Shield, BarChart4, Youtube, Instagram, Brain } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted/30">
      <Navbar />
      
      <main className="flex-1 container max-w-4xl py-12 px-4">
        <Card variant="glass" className="mb-8 p-6" animate="fade-in">
          <h1 className="text-3xl font-bold mb-4">About ToxicScan</h1>
          <p className="text-muted-foreground mb-6">
            ToxicScan is an advanced web application designed to detect and analyze toxic content
            in social media platforms using cutting-edge machine learning techniques.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <Shield size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Our Mission</h3>
                <p className="text-sm text-muted-foreground">
                  To make online spaces safer by identifying toxic content and providing users
                  with tools to understand and manage exposure to harmful interactions.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <Brain size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Technology</h3>
                <p className="text-sm text-muted-foreground">
                  Powered by state-of-the-art machine learning models specifically trained to
                  detect various forms of toxic content in text and audio.
                </p>
              </div>
            </div>
          </div>
        </Card>
        
        <Card variant="default" padding="lg" animate="fade-in" delay={200}>
          <h2 className="text-2xl font-bold mb-6">How It Works</h2>
          
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <Youtube size={32} className="text-red-600" />
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <h3 className="text-xl font-medium mb-2">YouTube Analysis</h3>
                <p className="text-muted-foreground mb-4">
                  ToxicScan analyzes comments from YouTube videos using natural language processing
                  to identify toxic content. Our algorithm can detect various forms of toxicity,
                  including hate speech, insults, and threats.
                </p>
                <div className="text-sm text-muted-foreground">
                  <p className="mb-2"><strong>What we analyze:</strong></p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Comment text content</li>
                    <li>Toxicity probability scores</li>
                    <li>Overall distribution of toxic vs. non-toxic comments</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <Instagram size={32} className="text-pink-600" />
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <h3 className="text-xl font-medium mb-2">Instagram Analysis</h3>
                <p className="text-muted-foreground mb-4">
                  For Instagram reels, ToxicScan goes beyond just text analysis. We extract and
                  transcribe audio content from reels and analyze both the speech and the
                  comments for toxic content.
                </p>
                <div className="text-sm text-muted-foreground">
                  <p className="mb-2"><strong>What we analyze:</strong></p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Audio transcription from reels</li>
                    <li>Comment text content</li>
                    <li>Comparative analysis between audio and comment toxicity</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <BarChart4 size={32} className="text-primary" />
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <h3 className="text-xl font-medium mb-2">Results & Visualization</h3>
                <p className="text-muted-foreground mb-4">
                  ToxicScan presents analysis results through intuitive visualizations, making it easy
                  to understand the toxicity levels and patterns in the content.
                </p>
                <div className="text-sm text-muted-foreground">
                  <p className="mb-2"><strong>Our visualizations include:</strong></p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Pie charts showing toxic vs. non-toxic distribution</li>
                    <li>Toxicity score metrics and comparisons</li>
                    <li>Filterable comment lists with toxicity indicators</li>
                    <li>For Instagram, comparative charts between audio and comments</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 bg-muted/30 p-6 rounded-lg border border-border">
            <h3 className="text-xl font-medium mb-4">Educational Purpose Statement</h3>
            <p className="text-sm text-muted-foreground">
              ToxicScan is developed for educational and research purposes only. The application aims
              to demonstrate the capabilities of machine learning in identifying potentially harmful
              content online. We do not store analyzed content beyond what's necessary for the
              immediate analysis, and all data is handled in accordance with privacy best practices.
            </p>
          </div>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
