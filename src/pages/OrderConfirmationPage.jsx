import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Calendar, Truck, Mail, Phone, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderDetails = location.state?.orderDetails;
  
  // Generate random order number (alphanumeric)
  const orderNumber = React.useMemo(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'TR-';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }, []);
  
  // Calculate estimated delivery date (5-7 days from now)
  const estimatedDelivery = React.useMemo(() => {
    const today = new Date();
    
    // Min delivery date (today + 5 days)
    const minDeliveryDate = new Date(today);
    minDeliveryDate.setDate(today.getDate() + 5);
    
    // Max delivery date (today + 7 days)
    const maxDeliveryDate = new Date(today);
    maxDeliveryDate.setDate(today.getDate() + 7);
    
    // Format dates
    const formatDate = (date) => {
      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    };
    
    return {
      minDate: formatDate(minDeliveryDate),
      maxDate: formatDate(maxDeliveryDate),
      today: formatDate(today)
    };
  }, []);
  
  // Redirect to home if no order details (prevents direct access)
  useEffect(() => {
    if (!orderDetails && !location.state?.fromPayment) {
      navigate('/');
    }
  }, [orderDetails, navigate, location.state]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-12 md:py-16 min-h-[calc(100vh-280px)]"
    >
      <Card className="max-w-3xl mx-auto bg-amber-50/70 backdrop-blur-md shadow-xl border-amber-600/30">
        <CardHeader className="text-center border-b border-amber-200 pb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Check className="h-10 w-10 text-green-600" />
          </motion.div>
          <CardTitle className="text-3xl md:text-4xl font-bold text-amber-800 mb-2">
            Order Confirmed!
          </CardTitle>
          <p className="text-stone-700 text-lg">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
        </CardHeader>
        
        <CardContent className="pt-6 space-y-6">
          {/* Order Information */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-amber-200">
            <h3 className="text-xl font-semibold text-amber-800 mb-4 flex items-center">
              <span className="bg-amber-100 p-2 rounded-full mr-3">
                <AlertCircle className="h-5 w-5 text-amber-600" />
              </span>
              Order Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-stone-700">
              <div>
                <p className="text-sm text-stone-500">Order Number:</p>
                <p className="font-medium">{orderNumber}</p>
              </div>
              <div>
                <p className="text-sm text-stone-500">Order Date:</p>
                <p className="font-medium">{estimatedDelivery.today}</p>
              </div>
              <div>
                <p className="text-sm text-stone-500">Payment Status:</p>
                <p className="font-medium text-green-600">Paid</p>
              </div>
              <div>
                <p className="text-sm text-stone-500">Payment Method:</p>
                <p className="font-medium">Razorpay</p>
              </div>
            </div>
          </div>
          
          {/* Delivery Information */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-amber-200">
            <h3 className="text-xl font-semibold text-amber-800 mb-4 flex items-center">
              <span className="bg-amber-100 p-2 rounded-full mr-3">
                <Truck className="h-5 w-5 text-amber-600" />
              </span>
              Delivery Information
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-amber-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-stone-700">Estimated Delivery:</p>
                  <p className="text-stone-600">{estimatedDelivery.minDate} - {estimatedDelivery.maxDate}</p>
                </div>
              </div>
              
              {orderDetails && orderDetails.shippingInfo && (
                <div className="flex items-start">
                  <Truck className="h-5 w-5 text-amber-600 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-stone-700">Shipping Address:</p>
                    <p className="text-stone-600">
                      {orderDetails.shippingInfo.address}, {orderDetails.shippingInfo.city}, {orderDetails.shippingInfo.state} - {orderDetails.shippingInfo.pincode}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-amber-200">
            <h3 className="text-xl font-semibold text-amber-800 mb-4">Have Questions?</h3>
            <p className="text-stone-600 mb-4">If you have any questions about your order, please contact us:</p>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-amber-600 mr-3" />
                <a href="mailto:info@tasterider.in" className="text-amber-700 hover:text-amber-800 transition-colors">
                  info@tasterider.in
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-amber-600 mr-3" />
                <a href="tel:+919997539999" className="text-amber-700 hover:text-amber-800 transition-colors">
                  +91 9997539999
                </a>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center pt-4">
            <Link to="/">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white font-semibold">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default OrderConfirmationPage;