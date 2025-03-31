
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { UserCheck, User, Car, Package } from 'lucide-react';

const ModernHome: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Student Authentication',
      description: 'Verify student identity through facial recognition or student ID',
      icon: UserCheck,
      color: 'bg-blue-500/20 text-blue-500',
      path: '/students'
    },
    {
      title: 'Visitor Management',
      description: 'Register and track visitors on campus premises',
      icon: User,
      color: 'bg-purple-500/20 text-purple-500',
      path: '/visitors'
    },
    {
      title: 'Vehicle Tracking',
      description: 'Monitor and log vehicles entering and leaving campus',
      icon: Car,
      color: 'bg-green-500/20 text-green-500',
      path: '/vehicles'
    },
    {
      title: 'Lost & Found',
      description: 'Report and claim lost items through our digital portal',
      icon: Package,
      color: 'bg-amber-500/20 text-amber-500',
      path: '/lost-found'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <h1 className="text-4xl font-bold tracking-tight">Welcome to Campus Guardian</h1>
          <p className="text-xl text-muted-foreground">Select a feature to get started</p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={item}>
              <Card className="h-full overflow-hidden border-border/40 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm bg-opacity-80 bg-card">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-start space-x-4">
                    <div className={`rounded-full p-3 ${feature.color}`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <h3 className="text-xl font-semibold">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button onClick={() => navigate(feature.path)}>
                      Access {feature.title}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default ModernHome;
