
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
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
  Archive,
  Home,
  Moon,
  Sun,
  UserCog,
  Info
} from 'lucide-react';
import { Toaster } from '@/components/ui/sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { motion } from 'framer-motion';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const isAdmin = user?.role === 'admin';

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  const navItems = [
    { icon: Home, label: 'Home', path: '/home', access: 'all' },
    { icon: UserCheck, label: 'Student Authentication', path: '/students', access: 'guard' },
    { icon: User, label: 'Visitor Management', path: '/visitors', access: 'guard' },
    { icon: Car, label: 'Vehicle Tracking', path: '/vehicles', access: 'guard' },
    { icon: Archive, label: 'Lost & Found', path: '/lost-found', access: 'guard' },
    { icon: UserCog, label: 'Security Personnel', path: '/security-management', access: 'admin' },
  ];

  const filteredNavItems = navItems.filter(item => 
    item.access === 'all' || 
    (isAdmin && item.access === 'admin') || 
    (!isAdmin && item.access === 'guard')
  );

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Format last login time
  const formatLastLogin = () => {
    if (!user?.lastLogin) return 'First login';
    const date = new Date(user.lastLogin);
    return date.toLocaleString();
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top navigation bar */}
      <header className="bg-card/80 border-b border-border h-16 flex items-center justify-between px-4 z-20 backdrop-blur-sm sticky top-0">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
          <div className="font-semibold text-lg flex items-center">
            <Shield className="h-6 w-6 text-primary mr-2" />
            <span>Campus Guardian</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={toggleTheme} className="transition-colors duration-200">
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 bg-primary rounded-full"></span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer rounded-full p-1 hover:bg-accent/50 transition-colors">
                <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                  <AvatarImage src="/placeholder.svg" alt={user?.name} />
                  <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline-block font-medium">{user?.name}</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-bold">{user?.name}</span>
                  <span className="text-xs text-muted-foreground">{user?.role === 'admin' ? 'Administrator' : 'Security Guard'}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start">
                <span className="text-xs text-muted-foreground">Email</span>
                <span>{user?.email}</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start">
                <span className="text-xs text-muted-foreground">Last login</span>
                <span>{formatLastLogin()}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-campus-red" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar overlay for mobile */}
        {isSidebarOpen && isMobile && (
          <div 
            className="fixed inset-0 bg-black/20 z-10" 
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar navigation */}
        <motion.aside 
          className={`bg-sidebar text-sidebar-foreground w-64 border-r border-sidebar-border transition-all duration-300 fixed md:static top-16 bottom-0 z-10 backdrop-blur-md ${
            isSidebarOpen ? 'left-0' : '-left-64'
          }`}
          initial={false}
          animate={{ 
            x: isSidebarOpen ? 0 : '-100%',
            opacity: isSidebarOpen ? 1 : 0.8
          }}
          transition={{ 
            type: 'spring', 
            stiffness: 400, 
            damping: 35 
          }}
        >
          <nav className="p-4 flex flex-col h-full">
            <div className="space-y-1 flex-1">
              {filteredNavItems.map((item) => (
                <motion.div
                  key={item.path}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
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
                </motion.div>
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
        </motion.aside>
        
        {/* Main content */}
        <main className={`flex-1 overflow-auto p-4 md:p-6 transition-opacity duration-300 ${isSidebarOpen && isMobile ? 'opacity-30' : ''}`}>
          {children}
          <Toaster />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
