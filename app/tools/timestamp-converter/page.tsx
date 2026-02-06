"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, Calendar, Globe, RefreshCcw } from "lucide-react";

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

export default function TimestampConverter() {
    const [unix, setUnix] = useState("");
    const [dateString, setDateString] = useState("");
    const [now, setNow] = useState(Math.floor(Date.now() / 1000));

    // Update "Now" every second
    useEffect(() => {
        const timer = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
        return () => clearInterval(timer);
    }, []);

    // Initial state
    useEffect(() => {
        const current = Math.floor(Date.now() / 1000).toString();
        setUnix(current);
        handleUnixChange(current);
    }, []);

    const handleUnixChange = (value: string) => {
        setUnix(value);
        if (!value || isNaN(parseInt(value))) {
            setDateString("");
            return;
        }
        try {
            const date = new Date(parseInt(value) * 1000);
            if (isNaN(date.getTime())) {
                setDateString("Invalid Date");
            } else {
                setDateString(date.toISOString().replace('T', ' ').replace(/\..+/, ''));
            }
        } catch (e) {
            setDateString("Error");
        }
    };

    const handleDateChange = (value: string) => {
        setDateString(value);
        try {
            const date = new Date(value);
            if (isNaN(date.getTime())) {
                setUnix("");
            } else {
                setUnix(Math.floor(date.getTime() / 1000).toString());
            }
        } catch (e) {
            setUnix("");
        }
    };

    const setToNow = () => {
        const current = Math.floor(Date.now() / 1000).toString();
        setUnix(current);
        handleUnixChange(current);
    };

    const formatDate = (date: Date, tz: "UTC" | "Local") => {
        return new Intl.DateTimeFormat('en-US', {
            dateStyle: 'full',
            timeStyle: 'medium',
            timeZone: tz === "UTC" ? "UTC" : undefined
        }).format(date);
    };

    const currentDate = new Date(parseInt(unix || "0") * 1000);
    const isValid = !isNaN(currentDate.getTime());

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
                        Timestamp <span className="text-[#3168FA]">Converter</span>
                    </h1>
                    <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto font-heading">
                        Fast and reliable Unix epoch timestamp conversion. Supports UTC and your local timezone.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Card className="bg-[#020617] border-[#334155] p-8 shadow-2xl">
                            {/* Dashboard Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                                <div className="p-6 bg-[#0f172a] border border-[#334155] rounded-2xl flex items-center justify-between group hover:border-[#3168FA] transition-all">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#94A3B8] mb-1">Current Unix Time</p>
                                        <p className="text-2xl font-black text-white font-mono">{now}</p>
                                    </div>
                                    <Button size="icon" variant="ghost" className="text-primary" onClick={setToNow}>
                                        <RefreshCcw size={18} />
                                    </Button>
                                </div>
                                <div className="p-6 bg-[#0f172a] border border-[#334155] rounded-2xl flex items-center group hover:border-[#3168FA] transition-all">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                                        <Globe size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#94A3B8] mb-1">Your Timezone</p>
                                        <p className="text-sm font-bold text-white truncate max-w-[200px]">
                                            {Intl.DateTimeFormat().resolvedOptions().timeZone}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                {/* Unix Input */}
                                <div className="space-y-4">
                                    <Label className="text-xs font-black text-[#94A3B8] uppercase tracking-widest flex items-center gap-2">
                                        <Clock size={14} className="text-primary" /> Unix Timestamp
                                    </Label>
                                    <Input
                                        value={unix}
                                        onChange={(e) => handleUnixChange(e.target.value)}
                                        placeholder="Enter Unix timestamp (seconds)..."
                                        className="h-14 bg-[#0f172a] border-[#334155] text-white text-xl font-bold rounded-xl font-mono"
                                    />
                                </div>

                                {/* Results */}
                                {isValid && (
                                    <div className="grid grid-cols-1 gap-4 pt-4 border-t border-white/5">
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-black uppercase text-[#94A3B8]">Relative</p>
                                            <p className="text-lg text-[#3168FA] font-bold">
                                                {new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
                                                    Math.floor((currentDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
                                                    'day'
                                                )}
                                            </p>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                                <p className="text-[10px] font-black uppercase text-[#94A3B8] mb-2 flex items-center gap-2">
                                                    <Globe size={12} /> GMT / UTC Time
                                                </p>
                                                <p className="text-white font-medium">{formatDate(currentDate, "UTC")}</p>
                                            </div>
                                            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                                <p className="text-[10px] font-black uppercase text-[#94A3B8] mb-2 flex items-center gap-2">
                                                    <Calendar size={12} /> Local Time
                                                </p>
                                                <p className="text-white font-medium">{formatDate(currentDate, "Local")}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </motion.div>

                    <Card className="bg-[#3168FA]/5 border-[#3168FA]/20 p-6">
                        <p className="text-[#3168FA] font-bold mb-2">Technical Note</p>
                        <p className="text-[#94A3B8] text-sm leading-relaxed">
                            Unix time (also known as Epoch time) is the number of seconds that have elapsed since January 1, 1970 (midnight UTC/GMT).
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    );
}
