"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap, Globe, Database, Shield, Box, Terminal } from "lucide-react";

const tools = [
  {
    id: "01",
    title: "NEXT.JS_14",
    subtitle: "THE ENGINE",
    desc: "Server-side rendering matrix. Instant transitions.",
    icon: <Box size={32} />,
    col: "md:col-span-8",
    bg: "bg-[#0A0A0A]"
  },
  {
    id: "02",
    title: "VERCEL",
    subtitle: "THE LAUNCHPAD",
    desc: "Global edge network deployment.",
    icon: <Globe size={32} />,
    col: "md:col-span-4",
    bg: "bg-[#0A0A0A]" // Standard Dark
  },
  {
    id: "03",
    title: "SUPABASE",
    subtitle: "THE VAULT",
    desc: "PostgreSQL database with real-time subscriptions.",
    icon: <Database size={32} />,
    col: "md:col-span-4",
    bg: "bg-[#0A0A0A]"
  },
  {
    id: "04",
    title: "AUTH_V5",
    subtitle: "SECURITY",
    desc: "JWT sessions & encrypted gateways.",
    icon: <Shield size={32} />,
    col: "md:col-span-4",
    bg: "bg-[#0A0A0A]"
  },
  {
    id: "05",
    title: "TURBOPACK",
    subtitle: "VELOCITY",
    desc: "Rust-based compilation pipeline.",
    icon: <Zap size={32} />,
    col: "md:col-span-4",
    bg: "bg-orange-600 text-black" // The Accent Card
  }
];

export default function ToolsLoadout() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // 1. Staggered Entry (Heavy slam effect)
      gsap.from(".tool-card", {
        scrollTrigger: {
          trigger: ".grid-container",
          start: "top 85%",
        },
        y: 100,
        opacity: 0,
        scale: 0.9,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.7)" // Adds the "slam" physics
      });

      // 2. Scramble Text Effect on Hover
      const cards = document.querySelectorAll(".tool-card");
      cards.forEach((card) => {
        const title = card.querySelector(".card-title") as HTMLElement;
        const originalText = title?.innerText || "";
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_//";
        
        card.addEventListener("mouseenter", () => {
          let iterations = 0;
          const interval = setInterval(() => {
            title.innerText = originalText
              .split("")
              .map((letter, index) => {
                if (index < iterations) return originalText[index];
                return chars[Math.floor(Math.random() * chars.length)];
              })
              .join("");
            
            if (iterations >= originalText.length) clearInterval(interval);
            iterations += 1 / 2; // Scramble speed
          }, 30);
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="py-32 bg-[#020202] text-white overflow-hidden relative"
    >
      {/* Background Grid - faint and precise */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* HEADER: Minimalist military style */}
        <div className="flex justify-between items-end mb-16 border-b border-white/10 pb-8">
          <div>
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8]">
              Mission<br />
              <span className="text-orange-600">Loadout</span>
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-4 text-right">
             <div className="flex flex-col">
               <span className="text-xs font-mono text-zinc-500 uppercase">System Status</span>
               <span className="text-xl font-black uppercase text-white">All Systems Go</span>
             </div>
             <div className="w-12 h-12 border border-white/20 flex items-center justify-center">
               <Terminal size={20} className="text-orange-600 animate-pulse" />
             </div>
          </div>
        </div>

        {/* THE LOADOUT GRID */}
        <div className="grid-container grid grid-cols-1 md:grid-cols-12 gap-4">
          {tools.map((tool) => (
            <div 
              key={tool.id}
              className={`tool-card group relative ${tool.col} ${tool.bg} border border-white/10 p-8 flex flex-col justify-between min-h-[320px] overflow-hidden hover:border-orange-600 transition-colors duration-300`}
            >
              {/* Noise Overlay (Hover) */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none transition-opacity duration-300" />
              
              {/* Top Row: Icon & ID */}
              <div className="relative z-10 flex justify-between items-start">
                <div className={`p-3 rounded-sm ${tool.bg === 'bg-orange-600 text-black' ? 'bg-black text-orange-600' : 'bg-white/5 text-zinc-400 group-hover:text-orange-600 group-hover:bg-orange-600/10'} transition-all duration-300`}>
                  {tool.icon}
                </div>
                <span className={`font-mono text-xl font-bold opacity-30 ${tool.bg === 'bg-orange-600 text-black' ? 'text-black' : 'text-white'}`}>
                  {tool.id}
                </span>
              </div>

              {/* Bottom Row: Content */}
              <div className="relative z-10 space-y-4">
                <div>
                   <span className={`text-[10px] font-mono uppercase tracking-[0.2em] ${tool.bg === 'bg-orange-600 text-black' ? 'text-black/60' : 'text-orange-600'}`}>
                     {tool.subtitle}
                   </span>
                   <h3 className={`card-title text-4xl font-black uppercase leading-none mt-1 tracking-tight ${tool.bg === 'bg-orange-600 text-black' ? 'text-black' : 'text-white'}`}>
                     {tool.title}
                   </h3>
                </div>
                
                <p className={`text-sm font-medium leading-relaxed max-w-[90%] ${tool.bg === 'bg-orange-600 text-black' ? 'text-black/80' : 'text-zinc-500 group-hover:text-zinc-300'} transition-colors`}>
                  {tool.desc}
                </p>
              </div>

              {/* Corner Accents (The "Tech" feel) */}
              <div className={`absolute top-0 right-0 w-3 h-3 border-l border-b ${tool.bg === 'bg-orange-600 text-black' ? 'border-black/20' : 'border-white/20 group-hover:border-orange-600'} transition-colors`} />
              <div className={`absolute bottom-0 left-0 w-3 h-3 border-r border-t ${tool.bg === 'bg-orange-600 text-black' ? 'border-black/20' : 'border-white/20 group-hover:border-orange-600'} transition-colors`} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}