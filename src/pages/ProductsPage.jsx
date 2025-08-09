import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { ShoppingCart, ChevronLeft, Weight, Plus, Minus, Clock, Star, TrendingUp, Filter } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { signatureSpicesWithPics, chocolateProducts } from '@/lib/products';

const ProductCard = ({ product, onAddToCart, delay, cartItems = [], onUpdateQuantity }) => {
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

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
    if (cartItems.find(item => item.id === product.id)) {
      onUpdateQuantity(product.id, newQuantity);
    }
  };

  const handleDecrement = () => {
    const newQuantity = Math.max(1, quantity - 1);
    setQuantity(newQuantity);
    if (cartItems.find(item => item.id === product.id)) {
      onUpdateQuantity(product.id, newQuantity);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
      if (cartItems.find(item => item.id === product.id)) {
        onUpdateQuantity(product.id, value);
      }
    } else if (e.target.value === '') {
      setQuantity('');
    }
  };

  const handleAddToCartClick = () => {
    const currentQuantity = typeof quantity === 'number' && quantity > 0 ? quantity : 1;
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0px 15px 25px -5px rgba(160, 82, 45, 0.2), 0px 8px 10px -6px rgba(160, 82, 45, 0.15)"
      }}
      className="flex flex-col overflow-hidden group"
    >
      <Card className="bg-amber-50/60 backdrop-blur-sm shadow-lg border-amber-600/20 h-full flex flex-col">
        <CardHeader className="p-0 relative">
          <Link to={`/product/${product.id}`}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
          {product.tags && (
            <div className="absolute top-2 left-2 flex flex-col space-y-1 md:space-y-1.5">
              {Array.isArray(product.tags) ? product.tags.map(tag => (
                <span
                  key={tag}
                  className={`text-xs md:text-sm font-semibold px-2 py-0.5 md:px-2.5 md:py-1 rounded-full shadow
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
              )) : (
                <span
                  className={`text-xs md:text-sm font-semibold px-2 py-0.5 md:px-2.5 md:py-1 rounded-full shadow
                    ${
                      product.tags.includes("OFF") ? 'bg-red-500 text-white'
                      : product.tags === "Best Seller" ? 'bg-yellow-400 text-stone-800'
                      : 'bg-green-500 text-white'
                    }
                    ${/(organic|new\s*arrival|arrival)/i.test(product.tags) ? 'animate-pulse bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 text-stone-900 shadow-lg' : ''}
                  `}
                  style={
                    /(organic|new\s*arrival|arrival)/i.test(product.tags)
                      ? { boxShadow: '0 0 8px 2px #f6ae2d90, 0 0 2px 2px #fff4' }
                      : {}
                  }
                >
                  {product.tags}
                </span>
              )}
            </div>
          )}
          {/* Category Badge */}
          <div className="absolute bottom-2 left-2 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded-lg">
            {product.category}
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 md:p-5 flex-grow">
          <Link to={`/product/${product.id}`}>
            <CardTitle className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-amber-800 mb-1 sm:mb-1.5 md:mb-2 truncate hover:text-amber-600 transition-colors" title={product.name}>{product.name}</CardTitle>
          </Link>
          <p className="text-xs sm:text-sm md:text-base text-stone-600 mb-2 sm:mb-3 h-10 sm:h-12 md:h-14 overflow-hidden" style={{ fontFamily: "'Lato', sans-serif"}}>{product.description}</p>
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
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-amber-700">₹{product.price.toFixed(2)}</p>
            {product.weight && (
              <div className="flex items-center text-xs sm:text-sm text-stone-500 bg-stone-200/70 px-2 py-1 rounded-md">
                <Weight size={14} className="mr-1 text-stone-600" />
                <span>{product.weight}</span>
              </div>
            )}
          </div>
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
          <Button
            onClick={handleAddToCartClick}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm md:text-base py-2 md:py-2.5 lg:py-3"
            style={{ fontFamily: "'Lato', sans-serif", letterSpacing: '0.05em' }}
          >
            <ShoppingCart className="mr-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
            {cartItems.find(item => item.id === product.id) ? 'Update Cart' : 'Add to Cart'}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const ProductsPage = ({ onAddToCart, cartItems, onUpdateQuantity }) => {
  const navigate = useNavigate();
  const pageTitle = "Products";
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Combine all products
  const allProducts = [...signatureSpicesWithPics, ...chocolateProducts];
  
  // Get unique categories
  const categories = ['All', ...new Set(allProducts.map(product => product.category))];
  
  // Filter products based on category and search term
  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-2 sm:px-4 py-8 md:py-12 lg:py-16 min-h-[calc(100vh-280px)]"
    >
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 md:mb-10 lg:mb-12">
        <div className="flex items-center mb-4 sm:mb-0">
          <Button variant="ghost" size="icon" onClick={() => navigate('/product-categories')} className="mr-2 md:mr-3 text-amber-700 hover:bg-amber-100 p-2 md:p-2.5">
            <ChevronLeft className="h-6 w-6 md:h-7 md:w-7" />
          </Button>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-amber-800 text-shadow-md">{pageTitle}</h1>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          {/* Search input */}
          <div className="relative w-full sm:w-64 md:w-80">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-amber-600 focus:border-amber-700 pl-3 pr-10"
            />
            <button 
              onClick={() => setSearchTerm('')}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-700 ${!searchTerm && 'hidden'}`}
            >
              ×
            </button>
          </div>
          
          {/* Category filter */}
          <div className="relative w-full sm:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-auto appearance-none bg-amber-100 border border-amber-600 text-amber-800 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-amber-50 focus:border-amber-700"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-amber-700">
              <Filter className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
      
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl text-amber-800">No products found matching your criteria</h2>
          <p className="text-stone-600 mt-2">Try adjusting your search or filter settings</p>
          <Button 
            onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}
            className="mt-4 bg-amber-600 hover:bg-amber-700 text-white"
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              delay={index * 0.05}
              cartItems={cartItems}
              onUpdateQuantity={onUpdateQuantity}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ProductsPage;
