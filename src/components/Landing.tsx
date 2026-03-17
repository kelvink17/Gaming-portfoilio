"use client";

import React, { useState, useEffect } from "react";
import LandingScene from "./LandingScene";
import ParticleEffect from "./ParticleEffect";
import { motion } from "framer-motion";

interface LandingProps {
  onEnter: () => void;
}

const Landing: React.FC<LandingProps> = ({ onEnter }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const glitchVariants = {
    animate: {
      textShadow: [
        "0 0 0 transparent",
        "3px 3px 0 #00d4ff, -3px -3px 0 #b026ff",
        "0 0 0 transparent",
      ],
      transition: { duration: 0.3, repeat: Infinity, repeatDelay: 2 },
    },
  };

  return (
    <div className="relative w-full h-screen bg-dark overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
        <LandingScene />
      </div>

      {/* Particle Effect */}
      <ParticleEffect />

      {/* Scan Lines */}
      <div className="fixed inset-0 pointer-events-none z-20 scan-lines opacity-10"></div>

      {/* Content Overlay */}
      <motion.div
        className="relative z-30 w-full h-full flex flex-col items-center justify-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate={isReady ? "visible" : "hidden"}
      >
        {/* Main Title */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 font-mono text-white drop-shadow-[0_0_15px_rgba(0,212,255,0.7)]"
            variants={glitchVariants}
            animate="animate"
          >
            PORTFOLIO
          </motion.h1>
          <motion.div
            className="h-1 w-32 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink mx-auto shadow-[0_0_10px_rgba(0,212,255,0.5)]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          ></motion.div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-2xl text-neon-cyan mb-4 font-mono max-w-2xl drop-shadow-[0_0_8px_rgba(0,212,255,0.5)]"
        >
          An Experience, Not a Resume.
        </motion.p>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-sm md:text-base text-gray-300 mb-12 max-w-2xl text-center drop-shadow-md"
        >
          Step into an immersive digital journey. Witness 3D environments,
          interactive missions, and a football-fueled showcase of skills.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          variants={itemVariants}
          onClick={onEnter}
          className="relative px-8 md:px-12 py-3 md:py-4 text-base md:text-lg font-bold font-mono uppercase tracking-widest
            border-2 border-neon-cyan text-neon-cyan hover:text-dark
            transition-all duration-300 overflow-hidden group cursor-pointer
            shadow-[0_0_15px_rgba(0,212,255,0.5)] hover:shadow-[0_0_25px_rgba(0,212,255,0.8)]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="absolute inset-0 bg-neon-cyan translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-[-1]"></div>
          <span>Enter The Arena</span>
        </motion.button>

        {/* Bottom Info */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-8 text-center text-xs md:text-sm text-gray-400 font-mono"
        >
          <p className="text-neon-cyan/70 drop-shadow-[0_0_4px_rgba(0,212,255,0.3)]">
            [ INITIALIZING NEURAL NETWORK ]
          </p>
          <div className="flex justify-center gap-2 mt-2">
            <span className="inline-block w-2 h-2 rounded-full bg-neon-green animate-pulse shadow-[0_0_8px_#39ff14]"></span>
            <span
              className="inline-block w-2 h-2 rounded-full bg-neon-green animate-pulse shadow-[0_0_8px_#39ff14]"
              style={{ animationDelay: "0.2s" }}
            ></span>
            <span
              className="inline-block w-2 h-2 rounded-full bg-neon-green animate-pulse shadow-[0_0_8px_#39ff14]"
              style={{ animationDelay: "0.4s" }}
            ></span>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 left-10 text-neon-cyan/30 font-mono text-xs drop-shadow-[0_0_4px_rgba(0,212,255,0.3)]"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        {"> SYSTEM READY"}
      </motion.div>
    </div>
  );
};

export default Landing;
