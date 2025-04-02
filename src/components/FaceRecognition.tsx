import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, User, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Enhanced student data based on the three images in the dataset
const studentData = [
  { 
    id: 1, 
    name: "John Davis", 
    program: "Computer Science", 
    year: "3rd Year", 
    status: "Active",
    studentId: "STU-10045",
    gpa: "3.8",
    email: "john.davis@university.edu",
    enrollmentDate: "Sept 2021",
    residenceHall: "North Campus"
  },
  { 
    id: 2, 
    name: "Emily Wong", 
    program: "Electrical Engineering", 
    year: "2nd Year", 
    status: "Active",
    studentId: "STU-10872",
    gpa: "3.95",
    email: "emily.wong@university.edu",
    enrollmentDate: "Sept 2022",
    residenceHall: "East Campus"
  },
  { 
    id: 3, 
    name: "Harshil Bohra", 
    program: "Information Technology", 
    year: "2nd Year", 
    status: "Active",
    studentId: "STU-09458",
    gpa: "3.6",
    email: "harshil.bohra@university.edu",
    enrollmentDate: "Sept 2023",
    residenceHall: "South Campus"
  }
];

interface FaceRecognitionProps {
  // For dialog mode (SecurityManagement)
  open?: boolean;
  onClose?: () => void;
  
  // For inline mode (StudentAuthentication)
  onRecognition?: (student: any) => void;
  className?: string;
}

const FaceRecognition: React.FC<FaceRecognitionProps> = ({ 
  open, 
  onClose, 
  onRecognition,
  className
}) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [recognizedStudent, setRecognizedStudent] = useState<typeof studentData[0] | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { toast } = useToast();
  
  // Determine if we're in dialog mode or inline mode
  const isDialogMode = open !== undefined;

  useEffect(() => {
    if ((isDialogMode && open && isCapturing) || (!isDialogMode && isCapturing)) {
      startCamera();
    } else if (isDialogMode && !open) {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [open, isCapturing, isDialogMode]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        variant: "destructive",
        title: "Camera Error",
        description: "Failed to access camera. Please check permissions.",
      });
      setIsCapturing(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageData);
        setIsCapturing(false);
        processImage(imageData);
      }
    }
  };

  const processImage = async (imageData: string) => {
    setIsProcessing(true);
    setError(null);
    
    try {
      // Connect to Python API
      // In a real implementation with the API running, use:
      const response = await fetch('http://localhost:5000/api/recognize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageData }),
      });
      
      // For now, we'll use the fallback to the mock data since the API isn't running
      // Remove this fallback in a real implementation
      if (!response.ok) {
        // Fallback to mock for demo purposes
        console.log("Using fallback mock data since API is not available");
        const studentId = Math.floor(Math.random() * 3) + 1;
        const student = studentData.find(s => s.id === studentId);
        setRecognizedStudent(student || null);
        
        // If in StudentAuthentication mode, pass the student data to parent
        if (onRecognition) {
          onRecognition(student || null);
        }
        
        return;
      }
      
      const data = await response.json();
      
      if (data.success) {
        setRecognizedStudent(data.student);
        
        // If in StudentAuthentication mode, pass the student data to parent
        if (onRecognition) {
          onRecognition(data.student);
        }
        
        toast({
          title: "Success",
          description: `Student identified with ${data.confidence.toFixed(2)}% confidence.`,
        });
      } else {
        setRecognizedStudent(null);
        
        // If in StudentAuthentication mode, pass null to parent
        if (onRecognition) {
          onRecognition(null);
        }
        
        setError(data.message || "Face recognition failed");
        toast({
          variant: "destructive",
          title: "Recognition Failed",
          description: data.message || "No match found",
        });
      }
    } catch (error) {
      console.error('Error processing image:', error);
      // Fallback to mock for demo purposes
      const studentId = Math.floor(Math.random() * 3) + 1;
      const student = studentData.find(s => s.id === studentId);
      setRecognizedStudent(student || null);
      
      // If in StudentAuthentication mode, pass the student data to parent
      if (onRecognition) {
        onRecognition(student || null);
      }
      
      toast({
        title: "Using Demo Mode",
        description: "Connected to mock data since API server is not running.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const resetCapture = () => {
    setCapturedImage(null);
    setRecognizedStudent(null);
    setError(null);
    setIsCapturing(true);
  };

  const handleClose = () => {
    setCapturedImage(null);
    setRecognizedStudent(null);
    setError(null);
    setIsCapturing(false);
    if (onClose) onClose();
  };

  // Content to render for face recognition UI
  const renderFaceRecognitionContent = () => (
    <div className="mt-4 space-y-4">
      {!isCapturing && !capturedImage ? (
        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-campus-teal/30 rounded-lg bg-campus-blue/5">
          <Camera className="h-12 w-12 text-campus-teal/70 mb-4" />
          <h3 className="text-lg font-medium mb-2">Start Camera</h3>
          <p className="text-sm text-muted-foreground text-center mb-4">
            Click the button below to start the camera and capture a student's face
          </p>
          <Button 
            onClick={() => setIsCapturing(true)}
            className="bg-campus-teal hover:bg-campus-teal/90 text-white"
          >
            Start Camera
          </Button>
        </div>
      ) : isCapturing ? (
        <div className="space-y-4">
          <div className="relative rounded-lg overflow-hidden bg-black aspect-video">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute top-2 right-2 bg-white/80 hover:bg-white"
              onClick={() => setIsCapturing(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex justify-center">
            <Button 
              onClick={captureImage}
              className="bg-campus-teal hover:bg-campus-teal/90 text-white"
            >
              Capture Image
            </Button>
          </div>
        </div>
      ) : capturedImage ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <img 
                  src={capturedImage} 
                  alt="Captured" 
                  className="w-full h-auto object-cover"
                />
              </CardContent>
            </Card>
            
            <Card className="bg-card/70 backdrop-blur-sm">
              <CardContent className="p-4">
                {isProcessing ? (
                  <div className="flex flex-col items-center justify-center h-full py-8">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-campus-teal mb-4"></div>
                    <p className="text-sm text-muted-foreground">Processing face recognition...</p>
                  </div>
                ) : recognizedStudent ? (
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-campus-blue/20 flex items-center justify-center mr-4">
                        <User className="h-6 w-6 text-campus-blue" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{recognizedStudent.name}</h3>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {recognizedStudent.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Program</p>
                        <p className="font-medium">{recognizedStudent.program}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Year</p>
                        <p className="font-medium">{recognizedStudent.year}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Student ID</p>
                        <p className="font-medium">{recognizedStudent.studentId}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Verification</p>
                        <p className="font-medium text-green-600">Verified</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full py-8">
                    <div className="rounded-full h-10 w-10 bg-red-100 text-red-600 flex items-center justify-center mb-4">
                      <X className="h-6 w-6" />
                    </div>
                    <p className="font-medium text-red-600 mb-1">No match found</p>
                    <p className="text-sm text-muted-foreground text-center">
                      {error || "The captured image did not match any student in the database."}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button 
              variant="outline"
              onClick={resetCapture}
              className="border-campus-teal/20"
            >
              Try Again
            </Button>
            {isDialogMode && (
              <Button 
                onClick={handleClose}
                className="bg-campus-teal hover:bg-campus-teal/90 text-white"
              >
                Close
              </Button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );

  // For dialog mode (SecurityManagement)
  if (isDialogMode) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[600px] bg-gradient-to-br from-background to-card border-campus-teal/20">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-campus-teal flex items-center">
              <Camera className="mr-2" /> Face Recognition
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Identify students using facial recognition technology
            </DialogDescription>
          </DialogHeader>

          {renderFaceRecognitionContent()}
        </DialogContent>
      </Dialog>
    );
  }
  
  // For inline mode (StudentAuthentication)
  return (
    <Card className={className}>
      <CardContent className="p-4">
        {renderFaceRecognitionContent()}
      </CardContent>
    </Card>
  );
};

export default FaceRecognition;
