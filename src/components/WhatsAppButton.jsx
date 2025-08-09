import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, PhoneCall } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const WhatsAppButton = ({ phoneNumber }) => {
  const { toast } = useToast();
  const [showPopup, setShowPopup] = useState(false);
  const whatsappLink = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=Hi! I'm interested in your products.`;

  // Close popup on outside click
  useEffect(() => {
    if (!showPopup) return;
    const handleClick = (e) => {
      if (!e.target.closest('.whatsapp-popup') && !e.target.closest('.whatsapp-btn')) {
        setShowPopup(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showPopup]);

  const handleButtonClick = () => {
    setShowPopup((prev) => !prev);
  };

  const handleChatClick = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    window.open(whatsappLink, '_blank');
    if (!isMobile) {
      navigator.clipboard.writeText(phoneNumber)
        .then(() => {
          toast({
            title: "📞 Phone Number Copied!",
            description: `${phoneNumber} copied to clipboard. We're ready to assist you!`,
            duration: 4000,
            className: "toast-success-theme",
          });
        })
        .catch(() => {
          toast({
            title: "⚠️ Oops!",
            description: "Could not copy phone number. Please try manually.",
            variant: "destructive",
            duration: 3000,
            className: "toast-destructive-theme",
          });
        });
    }
  };

  return (
    <>
      <motion.button
        onClick={handleButtonClick}
        className="whatsapp-btn fixed bottom-4 right-6 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white p-3.5 sm:p-4 rounded-full shadow-lg z-30 flex items-center justify-center transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle size={26} className="sm:h-7 sm:w-7" />
        <span className="sr-only">Contact us on WhatsApp</span>
      </motion.button>
      <AnimatePresence>
        {showPopup && (
          <motion.div 
            className="whatsapp-popup fixed bottom-20 right-6 bg-white rounded-lg shadow-xl p-4 z-30 max-w-xs w-[320px]"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            style={{ border: "1px solid #e5e7eb" }}
          >
            <div className="flex items-start mb-2">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <PhoneCall size={20} className="text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">Need help with your order?</h3>
                <p className="text-gray-700 text-sm mt-1">Get instant assistance!</p>
              </div>
              <button
                onClick={() => setShowPopup(false)}
                className="ml-auto text-gray-400 hover:text-gray-700"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            <p className="text-gray-700 text-sm mb-3">
              Our experts are available to help you select the perfect spices for your recipes.
            </p>
            <div className="bg-green-50 p-2 rounded text-sm text-green-800 mb-3 font-medium">
              <span className="font-bold">Response Time:</span> Usually within 40 minutes
            </div>
            <button 
              onClick={handleChatClick}
              className="w-full bg-green-500 hover:bg-green-600 text-white text-base py-2 px-3 rounded font-semibold transition-colors"
              style={{ boxShadow: "0 2px 8px 0 #22c55e33" }}
            >
              Chat with us now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WhatsAppButton;