"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Percent, Calculator, HelpCircle } from "lucide-react";

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

export default function PercentageCalculator() {
    // Problem 1: What is X% of Y?
    const [p1x, setP1x] = useState("");
    const [p1y, setP1y] = useState("");
    const p1res = (parseFloat(p1x) * parseFloat(p1y) / 100).toFixed(2);

    // Problem 2: X is what % of Y?
    const [p2x, setP2x] = useState("");
    const [p2y, setP2y] = useState("");
    const p2res = (parseFloat(p2x) / parseFloat(p2y) * 100).toFixed(2);

    // Problem 3: % Increase/Decrease from X to Y?
    const [p3x, setP3x] = useState("");
    const [p3y, setP3y] = useState("");
    const p3diff = parseFloat(p3y) - parseFloat(p3x);
    const p3res = (p3diff / Math.abs(parseFloat(p3x)) * 100).toFixed(2);

    return (
        <div className="min-h-screen bg-[#00020C] pt-40 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={fadeInUp}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 font-heading">
                        Percentage <span className="text-[#3168FA]">Calculator</span>
                    </h1>
                    <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto font-heading">
                        Simple tools to solve common percentage problems without the math headache.
                    </p>
                </motion.div>

                <div className="space-y-6">
                    {/* Problem 1 */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <Card className="bg-[#020617] border-[#334155] p-8 shadow-2xl">
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <div className="flex-1 space-y-2">
                                    <Label className="text-[#94A3B8] text-xs uppercase tracking-widest font-black">What is</Label>
                                    <div className="flex items-center gap-4">
                                        <div className="relative flex-1">
                                            <Input type="number" value={p1x} onChange={(e) => setP1x(e.target.value)} className="bg-[#0f172a] border-[#334155] h-14 text-white text-xl font-bold pr-10" />
                                            <Percent className="absolute right-4 top-1/2 -translate-y-1/2 text-[#334155]" size={18} />
                                        </div>
                                        <span className="text-[#94A3B8] font-bold">of</span>
                                        <Input type="number" value={p1y} onChange={(e) => setP1y(e.target.value)} className="bg-[#0f172a] border-[#334155] h-14 text-white text-xl font-bold flex-1" />
                                    </div>
                                </div>
                                <div className="hidden md:block text-2xl text-primary font-black">=</div>
                                <div className="flex-1 space-y-2 w-full md:w-auto">
                                    <Label className="text-primary text-xs uppercase tracking-widest font-black">Result</Label>
                                    <div className="bg-[#3168FA]/10 border border-[#3168FA]/30 h-14 rounded-xl flex items-center px-6 text-2xl font-black text-[#3168FA]">
                                        {isNaN(parseFloat(p1res)) ? "0.00" : p1res}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Problem 2 */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        <Card className="bg-[#020617] border-[#334155] p-8 shadow-2xl">
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-4">
                                        <Input type="number" value={p2x} onChange={(e) => setP2x(e.target.value)} className="bg-[#0f172a] border-[#334155] h-14 text-white text-xl font-bold flex-1" />
                                        <span className="text-[#94A3B8] font-bold">is what % of</span>
                                        <Input type="number" value={p2y} onChange={(e) => setP2y(e.target.value)} className="bg-[#0f172a] border-[#334155] h-14 text-white text-xl font-bold flex-1" />
                                    </div>
                                </div>
                                <div className="hidden md:block text-2xl text-primary font-black">=</div>
                                <div className="flex-1 space-y-2 w-full md:w-auto">
                                    <Label className="text-primary text-xs uppercase tracking-widest font-black">Result (%)</Label>
                                    <div className="bg-[#3168FA]/10 border border-[#3168FA]/30 h-14 rounded-xl flex items-center px-6 text-2xl font-black text-[#3168FA]">
                                        {isNaN(parseFloat(p2res)) ? "0.00" : p2res}%
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Problem 3 */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <Card className="bg-[#020617] border-[#334155] p-8 shadow-2xl">
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <div className="flex-1 space-y-2">
                                    <Label className="text-[#94A3B8] text-xs uppercase tracking-widest font-black">Percentage change from</Label>
                                    <div className="flex items-center gap-4">
                                        <Input type="number" value={p3x} onChange={(e) => setP3x(e.target.value)} className="bg-[#0f172a] border-[#334155] h-14 text-white text-xl font-bold flex-1" />
                                        <span className="text-[#94A3B8] font-bold">to</span>
                                        <Input type="number" value={p3y} onChange={(e) => setP3y(e.target.value)} className="bg-[#0f172a] border-[#334155] h-14 text-white text-xl font-bold flex-1" />
                                    </div>
                                </div>
                                <div className="hidden md:block text-2xl text-primary font-black">=</div>
                                <div className="flex-1 space-y-2 w-full md:w-auto">
                                    <Label className="text-primary text-xs uppercase tracking-widest font-black">Increase/Decrease</Label>
                                    <div className={`border h-14 rounded-xl flex items-center px-6 text-2xl font-black ${parseFloat(p3res) >= 0 ? 'bg-green-500/10 border-green-500/30 text-green-500' : 'bg-red-500/10 border-red-500/30 text-red-500'}`}>
                                        {isNaN(parseFloat(p3res)) ? "0.00" : (parseFloat(p3res) > 0 ? "+" : "") + p3res}%
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    <Card className="bg-[#3168FA]/5 border-[#3168FA]/20 p-6 flex items-start gap-4">
                        <Calculator className="text-primary mt-1" size={20} />
                        <div>
                            <p className="text-white font-bold mb-1 uppercase text-xs tracking-widest">Financial Math</p>
                            <p className="text-[#94A3B8] text-sm">Use these to calculate discounts, interest rates, or investment returns quickly.</p>
                        </div>
                    </Card>
                    <Card className="bg-white/5 border-white/5 p-6 flex items-start gap-4">
                        <HelpCircle className="text-[#94A3B8] mt-1" size={20} />
                        <div>
                            <p className="text-white font-bold mb-1 uppercase text-xs tracking-widest">Need help?</p>
                            <p className="text-[#94A3B8] text-sm">Percentage calculations are rounded to 2 decimal places for better clarity.</p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
