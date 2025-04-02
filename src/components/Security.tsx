import React from 'react';
import { Lock, ShieldCheck, FileCheck, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SecurityFeatureProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay?: number;
}

const SecurityFeature = ({ icon: Icon, title, description, delay = 0 }: SecurityFeatureProps) => (
  <div className={cn(
    "flex gap-4 opacity-0 animate-fade-in",
    delay ? `animation-delay-${delay}` : ""
  )}>
    <div className="shrink-0 mt-1">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        <Icon className="w-5 h-5" />
      </div>
    </div>
    <div>
      <h3 className="font-medium text-lg mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </div>
);

const Security = () => {
  const securityFeatures = [
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "All data is encrypted both in transit and at rest using industry-standard encryption protocols."
    },
    {
      icon: ShieldCheck,
      title: "GDPR Compliant",
      description: "Our platform is fully compliant with GDPR and other privacy regulations worldwide."
    },
    {
      icon: FileCheck,
      title: "Data Protection",
      description: "We implement strict data protection measures to safeguard all personal information."
    },
    {
      icon: Eye,
      title: "Biometric Safety",
      description: "Facial recognition data is securely stored and never shared with third parties."
    }
  ];
  
  return (
    <section className="py-20" id="security">
      <div className="container mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Security & Privacy</h2>
              <p className="text-xl text-muted-foreground">
                We take data protection and privacy seriously, implementing the highest security standards.
              </p>
            </div>
            
            <div className="space-y-8">
              {securityFeatures.map((feature, index) => (
                <SecurityFeature
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  delay={index * 100}
                />
              ))}
            </div>
          </div>
          
          <div className="opacity-0 animate-fade-in animation-delay-200">
            <div className="relative">
              {/* Background elements */}
              <div className="absolute -top-6 -right-6 w-72 h-72 bg-primary/5 rounded-full blur-xl"></div>
              
              <div className="glass-card rounded-2xl shadow-xl overflow-hidden p-3 relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1551135049-8a33b5883817?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Security features" 
                  className="w-full h-auto rounded-xl"
                />
                
                {/* Security badge */}
                <div className="absolute -top-4 -right-4 glass-card rounded-full p-4 shadow-lg">
                  <ShieldCheck className="w-10 h-10 text-primary" />
                </div>
                
                {/* Status indicator */}
                <div className="absolute bottom-8 left-8 glass-card rounded-lg px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-medium">Security Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Security; 