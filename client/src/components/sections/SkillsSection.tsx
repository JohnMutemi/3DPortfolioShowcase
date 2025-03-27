import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import { Canvas } from '@react-three/fiber';
import SkillsVisualization from '@/components/canvas/SkillsVisualization';
import ProgressBar from '@/components/ProgressBar';
import { technicalSkills, technologies } from '@/lib/data';

const SkillsSection = () => {
  const progressBarsRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section id="skills" className="py-20 relative">
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-blue rounded-full filter blur-3xl opacity-10 animate-pulse-slow"></div>
      
      <div className="w-full max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn('up', 0.2)}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            <span className="bg-gradient-to-r from-accent-purple to-accent-pink text-transparent bg-clip-text">My Skills</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-accent-purple to-accent-pink rounded-full mx-auto mt-4"></div>
          <p className="text-text-dark text-lg mt-6 max-w-2xl mx-auto">
            Here are some of the technologies and tools I'm proficient with.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column: Skill Bars */}
          <motion.div 
            className="space-y-8 glassmorphism rounded-2xl p-6 hover:shadow-neon transition-all"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeIn('right', 0.3)}
            ref={progressBarsRef}
          >
            <h3 className="text-xl font-heading font-semibold mb-6">Technical Skills</h3>
            
            {technicalSkills.map((skill, index) => (
              <ProgressBar 
                key={index}
                skill={skill.name}
                value={skill.value}
              />
            ))}
          </motion.div>
          
          {/* Right Column: Technology badges */}
          <motion.div 
            className="glassmorphism rounded-2xl p-6 hover:shadow-neon transition-all"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeIn('left', 0.3)}
          >
            <h3 className="text-xl font-heading font-semibold mb-6">Technologies & Tools</h3>
            
            <div className="flex flex-wrap">
              {technologies.map((category, categoryIndex) => (
                <div key={categoryIndex} className="w-full mb-6">
                  <h4 className={`text-accent-${category.color} mb-3 font-medium`}>
                    {category.name}
                  </h4>
                  <div className="flex flex-wrap">
                    {category.items.map((item, itemIndex) => (
                      <span 
                        key={itemIndex} 
                        className={`pill-badge bg-accent-${category.color}/20 text-accent-${category.color}`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* 3D Skills Visualization */}
        <motion.div 
          className="mt-16 h-64 sm:h-80 rounded-2xl glassmorphism p-4 relative"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn('up', 0.5)}
        >
          {isMounted && (
            <Canvas dpr={[1, 2]}>
              <SkillsVisualization />
            </Canvas>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
