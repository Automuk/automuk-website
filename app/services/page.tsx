"use client";

import PageContainer from "@/components/PageContainer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBrain,
    faRobot,
    faPlug,
    faDiagramProject,
    faSync,
    faChartLine,
    faColumns,
    faLink,
    faCode,
    faBolt,
    faCogs,
    faTerminal
} from "@fortawesome/free-solid-svg-icons";
import CTASection from "@/components/CTASection";

const services = [
    {
        category: "AI Solutions",
        icon: faBrain,
        color: "#3168FA",
        description: "Leverage the power of Generative AI to transform how you interact with data and customers.",
        items: [
            {
                title: "Custom AI Agents",
                description: "Autonomous agents that can handle research, data analysis, and complex multi-step tasks.",
                icon: faRobot,
                color: "#60A5FA",
                outcome: "Reduce operational overhead by 40%."
            },
            {
                title: "Intelligent Chatbots",
                description: "Context-aware support and sales bots trained on your specific documentation and data.",
                icon: faBrain,
                color: "#818CF8",
                outcome: "24/7 customer support with instant resolution."
            },
            {
                title: "LLM Integrations",
                description: "Seamlessly connect GPT-4, Claude, or local models into your existing software stack.",
                icon: faPlug,
                color: "#A78BFA",
                outcome: "Transform unstructured data into actionable insights."
            }
        ]
    },
    {
        category: "Automation",
        icon: faDiagramProject,
        color: "#CE77FB",
        description: "Connect your tools and eliminate manual busywork with industrial-grade workflows.",
        items: [
            {
                title: "Workflow Orchestration",
                description: "Complex multi-app automations using Zapier, Make (Integromat), or n8n.",
                icon: faDiagramProject,
                color: "#E879F9",
                outcome: "Save 20+ hours of manual work per week."
            },
            {
                title: "Data Sync & Migration",
                description: "Keep your CRM, ERP, and marketing tools in perfect sync without manual entry.",
                icon: faSync,
                color: "#F472B6",
                outcome: "100% data accuracy across all platforms."
            },
            {
                title: "Automated Reporting",
                description: "Real-time dashboards that aggregate data from multiple sources automatically.",
                icon: faChartLine,
                color: "#FB7185",
                outcome: "Make data-driven decisions faster."
            }
        ]
    },
    {
        category: "Custom Software",
        icon: faCode,
        color: "#FACC15",
        description: "High-performance internal tools and APIs built for your specific business logic.",
        items: [
            {
                title: "Internal Dashboards",
                description: "Custom-built admin panels and operations hubs designed for your team's workflow.",
                icon: faColumns,
                color: "#4ADE80",
                outcome: "Streamline operations with a single source of truth."
            },
            {
                title: "Custom APIs & Integrations",
                description: "Robust backend services to connect disparate systems and enable data flow.",
                icon: faLink,
                color: "#2DD4BF",
                outcome: "Scale your technical infrastructure securely."
            },
            {
                title: "Legacy System Automation",
                description: "Modernizing older systems with API wrappers and automated interface layers.",
                icon: faCode,
                color: "#22D3EE",
                outcome: "Extend the life of your existing investments."
            }
        ]
    }
];


export default function ServicesPage() {
    return (
        <div className="flex flex-col w-full bg-[#00020C] min-h-screen overflow-hidden">
            {/* Background Glows */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#3168FA]/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#CE77FB]/10 blur-[120px] rounded-full" />
            </div>

            <PageContainer>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-4xl mx-auto mt-40 mb-32 relative z-10"
                >
                    <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight text-white font-heading">
                        Expertise That <span className="text-[#3168FA]">Scales</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-[#94A3B8] leading-relaxed max-w-2xl mx-auto">
                        We don't just write code; we build engines for growth. Discover our specialized services designed to automate the mundane and amplify the meaningful.
                    </p>
                </motion.div>

                <div className="space-y-48 mb-32 relative z-10">
                    {services.map((section, sIdx) => (
                        <section key={section.category} className="scroll-mt-32">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="flex items-center space-x-6 mb-16 px-4"
                            >
                                <div className="p-4 bg-[#3168FA]/10 rounded-2xl shadow-[0_0_30px_rgba(49,104,250,0.3)] border border-[#3168FA]/20">
                                    <FontAwesomeIcon icon={section.icon} className="h-8 w-8 text-[#3168FA]" />
                                </div>
                                <div>
                                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white font-heading">{section.category}</h2>
                                    <p className="text-[#94A3B8] text-lg mt-2 font-medium">{section.description}</p>
                                </div>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {section.items.map((item, iIdx) => (
                                    <motion.div
                                        key={item.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: iIdx * 0.1, duration: 0.5, ease: "easeOut" }}
                                    >
                                        <Card className="glass bg-[#020617]/40 border-white/5 hover:border-[#3168FA]/40 transition-all flex flex-col h-full group hover:-translate-y-2 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#3168FA]/5 blur-2xl rounded-full translate-x-12 -translate-y-12 group-hover:bg-[#3168FA]/10 transition-colors" />

                                            <CardHeader className="relative z-10">
                                                <div
                                                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border"
                                                    style={{
                                                        backgroundColor: `${item.color}10`,
                                                        borderColor: `${item.color}20`
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={item.icon} className="h-7 w-7" style={{ color: item.color }} />
                                                </div>
                                                <CardTitle className="text-2xl font-bold mb-4 text-white font-heading">{item.title}</CardTitle>
                                                <CardDescription className="text-[#94A3B8] text-lg leading-relaxed min-h-[80px]">
                                                    {item.description}
                                                </CardDescription>
                                            </CardHeader>

                                            <CardContent className="mt-auto pt-8 border-t border-white/5 relative z-10">
                                                <div className="flex items-center space-x-3 text-base font-bold text-[#CE77FB] group-hover:translate-x-1 transition-transform">
                                                    <FontAwesomeIcon icon={faBolt} className="h-5 w-5" style={{ color: '#CE77FB' }} />
                                                    <span>Outcome: {item.outcome}</span>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </PageContainer>

            <CTASection
                title="Ready to build something extraordinary?"
                subtitle="Let's find the right solution for your business. Book a session to discuss your project requirements."
            />
        </div>
    );
}
