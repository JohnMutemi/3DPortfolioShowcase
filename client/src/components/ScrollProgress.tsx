import { useState, useEffect } from 'react';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 h-1.5 z-50 backdrop-blur-sm" 
      style={{ 
        width: `${scrollProgress}%`,
        background: 'linear-gradient(90deg, rgba(52,152,219,0.9) 0%, rgba(22,160,133,0.9) 50%, rgba(108,124,147,0.9) 100%)',
        boxShadow: '0 0 10px rgba(52,152,219,0.5)'
      }}
    />
  );
};

export default ScrollProgress;
