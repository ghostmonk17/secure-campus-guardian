
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { users, User } from '@/lib/mock-data';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for saved session
    const savedUser = localStorage.getItem('campusSecurityUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Error parsing saved user:", e);
        localStorage.removeItem('campusSecurityUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate network request
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = users.find(u => u.email === email && u.password === password);
        
        if (foundUser) {
          const userWithNewLogin = {
            ...foundUser,
            lastLogin: new Date().toISOString()
          };
          
          setUser(userWithNewLogin);
          localStorage.setItem('campusSecurityUser', JSON.stringify(userWithNewLogin));
          
          toast({
            title: "Login successful",
            description: `Welcome back, ${foundUser.name}`,
          });
          
          resolve(true);
        } else {
          toast({
            title: "Login failed",
            description: "Invalid email or password",
            variant: "destructive",
          });
          
          resolve(false);
        }
        
        setIsLoading(false);
      }, 1000); // Simulate network delay
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('campusSecurityUser');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
