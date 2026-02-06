"use client";

import React from "react";
import FloatingBubblesBackground from "./FloatingBubblesBackground";

export default function ResultsSection() {
    return (
        <section className="py-32 bg-primary relative overflow-hidden">
            <FloatingBubblesBackground />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_white_0.1px,_transparent_0.1px)] bg-[size:40px_40px] opacity-20" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
                    {[
                        { label: "Hours Saved Annually", value: "24,000+" },
                        { label: "AI Operations Deployed", value: "150+" },
                        { label: "Increase in Efficiency", value: "85%" }
                    ].map((stat, i) => (
                        <div key={i} className="animate-reveal">
                            <div className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tighter">
                                {stat.value}
                            </div>
                            <p className="text-white/70 text-xl font-bold tracking-widest uppercase">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
