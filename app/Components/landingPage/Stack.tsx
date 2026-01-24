"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flame, Layers, Zap, Activity, Wifi, Terminal, Sparkles, Cpu, Lock, Globe, TriangleAlert, Component, HardDrive } from "lucide-react";

// --- CUSTOM ICONS ---
const CodeIcon = ({ size, className }: { size: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

// --- DATA ---
const techStack = [
  { id: "01", serial: "NXT-15-RC", name: "Next.js 15", type: "CORE_FRAMEWORK", icon: <Layers size={20} /> },
  { id: "02", serial: "FB-90-DB", name: "Firebase", type: "BACKEND_INFRA", icon: <Flame size={20} /> },
  { id: "03", serial: "GSAP-V3", name: "GSAP", type: "ANIMATION_ENGINE", icon: <Sparkles size={20} /> },
  { id: "04", serial: "TW-CSS-JIT", name: "Tailwind", type: "STYLING_SYSTEM", icon: <Zap size={20} /> },
  { id: "05", serial: "TS-STRICT", name: "TypeScript", type: "STRICT_MODE", icon: <CodeIcon size={20} /> },
];

const extraTechs = ["PYTHON", "RUST", "DOCKER", "AWS", "KUBERNETES", "GOLANG", "SQL", "GRAPHQL", "SOLIDITY", "THREE.JS", "WEBGL", "NODE.JS", "C++"];

const randomLogs = [
  "> INITIALIZING EAGLE_X PROTOCOL_v2...",
  "> SYNCING_FIREBASE_SHARDS [REALTIME]",
  "> COMPILING_GSAP_TIMELINES...",
  "> SYSTEM_LATENCY: 4ms [OPTIMAL]"
];

export default function ArsenalLive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const [bannerOffset, setBannerOffset] = useState(0);
  
  // --- STATE ---
  const [logs, setLogs] = useState(["> EAGLE_X_SYSTEM_BOOT...", "> VERIFYING_ADMIN_ACCESS [YASH_GUPTA]"]);
  const [latency, setLatency] = useState(12);
  const [cpu, setCpu] = useState(42);
  const [activeScanIndex, setActiveScanIndex] = useState(0);

  // --- ENGINE ---
  useEffect(() => {
    // 1. Logs Generator
    const logInterval = setInterval(() => {
      const newLog = randomLogs[Math.floor(Math.random() * randomLogs.length)];
      setLogs(prev => [...prev.slice(-7), `> ${newLog}`]); 
    }, 1800);

    // 2. Telemetry Fluctuation
    const statInterval = setInterval(() => {
      setLatency(prev => Math.max(4, Math.min(25, prev + (Math.random() > 0.5 ? 3 : -3))));
      setCpu(prev => Math.max(20, Math.min(95, prev + (Math.random() > 0.5 ? 8 : -8))));
    }, 600);

    // 3. Auto-Scanner
    const scanInterval = setInterval(() => {
      setActiveScanIndex(prev => (prev + 1) % techStack.length);
    }, 3000); 

    // 4. Force Banner Full Width Calculation
    const handleResize = () => {
      if (bannerRef.current) {
        // Calculate distance from left edge of screen to the banner container
        const offset = bannerRef.current.getBoundingClientRect().left;
        setBannerOffset(offset);
      }
    };
    
    handleResize(); // Initial calc
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(logInterval);
      clearInterval(statInterval);
      clearInterval(scanInterval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // --- ANIMATIONS ---
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".section-header", {
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
        y: 50, opacity: 0, duration: 1, ease: "power3.out"
      });
      gsap.from(".monitor-screen", {
        scrollTrigger: { trigger: ".monitor-wrapper", start: "top 85%" },
        scaleY: 0, transformOrigin: "center", duration: 0.8, ease: "circ.out", delay: 0.2
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-32 bg-[#050505] text-white overflow-hidden border-t border-b border-zinc-900">
      
      {/* Background Grids */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
        
        {/* LEFT COLUMN: THE RACK */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          
          <div className="section-header mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[2px] w-12 bg-orange-600" />
              <span className="font-mono text-orange-600 text-xs tracking-[0.3em] uppercase">System Architecture</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white/90">
              Core<span className="text-zinc-700">_</span>Arsenal
            </h2>
          </div>

          <div className="relative space-y-4 mb-20">
            {/* Connection Line */}
            <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-zinc-800 -z-10" />

            {techStack.map((item, index) => {
              const isActive = index === activeScanIndex;
              return (
                <div key={item.id} className={`group relative pl-16 transition-all duration-500 ${isActive ? 'translate-x-4' : 'translate-x-0'}`}>
                  {/* Connector */}
                  <div className={`absolute left-8 top-1/2 w-8 h-[1px] transition-colors duration-500 ${isActive ? 'bg-orange-600' : 'bg-zinc-800'}`}>
                    <div className={`absolute right-0 -top-[3px] w-1.5 h-1.5 rounded-full transition-colors ${isActive ? 'bg-orange-500 shadow-[0_0_10px_orange]' : 'bg-zinc-800'}`} />
                  </div>

                  {/* Module Card */}
                  <div className={`relative flex items-center justify-between p-6 border-l-4 transition-all duration-300 overflow-hidden
                    ${isActive ? 'bg-zinc-900 border-l-orange-500 border-zinc-700 shadow-[0_10px_40px_-10px_rgba(0,0,0,1)]' : 'bg-zinc-900/30 border-l-zinc-700 border-transparent hover:bg-zinc-800/50'}
                  `}>
                    {isActive && <div className="absolute inset-0 bg-orange-600/5 animate-pulse pointer-events-none" />}
                    <div className="flex items-center gap-6 relative z-10">
                      <div className={`p-3 rounded-sm transition-colors ${isActive ? 'bg-orange-600 text-black' : 'bg-zinc-800 text-zinc-400'}`}>
                        {item.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className={`text-xl font-bold uppercase tracking-tight ${isActive ? 'text-white' : 'text-zinc-400'}`}>{item.name}</h3>
                          {isActive && <span className="text-[10px] bg-orange-600/20 text-orange-500 px-2 py-0.5 rounded-sm font-mono animate-pulse">ACTIVE</span>}
                        </div>
                        <div className="flex items-center gap-4 text-[10px] font-mono uppercase text-zinc-500">
                          <span>ID: {item.serial}</span>
                          <span>// {item.type}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* --- THE MASSIVE OVERRIDE SECTION --- */}
          {/* We use a ref here to calculate exact positioning */}
          <div ref={bannerRef} className="relative mt-12 z-20">
             
             {/* Industrial Top Border */}
             <div className="w-full h-2 bg-zinc-800 relative overflow-hidden mb-6">
                 <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#ea580c_10px,#ea580c_20px)] opacity-20" />
             </div>

             <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-8 pr-4">
                 <div>
                     <div className="flex items-center gap-2 text-orange-500 mb-2">
                         <TriangleAlert size={20} className="animate-pulse" />
                         <span className="font-mono text-sm tracking-widest uppercase font-bold">System_Override_Active</span>
                     </div>
                     <h2 className="text-5xl md:text-6xl font-black uppercase text-white leading-[0.9]">
                         Protocol<br/>
                         <span className="text-zinc-600">Agnostic</span>
                     </h2>
                 </div>
                 <p className="max-w-xs text-sm font-mono text-zinc-500 text-right uppercase leading-relaxed">
                     // Restricted constraints removed. <br/>
                     We engineer dominance across any stack. If it runs code, we can build on it.
                 </p>
             </div>

             {/* THE MARQUEE - CALCULATED FULL WIDTH */}
             {/* We shift it left by 'bannerOffset' to hit the exact screen edge */}
             <div 
                className="relative bg-[#0A0A0A] border-y border-zinc-800 py-12 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)_inset]"
                style={{
                    width: '100vw',
                    marginLeft: `-${bannerOffset}px`, // This forces it to align to the screen left edge
                    marginRight: `-${bannerOffset}px` // Optional, keeps symmetry
                }}
             >
                 {/* Left Fade */}
                 <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
                 {/* Right Fade */}
                 <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

                 {/* Tech Background Pattern */}
                 <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,theme(colors.orange.600),transparent_50%)]" />

                 <div className="flex items-center gap-16 animate-[infinite-scroll_40s_linear_infinite] w-max">
                     {[...extraTechs, ...extraTechs, ...extraTechs].map((tech, i) => (
                         <div key={i} className="flex items-center gap-4 group cursor-default">
                             <HardDrive className="text-zinc-800 group-hover:text-orange-600 transition-colors duration-300" size={32} />
                             <span className="text-6xl md:text-7xl font-black text-zinc-800 uppercase tracking-tighter group-hover:text-zinc-100 transition-colors duration-300">
                                 {tech}
                             </span>
                         </div>
                     ))}
                 </div>
             </div>

          </div>
        </div>

        {/* RIGHT COLUMN: THE MONITOR */}
        {/* We increased z-index here so it can float over the banner if needed, or set to 10 to go under */}
        <div className="lg:col-span-5 monitor-wrapper sticky top-32 h-fit hidden lg:block z-30">
          <div className="monitor-screen relative w-full bg-black border-4 border-zinc-800 rounded-lg shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.15),rgba(0,0,0,0.15)_1px,transparent_1px,transparent_2px)] pointer-events-none z-30" />
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0)_50%,rgba(0,0,0,0.4)_100%)] pointer-events-none z-30" />
            
            <div className="bg-zinc-900 p-3 flex justify-between items-center border-b border-zinc-800">
              <div className="flex items-center gap-2 text-xs font-mono text-orange-500 uppercase">
                <Lock size={12} />
                <span>Secure_Shell_Access</span>
              </div>
              <div className="flex gap-2">
                 <div className="w-2 h-2 rounded-full bg-zinc-700" />
                 <div className="w-2 h-2 rounded-full bg-zinc-700" />
              </div>
            </div>

            <div className="p-6 h-[400px] flex flex-col justify-between bg-zinc-950/80 backdrop-blur">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-zinc-900/50 p-3 border border-zinc-800">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] text-zinc-500 font-mono uppercase">Core_Load</span>
                    <Cpu size={12} className="text-zinc-500" />
                  </div>
                  <div className="text-2xl font-mono text-white mb-2">{cpu}%</div>
                  <div className="flex gap-[2px] h-6 items-end">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className={`w-full bg-orange-600/80 transition-all duration-300`} style={{ height: `${Math.random() * cpu}%`, opacity: (i/8) + 0.2 }} />
                    ))}
                  </div>
                </div>

                <div className="bg-zinc-900/50 p-3 border border-zinc-800">
                   <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] text-zinc-500 font-mono uppercase">Latency</span>
                    <Wifi size={12} className="text-zinc-500" />
                  </div>
                  <div className="text-2xl font-mono text-white mb-2">{latency}ms</div>
                  <div className="w-full bg-zinc-800 h-1 mt-4">
                    <div className="h-full bg-green-500 transition-all duration-200" style={{ width: `${100 - latency}%` }} />
                  </div>
                </div>
              </div>

              <div className="font-mono text-xs space-y-1.5 h-full overflow-hidden border-t border-dashed border-zinc-800 pt-4">
                {logs.map((log, i) => (
                  <div key={i} className="text-zinc-400 opacity-80 break-words">
                    <span className="text-orange-600 mr-2">{'>'}</span>
                    {log}
                  </div>
                ))}
                <div className="w-2 h-4 bg-orange-500 animate-pulse mt-1" />
              </div>

            </div>
          </div>
        </div>

      </div>

      <style jsx global>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}