"use client";

import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faLightbulb,
    faMicrochip,
    faRocket,
    faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CTASection from "@/components/CTASection";

const steps = [
    {
        step: "01",
        title: "Discovery",
        desc: "We deep-dive into your current workflows, auditing your tech stack to identify manual bottlenecks and ROI opportunities.",
        icon: faSearch,
        color: "text-cyan-400",
        bg: "bg-cyan-400/10"
    },
    {
        step: "02",
        title: "Solution Design",
        desc: "A comprehensive blueprint of custom AI agents or autonomous flows tailored specifically to your business logic.",
        icon: faLightbulb,
        color: "text-indigo-400",
        bg: "bg-indigo-400/10"
    },
    {
        step: "03",
        title: "Build & Test",
        desc: "Rapid, agile development in 2-week sprints, ensuring every integration is bulletproof before it hits production.",
        icon: faMicrochip,
        color: "text-purple-400",
        bg: "bg-purple-400/10"
    },
    {
        step: "04",
        title: "Handover & Scale",
        desc: "Seamless deployment with documentation. We stay on board to optimize and ensure your automation scales with you.",
        icon: faRocket,
        color: "text-emerald-400",
        bg: "bg-emerald-400/10"
    }
];

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } as any }
};

const staggerContainer = {
    animate: { transition: { staggerChildren: 0.2 } }
};

export default function HowItWorks() {
    return (
        <div className="flex flex-col w-full bg-[#00020C] min-h-screen">
            {/* --- HERO SECTION --- */}
            <section className="relative pt-32 pb-20 px-4">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-[#4F46E5]/10 blur-[120px] rounded-full -z-10" />

                <motion.div
                    className="max-w-4xl mx-auto text-center"
                    initial="initial"
                    animate="animate"
                    variants={staggerContainer}
                >
                    <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-tight text-white">
                        Simple, Linear, <br />
                        <span className="bg-gradient-to-r from-[#4F46E5] to-[#22D3EE] bg-clip-text text-transparent">
                            Effective.
                        </span>
                    </motion.h1>

                    <motion.p variants={fadeInUp} className="text-xl text-[#94A3B8] leading-relaxed max-w-2xl mx-auto">
                        We've stripped away the agency bloat to focus on what matters: delivering autonomous systems that work from day one.
                    </motion.p>
                </motion.div>
            </section>

            {/* --- TIMELINE SECTION --- */}
            <section className="pb-32 px-4 relative">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        className="space-y-12"
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        {steps.map((s, idx) => (
                            <motion.div key={s.step} variants={fadeInUp} className="relative group">
                                <Card className="glass bg-[#1E293B]/40 border-[#334155] p-8 md:p-12 hover:border-[#4F46E5]/40 transition-all duration-500 overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 text-8xl font-black text-[#4F46E5]/5 pointer-events-none group-hover:text-[#4F46E5]/10 transition-colors">
                                        {s.step}
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-8 md:items-center relative z-10">
                                        <div className={`w-20 h-20 rounded-[2rem] ${s.bg} flex items-center justify-center border border-white/5 shadow-2xl shrink-0 group-hover:scale-110 transition-transform duration-500`}>
                                            <FontAwesomeIcon icon={s.icon} size="2x" className={s.color} />
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className={`text-xs font-bold tracking-[0.3em] uppercase ${s.color}`}>Step {s.step}</span>
                                                <div className="h-px w-8 bg-[#334155]" />
                                            </div>
                                            <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">{s.title}</h3>
                                            <p className="text-[#94A3B8] text-lg leading-relaxed max-w-2xl">{s.desc}</p>
                                        </div>

                                        <div className="hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <FontAwesomeIcon icon={faChevronRight} className="text-[#4F46E5]" />
                                        </div>
                                    </div>
                                </Card>

                                {idx !== steps.length - 1 && (
                                    <div className="hidden md:block absolute left-10 -bottom-8 w-px h-8 bg-gradient-to-b from-[#4F46E5]/40 to-transparent" />
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* --- CTA SECTION --- */}
            <CTASection
                title="Ready to build something extraordinary?"
                subtitle="Let's find the right solution for your business. Book a session to discuss your project requirements."
            />
        </div>
    );
}