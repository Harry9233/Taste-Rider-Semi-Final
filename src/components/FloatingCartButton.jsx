import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const FloatingCartButton = ({ cartItemCount }) => {
  // Don't render if cart is empty
  if (cartItemCount <= 0) {
    return null;
  }

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-30"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <Link to="/cart">
        <Button
          className="bg-amber-500 hover:bg-amber-600 text-white rounded-full shadow-lg flex items-center gap-2 px-4 py-6"
          size="lg"
        >
          <ShoppingCart className="h-5 w-5" />
          <span>View Cart ({cartItemCount})</span>
        </Button>
      </Link>
    </motion.div>
  );
};

export default FloatingCartButton;