
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

type User = {
  id: string;
  username: string;
  email: string;
};

type RegisteredUser = {
  id: string;
  username: string;
  email: string;
  password: string;
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get registered users from localStorage
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]') as RegisteredUser[];
      
      // Find user with matching email and password
      const matchedUser = registeredUsers.find(u => 
        u.email === email && u.password === password
      );
      
      if (!matchedUser) {
        toast.error('Invalid email or password');
        setLoading(false);
        return false;
      }
      
      // Create user object (without password) to store in session
      const loggedInUser = {
        id: matchedUser.id,
        username: matchedUser.username,
        email: matchedUser.email
      };
      
      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      setLoading(false);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
      return false;
    }
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Get existing registered users
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]') as RegisteredUser[];
      
      // Check if email already exists
      if (existingUsers.some(user => user.email === email)) {
        toast.error('Email already registered');
        setLoading(false);
        return false;
      }
      
      // Create new user
      const newUser = {
        id: crypto.randomUUID(),
        username,
        email,
        password // In a real app, this would be hashed
      };
      
      // Add to registered users
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
      
      // Log in the user automatically
      const loggedInUser = {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
      };
      
      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      setLoading(false);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        login, 
        register, 
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
