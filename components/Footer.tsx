"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope
} from "@fortawesome/free-solid-svg-icons";
import {
    faLinkedin,
    faXTwitter,
    faGithub
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
    return (
        <footer className="bg-[#00020C] border-t border-[#334155] py-20 px-4 pb-10 sm:pb-20">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
                    <div className="col-span-1 md:col-span-2 space-y-6">
                        <Link href="/" className="flex items-center space-x-3 group w-fit">
                            <div className="relative w-10 h-10">
                                <motion.svg
                                    viewBox="0 0 523 523"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-full h-full"
                                >
                                    {/* Static Donut */}
                                    <path
                                        d="M443.988 223.576C435.098 181.472 411.885 143.753 378.303 116.846C344.72 89.9387 302.847 75.5081 259.818 76.0128C216.789 76.5175 175.266 91.9264 142.325 119.614C109.383 147.302 87.0604 185.555 79.1609 227.855C71.2613 270.156 78.2734 313.887 99.0023 351.598C119.731 389.308 152.894 418.664 192.841 434.665C232.788 450.665 277.047 452.319 318.077 439.345C359.107 426.372 394.369 399.573 417.855 363.515L377.885 337.481C360.422 364.291 334.203 384.217 303.696 393.864C273.188 403.51 240.28 402.28 210.578 390.383C180.875 378.487 156.217 356.659 140.804 328.62C125.392 300.58 120.178 268.064 126.051 236.612C131.925 205.16 148.523 176.717 173.016 156.13C197.51 135.543 228.384 124.086 260.378 123.711C292.372 123.335 323.506 134.065 348.476 154.072C373.446 174.078 390.706 202.124 397.316 233.43L443.988 223.576Z"
                                        fill="#3168fa"
                                    />
                                    {/* Rotating Orbits */}
                                    <motion.g
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                        style={{ originX: "261.5px", originY: "261.5px" }}
                                    >
                                        <path d="M517.359 207.479C506.143 154.357 478.671 106.043 438.754 69.2417C398.837 32.4399 348.455 8.97509 294.599 2.10312L289.855 39.2751C335.994 45.1623 379.156 65.2646 413.353 96.7926C447.55 128.321 471.086 169.711 480.694 215.22L517.359 207.479Z" fill="#3168fa" />
                                        <path d="M51.3502 105.874C19.039 149.506 1.10959 202.113 0.0498212 256.396C-1.00994 310.678 14.8525 363.945 45.4361 408.805L76.3984 387.696C50.1974 349.265 36.6081 303.631 37.516 257.127C38.4239 210.623 53.784 165.555 81.465 128.176L51.3502 105.874Z" fill="#3168fa" fillOpacity="0.8" />
                                        <path d="M200.609 515.812C253.41 528.454 308.836 524.348 359.198 504.064C409.559 483.78 452.359 448.323 481.657 402.614L450.108 382.392C425.008 421.551 388.342 451.927 345.198 469.304C302.053 486.682 254.569 490.199 209.335 479.369L200.609 515.812Z" fill="#3168fa" fillOpacity="0.6" />
                                    </motion.g>
                                </motion.svg>
                                <div className="absolute inset-0 bg-primary blur-lg opacity-0 group-hover:opacity-30 transition-opacity" />
                            </div>
                            <span className="text-2xl font-black font-heading tracking-tighter text-white leading-none">
                                Automuk
                            </span>
                        </Link>
                        <p className="text-[#94A3B8] max-w-sm leading-relaxed text-lg font-heading">
                            We build custom AI agents and autonomous workflows that help businesses scale efficiently by eliminating human overhead.
                        </p>
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
                                { icon: faXTwitter, href: "#", color: "hover:text-white" },
                                { icon: faLinkedin, href: "#", color: "hover:text-[#3168FA]" },
                                { icon: faGithub, href: "#", color: "hover:text-white" },
                                { icon: faEnvelope, href: "mailto:hello@autom.uk", color: "hover:text-[#3168FA]" }
                            ].map((social, i) => (
                                <Link
                                    key={i}
                                    href={social.href}
                                    className={`text-[#94A3B8] ${social.color} transition-all duration-300`}
                                >
                                    <FontAwesomeIcon icon={social.icon} size="lg" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-[#334155]/50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[#94A3B8] text-sm">
                        &copy; {new Date().getFullYear()} Automuk Studio. All rights reserved.
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
