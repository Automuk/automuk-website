"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Database, Copy, Check, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import LogoSVG from "@/components/ui/logo-svg";

export default function SQLFormatter() {
    const [sql, setSql] = useState("");
    const [formatted, setFormatted] = useState("");
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const format = async () => {
        setLoading(true);
        // Add a small delay for premium feel
        await new Promise(resolve => setTimeout(resolve, 600));

        // Simple placeholder formatter logic (removes extra spaces, basic upper casing)
        const keywords = ["SELECT", "FROM", "WHERE", "GROUP BY", "ORDER BY", "JOIN", "LEFT JOIN", "INNER JOIN", "INSERT", "UPDATE", "DELETE", "AND", "OR"];
        let result = sql.replace(/\s+/g, " ");
        keywords.forEach(kw => {
            const regex = new RegExp(`\\b${kw}\\b`, "gi");
            result = result.replace(regex, `\n${kw}`);
        });
        setFormatted(result.trim());
        setLoading(false);
    };

    return (
        <div className="min-h-[80vh] py-32 px-4 flex justify-center bg-[#00020C]">
            <div className="w-full max-w-5xl space-y-10">
                <div className="flex items-center justify-between border-b border-white/5 pb-10">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                            <Database size={32} />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-white tracking-widest uppercase italic">SQL Formatter</h1>
                            <p className="text-[#94A3B8] font-bold tracking-tight">Beautify and standardize your complex SQL queries.</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <textarea
                        value={sql}
                        onChange={(e) => setSql(e.target.value)}
                        placeholder="SELECT * FROM users WHERE active = 1"
                        className="w-full h-64 bg-white/5 border border-white/10 rounded-2xl p-8 text-white font-mono placeholder:text-[#475569] focus:border-primary/40 transition-all outline-none resize-none text-lg"
                    />
                    <div className="flex justify-center">
                        <Button onClick={format} disabled={loading} className="h-14 px-10 rounded-xl gap-3 font-black uppercase tracking-widest text-xs">
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5">
                                        <LogoSVG animate={true} size={20} className="fill-white" />
                                    </div>
                                    <span>Formatting...</span>
                                </div>
                            ) : (
                                <>
                                    Format Query <Terminal size={18} />
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                {formatted && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative group">
                        <button onClick={() => {
                            navigator.clipboard.writeText(formatted);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                        }} className="absolute top-6 right-6 p-3 bg-white/5 rounded-xl text-[#475569] hover:text-white transition-all">
                            {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                        </button>
                        <pre className="bg-white/[0.02] border border-white/5 rounded-3xl p-10 text-primary font-mono text-lg leading-relaxed overflow-x-auto">
                            {formatted}
                        </pre>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
