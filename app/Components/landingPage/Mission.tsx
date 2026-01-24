"use client";

import React, { useEffect, useRef } from "react";
import { Code2, Smartphone, Globe, Zap, Database, Cpu, Terminal, Crosshair } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const capabilities = [
  {
    icon: Globe,
    title: "Web Applications",
    description: "Full-stack platforms built for scale. React, Next.js, Node.js—enterprise-grade architecture.",
    specs: ["React/Next.js", "Cloud Deploy", "API Integration"]
  },
  {
    icon: Smartphone,
    title: "Mobile Solutions",
    description: "Native & cross-platform apps. iOS, Android, React Native—optimized for performance.",
    specs: ["iOS/Android", "React Native", "App Store Deploy"]
  },
  {
    icon: Database,
    title: "AI & Blockchain",
    description: "ML models, tokenization, Web3 integration. Cutting-edge tech, real-world application.",
    specs: ["AI/ML Models", "Smart Contracts", "Web3 Integration"]
  },
  {
    icon: Zap,
    title: "MVP Development",
    description: "7-day sprints. Launch-ready products that actually work. Fast execution, zero compromise.",
    specs: ["Rapid Prototyping", "Market Ready", "Iteration Speed"]
  }
];

export default function CapabilitiesShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: isMobile ? "top 85%" : "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".reveal-header", {
        y: isMobile ? 30 : 60,
        opacity: 0,
        stagger: 0.08,
        duration: isMobile ? 0.7 : 1,
        ease: "power4.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative py-24 md:py-32 bg-[#050505] text-white overflow-hidden selection:bg-orange-600 selection:text-white"
    >
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_60%,transparent_100%)]" />
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-600/15 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-20 md:mb-24">
          <div className="reveal-header flex items-center gap-3 mb-6">
            <Terminal size={16} className="text-orange-600" />
            <span className="text-orange-600 font-mono text-[10px] uppercase tracking-[0.3em] font-bold">
              Core_Systems // Capabilities
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-8">
            <div>
              <h2 className="reveal-header text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-2">
                FULL-STACK
              </h2>
              <h2 className="reveal-header text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-transparent" 
                  style={{ WebkitTextStroke: "2px rgba(255,77,0,0.4)" }}>
                DOMINANCE
              </h2>
            </div>

            <div className="reveal-header flex gap-4 items-start max-w-xl lg:pt-4">
              <div className="hidden sm:flex flex-col items-center gap-2 pt-1">
                <Crosshair size={18} className="text-orange-600" />
                <div className="w-[2px] h-20 bg-gradient-to-b from-orange-600 to-transparent" />
              </div>
              <p className="text-zinc-300 text-base md:text-lg leading-relaxed">
                FROM <span className="text-white font-black">CONCEPT TO DEPLOYMENT</span>, WE HANDLE THE ENTIRE STACK. 
                WEB, MOBILE, AI, BLOCKCHAIN—WHATEVER IT TAKES TO WIN.
              </p>
            </div>
          </div>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {capabilities.map((capability, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="group relative bg-zinc-900/40 border border-white/20 hover:border-orange-600 transition-all duration-500 backdrop-blur-md p-8 md:p-10"
            >
              {/* Scanline Effect */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[size:100%_4px] pointer-events-none opacity-40" />
              
              {/* Icon */}
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-orange-600/10 border border-orange-600/30 flex items-center justify-center group-hover:bg-orange-600/20 group-hover:border-orange-600 transition-all duration-500">
                  <capability.icon className="text-orange-600" size={32} strokeWidth={2.5} />
                </div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/20 group-hover:border-orange-600 transition-colors" />
              </div>

              {/* Content */}
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white group-hover:text-orange-600 transition-colors duration-300 mb-4">
                {capability.title}
              </h3>

              <p className="text-zinc-400 text-base leading-relaxed mb-6">
                {capability.description}
              </p>

              {/* Specs */}
              <div className="space-y-2">
                {capability.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-orange-600 rounded-full" />
                    <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                      {spec}
                    </span>
                  </div>
                ))}
              </div>

              {/* Corner Accent */}
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/20 group-hover:border-orange-600 transition-colors" />
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-20 p-8 md:p-10 bg-zinc-900/40 border border-white/20 backdrop-blur-md"
        >
          <div className="flex items-center gap-3 mb-6">
            <Cpu size={20} className="text-orange-600" />
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white">
              Tech Arsenal
            </h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "React/Next.js",
              "Node.js/Python",
              "MongoDB/PostgreSQL",
              "AWS/Vercel",
              "React Native",
              "TensorFlow/PyTorch",
              "Solidity/Web3",
              "Docker/K8s"
            ].map((tech, i) => (
              <div 
                key={i}
                className="px-4 py-3 bg-white/5 border border-white/10 hover:border-orange-600/30 hover:bg-orange-600/10 transition-all duration-300 text-center"
              >
                <span className="text-sm font-mono text-zinc-300 font-bold">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9 }}
          className="mt-8 grid grid-cols-3 gap-px bg-white/10"
        >
          <div className="bg-[#0A0A0A] p-6 md:p-8 text-center border border-white/10">
            <Code2 className="w-8 h-8 md:w-10 md:h-10 text-orange-600 mx-auto mb-3" strokeWidth={2.5} />
            <div className="text-3xl md:text-4xl font-black text-white mb-1 font-mono">100%</div>
            <p className="text-zinc-400 text-[10px] uppercase tracking-[0.2em] font-bold">Code Quality</p>
          </div>
          
          <div className="bg-[#0A0A0A] p-6 md:p-8 text-center border border-white/10">
            <Zap className="w-8 h-8 md:w-10 md:h-10 text-orange-600 mx-auto mb-3" strokeWidth={2.5} />
            <div className="text-3xl md:text-4xl font-black text-white mb-1 font-mono">7d</div>
            <p className="text-zinc-400 text-[10px] uppercase tracking-[0.2em] font-bold">MVP Sprint</p>
          </div>
          
          <div className="bg-[#0A0A0A] p-6 md:p-8 text-center border border-white/10">
            <Database className="w-8 h-8 md:w-10 md:h-10 text-orange-600 mx-auto mb-3" strokeWidth={2.5} />
            <div className="text-3xl md:text-4xl font-black text-white mb-1 font-mono">∞</div>
            <p className="text-zinc-400 text-[10px] uppercase tracking-[0.2em] font-bold">Scalability</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}