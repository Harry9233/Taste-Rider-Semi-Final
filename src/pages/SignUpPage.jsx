import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
    import { Link, useNavigate } from 'react-router-dom';
    import { UserPlus, Mail, KeyRound } from 'lucide-react';
    import { useToast } from "@/components/ui/use-toast";
        const SignUpPage = () => {
      const { toast } = useToast();
      const navigate = useNavigate();
      const [name, setName] = useState('');
      const [address, setAddress] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [confirmPassword, setConfirmPassword] = useState('');
      const [isLoading, setIsLoading] = useState(false);

      const handleSignUp = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
          toast({
            title: "Passwords Mismatch",
            description: "Please ensure your passwords match.",
            variant: "destructive",
            duration: 3000,
            className: "toast-destructive-theme"
          });
          return;
        }
        setIsLoading(true);

        try {
          const response = await fetch('http://localhost:3001/api/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, address, email, password }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || 'Could not create your account.');
          }

          toast({
            title: "🎉 Account Created!",
            description: "You can now log in with your credentials.",
            duration: 7000,
            className: "toast-success-theme"
          });
          navigate('/login');
        } catch (error) {
          toast({
            title: "Sign Up Failed",
            description: error.message || "Could not create your account. Please try again.",
            variant: "destructive",
            duration: 5000,
            className: "toast-destructive-theme"
          });
        } finally {
          setIsLoading(false);
        }
      };

      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-[calc(100vh-280px)] flex items-center justify-center py-12 px-4"
        >
          <Card className="w-full max-w-md bg-amber-50/70 backdrop-blur-md shadow-2xl border-amber-600/30">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-amber-800">Create Your Account</CardTitle>
              <CardDescription className="text-stone-600" style={{ fontFamily: "'Lato', sans-serif"}}>
                Join Desi Bites and start your flavor adventure!
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSignUp}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name-signup" className="text-stone-700">Full Name</Label>
                  <div className="relative">
                    <UserPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-500" />
                    <Input 
                      id="name-signup" 
                      type="text" 
                      placeholder="Your Full Name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="pl-10 bg-white/50 border-amber-600/40 focus:border-amber-600 text-stone-800 placeholder:text-stone-500" 
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address-signup" className="text-stone-700">Address</Label>
                  <div className="relative">
                    <UserPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-500" />
                    <Input 
                      id="address-signup" 
                      type="text" 
                      placeholder="Your Address" 
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      className="pl-10 bg-white/50 border-amber-600/40 focus:border-amber-600 text-stone-800 placeholder:text-stone-500" 
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-signup" className="text-stone-700">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-500" />
                    <Input 
                      id="email-signup" 
                      type="email" 
                      placeholder="you@example.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 bg-white/50 border-amber-600/40 focus:border-amber-600 text-stone-800 placeholder:text-stone-500" 
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signup" className="text-stone-700">Password</Label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-500" />
                    <Input 
                      id="password-signup" 
                      type="password" 
                      placeholder="Create a strong password (min. 6 chars)" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      className="pl-10 bg-white/50 border-amber-600/40 focus:border-amber-600 text-stone-800 placeholder:text-stone-500"
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password-signup" className="text-stone-700">Confirm Password</Label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-500" />
                    <Input 
                      id="confirm-password-signup" 
                      type="password" 
                      placeholder="Confirm your password" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      minLength={6}
                      className="pl-10 bg-white/50 border-amber-600/40 focus:border-amber-600 text-stone-800 placeholder:text-stone-500"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold flex items-center justify-center" style={{ fontFamily: "'Lato', sans-serif", letterSpacing: '0.05em' }} disabled={isLoading}>
                  {isLoading ? (
                     <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                      ></motion.div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-5 w-5" /> Sign Up
                    </>
                  )}
                </Button>
                <p className="text-sm text-stone-600 text-center" style={{ fontFamily: "'Lato', sans-serif"}}>
                  Already have an account?{' '}
                  <Link to="/login" className="font-semibold text-amber-700 hover:text-amber-800 underline">
                    Sign In
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      );
    };

    export default SignUpPage;
