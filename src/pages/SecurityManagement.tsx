
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { UserCog, Plus, Edit, Trash2, Search, Shield, UserCheck } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { User } from '@/lib/mock-data';
import { useToast } from '@/components/ui/use-toast';

// Mock security guard data (this would normally come from an API)
const initialGuards: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'guard', password: 'password123', lastLogin: '2023-05-15T09:30:00Z' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'guard', password: 'password123', lastLogin: '2023-05-14T14:45:00Z' },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'guard', password: 'password123', lastLogin: '2023-05-16T08:15:00Z' },
];

const SecurityManagement: React.FC = () => {
  const [guards, setGuards] = useState<User[]>(initialGuards);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentGuard, setCurrentGuard] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'guard',
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'guard',
    });
    setCurrentGuard(null);
    setIsEditMode(false);
  };

  const handleAddGuard = () => {
    setIsDialogOpen(false);
    
    if (isEditMode && currentGuard) {
      // Update existing guard
      const updatedGuards = guards.map(guard => 
        guard.id === currentGuard.id 
          ? { ...guard, name: formData.name, email: formData.email, password: formData.password || guard.password } 
          : guard
      );
      setGuards(updatedGuards);
      
      toast({
        title: "Guard Updated",
        description: `${formData.name}'s information has been updated successfully.`,
      });
    } else {
      // Add new guard
      const newGuard: User = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'guard',
        lastLogin: '',
      };
      
      setGuards([...guards, newGuard]);
      
      toast({
        title: "Guard Added",
        description: `${formData.name} has been added to the system.`,
      });
    }
    
    resetForm();
  };

  const handleEditGuard = (guard: User) => {
    setCurrentGuard(guard);
    setFormData({
      name: guard.name,
      email: guard.email,
      password: '',
      role: guard.role,
    });
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleDeleteGuard = (id: string) => {
    const updatedGuards = guards.filter(guard => guard.id !== id);
    setGuards(updatedGuards);
    
    toast({
      title: "Guard Removed",
      description: "The security guard has been removed from the system.",
      variant: "destructive",
    });
  };

  const filteredGuards = searchTerm 
    ? guards.filter(guard => 
        guard.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        guard.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : guards;

  // Format the last login time
  const formatLastLogin = (timestamp: string) => {
    if (!timestamp) return 'Never';
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <DashboardLayout>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Security Personnel Management</h1>
            <p className="text-muted-foreground">Manage security guards' access to the system</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { resetForm(); setIsDialogOpen(true); }} className="mt-4 sm:mt-0">
                <Plus className="mr-2 h-4 w-4" />
                Add Security Guard
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{isEditMode ? 'Edit Security Guard' : 'Add New Security Guard'}</DialogTitle>
                <DialogDescription>
                  {isEditMode 
                    ? 'Update the security guard information.' 
                    : 'Fill in the details to add a new security guard to the system.'}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    placeholder="John Doe" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="guard@campus.edu" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="password">
                    {isEditMode ? 'New Password (leave blank to keep current)' : 'Password'}
                  </Label>
                  <Input 
                    id="password" 
                    name="password" 
                    type="password" 
                    placeholder={isEditMode ? '••••••••' : 'Create password'} 
                    value={formData.password} 
                    onChange={handleInputChange} 
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Select disabled defaultValue="guard">
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="guard">Security Guard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddGuard}>
                  {isEditMode ? 'Save Changes' : 'Add Guard'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Security Guards</CardTitle>
                <CardDescription>Manage all security personnel in the system</CardDescription>
              </div>
              
              <div className="relative mt-4 sm:mt-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search guards..."
                  className="pl-8 w-full sm:w-[200px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>List of security guards with access to the system</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGuards.length > 0 ? (
                  filteredGuards.map((guard) => (
                    <TableRow key={guard.id}>
                      <TableCell className="font-medium">{guard.name}</TableCell>
                      <TableCell>{guard.email}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Shield className="mr-2 h-4 w-4 text-primary" />
                          <span>Security Guard</span>
                        </div>
                      </TableCell>
                      <TableCell>{formatLastLogin(guard.lastLogin)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEditGuard(guard)}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteGuard(guard.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No security guards found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
};

export default SecurityManagement;
