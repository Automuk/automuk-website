"use client";

import React from "react";
import Link from "next/link";
import { Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import FluidCanvas from "@/components/netfiles/FluidCanvas";

export default function DownloadSection() {
  return (
    <div id="download" className="w-full py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="rounded-3xl border border-white/15 bg-gradient-to-b from-[#0a0f20] to-[#040711] p-8 sm:p-14 shadow-[0_40px_100px_rgba(0,0,0,0.85)] relative overflow-hidden backdrop-blur-2xl group">
        {/* Interactive fluid simulation & spotlight on mouse hover */}
        <FluidCanvas />

        {/* Ambient background glow decoration */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/15 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="text-center max-w-2xl mx-auto relative z-10 py-6">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white mb-4 font-heading">
            Get NetFiles for Windows.
          </h2>

          <p className="text-base sm:text-lg text-[#94A3B8] mb-8 font-sans">
            Free, native, and local-first. No account required, zero telemetry.
          </p>

          <div className="flex flex-col items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white min-w-[280px] h-14 sm:h-16 text-base sm:text-lg rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-105 font-medium"
            >
              <a
                href="#download"
                onClick={() =>
                  alert(
                    "NetFiles v1.4.0 Windows Installer package is being prepared for release. Star or request early access!"
                  )
                }
                className="flex items-center justify-center gap-2.5"
              >
                <Download size={20} />
                <span>Download NetFiles .msi</span>
              </a>
            </Button>

            <span className="text-xs font-mono text-[#94A3B8]/60">
              v1.4.0 (Stable) • Windows Installer
            </span>
          </div>
        </div>

        {/* Enterprise & Custom Systems Banner */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
          <div>
            <h4 className="text-base font-bold text-white font-heading">
              Need custom enterprise storage integrations or tailored desktop apps?
            </h4>
            <p className="text-xs text-[#94A3B8] mt-1">
              Automuk engineers custom C++, Go, and Rust enterprise automation systems for high-throughput data workflows.
            </p>
          </div>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 shrink-0">
            <Link href="/contact" className="flex items-center gap-2">
              <span>Talk to us</span>
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
