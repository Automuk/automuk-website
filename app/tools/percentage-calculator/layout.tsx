import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Percentage Calculator | Online Math Tool for Percentages",
    description: "Solve common percentage problems easily. Calculate percentage of a number, percentage increase or decrease, and more with our free online math tool.",
    keywords: ["percentage calculator", "calculate percentage", "math tools", "percentage increase", "discount calculator", "percent off calculator"],
    openGraph: {
        title: "Percentage Calculator | Free Online Math Utilities",
        description: "Quickly calculate percentages, increases, and decreases online.",
        url: "https://autom.uk/tools/percentage-calculator",
        siteName: "Automuk",
        images: [{ url: "/og-percentage-calculator.png", width: 1200, height: 630, alt: "Percentage Calculator Tool Preview" }],
        locale: "en_US",
        type: "website",
    },
    alternates: {
        canonical: "https://autom.uk/tools/percentage-calculator",
    },
};

export default function PercentageCalculatorLayout({ children }: { children: React.ReactNode }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Automuk Percentage Calculator",
        "description": "Powerful and easy to use online percentage calculation tool.",
        "applicationCategory": "MathApplication",
        "operatingSystem": "Any",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "author": { "@type": "Organization", "name": "Automuk", "url": "https://autom.uk" }
    };

    return (
        <>
            <Script
                id="percentage-calculator-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </>
    );
}
