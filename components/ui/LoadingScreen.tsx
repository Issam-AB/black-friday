"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const logo = logoRef.current;
    const progressBar = progressBarRef.current;
    const progressFill = progressFillRef.current;
    const text = textRef.current;
    const accent = accentRef.current;

    if (!container || !logo || !progressBar || !progressFill || !text || !accent) return;

    // Create timeline
    const tl = gsap.timeline({
      onComplete: () => {
        // Exit animation - clean fade out
        gsap.to(container, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
          onComplete: onLoadingComplete,
        });
      },
    });

    // Initial state
    gsap.set([logo, progressBar, text, accent], { opacity: 0 });
    gsap.set(logo, { scale: 0.8, y: -20 });
    gsap.set(progressBar, { y: 30 });
    gsap.set(text, { y: -30 });
    gsap.set(accent, { scale: 0 });
    gsap.set(progressFill, { scaleX: 0 });

    // Entrance animations - clean and smooth
    tl.to(accent, {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      ease: "back.out(1.5)",
    }, 0)
      .to(logo, {
        scale: 1,
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      }, 0.2)
      .to(text, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      }, 0.4)
      .to(progressBar, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      }, 0.6);

    // Subtle breathing animation for logo
    gsap.to(logo, {
      scale: 1.03,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Subtle rotation for accent
    gsap.to(accent, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none",
    });

    // Progress animation with realistic loading
    const progressTimeline = gsap.timeline();
    progressTimeline
      .to({}, {
        duration: 0.5,
        onUpdate: function() {
          const prog = this.progress() * 30;
          setProgress(Math.floor(prog));
          gsap.to(progressFill, {
            scaleX: prog / 100,
            duration: 0.2,
            ease: "power2.out",
          });
        },
      })
      .to({}, {
        duration: 0.8,
        onUpdate: function() {
          const prog = 30 + (this.progress() * 50);
          setProgress(Math.floor(prog));
          gsap.to(progressFill, {
            scaleX: prog / 100,
            duration: 0.2,
            ease: "power2.out",
          });
        },
      })
      .to({}, {
        duration: 0.5,
        onUpdate: function() {
          const prog = 80 + (this.progress() * 20);
          setProgress(Math.floor(prog));
          gsap.to(progressFill, {
            scaleX: prog / 100,
            duration: 0.2,
            ease: "power2.out",
          });
        },
      });

    return () => {
      tl.kill();
      progressTimeline.kill();
      gsap.killTweensOf([logo, progressBar, text, accent]);
    };
  }, [onLoadingComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, oklch(16% 0.04 260) 0%, oklch(18% 0.04 260) 50%, oklch(16% 0.04 260) 100%)",
      }}
    >
      {/* Minimal clean background - no heavy glows */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, oklch(22% 0.04 260) 0%, transparent 50%)`,
        }}></div>
      </div>

      {/* Main loading content - clean and minimal */}
      <div className="relative z-10 flex flex-col items-center px-4">
        
        {/* Logo container - clean and simple */}
        <div className="relative mb-10">
          {/* Subtle accent circle behind logo */}
          <div
            ref={accentRef}
            className="absolute inset-0 -m-8"
          >
            {/* Single clean ring with gradient */}
            <svg className="w-full h-full" viewBox="0 0 200 200">
              <defs>
                <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="oklch(65% 0.28 25)" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="oklch(82% 0.22 100)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="oklch(65% 0.28 25)" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="url(#ringGradient)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            </svg>
          </div>

          {/* Logo - clean and crisp */}
          <div
            ref={logoRef}
            className="relative w-56 h-56 md:w-64 md:h-64 flex items-center justify-center"
          >
            <img
              src="/logo-white.svg"
              alt="Sketch Design Logo"
              className="w-full h-full object-contain"
              style={{
                filter: "drop-shadow(0 2px 12px rgba(0,0,0,0.4))",
              }}
            />
          </div>
        </div>

        {/* Text - clean typography */}
        <div ref={textRef} className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 tracking-wide">
            SKETCH DESIGN
          </h1>
          <p className="text-sm md:text-base text-white/60 uppercase tracking-[0.3em] font-light">
            Design a Dream
          </p>
        </div>

        {/* Progress bar - minimal and clean */}
        <div ref={progressBarRef} className="w-72 md:w-96">
          {/* Progress track */}
          <div className="relative h-1 bg-white/5 rounded-full overflow-hidden">
            {/* Progress fill with gradient */}
            <div
              ref={progressFillRef}
              className="absolute inset-0 origin-left rounded-full"
              style={{
                background: "linear-gradient(90deg, oklch(65% 0.28 25) 0%, oklch(82% 0.22 100) 100%)",
              }}
            >
              {/* Subtle shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer-smooth"></div>
            </div>
          </div>
          
          {/* Progress percentage */}
          <div className="mt-4 flex items-center justify-between text-xs md:text-sm text-white/50 font-medium">
            <span>Loading</span>
            <span>{progress}%</span>
          </div>
        </div>

        {/* Black Friday accent - subtle */}
        <div className="mt-8 flex items-center gap-2 opacity-40">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[oklch(65%_0.28_25)] to-transparent"></div>
          <span className="text-xs text-white/40 tracking-widest font-light">BLACK FRIDAY</span>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[oklch(82%_0.22_100)] to-transparent"></div>
        </div>
      </div>

      {/* CSS animations - simplified */}
      <style jsx>{`
        @keyframes shimmer-smooth {
          0% { 
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% { 
            transform: translateX(100%);
            opacity: 0;
          }
        }
        
        .animate-shimmer-smooth {
          animation: shimmer-smooth 2.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

