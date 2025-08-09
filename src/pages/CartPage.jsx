import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, CreditCard, Shield, Clock, Truck, Award, Gift, ChevronRight, AlertCircle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

// Sample recommended products for cross-selling
const recommendedProducts = [
  {
    id: 'rec1',
    name: 'Shikanji Masala',
    price: 80.00,
    image: '/images/Shikanji Masala.jpg',
  },
  {
    id: 'rec2',
    name: 'Sambar Masala',
    price: 90.00,
    image: '/images/Sambar Masala.jpg',
  },
  {
    id: 'rec3',
    name: 'Pav Bhaji Masala',
    price: 110.00,
    image: '/images/Pav Bhaji Masala.jpg',
  },
];

const CartPage = ({ cartItems, onUpdateQuantity, onRemoveFromCart, onAddToCart }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [timeLeft] = useState(15 * 60); // 15 minutes in seconds
  // Removed free shipping threshold
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  // Countdown timer for urgency
  useEffect(() => {
    if (timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = 50; // Fixed shipping cost
  const total = subtotal + shipping; // - discount removed
  
  // Removed free shipping qualification check

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-16 text-center min-h-[calc(100vh-320px)] flex flex-col justify-center items-center"
      >
        <ShoppingBag className="w-20 h-20 md:w-24 md:h-24 text-amber-600 mb-6" />
        <h1 className="text-3xl md:text-4xl font-bold text-amber-700 mb-4">Your Cart is Empty</h1>
        <p className="text-lg md:text-xl text-stone-700 mb-8" style={{ fontFamily: "'Lato', sans-serif"}}>Looks like you haven't added any products yet. Time to explore!</p>
        <Link to="/product-categories">
          <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 md:py-4 md:px-8" style={{ fontFamily: "'Lato', sans-serif", letterSpacing: '0.05em' }}>
            Discover Products
          </Button>
        </Link>
        
        {/* Recommended Products */}
        <div className="mt-16 w-full max-w-3xl">
          <h2 className="text-2xl font-bold text-amber-800 mb-6">Popular Products You Might Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {recommendedProducts.map(product => (
              <motion.div 
                key={product.id}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-amber-200"
              >
                <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-amber-800 mb-1">{product.name}</h3>
                  <p className="text-amber-700 font-bold mb-3">₹{product.price.toFixed(2)}</p>
                  <Button 
                    onClick={() => {
                      onAddToCart(product, 1);
                      toast({
                        title: "🛒 Added to Cart!",
                        description: `${product.name} has been added to your cart.`,
                        duration: 2000,
                        className: "toast-success-theme",
                      });
                    }}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white text-sm"
                  >
                    Add to Cart
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 md:py-12"
    >
      {/* Urgency Banner */}
      {timeLeft > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r flex items-center justify-between"
        >
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            <span>Your cart is reserved for <strong>{formatTime(timeLeft)}</strong> - Complete your purchase before items sell out!</span>
          </div>
          <Button 
            onClick={handleCheckout}
            className="bg-red-600 hover:bg-red-700 text-white text-sm"
          >
            Checkout Now
          </Button>
        </motion.div>
      )}
      
      <Card className="bg-amber-50/70 backdrop-blur-md shadow-2xl border-amber-600/30">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-800 text-center">Your Spice Cart</CardTitle>
        </CardHeader>
        <CardContent className="px-4 md:px-6">
          <div className="space-y-4 md:space-y-6">
            {cartItems.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex flex-col md:flex-row items-center justify-between p-3 md:p-4 bg-white/40 rounded-lg shadow-md border border-amber-600/20"
              >
                <div className="flex items-center mb-3 md:mb-0 flex-grow w-full md:w-auto">
                  <img src={item.image} alt={item.name} className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md mr-3 md:mr-4 border border-amber-600/30" />
                  <div className="flex-grow">
                    <h3 className="text-md md:text-lg font-semibold text-amber-800">{item.name}</h3>
                    <p className="text-xs md:text-sm text-stone-600" style={{ fontFamily: "'Lato', sans-serif"}}>₹{item.price.toFixed(2)} per unit</p>
                    {/* Add product badges if applicable */}
                    {item.tags && item.tags.includes("Best Seller") && (
                      <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded mt-1">
                        <Award className="inline h-3 w-3 mr-1" /> Bestseller
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 mt-3 md:mt-0 w-full md:w-auto justify-between md:justify-end">
                  <div className="flex items-center border border-amber-600/50 rounded-md">
                    <Button variant="ghost" size="icon" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="h-7 w-7 md:h-8 md:w-8 text-amber-700 hover:bg-amber-600/20">
                      <Minus size={14} />
                    </Button>
                    <span className="px-2 text-base md:text-lg font-medium text-stone-800">{item.quantity}</span>
                    <Button variant="ghost" size="icon" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="h-7 w-7 md:h-8 md:w-8 text-amber-700 hover:bg-amber-600/20">
                      <Plus size={14} />
                    </Button>
                  </div>
                  <p className="text-base md:text-lg font-semibold w-20 text-right text-stone-800">₹{(item.price * item.quantity).toFixed(2)}</p>
                  <Button variant="ghost" size="icon" onClick={() => onRemoveFromCart(item.id)} className="text-red-600 hover:text-red-500 hover:bg-red-500/10 h-8 w-8 md:h-9 md:w-9">
                    <Trash2 size={18} />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Removed Free Shipping Progress */}

          <Separator className="my-6 md:my-8 bg-amber-600/30" />

          <div className="space-y-2 md:space-y-3 text-base md:text-lg text-stone-700" style={{ fontFamily: "'Lato', sans-serif"}}>
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-semibold text-stone-800">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span className="font-semibold text-stone-800">
                ₹{shipping.toFixed(2)}
              </span>
            </div>
            <Separator className="my-2 md:my-3 bg-amber-600/30" />
            <div className="flex justify-between text-lg md:text-xl font-bold text-amber-800">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex flex-col items-center bg-white/50 p-3 rounded-lg">
              <Shield className="h-6 w-6 text-amber-600 mb-1" />
              <span className="text-xs text-center font-medium text-amber-800">Secure Checkout</span>
            </div>
            <div className="flex flex-col items-center bg-white/50 p-3 rounded-lg">
              <Truck className="h-6 w-6 text-amber-600 mb-1" />
              <span className="text-xs text-center font-medium text-amber-800">Fast Delivery</span>
            </div>
            <div className="flex flex-col items-center bg-white/50 p-3 rounded-lg">
              <Award className="h-6 w-6 text-amber-600 mb-1" />
              <span className="text-xs text-center font-medium text-amber-800">Premium Quality</span>
            </div>
            <div className="flex flex-col items-center bg-white/50 p-3 rounded-lg">
              <AlertCircle className="h-6 w-6 text-amber-600 mb-1" />
              <span className="text-xs text-center font-medium text-amber-800">24/7 Support</span>
            </div>
          </div>

          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
            <Link to="/product-categories">
              <Button variant="outline" className="w-full sm:w-auto border-amber-600 text-amber-700 hover:bg-amber-600/10 hover:text-amber-600 py-2 px-4 md:py-2.5 md:px-5" style={{ fontFamily: "'Lato', sans-serif", letterSpacing: '0.05em' }}>
                Continue Shopping
              </Button>
            </Link>
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white font-bold flex items-center py-2 px-4 md:py-2.5 md:px-5"
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
              style={{ fontFamily: "'Lato', sans-serif", letterSpacing: '0.05em' }}
            >
              <CreditCard className="mr-2 h-4 w-4 md:h-5 md:w-5" /> Proceed to Checkout
            </Button>
          </div>
        </CardContent>
      </Card>
      {/* You May Also Like Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-amber-800 mb-6 flex items-center">
          <Gift className="mr-2 h-5 w-5" /> You May Also Like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {recommendedProducts.map(product => (
            <motion.div 
              key={product.id}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-amber-200"
            >
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-amber-800 mb-1">{product.name}</h3>
                <p className="text-amber-700 font-bold mb-3">₹{product.price.toFixed(2)}</p>
                <Button 
                  onClick={() => {
                    onAddToCart(product, 1);
                    toast({
                      title: "🛒 Added to Cart!",
                      description: `${product.name} has been added to your cart.`,
                      duration: 2000,
                      className: "toast-success-theme",
                    });
                  }}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white text-sm"
                >
                  Add to Cart
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CartPage;