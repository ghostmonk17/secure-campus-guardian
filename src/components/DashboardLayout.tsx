
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Bell, 
  Menu, 
  X, 
  LogOut, 
  User, 
  Shield, 
  UserCheck, 
  Car, 
  Search, 
  Archive,
  Home
} from 'lucide-react';
import { Toaster } from '@/components/ui/sonner';
import { useIsMobile } from '@/hooks/use-mobile';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  const navItems = [
    { icon: Home, label: 'Overview', path: '/dashboard' },
    { icon: UserCheck, label: 'Student Authentication', path: '/students' },
    { icon: User, label: 'Visitor Management', path: '/visitors' },
    { icon: Car, label: 'Vehicle Tracking', path: '/vehicles' },
    { icon: Archive, label: 'Lost & Found', path: '/lost-found' },
    { icon: Search, label: 'Reports', path: '/reports' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top navigation bar */}
      <header className="bg-card border-b border-border h-16 flex items-center justify-between px-4 z-20">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
          <div className="font-semibold text-lg flex items-center">
            <Shield className="h-6 w-6 text-campus-teal mr-2" />
            <span>Campus Guardian</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 bg-campus-amber rounded-full"></span>
          </Button>
          
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" alt={user?.name} />
              <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="hidden md:inline-block font-medium">{user?.name}</span>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar navigation */}
        <aside 
          className={`bg-sidebar text-sidebar-foreground w-64 border-r border-sidebar-border transition-all duration-300 fixed md:static top-16 bottom-0 z-10 ${
            isSidebarOpen ? 'left-0' : '-left-64'
          }`}
        >
          <nav className="p-4 flex flex-col h-full">
            <div className="space-y-1 flex-1">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  variant="ghost"
                  className={`w-full justify-start mb-1 ${
                    location.pathname === item.path 
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                      : 'hover:bg-sidebar-accent/50'
                  }`}
                  onClick={() => handleNavigation(item.path)}
                >
                  <item.icon className="mr-2 h-5 w-5" />
                  {item.label}
                </Button>
              ))}
            </div>
            
            <Button 
              variant="ghost" 
              className="justify-start mt-auto text-campus-red hover:text-campus-red hover:bg-campus-red/10" 
              onClick={logout}
            >
              <LogOut className="mr-2 h-5 w-5" />
              Log Out
            </Button>
          </nav>
        </aside>
        
        {/* Main content */}
        <main className={`flex-1 overflow-auto p-4 md:p-6 ${isSidebarOpen && isMobile ? 'opacity-30' : ''}`}>
          {isSidebarOpen && isMobile && (
            <div 
              className="fixed inset-0 bg-black/20 z-0" 
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
          {children}
          <Toaster />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
