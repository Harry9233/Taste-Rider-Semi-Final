import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, LogOut, Package, Heart, MapPin, CreditCard, MessageSquare, Settings, Home, Clock, ShoppingBag, AlertCircle, Plus, Edit, Trash2, Eye, EyeOff, Save, X, ChevronRight } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SupportTicketComponent from '@/components/SupportTicketComponent';
import { indianStates, indianCities, isValidPinCode, isValidPhoneNumber } from "@/lib/indianStatesAndCities";

const ProfilePage = ({ session, setSession }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // State for user profile data
  const [profile, setProfile] = useState({
    fullName: '',
    email: session?.user?.email || '',
    phone: '',
    profileImage: ''
  });
  
  // State for orders
  const [orders, setOrders] = useState([]);
  
  // State for wishlist
  const [wishlist, setWishlist] = useState([]);
  
  // State for addresses
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false
  });
  const [editingAddress, setEditingAddress] = useState(null);
  const [addingAddress, setAddingAddress] = useState(false);
  
  // State for payment methods
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    cardNumber: '',
    nameOnCard: '',
    expiryDate: '',
    isDefault: false
  });
  const [addingPaymentMethod, setAddingPaymentMethod] = useState(false);
  const [showCardNumber, setShowCardNumber] = useState(false);
  
  // State for account settings
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  useEffect(() => {
    if (!session) {
      navigate('/login');
    } else {
      // Fetch user profile data
      setProfile({
        fullName: session.user.name,
        email: session.user.email,
        address: session.user.address,
        phone: '', // phone is not in the session, so we leave it empty
        profileImage: `https://ui-avatars.com/api/?name=${session.user.name.replace(' ', '+')}&background=f59e0b&color=fff`
      });
      
      // Mock orders data
      setOrders([
        {
          id: 'TR-ABCD1234',
          date: '2023-11-15',
          status: 'Delivered',
          total: 1250,
          items: [
            { id: 1, name: 'Garam Masala', quantity: 2, price: 250 },
            { id: 2, name: 'Chat Masala', quantity: 3, price: 250 }
          ]
        },
        {
          id: 'TR-EFGH5678',
          date: '2023-10-28',
          status: 'Processing',
          total: 750,
          items: [
            { id: 3, name: 'Pav Bhaji Masala', quantity: 1, price: 250 },
            { id: 4, name: 'Sambar Masala', quantity: 2, price: 250 }
          ]
        }
      ]);
      
      // Mock wishlist data
      setWishlist([
        { id: 5, name: 'Organic Cinnamon', price: 350, image: '/images/Organic Cinnamon.jpg' },
        { id: 6, name: 'Sun-dried Turmeric', price: 300, image: '/images/Sun-dried Turmeric.jpg' },
        { id: 7, name: 'Smoked Paprika', price: 400, image: '/images/Smoked Paprika.jpg' }
      ]);
      
      // Mock addresses data
      setAddresses([
        {
          id: 1,
          fullName: 'John Doe',
          phone: '9876543210',
          address: '123 Main Street, Apartment 4B',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400001',
          isDefault: true
        },
        {
          id: 2,
          fullName: 'John Doe',
          phone: '9876543210',
          address: '456 Work Avenue, Office 7',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400002',
          isDefault: false
        }
      ]);
      
      // Mock payment methods data
      setPaymentMethods([
        {
          id: 1,
          cardNumber: '4111111111111111',
          nameOnCard: 'John Doe',
          expiryDate: '12/25',
          isDefault: true
        },
        {
          id: 2,
          cardNumber: '5555555555554444',
          nameOnCard: 'John Doe',
          expiryDate: '10/24',
          isDefault: false
        }
      ]);
    }
  }, [session, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setSession(null);
    toast({
      title: '👋 Logged Out',
      description: 'You have been successfully logged out',
      className: 'toast-info-theme',
    });
    navigate('/');
  };
  
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // In a real app, this would send data to an API
    toast({
      title: '✅ Profile Updated',
      description: 'Your profile information has been updated successfully',
      className: 'toast-success-theme',
    });
  };
  
  const handlePasswordChange = (e) => {
    e.preventDefault();
    // Validate passwords
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: 'Passwords Do Not Match',
        description: 'Your new password and confirmation do not match',
        variant: 'destructive',
      });
      return;
    }
    
    // In a real app, this would send data to an API
    toast({
      title: '✅ Password Updated',
      description: 'Your password has been changed successfully',
      className: 'toast-success-theme',
    });
    
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };
  
  const handleAddAddress = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!newAddress.fullName || !newAddress.phone || !newAddress.address || 
        !newAddress.city || !newAddress.state || !newAddress.pincode) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }
    
    // Validate phone number
    if (!isValidPhoneNumber(newAddress.phone)) {
      toast({
        title: 'Invalid Phone Number',
        description: 'Please enter a valid 10-digit Indian mobile number',
        variant: 'destructive',
      });
      return;
    }
    
    // Validate PIN code
    if (!isValidPinCode(newAddress.pincode)) {
      toast({
        title: 'Invalid PIN Code',
        description: 'Please enter a valid 6-digit Indian PIN code',
        variant: 'destructive',
      });
      return;
    }
    
    // Add new address
    const newId = addresses.length > 0 ? Math.max(...addresses.map(a => a.id)) + 1 : 1;
    
    // If this is set as default, update other addresses
    let updatedAddresses = [...addresses];
    if (newAddress.isDefault) {
      updatedAddresses = updatedAddresses.map(addr => ({
        ...addr,
        isDefault: false
      }));
    }
    
    // Add the new address
    setAddresses([
      ...updatedAddresses,
      {
        ...newAddress,
        id: newId
      }
    ]);
    
    // Reset form and state
    setNewAddress({
      fullName: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      isDefault: false
    });
    setAddingAddress(false);
    
    toast({
      title: '✅ Address Added',
      description: 'Your new address has been added successfully',
      className: 'toast-success-theme',
    });
  };
  
  const handleEditAddress = (address) => {
    setEditingAddress(address.id);
    setNewAddress(address);
  };
  
  const handleUpdateAddress = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!newAddress.fullName || !newAddress.phone || !newAddress.address || 
        !newAddress.city || !newAddress.state || !newAddress.pincode) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }
    
    // Validate phone number
    if (!isValidPhoneNumber(newAddress.phone)) {
      toast({
        title: 'Invalid Phone Number',
        description: 'Please enter a valid 10-digit Indian mobile number',
        variant: 'destructive',
      });
      return;
    }
    
    // Validate PIN code
    if (!isValidPinCode(newAddress.pincode)) {
      toast({
        title: 'Invalid PIN Code',
        description: 'Please enter a valid 6-digit Indian PIN code',
        variant: 'destructive',
      });
      return;
    }
    
    // If this is set as default, update other addresses
    let updatedAddresses = [...addresses];
    if (newAddress.isDefault) {
      updatedAddresses = updatedAddresses.map(addr => ({
        ...addr,
        isDefault: addr.id === newAddress.id ? true : false
      }));
    }
    
    // Update the address
    setAddresses(
      updatedAddresses.map(addr => 
        addr.id === newAddress.id ? newAddress : addr
      )
    );
    
    // Reset form and state
    setNewAddress({
      fullName: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      isDefault: false
    });
    setEditingAddress(null);
    
    toast({
      title: '✅ Address Updated',
      description: 'Your address has been updated successfully',
      className: 'toast-success-theme',
    });
  };
  
  const handleDeleteAddress = (id) => {
    // Check if it's the default address
    const isDefault = addresses.find(addr => addr.id === id)?.isDefault;
    
    // Remove the address
    const updatedAddresses = addresses.filter(addr => addr.id !== id);
    
    // If it was the default and we have other addresses, set a new default
    if (isDefault && updatedAddresses.length > 0) {
      updatedAddresses[0].isDefault = true;
    }
    
    setAddresses(updatedAddresses);
    
    toast({
      title: '✅ Address Removed',
      description: 'Your address has been removed successfully',
      className: 'toast-success-theme',
    });
  };
  
  const handleSetDefaultAddress = (id) => {
    setAddresses(
      addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === id
      }))
    );
    
    toast({
      title: '✅ Default Address Updated',
      description: 'Your default address has been updated',
      className: 'toast-success-theme',
    });
  };
  
  const handleAddPaymentMethod = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!newPaymentMethod.cardNumber || !newPaymentMethod.nameOnCard || !newPaymentMethod.expiryDate) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }
    
    // Add new payment method
    const newId = paymentMethods.length > 0 ? Math.max(...paymentMethods.map(p => p.id)) + 1 : 1;
    
    // If this is set as default, update other payment methods
    let updatedPaymentMethods = [...paymentMethods];
    if (newPaymentMethod.isDefault) {
      updatedPaymentMethods = updatedPaymentMethods.map(method => ({
        ...method,
        isDefault: false
      }));
    }
    
    // Add the new payment method
    setPaymentMethods([
      ...updatedPaymentMethods,
      {
        ...newPaymentMethod,
        id: newId
      }
    ]);
    
    // Reset form and state
    setNewPaymentMethod({
      cardNumber: '',
      nameOnCard: '',
      expiryDate: '',
      isDefault: false
    });
    setAddingPaymentMethod(false);
    
    toast({
      title: '✅ Payment Method Added',
      description: 'Your new payment method has been added successfully',
      className: 'toast-success-theme',
    });
  };
  
  const handleDeletePaymentMethod = (id) => {
    // Check if it's the default payment method
    const isDefault = paymentMethods.find(method => method.id === id)?.isDefault;
    
    // Remove the payment method
    const updatedPaymentMethods = paymentMethods.filter(method => method.id !== id);
    
    // If it was the default and we have other methods, set a new default
    if (isDefault && updatedPaymentMethods.length > 0) {
      updatedPaymentMethods[0].isDefault = true;
    }
    
    setPaymentMethods(updatedPaymentMethods);
    
    toast({
      title: '✅ Payment Method Removed',
      description: 'Your payment method has been removed successfully',
      className: 'toast-success-theme',
    });
  };
  
  const handleSetDefaultPaymentMethod = (id) => {
    setPaymentMethods(
      paymentMethods.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
    
    toast({
      title: '✅ Default Payment Method Updated',
      description: 'Your default payment method has been updated',
      className: 'toast-success-theme',
    });
  };
  
  const handleRemoveFromWishlist = (id) => {
    setWishlist(wishlist.filter(item => item.id !== id));
    
    toast({
      title: '✅ Item Removed',
      description: 'Item has been removed from your wishlist',
      className: 'toast-success-theme',
    });
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  const formatCardNumber = (cardNumber) => {
    return showCardNumber ? cardNumber : '**** **** **** ' + cardNumber.slice(-4);
  };

  if (!session) {
    return null; // Will redirect to login via useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-amber-800">My Account</h1>
        
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-7 mb-8">
            <TabsTrigger value="dashboard" className="text-sm md:text-base">
              <Home className="h-4 w-4 mr-2 md:mr-1" /> <span className="hidden md:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="text-sm md:text-base">
              <Package className="h-4 w-4 mr-2 md:mr-1" /> <span className="hidden md:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="text-sm md:text-base">
              <Heart className="h-4 w-4 mr-2 md:mr-1" /> <span className="hidden md:inline">Wishlist</span>
            </TabsTrigger>
            <TabsTrigger value="addresses" className="text-sm md:text-base">
              <MapPin className="h-4 w-4 mr-2 md:mr-1" /> <span className="hidden md:inline">Addresses</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="text-sm md:text-base">
              <CreditCard className="h-4 w-4 mr-2 md:mr-1" /> <span className="hidden md:inline">Payment Methods</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="text-sm md:text-base">
              <MessageSquare className="h-4 w-4 mr-2 md:mr-1" /> <span className="hidden md:inline">Support</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-sm md:text-base">
              <Settings className="h-4 w-4 mr-2 md:mr-1" /> <span className="hidden md:inline">Settings</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-2 h-5 w-5 text-amber-600" /> Welcome, {profile.fullName}
                  </CardTitle>
                  <CardDescription>
                    Here's a summary of your account activity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="bg-amber-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Package className="h-5 w-5 text-amber-600 mr-2" />
                        <h3 className="font-medium">Recent Orders</h3>
                      </div>
                      {orders.length > 0 ? (
                        <div className="space-y-2">
                          {orders.slice(0, 2).map(order => (
                            <div key={order.id} className="flex justify-between items-center">
                              <span className="text-sm text-stone-600">{order.id}</span>
                              <Badge className={order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}>
                                {order.status}
                              </Badge>
                            </div>
                          ))}
                          <Button variant="link" size="sm" className="p-0 h-auto text-amber-600" onClick={() => document.querySelector('[data-value="orders"]').click()}>
                            View all orders <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      ) : (
                        <p className="text-sm text-stone-500">You haven't placed any orders yet.</p>
                      )}
                    </div>
                    
                    <div className="bg-amber-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Heart className="h-5 w-5 text-amber-600 mr-2" />
                        <h3 className="font-medium">Wishlist</h3>
                      </div>
                      {wishlist.length > 0 ? (
                        <div className="space-y-2">
                          {wishlist.slice(0, 2).map(item => (
                            <div key={item.id} className="flex justify-between items-center">
                              <span className="text-sm text-stone-600">{item.name}</span>
                              <span className="text-sm font-medium">₹{item.price}</span>
                            </div>
                          ))}
                          <Button variant="link" size="sm" className="p-0 h-auto text-amber-600" onClick={() => document.querySelector('[data-value="wishlist"]').click()}>
                            View wishlist <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      ) : (
                        <p className="text-sm text-stone-500">Your wishlist is empty.</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 p-4 rounded-lg mb-4">
                    <div className="flex items-center mb-2">
                      <MapPin className="h-5 w-5 text-amber-600 mr-2" />
                      <h3 className="font-medium">Default Shipping Address</h3>
                    </div>
                    {addresses.find(addr => addr.isDefault) ? (
                      <div className="text-sm text-stone-600">
                        <p>{addresses.find(addr => addr.isDefault).fullName}</p>
                        <p>{addresses.find(addr => addr.isDefault).address}</p>
                        <p>{addresses.find(addr => addr.isDefault).city}, {addresses.find(addr => addr.isDefault).state} - {addresses.find(addr => addr.isDefault).pincode}</p>
                        <p>Phone: {addresses.find(addr => addr.isDefault).phone}</p>
                      </div>
                    ) : (
                      <p className="text-sm text-stone-500">No default address set.</p>
                    )}
                  </div>
                  
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <CreditCard className="h-5 w-5 text-amber-600 mr-2" />
                      <h3 className="font-medium">Default Payment Method</h3>
                    </div>
                    {paymentMethods.find(method => method.isDefault) ? (
                      <div className="text-sm text-stone-600">
                        <p>Card ending in {paymentMethods.find(method => method.isDefault).cardNumber.slice(-4)}</p>
                        <p>Expires: {paymentMethods.find(method => method.isDefault).expiryDate}</p>
                      </div>
                    ) : (
                      <p className="text-sm text-stone-500">No default payment method set.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-2 h-5 w-5 text-amber-600" /> Account Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-stone-500">Name</Label>
                      <div className="font-medium">{profile.fullName}</div>
                    </div>
                    <div>
                      <Label className="text-stone-500">Address</Label>
                      <div className="font-medium">{profile.address}</div>
                    </div>
                    <div>
                      <Label className="text-stone-500">Email</Label>
                      <div className="font-medium">{profile.email}</div>
                    </div>
                    <div>
                      <Label className="text-stone-500">Phone</Label>
                      <div className="font-medium">{profile.phone}</div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full mt-4 border-amber-600 text-amber-700"
                      onClick={() => document.querySelector('[data-value="settings"]').click()}
                    >
                      <Edit className="mr-2 h-4 w-4" /> Edit Profile
                    </Button>
                    
                    <Button
                      variant="destructive"
                      onClick={handleLogout}
                      className="w-full mt-2"
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="mr-2 h-5 w-5 text-amber-600" /> Order History
                </CardTitle>
                <CardDescription>
                  View and track your orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                {orders.length > 0 ? (
                  <div className="space-y-6">
                    {orders.map(order => (
                      <div key={order.id} className="border rounded-lg overflow-hidden">
                        <div className="bg-amber-50 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                          <div>
                            <p className="font-medium text-amber-800">{order.id}</p>
                            <p className="text-sm text-stone-600">{formatDate(order.date)}</p>
                          </div>
                          <div className="flex items-center mt-2 sm:mt-0">
                            <Badge className={order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}>
                              {order.status}
                            </Badge>
                            <Button variant="link" className="text-amber-600 ml-2">
                              Track Order
                            </Button>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <div className="space-y-3">
                            {order.items.map(item => (
                              <div key={item.id} className="flex justify-between items-center">
                                <div className="flex items-center">
                                  <div className="bg-amber-100 w-10 h-10 rounded flex items-center justify-center mr-3">
                                    <ShoppingBag className="h-5 w-5 text-amber-600" />
                                  </div>
                                  <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-stone-500">Qty: {item.quantity}</p>
                                  </div>
                                </div>
                                <p className="font-medium">₹{item.price * item.quantity}</p>
                              </div>
                            ))}
                          </div>
                          
                          <Separator className="my-4" />
                          
                          <div className="flex justify-between items-center font-medium">
                            <span>Total</span>
                            <span>₹{order.total}</span>
                          </div>
                          
                          <div className="mt-4 flex flex-col sm:flex-row gap-2">
                            <Button variant="outline" className="border-amber-600 text-amber-700">
                              <Eye className="mr-2 h-4 w-4" /> View Details
                            </Button>
                            <Button variant="outline" className="border-amber-600 text-amber-700">
                              <MessageSquare className="mr-2 h-4 w-4" /> Contact Support
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 text-amber-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-amber-800 mb-2">No Orders Yet</h3>
                    <p className="text-stone-600 mb-6">You haven't placed any orders yet</p>
                    <Link to="/products">
                      <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                        Start Shopping
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Wishlist Tab */}
          <TabsContent value="wishlist">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="mr-2 h-5 w-5 text-amber-600" /> My Wishlist
                </CardTitle>
                <CardDescription>
                  Items you've saved for later
                </CardDescription>
              </CardHeader>
              <CardContent>
                {wishlist.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {wishlist.map(item => (
                      <div key={item.id} className="border rounded-lg overflow-hidden">
                        <div className="aspect-square relative">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          <Button 
                            variant="destructive" 
                            size="icon" 
                            className="absolute top-2 right-2 h-8 w-8 rounded-full"
                            onClick={() => handleRemoveFromWishlist(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium mb-2">{item.name}</h3>
                          <p className="text-amber-700 font-bold mb-3">₹{item.price}</p>
                          <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                            <ShoppingBag className="mr-2 h-4 w-4" /> Add to Cart
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="h-12 w-12 text-amber-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-amber-800 mb-2">Your Wishlist is Empty</h3>
                    <p className="text-stone-600 mb-6">Save items you like for later</p>
                    <Link to="/products">
                      <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                        Browse Products
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Addresses Tab */}
          <TabsContent value="addresses">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-amber-600" /> My Addresses
                </CardTitle>
                <CardDescription>
                  Manage your shipping addresses
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!addingAddress && !editingAddress && (
                  <Button 
                    onClick={() => setAddingAddress(true)} 
                    className="mb-6 bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add New Address
                  </Button>
                )}
                
                {addingAddress && (
                  <Card className="mb-6 border-amber-200 bg-amber-50/50">
                    <CardHeader>
                      <CardTitle className="text-xl">Add New Address</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleAddAddress} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name *</Label>
                            <Input 
                              id="fullName" 
                              value={newAddress.fullName} 
                              onChange={(e) => setNewAddress({...newAddress, fullName: e.target.value})} 
                              className="border-amber-300 focus:border-amber-500"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number *</Label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <span className="text-gray-500">+91</span>
                              </div>
                              <Input 
                                id="phone" 
                                value={newAddress.phone} 
                                onChange={(e) => {
                                  const numericValue = e.target.value.replace(/\D/g, '');
                                  if (numericValue.length <= 10) {
                                    setNewAddress({...newAddress, phone: numericValue});
                                  }
                                }} 
                                className="border-amber-300 focus:border-amber-500 pl-12"
                                maxLength={10}
                                required
                              />
                            </div>
                            {newAddress.phone && !isValidPhoneNumber(newAddress.phone) && (
                              <p className="text-xs text-red-500 flex items-center mt-1">
                                <AlertCircle className="h-3 w-3 mr-1" /> Enter a valid 10-digit mobile number
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="address">Address *</Label>
                          <Textarea 
                            id="address" 
                            value={newAddress.address} 
                            onChange={(e) => setNewAddress({...newAddress, address: e.target.value})} 
                            className="border-amber-300 focus:border-amber-500"
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="state">State *</Label>
                            <Select 
                              value={newAddress.state} 
                              onValueChange={(value) => {
                                setNewAddress({...newAddress, state: value, city: ''});
                              }}
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
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="city">City *</Label>
                            <Select 
                              value={newAddress.city} 
                              onValueChange={(value) => setNewAddress({...newAddress, city: value})}
                              disabled={!newAddress.state}
                            >
                              <SelectTrigger id="city" className="border-amber-300 focus:border-amber-500">
                                <SelectValue placeholder={newAddress.state ? "Select city" : "Select state first"} />
                              </SelectTrigger>
                              <SelectContent>
                                {newAddress.state && indianCities[newAddress.state]?.map((city) => (
                                  <SelectItem key={city} value={city}>{city}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="pincode">PIN Code *</Label>
                            <Input 
                              id="pincode" 
                              value={newAddress.pincode} 
                              onChange={(e) => {
                                const numericValue = e.target.value.replace(/\D/g, '');
                                if (numericValue.length <= 6) {
                                  setNewAddress({...newAddress, pincode: numericValue});
                                }
                              }} 
                              className="border-amber-300 focus:border-amber-500"
                              maxLength={6}
                              required
                            />
                            {newAddress.pincode && !isValidPinCode(newAddress.pincode) && (
                              <p className="text-xs text-red-500 flex items-center mt-1">
                                <AlertCircle className="h-3 w-3 mr-1" /> Enter a valid 6-digit PIN code
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 pt-2">
                          <input 
                            type="checkbox" 
                            id="isDefault" 
                            checked={newAddress.isDefault} 
                            onChange={(e) => setNewAddress({...newAddress, isDefault: e.target.checked})} 
                            className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                          />
                          <Label htmlFor="isDefault" className="text-sm font-normal">Set as default address</Label>
                        </div>
                        
                        <div className="flex justify-end space-x-2 pt-4">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => {
                              setAddingAddress(false);
                              setNewAddress({
                                fullName: '',
                                phone: '',
                                address: '',
                                city: '',
                                state: '',
                                pincode: '',
                                isDefault: false
                              });
                            }}
                            className="border-stone-300"
                          >
                            Cancel
                          </Button>
                          <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white">
                            Save Address
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}
                
                {editingAddress && (
                  <Card className="mb-6 border-amber-200 bg-amber-50/50">
                    <CardHeader>
                      <CardTitle className="text-xl">Edit Address</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleUpdateAddress} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name *</Label>
                            <Input 
                              id="fullName" 
                              value={newAddress.fullName} 
                              onChange={(e) => setNewAddress({...newAddress, fullName: e.target.value})} 
                              className="border-amber-300 focus:border-amber-500"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number *</Label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <span className="text-gray-500">+91</span>
                              </div>
                              <Input 
                                id="phone" 
                                value={newAddress.phone} 
                                onChange={(e) => {
                                  const numericValue = e.target.value.replace(/\D/g, '');
                                  if (numericValue.length <= 10) {
                                    setNewAddress({...newAddress, phone: numericValue});
                                  }
                                }} 
                                className="border-amber-300 focus:border-amber-500 pl-12"
                                maxLength={10}
                                required
                              />
                            </div>
                            {newAddress.phone && !isValidPhoneNumber(newAddress.phone) && (
                              <p className="text-xs text-red-500 flex items-center mt-1">
                                <AlertCircle className="h-3 w-3 mr-1" /> Enter a valid 10-digit mobile number
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="address">Address *</Label>
                          <Textarea 
                            id="address" 
                            value={newAddress.address} 
                            onChange={(e) => setNewAddress({...newAddress, address: e.target.value})} 
                            className="border-amber-300 focus:border-amber-500"
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="state">State *</Label>
                            <Select 
                              value={newAddress.state} 
                              onValueChange={(value) => {
                                setNewAddress({...newAddress, state: value, city: ''});
                              }}
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
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="city">City *</Label>
                            <Select 
                              value={newAddress.city} 
                              onValueChange={(value) => setNewAddress({...newAddress, city: value})}
                              disabled={!newAddress.state}
                            >
                              <SelectTrigger id="city" className="border-amber-300 focus:border-amber-500">
                                <SelectValue placeholder={newAddress.state ? "Select city" : "Select state first"} />
                              </SelectTrigger>
                              <SelectContent>
                                {newAddress.state && indianCities[newAddress.state]?.map((city) => (
                                  <SelectItem key={city} value={city}>{city}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="pincode">PIN Code *</Label>
                            <Input 
                              id="pincode" 
                              value={newAddress.pincode} 
                              onChange={(e) => {
                                const numericValue = e.target.value.replace(/\D/g, '');
                                if (numericValue.length <= 6) {
                                  setNewAddress({...newAddress, pincode: numericValue});
                                }
                              }} 
                              className="border-amber-300 focus:border-amber-500"
                              maxLength={6}
                              required
                            />
                            {newAddress.pincode && !isValidPinCode(newAddress.pincode) && (
                              <p className="text-xs text-red-500 flex items-center mt-1">
                                <AlertCircle className="h-3 w-3 mr-1" /> Enter a valid 6-digit PIN code
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 pt-2">
                          <input 
                            type="checkbox" 
                            id="isDefault" 
                            checked={newAddress.isDefault} 
                            onChange={(e) => setNewAddress({...newAddress, isDefault: e.target.checked})} 
                            className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                          />
                          <Label htmlFor="isDefault" className="text-sm font-normal">Set as default address</Label>
                        </div>
                        
                        <div className="flex justify-end space-x-2 pt-4">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => {
                              setEditingAddress(null);
                              setNewAddress({
                                fullName: '',
                                phone: '',
                                address: '',
                                city: '',
                                state: '',
                                pincode: '',
                                isDefault: false
                              });
                            }}
                            className="border-stone-300"
                          >
                            Cancel
                          </Button>
                          <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white">
                            Update Address
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}
                
                {addresses.length > 0 ? (
                  <div className="space-y-4">
                    {addresses.map(address => (
                      <Card key={address.id} className={`${address.isDefault ? 'border-amber-400 bg-amber-50/50' : 'border-stone-200'}`}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center mb-2">
                                <h3 className="font-medium">{address.fullName}</h3>
                                {address.isDefault && (
                                  <Badge className="ml-2 bg-amber-100 text-amber-800">Default</Badge>
                                )}
                              </div>
                              <p className="text-stone-600">{address.address}</p>
                              <p className="text-stone-600">{address.city}, {address.state} - {address.pincode}</p>
                              <p className="text-stone-600">Phone: {address.phone}</p>
                            </div>
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8 border-amber-600 text-amber-700"
                                onClick={() => handleEditAddress(address)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8 border-red-600 text-red-700"
                                onClick={() => handleDeleteAddress(address.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          {!address.isDefault && (
                            <Button 
                              variant="link" 
                              className="text-amber-600 p-0 h-auto mt-2"
                              onClick={() => handleSetDefaultAddress(address.id)}
                            >
                              Set as default
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MapPin className="h-12 w-12 text-amber-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-amber-800 mb-2">No Addresses Saved</h3>
                    <p className="text-stone-600 mb-6">Add a shipping address to make checkout faster</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Payment Methods Tab */}
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5 text-amber-600" /> Payment Methods
                </CardTitle>
                <CardDescription>
                  Manage your saved payment methods
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!addingPaymentMethod && (
                  <Button 
                    onClick={() => setAddingPaymentMethod(true)} 
                    className="mb-6 bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add New Payment Method
                  </Button>
                )}
                
                {addingPaymentMethod && (
                  <Card className="mb-6 border-amber-200 bg-amber-50/50">
                    <CardHeader>
                      <CardTitle className="text-xl">Add New Payment Method</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleAddPaymentMethod} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number *</Label>
                          <div className="relative">
                            <Input 
                              id="cardNumber" 
                              value={newPaymentMethod.cardNumber} 
                              onChange={(e) => {
                                const numericValue = e.target.value.replace(/\D/g, '');
                                if (numericValue.length <= 16) {
                                  setNewPaymentMethod({...newPaymentMethod, cardNumber: numericValue});
                                }
                              }} 
                              className="border-amber-300 focus:border-amber-500 pr-10"
                              maxLength={16}
                              required
                              placeholder="1234 5678 9012 3456"
                            />
                            <Button 
                              type="button"
                              variant="ghost" 
                              size="icon" 
                              className="absolute right-0 top-0 h-full"
                              onClick={() => setShowCardNumber(!showCardNumber)}
                            >
                              {showCardNumber ? (
                                <EyeOff className="h-4 w-4 text-stone-500" />
                              ) : (
                                <Eye className="h-4 w-4 text-stone-500" />
                              )}
                            </Button>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="nameOnCard">Name on Card *</Label>
                          <Input 
                            id="nameOnCard" 
                            value={newPaymentMethod.nameOnCard} 
                            onChange={(e) => setNewPaymentMethod({...newPaymentMethod, nameOnCard: e.target.value})} 
                            className="border-amber-300 focus:border-amber-500"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate">Expiry Date (MM/YY) *</Label>
                          <Input 
                            id="expiryDate" 
                            value={newPaymentMethod.expiryDate} 
                            onChange={(e) => {
                              let value = e.target.value.replace(/[^0-9\/]/g, '');
                              if (value.length === 2 && !value.includes('/') && newPaymentMethod.expiryDate.length === 1) {
                                value += '/';
                              }
                              if (value.length <= 5) {
                                setNewPaymentMethod({...newPaymentMethod, expiryDate: value});
                              }
                            }} 
                            className="border-amber-300 focus:border-amber-500"
                            placeholder="MM/YY"
                            maxLength={5}
                            required
                          />
                        </div>
                        
                        <div className="flex items-center space-x-2 pt-2">
                          <input 
                            type="checkbox" 
                            id="isDefaultPayment" 
                            checked={newPaymentMethod.isDefault} 
                            onChange={(e) => setNewPaymentMethod({...newPaymentMethod, isDefault: e.target.checked})} 
                            className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                          />
                          <Label htmlFor="isDefaultPayment" className="text-sm font-normal">Set as default payment method</Label>
                        </div>
                        
                        <div className="flex justify-end space-x-2 pt-4">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => {
                              setAddingPaymentMethod(false);
                              setNewPaymentMethod({
                                cardNumber: '',
                                nameOnCard: '',
                                expiryDate: '',
                                isDefault: false
                              });
                            }}
                            className="border-stone-300"
                          >
                            Cancel
                          </Button>
                          <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white">
                            Save Payment Method
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}
                
                {paymentMethods.length > 0 ? (
                  <div className="space-y-4">
                    {paymentMethods.map(method => (
                      <Card key={method.id} className={`${method.isDefault ? 'border-amber-400 bg-amber-50/50' : 'border-stone-200'}`}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center mb-2">
                                <h3 className="font-medium">Card ending in {method.cardNumber.slice(-4)}</h3>
                                {method.isDefault && (
                                  <Badge className="ml-2 bg-amber-100 text-amber-800">Default</Badge>
                                )}
                              </div>
                              <p className="text-stone-600">{method.nameOnCard}</p>
                              <p className="text-stone-600">Expires: {method.expiryDate}</p>
                            </div>
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8 border-red-600 text-red-700"
                                onClick={() => handleDeletePaymentMethod(method.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          {!method.isDefault && (
                             <Button 
                              variant="link" 
                              className="text-amber-600 p-0 h-auto mt-2"
                              onClick={() => handleSetDefaultPaymentMethod(method.id)}
                            >
                              Set as default
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CreditCard className="h-12 w-12 text-stone-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-stone-600 mb-2">No Payment Methods</h3>
                    <p className="text-stone-500 mb-4">You haven't added any payment methods yet.</p>
                    <Button 
                      onClick={() => setAddingPaymentMethod(true)}
                      className="bg-amber-600 hover:bg-amber-700 text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Payment Method
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Support Tab */}
            <TabsContent value="support">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5 text-amber-600" /> Customer Support
                  </CardTitle>
                  <CardDescription>
                    Get help with your orders or ask us anything
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SupportTicketComponent />
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Settings Tab */}
            <TabsContent value="settings">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="mr-2 h-5 w-5 text-amber-600" /> Personal Information
                    </CardTitle>
                    <CardDescription>
                      Update your personal details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input 
                          id="fullName" 
                          value={profile.fullName} 
                          onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                          className="border-stone-300"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={profile.email} 
                          onChange={(e) => setProfile({...profile, email: e.target.value})}
                          className="border-stone-300"
                          disabled
                        />
                        <p className="text-xs text-stone-500">Email cannot be changed</p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          value={profile.phone} 
                          onChange={(e) => setProfile({...profile, phone: e.target.value})}
                          className="border-stone-300"
                        />
                      </div>
                      
                      <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white">
                        Update Profile
                      </Button>
                    </form>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Lock className="mr-2 h-5 w-5 text-amber-600" /> Password
                    </CardTitle>
                    <CardDescription>
                      Change your password
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input 
                          id="currentPassword" 
                          type="password" 
                          value={passwordForm.currentPassword} 
                          onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                          className="border-stone-300"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input 
                          id="newPassword" 
                          type="password" 
                          value={passwordForm.newPassword} 
                          onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                          className="border-stone-300"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input 
                          id="confirmPassword" 
                          type="password" 
                          value={passwordForm.confirmPassword} 
                          onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                          className="border-stone-300"
                        />
                      </div>
                      
                      <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white">
                        Change Password
                      </Button>
                    </form>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center text-red-600">
                      <AlertCircle className="mr-2 h-5 w-5" /> Account Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      variant="destructive" 
                      onClick={handleLogout}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <LogOut className="h-4 w-4 mr-2" /> Logout
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    );
};

export default ProfilePage;
