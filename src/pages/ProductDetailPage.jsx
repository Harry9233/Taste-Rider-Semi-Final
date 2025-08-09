import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import apiClient from '@/lib/apiClient';
import {
  ShoppingCart,
  ChevronLeft,
  Star,
  Check,
  Shield,
  Award,
  Truck,
  Clock,
  Weight,
  Plus,
  Minus,
  Heart,
  Share2,
  Info,
  Leaf,
  ThumbsUp,
  Users
} from 'lucide-react';

const ProductDetailPage = ({ onAddToCart, cartItems, onUpdateQuantity }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isImageZoomed, setIsImageZoomed] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiClient.get(`/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast({
          title: "Product Not Found",
          description: "The product you're looking for doesn't exist.",
          variant: "destructive",
        });
        navigate('/products');
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await apiClient.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProduct();
    fetchProducts();
  }, [productId, navigate, toast]);

  // Set quantity if product is in cart
  useEffect(() => {
    const itemInCart = cartItems.find(item => item.id === Number(productId));
    if (itemInCart) {
      setQuantity(itemInCart.quantity);
    } else {
      setQuantity(1);
    }
  }, [productId, cartItems]);

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    const numericProductId = Number(productId);
    if (cartItems.find(item => item.id === numericProductId)) {
      onUpdateQuantity(numericProductId, newQuantity);
    }
  };

  const handleDecrement = () => {
    const newQuantity = Math.max(1, quantity - 1);
    setQuantity(newQuantity);
    const numericProductId = Number(productId);
    if (cartItems.find(item => item.id === numericProductId)) {
      onUpdateQuantity(numericProductId, newQuantity);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
      const numericProductId = Number(productId);
      if (cartItems.find(item => item.id === numericProductId)) {
        onUpdateQuantity(numericProductId, value);
      }
    }
  };

  const handleAddToCartClick = () => {
    if (!product) return;
    
    const currentQuantity = typeof quantity === 'number' && quantity > 0 ? quantity : 1;
    const itemInCart = cartItems.find(item => item.id === product.id);

    if (itemInCart) {
      if (itemInCart.quantity !== currentQuantity) {
        onUpdateQuantity(product.id, currentQuantity);
        toast({
          title: `🛒 ${product.name} Quantity Updated!`,
          description: `Cart updated with ${currentQuantity} item(s).`,
          className: "bg-green-600 border-green-700 text-white",
        });
      }
    } else {
      onAddToCart(product, currentQuantity);
    }
  };

  // Loading state or product not found
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 min-h-[60vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-spin mb-4 mx-auto">
            <Clock className="h-12 w-12 text-amber-600" />
          </div>
          <h2 className="text-2xl font-bold text-amber-700 mb-2">Loading Product...</h2>
          <p className="text-stone-600">Please wait while we fetch the product details.</p>
        </motion.div>
      </div>
    );
  }

  // Product benefits and features (example data - customize for each product)
  const benefits = [
    { title: "Rich Flavor", description: "Enhances the taste of your dishes with authentic flavor" },
    { title: "Premium Quality", description: "Sourced from the finest ingredients for exceptional quality" },
    { title: "Versatile Use", description: "Perfect for a variety of dishes and culinary applications" },
    { title: "Health Benefits", description: "Contains natural ingredients with potential health benefits" },
  ];

  // Usage suggestions (example data - customize for each product)
  const usageSuggestions = [
    "Add to curries and stews for enhanced flavor",
    "Sprinkle over roasted vegetables for a delicious twist",
    "Mix into marinades for meats and vegetables",
    "Use in soups to add depth and richness",
  ];

  // Nutritional information (example data - customize for each product)
  const nutritionalInfo = [
    { name: "Calories", value: "15 kcal per serving" },
    { name: "Protein", value: "0.5g" },
    { name: "Carbohydrates", value: "3g" },
    { name: "Fat", value: "0.2g" },
    { name: "Fiber", value: "1g" },
  ];

  // Related products (example - would need to be dynamically generated)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Use tags from mapping if available
  const tags = (product.tags || "").split(',').map(tag => tag.trim()).filter(tag => tag);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 md:py-12 lg:py-16"
    >
      {/* Back button and breadcrumbs */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center mb-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)} 
            className="mr-2 text-amber-700 hover:bg-amber-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <nav className="text-sm md:text-base text-stone-500">
            <Link to="/" className="hover:text-amber-600">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="hover:text-amber-600">Products</Link>
            <span className="mx-2">/</span>
            <Link to={`/products?category=${product.category}`} className="hover:text-amber-600">{product.category}</Link>
            <span className="mx-2">/</span>
            <span className="text-amber-700 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product details section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12">
        {/* Product image */}
        <motion.div 
          className="relative overflow-hidden rounded-xl shadow-lg border border-amber-200 bg-white"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div 
            className={`cursor-zoom-in transition-all duration-300 ${isImageZoomed ? 'scale-150' : 'scale-100'}`}
            onClick={() => setIsImageZoomed(!isImageZoomed)}
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto object-cover aspect-square"
            />
          </div>
          {tags.length > 0 && (
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {tags.map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="default"
                  className={`px-3 py-1.5 text-xs font-bold ${tag.includes('SALE') || tag.includes('OFF') ? 'bg-red-500 text-white' : 'bg-amber-500 text-white'}`}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </motion.div>

        {/* Product info */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-800 mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              ))}
            </div>
            <span className="ml-2 text-stone-600 text-sm">(120 reviews)</span>
          </div>
          
          <p className="text-xl md:text-2xl font-bold text-amber-700 mb-4">₹{product.price.toFixed(2)}</p>
          
          <p className="text-stone-700 mb-6 text-base md:text-lg">{product.description}</p>
          
          {/* Weight information */}
          {product.weight && (
            <div className="flex items-center mb-6 bg-stone-100 p-3 rounded-lg inline-block">
              <Weight className="h-5 w-5 text-stone-600 mr-2" />
              <span className="text-stone-700 font-medium">{product.weight}</span>
            </div>
          )}
          
          {/* Quantity selector */}
          <div className="mb-6">
            <p className="text-stone-700 font-medium mb-2">Quantity:</p>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleDecrement} 
                className="h-10 w-10 border-amber-600 text-amber-700 hover:bg-amber-100"
              >
                <Minus size={18} />
              </Button>
              <Input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="h-10 w-20 text-center border-amber-600 focus:border-amber-700"
                min="1"
              />
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleIncrement} 
                className="h-10 w-10 border-amber-600 text-amber-700 hover:bg-amber-100"
              >
                <Plus size={18} />
              </Button>
            </div>
          </div>
          
          {/* Add to cart button */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button
              onClick={handleAddToCartClick}
              className="bg-amber-600 hover:bg-amber-700 text-white py-3 px-8 text-lg flex-grow sm:flex-grow-0 sm:min-w-[200px]"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {cartItems.find(item => item.id === product.id) ? 'Update Cart' : 'Add to Cart'}
            </Button>
            
            <Button variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-100 py-3 px-6">
              <Heart className="mr-2 h-5 w-5" /> Add to Wishlist
            </Button>
            
            <Button variant="ghost" className="text-stone-600 hover:bg-stone-100 py-3 px-6 sm:px-4">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Trust badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="flex flex-col items-center bg-amber-50 p-3 rounded-lg">
              <Shield className="h-6 w-6 text-amber-600 mb-1" />
              <span className="text-xs text-center text-stone-700">Secure Payment</span>
            </div>
            <div className="flex flex-col items-center bg-amber-50 p-3 rounded-lg">
              <Award className="h-6 w-6 text-amber-600 mb-1" />
              <span className="text-xs text-center text-stone-700">Quality Assured</span>
            </div>
            <div className="flex flex-col items-center bg-amber-50 p-3 rounded-lg">
              <Truck className="h-6 w-6 text-amber-600 mb-1" />
              <span className="text-xs text-center text-stone-700">Fast Delivery</span>
            </div>
            <div className="flex flex-col items-center bg-amber-50 p-3 rounded-lg">
              <Leaf className="h-6 w-6 text-amber-600 mb-1" />
              <span className="text-xs text-center text-stone-700">100% Natural</span>
            </div>
          </div>
          
          {/* Social proof */}
          <div className="bg-amber-100/50 rounded-lg p-3 flex items-center justify-center text-amber-800 text-sm">
            <Users className="h-4 w-4 mr-2" />
            <span className="font-medium">15 people bought this product in the last 24 hours</span>
          </div>
        </motion.div>
      </div>

      {/* Product details tabs */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-16"
      >
        <Tabs defaultValue="description" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 md:w-[600px] mb-6">
            <TabsTrigger value="description" className="text-base">Description</TabsTrigger>
            <TabsTrigger value="benefits" className="text-base">Benefits & Usage</TabsTrigger>
            <TabsTrigger value="nutrition" className="text-base">Nutrition Facts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="bg-white p-6 rounded-xl shadow-md border border-amber-100">
            <h3 className="text-xl font-bold text-amber-800 mb-4">Product Description</h3>
            <p className="text-stone-700 mb-4">
              {product.name} is a premium quality spice blend, carefully crafted to enhance the flavor of your culinary creations. 
              Our unique recipe combines the finest ingredients sourced from trusted farmers across India, ensuring authentic taste and aroma.
            </p>
            <p className="text-stone-700 mb-4">
              Each batch is prepared using traditional methods that preserve the essential oils and flavors of the spices. 
              The result is a perfectly balanced blend that will elevate your dishes to new heights.
            </p>
            <p className="text-stone-700">
              Whether you're preparing a family meal or hosting a special occasion, {product.name} will add that perfect touch of flavor 
              that will have everyone asking for your secret ingredient.
            </p>
          </TabsContent>
          
          <TabsContent value="benefits" className="bg-white p-6 rounded-xl shadow-md border border-amber-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-amber-800 mb-4">Benefits</h3>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex">
                      <ThumbsUp className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-amber-700">{benefit.title}: </span>
                        <span className="text-stone-700">{benefit.description}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-amber-800 mb-4">Suggested Uses</h3>
                <ul className="space-y-3">
                  {usageSuggestions.map((suggestion, index) => (
                    <li key={index} className="flex">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-stone-700">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="nutrition" className="bg-white p-6 rounded-xl shadow-md border border-amber-100">
            <h3 className="text-xl font-bold text-amber-800 mb-4">Nutritional Information</h3>
            <p className="text-stone-700 mb-4">Approximate values per serving (1 teaspoon):</p>
            
            <div className="border-t border-b border-stone-200">
              {nutritionalInfo.map((item, index) => (
                <div key={index} className="py-3 flex justify-between border-b border-stone-200 last:border-b-0">
                  <span className="font-medium text-stone-700">{item.name}</span>
                  <span className="text-stone-600">{item.value}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 bg-amber-50 p-4 rounded-lg">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-stone-700">
                  Values may vary slightly between batches. This product is processed in a facility that also processes nuts and wheat.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Related products section */}
      {relatedProducts.length > 0 && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-amber-800">You May Also Like</h2>
            <Link to="/products" className="text-amber-600 hover:text-amber-700 font-medium flex items-center">
              View All <ChevronLeft className="h-4 w-4 ml-1 rotate-180" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link 
                key={relatedProduct.id} 
                to={`/product/${relatedProduct.id}`}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-amber-100 transition-transform hover:scale-105"
              >
                <div className="relative">
                  <img 
                    src={relatedProduct.image} 
                    alt={relatedProduct.name} 
                    className="w-full h-48 object-cover"
                  />
                  {relatedProduct.tags && relatedProduct.tags.length > 0 && (
                    <div className="absolute top-2 left-2">
                      <span 
                        className={`px-2 py-1 rounded-full text-xs font-bold ${relatedProduct.tags[0].includes('SALE') || relatedProduct.tags[0].includes('OFF') ? 'bg-red-500 text-white' : 'bg-amber-500 text-white'}`}
                      >
                        {relatedProduct.tags[0]}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-amber-800 mb-1 truncate">{relatedProduct.name}</h3>
                  <p className="text-stone-600 text-sm mb-2 line-clamp-2">{relatedProduct.description}</p>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-amber-700">₹{relatedProduct.price.toFixed(2)}</p>
                    {relatedProduct.weight && (
                      <div className="text-xs text-stone-500 bg-stone-100 px-2 py-1 rounded">
                        {relatedProduct.weight}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProductDetailPage;
