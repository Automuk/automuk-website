"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt, faCopy, faTrash, faCheck, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Base64Converter() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState<"encode" | "decode">("encode");
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        handleConvert();
    }, [input, mode]);

    const handleConvert = () => {
        if (!input.trim()) {
            setOutput("");
            setError("");
            return;
        }

        try {
            if (mode === "encode") {
                const encoded = btoa(input);
                setOutput(encoded);
                setError("");
            } else {
                const decoded = atob(input.trim());
                setOutput(decoded);
                setError("");
            }
        } catch (err: any) {
            setError(mode === "decode" ? "Invalid Base64 string" : err.message);
            setOutput("");
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
        <div className="min-h-screen bg-[#00020C] pt-40 pb-20 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={fadeInUp}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
                        Base64 <span className="text-[#3168FA]">Converter</span>
                    </h1>
                    <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">
                        Fast and secure Base64 encoding and decoding for your data.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Input Section */}
                    <motion.div variants={fadeInUp} initial="initial" animate="animate">
                        <Card className="glass bg-[#1E293B]/40 border-[#334155] p-6 h-full flex flex-col">
                            <div className="flex justify-between items-center mb-6">
                                <Tabs value={mode} onValueChange={(val: string) => setMode(val as any)} className="w-full">
                                    <TabsList className="bg-[#020617] border border-[#334155] p-1 h-12 rounded-xl w-full">
                                        <TabsTrigger
                                            value="encode"
                                            className="flex-1 rounded-lg data-[state=active]:bg-[#3168FA] data-[state=active]:text-white text-[#94A3B8]"
                                        >
                                            Encode
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="decode"
                                            className="flex-1 rounded-lg data-[state=active]:bg-[#3168FA] data-[state=active]:text-white text-[#94A3B8]"
                                        >
                                            Decode
                                        </TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </div>

                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-white font-bold flex items-center gap-2">
                                    <FontAwesomeIcon icon={faExchangeAlt} className="text-[#3168FA]" />
                                    {mode === "encode" ? "String to Encode" : "Base64 to Decode"}
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
                                placeholder={mode === "encode" ? "Enter text here..." : "Paste Base64 here..."}
                                className="flex-1 bg-[#020617] border-[#334155] min-h-[400px] font-mono text-sm leading-relaxed focus:ring-[#3168FA] p-4"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </Card>
                    </motion.div>

                    {/* Output Section */}
                    <motion.div variants={fadeInUp} initial="initial" animate="animate" transition={{ delay: 0.1 }}>
                        <Card className="glass bg-[#1E293B]/40 border-[#334155] p-6 h-full flex flex-col">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-white font-bold flex items-center gap-2">
                                    <FontAwesomeIcon icon={faCheck} className="text-[#3168FA]" />
                                    Result
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
                                <div className="flex-1 bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-red-400 font-mono text-sm flex flex-col items-center justify-center text-center gap-3">
                                    <FontAwesomeIcon icon={faTriangleExclamation} className="text-2xl" />
                                    <span>{error}</span>
                                </div>
                            ) : (
                                <Textarea
                                    readOnly
                                    placeholder="Result will appear here..."
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
