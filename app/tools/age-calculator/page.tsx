"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Cake, Clock, Hash } from "lucide-react";

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

export default function AgeCalculator() {
    const [birthDate, setBirthDate] = useState("");

    const ageDetails = useMemo(() => {
        if (!birthDate) return null;

        const birth = new Date(birthDate);
        const today = new Date();

        if (birth > today) return "invalid";

        let years = today.getFullYear() - birth.getFullYear();
        let months = today.getMonth() - birth.getMonth();
        let days = today.getDate() - birth.getDate();

        if (days < 0) {
            months--;
            const prevMonthLastDay = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
            days += prevMonthLastDay;
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        // Next Birthday
        const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
        if (nextBirthday < today) {
            nextBirthday.setFullYear(today.getFullYear() + 1);
        }
        const diffTime = Math.abs(nextBirthday.getTime() - today.getTime());
        const daysToBirthday = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return {
            years,
            months,
            days,
            totalDays: Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24)),
            nextBirthdayDays: daysToBirthday
        };
    }, [birthDate]);

    return (
        <div className="min-h-screen bg-[#00020C] pt-10 md:pt-40 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={fadeInUp}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 font-heading">
                        Age <span className="text-[#3168FA]">Calculator</span>
                    </h1>
                    <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto font-heading">
                        Find out exactly how old you are in years, months, and days.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="md:col-span-1"
                    >
                        <Card className="bg-[#020617] border-[#334155] p-8 shadow-2xl h-full">
                            <div className="space-y-4">
                                <Label className="text-[#94A3B8] flex items-center gap-2">
                                    <Calendar size={16} /> Date of Birth
                                </Label>
                                <Input
                                    type="date"
                                    value={birthDate}
                                    onChange={(e) => setBirthDate(e.target.value)}
                                    className="bg-[#0f172a] border-[#334155] text-white h-12"
                                />
                                <Button
                                    className="w-full bg-primary hover:bg-primary/90 rounded-xl h-12 font-bold"
                                    onClick={() => setBirthDate(new Date().toISOString().split('T')[0])}
                                >
                                    Today
                                </Button>
                            </div>

                            <Card className="bg-white/5 border-white/5 p-4 mt-8 rounded-2xl">
                                <p className="text-[10px] font-black uppercase text-white/40 mb-2">Fun Fact</p>
                                <p className="text-xs text-[#94A3B8] leading-relaxed">
                                    You have already spent roughly {ageDetails && ageDetails !== "invalid" ? (ageDetails.years * 31536000 + ageDetails.months * 2592000).toLocaleString() : "..."} seconds in your life!
                                </p>
                            </Card>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-2"
                    >
                        {ageDetails === "invalid" ? (
                            <Card className="bg-red-500/10 border-red-500/20 p-8 h-full flex items-center justify-center">
                                <p className="text-red-500 font-bold">Birth date cannot be in the future!</p>
                            </Card>
                        ) : ageDetails ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                                <Card className="bg-[#020617] border-[#334155] p-8 flex flex-col items-center justify-center text-center">
                                    <p className="text-[10px] font-black uppercase text-[#94A3B8] mb-4">You are</p>
                                    <div className="space-y-2">
                                        <p className="text-6xl font-black text-white">{ageDetails.years}</p>
                                        <p className="text-xs font-black uppercase tracking-widest text-[#3168FA]">Years Old</p>
                                    </div>
                                    <div className="mt-8 flex gap-8">
                                        <div>
                                            <p className="text-2xl font-black text-white">{ageDetails.months}</p>
                                            <p className="text-[8px] font-black uppercase text-[#94A3B8]">Months</p>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-black text-white">{ageDetails.days}</p>
                                            <p className="text-[8px] font-black uppercase text-[#94A3B8]">Days</p>
                                        </div>
                                    </div>
                                </Card>

                                <div className="space-y-4">
                                    <Card className="bg-[#3168FA]/10 border-[#3168FA]/20 p-6 flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-[#3168FA] flex items-center justify-center text-white">
                                            <Cake size={24} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black uppercase text-[#94A3B8]">Next Birthday</p>
                                            <p className="text-xl font-black text-white">{ageDetails.nextBirthdayDays} Days</p>
                                        </div>
                                    </Card>
                                    <Card className="bg-white/5 border-white/10 p-6 flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#94A3B8]">
                                            <Clock size={24} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black uppercase text-[#94A3B8]">Total Days Alive</p>
                                            <p className="text-xl font-black text-white">{ageDetails.totalDays.toLocaleString()}</p>
                                        </div>
                                    </Card>
                                    <Card className="bg-white/5 border-white/10 p-6 flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#94A3B8]">
                                            <Hash size={24} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black uppercase text-[#94A3B8]">Total Weeks</p>
                                            <p className="text-xl font-black text-white">{Math.floor(ageDetails.totalDays / 7).toLocaleString()}</p>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        ) : (
                            <Card className="bg-[#020617] border-[#334155] p-8 h-full flex flex-col items-center justify-center border-dashed">
                                <Calendar size={48} className="text-[#334155] mb-4" />
                                <p className="text-[#94A3B8]">Select your birth date to see results</p>
                            </Card>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
