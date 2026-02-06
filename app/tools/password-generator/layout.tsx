import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Password Generator",
    description: "Generate strong, secure, and random passwords instantly with our free online Password Generator tool.",
    keywords: ["password generator", "secure password", "random password", "password creator", "generate password"],
};

export default function PasswordGeneratorLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
