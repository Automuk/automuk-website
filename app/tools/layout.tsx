"use client";

import React from "react";
import { usePathname } from "next/navigation";

const AdBanner = ({ side }: { side: "left" | "right" }) => (
    <div className={`hidden 2xl:flex flex-col items-center justify-start w-64 h-[calc(100vh-80px)] sticky top-20 py-4 ${side === 'left' ? 'pr-0' : 'pl-0'}`}>
        <div className="w-full h-full bg-[#1E293B]/20 border border-white/5 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group">
            {/* Ad Label */}
            <div className="absolute top-2 left-2 text-[10px] uppercase font-bold text-[#94A3B8]/40 tracking-widest">
                Advertisement
            </div>

            {/* Decorative patterns to look like an ad */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-gradient-to-br from-primary via-transparent to-secondary blur-3xl" />
            </div>

            <div className="relative z-10 text-center px-6">
                <div className="w-12 h-12 rounded-full bg-white/5 mb-4 mx-auto flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#3168FA] animate-pulse" />
                </div>
                <div className="h-4 w-32 bg-white/5 rounded mx-auto mb-2" />
                <div className="h-3 w-24 bg-white/5 rounded mx-auto mb-8" />

                <div className="space-y-3">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-2 w-full bg-white/5 rounded" />
                    ))}
                </div>
            </div>

            {/* Bottom CTA Area */}
            <div className="absolute bottom-6 left-6 right-6">
                <div className="h-10 w-full bg-[#3168FA]/20 border border-[#3168FA]/30 rounded-lg flex items-center justify-center text-xs font-bold text-[#3168FA]">
                    PROMOTE YOUR TOOL
                </div>
            </div>
        </div>
    </div>
);

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isIndexPage = pathname === "/tools";

    return (
        <div className="flex w-full justify-center bg-[#00020C]">
            {/* Left Sidebar Ad */}
            {!isIndexPage && <AdBanner side="left" />}

            {/* Main Content */}
            <main className={`flex-1 w-full ${isIndexPage ? 'max-w-none px-4 md:px-12' : 'max-w-8xl'} relative z-10`}>
                {children}
            </main>

            {/* Right Sidebar Ad */}
            {!isIndexPage && <AdBanner side="right" />}
        </div>
    );
}
