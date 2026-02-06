import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Case Converter",
    description: "Convert text between different character cases: UPPERCASE, lowercase, camelCase, snake_case, and more.",
    keywords: ["case converter", "text converter", "uppercase", "lowercase", "camelcase", "snake case"],
};

export default function CaseConverterLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
