"use client";

import React, { useState, useMemo } from "react";
import {
  Folder,
  FileCode,
  FileText,
  FileArchive,
  HardDrive,
  Cloud,
  Terminal,
  Download,
  Search,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Zap,
  Play,
  Server,
  SplitSquareVertical,
  Cpu,
  ChevronRight,
  Sliders,
  Eye,
  Hash,
  Share2
} from "lucide-react";

type TabMode = "local" | "cloud" | "ssh" | "torrent";

interface FileItem {
  id: string;
  name: string;
  type: "folder" | "code" | "archive" | "media" | "document" | "binary";
  size: string;
  modified: string;
  badge?: string;
  badgeColor?: string;
}

// Static dataset definitions
const LOCAL_FILES: FileItem[] = [
  { id: "1", name: "src/engine_core.cpp", type: "code", size: "48.2 KB", modified: "Just now", badge: "C++20", badgeColor: "bg-blue-500/20 text-blue-400" },
  { id: "2", name: "src/torrent_swarm.hpp", type: "code", size: "22.6 KB", modified: "2 mins ago", badge: "libtorrent", badgeColor: "bg-emerald-500/20 text-emerald-400" },
  { id: "3", name: "build_win64_release.exe", type: "binary", size: "14.2 MB", modified: "10 mins ago", badge: "Optimized", badgeColor: "bg-purple-500/20 text-purple-400" },
  { id: "4", name: "assets_bundle.tar.zst", type: "archive", size: "1.2 GB", modified: "Today 14:20", badge: "Zstandard", badgeColor: "bg-amber-500/20 text-amber-400" },
  { id: "5", name: "architecture_specs.md", type: "document", size: "18.4 KB", modified: "Yesterday", badge: "Docs", badgeColor: "bg-cyan-500/20 text-cyan-400" },
  { id: "6", name: "shaders_vulkan.spv", type: "binary", size: "340 KB", modified: "Oct 21", badge: "SPIR-V", badgeColor: "bg-rose-500/20 text-rose-400" },
];

const CLOUD_FILES: FileItem[] = [
  { id: "c1", name: "[Google Drive] 2026_Design_Renders.psd", type: "media", size: "840 MB", modified: "Synced", badge: "GDrive Virtual", badgeColor: "bg-amber-500/20 text-amber-400" },
  { id: "c2", name: "[Dropbox] Client_Contracts_Signed.pdf", type: "document", size: "4.8 MB", modified: "Synced", badge: "Dropbox", badgeColor: "bg-blue-500/20 text-blue-400" },
  { id: "c3", name: "[OneDrive] Video_Assets_4K.raw", type: "media", size: "14.8 GB", modified: "Local Sync", badge: "OneDrive (Local)", badgeColor: "bg-sky-500/20 text-sky-400" },
  { id: "c4", name: "[AWS S3] prod-database-dump.sql.gz", type: "archive", size: "3.2 GB", modified: "Direct Mount", badge: "s3://eu-central-1", badgeColor: "bg-orange-500/20 text-orange-400" },
  { id: "c5", name: "[Nextcloud] Team_Notes_Encrypted.kdbx", type: "document", size: "820 KB", modified: "E2EE", badge: "Private Cloud", badgeColor: "bg-emerald-500/20 text-emerald-400" },
];

const SSH_FILES: FileItem[] = [
  { id: "s1", name: "/etc/nginx/sites-available/autom.uk.conf", type: "code", size: "3.2 KB", modified: "Remote Linux", badge: "Live Edit", badgeColor: "bg-green-500/20 text-green-400" },
  { id: "s2", name: "/var/log/syslog.1", type: "document", size: "45.1 MB", modified: "Remote Linux", badge: "Stream Read", badgeColor: "bg-zinc-500/20 text-zinc-300" },
  { id: "s3", name: "/home/deploy/docker-compose.prod.yml", type: "code", size: "5.8 KB", modified: "Remote Linux", badge: "Container", badgeColor: "bg-blue-500/20 text-blue-400" },
  { id: "s4", name: "/data/backups/pg_wal_archive.tar", type: "archive", size: "8.4 GB", modified: "Remote Linux", badge: "Fast SCP", badgeColor: "bg-purple-500/20 text-purple-400" },
];

const TORRENT_RESULTS = [
  { id: "t1", title: "Ubuntu 24.04.1 LTS Desktop (x86_64 iso)", size: "5.8 GB", seeds: 4820, peers: 320, health: "100%", speed: "48.5 MB/s", progress: 68, status: "Downloading • 3.94 GB / 5.80 GB • Line-rate swarm" },
  { id: "t2", title: "Blender 4.2 Benchmark Demo Project - OpenData", size: "1.4 GB", seeds: 1290, peers: 94, health: "98%", speed: "32.1 MB/s", progress: 100, status: "Complete • Seeding (Ratio: 3.4)" },
  { id: "t3", title: "Debian 12.8 Netinst Minimal Official", size: "740 MB", seeds: 2150, peers: 110, health: "99%", speed: "--", progress: 0, status: "Queued" },
  { id: "t4", title: "Arch Linux 2026.10 Snapshot x86_64", size: "980 MB", seeds: 3100, peers: 280, health: "100%", speed: "--", progress: 0, status: "Available" },
];

export default function InteractiveAppMockup() {
  const [activeTab, setActiveTab] = useState<TabMode>("local");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [dualPane, setDualPane] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(true);
  const [activeTerminalCmd, setActiveTerminalCmd] = useState("htop");
  const [torrentQuery, setTorrentQuery] = useState("");
  const [activeDownloads, setActiveDownloads] = useState<Record<string, boolean>>({ t1: true });

  const currentFiles = useMemo(() => {
    let list = LOCAL_FILES;
    if (activeTab === "cloud") list = CLOUD_FILES;
    if (activeTab === "ssh") list = SSH_FILES;

    if (!searchQuery) return list;
    return list.filter((f) => f.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [activeTab, searchQuery]);

  return (
    <div className="w-full max-w-6xl mx-auto rounded-2xl md:rounded-3xl border border-white/15 bg-[#030712]/95 shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden backdrop-blur-2xl">
      {/* OS Chrome Window Header */}
      <div className="bg-[#0b0f19] border-b border-white/10 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Window Controls & Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-rose-500/80 inline-block hover:opacity-80 transition cursor-pointer" />
            <span className="w-3.5 h-3.5 rounded-full bg-amber-500/80 inline-block hover:opacity-80 transition cursor-pointer" />
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/80 inline-block hover:opacity-80 transition cursor-pointer" />
          </div>
          <div className="h-4 w-[1px] bg-white/10 mx-1 hidden sm:block" />
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white text-[10px] font-black">
              N
            </div>
            <span className="text-xs font-semibold text-white/90 tracking-wide font-mono">
              NetFiles v1.0.0 <span className="text-white/40 font-normal">| Native C++20 Core</span>
            </span>
          </div>
        </div>

        {/* Center: Interactive Tabs */}
        <div className="flex items-center gap-1 bg-[#030712] p-1 rounded-xl border border-white/10 overflow-x-auto max-w-full">
          <button
            onClick={() => { setActiveTab("local"); setSelectedFile(null); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === "local"
                ? "bg-primary text-white shadow-[0_0_15px_rgba(49,104,250,0.4)]"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <HardDrive size={13} />
            <span>Local C:\</span>
          </button>
          <button
            onClick={() => { setActiveTab("cloud"); setSelectedFile(null); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === "cloud"
                ? "bg-primary text-white shadow-[0_0_15px_rgba(49,104,250,0.4)]"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <Cloud size={13} />
            <span>Unified Cloud (GDrive/Dropbox)</span>
          </button>
          <button
            onClick={() => { setActiveTab("ssh"); setSelectedFile(null); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === "ssh"
                ? "bg-primary text-white shadow-[0_0_15px_rgba(49,104,250,0.4)]"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <Terminal size={13} />
            <span>SSH: debian-fra-01</span>
          </button>
          <button
            onClick={() => { setActiveTab("torrent"); setSelectedFile(null); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === "torrent"
                ? "bg-primary text-white shadow-[0_0_15px_rgba(49,104,250,0.4)]"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <Download size={13} />
            <span>Torrent Swarm</span>
          </button>
        </div>

        {/* Right: Quick Stats */}
        <div className="hidden lg:flex items-center gap-3 text-[11px] font-mono text-white/50">
          <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
            <Cpu size={12} className="text-emerald-400" />
            <span>RAM: 22.4 MB</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
            <Zap size={12} className="text-primary" />
            <span>Latency: 0.18ms</span>
          </div>
        </div>
      </div>

      {/* Navigation Toolbar & Path Breadcrumbs */}
      <div className="bg-[#070b14] border-b border-white/10 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-white/40">
            <button className="p-1.5 rounded-md hover:bg-white/5 hover:text-white transition">
              <ArrowLeft size={14} />
            </button>
            <button className="p-1.5 rounded-md hover:bg-white/5 hover:text-white transition">
              <ArrowRight size={14} />
            </button>
            <button className="p-1.5 rounded-md hover:bg-white/5 hover:text-white transition">
              <RotateCw size={13} />
            </button>
          </div>

          {/* Breadcrumb Path */}
          <div className="bg-[#0b0f19] border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-white/80 font-mono text-[11px] max-w-xs sm:max-w-md overflow-hidden">
            {activeTab === "local" && (
              <>
                <span className="text-primary font-bold">C:</span>
                <ChevronRight size={11} className="text-white/30" />
                <span>Dev</span>
                <ChevronRight size={11} className="text-white/30" />
                <span className="text-white font-semibold">NetFiles_Kernel</span>
              </>
            )}
            {activeTab === "cloud" && (
              <>
                <Cloud size={12} className="text-sky-400" />
                <span>Cloud Hub</span>
                <ChevronRight size={11} className="text-white/30" />
                <span className="text-white font-semibold">Virtual Root (3 Providers Mounted)</span>
              </>
            )}
            {activeTab === "ssh" && (
              <>
                <Server size={12} className="text-emerald-400" />
                <span>ssh://root@194.135.22.41:22</span>
                <ChevronRight size={11} className="text-white/30" />
                <span className="text-white font-semibold">/var/www/production</span>
              </>
            )}
            {activeTab === "torrent" && (
              <>
                <Zap size={12} className="text-amber-400" />
                <span>libtorrent-dht://</span>
                <ChevronRight size={11} className="text-white/30" />
                <span className="text-white font-semibold">Active Swarms & Web Index</span>
              </>
            )}
          </div>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-2">
          {activeTab !== "torrent" ? (
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Instant Win32 Index Search (USN)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#0b0f19] border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-[11px] text-white placeholder-white/40 w-48 sm:w-64 focus:outline-none focus:border-primary/60 transition"
              />
            </div>
          ) : (
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-primary" />
              <input
                type="text"
                placeholder="Search torrents (requires configured search API URL)..."
                value={torrentQuery}
                onChange={(e) => setTorrentQuery(e.target.value)}
                className="bg-[#0b0f19] border border-primary/40 rounded-lg pl-8 pr-3 py-1.5 text-[11px] text-white placeholder-white/40 w-48 sm:w-72 focus:outline-none focus:ring-1 focus:ring-primary transition"
              />
            </div>
          )}

          {activeTab === "local" && (
            <button
              onClick={() => setDualPane(!dualPane)}
              className={`p-1.5 rounded-lg border border-white/10 text-xs flex items-center gap-1.5 transition ${
                dualPane ? "bg-primary/20 text-primary border-primary/40" : "bg-white/5 text-white/60 hover:text-white"
              }`}
              title="Toggle Dual-Pane Split View"
            >
              <SplitSquareVertical size={14} />
              <span className="hidden md:inline font-mono text-[10px]">Dual-Pane</span>
            </button>
          )}

          {activeTab === "ssh" && (
            <button
              onClick={() => setTerminalOpen(!terminalOpen)}
              className={`p-1.5 rounded-lg border border-white/10 text-xs flex items-center gap-1.5 transition ${
                terminalOpen ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" : "bg-white/5 text-white/60 hover:text-white"
              }`}
            >
              <Terminal size={14} />
              <span className="hidden md:inline font-mono text-[10px]">Terminal Dock</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Workspace: Sidebar + File Pane + Inspector */}
      <div className="grid grid-cols-12 min-h-[460px] bg-[#02050e]">
        {/* Left Explorer Sidebar */}
        <div className="hidden md:block col-span-3 border-r border-white/10 p-3 space-y-4 text-xs font-sans select-none">
          {/* Quick Access */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-white/40 px-2 mb-1.5">
              Pinned Locations
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-white/5 text-white font-medium cursor-pointer">
                <HardDrive size={13} className="text-primary" />
                <span>NVMe System (C:)</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-white/60 hover:bg-white/5 hover:text-white cursor-pointer transition">
                <Folder size={13} className="text-amber-400" />
                <span>Development Workspace</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-white/60 hover:bg-white/5 hover:text-white cursor-pointer transition">
                <Download size={13} className="text-cyan-400" />
                <span>Torrent Influx Folder</span>
              </div>
            </div>
          </div>

          {/* Cloud Accounts Unified */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-white/40 px-2 mb-1.5 flex items-center justify-between">
              <span>Cloud Drives</span>
              <span className="text-[9px] text-emerald-400 font-mono">3 Connected</span>
            </div>
            <div className="space-y-0.5">
              <div
                onClick={() => setActiveTab("cloud")}
                className="flex items-center justify-between px-2 py-1.5 rounded-md text-white/70 hover:bg-white/5 hover:text-white cursor-pointer transition"
              >
                <div className="flex items-center gap-2">
                  <Cloud size={13} className="text-amber-400" />
                  <span>Google Drive (Work)</span>
                </div>
                <span className="text-[9px] font-mono text-white/40">12/15 GB</span>
              </div>
              <div
                onClick={() => setActiveTab("cloud")}
                className="flex items-center justify-between px-2 py-1.5 rounded-md text-white/70 hover:bg-white/5 hover:text-white cursor-pointer transition"
              >
                <div className="flex items-center gap-2">
                  <Cloud size={13} className="text-blue-400" />
                  <span>Dropbox (Studio)</span>
                </div>
                <span className="text-[9px] font-mono text-white/40">840 GB</span>
              </div>
              <div
                onClick={() => setActiveTab("cloud")}
                className="flex items-center justify-between px-2 py-1.5 rounded-md text-white/70 hover:bg-white/5 hover:text-white cursor-pointer transition"
              >
                <div className="flex items-center gap-2">
                  <Cloud size={13} className="text-sky-400" />
                  <span>OneDrive (Local)</span>
                </div>
                <span className="text-[9px] font-mono text-white/40">Local Dir</span>
              </div>
            </div>
          </div>

          {/* SSH & Remote Servers */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-white/40 px-2 mb-1.5 flex items-center justify-between">
              <span>SSH Server Clusters</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="space-y-0.5">
              <div
                onClick={() => setActiveTab("ssh")}
                className="flex items-center justify-between px-2 py-1.5 rounded-md text-white/80 hover:bg-white/5 cursor-pointer transition bg-white/5"
              >
                <div className="flex items-center gap-2">
                  <Server size={13} className="text-emerald-400" />
                  <span className="font-mono text-[11px]">debian-fra-01</span>
                </div>
                <span className="text-[9px] text-emerald-400 font-mono">Online</span>
              </div>
              <div className="flex items-center justify-between px-2 py-1.5 rounded-md text-white/50 hover:bg-white/5 hover:text-white cursor-pointer transition">
                <div className="flex items-center gap-2">
                  <Server size={13} className="text-white/40" />
                  <span className="font-mono text-[11px]">gpu-cluster-us</span>
                </div>
                <span className="text-[9px] text-white/30 font-mono">Standby</span>
              </div>
            </div>
          </div>

          {/* Torrent Swarm Health */}
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5 text-white text-[11px] font-semibold">
                <Zap size={12} className="text-primary" />
                <span>libtorrent Engine</span>
              </div>
              <span className="text-[9px] font-mono text-emerald-400">48.5 MB/s</span>
            </div>
            <p className="text-[10px] text-white/60 mb-2 leading-relaxed">
              Decentralized DHT active • 12,410 peers indexed
            </p>
            <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-emerald-400 h-full w-[84%] rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* Center: File Browser or Torrent Search */}
        <div className={`col-span-12 ${dualPane && activeTab === "local" ? "md:col-span-9" : "md:col-span-9"} flex flex-col`}>
          {/* TAB: TORRENT ENGINE */}
          {activeTab === "torrent" ? (
            <div className="p-4 sm:p-6 flex-1 flex flex-col">
              <div className="bg-[#0b0f19] border border-primary/30 rounded-2xl p-4 mb-4 shadow-[0_0_30px_rgba(49,104,250,0.15)]">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Download size={15} className="text-primary" />
                      Decentralized Torrent Search & Download Hub
                    </h3>
                    <p className="text-xs text-white/60 mt-0.5">
                      Directly query peer-to-peer swarms. While NetFiles provides native P2P transfer services, searching requires users to configure a search API URL.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-mono">
                      Requires Search API URL
                    </span>
                    <span className="px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20 text-[10px] font-mono">
                      C++ libtorrent v2.0
                    </span>
                  </div>
                </div>

                {/* Instant Filter Pills */}
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  <span className="text-white/40 py-0.5">Trending:</span>
                  {["Ubuntu 24.04 ISO", "Blender Open Benchmark", "Arch Linux", "Public Datasets"].map((term) => (
                    <button
                      key={term}
                      onClick={() => setTorrentQuery(term)}
                      className="px-2 py-0.5 rounded-md bg-white/5 hover:bg-primary/20 hover:text-primary text-white/70 border border-white/5 transition text-[10px]"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Torrent Table */}
              <div className="flex-1 overflow-x-auto border border-white/10 rounded-xl bg-[#070b14]">
                <table className="w-full text-left text-xs font-sans">
                  <thead>
                    <tr className="border-b border-white/10 bg-[#0b0f19] text-white/50 text-[10px] uppercase tracking-wider font-mono">
                      <th className="py-2.5 px-3">Torrent Swarm Name</th>
                      <th className="py-2.5 px-2">Size</th>
                      <th className="py-2.5 px-2">Seeds / Peers</th>
                      <th className="py-2.5 px-2">Speed</th>
                      <th className="py-2.5 px-2">Progress</th>
                      <th className="py-2.5 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {TORRENT_RESULTS.map((t) => (
                      <tr key={t.id} className="hover:bg-white/5 transition group">
                        <td className="py-3 px-3">
                          <div className="font-semibold text-white group-hover:text-primary transition flex items-center gap-2">
                            <Zap size={13} className="text-amber-400 shrink-0" />
                            <span className="truncate max-w-[240px] sm:max-w-md">{t.title}</span>
                          </div>
                          <span className="text-[10px] text-white/40 block mt-0.5 font-mono">{t.status}</span>
                        </td>
                        <td className="py-3 px-2 font-mono text-white/80">{t.size}</td>
                        <td className="py-3 px-2 font-mono">
                          <span className="text-emerald-400 font-bold">{t.seeds}</span>
                          <span className="text-white/30"> / </span>
                          <span className="text-sky-400">{t.peers}</span>
                        </td>
                        <td className="py-3 px-2 font-mono text-emerald-400">{t.speed}</td>
                        <td className="py-3 px-2 w-32">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-white/10 rounded-full h-1.5 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${t.progress === 100 ? "bg-emerald-400" : "bg-primary animate-pulse"}`}
                                style={{ width: `${t.progress}%` }}
                              />
                            </div>
                            <span className="text-[10px] font-mono text-white/60">{t.progress}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-right">
                          {t.progress === 100 ? (
                            <button
                              onClick={() => alert(`Opening '${t.title}' in NetFiles Explorer!`)}
                              className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30 transition text-[11px] font-medium inline-flex items-center gap-1"
                            >
                              <Folder size={11} />
                              <span>Open Folder</span>
                            </button>
                          ) : t.progress > 0 ? (
                            <span className="px-2 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-mono inline-flex items-center gap-1">
                              <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />
                              </span>
                              <span>Downloading</span>
                            </span>
                          ) : (
                            <button
                              onClick={() => setActiveDownloads((prev) => ({ ...prev, [t.id]: true }))}
                              className="px-2.5 py-1 rounded-md bg-primary/20 text-primary border border-primary/40 hover:bg-primary/30 transition text-[11px] font-medium inline-flex items-center gap-1"
                            >
                              <Download size={11} />
                              <span>{activeDownloads[t.id] ? "Connecting..." : "Download"}</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* TAB: LOCAL OR CLOUD OR SSH FILE BROWSER */
            <div className="flex-1 flex flex-col">
              {/* Dual-Pane View Option for Local */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
                {/* Pane 1 (Active Path) */}
                <div className="p-3 overflow-y-auto max-h-[380px]">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5 text-[10px] font-mono uppercase tracking-wider text-white/40">
                    <span>Name</span>
                    <div className="flex items-center gap-6">
                      <span>Size</span>
                      <span>Status</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    {currentFiles.map((file) => (
                      <div
                        key={file.id}
                        onClick={() => setSelectedFile(file)}
                        className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition text-xs ${
                          selectedFile?.id === file.id
                            ? "bg-primary/20 border border-primary/40 text-white"
                            : "hover:bg-white/5 text-white/80"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate max-w-[220px]">
                          {file.type === "code" && <FileCode size={15} className="text-blue-400 shrink-0" />}
                          {file.type === "archive" && <FileArchive size={15} className="text-amber-400 shrink-0" />}
                          {file.type === "binary" && <HardDrive size={15} className="text-purple-400 shrink-0" />}
                          {file.type === "document" && <FileText size={15} className="text-zinc-400 shrink-0" />}
                          {file.type === "media" && <Eye size={15} className="text-rose-400 shrink-0" />}
                          {file.type === "folder" && <Folder size={15} className="text-amber-300 shrink-0" />}

                          <span className="font-medium truncate">{file.name}</span>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className="font-mono text-[11px] text-white/50">{file.size}</span>
                          {file.badge && (
                            <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-medium ${file.badgeColor || "bg-white/10 text-white/70"}`}>
                              {file.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {activeTab === "cloud" && (
                    <div className="mt-4 p-3 rounded-xl bg-sky-950/20 border border-sky-500/20 text-xs">
                      <div className="flex items-center gap-2 text-sky-400 font-semibold mb-1">
                        <Cloud size={14} />
                        <span>Direct Cloud-to-Cloud Pipeline</span>
                      </div>
                      <p className="text-[11px] text-white/60 leading-relaxed">
                        Drag files between Google Drive and Dropbox without saving to your local SSD. Transfers happen server-to-server at 10 Gbps.
                      </p>
                    </div>
                  )}
                </div>

                {/* Pane 2: Dual Split Pane / Details Pane */}
                <div className="p-3 bg-[#030610] overflow-y-auto max-h-[380px] flex flex-col">
                  {selectedFile ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2">
                          <FileCode size={16} className="text-primary" />
                          <h4 className="text-xs font-bold text-white font-mono truncate">{selectedFile.name}</h4>
                        </div>
                        <span className="text-[10px] text-emerald-400 font-mono">Instant Preview</span>
                      </div>

                      {/* Mock File Metadata */}
                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                        <div className="p-2 rounded bg-white/5 border border-white/5">
                          <span className="text-white/40 block text-[9px]">FILE SIZE</span>
                          <span className="text-white font-bold">{selectedFile.size}</span>
                        </div>
                        <div className="p-2 rounded bg-white/5 border border-white/5">
                          <span className="text-white/40 block text-[9px]">SHA-256 HASH</span>
                          <span className="text-white/80 truncate block text-[10px]">9f83ac027b...</span>
                        </div>
                      </div>

                      {/* Quick Code / Hex / Markdown Preview */}
                      <div className="bg-[#0b0f19] border border-white/10 rounded-xl p-3 text-[11px] font-mono text-white/70 space-y-1 overflow-x-auto">
                        <div className="text-white/30 text-[10px] border-b border-white/5 pb-1 flex justify-between">
                          <span>C++20 Zero-Copy Buffer Preview</span>
                          <span>utf-8</span>
                        </div>
                        <div className="text-blue-400">#include &lt;netfiles/storage_engine.hpp&gt;</div>
                        <div className="text-purple-400">namespace netfiles::native &#123;</div>
                        <div className="text-white/80 pl-3">
                          void MountCloudVirtualFS(const CloudCredentials& creds) noexcept &#123;
                        </div>
                        <div className="text-emerald-400 pl-6">
                          {"// Zero latency async Win32 I/O completion port"}
                        </div>
                        <div className="text-white/80 pl-6">
                          auto iocp = CreateIoCompletionPort(INVALID_HANDLE_VALUE, ...);
                        </div>
                        <div className="text-white/80 pl-3">&#125;</div>
                        <div className="text-purple-400">&#125;</div>
                      </div>

                      {/* Power User Operations */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        <button className="px-2.5 py-1.5 rounded-lg bg-primary/20 text-primary border border-primary/40 hover:bg-primary/30 transition text-[10px] font-mono font-medium flex items-center gap-1.5">
                          <Hash size={12} />
                          Verify Integrity
                        </button>
                        <button className="px-2.5 py-1.5 rounded-lg bg-white/5 text-white/80 hover:bg-white/10 transition text-[10px] font-mono flex items-center gap-1.5">
                          <Sliders size={12} />
                          Batch Regex Rename
                        </button>
                        <button className="px-2.5 py-1.5 rounded-lg bg-white/5 text-white/80 hover:bg-white/10 transition text-[10px] font-mono flex items-center gap-1.5">
                          <Share2 size={12} />
                          Instant Torrent Seed
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Second Split Pane: Target Folder */
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5 text-[10px] font-mono uppercase tracking-wider text-white/40">
                          <span className="text-primary font-bold">Split Destination: D:\Backups\2026</span>
                          <span>Dual Active</span>
                        </div>
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center justify-between p-1.5 rounded hover:bg-white/5 text-white/70">
                            <span className="flex items-center gap-2">
                              <Folder size={13} className="text-amber-400" />
                              <span>database_daily_snapshots</span>
                            </span>
                            <span className="font-mono text-[10px] text-white/40">Dir</span>
                          </div>
                          <div className="flex items-center justify-between p-1.5 rounded hover:bg-white/5 text-white/70">
                            <span className="flex items-center gap-2">
                              <FileArchive size={13} className="text-amber-400" />
                              <span>q3_production_cluster.zst</span>
                            </span>
                            <span className="font-mono text-[10px] text-white/40">4.2 GB</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] text-white/60">
                        <div className="flex items-center gap-1.5 text-white font-medium mb-1">
                          <Zap size={12} className="text-amber-400" />
                          <span>Direct Asynchronous Mirroring</span>
                        </div>
                        Select any file on the left and press <kbd className="px-1.5 py-0.5 rounded bg-black/50 border border-white/20 text-white font-mono text-[10px]">F5</kbd> to copy across SSD, Cloud, or SSH with hardware DMA acceleration.
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* SSH Terminal Dock (When in SSH tab) */}
              {activeTab === "ssh" && terminalOpen && (
                <div className="border-t border-white/10 bg-[#00030a] p-3 text-xs font-mono">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
                    <div className="flex items-center gap-2 text-emerald-400 text-[11px]">
                      <Terminal size={12} />
                      <span className="font-bold">Hardware-Accelerated xterm Dock</span>
                      <span className="text-white/40 text-[10px]">| root@debian-fra-01:/var/www</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setActiveTerminalCmd("htop")}
                        className={`px-2 py-0.5 rounded text-[10px] ${activeTerminalCmd === "htop" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "text-white/50"}`}
                      >
                        htop
                      </button>
                      <button
                        onClick={() => setActiveTerminalCmd("docker")}
                        className={`px-2 py-0.5 rounded text-[10px] ${activeTerminalCmd === "docker" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "text-white/50"}`}
                      >
                        docker ps
                      </button>
                    </div>
                  </div>

                  {activeTerminalCmd === "htop" ? (
                    <div className="text-[11px] space-y-0.5 text-zinc-300">
                      <div className="text-white/50">CPU [||||||||||||||||                                  24.2%] Tasks: 82, 185 thr; 1 running</div>
                      <div className="text-white/50">Mem [|||||||||||||||||||||||||||||                    1.42G/16.0G] Swp: 0K/8.0G</div>
                      <div className="text-emerald-400 mt-1">
                        root@debian-fra-01:/var/www# <span className="text-white">netfiles-daemon --serve-sftp --threads=8</span>
                      </div>
                      <div className="text-white/40 text-[10px]">
                        [OK] SFTP v6 subsystem initialized. Listening on 127.0.0.1:2222 with zero-copy splicing.
                      </div>
                    </div>
                  ) : (
                    <div className="text-[11px] space-y-0.5 text-zinc-300">
                      <div className="text-white/40 text-[10px]">CONTAINER ID   IMAGE                 COMMAND                  STATUS          PORTS</div>
                      <div>a83f912cd31   redis:7-alpine        &quot;docker-entrypoint.s…&quot;   Up 14 days      6379/tcp</div>
                      <div>f0982bb14ee   postgres:16           &quot;docker-entrypoint.s…&quot;   Up 14 days      5432/tcp</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="bg-[#0b0f19] border-t border-white/10 px-4 py-2 flex flex-wrap items-center justify-between text-[11px] font-mono text-white/50 gap-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/80 font-medium">Ready</span>
          </div>
          <span>38 Objects</span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">Unified Virtual File System Active</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-white/70">
            Engine: <span className="text-primary font-bold">C++20 Native</span>
          </span>
          <span className="hidden sm:inline">|</span>
          <span className="text-emerald-400">
            Net IO: <span className="font-bold">48.2 MB/s ↓</span>
          </span>
          <span className="hidden sm:inline">|</span>
          <span className="text-sky-400">
            RAM: <span className="font-bold">22.4 MB</span>
          </span>
        </div>
      </div>
    </div>
  );
}
