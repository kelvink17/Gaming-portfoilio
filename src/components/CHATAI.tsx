"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion"; // Optional: for smooth pop-up

const CHATAI = () => {
  const WELCOME_MESSAGE = {
    role: "ai",
    text: "Yo! I'm Kelvin's digital twin. Ask me about my projects or football takes.",
  };

  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // NEW: Toggle state

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, loading, isOpen]);

  const clearChat = () => setMessages([WELCOME_MESSAGE]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // 🛠️ THE SMART SWITCH
    // If you are on your laptop, use localhost. If you are live, use Render.
    const API_URL =
      window.location.hostname === "localhost"
        ? "http://localhost:5000/api/chat"
        : "https://kelvin-ai-backend.onrender.com/api/chat";

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(API_URL, { prompt: input }); // Use the Smart URL
      setMessages((prev) => [...prev, { role: "ai", text: res.data.text }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Omo, the connection failed. check backend",
        },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[100] flex flex-col items-end">
      {/* --- THE CHAT WINDOW --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[90vw] sm:w-80 h-[500px] bg-slate-900/95 backdrop-blur-xl border border-blue-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm">Kelvin AI 🤖</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={clearChat}
                  className="text-[10px] bg-white/10 px-2 py-1 rounded-md"
                >
                  Clear
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-lg leading-none"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/50">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                      m.role === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-slate-800 text-slate-200 rounded-bl-none border border-white/5"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="text-[10px] text-slate-400 animate-pulse">
                  Kelvin is thinking...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-slate-900 border-t border-white/10 flex gap-2">
              <input
                className="flex-1 bg-slate-800 outline-none text-white text-xs p-2 rounded-xl border border-transparent focus:border-blue-500"
                placeholder="Message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="bg-blue-600 text-white w-8 h-8 rounded-lg"
              >
                ➔
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- THE TOGGLE BUTTON (FAB) --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 active:scale-90 ${
          isOpen
            ? "bg-slate-800 rotate-90"
            : "bg-gradient-to-tr from-blue-600 to-purple-600 hover:scale-110"
        }`}
      >
        {isOpen ? (
          <span className="text-white text-2xl">×</span>
        ) : (
          <span className="text-white text-2xl">🤖</span>
        )}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-slate-900 rounded-full"></span>
        )}
      </button>
    </div>
  );
};

export default CHATAI;
