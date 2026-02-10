"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign, Percent, Users, Receipt } from "lucide-react";

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

export default function TipCalculator() {
    const [bill, setBill] = useState("");
    const [tipPercentage, setTipPercentage] = useState("15");
    const [people, setPeople] = useState("1");

    const totals = useMemo(() => {
        const b = parseFloat(bill);
        const t = parseFloat(tipPercentage);
        const p = parseInt(people);

        if (isNaN(b) || isNaN(t) || isNaN(p) || p <= 0) return null;

        const tipAmount = (b * t) / 100;
        const total = b + tipAmount;
        const perPerson = total / p;
        const tipPerPerson = tipAmount / p;

        return {
            tipAmount: tipAmount.toFixed(2),
            total: total.toFixed(2),
            perPerson: perPerson.toFixed(2),
            tipPerPerson: tipPerPerson.toFixed(2)
        };
    }, [bill, tipPercentage, people]);

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
                        Tip <span className="text-[#3168FA]">Calculator</span>
                    </h1>
                    <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto font-heading">
                        Easily calculate tips and split bills with your friends.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <Card className="bg-[#020617] border-[#334155] p-8 shadow-2xl h-full space-y-8">
                            <div className="space-y-2">
                                <Label className="text-[#94A3B8] flex items-center gap-2">
                                    <DollarSign size={16} /> Bill Amount
                                </Label>
                                <Input
                                    type="number"
                                    placeholder="0.00"
                                    value={bill}
                                    onChange={(e) => setBill(e.target.value)}
                                    className="bg-[#0f172a] border-[#334155] text-white h-12 text-lg font-bold"
                                />
                            </div>

                            <div className="space-y-4">
                                <Label className="text-[#94A3B8] flex items-center gap-2">
                                    <Percent size={16} /> Tip Percentage
                                </Label>
                                <div className="grid grid-cols-3 gap-2">
                                    {["10", "15", "18", "20", "25"].map((perc) => (
                                        <Button
                                            key={perc}
                                            variant={tipPercentage === perc ? "default" : "outline"}
                                            onClick={() => setTipPercentage(perc)}
                                            className="rounded-xl h-10"
                                        >
                                            {perc}%
                                        </Button>
                                    ))}
                                    <Input
                                        type="number"
                                        placeholder="Custom"
                                        value={tipPercentage}
                                        onChange={(e) => setTipPercentage(e.target.value)}
                                        className="bg-[#0f172a] border-[#334155] text-white h-10 text-center"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[#94A3B8] flex items-center gap-2">
                                    <Users size={16} /> Number of People
                                </Label>
                                <Input
                                    type="number"
                                    min="1"
                                    value={people}
                                    onChange={(e) => setPeople(e.target.value)}
                                    className="bg-[#0f172a] border-[#334155] text-white h-12 text-lg font-bold"
                                />
                            </div>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <Card className="bg-[#3168FA] text-white p-8 shadow-2xl h-full flex flex-col justify-between rounded-3xl overflow-hidden relative group">
                            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-500">
                                <Receipt size={120} />
                            </div>

                            <div className="relative z-10 space-y-8">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-white/60 text-xs font-black uppercase tracking-widest">Tip Amount</p>
                                        <p className="text-white/40 text-[10px]">/ person</p>
                                    </div>
                                    <p className="text-4xl font-black">${totals?.tipPerPerson || "0.00"}</p>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-white/60 text-xs font-black uppercase tracking-widest">Total</p>
                                        <p className="text-white/40 text-[10px]">/ person</p>
                                    </div>
                                    <p className="text-5xl font-black">${totals?.perPerson || "0.00"}</p>
                                </div>
                            </div>

                            <div className="relative z-10 pt-8 mt-8 border-t border-white/10 space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-white/60">Total Bill</span>
                                    <span className="font-bold">${bill || "0.00"}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-white/60">Total Tip</span>
                                    <span className="font-bold">${totals?.tipAmount || "0.00"}</span>
                                </div>
                                <Button
                                    className="w-full bg-white text-[#3168FA] hover:bg-white/90 font-black uppercase tracking-widest text-xs h-12 rounded-xl mt-4"
                                    onClick={() => {
                                        setBill("");
                                        setTipPercentage("15");
                                        setPeople("1");
                                    }}
                                >
                                    Reset
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
