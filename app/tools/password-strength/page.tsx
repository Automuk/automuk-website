"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function PasswordStrength() {
    const [pwd, setPwd] = useState("");
    const [show, setShow] = useState(false);

    const checkStrength = (p: string) => {
        let score = 0;
        if (p.length > 8) score++;
        if (/[A-Z]/.test(p)) score++;
        if (/[0-9]/.test(p)) score++;
        if (/[^A-Za-z0-9]/.test(p)) score++;
        return score;
    };

    const strength = checkStrength(pwd);

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-lg bg-white/[0.03] border border-white/10 rounded-[3rem] p-10 space-y-10"
            >
                <div className="text-center space-y-2">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                        <Shield size={32} />
                    </div>
                    <h1 className="text-3xl font-black text-white">Password Strength</h1>
                    <p className="text-[#94A3B8]">Analyze the security of your password.</p>
                </div>

                <div className="space-y-6">
                    <div className="relative group">
                        <Input
                            type={show ? "text" : "password"}
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                            placeholder="Type your password..."
                            className="h-16 bg-white/5 border-white/10 rounded-2xl pl-6 pr-14 text-white text-xl focus:border-primary/50 tracking-widest"
                        />
                        <button
                            onClick={() => setShow(!show)}
                            className="absolute right-5 top-1/2 -translate-y-1/2 text-[#475569] hover:text-white transition-colors"
                        >
                            {show ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-[#475569]">
                            <span>Security Level</span>
                            <span className={strength > 2 ? "text-green-500" : strength > 1 ? "text-yellow-500" : "text-red-500"}>
                                {["Weak", "Fair", "Good", "Strong", "Extreme"][strength]}
                            </span>
                        </div>
                        <div className="grid grid-cols-4 gap-2 h-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className={`rounded-full transition-all duration-500 ${strength >= i
                                        ? strength > 2 ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]" : "bg-yellow-500"
                                        : "bg-white/5"
                                    }`} />
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
