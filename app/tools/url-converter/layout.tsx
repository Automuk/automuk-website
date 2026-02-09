import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
    title: "URL Converter | Encode & Decode URL Online",
    description: "Quickly encode or decode URL components for safe web transmission with our free online URL Converter tool. Supports URI encoding for special characters.",
    keywords: ["url converter", "url encode", "url decode", "uri encoder", "online url tool", "percent encoding"],
    openGraph: {
        title: "URL Converter | Online URL Encoder & Decoder",
        description: "Fast and safe URL component encoding and decoding online.",
        url: "https://autom.uk/tools/url-converter",
        siteName: "Automuk",
        images: [{ url: "/og-url-converter.png", width: 1200, height: 630, alt: "URL Converter Tool Preview" }],
        locale: "en_US",
        type: "website",
    },
    alternates: {
        canonical: "https://autom.uk/tools/url-converter",
    },
};

export default function UrlConverterLayout({ children }: { children: React.ReactNode }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Automuk URL Converter",
        "description": "Professional online tool for URL component encoding and decoding.",
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Any",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "author": { "@type": "Organization", "name": "Automuk", "url": "https://autom.uk" }
    };

    return (
        <>
            <Script
                id="url-converter-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </>
    );
}
