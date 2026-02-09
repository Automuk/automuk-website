"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage, faDownload, faCloudUploadAlt, faSyncAlt, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import imageCompression from 'browser-image-compression';
import LogoSVG from "@/components/ui/logo-svg";

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const formatOptions = [
    { value: "image/png", label: "PNG", extension: "png" },
    { value: "image/jpeg", label: "JPEG", extension: "jpg" },
    { value: "image/webp", label: "WEBP", extension: "webp" },
    { value: "image/avif", label: "AVIF", extension: "avif" },
    { value: "image/bmp", label: "BMP", extension: "bmp" },
];

export default function ImageConverter() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [format, setFormat] = useState("image/webp");
    const [quality, setQuality] = useState(80);
    const [converting, setConverting] = useState(false);
    const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
    const [originalSize, setOriginalSize] = useState(0);
    const [convertedSize, setConvertedSize] = useState(0);
    const [conversionTime, setConversionTime] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected) {
            setFile(selected);
            setPreview(URL.createObjectURL(selected));
            setOriginalSize(selected.size);
            setConvertedUrl(null);
            setConvertedSize(0);
        }
    };

    const formatBytes = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    const handleConvert = async () => {
        if (!file) return;
        setConverting(true);
        const startTime = performance.now();

        try {
            const selectedFormat = formatOptions.find(f => f.value === format);

            if (format === 'image/avif' || format === 'image/webp') {
                // Use browser-image-compression for modern formats
                const options = {
                    maxSizeMB: 100,
                    useWebWorker: true,
                    fileType: format,
                    initialQuality: quality / 100,
                };

                const compressedFile = await imageCompression(file, options);
                const url = URL.createObjectURL(compressedFile);
                setConvertedUrl(url);
                setConvertedSize(compressedFile.size);
            } else {
                // Fallback to Canvas API for other formats
                const img = new Image();
                img.src = URL.createObjectURL(file);

                await new Promise((resolve, reject) => {
                    img.onload = () => {
                        const canvas = document.createElement("canvas");
                        canvas.width = img.width;
                        canvas.height = img.height;
                        const ctx = canvas.getContext("2d");
                        ctx?.drawImage(img, 0, 0);

                        canvas.toBlob((blob) => {
                            if (blob) {
                                const url = URL.createObjectURL(blob);
                                setConvertedUrl(url);
                                setConvertedSize(blob.size);
                                resolve(url);
                            } else {
                                reject(new Error('Conversion failed'));
                            }
                        }, format, quality / 100);
                    };
                    img.onerror = reject;
                });
            }

            const endTime = performance.now();
            setConversionTime(Math.round(endTime - startTime));
        } catch (error) {
            console.error('Conversion error:', error);
            alert('Conversion failed. Please try a different format or image.');
        } finally {
            setConverting(false);
        }
    };

    const handleDownload = () => {
        if (!convertedUrl) return;
        const link = document.createElement("a");
        const selectedFormat = formatOptions.find(f => f.value === format);
        link.download = `automuk-converted-${Date.now()}.${selectedFormat?.extension || 'png'}`;
        link.href = convertedUrl;
        link.click();
    };

    const isLossyFormat = format === 'image/jpeg' || format === 'image/webp' || format === 'image/avif';
    const selectedFormatInfo = formatOptions.find(f => f.value === format);
    const compressionRatio = convertedSize > 0 ? ((1 - convertedSize / originalSize) * 100).toFixed(1) : 0;

    return (
        <div className="min-h-screen bg-[#00020C] pt-32 md:pt-40 pb-20 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={fadeInUp}
                    className="text-center mb-12 md:mb-16"
                >
                    <h1 className="text-3xl md:text-6xl font-black text-white mb-6">
                        Image <span className="text-[#3168FA]">Converter</span>
                    </h1>
                    <p className="text-[#94A3B8] text-base md:text-lg max-w-2xl mx-auto">
                        Convert images to PNG, JPEG, WEBP, AVIF, and BMP formats with quality control. Fast, secure, and private—all processing happens in your browser.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
                    {/* Upload Section */}
                    <motion.div variants={fadeInUp} initial="initial" animate="animate">
                        <Card className="glass bg-[#1E293B]/40 border-[#334155] p-4 md:p-6 h-full flex flex-col">
                            <h3 className="text-white font-bold flex items-center gap-2 mb-6">
                                <FontAwesomeIcon icon={faCloudUploadAlt} className="text-[#3168FA]" />
                                Upload Image
                            </h3>

                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="flex-1 min-h-[250px] md:min-h-[300px] border-2 border-dashed border-[#334155] rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-[#3168FA] hover:bg-[#3168FA]/5 transition-all group"
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
                                            <p className="text-white font-bold text-sm md:text-base">Change Image</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center p-6 md:p-8">
                                        <div className="w-14 h-14 md:w-16 md:h-16 bg-[#3168FA]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <FontAwesomeIcon icon={faFileImage} className="text-[#3168FA] text-xl md:text-2xl" />
                                        </div>
                                        <p className="text-white font-bold text-sm md:text-base">Click or Drag & Drop</p>
                                        <p className="text-[#94A3B8] text-xs md:text-sm mt-2">Supports all image formats</p>
                                    </div>
                                )}
                            </div>

                            {file && (
                                <div className="mt-6 space-y-4">
                                    <div className="p-3 md:p-4 bg-[#020617]/50 rounded-xl border border-[#334155]">
                                        <p className="text-xs text-[#94A3B8] mb-1">Original Size</p>
                                        <p className="text-white font-bold text-sm md:text-base">{formatBytes(originalSize)}</p>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest">Target Format</label>
                                        <Select value={format} onValueChange={setFormat}>
                                            <SelectTrigger className="bg-[#020617] border-[#334155] h-11 md:h-12 rounded-lg text-white mt-2 p-4">
                                                <SelectValue placeholder="Select format" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#1E293B] border-[#334155] text-white">
                                                {formatOptions.map(option => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        <div>
                                                            <div className="font-bold">{option.label}</div>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {isLossyFormat && (
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest">Quality</label>
                                                <span className="text-white font-bold text-sm md:text-base">{quality}%</span>
                                            </div>
                                            <Slider
                                                value={[quality]}
                                                onValueChange={(values) => setQuality(values[0])}
                                                min={1}
                                                max={100}
                                                step={1}
                                                className="w-full"
                                            />
                                            <p className="text-[#94A3B8] text-xs flex items-center gap-1">
                                                <FontAwesomeIcon icon={faInfoCircle} className="text-[#3168FA]" />
                                                Higher quality = larger file size
                                            </p>
                                        </div>
                                    )}

                                    <Button
                                        onClick={handleConvert}
                                        disabled={converting}
                                        className="w-full bg-[#3168FA] hover:bg-[#3168FA]/90 h-12 md:h-14 text-base md:text-lg font-bold rounded-xl disabled:opacity-50"
                                    >
                                        {converting ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5">
                                                    <LogoSVG animate={true} size={20} />
                                                </div>
                                                <span>Converting...</span>
                                            </div>
                                        ) : (
                                            <>
                                                <FontAwesomeIcon icon={faSyncAlt} className="mr-2" />
                                                Convert Now
                                            </>
                                        )}
                                    </Button>
                                </div>
                            )}
                        </Card>
                    </motion.div>

                    {/* Result Section */}
                    <motion.div variants={fadeInUp} initial="initial" animate="animate" transition={{ delay: 0.1 }}>
                        <Card className="glass bg-[#1E293B]/40 border-[#334155] p-4 md:p-6 h-full flex flex-col items-center justify-center text-center">
                            <h3 className="text-white font-bold mb-6">Converted Result</h3>

                            {convertedUrl ? (
                                <div className="w-full flex-1 flex flex-col items-center justify-center">
                                    <div className="relative max-w-full max-h-[300px] md:max-h-[400px] mb-6 md:mb-8 group">
                                        <img src={convertedUrl} alt="Converted" className="max-w-full max-h-[300px] md:max-h-[400px] object-contain rounded-xl shadow-2xl" />
                                        <div className="absolute top-4 right-4 bg-[#3168FA] text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">
                                            {selectedFormatInfo?.extension}
                                        </div>
                                    </div>

                                    <div className="w-full grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
                                        <div className="p-3 md:p-4 bg-[#020617]/50 rounded-xl border border-[#334155]">
                                            <p className="text-xs text-[#94A3B8] mb-1">New Size</p>
                                            <p className="text-emerald-400 font-bold text-sm md:text-base">{formatBytes(convertedSize)}</p>
                                        </div>
                                        <div className="p-3 md:p-4 bg-[#020617]/50 rounded-xl border border-[#334155]">
                                            <p className="text-xs text-[#94A3B8] mb-1">Saved</p>
                                            <p className="text-emerald-400 font-bold text-sm md:text-base">{compressionRatio}%</p>
                                        </div>
                                    </div>

                                    {conversionTime > 0 && (
                                        <p className="text-[#94A3B8] text-xs mb-4">Converted in {conversionTime}ms</p>
                                    )}

                                    <Button
                                        onClick={handleDownload}
                                        className="w-full bg-emerald-500 hover:bg-emerald-600 h-12 md:h-14 text-base md:text-lg font-bold rounded-xl"
                                    >
                                        <FontAwesomeIcon icon={faDownload} className="mr-2" />
                                        Download Converted Image
                                    </Button>
                                </div>
                            ) : (
                                <div className="text-center p-8 md:p-12 opacity-40">
                                    <FontAwesomeIcon icon={faSyncAlt} size="4x" className="text-[#334155] mb-6" />
                                    <p className="text-white font-bold text-sm md:text-base">Waiting for conversion...</p>
                                    <p className="text-[#94A3B8] text-xs md:text-sm mt-2">Upload an image and click convert to see the result.</p>
                                </div>
                            )}
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
