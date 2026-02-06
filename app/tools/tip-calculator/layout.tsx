import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tip Calculator",
    description: "Easily calculate tips and split bills with your friends using our free online Tip Calculator.",
    keywords: ["tip calculator", "bill splitter", "calculate tip online", "restaurant tip", "money tools"],
};

export default function TipCalculatorLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
