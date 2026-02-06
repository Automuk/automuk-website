"use client";

import React from "react";
import { motion } from "framer-motion";
import DataStreamBackground from "./DataStreamBackground";

const reviews = [
    {
        author: "James Chen",
        role: "COO @ TechScale",
        text: "Automuk didn't just automate our tasks; they reconstructed our entire operations logic. The AI agents they built are now core to our growth.",
    },
    {
        author: "Sarah Miller",
        role: "Director of Ops @ FinFlow",
        text: "The speed of implementation was staggering. Within weeks, our manual data processing bottlenecks were completely eliminated.",
    },
    {
        author: "Robert Vance",
        role: "Founder @ NexaSolutions",
        text: "High-end software meets intelligent automation. Automuk is the partner you need to scale without the headcount overhead.",
    }
];

export default function Testimonials() {
    return (
        <section className="py-32 relative bg-background overflow-hidden">
            <div className="opacity-30">
                <DataStreamBackground />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16 animate-reveal">
                    <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">What Experts Say.</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            viewport={{ once: true }}
                            className="p-10 glass bg-card/40 border-white/5 rounded-[2.5rem] hover:border-secondary/30 transition-all duration-500 flex flex-col justify-between group"
                        >
                            <p className="text-xl text-muted-foreground leading-relaxed italic mb-8 group-hover:text-white transition-colors">
                                "{review.text}"
                            </p>
                            <div>
                                <h4 className="text-xl font-bold text-white">{review.author}</h4>
                                <p className="text-secondary font-medium tracking-wide uppercase text-xs mt-1">{review.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
