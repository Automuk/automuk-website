"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Eye, Code, FileEdit, Layout } from "lucide-react";

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

const initialMarkdown = `# Markdown Previewer
## Features:
- **Live Preview:** See changes instantly.
- **GFM Support:** GitHub Flavored Markdown.
- **Modern UI:** Premium dark aesthetic.

### Code Example:
\`\`\`javascript
const greeting = "Hello Automuk!";
console.log(greeting);
\`\`\`

> "Simplicity is the soul of efficiency."
`;

export default function MarkdownPreviewer() {
    const [markdown, setMarkdown] = useState(initialMarkdown);
    const [viewMode, setViewMode] = useState<"split" | "edit" | "preview">("split");

    return (
        <div className="min-h-screen bg-[#00020C] pt-40 pb-20 px-4">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={fadeInUp}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 font-heading">
                        Markdown <span className="text-[#3168FA]">Previewer</span>
                    </h1>

                    <div className="flex justify-center gap-2 mb-8">
                        <Button
                            variant={viewMode === "split" ? "default" : "outline"}
                            onClick={() => setViewMode("split")}
                            className="rounded-full px-6"
                        >
                            <Layout className="mr-2 h-4 w-4" /> Split
                        </Button>
                        <Button
                            variant={viewMode === "edit" ? "default" : "outline"}
                            onClick={() => setViewMode("edit")}
                            className="rounded-full px-6"
                        >
                            <FileEdit className="mr-2 h-4 w-4" /> Editor
                        </Button>
                        <Button
                            variant={viewMode === "preview" ? "default" : "outline"}
                            onClick={() => setViewMode("preview")}
                            className="rounded-full px-6"
                        >
                            <Eye className="mr-2 h-4 w-4" /> Preview
                        </Button>
                    </div>
                </motion.div>

                <div className={`grid gap-8 ${viewMode === "split" ? "md:grid-cols-2" : "grid-cols-1"}`}>
                    {/* Editor */}
                    {(viewMode === "split" || viewMode === "edit") && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex flex-col h-[600px]"
                        >
                            <div className="flex items-center justify-between mb-4 px-2">
                                <span className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest flex items-center gap-2 font-heading">
                                    <Code size={14} className="text-[#3168FA]" />
                                    Markdown Editor
                                </span>
                            </div>
                            <Card className="bg-[#020617] border-[#334155] p-6 flex-grow shadow-2xl relative">
                                <Textarea
                                    className="h-full bg-transparent border-none text-white font-mono text-sm leading-relaxed focus-visible:ring-0 resize-none placeholder:text-[#334155]"
                                    value={markdown}
                                    onChange={(e) => setMarkdown(e.target.value)}
                                />
                            </Card>
                        </motion.div>
                    )}

                    {/* Preview */}
                    {(viewMode === "split" || viewMode === "preview") && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex flex-col h-[600px]"
                        >
                            <div className="flex items-center justify-between mb-4 px-2">
                                <span className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest flex items-center gap-2 font-heading">
                                    <Eye size={14} className="text-[#3168FA]" />
                                    Live Preview
                                </span>
                            </div>
                            <Card className="bg-[#020617] border-[#334155] p-8 flex-grow shadow-2xl overflow-y-auto prose prose-invert prose-blue max-w-none scrollbar-thin scrollbar-thumb-[#3168FA]/20 scrollbar-track-transparent">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {markdown}
                                </ReactMarkdown>
                            </Card>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Minimal Button component mockup since we are within write_to_file and don't want to import too many things if not needed, but wait, we have components/ui/button.tsx
import { Button } from "@/components/ui/button";
