"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import CompactPriceBadge from "@/components/ui/CompactPriceBadge";
import type { Product } from "@/data/products";
import gsap from "gsap";

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          delay: index * 0.05,
          ease: "power2.out",
        }
      );
    }
  }, [index]);

  return (
    <Link href={`/product/${product.id}`}>
      <div
        ref={cardRef}
        className="group relative overflow-hidden cursor-pointer rounded-xl border border-white/10 bg-gradient-to-br from-zinc-900/80 to-black/80 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:border-white/20 active:scale-[0.98] sm:hover:-translate-y-2 transition-all duration-300"
      >
        {/* Image Section - Balanced & Visual */}
        <div className="relative aspect-[4/3] sm:aspect-[1/1] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={index < 4}
          />

          {/* Overlay gradient for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 sm:top-3 sm:left-3">
            <span className="bg-gradient-to-r from-red-600 to-orange-500 text-white text-xs sm:text-xs font-bold px-3 py-1.5 sm:px-3 sm:py-1.5 rounded-md shadow-lg uppercase tracking-wide">
              OFFRE LIMITÉE
            </span>
          </div>
          
          <div className="absolute top-3 right-3 sm:top-3 sm:right-3">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500/40 blur-md rounded-lg" />
              <span className="relative block bg-gradient-to-br from-red-500 via-red-600 to-red-700 text-white text-base sm:text-base md:text-lg font-black px-3 py-1.5 sm:px-3 sm:py-1.5 rounded-lg shadow-xl border border-red-400/30">
                -{product.discount}%
              </span>
            </div>
          </div>
        </div>

        {/* Content Section - Balanced layout */}
        <div className="p-4 sm:p-3 md:p-4 flex flex-col gap-2 sm:gap-2">
          {/* Product Name */}
          <h3 className="text-white font-bold uppercase text-sm sm:text-sm md:text-base leading-tight line-clamp-2">
            {product.name}
          </h3>

          {/* Category & Dimensions Row */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-1.5">
            <span className="inline-flex items-center gap-1 sm:gap-1 bg-zinc-800/90 text-white/90 text-xs sm:text-xs font-medium px-2 sm:px-2 py-1 sm:py-1 rounded border border-zinc-700">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              {product.category}
            </span>
            {product.dimensions && (
              <span className="inline-flex items-center gap-1 sm:gap-1 bg-zinc-800/90 text-white/90 text-xs sm:text-xs font-medium px-2 sm:px-2 py-1 sm:py-1 rounded border border-zinc-700">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                {product.dimensions}
              </span>
            )}
          </div>

          {/* Stock Indicator */}
          <div className="text-xs sm:text-xs font-semibold">
            {product.stock === "in_stock" && (
              <div className="inline-flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-1 rounded border border-green-500/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                ✓ En stock
              </div>
            )}
            {product.stock === "low_stock" && (
              <div className="inline-flex items-center gap-1 bg-orange-500/20 text-orange-400 px-2 py-1 rounded border border-orange-500/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                {product.stockCount} restants
              </div>
            )}
            {product.stock === "out_of_stock" && (
              <div className="inline-flex items-center gap-1 bg-red-500/20 text-red-400 px-2 py-1 rounded border border-red-500/30">
                <span className="w-2 h-2 bg-red-500 rounded-full" />
                Rupture
              </div>
            )}
          </div>

          {/* Animated Price Badge */}
          <div className="mt-2">
            <CompactPriceBadge
              currentPrice={product.price}
              originalPrice={product.originalPrice}
              discount={product.discount}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

