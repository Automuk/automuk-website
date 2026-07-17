import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LenisProvider from "@/components/LenisProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Automuk | AI & Automation Freelance Studio",
    template: "%s | Automuk"
  },
  description: "Automating Work. Amplifying Growth. Custom AI agents, workflows, and developer tools.",
  keywords: ["AI automation", "workflow automation", "custom AI agents", "developer tools", "JSON prettier", "QR generator", "Regex tester"],
  authors: [{ name: "Automuk" }],
  creator: "Automuk",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://autom.uk",
    siteName: "Automuk",
    title: "Automuk | AI & Automation Freelance Studio",
    description: "Automating Work. Amplifying Growth. Custom AI agents and workflows.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Automuk" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Automuk | AI & Automation Freelance Studio",
    description: "Automating Work. Amplifying Growth. Custom AI agents and workflows.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "https://cdn.autom.uk/logo.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head />

      <body className="font-sans bg-[#020617] text-[#E5E7EB] antialiased">
        <LenisProvider>
          <Navbar />
          {children}
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}