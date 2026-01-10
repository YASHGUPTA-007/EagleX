"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Copy, Check, Terminal, Wifi, Globe, Zap, ArrowUpRight } from "lucide-react";

export default function FooterNeural() {
  const [time, setTime] = useState("");
  const [copied, setCopied] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }));
    };
    const timer = setInterval(updateTime, 1000);
    updateTime();
    return () => clearInterval(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("admin@eaglex.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer ref={containerRef} className="relative bg-black pt-20 pb-10 overflow-hidden border-t border-white/10 selection:bg-orange-600 selection:text-black">
      
      {/* 1. BACKGROUND GRID & GLOW */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
        <div className="absolute -top-[200px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-orange-600/10 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* 2. MAIN CONTROL DECK */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* LEFT: IDENTITY & TERMINAL */}
          <div className="lg:col-span-7 flex flex-col justify-between min-h-[300px] bg-zinc-900/20 border border-white/5 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden group">
            {/* Hover Sweep Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            
            <div className="relative z-10">
              <div className="w-32 h-10 relative opacity-80 mb-8 grayscale group-hover:grayscale-0 transition-all">
                <Image src="/Eaglex2.png" alt="Eagle X" fill className="object-contain object-left" />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-orange-500 font-mono text-xs uppercase tracking-widest">
                  <Terminal size={12} />
                  <span>Execute_Contact_Protocol</span>
                </div>
                
                {/* THE EMAIL TERMINAL */}
                <div 
                  onClick={handleCopy}
                  className="cursor-pointer font-mono text-3xl md:text-5xl lg:text-6xl text-white font-bold tracking-tighter hover:text-orange-500 transition-colors duration-300 flex items-center gap-4"
                >
                  <span className="text-zinc-600 select-none">{">"}</span>
                  <span>eaglexdevelopment@gmail.com</span>
                  <motion.span 
                    animate={{ opacity: [1, 0] }} 
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-3 h-8 md:h-12 bg-orange-600 inline-block align-middle"
                  />
                </div>
                
                <div className="h-6">
                  {copied && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2 text-green-500 text-xs font-mono uppercase"
                    >
                      <Check size={12} /> Address_Copied_To_Clipboard
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-auto pt-8 border-t border-white/5 flex justify-between items-end">
              <div className="text-[10px] text-zinc-500 font-mono max-w-xs leading-relaxed uppercase">
                Secure comms line established.<br/>
                Encryption: AES-256 enabled.<br/>
                Node: Alpha_One
              </div>
              <ArrowUpRight className="text-zinc-700 group-hover:text-orange-600 transition-colors" size={32} />
            </div>
          </div>

          {/* RIGHT: THE RADAR & HUD */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* The Radar Module */}
            <div className="flex-1 bg-black border border-white/10 rounded-2xl p-6 relative overflow-hidden flex items-center justify-center min-h-[200px]">
              {/* Radar Grid */}
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />
              <div className="absolute inset-0 border border-white/5 rounded-full m-8" />
              <div className="absolute inset-0 border border-white/5 rounded-full m-20" />
              
              {/* Spinning Scan Line */}
              <div className="absolute inset-0 animate-spin-slow">
                 <div className="w-full h-1/2 bg-gradient-to-t from-orange-600/20 to-transparent border-b border-orange-600/50" />
              </div>

              {/* Blip */}
              <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_10px_#ea580c] animate-ping-slow" />

              <div className="absolute bottom-4 left-4 text-[10px] font-mono text-orange-500 bg-orange-950/30 px-2 py-1 rounded border border-orange-900/50">
                SYSTEM_SCANNING...
              </div>
            </div>

            {/* HUD Stats */}
            <div className="grid grid-cols-2 gap-4 h-24">
              <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-4 flex flex-col justify-between hover:border-orange-600/30 transition-colors">
                <div className="flex justify-between items-start">
                  <Globe size={14} className="text-zinc-500" />
                  <span className="text-[9px] text-green-500 font-mono uppercase tracking-widest">Live</span>
                </div>
                <div className="text-xs font-bold text-white uppercase tracking-wider">
                  Gwalior, IN
                </div>
              </div>
              
              <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-4 flex flex-col justify-between hover:border-orange-600/30 transition-colors">
                 <div className="flex justify-between items-start">
                  <Zap size={14} className="text-zinc-500" />
                  <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest">IST</span>
                </div>
                <div className="text-xs font-bold text-white uppercase tracking-wider tabular-nums">
                  {time}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. BOTTOM LINKS (The Dock) */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
            © 2026 Eagle X Systems. All Systems Nominal.
          </div>
          
          <div className="flex gap-1">
             {["Twitter", "GitHub", "LinkedIn", "Instagram"].map((link, i) => (
               <a 
                 key={link} 
                 href="#" 
                 className="px-4 py-2 bg-zinc-900/50 border border-white/5 rounded text-[10px] font-bold text-zinc-400 uppercase tracking-widest hover:bg-orange-600 hover:text-black hover:border-orange-500 transition-all"
               >
                 {link}
               </a>
             ))}
          </div>
        </div>

      </div>

      <style jsx>{`
        .animate-spin-slow { animation: spin 4s linear infinite; }
        .animate-ping-slow { animation: ping 3s cubic-bezier(0, 0, 0.2, 1) infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </footer>
  );
}