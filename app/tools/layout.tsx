"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isIndexPage = pathname === "/tools";

    return (
        <div className="flex flex-col items-center w-full bg-[#00020C]">
            <div className="flex w-full justify-center">
                {/* Main Content */}
                <main className={`flex-1 w-full ${isIndexPage ? 'max-w-none px-0 md:px-12' : 'max-w-8xl'} relative z-10`}>
                    {children}
                </main>
            </div>
        </div>
    );
}
