import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Unit Converter",
    description: "Convert between various units of length, weight, and temperature with our easy-to-use online unit converter.",
    keywords: ["unit converter", "metric to imperial", "length converter", "weight converter", "temperature converter"],
};

export default function UnitConverterLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
