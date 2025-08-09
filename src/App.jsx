import React, { useState, useEffect } from 'react';
    import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
    import { Toaster } from '@/components/ui/toaster';
    import { useToast } from '@/components/ui/use-toast';
    import Header from '@/components/Header';
    import Footer from '@/components/Footer';
    import HomePage from '@/pages/HomePage';
    import SpicesPage from '@/pages/SpicesPage';
    import DryFruitsPage from '@/pages/DryFruitsPage';
import TasteRiderSpecialsPage from '@/pages/TasteRiderSpecialsPage';
import ProductsPage from '@/pages/ProductsPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import LoginPage from '@/pages/LoginPage';
    import SignUpPage from '@/pages/SignUpPage';
    import CartPage from '@/pages/CartPage';
    import CheckoutPage from '@/pages/CheckoutPage';
    import ContactUsPage from '@/pages/ContactUsPage'; 
    import ProductCategoriesPage from '@/pages/ProductCategoriesPage';
    import ChocolatesPage from '@/pages/ChocolatesPage';
    import AboutUsPage from '@/pages/AboutUsPage';
    import TermsPage from '@/pages/TermsPage.jsx'; // Corrected import path
    import PrivacyPage from '@/pages/PrivacyPage';
    import RefundPage from '@/pages/RefundPage';
    import ShippingPage from '@/pages/ShippingPage';
    import ProfilePage from '@/pages/ProfilePage';
    import OrderConfirmationPage from '@/pages/OrderConfirmationPage'; // Add this line
    import WhatsAppButton from '@/components/WhatsAppButton';
    import ScrollToTopButton from '@/components/ScrollToTopButton';
    import FloatingCartButton from '@/components/FloatingCartButton';
    import { motion, useAnimation } from 'framer-motion';
    import { useInView } from 'react-intersection-observer';
    import { Button } from '@/components/ui/button';
    import BackgroundEffect from "@/components/BackgroundEffect";
    import { signatureSpicesWithPics, chocolateProducts } from '@/lib/products';
    
    const AnimatedSection = ({ children, className }) => {
      const controls = useAnimation();
      const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
      });

      useEffect(() => {
        if (inView) {
          controls.start("visible");
        }
      }, [controls, inView]);

      return (
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
            hidden: { opacity: 0, y: 50 },
          }}
          className={className}
        >
          {children}
        </motion.div>
      );
    };

    const ScrollToTopManager = () => {
      const { pathname } = useLocation();

      useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, [pathname]);

      return null;
    };


    const App = () => {
      const { toast } = useToast();
      const navigate = useNavigate();
      const location = useLocation();
      const logoUrl = "/images/Logo.png";
      
      const defaultProductImage = "https://storage.googleapis.com/hostinger-horizons-assets-prod/0d2dbf2b-b616-4ee8-a20e-de4e4a4d280c/1bd6b109ca23886a2bfc7cdef7b819d5.jpg";
      const specialProductImage = "https://storage.googleapis.com/hostinger-horizons-assets-prod/0d2dbf2b-b616-4ee8-a20e-de4e4a4d280c/special_product_placeholder.jpg";

      const [products, setProducts] = useState([...signatureSpicesWithPics, ...chocolateProducts.map((p, i) => ({...p, id: i + signatureSpicesWithPics.length + 1}))]);
      const [cart, setCart] = useState([]);
      const [searchTerm, setSearchTerm] = useState('');
      const [selectedCategory, setSelectedCategory] = useState(null);
      const [session, setSession] = useState(null);


      useEffect(() => {
        const storedCart = localStorage.getItem('desiBitesCart');
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }

        const token = localStorage.getItem('token');
        if (token) {
          // You might want to verify the token with the backend here
          // For simplicity, we'll just set the session
          setSession({ token });
        }
      }, []);

      useEffect(() => {
        localStorage.setItem('desiBitesCart', JSON.stringify(cart));
      }, [cart]);

      const handleAddToCart = (product, quantity = 1) => {
        setCart(prevCart => {
          const existingProduct = prevCart.find(item => item.id === product.id);
          if (existingProduct) {
            return prevCart.map(item =>
              item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
            );
          }
          return [...prevCart, { ...product, quantity }];
        });
        toast({
          title: `🌶️ ${product.name} Added!`,
          description: `${quantity} item(s) successfully added to your cart.`,
          duration: 3000,
          className: "bg-green-600 border-green-700 text-white toast-success-theme",
          action: (
            <Button
              variant="outline"
              size="sm"
              className="ml-auto bg-green-700 hover:bg-green-800 text-white border-green-500"
              onClick={() => navigate('/cart')}
            >
              View Cart
            </Button>
          ),
        });
      };

      const handleUpdateQuantity = (productId, quantity) => {
        setCart(prevCart => 
          prevCart.map(item => 
            item.id === productId ? { ...item, quantity: Math.max(0, quantity) } : item
          ).filter(item => item.quantity > 0)
        );
      };
      
      const handleRemoveFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
        toast({
          title: `🗑️ Item Removed`,
          description: "Successfully removed from your cart.",
          variant: "destructive",
          duration: 2000,
          className: "bg-red-600 border-red-700 text-white toast-destructive-theme",
        });
      };

      const handleSearch = (term) => {
        setSearchTerm(term.toLowerCase());
        setSelectedCategory(null); 
      };

      const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setSearchTerm(''); 
        toast({
          title: `🌶️ Category: ${category}`,
          description: `Showing products from ${category}.`,
          duration: 3000,
          className: "toast-info-theme",
        });
      };

      // Listen for custom event to select spices category
      useEffect(() => {
        const handleSelectSpicesCategory = () => {
          handleCategorySelect('Spices');
        };
        
        window.addEventListener('selectSpicesCategory', handleSelectSpicesCategory);
        return () => window.removeEventListener('selectSpicesCategory', handleSelectSpicesCategory);
      }, []);

      const filteredProducts = products.filter(product => {
        const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
        return matchesSearchTerm && matchesCategory;
      });
      
      const heroImages = [
        "https://storage.googleapis.com/hostinger-horizons-assets-prod/0d2dbf2b-b616-4ee8-a20e-de4e4a4d280c/ca8c4d496de1a5c8f2581319c0fb73fa.jpg",
        "https://storage.googleapis.com/hostinger-horizons-assets-prod/0d2dbf2b-b616-4ee8-a20e-de4e4a4d280c/b8eec8d2a26b01e00bfd1e15ab86a6e2.jpg",
        "https://storage.googleapis.com/hostinger-horizons-assets-prod/0d2dbf2b-b616-4ee8-a20e-de4e4a4d280c/23bd20088098dd61c2444f85dceac2ca.jpg",
        "https://storage.googleapis.com/hostinger-horizons-assets-prod/0d2dbf2b-b616-4ee8-a20e-de4e4a4d280c/b27cf798f5c9406e465423e71ca5e8f0.jpg"
      ];

      const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
      
      const HEADER_MOBILE_HEIGHT = 80; 
      const HEADER_SM_HEIGHT = 90;
      const HEADER_MD_HEIGHT = 100;

      const [currentHeaderHeight, setCurrentHeaderHeight] = useState(HEADER_MOBILE_HEIGHT);

      useEffect(() => {
        const updateHeaderHeight = () => {
          if (window.innerWidth < 640) { 
            setCurrentHeaderHeight(HEADER_MOBILE_HEIGHT);
          } else if (window.innerWidth < 768) { 
            setCurrentHeaderHeight(HEADER_SM_HEIGHT);
          } else {
            setCurrentHeaderHeight(HEADER_MD_HEIGHT);
          }
        };
        updateHeaderHeight();
        window.addEventListener('resize', updateHeaderHeight);
        return () => window.removeEventListener('resize', updateHeaderHeight);
      }, []);


      return (
        <>
          <ScrollToTopManager />
          <div className="min-h-screen text-stone-800 font-serif flex flex-col app-background-theme">
            <BackgroundEffect />
            <Toaster />
            <Header
              logoUrl={logoUrl}
              cartItemCount={cartItemCount}
              onCategorySelect={handleCategorySelect}
              headerHeight={currentHeaderHeight}
              session={session}
              setSession={setSession}
            />
            <main
              className="flex-grow"
              style={{
                paddingTop: `${currentHeaderHeight}px`
              }}
            >
              <Routes>
                <Route path="/" element={<HomePage heroImages={heroImages} onAddToCart={handleAddToCart} initialProducts={products} cartItems={cart} onUpdateQuantity={handleUpdateQuantity} />} />
                <Route
                  path="/spices"
                  element={
                    <AnimatedSection>
                      <SpicesPage
                        products={products}
                        onAddToCart={handleAddToCart}
                        searchTerm={searchTerm}
                        onSearchChange={handleSearch}
                        cartItemCount={cartItemCount}
                        selectedCategory="Spices"
                        cartItems={cart}
                        onUpdateQuantity={handleUpdateQuantity}
                      />
                    </AnimatedSection>
                  }
                />
                <Route
                  path="/dry-fruits"
                  element={
                    <AnimatedSection>
                      <DryFruitsPage
                        products={products}
                        onAddToCart={handleAddToCart}
                        searchTerm={searchTerm}
                        onSearchChange={handleSearch}
                        cartItemCount={cartItemCount}
                        selectedCategory="Dry Fruits"
                        cartItems={cart}
                        onUpdateQuantity={handleUpdateQuantity}
                      />
                    </AnimatedSection>
                  }
                />
                <Route
                  path="/taste-rider-specials"
                  element={
                    <AnimatedSection>
                      <TasteRiderSpecialsPage
                        products={products}
                        onAddToCart={handleAddToCart}
                        searchTerm={searchTerm}
                        onSearchChange={handleSearch}
                        cartItemCount={cartItemCount}
                        selectedCategory="Taste Rider Specials"
                        cartItems={cart}
                        onUpdateQuantity={handleUpdateQuantity}
                      />
                    </AnimatedSection>
                  }
                />
                <Route
                  path="/product/:productId"
                  element={
                    <AnimatedSection>
                      <ProductDetailPage
                        onAddToCart={handleAddToCart}
                        cartItems={cart}
                        onUpdateQuantity={handleUpdateQuantity}
                      />
                    </AnimatedSection>
                  }
                />
                <Route
                  path="/chocolates"
                  element={
                    <AnimatedSection>
                      <ChocolatesPage
                        products={products}
                        onAddToCart={handleAddToCart}
                        cartItems={cart}
                        onUpdateQuantity={handleUpdateQuantity}
                      />
                    </AnimatedSection>
                  }
                />
                <Route path="/product-categories" element={<AnimatedSection><ProductCategoriesPage onCategorySelect={handleCategorySelect} /></AnimatedSection>} />
                <Route path="/login" element={<AnimatedSection><LoginPage setSession={setSession} /></AnimatedSection>} />
                <Route path="/signup" element={<AnimatedSection><SignUpPage /></AnimatedSection>} />
                <Route
                  path="/cart"
                  element={
                    <AnimatedSection>
                      <CartPage
                        cartItems={cart}
                        onUpdateQuantity={handleUpdateQuantity}
                        onRemoveFromCart={handleRemoveFromCart}
                        onAddToCart={handleAddToCart}
                      />
                    </AnimatedSection>
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <AnimatedSection>
                      <CheckoutPage
                        cartItems={cart}
                        onUpdateQuantity={handleUpdateQuantity}
                        onRemoveFromCart={handleRemoveFromCart}
                      />
                    </AnimatedSection>
                  }
                />
                <Route path="/contact" element={<AnimatedSection><ContactUsPage companyName="Desi Bites" brandName="Taste Rider" /></AnimatedSection>} />
                <Route path="/about-us" element={<AnimatedSection><AboutUsPage /></AnimatedSection>} />
                <Route path="/terms" element={<AnimatedSection><TermsPage /></AnimatedSection>} />
                <Route path="/privacy" element={<AnimatedSection><PrivacyPage /></AnimatedSection>} />
                <Route path="/refund" element={<AnimatedSection><RefundPage /></AnimatedSection>} />
                <Route path="/shipping" element={<AnimatedSection><ShippingPage /></AnimatedSection>} />
                <Route path="/profile" element={<AnimatedSection><ProfilePage session={session} setSession={setSession} /></AnimatedSection>} />
                <Route path="/order-confirmation" element={<AnimatedSection><OrderConfirmationPage /></AnimatedSection>} />
                <Route path="/products" element={<AnimatedSection><ProductsPage onAddToCart={handleAddToCart} cartItems={cart} onUpdateQuantity={handleUpdateQuantity} /></AnimatedSection>} />
                </Routes>
            </main>
            <Footer logoUrl={logoUrl} companyName="Desi Bites" />
            <WhatsAppButton phoneNumber="+919997539999" />
            <ScrollToTopButton />
            {/* Add FloatingCartButton to all pages except cart and checkout */}
            {location.pathname !== '/cart' && location.pathname !== '/checkout' && (
              <FloatingCartButton cartItemCount={cartItemCount} />
            )}
          </div>
        </>
      );
    };
    
    const AppWrapper = () => (
      <Router>
        <App />
      </Router>
    );

        export default AppWrapper;
