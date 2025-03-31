import React, { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Edit, Trash2, Plus, Loader2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

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
  const [guardForm, setGuardForm] = useState<Guard>({
    id: '',
    name: '',
    email: '',
    password: '',
    role: 'security', // Changed from 'guard' to 'security'
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentGuard, setCurrentGuard] = useState<Guard | null>(null);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const { toast } = useToast()

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
      role: 'security', // Changed from 'guard' to 'security'
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
      password: '', // Clear password for security reasons
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
    })
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
        })
      } else {
        // Add new guard
        if (!guardForm.password) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Password is required for new guard.",
          })
          return;
        }
        const success = await signup(guardForm.email, guardForm.password, guardForm.name, guardForm.role);
        if (success) {
          setGuards([...guards, { ...guardForm, id: String(Date.now()) }]);
          toast({
            title: "Success",
            description: "Guard added successfully.",
          })
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to add guard.",
          })
        }
      }
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error during signup:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add guard.",
      })
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Security Personnel Management</CardTitle>
          <CardDescription>Manage security guards and their roles.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Button onClick={handleAddGuard}>
              <Plus className="mr-2 h-4 w-4" />
              Add Guard
            </Button>
          </div>
          <Table>
            <TableCaption>A list of your security personnel.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {guards.map((guard) => (
                <TableRow key={guard.id}>
                  <TableCell className="font-medium">{guard.id}</TableCell>
                  <TableCell>{guard.name}</TableCell>
                  <TableCell>{guard.email}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{guard.role}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEditGuard(guard)}>
                      <Edit className="mr-2 h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteGuard(guard.id)}>
                      <Trash2 className="mr-2 h-4 w-4 text-campus-red" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Edit Guard' : 'Add Guard'}</DialogTitle>
            <DialogDescription>
              {isEditMode ? 'Update guard details.' : 'Create a new guard.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={guardForm.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="email" className="text-right">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={guardForm.email}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              {!isEditMode && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="password" className="text-right">
                    Password
                  </label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={guardForm.password || ''}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required={!isEditMode}
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end">
              <DialogClose asChild>
                <Button type="button" variant="secondary" className="mr-2">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  isEditMode ? 'Update Guard' : 'Add Guard'
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SecurityManagement;
