import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us",
    description: "Get in touch with Automuk to discuss your AI and automation needs. Book a free consultation and start growing your business today.",
    keywords: ["contact automuk", "book consultation", "hire AI developer", "automation consulting", "AI project inquiry"],
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
