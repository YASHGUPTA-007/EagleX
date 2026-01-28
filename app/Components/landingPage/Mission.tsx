"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Smartphone, Database, Zap, ArrowUpRight, Cpu } from "lucide-react";

// --- DATA ---
const systems = [
  {
    id: "01",
    label: "Web Architecture",
    header: "Full Stack\nDominance",
    description: "Monolithic platforms. Next.js 14 infrastructure designed for millions of concurrent users.",
    tags: ["Next.js", "Vercel", "Edge"],
    icon: Globe,
    color: "orange",
    hex: "#f97316"
  },
  {
    id: "02",
    label: "Mobile Ecosystems",
    header: "Native\nFluidity",
    description: "120fps interfaces. Whether it's Swift, Kotlin, or React Native, we ship apps that dominate.",
    tags: ["React Native", "Expo", "Swift"],
    icon: Smartphone,
    color: "blue",
    hex: "#3b82f6"
  },
  {
    id: "03",
    label: "Neural Intelligence",
    header: "Autonomous\nAgents",
    description: "LLM fine-tuning, vector databases, and custom AI agents that work while you sleep.",
    tags: ["Python", "OpenAI", "Pinecone"],
    icon: Database,
    color: "purple",
    hex: "#a855f7"
  },
  {
    id: "04",
    label: "Rapid Deployment",
    header: "The 7-Day\nSprint",
    description: "From concept to deployed market-ready product in one single sprint. Speed is our currency.",
    tags: ["Docker", "CI/CD", "AWS"],
    icon: Zap,
    color: "emerald",
    hex: "#10b981"
  }
];

const arsenalItems = [
  "React/Next.js",
  "Node.js/Python",
  "MongoDB/PostgreSQL",
  "AWS/Vercel",
  "React Native",
  "TensorFlow/PyTorch",
  "Solidity/Web3",
  "Docker/K8s"
];

export default function CommandCapabilities() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeSys = systems[activeIdx];

  return (
    <section className="relative w-full bg-black text-white py-12 md:py-20 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black">
      
      {/* --- GLOBAL AMBIENCE --- */}
      <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
         <svg className="h-full w-full">
            <filter id="noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
         </svg>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* --- 1. HEADER SECTION --- */}
        <div className="mb-12 border-b border-white/10 pb-6 relative">
           <div className="flex flex-col md:flex-row justify-between items-end gap-6">
              <div>
                 <div className="flex items-center gap-2 mb-2">
                    <div className={`w-2 h-2 rounded-full bg-${activeSys.color}-500 shadow-[0_0_10px_currentColor] transition-colors duration-500`} />
                    <span className={`font-mono text-xs tracking-widest uppercase text-${activeSys.color}-500 transition-colors duration-500`}>
                        System_Core // v2.0
                    </span>
                 </div>
                 <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-[0.85]">
                    System <br />
                    {/* CHANGED TO ORANGE GRADIENT BELOW */}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-700">Capabilities</span>
                 </h2>
              </div>
              
             
           </div>
        </div>

        {/* --- 2. MAIN CONTENT GRID --- */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 mb-20">
            
            {/* --- LEFT COLUMN: NAVIGATION --- */}
            <div className="w-full lg:w-1/3 flex flex-col justify-center z-20">
                <div className="flex flex-col relative">
                    {/* Side Line Decoration */}
                    <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/10" />

                    {systems.map((sys, idx) => (
                        <div 
                            key={sys.id}
                            onMouseEnter={() => setActiveIdx(idx)}
                            className="group relative cursor-pointer py-5 pl-8 pr-4 transition-all duration-300"
                        >
                            {/* Active Indicator Pips */}
                            {activeIdx === idx && (
                                <motion.div 
                                    layoutId="active-pip"
                                    className={`absolute left-[-2px] top-0 bottom-0 w-[5px] bg-${sys.color}-500 shadow-[0_0_20px_rgba(255,255,255,0.5)]`} 
                                />
                            )}
                            
                            <div className="flex items-center justify-between">
                                <h3 className={`text-xl md:text-2xl font-bold uppercase tracking-tight transition-all duration-300 ${activeIdx === idx ? "text-white translate-x-2" : "text-zinc-600 group-hover:text-zinc-400"}`}>
                                    {sys.label}
                                </h3>
                                <span className={`font-mono text-xs transition-colors duration-300 ${activeIdx === idx ? `text-${sys.color}-500` : "text-zinc-800"}`}>
                                    0{idx + 1}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- RIGHT COLUMN: THE CARD STAGE --- */}
            <div className="w-full lg:w-2/3 h-[450px] md:h-[600px] relative perspective-1000">
                
                {/* THE STAGE (3D Floor) */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] h-[50%] z-0 pointer-events-none">
                     <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] transform perspective-500 rotateX(60deg) scale(1.5) origin-bottom" />
                     <motion.div 
                        animate={{ backgroundColor: activeSys.hex }}
                        className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] blur-[120px] opacity-20 transition-colors duration-500" 
                     />
                </div>

                {/* THE FLOATING CARD */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIdx}
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -50, scale: 0.9 }}
                            transition={{ duration: 0.4, ease: "backOut" }}
                            className="relative"
                        >
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="relative w-[320px] md:w-[420px] aspect-[4/5] md:aspect-square"
                            >
                                <div className="absolute inset-0 bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                                    <div className={`absolute inset-0 bg-gradient-to-b from-${activeSys.color}-500/10 to-transparent opacity-50`} />
                                    <div className={`absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-${activeSys.color}-900/50 to-transparent opacity-50`} />

                                    <div className="relative z-10 h-full p-8 md:p-10 flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                            <div className="p-3 bg-white/5 border border-white/10 rounded-lg backdrop-blur-md">
                                                {React.createElement(activeSys.icon, { size: 24, className: "text-white" })}
                                            </div>
                                            <span className="font-mono text-xl text-white">0{activeIdx + 1}</span>
                                        </div>

                                        <div>
                                            <motion.h2 
                                                className="text-4xl font-black uppercase tracking-tighter text-white mb-3"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                {activeSys.header}
                                            </motion.h2>
                                            <motion.p 
                                                className="text-zinc-300 text-sm leading-relaxed border-l-2 border-white/20 pl-4"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.3 }}
                                            >
                                                {activeSys.description}
                                            </motion.p>
                                        </div>

                                        <div>
                                            <div className="flex flex-wrap gap-2">
                                                {activeSys.tags.map((tag, i) => (
                                                    <span key={i} className={`px-2 py-1 text-[10px] uppercase font-bold tracking-wider rounded border border-${activeSys.color}-500/30 bg-${activeSys.color}-500/10 text-${activeSys.color}-200`}>
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
                                                <span className="text-[10px] uppercase tracking-widest text-zinc-500">Status: Online</span>
                                                <ArrowUpRight size={20} className={`text-${activeSys.color}-500`} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%] pointer-events-none z-20" />
                                </div>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>

        {/* --- 3. TECH ARSENAL SECTION --- */}
        <div className="border-t border-white/10 pt-10">
            <div className="flex items-center gap-3 mb-8">
                <Cpu className="text-orange-500 animate-pulse" size={24} />
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white">
                    Tech Arsenal
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {arsenalItems.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="group relative h-16 bg-zinc-900/30 border border-white/5 hover:border-white/20 hover:bg-zinc-800/50 transition-all duration-300 flex items-center justify-center overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                        <span className="font-mono font-bold text-sm text-zinc-400 group-hover:text-white uppercase tracking-wider z-10">
                            {item}
                        </span>
                        {/* Corner Accents */}
                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/10 group-hover:border-white/40 transition-colors" />
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/10 group-hover:border-white/40 transition-colors" />
                    </motion.div>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
}