import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Mock data functions
export function getRandomId() {
  return Math.floor(Math.random() * 10000).toString().padStart(4, '0');
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric', 
    month: 'short', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// Adapter function to convert face recognition student data to Student interface
export function adaptFaceRecognitionData(faceData: any): any {
  if (!faceData) return null;
  
  return {
    id: faceData.studentId || `STU-${faceData.id.toString().padStart(5, '0')}`,
    name: faceData.name,
    department: faceData.program,
    year: parseInt(faceData.year) || 1,
    image: "/placeholder.svg",
    status: faceData.status?.toLowerCase() || 'active',
    contactInfo: {
      email: faceData.email || `${faceData.name.toLowerCase().replace(/\s+/g, '.')}@university.edu`,
      phone: faceData.phone || "555-123-4567"
    },
    lastSeen: new Date().toISOString(),
    // Additional data from face recognition
    gpa: faceData.gpa,
    enrollmentDate: faceData.enrollmentDate,
    residenceHall: faceData.residenceHall
  };
}
