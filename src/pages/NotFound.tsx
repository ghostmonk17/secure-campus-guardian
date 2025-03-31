
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Shield, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center">
            <Shield className="h-10 w-10 text-primary" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-xl mb-6">Page Not Found</p>
        <p className="text-muted-foreground mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <Button onClick={() => navigate("/dashboard")} className="w-full">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
