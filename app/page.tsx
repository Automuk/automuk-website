import Link from "next/link";
import Script from "next/script";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import BentoFlex from "@/components/BentoFlex";
import OurWorks from "@/components/OurWorks";
import IntegrationsGrid from "@/components/IntegrationsGrid";
import EngagementModels from "@/components/EngagementModels";
import CTASection from "@/components/CTASection";
import ResultsSection from "@/components/ResultsSection";
import Testimonials from "@/components/Testimonials";
import HeroAnimationClient from "@/components/HeroAnimationClient";

export const metadata: Metadata = {
  title: "Automuk | AI Solutions, Web Development, Dashboards & Branding",
  description: "Automuk builds AI-powered solutions, single-page & multi-page websites, custom dashboards, and delivers branding & marketing services that help businesses scale faster.",
  keywords: [
    "AI Agents",
    "Web Development",
    "Custom Dashboards",
    "Branding Services",
    "Digital Marketing",
    "Workflow Automation",
    "Single Page Website",
    "Multi Page Website",
    "AI Chatbots for Business",
    "Digital Transformation"
  ],
  alternates: {
    canonical: "https://autom.uk",
  },
  openGraph: {
    title: "Automuk | AI Solutions, Web Dev, Dashboards & Branding",
    description: "From AI agents to pixel-perfect websites, custom dashboards, and full-stack branding — Automuk builds everything your business needs to scale.",
    url: "https://autom.uk",
    siteName: "Automuk",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Automuk - AI & Automation Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Automuk | AI, Web & Branding Excellence",
    description: "AI solutions, stunning websites, custom dashboards, and bold branding for modern businesses.",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Automuk",
  "url": "https://autom.uk",
  "logo": "https://autom.uk/logo.svg",
  "description": "Full-service digital studio offering AI solutions, web development, custom dashboards, branding, and marketing for modern businesses.",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US"
  },
  "service": [
    {
      "@type": "Service",
      "name": "AI Solutions",
      "description": "Custom LLM integrations, AI agents, and intelligent chatbots."
    },
    {
      "@type": "Service",
      "name": "Web Development",
      "description": "Single-page and multi-page high-performance websites."
    },
    {
      "@type": "Service",
      "name": "Custom Dashboards",
      "description": "Tailored operational dashboards and internal tools."
    },
    {
      "@type": "Service",
      "name": "Branding & Marketing",
      "description": "Brand identity design and digital marketing strategies."
    },
    {
      "@type": "Service",
      "name": "Workflow Automation",
      "description": "Seamless integrations using Zapier, Make, and n8n."
    }
  ]
};

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-background">
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <HeroAnimationClient />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-8xl font-black tracking-tight mb-8 leading-[1.1] animate-reveal">
            <span className="text-white block">Your business deserves</span>
            <span className="inline-block py-2 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient-flow">
              an unfair advantage.
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up stagger-1">
            We build the AI, the website, the brand, and the systems that make your competitors wonder what you&apos;re using.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up stagger-2">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white min-w-[280px] sm:min-w-[280px] h-14 sm:h-16 text-lg sm:text-xl shadow-[0_0_40px_rgba(49,104,250,0.4)] transition-all hover:scale-105 rounded-full">
              <Link href="/contact">Start a Project</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/5 border-white/10 hover:bg-white/10 text-white min-w-[220px] sm:min-w-[220px] h-14 sm:h-16 text-lg sm:text-xl rounded-full backdrop-blur-sm">
              <Link href="/services">See What We Do</Link>
            </Button>
          </div>
        </div>
      </section>

      <BentoFlex />

      <OurWorks />

      <IntegrationsGrid />

      <EngagementModels />

      <CTASection />
    </div>
  );
}
