import { Metadata } from "next";
import Script from "next/script";
import CinematicHero from "@/components/netfiles/CinematicHero";
import CinematicScrollJourney from "@/components/netfiles/CinematicScrollJourney";
import ComparisonMatrix from "@/components/netfiles/ComparisonMatrix";
import FaqSection from "@/components/netfiles/FaqSection";
import DownloadSection from "@/components/netfiles/DownloadSection";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "NetFiles | C++ Desktop File Explorer on Steroids (SSH, Cloud & Torrents)",
  description:
    "Windows File Explorer reimagined in native C++. Connect SSH servers, mount Google Drive and Dropbox via PKCE with zero local disk usage, integrate local OneDrive, and search/stream decentralized torrents.",
  keywords: [
    "NetFiles",
    "C++ file explorer",
    "Windows file explorer alternative",
    "SSH file manager",
    "SFTP desktop client",
    "Google Drive desktop explorer",
    "Dropbox mount",
    "OneDrive local integration",
    "Torrent search desktop app",
    "stream torrents while downloading",
    "native C++ desktop app",
    "dual pane file manager"
  ],
  alternates: {
    canonical: "https://autom.uk/netfiles",
  },
  openGraph: {
    title: "NetFiles | Windows File Explorer on Steroids (C++ Native)",
    description:
      "Native C++ file manager combining local NVMe indexing, remote SSH/SFTP servers, unified Google Drive & Dropbox, and decentralized torrent search into one ultra-fast workspace.",
    url: "https://autom.uk/netfiles",
    siteName: "Automuk",
    images: [
      {
        url: "/netfiles_hero.jpg",
        width: 1280,
        height: 800,
        alt: "NetFiles - Windows File Explorer on Steroids",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NetFiles | C++ File Explorer on Steroids",
    description:
      "Ultra-low latency C++ file manager for local NVMe drives, SSH servers, cloud storage, and decentralized torrent swarms.",
    images: ["/netfiles_hero.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "NetFiles",
  "softwareVersion": "1.0.0",
  "downloadUrl": "https://cdn.autom.uk/NetFiles-1.0.0-Setup.msi",
  "operatingSystem": "Windows 10, Windows 11",
  "applicationCategory": "UtilitiesApplication",
  "description":
    "High-performance native C++ desktop file manager with built-in SSH/SFTP, unified Google Drive & Dropbox PKCE virtual file system, local OneDrive integration, and decentralized P2P torrent streaming downloader with custom search API URL support.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
  },
  "publisher": {
    "@type": "Organization",
    "name": "Automuk",
    "url": "https://autom.uk"
  }
};

export default function NetFilesPage() {
  return (
    <div className="flex flex-col w-full bg-[#00020C] text-[#E5E7EB] min-h-screen selection:bg-primary selection:text-white overflow-x-clip">
      <Script
        id="netfiles-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Cinematic Hero Section with 3D Tilt Showcase of public/netfiles_hero.jpg */}
      <CinematicHero />

      {/* Scroll-Locked Crossfading Chapters (Awwwards-style section pinning) */}
      <CinematicScrollJourney />

      {/* Head-to-Head Comparison Matrix */}
      <section className="relative z-10 py-10 bg-gradient-to-b from-[#00020C] via-[#050917] to-[#00020C]">
        <ComparisonMatrix />
      </section>

      {/* Technical FAQ Accordion */}
      <section className="relative z-10 py-10">
        <FaqSection />
      </section>

      {/* Production Download & Verification */}
      <section className="relative z-10 py-10">
        <DownloadSection />
      </section>
    </div>
  );
}
