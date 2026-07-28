"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const tiers = [
    {
        name: "Strategic Consultancy",
        price: "₹1,000",
        period: "/ session",
        description: "High-impact advisory for strategy, architecture, and roadblock resolution.",
        features: [
            "1-on-1 Strategic Deep Dive",
            "Technical Feasibility Audit",
            "ROI & Automation Blueprint",
            "Direct Founder Access"
        ],
        color: "#3168FA",
        buttonText: "Schedule Call",
        gradient: "from-[#3168FA]/10 to-transparent"
    },
    {
        name: "End-to-End Delivery",
        price: "Project",
        period: "/ one-time",
        description: "Full-cycle execution from discovery to deployment of production-ready systems.",
        features: [
            "Custom AI Workflows",
            "Full-Stack Development",
            "Proprietary Ops Hubs",
            "Complete Ownership Handover"
        ],
        color: "#CE77FB",
        buttonText: "Execute Project",
        gradient: "from-[#CE77FB]/10 to-transparent",
        popular: true
    },
    {
        name: "Managed Ecosystem",
        price: "Subscription",
        period: "/ ongoing",
        description: "Continuous evolution and high-availability maintenance for your infrastructure.",
        features: [
            "24/7 Priority Support",
            "Infrastructure Auto-Scaling",
            "Monthly Feature Sprints",
            "Proactive System Updates"
        ],
        color: "#FACC15",
        buttonText: "Partner With Us",
        gradient: "from-[#FACC15]/10 to-transparent"
    }
];

export default function EngagementModels() {
    return (
        <section className="py-12 md:py-32 relative overflow-hidden">
            {/* Soft Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[40%] bg-primary/5 blur-[160px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-0 relative z-10">
                <div className="text-center mb-20 md:mb-32">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-8xl font-black mb-10 tracking-tighter text-white font-heading"
                    >
                        Scale Your <span className="text-[#3168FA]">Success.</span>
                    </motion.h2>
                    <p className="text-muted-foreground text-lg md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed">
                        Flexible partnership structures designed to align perfectly with your business maturity and technical goals.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {tiers.map((tier, idx) => (
                        <motion.div
                            key={tier.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.8, ease: "easeOut" }}
                            whileHover={tier.popular ? {
                                rotate: [0, -0.2, 0.2, -0.2, 0],
                                scale: [1, 1.01, 1, 1.01, 1],
                                transition: { duration: 0.4, repeat: Infinity }
                            } : {}}
                            className={`group relative flex flex-col h-full rounded-[3rem] transition-all duration-700 ${tier.popular ? 'p-[2px] lg:scale-105 z-10 shadow-[0_40px_120px_-20px_rgba(49,104,250,0.15)] relative overflow-hidden' : 'bg-white/[0.02] border border-white/5 z-0'}`}
                            style={{ '--tier-color': tier.color } as any}
                        >
                            {/* Animated Gradient Border for Popular Card */}
                            {tier.popular && (
                                <motion.div
                                    animate={{
                                        backgroundPosition: ["0% 0%", "100% 100%"],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                    }}
                                    className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary bg-[length:200%_200%] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                                />
                            )}

                            {/* Static Border color for Popular Card when not hovered */}
                            {tier.popular && (
                                <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary opacity-100 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none" />
                            )}

                            <div className={`relative flex flex-col h-full rounded-[2.9rem] p-10 md:p-14 transition-all duration-700 w-full ${tier.popular ? 'bg-[#001031]' : ''} overflow-hidden`}>
                                {/* Fanned Out Light Peeping from Top for Other Cards */}
                                {!tier.popular && (
                                    <div
                                        className="absolute inset-x-0 top-0 h-40 opacity-0 group-hover:opacity-15 transition-opacity duration-700 pointer-events-none"
                                        style={{
                                            background: `radial-gradient(ellipse 120% 100% at 50% 0%, var(--tier-color), transparent 85%)`,
                                            filter: 'blur(35px)'
                                        }}
                                    />
                                )}

                                {/* Subtle Radial Glow on Hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${tier.gradient} opacity-0 group-hover:opacity-40 transition-opacity duration-1000 pointer-events-none rounded-[3rem]`} />

                                <div className="relative z-10 flex flex-col h-full">

                                    <div className="space-y-4 mb-10">
                                        <h3 className="text-3xl md:text-4xl font-black text-white font-heading leading-[1.1]">
                                            {tier.name}
                                        </h3>
                                    </div>

                                    <div className="mb-10 flex items-baseline gap-2 pb-10 border-b border-white/5">
                                        <span className="text-4xl font-black text-white tracking-tighter">{tier.price}</span>
                                        <span className="text-muted-foreground/60 text-sm font-bold">{tier.period}</span>
                                    </div>

                                    <p className="text-muted-foreground text-lg md:text-xl font-medium leading-relaxed mb-12">
                                        {tier.description}
                                    </p>

                                    <div className="space-y-5 mb-14">
                                        {tier.features.map((feature) => (
                                            <div key={feature} className="flex items-center gap-4 text-muted-foreground group-hover:text-white transition-colors duration-700">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[var(--tier-color)] shadow-[0_0_10px_var(--tier-color)]" />
                                                <span className="text-sm font-bold tracking-tight">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        className={`mt-auto w-full group/btn relative overflow-hidden rounded-[2rem] py-6 px-10 font-black transition-all duration-700 flex items-center justify-center gap-3 ${tier.popular ? 'bg-primary text-white shadow-[0_20px_40px_rgba(49,104,250,0.3)]' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20'}`}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-[1.2s] ease-in-out" />
                                        <span className="relative z-10 tracking-widest uppercase text-xs">
                                            {tier.buttonText}
                                        </span>
                                        <ChevronRight className="relative z-10 h-3 w-3 group-hover/btn:translate-x-1.5 transition-transform duration-500" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
