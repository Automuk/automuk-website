import { Metadata } from "next";

export const metadata: Metadata = {
    title: "QR Generator",
    description: "Create high-quality QR codes instantly with our free online QR Generator. Customize colors and size to fit your needs.",
    keywords: ["qr generator", "create qr code", "qr code creator", "online qr generator", "generate qr code"],
};

export default function QrGeneratorLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
