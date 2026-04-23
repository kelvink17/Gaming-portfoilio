"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Github, Linkedin, Twitter } from "lucide-react";

const ContactPage: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Mouse position for subtle parallax (optional)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const serviceID = "service_l7jvzxl";
    const templateID = "template_gdb0974";
    const publicKey = "o7wUmDZwdIBNqe_A_";

    try {
      await emailjs.sendForm(
        serviceID,
        templateID,
        formRef.current!,
        publicKey,
      );
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Email send failed:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  // Variants for animations
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

  const colors = {
    cyan: "#00f3ff",
    purple: "#bc13fe",
    pink: "#ff00bd",
    green: "#39ff14",
  };

  return (
    <div className="relative w-full font-mono text-white min-h-screen overflow-hidden">
      {/* Background layers (same as ProjectsMission) */}
      <ParticleBackground />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(17,24,39,0.8)_0%,_rgba(2,6,23,0.9)_100%)] z-0" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTIwIDIwaDIwdjIwSDIweiIgZmlsbD0iIzAwZDRmZiIgZmlsbC1vcGFjaXR5PSIwLjAzIi8+PC9zdmc+')] opacity-20 z-0" />

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-scanline opacity-10" />

      {/* Main content */}
      <div className="relative z-20 p-4 md:p-8 max-w-screen-2xl mx-auto">
        {/* Header with glitch effect */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 relative"
        >
          <div className="absolute -left-4 md:-left-6 top-0 h-full w-1 bg-neon-cyan shadow-[0_0_20px_#00d4ff]" />
          <motion.h1
            className="text-4xl md:text-5xl font-black font-mono uppercase italic leading-tight"
            animate={{
              textShadow: [
                "0 0 5px #00d4ff, 0 0 10px #00d4ff",
                "2px 2px 0 #b026ff, -2px -2px 0 #ff00bd",
                "0 0 5px #00d4ff, 0 0 10px #00d4ff",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
          >
            SIGNAL <span className="text-neon-cyan">PROTOCOL</span>
          </motion.h1>
          <p className="text-gray-400 text-sm md:text-base mt-2">
            [ ESTABLISH DIRECT COMMUNICATION LINK ]
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left column: Contact Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Email Card */}
            <motion.div
              className="group relative overflow-hidden backdrop-blur-xl rounded-lg p-6 border border-neon-cyan/20 hover:border-neon-cyan transition-all duration-500"
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px #00d4ff40" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/0 via-neon-cyan/5 to-neon-cyan/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <h3 className="text-neon-cyan font-mono font-bold mb-2">EMAIL</h3>
              <a
                href="mailto:kelvinkokorie@gmail.com"
                className="text-white hover:text-neon-cyan transition-colors"
              >
                kelvinkokorie@gmail.com
              </a>
            </motion.div>

            {/* Location Card */}
            <motion.div
              className="group relative overflow-hidden backdrop-blur-xl rounded-lg p-6 border border-neon-purple/20 hover:border-neon-purple transition-all duration-500"
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px #bc13fe40" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/0 via-neon-purple/5 to-neon-purple/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <h3 className="text-neon-purple font-mono font-bold mb-2">
                LOCATION
              </h3>
              <p className="text-white">Earth, Human Dimension</p>
            </motion.div>

            {/* Availability Card */}
            <motion.div
              className="group relative overflow-hidden backdrop-blur-xl rounded-lg p-6 border border-neon-pink/20 hover:border-neon-pink transition-all duration-500"
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px #ff00bd40" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/0 via-neon-pink/5 to-neon-pink/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <h3 className="text-neon-pink font-mono font-bold mb-2">
                AVAILABILITY
              </h3>
              <p className="text-white">24/7 Mission Ready</p>
            </motion.div>

            {/* Social Links - UPGRADED with proper icons */}
            <motion.div
              className="group relative overflow-hidden backdrop-blur-xl rounded-lg p-6 border border-neon-green/20 hover:border-neon-green transition-all duration-500"
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px #39ff1440" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-neon-green/0 via-neon-green/5 to-neon-green/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <h3 className="text-neon-green font-mono font-bold mb-4">
                CONNECTIONS
              </h3>
              <div className="flex gap-4">
                <motion.a
                  href="https://github.com/kelvink17"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-lg bg-neon-green/10 border border-neon-green/30 hover:bg-neon-green/20 transition-all duration-300 text-neon-green"
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    boxShadow: `0 0 15px ${colors.green}`,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={24} />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/kelvink-okorie-40b6a931a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-lg bg-neon-green/10 border border-neon-green/30 hover:bg-neon-green/20 transition-all duration-300 text-neon-green"
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    boxShadow: `0 0 15px ${colors.green}`,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin size={24} />
                </motion.a>
                <motion.a
                  href="https://twitter.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-lg bg-neon-green/10 border border-neon-green/30 hover:bg-neon-green/20 transition-all duration-300 text-neon-green"
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    boxShadow: `0 0 15px ${colors.green}`,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Twitter size={24} />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column: Form */}
          <motion.div variants={itemVariants}>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-mono text-neon-cyan mb-2"
                >
                  OPERATOR NAME
                </label>
                <motion.input
                  id="contact-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-dark-secondary/50 backdrop-blur-sm border-2 border-neon-cyan/20 rounded px-4 py-3
                    text-white placeholder-gray-600 focus:border-neon-cyan focus:outline-none
                    transition-all duration-300 font-mono text-sm"
                  placeholder="Enter your name"
                  whileFocus={{
                    scale: 1.01,
                    borderColor: colors.cyan,
                    boxShadow: `0 0 15px ${colors.cyan}`,
                  }}
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-mono text-neon-purple mb-2"
                >
                  SIGNAL ADDRESS
                </label>
                <motion.input
                  id="contact-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-dark-secondary/50 backdrop-blur-sm border-2 border-neon-purple/20 rounded px-4 py-3
                    text-white placeholder-gray-600 focus:border-neon-purple focus:outline-none
                    transition-all duration-300 font-mono text-sm"
                  placeholder="your@email.com"
                  whileFocus={{
                    scale: 1.01,
                    borderColor: colors.purple,
                    boxShadow: `0 0 15px ${colors.purple}`,
                  }}
                />
              </div>

              {/* Subject Field */}
              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-sm font-mono text-neon-pink mb-2"
                >
                  MISSION BRIEFING
                </label>
                <motion.input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  autoComplete="off"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-dark-secondary/50 backdrop-blur-sm border-2 border-neon-pink/20 rounded px-4 py-3
                    text-white placeholder-gray-600 focus:border-neon-pink focus:outline-none
                    transition-all duration-300 font-mono text-sm"
                  placeholder="Subject"
                  whileFocus={{
                    scale: 1.01,
                    borderColor: colors.pink,
                    boxShadow: `0 0 15px ${colors.pink}`,
                  }}
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-mono text-neon-green mb-2"
                >
                  MESSAGE PROTOCOL
                </label>
                <motion.textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-dark-secondary/50 backdrop-blur-sm border-2 border-neon-green/20 rounded px-4 py-3
                    text-white placeholder-gray-600 focus:border-neon-green focus:outline-none
                    transition-all duration-300 font-mono text-sm resize-none h-32"
                  placeholder="Transmit your message..."
                  whileFocus={{
                    scale: 1.01,
                    borderColor: colors.green,
                    boxShadow: `0 0 15px ${colors.green}`,
                  }}
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink
                  text-black font-bold font-mono uppercase tracking-widest rounded
                  hover:shadow-[0_0_30px_rgba(0,243,255,0.5)] transition-all duration-300 relative overflow-hidden
                  ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? "TRANSMITTING..." : "INITIATE TRANSMISSION"}
              </motion.button>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <motion.div
                  className="p-4 bg-neon-green/20 border border-neon-green rounded font-mono text-neon-green text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ✓ MESSAGE DELIVERED. THANK YOU.
                </motion.div>
              )}
              {submitStatus === "error" && (
                <motion.div
                  className="p-4 bg-red-500/20 border border-red-500 rounded font-mono text-red-500 text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ✗ TRANSMISSION FAILED. TRY AGAIN LATER.
                </motion.div>
              )}
            </form>
          </motion.div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="mt-12 backdrop-blur-xl rounded-lg p-8 border border-neon-cyan/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-neon-cyan mb-6 font-mono">
            FREQUENTLY TRANSMITTED
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: "What is your average response time?",
                a: "24-48 hours for most inquiries. Urgent matters prioritized.",
              },
              {
                q: "Do you work remotely?",
                a: "Yes! Fully remote capabilities with flexible collaboration options.",
              },
              {
                q: "What is your tech stack preference?",
                a: "Modern JavaScript/TypeScript, React, Node.js, but adaptable to project needs.",
              },
              {
                q: "Are you open to contract work?",
                a: "Absolutely! Contract, freelance, and full-time opportunities considered.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="p-4 bg-dark-secondary/50 rounded border border-neon-cyan/10 hover:border-neon-cyan/30 transition-all"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <p className="text-neon-cyan font-mono font-bold text-sm mb-2">
                  Q: {item.q}
                </p>
                <p className="text-gray-300 text-sm">A: {item.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Global styles */}
      <style>{`
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

// ParticleBackground component (copy from ProjectsMission)
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
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 1.5 + 0.5,
      });
    }

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
      drawGrid();
      ctx.globalAlpha = 0.6;
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
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

export default ContactPage;
