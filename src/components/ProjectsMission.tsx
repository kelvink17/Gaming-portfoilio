"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Cpu,
  Globe,
  ShieldCheck,
  Zap,
  Activity,
} from "lucide-react";

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

// ----------------------------------------------
// 1. Background Particle Canvas (cyber‑grid + floating dots)
// ----------------------------------------------
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }[] = [];

    // Create 100 floating particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 1.5 + 0.5,
      });
    }

    // Draw grid lines
    const drawGrid = () => {
      ctx.strokeStyle = "#00d4ff";
      ctx.lineWidth = 0.3;
      ctx.globalAlpha = 0.15;

      const step = 40;
      ctx.beginPath();
      for (let x = 0; x < width; x += step) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += step) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw grid
      drawGrid();

      // Update and draw particles
      ctx.globalAlpha = 0.6;
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = "#b026ff";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
    />
  );
};

// ----------------------------------------------
// 2. Auto‑playing video component (unchanged)
// ----------------------------------------------
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

// ----------------------------------------------
// 3. Difficulty color map
// ----------------------------------------------
const difficultyColor = {
  EASY: "#39ff14",
  MEDIUM: "#00d4ff",
  HARD: "#b026ff",
  INSANE: "#ff006e",
};

// ----------------------------------------------
// 4. Main Component
// ----------------------------------------------
const ProjectsMission: React.FC = () => {
  const [selectedMission, setSelectedMission] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [terminalText, setTerminalText] = useState(">_ SYSTEM ONLINE");

  // Simulate terminal ticker
  useEffect(() => {
    const messages = [
      ">_ SCANNING NETWORK...",
      ">_ FIREWALL ACTIVE",
      ">_ 6 NODES DETECTED",
      ">_ ENCRYPTION: AES-256",
      ">_ MISSION CONTROL STANDBY",
    ];
    let i = 0;
    const interval = setInterval(() => {
      setTerminalText(messages[i % messages.length]);
      i++;
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const playClickSound = () => {
    const context = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(800, context.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, context.currentTime + 0.1);
    gain.gain.setValueAtTime(0.05, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(context.destination);
    osc.start();
    osc.stop(context.currentTime + 0.1);
  };

  // Track mouse for 3D tilt effect
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const missions: Mission[] = [
    {
      id: 1,
      name: "VINSKICONVERT",
      description:
        "Industry-level media conversion software. Extracts high-fidelity MP3 audio from MP4 files using FFmpeg processing.",
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
        "A high-performance movie discovery platform. Features a dynamic UI with real-time search.",
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
        "Mobile currency utility built with Flutter. Handles real-time API data fetching.",
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
        "Enterprise financial tracking ecosystem with high-security data protocols.",
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
      name: "ADMIN DASHBOARD",
      description:
        "Professional administrative command center built with C# for enterprise management.",
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
        "Full-stack image optimization software leveraging the Sharp library.",
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
        "Enterprise-grade digital presence for a global energy and fuel logistics corporation.",
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
    <div className="relative w-full font-mono text-white bg-[#020617] min-h-screen overflow-hidden">
      {/* Background layers */}
      <ParticleBackground />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(17,24,39,0.8)_0%,_rgba(2,6,23,0.9)_100%)] z-0" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3czLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIj48cGF0aCBkPSJNMjAgMjBoMjB2MjBIMjB6IiBmaWxsPSIjMDBkNGZmIiBmaWxsLW9wYWNpdHk9IjAuMDMiLz48L3N2Zz4=')] opacity-20 z-0" />

      {/* Live HUD overlay */}
      <div className="fixed top-4 right-4 z-50 text-[8px] text-neon-cyan/50 font-mono bg-black/40 backdrop-blur border border-white/10 p-2 rounded">
        <div className="flex items-center gap-2">
          <Activity size={12} className="animate-pulse" />
          <span>{terminalText}</span>
        </div>
        <div className="flex gap-1 mt-1">
          <span className="w-1 h-1 bg-green-500 rounded-full animate-ping" />
          <span className="text-white/30">UPTIME 99.7%</span>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 p-4 md:p-8">
        {/* HUD Header */}
        <div className="mb-8 md:mb-12 relative">
          <div className="absolute -left-4 md:-left-6 top-0 h-full w-1 md:w-1.5 bg-neon-cyan shadow-[0_0_20px_#00d4ff]" />
          <motion.h1
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-3xl sm:text-4xl md:text-7xl font-black tracking-tighter uppercase italic leading-tight"
          >
            Mission <span className="text-neon-cyan">Archives</span>
          </motion.h1>

          {/* Network Status Tags - scrolled horizontally */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2 no-scrollbar text-[8px] md:text-[10px] text-neon-cyan/60 uppercase tracking-[0.2em]">
            <span className="flex-shrink-0 flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-2 py-1">
              <Cpu size={10} /> KERNEL: V-V126
            </span>
            <span className="flex-shrink-0 flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-2 py-1">
              <Globe size={10} /> NETWORK: OK
            </span>
            <span className="flex-shrink-0 flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-2 py-1">
              <ShieldCheck size={10} /> AUTH: VERIFIED
            </span>
          </div>
        </div>

        {/* Mission List */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8 max-w-screen-2xl mx-auto pb-20">
          {missions.map((m) => {
            const isSelected = selectedMission === m.id;
            const diffColor = difficultyColor[m.difficulty];

            // Calculate tilt based on mouse (only when not selected)
            const tiltX = mousePos.y / window.innerHeight - 0.5;
            const tiltY = mousePos.x / window.innerWidth - 0.5;

            return (
              <motion.div
                key={m.id}
                layout
                className={`relative transition-all duration-500 ${
                  isSelected ? "z-20 scale-[1.02]" : "z-10 hover:z-20"
                }`}
                style={{
                  rotateX: !isSelected ? tiltX * 2 : 0,
                  rotateY: !isSelected ? tiltY * 2 : 0,
                  transformPerspective: 1000,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div
                  className={`relative overflow-hidden backdrop-blur-xl border-y md:border-x transition-all duration-500 ${
                    isSelected
                      ? `bg-white/[0.08] border-${diffColor} shadow-[0_0_60px_${diffColor}20]`
                      : "bg-white/[0.02] border-white/10 hover:border-white/30"
                  }`}
                >
                  {/* Animated gradient border on hover */}
                  {!isSelected && (
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${diffColor}20, transparent)`,
                        filter: "blur(20px)",
                      }}
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "linear",
                      }}
                    />
                  )}

                  <div className="p-4 md:p-8 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="space-y-2 md:space-y-4 w-full">
                        <div className="flex items-center gap-2 md:gap-4">
                          <span className="text-[8px] md:text-[10px] font-black px-2 py-0.5 tracking-widest bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/40">
                            {m.status}
                          </span>
                          <span
                            className="text-[8px] md:text-[10px] font-black px-2 py-0.5 tracking-widest border"
                            style={{
                              borderColor: diffColor,
                              color: diffColor,
                              backgroundColor: `${diffColor}10`,
                            }}
                          >
                            {m.difficulty}
                          </span>
                        </div>
                        <h3
                          className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tighter uppercase break-words leading-none"
                          style={{ textShadow: `0 0 10px ${diffColor}` }}
                        >
                          {m.name}
                        </h3>
                      </div>

                      <button
                        onClick={() => {
                          playClickSound();
                          setSelectedMission(isSelected ? null : m.id);
                        }}
                        className={`w-full md:w-auto h-12 md:h-14 px-8 font-black uppercase text-[10px] tracking-[0.2em] transition-all duration-300 relative overflow-hidden group/btn ${
                          isSelected
                            ? "bg-neon-cyan text-black"
                            : "bg-white/10 backdrop-blur-md text-white border border-white/20"
                        }`}
                      >
                        <span className="relative z-10">
                          {isSelected ? "CLOSE_FILE" : "DECRYPT_DATA"}
                        </span>
                        {!isSelected && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            animate={{
                              x: ["-100%", "100%"],
                            }}
                            transition={{
                              repeat: Infinity,
                              duration: 2,
                              ease: "linear",
                            }}
                          />
                        )}
                      </button>
                    </div>

                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          <div className="mt-6 md:mt-12 pt-6 md:pt-12 border-t border-white/10 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
                            {/* Viewport */}
                            <div className="relative aspect-video rounded-sm overflow-hidden border border-white/20 bg-black group/viewport">
                              <div className="absolute top-2 left-2 z-30 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_5px_#ef4444]" />
                                <span className="text-[8px] text-white font-bold tracking-widest bg-black/60 px-2 py-0.5">
                                  FEED // {m.id}
                                </span>
                              </div>
                              {/* Scanline overlay */}
                              <div className="absolute inset-0 pointer-events-none z-10 bg-scanline opacity-20" />
                              {m.mediaType === "video" ? (
                                <AutoPlayingVideo src={m.mediaUrl} />
                              ) : (
                                <img
                                  src={m.mediaUrl}
                                  alt="Visual"
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>

                            {/* Data Info */}
                            <div className="flex flex-col justify-between">
                              <div className="space-y-6 md:space-y-10">
                                <div>
                                  <h4 className="text-neon-cyan text-[9px] font-black mb-2 tracking-[0.3em] uppercase">
                                    Mission Objective
                                  </h4>
                                  <p className="text-gray-400 text-sm md:text-lg leading-relaxed italic">
                                    "{m.description}"
                                  </p>
                                </div>

                                <div>
                                  <h4 className="text-purple-400 text-[9px] font-black mb-3 tracking-[0.3em] uppercase">
                                    Tech_Stack
                                  </h4>
                                  <div className="flex flex-wrap gap-2">
                                    {m.stack.map((s) => (
                                      <span
                                        key={s}
                                        className="text-[8px] md:text-[10px] bg-white/[0.03] border border-white/10 px-3 py-1.5 text-gray-300 font-bold hover:border-neon-cyan/50 transition-all"
                                      >
                                        {s}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Action Footer */}
                              <div className="mt-8 p-4 md:p-6 bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div className="text-[8px] text-white/30 tracking-widest leading-normal">
                                  ID_HASH:{" "}
                                  <span className="text-white/60">
                                    0x992{m.id}A
                                  </span>
                                  <br className="hidden sm:block" />
                                  STATUS:{" "}
                                  <span className="text-white/60">STABLE</span>
                                </div>
                                <a
                                  href={m.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-full sm:w-auto flex items-center justify-center gap-3 text-neon-cyan text-[10px] font-black tracking-[0.2em] px-6 py-3 border border-neon-cyan/30 hover:bg-neon-cyan/10 transition-all relative overflow-hidden group/link"
                                >
                                  ACCESS_SYSTEM <ExternalLink size={14} />
                                  <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent"
                                    animate={{
                                      x: ["-100%", "100%"],
                                    }}
                                    transition={{
                                      repeat: Infinity,
                                      duration: 2,
                                      ease: "linear",
                                    }}
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
            );
          })}
        </div>
      </div>

      {/* Add CSS for scanlines and hide scrollbar */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .bg-scanline {
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.1) 0px,
            rgba(0, 212, 255, 0.05) 1px,
            transparent 2px
          );
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default ProjectsMission;
