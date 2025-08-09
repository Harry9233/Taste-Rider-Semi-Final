import React from 'react';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import ProductsSection from '@/components/ProductsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import AuthenticFlavorsSection from '@/components/AuthenticFlavorsSection';
import AnimatedSection from '@/components/AnimatedSection';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Star, Leaf, Utensils, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { signatureSpicesWithPics, chocolateProducts } from '@/lib/products';

const HomePage = ({
  heroImages,
  onAddToCart,
  initialProducts = [],
  cartItems,
  onUpdateQuantity,
}) => {

      const heroBannerImages = [
        "/images/Hero%20setion%201.jpg",
        "/images/Hero%20section%202.jpg",
        "/images/Hero%20section%203.jpg",
        "/images/Hero%20Section%204.jpg"
      ];

      // Remove Premium Almonds, Organic Cashews, Maharaja Chai Blend from all product sections
      const signatureDryFruits =
        (Array.isArray(initialProducts) ? initialProducts : []).filter(
          (p) => p.category === "Dry Fruits" && !["7", "8"].includes(p.id)
        ).slice(0, 4);
      const signatureTasteRiderSpecials = signatureSpicesWithPics.filter(
          (p) => p.category === "Taste Rider Specials"
        ).slice(0, 4);

      const signatureChocolates = chocolateProducts.slice(0, 4);

      return (
        <div className="space-y-0 overflow-x-hidden">
          <AnimatedSection className="pb-0 mb-0">
            <HeroSection images={heroBannerImages} />
          </AnimatedSection>
          <AnimatedSection className="py-0 mt-0">
            <AuthenticFlavorsSection
              title={<span className="text-underline-scribble">Taste like never before</span>}
              subtitle={
                "Journey through a world of rich aromas and exquisite tastes.\nOur handpicked spices and premium dry fruits are curated to bring the essence of traditional Indian cuisine to your kitchen."
              }
              ctaText="Ride the Flavor!"
              ctaLink="/product-categories"
            />
          </AnimatedSection>
          <AnimatedSection className="py-0" id="features-section">
            <FeaturesSection />
          </AnimatedSection>
          
          {/* View Cart Button removed */}
          
          {signatureSpicesWithPics.length > 0 && (
            <AnimatedSection className="py-2 md:py-3">
              <ProductsSection
                title="Our Signature Spices"
                products={signatureSpicesWithPics.filter(p => p.name !== 'Shikanji Masala' && p.name !== 'Maharaja Chai Blend')}
                onAddToCart={onAddToCart}
                cartItems={cartItems}
                onUpdateQuantity={onUpdateQuantity}
                gridCols="grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                showViewAll={true}
                linkToDetail={true} // <-- Add this prop
              />
            </AnimatedSection>
          )}

          {signatureTasteRiderSpecials.length > 0 && (
            <AnimatedSection className="py-2 md:py-3">
              <ProductsSection
                title="Our Signature Taste Rider Specials"
                products={signatureTasteRiderSpecials}
                onAddToCart={onAddToCart}
                cartItems={cartItems}
                onUpdateQuantity={onUpdateQuantity}
                gridCols="grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                showViewAll={true}
                linkToDetail={true}
              />
            </AnimatedSection>
          )}

          {signatureChocolates.length > 0 && (
            <AnimatedSection className="py-2 md:py-3">
              <ProductsSection
                title="Our Signature Chocolates"
                products={signatureChocolates}
                onAddToCart={onAddToCart}
                cartItems={cartItems}
                onUpdateQuantity={onUpdateQuantity}
                gridCols="grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                showViewAll={true}
                linkToDetail={true}
              />
            </AnimatedSection>
          )}

          <AnimatedSection className="pt-2 md:pt-3">
            <TestimonialsSection />
          </AnimatedSection>
        </div>
      );
    };

export default HomePage;
