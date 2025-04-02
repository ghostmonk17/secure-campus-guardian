import React from 'react';
import { Camera, UserCheck, Shield, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  icon: React.ElementType;
  delay?: number;
}

const StepCard = ({ number, title, description, icon: Icon, delay = 0 }: StepCardProps) => (
  <div className={cn(
    "relative opacity-0 animate-fade-in",
    delay ? `animation-delay-${delay}` : ""
  )}>
    <div className="bg-card border border-border rounded-xl p-6 relative z-10">
      <div className="flex items-center mb-4 gap-4">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-lg">
          {number}
        </div>
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
    
    {/* Line connecting to next step (not for the last one) */}
    {number < 4 && (
      <div className="absolute top-1/2 left-full w-16 border-t-2 border-dashed border-border hidden lg:block" />
    )}
  </div>
);

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Scan & Register",
      description: "Students register with their ID and facial scan for secure authentication.",
      icon: Camera,
    },
    {
      number: 2,
      title: "Verify Identity",
      description: "Our system verifies student identities with advanced facial recognition.",
      icon: UserCheck,
    },
    {
      number: 3,
      title: "Secure Access",
      description: "Authenticated students gain access to authorized campus areas.",
      icon: Shield,
    },
    {
      number: 4,
      title: "Monitor & Track",
      description: "Security staff can monitor access and activity in real-time.",
      icon: Check,
    }
  ];
  
  return (
    <section className="py-20 bg-muted/30" id="how-it-works">
      <div className="container mx-auto px-6 md:px-8">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground">
            Our platform uses a simple four-step process to ensure campus safety and security.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12 relative">
          {steps.map((step, index) => (
            <StepCard
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
              icon={step.icon}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 