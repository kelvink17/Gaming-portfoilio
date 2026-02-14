"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitted(false);
    }, 3000);
  };

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

  const colors = {
    cyan: "#00f3ff",
    purple: "#bc13fe",
    pink: "#ff00bd",
    green: "#39ff14",
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
          SIGNAL PROTOCOL
        </h1>
        <p className="text-gray-400 text-sm md:text-base">
          [ ESTABLISH DIRECT COMMUNICATION LINK ]
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Contact Info */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="glass-effect rounded-lg p-6 border border-neon-cyan/20 hover:border-neon-cyan/60 transition-all duration-300">
            <h3 className="text-neon-cyan font-mono font-bold mb-2">EMAIL</h3>
            <a
              href="mailto:kelvinkokorie@gmail.com"
              className="text-white hover:text-neon-cyan transition-colors"
            >
              kelvinkokorie@gmail.com
            </a>
          </div>

          <div className="glass-effect rounded-lg p-6 border border-neon-purple/20 hover:border-neon-purple/60 transition-all duration-300">
            <h3 className="text-neon-purple font-mono font-bold mb-2">
              LOCATION
            </h3>
            <p className="text-white">Earth, Human Dimension</p>
          </div>

          <div className="glass-effect rounded-lg p-6 border border-neon-pink/20 hover:border-neon-pink/60 transition-all duration-300">
            <h3 className="text-neon-pink font-mono font-bold mb-2">
              AVAILABILITY
            </h3>
            <p className="text-white">24/7 Mission Ready</p>
          </div>

          {/* Social Links */}
          <div className="glass-effect rounded-lg p-6 border border-neon-green/20">
            <h3 className="text-neon-green font-mono font-bold mb-4">
              CONNECTIONS
            </h3>
            <div className="flex gap-4">
              {[
                { label: "GitHub", icon: "🐙", link: "#" },
                { label: "LinkedIn", icon: "💼", link: "#" },
                { label: "Twitter", icon: "🐦", link: "#" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.link}
                  className="w-12 h-12 flex items-center justify-center rounded-lg bg-neon-green/10 border border-neon-green/30
                    hover:bg-neon-green/20 transition-all duration-300 text-xl"
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    boxShadow: `0px 0px 8px ${colors.green}`,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div variants={itemVariants}>
          <form onSubmit={handleSubmit} className="space-y-4">
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
                className="w-full bg-dark-secondary border-2 border-neon-cyan/20 rounded px-4 py-3
                  text-white placeholder-gray-600 focus:border-neon-cyan focus:outline-none
                  transition-all duration-300 font-mono text-sm"
                placeholder="Enter your name"
                whileFocus={{ scale: 1.01, borderColor: colors.cyan }}
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
                className="w-full bg-dark-secondary border-2 border-neon-purple/20 rounded px-4 py-3
                  text-white placeholder-gray-600 focus:border-neon-purple focus:outline-none
                  transition-all duration-300 font-mono text-sm"
                placeholder="your@email.com"
                whileFocus={{ scale: 1.01, borderColor: colors.purple }}
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
                className="w-full bg-dark-secondary border-2 border-neon-pink/20 rounded px-4 py-3
                  text-white placeholder-gray-600 focus:border-neon-pink focus:outline-none
                  transition-all duration-300 font-mono text-sm"
                placeholder="Subject"
                whileFocus={{ scale: 1.01, borderColor: colors.pink }}
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
                className="w-full bg-dark-secondary border-2 border-neon-green/20 rounded px-4 py-3
                  text-white placeholder-gray-600 focus:border-neon-green focus:outline-none
                  transition-all duration-300 font-mono text-sm resize-none h-32"
                placeholder="Transmit your message..."
                whileFocus={{ scale: 1.01, borderColor: colors.green }}
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full py-3 px-6 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink
                text-black font-bold font-mono uppercase tracking-widest rounded
                hover:shadow-lg transition-all duration-300 relative overflow-hidden"
              whileHover={{
                scale: 1.02,
                filter: "brightness(1.2)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span
                initial={{ opacity: 1 }}
                animate={{ opacity: isSubmitted ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              >
                {isSubmitted ? "TRANSMISSION SENT" : "INITIATE TRANSMISSION"}
              </motion.span>
            </motion.button>

            {/* Success Message */}
            {isSubmitted && (
              <motion.div
                className="p-4 bg-neon-green/20 border border-neon-green rounded font-mono text-neon-green text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                MESSAGE RECEIVED. AWAITING PROCESSING...
              </motion.div>
            )}
          </form>
        </motion.div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        className="mt-12 glass-effect rounded-lg p-8 border border-neon-cyan/20"
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
              className="p-4 bg-dark-secondary/50 rounded border border-neon-cyan/10"
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
  );
};

export default ContactPage;
