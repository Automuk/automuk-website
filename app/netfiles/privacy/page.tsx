"use client";

import React from "react";
import Link from "next/link";
import PageContainer from "@/components/PageContainer";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Cloud,
  HardDrive,
  KeyRound,
  Share2,
  Search,
  Lock,
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

export default function NetFilesPrivacyPage() {
  const lastUpdated = "November 2026";

  return (
    <div className="min-h-screen bg-[#00020C] text-[#E5E7EB] pt-28 md:pt-36 pb-24 px-4 selection:bg-primary selection:text-white">
      <PageContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          {/* Back Navigation */}
          <div>
            <Link
              href="/netfiles"
              className="inline-flex items-center gap-2 text-sm text-[#94A3B8] hover:text-white transition font-medium group"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span>Back to NetFiles Overview</span>
            </Link>
          </div>

          {/* Page Header */}
          <div className="space-y-4 border-b border-white/10 pb-8">
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-white font-heading">
              NetFiles <span className="text-primary">Privacy Policy</span>
            </h1>
            <p className="text-lg text-[#94A3B8] max-w-2xl font-sans">
              NetFiles is engineered as a local-first, privacy-respecting Windows
              desktop application. This document details how authentication,
              cloud storage, SSH connections, and peer-to-peer (P2P) swarms operate.
            </p>
            <p className="text-xs text-[#94A3B8]/60 font-mono">
              Effective Date: {lastUpdated} • Applicable to NetFiles Desktop App
            </p>
          </div>

          {/* Summary Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-[#070b14] border border-white/10 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Lock size={18} />
              </div>
              <h3 className="text-sm font-semibold text-white font-heading">
                Zero Remote Telemetry
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                We do not track your clicks, collect file metadata, or log usage analytics. All operations stay strictly on your device.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#070b14] border border-white/10 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <KeyRound size={18} />
              </div>
              <h3 className="text-sm font-semibold text-white font-heading">
                Local Hardware DPAPI
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Tokens and credentials are encrypted directly using Windows Data Protection API (DPAPI) tied to your local user hardware profile.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#070b14] border border-white/10 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                <Share2 size={18} />
              </div>
              <h3 className="text-sm font-semibold text-white font-heading">
                Direct Swarm P2P
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Downloading P2P torrents actively seeds data blocks back to swarm peers in accordance with decentralized BitTorrent protocol.
              </p>
            </div>
          </div>

          {/* Section 1: Cloud Storage (Google Drive & Dropbox via PKCE) */}
          <section className="space-y-4 rounded-3xl bg-[#070b14]/90 border border-white/10 p-6 sm:p-8 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                  1. Cloud Storage: Google Drive & Dropbox (PKCE OAuth)
                </h2>
              </div>
            </div>

            <div className="text-sm text-[#94A3B8] space-y-3 leading-relaxed">
              <p>
                NetFiles integrates with <strong className="text-white">Google Drive</strong> and{" "}
                <strong className="text-white">Dropbox</strong> via standard OAuth 2.0 with{" "}
                <strong className="text-white">Proof Key for Code Exchange (PKCE)</strong>.
              </p>
              <ul className="space-y-2.5 pl-1">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Direct-to-Provider Authentication:</strong> PKCE verification happens directly between your desktop client and Google/Dropbox servers. Automuk operates no intermediate proxies, relay services, or credential harvesting servers.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Encrypted Local Storage:</strong> OAuth access and refresh tokens returned by Google and Dropbox are stored exclusively on your local workstation, secured with Windows DPAPI hardware-backed encryption.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">On-Demand Streaming:</strong> File content and folder structures are streamed strictly when you view or transfer files, leaving no lingering remote audit trail on Automuk infrastructure.
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 2: Microsoft OneDrive (Local Integration) */}
          <section className="space-y-4 rounded-3xl bg-[#070b14]/90 border border-white/10 p-6 sm:p-8 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                  2. Microsoft OneDrive: Local Sync Directory
                </h2>
              </div>
            </div>

            <div className="text-sm text-[#94A3B8] space-y-3 leading-relaxed">
              <p>
                Unlike Google Drive and Dropbox, <strong className="text-white">OneDrive</strong> support in NetFiles operates through your existing local OneDrive installation on Windows:
              </p>
              <ul className="space-y-2.5 pl-1">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-blue-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Local-Only Directory Operations:</strong> NetFiles interacts directly with the local OneDrive folder provided by the official Windows OneDrive client. We do not require, implement, or provide a PKCE OAuth flow for OneDrive.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-blue-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Zero Account Credential Exposure:</strong> Because NetFiles reads and writes via Windows Win32 filesystem hooks to your local OneDrive directory, NetFiles never handles, stores, or sees your Microsoft account password or OAuth tokens.
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3: SSH / SFTP Security */}
          <section className="space-y-4 rounded-3xl bg-[#070b14]/90 border border-white/10 p-6 sm:p-8 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                  3. Remote Servers (SSH & SFTP)
                </h2>
              </div>
            </div>

            <div className="text-sm text-[#94A3B8] space-y-3 leading-relaxed">
              <p>
                For remote SSH and SFTP connections, normal standard privacy and industry-grade cryptography are rigorously maintained:
              </p>
              <ul className="space-y-2.5 pl-1">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Direct End-to-End Encrypted Tunnel:</strong> All terminal sessions, file transfers, and remote commands travel over standard SSH-2 tunnels (using ChaCha20-Poly1305 or AES-GCM) directly between your PC and the destination server IP.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Keys and Passphrases:</strong> Private keys (RSA, Ed25519) and SSH connection profiles remain strictly within your local Windows environment and are never transmitted to any third-party or Automuk server.
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 4: P2P Torrent Processes, Seeding & Search API */}
          <section className="space-y-4 rounded-3xl bg-[#070b14]/90 border border-amber-500/20 p-6 sm:p-8 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                  4. Peer-to-Peer (P2P) Downloads, Seeding & Search API
                </h2>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3 text-amber-200 text-xs sm:text-sm">
              <AlertTriangle size={18} className="shrink-0 mt-0.5 text-amber-400" />
              <div>
                <strong className="text-white font-medium block mb-1">
                  Important Notice Regarding Seeding and Swarm Participation:
                </strong>
                Downloading files through NetFiles connects your computer to decentralized BitTorrent swarms. Under the BitTorrent protocol, <strong className="text-white">downloading will let you share and upload downloaded chunks to peer-to-peer (P2P) processes when seeding</strong>.
              </div>
            </div>

            <div className="text-sm text-[#94A3B8] space-y-3 leading-relaxed">
              <p>
                When utilizing the built-in P2P libtorrent engine:
              </p>
              <ul className="space-y-2.5 pl-1">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Data Sharing During Seeding:</strong> As pieces of a file are received and verified by your client, your client makes those pieces available to other peers downloading the same content. You can adjust seeding ratios, limit upload bandwidth, or pause seeding at any time within NetFiles.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Swarm Visibility:</strong> In any peer-to-peer protocol, your public IP address is shared with connected peers and distributed hash table (DHT) nodes. NetFiles provides a network adapter binding feature (kill switch) so you can bind P2P traffic strictly to your VPN interface.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Search API URL Requirement:</strong> Even though the NetFiles application holds native P2P downloading and seeding services, <strong className="text-white">it still requires users to configure and use a search API URL</strong> to index and query swarms. NetFiles does not operate a centralized tracker or index directory; search queries are dispatched solely to your configured endpoint without interception or analytics.
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 5: Data Retention and Hardware Rights */}
          <section className="space-y-4 rounded-3xl bg-[#070b14]/90 border border-white/10 p-6 sm:p-8 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                  5. Data Retention & User Rights
                </h2>
              </div>
            </div>

            <div className="text-sm text-[#94A3B8] space-y-3 leading-relaxed">
              <p>
                Because all settings, bookmarks, credentials, and cache files reside locally on your Windows installation (under <code className="text-white bg-white/5 px-1.5 py-0.5 rounded font-mono text-xs">%APPDATA%\NetFiles</code>), you retain complete sovereign control over your data:
              </p>
              <p>
                Uninstalling NetFiles or deleting its application data directory completely removes all configuration entries, stored tokens, SSH host profiles, and search settings from your computer.
              </p>
            </div>
          </section>

          {/* Section 6: Contact Information */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 text-xs text-[#94A3B8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-medium text-white font-heading text-sm">
                Questions about NetFiles privacy or security implementation?
              </p>
              <p className="mt-1">
                Reach out to our engineering and security team directly.
              </p>
            </div>
            <a
              href="mailto:arijit@autom.uk"
              className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium text-xs transition shrink-0"
            >
              Contact arijit@autom.uk
            </a>
          </div>
        </motion.div>
      </PageContainer>
    </div>
  );
}
