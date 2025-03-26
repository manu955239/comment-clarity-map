
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/common/Button';
import { LogOut, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-background/70 border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link 
            to="/" 
            className="text-2xl font-bold tracking-tight transition-colors hover:text-primary"
          >
            ToxicScan
          </Link>
          <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
            Beta
          </span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link 
            to="/" 
            className={`transition-colors hover:text-primary ${
              location.pathname === '/' ? 'text-primary' : 'text-foreground'
            }`}
          >
            Home
          </Link>
          {isAuthenticated && (
            <Link 
              to="/dashboard" 
              className={`transition-colors hover:text-primary ${
                location.pathname === '/dashboard' ? 'text-primary' : 'text-foreground'
              }`}
            >
              Dashboard
            </Link>
          )}
          <Link 
            to="/about" 
            className={`transition-colors hover:text-primary ${
              location.pathname === '/about' ? 'text-primary' : 'text-foreground'
            }`}
          >
            About
          </Link>
        </nav>
        
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <User size={16} className="text-primary" />
                </div>
                <span className="text-sm font-medium hidden md:block">
                  {user?.username}
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={logout}
                icon={<LogOut size={16} />}
              >
                <span className="hidden md:inline">Logout</span>
              </Button>
            </div>
          ) : (
            <Button as={Link} to="/login" size="sm">
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
