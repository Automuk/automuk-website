"use client";

import { motion } from "framer-motion";
import LogoSVG from "./logo-svg";

export default function Loader() {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#00020C]">
            <div className="relative w-24 h-24">
                <LogoSVG animate={true} />
                <motion.div
                    className="absolute inset-0 bg-[#3168FA]/20 blur-2xl rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>
        </div>
    );
}
