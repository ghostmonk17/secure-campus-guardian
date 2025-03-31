import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Vehicle, VehicleAPI } from '@/lib/mock-data';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader2, Car, Clock, FlagTriangleLeft, PlusCircle } from 'lucide-react';
import { formatDate } from '@/lib/utils';

const vehicleFormSchema = z.object({
  licensePlate: z.string().min(2, { message: "License plate is required." }),
  make: z.string().min(2, { message: "Make is required." }),
  model: z.string().min(1, { message: "Model is required." }),
  color: z.string().min(1, { message: "Color is required." }),
  owner: z.string().optional(),
  type: z.enum(['student', 'staff', 'visitor', 'unknown']),
});

type VehicleFormValues = z.infer<typeof vehicleFormSchema>;

const VehicleTracking: React.FC = () => {
  const [isAddingVehicle, setIsAddingVehicle] = useState(false);

  const { data: vehicles, isLoading, refetch } = useQuery({
    queryKey: ['vehicles'],
    queryFn: () => VehicleAPI.getAll(),
  });

  const { toast } = useToast();

  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleFormSchema),
    defaultValues: {
      licensePlate: "",
      make: "",
      model: "",
      color: "",
      owner: "",
      type: "unknown",
    },
  });

  const onSubmit = async (values: VehicleFormValues) => {
    try {
      const newVehicle: Omit<Vehicle, 'id'> = {
        licensePlate: values.licensePlate,
        make: values.make,
        model: values.model,
        color: values.color,
        owner: values.owner,
        type: values.type,
        entryTime: new Date().toISOString(),
        status: 'inside',
      };
      
      await VehicleAPI.addVehicle(newVehicle);
      
      toast({
        title: "Vehicle Added",
        description: "New vehicle has been successfully registered",
      });
      
      form.reset();
      setIsAddingVehicle(false);
      refetch();
    } catch (error) {
      console.error("Error adding vehicle:", error);
      toast({
        title: "Error",
        description: "Failed to add vehicle",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'inside':
        return <Badge className="bg-green-500/20 text-green-500">Inside</Badge>;
      case 'departed':
        return <Badge variant="outline">Departed</Badge>;
      case 'flagged':
        return <Badge variant="destructive">Flagged</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'student':
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">Student</Badge>;
      case 'staff':
        return <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/20">Staff</Badge>;
      case 'visitor':
        return <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/20">Visitor</Badge>;
      case 'unknown':
        return <Badge variant="outline" className="bg-gray-500/10 text-gray-500 border-gray-500/20">Unknown</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Vehicle Tracking</h1>
          <p className="text-muted-foreground">Monitor and track vehicles on campus</p>
        </div>
        
        <Dialog open={isAddingVehicle} onOpenChange={setIsAddingVehicle}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Vehicle
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Register New Vehicle</DialogTitle>
              <DialogDescription>
                Record details of a vehicle entering the campus
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="licensePlate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>License Plate</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter license plate" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="make"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Make</FormLabel>
                        <FormControl>
                          <Input placeholder="Brand (e.g. Toyota)" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Model</FormLabel>
                        <FormControl>
                          <Input placeholder="Model (e.g. Corolla)" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Color</FormLabel>
                        <FormControl>
                          <Input placeholder="Vehicle color" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select vehicle type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="student">Student</SelectItem>
                            <SelectItem value="staff">Staff</SelectItem>
                            <SelectItem value="visitor">Visitor</SelectItem>
                            <SelectItem value="unknown">Unknown</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="owner"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Owner (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Vehicle owner's name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="submit">Register Vehicle</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Vehicles Inside</p>
              <p className="text-2xl font-bold">
                {isLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  vehicles?.filter(v => v.status === 'inside').length || 0
                )}
              </p>
            </div>
            <div className="h-12 w-12 bg-green-500/10 rounded-full flex items-center justify-center">
              <Car className="h-6 w-6 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Today's Entries</p>
              <p className="text-2xl font-bold">
                {isLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  vehicles?.filter(v => {
                    const today = new Date().toDateString();
                    const entryDate = new Date(v.entryTime).toDateString();
                    return today === entryDate;
                  }).length || 0
                )}
              </p>
            </div>
            <div className="h-12 w-12 bg-campus-teal/10 rounded-full flex items-center justify-center">
              <Clock className="h-6 w-6 text-campus-teal" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Flagged Vehicles</p>
              <p className="text-2xl font-bold">
                {isLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  vehicles?.filter(v => v.status === 'flagged').length || 0
                )}
              </p>
            </div>
            <div className="h-12 w-12 bg-campus-red/10 rounded-full flex items-center justify-center">
              <FlagTriangleLeft className="h-6 w-6 text-campus-red" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vehicle Registry</CardTitle>
          <CardDescription>All vehicles that have entered or exited the campus</CardDescription>
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
                  <TableHead>License Plate</TableHead>
                  <TableHead>Make & Model</TableHead>
                  <TableHead>Color</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Entry Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicles && vehicles.length > 0 ? (
                  vehicles.map((vehicle) => (
                    <TableRow key={vehicle.id}>
                      <TableCell className="font-medium">{vehicle.licensePlate}</TableCell>
                      <TableCell>{vehicle.make} {vehicle.model}</TableCell>
                      <TableCell>{vehicle.color}</TableCell>
                      <TableCell>{getTypeBadge(vehicle.type)}</TableCell>
                      <TableCell>{formatDate(new Date(vehicle.entryTime))}</TableCell>
                      <TableCell>{getStatusBadge(vehicle.status)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                      No vehicles found
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

export default VehicleTracking;
