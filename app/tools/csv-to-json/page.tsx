"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileCode, FileSpreadsheet, Copy, Check, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CSVToJSON() {
    const [csv, setCsv] = useState("");
    const [json, setJson] = useState("");
    const [copied, setCopied] = useState(false);

    const convert = () => {
        try {
            const lines = csv.split("\n");
            const result = [];
            const headers = lines[0].split(",");

            for (let i = 1; i < lines.length; i++) {
                if (!lines[i]) continue;
                const obj: any = {};
                const currentline = lines[i].split(",");

                for (let j = 0; j < headers.length; j++) {
                    obj[headers[j].trim()] = currentline[j]?.trim();
                }
                result.push(obj);
            }
            setJson(JSON.stringify(result, null, 2));
        } catch (e) {
            setJson("Error: Invalid CSV format.");
        }
    };

    return (
        <div className="min-h-[80vh] py-32 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="space-y-12">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                        <FileCode size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-white uppercase tracking-tighter">CSV to JSON</h1>
                        <p className="text-[#94A3B8]">Transform spreadsheet data into structured JSON objects.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[500px]">
                    <textarea
                        value={csv}
                        onChange={(e) => setCsv(e.target.value)}
                        placeholder="Name,Email,Age\nJohn Doe,john@example.com,28"
                        className="w-full h-full bg-white/[0.03] border border-white/10 rounded-3xl p-8 text-white font-mono focus:border-orange-500/50 outline-none resize-none"
                    />
                    <div className="relative h-full">
                        <div className="absolute top-4 right-4 z-10 flex gap-2">
                            <button onClick={() => {
                                navigator.clipboard.writeText(json);
                                setCopied(true);
                                setTimeout(() => setCopied(false), 2000);
                            }} className="p-2 bg-white/5 rounded-lg hover:bg-white/10 text-[#475569] hover:text-white transition-all">
                                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                            </button>
                        </div>
                        <pre className="w-full h-full bg-white/[0.02] border border-white/5 rounded-3xl p-8 overflow-auto text-orange-200/70 font-mono text-sm">
                            {json || "// Your JSON will appear here..."}
                        </pre>
                    </div>
                </div>

                <Button onClick={convert} className="w-full h-16 rounded-2xl text-lg font-bold bg-orange-500 hover:bg-orange-600">
                    Convert Data
                </Button>
            </div>
        </div>
    );
}
