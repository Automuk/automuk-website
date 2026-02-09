import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Regex Tester | Online Regular Expression Debugger & Validator",
    description: "Debug, test and validate your regular expressions in real-time with our free online Regex Tester. Supports Global, Case Insensitive, and Multiline flags. Works with JavaScript regex.",
    keywords: ["regex tester", "regular expression", "regex debugger", "regex online", "javascript regex", "regex validator", "test regex online"],
    openGraph: {
        title: "Regex Tester | Online Regular Expression Debugger",
        description: "Free online tool to test and debug your regular expressions in real-time.",
        url: "https://autom.uk/tools/regex-tester",
        siteName: "Automuk",
        images: [{ url: "/og-regex-tester.png", width: 1200, height: 630, alt: "Regex Tester Tool Preview" }],
        locale: "en_US",
        type: "website",
    },
    alternates: {
        canonical: "https://autom.uk/tools/regex-tester",
    },
};

export default function RegexTesterLayout({ children }: { children: React.ReactNode }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Automuk Regex Tester",
        "description": "Real-time regular expression debugger and validator for developers.",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "author": { "@type": "Organization", "name": "Automuk", "url": "https://autom.uk" }
    };

    return (
        <>
            <Script
                id="regex-tester-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </>
    );
}
