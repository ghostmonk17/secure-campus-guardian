import React, { useState, useEffect, FormEvent } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Edit, Trash2, Plus, Loader2, Shield, CheckCircle, AlertTriangle, Search, Camera } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import FaceRecognition from '@/components/FaceRecognition';

interface Guard {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
}

const initialGuards: Guard[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'security',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'security',
  },
];

const SecurityManagement: React.FC = () => {
  const [guards, setGuards] = useState<Guard[]>(initialGuards);
  const [filteredGuards, setFilteredGuards] = useState<Guard[]>(initialGuards);
  const [guardForm, setGuardForm] = useState<Guard>({
    id: '',
    name: '',
    email: '',
    password: '',
    role: 'security',
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentGuard, setCurrentGuard] = useState<Guard | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFaceRecognitionOpen, setIsFaceRecognitionOpen] = useState(false);
  const { signup } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const results = guards.filter(guard =>
      guard.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guard.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGuards(results);
  }, [searchTerm, guards]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGuardForm({
      ...guardForm,
      [name]: value,
    });
  };

  const handleAddGuard = () => {
    setGuardForm({
      id: '',
      name: '',
      email: '',
      password: '',
      role: 'security',
    });
    setCurrentGuard(null);
    setIsEditMode(false);
    setIsDialogOpen(true);
  };

  const handleEditGuard = (guard: Guard) => {
    setGuardForm({
      id: guard.id,
      name: guard.name,
      email: guard.email,
      password: '',
      role: guard.role,
    });
    setCurrentGuard(guard);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleDeleteGuard = (guardId: string) => {
    setGuards(guards.filter((guard) => guard.id !== guardId));
    toast({
      title: "Success",
      description: "Guard deleted successfully.",
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditMode && currentGuard) {
        // Update existing guard
        setGuards(guards.map(guard =>
          guard.id === currentGuard.id ? { ...guardForm, id: currentGuard.id } : guard
        ));
        toast({
          title: "Success",
          description: "Guard updated successfully.",
        });
      } else {
        // Add new guard
        if (!guardForm.password) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Password is required for new guard.",
          });
          return;
        }
        const success = await signup(guardForm.email, guardForm.password, guardForm.name, guardForm.role);
        if (success) {
          setGuards([...guards, { ...guardForm, id: String(Date.now()) }]);
          toast({
            title: "Success",
            description: "Guard added successfully.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to add guard.",
          });
        }
      }
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error during signup:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add guard.",
      });
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto py-8"
    >
      <div className="bg-gradient-to-br from-campus-blue to-campus-teal/80 rounded-lg shadow-xl p-8 mb-8 text-white">
        <div className="flex items-center mb-4">
          <Shield className="h-12 w-12 mr-4" />
          <div>
            <h1 className="text-3xl font-bold">Security Personnel Management</h1>
            <p className="opacity-90">Manage and oversee your security team members</p>
          </div>
        </div>
        <div className="stats grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <motion.div 
            variants={itemVariants}
            className="stat bg-white/10 backdrop-blur-sm rounded-lg p-4"
          >
            <div className="stat-title text-white/70">Total Guards</div>
            <div className="stat-value text-3xl">{guards.length}</div>
            <div className="stat-desc flex items-center mt-2">
              <CheckCircle className="h-4 w-4 mr-1" /> All active
            </div>
          </motion.div>
          <motion.div 
            variants={itemVariants}
            className="stat bg-white/10 backdrop-blur-sm rounded-lg p-4"
          >
            <div className="stat-title text-white/70">Last Added</div>
            <div className="stat-value text-xl truncate">
              {guards.length > 0 ? guards[guards.length - 1].name : "N/A"}
            </div>
            <div className="stat-desc mt-2">Recently onboarded</div>
          </motion.div>
          <motion.div 
            variants={itemVariants}
            className="stat bg-white/10 backdrop-blur-sm rounded-lg p-4"
          >
            <div className="stat-title text-white/70">System Status</div>
            <div className="stat-value text-xl">Operational</div>
            <div className="stat-desc flex items-center mt-2">
              <AlertTriangle className="h-4 w-4 mr-1" /> Check permissions
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <motion.div 
          variants={itemVariants}
          className="relative flex-1 max-w-md"
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-card/50 border-campus-teal/20 focus:border-campus-teal"
          />
        </motion.div>
        <motion.div variants={itemVariants} className="flex gap-3">
          <Button 
            onClick={() => setIsFaceRecognitionOpen(true)} 
            className="bg-campus-blue hover:bg-campus-blue/90 text-white transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Camera className="mr-2 h-4 w-4" />
            Face Recognition
          </Button>
          <Button 
            onClick={handleAddGuard} 
            className="bg-campus-teal hover:bg-campus-teal/90 text-white transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Security Personnel
          </Button>
        </motion.div>
      </div>

      <motion.div 
        variants={itemVariants}
        className="bg-card/30 backdrop-blur-sm rounded-lg overflow-hidden border border-campus-teal/10 shadow-lg"
      >
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-campus-blue/10">
              <TableRow>
                <TableHead className="text-campus-blue font-medium">ID</TableHead>
                <TableHead className="text-campus-blue font-medium">Name</TableHead>
                <TableHead className="text-campus-blue font-medium">Email</TableHead>
                <TableHead className="text-campus-blue font-medium">Role</TableHead>
                <TableHead className="text-campus-blue font-medium text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGuards.length > 0 ? (
                filteredGuards.map((guard) => (
                  <TableRow key={guard.id} className="hover:bg-campus-teal/5 transition-colors">
                    <TableCell className="font-medium">{guard.id}</TableCell>
                    <TableCell>{guard.name}</TableCell>
                    <TableCell>{guard.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-campus-blue/10 text-campus-blue border-campus-blue/20">
                        {guard.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleEditGuard(guard)}
                        className="hover:text-campus-teal transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDeleteGuard(guard.id)}
                        className="hover:text-campus-red transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    No security personnel found matching your search
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter className="bg-campus-blue/5">
              <TableRow>
                <TableCell colSpan={5} className="text-right">
                  Total: {filteredGuards.length} of {guards.length}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </motion.div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-background to-card border-campus-teal/20">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-campus-teal">
              {isEditMode ? 'Edit Security Personnel' : 'Add Security Personnel'}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {isEditMode ? 'Update personnel details.' : 'Create a new security team member.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={guardForm.name}
                  onChange={handleInputChange}
                  className="border-campus-teal/20 focus:border-campus-teal"
                  required
                  placeholder="Enter full name"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={guardForm.email}
                  onChange={handleInputChange}
                  className="border-campus-teal/20 focus:border-campus-teal"
                  required
                  placeholder="Enter email address"
                />
              </div>
              {!isEditMode && (
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={guardForm.password || ''}
                    onChange={handleInputChange}
                    className="border-campus-teal/20 focus:border-campus-teal"
                    required={!isEditMode}
                    placeholder="Create a strong password"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <DialogClose asChild>
                <Button 
                  type="button" 
                  variant="outline"
                  className="border-campus-teal/20 text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button 
                type="submit" 
                disabled={loading}
                className="bg-campus-teal hover:bg-campus-teal/90 text-white"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isEditMode ? 'Updating...' : 'Adding...'}
                  </>
                ) : (
                  isEditMode ? 'Update Personnel' : 'Add Personnel'
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <FaceRecognition 
        open={isFaceRecognitionOpen}
        onClose={() => setIsFaceRecognitionOpen(false)}
      />
    </motion.div>
  );
};

export default SecurityManagement;
