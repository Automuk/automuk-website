import { Metadata } from "next";

export const metadata: Metadata = {
    title: "URL Converter",
    description: "Quickly encode or decode URL components for safe web transmission with our free online URL Converter tool.",
    keywords: ["url converter", "url encode", "url decode", "uri encoder", "online url tool"],
};

export default function UrlConverterLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
