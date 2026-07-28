"use client";

import dynamic from "next/dynamic";

const HeroAnimation = dynamic(() => import("@/components/HeroAnimation"), { ssr: false });

export default function HeroAnimationClient() {
    return <HeroAnimation />;
}
