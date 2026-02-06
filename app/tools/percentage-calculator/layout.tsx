import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Percentage Calculator",
    description: "Solve common percentage problems easily. Calculate percentage of a number, percentage increase or decrease, and more.",
    keywords: ["percentage calculator", "calculate percentage", "math tools", "percentage increase", "discount calculator"],
};

export default function PercentageCalculatorLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
