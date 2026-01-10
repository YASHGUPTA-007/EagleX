"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flame, Cpu, Layers, Zap, Activity, Wifi, Terminal, Sparkles } from "lucide-react";

// --- CUSTOM ICONS ---
const CodeIcon = ({ size, className }: { size: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

// --- PERSONALIZED TECH STACK FOR EAGLE X ---
const techStack = [
  { id: "01", name: "Next.js 15", type: "CORE_FRAMEWORK", icon: <Layers size={20} /> },
  { id: "02", name: "Firebase", type: "BACKEND_INFRA", icon: <Flame size={20} /> }, // Swapped Supabase for Firebase
  { id: "03", name: "GSAP", type: "ANIMATION_ENGINE", icon: <Sparkles size={20} /> }, // Swapped Motion for GSAP
  { id: "04", name: "Tailwind", type: "STYLING_SYSTEM", icon: <Zap size={20} /> },
  { id: "05", name: "TypeScript", type: "STRICT_MODE", icon: <CodeIcon size={20} /> },
];

// --- EAGLE X BRANDED LOGS ---
const randomLogs = [
  "> INITIALIZING EAGLE_X PROTOCOL_v2...",
  "> SYNCING_FIREBASE_SHARDS [REALTIME]",
  "> COMPILING_GSAP_TIMELINES...",
  "> OPTIMIZING_TAILWIND_JIT...",
  "> NEURAL_CORE_HANDSHAKE... [SECURE]",
  "> DEPLOYING_EDGE_FUNCTIONS...",
  "> RENDERING_3D_ASSETS...",
  "> SYSTEM_LATENCY: 4ms [OPTIMAL]"
];

export default function ArsenalLive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  // --- LIVE STATE ---
  const [logs, setLogs] = useState(["> EAGLE_X_SYSTEM_BOOT...", "> VERIFYING_ADMIN_ACCESS [YASH_GUPTA]"]);
  const [latency, setLatency] = useState(12);
  const [cpu, setCpu] = useState(42);
  const [activeScanIndex, setActiveScanIndex] = useState(0);

  // --- LIVE ENGINE ---
  useEffect(() => {
    // 1. Infinite Log Generator
    const logInterval = setInterval(() => {
      const newLog = randomLogs[Math.floor(Math.random() * randomLogs.length)];
      setLogs(prev => [...prev.slice(-6), `> ${newLog}`]); 
    }, 2000); // Faster logs for high-tech feel

    // 2. Telemetry Fluctuation
    const statInterval = setInterval(() => {
      setLatency(prev => Math.max(4, Math.min(25, prev + (Math.random() > 0.5 ? 3 : -3))));
      setCpu(prev => Math.max(20, Math.min(95, prev + (Math.random() > 0.5 ? 8 : -8))));
    }, 600);

    // 3. Auto-Scanner
    const scanInterval = setInterval(() => {
      setActiveScanIndex(prev => (prev + 1) % techStack.length);
    }, 2500);

    return () => {
      clearInterval(logInterval);
      clearInterval(statInterval);
      clearInterval(scanInterval);
    };
  }, []);

  // --- GSAP ENTRANCE ---
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(terminalRef.current, {
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
        scale: 0.95, opacity: 0, y: 20, duration: 0.8, ease: "power2.out"
      });
      gsap.from(".tech-item", {
        scrollTrigger: { trigger: ".tech-grid", start: "top 85%" },
        x: -40, opacity: 0, stagger: 0.15, duration: 0.6, ease: "back.out(1.2)"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-24 md:py-40 bg-black text-white overflow-hidden border-t border-white/10 selection:bg-orange-600 selection:text-black">
      
      {/* Background Pulse */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[100px] animate-pulse" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start relative z-10">
        
        {/* LEFT COLUMN: The Arsenal List */}
        <div className="lg:col-span-7">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-600"></span>
              </span>
              <span className="font-mono text-orange-600 text-xs tracking-[0.3em] uppercase">Eagle_X_Live</span>
            </div>
            <h2 className="text-7xl md:text-9xl font-black uppercase leading-[0.8] tracking-tighter text-white mb-2">
              The<br/>Stack
            </h2>
          </div>

          <div className="tech-grid space-y-3 relative">
            {/* The Scanning Laser Line */}
            <div 
              className="absolute left-0 w-full h-[84px] border-l-4 border-orange-600 bg-gradient-to-r from-orange-600/10 to-transparent transition-all duration-700 ease-in-out pointer-events-none z-0"
              style={{ top: `${activeScanIndex * 96 + 32}px` }} 
            />

            <div className="flex justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-widest px-4 pb-2 border-b border-white/10">
              <span>Module_ID</span>
              <span>Core_Tech</span>
              <span>Status</span>
            </div>

            {techStack.map((item, index) => {
              const isActive = index === activeScanIndex;
              return (
                <div 
                  key={item.id}
                  className={`tech-item group relative flex items-center justify-between p-5 border transition-all duration-500 z-10
                    ${isActive ? 'bg-[#111] border-orange-600/30' : 'bg-[#0A0A0A] border-white/10 hover:border-white/20'}
                  `}
                >
                  <div className="flex items-center gap-6">
                    <span className={`font-mono text-sm transition-colors ${isActive ? 'text-orange-600' : 'text-zinc-600'}`}>
                      {item.id}
                    </span>
                    <div className="flex items-center gap-4">
                      <div className={`transition-colors ${isActive ? 'text-white' : 'text-zinc-400'}`}>
                        {item.icon}
                      </div>
                      <div>
                        <h3 className={`text-xl font-bold uppercase tracking-tight transition-colors ${isActive ? 'text-white' : 'text-zinc-300'}`}>
                          {item.name}
                        </h3>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase bg-white/5 px-2 py-0.5 rounded-sm">
                          {item.type}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Status Light */}
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono uppercase tracking-wider transition-colors ${isActive ? 'text-orange-500' : 'text-zinc-500'}`}>
                      {isActive ? 'OPTIMIZING' : 'ONLINE'}
                    </span>
                    <div className={`w-1.5 h-1.5 rounded-full transition-colors shadow-[0_0_10px_transparent]
                      ${isActive ? 'bg-orange-500 shadow-[0_0_10px_rgba(234,88,12,0.8)]' : 'bg-zinc-700'}
                    `} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: The Terminal & Stats */}
        <div className="lg:col-span-5 sticky top-24">
          <div ref={terminalRef} className="space-y-6">
            
            {/* Main Terminal Window */}
            <div className="w-full bg-[#050505] border border-white/10 rounded-sm overflow-hidden shadow-2xl relative">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_3px] pointer-events-none z-20 opacity-30" />
              <div className="absolute top-0 left-0 w-full h-[20%] bg-white/5 blur-xl animate-[scan_4s_linear_infinite] pointer-events-none z-10" />

              <div className="bg-white/5 p-3 flex justify-between items-center border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500/50" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                  <div className="w-2 h-2 rounded-full bg-green-500/50" />
                </div>
                <div className="flex items-center gap-2 text-[9px] font-mono text-zinc-500 uppercase">
                  <Terminal size={10} />
                  Eagle_X :: Admin_Root
                </div>
              </div>

              {/* LIVE LOGS */}
              <div className="p-6 h-[320px] font-mono text-sm relative flex flex-col justify-end">
                {logs.map((log, i) => (
                   <div key={i} className="mb-1 text-zinc-400 animate-in fade-in slide-in-from-bottom-2 duration-300">
                     <span className="text-orange-600 mr-2">$</span>
                     {log}
                   </div>
                ))}
                <div className="mt-2 flex items-center gap-2 text-orange-600">
                   <span className="animate-pulse">_</span>
                </div>
              </div>
            </div>

            {/* LIVE TELEMETRY PANELS */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-white/10 bg-white/[0.02] relative overflow-hidden group">
                <div className="absolute right-2 top-2 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <div className="flex items-center gap-2 text-zinc-500 mb-2">
                   <Wifi size={14} />
                   <span className="text-[10px] font-mono uppercase">Network</span>
                </div>
                <div className="text-3xl font-black text-white tabular-nums tracking-tighter">
                  {latency}<span className="text-sm font-medium text-zinc-600 ml-1">ms</span>
                </div>
                {/* Visual Graph Bar */}
                <div className="flex items-end gap-[2px] h-4 mt-2 opacity-30">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="w-full bg-orange-600 transition-all duration-300" style={{ height: `${Math.random() * 100}%` }} />
                  ))}
                </div>
              </div>

              <div className="p-4 border border-white/10 bg-white/[0.02] relative overflow-hidden">
                 <div className="flex items-center gap-2 text-zinc-500 mb-2">
                   <Activity size={14} />
                   <span className="text-[10px] font-mono uppercase">Neural_Core</span>
                </div>
                <div className="text-3xl font-black text-white tabular-nums tracking-tighter">
                  {cpu}<span className="text-sm font-medium text-zinc-600 ml-1">%</span>
                </div>
                <div className="w-full bg-zinc-800 h-1 mt-4 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-orange-600 transition-all duration-500 ease-out"
                    style={{ width: `${cpu}%` }}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(500px); opacity: 0; }
        }
      `}</style>
    </section>
  );
}