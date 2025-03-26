
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-background/60 backdrop-blur-sm">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">ToxicScan</h3>
            <p className="text-sm text-muted-foreground mb-4">
              An innovative platform for detecting and analyzing toxic content across social media platforms.
            </p>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} ToxicScan. All rights reserved.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  to="/" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/dashboard" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">About</h3>
            <p className="text-sm text-muted-foreground">
              This project was developed as a BTech final year project for toxicity classification in social media content using machine learning.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
