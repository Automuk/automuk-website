"use client";

import { motion } from "framer-motion";
import { Cpu, Workflow, Terminal } from "lucide-react";

export default function BentoFlex() {
    return (
        <section className="py-20 md:py-32 relative bg-background/50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12 md:mb-24 animate-reveal">
                    <h2 className="text-3xl md:text-7xl font-black mb-6 tracking-tight">Our Expertise</h2>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        We engineer elastic solutions that adapt to your business needs, powered by the latest in AI and automation technology.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 min-h-[600px]">
                    {/* Bento Item 1: AI Solutions (Large) */}
                    <motion.div
                        layout
                        className="flex-[2] glass bg-card/40 border-white/5 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] relative overflow-hidden group hover:border-primary/50 transition-all duration-500 cursor-default"
                    >
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-all duration-500">
                                    <Cpu className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="text-2xl md:text-4xl font-black mb-6">AI Agents & LLMs</h3>
                                <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                                    Custom-built intelligence that works 24/7. From advanced RAG pipelines to autonomous agents that handle complex customer inquiries and data processing.
                                </p>
                            </div>
                            <div className="mt-12 flex flex-wrap gap-3">
                                {["GPT-5.2", "Claude 4.5", "Llama 3", "Vector Databases"].map(tag => (
                                    <span key={tag} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-widest uppercase text-primary/80">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    </motion.div>

                    {/* Bento Column 2 */}
                    <div className="flex-1 flex flex-col gap-8">
                        {/* Bento Item 2: Automation */}
                        <motion.div
                            layout
                            className="flex-1 glass bg-card/40 border-white/5 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] group hover:border-secondary/50 transition-all duration-500 cursor-default"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-all duration-500">
                                <Workflow className="h-7 w-7 text-secondary" />
                            </div>
                            <h3 className="text-2xl font-black mb-4">Workflow Automation</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Eliminate manual bottleneck with seamless Zapier, Make, and n8n integrations.
                            </p>
                        </motion.div>

                        {/* Bento Item 3: Custom Software */}
                        <motion.div
                            layout
                            className="flex-1 glass bg-card/40 border-white/5 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] group hover:border-accent-foreground/50 transition-all duration-500 cursor-default"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-all duration-500">
                                <Terminal className="h-7 w-7 text-accent-foreground" />
                            </div>
                            <h3 className="text-2xl font-black mb-4">B2B Software</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                High-performance internal tools and dashboards built for operational excellence.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
