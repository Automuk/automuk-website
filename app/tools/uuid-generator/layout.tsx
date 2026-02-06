import { Metadata } from "next";

export const metadata: Metadata = {
    title: "UUID Generator",
    description: "Generate random UUID v4 identifiers instantly. Simple, fast, and secure online UUID generator.",
    keywords: ["uuid generator", "guid generator", "v4 uuid", "random id generator", "online tools"],
};

export default function UUIDGeneratorLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
