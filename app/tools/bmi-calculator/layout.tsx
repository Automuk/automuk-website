import { Metadata } from "next";

export const metadata: Metadata = {
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index (BMI) easily with our free online health tool. Supports Metric and Imperial units.",
    keywords: ["bmi calculator", "body mass index", "health tool", "weight calculator", "fitness tools"],
};

export default function BMICalculatorLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
