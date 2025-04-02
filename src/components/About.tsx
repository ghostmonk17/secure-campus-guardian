import React from 'react';
import { Shield, Users, BarChart, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

const AboutCard = ({ 
  icon: Icon,
  title, 
  description, 
  delay = 0 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string; 
  delay?: number;
}) => (
  <div className={cn(
    "group relative bg-card border border-border rounded-xl p-6 hover:shadow-md transition-all",
    "opacity-0 animate-fade-in",
    delay ? `animation-delay-${delay}` : ""
  )}>
    <div className="absolute top-0 left-0 right-0 h-1 bg-primary opacity-0 group-hover:opacity-100 rounded-t-xl transition-opacity" />
    <div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-medium mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const About = () => {
  return (
    <section className="py-20 bg-muted/30" id="about">
      <div className="container mx-auto px-6 md:px-8">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl font-bold mb-4">About Campus Security</h2>
          <p className="text-xl text-muted-foreground">
            Our smart security platform helps educational institutions protect students, 
            staff, and visitors with cutting-edge technology and intuitive management tools.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AboutCard 
            icon={Shield}
            title="Comprehensive Security"
            description="End-to-end security management covering all aspects of campus safety and protection."
            delay={100}
          />
          
          <AboutCard 
            icon={Users}
            title="Student Safety"
            description="Facial recognition technology that ensures only authorized students can access campus facilities."
            delay={200}
          />
          
          <AboutCard 
            icon={BarChart}
            title="Data Analytics"
            description="Real-time analytics and reporting to monitor security incidents and identify patterns."
            delay={300}
          />
          
          <AboutCard 
            icon={Award}
            title="Award-Winning"
            description="Recognized for excellence in campus security technology and innovation."
            delay={400}
          />
        </div>
      </div>
    </section>
  );
};

export default About; 