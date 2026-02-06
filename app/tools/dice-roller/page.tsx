"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dices, RefreshCw, Hash } from "lucide-react";

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

const DICE_TYPES = [
    { label: "D4", sides: 4 },
    { label: "D6", sides: 6 },
    { label: "D8", sides: 8 },
    { label: "D10", sides: 10 },
    { label: "D12", sides: 12 },
    { label: "D20", sides: 20 },
];

export default function DiceRoller() {
    const [selectedDice, setSelectedDice] = useState(6);
    const [result, setResult] = useState<number | null>(null);
    const [isRolling, setIsRolling] = useState(false);
    const [history, setHistory] = useState<{ sides: number, value: number, time: string }[]>([]);

    const rollDice = () => {
        setIsRolling(true);
        setResult(null);

        // Simulate "rolling" animation
        setTimeout(() => {
            const val = Math.floor(Math.random() * selectedDice) + 1;
            setResult(val);
            setIsRolling(false);
            setHistory(prev => [{
                sides: selectedDice,
                value: val,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
            }, ...prev].slice(0, 5));
        }, 600);
    };

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
                        Dice <span className="text-[#3168FA]">Roller</span>
                    </h1>
                    <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto font-heading">
                        A quick and fair virtual dice for games, decisions, or tabletop RPGs.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <Card className="bg-[#020617] border-[#334155] p-8 h-full shadow-2xl flex flex-col gap-6">
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8]">Pick your dice</p>
                            <div className="grid grid-cols-2 gap-3">
                                {DICE_TYPES.map((dice) => (
                                    <Button
                                        key={dice.sides}
                                        variant={selectedDice === dice.sides ? "default" : "outline"}
                                        onClick={() => setSelectedDice(dice.sides)}
                                        className={`h-16 rounded-2xl flex flex-col gap-1 transition-all ${selectedDice === dice.sides
                                                ? "bg-primary text-white scale-105 shadow-xl shadow-primary/20"
                                                : "bg-transparent border-[#334155] text-[#94A3B8] hover:border-primary hover:text-white"
                                            }`}
                                    >
                                        <Hash size={14} className="opacity-40" />
                                        <span className="font-black">{dice.label}</span>
                                    </Button>
                                ))}
                            </div>
                            <Button
                                className="w-full bg-primary hover:bg-primary/90 rounded-2xl h-14 mt-auto font-black uppercase tracking-widest text-xs gap-2"
                                onClick={rollDice}
                                disabled={isRolling}
                            >
                                <RefreshCw className={isRolling ? "animate-spin" : ""} size={16} />
                                Roll Dice
                            </Button>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="md:col-span-2"
                    >
                        <Card className="bg-[#020617] border-[#334155] p-12 h-full shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
                            {/* Decorative Background */}
                            <div className="absolute inset-0 opacity-5 pointer-events-none">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-primary via-transparent to-secondary blur-3xl rounded-full" />
                            </div>

                            <AnimatePresence mode="wait">
                                {isRolling ? (
                                    <motion.div
                                        key="rolling"
                                        initial={{ rotate: 0, scale: 0.8 }}
                                        animate={{ rotate: 360, scale: 1.1 }}
                                        exit={{ scale: 0.5, opacity: 0 }}
                                        className="w-48 h-48 border-4 border-dashed border-primary/20 rounded-full flex items-center justify-center"
                                    >
                                        <Dices size={80} className="text-primary animate-pulse" />
                                    </motion.div>
                                ) : result ? (
                                    <motion.div
                                        key="result"
                                        initial={{ y: 20, opacity: 0, scale: 0.5 }}
                                        animate={{ y: 0, opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center"
                                    >
                                        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#94A3B8] mb-8">You Rolled</div>
                                        <div className="text-[12rem] font-black leading-none text-white drop-shadow-[0_0_50px_rgba(49,104,250,0.3)]">
                                            {result}
                                        </div>
                                        <p className="text-[#3168FA] font-black uppercase tracking-widest mt-8 flex items-center gap-2">
                                            <Hash size={16} /> Result on D{selectedDice}
                                        </p>
                                    </motion.div>
                                ) : (
                                    <div className="flex flex-col items-center opacity-20">
                                        <Dices size={100} className="text-white mb-4" />
                                        <p className="text-white font-black uppercase tracking-widest">Ready to Roll</p>
                                    </div>
                                )}
                            </AnimatePresence>

                            {/* History Overlay */}
                            <div className="absolute bottom-8 right-8 left-8 flex justify-end gap-2 overflow-x-auto scrollbar-hide">
                                {history.map((h, i) => (
                                    <div key={i} className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-full flex items-center gap-2 shrink-0">
                                        <span className="text-[10px] font-black text-[#94A3B8]">D{h.sides}</span>
                                        <span className="text-xs font-black text-white">{h.value}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
