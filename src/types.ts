export type DistrictId =
  | 'home'
  | 'wordpress'
  | 'shopify'
  | 'projects'
  | 'experience'
  | 'education'
  | 'skills'
  | 'contact';

export type CameraMode = 'orbit' | 'walk';

export interface Project {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  technologies: string[];
  role: string;
  features: string[];
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  figmaUrl?: string;
  category: 'Full-Stack' | 'WordPress' | 'Shopify' | 'Mobile' | 'Frontend';
  color: string;
  buildingPosition: [number, number, number];
}

export interface SkillCategory {
  id: string;
  title: string;
  iconName: string;
  skills: {
    name: string;
    level: 'Advanced' | 'Proficient' | 'Familiar';
    highlight?: boolean;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: 'Full-Time' | 'Freelance' | 'Contract' | 'Project-Based' | 'Internship' | string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  description: string;
  honors?: string;
  highlights: string[];
}

export interface DistrictInfo {
  id: DistrictId;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  position: [number, number, number];
  cameraPosition: [number, number, number];
  targetPosition: [number, number, number];
  color: string;
  accentColor: string;
  iconName: string;
}
