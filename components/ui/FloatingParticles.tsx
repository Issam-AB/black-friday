"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
}

export default function FloatingParticles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create particles
    const particles: Particle[] = Array.from({ length: 20 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      color: Math.random() > 0.5 ? "oklch(65% 0.28 25)" : "oklch(82% 0.22 100)",
      delay: Math.random() * 2,
      duration: Math.random() * 10 + 10,
    }));

    // Animate each particle
    particlesRef.current.forEach((particle, index) => {
      if (!particle) return;

      const data = particles[index];
      
      // Set initial position
      gsap.set(particle, {
        left: `${data.x}%`,
        top: `${data.y}%`,
        width: data.size,
        height: data.size,
        backgroundColor: data.color,
      });

      // Create floating animation
      gsap.to(particle, {
        y: `random(-100, 100)`,
        x: `random(-50, 50)`,
        duration: data.duration,
        delay: data.delay,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Create opacity animation
      gsap.to(particle, {
        opacity: Math.random() * 0.3 + 0.1,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Create scale animation
      gsap.to(particle, {
        scale: Math.random() * 1.5 + 0.5,
        duration: Math.random() * 4 + 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none -z-5 overflow-hidden">
      {Array.from({ length: 20 }).map((_, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) particlesRef.current[index] = el;
          }}
          className="absolute rounded-full blur-sm"
          style={{
            opacity: 0,
            filter: "blur(2px)",
          }}
        />
      ))}
    </div>
  );
}

