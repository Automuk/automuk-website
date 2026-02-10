"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faCopy, faMagic, faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LogoSVG from "@/components/ui/logo-svg";

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function JsonPrettier() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleBeautify = async () => {
        try {
            setLoading(true);
            setError("");
            if (!input.trim()) {
                setLoading(false);
                return;
            }
            // Add a small delay for premium feel
            await new Promise(resolve => setTimeout(resolve, 600));
            const parsed = JSON.parse(input);
            const formatted = JSON.stringify(parsed, null, 2);
            setOutput(formatted);
        } catch (err: any) {
            setError(err.message || "Invalid JSON format");
            setOutput("");
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleClear = () => {
        setInput("");
        setOutput("");
        setError("");
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
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
                        JSON <span className="text-[#3168FA]">Prettier</span>
                    </h1>
                    <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">
                        Format and beautify your JSON data instantly. Clean, readable, and ready to use.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Input Section */}
                    <motion.div variants={fadeInUp} initial="initial" animate="animate">
                        <Card className="glass bg-[#1E293B]/40 border-[#334155] p-6 h-full flex flex-col">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-white font-bold flex items-center gap-2">
                                    <FontAwesomeIcon icon={faCode} className="text-[#3168FA]" />
                                    Input
                                </h3>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleClear}
                                    className="text-muted-foreground hover:text-white"
                                >
                                    <FontAwesomeIcon icon={faTrash} className="mr-2" />
                                    Clear
                                </Button>
                            </div>
                            <Textarea
                                placeholder="Paste your raw JSON here..."
                                className="flex-1 bg-[#020617] border-[#334155] min-h-[400px] font-mono text-sm leading-relaxed focus:ring-[#3168FA] p-4"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                            <Button
                                onClick={handleBeautify}
                                disabled={loading}
                                className="mt-6 bg-[#3168FA] hover:bg-[#3168FA]/90 h-14 text-lg font-bold rounded-xl"
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5">
                                            <LogoSVG animate={true} size={20} className="fill-white" />
                                        </div>
                                        <span>Beautifying...</span>
                                    </div>
                                ) : (
                                    <>
                                        <FontAwesomeIcon icon={faMagic} className="mr-2" />
                                        Beautify JSON
                                    </>
                                )}
                            </Button>
                        </Card>
                    </motion.div>

                    {/* Output Section */}
                    <motion.div variants={fadeInUp} initial="initial" animate="animate" transition={{ delay: 0.1 }}>
                        <Card className="glass bg-[#1E293B]/40 border-[#334155] p-6 h-full flex flex-col relative overflow-hidden">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-white font-bold flex items-center gap-2">
                                    <FontAwesomeIcon icon={faMagic} className="text-[#3168FA]" />
                                    Output
                                </h3>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleCopy}
                                    disabled={!output}
                                    className={`${copied ? "text-emerald-400" : "text-muted-foreground hover:text-white"}`}
                                >
                                    <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="mr-2" />
                                    {copied ? "Copied!" : "Copy"}
                                </Button>
                            </div>

                            {error ? (
                                <div className="flex-1 bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 font-mono text-sm">
                                    Error: {error}
                                </div>
                            ) : (
                                <Textarea
                                    readOnly
                                    placeholder="Formatted JSON will appear here..."
                                    className="flex-1 bg-[#020617] border-[#334155] min-h-[400px] font-mono text-sm leading-relaxed p-4"
                                    value={output}
                                />
                            )}
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
