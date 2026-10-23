"use client";

import React from "react";
import { Check, X, Minus } from "lucide-react";

export default function ComparisonMatrix() {
  const comparisonRows = [
    {
      feature: "Memory (RAM) Footprint",
      netfiles: "22 MB (Native C++)",
      windowsExplorer: "160 MB - 350 MB",
      electronApps: "650 MB - 1.2 GB",
      separateApps: "2.4 GB+ (Combined)",
      highlight: true
    },
    {
      feature: "Cold Startup Latency",
      netfiles: "120 ms",
      windowsExplorer: "1,400 ms",
      electronApps: "3,800 ms",
      separateApps: "Launch 4 apps separately",
      highlight: true
    },
    {
      feature: "Local Search Speed (1M Files)",
      netfiles: "18 ms (Direct USN/MFT)",
      windowsExplorer: "3,000+ ms (Windows Search)",
      electronApps: "Crawls filesystem slowly",
      separateApps: "Requires 3rd party indexer",
      highlight: true
    },
    {
      feature: "SSH / SFTP Remote Filesystem",
      netfiles: "Native with dockable terminal",
      windowsExplorer: false,
      electronApps: "Requires laggy plugin",
      separateApps: "Separate app (FileZilla / WinSCP)",
      highlight: true
    },
    {
      feature: "Unified Cloud Hub (GDrive, Dropbox, OneDrive)",
      netfiles: "Zero-copy Virtual File System",
      windowsExplorer: "Requires 3 sync clients",
      electronApps: false,
      separateApps: "3 separate background sync apps",
      highlight: true
    },
    {
      feature: "Direct Cloud-to-Cloud Transfers",
      netfiles: "Yes (0 local disk / bandwidth used)",
      windowsExplorer: false,
      electronApps: false,
      separateApps: "Must download & re-upload",
      highlight: true
    },
    {
      feature: "Torrent Search & P2P Downloader",
      netfiles: "Built-in DHT & libtorrent v2",
      windowsExplorer: false,
      electronApps: false,
      separateApps: "Separate client (qBittorrent)",
      highlight: true
    },
    {
      feature: "True Dual-Pane & Multi-Split Layout",
      netfiles: true,
      windowsExplorer: false,
      electronApps: "Basic tabs only",
      separateApps: "Tile multiple windows manually",
      highlight: false
    },
    {
      feature: "In-Place Remote File Editing",
      netfiles: true,
      windowsExplorer: false,
      electronApps: false,
      separateApps: "Temp download, edit, re-upload",
      highlight: false
    },
    {
      feature: "Hardware Enclave Credentials (DPAPI)",
      netfiles: true,
      windowsExplorer: "N/A",
      electronApps: "Plain text local storage",
      separateApps: "Fragmented across apps",
      highlight: false
    },
    {
      feature: "Zero Telemetry / 100% Offline Capable",
      netfiles: true,
      windowsExplorer: false,
      electronApps: false,
      separateApps: "Varies (Adware risks)",
      highlight: true
    }
  ];

  return (
    <div className="w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white mb-6 font-heading">
          Stop juggling <span className="text-[#3168FA]">5 different apps</span> for file operations.
        </h2>
        <p className="text-base sm:text-xl text-zinc-400 leading-relaxed">
          See how NetFiles native C++ architecture outperforms standard Windows Explorer, heavy Electron file wrappers, and messy multi-app toolchains.
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#060a15]/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        <table className="w-full text-left text-xs sm:text-sm font-sans border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-white">
              <th className="py-5 px-6 font-semibold font-heading text-sm sm:text-base text-zinc-300">Capability / Metric</th>
              <th className="py-5 px-6 bg-blue-500/[0.06] border-x border-blue-500/20 text-white font-bold font-heading text-sm sm:text-base">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">NetFiles</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-500/15 text-blue-300 border border-blue-500/30">
                    C++ Native
                  </span>
                </div>
                <span className="text-[11px] text-zinc-400 block font-normal mt-1">All-in-One Engine</span>
              </th>
              <th className="py-5 px-6 text-zinc-400 font-medium font-heading text-xs sm:text-sm">Windows 11 Explorer</th>
              <th className="py-5 px-6 text-zinc-400 font-medium font-heading text-xs sm:text-sm">Electron File Managers</th>
              <th className="py-5 px-6 text-zinc-400 font-medium font-heading text-xs sm:text-sm">The 5-App Frankenstein</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.06]">
            {comparisonRows.map((row, index) => (
              <tr
                key={index}
                className="hover:bg-white/[0.015] transition"
              >
                {/* Feature Column */}
                <td className="py-4 px-6 font-medium text-zinc-200">
                  {row.feature}
                </td>

                {/* NetFiles Column (Highlighted) */}
                <td className="py-4 px-6 bg-blue-500/[0.03] border-x border-blue-500/15 font-medium">
                  {typeof row.netfiles === "boolean" ? (
                    row.netfiles ? (
                      <span className="inline-flex items-center gap-1.5 text-zinc-100 font-medium">
                        <Check size={14} className="text-emerald-400 stroke-[2.5]" />
                        <span>Included</span>
                      </span>
                    ) : (
                      <span className="text-zinc-600"><Minus size={14} /></span>
                    )
                  ) : (
                    <span className="text-white font-medium">
                      {row.netfiles}
                    </span>
                  )}
                </td>

                {/* Windows 11 Explorer */}
                <td className="py-4 px-6 text-zinc-400 text-xs sm:text-sm">
                  {typeof row.windowsExplorer === "boolean" ? (
                    row.windowsExplorer ? (
                      <Check size={14} className="text-zinc-300" />
                    ) : (
                      <span className="inline-flex items-center gap-1 text-zinc-500 text-xs">
                        <X size={13} className="text-zinc-600" />
                        <span>No</span>
                      </span>
                    )
                  ) : (
                    <span className={row.windowsExplorer === "N/A" ? "text-zinc-500" : "text-zinc-400"}>
                      {row.windowsExplorer}
                    </span>
                  )}
                </td>

                {/* Electron Apps */}
                <td className="py-4 px-6 text-zinc-400 text-xs sm:text-sm">
                  {typeof row.electronApps === "boolean" ? (
                    row.electronApps ? (
                      <Check size={14} className="text-zinc-300" />
                    ) : (
                      <span className="inline-flex items-center gap-1 text-zinc-500 text-xs">
                        <X size={13} className="text-zinc-600" />
                        <span>No</span>
                      </span>
                    )
                  ) : (
                    <span>{row.electronApps}</span>
                  )}
                </td>

                {/* Separate Tools */}
                <td className="py-4 px-6 text-zinc-400 text-xs sm:text-sm">
                  {typeof row.separateApps === "boolean" ? (
                    row.separateApps ? (
                      <Check size={14} className="text-zinc-300" />
                    ) : (
                      <span className="inline-flex items-center gap-1 text-zinc-500 text-xs">
                        <X size={13} className="text-zinc-600" />
                        <span>No</span>
                      </span>
                    )
                  ) : (
                    <span>{row.separateApps}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
