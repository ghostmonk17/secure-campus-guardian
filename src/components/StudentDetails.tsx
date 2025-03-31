
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Student } from '@/lib/mock-data';
import { Calendar, Mail, Phone, School, CalendarClock } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface StudentDetailsProps {
  student: Student | null;
  className?: string;
}

const StudentDetails: React.FC<StudentDetailsProps> = ({ student, className }) => {
  if (!student) {
    return (
      <Card className={`${className} min-h-[300px]`}>
        <CardHeader>
          <CardTitle>Student Details</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-full py-12">
          <p className="text-muted-foreground">No student data to display</p>
          <p className="text-sm text-muted-foreground mt-2">
            Please use the face recognition or ID search to find a student
          </p>
        </CardContent>
      </Card>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-500';
      case 'inactive': return 'bg-amber-500/20 text-amber-500';
      case 'suspended': return 'bg-red-500/20 text-red-500';
      default: return 'bg-gray-500/20 text-gray-500';
    }
  };

  return (
    <Card className={`${className} animate-fade-in`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Student Details</span>
          <Badge className={getStatusColor(student.status)}>
            {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center">
            <Avatar className="h-24 w-24 border-2 border-primary/20">
              <AvatarImage src={student.image} alt={student.name} />
              <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <h3 className="font-medium text-lg mt-2">{student.name}</h3>
            <p className="text-sm text-muted-foreground">ID: {student.id}</p>
          </div>
          
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <School className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Department</p>
                <p>{student.department}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Year</p>
                <p>Year {student.year}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p>{student.contactInfo.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p>{student.contactInfo.phone}</p>
              </div>
            </div>
            
            {student.lastSeen && (
              <div className="flex items-center gap-2 col-span-full">
                <CalendarClock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Last Seen</p>
                  <p>{formatDate(new Date(student.lastSeen))}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentDetails;
