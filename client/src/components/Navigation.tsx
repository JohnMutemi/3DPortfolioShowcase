import { useState, useEffect } from 'react';
import { useScrollActive } from '@/hooks/useScrollActive';
import { useTheme } from '@/hooks/useTheme';

const navigation = [
  { id: 'home', label: 'Home', icon: 'fas fa-home' },
  { id: 'about', label: 'About', icon: 'fas fa-user' },
  { id: 'services', label: 'Services', icon: 'fas fa-laptop-code' },
  { id: 'skills', label: 'Skills', icon: 'fas fa-chart-bar' },
  { id: 'projects', label: 'Projects', icon: 'fas fa-project-diagram' },
  { id: 'contact', label: 'Contact', icon: 'fas fa-envelope' }
];

const Navigation = () => {
  const activeSection = useScrollActive();
  const { theme } = useTheme();
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed left-1/2 bottom-8 transform -translate-x-1/2 z-50 glassmorphism py-3 px-6 rounded-full flex items-center space-x-8">
      {navigation.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection(item.id);
          }}
          className={`nav-link ${
            activeSection === item.id
              ? 'text-accent-purple' 
              : theme === 'dark' 
                ? 'text-text-dark hover:text-white' 
                : 'text-text-light hover:text-primary-dark'
          } transition-all`}
        >
          <i className={`${item.icon} mr-2`}></i>
          <span className="hidden md:inline-block">{item.label}</span>
        </a>
      ))}
    </nav>
  );
};

export default Navigation;
