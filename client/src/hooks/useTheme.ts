import { useState, useEffect } from 'react';

type Theme = 'dark' | 'light';

export const useTheme = () => {
  // Initialize with dark theme to prevent flash of white content
  const [theme, setTheme] = useState<Theme>('dark');
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Run once on mount to load the theme preference
  useEffect(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
    
    setIsInitialized(true);
  }, []);
  
  // Apply theme changes
  useEffect(() => {
    if (!isInitialized) return;
    
    // Update classes for both body and html elements
    document.body.classList.remove('dark-mode', 'light-mode');
    document.body.classList.add(`${theme}-mode`);
    
    document.documentElement.classList.remove('dark-mode', 'light-mode');
    document.documentElement.classList.add(`${theme}-mode`);
    
    // Store theme preference
    localStorage.setItem('theme', theme);
    
    // Debug log
    console.log('Theme updated to:', theme);
  }, [theme, isInitialized]);
  
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };
  
  return { theme, toggleTheme };
};
