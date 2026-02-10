"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LogoSVG from "@/components/ui/logo-svg";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw, FileText } from "lucide-react";

const LOREM_WORDS = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "ut", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "dolor", "in", "reprehenderit", "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"
];

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

export default function LoremIpsum() {
    const [paragraphs, setParagraphs] = useState(3);
    const [loading, setLoading] = useState(false);
    const [generatedText, setGeneratedText] = useState("");

    const generateText = async () => {
        setLoading(true);
        // Add a small delay for premium feel
        await new Promise(resolve => setTimeout(resolve, 600));

        let text = [];
        for (let i = 0; i < paragraphs; i++) {
            let sentenceCount = Math.floor(Math.random() * 4) + 4;
            let sentences = [];
            for (let j = 0; j < sentenceCount; j++) {
                let wordCount = Math.floor(Math.random() * 10) + 10;
                let words = [];
                for (let k = 0; k < wordCount; k++) {
                    words.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
                }
                let sentence = words.join(" ");
                sentences.push(sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".");
            }
            text.push(sentences.join(" "));
        }
        setGeneratedText(text.join("\n\n"));
        setLoading(false);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedText);
    };

    useState(() => {
        generateText();
    });

    return (
        <div className="min-h-screen bg-[#00020C] pt-10 md:pt-40 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={fadeInUp}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 font-heading">
                        Lorem <span className="text-[#3168FA]">Ipsum</span>
                    </h1>
                    <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto font-heading">
                        Generate professional placeholder text for your designs and mockups.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Card className="bg-[#020617] border-[#334155] p-8 shadow-2xl">
                            <div className="flex flex-col md:flex-row gap-6 items-end mb-8">
                                <div className="flex-1 space-y-2">
                                    <Label htmlFor="paragraphs" className="text-[#94A3B8]">Number of Paragraphs</Label>
                                    <Input
                                        id="paragraphs"
                                        type="number"
                                        min={1}
                                        max={20}
                                        value={paragraphs}
                                        onChange={(e) => setParagraphs(parseInt(e.target.value) || 1)}
                                        className="bg-[#0f172a] border-[#334155] text-white"
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <Button
                                        onClick={generateText}
                                        disabled={loading}
                                        className="bg-primary hover:bg-primary/90 text-white h-11 px-8"
                                    >
                                        {loading ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5">
                                                    <LogoSVG animate={true} size={20} className="fill-white" />
                                                </div>
                                                <span>Generating...</span>
                                            </div>
                                        ) : (
                                            <>
                                                <RefreshCw size={18} className="mr-2" />
                                                Generate
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        onClick={copyToClipboard}
                                        variant="outline"
                                        className="border-[#334155] text-white hover:bg-white/5 h-11 px-8"
                                    >
                                        <Copy size={18} className="mr-2" />
                                        Copy All
                                    </Button>
                                </div>
                            </div>

                            <div className="bg-[#0f172a] border border-[#334155] rounded-xl p-6 min-h-[300px] text-[#94A3B8] leading-relaxed whitespace-pre-wrap font-heading">
                                {generatedText}
                            </div>
                        </Card>
                    </motion.div>

                    <Card className="bg-[#3168FA]/5 border-[#3168FA]/20 p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <FileText className="text-primary" size={20} />
                            <p className="text-[#3168FA] font-bold">Why use Lorem Ipsum?</p>
                        </div>
                        <p className="text-[#94A3B8] text-sm leading-relaxed">
                            It allows designers to focus on graphic elements rather than the content. It has a more-or-less normal distribution of letters, making it look like readable English.
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    );
}
