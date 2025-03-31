
import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { StudentAPI, Student } from '@/lib/mock-data';
import { Camera, UserX, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface FaceRecognitionProps {
  onRecognition?: (student: Student | null) => void;
  captureOnly?: boolean;
  className?: string;
}

const FaceRecognition: React.FC<FaceRecognitionProps> = ({ 
  onRecognition, 
  captureOnly = false,
  className
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const { toast } = useToast();

  // Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 640, height: 480 }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      toast({
        title: "Camera Error",
        description: "Could not access the camera. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  // Capture image from video
  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return null;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return null;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Get image data
    return canvas.toDataURL('image/jpeg');
  };

  // Process face recognition
  const processFaceRecognition = async () => {
    setIsProcessing(true);
    
    const imageData = captureImage();
    if (!imageData) {
      toast({
        title: "Capture Failed",
        description: "Failed to capture image. Please try again.",
        variant: "destructive"
      });
      setIsProcessing(false);
      return;
    }
    
    // In a real app, you would send this image to a server for processing
    // Here we'll use our mock API
    try {
      const recognizedStudent = await StudentAPI.searchByFace(imageData);
      
      if (recognizedStudent) {
        toast({
          title: "Student Recognized",
          description: `Identified as ${recognizedStudent.name}`,
        });
      } else {
        toast({
          title: "No Match Found",
          description: "Could not identify the person in the image",
        });
      }
      
      if (onRecognition) {
        onRecognition(recognizedStudent);
      }
    } catch (error) {
      console.error("Face recognition error:", error);
      toast({
        title: "Recognition Error",
        description: "An error occurred during face recognition",
        variant: "destructive"
      });
      
      if (onRecognition) {
        onRecognition(null);
      }
    } finally {
      setIsProcessing(false);
      if (!captureOnly) {
        stopCamera();
        setIsCapturing(false);
      }
    }
  };

  // Toggle camera
  const toggleCamera = () => {
    if (isCapturing) {
      stopCamera();
      setIsCapturing(false);
    } else {
      startCamera();
      setIsCapturing(true);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-full max-w-md aspect-video bg-gray-800 rounded-lg overflow-hidden">
            {!isCapturing && !isProcessing && (
              <div className="flex items-center justify-center h-full bg-gray-900 text-gray-400">
                <UserX size={48} />
                <span className="ml-2">Camera inactive</span>
              </div>
            )}
            
            <video 
              ref={videoRef}
              className={`w-full h-full object-cover ${!isCapturing ? 'hidden' : ''}`}
              autoPlay
              playsInline
              muted
            />
            
            {isProcessing && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Loader2 className="animate-spin text-white" size={48} />
              </div>
            )}
          </div>
          
          <div className="flex space-x-4">
            <Button 
              onClick={toggleCamera}
              variant={isCapturing ? "destructive" : "default"}
              disabled={isProcessing}
            >
              <Camera className="mr-2 h-4 w-4" />
              {isCapturing ? "Stop Camera" : "Start Camera"}
            </Button>
            
            {isCapturing && (
              <Button
                onClick={processFaceRecognition}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Capture & Recognize"
                )}
              </Button>
            )}
          </div>
          
          {/* Hidden canvas for image processing */}
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </CardContent>
    </Card>
  );
};

export default FaceRecognition;
