// Service type
export interface Service {
  title: string;
  description: string;
  icon: string;
  accentColor: 'main' | 'secondary' | 'tertiary';
}

// Project type
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: 'Web' | '3D' | 'Games' | 'Mobile';
  liveUrl?: string;
  githubUrl?: string;
  accentColor: 'main' | 'secondary' | 'tertiary';
}

// Technical skill type
export interface Skill {
  name: string;
  value: number;
}

// Technology category type
export interface TechnologyCategory {
  name: string;
  color: 'main' | 'secondary' | 'tertiary';
  items: string[];
}
