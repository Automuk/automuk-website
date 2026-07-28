"use client";

import PageContainer from "@/components/PageContainer";
import { motion } from "framer-motion";
import StickyServices from "@/components/StickyServices";
import CTASection from "@/components/CTASection";
import EngagementModels from "@/components/EngagementModels";

const services = [
    {
        category: "AI Solutions",
        description: "Transform your business with intelligent AI agents and custom-trained chatbots. We build autonomous systems that handle complex tasks, reducing overhead and delivering 24/7 resolution.",
        imageUrl: "https://images.unsplash.com/photo-1664447972779-316251bd8bd7?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        category: "Web Development",
        description: "Stunning single-page sites and comprehensive multi-page websites built for performance, SEO, and conversions. From sleek landing pages to full-featured marketing portals \u2014 pixel-perfect on every device.",
        imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2064&auto=format&fit=crop"
    },
    {
        category: "Custom Dashboards",
        description: "Tailored operational dashboards, admin panels, and internal tools that give your team real-time visibility and control. Fully customisable to your exact business logic and data sources.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
    },
    {
        category: "Branding & Marketing",
        description: "Bold brand identities and data-driven digital marketing strategies that make you impossible to ignore. From logo design and visual systems to SEO, paid ads, and content campaigns.",
        imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
    },
    {
        category: "Workflow Automation",
        description: "Eliminate manual busywork with industrial-grade workflow orchestration. We connect your tools using Zapier, Make, and n8n to save hours every week while ensuring 100% data accuracy.",
        imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"
    }
];


export default function ServicesPage() {
    return (
        <div className="flex flex-col w-full bg-[#00020C] min-h-screen">
            {/* Background Glows */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#3168FA]/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#CE77FB]/10 blur-[120px] rounded-full" />
            </div>

            <PageContainer>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-4xl mx-auto mt-24 md:mt-40 mb-0 md:mb-40 relative z-10"
                >
                    <h1 className="text-4xl md:text-8xl font-medium mb-6 md:mb-8 tracking-tighter leading-tight text-white font-heading">
                        Expertise That <span className="text-[#3168FA]">Scales</span>
                    </h1>
                    <p className="text-lg md:text-2xl text-[#94A3B8] leading-relaxed max-w-2xl mx-auto">
                        AI solutions, beautiful websites, custom dashboards, bold branding, and intelligent automation — everything your business needs to grow, under one roof.
                    </p>
                </motion.div>

                <StickyServices services={services} />

                <EngagementModels />
            </PageContainer>

            <CTASection
                title="Ready to build something extraordinary?"
                subtitle="Let's find the right solution for your business. Book a session to discuss your project requirements."
            />
        </div>
    );
}
