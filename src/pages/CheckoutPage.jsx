import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from 'react-router-dom';
import { Check, CreditCard, Shield, Clock, Truck, Award, ChevronRight, AlertCircle, MapPin, Mail, ArrowLeft, ArrowRight, Info, Lock, AlertTriangle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { indianStates, indianCities, isValidPinCode, isValidPhoneNumber } from "@/lib/indianStatesAndCities";

const CheckoutPage = ({ cartItems, onUpdateQuantity, onRemoveFromCart }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  // Removed free shipping threshold
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  
  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    saveInfo: true
  });
  
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    nameOnCard: '',
    expiryDate: '',
    cvv: ''
  });
  
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
  const qualifiesForFreeShipping = false; // Always false since free shipping is removed
  const total = subtotal + shipping; // - discount removed

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    // Validate shipping info
    if (!shippingInfo.fullName || !shippingInfo.email || !shippingInfo.phone || 
        !shippingInfo.address || !shippingInfo.city || !shippingInfo.state || !shippingInfo.pincode) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(shippingInfo.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    // Validate phone number
    if (!isValidPhoneNumber(shippingInfo.phone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit Indian mobile number.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    // Validate PIN code
    if (!isValidPinCode(shippingInfo.pincode)) {
      toast({
        title: "Invalid PIN Code",
        description: "Please enter a valid 6-digit Indian PIN code.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    // Move to payment step
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    
    // Validate payment method selection
    if (paymentMethod !== 'razorpay' && paymentMethod !== 'cod') {
      toast({
        title: "Payment Method Unavailable",
        description: "Please select a valid payment method to continue.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    // Move to review step
    setStep(3);
    window.scrollTo(0, 0);
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePlaceOrder = async () => {
    // If COD is selected, proceed directly to order confirmation
    if (paymentMethod === 'cod') {
      toast({
        title: "🎉 Order Placed Successfully!",
        description: "Thank you for your order. We'll send you a confirmation email shortly.",
        duration: 5000,
        className: "toast-success-theme",
      });
      
      // Redirect to order confirmation page with order details
      navigate('/order-confirmation', {
        state: {
          orderDetails: {
            amount: total,
            items: cartItems,
            shippingInfo: shippingInfo,
            paymentMethod: 'Cash on Delivery',
            fromPayment: true
          }
        }
      });
      return;
    }
    
    // For Razorpay, continue with existing code
    // Load Razorpay script
    const isRazorpayLoaded = await loadRazorpay();
    
    if (!isRazorpayLoaded) {
      toast({
        title: "Payment Error",
        description: "Could not load payment gateway. Please try again later.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    // Create order data
    const orderData = {
      amount: total * 100, // Razorpay expects amount in paise
      currency: "INR",
      receipt: `order_${Date.now()}`,
      notes: {
        shipping_address: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} - ${shippingInfo.pincode}`,
        customer_name: shippingInfo.fullName,
        customer_email: shippingInfo.email,
        customer_phone: shippingInfo.phone
      }
    };
    
    // Initialize Razorpay options
    // You'll need to replace 'YOUR_RAZORPAY_KEY_ID' with your actual Razorpay key
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // Enter your Razorpay Key ID here
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Bolt Spices",
      description: "Purchase from Bolt Spices",
      order_id: orderData.receipt, // This should ideally come from your backend
      handler: function (response) {
        // Handle successful payment
        toast({
          title: "🎉 Payment Successful!",
          description: "Thank you for your order. We'll send you a confirmation email shortly.",
          duration: 5000,
          className: "toast-success-theme",
        });
        
        // Redirect to order confirmation page with order details
        navigate('/order-confirmation', {
          state: {
            orderDetails: {
              amount: total,
              items: cartItems,
              shippingInfo: shippingInfo,
              paymentId: response.razorpay_payment_id,
              fromPayment: true
            }
          }
        });
      },
      prefill: {
        name: shippingInfo.fullName,
        email: shippingInfo.email,
        contact: shippingInfo.phone
      },
      notes: orderData.notes,
      theme: {
        color: "#d97706" // Amber-600 color
      }
    };
    
    // Create Razorpay instance and open payment modal
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const handleInputChange = (e, formType) => {
    const { name, value, type, checked } = e.target;
    
    if (formType === 'shipping') {
      // For phone number validation
      if (name === 'phone') {
        // Allow only numbers and limit to 10 digits
        const numericValue = value.replace(/\D/g, '');
        if (numericValue.length <= 10) {
          setShippingInfo(prev => ({
            ...prev,
            [name]: numericValue
          }));
        }
      }
      // For PIN code validation
      else if (name === 'pincode') {
        // Allow only numbers and limit to 6 digits
        const numericValue = value.replace(/\D/g, '');
        if (numericValue.length <= 6) {
          setShippingInfo(prev => ({
            ...prev,
            [name]: numericValue
          }));
        }
      }
      // For other fields
      else {
        setShippingInfo(prev => ({
          ...prev,
          [name]: type === 'checkbox' ? checked : value
        }));
      }
    } else if (formType === 'card') {
      setCardInfo(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  // Handle select change for dropdown fields
  const handleSelectChange = (value, fieldName) => {
    setShippingInfo(prev => ({
      ...prev,
      [fieldName]: value
    }));
    
    // Reset city when state changes
    if (fieldName === 'state') {
      setShippingInfo(prev => ({
        ...prev,
        city: ''
      }));
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-16 text-center min-h-[calc(100vh-320px)] flex flex-col justify-center items-center"
      >
        <AlertCircle className="w-20 h-20 md:w-24 md:h-24 text-amber-600 mb-6" />
        <h1 className="text-3xl md:text-4xl font-bold text-amber-700 mb-4">Your Cart is Empty</h1>
        <p className="text-lg md:text-xl text-stone-700 mb-8" style={{ fontFamily: "'Lato', sans-serif"}}>You need to add items to your cart before checkout.</p>
        <Link to="/product-categories">
          <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 md:py-4 md:px-8" style={{ fontFamily: "'Lato', sans-serif", letterSpacing: '0.05em' }}>
            Browse Products
          </Button>
        </Link>
      </motion.div>
    );
  }

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center">
        <div className={`rounded-full h-10 w-10 flex items-center justify-center ${step >= 1 ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
          1
        </div>
        <div className={`h-1 w-12 sm:w-24 ${step > 1 ? 'bg-amber-600' : 'bg-gray-200'}`}></div>
      </div>
      <div className="flex items-center">
        <div className={`rounded-full h-10 w-10 flex items-center justify-center ${step >= 2 ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
          2
        </div>
        <div className={`h-1 w-12 sm:w-24 ${step > 2 ? 'bg-amber-600' : 'bg-gray-200'}`}></div>
      </div>
      <div className="flex items-center">
        <div className={`rounded-full h-10 w-10 flex items-center justify-center ${step >= 3 ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
          3
        </div>
      </div>
    </div>
  );

  const renderShippingStep = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-amber-800">Shipping Information</CardTitle>
        <CardDescription>Enter your shipping details</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleShippingSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input 
                id="fullName" 
                name="fullName" 
                value={shippingInfo.fullName} 
                onChange={(e) => handleInputChange(e, 'shipping')} 
                placeholder="John Doe"
                className="border-amber-300 focus:border-amber-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                value={shippingInfo.email} 
                onChange={(e) => handleInputChange(e, 'shipping')} 
                placeholder="john@example.com"
                className="border-amber-300 focus:border-amber-500"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-500">+91</span>
              </div>
              <Input 
                id="phone" 
                name="phone" 
                value={shippingInfo.phone} 
                onChange={(e) => handleInputChange(e, 'shipping')} 
                placeholder="9876543210"
                className="border-amber-300 focus:border-amber-500 pl-12"
                maxLength={10}
              />
            </div>
            {shippingInfo.phone && !isValidPhoneNumber(shippingInfo.phone) && (
              <p className="text-xs text-red-500 flex items-center mt-1">
                <AlertTriangle className="h-3 w-3 mr-1" /> Enter a valid 10-digit mobile number
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Address *</Label>
            <Textarea 
              id="address" 
              name="address" 
              value={shippingInfo.address} 
              onChange={(e) => handleInputChange(e, 'shipping')} 
              placeholder="123 Main St, Apartment 4B"
              className="border-amber-300 focus:border-amber-500"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="state">State *</Label>
              <Select 
                value={shippingInfo.state} 
                onValueChange={(value) => handleSelectChange(value, 'state')}
              >
                <SelectTrigger id="state" className="border-amber-300 focus:border-amber-500">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {indianStates.map((state) => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {!shippingInfo.state && (
                <p className="text-xs text-amber-600 flex items-center mt-1">
                  <Info className="h-3 w-3 mr-1" /> Please select a state
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Select 
                value={shippingInfo.city} 
                onValueChange={(value) => handleSelectChange(value, 'city')}
                disabled={!shippingInfo.state}
              >
                <SelectTrigger id="city" className="border-amber-300 focus:border-amber-500">
                  <SelectValue placeholder={shippingInfo.state ? "Select city" : "Select state first"} />
                </SelectTrigger>
                <SelectContent>
                  {shippingInfo.state && indianCities[shippingInfo.state]?.map((city) => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {!shippingInfo.city && shippingInfo.state && (
                <p className="text-xs text-amber-600 flex items-center mt-1">
                  <Info className="h-3 w-3 mr-1" /> Please select a city
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="pincode">PIN Code *</Label>
              <Input 
                id="pincode" 
                name="pincode" 
                value={shippingInfo.pincode} 
                onChange={(e) => handleInputChange(e, 'shipping')} 
                placeholder="400001"
                className="border-amber-300 focus:border-amber-500"
                maxLength={6}
              />
              {shippingInfo.pincode && !isValidPinCode(shippingInfo.pincode) && (
                <p className="text-xs text-red-500 flex items-center mt-1">
                  <AlertTriangle className="h-3 w-3 mr-1" /> Enter a valid 6-digit PIN code
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2 pt-2">
            <input 
              type="checkbox" 
              id="saveInfo" 
              name="saveInfo" 
              checked={shippingInfo.saveInfo} 
              onChange={(e) => handleInputChange(e, 'shipping')} 
              className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
            />
            <Label htmlFor="saveInfo" className="text-sm font-normal">Save this information for next time</Label>
          </div>
          
          <div className="pt-4 flex justify-between">
            <Link to="/cart">
              <Button type="button" variant="outline" className="border-amber-600 text-amber-700">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cart
              </Button>
            </Link>
            <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white">
              Continue to Payment <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardContent>
    </motion.div>
  );

  const renderPaymentStep = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-amber-800">Payment Method</CardTitle>
        <CardDescription>Choose how you want to pay</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handlePaymentSubmit} className="space-y-6">
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
            {/* Cash on Delivery option enabled */}
            <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-amber-50 transition-colors">
              <RadioGroupItem value="cod" id="cod" />
              <Label htmlFor="cod" className="flex-grow cursor-pointer">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Cash on Delivery</p>
                    <p className="text-sm text-gray-500">Pay when you receive your order</p>
                  </div>
                  <div className="bg-amber-100 p-2 rounded-full">
                    <MapPin className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-amber-50 transition-colors">
              <RadioGroupItem value="razorpay" id="razorpay" />
              <Label htmlFor="razorpay" className="flex-grow cursor-pointer">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Pay with Razorpay</p>
                    <p className="text-sm text-gray-500">Credit/Debit Card, UPI, Netbanking & more</p>
                  </div>
                  <div className="bg-amber-100 p-2 rounded-full">
                    <CreditCard className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
              </Label>
            </div>
            {/* Direct UPI payment option removed */}
          </RadioGroup>
          
          {paymentMethod === 'razorpay' && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="space-y-4 border-t pt-4 mt-4"
            >
              <div className="flex flex-col items-center p-4 bg-amber-50 rounded-lg">
                <img 
                  src="https://razorpay.com/assets/razorpay-glyph.svg" 
                  alt="Razorpay" 
                  className="h-12 mb-3" 
                />
                <p className="text-center text-sm mb-2">You'll be redirected to Razorpay's secure payment page</p>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  <img src="/images/payment/credit-card.png" alt="Card" className="h-6" />
                  <img src="/images/payment/upi.png" alt="UPI" className="h-6" />
                  <img src="/images/payment/netbanking.png" alt="Netbanking" className="h-6" />
                  <img src="/images/payment/wallet.png" alt="Wallet" className="h-6" />
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-white rounded-lg text-sm border border-amber-200">
                <Lock className="h-4 w-4 text-amber-600 mr-2 flex-shrink-0" />
                <p className="text-amber-800">Your payment information is secure and encrypted with Razorpay</p>
              </div>
            </motion.div>
          )}
          
          <div className="pt-4 flex justify-between">
            <Button 
              type="button" 
              variant="outline" 
              className="border-amber-600 text-amber-700"
              onClick={() => setStep(1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shipping
            </Button>
            <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white">
              Review Order <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardContent>
    </motion.div>
  );

  const renderReviewStep = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-amber-800">Review Your Order</CardTitle>
        <CardDescription>Please verify all details before placing your order</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Shipping Information Summary */}
          <div className="bg-amber-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-amber-800">Shipping Information</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-amber-600 h-8 px-2"
                onClick={() => setStep(1)}
              >
                Edit
              </Button>
            </div>
            <div className="text-sm space-y-1 text-stone-700">
              {paymentMethod === 'razorpay' ? (
                <div className="flex items-center">
                  <CreditCard className="h-4 w-4 text-amber-600 mr-2" />
                  <p>Pay with Razorpay (Credit/Debit Card, UPI, Netbanking & more)</p>
                </div>
              ) : (
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-amber-600 mr-2" />
                  <p>Cash on Delivery (Pay when you receive your order)</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Payment Method Summary */}
          <div className="bg-amber-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-amber-800">Payment Method</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-amber-600 h-8 px-2"
                onClick={() => setStep(2)}
              >
                Edit
              </Button>
            </div>
            <div className="text-sm space-y-1 text-stone-700">
              <div className="flex items-center">
                <CreditCard className="h-4 w-4 text-amber-600 mr-2" />
                <p>Pay with Razorpay (Credit/Debit Card, UPI, Netbanking & more)</p>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <h3 className="font-semibold text-amber-800 mb-3">Order Summary</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md mr-3" />
                    <div>
                      <p className="font-medium text-stone-800">{item.name}</p>
                      <p className="text-xs text-stone-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-medium text-stone-800">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>₹{shipping.toFixed(2)}</span>
              </div>
              {/* Discount removed */}
              <Separator className="my-2" />
              <div className="flex justify-between font-bold text-base text-amber-800">
                <span>Total:</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="flex items-center bg-white p-3 rounded-lg border border-amber-100">
              <Shield className="h-5 w-5 text-amber-600 mr-2" />
              <span className="text-xs font-medium text-amber-800">Secure Checkout</span>
            </div>
            <div className="flex items-center bg-white p-3 rounded-lg border border-amber-100">
              <Truck className="h-5 w-5 text-amber-600 mr-2" />
              <span className="text-xs font-medium text-amber-800">Fast Delivery</span>
            </div>
          </div>
          
          <div className="pt-4 flex justify-between">
            <Button 
              type="button" 
              variant="outline" 
              className="border-amber-600 text-amber-700"
              onClick={() => setStep(2)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Payment
            </Button>
            <Button 
              onClick={handlePlaceOrder} 
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              Place Order <Check className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </motion.div>
  );

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
            <span>Your order is reserved for <strong>{formatTime(timeLeft)}</strong> - Complete checkout before items sell out!</span>
          </div>
        </motion.div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="bg-white shadow-md border-amber-200">
            {renderStepIndicator()}
            {step === 1 && renderShippingStep()}
            {step === 2 && renderPaymentStep()}
            {step === 3 && renderReviewStep()}
          </Card>
        </div>
        
        <div>
          <Card className="bg-amber-50/70 backdrop-blur-md shadow-md border-amber-200 sticky top-24">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold text-amber-800">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-60 overflow-y-auto pr-2 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center">
                      <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-md mr-2" />
                      <div>
                        <p className="font-medium text-sm text-stone-800">{item.name}</p>
                        <p className="text-xs text-stone-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium text-sm text-stone-800">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              
              {/* Coupon code section removed */}
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>₹{shipping.toFixed(2)}</span>
                </div>
                {/* Discount removed */}
                <Separator className="my-2" />
                <div className="flex justify-between font-bold text-base text-amber-800">
                  <span>Total:</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
              
              {/* Free Shipping Progress section removed */}
              
              {/* Trust Badges */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="flex flex-col items-center bg-white/80 p-2 rounded-lg">
                  <Shield className="h-4 w-4 text-amber-600 mb-1" />
                  <span className="text-[10px] text-center font-medium text-amber-800">Secure Payment</span>
                </div>
                <div className="flex flex-col items-center bg-white/80 p-2 rounded-lg">
                  <Award className="h-4 w-4 text-amber-600 mb-1" />
                  <span className="text-[10px] text-center font-medium text-amber-800">Quality Guarantee</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default CheckoutPage;