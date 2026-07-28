"use client";

import { motion } from "framer-motion";
import { Cpu, Workflow, LayoutDashboard, Globe, Megaphone } from "lucide-react";

const services = [
    {
        icon: Cpu,
        title: "AI Solutions",
        description: "Custom-built intelligence that works 24/7. From advanced RAG pipelines to autonomous agents that handle complex tasks, data processing, and customer interactions.",
        tags: ["GPT-5.2", "Claude 4.5", "Llama 3", "Vector DBs"],
        color: "primary",
        large: true,
    },
    {
        icon: Globe,
        title: "Web Development",
        description: "Blazing-fast single-page sites and full-featured multi-page websites engineered for performance, SEO, and conversions.",
        tags: ["Next.js", "React", "Tailwind", "TypeScript"],
        color: "secondary",
        large: false,
    },
    {
        icon: LayoutDashboard,
        title: "Custom Dashboards",
        description: "Tailored operational dashboards and internal tools that give your team real-time visibility and control over every metric that matters.",
        tags: ["Analytics", "Real-time", "Admin Panels"],
        color: "accent",
        large: false,
    },
    {
        icon: Megaphone,
        title: "Branding & Marketing",
        description: "Bold brand identities and data-driven digital marketing strategies that make you impossible to ignore — from logo to launch campaigns.",
        tags: ["Brand Identity", "SEO", "Content", "Ads"],
        color: "secondary",
        large: false,
    },
    {
        icon: Workflow,
        title: "Workflow Automation",
        description: "Eliminate manual bottlenecks with seamless Zapier, Make, and n8n integrations. Save hours every week while ensuring 100% data accuracy.",
        tags: ["Zapier", "Make", "n8n", "APIs"],
        color: "primary",
        large: false,
    },
];

const colorMap: Record<string, { icon: string; border: string; glow: string; tag: string }> = {
    primary: {
        icon: "bg-primary/10 group-hover:bg-primary/20",
        border: "hover:border-primary/50",
        glow: "from-primary/10",
        tag: "text-primary",
    },
    secondary: {
        icon: "bg-secondary/10 group-hover:bg-secondary/20",
        border: "hover:border-secondary/50",
        glow: "from-secondary/10",
        tag: "text-secondary",
    },
    accent: {
        icon: "bg-white/5 group-hover:bg-white/10",
        border: "hover:border-white/30",
        glow: "from-white/5",
        tag: "text-white/90",
    },
};

export default function BentoFlex() {
    return (
        <section className="py-20 md:py-32 relative bg-background/50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12 md:mb-24 animate-reveal">
                    <h2 className="text-3xl md:text-7xl font-black mb-6 tracking-tight">Our Expertise</h2>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        One studio. Every digital capability you need — from AI to branding, websites to dashboards.
                    </p>
                </div>

                {/* Row 1: AI (large) + Web Dev + Dashboards */}
                <div className="flex flex-col lg:flex-row gap-6 mb-6">
                    {/* AI — large card */}
                    {(() => {
                        const s = services[0];
                        const c = colorMap[s.color];
                        const Icon = s.icon;
                        return (
                            <motion.div
                                layout
                                key={s.title}
                                className={`flex-[2] glass bg-card/40 border-white/5 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] relative overflow-hidden group ${c.border} transition-all duration-500 cursor-default`}
                            >
                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    <div>
                                        <div className={`w-16 h-16 rounded-2xl ${c.icon} flex items-center justify-center mb-8 transition-all duration-500`}>
                                            <Icon className="h-8 w-8 text-primary" />
                                        </div>
                                        <h3 className="text-2xl md:text-4xl font-black mb-6">{s.title}</h3>
                                        <p className="text-muted-foreground text-lg leading-relaxed max-w-md">{s.description}</p>
                                    </div>
                                    <div className="mt-10 flex flex-wrap gap-3">
                                        {s.tags.map(tag => (
                                            <span key={tag} className={`px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-widest uppercase ${c.tag}`}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className={`absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l ${c.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />
                            </motion.div>
                        );
                    })()}

                    {/* Web Dev + Dashboards stacked */}
                    <div className="flex-1 flex flex-col gap-6">
                        {services.slice(1, 3).map((s) => {
                            const c = colorMap[s.color];
                            const Icon = s.icon;
                            return (
                                <motion.div
                                    layout
                                    key={s.title}
                                    className={`flex-1 glass bg-card/40 border-white/5 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] group ${c.border} transition-all duration-500 cursor-default relative overflow-hidden`}
                                >
                                    <div className={`w-14 h-14 rounded-2xl ${c.icon} flex items-center justify-center mb-6 transition-all duration-500`}>
                                        <Icon className={`h-7 w-7 ${s.color === "secondary" ? "text-secondary" : "text-white/70"}`} />
                                    </div>
                                    <h3 className="text-2xl font-black mb-4">{s.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{s.description}</p>
                                    <div className="mt-6 flex flex-wrap gap-2">
                                        {s.tags.map(tag => (
                                            <span key={tag} className={`px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-widest uppercase ${c.tag}`}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Row 2: Branding & Marketing (wide) + Workflow Automation */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {services.slice(3).map((s) => {
                        const c = colorMap[s.color];
                        const Icon = s.icon;
                        return (
                            <motion.div
                                layout
                                key={s.title}
                                className={`flex-1 glass bg-card/40 border-white/5 p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] group ${c.border} transition-all duration-500 cursor-default relative overflow-hidden`}
                            >
                                <div className={`w-14 h-14 rounded-2xl ${c.icon} flex items-center justify-center mb-6 transition-all duration-500`}>
                                    <Icon className={`h-7 w-7 ${s.color === "secondary" ? "text-secondary" : "text-primary"}`} />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-black mb-4">{s.title}</h3>
                                <p className="text-muted-foreground leading-relaxed max-w-lg">{s.description}</p>
                                <div className="mt-8 flex flex-wrap gap-3">
                                    {s.tags.map(tag => (
                                        <span key={tag} className={`px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-widest uppercase ${c.tag}`}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className={`absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l ${c.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
