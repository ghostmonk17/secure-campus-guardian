
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Student, StudentAPI } from '@/lib/mock-data';
import { Search, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface StudentSearchCardProps {
  onStudentFound?: (student: Student | null) => void;
  className?: string;
}

const StudentSearchCard: React.FC<StudentSearchCardProps> = ({ 
  onStudentFound,
  className
}) => {
  const [studentId, setStudentId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!studentId.trim()) {
      toast({
        title: "Search Error",
        description: "Please enter a student ID",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    
    try {
      const student = await StudentAPI.getById(studentId.trim());
      
      if (student) {
        toast({
          title: "Student Found",
          description: `Found record for ${student.name}`,
        });
        
        if (onStudentFound) {
          onStudentFound(student);
        }
      } else {
        toast({
          title: "No Results",
          description: "No student found with that ID",
        });
        
        if (onStudentFound) {
          onStudentFound(null);
        }
      }
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search Error",
        description: "An error occurred during the search",
        variant: "destructive"
      });
      
      if (onStudentFound) {
        onStudentFound(null);
      }
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">ID Search</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2">
          <Input
            placeholder="Enter Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isSearching}
          />
          <Button 
            onClick={handleSearch}
            disabled={isSearching}
          >
            {isSearching ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentSearchCard;
