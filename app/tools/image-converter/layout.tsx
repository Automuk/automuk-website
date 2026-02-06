import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Image Converter",
    description: "Convert images to different formats (WebP, PNG, JPEG) easily with our free online Image Converter tool.",
    keywords: ["image converter", "webp converter", "convert png to webp", "image format converter", "online image tool"],
};

export default function ImageConverterLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
