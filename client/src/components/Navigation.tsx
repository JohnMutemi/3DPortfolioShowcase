import { useState, useEffect } from 'react';
import { useScrollActive } from '@/hooks/useScrollActive';
import { useTheme } from '@/hooks/useTheme';
import { Link, useLocation } from 'wouter';

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
  const [location] = useLocation();
  const isHomePage = location === '/';
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed left-1/2 bottom-8 transform -translate-x-1/2 z-50 glassmorphism py-3 px-6 rounded-full flex items-center space-x-6">
      {/* Home page navigation items */}
      {isHomePage && navigation.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection(item.id);
          }}
          className={`nav-link ${
            activeSection === item.id
              ? 'text-accent-main' 
              : theme === 'dark' 
                ? 'text-text-dark hover:text-white' 
                : 'text-text-light hover:text-primary-dark'
          } transition-all`}
        >
          <i className={`${item.icon} mr-2`}></i>
          <span className="hidden md:inline-block">{item.label}</span>
        </a>
      ))}
      
      {/* Chat page back to home button */}
      {!isHomePage && (
        <Link 
          href="/" 
          className={`nav-link ${
            theme === 'dark' 
              ? 'text-text-dark hover:text-white' 
              : 'text-text-light hover:text-primary-dark'
          } transition-all`}
        >
          <i className="fas fa-home mr-2"></i>
          <span className="hidden md:inline-block">Home</span>
        </Link>
      )}
      
      {/* Chat button that appears on home page */}
      {isHomePage && (
        <Link 
          href="/chat"
          className={`nav-link ${
            theme === 'dark' 
              ? 'bg-primary-dark bg-opacity-30 text-white hover:bg-primary hover:bg-opacity-50' 
              : 'bg-primary-gradient text-white hover:bg-primary-light'
          } transition-all py-2 px-4 rounded-full ml-2 flex items-center`}
        >
          <i className="fas fa-robot mr-2"></i>
          <span className="hidden md:inline-block">Chat with John's AI</span>
        </Link>
      )}
    </nav>
  );
};

export default Navigation;
