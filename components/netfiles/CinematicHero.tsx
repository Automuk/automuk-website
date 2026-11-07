"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Download,
  Play,
  Maximize2,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CinematicHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Scroll-driven 3D tilt & smooth flattening
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.55], [10, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.55], [0.95, 1.01]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.9]);

  return (
    <div ref={heroRef} className="relative w-full pt-32 sm:pt-40 pb-20 flex flex-col items-center">
      {/* Ambient Radial Glow & Perspective Grids */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[90vw] max-w-[1300px] h-[550px] bg-gradient-to-b from-[#3168FA]/20 via-[#CE77FB]/10 to-transparent blur-[140px] rounded-full" />
        <div className="absolute top-[35%] -left-[10%] w-[500px] h-[500px] bg-[#3168FA]/10 blur-[150px] rounded-full" />
        <div className="absolute top-[40%] -right-[10%] w-[500px] h-[500px] bg-[#CE77FB]/10 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_70%,transparent_100%)] opacity-60" />
      </div>

      {/* Hero Header & CTAs */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-4 sm:px-6 mb-14 sm:mb-20 mt-10">
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-7xl font-medium tracking-tight mb-8 leading-[1.05] font-heading text-balance"
        >
          <span className="text-white block text-8xl">File Explorer</span>
          <span className="inline-block py-2 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient-flow">
            on Steroids.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg text-[#94A3B8] mb-10 max-w-3xl mx-auto font-sans"
        >
          NetFiles unites your NVMe drives, remote SSH clusters, multi-cloud virtual filesystems, and decentralized torrent swarms in one ultra-fast native C++ workspace.
        </motion.p>

        {/* Hero CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-14"
        >
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white min-w-[260px] h-14 sm:h-16 text-base sm:text-md rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-105 font-medium"
          >
            <a href="#download" className="flex items-center justify-center gap-2.5">
              <Download size={20} />
              <span>Download NetFiles (v1.0.0)</span>
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-white/5 border-white/15 hover:bg-white/10 text-white min-w-[220px] h-14 sm:h-16 text-base sm:text-md rounded-full backdrop-blur-md transition-all font-medium"
          >
            <a href="#features-cinematic" className="flex items-center justify-center gap-2">
              <Play size={16} className="fill-white" />
              <span>Explore Architecture</span>
            </a>
          </Button>
        </motion.div>
      </div>

      {/* 3D Cinematic App Showcase Container */}
      <div className="relative w-full max-w-7xl px-4 sm:px-6 lg:px-8 perspective-[1400px]">
        {/* 3D Tilted Motion Frame */}
        <motion.div
          style={{
            rotateX,
            scale,
            opacity,
            transformStyle: "preserve-3d",
          }}
          className="relative rounded-2xl sm:rounded-3xl border border-white/15 bg-gradient-to-b from-[#0e1424] via-[#050811] to-[#020409] p-2 sm:p-3 shadow-[0_40px_120px_rgba(0,0,0,0.95)] overflow-hidden group"
        >
          {/* Subtle glass reflection highlight */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-primary/10 pointer-events-none rounded-3xl" />

          {/* Screenshot Viewport */}
          <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-[#00020C]">
            <img
              src="/netfiles_hero.jpg"
              alt="NetFiles C++ Desktop Application Interface"
              className="w-full h-auto object-cover object-top select-none transition-transform duration-700"
            />

            {/* Inspect 4K View Trigger */}
            <button
              onClick={() => setIsLightboxOpen(true)}
              className="absolute top-4 right-4 z-20 px-3.5 py-1.5 rounded-xl bg-black/60 border border-white/20 text-white/90 hover:text-white hover:bg-black/90 text-xs font-sans flex items-center gap-2 backdrop-blur-md transition shadow-lg"
              title="Inspect 4K View"
            >
              <Maximize2 size={13} />
              <span className="hidden sm:inline">Inspect 4K View</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Lightbox Modal for 4K Inspection */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
          >
            <div className="relative max-w-7xl max-h-[92vh] rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-black/70 hover:bg-black text-white transition border border-white/20"
              >
                <X size={20} />
              </button>
              <img
                src="/netfiles_hero.jpg"
                alt="NetFiles Full Resolution Interface"
                className="w-full h-auto max-h-[92vh] object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
