"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, Compass, Settings, TrendingUp } from "lucide-react";

export default function LogicFlow() {
    return (
        <section className="py-24 md:py-40 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="mb-12 md:mb-24">
                    <h2 className="text-3xl md:text-7xl font-black tracking-tight mb-6">From Manual to Autonomous.</h2>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed">
                        Our proven process for transforming business operations through engineered simplicity.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
                    {[
                        { step: "01", title: "Audit", desc: "We deep-dive into your existing manual workflows to identify high-impact automation candidates.", icon: Search },
                        { step: "02", title: "Architect", desc: "Design a scalable architecture that bridges your current stacks with modern AI capabilities.", icon: Compass },
                        { step: "03", title: "Automate", desc: "Build, test, and deploy the logic using industry-standard tools and custom coding.", icon: Settings },
                        { step: "04", title: "Amplify", desc: "Monitor performance and continuously refine agents to ensure maximum ROI and growth.", icon: TrendingUp }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            viewport={{ once: true }}
                            className="p-6 md:p-8 glass bg-white/5 border-white/5 rounded-[1.5rem] md:rounded-[2rem] hover:bg-white/10 transition-colors group"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="text-4xl md:text-5xl font-black text-primary/10 group-hover:text-primary/20 transition-colors">
                                    {item.step}
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-500">
                                    <item.icon className="text-primary w-5 h-5" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                    {/* Visual connector line for desktop */}
                    <div className="hidden lg:block absolute top-[15%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent -z-10" />
                </div>
            </div>
        </section>
    );
}
