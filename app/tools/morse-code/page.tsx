"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Radio, Copy, Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const MORSE_MAP: Record<string, string> = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', '0': '-----', ' ': '/'
};

export default function MorseCode() {
    const [text, setText] = useState("");
    const [morse, setMorse] = useState("");
    const [copied, setCopied] = useState(false);

    const translate = (val: string) => {
        setText(val);
        const translated = val.toUpperCase().split("").map(char => MORSE_MAP[char] || "").join(" ");
        setMorse(translated);
    };

    const copy = () => {
        navigator.clipboard.writeText(morse);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-[80vh] py-32 px-4 flex justify-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-4xl space-y-12"
            >
                <div className="flex items-center gap-8">
                    <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary group transition-all">
                        <Radio size={36} className="group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-white tracking-tighter">Morse Code</h1>
                        <p className="text-[#94A3B8] font-medium italic">Encrypt and decrypt messages using international morse code.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <label className="text-xs font-black uppercase tracking-widest text-[#475569]">Normal Text</label>
                        <textarea
                            value={text}
                            onChange={(e) => translate(e.target.value)}
                            placeholder="Enter message..."
                            className="w-full h-80 bg-white/[0.03] border border-white/10 rounded-3xl p-8 text-white font-mono placeholder:text-[#475569] focus:border-primary/50 transition-all outline-none resize-none text-lg"
                        />
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-black uppercase tracking-widest text-[#475569]">Morse Translation</label>
                            {morse && (
                                <button onClick={copy} className="text-[#475569] hover:text-primary transition-colors">
                                    {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                                </button>
                            )}
                        </div>
                        <div className="w-full h-80 bg-white/[0.02] border border-white/5 rounded-3xl p-8 text-primary font-mono whitespace-pre-wrap break-all overflow-y-auto text-xl leading-relaxed">
                            {morse || ".... . .-.. .-.. ---"}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
