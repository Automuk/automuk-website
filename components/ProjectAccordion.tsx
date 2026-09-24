"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import type { Work } from "@/lib/works-data";

const ease = [0.22, 1, 0.36, 1] as const;

export default function ProjectAccordion({ works }: { works: Work[] }) {
    const [active, setActive] = useState(0);

    return (
        <>
            {/* ── Desktop: horizontal accordion ── */}
            <div className="hidden lg:flex h-[72vh] min-h-[560px] gap-3">
                {works.map((work, i) => {
                    const isActive = i === active;
                    return (
                        <Link
                            key={work.slug}
                            href={`/projects/${work.slug}`}
                            onMouseEnter={() => setActive(i)}
                            onFocus={() => setActive(i)}
                            aria-current={isActive ? "true" : undefined}
                            className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            style={{
                                flex: isActive ? 6 : 1,
                                minWidth: 0,
                                transition: `flex 0.7s cubic-bezier(${ease.join(",")}), border-color 0.4s`,
                                borderColor: isActive ? `${work.accent}55` : undefined,
                            }}
                        >
                            {/* Screenshot — only visible in the expanded panel */}
                            <div
                                className="absolute inset-0 transition-opacity duration-700"
                                style={{ opacity: isActive ? 1 : 0 }}
                            >
                                <img
                                    src={work.imageUrl}
                                    alt=""
                                    loading={i === 0 ? "eager" : "lazy"}
                                    className="w-full h-full object-cover object-top scale-[1.02] group-hover:scale-105 transition-transform duration-[1200ms]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#00020C] via-[#00020C]/70 to-[#00020C]/10" />
                                <div
                                    className="absolute inset-0 opacity-30 mix-blend-screen"
                                    style={{ background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${work.accent}, transparent)` }}
                                />
                            </div>

                            {/* Collapsed spine — layered like a physical file folder */}
                            <div
                                className="absolute inset-0 transition-opacity duration-300"
                                style={{ opacity: isActive ? 0 : 1, pointerEvents: isActive ? "none" : "auto" }}
                            >
                                {/* Back panel with accent-tinted tab */}
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        background: `linear-gradient(180deg, ${work.accent}2e 0%, ${work.accent}14 18%, rgba(255,255,255,0.025) 40%, rgba(0,0,0,0.25) 100%)`,
                                        boxShadow: "inset 1px 0 0 rgba(255,255,255,0.08), inset -1px 0 0 rgba(0,0,0,0.5)",
                                    }}
                                />
                                <div
                                    className="absolute top-0 left-0 h-11 w-[68%]"
                                    style={{
                                        clipPath: "polygon(0 0, 78% 0, 100% 100%, 0 100%)",
                                        background: `linear-gradient(180deg, ${work.accent}66, ${work.accent}33)`,
                                    }}
                                />

                                {/* Paper sheets peeking out beneath the tab */}
                                <div className="absolute top-9 inset-x-3 h-1.5 rounded-t-sm bg-[#E9E4D8]/[0.14]" />
                                <div className="absolute top-10 inset-x-2.5 h-1.5 rounded-t-sm bg-[#E9E4D8]/[0.09]" />

                                {/* Front panel */}
                                <div
                                    className="absolute inset-x-0 bottom-0 top-12 rounded-t-2xl flex flex-col items-center justify-between py-6 transition-transform duration-300 group-hover:-translate-y-1"
                                    style={{
                                        background: "linear-gradient(180deg, rgba(14,18,38,0.98) 0%, rgba(6,9,24,0.98) 100%)",
                                        boxShadow: "0 -8px 24px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.09), inset 1px 0 0 rgba(255,255,255,0.04)",
                                    }}
                                >
                                    {/* Index sticker */}
                                    <span
                                        className="text-[11px] font-bold tabular-nums px-2 py-0.5 rounded-sm border"
                                        style={{ color: work.accent, borderColor: `${work.accent}55`, background: `${work.accent}14` }}
                                    >
                                        {String(i + 1).padStart(2, "0")}
                                    </span>

                                    {/* Spine label */}
                                    <span
                                        className="text-lg font-black tracking-tight text-white/75 group-hover:text-white whitespace-nowrap transition-colors"
                                        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                                    >
                                        {work.name}
                                    </span>

                                    {/* Colour-code stripe */}
                                    <span
                                        className="w-1.5 h-10 rounded-full"
                                        style={{ background: work.accent, boxShadow: `0 0 14px ${work.accent}66` }}
                                    />
                                </div>
                            </div>

                            {/* Expanded content */}
                            <AnimatePresence>
                                {isActive && (
                                    <motion.div
                                        key="content"
                                        initial={{ opacity: 0, y: 24 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 12 }}
                                        transition={{ duration: 0.5, delay: 0.2, ease }}
                                        className="absolute inset-0 flex flex-col justify-end p-10 xl:p-14"
                                    >
                                        <span className="text-xs font-bold tabular-nums text-white/40 absolute top-8 left-10 xl:left-14">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <h2 className="text-5xl xl:text-6xl font-black tracking-tight text-white leading-[0.95] mb-5">
                                            {work.name}
                                        </h2>
                                        <p className="text-white/60 text-base xl:text-lg leading-relaxed max-w-xl mb-8">
                                            {work.description}
                                        </p>
                                        <div className="flex items-end justify-between gap-6">
                                            <span className="inline-flex items-center gap-3 shrink-0">
                                                <span className="text-sm font-black tracking-wide text-white">View case study</span>
                                                <span
                                                    className="w-11 h-11 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                                                    style={{ background: work.accent, color: "#00020C" }}
                                                >
                                                    <ArrowUpRight size={18} />
                                                </span>
                                            </span>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Link>
                    );
                })}
            </div>

            {/* ── Mobile / tablet: vertical accordion ── */}
            <div className="lg:hidden flex flex-col divide-y divide-white/10 border-y border-white/10">
                {works.map((work, i) => {
                    const isActive = i === active;
                    return (
                        <div key={work.slug}>
                            <button
                                type="button"
                                onClick={() => setActive(isActive ? -1 : i)}
                                aria-expanded={isActive}
                                className="w-full flex items-center gap-5 py-6 text-left outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
                            >
                                <span className="text-xs font-bold tabular-nums text-white/30 w-6">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <span className="flex-1 min-w-0">
                                    <span className="block text-2xl font-black tracking-tight text-white truncate">
                                        {work.name}
                                    </span>
                                </span>
                                <span
                                    className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/60 transition-transform duration-300"
                                    style={{ transform: isActive ? "rotate(45deg)" : "none" }}
                                >
                                    <Plus size={16} />
                                </span>
                            </button>

                            <AnimatePresence initial={false}>
                                {isActive && (
                                    <motion.div
                                        key="panel"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.45, ease }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pb-8 pl-11 space-y-5">
                                            <Link
                                                href={`/projects/${work.slug}`}
                                                className="block relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10"
                                            >
                                                <img
                                                    src={work.imageUrl}
                                                    alt={work.name}
                                                    className="w-full h-full object-cover object-top"
                                                    loading="lazy"
                                                />
                                            </Link>
                                            <p className="text-white/60 text-base leading-relaxed">
                                                {work.description}
                                            </p>
                                            <Link
                                                href={`/projects/${work.slug}`}
                                                className="inline-flex items-center gap-3 text-sm font-black text-white"
                                            >
                                                View case study
                                                <span
                                                    className="w-9 h-9 rounded-full flex items-center justify-center"
                                                    style={{ background: work.accent, color: "#00020C" }}
                                                >
                                                    <ArrowUpRight size={16} />
                                                </span>
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
