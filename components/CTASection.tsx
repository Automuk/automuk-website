import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
    title?: string;
    subtitle?: string;
    primaryCTA?: { label: string; href: string };
    secondaryCTA?: { label: string; href: string };
}

export default function CTASection({
    title = "Ready to Automate Your Growth?",
    subtitle = "Join the forward-thinking businesses using AI to gain a competitive edge. Let's discuss your custom automation strategy.",
    primaryCTA = { label: "Book a Free Consultation", href: "/contact" },
    secondaryCTA = { label: "View Services", href: "/services" },
}: CTASectionProps) {
    return (
        <section className="py-20 md:py-32 relative overflow-hidden bg-background">
            {/* Advanced Background Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[160px] animate-float pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[140px] animate-float [animation-delay:-3s] pointer-events-none" />

            <div className="max-w-4xl mx-auto text-center relative z-10 px-4 animate-fade-in-up">
                <h2 className="text-3xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient-flow">
                    {title}
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto">
                    {subtitle}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white min-w-[260px] sm:min-w-[260px] h-14 text-lg shadow-[0_0_30px_rgba(49,104,250,0.3)] transition-all hover:scale-105 rounded-full">
                        <Link href={primaryCTA.href}>{primaryCTA.label}</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="bg-white/5 border-white/10 hover:bg-white/10 text-white min-w-[200px] sm:min-w-[200px] h-14 text-lg rounded-full backdrop-blur-sm">
                        <Link href={secondaryCTA.href}>{secondaryCTA.label}</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
