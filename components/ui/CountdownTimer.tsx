"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Clock } from "lucide-react";
import gsap from "gsap";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export default function CountdownTimer() {
  // Set Black Friday end date - UPDATE THIS DATE!
  // Example: Set to 3 days from now for testing
  const blackFridayEnd = useMemo(() => {
    // OPTION 1: Set a specific date
    // return new Date("2025-11-29T23:59:59").getTime();
    
    // OPTION 2: For testing - 3 days from now
    const now = new Date();
    const endDate = new Date(now.getTime() + (3 * 24 * 60 * 60 * 1000)); // 3 days
    return endDate.getTime();
  }, []);
  
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });
  
  const timerRef = useRef<HTMLDivElement>(null);
  const secondsRef = useRef<HTMLDivElement>(null);
  const prevSecondsRef = useRef<number>(0);

  // Calculate time left
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
    // Set initial time immediately
    const initialTime = calculateTimeLeft();
    setTimeLeft(initialTime);
    prevSecondsRef.current = initialTime.seconds;

    // Entrance animation
    if (timerRef.current) {
      gsap.fromTo(
        timerRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out", delay: 0.2 }
      );
    }

    // Update every second
    const timer = setInterval(() => {
      const newTime = calculateTimeLeft();
      
      // Only update if seconds actually changed (prevents unnecessary renders)
      if (newTime.seconds !== prevSecondsRef.current) {
        setTimeLeft(newTime);
        prevSecondsRef.current = newTime.seconds;

        // Animate seconds change
        if (secondsRef.current && !newTime.isExpired) {
          gsap.fromTo(
            secondsRef.current,
            { scale: 1.15 },
            { scale: 1, duration: 0.3, ease: "back.out(2)" }
          );
        }
      }

      // Stop timer if expired
      if (newTime.isExpired) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  // Don't show if expired
  if (timeLeft.isExpired) {
    return null;
  }

  // Determine urgency level
  const isUrgent = timeLeft.days === 0 && timeLeft.hours < 3;
  const isWarning = timeLeft.days === 0 && timeLeft.hours < 12;

  return (
    <div
      ref={timerRef}
      className={`hidden md:flex items-center gap-2 px-3 py-2 rounded-lg border backdrop-blur-sm transition-all duration-300 relative overflow-hidden ${
        isUrgent
          ? "bg-red-500/20 border-red-500/50"
          : isWarning
          ? "bg-orange-500/20 border-orange-500/50"
          : "bg-[oklch(25%_0.06_260)] border-[oklch(65%_0.28_25)]/40"
      }`}
    >
      {/* Animated shimmer overlay */}
      {!isUrgent && (
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
            animation: 'shimmer-wave 4s infinite'
          }}
        />
      )}
      
      {/* Intense pulse for urgent */}
      {isUrgent && (
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.8), transparent)',
            animation: 'intense-pulse 1s ease-in-out infinite'
          }}
        />
      )}

      {/* Clock Icon */}
      <Clock
        className={`w-4 h-4 relative z-10 ${
          isUrgent ? "text-red-400 animate-float" : isWarning ? "text-orange-400 animate-float" : "text-[oklch(82%_0.22_100)] animate-float"
        }`}
      />

      {/* Label */}
      <span className={`text-xs font-semibold uppercase tracking-wide relative z-10 ${
        isUrgent ? "text-red-300 animate-pulse" : "text-white/90"
      }`}>
        {isUrgent ? "Se termine!" : "Fin dans:"}
      </span>

      {/* Time Units */}
      <div className="flex items-center gap-1.5 relative z-10">
        {timeLeft.days > 0 && (
          <TimeUnit value={timeLeft.days} label="j" index={0} />
        )}
        <TimeUnit value={timeLeft.hours} label="h" index={1} />
        <span className="text-[oklch(82%_0.22_100)] font-bold drop-shadow-sm animate-float">:</span>
        <TimeUnit value={timeLeft.minutes} label="m" index={2} />
        <span className="text-[oklch(82%_0.22_100)] font-bold drop-shadow-sm animate-float">:</span>
        <div ref={secondsRef}>
          <TimeUnit value={timeLeft.seconds} label="s" highlight index={3} />
        </div>
      </div>
    </div>
  );
}

interface TimeUnitProps {
  value: number;
  label: string;
  highlight?: boolean;
  index?: number;
}

function TimeUnit({ value, label, highlight, index = 0 }: TimeUnitProps) {
  // Different gradient colors for each unit
  const gradients = [
    "from-[oklch(65%_0.28_25)] to-[oklch(75%_0.25_20)]", // Red-Orange for days
    "from-[oklch(70%_0.26_30)] to-[oklch(80%_0.24_40)]", // Orange for hours
    "from-[oklch(75%_0.24_50)] to-[oklch(85%_0.22_60)]", // Yellow-Orange for minutes
    "from-[oklch(65%_0.28_25)] via-[oklch(75%_0.25_20)] to-[oklch(82%_0.22_100)]", // Red to Yellow for seconds
  ];

  return (
    <div className="flex items-center gap-0.5">
      <div
        className={`relative min-w-[28px] h-8 flex items-center justify-center rounded font-black text-base overflow-hidden ${
          highlight
            ? `bg-gradient-to-br ${gradients[3]} text-white shadow-lg`
            : `bg-gradient-to-br ${gradients[index]} text-white shadow-md`
        }`}
        style={{
          boxShadow: highlight 
            ? "0 0 8px oklch(65% 0.28 25 / 0.4), 0 2px 6px rgba(0,0,0,0.3)"
            : "0 2px 6px rgba(0,0,0,0.2)",
        }}
      >
        {/* Shine effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50" />
        
        {/* Animated shimmer for highlight */}
        {highlight && (
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              animation: 'shimmer-wave 3s infinite'
            }}
          />
        )}
        
        <span className="relative z-10">{String(value).padStart(2, "0")}</span>
      </div>
      <span className="text-[10px] font-medium text-white/70 uppercase">{label}</span>
    </div>
  );
}

