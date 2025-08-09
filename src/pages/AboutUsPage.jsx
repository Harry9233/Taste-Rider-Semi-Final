import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Leaf, Star, Users, ShoppingBag, Award, Shield, Clock, Check, MapPin, Heart, TrendingUp, Truck } from 'lucide-react';

const spices = [
  {
    name: "Sun-dried Turmeric",
    origin: "India",
    flavor: "Earthy, warm, slightly bitter",
    uses: "Curries, golden milk, health elixirs",
    image: "/images/Sun-dried Turmeric.jpg", // Updated to correct image
    benefits: ["Anti-inflammatory", "Antioxidant-rich", "Supports immunity"],
    bestseller: false // Changed to false to remove bestseller tag
  },
  {
    name: "Smoked Paprika",
    origin: "Spain",
    flavor: "Rich, smoky, sweet",
    uses: "Stews, meats, veggies, paella",
    image: "/images/Smoked Paprika.jpg", // Updated to correct image
    benefits: ["Rich in vitamins", "Natural color enhancer", "Flavor amplifier"],
    bestseller: false
  },
  {
    name: "Organic Cinnamon",
    origin: "Sri Lanka",
    flavor: "Sweet, woody, spicy",
    uses: "Baking, desserts, spiced drinks",
    image: "/images/Organic Cinnamon.jpg", // Updated to correct image
    benefits: ["Blood sugar regulation", "Anti-bacterial", "Heart health"],
    bestseller: false // Changed to false to remove bestseller tag
  },
];

const testimonials = [
  { 
    name: "Anya D.", 
    title: "Professional Chef", 
    quote: "The aroma hit me before I even opened the jar. After 15 years in professional kitchens, I can confidently say these are the freshest spices I've ever used.", 
    rating: 5,
    verified: true,
    product: "Premium Spice Collection",
    date: "March 15, 2023"
  },
  { 
    name: "Sam K.", 
    title: "Home Cook", 
    quote: "Never going back to store-bought spices again. These are game-changers. My family constantly asks what I've changed in my recipes - it's just these incredible spices!", 
    rating: 5,
    verified: true,
    product: "Signature Curry Blend",
    date: "January 8, 2023"
  },
  { 
    name: "Carla F.", 
    title: "Food Blogger", 
    quote: "Fast delivery, beautiful packaging, and flavors that explode in your dishes. My blog readers have noticed the difference in my recipe photos since I switched to Taste Rider.", 
    rating: 5,
    verified: true,
    product: "Exotic Spice Sampler",
    date: "February 22, 2023"
  },
];

// Company stats for trust building
const companyStats = [
  { icon: <Users className="h-8 w-8 text-amber-600" />, value: "2000", label: "Happy Customers" },
  { icon: <MapPin className="h-8 w-8 text-amber-600" />, value: "12+", label: "Source Regions" },
  { icon: <TrendingUp className="h-8 w-8 text-amber-600" />, value: "98%", label: "Satisfaction Rate" },
  { icon: <Truck className="h-8 w-8 text-amber-600" />, value: "48hr", label: "Express Delivery" }
];

// Animation variants
const fadeDown = {
  initial: { opacity: 0, y: -40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};
const fadeUpStagger = {
  animate: { transition: { staggerChildren: 0.18 } },
};
const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const fadeInLeft = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.75, ease: "easeOut" } },
};
const fadeScale = {
  initial: { opacity: 0, scale: 0.94 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
};

const AboutUsPage = () => {
  return (
    <div className="bg-amber-50/30 text-stone-800 overflow-x-hidden">
      {/* Animated Hero Section */}
      <motion.section
        className="bg-gradient-to-br from-amber-500 to-orange-600 text-white text-center py-16 md:py-24"
        variants={fadeDown}
        initial="initial"
        animate="animate"
      >
        <div className="container mx-auto px-4">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            variants={fadeDown}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.15 }}
          >
            Our Flavorful Journey
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-3xl mx-auto mb-8"
            variants={fadeDown}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.3 }}
          >
            Since 2015, we've been on a mission to transform everyday cooking into extraordinary culinary experiences through ethically sourced, premium spices from around the world.
          </motion.p>
          
          {/* Trust badges */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 mt-8 mb-4"
            variants={fadeDown}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Shield className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">100% Certified Organic</span>
            </div>
            <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Award className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Award-Winning Quality</span>
            </div>
            <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Truck className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Fast Delivery</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Company Stats Section */}
      <motion.section 
        className="py-12 bg-white"
        variants={fadeScale}
        initial="initial"
        animate="animate"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {companyStats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="flex flex-col items-center"
                variants={fadeScale}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.1 * index }}
              >
                {stat.icon}
                <p className="text-3xl font-bold text-amber-700 mt-2">{stat.value}</p>
                <p className="text-stone-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Animated Products Section */}
      <motion.section className="py-12 md:py-20"
        variants={fadeUpStagger}
        initial="initial"
        animate="animate"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center text-amber-700 mb-6"
            variants={fadeInLeft}
            initial="initial"
            animate="animate"
          >
            <Leaf className="inline-block w-10 h-10 mr-3 text-green-600" /> Our Products: Essence of Nature
          </motion.h2>
          
          <motion.p 
            className="text-center text-lg text-stone-600 max-w-3xl mx-auto mb-12"
            variants={fadeInLeft}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.1 }}
          >
            Each spice in our collection is carefully selected, ethically sourced, and rigorously tested to ensure you receive only the finest quality for your culinary creations.
          </motion.p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {spices.map((spice, i) => (
              <motion.div
                key={spice.name}
                className="bg-white/90 shadow-xl rounded-xl border-amber-300 h-full relative pt-6 pb-5 px-5 flex flex-col items-center"
                variants={fadeUp}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.18 + i * 0.17 }}
              >
                {spice.bestseller && (
                  <div className="absolute top-3 right-3 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    BESTSELLER
                  </div>
                )}
                <img
                  src={spice.image}
                  alt={spice.name}
                  className="w-24 h-24 object-cover rounded-full shadow-xl mb-4"
                  style={{
                    border: '3px solid #F59E42',
                    background: 'radial-gradient(circle, #fde68a22 0%, #fff 70%)'
                  }}
                />
                <h3 className="text-amber-700 text-lg md:text-xl font-bold mb-1">{spice.name}</h3>
                <p className="text-amber-600 font-semibold text-xs tracking-widest uppercase mb-3">{spice.origin}</p>
                <p className="text-stone-700 text-sm mb-2"><span className="font-bold">Flavor:</span> {spice.flavor}</p>
                <p className="text-stone-700 text-sm mb-3"><span className="font-bold">Best Uses:</span> {spice.uses}</p>
                
                <div className="mt-2 mb-4 w-full">
                  <p className="text-stone-700 text-sm font-semibold mb-2">Health Benefits:</p>
                  <ul className="space-y-1">
                    {spice.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start text-sm text-stone-600">
                        <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Shop Now button removed */}
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button asChild className="bg-amber-600 hover:bg-amber-700 text-white">
              <Link to="/products">
                View All Products
              </Link>
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Our Story Section */}
      <motion.section className="py-12 md:py-20 bg-stone-100"
        variants={fadeInLeft}
        initial="initial"
        animate="animate"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <motion.div 
              className="md:w-1/2"
              variants={fadeInLeft}
              initial="initial"
              animate="animate"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-amber-700 mb-6">Our Commitment to Excellence</h2>
              <p className="text-stone-700 mb-4">Founded by a team of passionate culinary experts, Taste Rider began with a simple mission: to bring the authentic flavors of the world's finest spice regions directly to your kitchen.</p>
              <p className="text-stone-700 mb-4">We partner directly with small-scale farmers across 12+ regions worldwide, ensuring fair compensation while preserving traditional farming methods that have been perfected over generations.</p>
              <p className="text-stone-700 mb-6">Every batch undergoes our rigorous triple-verification process, testing for purity, potency, and flavor profile before being carefully packaged to preserve freshness.</p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-amber-600 mr-2" />
                  <span className="text-stone-700">Ethically Sourced</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-amber-600 mr-2" />
                  <span className="text-stone-700">Lab Tested</span>
                </div>
                <div className="flex items-center">
                  <Heart className="h-5 w-5 text-amber-600 mr-2" />
                  <span className="text-stone-700">Sustainably Packaged</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2"
              variants={fadeScale}
              initial="initial"
              animate="animate"
            >
              <img 
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80" 
                alt="Spice farmers harvesting" 
                className="rounded-lg shadow-xl w-full"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Animated Testimonials Section */}
      <motion.section className="bg-amber-100/60 py-12 md:py-20"
        variants={fadeInLeft}
        initial="initial"
        animate="animate"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center text-amber-700 mb-4"
            variants={fadeInLeft}
            initial="initial"
            animate="animate"
          >
            <Star className="inline-block w-10 h-10 mr-3 text-yellow-500 fill-yellow-500" /> Loved by Thousands
          </motion.h2>
          
          <motion.p 
            className="text-center text-lg text-stone-600 max-w-3xl mx-auto mb-12"
            variants={fadeInLeft}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.1 }}
          >
            Join over 2000 satisfied customers who have transformed their cooking with our premium spices
          </motion.p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white/90 backdrop-blur-sm shadow-lg p-6 text-center h-full border-amber-300 rounded-xl flex flex-col items-center"
                variants={fadeUp}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.13 + index * 0.15 }}
              >
                {testimonial.verified && (
                  <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center mb-3">
                    <Check className="h-3 w-3 mr-1" /> Verified Purchase
                  </div>
                )}
                <p className="text-stone-600 italic mb-4 text-lg">"{testimonial.quote}"</p>
                <div className="flex justify-center mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="font-semibold text-amber-700">{testimonial.name}</p>
                <p className="text-sm text-stone-500 mb-2">{testimonial.title}</p>
                
                {/* Product information */}
                <div className="bg-amber-50 rounded-md px-3 py-2 w-full text-left mt-1">
                  <p className="text-xs text-amber-800">
                    <span className="font-semibold">Product:</span> {testimonial.product}
                  </p>
                  <p className="text-xs text-amber-800">
                    <span className="font-semibold">Date:</span> {testimonial.date}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button asChild className="bg-amber-600 hover:bg-amber-700 text-white">
              <Link to="/testimonials">
                Read More Reviews
              </Link>
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Animated CTA Section */}
      <motion.section className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-12 md:py-20"
        variants={fadeScale}
        initial="initial"
        animate="animate"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            variants={fadeScale}
            initial="initial"
            animate="animate"
          >
            Join the Flavor Revolution Today!
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
            variants={fadeScale}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.12 }}
          >
            Experience the difference that premium, ethically-sourced spices can make in your cooking. New customers enjoy 10% off their first order!
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            variants={fadeScale}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.21 }}
          >
            <Button size="lg" asChild className="bg-white text-amber-700 hover:bg-amber-50 font-bold py-3 px-8 text-lg">
              <Link to="/products">
                <ShoppingBag className="mr-2 h-6 w-6" /> Shop Now
              </Link>
            </Button>
            <Button size="lg" asChild variant="outline" className="border-white text-orange-500 hover:bg-white/10 font-bold py-3 px-8 text-lg">
              <Link to="/contact">
                Contact Us
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutUsPage;