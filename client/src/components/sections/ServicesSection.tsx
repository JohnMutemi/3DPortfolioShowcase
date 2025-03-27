import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import ServiceCard from '@/components/ServiceCard';
import { services } from '@/lib/data';

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 relative">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent-pink rounded-full filter blur-3xl opacity-10 animate-pulse-slow"></div>
      
      <div className="w-full max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn('up', 0.2)}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            <span className="bg-gradient-to-r from-accent-purple to-accent-pink text-transparent bg-clip-text">My Services</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-accent-purple to-accent-pink rounded-full mx-auto mt-4"></div>
          <p className="text-text-dark text-lg mt-6 max-w-2xl mx-auto">
            I offer a range of services to help bring your digital vision to life with cutting-edge technology and design.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
