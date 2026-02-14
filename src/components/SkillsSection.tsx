"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import FootballAnimation from "./FootballAnimation";

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
      level: 95,
      icon: "⚛️",
      color: "from-cyan-500",
      hex: "#06b6d4",
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
      icon: "🔗",
      color: "from-green-500",
      hex: "#22c55e",
    },
    {
      name: "Express",
      level: 87,
      icon: "🛣️",
      color: "from-yellow-500",
      hex: "#eab308",
    },
    {
      name: "MongoDB",
      level: 85,
      icon: "🗄️",
      color: "from-pink-500",
      hex: "#ec4899",
    },
    {
      name: "Multer",
      level: 92,
      icon: "📤",
      color: "from-blue-500",
      hex: "#3b82f6",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="w-full space-y-12 pb-20">
      {/* --- NEW PROFILE & HEADER SECTION --- */}
      <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
        {/* GAMING PLAYER CARD */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-[320px] group"
        >
          {/* Cyberpunk Decorative Corners */}
          <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-neon-cyan z-20" />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-neon-pink z-20" />

          <div className="relative overflow-hidden rounded-lg border border-white/10 glass-effect p-2">
            {/* THE IMAGE - Replace 'me.png' with your actual filename */}
            <img
              src="../public/2.jpeg"
              alt="Player Profile"
              className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-500 rounded-md"
            />

            {/* Animated Scanning Line */}
            <motion.div
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 w-full h-[2px] bg-neon-cyan/50 shadow-[0_0_15px_#00d4ff] z-10 pointer-events-none"
            />

            {/* HUD Status Overlay */}
            <div className="absolute bottom-4 left-4 right-4 z-20">
              <div className="bg-black/80 backdrop-blur-md p-3 border-l-4 border-neon-cyan">
                <p className="text-[10px] font-mono text-neon-cyan uppercase tracking-widest">
                  System Status
                </p>
                <p className="text-lg font-bold font-mono text-white italic">
                  LVL 99 MASTER
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ORIGINAL HEADER TEXT */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center lg:text-left"
        >
          <h1
            className="text-4xl md:text-6xl font-bold font-mono text-transparent bg-clip-text
            bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink mb-4"
          >
            COMBAT STATS
          </h1>
          <p className="text-gray-400 text-sm md:text-base font-mono mb-8">
            [ NEURAL INTERFACE - SKILL ANALYSIS COMPLETE ]
          </p>

          {/* New HUD Mini-Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px] font-mono uppercase tracking-wider">
            <div className="p-2 border border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan">
              Rank: S-Tier
            </div>
            <div className="p-2 border border-neon-purple/20 bg-neon-purple/5 text-neon-purple">
              Class: Fullstack
            </div>
            <div className="p-2 border border-neon-pink/20 bg-neon-pink/5 text-neon-pink">
              Role: Architect
            </div>
            <div className="p-2 border border-neon-green/20 bg-neon-green/5 text-neon-green">
              Status: Online
            </div>
          </div>
        </motion.div>
      </div>

      {/* --- SKILLS GRID (Your Original Logic) --- */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {skills.map((skill) => (
          <motion.div
            key={skill.name}
            variants={itemVariants}
            onHoverStart={() => setHoveredSkill(skill.name)}
            onHoverEnd={() => setHoveredSkill(null)}
            className="group relative"
          >
            <motion.div
              className="glass-effect rounded-lg p-6 cursor-pointer border-2 border-transparent transition-all duration-300"
              whileHover={{
                borderColor: skill.hex,
                boxShadow: `0 0 25px ${skill.hex}44`,
              }}
            >
              <div
                className={`absolute inset-0 rounded-lg bg-gradient-to-br ${skill.color} to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              ></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold font-mono text-white">
                    {skill.icon}
                  </h3>
                  <span className="text-2xl font-bold text-neon-cyan">
                    {skill.level}%
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white mb-4">
                  {skill.name}
                </h4>

                <div className="relative h-2 bg-dark-secondary rounded-full overflow-hidden border border-neon-cyan/20">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${skill.color} to-neon-pink rounded-full`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    viewport={{ once: true }}
                  ></motion.div>
                </div>

                <motion.p
                  className="text-xs text-gray-400 mt-3 font-mono"
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: hoveredSkill === skill.name ? 1 : 0.5 }}
                >
                  LVL {Math.floor(skill.level / 10)} -{" "}
                  {skill.level >= 90
                    ? "MASTER"
                    : skill.level >= 80
                      ? "EXPERT"
                      : "ADVANCED"}
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* --- STATS SUMMARY --- */}
      <motion.div
        className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
      >
        {[
          { label: "Skills Mastered", value: 6 },
          { label: "Projects Deployed", value: "20+" },
          { label: "Years Experience", value: "3+" },
          { label: "Uptime", value: "99.9%" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="glass-effect rounded-lg p-4 border border-neon-cyan/20 text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <p className="text-gray-400 text-xs font-mono">{stat.label}</p>
            <p className="text-2xl md:text-3xl font-bold text-neon-cyan mt-2">
              {stat.value}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* --- FOOTBALL SECTION --- */}
      <motion.div
        className="mt-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold text-neon-green mb-6 font-mono">
          INTERACTIVE CHALLENGE
        </h2>
        <p className="text-gray-400 text-sm mb-6">
          [ SCORE A GOAL TO UNLOCK SPECIAL ACHIEVEMENT ]
        </p>
        <FootballAnimation onGoal={() => console.log("[v0] Goal scored!")} />
      </motion.div>

      {/* --- ABOUT SYSTEM SECTION --- */}
      <motion.div
        className="mt-12 glass-effect rounded-lg p-8 border border-neon-cyan/20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold text-neon-cyan mb-4 font-mono">
          ABOUT THIS SYSTEM
        </h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          I'm a full-stack developer obsessed with building fast, immersive
          digital experiences. Football fan at heart, gaming engine enthusiast
          by profession.
        </p>
        <p className="text-gray-300 leading-relaxed">
          My passion is creating experiences that make people say "wow"—whether
          it's interactive web platforms or innovative digital solutions.
        </p>
      </motion.div>
    </div>
  );
};

export default SkillsSection;
