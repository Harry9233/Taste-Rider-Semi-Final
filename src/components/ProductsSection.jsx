import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, ArrowRight, Weight, Plus, Minus, Clock, Award, Shield, Star, Users, TrendingUp, Check, ThumbsUp, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { useToast } from "@/components/ui/use-toast";

const ProductCard = ({ product, onAddToCart, delay, cartItems = [], onUpdateQuantity }) => {
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  const [btnBounce, setBtnBounce] = useState(false);
  const [timeLeft, setTimeLeft] = useState(Math.floor(Math.random() * 24) + 1); // Random hours for urgency
  const [showRecentPurchase, setShowRecentPurchase] = useState(false);
  
  // Simulate recent purchases notification
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance to show notification
        setShowRecentPurchase(true);
        setTimeout(() => setShowRecentPurchase(false), 5000);
      }
    }, 30000); // Check every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const itemInCart = cartItems.find(item => item.id === product.id);
    if (itemInCart) {
      setQuantity(itemInCart.quantity);
    } else {
      setQuantity(1);
    }
  }, [product, cartItems]);

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    if (onUpdateQuantity && cartItems.find(item => item.id === product.id)) {
      onUpdateQuantity(product.id, newQuantity);
    }
  };

  const handleDecrement = () => {
    const newQuantity = Math.max(1, quantity - 1);
    setQuantity(newQuantity);
    if (onUpdateQuantity && cartItems.find(item => item.id === product.id)) {
      onUpdateQuantity(product.id, newQuantity);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
      if (onUpdateQuantity && cartItems.find(item => item.id === product.id)) {
        onUpdateQuantity(product.id, value);
      }
    } else if (e.target.value === '') {
      setQuantity('');
    }
  };
  
  const handleAddToCartClick = () => {
    const currentQuantity = (typeof quantity === 'number' && quantity > 0) ? quantity : 1;
    const itemInCart = cartItems.find(item => item.id === product.id);

    if (itemInCart) {
      if (itemInCart.quantity !== currentQuantity) {
        onUpdateQuantity(product.id, currentQuantity);
        toast({
          title: `🛒 ${product.name} Quantity Updated!`,
          description: `Quantity set to ${currentQuantity} in your cart.`,
          duration: 2000,
          className: "toast-info-theme",
        });
      }
    } else {
      onAddToCart(product, currentQuantity);
    }
  };

  const triggerBounce = () => {
    setBtnBounce(true);
    setTimeout(() => setBtnBounce(false), 350);
  };

  const itemInCart = cartItems.find(item => item.id === product.id);
  
  // Calculate discount percentage if applicable
  const tags = Array.isArray(product.tags) ? product.tags : (product.tags || "").split(',').map(tag => tag.trim()).filter(tag => tag);
  const hasDiscount = tags.some(tag => tag.includes("OFF"));
  const discountTag = hasDiscount ? tags.find(tag => tag.includes("OFF")) : null;
  const discountPercentage = discountTag ? parseInt(discountTag.match(/\d+/)[0]) : 0;
  const originalPrice = hasDiscount ? (product.price / (1 - discountPercentage/100)).toFixed(2) : null;
  
  // Generate random stock level for urgency
  const lowStock = product.stock < 10 || (product.tags && product.tags.includes("Best Seller"));
  const stockLevel = lowStock ? Math.floor(Math.random() * 9) + 1 : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0px 15px 25px -5px rgba(160, 82, 45, 0.2), 0px 8px 10px -6px rgba(160, 82, 45, 0.15)"
      }}
      className="flex flex-col overflow-hidden group relative"
    >
      {/* Recent Purchase Notification */}
      <AnimatedNotification show={showRecentPurchase} />
      
      <Card className="bg-amber-50/60 backdrop-blur-sm shadow-lg border-amber-600/20 h-full flex flex-col">
        <CardHeader className="p-0 relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {tags && tags.length > 0 && (
            <div className="absolute top-2 left-2 flex flex-col space-y-1.5">
              {tags.map(tag => (
                <span
                  key={tag}
                  className={`text-xs md:text-sm font-semibold px-2.5 py-1 rounded-full shadow
                    ${
                      tag.includes("OFF") ? 'bg-red-500 text-white'
                      : tag === "Best Seller" ? 'bg-yellow-400 text-stone-800'
                      : 'bg-green-500 text-white'
                    }
                    ${/(organic|new\s*arrival|arrival)/i.test(tag) ? 'animate-pulse bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 text-stone-900 shadow-lg' : ''}
                  `}
                  style={
                    /(organic|new\s*arrival|arrival)/i.test(tag)
                      ? { boxShadow: '0 0 8px 2px #f6ae2d90, 0 0 2px 2px #fff4' }
                      : {}
                  }
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {/* Limited Time Offer Badge */}
          {hasDiscount && (
            <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-lg flex items-center animate-pulse">
              <Clock className="h-3 w-3 mr-1" />
              <span>Limited Time: {timeLeft}h left</span>
            </div>
          )}
          
          {/* Trending Now Badge */}
          {tags.includes("Best Seller") && (
            <div className="absolute bottom-2 right-2 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded-lg flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>Trending Now</span>
            </div>
          )}
        </CardHeader>
        <CardContent className="p-3 sm:p-4 md:p-5 flex-grow">
          <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold text-amber-800 mb-1.5 sm:mb-2 truncate" title={product.name}>{product.name}</CardTitle>
          
          {/* Enhanced Product Description */}
          <p className="text-sm sm:text-base text-stone-600 mb-2 sm:mb-3 overflow-hidden" style={{ fontFamily: "'Lato', sans-serif"}}>
            {product.description}
          </p>
          
          {/* Product Details */}
          <div className="mb-2 text-xs text-stone-700">
            {product.origin && (
              <div className="mb-1"><span className="font-semibold">Origin:</span> {product.origin}</div>
            )}
            {product.ingredients && (
              <div className="mb-1"><span className="font-semibold">Ingredients:</span> {product.ingredients}</div>
            )}
            {product.usage && (
              <div className="mb-1"><span className="font-semibold">Usage:</span> {product.usage}</div>
            )}
          </div>
          
          {/* Product Benefits */}
          <div className="mb-3 flex flex-wrap gap-1">
            {product.category === "Spices" && (
              <span className="text-xs bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded flex items-center">
                <Award className="h-3 w-3 mr-0.5" /> Premium Quality
              </span>
            )}
            {product.category === "Dry Fruits" && (
              <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded flex items-center">
                <Shield className="h-3 w-3 mr-0.5" /> 100% Natural
              </span>
            )}
            {/* Only show Top Rated for certain products */}
            {tags.includes("Best Seller") && (
              <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded flex items-center">
                <Star className="h-3 w-3 mr-0.5" /> Top Rated
              </span>
            )}
            <span className="text-xs bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded flex items-center">
              <Check className="h-3 w-3 mr-0.5" /> Verified
            </span>
          </div>
          
          {/* Low Stock Warning */}
          {lowStock && (
            <div className="mb-3 text-xs text-red-600 font-semibold flex items-center">
              <span className="inline-block w-2 h-2 bg-red-600 rounded-full mr-1.5 animate-pulse"></span>
              Only {stockLevel} left in stock - order soon!
            </div>
          )}
          
          {/* Price Section with Original Price if Discounted */}
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="text-base sm:text-lg md:text-xl font-bold text-amber-700">₹{product.price.toFixed(2)}</p>
              {hasDiscount && (
                <p className="text-xs text-gray-500 line-through">₹{originalPrice}</p>
              )}
            </div>
            {product.weight && (
              <div className="flex items-center text-xs sm:text-sm text-stone-500 bg-stone-200/70 px-2 py-1 rounded-md">
                <Weight size={14} className="mr-1 text-stone-600" />
                <span>{product.weight}</span>
              </div>
            )}
          </div>
          
          {/* Removed Free Shipping Badge */}
          
          {/* Quantity Selector */}
          <div className="flex items-center space-x-2 mb-3">
            <Button variant="outline" size="icon" onClick={handleDecrement} className="h-8 w-8 border-amber-600 text-amber-700 hover:bg-amber-100">
              <Minus size={16} />
            </Button>
            <Input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              className="h-8 w-16 text-center border-amber-600 focus:border-amber-700"
              min="1"
            />
            <Button variant="outline" size="icon" onClick={handleIncrement} className="h-8 w-8 border-amber-600 text-amber-700 hover:bg-amber-100">
              <Plus size={16} />
            </Button>
          </div>
        </CardContent>
        <CardFooter className="p-3 sm:p-4 md:p-5">
          <motion.div
            animate={btnBounce ? { scale: [1, 1.08, 0.96, 1] } : { scale: 1 }}
            transition={{ duration: 0.35, times: [0, 0.3, 0.8, 1], ease: "easeInOut" }}
            className="w-full"
          >
            <Button
              onClick={(e) => {
                handleAddToCartClick(e);
                triggerBounce();
              }}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white text-sm sm:text-base py-2.5 md:py-3 font-bold tracking-wide shadow-lg transform transition-all duration-200 hover:translate-y-[-2px]"
              style={{ fontFamily: "'Lato', sans-serif", letterSpacing: '0.05em' }}
            >
              <ShoppingCart className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              {itemInCart ? 'Update Cart' : hasDiscount ? 'Add to Cart - Save Now!' : 'Add to Cart'}
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

// Animated notification component for recent purchases
const AnimatedNotification = ({ show }) => {
  if (!show) return null;
  
  const randomNames = [
    "Priya S.", "Rahul M.", "Ananya K.", "Vikram P.", "Meera J.", 
    "Arjun T.", "Divya R.", "Karthik S.", "Neha G.", "Rohan D."
  ];
  
  const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
  const minutesAgo = Math.floor(Math.random() * 30) + 1;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20, x: -5 }}
      animate={{ opacity: 1, y: 0, x: -5 }}
      exit={{ opacity: 0, y: -20, x: -5 }}
      className="absolute -top-12 left-0 z-40 bg-white rounded-lg shadow-lg p-2 w-full max-w-[250px] border-l-4 border-green-500"
    >
      <div className="flex items-center">
        <div className="bg-green-100 rounded-full p-1.5 mr-2">
          <ThumbsUp className="h-3 w-3 text-green-600" />
        </div>
        <div className="text-xs">
          <p className="font-semibold text-gray-800">{randomName} purchased this</p>
          <p className="text-gray-500">{minutesAgo} minutes ago</p>
        </div>
      </div>
    </motion.div>
  );
};

const ProductsSection = ({ title, products, onAddToCart, gridCols = "md:grid-cols-3 lg:grid-cols-4", showViewAll = true, cartItems, onUpdateQuantity, linkToDetail = false }) => {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      {/* Social Proof Banner */}
      <div className="bg-amber-100 rounded-lg p-3 mb-8 flex items-center justify-center text-amber-800 text-sm">
        <Users className="h-4 w-4 mr-2" />
        <span className="font-medium">2000 customers trust our products</span>
        <span className="mx-2 text-amber-400">•</span>
        <Star className="h-4 w-4 mr-1 text-amber-500" />
        <span className="font-medium">4.8/5 average rating</span>
      </div>
      
      <div className="flex justify-between items-center mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-800 text-shadow-md">{title}</h2>
        {showViewAll && (
          <Link to="/product-categories">
            <Button variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-100 hover:text-amber-800 text-sm md:text-base px-4 py-2 md:px-6 md:py-2.5">
              View All Products <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </Link>
        )}
      </div>
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols} gap-4 md:gap-6 lg:gap-8`}>
        {products.map((product, index) => (
          linkToDetail ? (
            <Link key={product.id} to={`/product/${product.id}`}>
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
                delay={index * 0.1}
                cartItems={cartItems}
                onUpdateQuantity={onUpdateQuantity}
              />
            </Link>
          ) : (
            <div key={product.id}>
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
                delay={index * 0.1}
                cartItems={cartItems}
                onUpdateQuantity={onUpdateQuantity}
              />
            </div>
          )
        ))}
      </div>
      
      {/* Satisfaction Guarantee */}
      <div className="mt-12 bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
        <h3 className="text-xl font-bold text-amber-800 mb-2">100% Satisfaction Guarantee</h3>
        <p className="text-amber-700 text-sm">Not completely satisfied? Return within 7 days for a full refund.</p>
      </div>
    </div>
  );
};

export default ProductsSection;
