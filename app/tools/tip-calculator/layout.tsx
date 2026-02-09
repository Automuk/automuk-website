import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Tip Calculator | Online Bill Splitter & Tip Estimator",
    description: "Easily calculate tips and split bills with your friends using our free online Tip Calculator. Perfect for restaurants, cafes, and group outings.",
    keywords: ["tip calculator", "bill splitter", "calculate tip online", "restaurant tip", "money tools", "split bill online"],
    openGraph: {
        title: "Tip Calculator | Free Online Bill Splitter",
        description: "Quickly calculate tips and split bills with ease.",
        url: "https://autom.uk/tools/tip-calculator",
        siteName: "Automuk",
        images: [{ url: "/og-tip-calculator.png", width: 1200, height: 630, alt: "Tip Calculator Tool Preview" }],
        locale: "en_US",
        type: "website",
    },
    alternates: {
        canonical: "https://autom.uk/tools/tip-calculator",
    },
};

export default function TipCalculatorLayout({ children }: { children: React.ReactNode }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Automuk Tip Calculator",
        "description": "Fast and easy bill splitting and tip calculation tool.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "author": { "@type": "Organization", "name": "Automuk", "url": "https://autom.uk" }
    };

    return (
        <>
            <Script
                id="tip-calculator-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </>
    );
}
