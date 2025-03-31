
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import FaceRecognition from '@/components/FaceRecognition';
import StudentSearchCard from '@/components/StudentSearchCard';
import StudentDetails from '@/components/StudentDetails';
import { Student } from '@/lib/mock-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const StudentAuthentication: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [activeTab, setActiveTab] = useState("face");

  const handleStudentFound = (student: Student | null) => {
    setSelectedStudent(student);
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Student Authentication</h1>
        <p className="text-muted-foreground">Verify student identity using face recognition or ID</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Tabs defaultValue="face" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Authentication Method</CardTitle>
                <CardDescription>Choose how to authenticate students</CardDescription>
                <TabsList className="grid grid-cols-2 mt-2">
                  <TabsTrigger value="face">Face Recognition</TabsTrigger>
                  <TabsTrigger value="id">ID Search</TabsTrigger>
                </TabsList>
              </CardHeader>
              
              <CardContent className="pt-4">
                <TabsContent value="face" className="mt-0">
                  <FaceRecognition 
                    onRecognition={handleStudentFound}
                  />
                </TabsContent>
                
                <TabsContent value="id" className="mt-0">
                  <StudentSearchCard 
                    onStudentFound={handleStudentFound}
                  />
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Authentication Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="font-medium mb-1">Face Recognition</h3>
                  <p className="text-muted-foreground">Position the student's face in front of the camera and click "Capture & Recognize" to authenticate.</p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1">ID Search</h3>
                  <p className="text-muted-foreground">Enter the student's ID number in the search field to retrieve their record.</p>
                </div>
                
                <div className="pt-2">
                  <p className="text-xs text-muted-foreground border-t border-border pt-2">Authentication data is processed securely and not stored after verification.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <StudentDetails student={selectedStudent} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentAuthentication;
