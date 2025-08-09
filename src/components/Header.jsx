import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, User, X, Menu as MenuIcon, Home, Package, Phone, ChevronDown, Leaf, Utensils as SpicesIcon, Box, Star, LogOut, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

const Header = ({ logoUrl, cartItemCount, onCategorySelect, headerHeight, session, setSession }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);
  const triggerRef = useRef(null);
  const { toast } = useToast();

  const handleMenuLinkClick = (path, sectionId) => {
    setIsMenuOpen(false);
    if (path) {
      navigate(path);
    }
    if (sectionId) {
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        } else if (path === '/') { 
          navigate('/'); 
          setTimeout(() => {
            const homeSection = document.getElementById(sectionId);
            if (homeSection) homeSection.scrollIntoView({ behavior: 'smooth' });
          }, 150);
        }
      }, 100); 
    }
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && triggerRef.current && !triggerRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef, triggerRef]);

  const handleCategoryClick = (category) => {
    onCategorySelect(category);
    setIsMenuOpen(false);
    if (location.pathname !== '/products') {
      navigate('/products');
    }
  };

  const handleLogout = () => {
    setIsMenuOpen(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setSession(null);
    toast({
      title: "👋 Logged Out",
      description: "You have been successfully logged out.",
      className: "toast-info-theme",
    });
    navigate('/');
  };

  const menuItems = [
    { label: "Home", path: "/", icon: <Home size={22} className="mr-3 text-amber-400 md:size-6" />, action: () => handleMenuLinkClick('/') },
    { label: "About Us", path: "/about-us", icon: <Info size={22} className="mr-3 text-amber-400 md:size-6" />, action: () => handleMenuLinkClick('/about-us') },
    { label: "Contact Us", path: "/contact", icon: <Phone size={22} className="mr-3 text-amber-400 md:size-6" />, action: () => handleMenuLinkClick('/contact') },
  ];

  const productCategories = [
    { label: "Spices", icon: <SpicesIcon size={20} className="mr-2 text-amber-300 md:size-5" />, action: () => handleCategoryClick('Spices') },
    { label: "Dry Fruits", icon: <Leaf size={20} className="mr-2 text-amber-300 md:size-5" />, action: () => handleCategoryClick('Dry Fruits') },
    { label: "Taste Rider Specials", icon: <Star size={20} className="mr-2 text-amber-300 md:size-5" />, action: () => handleCategoryClick('Taste Rider Specials') },
  ];
  
  return (
    <>
      <header 
        className="px-2 md:px-6 fixed left-0 right-0 z-40 bg-stone-800/90 backdrop-blur-lg shadow-xl"
        style={{ top: `0px`, height: `${headerHeight}px` }} 
      >
        {/* Trust badges banner removed */}

        <div className="container mx-auto flex justify-between items-center relative h-full">
          
          <div className="flex items-center flex-1 justify-start">
            <div className="sm:hidden">
              <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <DropdownMenuTrigger asChild ref={triggerRef}>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-amber-100 hover:bg-white/20 p-2.5" 
                  >
                    {isMenuOpen ? <X className="h-8 w-8" /> : <MenuIcon className="h-8 w-8" />}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  ref={menuRef}
                  className="bg-stone-800/95 border-stone-700 text-amber-100 shadow-2xl w-64 sm:w-72 fixed"
                  style={{
                    maxHeight: 'calc(80vh - 70px)',
                    zIndex: 100,
                    left: 0,
                    top: 0,
                    marginLeft: 0,
                    marginTop: 0
                  }}
                  side="bottom"
                  align="start"
                >
                  <div className="p-2 space-y-1 overflow-y-auto">
                    {menuItems.map(item => (
                      <DropdownMenuItem 
                        key={item.label}
                        onClick={item.action}
                        className="hover:bg-stone-700 focus:bg-stone-700 py-3 text-lg flex items-center cursor-pointer rounded-md transition-all duration-300 hover:text-amber-300 hover:tracking-wide"
                      >
                        {item.icon} {item.label}
                      </DropdownMenuItem>
                    ))}
                    <Separator className="bg-stone-700 my-2" />
                    {session ? (
                      <>
                        <DropdownMenuItem asChild>
                          <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="hover:bg-stone-700 focus:bg-stone-700 py-3 text-lg flex items-center w-full cursor-pointer rounded-md">
                            <User className="mr-3 h-5 w-5 text-amber-400" /> Profile
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={handleLogout}
                          className="hover:bg-stone-700 focus:bg-stone-700 py-3 text-lg flex items-center w-full cursor-pointer rounded-md text-red-400 hover:text-red-300"
                        >
                          <LogOut className="mr-3 h-5 w-5" /> Logout
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <DropdownMenuItem asChild>
                        <Link to="/login" onClick={() => setIsMenuOpen(false)} className="hover:bg-stone-700 focus:bg-stone-700 py-3 text-lg flex items-center w-full cursor-pointer rounded-md">
                          <User className="mr-3 h-5 w-5 text-amber-400" /> Login
                        </Link>
                      </DropdownMenuItem>
                    )}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="hidden sm:flex items-center space-x-1 md:space-x-2">
              {menuItems.map(item => (
                <Button 
                    key={item.label}
                    onClick={item.action}
                    variant="ghost"
                    className="text-amber-100 hover:bg-white/10 hover:text-amber-300 hover:tracking-wide transition-all duration-300 px-3.5 py-2.5 text-base md:text-lg"
                >
                    <item.icon.type {...item.icon.props} size={20} className="mr-2 md:size-6" /> {item.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Link
              to="/"
              className="flex items-center"
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              <img src={logoUrl} alt="Taste Rider Logo" className="h-16 sm:h-20 md:h-24 transition-transform hover:scale-105" />
            </Link>
          </div>
          
          <div className="flex items-center flex-1 justify-end">
            <div className="hidden sm:flex items-center space-x-1 md:space-x-1.5">
              {/* Products button now navigates directly to categories */}
              <Button
                variant="ghost"
                className="text-amber-100 hover:bg-white/10 hover:text-amber-50 transition-colors px-3.5 py-2.5 text-base md:text-lg"
                onClick={() => navigate('/product-categories')}
              >
                <Package size={20} className="mr-2 md:size-6" /> Products
              </Button>
              {/* Wishlist button for desktop - removed */}

              <Link to="/cart">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-amber-100 hover:bg-white/20 transition-all duration-300 transform hover:scale-110 relative p-2.5"
                >
                  <ShoppingCart className="h-6 w-6 md:h-7 md:w-7" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-sm font-bold rounded-full h-5 w-5 md:h-6 md:w-6 flex items-center justify-center text-[11px] md:text-xs">
                      {cartItemCount}
                    </span>
                  )}
                </Button>
              </Link>
              {session ? (
                <>
                  <Link to="/profile">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-amber-100 hover:bg-white/20 transition-all duration-300 transform hover:scale-110 p-2.5"
                    >
                      <User className="h-6 w-6 md:h-7 md:w-7" />
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={handleLogout}
                    className="text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-300 transform hover:scale-110 p-2.5"
                  >
                    <LogOut className="h-6 w-6 md:h-7 md:w-7" />
                  </Button>
                </>
              ) : (
                <Link to="/login">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-amber-100 hover:bg-white/20 transition-all duration-300 transform hover:scale-110 p-2.5"
                  >
                    <User className="h-6 w-6 md:h-7 md:w-7" />
                  </Button>
                </Link>
              )}
            </div>

            <div className="sm:hidden flex items-center space-x-1">
              <Link to="/product-categories">
                <Button
                  variant="ghost"
                  size="icon" 
                  className="text-amber-100 hover:bg-white/20 p-2.5" 
                >
                  <Box className="h-8 w-8" />
                </Button>
              </Link>
              <Link to="/cart">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-amber-100 hover:bg-white/20 transition-all duration-300 transform hover:scale-110 relative p-2.5"
                >
                  <ShoppingCart className="h-8 w-8" />
                  {cartItemCount > 0 && (
                    <span className="absolute top-0.5 right-0.5 bg-red-600 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                      {cartItemCount}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
