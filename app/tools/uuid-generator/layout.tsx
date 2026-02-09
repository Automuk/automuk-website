import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
    title: "UUID Generator | Online Random UUID v4 Generator",
    description: "Generate random UUID v4 identifiers instantly. Simple, fast, and secure online UUID generator for developers and system administrators.",
    keywords: ["uuid generator", "guid generator", "v4 uuid", "random id generator", "online tools", "generate uuid online"],
    openGraph: {
        title: "UUID Generator | Free Online UUID v4 Creator",
        description: "Generate secure, random UUID v4 identifiers instantly.",
        url: "https://autom.uk/tools/uuid-generator",
        siteName: "Automuk",
        images: [{ url: "/og-uuid-generator.png", width: 1200, height: 630, alt: "UUID Generator Tool Preview" }],
        locale: "en_US",
        type: "website",
    },
    alternates: {
        canonical: "https://autom.uk/tools/uuid-generator",
    },
};

export default function UUIDGeneratorLayout({ children }: { children: React.ReactNode }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Automuk UUID Generator",
        "description": "Fast and secure online UUID version 4 generation tool.",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "author": { "@type": "Organization", "name": "Automuk", "url": "https://autom.uk" }
    };

    return (
        <>
            <Script
                id="uuid-generator-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </>
    );
}
