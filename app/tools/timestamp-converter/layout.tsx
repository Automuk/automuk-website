import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Timestamp Converter",
    description: "Convert Unix timestamps to human-readable dates and vice versa. Free online epoch time converter with UTC support.",
    keywords: ["timestamp converter", "unix timestamp", "epoch converter", "date to timestamp", "unix time"],
};

export default function TimestampConverterLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
