"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, AlertCircle, CheckCircle2 } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faInstagram, faTwitch } from "@fortawesome/free-brands-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import LogoSVG from "@/components/ui/logo-svg";

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

type VideoInfo = {
    title: string;
    thumbnail: string;
    duration: number;
    uploader: string;
    platform: string;
    width?: number;
    height?: number;
    formats: Array<{
        formatId: string;
        quality: string;
        ext: string;
        filesize?: number;
    }>;
};


export default function VideoDownloader() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
    const [selectedFormat, setSelectedFormat] = useState("");
    const [error, setError] = useState("");

    const detectPlatform = (url: string) => {
        if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
        if (url.includes('instagram.com')) return 'instagram';
        if (url.includes('twitch.tv')) return 'twitch';
        return 'unknown';
    };

    const handleFetchInfo = async () => {
        if (!url) {
            setError("Please enter a video URL");
            return;
        }

        setLoading(true);
        setError("");
        setVideoInfo(null);

        try {
            const response = await fetch('/api/video-info', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch video info');
            }

            setVideoInfo(data);
            if (data.formats && data.formats.length > 0) {
                setSelectedFormat(data.formats[0].formatId);
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async () => {
        if (!url || !selectedFormat) return;

        setDownloading(true);
        setError("");

        try {
            const endpoint = '/api/video-download';
            const body = { url, formatId: selectedFormat };

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Download failed');
            }

            const contentDisposition = response.headers.get('Content-Disposition');
            const filename = contentDisposition
                ?.split('filename=')[1]
                ?.replace(/"/g, '') || 'video.mp4';

            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = filename;
            link.click();
            window.URL.revokeObjectURL(downloadUrl);
        } catch (err: any) {
            setError(err.message || 'Download failed');
        } finally {
            setDownloading(false);
        }
    };


    return (
        <div className="min-h-screen bg-[#00020C] pt-32 md:pt-10 md:pt-40 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={fadeInUp}
                    className="text-center mb-12 md:mb-16"
                >
                    <h1 className="text-3xl md:text-6xl font-black text-white mb-6 font-heading">
                        Video <span className="text-[#3168FA]">Downloader</span>
                    </h1>
                    <p className="text-[#94A3B8] text-base md:text-lg max-w-2xl mx-auto">
                        Download videos from YouTube, Instagram, and Twitch. Fast, easy, and free.
                    </p>

                    <div className="flex items-center justify-center gap-4 md:gap-6 mt-6 md:mt-8">
                        <div className="flex items-center gap-2 text-[#94A3B8]">
                            <FontAwesomeIcon icon={faYoutube} className="text-red-500 text-xl md:text-2xl" />
                            <span className="text-xs md:text-sm font-medium">YouTube</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#94A3B8]">
                            <FontAwesomeIcon icon={faInstagram} className="text-pink-500 text-xl md:text-2xl" />
                            <span className="text-xs md:text-sm font-medium">Instagram</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#94A3B8]">
                            <FontAwesomeIcon icon={faTwitch} className="text-purple-500 text-xl md:text-2xl" />
                            <span className="text-xs md:text-sm font-medium">Twitch</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div variants={fadeInUp} initial="initial" animate="animate" transition={{ delay: 0.1 }}>
                    <Card className="bg-[#1E293B]/40 border-[#334155] p-6 md:p-8">
                        <div className="space-y-4 md:space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest">Video URL</label>
                                <div className="flex gap-2">
                                    <Input
                                        type="text"
                                        placeholder="https://youtube.com/watch?v=..."
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        className="bg-[#020617] border-[#334155] h-12 md:h-14 rounded-xl text-white placeholder:text-[#475569]"
                                        onKeyDown={(e) => e.key === 'Enter' && handleFetchInfo()}
                                    />
                                    <Button
                                        onClick={handleFetchInfo}
                                        disabled={loading || !url}
                                        className="bg-[#3168FA] hover:bg-[#3168FA]/90 h-12 md:h-14 !px-4 rounded-xl font-bold shrink-0"
                                    >
                                        {loading ? (
                                            <div className="w-5 h-5">
                                                <LogoSVG animate={true} size={20} className="fill-white" />
                                            </div>
                                        ) : (
                                            <FontAwesomeIcon icon={faArrowDown} size="lg" />
                                        )}
                                    </Button>
                                </div>
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-2 p-3 md:p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
                                >
                                    <AlertCircle size={16} className="shrink-0" />
                                    <span>{error}</span>
                                </motion.div>
                            )}

                            <AnimatePresence>
                                {videoInfo && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="space-y-4 md:space-y-6"
                                    >
                                        <div className="flex items-start gap-4 p-4 bg-[#020617]/50 rounded-xl border border-[#334155]">
                                            <img
                                                src={videoInfo.thumbnail}
                                                alt={videoInfo.title}
                                                className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg shrink-0"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-white font-bold text-sm md:text-base mb-2 line-clamp-2">{videoInfo.title}</h3>
                                                <p className="text-[#94A3B8] text-xs md:text-sm mb-1">{videoInfo.uploader}</p>
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle2 size={14} className="text-emerald-400" />
                                                    <span className="text-emerald-400 text-xs font-medium">Video found</span>
                                                </div>
                                            </div>
                                        </div>

                                        {videoInfo.formats && videoInfo.formats.length > 0 && (
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest">Quality</label>
                                                <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                                                    <SelectTrigger className="bg-[#020617] border-[#334155] h-12 md:h-14 rounded-xl text-white">
                                                        <SelectValue placeholder="Select quality" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-[#1E293B] border-[#334155] text-white">
                                                        {videoInfo.formats.map((format) => (
                                                            <SelectItem key={format.formatId} value={format.formatId}>
                                                                <div className="flex items-center gap-2">
                                                                    <span className="font-bold">{format.quality}</span>
                                                                    <span className="text-xs text-[#94A3B8]">({format.ext})</span>
                                                                </div>
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        )}

                                        <Button
                                            onClick={handleDownload}
                                            disabled={downloading || !selectedFormat}
                                            className="w-full bg-gradient-to-r from-[#3168FA] to-[#5A8CFF] hover:from-[#2A5CE0] hover:to-[#4A7CFF] h-12 md:h-14 text-base md:text-lg font-bold rounded-xl text-white shadow-lg"
                                        >
                                            {downloading ? (
                                                <>
                                                    <div className="w-5 h-5 mr-2">
                                                        <LogoSVG animate={true} size={20} className="fill-white" />
                                                    </div>
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    <Download className="mr-2" size={20} />
                                                    Download Video
                                                </>
                                            )}
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}