import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Word Counter",
    description: "Count words, characters, and sentences in your text instantly with our free online Word Counter tool.",
    keywords: ["word counter", "character counter", "text counter", "count words online", "word count tool"],
};

export default function WordCounterLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
