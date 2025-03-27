import { useRef } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';

const HomeSection = () => {
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center relative pt-20 pb-32">
      <div className="absolute -top-10 -right-10 w-64 h-64 bg-accent-purple rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
      <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-accent-pink rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>

      <div className="flex flex-col lg:flex-row items-center justify-between">
        <motion.div 
          className="w-full lg:w-1/2 space-y-8 z-10 animate-float"
          initial="hidden"
          animate="show"
          variants={fadeIn('right', 0.3)}
        >
          <h4 className="text-lg text-accent-pink font-mono mb-2">Hi there, I'm</h4>
          <h1 className="font-heading text-5xl md:text-7xl font-bold">
            <span className="text-white block">John Kisinga</span>
            <span className="bg-gradient-to-r from-accent-purple to-accent-pink text-transparent bg-clip-text typing-animation">
              Creative Developer
            </span>
          </h1>
          <p className="text-lg text-text-dark max-w-xl">
            I create interactive web experiences with cutting-edge
            technology. Specializing in 3D web development, animations, 
            and building immersive digital experiences.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="#projects" 
              className="px-8 py-3 bg-gradient-to-r from-accent-purple to-accent-pink rounded-full font-semibold text-white hover:shadow-neon-pink transition-all"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View My Work
            </a>
            <a 
              href="#contact" 
              className="px-8 py-3 glassmorphism rounded-full font-semibold text-white hover:shadow-neon transition-all"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get In Touch
            </a>
          </div>
          <div className="flex space-x-4 pt-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-text-dark hover:text-accent-pink transition-all">
              <i className="fab fa-github text-2xl"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-text-dark hover:text-accent-blue transition-all">
              <i className="fab fa-linkedin text-2xl"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-text-dark hover:text-accent-purple transition-all">
              <i className="fab fa-twitter text-2xl"></i>
            </a>
            <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="text-text-dark hover:text-accent-pink transition-all">
              <i className="fab fa-dribbble text-2xl"></i>
            </a>
          </div>
        </motion.div>
        
        <motion.div 
          className="w-full lg:w-1/2 flex justify-center mt-16 lg:mt-0 relative z-10"
          initial="hidden"
          animate="show"
          variants={fadeIn('left', 0.5)}
        >
          <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full relative overflow-hidden bg-gradient-to-br from-accent-purple to-accent-pink flex items-center justify-center">
            <div className="text-white text-4xl font-bold">JK</div>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-text-dark text-sm mb-2">Scroll Down</span>
        <i className="fas fa-chevron-down text-accent-purple"></i>
      </div>
    </section>
  );
};

export default HomeSection;
