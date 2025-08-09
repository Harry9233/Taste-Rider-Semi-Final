import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search, AlertTriangle, ChevronLeft, PackageOpen, Weight, Plus, Minus, Clock, Leaf, Star, TrendingUp } from 'lucide-react';
import { Utensils } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

const ProductCard = ({ product, onAddToCart, delay, cartItems, onUpdateQuantity }) => {
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
              {(typeof product.tags === 'string' ? product.tags.split(',') : product.tags).map(tag => (
                <span
                  key={tag.trim()}
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
              ))}
            </div>
          )}
          
          {/* Limited Time Offer Badge */}
          {product.tags && (typeof product.tags === 'string' ? product.tags.includes("OFF") : product.tags.some(tag => tag.includes("OFF"))) && (
            <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-lg flex items-center animate-pulse">
              <Clock className="h-3 w-3 mr-1" />
              <span>Limited Time: {Math.floor(Math.random() * 24) + 1}h left</span>
            </div>
          )}
          
          {/* Trending Now Badge */}
          {product.tags && (typeof product.tags === 'string' ? product.tags.includes("Best Seller") : product.tags.includes("Best Seller")) && (
            <div className="absolute bottom-2 right-2 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded-lg flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>Trending Now</span>
            </div>
          )}
        </CardHeader>
        <CardContent className="p-3 sm:p-4 md:p-5 flex-grow">
          <Link to={`/product/${product.id}`}>
            <CardTitle className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-amber-800 mb-1 sm:mb-1.5 md:mb-2 truncate hover:text-amber-600 transition-colors" title={product.name}>{product.name}</CardTitle>
          </Link>
          <p className="text-xs sm:text-sm md:text-base text-stone-600 mb-2 sm:mb-3 h-10 sm:h-12 md:h-14 overflow-hidden" style={{ fontFamily: "'Lato', sans-serif"}}>{product.description}</p>
          
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

const DryFruitsPage = ({ products, onAddToCart, searchTerm, onSearchChange, cartItemCount, selectedCategory, cartItems, onUpdateQuantity }) => {
  const [internalSearchTerm, setInternalSearchTerm] = useState(searchTerm);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    setInternalSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleSearchInputChange = (e) => setInternalSearchTerm(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearchChange(internalSearchTerm);
  };

  const pageTitle = "Our Signature Dry Fruits";

  const filteredProducts = products.filter(p => p.category === 'Dry Fruits');

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
        <form onSubmit={handleSearchSubmit} className="w-full sm:w-auto max-w-xs sm:max-w-sm md:max-w-md flex items-center">
          <div className="relative w-full group">
            <Input
              type="search"
              placeholder="Search products..."
              value={internalSearchTerm}
              onChange={handleSearchInputChange}
              className="pl-10 pr-4 py-2 md:py-2.5 w-full bg-amber-50/80 border-amber-600/40 focus:border-amber-600 focus:ring-amber-600 text-sm md:text-base rounded-lg transition-all duration-300 ease-in-out max-w-xs focus:max-w-md outline-none shadow-sm focus:shadow-lg"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-amber-600 pointer-events-none" />
          </div>
          <Button type="submit" className="ml-2 bg-amber-600 hover:bg-amber-700 text-white text-sm md:text-base px-3 py-2 md:px-4 md:py-2.5 transition-all duration-200 ease-in-out">
            Search
          </Button>
        </form>
      </div>
      
      {filteredProducts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12 md:py-20"
        >
          <PackageOpen className="mx-auto h-16 w-16 md:h-20 md:w-20 text-amber-500 mb-4" />
          <h2 className="text-2xl md:text-3xl font-semibold text-amber-700 mb-2">No Products Found</h2>
          <p className="text-stone-600 mb-6 md:text-lg" style={{ fontFamily: "'Lato', sans-serif"}}>
            {searchTerm ? `Sorry, we couldn't find any products matching "${searchTerm}".` : "It seems this category is currently empty."}
          </p>
          <div className="space-x-4">
            <Button onClick={() => { onSearchChange(''); setInternalSearchTerm(''); }} variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-100 px-4 py-2 md:px-6 md:py-3 text-sm md:text-base">
              Clear Search
            </Button>
            <Link to="/product-categories">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 md:px-6 md:py-3 text-sm md:text-base">
                Explore Categories
              </Button>
            </Link>
          </div>
        </motion.div>
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
export default DryFruitsPage;
