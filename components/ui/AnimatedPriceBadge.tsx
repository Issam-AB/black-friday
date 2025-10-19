"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface AnimatedPriceBadgeProps {
  currentPrice: number;
  originalPrice: number;
  discount: number;
}

export default function AnimatedPriceBadge({
  currentPrice,
  originalPrice,
  discount,
}: AnimatedPriceBadgeProps) {
  const badgeRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const savingsRef = useRef<HTMLDivElement>(null);
  const discountBadgeRef = useRef<HTMLDivElement>(null);
  const [displayPrice, setDisplayPrice] = useState(0);
  const [displaySavings, setDisplaySavings] = useState(0);

  useEffect(() => {
    if (!badgeRef.current) return;

    const savings = originalPrice - currentPrice;

    // Simple fade in
    gsap.fromTo(
      badgeRef.current,
      {
        opacity: 0,
        y: 15,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      }
    );

    // Price counter animation
    const priceCounter = { value: 0 };
    gsap.to(priceCounter, {
      value: currentPrice,
      duration: 1,
      ease: "power2.out",
      delay: 0.2,
      onUpdate: () => {
        setDisplayPrice(Math.round(priceCounter.value));
      },
    });

    // Savings counter animation
    const savingsCounter = { value: 0 };
    gsap.to(savingsCounter, {
      value: savings,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.4,
      onUpdate: () => {
        setDisplaySavings(Math.round(savingsCounter.value));
      },
    });

    // Discount badge simple entrance
    if (discountBadgeRef.current) {
      gsap.fromTo(
        discountBadgeRef.current,
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(1.5)",
          delay: 0.3,
        }
      );
    }
  }, [currentPrice, originalPrice]);

  return (
    <div ref={badgeRef} className="relative">
      {/* Main Price Badge */}
      <div className="relative bg-gradient-to-br from-[oklch(25%_0.08_260)] to-[oklch(20%_0.06_260)] rounded-2xl p-4 sm:p-6 shadow-xl border border-[oklch(65%_0.28_25)]/30">
        {/* Discount Badge - Top Right */}
        <div
          ref={discountBadgeRef}
          className="absolute -top-3 -right-3 bg-gradient-to-br from-[oklch(65%_0.28_25)] to-[oklch(75%_0.25_20)] text-white font-black text-lg px-4 py-2 rounded-full shadow-lg"
        >
          -{discount}%
        </div>

        <div className="space-y-3">
          {/* Current Price */}
          <div className="flex items-baseline gap-2">
            <div
              ref={priceRef}
              className="text-4xl sm:text-5xl font-black text-[oklch(82%_0.22_100)] tracking-tight"
            >
              {displayPrice.toLocaleString()}
              <span className="text-2xl sm:text-3xl ml-1 font-bold">DH</span>
            </div>
          </div>

          {/* Original Price - Strikethrough */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <span className="text-lg text-gray-400 font-semibold">
                {originalPrice.toLocaleString()} DH
              </span>
              <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-red-500 transform -rotate-6" />
            </div>
          </div>

          {/* Savings Badge */}
          <div
            ref={savingsRef}
            className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-bold px-3 py-1.5 rounded-lg shadow-md"
          >
            <span className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Économisez {displaySavings.toLocaleString()} DH
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

