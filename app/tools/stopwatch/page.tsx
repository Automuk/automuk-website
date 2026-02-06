"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Timer, Play, Pause, RotateCcw, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Stopwatch() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState<number[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isRunning) {
            timerRef.current = setInterval(() => {
                setTime(prev => prev + 10);
            }, 10);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [isRunning]);

    const formatTime = (ms: number) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const centiseconds = Math.floor((ms % 1000) / 10);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
    };

    const reset = () => {
        setIsRunning(false);
        setTime(0);
        setLaps([]);
    };

    const addLap = () => {
        setLaps(prev => [time, ...prev]);
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-xl space-y-12">
                <div className="text-center space-y-8">
                    <motion.div
                        animate={isRunning ? { scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary mx-auto relative shadow-[0_0_50px_rgba(49,104,250,0.2)]"
                    >
                        <Timer size={48} />
                    </motion.div>
                    <div className="text-[6rem] md:text-[8rem] font-black font-mono text-white tracking-widest tabular-nums leading-none">
                        {formatTime(time)}
                    </div>
                </div>

                <div className="flex gap-4">
                    <Button
                        onClick={() => setIsRunning(!isRunning)}
                        className={`flex-1 h-20 rounded-3xl text-xl font-black uppercase tracking-widest shadow-xl transition-all ${isRunning ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary/90"
                            }`}
                    >
                        {isRunning ? <><Pause className="mr-3" /> Stop</> : <><Play className="mr-3" /> Start</>}
                    </Button>
                    {time > 0 && (
                        <>
                            <Button onClick={addLap} variant="outline" className="h-20 w-20 rounded-3xl border-white/10 bg-white/5 hover:bg-white/10">
                                <Clock size={24} />
                            </Button>
                            <Button onClick={reset} variant="outline" className="h-20 w-20 rounded-3xl border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-500">
                                <RotateCcw size={24} />
                            </Button>
                        </>
                    )}
                </div>

                {laps.length > 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 max-h-64 overflow-y-auto pr-2 no-scrollbar">
                        {laps.map((lap, i) => (
                            <div key={i} className="flex justify-between items-center p-4 bg-white/5 border border-white/5 rounded-2xl">
                                <span className="text-[#475569] font-black uppercase tracking-widest text-[10px]">Lap {laps.length - i}</span>
                                <span className="text-white font-mono text-lg tabular-nums">{formatTime(lap)}</span>
                            </div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
