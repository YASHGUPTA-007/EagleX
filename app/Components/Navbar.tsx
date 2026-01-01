"use client";
import React from "react";
import { motion } from "framer-motion";
import { Command } from "lucide-react";
import { MagneticLink } from "./shared";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-110 px-4 md:px-8 py-4 md:py-10 flex justify-between items-start pointer-events-none">
      <div className="flex flex-col gap-1 pointer-events-auto">
        <div className="flex items-center gap-3 group">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-600 flex items-center justify-center rounded-sm transition-transform duration-500 group-hover:rotate-180">
            <Command className="text-black" size={24} />
          </div>
          <span className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter">EagleX</span>
        </div>
        <span className="text-[10px] md:text-xs font-mono text-orange-600/40 ml-14 md:ml-16">ARCH_VERSION: 2.15.0</span>
      </div>

      <div className="flex flex-col items-end gap-6 pointer-events-auto">
        <div className="hidden md:flex bg-black/40 backdrop-blur-2xl border border-white/10 p-4 rounded-2xl gap-10">
          {["Services", "Arsenal", "Nexus", "Foundry"].map(item => (
            <MagneticLink key={item}>{item}</MagneticLink>
          ))}
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 md:px-8 md:py-3 bg-orange-600 text-black font-black uppercase tracking-widest text-[10px] md:text-xs rounded-lg"
        >
          Start Handshake
        </motion.button>
      </div>
    </nav>
  );
}