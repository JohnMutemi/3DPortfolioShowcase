import { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button
      variant="ghost"
      className={`fixed top-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full glassmorphism transition-all ${theme === 'dark' ? 'text-white hover:shadow-neon' : 'text-primary-dark hover:shadow-neon-blue'}`}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-6 w-6" />
      ) : (
        <Moon className="h-6 w-6" />
      )}
    </Button>
  );
};

export default ThemeToggle;
