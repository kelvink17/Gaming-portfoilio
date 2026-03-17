"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Cpu, Globe, ShieldCheck } from "lucide-react";

interface Mission {
  id: number;
  name: string;
  description: string;
  tags: string[];
  stack: string[];
  difficulty: "EASY" | "MEDIUM" | "HARD" | "INSANE";
  link: string;
  status: "COMPLETE" | "ACTIVE";
  mediaType: "image" | "video";
  mediaUrl: string;
}

const AutoPlayingVideo = ({ src }: { src: string }) => (
  <video
    src={src}
    autoPlay
    loop
    muted
    playsInline
    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
  />
);

const ProjectsMission: React.FC = () => {
  const [selectedMission, setSelectedMission] = useState<number | null>(null);

  const missions: Mission[] = [
    {
      id: 1,
      name: "VINSKICONVERT",
      description:
        "Industry-level media conversion software. Extracts high-fidelity MP3 audio from MP4 files using FFmpeg processing with real-time XHR progress tracking.",
      tags: ["React", "FFmpeg", "Node.js"],
      stack: ["Vite", "Framer Motion", "Multer", "Render", "XHR", "REST API"],
      difficulty: "HARD",
      link: "https://mp4-to-mp3-front-end-nu.vercel.app",
      status: "COMPLETE",
      mediaType: "video",
      mediaUrl: "VinskiConvert.mp4",
    },
    {
      id: 2,
      name: "KELVMOVIES",
      description:
        "A high-performance movie discovery platform. Features a dynamic UI with real-time search and detailed media indexing.",
      tags: ["React", "API Integration", "Tailwind"],
      stack: ["React Router", "TMDB API", "Framer Motion", "Axios", "Vercel"],
      difficulty: "MEDIUM",
      link: "#",
      status: "COMPLETE",
      mediaType: "video",
      mediaUrl: "/kelvmovies-demo.mp4",
    },
    {
      id: 3,
      name: "CURENSEE (FLUTTER)",
      description:
        "Mobile currency utility built with Flutter. Handles real-time API data fetching and features a custom file-picking system for financial documents.",
      tags: ["Flutter", "Dart", "REST API"],
      stack: [
        "HTTP Package",
        "File Picker",
        "Provider",
        "JSON Serialization",
        "Mobile UI",
      ],
      difficulty: "HARD",
      link: "#",
      status: "ACTIVE",
      mediaType: "video",
      mediaUrl: "flutter.mp4",
    },
    {
      id: 4,
      name: "MONEY SACK",
      description:
        "Enterprise financial tracking ecosystem. Features a robust Java backend managed via a GlassFish server with high-security data protocols.",
      tags: ["Java", "GlassFish", "SQL"],
      stack: [
        "Enterprise Java Beans",
        "JDBC",
        "GlassFish Server",
        "MySQL",
        "OOP Architecture",
      ],
      difficulty: "INSANE",
      link: "#",
      status: "COMPLETE",
      mediaType: "video",
      mediaUrl: "moneysack.mp4",
    },
    {
      id: 5,
      name: "ADMIN DASHBOARD (C#)",
      description:
        "Professional administrative command center built with C#. Optimized for desktop-level management of enterprise assets and user permissions.",
      tags: ["C#", ".NET", "SQL Server"],
      stack: [
        "Windows Forms",
        "ADO.NET",
        "Entity Framework",
        "C# Logic",
        "SQL Management",
      ],
      difficulty: "HARD",
      link: "#",
      status: "COMPLETE",
      mediaType: "image",
      mediaUrl: "admindash.jpg",
    },
    {
      id: 6,
      name: "VIN COMPRESSOR",
      description:
        "Full-stack image optimization software. Leverages the Sharp library on the backend to provide lightning-fast file size reduction.",
      tags: ["Node.js", "Express", "Sharp"],
      stack: ["Multer", "fs-extra", "Buffer Handling", "Vercel", "REST API"],
      difficulty: "HARD",
      link: "https://vincompressor-frontend.vercel.app",
      status: "COMPLETE",
      mediaType: "video",
      mediaUrl: "Vincompress.mp4",
    },
    {
      id: 7,
      name: "USISKO GLOBAL",
      description:
        "Enterprise-grade digital presence for a global energy and fuel logistics corporation. Features a high-performance industrial UI, streamlined service architecture, and optimized asset delivery.",
      tags: ["React", "Tailwind CSS", "Logistics UI"],
      stack: [
        "Vite",
        "Lucide Icons",
        "Framer Motion",
        "Vercel Deployment",
        "Responsive Engine",
      ],
      difficulty: "MEDIUM",
      link: "https://usisko-project.vercel.app/",
      status: "COMPLETE",
      mediaType: "video",
      mediaUrl: "usisko.mp4",
    },
  ];

  return (
    <div className="w-full font-mono text-white p-6 bg-[#020617] bg-[radial-gradient(circle_at_50%_50%,_rgba(17,24,39,1)_0%,_rgba(2,6,23,1)_100%)] min-h-screen relative overflow-hidden">
      {/* Dynamic Background Noise/Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* HUD Header */}
      <div className="mb-12 relative z-10">
        <div className="absolute -left-6 top-0 h-full w-1.5 bg-neon-cyan shadow-[0_0_25px_#00d4ff]" />
        <motion.h1
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none drop-shadow-[0_0_10px_rgba(0,212,255,0.5)]"
        >
          Mission <span className="text-neon-cyan">Archives</span>
        </motion.h1>
        <div className="flex flex-wrap gap-4 mt-6 text-[10px] text-neon-cyan/60 uppercase tracking-[0.3em]">
          <span className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-3 py-1">
            <Cpu size={12} /> KERNEL: V-V126
          </span>
          <span className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-3 py-1">
            <Globe size={12} /> NETWORK: ENCRYPTED
          </span>
          <span className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-3 py-1">
            <ShieldCheck size={12} /> AUTH: VERIFIED
          </span>
        </div>
      </div>

      {/* Mission List */}
      <div className="space-y-8 relative z-10 max-w-7xl mx-auto">
        {missions.map((m) => (
          <motion.div
            key={m.id}
            layout
            className={`group relative transition-all duration-700 ${
              selectedMission === m.id
                ? "z-20 scale-[1.02]"
                : "z-10 hover:scale-[1.01]"
            }`}
          >
            {/* Glass Container */}
            <div
              className={`relative overflow-hidden backdrop-blur-xl border-y md:border-x transition-all duration-500 ${
                selectedMission === m.id
                  ? "bg-white/[0.07] border-neon-cyan/40 shadow-[0_0_50px_rgba(0,212,255,0.1)]"
                  : "bg-white/[0.02] border-white/10 hover:border-white/20"
              }`}
            >
              {/* Animated Glow Bar (Active State) */}
              <AnimatePresence>
                {selectedMission === m.id && (
                  <motion.div
                    layoutId="activeGlowBar"
                    className="absolute inset-y-0 left-0 w-1 bg-neon-cyan shadow-[0_0_20px_#00d4ff]"
                    initial={{ height: 0 }}
                    animate={{ height: "100%" }}
                    exit={{ height: 0 }}
                  />
                )}
              </AnimatePresence>

              <div className="p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-[10px] font-black px-3 py-1 tracking-widest ${m.status === "COMPLETE" ? "bg-green-500/20 text-green-400 border border-green-500/40" : "bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/40"}`}
                      >
                        {m.status}
                      </span>
                      <span
                        className={`text-[10px] font-black px-3 py-1 tracking-widest border ${m.difficulty === "INSANE" ? "border-pink-500/50 text-pink-500 bg-pink-500/10" : "border-purple-500/50 text-purple-500 bg-purple-500/10"}`}
                      >
                        {m.difficulty}
                      </span>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-black tracking-tighter uppercase group-hover:text-neon-cyan transition-colors duration-300">
                      {m.name}
                    </h3>
                  </div>

                  <button
                    onClick={() =>
                      setSelectedMission(selectedMission === m.id ? null : m.id)
                    }
                    className={`h-14 px-12 font-black uppercase text-[11px] tracking-[0.2em] transition-all duration-500 relative overflow-hidden ${
                      selectedMission === m.id
                        ? "bg-neon-cyan text-black shadow-[0_0_30px_rgba(0,212,255,0.4)]"
                        : "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 hover:border-neon-cyan/50"
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {selectedMission === m.id ? "CLOSE_FILE" : "DECRYPT_DATA"}
                    </span>
                  </button>
                </div>

                <AnimatePresence>
                  {selectedMission === m.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="mt-12 pt-12 border-t border-white/10 grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* High-Tech Surveillance Viewport */}
                        <div className="relative aspect-video rounded-sm overflow-hidden border border-white/20 bg-black group/media shadow-2xl">
                          <div className="absolute top-4 left-4 z-30 flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-[pulse_1s_infinite] shadow-[0_0_10px_#ef4444]" />
                            <span className="text-[10px] text-white font-bold tracking-widest bg-black/60 backdrop-blur-md px-3 py-1 border border-white/10">
                              LIVE_FEED // 00{m.id}
                            </span>
                          </div>

                          {/* Corner Accents */}
                          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-neon-cyan/50 z-20" />
                          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-neon-cyan/50 z-20" />

                          {m.mediaType === "video" ? (
                            <AutoPlayingVideo src={m.mediaUrl} />
                          ) : (
                            <img
                              src={m.mediaUrl}
                              alt="Visual Data"
                              className="w-full h-full object-cover grayscale-[0.5] group-hover/media:grayscale-0 transition-all duration-1000"
                            />
                          )}

                          {/* Scanline Overlay */}
                          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-20 opacity-30" />
                        </div>

                        {/* Intelligence Data */}
                        <div className="flex flex-col justify-between py-2">
                          <div className="space-y-10">
                            <div>
                              <h4 className="text-neon-cyan text-[10px] font-black mb-4 tracking-[0.4em] uppercase flex items-center gap-2">
                                <span className="w-8 h-[1px] bg-neon-cyan" />{" "}
                                Mission Objective
                              </h4>
                              <p className="text-gray-400 text-lg leading-relaxed font-sans font-light italic">
                                "{m.description}"
                              </p>
                            </div>

                            <div>
                              <h4 className="text-purple-400 text-[10px] font-black mb-4 tracking-[0.4em] uppercase flex items-center gap-2">
                                <span className="w-8 h-[1px] bg-purple-400" />{" "}
                                Tech_Stack_Manifest
                              </h4>
                              <div className="flex flex-wrap gap-3">
                                {m.stack.map((s) => (
                                  <span
                                    key={s}
                                    className="text-[10px] bg-white/[0.03] backdrop-blur-md border border-white/10 px-4 py-2 text-gray-300 font-bold hover:border-neon-cyan/50 hover:text-white transition-all duration-300"
                                  >
                                    {s}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="mt-12 p-6 backdrop-blur-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
                            <div className="text-[9px] text-white/30 tracking-widest">
                              SEGMENT_TYPE:{" "}
                              <span className="text-white/60">
                                PRODUCTION_BUILD
                              </span>
                              <br />
                              DATA_ID:{" "}
                              <span className="text-white/60">
                                0x992{m.id}A-VKS
                              </span>
                            </div>
                            <a
                              href={m.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/btn flex items-center gap-3 text-neon-cyan text-xs font-black tracking-widest px-8 py-3 border border-neon-cyan/30 hover:border-neon-cyan hover:bg-neon-cyan/10 transition-all duration-300"
                            >
                              ACCESS_SYSTEM{" "}
                              <ExternalLink
                                size={16}
                                className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsMission;
