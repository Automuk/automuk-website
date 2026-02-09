import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
    title: "QR Generator | Create Custom QR Codes Online",
    description: "Create high-quality, custom QR codes instantly with our free online QR Generator. Customize colors and size to fit your needs for any URL or text.",
    keywords: ["qr generator", "create qr code", "qr code creator", "online qr generator", "generate qr code", "custom qr code"],
    openGraph: {
        title: "QR Generator | Custom QR Code Creator",
        description: "Generate custom QR codes instantly for free.",
        url: "https://autom.uk/tools/qr-generator",
        siteName: "Automuk",
        images: [{ url: "/og-qr-generator.png", width: 1200, height: 630, alt: "QR Generator Tool Preview" }],
        locale: "en_US",
        type: "website",
    },
    alternates: {
        canonical: "https://autom.uk/tools/qr-generator",
    },
};

export default function QrGeneratorLayout({ children }: { children: React.ReactNode }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Automuk QR Generator",
        "description": "Easy to use online QR code generator with customization options.",
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Any",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "author": { "@type": "Organization", "name": "Automuk", "url": "https://autom.uk" }
    };

    return (
        <>
            <Script
                id="qr-generator-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </>
    );
}
