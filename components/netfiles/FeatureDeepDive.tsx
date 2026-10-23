"use client";

import React, { useState } from "react";
import {
  FolderTree,
  Cloud,
  Terminal,
  Download,
  ShieldCheck,
  Zap,
  CheckCircle2
} from "lucide-react";

interface FeaturePillar {
  id: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
  accent: string;
  bulletPoints: string[];
  techSpec: string;
  visualPreview: {
    label: string;
    items: { label: string; value: string; highlight?: boolean }[];
  };
}

export default function FeatureDeepDive() {
  const [activePillar, setActivePillar] = useState("explorer");

  const pillars: FeaturePillar[] = [
    {
      id: "explorer",
      badge: "Pure C++20 Win32 Performance",
      title: "Windows File Explorer on Steroids",
      tagline: "Ultra-responsive, dual-pane file management with zero latency and instant indexing.",
      description:
        "Standard Windows Explorer is notorious for freezing on network shares, heavy directories, and unzipping archives. NetFiles is built from the ground up in native C++ using asynchronous I/O completion ports (IOCP) and direct USN Journal / MFT parsing. Search 2 million files in 18 milliseconds.",
      icon: FolderTree,
      accent: "#3168FA",
      bulletPoints: [
        "True Dual-Pane & Multi-Tabbed browsing with vertical and horizontal splits",
        "MFT/USN Journal direct parser — search millions of local files instantaneously without background indexing thrash",
        "Over 60+ syntax-highlighted previews for source code, Markdown, CSV, 3D meshes, and RAW photography",
        "Advanced power tools: Regex batch renamer, duplicate finder, and instant Blake3/SHA256 checksums"
      ],
      techSpec: "Asynchronous Win32 IOCP + Native DirectStorage API + SIMD acceleration",
      visualPreview: {
        label: "Benchmark: 1,500,000 Local Files Search",
        items: [
          { label: "NetFiles (C++ USN Engine)", value: "18 ms", highlight: true },
          { label: "Windows 11 File Explorer", value: "4,600 ms" },
          { label: "RAM Footprint During Index", value: "24 MB vs 420 MB" }
        ]
      }
    },
    {
      id: "cloud",
      badge: "Unified Virtual Cloud Storage",
      title: "Google Drive, Dropbox & OneDrive in One Tree",
      tagline: "Access petabytes of cloud storage like local drives without wasting local SSD storage.",
      description:
        "Stop running 4 separate electron tray apps that hog 3GB of RAM just to sync files. NetFiles mounts Google Drive, Dropbox, OneDrive, Nextcloud, and AWS S3 directly into your file explorer using a zero-copy virtual filesystem. Files stream on demand. Copy 100GB directly between Google Drive and Dropbox server-to-server without eating your home internet bandwidth.",
      icon: Cloud,
      accent: "#CE77FB",
      bulletPoints: [
        "Native OAuth2 integration for Google Drive, Dropbox, Microsoft OneDrive, and AWS S3",
        "On-Demand Virtual File System: browse all remote files without syncing them to local disk first",
        "Direct Cloud-to-Cloud transfers: pipeline files between cloud providers without local disk caching",
        "Unified global search across both your local NVMe drives and all connected cloud accounts simultaneously"
      ],
      techSpec: "Multi-threaded libcurl + Chunked Streaming Pipeline + Local LRU Memory Cache",
      visualPreview: {
        label: "Multi-Cloud Direct Pipeline",
        items: [
          { label: "Google Drive to Dropbox 50GB Transfer", value: "Server-to-Server Direct", highlight: true },
          { label: "Local Bandwidth Consumed", value: "0 MB (Remote Pipe)" },
          { label: "Total RAM Used by 3 Cloud Providers", value: "18 MB vs 1.8 GB" }
        ]
      }
    },
    {
      id: "ssh",
      badge: "DevOps & Sysadmin Terminal",
      title: "SSH, SFTP & Hardware-Accelerated Terminal",
      tagline: "Direct remote server exploration, live in-place code editing, and integrated xterm.",
      description:
        "No need to juggle FileZilla and PuTTY or Windows Terminal anymore. NetFiles turns remote Linux servers, Docker containers, and Cloud VPS into first-class explorer drives. Drag files between your local C: drive, Google Drive, and your remote `/var/www` directory. Edit remote files directly with auto-save and pull down a full-speed terminal dock with a single keypress.",
      icon: Terminal,
      accent: "#10B981",
      bulletPoints: [
        "Native libssh2 multi-channel pipelining with modern cipher suites (ChaCha20, Ed25519)",
        "Direct in-place remote file editing: modify nginx configs and server scripts over SFTP with zero sync delay",
        "Dockable hardware-accelerated terminal emulator (xterm-compatible) inside the active explorer pane",
        "Integrated SSH key agent, Jump Host / ProxyJump support, and automated port tunneling"
      ],
      techSpec: "libssh2 + OpenSSL 3.0 + PTY Shell Bridging + GPU-rendered Terminal Text",
      visualPreview: {
        label: "Remote SFTP Performance (10Gbps Link)",
        items: [
          { label: "NetFiles Multi-stream SFTP", value: "980 MB/s", highlight: true },
          { label: "Standard FileZilla / WinSCP", value: "120 MB/s" },
          { label: "SSH Authentication", value: "Hardware FIDO2 / Ed25519" }
        ]
      }
    },
    {
      id: "torrent",
      badge: "Decentralized Swarm Search",
      title: "Built-in Torrent Search & P2P Downloader",
      tagline: "Query decentralized DHT swarms and download large files with multi-peer acceleration.",
      description:
        "Forget shady torrent client installers packed with adware and crypto miners. NetFiles integrates the high-performance C++ libtorrent engine directly. Search public torrent indexes and the decentralized DHT network right from your explorer search bar. Download multi-gigabyte ISOs, datasets, and archives at maximum line speed with multi-peer acceleration and automatic Blake3 piece verification.",
      icon: Download,
      accent: "#F59E0B",
      bulletPoints: [
        "Integrated search engine across decentralized Mainline DHT and verified public indexes",
        "Multi-Peer Swarm Acceleration: download multi-gigabyte archives and disk images at line speed",
        "High-performance libtorrent C++ core with full support for uTP, BEP-52 (BitTorrent v2), and IPv6",
        "Strict kill-switch integration: automatically bind torrent swarm I/O to your designated VPN network adapter"
      ],
      techSpec: "libtorrent-rasterbar 2.0 + Asynchronous boost::asio + Hardware Blake3 Hashing",
      visualPreview: {
        label: "Swarm Engine Performance",
        items: [
          { label: "Peak Swarm Throughput", value: "1.2 Gbps Line-Rate", highlight: true },
          { label: "Search Latency across DHT", value: "< 850 ms" },
          { label: "Adware / Bloat / Telemetry", value: "Zero (Open & Clean C++)" }
        ]
      }
    },
    {
      id: "security",
      badge: "Zero-Knowledge Local Architecture",
      title: "Military-Grade Security & Zero Telemetry",
      tagline: "Your files, SSH keys, and cloud tokens never touch our servers. Period.",
      description:
        "Modern cloud apps route your traffic through proprietary proxy servers and track your clicks. NetFiles is 100% local-first software. All cloud OAuth tokens and SSH private keys are encrypted locally using Windows DPAPI or the system keyring. There are no analytics, no phoning home, and no middleman servers.",
      icon: ShieldCheck,
      accent: "#06B6D4",
      bulletPoints: [
        "All credentials encrypted with AES-256-GCM backed by Windows DPAPI hardware enclave",
        "Zero middleman proxies — direct TLS 1.3 socket connections to Google, Dropbox, and your SSH hosts",
        "No background telemetry, no telemetry tracking, and no periodic user data collection",
        "Fully portable execution: run from a USB stick without writing anything to the Windows Registry"
      ],
      techSpec: "Windows DPAPI + AES-256-GCM Enclave + Zero-Trust Local Storage",
      visualPreview: {
        label: "Privacy & Encryption Audit",
        items: [
          { label: "Credential Storage", value: "Hardware DPAPI Enclave", highlight: true },
          { label: "Data Telemetry", value: "0 Bytes Collected" },
          { label: "Middleman Servers", value: "None (Direct Peer/Socket)" }
        ]
      }
    }
  ];

  const current = pillars.find((p) => p.id === activePillar) || pillars[0];

  return (
    <div className="w-full py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white mb-6 font-heading">
          Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient-flow">Power Users</span>
        </h2>
        <p className="text-base sm:text-xl text-[#94A3B8] leading-relaxed">
          Why settle for sluggish default tools and memory-hogging web apps? NetFiles merges five essential power tools into one ultra-optimized native binary.
        </p>
      </div>

      {/* Feature Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          const isActive = pillar.id === activePillar;
          return (
            <button
              key={pillar.id}
              onClick={() => setActivePillar(pillar.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                isActive
                  ? "bg-white text-[#00020C] shadow-[0_0_25px_rgba(255,255,255,0.3)] scale-105"
                  : "bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/5"
              }`}
            >
              <Icon size={16} style={{ color: isActive ? "#00020C" : pillar.accent }} />
              <span>{pillar.title.split(" ")[0]} {pillar.title.split(" ")[1] || ""}</span>
            </button>
          );
        })}
      </div>

      {/* Active Feature Display Card */}
      <div className="rounded-3xl border border-white/15 bg-gradient-to-b from-white/10 to-white/5 p-6 sm:p-10 md:p-12 shadow-[0_30px_90px_rgba(0,0,0,0.8)] backdrop-blur-xl relative overflow-hidden">
        {/* Glow backdrop */}
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-30 transition-all duration-700"
          style={{ background: current.accent }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left: Text & Features */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight font-heading">
              {current.title}
            </h3>

            <p className="text-lg text-white/90 font-medium leading-relaxed">
              {current.tagline}
            </p>

            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              {current.description}
            </p>

            <div className="space-y-3 pt-2">
              {current.bulletPoints.map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="shrink-0 mt-0.5" style={{ color: current.accent }} />
                  <span className="text-sm sm:text-base text-white/80">{point}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-white/50">
              <span className="text-white/40 uppercase tracking-widest font-bold">Tech Stack:</span>
              <span className="text-white/80 font-medium">{current.techSpec}</span>
            </div>
          </div>

          {/* Right: Interactive Spec / Benchmark Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-white/10 bg-[#070b14]/90 p-6 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    {current.visualPreview.label}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-white/40">Verified Spec</span>
              </div>

              <div className="space-y-4 font-mono text-xs">
                {current.visualPreview.items.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-1 transition ${
                      item.highlight
                        ? "bg-primary/20 border-primary/40 text-white shadow-[0_0_20px_rgba(49,104,250,0.2)]"
                        : "bg-white/5 border-white/5 text-white/70"
                    }`}
                  >
                    <span className="text-white/70">{item.label}</span>
                    <span className={`font-bold text-sm ${item.highlight ? "text-emerald-400" : "text-white/90"}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 text-xs text-white/70 leading-relaxed">
                <div className="flex items-center gap-2 text-white font-semibold mb-1">
                  <Zap size={14} className="text-amber-400" />
                  <span>Zero-Overhead Philosophy</span>
                </div>
                Compiled strictly with Microsoft Visual C++ MSVC &amp; GCC with <code className="text-primary font-mono text-[11px]">/O2 /LTCG /arch:AVX2</code> flags for maximal hardware throughput.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
