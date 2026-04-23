"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";

// Types for Web Speech API
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

const CHATAI = () => {
  const WELCOME_MESSAGE = {
    role: "ai",
    text: "Yo! I'm Kelvin's digital twin. Ask me about my projects or football takes.",
  };

  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, loading, isOpen]);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const speak = (text: string) => {
    if (!isSpeaking) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    
    // Optional: Select a specific voice (e.g., a cool robotic one)
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.name.includes("Google UK English Male") || v.name.includes("Male"));
    if (preferredVoice) utterance.voice = preferredVoice;

    window.speechSynthesis.speak(utterance);
  };

  const clearChat = () => {
    window.speechSynthesis.cancel();
    setMessages([WELCOME_MESSAGE]);
  };

  const sendMessage = async () => {
    const messageToSend = input.trim();
    if (!messageToSend) return;

    const API_URL =
      window.location.hostname === "localhost"
        ? "http://localhost:5000/api/chat"
        : "https://kelvin-ai-backend.onrender.com/api/chat";

    const userMsg = { role: "user", text: messageToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(API_URL, { prompt: messageToSend });
      const aiText = res.data.text;
      setMessages((prev) => [...prev, { role: "ai", text: aiText }]);
      speak(aiText);
    } catch (err) {
      const errorText = "Omo, the connection failed. check backend";
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: errorText,
        },
      ]);
      speak(errorText);
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
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => setIsSpeaking(!isSpeaking)}
                  className="text-white/80 hover:text-white transition-colors"
                  title={isSpeaking ? "Mute Bot" : "Unmute Bot"}
                >
                  {isSpeaking ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>
                <button
                  onClick={clearChat}
                  className="text-[10px] bg-white/10 px-2 py-1 rounded-md hover:bg-white/20 transition-colors"
                >
                  Clear
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    window.speechSynthesis.cancel();
                  }}
                  className="text-xl leading-none hover:text-red-400 transition-colors"
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
            <div className="p-3 bg-slate-900 border-t border-white/10 flex gap-2 items-center">
              <button
                onClick={toggleListening}
                className={`p-2 rounded-xl transition-all duration-300 ${
                  isListening 
                    ? "bg-red-500/20 text-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]" 
                    : "bg-slate-800 text-slate-400 hover:text-blue-400"
                }`}
                title={isListening ? "Listening..." : "Voice Command"}
              >
                {isListening ? <Mic size={20} /> : <MicOff size={20} />}
              </button>
              <input
                className="flex-1 bg-slate-800 outline-none text-white text-xs p-2 rounded-xl border border-transparent focus:border-blue-500"
                placeholder={isListening ? "Listening..." : "Message..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                  input.trim() 
                    ? "bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_10px_rgba(37,99,235,0.4)]" 
                    : "bg-slate-800 text-slate-600"
                }`}
              >
                ➔
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- THE TOGGLE BUTTON (FAB) --- */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (isOpen) window.speechSynthesis.cancel();
        }}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 active:scale-90 ${
          isOpen
            ? "bg-slate-800 rotate-90"
            : "bg-gradient-to-tr from-blue-600 to-purple-600 hover:scale-110 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
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

