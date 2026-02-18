"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SkillsSection from "./SkillsSection";
import ProjectsMission from "./ProjectsMission";
import ContactPage from "./ContactPage";

type PageType = "skills" | "projects" | "contact";

interface DashboardProps {
  transitionComplete: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ transitionComplete }) => {
  const [currentPage, setCurrentPage] = useState<PageType>("skills");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // --- AUDIO LOGIC ---
  const playExitSound = () => {
    // Ensure you have exit.mp3 in public/sounds/
    const audio = new Audio("/sounds/exit.mp3");
    audio.volume = 0.4;
    audio
      .play()
      .catch((e) =>
        console.log("Audio play blocked until user interaction", e),
      );
  };

  const handleExit = () => {
    playExitSound();
    // Short delay to let the sound play before navigation
    setTimeout(() => {
      window.location.href = "/";
    }, 400);
  };

  const menuItems = [
    { id: "skills", label: "Skills & Stack", icon: "⚡" },
    { id: "projects", label: "Mission Select", icon: "🎮" },
    { id: "contact", label: "Protocol", icon: "📡" },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case "skills":
        return <SkillsSection />;
      case "projects":
        return <ProjectsMission />;
      case "contact":
        return <ContactPage />;
      default:
        return <SkillsSection />;
    }
  };

  return (
    <div className="w-full h-screen bg-dark text-white overflow-hidden flex flex-col">
      {/* Mobile Menu Toggle */}
      <div className="md:hidden absolute top-4 left-4 z-50 flex gap-2">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded bg-neon-cyan/10 border border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/20"
        >
          {sidebarOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <motion.div
        className="fixed left-0 top-0 h-full w-full md:w-64 bg-dark-secondary border-r border-neon-cyan/20 z-40 
          flex flex-col p-6 gap-8 md:gap-12 overflow-y-auto"
        initial={{ x: -400 }}
        animate={
          transitionComplete &&
          (sidebarOpen ||
            (typeof window !== "undefined" && window.innerWidth >= 768))
            ? { x: 0 }
            : { x: -400 }
        }
        transition={{ duration: 0.8, type: "spring" }}
      >
        {/* --- PLAYER PROFILE WIDGET --- */}
        <div className="flex flex-col items-center gap-4 py-4 border-b border-neon-cyan/10">
          <div className="relative group cursor-crosshair">
            {/* HUD Rotating Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-2 border border-dashed border-neon-cyan/40 rounded-full"
            />

            {/* Circular Profile Frame */}
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-neon-cyan p-1 bg-dark shadow-[0_0_15px_rgba(0,212,255,0.3)]">
              <img
                src="/3.jpeg"
                alt="Player Avatar"
                className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>

            {/* Live Indicator */}
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-neon-green border-2 border-dark-secondary rounded-full animate-pulse shadow-[0_0_10px_#39ff14]"></div>
          </div>

          <div className="text-center">
            <h2 className="text-lg font-bold font-mono text-white tracking-tighter uppercase">
              PLAYER_ONE
            </h2>
            <p className="text-[10px] text-neon-cyan font-mono opacity-70 tracking-widest uppercase">
              Rank: Master Architect
            </p>
          </div>

          {/* EXIT ARENA BUTTON (Back to Landing) */}
          <motion.button
            onClick={handleExit}
            whileHover={{
              scale: 1.05,
              boxShadow: "0_0_20px_rgba(255,0,110,0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="mt-2 flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-pink/40 
              text-[10px] font-mono text-neon-pink hover:bg-neon-pink/10 transition-all uppercase tracking-[0.2em] group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">
              ↩
            </span>{" "}
            EXIT_ARENA
          </motion.button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-4 flex-1">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => {
                setCurrentPage(item.id as PageType);
                setSidebarOpen(false);
              }}
              className={`relative px-4 py-3 text-left font-mono text-sm uppercase tracking-wider transition-all duration-300 
                ${currentPage === item.id ? "text-neon-cyan bg-neon-cyan/5" : "text-gray-400 hover:text-neon-cyan hover:bg-white/5"}`}
              initial={{ opacity: 0, x: -20 }}
              animate={
                transitionComplete
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: -20 }
              }
              transition={{ delay: index * 0.1 + 0.5 }}
              whileHover={{ x: 5 }}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
              {currentPage === item.id && (
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-1 bg-neon-cyan shadow-[0_0_10px_#00d4ff]"
                  layoutId="indicator"
                  transition={{ type: "spring", bounce: 0.2 }}
                ></motion.div>
              )}
            </motion.button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="text-[10px] text-gray-600 font-mono text-center pb-4">
          <p className="animate-pulse tracking-widest text-neon-cyan/40">
            [ NEURAL LINK ACTIVE ]
          </p>
          <p className="mt-2 opacity-50">EST. 2026 // NODE_v22.4</p>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <motion.div
        className="w-full h-full md:ml-64 overflow-y-auto relative scrollbar-hide"
        initial={{ opacity: 0 }}
        animate={transitionComplete ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="p-6 md:p-12 min-h-screen max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* CRT Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 scan-lines opacity-[0.03]"></div>

      {/* Bottom Interface Status Bar */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-10 bg-dark-secondary/90 backdrop-blur-md border-t border-neon-cyan/20
          flex items-center justify-between px-6 text-[10px] font-mono text-gray-500 z-30"
        initial={{ y: 100 }}
        animate={transitionComplete ? { y: 0 } : { y: 100 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2 text-neon-green">
            <span className="w-1.5 h-1.5 bg-neon-green rounded-full animate-pulse"></span>
            SYSTEM_STABLE
          </span>
          <span className="hidden lg:inline border-l border-white/10 pl-4 tracking-tighter">
            PING: 12ms
          </span>
          <span className="hidden lg:inline tracking-tighter">
            LOC: LAGOS_NGA
          </span>
        </div>
        <div className="flex gap-6 uppercase">
          <span className="hidden sm:inline">GPU_LOAD: 14%</span>
          <span className="text-neon-purple">MEM_POOL: 42%</span>
          <span className="text-neon-cyan animate-pulse">SYNC_OK</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
