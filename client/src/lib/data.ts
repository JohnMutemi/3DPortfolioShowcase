import { Service, Project, Skill, TechnologyCategory } from '@/types';

// Services data
export const services: Service[] = [
  {
    title: 'Enterprise Web Applications',
    description: 'Custom web applications that streamline business processes, boost productivity, and provide scalable solutions for growing companies.',
    icon: 'fas fa-laptop-code',
    accentColor: 'main',
  },
  {
    title: 'IoT Solutions',
    description: 'Comprehensive Internet of Things integration connecting your physical devices to powerful cloud systems for data collection and automation.',
    icon: 'fas fa-network-wired',
    accentColor: 'secondary',
  },
  {
    title: 'Voice AI Assistants',
    description: 'Custom conversational AI agents that enhance customer service, provide 24/7 support, and streamline information retrieval for your business.',
    icon: 'fas fa-microphone-alt',
    accentColor: 'tertiary',
  },
  {
    title: 'Business Automation',
    description: 'End-to-end workflow automation solutions that reduce manual tasks, minimize errors, and significantly increase operational efficiency.',
    icon: 'fas fa-robot',
    accentColor: 'main',
  },
  {
    title: 'Data Analytics & Visualization',
    description: 'Transforming complex data into actionable insights with customized dashboards and advanced analytics for informed decision-making.',
    icon: 'fas fa-chart-bar',
    accentColor: 'secondary',
  },
  {
    title: 'Cloud Solutions',
    description: 'Secure, scalable cloud architecture design and implementation to modernize infrastructure and enable digital transformation.',
    icon: 'fas fa-cloud',
    accentColor: 'tertiary',
  },
];

// Projects data
export const projects: Project[] = [
  {
    id: 1,
    title: 'Enterprise Resource Planning System',
    description: 'A comprehensive ERP solution for manufacturing companies that integrates inventory, production, HR, and finance modules.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
    category: 'Web',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    accentColor: 'main',
  },
  {
    id: 2,
    title: 'Industrial IoT Monitoring Platform',
    description: 'Real-time monitoring system for industrial equipment with predictive maintenance capabilities and alert systems.',
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    technologies: ['Node.js', 'MQTT', 'AWS IoT', 'React'],
    category: 'Web',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    accentColor: 'secondary',
  },
  {
    id: 3,
    title: 'Customer Service AI Chatbot',
    description: 'An intelligent voice and text AI assistant that handles customer inquiries, processes orders, and provides 24/7 support.',
    image: 'https://images.unsplash.com/photo-1596742578443-7682ef7b7057?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    technologies: ['TensorFlow.js', 'WebSpeech API', 'Express', 'MongoDB'],
    category: 'Web',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    accentColor: 'tertiary',
  },
  {
    id: 4,
    title: 'Business Analytics Dashboard',
    description: 'Interactive data visualization platform with real-time metrics, customizable KPI tracking, and automated reporting.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    technologies: ['D3.js', 'React', 'GraphQL', 'Firebase'],
    category: 'Web',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    accentColor: 'main',
  },
  {
    id: 5,
    title: 'Inventory Management System',
    description: 'Mobile-first inventory tracking system with barcode scanning, real-time stock updates, and automated reordering.',
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    technologies: ['React Native', 'Node.js', 'MongoDB', 'Redux'],
    category: 'Mobile',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    accentColor: 'secondary',
  },
  {
    id: 6,
    title: 'Smart Office Automation System',
    description: 'Comprehensive office automation solution integrating climate control, lighting, security, and meeting room management.',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    technologies: ['Raspberry Pi', 'Node.js', 'MQTT', 'React'],
    category: 'Web',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    accentColor: 'tertiary',
  },
  {
    id: 7,
    title: 'CRM with AI-Powered Insights',
    description: 'Customer Relationship Management system with AI-driven sales predictions, customer segmentation, and personalized engagement strategies.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    technologies: ['React', 'Python', 'TensorFlow', 'PostgreSQL'],
    category: 'Web',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    accentColor: 'main',
  },
  {
    id: 8,
    title: 'Healthcare Patient Portal',
    description: 'Secure patient management system with appointment scheduling, medical records access, and telemedicine integration.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    technologies: ['React', 'Node.js', 'WebRTC', 'MongoDB'],
    category: 'Web',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    accentColor: 'secondary',
  },
  {
    id: 9,
    title: 'Supply Chain Tracking System',
    description: 'Blockchain-based supply chain solution that provides end-to-end tracking, authentication, and real-time logistics management.',
    image: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    technologies: ['Ethereum', 'React', 'Node.js', 'Express'],
    category: 'Web',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    accentColor: 'tertiary',
  },
];

// Technical skills data
export const technicalSkills: Skill[] = [
  { name: 'Enterprise Solutions', value: 95 },
  { name: 'Cloud Infrastructure', value: 90 },
  { name: 'IoT Development', value: 88 },
  { name: 'AI & Machine Learning', value: 85 },
  { name: 'Mobile Applications', value: 82 },
  { name: 'Data Security', value: 90 },
];

// Technologies data
export const technologies: TechnologyCategory[] = [
  {
    name: 'Web Technologies',
    color: 'main',
    items: ['React', 'Angular', 'Node.js', 'Vue.js', 'TypeScript', 'GraphQL', 'Progressive Web Apps'],
  },
  {
    name: 'IoT & Hardware',
    color: 'secondary',
    items: ['Raspberry Pi', 'Arduino', 'MQTT', 'AWS IoT', 'Zigbee', 'ESP32', 'Bluetooth LE'],
  },
  {
    name: 'AI & Automation',
    color: 'tertiary',
    items: ['TensorFlow', 'OpenAI API', 'NLP', 'Computer Vision', 'ML Ops', 'RPA', 'Voice Interfaces'],
  },
  {
    name: 'Cloud & DevOps',
    color: 'main',
    items: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'CI/CD', 'Microservices'],
  },
];
