import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

const ContactInfo = ({ 
  icon: Icon,
  title,
  value,
}: { 
  icon: React.ElementType;
  title: string;
  value: string;
}) => (
  <div className="flex items-start gap-3">
    <div className="rounded-full bg-primary/10 p-2 text-primary">
      <Icon className="h-5 w-5" />
    </div>
    <div>
      <h4 className="font-medium">{title}</h4>
      <p className="text-muted-foreground">{value}</p>
    </div>
  </div>
);

const Contact = () => {
  return (
    <section className="py-20 bg-muted/30" id="contact">
      <div className="container mx-auto px-6 md:px-8">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-xl text-muted-foreground">
            Have questions about our campus security solution? Get in touch with our team.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.682320509523!2d-73.99019882422811!3d40.73844803964143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a4119ce269%3A0x1db21a5ecae3c19a!2sUnion%20Square%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1701301336142!5m2!1sen!2sus" 
                width="100%" 
                height="250" 
                style={{ border: 0 }} 
                className="w-full"
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Campus Security Location"
              ></iframe>
              <div className="p-6 space-y-6">
                <h3 className="text-xl font-medium">Get In Touch</h3>
                <div className="space-y-4">
                  <ContactInfo 
                    icon={MapPin} 
                    title="Address" 
                    value="123 Campus Security Drive, New York, NY 10012" 
                  />
                  <ContactInfo 
                    icon={Mail} 
                    title="Email" 
                    value="info@securecampus.com" 
                  />
                  <ContactInfo 
                    icon={Phone} 
                    title="Phone" 
                    value="+1 (555) 123-4567" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-medium mb-2">Send a Message</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input id="email" type="email" placeholder="Your email" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                  <Input id="subject" placeholder="Message subject" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <Textarea id="message" placeholder="Your message" rows={5} />
                </div>
                <Button className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact; 