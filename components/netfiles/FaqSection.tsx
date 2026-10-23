"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: "How does NetFiles browse Google Drive, Dropbox, and OneDrive without filling up my SSD?",
      answer:
        "NetFiles implements a high-performance C++ Virtual File System (VFS). Instead of downloading all your cloud files locally like default desktop sync clients do, it queries metadata on demand and presents your cloud files in a native Windows explorer hierarchy. Files are streamed in chunks only when you open or copy them, keeping your local disk footprint near zero."
    },
    {
      question: "How does the built-in torrent search and swarm downloader work?",
      answer:
        "NetFiles embeds the native C++ libtorrent engine directly. The search bar queries both decentralized Mainline DHT nodes and verified index feeds without opening ad-ridden torrent websites. When you start a download, our multi-peer engine connects to healthy swarm seeds and validates piece hashes using Blake3 in real time for maximum line-rate download speeds."
    },
    {
      question: "Are my SSH credentials, private keys, and cloud OAuth tokens secure?",
      answer:
        "100% yes. NetFiles operates strictly local-first. We do NOT run intermediate cloud servers or proxies. All cloud tokens and SSH private keys are encrypted locally using Windows DPAPI (Data Protection API) tied to your Windows hardware user account. Your keys and passwords never leave your computer."
    },
    {
      question: "Why C++ instead of Electron, Tauri, or C#?",
      answer:
        "File managers demand immediate response times and direct kernel/filesystem access. Electron apps typically consume 600MB to 1.5GB of RAM and stutter during 10Gbps network transfers. By writing NetFiles in pure C++20 with Win32 IOCP and asynchronous multi-threading, NetFiles uses only ~22MB of RAM, launches in 120ms, and searches 1.5 million files in 18ms via the NTFS USN Journal."
    },
    {
      question: "Can I transfer files directly between Google Drive and Dropbox?",
      answer:
        "Yes! When copying files between supported cloud providers, NetFiles leverages direct server-to-server API pipelining where possible, streaming chunks directly between cloud endpoints without saving temporary gigabytes to your local SSD or consuming double bandwidth."
    },
    {
      question: "What are the system requirements for NetFiles?",
      answer:
        "NetFiles is engineered natively for Windows 10 and Windows 11 (x64 and ARM64). It installs cleanly via a standard Windows installer (.msi) with zero bloat, no background telemetry services, and full native hardware acceleration."
    }
  ];

  return (
    <div className="w-full py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white mb-4 font-heading">
          Everything you need to know.
        </h2>
        <p className="text-base sm:text-lg text-[#94A3B8]">
          Have questions about security, cloud integrations, or torrent downloading? We have answers.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-[#070b14]/80 overflow-hidden backdrop-blur-md transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full text-left py-5 px-6 flex items-center justify-between gap-4 text-white hover:text-primary transition font-heading font-medium text-base sm:text-lg"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  size={18}
                  className={`text-white/50 shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-primary" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-6 pb-6 text-sm sm:text-base text-[#94A3B8] leading-relaxed border-t border-white/5 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
