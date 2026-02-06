"use client";

import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faClock,
    faPaperPlane
} from "@fortawesome/free-solid-svg-icons";
import {
    faLinkedin,
    faXTwitter,
    faGithub
} from "@fortawesome/free-brands-svg-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } as any }
};

const staggerContainer = {
    animate: { transition: { staggerChildren: 0.15 } }
};

export default function ContactPage() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Thanks for your message! This is a demonstration form.");
    };

    return (
        <div className="flex flex-col w-full bg-[#00020C] min-h-screen">
            <section className="relative pt-32 pb-32 px-4">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4F46E5]/10 blur-[120px] rounded-full -z-10" />

                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-20 items-start">

                        {/* --- LEFT SIDE: INFO --- */}
                        <motion.div
                            initial="initial"
                            animate="animate"
                            variants={staggerContainer}
                            className="space-y-12"
                        >
                            <motion.div variants={fadeInUp}>
                                <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-tight text-white">
                                    Let’s Automate <br />
                                    <span className="bg-gradient-to-r from-[#4F46E5] to-[#22D3EE] bg-clip-text text-transparent italic">
                                        Your Future.
                                    </span>
                                </h1>
                                <p className="text-xl text-[#94A3B8] leading-relaxed max-w-xl">
                                    Have a complex bottleneck? Need an AI agent with specific traits? Tell us your goal, and we'll build the engine to reach it.
                                </p>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="space-y-8">
                                <div className="flex items-start gap-6 group">
                                    <div className="w-12 h-12 rounded-xl bg-[#4F46E5]/10 border border-[#4F46E5]/20 flex items-center justify-center text-[#22D3EE] group-hover:bg-[#4F46E5]/20 transition-colors">
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg mb-1">Email Us</h3>
                                        <p className="text-[#94A3B8]">hello@autom.uk</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6 group">
                                    <div className="w-12 h-12 rounded-xl bg-[#4F46E5]/10 border border-[#4F46E5]/20 flex items-center justify-center text-[#22D3EE] group-hover:bg-[#4F46E5]/20 transition-colors">
                                        <FontAwesomeIcon icon={faClock} />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg mb-1">Response Time</h3>
                                        <p className="text-[#94A3B8]">Within 24 business hours</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="pt-8">
                                <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Connect with us</h4>
                                <div className="flex gap-4">
                                    {[
                                        { icon: faLinkedin, href: "#" },
                                        { icon: faXTwitter, href: "#" },
                                        { icon: faGithub, href: "#" }
                                    ].map((social, i) => (
                                        <a key={i} href={social.href} className="w-12 h-12 rounded-full border border-[#334155] flex items-center justify-center text-[#94A3B8] hover:text-white hover:border-[#4F46E5] hover:bg-[#4F46E5]/10 transition-all">
                                            <FontAwesomeIcon icon={social.icon} size="lg" />
                                        </a>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* --- RIGHT SIDE: FORM --- */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <Card className="glass bg-[#1E293B]/40 border-[#334155] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4F46E5] to-[#22D3EE]" />

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest">Name</label>
                                            <Input placeholder="John Doe" className="bg-[#020617] border-[#334155] h-14 rounded-xl focus:ring-[#4F46E5]" required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest">Email</label>
                                            <Input type="email" placeholder="john@company.com" className="bg-[#020617] border-[#334155] h-14 rounded-xl focus:ring-[#4F46E5]" required />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest">Company</label>
                                        <Input placeholder="Acme Inc." className="bg-[#020617] border-[#334155] h-14 rounded-xl focus:ring-[#4F46E5]" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest">How can we help?</label>
                                        <Textarea placeholder="Tell us about your biggest bottleneck..." className="bg-[#020617] border-[#334155] min-h-[160px] rounded-xl focus:ring-[#4F46E5] p-4" required />
                                    </div>

                                    <Button type="submit" className="w-full bg-[#4F46E5] hover:bg-[#4F46E5]/90 py-8 text-xl font-bold rounded-xl group transition-all">
                                        Send Message
                                        <FontAwesomeIcon icon={faPaperPlane} className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </Button>

                                    <p className="text-center text-[#94A3B8] text-xs">
                                        By submitting, you agree to our <a href="#" className="underline">Privacy Policy</a>.
                                    </p>
                                </form>
                            </Card>
                        </motion.div>

                    </div>
                </div>
            </section>
        </div>
    );
}