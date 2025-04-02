import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import InteractiveCursor from "@/components/InteractiveCursor";
import ProtectedRoute from "@/components/ProtectedRoute";
import Login from "./pages/Login";
import StudentAuthentication from "./pages/StudentAuthentication";
import VisitorManagement from "./pages/VisitorManagement";
import VehicleTracking from "./pages/VehicleTracking";
import LostFound from "./pages/LostFound";
import ModernHome from "./pages/ModernHome";
import NotFound from "./pages/NotFound";
import SecurityManagement from "./pages/SecurityManagement";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <InteractiveCursor />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              
              <Route element={<ProtectedRoute />}>
                <Route path="/home" element={<ModernHome />} />
                <Route path="/students" element={<StudentAuthentication />} />
                <Route path="/visitors" element={<VisitorManagement />} />
                <Route path="/vehicles" element={<VehicleTracking />} />
                <Route path="/lost-found" element={<LostFound />} />
                <Route path="/security-management" element={<SecurityManagement />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
