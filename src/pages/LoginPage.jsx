import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from 'react-router-dom';
import { KeyRound, Mail, LogIn, Phone, Shield, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LoginPage = ({ setSession }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Invalid credentials');
      }

      localStorage.setItem('token', data.token);
      setSession(data);
      toast({
        title: "Welcome Back!",
        description: "👋 You have successfully signed in.",
        variant: "default",
        duration: 5000,
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Invalid credentials. Please try again.",
        variant: "destructive",
        duration: 5000,
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
          <CardTitle className="text-3xl font-bold text-amber-800">Welcome Back!</CardTitle>
          <CardDescription className="text-stone-600" style={{ fontFamily: "'Lato', sans-serif" }}>
            Sign in to continue your spice journey.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSignIn}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email-login" className="text-stone-700">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-500" />
                <Input
                  id="email-login"
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
              <Label htmlFor="password-login" className="text-stone-700">Password</Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-500" />
                <Input
                  id="password-login"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 bg-white/50 border-amber-600/40 focus:border-amber-600 text-stone-800 placeholder:text-stone-500"
                  disabled={isLoading}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold flex items-center justify-center"
              style={{ fontFamily: "'Lato', sans-serif", letterSpacing: '0.05em' }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                  ></motion.div>
                  Signing In...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" /> Sign In
                </>
              )}
            </Button>
            <p className="text-sm text-stone-600 text-center" style={{ fontFamily: "'Lato', sans-serif" }}>
              Don't have an account?{' '}
              <Link to="/signup" className="font-semibold text-amber-700 hover:text-amber-800 underline">
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
};

    export default LoginPage;
