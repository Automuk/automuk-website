"use client";

import { motion, useScroll } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface Service {
    category: string;
    description: string;
    imageUrl: string;
}

export default function StickyServices({ services }: { services: Service[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        return scrollYProgress.onChange((latest) => {
            const index = Math.min(
                Math.floor(latest * services.length),
                services.length - 1
            );
            if (index !== activeIndex) {
                setActiveIndex(index);
            }
        });
    }, [scrollYProgress, services.length, activeIndex]);

    return (
        <div ref={containerRef} className="relative h-[500vh] w-full mt-0 md:mt-20">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                {/* Background Gradients */}
                {services.map((service, index) => (
                    <motion.div
                        key={`bg-${index}`}
                        className="absolute inset-0 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: activeIndex === index ? 0.15 : 0,
                            transition: { duration: 1 }
                        }}
                        style={{
                            background: `radial-gradient(circle at 50% 50%, transparent 70%)`,
                            filter: "blur(120px)",
                        }}
                    />
                ))}

                <div className="container mx-auto px-4 md:px-6 relative z-10 mt-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">

                        {/* Left Side: Text Content */}
                        <div className="space-y-8">
                            {services.map((service, index) => (
                                <motion.div
                                    key={`text-${index}`}
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{
                                        opacity: activeIndex === index ? 1 : 0,
                                        x: activeIndex === index ? 0 : -50,
                                        pointerEvents: activeIndex === index ? "auto" : "none",
                                    }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                    className={activeIndex === index ? "block" : "absolute inset-0 md:relative"}
                                    style={{ display: activeIndex === index ? "block" : "none" }}
                                >
                                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white font-heading mb-6">
                                        {service.category.split(" ").map((word, i) => (
                                            <span key={i} className={i === 0 ? "" : "text-[#3168FA]"}>
                                                {word}{" "}
                                            </span>
                                        ))}
                                    </h2>
                                    <p className="text-[#94A3B8] text-sm md:text-xl md:text-2xl mt-4 max-w-lg leading-relaxed font-medium line-clamp-3 md:line-clamp-none">
                                        {service.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Right Side: Visual Content */}
                        <div className="relative h-[400px] md:h-[600px] w-full rounded-2xl overflow-hidden glass border border-white/5">
                            {services.map((service, index) => (
                                <motion.div
                                    key={`image-${index}`}
                                    className="absolute inset-0"
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        opacity: activeIndex === index ? 1 : 0,
                                    }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                >
                                    <img
                                        src={service.imageUrl}
                                        alt={service.category}
                                        className="absolute inset-0 w-full h-full object-cover"
                                        style={{
                                            filter: "brightness(0.9) contrast(1.1)"
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#00020C] via-transparent to-transparent opacity-60" />

                                    {/* Floating Elements / Accents */}
                                    <motion.div
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
                                        animate={{
                                            scale: [1, 1.2, 1],
                                            opacity: [0.5, 0.8, 0.5],
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    />
                                </motion.div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}