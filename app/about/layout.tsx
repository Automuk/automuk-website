import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us",
    description: "Learn about Automuk, an AI & Automation freelance studio dedicated to helping businesses grow through intelligent technology and streamlined workflows.",
    keywords: ["about automuk", "AI studio", "automation studio", "freelance AI developer", "automation agency"],
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
