import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Lorem Ipsum Generator | Professional Placeholder Text Creator",
    description: "Generate high-quality placeholder text for your designs and mockups. Professional and easy to use Lorem Ipsum generator with word count and paragraph customization.",
    keywords: ["lorem ipsum", "placeholder text", "dummy text", "text generator", "design tools", "lorem ipsum generator"],
    openGraph: {
        title: "Lorem Ipsum Generator | Professional Placeholder Text",
        description: "Generate custom placeholder text for your creative projects instantly.",
        url: "https://autom.uk/tools/lorem-ipsum",
        siteName: "Automuk",
        images: [{ url: "/og-lorem-ipsum.png", width: 1200, height: 630, alt: "Lorem Ipsum Generator Tool Preview" }],
        locale: "en_US",
        type: "website",
    },
    alternates: {
        canonical: "https://autom.uk/tools/lorem-ipsum",
    },
};

export default function LoremIpsumLayout({ children }: { children: React.ReactNode }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Automuk Lorem Ipsum Generator",
        "description": "Fast and customizable online placeholder text generator.",
        "applicationCategory": "DesignApplication",
        "operatingSystem": "Any",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "author": { "@type": "Organization", "name": "Automuk", "url": "https://autom.uk" }
    };

    return (
        <>
            <Script
                id="lorem-ipsum-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </>
    );
}
