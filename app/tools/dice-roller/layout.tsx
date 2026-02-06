import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dice Roller",
    description: "Roll virtual dice for your games or random decisions. Professional online dice roller supporting D4, D6, D8, D10, D12, and D20.",
    keywords: ["dice roller", "online dice", "roll dice online", "dnd dice", "random number generator"],
};

export default function DiceRollerLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
