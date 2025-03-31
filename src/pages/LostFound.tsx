
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { LostItem, LostItemAPI } from '@/lib/mock-data';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { 
  Loader2, 
  Package, 
  ArrowUpFromLine, 
  Plus, 
  Smartphone, 
  Shirt, 
  Watch, 
  FileText, 
  Briefcase,
  MapPin,
  CalendarDays 
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

const lostItemFormSchema = z.object({
  name: z.string().min(2, { message: "Name is required." }),
  description: z.string().min(5, { message: "Description must be at least 5 characters." }),
  location: z.string().min(2, { message: "Location is required." }),
  category: z.enum(['electronics', 'clothing', 'accessories', 'documents', 'other']),
});

type LostItemFormValues = z.infer<typeof lostItemFormSchema>;

const LostFound: React.FC = () => {
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  const { data: lostItems, isLoading, refetch } = useQuery({
    queryKey: ['lost-items'],
    queryFn: () => LostItemAPI.getAll(),
  });

  const { toast } = useToast();

  const form = useForm<LostItemFormValues>({
    resolver: zodResolver(lostItemFormSchema),
    defaultValues: {
      name: "",
      description: "",
      location: "",
      category: "other",
    },
  });

  const onSubmit = async (values: LostItemFormValues) => {
    try {
      const newItem: Omit<LostItem, 'id'> = {
        ...values,
        dateFound: new Date().toISOString(),
        status: 'unclaimed',
      };
      
      await LostItemAPI.addItem(newItem);
      
      toast({
        title: "Item Added",
        description: "Lost item has been successfully registered",
      });
      
      form.reset();
      setIsAddingItem(false);
      refetch();
    } catch (error) {
      console.error("Error adding item:", error);
      toast({
        title: "Error",
        description: "Failed to add lost item",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'unclaimed':
        return <Badge className="bg-blue-500/20 text-blue-500">Unclaimed</Badge>;
      case 'claimed':
        return <Badge className="bg-green-500/20 text-green-500">Claimed</Badge>;
      case 'pending':
        return <Badge className="bg-campus-amber/20 text-campus-amber">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'electronics':
        return <Smartphone className="h-10 w-10 text-blue-500" />;
      case 'clothing':
        return <Shirt className="h-10 w-10 text-purple-500" />;
      case 'accessories':
        return <Watch className="h-10 w-10 text-campus-amber" />;
      case 'documents':
        return <FileText className="h-10 w-10 text-campus-teal" />;
      default:
        return <Briefcase className="h-10 w-10 text-gray-500" />;
    }
  };

  const filteredItems = React.useMemo(() => {
    if (!lostItems) return [];
    
    if (filter === "all") return lostItems;
    
    if (filter === "unclaimed") {
      return lostItems.filter(item => item.status === 'unclaimed');
    }

    // Filter by category
    return lostItems.filter(item => item.category === filter);
  }, [lostItems, filter]);

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Lost & Found Portal</h1>
          <p className="text-muted-foreground">Track and manage lost items on campus</p>
        </div>
        
        <Dialog open={isAddingItem} onOpenChange={setIsAddingItem}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Lost Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Register Lost Item</DialogTitle>
              <DialogDescription>
                Add details about a found item to the lost & found registry
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Name</FormLabel>
                      <FormControl>
                        <Input placeholder="What is the item?" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Detailed description of the item" {...field} rows={3} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location Found</FormLabel>
                      <FormControl>
                        <Input placeholder="Where was it found?" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select item category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="electronics">Electronics</SelectItem>
                          <SelectItem value="clothing">Clothing</SelectItem>
                          <SelectItem value="accessories">Accessories</SelectItem>
                          <SelectItem value="documents">Documents</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                <div className="border border-dashed border-border p-4 rounded-md">
                  <div className="flex items-center justify-center flex-col">
                    <ArrowUpFromLine className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Upload Image (optional)</p>
                    <p className="text-xs text-muted-foreground mt-1">Drag and drop or click to upload</p>
                    <Input type="file" className="hidden" id="image-upload" />
                    <Button variant="ghost" size="sm" className="mt-2" asChild>
                      <label htmlFor="image-upload">Select File</label>
                    </Button>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button type="submit">Add Item</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={filter === 'all' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter('all')}
              >
                All Items
              </Button>
              <Button 
                variant={filter === 'unclaimed' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter('unclaimed')}
              >
                Unclaimed
              </Button>
              <Button 
                variant={filter === 'electronics' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter('electronics')}
              >
                <Smartphone className="h-4 w-4 mr-1" />
                Electronics
              </Button>
              <Button 
                variant={filter === 'clothing' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter('clothing')}
              >
                <Shirt className="h-4 w-4 mr-1" />
                Clothing
              </Button>
              <Button 
                variant={filter === 'accessories' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter('accessories')}
              >
                <Watch className="h-4 w-4 mr-1" />
                Accessories
              </Button>
              <Button 
                variant={filter === 'documents' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter('documents')}
              >
                <FileText className="h-4 w-4 mr-1" />
                Documents
              </Button>
              <Button 
                variant={filter === 'other' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter('other')}
              >
                <Package className="h-4 w-4 mr-1" />
                Other
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden card-hover">
                <div className="bg-muted aspect-video flex items-center justify-center">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      {getCategoryIcon(item.category)}
                      <p className="text-sm text-muted-foreground mt-2 capitalize">{item.category}</p>
                    </div>
                  )}
                </div>
                
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    {getStatusBadge(item.status)}
                  </div>
                </CardHeader>
                
                <CardContent className="pb-0">
                  <p className="text-sm text-muted-foreground mb-4">
                    {item.description}
                  </p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{item.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      <span>Found on {formatDate(new Date(item.dateFound))}</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="pt-4 pb-4">
                  <Button variant="outline" className="w-full">
                    {item.status === 'unclaimed' ? 'Claim Item' : 'View Details'}
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-8 text-muted-foreground">
              <Package className="h-12 w-12 mb-2" />
              <h3 className="text-lg font-medium">No items found</h3>
              <p>No lost and found items match your current filter</p>
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
};

export default LostFound;
