"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { categories } from "@/data/products";
import AnimatedLogo from "@/components/ui/AnimatedLogo";
import CountdownTimer from "@/components/ui/CountdownTimer";
import MobileCountdown from "@/components/ui/MobileCountdown";
import gsap from "gsap";

interface NavbarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function Navbar({ activeCategory, onCategoryChange }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // GSAP slide-in animation on mount
    gsap.fromTo(
      ".navbar-content",
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-[var(--bg-navbar)] shadow-2xl"
          : "bg-[var(--bg-navbar)]/95 backdrop-blur-lg"
      )}
      style={{
        paddingTop: 'env(safe-area-inset-top)',
      }}
    >
      {/* Desktop Navigation */}
      <div className="hidden lg:block navbar-content">
        <div className="max-w-[1920px] mx-auto px-6 xl:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <AnimatedLogo />
            </div>

            {/* Center Navigation - Chevron Style */}
            <div className="flex items-center gap-1">
              {categories.map((category, index) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => {
                      onCategoryChange(category);
                      const btn = document.querySelector(`[data-nav="${category}"]`);
                      if (btn) {
                        gsap.fromTo(
                          btn,
                          { scale: 0.95, y: -2 },
                          { scale: 1, y: 0, duration: 0.3, ease: "back.out(2)" }
                        );
                      }
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        gsap.to(e.currentTarget, {
                          y: -2,
                          duration: 0.2,
                          ease: "power2.out",
                        });
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        gsap.to(e.currentTarget, {
                          y: 0,
                          duration: 0.2,
                          ease: "power2.in",
                        });
                      }
                    }}
                    data-nav={category}
                    className={cn(
                      "relative px-6 py-3 text-sm font-bold uppercase tracking-wide transition-all duration-300",
                      isActive
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                    )}
                    style={{
                      clipPath: isActive
                        ? "polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%)"
                        : "none",
                    }}
                  >
                    {/* Active Background with Chevron */}
                    {isActive && (
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-[oklch(65%_0.28_25)] to-[oklch(75%_0.25_20)] -z-10"
                        style={{
                          clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%)",
                        }}
                      />
                    )}
                    <span className="relative z-10">{category}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Side - Countdown + Search */}
            <div className="flex items-center gap-4">
              <CountdownTimer />
              
              <div className="relative w-[280px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
                <input
                  type="text"
                  placeholder="RECHERCHER"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={(e) => {
                    gsap.to(e.currentTarget, {
                      scale: 1.01,
                      duration: 0.3,
                      ease: "power2.out",
                    });
                  }}
                  onBlur={(e) => {
                    gsap.to(e.currentTarget, {
                      scale: 1,
                      duration: 0.3,
                      ease: "power2.in",
                    });
                  }}
                  className="w-full bg-[var(--bg-filter)] text-white placeholder:text-white/40 placeholder:text-xs placeholder:font-semibold rounded-lg pl-11 pr-4 py-3 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-[oklch(65%_0.28_25_/_0.4)] focus:shadow-[0_0_0_3px_oklch(65%_0.28_25_/_0.1)] transition-all uppercase"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Navigation */}
      <div className="lg:hidden navbar-content">
        {/* Top Row - Better spacing and touch targets */}
        <div className="flex items-center justify-between gap-2 px-4 py-3">
          <div className="flex-shrink-0">
            <AnimatedLogo />
          </div>

          <div className="flex items-center gap-2 flex-1 justify-end max-w-[70%]">
            <MobileCountdown />
            
            <div className="relative flex-1 max-w-[160px] sm:max-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/50 pointer-events-none" />
              <input
                type="text"
                placeholder="Recherche..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[var(--bg-filter)] text-white placeholder:text-white/50 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[oklch(65%_0.28_25_/_0.4)] focus:shadow-[0_0_0_3px_oklch(65%_0.28_25_/_0.1)] transition-all"
              />
            </div>
          </div>
        </div>

        {/* Categories Row - Improved scrolling with indicators */}
        <div className="relative">
          {/* Gradient fade indicators for scroll */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[var(--bg-navbar)] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[var(--bg-navbar)] to-transparent z-10 pointer-events-none" />
          
          <div 
            className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 px-4 snap-x snap-mandatory scrollbar-hide scroll-smooth"
            style={{
              scrollPaddingLeft: '1rem',
              scrollPaddingRight: '1rem',
            }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  onCategoryChange(category);
                  // Scroll button into view on mobile
                  const btn = document.querySelector(`[data-mobile-cat="${category}"]`);
                  if (btn) {
                    btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                  }
                }}
                data-mobile-cat={category}
                className={cn(
                  "px-4 py-2.5 rounded-lg text-sm font-bold uppercase whitespace-nowrap transition-all duration-300 flex-shrink-0 snap-center",
                  "min-h-[44px] flex items-center justify-center",
                  "active:scale-95 touch-manipulation",
                  activeCategory === category
                    ? "bg-gradient-to-r from-[oklch(65%_0.28_25)] to-[oklch(75%_0.25_20)] text-white shadow-lg shadow-[oklch(65%_0.28_25)]/30"
                    : "bg-[var(--bg-filter)] text-white/80 hover:bg-[var(--bg-filter-hover)] hover:text-white"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

