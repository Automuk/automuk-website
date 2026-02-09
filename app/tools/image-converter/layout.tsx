import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Image Converter | Fast Online Image Format Converter",
    description: "Convert images to different formats (WebP, PNG, JPEG) easily with our free online Image Converter tool. High-quality conversion without quality loss.",
    keywords: ["image converter", "webp converter", "convert png to webp", "image format converter", "online image tool", "convert jpg to png"],
    openGraph: {
        title: "Image Converter | Fast Online Image Conversion",
        description: "Free online tool to convert images between WebP, PNG, and JPEG instantly.",
        url: "https://autom.uk/tools/image-converter",
        siteName: "Automuk",
        images: [{ url: "/og-image-converter.png", width: 1200, height: 630, alt: "Image Converter Tool Preview" }],
        locale: "en_US",
        type: "website",
    },
    alternates: {
        canonical: "https://autom.uk/tools/image-converter",
    },
};

export default function ImageConverterLayout({ children }: { children: React.ReactNode }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Automuk Image Converter",
        "description": "Powerful online tool for image format conversion.",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Any",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "author": { "@type": "Organization", "name": "Automuk", "url": "https://autom.uk" }
    };

    return (
        <>
            <Script
                id="image-converter-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </>
    );
}
