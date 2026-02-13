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
    faLinkedin
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
        <div className="flex flex-col w-full bg-background min-h-screen">
            <section className="relative pt-32 pb-32 px-4 overflow-hidden">
                {/* Background Accents */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 blur-[150px] rounded-full -z-10 animate-float" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 blur-[130px] rounded-full -z-10 animate-float [animation-delay:-3s]" />

                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">

                        {/* --- LEFT SIDE: INFO --- */}
                        <motion.div
                            initial="initial"
                            animate="animate"
                            variants={staggerContainer}
                            className="space-y-12"
                        >
                            <motion.div variants={fadeInUp}>
                                <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight text-white font-heading">
                                    Let’s Automate <br />
                                    <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent italic bg-[length:200%_auto] animate-gradient-flow">
                                        Your Future.
                                    </span>
                                </h1>
                                <p className="text-xl text-muted-foreground leading-relaxed max-w-xl font-heading">
                                    Have a complex bottleneck? Need an AI agent with specific traits? Tell us your goal, and we'll build the engine to reach it.
                                </p>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="space-y-8">
                                <div className="flex items-start gap-6 group">
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-[0_0_20px_rgba(49,104,250,0.2)]">
                                        <FontAwesomeIcon icon={faEnvelope} className="text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-black text-lg mb-1 uppercase tracking-wider">Email Us</h3>
                                        <p className="text-muted-foreground font-heading">arijit@autom.uk</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6 group">
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500 shadow-[0_0_20px_rgba(206,119,251,0.2)]">
                                        <FontAwesomeIcon icon={faClock} className="text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-black text-lg mb-1 uppercase tracking-wider">Response Time</h3>
                                        <p className="text-muted-foreground font-heading">Within 24 business hours</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="pt-8">
                                <h4 className="text-white font-black mb-6 uppercase tracking-[0.2em] text-[10px] opacity-50">Connect with us</h4>
                                <div className="flex gap-4">
                                    {[
                                        { icon: faLinkedin, href: "https://www.linkedin.com/company/automuk", color: "hover:bg-[#0077b5]" },
                                    ].map((social, i) => (
                                        <a key={i} href={social.href} className={`w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground ${social.color} hover:border-transparent transition-all duration-300 shadow-xl group`}>
                                            <FontAwesomeIcon icon={social.icon} size="lg" className="group-hover:scale-110 transition-transform" />
                                        </a>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* --- RIGHT SIDE: FORM --- */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <Card className="glass bg-card/40 border-white/10 p-8 md:p-14 rounded-[3rem] md:rounded-[4rem] shadow-2xl relative overflow-hidden group">

                                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Full Name</label>
                                            <Input placeholder="John Doe" className="bg-background/50 border-white/5 h-16 rounded-2xl focus:ring-primary focus:border-primary/50 text-white placeholder:text-muted-foreground/30 transition-all" required />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Email Address</label>
                                            <Input type="email" placeholder="john@company.com" className="bg-background/50 border-white/5 h-16 rounded-2xl focus:ring-primary focus:border-primary/50 text-white placeholder:text-muted-foreground/30 transition-all" required />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Company / Organization</label>
                                        <Input placeholder="Acme Inc." className="bg-background/50 border-white/5 h-16 rounded-2xl focus:ring-primary focus:border-primary/50 text-white placeholder:text-muted-foreground/30 transition-all" />
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">How can we help?</label>
                                        <Textarea placeholder="Tell us about your biggest bottleneck..." className="bg-background/50 border-white/5 min-h-[180px] rounded-3xl focus:ring-primary focus:border-primary/50 text-white p-6 placeholder:text-muted-foreground/30 transition-all resize-none" required />
                                    </div>

                                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white py-10 text-xl font-black rounded-3xl group transition-all shadow-[0_20px_40px_rgba(49,104,250,0.3)] hover:scale-[1.02] active:scale-95">
                                        Send Message
                                        <FontAwesomeIcon icon={faPaperPlane} className="ml-4 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                                    </Button>

                                    <p className="text-center text-muted-foreground text-[10px] items-center flex justify-center gap-2 font-black uppercase tracking-widest opacity-40">
                                        Secured by <span className="text-primary">Automuk</span> Technology
                                    </p>
                                </form>

                                {/* Background Glow on Hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
                            </Card>
                        </motion.div>

                    </div>
                </div>
            </section>
        </div>
    );
}