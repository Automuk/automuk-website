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
        category: "Automation",
        description: "Eliminate manual busywork with industrial-grade workflow orchestration. We connect your tools using Zapier, Make, and n8n to save hours every week while ensuring 100% data accuracy.",
        imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"
    },
    {
        category: "Custom Software",
        description: "Scale your technical infrastructure with high-performance internal tools and robust APIs. We design custom admin panels and operations hubs tailored to your specific business logic.",
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
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
                    className="text-center max-w-4xl mx-auto mt-24 md:mt-40 mb-0 md:mb-16 relative z-10"
                >
                    <h1 className="text-4xl md:text-8xl font-black mb-6 md:mb-8 tracking-tighter leading-tight text-white font-heading">
                        Expertise That <span className="text-[#3168FA]">Scales</span>
                    </h1>
                    <p className="text-lg md:text-2xl text-[#94A3B8] leading-relaxed max-w-2xl mx-auto">
                        We don't just write code; we build engines for growth. Discover our specialized services designed to automate the mundane and amplify the meaningful.
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
