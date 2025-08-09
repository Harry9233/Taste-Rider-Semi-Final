import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronLeft, ChevronRight, Star, Award, ShoppingBag, Users, ThumbsUp, Check, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const testimonials = [
  {
    name: "Deepa Patel",
    title: "Professional Chef, Mumbai",
    image: "https://images.pexels.com/photos/3764014/pexels-photo-3764014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    quote: "After switching to Taste Rider's Premium Garam Masala, customer satisfaction at my restaurant increased by 27%. The depth of flavor is unmatched in the market - I've tried 8 different brands and nothing compares.",
    rating: 5,
    product: "Premium Garam Masala",
    verified: true,
    purchaseCount: 12,
    date: "2 months ago"
  },
  {
    name: "Vikram Singh",
    title: "Culinary Instructor, Delhi",
    image: "https://images.pexels.com/photos/775032/pexels-photo-775032.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    quote: "I recommend Taste Rider's Organic Kashmiri Saffron to all 200+ students in my cooking classes. The vibrant color and authentic aroma elevate every dish. My students report 90% better results compared to supermarket alternatives.",
    rating: 5,
    product: "Organic Kashmiri Saffron",
    verified: true,
    purchaseCount: 24,
    date: "1 month ago"
  },
  {
    name: "Sunita Rao",
    title: "Award-Winning Home Chef, Bangalore",
    image: "https://images.pexels.com/photos/5947033/pexels-photo-5947033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    quote: "I've been cooking for 35+ years, and Taste Rider's Sambar Masala is the closest I've found to my mother's recipe. The freshness is evident - my family can taste the difference immediately. I'm now a loyal monthly subscriber.",
    rating: 5,
    product: "Authentic Sambar Masala",
    verified: true,
    purchaseCount: 18,
    date: "2 weeks ago"
  },
  {
    name: "Rajiv Mehta",
    title: "Food Blogger & Influencer, Chennai",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    quote: "My followers constantly ask about the secret to my vibrant curries. The answer is simple: Taste Rider's spices. The freshness and purity make an incredible difference that even my viewers can see through their screens!",
    rating: 5,
    product: "Signature Curry Blend",
    verified: true,
    purchaseCount: 30,
    date: "3 days ago"
  },
];

// Testimonial stats for social proof
const testimonialStats = {
  totalReviews: 10842,
  averageRating: 4.8,
  fiveStarPercentage: 92,
  repeatCustomers: 78
};

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    setAutoplay(false); // Pause autoplay when user interacts
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setAutoplay(false); // Pause autoplay when user interacts
  };
  
  useEffect(() => {
    let timer;
    if (autoplay) {
      timer = setTimeout(handleNext, 7000);
    }
    return () => clearTimeout(timer);
  }, [currentIndex, autoplay]);


  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-amber-50 to-amber-100/70">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-800 mb-3 text-shadow-md">
            Trusted by 2000 Culinary Enthusiasts
          </h2>
          <p className="text-lg text-stone-700 max-w-2xl mx-auto">
            See why professional chefs and home cooks alike choose our premium spices for their most important dishes
          </p>
          
          {/* Review Stats Bar */}
          <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-amber-700">{testimonialStats.totalReviews.toLocaleString()}+</div>
                <div className="text-sm text-stone-600">Verified Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-amber-700 flex items-center justify-center">
                  {testimonialStats.averageRating}
                  <Star className="h-5 w-5 ml-1 text-yellow-500 fill-yellow-500" />
                </div>
                <div className="text-sm text-stone-600">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-amber-700">{testimonialStats.fiveStarPercentage}%</div>
                <div className="text-sm text-stone-600">5-Star Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-amber-700">{testimonialStats.repeatCustomers}%</div>
                <div className="text-sm text-stone-600">Repeat Customers</div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <div className="relative max-w-2xl lg:max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full"
            >
              <Card className="bg-white/90 backdrop-blur-md shadow-xl border-amber-300/50 p-6 md:p-8 lg:p-10 rounded-xl">
                <CardContent className="text-center">
                  <div className="flex justify-center items-center gap-2 mb-2">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                      <Award className="h-3 w-3 mr-1" /> Verified Purchase
                    </span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                      <Calendar className="h-3 w-3 mr-1" /> {testimonials[currentIndex].date}
                    </span>
                  </div>
                  <Avatar className="h-20 w-20 md:h-24 md:w-24 mx-auto mb-4 md:mb-6 border-4 border-amber-400 shadow-md">
                    <AvatarImage src={testimonials[currentIndex].image} alt={testimonials[currentIndex].name} />
                    <AvatarFallback className="text-amber-700 bg-amber-200 text-2xl md:text-3xl">
                      {testimonials[currentIndex].name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-lg md:text-xl lg:text-2xl text-stone-700 italic mb-4 md:mb-6 leading-relaxed" style={{ fontFamily: "'Lato', sans-serif"}}>
                    "{testimonials[currentIndex].quote}"
                  </p>
                  <div className="flex justify-center mb-3 md:mb-4">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 md:h-6 md:w-6 text-yellow-500 fill-yellow-500" />
                    ))}
                    {[...Array(5 - testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 md:h-6 md:w-6 text-yellow-300" />
                    ))}
                  </div>
                  <h4 className="text-xl md:text-2xl font-semibold text-amber-700">{testimonials[currentIndex].name}</h4>
                  <p className="text-sm md:text-base text-stone-500 mb-3">{testimonials[currentIndex].title}</p>
                  <div className="flex items-center justify-center text-sm text-amber-600 mb-4">
                    <ShoppingBag className="h-4 w-4 mr-1" />
                    <span>Purchased {testimonials[currentIndex].product} {testimonials[currentIndex].purchaseCount}+ times</span>
                  </div>
                  
                  {/* Product Link */}
                  <Link 
                    to="/product-categories"
                    className="inline-block bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors duration-300"
                  >
                    Shop {testimonials[currentIndex].product} Now
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handlePrev} 
            className="absolute left-0 sm:-left-10 top-1/2 -translate-y-1/2 z-10 text-amber-600 hover:bg-amber-200/70 p-2 md:p-3"
          >
            <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleNext} 
            className="absolute right-0 sm:-right-10 top-1/2 -translate-y-1/2 z-10 text-amber-600 hover:bg-amber-200/70 p-2 md:p-3"
          >
            <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
          </Button>
        </div>
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setAutoplay(false);
              }}
              className={`h-2.5 w-2.5 md:h-3 md:w-3 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'bg-amber-500 scale-125' : 'bg-amber-300 hover:bg-amber-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Social Proof and CTA */}
        <div className="mt-16 text-center">
          <div className="flex items-center justify-center mb-6">
            <Users className="h-5 w-5 text-amber-600 mr-2" />
            <p className="text-amber-700 font-medium">Join thousands of satisfied customers who've transformed their cooking</p>
          </div>
          
          <Link to="/product-categories">
            <Button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <ThumbsUp className="mr-2 h-5 w-5" />
              Discover Our Top-Rated Products
            </Button>
          </Link>
          
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <span className="bg-amber-100 text-amber-800 text-xs font-medium px-3 py-1 rounded-full flex items-center">
              <Check className="h-3 w-3 mr-1" /> Premium Quality
            </span>
            <span className="bg-amber-100 text-amber-800 text-xs font-medium px-3 py-1 rounded-full flex items-center">
              <Check className="h-3 w-3 mr-1" /> Authentic Flavors
            </span>
            <span className="bg-amber-100 text-amber-800 text-xs font-medium px-3 py-1 rounded-full flex items-center">
              <Check className="h-3 w-3 mr-1" /> 30-Day Guarantee
            </span>
            {/* Removed free shipping badge */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;