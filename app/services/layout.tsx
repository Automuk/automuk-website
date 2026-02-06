import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Services",
    description: "Explore our specialized AI solutions, workflow automation, and custom software services designed to scale your business operations.",
    keywords: ["AI solutions", "workflow automation", "custom software", "business automation", "automuk services"],
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
