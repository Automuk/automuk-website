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
      "Westra Wear is a premium women's fashion brand that blends timeless elegance with a modern shopping experience. We designed and developed a high-performance eCommerce platform that showcases curated collections including co-ord sets, kaftans, kurtis, salwars, frocks, tops, and more through a refined, luxury-inspired interface. The website seamlessly integrates online shopping with live Facebook selling sessions, enabling customers to discover products, interact in real time, and shop with confidence. Every page was crafted with a mobile-first approach, intuitive navigation, and conversion-focused user experience, while maintaining exceptional performance, accessibility, and SEO. Built using modern web technologies, the platform delivers fast load times, smooth animations, and a scalable architecture that supports continuous product additions and future growth. The result is a premium digital storefront that strengthens Westra Wear's brand identity and offers customers an engaging, personalized shopping experience across all devices.",
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
      "AnimHaus is a premium animation and visual engineering studio focused on creating immersive digital experiences through powerful storytelling and cutting-edge design. The project involved designing and developing a high-performance, cinematic website that reflects the studio's bold creative identity while maintaining exceptional speed and responsiveness. The platform showcases AnimHaus' expertise in anime, cartoons, manga, comics, game assets, digital infrastructure, and marketing services through dynamic layouts, smooth animations, and an intuitive user experience. Every section was carefully optimized for performance, SEO, accessibility, and mobile responsiveness, ensuring visitors enjoy a seamless experience across all devices. The result is a visually striking, conversion-focused website that strengthens the brand's online presence and effectively communicates its creative vision to clients worldwide.",
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
      "Awakynn is a modern wellness platform built to deliver a serene and engaging digital experience for a holistic health brand. The website combines elegant UI/UX design with high-performance development, featuring responsive layouts, smooth animations, SEO optimization, and fast loading speeds. Designed to reflect the brand's calming identity, the platform showcases yoga programs, meditation, Ayurvedic wellness, and personalized consultations through a clean, intuitive interface. The result is a visually immersive website that balances aesthetics, usability, and scalability while providing a seamless experience across all devices.",
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
      "Shurer Dhara is a premium cultural website dedicated to celebrating the life, legacy, and artistic journey of Padma Shri awardee Rezwana Choudhury Bannya, one of the world's most renowned exponents of Rabindra Sangeet and the founder of the Shurer Dhara music institution. The website was designed to preserve and present her remarkable contributions through an elegant, immersive digital experience inspired by Bengali heritage and classical aesthetics. Featuring a responsive interface, cinematic visuals, multimedia integration, event showcases, performance archives, and SEO-optimized architecture, the platform delivers a seamless experience across all devices. The result is a timeless digital destination that honors a legendary artist while making her music, achievements, and cultural legacy accessible to audiences worldwide.",
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
      "KD Institute of Advance Education (KDIAE) is a comprehensive digital ecosystem developed to streamline every aspect of school operations while delivering a modern online presence. Alongside designing and developing the institution's responsive, SEO-optimized website, we engineered a powerful custom School Management System tailored to the institution's daily workflows. The platform centralizes student records, admissions, fee and revenue management, financial reporting, teacher and staff management, attendance tracking, timetable scheduling, role-based access control, academic administration, and operational reporting within a single unified system. Built for scalability, security, and ease of use, the solution automates administrative processes, improves efficiency, reduces manual work, and provides school administrators with complete control over their institution through an intuitive, centralized dashboard.",
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
      "ZorgSocial is an AI-powered social media marketing platform designed to help businesses plan, create, manage, and optimize their entire social media strategy from a single intelligent dashboard. We designed and developed a modern, high-performance SaaS platform featuring an intuitive user experience, scalable architecture, responsive design, and SEO-optimized pages. The platform integrates AI-driven content generation, strategic planning, multi-platform publishing, advanced analytics, audience insights, unified social inbox, campaign management, and workflow automation to simplify social media operations. Built with performance, scalability, and enterprise usability in mind, the project delivers a seamless experience that empowers businesses to streamline content creation, improve engagement, and drive measurable marketing results through intelligent automation.",
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
      "Quplast is a modern eCommerce platform built for a leading supplier of household essentials, cleaning products, disposable tableware, packaging solutions, and eco-friendly consumer goods. The project focused on creating a fast, scalable, and conversion-driven shopping experience with a clean user interface, responsive design, and optimized performance across all devices. The platform features advanced product categorization, powerful search and filtering, secure shopping cart and checkout, custom bundle creation, promotional campaigns, and a streamlined content management system for efficient product and inventory updates. Designed with SEO best practices and a mobile-first approach, the website delivers an intuitive shopping experience while providing a robust foundation for future growth and large-scale product expansion.",
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
