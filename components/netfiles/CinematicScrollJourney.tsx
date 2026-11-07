"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import {
  Check,
  Cloud,
  Cpu,
  Download,
  FileText,
  Folder,
  Play,
  Zap,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDropbox,
  faLinux,
  faUbuntu,
} from "@fortawesome/free-brands-svg-icons";

/* -------------------------------------------------------------------------- */
/*  Data                                                                       */
/* -------------------------------------------------------------------------- */

interface Stage {
  id: string;
  index: number;
  label: string;
  title: string;
  tagline: string;
  description: string;
  accent: string;
  specs: { label: string; value: string }[];
}

const STAGES: Stage[] = [
  {
    id: "cpp-core",
    index: 0,
    label: "C++20 Engine",
    title: "Engineered in Native C++. Zero Web-Wrapper Overhead.",
    tagline: "Direct Win32 kernel completion ports replace bloated Chromium runtimes.",
    description:
      "Modern desktop file managers bundle an entire Chromium browser and NodeJS server in the background, consuming 1GB of memory and stuttering on folders with thousands of files. NetFiles is written in pure C++20 with MSVC optimizations, querying NTFS Master File Tables directly for instant responsiveness.",
    accent: "#3168FA",
    specs: [
      { label: "Memory Footprint", value: "22.4 MB" },
      { label: "1.5M File Index", value: "18 ms" },
      { label: "Cold Launch", value: "120 ms" },
      { label: "I/O Architecture", value: "Win32 IOCP" },
    ],
  },
  {
    id: "cloud-vfs",
    index: 1,
    label: "Unified Cloud",
    title: "Google Drive, Dropbox & Local OneDrive. One Unified Tree.",
    tagline: "Stream petabytes of cloud assets via PKCE, unified with your local OneDrive.",
    description:
      "Instead of running multiple resource-draining cloud sync utilities, NetFiles mounts Google Drive and Dropbox as on-demand virtual filesystems via PKCE OAuth with zero local disk waste. For Microsoft OneDrive, NetFiles connects directly to your existing local OneDrive folder on Windows (no PKCE required), uniting cloud streams and your local drive into one seamless workspace.",
    accent: "#CE77FB",
    specs: [
      { label: "Cloud PKCE VFS", value: "GDrive & Dropbox" },
      { label: "OneDrive", value: "Local Directory" },
      { label: "Zero-Disk Stream", value: "GDrive / Dropbox" },
      { label: "Cloud-to-Cloud", value: "Direct Pipe" },
    ],
  },
  {
    id: "ssh-sftp",
    index: 2,
    label: "Remote SSH",
    title: "Remote Linux Clusters. Explored Like Local Drives.",
    tagline: "Direct SFTP filesystem exploration, live in-place editing, and dockable terminal.",
    description:
      "Eliminate the friction of switching between FileZilla, terminal tabs, and local editors. Connect directly to remote Linux servers, Docker containers, and cloud VPS instances over SSH. Browse remote directories with drag-and-drop, edit configuration files in-place with auto-save, and pull down an integrated terminal with one keystroke.",
    accent: "#10B981",
    specs: [
      { label: "Throughput", value: "10 Gbps Pipelined" },
      { label: "Authentication", value: "Ed25519 / FIDO2" },
      { label: "Terminal Core", value: "GPU-Rendered xterm" },
      { label: "Remote Edit", value: "Live SFTP Sync" },
    ],
  },
  {
    id: "torrent-engine",
    index: 3,
    label: "Torrent Engine",
    title: "Decentralized Swarms. Line-Rate P2P Downloads.",
    tagline: "Integrated libtorrent v2 engine with multi-peer swarm optimization.",
    description:
      "Modern desktop workflows force you into running separate, resource-draining torrent clients bundled with adware. NetFiles embeds the native C++ libtorrent engine directly into your file explorer. Even though the application holds native P2P services for ultra-fast multi-peer downloading and seeding, it still requires users to configure a search API URL to index swarms, giving you complete sovereignty over your search sources.",
    accent: "#F59E0B",
    specs: [
      { label: "P2P Engine", value: "libtorrent v2.0" },
      { label: "Search Index", value: "Search API URL" },
      { label: "Privacy", value: "VPN Adapter Binding" },
      { label: "Verification", value: "Hardware Blake3" },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Helpers & hooks                                                            */
/* -------------------------------------------------------------------------- */

const hexA = (hex: string, a: number) => {
  const n = parseInt(hex.replace("#", ""), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
};

/** Eased count-up. Returns a formatted string. */
function useCountUp(target: number, decimals = 0, duration = 1200, delay = 0, run = true) {
  const [v, setV] = useState(run ? 0 : target);
  useEffect(() => {
    if (!run) {
      setV(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now() + delay;
    const tick = (now: number) => {
      if (now < t0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const p = Math.min((now - t0) / duration, 1);
      setV(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, delay, run]);
  return v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

/** Types a string out character by character. */
function useTyped(text: string, speed = 30, delay = 0, run = true) {
  const [n, setN] = useState(run ? 0 : text.length);
  useEffect(() => {
    if (!run) {
      setN(text.length);
      return;
    }
    setN(0);
    let iv: ReturnType<typeof setInterval> | undefined;
    const to = setTimeout(() => {
      let i = 0;
      iv = setInterval(() => {
        i++;
        setN(i);
        if (i >= text.length && iv) clearInterval(iv);
      }, speed);
    }, delay);
    return () => {
      clearTimeout(to);
      if (iv) clearInterval(iv);
    };
  }, [text, speed, delay, run]);
  return text.slice(0, n);
}

/** Counts 0 → max, holds, then restarts. */
function useLoopCounter(max: number, interval: number, hold = 1500, run = true) {
  const [n, setN] = useState(run ? 0 : max);
  useEffect(() => {
    if (!run) {
      setN(max);
      return;
    }
    let t: ReturnType<typeof setTimeout>;
    const tick = (v: number) => {
      setN(v);
      t = setTimeout(() => tick(v >= max ? 0 : v + 1), v >= max ? hold : interval);
    };
    tick(0);
    return () => clearTimeout(t);
  }, [max, interval, hold, run]);
  return n;
}

/* -------------------------------------------------------------------------- */
/*  Animation Variants                                                         */
/* -------------------------------------------------------------------------- */

const rise: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};
const wordV: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: "easeOut" } },
};
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.02 } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.22 } },
};

function AnimatedValue({ value, delay, reduced }: { value: string; delay: number; reduced: boolean }) {
  const m = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const target = m ? parseFloat(m[1]) : 0;
  const decimals = m && m[1].includes(".") ? m[1].split(".")[1].length : 0;
  const v = useCountUp(target, decimals, 1100, delay, !!m && !reduced);
  if (!m) return <>{value}</>;
  return (
    <>
      {v}
      {m[2]}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Stage visuals (Unconstrained, outside card)                                */
/* -------------------------------------------------------------------------- */

interface VisualProps {
  accent: string;
  reduced: boolean;
}

/* ---------- 1. Native C++ engine ---------- */

const CODE: [string, string][][] = [
  [["// Read the NTFS USN journal directly. No directory crawling.", "text-white/35"]],
  [
    ["auto ", "text-fuchsia-400"],
    ["vol = ", "text-white/80"],
    ["CreateFileW", "text-sky-400"],
    [String.raw`(L"\\\\.\\C:", GENERIC_READ, …);`, "text-white/80"],
  ],
  [
    ["USN_JOURNAL_DATA_V0 ", "text-fuchsia-400"],
    ["journal{};", "text-white/80"],
  ],
  [
    ["DeviceIoControl", "text-sky-400"],
    ["(vol, FSCTL_QUERY_USN_JOURNAL, …);", "text-white/80"],
  ],
  [
    ["index", "text-white/80"],
    [".Stream", "text-emerald-400"],
    ["(journal); ", "text-white/80"],
    ["// 1,500,000 files", "text-white/35"],
  ],
];

function EngineVisual({ accent, reduced }: VisualProps) {
  const files = useCountUp(1500000, 0, 1500, 500, !reduced);
  const launch = useCountUp(120, 0, 1100, 700, !reduced);

  return (
    <div className="space-y-3.5 w-full">
      <div className="flex items-center justify-between pb-1 text-xs font-mono text-[#94A3B8]">
        <span className="flex items-center gap-2">
          <Cpu size={14} className="text-primary" />
          <span className="text-white/90">win32_fast_indexer.cpp</span>
        </span>
        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-primary/20 text-primary border border-primary/30">
          Zero-Copy IOCP
        </span>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#02050e]/90 p-4 font-mono text-[11px] sm:text-xs leading-relaxed overflow-x-auto backdrop-blur-xl">
        {CODE.map((segs, i) => (
          <motion.div
            key={i}
            initial={reduced ? false : { opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.18, duration: 0.35 }}
            className="flex gap-3 whitespace-pre"
          >
            <span className="select-none w-3 text-right text-white/20">{i + 1}</span>
            <span>
              {segs.map(([t, c], j) => (
                <span key={j} className={c}>
                  {t}
                </span>
              ))}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-4">
          <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-[#94A3B8]">Files indexed</span>
          <span className="mt-1 block font-heading text-xl sm:text-2xl font-bold tabular-nums text-white">{files}</span>
          <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full"
              style={{ background: accent }}
              initial={{ width: reduced ? "100%" : "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            />
          </div>
          <span className="mt-2 block text-xs font-mono text-emerald-400">in 18 ms</span>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-4">
          <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-[#94A3B8]">Cold launch</span>
          <span className="mt-1 block font-heading text-xl sm:text-2xl font-bold tabular-nums text-white">
            {launch} <span className="text-sm font-medium text-white/50">ms</span>
          </span>
          <span className="mt-2.5 block text-xs leading-snug text-[#94A3B8]">
            Interactive without booting Chromium or Node
          </span>
        </div>
      </div>

      <div className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-4">
        <div>
          <div className="mb-1.5 flex justify-between text-xs font-mono">
            <span className="text-white font-medium">NetFiles</span>
            <span className="font-bold tabular-nums" style={{ color: accent }}>
              22.4 MB
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full"
              style={{ background: accent, minWidth: 6 }}
              initial={{ width: reduced ? "2.2%" : "0%" }}
              animate={{ width: "2.2%" }}
              transition={{ duration: 0.9, delay: 0.9, ease: "easeOut" }}
            />
          </div>
        </div>
        <div>
          <div className="mb-1.5 flex justify-between text-xs font-mono">
            <span className="text-[#94A3B8]">Typical Chromium-based file manager</span>
            <span className="tabular-nums text-white/50">~1 GB</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-white/20"
              initial={{ width: reduced ? "100%" : "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.1, delay: 1, ease: "easeOut" }}
            />
          </div>
        </div>
        <p className="text-xs text-[#94A3B8] pt-0.5">
          <span style={{ color: accent }} className="font-bold">
            ≈45× less memory
          </span>{" "}
          for the exact same folder hierarchy.
        </p>
      </div>
    </div>
  );
}

/* ---------- 2. Unified cloud ---------- */

export function GoogleDriveIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.6 66.85l3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5l5.4 9.35z" fill="#0066DA" />
      <path d="M43.65 25L29.9 1.2c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44C.4 49.95 0 51.5 0 53.05h27.5L43.65 25z" fill="#00AC47" />
      <path d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5H59.8l5.85 10.15 7.9 13.65z" fill="#EA4335" />
      <path d="M43.65 25L57.4 1.2C56.05.4 54.5 0 52.9 0H34.4c-1.6 0-3.15.45-4.5 1.2L43.65 25z" fill="#00832D" />
      <path d="M59.8 53.05H27.5L13.75 76.85c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2L59.8 53.05z" fill="#2684FC" />
      <path d="M73.4 26.5l-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3L43.65 25l16.15 28.05h27.5c0-1.55-.4-3.1-1.2-4.5l-12.7-22z" fill="#FFBA00" />
    </svg>
  );
}

export function OneDriveIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 328" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="oneDriveBackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0078D4" />
          <stop offset="100%" stopColor="#005A9E" />
        </linearGradient>
        <linearGradient id="oneDriveFrontGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#28A8EA" />
          <stop offset="100%" stopColor="#0078D4" />
        </linearGradient>
      </defs>
      {/* Back cloud in Microsoft brand blue */}
      <path
        d="M301.2 126.8c0-39.7-32.3-72-72-72-30.8 0-57.1 19.6-67.6 47.1-6.4-3.5-13.8-5.5-21.7-5.5-25.1 0-45.5 20.4-45.5 45.5 0 2.8.3 5.6.8 8.3C66.1 157.7 40 186.2 40 220.3c0 35.3 28.7 64 64 64h113.8c-2.7-14.6 1.9-30.1 13.2-41.2 11.5-11.4 27.5-16.1 43-12.7 3.5-26.6 23.3-48.2 49.5-54.3-1.6-4.5-2.5-9.3-2.5-14.3 0-20.2 14.4-36.8 33.2-39z"
        fill="url(#oneDriveBackGrad)"
      />
      {/* Front overlapping cloud in bright cyan-blue */}
      <path
        d="M403.5 174.4c-4.2-1.3-8.7-2-13.3-2-19.4 0-36.5 10.6-45.5 26.5-7.3-4.5-15.8-7.2-24.9-7.2-25.7 0-46.7 20.2-48.2 45.5-2.4-.4-4.8-.6-7.4-.6-23.7 0-43.1 18.8-44.2 42.4h203.7c17.6 0 31.9-14.3 31.9-31.9 0-21.7-14.1-36.1-32-38.4z"
        fill="url(#oneDriveFrontGrad)"
      />
    </svg>
  );
}

function CloudVisual({ accent, reduced }: VisualProps) {
  const chunks = useLoopCounter(24, 110, 1500, !reduced);

  const providers = [
    {
      name: "Google Drive",
      icon: <GoogleDriveIcon className="h-5 w-5" />,
      badge: "PKCE VFS",
      badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      size: "2.4 TB Virtual",
      diskInfo: "0 B local disk",
      path: "/Volumes/GDrive/Projects",
    },
    {
      name: "Dropbox",
      icon: <FontAwesomeIcon icon={faDropbox} className="text-lg text-[#0061FF]" />,
      badge: "PKCE VFS",
      badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      size: "850 GB Virtual",
      diskInfo: "0 B local disk",
      path: "/Volumes/Dropbox/Raw_Assets",
    },
    {
      name: "Microsoft OneDrive",
      icon: <OneDriveIcon className="h-5 w-5" />,
      badge: "Local Directory",
      badgeColor: "text-sky-400 bg-sky-500/10 border-sky-500/20",
      size: "Local Folder",
      diskInfo: "Native local sync",
      path: "C:\\Users\\User\\OneDrive",
    },
  ];

  return (
    <div className="space-y-3.5 w-full">
      <div className="flex items-center justify-between pb-1 text-xs font-mono text-[#94A3B8]">
        <span className="flex items-center gap-2">
          <Cloud size={14} className="text-secondary" />
          <span className="text-white/90">Cloud VFS & Local Sync</span>
        </span>
        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-secondary/20 text-secondary border border-secondary/30">
          On-Demand + Local
        </span>
      </div>

      <div className="space-y-2.5">
        {providers.map((p) => (
          <div
            key={p.name}
            className="flex items-center justify-between p-3.5 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-all duration-300 hover:border-white/20"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/10 bg-white/[0.04]">
                {p.icon}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white truncate font-heading">{p.name}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${p.badgeColor}`}>
                    {p.badge}
                  </span>
                </div>
                <span className="text-xs font-mono text-[#94A3B8] block truncate mt-0.5">
                  {p.path}
                </span>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-xs font-mono text-white/90 block font-semibold">{p.size}</span>
              <span className="text-[10px] font-mono text-white/40 block mt-0.5">{p.diskInfo}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-4 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="flex items-center gap-2 text-white/90">
            <Folder size={14} className="text-amber-400" />
            <span>interview_cut_4k.mov</span>
          </span>
          <span className="tabular-nums text-emerald-400 font-semibold">
            chunk {chunks}/24 · streaming
          </span>
        </div>

        <div className="grid grid-cols-[repeat(24,minmax(0,1fr))] gap-[3px]">
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              className="h-3 rounded-[3px] transition-colors duration-150"
              style={{
                background:
                  i < chunks
                    ? accent
                    : i === chunks
                    ? hexA(accent, 0.45)
                    : "rgba(255,255,255,0.08)",
              }}
            />
          ))}
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8] pt-0.5">
          <span>Buffer: Zero Cache Waste</span>
          <span className="text-emerald-400">Stream on Demand</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- 3. Remote SSH ---------- */

const TREE: { n: string; d: number; dir?: boolean; sel?: boolean }[] = [
  { n: "etc", d: 0, dir: true },
  { n: "nginx", d: 1, dir: true },
  { n: "sites-enabled", d: 2, dir: true },
  { n: "app.conf", d: 3, sel: true },
  { n: "nginx.conf", d: 2 },
  { n: "ssl", d: 2, dir: true },
];

const CONF: [number, [string, string][]][] = [
  [0, [["server", "text-sky-400"], [" {", "text-white/60"]]],
  [1, [["listen ", "text-sky-400"], ["443 ssl http2;", "text-white/80"]]],
  [1, [["server_name ", "text-sky-400"], ["api.production.com;", "text-white/80"]]],
  [1, [["location ", "text-sky-400"], ["/ {", "text-white/60"]]],
];
const TYPED_LINE = "proxy_pass http://127.0.0.1:8080;";

function SshVisual({ accent, reduced }: VisualProps) {
  const typed = useTyped(TYPED_LINE, 34, 700, !reduced);
  const done = typed.length === TYPED_LINE.length;

  return (
    <div className="space-y-3.5 w-full">
      <div className="flex items-center justify-between pb-1 text-xs font-mono text-[#94A3B8]">
        <span className="flex items-center gap-2">
          <FontAwesomeIcon icon={faLinux} className="text-white text-sm" />
          <span className="text-white/90">ssh://root@194.135.22.41:22</span>
        </span>
        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          Pipelined SFTP
        </span>
      </div>

      <div className="grid grid-cols-[132px_1fr] sm:grid-cols-[150px_1fr] overflow-hidden rounded-2xl border border-white/10 bg-[#02050e]/90 backdrop-blur-xl">
        {/* remote tree */}
        <div className="space-y-0.5 border-r border-white/10 p-3 text-[11px] font-mono">
          {TREE.map((t, i) => (
            <motion.div
              key={t.n + i}
              initial={reduced ? false : { opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.07 }}
              className="flex items-center gap-1.5 rounded-md px-1.5 py-1"
              style={{
                paddingLeft: 6 + t.d * 9,
                background: t.sel ? hexA(accent, 0.16) : undefined,
                color: t.sel ? accent : "rgba(255,255,255,0.65)",
              }}
            >
              {t.dir ? <Folder size={12} className="shrink-0" /> : <FileText size={12} className="shrink-0" />}
              <span className="truncate">{t.n}</span>
            </motion.div>
          ))}
        </div>

        {/* editor */}
        <div className="p-4 font-mono text-[11px] sm:text-xs leading-relaxed">
          {CONF.map(([indent, segs], i) => (
            <div key={i} className="flex gap-3 whitespace-pre" style={{ paddingLeft: indent * 14 }}>
              <span className="w-3 select-none text-right text-white/20">{i + 1}</span>
              <span>
                {segs.map(([t, c], j) => (
                  <span key={j} className={c}>
                    {t}
                  </span>
                ))}
              </span>
            </div>
          ))}
          <div className="flex gap-3 whitespace-pre" style={{ paddingLeft: 28 }}>
            <span className="w-3 select-none text-right text-white/20">5</span>
            <span className="text-emerald-400">
              {typed}
              {!done && <span className="ml-px inline-block h-3.5 w-[7px] translate-y-[2px] animate-pulse bg-emerald-400" />}
            </span>
          </div>
          <div className="flex gap-3 whitespace-pre text-white/60" style={{ paddingLeft: 14 }}>
            <span className="w-3 select-none text-right text-white/20">6</span>
            <span>{"}"}</span>
          </div>
          <div className="flex gap-3 whitespace-pre text-white/60">
            <span className="w-3 select-none text-right text-white/20">7</span>
            <span>{"}"}</span>
          </div>
        </div>
      </div>

      <motion.div
        animate={{ opacity: done ? 1 : 0, y: done ? 0 : 6 }}
        transition={{ duration: 0.35 }}
        className="rounded-2xl border border-white/10 bg-[#02050e]/90 backdrop-blur-xl p-4 font-mono text-[11px] sm:text-xs"
      >
        <div className="text-white/40">
          root@debian-fra-01:/etc/nginx# <span className="text-white/80">nginx -t</span>
        </div>
        <div className="mt-1.5 flex items-center gap-1.5 text-emerald-400 font-semibold">
          <Check size={13} /> syntax is ok · saved over SSH in 12 ms · 0 temp files locally
        </div>
      </motion.div>
    </div>
  );
}

/* ---------- 4. Torrent P2P Swarm Downloader ---------- */

const TOTAL_PIECES = 40;
const BARS = 28;

function TorrentVisual({ accent, reduced }: VisualProps) {
  const done = useLoopCounter(TOTAL_PIECES, 160, 1800, !reduced);
  const pct = done / TOTAL_PIECES;

  return (
    <div className="space-y-3.5 w-full">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-1 text-xs font-mono text-[#94A3B8]">
        <span className="flex items-center gap-2">
          <Download size={14} className="text-amber-400" />
          <span className="text-white/90">P2P Swarm Downloader</span>
        </span>
        <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
          </span>
          Line-Rate P2P · libtorrent v2
        </span>
      </div>

      {/* Main Download Card */}
      <div className="space-y-3.5 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
            <FontAwesomeIcon icon={faUbuntu} className="text-[#E95420] text-xl" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h4 className="truncate text-xs sm:text-sm font-semibold text-white font-mono">
                ubuntu-24.04-desktop-amd64.iso
              </h4>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                P2P Swarm
              </span>
            </div>
            <span className="text-[11px] font-mono font-medium text-[#94A3B8] block mt-0.5">
              1,420 peers · 412 seeds · DHT / PeX
            </span>
          </div>
          <span className="text-sm font-bold tabular-nums text-white font-mono">{Math.round(pct * 100)}%</span>
        </div>

        {/* Download Progress Bar */}
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full transition-[width] duration-150 ease-linear"
            style={{ width: `${pct * 100}%`, background: `linear-gradient(90deg, ${hexA(accent, 0.6)}, ${accent})` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8]">
          <span className="tabular-nums">{(pct * 5.8).toFixed(2)} GB / 5.80 GB</span>
          <span>
            <span className="text-emerald-400 font-bold">↓ 52.4 MB/s</span> · ↑ 4.8 MB/s · ETA: {Math.max(1, Math.round((1 - pct) * 45))}s
          </span>
        </div>
      </div>

      {/* Piece Verification & Swarm Health Card */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-4 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="uppercase tracking-wider text-[#94A3B8] flex items-center gap-2">
            <span>Piece Map</span>
            <span className="text-white/40">·</span>
            <span className="text-amber-400 font-semibold">Blake3 Hash Tree</span>
          </span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
            <Check size={12} />
            Swarm Health: 100%
          </span>
        </div>

        {/* Piece Grid */}
        <div className="grid grid-cols-[repeat(20,minmax(0,1fr))] gap-[3px]">
          {Array.from({ length: TOTAL_PIECES }).map((_, i) => (
            <span
              key={i}
              className={`h-3.5 rounded-[3px] transition-colors duration-150 ${i === done ? "animate-pulse ring-1 ring-white" : ""}`}
              style={{
                background: i < done ? accent : i === done ? hexA(accent, 0.5) : "rgba(255,255,255,0.08)",
              }}
            />
          ))}
        </div>

        {/* Multi-peer Transfer Waveform */}
        <div className="mt-3 flex h-9 items-end gap-[3px]" aria-hidden>
          {Array.from({ length: BARS }).map((_, i) => {
            const h = 25 + 65 * Math.abs(Math.sin(i * 0.55 + done * 0.35));
            return (
              <span
                key={i}
                className="flex-1 rounded-sm transition-[height] duration-150"
                style={{ height: `${h}%`, background: hexA(accent, 0.28 + (h / 100) * 0.4) }}
              />
            );
          })}
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8] pt-0.5">
          <span>Concurrent I/O: 28 peer connections</span>
          <span className="text-amber-400 font-medium">Automatic Piece Hash Check</span>
        </div>
      </div>
    </div>
  );
}

const META: { Visual: React.ComponentType<VisualProps> }[] = [
  { Visual: EngineVisual },
  { Visual: CloudVisual },
  { Visual: SshVisual },
  { Visual: TorrentVisual },
];

/* -------------------------------------------------------------------------- */
/*  Main component                                                             */
/* -------------------------------------------------------------------------- */

export default function CinematicScrollJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const reduced = !!useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const setFromProgress = useCallback((p: number) => {
    const step = Math.max(0, Math.min(Math.floor(p * STAGES.length), STAGES.length - 1));
    setActiveStage((prev) => (prev === step ? prev : step));
  }, []);

  useMotionValueEvent(scrollYProgress, "change", setFromProgress);

  // Direct window scroll listener as a resilient fallback
  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const distance = el.offsetHeight - window.innerHeight;
      if (distance <= 0) return;
      setFromProgress(Math.max(0, Math.min(1, -rect.top / distance)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setFromProgress]);

  const current = STAGES[activeStage] ?? STAGES[0];
  const meta = META[activeStage] ?? META[0];
  const Visual = meta.Visual;

  // Headline split into a bright lead and a dimmed follow-up
  const cut = current.title.indexOf(". ");
  const lead = cut === -1 ? current.title : current.title.slice(0, cut + 1);
  const follow = cut === -1 ? "" : current.title.slice(cut + 2);
  const words = [
    ...lead.split(" ").map((w) => ({ w, dim: false })),
    ...(follow ? follow.split(" ").map((w) => ({ w, dim: true })) : []),
  ];

  return (
    <div
      id="features-cinematic"
      ref={containerRef}
      className="relative h-[400vh] w-full bg-[#00020C]"
    >
      {/* Sticky Viewport Container - centered vertically accounting for the fixed navbar */}
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-20 pb-4">
        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Stage Narrative */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                variants={container}
                initial="hidden"
                animate="show"
                exit="exit"
                className="space-y-5"
              >
                <motion.h2
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.028 } } }}
                  className="font-heading text-3xl font-bold leading-[1.08] tracking-tight sm:text-5xl"
                >
                  {words.map(({ w, dim }, i) => (
                    <motion.span
                      key={i}
                      variants={wordV}
                      className={`mr-[0.25em] inline-block ${dim ? "text-white/45" : "text-white"}`}
                    >
                      {w}
                    </motion.span>
                  ))}
                </motion.h2>

                <motion.p variants={rise} className="text-base font-medium leading-snug text-white/90 sm:text-lg">
                  {current.tagline}
                </motion.p>

                <motion.p
                  variants={rise}
                  className="hidden text-sm leading-relaxed text-[#94A3B8] sm:block sm:text-base"
                >
                  {current.description}
                </motion.p>

                {/* Key Spec Grid - Design consistent with rest of website */}
                <motion.div
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
                  className="grid grid-cols-2 gap-3 pt-2 font-sans"
                >
                  {current.specs.map((spec, i) => (
                    <motion.div
                      key={spec.label}
                      variants={rise}
                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] backdrop-blur-xl"
                    >
                      <span className="block text-[11px] font-mono uppercase tracking-[0.15em] text-[#94A3B8]">
                        {spec.label}
                      </span>
                      <span className="mt-1.5 block font-heading text-xl sm:text-2xl font-bold tracking-tight text-white tabular-nums">
                        <AnimatedValue value={spec.value} delay={350 + i * 80} reduced={reduced} />
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Interactive Demo Visuals (outside enclosing card) */}
          <div className="relative lg:col-span-6 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full"
              >
                <Visual accent={current.accent} reduced={reduced} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}