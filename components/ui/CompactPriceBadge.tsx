"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface CompactPriceBadgeProps {
  currentPrice: number;
  originalPrice: number;
  discount: number;
}

export default function CompactPriceBadge({
  currentPrice,
  originalPrice,
  discount,
}: CompactPriceBadgeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const priceBadgeRef = useRef<HTMLDivElement>(null);
  const currentPriceRef = useRef<HTMLSpanElement>(null);
  const originalPriceRef = useRef<HTMLDivElement>(null);
  const strikethroughRef = useRef<HTMLDivElement>(null);
  const savingsTextRef = useRef<HTMLDivElement>(null);
  const [displayPrice, setDisplayPrice] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create a GSAP context for cleanup
    const ctx = gsap.context(() => {
      // Timeline for coordinated animations
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // 1. Container entrance - subtle slide up
      tl.fromTo(
        containerRef.current,
        { 
          opacity: 0, 
          y: 12,
          scale: 0.98
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.5,
        }
      );

      // 2. Price badge pop
      if (priceBadgeRef.current) {
        tl.fromTo(
          priceBadgeRef.current,
          { 
            scale: 0.9,
            opacity: 0,
          },
          { 
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "back.out(1.5)",
          },
          "-=0.3"
        );
      }

      // 3. Counter animation for current price
      const counter = { value: 0 };
      tl.to(
        counter,
        {
          value: currentPrice,
          duration: 1,
          ease: "power2.inOut",
          onUpdate: () => {
            setDisplayPrice(Math.round(counter.value));
          },
        },
        "-=0.3"
      );

      // 4. Original price fade in
      if (originalPriceRef.current) {
        tl.fromTo(
          originalPriceRef.current,
          { 
            opacity: 0,
            x: -8
          },
          { 
            opacity: 1,
            x: 0,
            duration: 0.3,
          },
          "-=0.5"
        );
      }

      // 5. Strikethrough animation - draws across
      if (strikethroughRef.current) {
        tl.fromTo(
          strikethroughRef.current,
          { 
            scaleX: 0,
            opacity: 0
          },
          { 
            scaleX: 1,
            opacity: 1,
            duration: 0.4,
            ease: "power2.inOut",
          },
          "-=0.15"
        );
      }

      // 6. Savings text subtle fade
      if (savingsTextRef.current) {
        tl.fromTo(
          savingsTextRef.current,
          { 
            opacity: 0,
            y: 5
          },
          { 
            opacity: 1,
            y: 0,
            duration: 0.3,
          },
          "-=0.1"
        );
      }

      // 7. Subtle pulse on current price (one time only)
      if (currentPriceRef.current) {
        tl.to(
          currentPriceRef.current,
          {
            scale: 1.05,
            duration: 0.15,
            ease: "power1.inOut",
            yoyo: true,
            repeat: 1,
          },
          "-=0.1"
        );
      }
    });

    return () => ctx.revert(); // Cleanup
  }, [currentPrice]);

  const savings = originalPrice - currentPrice;

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Main price badge - simplified without duplicate discount */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-zinc-900 via-zinc-900 to-black border border-zinc-800 shadow-lg">
        {/* Subtle shine effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative p-3 sm:p-3 md:p-3.5">
          <div className="flex items-center justify-between gap-2 sm:gap-3">
            {/* Current Price - Bold Red Badge Style */}
            <div ref={priceBadgeRef} className="bg-gradient-to-r from-red-600 to-red-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md shadow-lg inline-flex items-baseline gap-1 flex-shrink-0">
              <span
                ref={currentPriceRef}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-white leading-none drop-shadow-sm"
              >
                {displayPrice.toLocaleString()}
              </span>
              <span className="text-xs sm:text-sm md:text-base font-bold text-white/95">DH</span>
            </div>

            {/* Right side - Original Price & Savings */}
            <div className="flex flex-col items-end gap-0.5 sm:gap-1 min-w-0">
              {/* Original Price with strikethrough */}
              <div ref={originalPriceRef} className="relative">
                <span className="text-xs sm:text-sm text-gray-400 font-medium whitespace-nowrap">
                  {originalPrice.toLocaleString()} DH
                </span>
                <div 
                  ref={strikethroughRef}
                  className="absolute top-1/2 left-0 right-0 h-[1.5px] sm:h-[2px] bg-red-500 origin-left"
                  style={{ transform: "translateY(-50%)" }}
                />
              </div>

              {/* Savings indicator */}
              <div ref={savingsTextRef} className="text-[10px] sm:text-xs text-emerald-400 font-bold whitespace-nowrap">
                Économisez {savings.toLocaleString()} DH
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

