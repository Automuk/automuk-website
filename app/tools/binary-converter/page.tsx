"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Copy, Check, Repeat } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function BinaryConverter() {
    const [binary, setBinary] = useState("");
    const [decimal, setDecimal] = useState("");
    const [hex, setHex] = useState("");
    const [copied, setCopied] = useState<string | null>(null);

    const updateFromBinary = (val: string) => {
        setBinary(val);
        if (/^[01]*$/.test(val) && val !== "") {
            const dec = parseInt(val, 2);
            setDecimal(dec.toString());
            setHex(dec.toString(16).toUpperCase());
        } else if (val === "") {
            setDecimal("");
            setHex("");
        }
    };

    const copy = (text: string, type: string) => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-2xl bg-white/[0.03] border border-white/10 rounded-[3rem] p-8 md:p-12 space-y-10"
            >
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary">
                        <Cpu size={40} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-white">Binary Converter</h1>
                        <p className="text-[#94A3B8]">Convert between Binary, Decimal, and Hex.</p>
                    </div>
                </div>

                <div className="space-y-6">
                    {[
                        { label: "Binary", value: binary, onChange: updateFromBinary },
                        { label: "Decimal", value: decimal, readOnly: true },
                        { label: "Hexadecimal", value: hex, readOnly: true }
                    ].map((item) => (
                        <div key={item.label} className="space-y-2">
                            <div className="flex justify-between items-center px-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[#475569]">{item.label}</label>
                                {item.value && (
                                    <button onClick={() => copy(item.value, item.label)} className="text-[#475569] hover:text-primary transition-colors">
                                        {copied === item.label ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                                    </button>
                                )}
                            </div>
                            <Input
                                value={item.value}
                                onChange={(e) => item.onChange?.(e.target.value)}
                                readOnly={item.readOnly}
                                placeholder={`Enter ${item.label.toLowerCase()}...`}
                                className="h-16 bg-white/[0.04] border-white/10 rounded-2xl text-white font-mono text-xl pl-6 focus:border-primary/50"
                            />
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
