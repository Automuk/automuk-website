import { Metadata } from "next";
import VideoDownloaderClient from "./page";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Free Video Downloader | Download from YouTube, Instagram & Twitch | Automuk Tool",
    description: "Download high-quality videos from YouTube, Instagram, and Twitch for free. Fast, secure, and no registration required. The ultimate professional video downloader tool by Automuk.",
    keywords: ["video downloader", "youtube downloader", "instagram video downloader", "twitch clip downloader", "free tools", "automuk", "download video online", "hd video downloader"],
    openGraph: {
        title: "Free Video Downloader | Automuk Professional Tools",
        description: "Fast and easy video downloader for YouTube, Instagram, and Twitch clips.",
        url: "https://autom.uk/tools/video-downloader",
        siteName: "Automuk",
        images: [
            {
                url: "/og-video-downloader.png",
                width: 1200,
                height: 630,
                alt: "Automuk Video Downloader Tool Preview",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Free Video Downloader | Automuk Tool",
        description: "Download YouTube, Instagram, and Twitch videos instantly.",
        images: ["/og-video-downloader.png"],
    },
    alternates: {
        canonical: "https://autom.uk/tools/video-downloader",
    },
};

export default function VideoDownloaderPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Automuk Video Downloader",
        "description": "A powerful, free online tool to download videos from YouTube, Instagram, and Twitch.",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Any",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "author": {
            "@type": "Organization",
            "name": "Automuk",
            "url": "https://autom.uk"
        },
        "featureList": [
            "YouTube Video Downloader",
            "Instagram Reel and Video Downloader",
            "Twitch Clip Downloader",
            "Multiple Quality Options",
            "Fast Downloads"
        ]
    };

    return (
        <>
            <Script
                id="video-downloader-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <VideoDownloaderClient />
        </>
    );
}
