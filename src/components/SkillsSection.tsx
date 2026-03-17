"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, FileText } from "lucide-react";
import FootballAnimation from "./FootballAnimation";

// --- TYPEWRITER COMPONENT ---
// This handles the glitchy terminal loading effect for text
const TypewriterText = ({
  text,
  delay = 0,
  speed = 30,
}: {
  text: string;
  delay?: number;
  speed?: number;
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>_!#%";

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let currentIteration = 0;

    const startEffect = () => {
      const interval = setInterval(() => {
        setDisplayedText((prev) =>
          text
            .split("")
            .map((char, index) => {
              if (index < currentIteration) return char;
              // Add random glitch characters while "loading"
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join(""),
        );

        if (currentIteration >= text.length) {
          clearInterval(interval);
          setDisplayedText(text);
        }

        currentIteration += 1 / 3; // Controls how fast the "real" text reveals
      }, speed);
    };

    timeout = setTimeout(startEffect, delay * 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [text, delay, speed]);

  return <span>{displayedText}</span>;
};

interface Skill {
  name: string;
  level: number;
  icon: string;
  color: string;
  hex: string;
}

const SkillsSection: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skills: Skill[] = [
    {
      name: "React",
      level: 92,
      icon: "⚛️",
      color: "from-cyan-500",
      hex: "#06b6d4",
    },
    {
      name: "TypeScript",
      level: 85,
      icon: "📘",
      color: "from-blue-600",
      hex: "#2563eb",
    },
    {
      name: "Vite",
      level: 90,
      icon: "⚡",
      color: "from-purple-500",
      hex: "#a855f7",
    },
    {
      name: "Node.js",
      level: 88,
      icon: "🟢",
      color: "from-green-500",
      hex: "#22c55e",
    },
    {
      name: "Express.js",
      level: 86,
      icon: "🚀",
      color: "from-yellow-500",
      hex: "#eab308",
    },
    {
      name: "MongoDB / Atlas",
      level: 87,
      icon: "🍃",
      color: "from-emerald-500",
      hex: "#10b981",
    },
    {
      name: "REST API Development",
      level: 84,
      icon: "🔗",
      color: "from-indigo-500",
      hex: "#6366f1",
    },
    {
      name: "Authentication (JWT)",
      level: 82,
      icon: "🔐",
      color: "from-red-500",
      hex: "#ef4444",
    },
    {
      name: "Java",
      level: 75,
      icon: "☕",
      color: "from-amber-500",
      hex: "#f59e0b",
    },
    {
      name: ".NET / C#",
      level: 78,
      icon: "💠",
      color: "from-violet-500",
      hex: "#8b5cf6",
    },
    {
      name: "Flutter",
      level: 65,
      icon: "📱",
      color: "from-sky-500",
      hex: "#0ea5e9",
    },
    {
      name: "Deployment (Render / Vercel)",
      level: 80,
      icon: "🌍",
      color: "from-orange-500",
      hex: "#f97316",
    },
  ];

  return (
    <div className="w-full space-y-12 pb-20 font-mono text-white selection:bg-neon-cyan selection:text-black">
      {/* --- PROFILE & HEADER SECTION --- */}
      <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
        {/* GAMING PLAYER CARD */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-[320px] group"
        >
          <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-cyan-400 z-20" />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-pink-500 z-20" />

          <div className="relative overflow-hidden rounded-lg border border-white/10 bg-black/40 backdrop-blur-md p-2">
            <img
              src="/4.jpeg"
              alt="Profile"
              className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-500 rounded-md"
            />
            <motion.div
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 w-full h-[2px] bg-cyan-400/50 shadow-[0_0_15px_#00d4ff] z-10 pointer-events-none"
            />
            <div className="absolute bottom-4 left-4 right-4 z-20">
              <div className="bg-black/80 backdrop-blur-md p-3 border-l-4 border-cyan-400">
                <p className="text-[10px] text-cyan-400 uppercase tracking-widest">
                  System Status
                </p>
                <p className="text-lg font-bold italic">LVL 99 MASTER</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* HEADER TEXT & CV DOWNLOAD */}
        <div className="flex-1 text-center lg:text-left w-full">
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-4 uppercase italic">
            <TypewriterText text="COMBAT STATS" />
          </h1>

          <div className="flex flex-col md:flex-row gap-6 items-center mb-8 justify-center lg:justify-start">
            <p className="text-gray-400 text-xs md:text-sm">
              [{" "}
              <TypewriterText
                text="NEURAL INTERFACE - ANALYSIS COMPLETE"
                delay={0.5}
              />{" "}
              ]
            </p>

            {/* CV DOWNLOAD LINK */}
            <motion.a
              href="cv.pdf"
              download="My_Professional_CV.pdf"
              whileHover={{ scale: 1.05, borderColor: "rgba(34, 211, 238, 1)" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-sm transition-all group/cv"
            >
              <div className="p-2 bg-cyan-400/10 rounded border border-cyan-400/20">
                <FileText size={18} className="text-cyan-400" />
              </div>
              <div className="text-left">
                <p className="text-[7px] text-cyan-400/60 uppercase tracking-tighter">
                  Request_Packet
                </p>
                <p className="text-[10px] font-bold text-white uppercase flex items-center gap-2 group-hover/cv:text-cyan-400">
                  Download_CV <Download size={12} />
                </p>
              </div>
            </motion.a>
          </div>

          {/* HUD Mini-Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[9px] md:text-[10px] uppercase tracking-wider">
            {[
              { label: "Rank", val: "S-Tier" },
              { label: "Class", val: "Fullstack" },
              { label: "Role", val: "Architect" },
              { label: "Status", val: "Online" },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-2 border border-cyan-400/20 bg-cyan-400/5 text-cyan-400"
              >
                <TypewriterText
                  text={`${stat.label}: ${stat.val}`}
                  delay={1 + i * 0.2}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- SKILLS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            viewport={{ once: true }}
            onHoverStart={() => setHoveredSkill(skill.name)}
            onHoverEnd={() => setHoveredSkill(null)}
            className="group relative"
          >
            <motion.div
              className="bg-black/40 backdrop-blur-md rounded-lg p-6 cursor-pointer border-2 border-transparent transition-all duration-300"
              whileHover={{
                borderColor: skill.hex,
                boxShadow: `0 0 20px ${skill.hex}33`,
                y: -5,
              }}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl">{skill.icon}</h3>
                  <span className="text-2xl font-black text-cyan-400">
                    {skill.level}%
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white mb-4 uppercase">
                  {hoveredSkill === skill.name ? (
                    <TypewriterText text={skill.name} speed={20} />
                  ) : (
                    skill.name
                  )}
                </h4>

                <div className="relative h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${skill.color} to-pink-500`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    viewport={{ once: true }}
                  />
                </div>

                <p className="text-[10px] text-gray-500 mt-3 uppercase tracking-widest">
                  XP_STATUS:{" "}
                  {skill.level >= 90
                    ? "MASTER"
                    : skill.level >= 80
                      ? "EXPERT"
                      : "ADVANCED"}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* --- FOOTBALL SECTION --- */}
      <motion.div
        className="mt-12 p-6 bg-black/40 backdrop-blur-md border border-green-400/20 rounded-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px flex-1 bg-green-400/20" />
          <h2 className="text-xl font-black text-green-400 uppercase italic">
            Interactive Challenge
          </h2>
          <div className="h-px flex-1 bg-green-400/20" />
        </div>
        <p className="text-gray-400 text-[10px] mb-6 text-center tracking-[0.3em]">
          [ <TypewriterText text="SCORE A GOAL TO SYNCHRONIZE DATA" delay={2} />{" "}
          ]
        </p>
        <FootballAnimation onGoal={() => console.log("GOAL_SYNC_SUCCESS")} />
      </motion.div>

      {/* --- ABOUT SYSTEM SECTION --- */}
      <motion.div
        className="mt-12 bg-black/40 backdrop-blur-md rounded-lg p-8 border border-white/10 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute top-0 right-0 p-2 text-[8px] text-white/20">
          VER: 3.0.1
        </div>
        <h2 className="text-2xl font-black text-cyan-400 mb-6 uppercase italic">
          About This System
        </h2>
        <div className="space-y-4 text-gray-300 text-sm leading-relaxed max-w-3xl">
          <p>
            I am a full-stack developer focused on building high-performance,
            immersive digital ecosystems. By merging game-inspired UI with
            robust backend logic, I create applications that are as functional
            as they are engaging.
          </p>
          <p>
            Current objective: Pushing the boundaries of web interactivity and
            optimizing full-stack architectures for global scalability.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SkillsSection;
