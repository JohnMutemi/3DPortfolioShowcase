import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

interface ProgressBarProps {
  skill: string;
  value: number;
}

const ProgressBar = ({ skill, value }: ProgressBarProps) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const isInView = useInView(progressRef, { once: true, amount: 0.5 });
  
  useEffect(() => {
    if (isInView) {
      // Small delay to make the animation more noticeable
      const timeout = setTimeout(() => {
        setWidth(value);
      }, 300);
      
      return () => clearTimeout(timeout);
    }
  }, [isInView, value]);
  
  return (
    <div className="space-y-2" ref={progressRef}>
      <div className="flex justify-between">
        <span className="font-medium">{skill}</span>
        <span className="text-accent-purple">{value}%</span>
      </div>
      <div className="progress-bar bg-secondary-dark">
        <div 
          className="progress-fill bg-gradient-to-r from-accent-purple to-accent-pink"
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
