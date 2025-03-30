import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';

const AboutSection = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  
  const handleDownloadBrochure = async () => {
    try {
      setIsDownloading(true);
      
      // Fetch the company brochure file from the server
      const response = await fetch('/api/download-cv');
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'NexusTech_Solutions_Brochure.pdf';
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading brochure:', error);
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
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-600 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
            <div className="glassmorphism rounded-2xl p-4 relative z-10 card-3d-effect overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800&h=800" 
                alt="NexusTech Solutions Team" 
                className="w-full h-auto rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl"></div>
              <div className="absolute bottom-8 left-0 right-0 text-center">
                <div className="bg-black/40 backdrop-blur-sm inline-block px-4 py-2 rounded-full">
                  <span className="text-white font-semibold">Our Innovative Team</span>
                </div>
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
                <span className="bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">About Our Company</span>
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full"></div>
              <p className="text-text-dark text-lg mt-6">
                Founded in 2020, NexusTech Solutions has rapidly grown into a leading provider of innovative digital solutions for businesses of all sizes. 
                We specialize in creating tailored technology solutions that help organizations embrace digital transformation.
              </p>
              <p className="text-text-dark text-lg">
                Our team of experienced engineers, designers, and strategists works collaboratively with clients to understand their unique challenges and develop solutions that drive growth, efficiency, and competitive advantage.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-600/20 flex items-center justify-center">
                    <i className="fas fa-medal text-purple-500"></i>
                  </div>
                  <div>
                    <h5 className="font-medium text-white">Founded</h5>
                    <p className="text-text-dark">2020</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-600/20 flex items-center justify-center">
                    <i className="fas fa-envelope text-blue-500"></i>
                  </div>
                  <div>
                    <h5 className="font-medium text-white">Email</h5>
                    <p className="text-text-dark">info@nexustech.solutions</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-600/20 flex items-center justify-center">
                    <i className="fas fa-map-marker-alt text-purple-500"></i>
                  </div>
                  <div>
                    <h5 className="font-medium text-white">Headquarters</h5>
                    <p className="text-text-dark">San Francisco, CA</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-600/20 flex items-center justify-center">
                    <i className="fas fa-users text-blue-500"></i>
                  </div>
                  <div>
                    <h5 className="font-medium text-white">Team Size</h5>
                    <p className="text-text-dark">50+ Professionals</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <button 
                  onClick={handleDownloadBrochure}
                  disabled={isDownloading}
                  className="inline-flex items-center px-6 py-3 glassmorphism rounded-full hover:shadow-neon transition-all"
                >
                  {isDownloading ? (
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                  ) : (
                    <i className="fas fa-download mr-2"></i>
                  )}
                  {isDownloading ? "Downloading..." : "Company Brochure"}
                </button>
                
                <a 
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full hover:shadow-neon-purple transition-all"
                >
                  <i className="fas fa-handshake mr-2"></i>
                  Partner With Us
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
