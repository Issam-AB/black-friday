"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/sections/Navbar";
import UrgentBanner from "@/components/ui/UrgentBanner";
import ProductCard from "@/components/sections/ProductCard";
import FloatingParticles from "@/components/ui/FloatingParticles";
import { products } from "@/data/products";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("TOUS");

  // Filter products based on active category
  const filteredProducts = useMemo(() => {
    if (activeCategory === "TOUS") {
      return products;
    }
    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen relative">
      {/* Fixed Gradient Background */}
      <div className="fixed inset-0 min-h-screen -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[oklch(18%_0.04_260)] via-[oklch(20%_0.04_260)] to-[oklch(18%_0.04_260)]"></div>
        
        {/* Animated Top-left glow */}
        <div 
          className="absolute top-0 left-0 w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] bg-gradient-to-br from-[oklch(25%_0.06_260)] to-transparent rounded-full opacity-40 blur-3xl"
          style={{
            animation: 'float 8s ease-in-out infinite'
          }}
        ></div>
        
        {/* Animated Bottom-right glow */}
        <div 
          className="absolute bottom-0 right-0 w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] bg-gradient-to-tl from-[oklch(25%_0.06_260)] to-transparent rounded-full opacity-40 blur-3xl"
          style={{
            animation: 'float 10s ease-in-out infinite reverse'
          }}
        ></div>
        
        {/* Animated Accent glow - red */}
        <div 
          className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-[oklch(65%_0.28_25)]/10 to-transparent rounded-full opacity-30 blur-3xl"
          style={{
            animation: 'pulse-glow 6s ease-in-out infinite'
          }}
        ></div>
        
        {/* Animated Accent glow - yellow */}
        <div 
          className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-[oklch(82%_0.22_100)]/10 to-transparent rounded-full opacity-30 blur-3xl"
          style={{
            animation: 'pulse-glow 7s ease-in-out infinite 1s'
          }}
        ></div>

        {/* Additional moving accent - top right */}
        <div 
          className="absolute top-1/4 right-1/3 w-[300px] h-[300px] bg-gradient-to-br from-[oklch(82%_0.22_100)]/5 to-transparent rounded-full opacity-40 blur-3xl"
          style={{
            animation: 'float 9s ease-in-out infinite 2s'
          }}
        ></div>

        {/* Additional moving accent - bottom left */}
        <div 
          className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-gradient-to-tl from-[oklch(65%_0.28_25)]/5 to-transparent rounded-full opacity-40 blur-3xl"
          style={{
            animation: 'float 11s ease-in-out infinite 3s reverse'
          }}
        ></div>
      </div>

      {/* Floating Particles for Black Friday effect */}
      <FloatingParticles />

      {/* Sticky Navbar */}
      <Navbar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      
      {/* Urgent Banner (shows when < 12 hours left) */}
      <UrgentBanner />

      {/* Main Content */}
      <main className="relative pt-36 sm:pt-40 md:pt-32 lg:pt-28 pb-8 sm:pb-12 px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Product Grid - Mobile First, Desktop 4 columns for better image display */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-white/70 text-lg">
              Aucun produit disponible dans cette catégorie
            </p>
          </div>
        )}
      </main>

      {/* Subtle overlay pattern */}
      <div className="fixed inset-0 pointer-events-none -z-5 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
    </div>
  );
}
