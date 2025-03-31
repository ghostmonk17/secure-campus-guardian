
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import FaceRecognition from '@/components/FaceRecognition';
import StudentSearchCard from '@/components/StudentSearchCard';
import StudentDetails from '@/components/StudentDetails';
import { Student } from '@/lib/mock-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

const StudentAuthentication: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [activeTab, setActiveTab] = useState("face");

  const handleStudentFound = (student: Student | null) => {
    setSelectedStudent(student);
  };

  return (
    <DashboardLayout>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold">Student Authentication</h1>
        <p className="text-muted-foreground">Verify student identity using face recognition or ID</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Tabs defaultValue="face" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <Card className="overflow-hidden border-border/40 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm bg-opacity-80 bg-card">
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
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <StudentDetails student={selectedStudent} />
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default StudentAuthentication;
