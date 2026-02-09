"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAws,
    faStripe,
    faGithub,
    faDocker,
    faCloudflare
} from "@fortawesome/free-brands-svg-icons";

const MongoDBIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-12 h-12 fill-current"><path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115c-.28-.394-.53-.954-.735-1.44c-.036.495-.055.685-.523 1.184c-.723.566-4.438 3.682-4.74 10.02c-.282 5.912 4.27 9.435 4.888 9.884l.07.05A74 74 0 0 1 11.91 24h.481a29 29 0 0 1 .51-3.07c.417-.296.604-.463.85-.693a11.34 11.34 0 0 0 3.639-8.464c.01-.814-.103-1.662-.197-2.218m-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695c-.381-.045-.765-1.76-.765-2.405" /></svg>
);

const AzureIcon = () => (
    <svg viewBox="0 0 128 128" className="w-12 h-12 fill-current">
        <path d="m14.53 91.2 16.71 19.38L80.52 11.52H43.1L14.53 91.2Z" />
        <path d="M113.47 91.2 96.76 110.58 36.42 11.52H80.52L113.47 91.2Z" opacity="0.8" />
    </svg>
);

const GoogleCloudIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 206" className="w-12 h-12"><path fill="#ea4335" d="m170.252 56.819l22.253-22.253l1.483-9.37C153.437-11.677 88.976-7.496 52.42 33.92C42.267 45.423 34.734 59.764 30.717 74.573l7.97-1.123l44.505-7.34l3.436-3.513c19.797-21.742 53.27-24.667 76.128-6.168z" /><path fill="#4285f4" d="M224.205 73.918a100.25 100.25 0 0 0-30.217-48.722l-31.232 31.232a55.52 55.52 0 0 1 20.379 44.037v5.544c15.35 0 27.797 12.445 27.797 27.796c0 15.352-12.446 27.485-27.797 27.485h-55.671l-5.466 5.934v33.34l5.466 5.231h55.67c39.93.311 72.553-31.494 72.864-71.424a72.3 72.3 0 0 0-31.793-60.453" /><path fill="#34a853" d="M71.87 205.796h55.593V161.29H71.87a27.3 27.3 0 0 1-11.399-2.498l-7.887 2.42l-22.409 22.253l-1.952 7.574c12.567 9.489 27.9 14.825 43.647 14.757" /><path fill="#fbbc05" d="M71.87 61.426C31.94 61.663-.237 94.227.001 134.158a72.3 72.3 0 0 0 28.222 56.88l32.248-32.246c-13.99-6.322-20.208-22.786-13.887-36.776s22.786-20.208 36.775-13.888a27.8 27.8 0 0 1 13.887 13.888l32.248-32.248A72.22 72.22 0 0 0 71.87 61.427" /></svg>
);

const partners = [
    { name: "AWS", type: "fa", icon: faAws, brandColor: "#FF9900" },
    { name: "Docker", type: "fa", icon: faDocker, brandColor: "#2496ED" },
    { name: "MongoDB", type: "custom", icon: MongoDBIcon, brandColor: "#47A248" },
    { name: "Stripe", type: "fa", icon: faStripe, brandColor: "#635BFF" },
    { name: "GitHub", type: "fa", icon: faGithub, brandColor: "#ffffff" },
    { name: "Azure", type: "custom", icon: AzureIcon, brandColor: "#0089D6" },
    { name: "Google Cloud", type: "custom", icon: GoogleCloudIcon, brandColor: "#4285F4" },
    { name: "Cloudflare", type: "fa", icon: faCloudflare, brandColor: "#F38020" }
] as const;

export default function IntegrationsGrid() {
    return (
        <section className="py-20 md:py-32 relative bg-background overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-10 md:mb-16 animate-reveal">
                    <h2 className="text-3xl md:text-6xl font-black mb-6 tracking-tight">Built-in Connectivity.</h2>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Automuk integrates with your existing tech stack to build unified, autonomous workflows.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {partners.map((partner, i) => {
                        return (
                            <motion.div
                                key={partner.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="glass bg-white/5 border-white/5 p-6 md:p-10 rounded-[1.5rem] md:rounded-[2rem] flex flex-col items-center justify-center group transition-all duration-500 hover:border-primary/20 hover:-translate-y-2 cursor-pointer relative overflow-hidden"
                                style={{ '--brand-color': partner.brandColor } as any}
                            >
                                {/* Blurred Gradient Background on Hover */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-700 pointer-events-none"
                                    style={{
                                        background: `radial-gradient(circle at 50% 0%, var(--brand-color), transparent 70%)`,
                                        filter: 'blur(40px)'
                                    }}
                                />

                                <div className="relative z-10 flex flex-col items-center gap-4 transition-transform duration-500 group-hover:scale-110">
                                    {partner.type === "fa" ? (
                                        <div className="text-white/10 transition-colors duration-500 group-hover:text-[var(--brand-color)]">
                                            <FontAwesomeIcon
                                                icon={partner.icon as any}
                                                className="text-5xl"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-12 h-12 transition-all duration-500 grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-100 group-hover:text-[var(--brand-color)]">
                                            {/* @ts-ignore */}
                                            <partner.icon />
                                        </div>
                                    )}
                                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-0 group-hover:opacity-40 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 text-white">
                                        {partner.name}
                                    </span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
