"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";
import gsap from "gsap";

// FIX: Define explicit HEX codes so Framer/GSAP don't guess
const COLORS = {
  cyan: "#00f3ff",
  purple: "#bc13fe",
  dark: "#0a0e27",
};

function App() {
  const [isEntering, setIsEntering] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [transitionComplete, setTransitionComplete] = useState(false);

  const handleEnter = () => {
    setIsEntering(true);

    const tl = gsap.timeline();
    tl.to("body", {
      duration: 0.5,
      backgroundColor: COLORS.dark, // Use constant
    })
      .to(
        ".transition-overlay",
        {
          duration: 1.2,
          scaleY: 1,
          ease: "power2.inOut",
        },
        0.3,
      )
      .to(".transition-overlay", {
        duration: 1.2,
        scaleY: 0,
        ease: "power2.inOut",
        delay: 0.8,
      });

    setTimeout(() => {
      setShowDashboard(true);
      setTransitionComplete(true);
    }, 1500);
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-black">
      {/* Transition Overlay - Using Inline Style for the gradient colors to be safe */}
      <motion.div
        className="transition-overlay fixed inset-0 z-50 origin-top pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, ${COLORS.cyan}, ${COLORS.purple}, ${COLORS.dark})`,
        }}
        initial={{ scaleY: 0 }}
      />

      <AnimatePresence mode="wait">
        {!showDashboard ? (
          <motion.div
            key="landing"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Landing onEnter={handleEnter} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Dashboard transitionComplete={transitionComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="fixed top-1/4 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: COLORS.cyan, opacity: 0.3 }}
        animate={{
          y: [0, 50, 0],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="fixed bottom-1/4 left-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: COLORS.purple, opacity: 0.3 }}
        animate={{
          y: [0, -50, 0],
          x: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

export default App;
