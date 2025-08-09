import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Typewriter from '@/components/ui/Typewriter';
import BallsTrail from './BallsTrail';
import { Star, Users, Clock, ShoppingBag, ArrowRight } from 'lucide-react';

const AuthenticFlavorsSection = ({ title, subtitle, ctaText, ctaLink }) => {
  const subtitleLines = Array.isArray(subtitle)
    ? subtitle
    : (typeof subtitle === "string" ? subtitle.split(/\n+/) : []);
  
  // Refs and intersection-based triggers
  const ctaRef = useRef(null);
  const inView = useInView(ctaRef, { margin: '-150px 0px -150px 0px', amount: 0.8 });
  const [showBalls, setShowBalls] = useState(false);

  useEffect(() => {
    // Show BallsTrail if user is within 150px above the button, disappears after
    if (!inView && ctaRef.current) {
      const rect = ctaRef.current.getBoundingClientRect();
      if (rect.top >= window.innerHeight - 180 && rect.top <= window.innerHeight - 30) {
        setShowBalls(true);
      } else {
        setShowBalls(false);
      }
    } else {
      setShowBalls(false);
    }
  }, [inView]);

  // Removed countdown timer for limited time offer

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-gradient-to-br from-amber-600 to-orange-600 text-white relative overflow-x-clip">
      <BallsTrail show={showBalls} />
      
      {/* Social Proof Banner - Completely empty now */}
      <div className="absolute top-0 left-0 right-0 bg-amber-800/70 backdrop-blur-sm py-2 px-4">
        <div className="container mx-auto flex flex-col xs:flex-row flex-wrap justify-center items-center gap-2 md:gap-8 text-xs sm:text-sm">
          {/* All social proof items removed */}
        </div>
      </div>
      
      <div className="container mx-auto px-4 text-center pt-6">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 md:mb-8 drop-shadow-[0_4px_24px_rgba(255,110,64,0.7)]"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900,
            fontSize: "clamp(2.7rem, 7vw, 6.5rem)",
            letterSpacing: "0.06em",
            color: "#fff",
            textShadow: "2px 2px 22px rgba(255,110,64,0.29), 0 3px 12px #1e1e1e88"
          }}
        >
          {title}
        </motion.h2>
        <div
          className="text-base xs:text-lg sm:text-xl md:text-2xl mb-8 md:mb-10 max-w-full sm:max-w-2xl md:max-w-3xl mx-auto px-2 sm:px-4 break-words flex flex-col items-center gap-1.5"
          style={{ fontFamily: "'Lato', sans-serif", textShadow: "1px 1px 4px rgba(0,0,0,0.2)", lineHeight: 1.45 }}
        >
          {subtitleLines.map((line, idx) =>
            <span
              key={idx}
              className="block w-full text-shadow-md"
            >
              {line.trim()}
            </span>
          )}
        </div>
        
        {/* Customer Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/10 backdrop-blur-sm p-4 rounded-lg max-w-md mx-auto mb-8"
        >
          <div className="flex justify-center mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="h-5 w-5 text-amber-300" fill="#fcd34d" />
            ))}
          </div>
          <p className="text-white/90 italic text-sm md:text-base mb-2">
            "These spices have completely transformed my cooking! The flavors are so authentic and vibrant - nothing like store-bought brands."
          </p>
          <p className="text-amber-200 font-medium text-sm">— Priya S., Delhi</p>
        </motion.div>
        
        {/* Limited Time Offer banner removed */}
        
        {ctaText && ctaLink && (
          <motion.div
            ref={ctaRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col items-center"
          >
            <Link to={ctaLink}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-stone-800 font-bold py-3 px-8 md:py-4 md:px-10 text-base md:text-lg lg:text-xl rounded-lg shadow-xl transition-all transform hover:scale-105 flex items-center"
                style={{ fontFamily: "'Lato', sans-serif", letterSpacing: '0.05em' }}
              >
                <ShoppingBag className="mr-2 h-5 w-5 md:h-6 md:w-6" />
                {ctaText} <ArrowRight className="ml-2 h-5 w-5 md:h-6 md:w-6" />
              </Button>
            </Link>
            {/* Removed free shipping message */}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default AuthenticFlavorsSection;