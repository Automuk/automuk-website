"use client";

import React from "react";
import { usePathname } from "next/navigation";

import Script from "next/script";

const AdBanner = ({ side, slot }: { side: "left" | "right", slot: string }) => {
    const pushed = React.useRef(false);
    React.useEffect(() => {
        if (pushed.current) return;
        pushed.current = true;

        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error("AdSense error:", err);
        }
    }, []);

    return (
        <div className={`hidden 2xl:flex flex-col items-center justify-start w-64 h-[calc(100vh-80px)] sticky top-20 py-4 ${side === 'left' ? 'pr-0' : 'pl-0'}`}>
            <div className="w-full h-full bg-[#1E293B]/20 border border-white/5 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute top-2 left-2 text-[10px] uppercase font-bold text-[#94A3B8]/40 tracking-widest z-20">
                    Advertisement
                </div>

                {/* Google AdSense Unit */}
                <ins className="adsbygoogle"
                    style={{ display: "block", width: "100%", height: "100%" }}
                    data-ad-client="ca-pub-2255585996818403"
                    data-ad-slot={slot}
                    data-ad-format="auto"
                    data-full-width-responsive="true" />
            </div>
        </div>
    );
};

const MobileAdBanner = ({ slot }: { slot: string }) => {
    const pushed = React.useRef(false);
    React.useEffect(() => {
        if (pushed.current) return;
        pushed.current = true;

        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error("AdSense error:", err);
        }
    }, []);

    return (
        <div className="2xl:hidden w-full pt-20 px-4 pb-2">
            <div className="w-full h-32 bg-[#1E293B]/20 border border-white/5 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute top-2 left-2 text-[10px] uppercase font-bold text-[#94A3B8]/40 tracking-widest z-20">
                    Advertisement
                </div>

                {/* Google AdSense Unit */}
                <ins className="adsbygoogle"
                    style={{ display: "block", width: "100%", height: "100%" }}
                    data-ad-client="ca-pub-2255585996818403"
                    data-ad-slot={slot}
                    data-ad-format="horizontal"
                    data-full-width-responsive="true" />
            </div>
        </div>
    );
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isIndexPage = pathname === "/tools";

    return (
        <div className="flex flex-col items-center w-full bg-[#00020C]">
            <Script
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2255585996818403"
                strategy="afterInteractive"
                crossOrigin="anonymous"
            />

            {/* Mobile Header Ad */}
            {!isIndexPage && <MobileAdBanner slot="7095095490" />}

            <div className="flex w-full justify-center">
                {/* Left Sidebar Ad */}
                {!isIndexPage && <AdBanner side="left" slot="4688947099" />}

                {/* Main Content */}
                <main className={`flex-1 w-full ${isIndexPage ? 'max-w-none px-0 md:px-12' : 'max-w-8xl'} relative z-10`}>
                    {children}
                </main>

                {/* Right Sidebar Ad */}
                {!isIndexPage && <AdBanner side="right" slot="2286145030" />}
            </div>
        </div>
    );
}
