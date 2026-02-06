import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Age Calculator",
    description: "Calculate your exact age in years, months, and days. Simple online age calculator with countdown to your next birthday.",
    keywords: ["age calculator", "calculate age online", "birthday countdown", "exact age", "how old am i"],
};

export default function AgeCalculatorLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
