import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/lib/data';

const categories = ['All', 'Web', '3D', 'Games', 'Mobile'];

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [visibleProjects, setVisibleProjects] = useState(6);
  
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);
  
  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    setVisibleProjects(6); // Reset pagination when filter changes
  };
  
  const loadMoreProjects = () => {
    setVisibleProjects(prev => Math.min(prev + 3, filteredProjects.length));
  };
  
  return (
    <section id="projects" className="py-20">
      <div className="w-full max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn('up', 0.2)}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            <span className="bg-gradient-to-r from-accent-purple to-accent-pink text-transparent bg-clip-text">My Projects</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-accent-purple to-accent-pink rounded-full mx-auto mt-4"></div>
          <p className="text-text-dark text-lg mt-6 max-w-2xl mx-auto">
            Check out some of my recent work across web development, 3D modeling, and interactive experiences.
          </p>
        </motion.div>
        
        {/* Project Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn('up', 0.3)}
        >
          {categories.map((category, index) => (
            <button 
              key={index}
              className={`px-6 py-2 rounded-full ${
                activeFilter === category
                  ? 'bg-gradient-to-r from-accent-purple to-accent-pink text-white'
                  : 'glassmorphism text-text-dark hover:text-white'
              } font-medium transition-all`}
              onClick={() => handleFilterClick(category)}
            >
              {category}
            </button>
          ))}
        </motion.div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.slice(0, visibleProjects).map((project, index) => (
            <ProjectCard 
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
        
        {/* Show More Button */}
        {visibleProjects < filteredProjects.length && (
          <motion.div 
            className="text-center mt-12"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeIn('up', 0.5)}
          >
            <button 
              className="px-8 py-3 glassmorphism rounded-full font-semibold text-white hover:shadow-neon transition-all"
              onClick={loadMoreProjects}
            >
              <i className="fas fa-plus mr-2"></i> Load More Projects
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
