
import React, { useState } from 'react';
import Card from '@/components/common/Card';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { X } from 'lucide-react';

interface AuthModalProps {
  onClose?: () => void;
  initialView?: 'login' | 'register';
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, initialView = 'register' }) => {
  const [isLogin, setIsLogin] = useState(initialView === 'login');
  
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50 backdrop-blur-sm">
      <Card variant="glass" className="w-full max-w-md relative" animate="scale-in">
        {onClose && (
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        )}
        
        {isLogin ? (
          <LoginForm onToggleForm={toggleForm} />
        ) : (
          <RegisterForm onToggleForm={toggleForm} />
        )}
      </Card>
    </div>
  );
};

export default AuthModal;
