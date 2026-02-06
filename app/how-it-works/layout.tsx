import { Metadata } from "next";

export const metadata: Metadata = {
    title: "How It Works",
    description: "Discover our systematic 4-step process for delivering high-impact AI and automation solutions tailored perfectly to your business requirements.",
    keywords: ["automation process", "AI implementation", "how we work", "automuk process", "software development lifecycle"],
};

export default function HowItWorksLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
