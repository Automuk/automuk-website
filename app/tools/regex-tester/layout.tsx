import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Regex Tester",
    description: "Debug and validate your regular expressions in real-time with our free online Regex Tester. Supports Global, Case Insensitive, and Multiline flags.",
    keywords: ["regex tester", "regular expression", "regex debugger", "regex online", "javascript regex"],
};

export default function RegexTesterLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
