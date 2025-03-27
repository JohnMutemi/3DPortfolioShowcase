import { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';
import { SunMoon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button
      variant="ghost"
      className="fixed top-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full glassmorphism text-white transition-all hover:shadow-neon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <SunMoon className="text-xl" />
      ) : (
        <Sun className="text-xl" />
      )}
    </Button>
  );
};

export default ThemeToggle;
