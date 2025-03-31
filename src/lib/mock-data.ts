
// Student data for the system
export interface Student {
  id: string;
  name: string;
  department: string;
  year: number;
  image: string;
  faceData?: string; // Base64 encoded face data
  status: 'active' | 'inactive' | 'suspended';
  contactInfo: {
    email: string;
    phone: string;
  };
  lastSeen?: string;
}

export const students: Student[] = [
  {
    id: "STU1001",
    name: "Alex Johnson",
    department: "Computer Science",
    year: 3,
    image: "/placeholder.svg",
    status: 'active',
    contactInfo: {
      email: "alex.johnson@university.edu",
      phone: "555-123-4567"
    },
    lastSeen: "2023-06-15T08:30:00"
  },
  {
    id: "STU1002",
    name: "Samantha Lee",
    department: "Electrical Engineering",
    year: 2,
    image: "/placeholder.svg",
    status: 'active',
    contactInfo: {
      email: "samantha.lee@university.edu",
      phone: "555-987-6543"
    },
    lastSeen: "2023-06-14T16:45:00"
  },
  {
    id: "STU1003",
    name: "Mohammed Al-Fayed",
    department: "Business Administration",
    year: 4,
    image: "/placeholder.svg",
    status: 'active',
    contactInfo: {
      email: "mohammed.alfayed@university.edu",
      phone: "555-234-5678"
    },
    lastSeen: "2023-06-15T12:15:00"
  },
  {
    id: "STU1004",
    name: "Emily Chen",
    department: "Biology",
    year: 1,
    image: "/placeholder.svg",
    status: 'inactive',
    contactInfo: {
      email: "emily.chen@university.edu",
      phone: "555-345-6789"
    },
    lastSeen: "2023-06-10T09:20:00"
  },
  {
    id: "STU1005",
    name: "James Wilson",
    department: "Physics",
    year: 3,
    image: "/placeholder.svg",
    status: 'suspended',
    contactInfo: {
      email: "james.wilson@university.edu", 
      phone: "555-456-7890"
    },
    lastSeen: "2023-06-14T14:30:00"
  }
];

// Visitor data
export interface Visitor {
  id: string;
  name: string;
  purpose: string;
  contactInfo: string;
  image?: string;
  checkIn: string;
  checkOut?: string;
  status: 'active' | 'completed' | 'blacklisted';
  hostName?: string;
}

export const visitors: Visitor[] = [
  {
    id: "VIS001",
    name: "John Smith",
    purpose: "Parent Meeting",
    contactInfo: "555-111-2222",
    checkIn: "2023-06-15T09:30:00",
    status: 'active',
    hostName: "Dean Williams"
  },
  {
    id: "VIS002",
    name: "Priya Sharma",
    purpose: "Guest Lecture",
    contactInfo: "555-222-3333",
    checkIn: "2023-06-15T10:15:00",
    status: 'active',
    hostName: "Prof. Thompson"
  },
  {
    id: "VIS003",
    name: "Robert Garcia",
    purpose: "Maintenance",
    contactInfo: "555-333-4444",
    checkIn: "2023-06-14T08:00:00",
    checkOut: "2023-06-14T17:00:00",
    status: 'completed'
  },
  {
    id: "VIS004",
    name: "Linda Jones",
    purpose: "Vendor Delivery",
    contactInfo: "555-444-5555",
    checkIn: "2023-06-15T11:45:00",
    status: 'active'
  },
  {
    id: "VIS005",
    name: "David Baker",
    purpose: "Unknown",
    contactInfo: "555-555-6666",
    checkIn: "2023-06-13T14:20:00",
    checkOut: "2023-06-13T14:45:00",
    status: 'blacklisted'
  }
];

// Vehicle data
export interface Vehicle {
  id: string;
  licensePlate: string;
  make: string;
  model: string;
  color: string;
  owner?: string;
  type: 'student' | 'staff' | 'visitor' | 'unknown';
  entryTime: string;
  exitTime?: string;
  status: 'inside' | 'departed' | 'flagged';
}

export const vehicles: Vehicle[] = [
  {
    id: "VEH001",
    licensePlate: "ABC-1234",
    make: "Toyota",
    model: "Corolla",
    color: "Silver",
    owner: "Alex Johnson",
    type: 'student',
    entryTime: "2023-06-15T08:15:00",
    status: 'inside'
  },
  {
    id: "VEH002",
    licensePlate: "XYZ-7890",
    make: "Honda",
    model: "Civic",
    color: "Blue",
    owner: "Prof. Thompson",
    type: 'staff',
    entryTime: "2023-06-15T07:45:00",
    status: 'inside'
  },
  {
    id: "VEH003",
    licensePlate: "DEF-4567",
    make: "Ford",
    model: "Focus",
    color: "Red",
    owner: "John Smith",
    type: 'visitor',
    entryTime: "2023-06-15T09:30:00",
    status: 'inside'
  },
  {
    id: "VEH004",
    licensePlate: "GHI-8901",
    make: "Nissan",
    model: "Altima",
    color: "Black",
    type: 'unknown',
    entryTime: "2023-06-15T10:20:00",
    status: 'flagged'
  },
  {
    id: "VEH005",
    licensePlate: "JKL-2345",
    make: "Chevrolet",
    model: "Malibu",
    color: "White",
    owner: "Emily Chen",
    type: 'student',
    entryTime: "2023-06-14T14:10:00",
    exitTime: "2023-06-14T18:30:00",
    status: 'departed'
  }
];

// Lost and Found
export interface LostItem {
  id: string;
  name: string;
  description: string;
  location: string;
  dateFound: string;
  image?: string;
  category: 'electronics' | 'clothing' | 'accessories' | 'documents' | 'other';
  status: 'unclaimed' | 'claimed' | 'pending';
  claimedBy?: string;
  claimedDate?: string;
}

export const lostItems: LostItem[] = [
  {
    id: "LOST001",
    name: "Blue Backpack",
    description: "Nike backpack with laptop inside",
    location: "Library, 2nd floor",
    dateFound: "2023-06-14T16:30:00",
    category: 'accessories',
    status: 'unclaimed'
  },
  {
    id: "LOST002",
    name: "iPhone 13",
    description: "Black iPhone 13 with clear case",
    location: "Cafeteria",
    dateFound: "2023-06-15T12:45:00",
    category: 'electronics',
    status: 'unclaimed'
  },
  {
    id: "LOST003",
    name: "Student ID Card",
    description: "ID card for Mohammed Al-Fayed",
    location: "Science Building Entrance",
    dateFound: "2023-06-13T09:15:00",
    category: 'documents',
    status: 'claimed',
    claimedBy: "Mohammed Al-Fayed",
    claimedDate: "2023-06-14T10:00:00"
  },
  {
    id: "LOST004",
    name: "Water Bottle",
    description: "Hydroflask, blue color",
    location: "Gym",
    dateFound: "2023-06-15T15:20:00",
    category: 'other',
    status: 'unclaimed'
  },
  {
    id: "LOST005",
    name: "Calculator",
    description: "Texas Instruments TI-84",
    location: "Math Department, Room 302",
    dateFound: "2023-06-14T14:10:00",
    category: 'electronics',
    status: 'pending',
    claimedBy: "Samantha Lee"
  }
];

// User accounts for the system
export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // In a real system, this would be hashed
  role: 'admin' | 'security';
  image?: string;
  lastLogin?: string;
}

export const users: User[] = [
  {
    id: "USR001",
    name: "Admin User",
    email: "admin@campus-security.com",
    password: "admin123", // This would be properly hashed in a real application
    role: 'admin',
    lastLogin: "2023-06-15T07:30:00"
  },
  {
    id: "USR002",
    name: "Security Officer 1",
    email: "security1@campus-security.com",
    password: "security123", // This would be properly hashed in a real application
    role: 'security',
    lastLogin: "2023-06-15T08:00:00"
  }
];

// Security events/activity log
export interface SecurityEvent {
  id: string;
  timestamp: string;
  type: 'access' | 'alert' | 'system' | 'visitor' | 'vehicle';
  description: string;
  severity: 'info' | 'warning' | 'critical';
  relatedId?: string;
}

export const securityEvents: SecurityEvent[] = [
  {
    id: "EVT001",
    timestamp: "2023-06-15T08:30:15",
    type: 'access',
    description: "Student Alex Johnson entered through main gate",
    severity: 'info',
    relatedId: "STU1001"
  },
  {
    id: "EVT002",
    timestamp: "2023-06-15T09:45:22",
    type: 'visitor',
    description: "New visitor John Smith checked in",
    severity: 'info',
    relatedId: "VIS001"
  },
  {
    id: "EVT003",
    timestamp: "2023-06-15T10:15:30",
    type: 'alert',
    description: "Unknown vehicle detected at south entrance",
    severity: 'warning',
    relatedId: "VEH004"
  },
  {
    id: "EVT004",
    timestamp: "2023-06-15T11:05:45",
    type: 'system',
    description: "Daily security system check completed",
    severity: 'info'
  },
  {
    id: "EVT005",
    timestamp: "2023-06-15T12:30:10",
    type: 'access',
    description: "Attempted access with invalid student ID",
    severity: 'critical'
  }
];

// Functions to simulate API calls

// Students API
export const StudentAPI = {
  getAll: () => new Promise<Student[]>((resolve) => {
    setTimeout(() => resolve(students), 300);
  }),
  
  getById: (id: string) => new Promise<Student | undefined>((resolve) => {
    setTimeout(() => resolve(students.find(student => student.id === id)), 300);
  }),
  
  searchByFace: (faceData: string) => new Promise<Student | null>((resolve) => {
    // In a real app, this would match against face recognition
    // For demo, randomly return a student or null
    setTimeout(() => {
      const randomSuccess = Math.random() > 0.3; // 70% chance of success
      if (randomSuccess) {
        const randomIndex = Math.floor(Math.random() * students.length);
        resolve(students[randomIndex]);
      } else {
        resolve(null);
      }
    }, 1500);
  })
};

// Visitors API
export const VisitorAPI = {
  getAll: () => new Promise<Visitor[]>((resolve) => {
    setTimeout(() => resolve(visitors), 300);
  }),
  
  getActive: () => new Promise<Visitor[]>((resolve) => {
    setTimeout(() => resolve(visitors.filter(visitor => visitor.status === 'active')), 300);
  }),
  
  addVisitor: (visitor: Omit<Visitor, 'id'>) => new Promise<Visitor>((resolve) => {
    const newVisitor = {
      ...visitor,
      id: `VIS${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    };
    setTimeout(() => resolve(newVisitor as Visitor), 500);
  })
};

// Vehicles API
export const VehicleAPI = {
  getAll: () => new Promise<Vehicle[]>((resolve) => {
    setTimeout(() => resolve(vehicles), 300);
  }),
  
  getInside: () => new Promise<Vehicle[]>((resolve) => {
    setTimeout(() => resolve(vehicles.filter(vehicle => vehicle.status === 'inside')), 300);
  }),
  
  addVehicle: (vehicle: Omit<Vehicle, 'id'>) => new Promise<Vehicle>((resolve) => {
    const newVehicle = {
      ...vehicle,
      id: `VEH${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    };
    setTimeout(() => resolve(newVehicle as Vehicle), 500);
  })
};

// Lost and Found API
export const LostItemAPI = {
  getAll: () => new Promise<LostItem[]>((resolve) => {
    setTimeout(() => resolve(lostItems), 300);
  }),
  
  getUnclaimed: () => new Promise<LostItem[]>((resolve) => {
    setTimeout(() => resolve(lostItems.filter(item => item.status === 'unclaimed')), 300);
  }),
  
  addItem: (item: Omit<LostItem, 'id'>) => new Promise<LostItem>((resolve) => {
    const newItem = {
      ...item,
      id: `LOST${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    };
    setTimeout(() => resolve(newItem as LostItem), 500);
  })
};

// Security Events API
export const SecurityEventAPI = {
  getAll: (limit = 50) => new Promise<SecurityEvent[]>((resolve) => {
    setTimeout(() => resolve(securityEvents.slice(0, limit)), 300);
  }),
  
  addEvent: (event: Omit<SecurityEvent, 'id'>) => new Promise<SecurityEvent>((resolve) => {
    const newEvent = {
      ...event,
      id: `EVT${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    };
    setTimeout(() => resolve(newEvent as SecurityEvent), 200);
  })
};
