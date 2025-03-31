
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/components/DashboardLayout';
import { SecurityEvent, SecurityEventAPI, Student, StudentAPI, Vehicle, VehicleAPI, Visitor, VisitorAPI } from '@/lib/mock-data';
import { useQuery } from '@tanstack/react-query';
import { Loader2, AlertTriangle, Shield, UserCheck, Users, Car, Package, Activity } from 'lucide-react';
import { formatDate } from '@/lib/utils';

const Dashboard: React.FC = () => {
  const { data: events, isLoading: eventsLoading } = useQuery({
    queryKey: ['security-events'],
    queryFn: () => SecurityEventAPI.getAll(10),
  });

  const { data: students, isLoading: studentsLoading } = useQuery({
    queryKey: ['students'],
    queryFn: () => StudentAPI.getAll(),
  });

  const { data: visitors, isLoading: visitorsLoading } = useQuery({
    queryKey: ['visitors'],
    queryFn: () => VisitorAPI.getActive(),
  });

  const { data: vehicles, isLoading: vehiclesLoading } = useQuery({
    queryKey: ['vehicles'],
    queryFn: () => VehicleAPI.getInside(),
  });

  const getEventIcon = (type: string, severity: string) => {
    switch (type) {
      case 'access':
        return <UserCheck className={`h-5 w-5 ${severity === 'critical' ? 'text-red-500' : 'text-green-500'}`} />;
      case 'alert':
        return <AlertTriangle className="h-5 w-5 text-campus-amber" />;
      case 'vehicle':
        return <Car className="h-5 w-5 text-campus-lightBlue" />;
      case 'visitor':
        return <Users className="h-5 w-5 text-purple-500" />;
      case 'system':
        return <Activity className="h-5 w-5 text-blue-500" />;
      default:
        return <Shield className="h-5 w-5 text-primary" />;
    }
  };

  const isLoading = eventsLoading || studentsLoading || visitorsLoading || vehiclesLoading;

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Security Dashboard</h1>
        <div className="security-status-active">
          System Active
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <>
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Students</p>
                  <p className="text-2xl font-bold">{students?.length || 0}</p>
                </div>
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <UserCheck className="h-6 w-6 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Active Visitors</p>
                  <p className="text-2xl font-bold">{visitors?.length || 0}</p>
                </div>
                <div className="h-12 w-12 bg-purple-500/10 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Vehicles Inside</p>
                  <p className="text-2xl font-bold">{vehicles?.length || 0}</p>
                </div>
                <div className="h-12 w-12 bg-campus-lightBlue/10 rounded-full flex items-center justify-center">
                  <Car className="h-6 w-6 text-campus-lightBlue" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Lost Items</p>
                  <p className="text-2xl font-bold">4</p>
                </div>
                <div className="h-12 w-12 bg-campus-amber/10 rounded-full flex items-center justify-center">
                  <Package className="h-6 w-6 text-campus-amber" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Security Events */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Recent Security Events</CardTitle>
                <CardDescription>Latest activity in the security system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events && events.length > 0 ? (
                    events.map((event) => (
                      <div 
                        key={event.id} 
                        className="flex items-start space-x-3 py-2 px-3 rounded-md hover:bg-secondary/30 transition-colors"
                      >
                        <div className="mt-0.5">
                          {getEventIcon(event.type, event.severity)}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{event.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(new Date(event.timestamp))}
                          </p>
                        </div>
                        {event.severity === 'critical' && (
                          <div className="security-status-alert">Critical</div>
                        )}
                        {event.severity === 'warning' && (
                          <div className="security-status-attention">Warning</div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm">No recent events</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">System Status</CardTitle>
                <CardDescription>Current security system status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Main Gate Cameras</span>
                    <span className="security-status-active">Online</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Perimeter Sensors</span>
                    <span className="security-status-active">Online</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Student Database</span>
                    <span className="security-status-active">Connected</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Backup System</span>
                    <span className="security-status-attention">Updating</span>
                  </div>
                  
                  <div className="border-t border-border pt-4 mt-4">
                    <h4 className="font-medium mb-2">Active Security Personnel</h4>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm">Main Entrance</span>
                      <span className="text-sm font-medium">2 Guards</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm">Patrol Units</span>
                      <span className="text-sm font-medium">3 Teams</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
