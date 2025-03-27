// Colors
export const COLORS = {
  PRIMARY_DARK: '#121212',
  SECONDARY_DARK: '#1E1E1E',
  PRIMARY_LIGHT: '#F8F9FA',
  SECONDARY_LIGHT: '#E9ECEF',
  ACCENT_PURPLE: '#7928CA',
  ACCENT_PINK: '#FF0080',
  ACCENT_BLUE: '#00D8FF',
  TEXT_DARK: '#ADB5BD',
  TEXT_LIGHT: '#212529',
};

// Animation settings
export const ANIMATION = {
  DURATION: {
    SHORT: 0.3,
    MEDIUM: 0.5,
    LONG: 0.8,
  },
  EASE: [0.25, 0.25, 0.25, 0.75],
};

// Contact form validation messages
export const FORM_VALIDATION = {
  NAME_REQUIRED: 'Please enter your name',
  NAME_MIN_LENGTH: 'Name must be at least 2 characters',
  EMAIL_REQUIRED: 'Please enter your email address',
  EMAIL_INVALID: 'Please enter a valid email address',
  SUBJECT_REQUIRED: 'Please enter a subject',
  SUBJECT_MIN_LENGTH: 'Subject must be at least 3 characters',
  MESSAGE_REQUIRED: 'Please enter your message',
  MESSAGE_MIN_LENGTH: 'Message must be at least 10 characters',
};

// API endpoints
export const API = {
  CONTACT: '/api/contact',
  DOWNLOAD_CV: '/api/download-cv',
};

// Navigaton menu items
export const NAVIGATION = [
  { id: 'home', label: 'Home', icon: 'fas fa-home' },
  { id: 'about', label: 'About', icon: 'fas fa-user' },
  { id: 'services', label: 'Services', icon: 'fas fa-laptop-code' },
  { id: 'skills', label: 'Skills', icon: 'fas fa-chart-bar' },
  { id: 'projects', label: 'Projects', icon: 'fas fa-project-diagram' },
  { id: 'contact', label: 'Contact', icon: 'fas fa-envelope' },
];

// Social links
export const SOCIAL_LINKS = {
  GITHUB: 'https://github.com',
  LINKEDIN: 'https://linkedin.com',
  TWITTER: 'https://twitter.com',
  DRIBBBLE: 'https://dribbble.com',
};
