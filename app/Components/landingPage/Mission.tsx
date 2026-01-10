"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Activity, Shield, Zap, ArrowUpRight, Crosshair, Terminal } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Device detection hook
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

export default function MissionRedesign() {
  const containerRef = useRef<HTMLDivElement>(null);
  const consoleRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: isMobile ? "top 85%" : "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Staggered entrance for the brutalist text
      tl.from(".reveal-text", {
        y: isMobile ? 30 : 80,
        opacity: 0,
        stagger: isMobile ? 0.06 : 0.1,
        duration: isMobile ? 0.7 : 1.2,
        ease: "power4.out",
      })
      .from(consoleRef.current, {
        y: isMobile ? 40 : 0,
        x: isMobile ? 0 : 100,
        opacity: 0,
        rotateY: isMobile ? 0 : -20,
        duration: isMobile ? 0.9 : 1.5,
        ease: "expo.out",
      }, "-=0.6");

      // Mouse parallax for the console (desktop only)
      if (!isMobile) {
        const handleMouseMove = (e: MouseEvent) => {
          const { clientX, clientY } = e;
          const xPos = (clientX / window.innerWidth - 0.5) * 15;
          const yPos = (clientY / window.innerHeight - 0.5) * 15;

          gsap.to(consoleRef.current, {
            rotateY: xPos,
            rotateX: -yPos,
            duration: 1,
            ease: "power2.out",
          });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
      }
    }, containerRef);
    
    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-[#050505] flex items-center justify-center overflow-hidden py-16 md:py-20 px-5 md:px-6 selection:bg-orange-600 selection:text-white"
    >
      {/* Background Grid & FX */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-[size:30px_30px] md:bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,#000_60%,transparent_100%)]" />
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[280px] h-[280px] md:w-[600px] md:h-[600px] bg-orange-600/15 rounded-full blur-[100px] md:blur-[120px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-4 items-center relative z-10">
        
        {/* LEFT CONTENT */}
        <div className="lg:col-span-7 z-20">
          <div className="reveal-text flex items-center gap-2.5 mb-7 md:mb-8">
            <Terminal size={14} className="text-orange-600" />
            <span className="text-orange-600 font-mono text-[10px] tracking-[0.35em] uppercase font-bold">
              Protocol // Phase_01
            </span>
          </div>

          <div ref={titleRef} className="space-y-2 mb-8 md:mb-10">
            <h2 className="reveal-text text-6xl sm:text-7xl md:text-8xl lg:text-[8vw] font-black text-white leading-[0.85] uppercase tracking-tighter">
              LETHAL
            </h2>
            <h2 className="reveal-text text-6xl sm:text-7xl md:text-8xl lg:text-[8vw] font-black leading-[0.85] uppercase tracking-tighter text-transparent" 
                style={{ WebkitTextStroke: "2px rgba(255,255,255,0.25)" }}>
              PRECISION
            </h2>
          </div>

          <div className="reveal-text flex gap-5 items-start mb-10 md:mb-12">
            <div className="hidden sm:flex flex-col items-center gap-2 pt-1.5">
              <Crosshair size={20} className="text-orange-600" />
              <div className="w-[2px] h-20 md:h-24 bg-gradient-to-b from-orange-600 to-transparent" />
            </div>
            <p className="max-w-lg text-zinc-300 font-semibold text-[15px] md:text-lg leading-relaxed">
              WE OPERATE IN THE GRAY AREA BETWEEN <span className="text-white font-black">IMPOSSIBLE DEADLINES</span> AND <span className="text-white font-black">PERFECT EXECUTION</span>. 
              OUR MVPS ARE NOT JUST PROTOTYPES—THEY ARE WEAPONS ENGINEERED FOR DOMINATION.
            </p>
          </div>

          <button className="reveal-text group relative flex items-center justify-center gap-4 w-full md:w-auto px-8 py-5 bg-orange-600 text-black font-black uppercase text-sm tracking-[0.15em] hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(234,88,12,0.3)]">
            <span>Initiate Deployment</span>
            <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* RIGHT CONTENT: THE CONSOLE */}
        <div className="lg:col-span-5 perspective-2000 relative">
          <div 
            ref={consoleRef}
            className="w-full bg-zinc-900/40 border border-white/20 rounded-xl backdrop-blur-md p-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden"
            style={{ transformStyle: isMobile ? "flat" : "preserve-3d" }}
          >
            <div className="bg-[#0A0A0A] rounded-lg p-5 md:p-6 border border-white/10 relative">
              {/* Scanline UI */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[size:100%_4px] pointer-events-none opacity-40" />
              
              <div className="flex justify-between items-start mb-10 md:mb-12">
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-2.5 h-2.5 bg-orange-600 rounded-full animate-pulse shadow-[0_0_10px_rgba(234,88,12,0.8)]" />
                    <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-[0.2em] font-semibold">Neural_Link_Active</span>
                  </div>
                  <div className="text-xs font-mono text-zinc-500">ID: EAGLE_X_992</div>
                </div>
                <div className="px-3 py-1.5 bg-orange-600/15 border border-orange-600/30 text-[11px] font-mono text-orange-400 rounded-md font-bold">
                  LOAD: 94.2%
                </div>
              </div>

              {/* Data Waveform Area */}
              <div className="h-28 md:h-32 w-full bg-gradient-to-br from-orange-600/10 to-orange-600/5 rounded-lg border border-orange-600/20 mb-8 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center opacity-40">
                   <svg viewBox="0 0 200 100" className="w-full h-full stroke-orange-500 fill-none" strokeWidth="2">
                     <path d="M0 50 Q 25 10 50 50 T 100 50 T 150 50 T 200 50">
                        <animate attributeName="d" dur="3s" repeatCount="indefinite"
                          values="M0 50 Q 25 10 50 50 T 100 50 T 150 50 T 200 50;
                                  M0 50 Q 25 90 50 50 T 100 50 T 150 50 T 200 50;
                                  M0 50 Q 25 10 50 50 T 100 50 T 150 50 T 200 50" />
                     </path>
                   </svg>
                </div>
                <div className="relative z-10 text-center px-3">
                  <div className="text-3xl md:text-4xl font-black text-white italic tracking-tighter drop-shadow-lg">7_DAY_SPRINT</div>
                  <div className="text-[10px] font-mono text-orange-500 uppercase tracking-[0.25em] mt-1 font-bold">Overclocking Enabled</div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3.5">
                <div className="p-4 border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield size={14} className="text-zinc-400" />
                    <span className="text-[9px] text-zinc-400 font-mono uppercase tracking-wider font-bold">Security</span>
                  </div>
                  <div className="text-[11px] font-bold text-white font-mono">AES_256_ON</div>
                </div>
                <div className="p-4 border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap size={14} className="text-orange-500" />
                    <span className="text-[9px] text-zinc-400 font-mono uppercase tracking-wider font-bold">Latency</span>
                  </div>
                  <div className="text-[11px] font-bold text-white font-mono">0.002ms</div>
                </div>
              </div>

              {/* Console Footer */}
              <div className="mt-8 pt-4 border-t border-white/10 flex justify-between items-center">
                <div className="flex gap-1.5">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-orange-600/50 rounded-full" />
                  ))}
                </div>
                <Activity size={14} className="text-orange-600 opacity-60" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}