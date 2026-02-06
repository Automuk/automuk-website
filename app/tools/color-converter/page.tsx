"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Palette, Copy, Check, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ColorConverter() {
    const [hex, setHex] = useState("#3168FA");
    const [rgb, setRgb] = useState("rgb(49, 104, 250)");
    const [hsl, setHsl] = useState("hsl(224, 96%, 59%)");
    const [copied, setCopied] = useState<string | null>(null);

    const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };

    const handleHexChange = (value: string) => {
        setHex(value);
        if (/^#?([a-f\d]{3}){1,2}$/i.test(value)) {
            const rbgVal = hexToRgb(value);
            if (rbgVal) {
                setRgb(`rgb(${rbgVal.r}, ${rbgVal.g}, ${rbgVal.b})`);
            }
        }
    };

    const copyToClipboard = (text: string, type: string) => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-4xl bg-white/[0.03] border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-3xl shadow-2xl"
            >
                <div className="p-8 md:p-12 space-y-12">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shadow-[0_0_30px_rgba(49,104,250,0.3)]">
                            <Palette size={32} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-white tracking-tight">Color Converter</h1>
                            <p className="text-[#94A3B8] font-medium">Convert between HEX, RGB and HSL formats.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <label className="text-xs font-black uppercase tracking-widest text-[#475569]">Preview</label>
                                <motion.div
                                    animate={{ backgroundColor: hex }}
                                    className="w-full h-48 rounded-3xl shadow-2xl border border-white/10 relative overflow-hidden group"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none" />
                                </motion.div>
                            </div>

                            <div className="relative">
                                <label className="text-xs font-black uppercase tracking-widest text-[#475569] block mb-4">HEX Color</label>
                                <div className="relative group">
                                    <Input
                                        type="text"
                                        value={hex}
                                        onChange={(e) => handleHexChange(e.target.value)}
                                        className="h-16 bg-white/5 border-white/10 rounded-2xl pl-6 pr-14 text-white font-mono text-lg focus:border-primary/50 transition-all"
                                    />
                                    <input
                                        type="color"
                                        value={hex}
                                        onChange={(e) => handleHexChange(e.target.value)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-transparent border-none cursor-pointer outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {[
                                { label: "HEX", value: hex },
                                { label: "RGB", value: rgb },
                                { label: "HSL", value: hsl }
                            ].map((item) => (
                                <div key={item.label} className="group p-6 bg-white/[0.02] border border-white/5 rounded-2xl space-y-3 hover:bg-white/[0.04] hover:border-white/10 transition-all">
                                    <div className="flex items-center justify-between">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[#475569]">{item.label}</label>
                                        <button
                                            onClick={() => copyToClipboard(item.value, item.label)}
                                            className="text-[#475569] hover:text-primary transition-colors"
                                        >
                                            {copied === item.label ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                                        </button>
                                    </div>
                                    <div className="text-xl font-mono text-white selection:bg-primary/30 break-all">
                                        {item.value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
