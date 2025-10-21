"use client";

import { useState, useMemo, useEffect } from "react";
import Navbar from "@/components/sections/Navbar";
import UrgentBanner from "@/components/ui/UrgentBanner";
import ProductCard from "@/components/sections/ProductCard";
import FloatingParticles from "@/components/ui/FloatingParticles";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { products } from "@/data/products";
import gsap from "gsap";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("TOUS");
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // Filter products based on active category
  const filteredProducts = useMemo(() => {
    if (activeCategory === "TOUS") {
      return products;
    }
    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory]);

  // Handle loading complete
  const handleLoadingComplete = () => {
    setIsLoading(false);
    setShowContent(true);
    
    // Animate content entrance
    gsap.fromTo(
      ".main-content",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
    );

    gsap.fromTo(
      ".product-card",
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: "back.out(1.2)",
        delay: 0.5,
      }
    );
  };

  // Prevent scroll during loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <>
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}

      {/* Main Content - Only show after loading */}
      <div className={`min-h-screen relative transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
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

        {/* Sticky Navbar - Only show after loading */}
        {showContent && (
          <Navbar
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        )}

        {/* Urgent Banner (shows when < 12 hours left) */}
        {showContent && <UrgentBanner />}

        {/* Main Content */}
        <main className="relative pt-40 sm:pt-44 md:pt-32 lg:pt-28 pb-8 sm:pb-12 px-4 sm:px-6 md:px-8 lg:px-10 main-content">
          {/* Product Grid - Mobile First: 1 column, then progressively more */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-4 md:gap-5 lg:gap-6 max-w-[1920px] mx-auto">
            {filteredProducts.map((product, index) => (
              <div key={product.id} className="product-card">
                <ProductCard product={product} index={index} />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 sm:py-20 px-4">
              <p className="text-white/70 text-base sm:text-lg text-center">
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
    </>
  );
}
