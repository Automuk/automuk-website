"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LogoSVG from "@/components/ui/logo-svg";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw, Hash } from "lucide-react";

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

export default function UUIDGenerator() {
    const [count, setCount] = useState(5);
    const [loading, setLoading] = useState(false);
    const [uuids, setUuuids] = useState<string[]>([]);

    const generateUUIDs = async () => {
        setLoading(true);
        // Add a small delay for premium feel
        await new Promise(resolve => setTimeout(resolve, 600));

        const newUuuids = Array.from({ length: Math.min(Math.max(count, 1), 100) }, () =>
            crypto.randomUUID()
        );
        setUuuids(newUuuids);
        setLoading(false);
    };

    const copyAll = () => {
        navigator.clipboard.writeText(uuids.join("\n"));
    };

    // Generate initial UUIDs
    useState(() => {
        generateUUIDs();
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
                        UUID <span className="text-[#3168FA]">Generator</span>
                    </h1>
                    <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto font-heading">
                        Generate high-quality random UUIDs (v4) for your development and testing needs.
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
                                    <Label htmlFor="count" className="text-[#94A3B8]">Number of UUIDs</Label>
                                    <Input
                                        id="count"
                                        type="number"
                                        min={1}
                                        max={100}
                                        value={count}
                                        onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                                        className="bg-[#0f172a] border-[#334155] text-white"
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <Button
                                        onClick={generateUUIDs}
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
                                        onClick={copyAll}
                                        variant="outline"
                                        className="border-[#334155] text-white hover:bg-white/5 h-11 px-8"
                                    >
                                        <Copy size={18} className="mr-2" />
                                        Copy All
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                                {uuids.map((uuid, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-4 bg-[#0f172a] border border-[#334155] rounded-xl group hover:border-primary transition-all"
                                    >
                                        <code className="text-white font-mono break-all">{uuid}</code>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-[#94A3B8] hover:text-white"
                                            onClick={() => navigator.clipboard.writeText(uuid)}
                                        >
                                            <Copy size={16} />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        <Card className="bg-[#3168FA]/5 border-[#3168FA]/20 p-6">
                            <div className="flex items-center gap-3 mb-2">
                                <Hash className="text-primary" size={20} />
                                <p className="text-[#3168FA] font-bold">What is UUID v4?</p>
                            </div>
                            <p className="text-[#94A3B8] text-sm leading-relaxed">
                                A Version 4 UUID is a universally unique identifier that is generated using random numbers. It has 122 bits of entropy.
                            </p>
                        </Card>
                        <Card className="bg-white/5 border-white/10 p-6">
                            <p className="text-white font-bold mb-2">Quick Tip</p>
                            <p className="text-[#94A3B8] text-sm leading-relaxed">
                                UUIDs are ideal for primary keys in databases, transaction IDs, and any scenario where collision-free IDs are needed.
                            </p>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
