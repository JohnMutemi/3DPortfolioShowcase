import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';

const AboutSection = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  
  const handleDownloadCV = async () => {
    try {
      setIsDownloading(true);
      
      // Fetch the CV file from the server
      const response = await fetch('/api/download-cv');
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'John_Doe_CV.pdf';
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading CV:', error);
    } finally {
      setIsDownloading(false);
    }
  };
  
  return (
    <section id="about" className="min-h-screen flex items-center py-20">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <motion.div 
            className="md:w-2/5 relative"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeIn('right', 0.3)}
          >
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-accent-blue rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
            <div className="glassmorphism rounded-2xl p-4 relative z-10 card-3d-effect">
              <img 
                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800&h=800" 
                alt="John Doe" 
                className="w-full h-auto rounded-xl"
              />
              <div className="absolute bottom-8 right-8 glassmorphism rounded-full p-4 shadow-neon">
                <i className="fas fa-cube text-2xl text-accent-purple"></i>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-3/5"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeIn('left', 0.3)}
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-heading font-bold">
                <span className="bg-gradient-to-r from-accent-purple to-accent-pink text-transparent bg-clip-text">About Me</span>
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-accent-purple to-accent-pink rounded-full"></div>
              <p className="text-text-dark text-lg mt-6">
                I'm a passionate developer with over 5 years of experience in creating interactive digital experiences. 
                My journey began with frontend development, which eventually led me to explore the exciting world of 3D web graphics and animations.
              </p>
              <p className="text-text-dark text-lg">
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or creating digital art. I believe in building applications that not only function flawlessly but also provide memorable user experiences.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-accent-purple/20 flex items-center justify-center">
                    <i className="fas fa-user text-accent-purple"></i>
                  </div>
                  <div>
                    <h5 className="font-medium text-white">Name</h5>
                    <p className="text-text-dark">John Doe</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-accent-purple/20 flex items-center justify-center">
                    <i className="fas fa-envelope text-accent-purple"></i>
                  </div>
                  <div>
                    <h5 className="font-medium text-white">Email</h5>
                    <p className="text-text-dark">john@example.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-accent-purple/20 flex items-center justify-center">
                    <i className="fas fa-map-marker-alt text-accent-purple"></i>
                  </div>
                  <div>
                    <h5 className="font-medium text-white">Location</h5>
                    <p className="text-text-dark">San Francisco, CA</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-accent-purple/20 flex items-center justify-center">
                    <i className="fas fa-briefcase text-accent-purple"></i>
                  </div>
                  <div>
                    <h5 className="font-medium text-white">Experience</h5>
                    <p className="text-text-dark">5+ Years</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <button 
                  onClick={handleDownloadCV}
                  disabled={isDownloading}
                  className="inline-flex items-center px-6 py-3 glassmorphism rounded-full hover:shadow-neon transition-all"
                >
                  {isDownloading ? (
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                  ) : (
                    <i className="fas fa-download mr-2"></i>
                  )}
                  {isDownloading ? "Downloading..." : "Download CV"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
