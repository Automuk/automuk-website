"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { works, featuredWorkSlugs, type Work } from "@/lib/works-data";

const featured = featuredWorkSlugs
  .map((slug) => works.find((work) => work.slug === slug))
  .filter((work): work is Work => Boolean(work));

// "awakynn" drops out only at the lg breakpoint (3-col grid), reappearing at 2xl (4-col grid).
const hideAtLg = new Set(["awakynn"]);

export default function OurWorks() {
  return (
    <section className="bg-background relative py-24 md:py-32">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <h2 className="text-3xl md:text-7xl font-medium tracking-tight">
              Built to Perform.
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mt-6 leading-relaxed">
              A selection of digital experiences we&apos;ve crafted for founders, studios, and growing businesses.
            </p>
          </div>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 shrink-0 text-base font-bold text-white/80 hover:text-white transition-colors w-fit"
          >
            View All Projects
            <span className="w-9 h-9 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-primary transition-colors">
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        </div>

        {/* Card grid — 1/2 cols by default, 3 at lg, 4 at 2xl */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {featured.map((work, i) => (
            <motion.div
              key={work.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={hideAtLg.has(work.slug) ? "lg:hidden 2xl:block" : ""}
            >
              <a
                href={work.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col h-full rounded-[1.75rem] overflow-hidden border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 !p-0"
              >
                {/* Screenshot */}
                <div className="relative aspect-[4/3] overflow-hidden border-b border-white/[0.06]">
                  <img
                    src={work.imageUrl}
                    alt={work.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="text-xl font-black tracking-tight text-white mb-2">
                    {work.name}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed line-clamp-3 flex-1">
                    {work.description}
                  </p>

                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/[0.06]">
                    <span className="text-sm font-bold tracking-wide" style={{ color: work.accent }}>
                      {work.domain}
                    </span>
                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: `${work.accent}22`, color: work.accent }}
                    >
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
