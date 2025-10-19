"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MessageCircle, Package, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AnimatedPriceBadge from "@/components/ui/AnimatedPriceBadge";
import { products } from "@/data/products";
import type { Product } from "@/data/products";
import gsap from "gsap";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === id);
    setProduct(foundProduct || null);
  }, [id]);

  useEffect(() => {
    if (product && contentRef.current && imageRef.current) {
      // GSAP animations
      gsap.fromTo(
        imageRef.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      gsap.fromTo(
        contentRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Produit non trouvé
          </h1>
          <Link href="/">
            <Button>Retour à la boutique</Button>
          </Link>
        </div>
      </div>
    );
  }

  const displayImages = product.images || [product.image];
  const whatsappMessage = encodeURIComponent(
    `Bonjour, je veux acheter ${product.name} au prix de ${product.price} DH`
  );
  const whatsappNumber = "212600000000"; // Replace with actual number

  return (
    <div className="min-h-screen relative py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      {/* Fixed Gradient Background */}
      <div className="fixed inset-0 min-h-screen -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[oklch(18%_0.04_260)] via-[oklch(20%_0.04_260)] to-[oklch(18%_0.04_260)]"></div>
        
        {/* Top-left glow */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] bg-gradient-to-br from-[oklch(25%_0.06_260)] to-transparent rounded-full opacity-40 blur-3xl"></div>
        
        {/* Bottom-right glow */}
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] bg-gradient-to-tl from-[oklch(25%_0.06_260)] to-transparent rounded-full opacity-40 blur-3xl"></div>
        
        {/* Accent glow - red */}
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-[oklch(65%_0.28_25)]/10 to-transparent rounded-full opacity-30 blur-3xl"></div>
        
        {/* Accent glow - yellow */}
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-[oklch(82%_0.22_100)]/10 to-transparent rounded-full opacity-30 blur-3xl"></div>
      </div>

      {/* Subtle overlay pattern */}
      <div className="fixed inset-0 pointer-events-none -z-5 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Back Button */}
      <div className="mb-4 sm:mb-6 relative z-10">
        <Link href="/">
          <Button variant="ghost" className="gap-2 text-sm sm:text-base">
            <ArrowLeft className="w-4 h-4" />
            Retour aux produits
          </Button>
        </Link>
      </div>

      {/* Product Details Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 max-w-7xl mx-auto">
        {/* Left: Image Carousel */}
        <div ref={imageRef} className="space-y-4">
          <Card className="relative aspect-[4/3] overflow-hidden p-0">
            <Image
              src={displayImages[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
              <span className="bg-[var(--color-primary)] text-white text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-md shadow-lg">
                OFFRE LIMITÉE
              </span>
              <span className="bg-[var(--color-primary)] text-white text-base sm:text-lg font-bold px-3 py-1.5 rounded-md shadow-lg">
                -{product.discount}%
              </span>
            </div>
          </Card>

          {/* Thumbnail Gallery */}
          {displayImages.length > 1 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
              {displayImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all touch-manipulation active:scale-95 min-h-[60px] ${
                    selectedImage === idx
                      ? "border-[var(--color-primary)] scale-105"
                      : "border-transparent hover:border-white/30"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 30vw, 100px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info */}
        <div ref={contentRef} className="space-y-4 sm:space-y-6">
          {/* Title */}
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase text-white mb-2 leading-tight">
              {product.name}
            </h1>
            <p className="text-white/70 text-sm">{product.category}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="bg-[var(--bg-filter)] text-white text-sm px-3 py-1.5 rounded-lg"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Animated Price Badge */}
          <AnimatedPriceBadge
            currentPrice={product.price}
            originalPrice={product.originalPrice}
            discount={product.discount}
          />

          {/* Stock Status */}
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5" />
              <div>
                {product.stock === "in_stock" && (
                  <p className="text-green-400 font-semibold">
                    En stock - {product.stockCount} unités disponibles
                  </p>
                )}
                {product.stock === "low_stock" && (
                  <p className="text-orange-400 font-semibold">
                    Stock limité - Plus que {product.stockCount} unité(s)
                  </p>
                )}
                {product.stock === "out_of_stock" && (
                  <p className="text-red-400 font-semibold">
                    Rupture de stock
                  </p>
                )}
              </div>
            </div>
          </Card>

          {/* Dimensions */}
          {product.dimensions && (
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Ruler className="w-5 h-5" />
                <div>
                  <p className="text-white/70 text-sm">Dimensions</p>
                  <p className="text-white font-semibold">{product.dimensions}</p>
                </div>
              </div>
            </Card>
          )}

          {/* Description */}
          {product.description && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">
                Description
              </h2>
              <p className="text-white/80 leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          {/* WhatsApp CTA */}
          <div className="space-y-3 pt-4">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button
                size="lg"
                className="w-full text-base sm:text-lg gap-2 sm:gap-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 font-bold"
                disabled={product.stock === "out_of_stock"}
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                Commander via WhatsApp
              </Button>
            </a>

            {product.stock === "out_of_stock" && (
              <p className="text-center text-white/70 text-sm">
                Ce produit est actuellement en rupture de stock
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Related Products Section (Optional) */}
      <div className="relative z-10 mt-16 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6">
          Produits similaires
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-4">
          {products
            .filter((p) => p.category === product.category && p.id !== product.id)
            .slice(0, 4)
            .map((relatedProduct, idx) => (
              <Link key={relatedProduct.id} href={`/product/${relatedProduct.id}`}>
                <Card className="relative overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <span className="absolute top-2 right-2 bg-[var(--color-primary)] text-white text-xs font-bold px-2 py-1 rounded-md">
                      -{relatedProduct.discount}%
                    </span>
                  </div>
                  <div className="p-3">
                    <h3 className="text-white font-semibold text-sm truncate">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-[var(--color-accent)] font-bold text-sm mt-1">
                      {relatedProduct.price.toLocaleString()} DH
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

