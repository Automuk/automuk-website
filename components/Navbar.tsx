"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown, Menu, X, ArrowLeftRight
} from "lucide-react";
import { tools } from "@/lib/tools-data";
import LogoSVG from "./ui/logo-svg";

type NavLink = {
  name: string;
  href: string;
  dropdown?: typeof tools;
};

const navLinks: NavLink[] = [
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  {
    name: "Free Tools",
    href: "#",
    dropdown: tools
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/10 animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-10 h-10">
                <LogoSVG animate={true} />
                <div className="absolute inset-0 bg-primary blur-lg opacity-0 group-hover:opacity-30 transition-opacity" />
              </div>
              <span className="text-xl md:text-2xl font-black font-heading tracking-tighter text-white leading-none">
                Automuk
              </span>
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link, i) => (
              <div
                key={link.name}
                className="relative h-full flex items-center"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.dropdown ? (
                  <button className="flex items-center gap-1.5 text-muted-foreground hover:text-white transition-all text-sm font-medium animate-fade-in-up">
                    {link.name}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={`text-muted-foreground hover:text-white transition-all text-sm font-medium relative group animate-fade-in-up stagger-${i + 1}`}
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                  </Link>
                )}
              </div>
            ))}

            {/* Desktop Dropdown - Centered to screen */}
            <AnimatePresence>
              {activeDropdown && navLinks.find(l => l.name === activeDropdown)?.dropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  onMouseEnter={() => setActiveDropdown(activeDropdown)}
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute top-20 left-1/2 -translate-x-1/2 pt-4 w-fit pointer-events-auto"
                >
                  <div className="relative bg-[#020617]/80 border border-white/10 rounded-[2.5rem] p-10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] backdrop-blur-[40px] overflow-hidden w-[1100px]">
                    {/* Subtle gradient background for depth */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none"
                      style={{
                        backdropFilter: "blur(0px)"
                      }}
                    />

                    <div className="relative grid grid-cols-5 gap-x-2 gap-y-1">
                      {navLinks.find(l => l.name === activeDropdown)?.dropdown?.map((tool) => (
                        <Link
                          key={tool.name}
                          href={tool.href}
                          className="group flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-200 outline-none w-full"
                        >
                          <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-[#94A3B8] group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0">
                            <tool.icon size={18} />
                          </div>
                          <div className="text-[13px] font-bold text-[#94A3B8] group-hover:text-white transition-colors truncate">
                            {tool.name}
                          </div>
                        </Link>
                      ))}
                    </div>

                    <div className="relative mt-8 pt-8 border-t border-white/5 flex items-center justify-between px-2">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.6)]" />
                        <span className="text-[10px] text-white/50 font-black tracking-[0.2em] uppercase">30 Professional Tools</span>
                      </div>
                      <Link href="/tools" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:text-white transition-all flex items-center gap-2 group/all">
                        <span>Full Toolbox</span>
                        <ArrowLeftRight size={12} className="group-hover/all:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(49,104,250,0.4)] transition-all hover:scale-105 rounded-full px-8">
              <Link href="/contact">Book a Consultation</Link>
            </Button>
          </div>

          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-muted-foreground hover:text-white transition-colors p-2"
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass border-b border-white/10 overflow-y-auto max-h-[calc(100vh-5rem)] lg:hidden"
          >
            <div className="px-4 pt-4 pb-8 space-y-6">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.dropdown ? (
                    <div className="space-y-4">
                      <span className="block px-3 py-1 text-[10px] text-primary/60 font-black uppercase tracking-[0.2em] border-l-2 border-primary/20">
                        {link.name} (30)
                      </span>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {link.dropdown.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 active:bg-primary/10 transition-colors"
                          >
                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#94A3B8]">
                              <sub.icon size={16} />
                            </div>
                            <span className="text-sm font-bold text-[#94A3B8]">{sub.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-4 text-lg text-white font-bold border-b border-white/5"
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4">
                <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white h-14 text-sm font-bold uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20">
                  <Link href="/contact" onClick={() => setIsOpen(false)}>Book a Consultation</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
