import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projects",
    description: "Explore the AI solutions, websites, dashboards, and brand platforms Automuk has built for founders, studios, and growing businesses.",
    keywords: ["automuk projects", "web design portfolio", "case studies", "AI solutions portfolio"],
    alternates: {
        canonical: "https://autom.uk/projects",
    },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    return <div className="w-full bg-background min-h-screen">{children}</div>;
}
