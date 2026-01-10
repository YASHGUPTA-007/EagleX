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

// --- DEVICE DETECTION ---
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
};

// --- PERSONALIZED TECH STACK FOR EAGLE X ---
const techStack = [
  { id: "01", name: "Next.js 15", type: "CORE_FRAMEWORK", icon: <Layers size={20} /> },
  { id: "02", name: "Firebase", type: "BACKEND_INFRA", icon: <Flame size={20} /> },
  { id: "03", name: "GSAP", type: "ANIMATION_ENGINE", icon: <Sparkles size={20} /> },
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
  const isMobile = useIsMobile();
  
  // --- LIVE STATE ---
  const [logs, setLogs] = useState(["> EAGLE_X_SYSTEM_BOOT...", "> VERIFYING_ADMIN_ACCESS [YASH_GUPTA]"]);
  const [latency, setLatency] = useState(12);
  const [cpu, setCpu] = useState(42);
  const [activeScanIndex, setActiveScanIndex] = useState(0);

  // --- LIVE ENGINE ---
  useEffect(() => {
    // 1. Infinite Log Generator (slower on mobile to reduce repaints)
    const logInterval = setInterval(() => {
      const newLog = randomLogs[Math.floor(Math.random() * randomLogs.length)];
      setLogs(prev => [...prev.slice(-6), `> ${newLog}`]); 
    }, isMobile ? 3000 : 2000);

    // 2. Telemetry Fluctuation (less frequent on mobile)
    const statInterval = setInterval(() => {
      setLatency(prev => Math.max(4, Math.min(25, prev + (Math.random() > 0.5 ? 3 : -3))));
      setCpu(prev => Math.max(20, Math.min(95, prev + (Math.random() > 0.5 ? 8 : -8))));
    }, isMobile ? 1000 : 600);

    // 3. Auto-Scanner
    const scanInterval = setInterval(() => {
      setActiveScanIndex(prev => (prev + 1) % techStack.length);
    }, isMobile ? 3000 : 2500);

    return () => {
      clearInterval(logInterval);
      clearInterval(statInterval);
      clearInterval(scanInterval);
    };
  }, [isMobile]);

  // --- GSAP ENTRANCE ---
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(terminalRef.current, {
        scrollTrigger: { trigger: containerRef.current, start: isMobile ? "top 80%" : "top 75%" },
        scale: 0.95, 
        opacity: 0, 
        y: isMobile ? 15 : 20, 
        duration: isMobile ? 0.6 : 0.8, 
        ease: "power2.out"
      });
      gsap.from(".tech-item", {
        scrollTrigger: { trigger: ".tech-grid", start: isMobile ? "top 90%" : "top 85%" },
        x: isMobile ? -20 : -40, 
        opacity: 0, 
        stagger: isMobile ? 0.1 : 0.15, 
        duration: isMobile ? 0.4 : 0.6, 
        ease: "back.out(1.2)"
      });
    }, containerRef);
    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section ref={containerRef} className="relative py-16 md:py-24 lg:py-40 bg-black text-white overflow-hidden border-t border-white/10 selection:bg-orange-600 selection:text-black">
      
      {/* Background Pulse */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] md:bg-[size:40px_40px]" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-orange-600/5 rounded-full blur-[60px] md:blur-[100px] animate-pulse" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-20 items-start relative z-10">
        
        {/* LEFT COLUMN: The Arsenal List */}
        <div className="lg:col-span-7">
          <div className="mb-10 md:mb-16">
            <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
              <span className="relative flex h-2.5 w-2.5 md:h-3 md:w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 md:h-3 md:w-3 bg-orange-600"></span>
              </span>
              <span className="font-mono text-orange-600 text-[10px] md:text-xs tracking-[0.25em] md:tracking-[0.3em] uppercase">Eagle_X_Live</span>
            </div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-black uppercase leading-[0.8] tracking-tighter text-white mb-2">
              The<br/>Stack
            </h2>
          </div>

          <div className="tech-grid space-y-2 md:space-y-3 relative">
            {/* The Scanning Laser Line - Hidden on mobile for performance */}
            {!isMobile && (
              <div 
                className="absolute left-0 w-full h-[84px] border-l-4 border-orange-600 bg-gradient-to-r from-orange-600/10 to-transparent transition-all duration-700 ease-in-out pointer-events-none z-0"
                style={{ top: `${activeScanIndex * 96 + 32}px` }} 
              />
            )}

            <div className="flex justify-between text-[9px] md:text-[10px] font-mono text-zinc-500 uppercase tracking-widest px-3 md:px-4 pb-2 border-b border-white/10">
              <span>Module_ID</span>
              <span className="hidden sm:inline">Core_Tech</span>
              <span>Status</span>
            </div>

            {techStack.map((item, index) => {
              const isActive = index === activeScanIndex;
              return (
                <div 
                  key={item.id}
                  className={`tech-item group relative flex items-center justify-between p-3.5 md:p-5 border transition-all duration-500 z-10
                    ${isActive ? 'bg-[#111] border-orange-600/30' : 'bg-[#0A0A0A] border-white/10 hover:border-white/20'}
                  `}
                >
                  <div className="flex items-center gap-3 md:gap-6 flex-1 min-w-0">
                    <span className={`font-mono text-xs md:text-sm transition-colors flex-shrink-0 ${isActive ? 'text-orange-600' : 'text-zinc-600'}`}>
                      {item.id}
                    </span>
                    <div className="flex items-center gap-2.5 md:gap-4 min-w-0 flex-1">
                      <div className={`transition-colors flex-shrink-0 ${isActive ? 'text-white' : 'text-zinc-400'}`}>
                        {React.cloneElement(item.icon, { 
                          size: isMobile ? 16 : 20 
                        })}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className={`text-base md:text-xl font-bold uppercase tracking-tight transition-colors truncate ${isActive ? 'text-white' : 'text-zinc-300'}`}>
                          {item.name}
                        </h3>
                        <span className="text-[8px] md:text-[10px] font-mono text-zinc-500 uppercase bg-white/5 px-1.5 md:px-2 py-0.5 rounded-sm inline-block">
                          {isMobile ? item.type.split('_')[0] : item.type}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Status Light */}
                  <div className="flex items-center gap-1.5 md:gap-2 flex-shrink-0 ml-2">
                    <span className={`text-[9px] md:text-[10px] font-mono uppercase tracking-wider transition-colors hidden sm:inline ${isActive ? 'text-orange-500' : 'text-zinc-500'}`}>
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
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div ref={terminalRef} className="space-y-4 md:space-y-6">
            
            {/* Main Terminal Window */}
            <div className="w-full bg-[#050505] border border-white/10 rounded-sm overflow-hidden shadow-2xl relative">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_3px] pointer-events-none z-20 opacity-30" />
              {!isMobile && (
                <div className="absolute top-0 left-0 w-full h-[20%] bg-white/5 blur-xl animate-[scan_4s_linear_infinite] pointer-events-none z-10" />
              )}

              <div className="bg-white/5 p-2.5 md:p-3 flex justify-between items-center border-b border-white/5">
                <div className="flex gap-1 md:gap-1.5">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-red-500/50" />
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-yellow-500/50" />
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500/50" />
                </div>
                <div className="flex items-center gap-1.5 md:gap-2 text-[8px] md:text-[9px] font-mono text-zinc-500 uppercase">
                  <Terminal size={9} className="md:w-[10px] md:h-[10px]" />
                  <span className="hidden sm:inline">Eagle_X :: Admin_Root</span>
                  <span className="sm:hidden">Eagle_X</span>
                </div>
              </div>

              {/* LIVE LOGS */}
              <div className="p-4 md:p-6 h-[240px] md:h-[320px] font-mono text-xs md:text-sm relative flex flex-col justify-end overflow-hidden">
                {logs.map((log, i) => (
                   <div key={i} className="mb-0.5 md:mb-1 text-zinc-400 animate-in fade-in slide-in-from-bottom-2 duration-300 truncate">
                     <span className="text-orange-600 mr-1 md:mr-2">$</span>
                     <span className="text-[10px] md:text-sm">{log}</span>
                   </div>
                ))}
                <div className="mt-2 flex items-center gap-2 text-orange-600">
                   <span className="animate-pulse">_</span>
                </div>
              </div>
            </div>

            {/* LIVE TELEMETRY PANELS */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="p-3 md:p-4 border border-white/10 bg-white/[0.02] relative overflow-hidden group">
                <div className="absolute right-2 top-2 w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse" />
                <div className="flex items-center gap-1.5 md:gap-2 text-zinc-500 mb-1.5 md:mb-2">
                   <Wifi size={12} className="md:w-[14px] md:h-[14px]" />
                   <span className="text-[9px] md:text-[10px] font-mono uppercase">Network</span>
                </div>
                <div className="text-2xl md:text-3xl font-black text-white tabular-nums tracking-tighter">
                  {latency}<span className="text-xs md:text-sm font-medium text-zinc-600 ml-0.5 md:ml-1">ms</span>
                </div>
                {/* Visual Graph Bar - Simplified for mobile */}
                <div className="flex items-end gap-[1.5px] md:gap-[2px] h-3 md:h-4 mt-2 opacity-30">
                  {[...Array(isMobile ? 6 : 10)].map((_, i) => (
                    <div key={i} className="w-full bg-orange-600 transition-all duration-300" style={{ height: `${Math.random() * 100}%` }} />
                  ))}
                </div>
              </div>

              <div className="p-3 md:p-4 border border-white/10 bg-white/[0.02] relative overflow-hidden">
                 <div className="flex items-center gap-1.5 md:gap-2 text-zinc-500 mb-1.5 md:mb-2">
                   <Activity size={12} className="md:w-[14px] md:h-[14px]" />
                   <span className="text-[9px] md:text-[10px] font-mono uppercase">Neural_Core</span>
                </div>
                <div className="text-2xl md:text-3xl font-black text-white tabular-nums tracking-tighter">
                  {cpu}<span className="text-xs md:text-sm font-medium text-zinc-600 ml-0.5 md:ml-1">%</span>
                </div>
                <div className="w-full bg-zinc-800 h-1 mt-3 md:mt-4 rounded-full overflow-hidden">
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