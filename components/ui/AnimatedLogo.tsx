"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function AnimatedLogo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const fillCircleRef = useRef<SVGCircleElement>(null);
  const innerCircleRef = useRef<SVGCircleElement>(null);
  const letterSRef = useRef<SVGTextElement>(null);
  const accentLineRef = useRef<SVGPathElement>(null);
  const sparkle1Ref = useRef<SVGPathElement>(null);
  const sparkle2Ref = useRef<SVGPathElement>(null);
  const textBlackRef = useRef<HTMLSpanElement>(null);
  const textFridayRef = useRef<HTMLSpanElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => setIsLoaded(true),
    });

    // Container entrance
    tl.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
    );

    // Circle stroke draw animation (loading progress)
    if (circleRef.current && fillCircleRef.current) {
      const circumference = 2 * Math.PI * 42;
      
      // Set up stroke circle
      gsap.set(circleRef.current, {
        strokeDasharray: circumference,
        strokeDashoffset: circumference,
      });

      // Set up fill circle (starts empty)
      gsap.set(fillCircleRef.current, {
        strokeDasharray: circumference,
        strokeDashoffset: circumference,
      });

      // Animate stroke circle (progress indicator)
      tl.to(
        circleRef.current,
        {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.inOut",
        },
        "-=0.3"
      );

      // Simultaneously fill the circle with color
      tl.to(
        fillCircleRef.current,
        {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.inOut",
        },
        "-=1.5" // Start at the same time as stroke
      );
    }

    // Inner circle expands as loading progresses
    tl.fromTo(
      innerCircleRef.current,
      { 
        scale: 0, 
        opacity: 0, 
        transformOrigin: "center" 
      },
      { 
        scale: 1, 
        opacity: 0.3, 
        duration: 1.2, 
        ease: "power2.out" 
      },
      "-=1.2"
    );

    // Letter S fills up progressively
    tl.fromTo(
      letterSRef.current,
      {
        opacity: 0,
        scale: 0,
        y: 10,
        transformOrigin: "center",
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.5)",
      },
      "-=0.8"
    );

    // Accent line grows
    tl.fromTo(
      accentLineRef.current,
      { scaleY: 0, transformOrigin: "center" },
      { scaleY: 1, duration: 0.4, ease: "power2.out" },
      "-=0.5"
    );

    // Sparkles appear
    tl.fromTo(
      [sparkle1Ref.current, sparkle2Ref.current],
      {
        scale: 0,
        opacity: 0,
        transformOrigin: "center",
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        stagger: 0.1,
        ease: "back.out(2)",
      },
      "-=0.3"
    );

    // After loading is complete, add dynamic continuous animations
    tl.add(() => {
      // S letter pulse with rotation
      gsap.to(letterSRef.current, {
        scale: 1.05,
        rotation: 3,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Circle rotation animation
      gsap.to(circleRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
        transformOrigin: "center",
      });

      // Fill circle counter rotation
      gsap.to(fillCircleRef.current, {
        rotation: -360,
        duration: 15,
        repeat: -1,
        ease: "none",
        transformOrigin: "center",
      });

      // Inner circle pulse
      gsap.to(innerCircleRef.current, {
        scale: 1.05,
        opacity: 0.4,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Sparkles dynamic twinkle with scale
      gsap.to(sparkle1Ref.current, {
        opacity: 0.3,
        scale: 1.5,
        rotation: 180,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(sparkle2Ref.current, {
        opacity: 0.4,
        scale: 1.3,
        rotation: -180,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Accent line pulse
      gsap.to(accentLineRef.current, {
        scaleY: 1.3,
        opacity: 0.7,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, []);

  const handleMouseEnter = () => {
    if (isLoaded) {
      gsap.to(containerRef.current, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      });
      
      gsap.to(letterSRef.current, {
        scale: 1.15,
        rotation: 10,
        duration: 0.3,
        ease: "back.out(2)",
      });

      gsap.to([sparkle1Ref.current, sparkle2Ref.current], {
        scale: 2,
        opacity: 1,
        duration: 0.3,
        ease: "back.out(2)",
      });
    }
  };

  const handleMouseLeave = () => {
    if (isLoaded) {
      gsap.to(containerRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="flex items-center gap-1.5 sm:gap-2 md:gap-3 select-none cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* SVG Icon - Circular S Logo with Morphing */}
      <svg
        width="44"
        height="44"
        viewBox="0 0 100 100"
        className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(65% 0.28 25)" />
            <stop offset="100%" stopColor="oklch(75% 0.25 20)" />
          </linearGradient>
          
          <linearGradient id="fillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(82% 0.22 100)" />
            <stop offset="50%" stopColor="oklch(75% 0.25 20)" />
            <stop offset="100%" stopColor="oklch(65% 0.28 25)" />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="innerGlow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background track circle (lighter, shows the path) */}
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="oklch(30% 0.05 260)"
          strokeWidth="8"
          opacity="0.3"
        />

        {/* Progress fill circle (animated from 0 to 100%) */}
        <circle
          ref={fillCircleRef}
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="url(#fillGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          filter="url(#innerGlow)"
          transform="rotate(-90 50 50)"
        />

        {/* Outer stroke circle (main border animation) */}
        <circle
          ref={circleRef}
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="url(#circleGradient)"
          strokeWidth="2"
          filter="url(#glow)"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* Inner Circle - BLACK BACKGROUND for S */}
        <circle
          ref={innerCircleRef}
          cx="50"
          cy="50"
          r="35"
          fill="oklch(10% 0.01 260)"
          opacity="1"
        />

        {/* Letter S - WHITE on BLACK background */}
        <text
          ref={letterSRef}
          x="50"
          y="70"
          fontSize="60"
          fontWeight="900"
          fill="white"
          fontFamily="'Poppins', sans-serif"
          textAnchor="middle"
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}
        >
          S
        </text>

        {/* Accent line */}
        <path
          ref={accentLineRef}
          d="M50 8 L50 20"
          stroke="oklch(82% 0.22 100)"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Sparkles */}
        <path
          ref={sparkle1Ref}
          d="M15 20 L17 25 L15 30 L10 28 L15 20 Z"
          fill="oklch(82% 0.22 100)"
        />
        <path
          ref={sparkle2Ref}
          d="M85 70 L87 75 L85 80 L80 78 L85 70 Z"
          fill="oklch(82% 0.22 100)"
        />
      </svg>

      {/* Text Logo */}
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline gap-0.5 sm:gap-1">
          <span 
            ref={textBlackRef}
            className="text-base sm:text-lg md:text-xl lg:text-2xl font-black uppercase tracking-tight text-white animate-text-shimmer"
          >
            BLACK
          </span>
          <span 
            ref={textFridayRef}
            className="text-base sm:text-lg md:text-xl lg:text-2xl font-black uppercase tracking-tight bg-gradient-to-r from-[oklch(65%_0.28_25)] via-[oklch(82%_0.22_100)] to-[oklch(65%_0.28_25)] bg-clip-text text-transparent animate-gradient-x"
          >
            FRIDAY
          </span>
        </div>
        <div className="flex items-center gap-0.5 sm:gap-1 mt-0.5">
          <div className="h-[1.5px] w-2 sm:w-3 md:w-4 bg-[oklch(65%_0.28_25)] animate-pulse-glow"></div>
          <span className="text-[8px] sm:text-[9px] md:text-[10px] font-bold uppercase tracking-wider sm:tracking-widest text-[oklch(82%_0.22_100)] animate-float">
            SKETCH DESIGN
          </span>
          <div className="h-[1.5px] w-2 sm:w-3 md:w-4 bg-[oklch(65%_0.28_25)] animate-pulse-glow"></div>
        </div>
      </div>
    </div>
  );
}

