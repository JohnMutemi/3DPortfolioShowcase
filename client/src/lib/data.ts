import { Service, Project, Skill, TechnologyCategory } from '@/types';

// Services data
export const services: Service[] = [
  {
    title: 'Web Development',
    description: 'Building responsive, performant websites and web applications with modern frameworks and technologies.',
    icon: 'fas fa-laptop-code',
    accentColor: 'purple',
  },
  {
    title: '3D Modeling',
    description: 'Creating immersive 3D models and environments for websites, games, and interactive experiences.',
    icon: 'fas fa-cube',
    accentColor: 'pink',
  },
  {
    title: 'Game Development',
    description: 'Designing and developing engaging games with focus on graphics, performance and user experience.',
    icon: 'fas fa-gamepad',
    accentColor: 'blue',
  },
  {
    title: 'AR/VR Development',
    description: 'Creating augmented and virtual reality experiences for web and mobile platforms.',
    icon: 'fas fa-vr-cardboard',
    accentColor: 'blue',
  },
  {
    title: 'Mobile App Development',
    description: 'Building cross-platform mobile applications with a focus on performance and user experience.',
    icon: 'fas fa-mobile-alt',
    accentColor: 'pink',
  },
  {
    title: 'UI/UX Design',
    description: 'Creating intuitive, visually appealing interfaces and user experiences for web and mobile applications.',
    icon: 'fas fa-pencil-ruler',
    accentColor: 'purple',
  },
];

// Projects data
export const projects: Project[] = [
  {
    id: 1,
    title: '3D Portfolio Website',
    description: 'A personal portfolio website with interactive 3D elements and animations using Three.js and React.',
    image: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    technologies: ['React', 'Three.js', 'GSAP'],
    category: 'Web',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    accentColor: 'purple',
  },
  {
    id: 2,
    title: 'VR Game Experience',
    description: 'A virtual reality game experience built with Unity and WebXR, allowing users to explore a fantastical environment.',
    image: 'https://images.unsplash.com/photo-1616499370260-485b3e5ed3bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    technologies: ['Unity', 'WebXR', 'C#'],
    category: 'Games',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    accentColor: 'pink',
  },
  {
    id: 3,
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce platform with 3D product previews, user authentication, and payment processing.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    technologies: ['React', 'Node.js', 'MongoDB'],
    category: 'Web',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    accentColor: 'blue',
  },
  {
    id: 4,
    title: 'Data Visualization',
    description: 'An interactive data visualization dashboard with 3D charts and graphs for analytics and reporting.',
    image: 'https://images.unsplash.com/photo-1603380353725-f8a4d39cc41e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    technologies: ['D3.js', 'Three.js', 'Vue.js'],
    category: 'Web',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    accentColor: 'purple',
  },
  {
    id: 5,
    title: 'AR Mobile App',
    description: 'An augmented reality mobile app that allows users to place virtual furniture in their real-world environment.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    technologies: ['React Native', 'ARKit', 'ARCore'],
    category: 'Mobile',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    accentColor: 'pink',
  },
  {
    id: 6,
    title: 'AI Assistant',
    description: 'A 3D animated AI assistant with natural language processing capabilities for website integration.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    technologies: ['TensorFlow.js', 'Three.js', 'Express'],
    category: '3D',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    accentColor: 'blue',
  },
  {
    id: 7,
    title: '3D Product Configurator',
    description: 'An interactive 3D product configurator allowing users to customize and visualize products in real-time.',
    image: 'https://images.unsplash.com/photo-1535957998253-26ae1ef29506?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    technologies: ['React', 'Three.js', 'WebGL'],
    category: '3D',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    accentColor: 'purple',
  },
  {
    id: 8,
    title: 'Mobile Puzzle Game',
    description: 'A visually stunning puzzle game with unique mechanics and progressive difficulty levels.',
    image: 'https://images.unsplash.com/photo-1533287860510-78b4d654cea3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    technologies: ['Unity', 'C#', 'Blender'],
    category: 'Games',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    accentColor: 'pink',
  },
  {
    id: 9,
    title: 'Social Media Dashboard',
    description: 'A comprehensive dashboard for social media analytics with real-time data visualization.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    technologies: ['React', 'Firebase', 'Chart.js'],
    category: 'Web',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    accentColor: 'blue',
  },
];

// Technical skills data
export const technicalSkills: Skill[] = [
  { name: 'HTML/CSS', value: 95 },
  { name: 'JavaScript', value: 90 },
  { name: 'React.js', value: 85 },
  { name: 'Three.js', value: 80 },
  { name: 'Node.js', value: 75 },
  { name: 'WebGL', value: 70 },
];

// Technologies data
export const technologies: TechnologyCategory[] = [
  {
    name: 'Frontend',
    color: 'purple',
    items: ['React', 'Vue.js', 'Angular', 'Tailwind CSS', 'SASS', 'TypeScript'],
  },
  {
    name: '3D & Visualization',
    color: 'pink',
    items: ['Three.js', 'WebGL', 'GSAP', 'Blender', 'Unity', 'A-Frame'],
  },
  {
    name: 'Backend',
    color: 'blue',
    items: ['Node.js', 'Express', 'MongoDB', 'Firebase', 'SQL', 'GraphQL'],
  },
  {
    name: 'Tools & Others',
    color: 'purple',
    items: ['Git', 'Webpack', 'Docker', 'Figma', 'Adobe XD', 'Jest'],
  },
];
