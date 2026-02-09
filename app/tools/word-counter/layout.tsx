import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Word Counter | Online Word, Character & Sentence Count",
    description: "Count words, characters, and sentences in your text instantly with our free online Word Counter tool. Professional statistics for writers and editors.",
    keywords: ["word counter", "character counter", "text counter", "count words online", "word count tool", "writing statistics"],
    openGraph: {
        title: "Word Counter | Free Online Text Statistics",
        description: "Get instant word, character, and sentence counts for your text.",
        url: "https://autom.uk/tools/word-counter",
        siteName: "Automuk",
        images: [{ url: "/og-word-counter.png", width: 1200, height: 630, alt: "Word Counter Tool Preview" }],
        locale: "en_US",
        type: "website",
    },
    alternates: {
        canonical: "https://autom.uk/tools/word-counter",
    },
};

export default function WordCounterLayout({ children }: { children: React.ReactNode }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Automuk Word Counter",
        "description": "Fast and accurate online text statistics and word counting tool.",
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Any",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "author": { "@type": "Organization", "name": "Automuk", "url": "https://autom.uk" }
    };

    return (
        <>
            <Script
                id="word-counter-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </>
    );
}
