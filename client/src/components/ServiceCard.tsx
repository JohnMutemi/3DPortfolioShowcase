import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import { Service } from '@/types';

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  return (
    <motion.div 
      className={`glassmorphism rounded-2xl p-6 transition-all hover:shadow-neon-${service.accentColor === 'main' ? '' : service.accentColor} card-3d-effect`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={fadeIn('up', 0.2 + index * 0.1)}
    >
      <div className={`h-16 w-16 mb-6 rounded-xl bg-accent-${service.accentColor}/20 flex items-center justify-center`}>
        <i className={`${service.icon} text-2xl text-accent-${service.accentColor}`}></i>
      </div>
      <h3 className="text-xl font-heading font-semibold mb-4">{service.title}</h3>
      <p className="text-text-dark">
        {service.description}
      </p>
    </motion.div>
  );
};

export default ServiceCard;
