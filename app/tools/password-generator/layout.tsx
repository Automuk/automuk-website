import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Password Generator | Create Secure Random Passwords Online",
    description: "Generate strong, secure, and random passwords instantly with our free online Password Generator tool. Customize length and characters for maximum security.",
    keywords: ["password generator", "secure password", "random password", "password creator", "generate password", "strong password generator"],
    openGraph: {
        title: "Password Generator | Free Secure Password Creator",
        description: "Create strong and secure random passwords instantly.",
        url: "https://autom.uk/tools/password-generator",
        siteName: "Automuk",
        images: [{ url: "/og-password-generator.png", width: 1200, height: 630, alt: "Password Generator Tool Preview" }],
        locale: "en_US",
        type: "website",
    },
    alternates: {
        canonical: "https://autom.uk/tools/password-generator",
    },
};

export default function PasswordGeneratorLayout({ children }: { children: React.ReactNode }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Automuk Password Generator",
        "description": "Secure online tool for generating strong random passwords.",
        "applicationCategory": "SecurityApplication",
        "operatingSystem": "Any",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "author": { "@type": "Organization", "name": "Automuk", "url": "https://autom.uk" }
    };

    return (
        <>
            <Script
                id="password-generator-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </>
    );
}
