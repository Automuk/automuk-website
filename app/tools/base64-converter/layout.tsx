import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Base64 Converter | Online Encoder & Decoder",
    description: "Fast and secure online Base64 encoder and decoder. Convert text strings or files to Base64 and vice versa instantly.",
    keywords: ["base64 converter", "base64 encode", "base64 decode", "online base64", "base64 converter online", "base64 string converter"],
    openGraph: {
        title: "Base64 Converter | Online Encoder & Decoder",
        description: "Convert text or files to Base64 instantly and securely.",
        url: "https://autom.uk/tools/base64-converter",
        siteName: "Automuk",
        images: [{ url: "/og-base64-converter.png", width: 1200, height: 630, alt: "Base64 Converter Tool Preview" }],
        locale: "en_US",
        type: "website",
    },
    alternates: {
        canonical: "https://autom.uk/tools/base64-converter",
    },
};

export default function Base64ConverterLayout({ children }: { children: React.ReactNode }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Automuk Base64 Converter",
        "description": "Fast and secure online Base64 encoding and decoding tool.",
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Any",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "author": { "@type": "Organization", "name": "Automuk", "url": "https://autom.uk" }
    };

    return (
        <>
            <Script
                id="base64-converter-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </>
    );
}
