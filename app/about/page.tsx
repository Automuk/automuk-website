import PageContainer from "@/components/PageContainer";
import { Badge } from "@/components/ui/badge";
import { Rocket, Target, Zap, ShieldCheck } from "lucide-react";
import CTASection from "@/components/CTASection";

export default function AboutPage() {
    return (
        <div className="flex flex-col w-full bg-background min-h-screen">
            <PageContainer>
                <div className="max-w-5xl mx-auto my-16 md:my-32">
                    <div className="text-center mb-16 md:mb-24 animate-fade-in-up">
                        <h1 className="text-3xl md:text-8xl font-black mb-8 md:mb-10 tracking-tight leading-tight">Built for Efficiency, <br />Dedicated to Outcomes.</h1>
                        <p className="text-lg md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-medium">
                            Automuk is a founder-led freelance studio focused on one thing: helping businesses leverage AI and automation to scale without the overhead.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center mb-24 md:mb-40">
                        <div className="space-y-8 animate-fade-in-up stagger-1">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Small Team, Big Impact</h2>
                            <div className="space-y-6">
                                <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                                    We're not a massive agency with layers of management. When you work with Automuk, you work directly with the builders. We cut out the corporate fluff and focus on delivering high-impact solutions that actually move the needle.
                                </p>
                                <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                                    Our philosophy is simple: if it can be automated, it should be. We believe human talent is too valuable to spend on repetitive tasks. Our mission is to liberate your team through intelligent technology.
                                </p>
                            </div>
                        </div>
                        <div className="relative group animate-fade-in-up stagger-2">
                            <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-3xl group-hover:bg-primary/20 transition-all pointer-events-none" />
                            <div className="relative glass bg-card/40 border border-white/10 p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] h-full flex flex-col justify-center transform group-hover:scale-[1.02] transition-all duration-500">
                                <blockquote className="text-2xl md:text-3xl italic font-medium mb-8 md:mb-10 leading-snug">
                                    "Efficiency is doing things right; effectiveness is doing the right things."
                                </blockquote>
                                <div className="flex items-center space-x-5">
                                    <img
                                        src="https://cdn.autom.uk/founder.jpeg"
                                        alt="Automuk Founder"
                                        className="w-14 h-14 rounded-full object-cover"
                                    />
                                    <div>
                                        <div className="text-lg font-bold">The Founder</div>
                                        <div className="text-muted-foreground font-medium">Automuk Studio</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                        {[
                            {
                                title: "Radical Transparency",
                                description: "No hidden costs, no technical jargon. We explain the 'why' behind every solution.",
                                icon: ShieldCheck
                            },
                            {
                                title: "Outcome Focused",
                                description: "We don't just ship features; we solve business problems and deliver measurable ROI.",
                                icon: Target
                            },
                            {
                                title: "Speed to Value",
                                description: "Our iterative approach means you see working automations in weeks, not months.",
                                icon: Zap
                            }
                        ].map((value, i) => (
                            <div key={value.title} className={`p-8 md:p-10 glass bg-card/30 border border-white/5 rounded-3xl group hover:border-primary/40 transition-all animate-fade-in-up stagger-${i + 1}`}>
                                <value.icon className="h-8 w-8 md:h-10 md:w-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                                <h3 className="text-xl md:text-2xl font-bold mb-4">{value.title}</h3>
                                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </PageContainer>

            <CTASection
                title="Ready for a different kind of partnership?"
                subtitle="Let's build something that actually works for your business. Book a session with our founder today."
            />
        </div>
    );
}
