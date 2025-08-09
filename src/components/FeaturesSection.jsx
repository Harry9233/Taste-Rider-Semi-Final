import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, ShieldCheck, Truck, Award, Star, Users, Clock, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const featureItems = [
  {
    icon: <Leaf className="h-10 w-10 md:h-12 md:w-12 text-amber-600" />,
    title: "100% Certified Organic Ingredients",
    description: "Ethically sourced from premium farms across 12+ regions, ensuring maximum flavor potency and 0% artificial additives in every package.",
    stat: "100%",
    statLabel: "Organic"
  },
  {
    icon: <ShieldCheck className="h-10 w-10 md:h-12 md:w-12 text-amber-600" />,
    title: "Triple-Verified Quality Assurance",
    description: "Every batch undergoes 3-stage laboratory testing for purity, potency, and freshness, exceeding industry standards by 35%.",
    stat: "3-Stage",
    statLabel: "Testing"
  },
  {
    icon: <Truck className="h-10 w-10 md:h-12 md:w-12 text-amber-600" />,
    title: "Fast Delivery Everywhere",
    description: "Vacuum-sealed packaging preserves peak freshness during transit, with 99.8% on-time delivery across India and temperature-controlled shipping.",
    stat: "Fast",
    statLabel: "Delivery"
  },
  {
    icon: <Award className="h-10 w-10 md:h-12 md:w-12 text-amber-600" />,
    title: "4.9/5 Customer Satisfaction",
    description: "Join our community of 2000 satisfied customers who trust us for authentic flavors, backed by our 30-day freshness guarantee.",
    stat: "4.9/5",
    statLabel: "Rating"
  },
];

const testimonialSnippets = [
  { text: "The freshest spices I've ever used!", author: "Priya M." },
  { text: "Transformed my cooking overnight", author: "Rahul S." },
  { text: "Worth every rupee, authentic taste", author: "Ananya K." },
];

const FeaturesSection = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="py-12 md:py-20 bg-amber-50/40">
      <div className="container mx-auto px-4">
        {/* Testimonial Ticker */}
        <div className="bg-amber-600 text-white py-2 px-4 rounded-full max-w-4xl mx-auto mb-10 overflow-hidden">
          <div className="flex items-center justify-center">
            <Star className="h-5 w-5 text-amber-200 mr-2" fill="#fde68a" />
            <div className="overflow-hidden relative w-full max-w-2xl">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: "-100%" }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 15,
                  ease: "linear"
                }}
                className="whitespace-nowrap flex items-center gap-8"
              >
                {[...testimonialSnippets, ...testimonialSnippets].map((snippet, index) => (
                  <span key={index} className="inline-flex items-center">
                    <span className="font-medium mr-1">"{snippet.text}"</span>
                    <span className="text-amber-200">- {snippet.author}</span>
                    <span className="mx-4">•</span>
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
        
        <h2
          className="spice-trail-wipe text-amber-600 dark:text-amber-200 text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-wide text-center mb-0 md:mb-3 drop-shadow-[0_4px_24px_rgba(245,158,11,0.8)]"
          style={{ fontFamily: "'Great Vibes', cursive", fontWeight: 700, fontSize: "clamp(3.5rem, 8vw, 8rem)" }}
        >
          Why Choose <span className="text-amber-700 dark:text-white" style={{ fontFamily: "'Great Vibes', cursive" }}>Taste Rider?</span>
        </h2>
        
        <div className="flex justify-center items-center mb-6">
          <div className="flex items-center bg-amber-100 text-amber-800 px-4 py-2 rounded-full">
            <Users className="h-5 w-5 mr-2" />
            <span className="font-medium">Trusted by 2000 customers nationwide</span>
          </div>
        </div>
        
        <p className="text-center text-stone-700 max-w-3xl mx-auto mb-10 text-lg">
          Trusted by professional chefs and home cooking enthusiasts alike for our commitment to excellence in every aspect of our service.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-0">
          {featureItems.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible" 
              className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-amber-200/50 relative overflow-hidden"
            >
              {/* Feature Stat Badge */}
              <div className="absolute top-4 right-4 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                {feature.stat}
              </div>
              
              <div className="flex justify-center mb-4 md:mb-5">
                {feature.icon}
              </div>
              <motion.h3
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4, delay: 0.07 }}
                className="text-xl md:text-2xl font-semibold text-amber-700 text-center mb-2 md:mb-3"
              >
                {feature.title}
              </motion.h3>
              <p className="text-sm md:text-base text-stone-600 text-center leading-relaxed" style={{ fontFamily: "'Lato', sans-serif"}}>{feature.description}</p>
              
              {/* Feature Stat */}
              <div className="mt-4 pt-4 border-t border-amber-100 flex justify-center items-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600">{feature.stat}</div>
                  <div className="text-xs text-stone-500">{feature.statLabel}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-12 md:mt-16 text-center"
        >
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg max-w-2xl mx-auto border border-amber-200/50">
            <div className="flex justify-center mb-4">
              <ThumbsUp className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="text-2xl font-bold text-amber-700 mb-2">Experience the Taste Rider Difference Today!</h3>
            <p className="text-stone-600 mb-6">Join thousands of satisfied customers who have elevated their culinary creations with our premium spices.</p>
            <Link to="/products">
              <Button 
                size="lg" 
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 text-base rounded-lg shadow-xl transition-all transform hover:scale-105"
              >
                Shop Our Collection
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;