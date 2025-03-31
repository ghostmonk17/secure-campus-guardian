
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, UserCheck, User, Car, Archive, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Student Authentication',
      description: 'Verify student identity through advanced facial recognition.',
      icon: UserCheck,
      color: 'bg-blue-500/20 text-blue-500'
    },
    {
      title: 'Visitor Management',
      description: 'Register and track visitors on campus with ease.',
      icon: User,
      color: 'bg-purple-500/20 text-purple-500'
    },
    {
      title: 'Vehicle Tracking',
      description: 'Monitor and log vehicles entering and leaving campus.',
      icon: Car,
      color: 'bg-green-500/20 text-green-500'
    },
    {
      title: 'Lost & Found',
      description: 'Streamlined digital portal for reporting and claiming lost items.',
      icon: Archive,
      color: 'bg-amber-500/20 text-amber-500'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-6">
        {/* Abstract background elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-1/4 -left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 -right-10 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto text-center mb-10 z-10"
        >
          <div className="mb-8 inline-block">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto"
            >
              <Shield className="h-10 w-10 text-primary" />
            </motion.div>
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-4"
          >
            Secure Campus Guardian
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Comprehensive campus security management system with cutting-edge facial recognition, visitor tracking, and more.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" onClick={() => navigate('/login')}>
              Get Started <ArrowRight className="ml-2" />
            </Button>
            <Button size="lg" variant="outline" onClick={scrollToFeatures}>
              Learn More
            </Button>
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="absolute bottom-10 left-0 right-0 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={scrollToFeatures}
              className="rounded-full"
            >
              <ArrowRight className="rotate-90" />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Security Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our integrated platform provides all the tools needed for modern campus security management.
            </p>
          </motion.div>

          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div 
                key={feature.title} 
                variants={item}
                className="group"
              >
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-card/80 backdrop-blur-sm border border-border/40 rounded-xl p-6 h-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className={`rounded-full p-3 ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 relative">
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Secure Your Campus?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join universities and schools worldwide using Secure Campus Guardian to enhance safety and security.
          </p>
          <Button size="lg" onClick={() => navigate('/login')}>
            Access the Platform <ArrowRight className="ml-2" />
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 md:px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Shield className="h-6 w-6 text-primary mr-2" />
              <span className="font-bold">Campus Guardian</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Secure Campus Guardian. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
