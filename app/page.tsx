import Link from "next/link";
import Script from "next/script";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import CTASection from "@/components/CTASection";
import ResultsSection from "@/components/ResultsSection";
import IntegrationsGrid from "@/components/IntegrationsGrid";
import Testimonials from "@/components/Testimonials";
import HeroAnimation from "@/components/HeroAnimation";
import BentoFlex from "@/components/BentoFlex";
import EngagementModels from "@/components/EngagementModels";
import OurWorks from "@/components/OurWorks";

export const metadata: Metadata = {
  title: "Automuk | AI Agents, Workflow Automation & Custom B2B Software",
  description: "Automuk helps businesses amplify growth through custom AI agents, seamless workflow automation (Zapier, Make, n8n), and high-performance software solutions. Transform your operations today.",
  keywords: [
    "AI Agents",
    "B2B Automation",
    "Workflow Automation",
    "Custom Software Development",
    "Zapier Experts",
    "Make.com Automation",
    "n8n Workflows",
    "AI Chatbots for Business",
    "Process Optimization",
    "Digital Transformation"
  ],
  alternates: {
    canonical: "https://autom.uk",
  },
  openGraph: {
    title: "Automuk | Amplify Growth with Intelligent Automation",
    description: "Scale your business with custom AI solutions and automated workflows. We build the tools that free your team to focus on growth.",
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
    title: "Automuk | AI & Automation Excellence",
    description: "Custom AI agents and seamless workflows for modern businesses.",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Automuk",
  "url": "https://autom.uk",
  "logo": "https://autom.uk/logo.svg",
  "description": "Premium AI Automation and Custom Software Studio for B2B growth.",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US"
  },
  "service": [
    {
      "@type": "Service",
      "name": "AI Agent Development",
      "description": "Custom LLM integrations and intelligent chatbots."
    },
    {
      "@type": "Service",
      "name": "Workflow Automation",
      "description": "Seamless integrations using Zapier, Make, and n8n."
    },
    {
      "@type": "Service",
      "name": "Custom Software Solutions",
      "description": "Operational dashboards and internal tools."
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
        <HeroAnimation />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-8xl font-black tracking-tight mb-8 leading-[1.2] animate-reveal">
            <span className="inline-block py-2 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient-flow">
              Amplifying Growth.
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up stagger-1">
            Automuk builds AI-powered automation and custom software that frees your team from repetitive tasks and focuses them on what matters.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up stagger-2">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white min-w-[280px] sm:min-w-[280px] h-14 sm:h-16 text-lg sm:text-xl shadow-[0_0_40px_rgba(49,104,250,0.4)] transition-all hover:scale-105 rounded-full">
              <Link href="/contact">Book a Free Consultation</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/5 border-white/10 hover:bg-white/10 text-white min-w-[220px] sm:min-w-[220px] h-14 sm:h-16 text-lg sm:text-xl rounded-full backdrop-blur-sm">
              <Link href="/services">View Services</Link>
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
