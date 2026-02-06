import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Markdown Previewer",
    description: "Live preview your markdown text and see how it renders with our free online Markdown Previewer tool.",
    keywords: ["markdown previewer", "markdown editor", "md preview", "online markdown tool", "render markdown"],
};

export default function MdPreviewerLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
