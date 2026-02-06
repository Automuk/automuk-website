"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Copy, Check, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function HashGenerator() {
    const [input, setInput] = useState("");
    const [hashes, setHashes] = useState({ sha256: "", md5: "" });
    const [copied, setCopied] = useState<string | null>(null);

    const generate = async () => {
        if (!input) return;
        // SHA-256 using Crypto API
        const msgBuffer = new TextEncoder().encode(input);
        const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const sha256 = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

        // Placeholder for MD5 since it's not in SubtleCrypto (would normally use a lib)
        setHashes({ sha256, md5: "Click to generate..." });
    };

    const copy = (text: string, type: string) => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="min-h-[80vh] pt-32 pb-20 px-4 md:px-8">
            <div className="max-w-3xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mx-auto">
                        <ShieldCheck size={32} />
                    </div>
                    <h1 className="text-4xl font-black text-white tracking-tight">Hash Generator</h1>
                    <p className="text-[#94A3B8] max-w-lg mx-auto italic">Encode your data using secure hashing algorithms.</p>
                </div>

                <div className="space-y-8">
                    <div className="space-y-4">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Enter text to hash..."
                            className="w-full h-40 bg-white/[0.03] border border-white/10 rounded-3xl p-6 text-white font-mono placeholder:text-[#475569] focus:border-primary/50 transition-all outline-none resize-none"
                        />
                        <Button onClick={generate} className="w-full h-14 rounded-2xl font-bold gap-2">
                            Generate Hashes <Lock size={18} />
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {hashes.sha256 && (
                            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl relative group overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#475569]">SHA-256</span>
                                    <button onClick={() => copy(hashes.sha256, "sha2")} className="text-[#475569] hover:text-white">
                                        {copied === "sha2" ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                                    </button>
                                </div>
                                <div className="text-sm font-mono text-white break-all leading-relaxed">
                                    {hashes.sha256}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
