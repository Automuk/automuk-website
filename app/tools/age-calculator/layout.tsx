import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Age Calculator | Exact Age in Years, Months, & Days",
    description: "Calculate your exact age in years, months, and days. Simple online age calculator with countdown to your next birthday and life cycle stats.",
    keywords: ["age calculator", "calculate age online", "birthday countdown", "exact age", "how old am i", "chronological age"],
    openGraph: {
        title: "Age Calculator | Free Online Age Tracker",
        description: "Calculate your chronological age and next birthday countdown instantly.",
        url: "https://autom.uk/tools/age-calculator",
        siteName: "Automuk",
        images: [{ url: "/og-age-calculator.png", width: 1200, height: 630, alt: "Age Calculator Tool Preview" }],
        locale: "en_US",
        type: "website",
    },
    alternates: {
        canonical: "https://autom.uk/tools/age-calculator",
    },
};

export default function AgeCalculatorLayout({ children }: { children: React.ReactNode }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Automuk Age Calculator",
        "description": "Simple and accurate chronological age calculation tool.",
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Any",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "author": { "@type": "Organization", "name": "Automuk", "url": "https://autom.uk" }
    };

    return (
        <>
            <Script
                id="age-calculator-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </>
    );
}
