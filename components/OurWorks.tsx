"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const works = [
  {
    url: "https://westra.in/",
    name: "Westra",
    domain: "westra.in",
    category: "Brand & Web",
    description:
      "A premium women's fashion eCommerce platform blending timeless elegance with a modern shopping experience. We built the full storefront with live Facebook selling integration, mobile-first UX, and conversion-focused design.",
    tags: ["Next.js", "Branding", "SEO", "Animation"],
    accent: "#3168FA",
    imageUrl: "https://cdn.autom.uk/cdn-cgi/image/format=webp,quality=80,width=800/westra.png",
  },
  {
    url: "https://animhaus.com/",
    name: "Animhaus",
    domain: "animhaus.com",
    category: "Creative Studio",
    description:
      "A cinematic website for a premium animation and visual engineering studio. We crafted an immersive, high-performance platform showcasing their anime, game asset, and motion design services with dynamic layouts and smooth animations.",
    tags: ["WebGL", "CMS", "Motion Design", "Portfolio"],
    accent: "#8B5CF6",
    imageUrl: "https://cdn.autom.uk/cdn-cgi/image/format=webp,quality=80,width=800/animhaus.png",
  },
  {
    url: "https://grabfabs.com/",
    name: "Grabfabs",
    domain: "grabfabs.com",
    category: "E-Commerce Platform",
    description:
      "A product sourcing and wholesale marketplace connecting buyers with verified manufacturers. We engineered the full-stack platform including catalogue management, RFQ workflows, and an AI-powered product tagging system that cut listing time by 60%.",
    tags: ["Marketplace", "AI Tagging", "Full-Stack", "B2B"],
    accent: "#10B981",
    imageUrl: "https://cdn.autom.uk/cdn-cgi/image/format=webp,quality=80,width=800/grabfabs.png",
  },
  {
    url: "https://awakynn.com/",
    name: "Awakynn",
    domain: "awakynn.com",
    category: "Wellness Brand",
    description:
      "A serene digital experience for a holistic health and wellness brand. We designed a responsive, SEO-optimised platform showcasing yoga, meditation, Ayurvedic wellness, and personalised consultations with smooth animations throughout.",
    tags: ["DTC", "Shopify", "CRO", "Design System"],
    accent: "#F59E0B",
    imageUrl: "https://cdn.autom.uk/cdn-cgi/image/format=webp,quality=80,width=800/awakynn.png",
  },
  {
    url: "https://shurerdhara.com/",
    name: "Shurerdhara",
    domain: "shurerdhara.com",
    category: "Cultural Platform",
    description:
      "A heritage digital destination honouring Padma Shri awardee Rezwana Choudhury Bannya. We built an immersive, multimedia-rich website with performance archives, event showcases, and cinematic visuals inspired by Bengali classical aesthetics.",
    tags: ["Media Archive", "i18n", "Events", "Heritage"],
    accent: "#EC4899",
    imageUrl: "https://cdn.autom.uk/cdn-cgi/image/format=webp,quality=80,width=800/shurerdhara.png",
  },
  {
    url: "https://kdiae.in/",
    name: "KDIAE",
    domain: "kdiae.in",
    category: "Education & Design",
    description:
      "A full digital ecosystem for a leading educational institution. We built the public website alongside a custom School Management System centralising admissions, fee management, attendance, timetables, and role-based administration in one dashboard.",
    tags: ["Accessibility", "WCAG", "Admissions", "Education"],
    accent: "#06B6D4",
    imageUrl: "https://cdn.autom.uk/cdn-cgi/image/format=webp,quality=80,width=800/kdiae.png",
  },
  {
    url: "https://zorgsocial.com/",
    name: "Zorg Social",
    domain: "zorgsocial.com",
    category: "Marketing Agency",
    description:
      "An AI-powered SaaS platform for end-to-end social media management. We designed and built the full product — AI content generation, multi-platform publishing, analytics, campaign management, and a unified social inbox.",
    tags: ["SaaS Dashboard", "AI Reporting", "CRM", "Automation"],
    accent: "#F97316",
    imageUrl: "https://cdn.autom.uk/cdn-cgi/image/format=webp,quality=80,width=800/zorgsocial.png",
  },
  {
    url: "https://quplast.com/",
    name: "Quplast",
    domain: "quplast.com",
    category: "Industrial & Manufacturing",
    description:
      "A fast, conversion-driven eCommerce platform for a household and packaging goods supplier. We delivered advanced product categorisation, secure checkout, custom bundle creation, and a streamlined CMS built for large-scale catalogue growth.",
    tags: ["Industrial", "Lead Gen", "Quote Tool", "Manufacturing"],
    accent: "#14B8A6",
    imageUrl: "https://cdn.autom.uk/cdn-cgi/image/format=webp,quality=80,width=800/quplast.png",
  },
];

export default function OurWorks() {
  const total = works.length;
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  return (
    <section ref={sectionRef} className="bg-background relative -mb-90 md:-mb-120">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24">
        <h2 className="text-3xl md:text-7xl font-black tracking-tight">
          Built to Perform.
        </h2>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mt-6 leading-relaxed">
          A selection of digital experiences we&apos;ve crafted for founders, studios, and growing businesses.
        </p>
      </div>

      {/* Stacking cards — position:sticky + nth-child CSS controls top/z-index */}
      <motion.div style={{ y }} className="works-container flex flex-col pb-[10vh]">
        {works.map((work, i) => (
          <a
            key={work.url}
            href={work.url}
            target="_blank"
            rel="noopener noreferrer"
            className="work-card sticky rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl mx-4 md:mx-8 mb-4 cursor-pointer !p-0"
            style={{ background: "rgba(5,10,28,0.97)" }}
          >
            {/* Accent gradient */}
            <div
              className="absolute inset-0 opacity-[0.05] pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 70% 60% at 80% 50%, ${work.accent}, transparent)`,
              }}
            />
            {/* Top accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
              style={{
                background: `linear-gradient(90deg, transparent, ${work.accent}, transparent)`,
              }}
            />

            <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] min-h-[88vh]">
              {/* ── Left: info ── */}
              <div className="flex flex-col justify-between p-6 md:p-14 lg:p-16">
                <div>
                  {/* Index + category */}
                  <div className="flex items-center gap-3 mb-8">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                      {work.category}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-[0.95]">
                    {work.name}
                  </h3>

                  {/* Description */}
                  <p className="text-white/55 text-base md:text-lg leading-relaxed max-w-md">
                    {work.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-8">
                    {work.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border"
                        style={{
                          borderColor: `${work.accent}30`,
                          color: `${work.accent}cc`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Domain link */}
                <div className="inline-flex items-center gap-3 mt-12 w-fit">
                  <span className="text-base font-black tracking-wide" style={{ color: work.accent }}>
                    {work.domain}
                  </span>
                  <span
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ background: `${work.accent}22`, color: work.accent }}
                  >
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </div>

              {/* ── Right: screenshot ── */}
              <div className="hidden lg:flex items-center justify-center p-8 border-l border-white/[0.06]">
                <div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <img
                    src={work.imageUrl}
                    alt={work.name}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </a>
        ))}
      </motion.div>
    </section>
  );
}
