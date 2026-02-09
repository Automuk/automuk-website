import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
    title: "JSON Prettier | Online JSON Formatter & Beautifier",
    description: "Format, beautify, and validate your JSON data instantly with our free online JSON Prettier tool. Clean, readable, and ready to use for developers.",
    keywords: ["json prettier", "json formatter", "json beautifier", "format json", "online json tool", "json validator"],
    openGraph: {
        title: "JSON Prettier | Online JSON Formatter",
        description: "Beautify and validate your JSON code instantly.",
        url: "https://autom.uk/tools/json-prettier",
        siteName: "Automuk",
        images: [{ url: "/og-json-prettier.png", width: 1200, height: 630, alt: "JSON Prettier Tool Preview" }],
        locale: "en_US",
        type: "website",
    },
    alternates: {
        canonical: "https://autom.uk/tools/json-prettier",
    },
};

export default function JsonPrettierLayout({ children }: { children: React.ReactNode }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Automuk JSON Prettier",
        "description": "Fast and secure online JSON formatter and beautifier.",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "author": { "@type": "Organization", "name": "Automuk", "url": "https://autom.uk" }
    };

    return (
        <>
            <Script
                id="json-prettier-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </>
    );
}
