import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail, Award, Shield, Truck, Clock } from 'lucide-react';
import { useEffect, useRef } from 'react';

const Footer = ({ logoUrl, companyName }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (svgRef.current) {
        const scrollY = window.scrollY;
        const translateY = Math.min(scrollY * 0.03, 15); // Subtle parallax effect with max limit
        svgRef.current.style.transform = `translateY(${translateY}px) scale(1.05)`;
      }
    };

    // Initial transform to ensure visibility
    if (svgRef.current) {
      svgRef.current.style.transform = 'translateY(0) scale(1.05)';
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <footer className="relative text-center md:text-left text-amber-100/70 mt-24 overflow-visible">      
      <div className="relative overflow-visible">
        <div className="footer-wave-container w-full overflow-hidden relative -mb-1" style={{ height: '150px', boxShadow: '0 -10px 20px rgba(0,0,0,0.05)', zIndex: 10 }}>
          {/* SVG wave pattern with organic, flowing top border */}
          <svg
            ref={svgRef}
            className="w-full h-full transition-transform duration-300 ease-out block"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ borderRadius: '0', display: 'block' }}
          >
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
                <stop offset="20%" stopColor="#FFF8DC" stopOpacity="0.6" />
                <stop offset="40%" stopColor="#D2B48C" stopOpacity="0.8" />
                <stop offset="70%" stopColor="#8B7355" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#3B3429" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path
              d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,128C672,107,768,85,864,90.7C960,96,1056,128,1152,133.3C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              fill="url(#waveGradient)"
              className="transition-all duration-700 ease-in-out"
              filter="drop-shadow(0px -5px 5px rgba(0,0,0,0.1))"
              style={{ transformOrigin: 'center', opacity: 1 }}
            />
          </svg>
        </div>
        <div className="pt-16 pb-12 bg-[#3B3429] rounded-none" style={{ marginTop: '-2px', position: 'relative', zIndex: 5 }}>
          <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 md:col-span-1"
          >
            <img src={logoUrl} alt={`${companyName} Logo`} className="h-16 sm:h-20 mx-auto md:mx-0 mb-2" />
            <p className="text-amber-100/70 text-sm mb-4" style={{ fontFamily: "'Lato', sans-serif"}}>
              Ride the flavor with {companyName} – where every meal begins with nature's best.
            </p>
            <div className="flex justify-center md:justify-start space-x-4 mb-4">
              <a href="#" aria-label="Facebook" className="text-amber-100/70 hover:text-amber-300 transition-colors"><Facebook size={20} /></a>
              <a
                href="https://www.instagram.com/tasterider_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-100/70 hover:text-amber-300 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="text-amber-100/70 hover:text-amber-300 transition-colors"><Twitter size={20} /></a>
              <a href="#" aria-label="LinkedIn" className="text-amber-100/70 hover:text-amber-300 transition-colors"><Linkedin size={20} /></a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 md:col-span-1"
          >
            <h3 className="text-amber-100 font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-amber-100/70 hover:text-amber-300 transition-colors">Home</a></li>
              <li><a href="/about-us" className="text-amber-100/70 hover:text-amber-300 transition-colors">About Us</a></li>
              <li><a href="/products" className="text-amber-100/70 hover:text-amber-300 transition-colors">Shop</a></li>
              <li><a href="/contact" className="text-amber-100/70 hover:text-amber-300 transition-colors">Contact</a></li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4 md:col-span-1"
          >
            <h3 className="text-amber-100 font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center justify-center md:justify-start text-amber-100/70">
                <MapPin size={16} className="mr-2 flex-shrink-0" />
                <span>Shop No. 04/E-15/8 Prince Tower, Sanjay Place, Agra – 282002</span>
              </li>
              <li className="flex items-center justify-center md:justify-start text-amber-100/70">
                <Phone size={16} className="mr-2 flex-shrink-0" />
                <span>+91 99975 39999</span>
              </li>
              <li className="flex items-center justify-center md:justify-start text-amber-100/70">
                <Mail size={16} className="mr-2 flex-shrink-0" />
                <span>info@tasterider.in</span>
              </li>
              <li className="flex items-center justify-center md:justify-start text-amber-100/70">
                <Clock size={16} className="mr-2 flex-shrink-0" />
                <span>Mon-Sat: 10AM-8PM, Sunday: Closed</span>
              </li>
            </ul>
          </motion.div>

          {/* Trust Signals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-4 md:col-span-1"
          >
            <h3 className="text-amber-100 font-semibold text-lg mb-4">Our Guarantees</h3>
            <ul className="space-y-3">
              <li className="flex items-center justify-center md:justify-start text-amber-100/70">
                <Award size={16} className="mr-2 flex-shrink-0 text-amber-300" />
                <span>100% Certified Organic</span>
              </li>
              <li className="flex items-center justify-center md:justify-start text-amber-100/70">
                <Shield size={16} className="mr-2 flex-shrink-0 text-amber-300" />
                <span>Secure Payment Processing</span>
              </li>
              <li className="flex items-center justify-center md:justify-start text-amber-100/70">
                <Truck size={16} className="mr-2 flex-shrink-0 text-amber-300" />
                <span>Fast Delivery Guarantee</span>
              </li>
            </ul>
            <div className="mt-4 flex justify-center md:justify-start">
              
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 pt-6 border-t border-amber-100/20 text-center"
        >
          <p className="text-amber-100/60 text-xs" style={{ fontFamily: "'Lato', sans-serif"}}>
            &copy; {new Date().getFullYear()} {companyName}. All Rights Reserved. 
            <span className="mx-2">|</span>
            <a href="/privacy" className="hover:text-amber-300 transition-colors">Privacy Policy</a>
            <span className="mx-2">|</span>
            <a href="/terms" className="hover:text-amber-300 transition-colors">Terms & Conditions</a>
            <span className="mx-2">|</span>
            <a href="/refund" className="hover:text-amber-300 transition-colors">Refund Policy</a>
            <span className="mx-2">|</span>
            <a href="/shipping" className="hover:text-amber-300 transition-colors">Shipping Policy</a>
          </p>
        </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
