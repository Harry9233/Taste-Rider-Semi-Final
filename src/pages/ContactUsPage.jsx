import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send, Clock, Shield, Award, CheckCircle, MessageSquare, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea'; 
import { useToast } from "@/components/ui/use-toast";
// Remove supabase import and add EmailJS
import emailjs from '@emailjs/browser';

const ContactUsPage = ({ companyName, brandName }) => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useRef(); // Add form reference for EmailJS
  
  // Predefined subject options for better user experience
  const subjectOptions = [
    "Product Inquiry",
    "Order Status",
    "Bulk Order Request",
    "Feedback",
    "Partnership Opportunity",
    "Other"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Replace Supabase function with EmailJS
    emailjs.sendForm(
      'service_id', // Replace with your EmailJS service ID
      'template_id', // Replace with your EmailJS template ID
      form.current,
      'public_key' // Replace with your EmailJS public key
    )
      .then((result) => {
        console.log('Email sent successfully:', result.text);
        setIsSubmitting(false);
        toast({
          title: "📬 Message Sent Successfully!",
          description: "Thank you for your message! Our team will contact you shortly.",
          duration: 7000,
          className: "toast-success-theme",
        });
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        setIsSubmitting(false);
        toast({
          title: "🚫 Error Sending Message",
          description: "Could not send your message. Please try again. If the problem persists, contact support.",
          variant: "destructive",
          duration: 7000,
          className: "toast-destructive-theme",
        });
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-12 md:py-20 min-h-[calc(100vh-280px)]"
    >
      {/* Trust Badges */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <div className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
          <Clock className="h-5 w-5 text-amber-600 mr-2" />
          <span className="text-sm font-medium text-stone-700">4-Hour Response Time</span>
        </div>
        <div className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
          <Shield className="h-5 w-5 text-amber-600 mr-2" />
          <span className="text-sm font-medium text-stone-700">100% Secure Communication</span>
        </div>
        <div className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
          <Award className="h-5 w-5 text-amber-600 mr-2" />
          <span className="text-sm font-medium text-stone-700">Award-Winning Customer Service</span>
        </div>
      </div>
      
      <Card className="bg-amber-50/70 backdrop-blur-md shadow-2xl border-amber-600/30">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-800">
            Get In <span className="text-amber-600">Touch with {companyName}</span>
          </CardTitle>
          <p className="text-stone-700 mt-2 text-lg" style={{ fontFamily: "'Lato', sans-serif"}}>
            We'd love to hear from you! Whether you have a question about our {brandName} products, an order, or just want to say hello.
          </p>
          <div className="flex justify-center mt-4">
            <div className="flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-md">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Typically replies within 4 hours</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 p-6 md:p-10">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1" 
          >
            <h3 className="text-2xl font-semibold text-amber-700 mb-6">Send Us A Message</h3>
            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-stone-700 font-medium">Full Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} name="user_name" type="text" id="name" placeholder="Your Name" required className="mt-1 bg-amber-50/80 border-amber-600/40 focus:border-amber-600 focus:ring-amber-600" />
              </div>
              <div>
                <Label htmlFor="email" className="text-stone-700 font-medium">Email Address</Label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} name="user_email" type="email" id="email" placeholder="your.email@example.com" required className="mt-1 bg-amber-50/80 border-amber-600/40 focus:border-amber-600 focus:ring-amber-600" />
              </div>
              <div>
                <Label htmlFor="subject" className="text-stone-700 font-medium">Subject</Label>
                <select 
                  value={subject} 
                  onChange={(e) => setSubject(e.target.value)} 
                  name="subject" 
                  id="subject" 
                  required 
                  className="w-full mt-1 bg-amber-50/80 border-amber-600/40 focus:border-amber-600 focus:ring-amber-600 rounded-md py-2 px-3"
                >
                  <option value="" disabled>Select a subject</option>
                  {subjectOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="message" className="text-stone-700 font-medium">Message</Label>
                <Textarea value={message} onChange={(e) => setMessage(e.target.value)} name="message" id="message" placeholder="Write your message here..." rows={5} required className="mt-1 bg-amber-50/80 border-amber-600/40 focus:border-amber-600 focus:ring-amber-600" />
              </div>
              {/* Add a hidden field for the recipient email */}
              <input type="hidden" name="to_email" value="info@tasterider.in" />
              <div className="flex items-center mb-4">
                <input type="checkbox" id="privacy" required className="mr-2" />
                <label htmlFor="privacy" className="text-sm text-stone-600">I agree to the <a href="/privacy-policy" className="text-amber-600 hover:underline">Privacy Policy</a> and consent to being contacted regarding my inquiry.</label>
              </div>
              <Button type="submit" size="lg" className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold flex items-center justify-center" style={{ fontFamily: "'Lato', sans-serif", letterSpacing: '0.05em' }} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    ></motion.div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" /> Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="order-2" 
          >
            <h3 className="text-2xl font-semibold text-amber-700 mb-6">Contact Information ({companyName})</h3>
            <div className="space-y-5">
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-amber-600 mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold text-stone-800">Email Us ({brandName})</h4>
                  <a href="mailto:info@tasterider.in" className="text-stone-600 hover:text-amber-700 transition-colors" style={{ fontFamily: "'Lato', sans-serif"}}>info@tasterider.in</a>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="w-6 h-6 text-amber-600 mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold text-stone-800">Call Us</h4>
                  <a href="tel:+919997539999" className="text-stone-600 hover:text-amber-700 transition-colors" style={{ fontFamily: "'Lato', sans-serif"}}>+91 99975 39999</a>
                  <p className="text-xs text-stone-500 mt-1">Available Mon-Sat, 10AM-8PM</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-amber-600 mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold text-stone-800">Our Address ({companyName})</h4>
                  <p className="text-stone-600" style={{ fontFamily: "'Lato', sans-serif"}}>Shop No. 04/E-15/8 Prince Tower, Sanjay Place, Agra – 282002</p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h4 className="text-xl font-semibold text-amber-700 mb-3">Business Hours</h4>
              <p className="text-stone-600" style={{ fontFamily: "'Lato', sans-serif"}}>Monday - Saturday: 10:00 AM - 8:00 PM</p>
              <p className="text-stone-600" style={{ fontFamily: "'Lato', sans-serif"}}>Sunday: Closed</p>
            </div>
            
            {/* Social Proof */}
            <div className="mt-8 bg-white/50 p-4 rounded-lg border border-amber-200">
              <div className="flex items-center mb-3">
                <MessageSquare className="w-5 h-5 text-amber-600 mr-2" />
                <h4 className="text-lg font-semibold text-amber-700">What Our Customers Say</h4>
              </div>
              <div className="flex items-center mb-2">
                <Users className="w-5 h-5 text-amber-600 mr-2" />
                <p className="text-sm text-stone-600">2000 satisfied customers</p>
              </div>
              <div className="bg-amber-50 p-3 rounded border-l-4 border-amber-500 mt-3">
                <p className="text-sm italic text-stone-600">"The team responded to my inquiry within hours and resolved my issue immediately. Exceptional service!"</p>
                <p className="text-xs font-semibold text-amber-700 mt-1">- Priya S., Delhi</p>
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ContactUsPage;