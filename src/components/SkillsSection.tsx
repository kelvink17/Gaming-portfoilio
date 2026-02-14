"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import FootballAnimation from "./FootballAnimation";

interface Skill {
  name: string;
  level: number;
  icon: string;
  color: string; // Tailwind gradient class
  hex: string; // Hex code for Framer Motion animations
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
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <h1
          className="text-4xl md:text-5xl font-bold font-mono text-transparent bg-clip-text
          bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink mb-4"
        >
          COMBAT STATS
        </h1>
        <p className="text-gray-400 text-sm md:text-base">
          [ NEURAL INTERFACE - SKILL ANALYSIS COMPLETE ]
        </p>
      </motion.div>

      {/* Skills Grid */}
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
              className="glass-effect rounded-lg p-6 cursor-pointer border-2 border-transparent
                transition-all duration-300"
              whileHover={{
                borderColor: skill.hex,
                boxShadow: `0 0 25px ${skill.hex}44`, // The "44" adds slight transparency
              }}
            >
              {/* Glow Background */}
              <div
                className={`absolute inset-0 rounded-lg bg-gradient-to-br ${skill.color} to-transparent 
                  opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              ></div>

              {/* Content */}
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

                {/* Experience Bar */}
                <div className="relative h-2 bg-dark-secondary rounded-full overflow-hidden border border-neon-cyan/20">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${skill.color} to-neon-pink rounded-full`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    viewport={{ once: true }}
                  ></motion.div>
                </div>

                {/* Level Display */}
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

      {/* Stats Summary */}
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
            className="glass-effect rounded-lg p-4 border border-neon-cyan/20"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            <p className="text-gray-400 text-xs font-mono">{stat.label}</p>
            <p className="text-2xl md:text-3xl font-bold text-neon-cyan mt-2">
              {stat.value}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Football Interactive Section */}
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

      {/* About Me Section */}
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
          it's interactive web platforms, real-time applications, or innovative
          digital solutions. Every project is a mission to push boundaries.
        </p>
      </motion.div>
    </div>
  );
};

export default SkillsSection;
