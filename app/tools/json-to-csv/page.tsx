"use client";

import { useState } from "react";
import { FileSpreadsheet, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import LogoSVG from "@/components/ui/logo-svg";

/** Escape a single CSV value: wrap in quotes if it contains commas, quotes, or newlines. */
function escapeCSVValue(value: unknown): string {
    if (value === null || value === undefined) return "";
    const str = typeof value === "object" ? JSON.stringify(value) : String(value);

    if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
        return '"' + str.replace(/"/g, '""') + '"';
    }
    return str;
}

export default function JSONToCSV() {
    const [json, setJson] = useState("");
    const [csv, setCsv] = useState("");
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const convert = async () => {
        if (!json.trim()) {
            setCsv("Error: Please enter some JSON data.");
            return;
        }

        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));

        try {
            const data = JSON.parse(json);
            const array = Array.isArray(data) ? data : [data];

            if (array.length === 0) {
                setCsv("Error: JSON array is empty.");
                setLoading(false);
                return;
            }

            // Collect all unique keys across all objects
            const keys = Array.from(new Set(array.flatMap(obj => Object.keys(obj))));
            const header = keys.map(escapeCSVValue).join(",");
            const rows = array.map(obj =>
                keys.map(key => escapeCSVValue(obj[key])).join(",")
            );

            setCsv(header + "\r\n" + rows.join("\r\n"));
        } catch (e) {
            setCsv("Error: Invalid JSON format. Please provide a valid JSON array.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] py-32 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="space-y-12">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500">
                        <FileSpreadsheet size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-white uppercase tracking-tighter">JSON to CSV</h1>
                        <p className="text-[#94A3B8]">Convert JSON arrays into downloadable CSV spreadsheets.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[500px]">
                    <textarea
                        value={json}
                        onChange={(e) => setJson(e.target.value)}
                        placeholder={'[{"name":"Doe, John","age":28,"note":"said \\"hello\\""}]'}
                        className="w-full h-full bg-white/[0.03] border border-white/10 rounded-3xl p-8 text-white font-mono focus:border-green-500/50 outline-none resize-none"
                    />
                    <div className="relative h-full">
                        <div className="absolute top-4 right-4 z-10 flex gap-2">
                            <button onClick={() => {
                                navigator.clipboard.writeText(csv);
                                setCopied(true);
                                setTimeout(() => setCopied(false), 2000);
                            }} className="p-2 bg-white/5 rounded-lg hover:bg-white/10 text-[#475569] hover:text-white transition-all">
                                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                            </button>
                        </div>
                        <pre className="w-full h-full bg-white/[0.02] border border-white/5 rounded-3xl p-8 overflow-auto text-green-200/70 font-mono text-sm">
                            {csv || "// Your CSV will appear here..."}
                        </pre>
                    </div>
                </div>

                <Button onClick={convert} disabled={loading} className="w-full h-16 rounded-2xl text-lg font-bold bg-green-500 hover:bg-green-600">
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6">
                                <LogoSVG animate={true} size={24} className="fill-white" />
                            </div>
                            <span>Generating CSV...</span>
                        </div>
                    ) : (
                        "Generate CSV"
                    )}
                </Button>
            </div>
        </div>
    );
}
