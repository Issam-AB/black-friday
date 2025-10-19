"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Clock } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export default function MobileCountdown() {
  // Match the date with CountdownTimer.tsx
  const blackFridayEnd = useMemo(() => {
    // OPTION 1: Set a specific date
    // return new Date("2025-11-29T23:59:59").getTime();
    
    // OPTION 2: For testing - 3 days from now
    const now = new Date();
    const endDate = new Date(now.getTime() + (3 * 24 * 60 * 60 * 1000));
    return endDate.getTime();
  }, []);
  
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  const prevSecondsRef = useRef<number>(0);

  const calculateTimeLeft = useMemo(() => {
    return (): TimeLeft => {
      const now = Date.now();
      const difference = blackFridayEnd - now;

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isExpired: false,
      };
    };
  }, [blackFridayEnd]);

  useEffect(() => {
    // Set initial time
    const initialTime = calculateTimeLeft();
    setTimeLeft(initialTime);
    prevSecondsRef.current = initialTime.seconds;

    // Update every second
    const timer = setInterval(() => {
      const newTime = calculateTimeLeft();
      
      // Only update if changed
      if (newTime.seconds !== prevSecondsRef.current) {
        setTimeLeft(newTime);
        prevSecondsRef.current = newTime.seconds;
      }

      if (newTime.isExpired) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  if (timeLeft.isExpired) {
    return null;
  }

  const isUrgent = timeLeft.days === 0 && timeLeft.hours < 3;

  return (
    <div
      className={`md:hidden flex items-center justify-center gap-1 px-2 sm:px-2.5 py-2 rounded-lg border relative overflow-hidden ${
        isUrgent
          ? "bg-gradient-to-r from-red-600 to-red-500 border-red-400/50"
          : "bg-gradient-to-r from-[oklch(65%_0.28_25)] to-[oklch(75%_0.25_20)] border-[oklch(82%_0.22_100)]/40"
      }`}
      style={{
        boxShadow: isUrgent
          ? "0 0 8px rgba(239, 68, 68, 0.3)"
          : "0 2px 6px rgba(0,0,0,0.15)",
      }}
    >
      {/* Subtle shine overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent opacity-60" />
      
      {/* Reduced shimmer effect */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          animation: 'shimmer-wave 3s infinite'
        }}
      />
      
      {/* Subtle pulse for urgent */}
      {isUrgent && (
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.6), transparent)',
            animation: 'intense-pulse 1.5s ease-in-out infinite'
          }}
        />
      )}
      
      <Clock className={`w-3 sm:w-3.5 h-3 sm:h-3.5 text-white relative z-10 flex-shrink-0 ${
        isUrgent ? 'animate-pulse' : ''
      }`} />
      <div className="relative z-10 flex items-baseline gap-0.5">
        {timeLeft.days > 0 && (
          <span className="text-[10px] sm:text-xs font-black text-white drop-shadow-sm">
            {timeLeft.days}
            <span className="text-[8px] sm:text-[10px] font-semibold">j</span>
          </span>
        )}
        <span className={`text-[11px] sm:text-xs font-black text-white drop-shadow-sm whitespace-nowrap tabular-nums ${
          isUrgent ? 'animate-pulse' : ''
        }`}>
          {String(timeLeft.hours).padStart(2, "0")}:
          {String(timeLeft.minutes).padStart(2, "0")}:
          {String(timeLeft.seconds).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

