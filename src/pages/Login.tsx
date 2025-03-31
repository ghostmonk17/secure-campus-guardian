
import React, { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Loader2, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user, isLoading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, redirect to home
    if (user && !isLoading) {
      navigate('/home');
    }
  }, [user, isLoading, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/home');
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Preload demo accounts for easy access
  const handleDemoLogin = async (demoRole: 'admin' | 'security') => {
    setLoading(true);
    
    try {
      let demoEmail, demoPassword;
      
      if (demoRole === 'admin') {
        demoEmail = 'admin@campus-security.com';
        demoPassword = 'admin123';
      } else {
        demoEmail = 'security1@campus-security.com';
        demoPassword = 'security123';
      }
      
      const success = await login(demoEmail, demoPassword);
      if (success) {
        navigate('/home');
      }
    } catch (error) {
      console.error("Demo login error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-background relative overflow-hidden">
      {/* Abstract background shapes */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-10 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Theme toggle */}
      <div className="absolute top-4 right-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleTheme}
          className="rounded-full bg-card/60 backdrop-blur-sm"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </Button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-border/40 shadow-lg bg-card/80 backdrop-blur-md">
          <CardHeader className="space-y-1 flex flex-col items-center">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2
              }}
              className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4"
            >
              <Shield className="h-8 w-8 text-primary" />
            </motion.div>
            <CardTitle className="text-2xl text-center">Campus Guardian</CardTitle>
            <CardDescription className="text-center">Secure access for authorized personnel</CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input
                  id="email"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="bg-background/50 backdrop-blur-sm border-border/50"
                />
              </div>
              
              <div className="space-y-2">
                <Input
                  id="password"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="bg-background/50 backdrop-blur-sm border-border/50"
                />
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col gap-4">
              <Button 
                className="w-full" 
                type="submit" 
                disabled={loading}
                variant="default"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
              
              <div className="w-full flex flex-col gap-2">
                <div className="relative my-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border/40" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-card px-2 text-muted-foreground">Or use demo account</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => handleDemoLogin('admin')}
                    disabled={loading}
                    className="border-border/50 backdrop-blur-sm"
                  >
                    Admin
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => handleDemoLogin('security')}
                    disabled={loading}
                    className="border-border/50 backdrop-blur-sm"
                  >
                    Security
                  </Button>
                </div>
              </div>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
