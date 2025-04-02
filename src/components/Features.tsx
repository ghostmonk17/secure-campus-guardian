import React from 'react';
import { 
  UserCheck, 
  Users, 
  Car, 
  Search, 
  Shield, 
  Bell, 
  Map, 
  BarChart3 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: React.ElementType;
  iconBg: string;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard = ({ 
  icon: Icon, 
  iconBg, 
  title, 
  description, 
  delay = 0 
}: FeatureCardProps) => (
  <div className={cn(
    "group bg-card border border-border rounded-xl p-6 transition-all hover:shadow-md",
    "opacity-0 animate-fade-in",
    delay ? `animation-delay-${delay}` : ""
  )}>
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${iconBg} group-hover:scale-110 transition-transform duration-300`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-xl font-medium mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const Features = () => {
  const features = [
    {
      icon: UserCheck,
      iconBg: "bg-blue-500",
      title: "Student Authentication",
      description: "Advanced facial recognition to accurately identify and authenticate students."
    },
    {
      icon: Users,
      iconBg: "bg-purple-500",
      title: "Visitor Management",
      description: "Digital registration and tracking system for all campus visitors."
    },
    {
      icon: Car,
      iconBg: "bg-green-500",
      title: "Vehicle Tracking",
      description: "Automated license plate recognition for monitoring campus vehicle access."
    },
    {
      icon: Search,
      iconBg: "bg-amber-500",
      title: "Lost & Found",
      description: "Digital portal for efficiently reporting and claiming lost items."
    },
    {
      icon: Shield,
      iconBg: "bg-red-500",
      title: "Security Incidents",
      description: "Centralized system for reporting and managing security incidents."
    },
    {
      icon: Bell,
      iconBg: "bg-indigo-500",
      title: "Alert System",
      description: "Real-time notifications for security events and campus emergencies."
    },
    {
      icon: Map,
      iconBg: "bg-teal-500",
      title: "Campus Mapping",
      description: "Interactive campus map showing security zones and access points."
    },
    {
      icon: BarChart3,
      iconBg: "bg-pink-500",
      title: "Security Analytics",
      description: "Comprehensive data analysis tools for security trend monitoring."
    }
  ];
  
  return (
    <section className="py-20" id="features">
      <div className="container mx-auto px-6 md:px-8">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Key Features</h2>
          <p className="text-xl text-muted-foreground">
            Our comprehensive security platform offers a wide range of features 
            to keep your campus safe and secure.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              iconBg={feature.iconBg}
              title={feature.title}
              description={feature.description}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 