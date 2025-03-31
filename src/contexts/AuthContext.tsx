
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { users, User } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  signup: (email: string, password: string, name: string, role: string) => Promise<boolean>;
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

  const signup = async (email: string, password: string, name: string, role: string): Promise<boolean> => {
    setIsLoading(true);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const existingUser = users.find(u => u.email === email);
        
        if (existingUser) {
          toast({
            title: "Signup failed",
            description: "Email already exists",
            variant: "destructive",
          });
          resolve(false);
        } else {
          const newUser = {
            id: String(Date.now()),
            email,
            password,
            name,
            role,
            lastLogin: new Date().toISOString()
          };
          
          // In a real app, this would make a network request to create a user in a database
          // For this demo, we'll just add it to our in-memory array
          users.push(newUser);
          
          toast({
            title: "User created",
            description: `${name} has been added as a security personnel`,
          });
          
          resolve(true);
        }
        
        setIsLoading(false);
      }, 1000);
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
    <AuthContext.Provider value={{ user, login, logout, isLoading, signup }}>
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
