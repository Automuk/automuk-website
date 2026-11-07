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
      question: "How does NetFiles handle Google Drive, Dropbox, and OneDrive?",
      answer:
        "For Google Drive and Dropbox, NetFiles implements a high-performance C++ Virtual File System (VFS) with PKCE OAuth, querying metadata on demand and streaming chunks so local SSD footprint stays near zero. For Microsoft OneDrive, NetFiles connects directly to your existing local OneDrive directory on Windows (no PKCE required), unifying cloud streams and your local folder into one seamless tree."
    },
    {
      question: "How does the built-in torrent search and swarm downloader work?",
      answer:
        "NetFiles embeds the native C++ libtorrent engine directly for high-throughput peer-to-peer (P2P) transfers. Even though the application holds native P2P downloading and seeding services, it still requires users to configure a search API URL to query and index torrent swarms. Once your search API URL is connected, NetFiles retrieves results and handles swarm piece validation in real time for line-rate download speeds."
    },
    {
      question: "Are my SSH credentials, private keys, and cloud OAuth tokens secure?",
      answer:
        "100% yes. NetFiles operates strictly local-first with zero telemetry or intermediate proxies. For Google Drive and Dropbox, NetFiles uses standard PKCE OAuth flows. For OneDrive, it integrates with your local client folder directly. SSH connections follow standard encrypted protocol practices. When downloading torrents, keep in mind that P2P protocols share data chunks with peers when seeding. Full details are available in our NetFiles Privacy Policy."
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
