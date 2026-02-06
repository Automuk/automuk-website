import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Lorem Ipsum Generator",
    description: "Generate placeholder text for your designs and mockups. Professional and easy to use Lorem Ipsum generator.",
    keywords: ["lorem ipsum", "placeholder text", "dummy text", "text generator", "design tools"],
};

export default function LoremIpsumLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
