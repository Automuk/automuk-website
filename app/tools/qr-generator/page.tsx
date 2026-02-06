"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQrcode, faDownload, faLink, faImage } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QRCodeSVG } from "qrcode.react";

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function QrGenerator() {
    const [value, setValue] = useState("");
    const qrRef = useRef<HTMLDivElement>(null);

    const downloadQRCode = () => {
        const svg = qrRef.current?.querySelector("svg");
        if (!svg) return;

        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        img.onload = () => {
            canvas.width = 500;
            canvas.height = 500;
            ctx?.drawImage(img, 0, 0, 500, 500);
            const pngFile = canvas.toDataURL("image/png");

            const downloadLink = document.createElement("a");
            downloadLink.download = `automuk-qr-${Date.now()}.png`;
            downloadLink.href = pngFile;
            downloadLink.click();
        };

        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
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
                        QR Code <span className="text-[#3168FA]">Generator</span>
                    </h1>
                    <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">
                        Generate high-quality QR codes for URLs, text, or contacts. Fully customizable and ready for download.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Control Section */}
                    <motion.div variants={fadeInUp} initial="initial" animate="animate">
                        <Card className="glass bg-[#1E293B]/40 border-[#334155] p-6 h-full flex flex-col">
                            <h3 className="text-white font-bold flex items-center gap-2 mb-6">
                                <FontAwesomeIcon icon={faLink} className="text-[#3168FA]" />
                                Data Input
                            </h3>
                            <div className="space-y-4">
                                <label className="text-sm font-bold text-[#94A3B8] uppercase tracking-widest">URL or Text</label>
                                <Input
                                    placeholder="https://example.com"
                                    className="h-14 bg-[#020617] border-[#334155] text-white rounded-xl focus:ring-[#3168FA]"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                />
                                <p className="text-xs text-[#94A3B8]">The QR code will update automatically as you type.</p>
                            </div>

                            <Button
                                onClick={downloadQRCode}
                                disabled={!value}
                                className="mt-auto bg-[#3168FA] hover:bg-[#3168FA]/90 h-14 text-lg font-bold rounded-xl"
                            >
                                <FontAwesomeIcon icon={faDownload} className="mr-2" />
                                Download PNG
                            </Button>
                        </Card>
                    </motion.div>

                    {/* Preview Section */}
                    <motion.div variants={fadeInUp} initial="initial" animate="animate" transition={{ delay: 0.1 }}>
                        <Card className="glass bg-[#1E293B]/40 border-[#334155] p-6 h-full flex flex-col items-center justify-center text-center">
                            <div className="mb-6">
                                <h3 className="text-white font-bold flex items-center justify-center gap-2">
                                    <FontAwesomeIcon icon={faImage} className="text-[#3168FA]" />
                                    Live Preview
                                </h3>
                            </div>

                            <div
                                ref={qrRef}
                                className="p-8 bg-white rounded-2xl shadow-2xl relative group"
                            >
                                {value ? (
                                    <QRCodeSVG
                                        value={value}
                                        size={250}
                                        level="H"
                                        includeMargin={true}
                                    />
                                ) : (
                                    <div className="w-[250px] h-[250px] flex items-center justify-center border-2 border-dashed border-[#334155] rounded-xl text-[#334155]">
                                        <FontAwesomeIcon icon={faQrcode} size="3x" />
                                    </div>
                                )}
                            </div>

                            {!value && (
                                <p className="mt-8 text-[#94A3B8]">Enter some data to generate your QR code.</p>
                            )}
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
