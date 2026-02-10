"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFlag, faAlignLeft, faCheck, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function RegexTester() {
    const [regex, setRegex] = useState("");
    const [flags, setFlags] = useState({ g: true, i: true, m: false });
    const [testString, setTestString] = useState("");
    const [matches, setMatches] = useState<any[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        handleTest();
    }, [regex, flags, testString]);

    const handleTest = () => {
        if (!regex) {
            setMatches([]);
            setError("");
            return;
        }

        try {
            const flagString = Object.entries(flags)
                .filter(([_, active]) => active)
                .map(([f]) => f)
                .join("");

            const re = new RegExp(regex, flagString);
            const foundMatches = [];

            if (flags.g) {
                let match;
                while ((match = re.exec(testString)) !== null) {
                    foundMatches.push({
                        text: match[0],
                        index: match.index,
                        groups: match.slice(1)
                    });
                    if (match[0].length === 0) re.lastIndex++; // Prevent infinite loops
                }
            } else {
                const match = testString.match(re);
                if (match) {
                    foundMatches.push({
                        text: match[0],
                        index: match.index || 0,
                        groups: match.slice(1)
                    });
                }
            }

            setMatches(foundMatches);
            setError("");
        } catch (err: any) {
            setError(err.message);
            setMatches([]);
        }
    };

    const toggleFlag = (flag: keyof typeof flags) => {
        setFlags(prev => ({ ...prev, [flag]: !prev[flag] }));
    };

    return (
        <div className="min-h-screen bg-[#00020C] pt-10 md:pt-40 pb-20 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={fadeInUp}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
                        Regex <span className="text-[#3168FA]">Tester</span>
                    </h1>
                    <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">
                        Debug and validate your regular expressions in real-time.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Input Column */}
                    <div className="lg:col-span-2 space-y-8">
                        <motion.div variants={fadeInUp} initial="initial" animate="animate">
                            <Card className="glass bg-[#1E293B]/40 border-[#334155] p-6 space-y-6">
                                <div>
                                    <label className="text-white font-bold mb-3 block flex items-center gap-2">
                                        <FontAwesomeIcon icon={faSearch} className="text-[#3168FA]" />
                                        Regular Expression
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8] font-mono">/</span>
                                        <Input
                                            value={regex}
                                            onChange={(e) => setRegex(e.target.value)}
                                            placeholder="[a-z0-9]+"
                                            className={`pl-8 pr-12 h-14 bg-[#020617] border-[#334155] font-mono text-lg focus:ring-[#3168FA] ${error ? 'border-red-500/50' : ''}`}
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] font-mono">/</span>
                                    </div>
                                    {error && (
                                        <p className="mt-2 text-red-400 text-sm flex items-center gap-2">
                                            <FontAwesomeIcon icon={faTriangleExclamation} />
                                            {error}
                                        </p>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-6 pt-2">
                                    {Object.entries(flags).map(([flag, active]) => (
                                        <div key={flag} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`flag-${flag}`}
                                                checked={active}
                                                onCheckedChange={() => toggleFlag(flag as any)}
                                                className="border-[#334155] data-[state=checked]:bg-[#3168FA]"
                                            />
                                            <Label
                                                htmlFor={`flag-${flag}`}
                                                className="text-[#94A3B8] cursor-pointer hover:text-white transition-colors"
                                            >
                                                {flag === 'g' ? 'Global (g)' : flag === 'i' ? 'Case Insensitive (i)' : 'Multiline (m)'}
                                            </Label>
                                        </div>
                                    ))}
                                </div>

                                <div>
                                    <label className="text-white font-bold mb-3 block flex items-center gap-2">
                                        <FontAwesomeIcon icon={faAlignLeft} className="text-[#3168FA]" />
                                        Test String
                                    </label>
                                    <Textarea
                                        value={testString}
                                        onChange={(e) => setTestString(e.target.value)}
                                        placeholder="Paste text here to test against your regex..."
                                        className="bg-[#020617] border-[#334155] min-h-[300px] font-mono text-base leading-relaxed p-4"
                                    />
                                </div>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Results Column */}
                    <div className="space-y-8">
                        <motion.div variants={fadeInUp} initial="initial" animate="animate" transition={{ delay: 0.1 }}>
                            <Card className="glass bg-[#1E293B]/40 border-[#334155] p-6 h-full flex flex-col">
                                <h3 className="text-white font-bold flex items-center gap-2 mb-6">
                                    <FontAwesomeIcon icon={faCheck} className="text-[#3168FA]" />
                                    Matches ({matches.length})
                                </h3>

                                <div className="space-y-3 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
                                    {matches.length === 0 ? (
                                        <div className="text-center py-12 text-[#94A3B8] border-2 border-dashed border-[#334155] rounded-xl">
                                            No matches found
                                        </div>
                                    ) : (
                                        matches.map((match, i) => (
                                            <div key={i} className="bg-[#020617] border border-[#334155] p-3 rounded-lg">
                                                <div className="flex justify-between text-xs text-[#94A3B8] mb-1">
                                                    <span>Match {i + 1}</span>
                                                    <span>Index: {match.index}</span>
                                                </div>
                                                <div className="text-white font-mono break-all">{match.text}</div>
                                                {match.groups.length > 0 && (
                                                    <div className="mt-2 pt-2 border-t border-[#334155]">
                                                        <div className="text-[10px] text-[#3168FA] uppercase font-bold mb-1">Groups</div>
                                                        {match.groups.map((group: string, gi: number) => (
                                                            <div key={gi} className="text-xs text-[#94A3B8] flex gap-2">
                                                                <span className="opacity-50">{gi + 1}:</span>
                                                                <span className="font-mono text-white">{group || 'null'}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
