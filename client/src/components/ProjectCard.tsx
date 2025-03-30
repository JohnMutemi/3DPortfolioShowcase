import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <motion.div 
      className="glassmorphism rounded-2xl overflow-hidden card-3d-effect"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={fadeIn('up', 0.2 + index * 0.1)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-${project.accentColor} opacity-70`}></div>
        <div className="absolute bottom-4 right-4">
          <span className={`pill-badge bg-white/20 backdrop-blur-sm text-white font-bold`}>
            {project.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className={`text-xl font-heading font-semibold text-gradient-${project.accentColor}`}>
            {project.title}
          </h3>
          <div className="flex gap-2">
            {project.liveUrl && (
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`text-accent-${project.accentColor} hover:scale-110 transition-all`}
                aria-label="View live project"
              >
                <i className="fas fa-external-link-alt"></i>
              </a>
            )}
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`text-accent-${project.accentColor} hover:scale-110 transition-all`}
                aria-label="View GitHub repository"
              >
                <i className="fab fa-github"></i>
              </a>
            )}
          </div>
        </div>
        <p className="text-text-dark mt-2 text-sm">
          {project.description}
        </p>
        <div className="flex flex-wrap mt-4">
          {project.technologies.map((tech, techIndex) => (
            <span 
              key={techIndex} 
              className={`pill-badge bg-gradient-${project.accentColor} text-white shadow-sm`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
