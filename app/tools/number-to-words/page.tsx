"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { WholeWord, Copy, Check, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function NumberToWords() {
    const [num, setNum] = useState("");
    const [words, setWords] = useState("");
    const [copied, setCopied] = useState(false);

    const converter = (n: number | string): string => {
        let nStr = String(n);
        if (!nStr || isNaN(Number(nStr))) return "Invalid Number";

        const isNegative = Number(nStr) < 0;
        const [intStr, decStr] = nStr.replace("-", "").split(".");
        let num = parseInt(intStr);

        if (num === 0 && !decStr) return isNegative ? "Minus Zero" : "Zero";

        const units = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
        const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
        const scales = ["", "Thousand", "Million", "Billion", "Trillion", "Quadrillion"];

        function convertChunk(c: number): string {
            let s = "";
            if (c >= 100) {
                s += units[Math.floor(c / 100)] + " Hundred ";
                c %= 100;
            }
            if (c >= 20) {
                s += tens[Math.floor(c / 10)] + " ";
                c %= 10;
            }
            if (c > 0) {
                s += units[c] + " ";
            }
            return s.trim();
        }

        let result = "";
        if (num === 0) result = decStr ? "Zero" : "";
        else {
            let scaleIdx = 0;
            while (num > 0) {
                let chunk = num % 1000;
                if (chunk > 0) {
                    let chunkStr = convertChunk(chunk);
                    result = chunkStr + (scales[scaleIdx] ? " " + scales[scaleIdx] : "") + (result ? " " + result : "");
                }
                num = Math.floor(num / 1000);
                scaleIdx++;
            }
        }

        if (isNegative) result = "Minus " + result;

        if (decStr) {
            result += " point";
            const digits = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
            for (let char of decStr) {
                result += " " + digits[parseInt(char)];
            }
        }

        return result.trim();
    };

    const handleChange = (val: string) => {
        setNum(val);
        setWords(val ? converter(val) : "");
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-2xl space-y-12 bg-white/[0.03] border border-white/10 rounded-[3rem] p-12 backdrop-blur-3xl shadow-2xl"
            >
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary group">
                        <WholeWord size={40} className="group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase">Number to Words</h1>
                        <p className="text-[#94A3B8]">Instantly convert numbers into human-readable text.</p>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#475569] px-2">Numerical Value</label>
                        <Input
                            type="number"
                            value={num}
                            onChange={(e) => handleChange(e.target.value)}
                            placeholder="Enter number (e.g. 1250)..."
                            className="h-20 bg-white/5 border-white/10 rounded-2xl text-white text-3xl font-black pl-8 focus:border-primary/50 tabular-nums"
                        />
                    </div>

                    <div className="relative group">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#475569] px-2 block mb-2">Word Representation</label>
                        <div className="w-full min-h-32 bg-primary/5 border border-primary/20 rounded-3xl p-8 text-primary font-bold text-xl italic leading-relaxed">
                            {words || "Enter a number above to see result..."}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
