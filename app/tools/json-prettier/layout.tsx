import { Metadata } from "next";

export const metadata: Metadata = {
    title: "JSON Prettier",
    description: "Format, beautify, and validate your JSON data instantly with our free online JSON Prettier tool. Clean, readable, and ready to use.",
    keywords: ["json prettier", "json formatter", "json beautifier", "format json", "online json tool"],
};

export default function JsonPrettierLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
