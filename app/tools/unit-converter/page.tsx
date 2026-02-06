"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Scale, Ruler, Thermometer } from "lucide-react";

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

type UnitType = "length" | "weight" | "temperature";

const UNITS: Record<UnitType, { label: string; factor: number; base: string }[]> = {
    length: [
        { label: "Millimeters (mm)", factor: 0.001, base: "m" },
        { label: "Centimeters (cm)", factor: 0.01, base: "m" },
        { label: "Meters (m)", factor: 1, base: "m" },
        { label: "Kilometers (km)", factor: 1000, base: "m" },
        { label: "Inches (in)", factor: 0.0254, base: "m" },
        { label: "Feet (ft)", factor: 0.3048, base: "m" },
        { label: "Yards (yd)", factor: 0.9144, base: "m" },
        { label: "Miles (mi)", factor: 1609.34, base: "m" },
    ],
    weight: [
        { label: "Milligrams (mg)", factor: 0.000001, base: "kg" },
        { label: "Grams (g)", factor: 0.001, base: "kg" },
        { label: "Kilograms (kg)", factor: 1, base: "kg" },
        { label: "Ounces (oz)", factor: 0.0283495, base: "kg" },
        { label: "Pounds (lb)", factor: 0.453592, base: "kg" },
    ],
    temperature: [
        { label: "Celsius (°C)", factor: 1, base: "C" },
        { label: "Fahrenheit (°F)", factor: 1, base: "C" },
        { label: "Kelvin (K)", factor: 1, base: "C" },
    ]
};

export default function UnitConverter() {
    const [type, setType] = useState<UnitType>("length");
    const [fromUnit, setFromUnit] = useState("");
    const [toUnit, setToUnit] = useState("");
    const [fromValue, setFromValue] = useState("1");
    const [toValue, setToValue] = useState("");

    useEffect(() => {
        setFromUnit(UNITS[type][0].label);
        setToUnit(UNITS[type][1].label);
    }, [type]);

    useEffect(() => {
        convert();
    }, [fromValue, fromUnit, toUnit, type]);

    const convert = () => {
        if (!fromValue || isNaN(parseFloat(fromValue))) {
            setToValue("");
            return;
        }

        const fValue = parseFloat(fromValue);
        const from = UNITS[type].find(u => u.label === fromUnit);
        const to = UNITS[type].find(u => u.label === toUnit);

        if (!from || !to) return;

        let result: number;

        if (type === "temperature") {
            // Special handling for temperature
            let celsius: number;
            if (fromUnit.includes("Celsius")) celsius = fValue;
            else if (fromUnit.includes("Fahrenheit")) celsius = (fValue - 32) * 5 / 9;
            else celsius = fValue - 273.15;

            if (toUnit.includes("Celsius")) result = celsius;
            else if (toUnit.includes("Fahrenheit")) result = (celsius * 9 / 5) + 32;
            else result = celsius + 273.15;
        } else {
            // Regular conversion via base unit
            const baseValue = fValue * from.factor;
            result = baseValue / to.factor;
        }

        setToValue(result.toLocaleString(undefined, { maximumFractionDigits: 6 }));
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
                        Unit <span className="text-[#3168FA]">Converter</span>
                    </h1>
                    <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto font-heading">
                        Convert between common units of length, weight, and temperature instantly.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Card className="bg-[#020617] border-[#334155] p-8 shadow-2xl">
                            {/* Type Selector */}
                            <div className="flex gap-4 mb-12 justify-center">
                                {[
                                    { id: "length", icon: Ruler, label: "Length" },
                                    { id: "weight", icon: Scale, label: "Weight" },
                                    { id: "temperature", icon: Thermometer, label: "Temp" },
                                ].map((t) => (
                                    <Button
                                        key={t.id}
                                        variant={type === t.id ? "default" : "outline"}
                                        onClick={() => setType(t.id as UnitType)}
                                        className={`h-16 px-6 rounded-2xl flex flex-col gap-1 transition-all ${type === t.id
                                            ? "bg-primary text-white scale-105 shadow-lg shadow-primary/20"
                                            : "bg-transparent border-[#334155] text-[#94A3B8] hover:border-primary hover:text-white"
                                            }`}
                                    >
                                        <t.icon size={20} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">{t.label}</span>
                                    </Button>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative">
                                {/* From */}
                                <div className="space-y-4">
                                    <Label className="text-xs font-black text-[#94A3B8] uppercase tracking-widest">From</Label>
                                    <div className="space-y-2">
                                        <Input
                                            type="number"
                                            value={fromValue}
                                            onChange={(e) => setFromValue(e.target.value)}
                                            className="h-14 bg-[#0f172a] border-[#334155] text-white text-xl font-bold rounded-xl"
                                        />
                                        <Select value={fromUnit} onValueChange={setFromUnit}>
                                            <SelectTrigger className="h-12 bg-[#0f172a] border-[#334155] text-white rounded-xl">
                                                <SelectValue placeholder="Select unit" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#0f172a] border-[#334155] text-white">
                                                {UNITS[type].map(u => (
                                                    <SelectItem key={u.label} value={u.label}>{u.label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Divider Arrow */}
                                <div className="hidden md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:translate-y-[-2px] md:flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 border border-primary/20 text-primary z-10">
                                    <Ruler size={16} className="rotate-90" />
                                </div>

                                {/* To */}
                                <div className="space-y-4">
                                    <Label className="text-xs font-black text-[#94A3B8] uppercase tracking-widest">To</Label>
                                    <div className="space-y-2">
                                        <Input
                                            readOnly
                                            value={toValue}
                                            className="h-14 bg-[#0f172a] border-[#334155] text-primary text-xl font-bold rounded-xl cursor-default"
                                        />
                                        <Select value={toUnit} onValueChange={setToUnit}>
                                            <SelectTrigger className="h-12 bg-[#0f172a] border-[#334155] text-white rounded-xl">
                                                <SelectValue placeholder="Select unit" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#0f172a] border-[#334155] text-white">
                                                {UNITS[type].map(u => (
                                                    <SelectItem key={u.label} value={u.label}>{u.label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    <Card className="bg-[#3168FA]/5 border-[#3168FA]/20 p-6">
                        <p className="text-[#3168FA] font-bold mb-2">Pro Tip</p>
                        <p className="text-[#94A3B8] text-sm leading-relaxed">
                            Need specific accuracy? Most units are calculated to 6 decimal places for high precision.
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    );
}
