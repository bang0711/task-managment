import { NavItem } from '@/types';

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};

export const users: User[] = [
  {
    id: 1,
    name: 'Candice Schiner',
    company: 'Dell',
    role: 'Frontend Developer',
    verified: false,
    status: 'Active'
  },
  {
    id: 2,
    name: 'John Doe',
    company: 'TechCorp',
    role: 'Backend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    company: 'WebTech',
    role: 'UI Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 4,
    name: 'David Smith',
    company: 'Innovate Inc.',
    role: 'Fullstack Developer',
    verified: false,
    status: 'Inactive'
  },
  {
    id: 5,
    name: 'Emma Wilson',
    company: 'TechGuru',
    role: 'Product Manager',
    verified: true,
    status: 'Active'
  },
  {
    id: 6,
    name: 'James Brown',
    company: 'CodeGenius',
    role: 'QA Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 7,
    name: 'Laura White',
    company: 'SoftWorks',
    role: 'UX Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 8,
    name: 'Michael Lee',
    company: 'DevCraft',
    role: 'DevOps Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 9,
    name: 'Olivia Green',
    company: 'WebSolutions',
    role: 'Frontend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 10,
    name: 'Robert Taylor',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active'
  }
];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'Product',
    href: '/dashboard/product',
    icon: 'product',
    label: 'product'
  },
  {
    title: 'Account',
    icon: 'user',
    label: 'account',
    children: [
      {
        title: 'Profile',
        href: '/dashboard/profile',
        icon: 'userPen',
        label: 'profile'
      },
      {
        title: 'Login',
        href: '/',
        icon: 'login',
        label: 'login'
      }
    ]
  },
  {
    title: 'Projects',
    href: '/dashboard/projects',
    icon: 'project',
    label: 'project'
  }
];

export type Project = {
  id: number;
  name: string;
};

export const projects: Project[] = [
  {
    id: 1,
    name: 'Project 1'
  },
  {
    id: 2,
    name: 'Project 2'
  },
  {
    id: 3,
    name: 'Project 3'
  },
  {
    id: 4,
    name: 'Project 4'
  },
  {
    id: 5,
    name: 'Project 5'
  },
  {
    id: 6,
    name: 'Project 6'
  },
  {
    id: 7,
    name: 'Project 7'
  },
  {
    id: 8,
    name: 'Project 8'
  },
  {
    id: 9,
    name: 'Project 9'
  },
  {
    id: 10,
    name: 'Project 10'
  },
  {
    id: 11,
    name: 'Project 11'
  },
  {
    id: 12,
    name: 'Project 12'
  },
  {
    id: 13,
    name: 'Project 13'
  },
  {
    id: 14,
    name: 'Project 14'
  },
  {
    id: 15,
    name: 'Project 15'
  }
];
