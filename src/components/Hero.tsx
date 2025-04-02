import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, Shield, ShieldCheck, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center pt-20" id="home">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-6 md:px-8 py-16 md:py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-16">
          <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 opacity-0 animate-fade-in">
              <ShieldCheck className="w-4 h-4 mr-2" />
              Next-Gen Campus Security
            </div>
            
            <h1 className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-bold",
              "opacity-0 animate-fade-in animation-delay-100"
            )}>
              Smart Security for a <span className="text-primary">Safer Campus</span>
            </h1>
            
            <p className={cn(
              "text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0",
              "opacity-0 animate-fade-in animation-delay-200"
            )}>
              Enhance your campus security with advanced facial recognition and visitor tracking. 
              Go beyond traditional ID cards with a modern approach to keeping your campus safe.
            </p>
            
            <div className={cn(
              "flex flex-col sm:flex-row gap-4 justify-center lg:justify-start",
              "opacity-0 animate-fade-in animation-delay-300"
            )}>
              <Button size="lg" onClick={() => navigate('/login')}>
                Try Now
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => {
                const features = document.getElementById('features');
                if (features) {
                  features.scrollIntoView({ behavior: 'smooth' });
                }
              }}>
                Learn More
              </Button>
            </div>
            
            <div className={cn(
              "flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8 pt-8",
              "opacity-0 animate-fade-in animation-delay-400"
            )}>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Advanced Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Easy Visitor Management</span>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 flex justify-center opacity-0 animate-fade-in animation-delay-300">
            <div className="relative w-full max-w-lg">
              {/* Main Image */}
              <div className="glass-card rounded-2xl shadow-xl overflow-hidden p-2 animate-float">
                <img 
                  src="https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Campus Security" 
                  className="w-full h-auto rounded-xl"
                />
              </div>
              
              {/* Floating Card 1 */}
              <div className="absolute -top-6 -left-6 glass-card rounded-xl shadow-lg p-4 max-w-[180px] animate-float animation-delay-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="text-sm font-medium">Identity verified</div>
                </div>
              </div>
              
              {/* Floating Card 2 */}
              <div className="absolute -bottom-6 -right-6 glass-card rounded-xl shadow-lg p-4 max-w-[180px] animate-float animation-delay-400">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="text-sm font-medium">Visitor tracked</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 