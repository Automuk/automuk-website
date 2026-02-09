"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GitCompare, Copy, Check, ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import LogoSVG from "@/components/ui/logo-svg";

export default function DiffChecker() {
    const [text1, setText1] = useState("");
    const [text2, setText2] = useState("");
    const [loading, setLoading] = useState(false);
    const [diffResult, setDiffResult] = useState<{ type: "added" | "removed" | "equal"; value: string }[] | null>(null);

    const compare = async () => {
        setLoading(true);
        // Add a small delay for premium feel
        await new Promise(resolve => setTimeout(resolve, 800));

        const lines1 = text1.split("\n");
        const lines2 = text2.split("\n");
        // Simple line-by-line diff for demonstration
        const result: { type: "added" | "removed" | "equal"; value: string }[] = [];
        const maxLines = Math.max(lines1.length, lines2.length);

        for (let i = 0; i < maxLines; i++) {
            if (lines1[i] === lines2[i]) {
                if (lines1[i] !== undefined) result.push({ type: "equal", value: lines1[i] });
            } else {
                if (lines1[i] !== undefined) result.push({ type: "removed", value: lines1[i] });
                if (lines2[i] !== undefined) result.push({ type: "added", value: lines2[i] });
            }
        }
        setDiffResult(result);
        setLoading(false);
    };

    return (
        <div className="min-h-[80vh] pt-32 pb-20 px-4 md:px-8">
            <div className="max-w-6xl mx-auto space-y-12">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shadow-[0_0_30px_rgba(49,104,250,0.3)]">
                        <GitCompare size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight">Diff Checker</h1>
                        <p className="text-[#94A3B8] font-medium">Compare two text snippets side by side.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <label className="text-xs font-black uppercase tracking-widest text-[#475569]">Text A</label>
                        <textarea
                            value={text1}
                            onChange={(e) => setText1(e.target.value)}
                            placeholder="Paste original text here..."
                            className="w-full h-80 bg-white/[0.03] border border-white/10 rounded-3xl p-6 text-white font-mono placeholder:text-[#475569] focus:border-primary/50 transition-all outline-none resize-none"
                        />
                    </div>
                    <div className="space-y-4">
                        <label className="text-xs font-black uppercase tracking-widest text-[#475569]">Text B</label>
                        <textarea
                            value={text2}
                            onChange={(e) => setText2(e.target.value)}
                            placeholder="Paste modified text here..."
                            className="w-full h-80 bg-white/[0.03] border border-white/10 rounded-3xl p-6 text-white font-mono placeholder:text-[#475569] focus:border-primary/50 transition-all outline-none resize-none"
                        />
                    </div>
                </div>

                <div className="flex justify-center">
                    <Button onClick={compare} disabled={loading} className="h-14 px-12 rounded-2xl gap-2 text-lg font-bold">
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5">
                                    <LogoSVG animate={true} size={20} className="fill-white" />
                                </div>
                                <span>Comparing...</span>
                            </div>
                        ) : (
                            <>
                                Compare Now <ArrowRightLeft size={20} />
                            </>
                        )}
                    </Button>
                </div>

                {diffResult && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 space-y-4 font-mono text-sm overflow-x-auto"
                    >
                        {diffResult.map((line, i) => (
                            <div key={i} className={`flex gap-4 p-1 rounded ${line.type === "added" ? "bg-green-500/10 text-green-400" :
                                line.type === "removed" ? "bg-red-500/10 text-red-400" :
                                    "text-[#94A3B8]"
                                }`}>
                                <span className="w-6 shrink-0 opacity-40">
                                    {line.type === "added" ? "+" : line.type === "removed" ? "-" : " "}
                                </span>
                                <span>{line.value || " "}</span>
                            </div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
