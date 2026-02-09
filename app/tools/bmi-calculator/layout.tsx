import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
    title: "BMI Calculator | Online Body Mass Index Calculator",
    description: "Calculate your Body Mass Index (BMI) easily with our free online health tool. Supports Metric and Imperial units for weight and height tracking.",
    keywords: ["bmi calculator", "body mass index", "health tool", "weight calculator", "fitness tools", "calculate bmi online"],
    openGraph: {
        title: "BMI Calculator | Free Online Health Tool",
        description: "Quick and accurate Body Mass Index (BMI) calculation.",
        url: "https://autom.uk/tools/bmi-calculator",
        siteName: "Automuk",
        images: [{ url: "/og-bmi-calculator.png", width: 1200, height: 630, alt: "BMI Calculator Tool Preview" }],
        locale: "en_US",
        type: "website",
    },
    alternates: {
        canonical: "https://autom.uk/tools/bmi-calculator",
    },
};

export default function BMICalculatorLayout({ children }: { children: React.ReactNode }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Automuk BMI Calculator",
        "description": "Simple and accurate online Body Mass Index calculator.",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Any",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "author": { "@type": "Organization", "name": "Automuk", "url": "https://autom.uk" }
    };

    return (
        <>
            <Script
                id="bmi-calculator-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </>
    );
}
