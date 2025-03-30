import { useRef } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';

const HomeSection = () => {
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center relative pt-20 pb-32">
      <div className="absolute -top-10 -right-10 w-72 h-72 bg-purple-600 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
      <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-blue-600 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
      <div className="absolute top-1/3 left-1/3 w-60 h-60 bg-indigo-600 rounded-full filter blur-3xl opacity-10 animate-pulse-slow"></div>

      <div className="flex flex-col lg:flex-row items-center justify-between">
        <motion.div 
          className="w-full lg:w-1/2 space-y-8 z-10 animate-float"
          initial="hidden"
          animate="show"
          variants={fadeIn('right', 0.3)}
        >
          <h4 className="text-lg text-purple-400 font-mono mb-2">Welcome to</h4>
          <h1 className="font-heading text-5xl md:text-7xl font-bold">
            <span className="text-white block">NexusTech</span>
            <span className="bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text typing-animation">
              Solutions
            </span>
          </h1>
          <p className="text-lg text-text-dark max-w-xl">
            We create innovative digital solutions for the modern world. 
            Specializing in web applications, IoT integration, voice AI agents, 
            and business automation that transform how companies work.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="#projects" 
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full font-semibold text-white hover:shadow-neon-purple transition-all"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Our Solutions
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
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-text-dark hover:text-purple-400 transition-all">
              <i className="fab fa-github text-2xl"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-text-dark hover:text-blue-400 transition-all">
              <i className="fab fa-linkedin text-2xl"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-text-dark hover:text-indigo-400 transition-all">
              <i className="fab fa-twitter text-2xl"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-text-dark hover:text-purple-400 transition-all">
              <i className="fab fa-instagram text-2xl"></i>
            </a>
          </div>
        </motion.div>
        
        <motion.div 
          className="w-full lg:w-1/2 flex justify-center mt-16 lg:mt-0 relative z-10"
          initial="hidden"
          animate="show"
          variants={fadeIn('left', 0.5)}
        >
          <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-2xl relative overflow-hidden bg-gradient-to-br from-purple-600 to-blue-500 p-1">
            <div className="w-full h-full rounded-xl bg-background/90 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="flex flex-col items-center">
                <div className="text-white text-5xl font-bold flex items-center">
                  <span className="text-purple-500">N</span>
                  <span className="text-blue-500">T</span>
                  <span className="text-indigo-500">S</span>
                </div>
                <div className="text-xs mt-4 text-gray-300 font-mono">INNOVATIVE DIGITAL SOLUTIONS</div>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <span className="px-2 py-1 rounded-md text-xs bg-purple-900/30 text-purple-300">Web Apps</span>
                  <span className="px-2 py-1 rounded-md text-xs bg-blue-900/30 text-blue-300">IoT</span>
                  <span className="px-2 py-1 rounded-md text-xs bg-indigo-900/30 text-indigo-300">AI</span>
                  <span className="px-2 py-1 rounded-md text-xs bg-violet-900/30 text-violet-300">Automation</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-text-dark text-sm mb-2">Explore Our Services</span>
        <i className="fas fa-chevron-down text-purple-500"></i>
      </div>
    </section>
  );
};

export default HomeSection;
