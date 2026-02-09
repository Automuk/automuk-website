import { Metadata } from "next";
import NumberToWordsClient from "./page";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Number to Words Converter | Online Number to Text Generator",
    description: "Instantly convert numbers into human-readable text. Professional online tool for converting numerical values into words for checks, legal documents, and education.",
    keywords: ["number to words", "convert numbers to text", "numerical to words", "check writing tool", "math tools online", "number to word converter"],
    openGraph: {
        title: "Number to Words Converter | Free Online Math Tool",
        description: "Convert any numerical value into human-readable words instantly.",
        url: "https://autom.uk/tools/number-to-words",
        siteName: "Automuk",
        images: [{ url: "/og-number-to-words.png", width: 1200, height: 630, alt: "Number to Words Tool Preview" }],
        locale: "en_US",
        type: "website",
    },
    alternates: {
        canonical: "https://autom.uk/tools/number-to-words",
    },
};

export default function NumberToWordsPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Automuk Number to Words Converter",
        "description": "Fast and accurate tool for converting numbers into word representation.",
        "applicationCategory": "MathApplication",
        "operatingSystem": "Any",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "author": { "@type": "Organization", "name": "Automuk", "url": "https://autom.uk" }
    };

    return (
        <>
            <Script
                id="number-to-words-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <NumberToWordsClient />
        </>
    );
}
