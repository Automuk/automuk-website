import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Base64 Converter",
    description: "Fast and secure online Base64 encoder and decoder. Convert text strings to Base64 and vice versa instantly.",
    keywords: ["base64 converter", "base64 encode", "base64 decode", "online base64", "base64 converter online"],
};

export default function Base64ConverterLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
