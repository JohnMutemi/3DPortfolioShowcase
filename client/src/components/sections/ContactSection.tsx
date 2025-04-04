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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Define form schema with validation
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  company: z.string().min(2, { message: 'Company name must be at least 2 characters' }),
  inquiryType: z.string().min(1, { message: 'Please select an inquiry type' }),
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
      company: '',
      inquiryType: '',
      message: '',
    },
  });
  
  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      
      // Send data to the server
      await apiRequest<any>('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      
      // If success, display success message and reset form
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your interest. Our team will contact you within 1-2 business days.",
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
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-600 rounded-full filter blur-3xl opacity-10 animate-pulse-slow"></div>
      
      <div className="w-full max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn('up', 0.2)}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            <span className="bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">Contact Us</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full mx-auto mt-4"></div>
          <p className="text-text-dark text-lg mt-6 max-w-2xl mx-auto">
            Ready to transform your business with custom technology solutions? Let's start a conversation about your needs.
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
              <h3 className="text-xl font-heading font-semibold mb-6">Business Inquiry Form</h3>
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
                              placeholder="Jane Smith"
                              className="w-full p-3 rounded-lg bg-secondary-dark border border-purple-600/30 text-white focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600 transition-all"
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
                          <FormLabel className="text-text-dark">Business Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="jane@company.com"
                              className="w-full p-3 rounded-lg bg-secondary-dark border border-purple-600/30 text-white focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600 transition-all"
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
                    name="company"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-text-dark">Company Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Acme Corporation"
                            className="w-full p-3 rounded-lg bg-secondary-dark border border-purple-600/30 text-white focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600 transition-all"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="inquiryType"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-text-dark">Inquiry Type</FormLabel>
                        <FormControl>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full p-3 rounded-lg bg-secondary-dark border border-purple-600/30 text-white focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600 transition-all">
                              <SelectValue placeholder="Select the type of inquiry" />
                            </SelectTrigger>
                            <SelectContent className="bg-secondary-dark border border-purple-600/30">
                              <SelectItem value="web-development">Web Application Development</SelectItem>
                              <SelectItem value="iot-solutions">IoT Solutions</SelectItem>
                              <SelectItem value="ai-implementation">AI Implementation</SelectItem>
                              <SelectItem value="business-automation">Business Process Automation</SelectItem>
                              <SelectItem value="consultation">Technical Consultation</SelectItem>
                              <SelectItem value="other">Other Services</SelectItem>
                            </SelectContent>
                          </Select>
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
                        <FormLabel className="text-text-dark">Project Details</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your business needs and how we can help..."
                            rows={5}
                            className="w-full p-3 rounded-lg bg-secondary-dark border border-purple-600/30 text-white focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600 transition-all resize-none"
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
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold hover:shadow-neon transition-all"
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i> Sending...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane mr-2"></i> Submit Inquiry
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
              <h3 className="text-xl font-heading font-semibold mb-6">Company Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-purple-600/20 flex items-center justify-center">
                    <i className="fas fa-envelope text-purple-500"></i>
                  </div>
                  <div>
                    <h5 className="font-medium text-white">Email</h5>
                    <p className="text-text-dark">info@nexustech.solutions</p>
                    <a href="mailto:info@nexustech.solutions" className="text-purple-500 text-sm hover:underline">Send an email</a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-600/20 flex items-center justify-center">
                    <i className="fas fa-phone-alt text-blue-500"></i>
                  </div>
                  <div>
                    <h5 className="font-medium text-white">Phone</h5>
                    <p className="text-text-dark">+1 (555) 234-5678</p>
                    <p className="text-text-dark text-sm">Mon-Fri: 9am - 6pm PT</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-purple-600/20 flex items-center justify-center">
                    <i className="fas fa-map-marker-alt text-purple-500"></i>
                  </div>
                  <div>
                    <h5 className="font-medium text-white">Headquarters</h5>
                    <p className="text-text-dark">101 Innovation Drive</p>
                    <p className="text-text-dark">San Francisco, CA 94105</p>
                    <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-purple-500 text-sm hover:underline">View on map</a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-600/20 flex items-center justify-center">
                    <i className="fas fa-clock text-blue-500"></i>
                  </div>
                  <div>
                    <h5 className="font-medium text-white">Response Time</h5>
                    <p className="text-text-dark">We typically respond to inquiries within 1-2 business days</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-white/10">
                <h4 className="font-medium text-white mb-4">Connect With Us</h4>
                <div className="flex space-x-4">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="h-12 w-12 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-500 hover:bg-purple-600 hover:text-white transition-all">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="h-12 w-12 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500 hover:bg-blue-600 hover:text-white transition-all">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="h-12 w-12 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-500 hover:bg-purple-600 hover:text-white transition-all">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="h-12 w-12 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500 hover:bg-blue-600 hover:text-white transition-all">
                    <i className="fab fa-facebook"></i>
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
