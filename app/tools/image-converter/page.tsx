"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage, faDownload, faCloudUploadAlt, faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function ImageConverter() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [format, setFormat] = useState("image/png");
    const [converting, setConverting] = useState(false);
    const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected) {
            setFile(selected);
            setPreview(URL.createObjectURL(selected));
            setConvertedUrl(null);
        }
    };

    const handleConvert = async () => {
        if (!file) return;
        setConverting(true);

        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx?.drawImage(img, 0, 0);

            const dataUrl = canvas.toDataURL(format);
            setConvertedUrl(dataUrl);
            setConverting(false);
        };
    };

    const handleDownload = () => {
        if (!convertedUrl) return;
        const link = document.createElement("a");
        const ext = format.split("/")[1];
        link.download = `automuk-converted-${Date.now()}.${ext}`;
        link.href = convertedUrl;
        link.click();
    };

    return (
        <div className="min-h-screen bg-[#00020C] pt-40 pb-20 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={fadeInUp}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
                        Image <span className="text-[#3168FA]">Converter</span>
                    </h1>
                    <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">
                        Quickly convert images between PNG, JPG, and WEBP formats directly in your browser. Fast, secure, and private.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Upload Section */}
                    <motion.div variants={fadeInUp} initial="initial" animate="animate">
                        <Card className="glass bg-[#1E293B]/40 border-[#334155] p-6 h-full flex flex-col">
                            <h3 className="text-white font-bold flex items-center gap-2 mb-6">
                                <FontAwesomeIcon icon={faCloudUploadAlt} className="text-[#3168FA]" />
                                Upload Image
                            </h3>

                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="flex-1 min-h-[300px] border-2 border-dashed border-[#334155] rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-[#3168FA] hover:bg-[#3168FA]/5 transition-all group"
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                {preview ? (
                                    <div className="relative w-full h-full p-4">
                                        <img src={preview} alt="Preview" className="w-full h-full object-contain rounded-xl" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl">
                                            <p className="text-white font-bold">Change Image</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center p-8">
                                        <div className="w-16 h-16 bg-[#3168FA]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <FontAwesomeIcon icon={faFileImage} className="text-[#3168FA] text-2xl" />
                                        </div>
                                        <p className="text-white font-bold">Click or Drag & Drop</p>
                                        <p className="text-[#94A3B8] text-sm mt-2">Supports PNG, JPG, WEBP, and more</p>
                                    </div>
                                )}
                            </div>

                            {file && (
                                <div className="mt-6 flex flex-col space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest">Target Format</label>
                                        <Select value={format} onValueChange={setFormat}>
                                            <SelectTrigger className="bg-[#020617] border-[#334155] h-12 rounded-xl text-white">
                                                <SelectValue placeholder="Select format" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#1E293B] border-[#334155] text-white">
                                                <SelectItem value="image/png">PNG</SelectItem>
                                                <SelectItem value="image/jpeg">JPEG / JPG</SelectItem>
                                                <SelectItem value="image/webp">WEBP</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Button
                                        onClick={handleConvert}
                                        loading={converting}
                                        className="bg-[#3168FA] hover:bg-[#3168FA]/90 h-14 text-lg font-bold rounded-xl"
                                    >
                                        <FontAwesomeIcon icon={faSyncAlt} className={`mr-2 ${converting ? "animate-spin" : ""}`} />
                                        {converting ? "Converting..." : "Convert Now"}
                                    </Button>
                                </div>
                            )}
                        </Card>
                    </motion.div>

                    {/* Result Section */}
                    <motion.div variants={fadeInUp} initial="initial" animate="animate" transition={{ delay: 0.1 }}>
                        <Card className="glass bg-[#1E293B]/40 border-[#334155] p-6 h-full flex flex-col items-center justify-center text-center">
                            <h3 className="text-white font-bold mb-6">Converted Result</h3>

                            {convertedUrl ? (
                                <div className="w-full flex-1 flex flex-col items-center justify-center">
                                    <div className="relative max-w-full max-h-[400px] mb-8 group">
                                        <img src={convertedUrl} alt="Converted" className="max-w-full max-h-[400px] object-contain rounded-xl shadow-2xl" />
                                        <div className="absolute top-4 right-4 bg-[#3168FA] text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">
                                            {format.split("/")[1]}
                                        </div>
                                    </div>
                                    <Button
                                        onClick={handleDownload}
                                        className="w-full bg-emerald-500 hover:bg-emerald-600 h-14 text-lg font-bold rounded-xl"
                                    >
                                        <FontAwesomeIcon icon={faDownload} className="mr-2" />
                                        Download Converted Image
                                    </Button>
                                </div>
                            ) : (
                                <div className="text-center p-12 opacity-40">
                                    <FontAwesomeIcon icon={faSyncAlt} size="4x" className="text-[#334155] mb-6" />
                                    <p className="text-white font-bold">Waiting for conversion...</p>
                                    <p className="text-[#94A3B8] text-sm mt-2">Upload an image and click convert to see the result.</p>
                                </div>
                            )}
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
