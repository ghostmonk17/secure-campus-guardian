
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Visitor, VisitorAPI } from '@/lib/mock-data';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader2, PlusCircle, Calendar, UserPlus, UserCheck, UserX, Camera } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import FaceRecognition from '@/components/FaceRecognition';

const visitorFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  purpose: z.string().min(5, { message: "Purpose must be at least 5 characters." }),
  contactInfo: z.string().min(5, { message: "Contact info must be at least 5 characters." }),
  hostName: z.string().optional(),
});

type VisitorFormValues = z.infer<typeof visitorFormSchema>;

const VisitorManagement: React.FC = () => {
  const [isAddingVisitor, setIsAddingVisitor] = useState(false);
  const [isCapturingFace, setIsCapturingFace] = useState(false);

  const { data: visitors, isLoading, refetch } = useQuery({
    queryKey: ['visitors'],
    queryFn: () => VisitorAPI.getAll(),
  });

  const { toast } = useToast();

  const form = useForm<VisitorFormValues>({
    resolver: zodResolver(visitorFormSchema),
    defaultValues: {
      name: "",
      purpose: "",
      contactInfo: "",
      hostName: "",
    },
  });

  const onSubmit = async (values: VisitorFormValues) => {
    try {
      // Ensure all required fields are explicitly defined
      const newVisitor: Omit<Visitor, 'id'> = {
        name: values.name,
        purpose: values.purpose,
        contactInfo: values.contactInfo,
        checkIn: new Date().toISOString(),
        status: 'active',
        hostName: values.hostName,
      };
      
      await VisitorAPI.addVisitor(newVisitor);
      
      toast({
        title: "Visitor Added",
        description: "New visitor has been successfully registered",
      });
      
      form.reset();
      setIsAddingVisitor(false);
      refetch();
    } catch (error) {
      console.error("Error adding visitor:", error);
      toast({
        title: "Error",
        description: "Failed to add visitor",
        variant: "destructive",
      });
    }
  };

  const handleFaceCapture = () => {
    setIsCapturingFace(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/20 text-green-500">Active</Badge>;
      case 'completed':
        return <Badge variant="outline">Completed</Badge>;
      case 'blacklisted':
        return <Badge variant="destructive">Blacklisted</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Visitor Management</h1>
          <p className="text-muted-foreground">Track and manage campus visitors</p>
        </div>
        
        <Dialog open={isAddingVisitor} onOpenChange={setIsAddingVisitor}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Visitor
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Visitor</DialogTitle>
              <DialogDescription>
                Register a new visitor to the campus. All fields are required.
              </DialogDescription>
            </DialogHeader>
            
            {isCapturingFace ? (
              <div className="py-4">
                <h3 className="font-medium mb-2">Capture Visitor's Face</h3>
                <FaceRecognition 
                  captureOnly 
                  onRecognition={() => setIsCapturingFace(false)}
                />
                <Button
                  variant="outline"
                  className="mt-4 w-full"
                  onClick={() => setIsCapturingFace(false)}
                >
                  Skip Face Capture
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Visitor Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter full name" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="purpose"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Purpose of Visit</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Why is this person visiting?" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="contactInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Information</FormLabel>
                        <FormControl>
                          <Input placeholder="Phone number or email" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="hostName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Host (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Who are they visiting?" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full" 
                    onClick={handleFaceCapture}
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    Capture Visitor's Face
                  </Button>
                  
                  <DialogFooter>
                    <Button type="submit">Register Visitor</Button>
                  </DialogFooter>
                </form>
              </Form>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Active Visitors</p>
              <p className="text-2xl font-bold">
                {isLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  visitors?.filter(v => v.status === 'active').length || 0
                )}
              </p>
            </div>
            <div className="h-12 w-12 bg-green-500/10 rounded-full flex items-center justify-center">
              <UserCheck className="h-6 w-6 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Today's Check-ins</p>
              <p className="text-2xl font-bold">
                {isLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  visitors?.filter(v => {
                    const today = new Date().toDateString();
                    const checkInDate = new Date(v.checkIn).toDateString();
                    return today === checkInDate;
                  }).length || 0
                )}
              </p>
            </div>
            <div className="h-12 w-12 bg-campus-teal/10 rounded-full flex items-center justify-center">
              <Calendar className="h-6 w-6 text-campus-teal" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Blacklisted</p>
              <p className="text-2xl font-bold">
                {isLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  visitors?.filter(v => v.status === 'blacklisted').length || 0
                )}
              </p>
            </div>
            <div className="h-12 w-12 bg-campus-red/10 rounded-full flex items-center justify-center">
              <UserX className="h-6 w-6 text-campus-red" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Visitor Log</CardTitle>
          <CardDescription>Complete record of all campus visitors</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Check In</TableHead>
                  <TableHead>Check Out</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visitors && visitors.length > 0 ? (
                  visitors.map((visitor) => (
                    <TableRow key={visitor.id}>
                      <TableCell className="font-medium">{visitor.id}</TableCell>
                      <TableCell>{visitor.name}</TableCell>
                      <TableCell>{visitor.purpose}</TableCell>
                      <TableCell>{formatDate(new Date(visitor.checkIn))}</TableCell>
                      <TableCell>
                        {visitor.checkOut ? formatDate(new Date(visitor.checkOut)) : "-"}
                      </TableCell>
                      <TableCell>{getStatusBadge(visitor.status)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                      No visitors found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default VisitorManagement;
