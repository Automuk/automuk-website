"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Scale, Ruler, Activity, Info } from "lucide-react";

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

type UnitSystem = "metric" | "imperial";

export default function BMICalculator() {
    const [unit, setUnit] = useState<UnitSystem>("metric");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [heightInches, setHeightInches] = useState("");

    const bmiResult = useMemo(() => {
        const w = parseFloat(weight);
        const h = parseFloat(height);
        const hi = parseFloat(heightInches || "0");

        if (isNaN(w) || isNaN(h)) return null;

        let bmi: number;
        if (unit === "metric") {
            // weight in kg, height in cm
            const hMeters = h / 100;
            bmi = w / (hMeters * hMeters);
        } else {
            // weight in lbs, height in feet + inches
            const totalInches = (h * 12) + hi;
            bmi = (w / (totalInches * totalInches)) * 703;
        }

        let category = "";
        let color = "";
        if (bmi < 18.5) {
            category = "Underweight";
            color = "#3168FA"; // Blue
        } else if (bmi < 25) {
            category = "Healthy Weight";
            color = "#10B981"; // Green
        } else if (bmi < 30) {
            category = "Overweight";
            color = "#F59E0B"; // Amber
        } else {
            category = "Obese";
            color = "#EF4444"; // Red
        }

        return {
            value: bmi.toFixed(1),
            category,
            color
        };
    }, [weight, height, heightInches, unit]);

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
                        BMI <span className="text-[#3168FA]">Calculator</span>
                    </h1>
                    <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto font-heading">
                        Check your Body Mass Index (BMI) easily with our free health tool.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <Card className="bg-[#020617] border-[#334155] p-8 shadow-2xl h-full">
                            <div className="flex gap-4 mb-8">
                                <Button
                                    variant={unit === "metric" ? "default" : "outline"}
                                    onClick={() => setUnit("metric")}
                                    className="flex-1 rounded-xl h-12"
                                >
                                    Metric (kg/cm)
                                </Button>
                                <Button
                                    variant={unit === "imperial" ? "default" : "outline"}
                                    onClick={() => setUnit("imperial")}
                                    className="flex-1 rounded-xl h-12"
                                >
                                    Imperial (lb/ft)
                                </Button>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-[#94A3B8] flex items-center gap-2">
                                        <Scale size={16} /> Weight ({unit === "metric" ? "kg" : "lb"})
                                    </Label>
                                    <Input
                                        type="number"
                                        placeholder={`Enter ${unit === "metric" ? "kg" : "lb"}`}
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
                                        className="bg-[#0f172a] border-[#334155] text-white h-12"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[#94A3B8] flex items-center gap-2">
                                        <Ruler size={16} /> Height ({unit === "metric" ? "cm" : "ft"})
                                    </Label>
                                    <div className="flex gap-4">
                                        <Input
                                            type="number"
                                            placeholder={unit === "metric" ? "cm" : "ft"}
                                            value={height}
                                            onChange={(e) => setHeight(e.target.value)}
                                            className="bg-[#0f172a] border-[#334155] text-white h-12 flex-1"
                                        />
                                        {unit === "imperial" && (
                                            <Input
                                                type="number"
                                                placeholder="in"
                                                value={heightInches}
                                                onChange={(e) => setHeightInches(e.target.value)}
                                                className="bg-[#0f172a] border-[#334155] text-white h-12 w-24"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col gap-4"
                    >
                        <Card className="bg-[#020617] border-[#334155] p-8 shadow-2xl flex-1 flex flex-col items-center justify-center text-center">
                            {bmiResult ? (
                                <>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#94A3B8] mb-4">Your BMI Result</p>
                                    <motion.div
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        key={bmiResult.value}
                                        className="text-7xl font-black mb-4"
                                        style={{ color: bmiResult.color }}
                                    >
                                        {bmiResult.value}
                                    </motion.div>
                                    <div
                                        className="px-6 py-2 rounded-full font-black uppercase tracking-widest text-xs mb-8"
                                        style={{ backgroundColor: `${bmiResult.color}15`, color: bmiResult.color, border: `1px solid ${bmiResult.color}30` }}
                                    >
                                        {bmiResult.category}
                                    </div>
                                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden flex">
                                        <div className="h-full bg-blue-500" style={{ width: '18.5%' }} />
                                        <div className="h-full bg-green-500" style={{ width: '25%' }} />
                                        <div className="h-full bg-amber-500" style={{ width: '25%' }} />
                                        <div className="h-full bg-red-500" style={{ width: '31.5%' }} />
                                    </div>
                                    <div className="flex justify-between w-full text-[8px] font-bold text-[#94A3B8] mt-2 uppercase tracking-tighter">
                                        <span>15</span>
                                        <span>18.5</span>
                                        <span>25</span>
                                        <span>30</span>
                                        <span>40</span>
                                    </div>
                                </>
                            ) : (
                                <div className="text-[#334155] flex flex-col items-center">
                                    <Activity size={64} className="mb-4 opacity-20" />
                                    <p className="text-lg font-medium">Enter your details to calculate BMI</p>
                                </div>
                            )}
                        </Card>

                        <Card className="bg-primary/5 border-primary/20 p-6">
                            <div className="flex items-center gap-3 mb-2 text-primary font-bold">
                                <Info size={18} />
                                <p>Note</p>
                            </div>
                            <p className="text-[#94A3B8] text-sm leading-relaxed">
                                BMI is a screening tool, not a diagnosis. For a complete assessment, consult a healthcare professional.
                            </p>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
