import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <motion.footer 
      className="py-8 border-t border-white/10"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeIn('up', 0.2)}
    >
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="font-heading text-2xl font-bold">
              <span className="text-accent-purple">John</span> <span className="text-white">Doe</span>
            </h2>
            <p className="text-text-dark text-sm mt-1">
              Creative Developer & 3D Specialist
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <a href="#" className="text-text-dark hover:text-accent-purple transition-all">Privacy Policy</a>
            <a href="#" className="text-text-dark hover:text-accent-purple transition-all">Terms of Service</a>
            <a href="#" className="text-text-dark hover:text-accent-purple transition-all">Sitemap</a>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-text-dark text-sm">
            &copy; {currentYear} John Doe. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
