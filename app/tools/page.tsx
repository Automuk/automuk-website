"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { tools, Tool } from "@/lib/tools-data";

export default function ToolsIndex() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState<string>("All");

    const categories = ["All", "Developer", "Converter", "Lifestyle", "Math"];

    const filteredTools = useMemo(() => {
        return tools.filter((tool) => {
            const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tool.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === "All" || tool.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, activeCategory]);
    return (
        <div className="min-h-screen pt-32 pb-20 px-4 md:px-8">
            {/* Hero Section */}
            <div className="w-full mb-16 space-y-8">
                <div className="space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-black font-heading tracking-tighter text-white"
                    >
                        Free <span className="text-primary italic">Tools</span> for Everyone
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-[#94A3B8] text-xl max-w-3xl font-medium"
                    >
                        Powerful, light-weight utilities designed for developers, creators, and everyday productivity. 30 professional tools at your fingertips.
                    </motion.p>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col xl:flex-row gap-4 items-center justify-between p-2 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-xl">
                    <div className="relative w-full xl:w-96">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#475569]" />
                        <Input
                            type="text"
                            placeholder="Search 30 professional tools..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-16 h-16 bg-transparent border-none text-white placeholder:text-[#475569] focus-visible:ring-0 rounded-2xl text-xl"
                        />
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto w-full xl:w-auto pb-2 xl:pb-0 px-2 no-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-8 py-3.5 rounded-2xl text-sm font-bold transition-all whitespace-nowrap ${activeCategory === cat
                                    ? "bg-primary text-white shadow-[0_0_30px_rgba(49,104,250,0.5)] scale-105"
                                    : "text-[#94A3B8] hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tools Grid */}
            <div className="w-full">
                <AnimatePresence mode="popLayout">
                    {filteredTools.length > 0 ? (
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-6 items-start"
                        >
                            {filteredTools.map((tool, idx) => (
                                <motion.div
                                    layout
                                    key={tool.name}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2, delay: idx * 0.05 }}
                                >
                                    <Link
                                        href={tool.href}
                                        className="group relative flex flex-col h-full p-6 md:p-8 bg-white/[0.03] border border-white/10 rounded-[2rem] hover:bg-white/[0.07] hover:border-primary/50 transition-all duration-300 overflow-hidden outline-none"
                                    >
                                        {/* Shadow Decor */}
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity" />

                                        <div className="w-14 h-14 md:w-16 md:h-16 mb-6 rounded-2xl bg-white/5 flex items-center justify-center text-[#94A3B8] group-hover:bg-primary group-hover:text-white group-hover:shadow-[0_0_30px_rgba(49,104,250,0.5)] transition-all duration-300 shrink-0">
                                            <tool.icon size={28} />
                                        </div>

                                        <div className="flex-1 flex flex-col space-y-2">
                                            <div className="flex items-center justify-between gap-2">
                                                <h2 className="text-lg md:text-xl font-bold text-white group-hover:text-primary transition-colors">
                                                    {tool.name}
                                                </h2>
                                                <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-[#475569] group-hover:text-primary/70 transition-colors shrink-0">
                                                    {tool.category}
                                                </span>
                                            </div>
                                            <p className="text-[#94A3B8] text-sm font-medium leading-relaxed line-clamp-2 italic flex-1">
                                                {tool.description}
                                            </p>
                                        </div>

                                        <div className="mt-6 md:mt-8 flex items-center text-xs font-black uppercase tracking-widest text-[#475569] group-hover:text-white transition-colors gap-2">
                                            Get Started <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="py-32 text-center space-y-4"
                        >
                            <div className="text-6xl mb-6">🔍</div>
                            <h3 className="text-2xl font-bold text-white">No tools match your search</h3>
                            <p className="text-[#94A3B8]">Try adjusting your keywords or category filters.</p>
                            <Button
                                variant="outline"
                                onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                                className="mt-4 rounded-xl"
                            >
                                Clear all filters
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
