"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Flame, Zap } from "lucide-react";
import gsap from "gsap";

export default function UrgentBanner() {
  // Match the date with CountdownTimer.tsx
  const blackFridayEnd = useMemo(() => {
    // OPTION 1: Set a specific date
    // return new Date("2025-11-29T23:59:59").getTime();
    
    // OPTION 2: For testing - 3 days from now
    const now = new Date();
    const endDate = new Date(now.getTime() + (3 * 24 * 60 * 60 * 1000));
    return endDate.getTime();
  }, []);

  const bannerRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const [hours, setHours] = useState(0);
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    const checkUrgency = () => {
      const now = Date.now();
      const difference = blackFridayEnd - now;

      if (difference <= 0) {
        setShow(false);
        return;
      }

      const hoursLeft = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const daysLeft = Math.floor(difference / (1000 * 60 * 60 * 24));
      const totalHoursLeft = Math.floor(difference / (1000 * 60 * 60));

      setHours(hoursLeft);
      setTotalHours(totalHoursLeft);
      
      // Show banner if less than 12 hours left total
      if (totalHoursLeft < 12 && totalHoursLeft > 0) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    // Check immediately
    checkUrgency();
    
    // Check every 30 seconds for more responsive updates
    const interval = setInterval(checkUrgency, 30000);

    return () => clearInterval(interval);
  }, [blackFridayEnd]);

  useEffect(() => {
    if (show && bannerRef.current) {
      gsap.fromTo(
        bannerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [show]);

  if (!show) return null;

  const isVeryUrgent = totalHours < 3;

  return (
    <div
      ref={bannerRef}
      className={`w-full py-3 relative overflow-hidden ${
        isVeryUrgent
          ? "bg-gradient-to-r from-red-600 via-red-500 to-red-600"
          : "bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600"
      }`}
    >
      {/* Animated shimmer overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
          animation: 'shimmer-wave 2s infinite'
        }}
      />
      
      {/* Rotating gradient background for very urgent */}
      {isVeryUrgent && (
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.5), transparent)',
            animation: 'rotate-gradient 3s linear infinite'
          }}
        />
      )}

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {isVeryUrgent ? (
            <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-white animate-bounce-glow" />
          ) : (
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white animate-float" />
          )}
          
          <span className={`text-white font-black text-base sm:text-lg uppercase tracking-wide text-center ${
            isVeryUrgent ? 'animate-neon-glow' : 'animate-text-shimmer'
          }`}>
            {isVeryUrgent ? (
              <>⚡ DERNIÈRES HEURES! Plus que {totalHours}h pour profiter! ⚡</>
            ) : (
              <>🔥 URGENT: Plus que {totalHours} heures avant la fin! 🔥</>
            )}
          </span>

          {isVeryUrgent && (
            <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-white animate-bounce-glow" />
          )}
        </div>
      </div>
    </div>
  );
}

