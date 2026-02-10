"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Trash2, Type, ArrowLeftRight } from "lucide-react";

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

export default function CaseConverter() {
    const [text, setText] = useState("");

    const convertTo = (type: string) => {
        let result = text;
        switch (type) {
            case "upper":
                result = text.toUpperCase();
                break;
            case "lower":
                result = text.toLowerCase();
                break;
            case "camel":
                result = text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
                    index === 0 ? word.toLowerCase() : word.toUpperCase()
                ).replace(/\s+/g, "");
                break;
            case "pascal":
                result = text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) =>
                    word.toUpperCase()
                ).replace(/\s+/g, "");
                break;
            case "snake":
                result = text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
                    ?.map(x => x.toLowerCase())
                    .join('_') || "";
                break;
            case "kebab":
                result = text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
                    ?.map(x => x.toLowerCase())
                    .join('-') || "";
                break;
            case "constant":
                result = text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
                    ?.map(x => x.toUpperCase())
                    .join('_') || "";
                break;
            case "sentence":
                result = text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase());
                break;
            case "title":
                result = text.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
                break;
        }
        setText(result);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="min-h-screen bg-[#00020C] pt-10 md:pt-40 pb-20 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={fadeInUp}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 font-heading">
                        Case <span className="text-[#3168FA]">Converter</span>
                    </h1>
                    <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto font-heading">
                        Easily convert your text between different character cases. Fast, simple, and secure.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-2"
                    >
                        <Card className="bg-[#020617] border-[#334155] p-6 h-full shadow-2xl relative">
                            <div className="absolute top-4 right-4 flex gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-[#94A3B8] hover:text-white"
                                    onClick={copyToClipboard}
                                >
                                    <Copy size={18} />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-[#94A3B8] hover:text-red-500"
                                    onClick={() => setText("")}
                                >
                                    <Trash2 size={18} />
                                </Button>
                            </div>
                            <Textarea
                                placeholder="Paste or type your text here..."
                                className="min-h-[400px] h-full bg-transparent border-none text-white text-lg leading-relaxed focus-visible:ring-0 resize-none placeholder:text-[#334155] pt-12"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                    >
                        <p className="text-sm font-bold text-[#94A3B8] uppercase tracking-widest mb-4">Operations</p>
                        <div className="grid grid-cols-1 gap-3">
                            {[
                                { label: "UPPERCASE", id: "upper" },
                                { label: "lowercase", id: "lower" },
                                { label: "camelCase", id: "camel" },
                                { label: "PascalCase", id: "pascal" },
                                { label: "snake_case", id: "snake" },
                                { label: "kebab-case", id: "kebab" },
                                { label: "CONSTANT_CASE", id: "constant" },
                                { label: "Sentence case", id: "sentence" },
                                { label: "Title Case", id: "title" },
                            ].map((op) => (
                                <Button
                                    key={op.id}
                                    variant="outline"
                                    className="justify-start bg-[#020617] border-[#334155] text-white hover:bg-[#3168FA]/10 hover:border-[#3168FA] h-12"
                                    onClick={() => convertTo(op.id)}
                                >
                                    <ArrowLeftRight size={16} className="mr-3 text-primary" />
                                    {op.label}
                                </Button>
                            ))}
                        </div>

                        <Card className="bg-[#3168FA]/5 border-[#3168FA]/20 p-6 mt-8">
                            <div className="flex items-center gap-3 mb-2">
                                <Type className="text-primary" size={20} />
                                <p className="text-[#3168FA] font-bold font-heading">Quick Stats</p>
                            </div>
                            <p className="text-[#94A3B8] text-sm leading-relaxed font-heading">
                                Words: {text.trim() === "" ? 0 : text.trim().split(/\s+/).length} | Characters: {text.length}
                            </p>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
