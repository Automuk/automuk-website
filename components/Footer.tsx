"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn, faInstagram, faFacebookF } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
    return (
        <footer className="bg-[#00020C] border-t border-[#334155] py-20 px-4 pb-10 sm:pb-20">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
                    <div className="col-span-1 md:col-span-2 space-y-6">
                        <Link href="/" className="flex items-center space-x-3 group w-fit">
                            <div className="relative w-10 h-10">
                                <img src="https://cdn.autom.uk/logo.svg" alt="Automuk logo" width="40" height="40" className="w-full h-full" fetchPriority="low" />
                                <div className="absolute inset-0 bg-primary blur-lg opacity-0 group-hover:opacity-30 transition-opacity" />
                            </div>
                            <span className="text-2xl font-medium font-heading tracking-tighter text-white leading-none">
                                Automuk
                            </span>
                        </Link>
                        <p className="text-[#94A3B8] max-w-sm leading-relaxed text-lg font-heading">
                            We build AI solutions, stunning websites, custom dashboards, and bold brands that help businesses scale efficiently.
                        </p>
                        <div className="flex items-center gap-3 text-[#94A3B8] hover:text-white transition-colors group w-fit">
                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors">
                                <Mail className="w-4 h-4" />
                            </div>
                            <a href="mailto:arijit@autom.uk" className="font-heading">arijit@autom.uk</a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-white tracking-[0.2em] uppercase mb-6 font-heading">Explore</h3>
                        <ul className="space-y-4">
                            {[
                                { name: "Services", href: "/services" },
                                { name: "Process", href: "/how-it-works" },
                                { name: "About", href: "/about" },
                                { name: "Contact", href: "/contact" }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-[#94A3B8] hover:text-white transition-colors duration-300 font-heading">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-white tracking-[0.2em] uppercase mb-6 font-heading">Stay Connected</h3>
                        <div className="flex gap-6">
                            {[
                                { fa: faLinkedinIn, href: "https://www.linkedin.com/company/automuk", label: "Automuk on LinkedIn" },
                                { fa: faInstagram, href: "https://www.instagram.com/automuk/", label: "Automuk on Instagram" },
                                { fa: faFacebookF, href: "https://www.facebook.com/profile.php?id=61592173946287", label: "Automuk on Facebook" },
                            ].map((social) => (
                                <a
                                    key={social.href}
                                    href={social.href}
                                    aria-label={social.label}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#94A3B8] hover:text-[#3168FA] transition-all duration-300"
                                >
                                    <FontAwesomeIcon icon={social.fa} className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-[#334155]/50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[#94A3B8] text-sm">
                        &copy; {new Date().getFullYear()} Automuk Consultants. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-xs font-bold tracking-widest text-[#94A3B8] uppercase font-heading">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
