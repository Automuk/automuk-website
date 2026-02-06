import {
    Code2, Hash, QrCode, Image as ImageIcon,
    Globe, Key, Type, FileText, ArrowLeftRight, Binary,
    DollarSign, Calendar, Percent, Dices, Ruler,
    Clock, Activity, Wand2, Search, Palette, GitCompare,
    Cpu, ShieldCheck, Radio, Lock, FileCode, FileSpreadsheet,
    Database, Timer, WholeWord
} from "lucide-react";

export type Tool = {
    name: string;
    href: string;
    icon: any;
    description: string;
    category: "Developer" | "Converter" | "Lifestyle" | "Math";
};

export const tools: Tool[] = [
    { name: "Regex Tester", href: "/tools/regex-tester", icon: Search, category: "Developer", description: "Test and debug regular expressions in real-time." },
    { name: "JSON Prettier", href: "/tools/json-prettier", icon: Code2, category: "Developer", description: "Format, validate, and beautify your JSON data." },
    { name: "QR Generator", href: "/tools/qr-generator", icon: QrCode, category: "Developer", description: "Create custom QR codes with ease." },
    { name: "Image Converter", href: "/tools/image-converter", icon: ImageIcon, category: "Converter", description: "Convert images between various formats instantly." },
    { name: "Base64 Converter", href: "/tools/base64-converter", icon: Binary, category: "Converter", description: "Encode and decode text or files to Base64." },
    { name: "URL Converter", href: "/tools/url-converter", icon: Globe, category: "Converter", description: "Safely encode and decode URLs for web use." },
    { name: "Password Generator", href: "/tools/password-generator", icon: Key, category: "Developer", description: "Generate secure, random passwords for your accounts." },
    { name: "Word Counter", href: "/tools/word-counter", icon: Type, category: "Developer", description: "Get word, character, and sentence statistics for your text." },
    { name: "Markdown Preview", href: "/tools/md-previewer", icon: FileText, category: "Developer", description: "Live preview and convert Markdown to HTML." },
    { name: "Case Converter", href: "/tools/case-converter", icon: ArrowLeftRight, category: "Converter", description: "Convert text between various letter cases like camelCase, snake_case, etc." },
    { name: "UUID Generator", href: "/tools/uuid-generator", icon: Hash, category: "Developer", description: "Generate unique version 4 UUIDs instantly." },
    { name: "Lorem Ipsum", href: "/tools/lorem-ipsum", icon: Wand2, category: "Developer", description: "Generate high-quality placeholder text for designs." },
    { name: "Unit Converter", href: "/tools/unit-converter", icon: Ruler, category: "Converter", description: "Convert between metric and imperial units of measurement." },
    { name: "Timestamp Converter", href: "/tools/timestamp-converter", icon: Clock, category: "Developer", description: "Transform Unix timestamps into human-readable dates." },
    { name: "BMI Calculator", href: "/tools/bmi-calculator", icon: Activity, category: "Lifestyle", description: "Calculate your Body Mass Index and assess health status." },
    { name: "Tip Calculator", href: "/tools/tip-calculator", icon: DollarSign, category: "Lifestyle", description: "Easily split bills and calculate tip amounts." },
    { name: "Age Calculator", href: "/tools/age-calculator", icon: Calendar, category: "Lifestyle", description: "Check your exact age and see days until your next birthday." },
    { name: "Percentage Calculator", href: "/tools/percentage-calculator", icon: Percent, category: "Math", description: "Solve common percentage problems quickly." },
    { name: "Dice Roller", href: "/tools/dice-roller", icon: Dices, category: "Lifestyle", description: "Roll virtual dice for games or decision making." },
    { name: "Color Converter", href: "/tools/color-converter", icon: Palette, category: "Converter", description: "Convert between HEX, RGB, HSL and more." },
    { name: "Diff Checker", href: "/tools/diff-checker", icon: GitCompare, category: "Developer", description: "Compare two pieces of text and see differences." },
    { name: "Binary Converter", href: "/tools/binary-converter", icon: Cpu, category: "Converter", description: "Convert numbers between Binary, Decimal, and Hex." },
    { name: "Hash Generator", href: "/tools/hash-generator", icon: ShieldCheck, category: "Developer", description: "Generate MD5, SHA-1, and SHA-256 hashes." },
    { name: "Morse Code", href: "/tools/morse-code", icon: Radio, category: "Converter", description: "Translate text to Morse code and back." },
    { name: "Password Strength", href: "/tools/password-strength", icon: Lock, category: "Developer", description: "Analyze the security of your passwords." },
    { name: "CSV to JSON", href: "/tools/csv-to-json", icon: FileCode, category: "Converter", description: "Convert CSV data into JSON format." },
    { name: "JSON to CSV", href: "/tools/json-to-csv", icon: FileSpreadsheet, category: "Converter", description: "Convert JSON data into CSV format." },
    { name: "SQL Formatter", href: "/tools/sql-formatter", icon: Database, category: "Developer", description: "Prettify and format SQL queries." },
    { name: "Stopwatch", href: "/tools/stopwatch", icon: Timer, category: "Lifestyle", description: "Simple and precise stopwatch for timing." },
    { name: "Number to Words", href: "/tools/number-to-words", icon: WholeWord, category: "Math", description: "Convert numbers into their word representation." },
];
