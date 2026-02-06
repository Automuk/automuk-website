"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { FileText, Type, Hash, Clock, AlignLeft } from "lucide-react";

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

export default function WordCounter() {
    const [text, setText] = useState("");

    const stats = useMemo(() => {
        const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
        const characters = text.length;
        const charactersNoSpaces = text.replace(/\s+/g, "").length;
        const sentences = text.split(/[.!?]+/).filter(Boolean).length;
        const paragraphs = text.split(/\n+/).filter(Boolean).length;
        const readingTime = Math.ceil(words / 200); // Average 200 wpm

        return [
            { label: "Words", value: words, icon: Type },
            { label: "Characters", value: characters, icon: Hash },
            { label: "No Spaces", value: charactersNoSpaces, icon: AlignLeft },
            { label: "Sentences", value: sentences, icon: FileText },
            { label: "Paragraphs", value: paragraphs, icon: FileText },
            { label: "Reading Time", value: `${readingTime} min`, icon: Clock },
        ];
    }, [text]);

    return (
        <div className="min-h-screen bg-[#00020C] pt-40 pb-20 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={fadeInUp}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 font-heading">
                        Word <span className="text-[#3168FA]">Counter</span>
                    </h1>
                    <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto font-heading">
                        Analyze your text in real-time. Track words, characters, and estimated reading time.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Editor Area */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-2"
                    >
                        <Card className="bg-[#020617] border-[#334155] p-6 h-full shadow-2xl">
                            <Textarea
                                placeholder="Paste or type your text here..."
                                className="min-h-[500px] h-full bg-transparent border-none text-white text-lg leading-relaxed focus-visible:ring-0 resize-none placeholder:text-[#334155]"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                        </Card>
                    </motion.div>

                    {/* Stats Area */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                    >
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Card className="bg-[#020617] border-[#334155] p-6 flex items-center justify-between group hover:border-[#3168FA] transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                            <stat.icon size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-[#94A3B8] uppercase tracking-widest font-heading">{stat.label}</p>
                                            <p className="text-2xl font-black text-white font-heading">{stat.value}</p>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}

                        <Card className="bg-[#3168FA]/5 border-[#3168FA]/20 p-6 mt-8">
                            <p className="text-[#3168FA] font-bold mb-2 font-heading">Pro Tip</p>
                            <p className="text-[#94A3B8] text-sm leading-relaxed font-heading">
                                For optimal SEO and readability, aim for paragraphs under 4-5 sentences and a mix of short and long sentences.
                            </p>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
