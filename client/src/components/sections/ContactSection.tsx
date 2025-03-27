import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

// Define form schema with validation
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  subject: z.string().min(3, { message: 'Subject must be at least 3 characters' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

// Types
type FormValues = z.infer<typeof formSchema>;

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Form setup
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });
  
  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      
      // Send data to the server
      const response = await apiRequest('POST', '/api/contact', data);
      
      // If success, display success message and reset form
      toast({
        title: "Message sent successfully!",
        description: "Thanks for reaching out. I'll get back to you soon.",
        variant: "default",
      });
      
      form.reset();
    } catch (error) {
      console.error('Error sending message:', error);
      
      toast({
        title: "Failed to send message",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="contact" className="py-20 relative">
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-accent-purple rounded-full filter blur-3xl opacity-10 animate-pulse-slow"></div>
      
      <div className="w-full max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn('up', 0.2)}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            <span className="bg-gradient-to-r from-accent-purple to-accent-pink text-transparent bg-clip-text">Get In Touch</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-accent-purple to-accent-pink rounded-full mx-auto mt-4"></div>
          <p className="text-text-dark text-lg mt-6 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Form */}
          <motion.div 
            className="lg:w-3/5"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeIn('right', 0.3)}
          >
            <div className="glassmorphism rounded-2xl p-8 h-full">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-text-dark">Your Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John Doe"
                              className="w-full p-3 rounded-lg bg-secondary-dark border border-accent-purple/30 text-white focus:border-accent-purple focus:outline-none focus:ring-1 focus:ring-accent-purple transition-all"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-text-dark">Your Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="john@example.com"
                              className="w-full p-3 rounded-lg bg-secondary-dark border border-accent-purple/30 text-white focus:border-accent-purple focus:outline-none focus:ring-1 focus:ring-accent-purple transition-all"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-text-dark">Subject</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Project Inquiry"
                            className="w-full p-3 rounded-lg bg-secondary-dark border border-accent-purple/30 text-white focus:border-accent-purple focus:outline-none focus:ring-1 focus:ring-accent-purple transition-all"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-text-dark">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell me about your project..."
                            rows={5}
                            className="w-full p-3 rounded-lg bg-secondary-dark border border-accent-purple/30 text-white focus:border-accent-purple focus:outline-none focus:ring-1 focus:ring-accent-purple transition-all resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-accent-purple to-accent-pink text-white font-semibold hover:shadow-neon-pink transition-all"
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i> Sending...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane mr-2"></i> Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div 
            className="lg:w-2/5"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeIn('left', 0.3)}
          >
            <div className="glassmorphism rounded-2xl p-8 h-full">
              <h3 className="text-xl font-heading font-semibold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-accent-purple/20 flex items-center justify-center">
                    <i className="fas fa-envelope text-accent-purple"></i>
                  </div>
                  <div>
                    <h5 className="font-medium text-white">Email</h5>
                    <p className="text-text-dark">john@example.com</p>
                    <a href="mailto:john@example.com" className="text-accent-purple text-sm hover:underline">Send an email</a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-accent-pink/20 flex items-center justify-center">
                    <i className="fas fa-map-marker-alt text-accent-pink"></i>
                  </div>
                  <div>
                    <h5 className="font-medium text-white">Location</h5>
                    <p className="text-text-dark">San Francisco, California</p>
                    <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-accent-pink text-sm hover:underline">View on map</a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-accent-blue/20 flex items-center justify-center">
                    <i className="fas fa-briefcase text-accent-blue"></i>
                  </div>
                  <div>
                    <h5 className="font-medium text-white">Work Availability</h5>
                    <p className="text-text-dark">Open for freelance projects and full-time opportunities</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-white/10">
                <h4 className="font-medium text-white mb-4">Connect With Me</h4>
                <div className="flex space-x-4">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="h-12 w-12 rounded-full bg-accent-purple/20 flex items-center justify-center text-accent-purple hover:bg-accent-purple hover:text-white transition-all">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="h-12 w-12 rounded-full bg-accent-pink/20 flex items-center justify-center text-accent-pink hover:bg-accent-pink hover:text-white transition-all">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="h-12 w-12 rounded-full bg-accent-blue/20 flex items-center justify-center text-accent-blue hover:bg-accent-blue hover:text-white transition-all">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="h-12 w-12 rounded-full bg-accent-purple/20 flex items-center justify-center text-accent-purple hover:bg-accent-purple hover:text-white transition-all">
                    <i className="fab fa-dribbble"></i>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
