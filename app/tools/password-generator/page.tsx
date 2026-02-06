"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, RefreshCw, ShieldCheck, ShieldAlert, Shield } from "lucide-react";

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

export default function PasswordGenerator() {
    const [password, setPassword] = useState("");
    const [length, setLength] = useState(16);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [copied, setCopied] = useState(false);

    const generatePassword = useCallback(() => {
        const lowercase = "abcdefghijklmnopqrstuvwxyz";
        const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numbers = "0123456789";
        const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

        let charset = lowercase;
        if (includeUppercase) charset += uppercase;
        if (includeNumbers) charset += numbers;
        if (includeSymbols) charset += symbols;

        let generatedPassword = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            generatedPassword += charset[randomIndex];
        }
        setPassword(generatedPassword);
    }, [length, includeUppercase, includeNumbers, includeSymbols]);

    useEffect(() => {
        generatePassword();
    }, [generatePassword]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getStrength = () => {
        let score = 0;
        if (length > 12) score++;
        if (length > 20) score++;
        if (includeUppercase) score++;
        if (includeNumbers) score++;
        if (includeSymbols) score++;

        if (score < 3) return { label: "Weak", color: "text-red-500", icon: ShieldAlert };
        if (score < 5) return { label: "Medium", color: "text-yellow-500", icon: Shield };
        return { label: "Strong", color: "text-green-500", icon: ShieldCheck };
    };

    const strength = getStrength();
    const StrengthIcon = strength.icon;

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
                        Password <span className="text-[#3168FA]">Generator</span>
                    </h1>
                    <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto font-heading">
                        Generate secure, random passwords instantly to keep your accounts safe.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card className="bg-[#020617] border-[#334155] p-8 md:p-12 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4">
                            <Badge variant="outline" className={`${strength.color} border-current py-1 px-3 flex gap-2 items-center`}>
                                <StrengthIcon size={14} />
                                {strength.label}
                            </Badge>
                        </div>

                        <div className="space-y-8">
                            {/* Result Area */}
                            <div className="relative">
                                <Input
                                    readOnly
                                    value={password}
                                    className="h-20 bg-[#00020C] border-[#334155] text-2xl md:text-3xl font-mono text-white text-center pr-24 rounded-2xl focus:ring-[#3168FA]"
                                />
                                <div className="absolute right-2 top-2 bottom-2 flex gap-2">
                                    <Button
                                        onClick={generatePassword}
                                        variant="ghost"
                                        className="h-full px-4 text-[#94A3B8] hover:text-white"
                                    >
                                        <RefreshCw size={24} />
                                    </Button>
                                    <Button
                                        onClick={copyToClipboard}
                                        className="h-full px-6 bg-[#3168FA] hover:bg-[#3168FA]/90 text-white rounded-xl"
                                    >
                                        {copied ? "Copied!" : <Copy size={24} />}
                                    </Button>
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-sm font-bold text-[#94A3B8] uppercase tracking-widest font-heading">
                                            Password Length: {length}
                                        </label>
                                    </div>
                                    <input
                                        type="range"
                                        min="8"
                                        max="64"
                                        value={length}
                                        onChange={(e) => setLength(parseInt(e.target.value))}
                                        className="w-full h-2 bg-[#334155] rounded-lg appearance-none cursor-pointer accent-[#3168FA]"
                                    />
                                    <div className="flex justify-between text-xs text-[#94A3B8] font-mono">
                                        <span>8</span>
                                        <span>32</span>
                                        <span>64</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-sm font-bold text-[#94A3B8] uppercase tracking-widest block mb-4 font-heading">
                                        Include Characters
                                    </label>
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { label: "Uppercase", state: includeUppercase, setter: setIncludeUppercase },
                                            { label: "Numbers", state: includeNumbers, setter: setIncludeNumbers },
                                            { label: "Symbols", state: includeSymbols, setter: setIncludeSymbols },
                                        ].map((opt) => (
                                            <label
                                                key={opt.label}
                                                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${opt.state
                                                        ? "border-[#3168FA] bg-[#3168FA]/10 text-white"
                                                        : "border-[#334155] bg-transparent text-[#94A3B8] hover:border-[#475569]"
                                                    }`}
                                            >
                                                <span className="font-bold text-sm font-heading">{opt.label}</span>
                                                <input
                                                    type="checkbox"
                                                    checked={opt.state}
                                                    onChange={(e) => opt.setter(e.target.checked)}
                                                    className="hidden"
                                                />
                                                <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${opt.state ? "bg-[#3168FA] border-[#3168FA]" : "border-[#334155]"
                                                    }`}>
                                                    {opt.state && <div className="w-2 h-2 bg-white rounded-full" />}
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 p-6 bg-[#00020C] rounded-2xl border border-[#334155]/50">
                            <h3 className="text-white font-bold mb-2 flex items-center gap-2 font-heading">
                                <ShieldCheck className="text-[#3168FA]" size={20} />
                                Security Tip
                            </h3>
                            <p className="text-[#94A3B8] text-sm font-heading">
                                Use long passwords (16+ characters) with a mix of letters, numbers, and symbols for maximum security. Never reuse passwords across different platforms.
                            </p>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
