"use client";

import React, { useEffect, useRef, useState } from "react";
import { 
  motion, 
  useScroll, 
  useTransform
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  ArrowUpRight, Cpu, Zap, 
  Layers, Shield, Terminal, Database, Rocket, 
  Activity, 
  Hexagon
} from "lucide-react";

// Import Shared Components
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Footer from "./Components/Footer";
import { GridPattern, RevealTitle } from "./Components/shared";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HUDOverlay = () => {
  const [metrics, setMetrics] = useState({ cpu: 0, ram: 0, ping: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setMetrics({
        cpu: Math.floor(Math.random() * 45) + 10,
        ram: Math.floor(Math.random() * 20) + 40,
        ping: Math.floor(Math.random() * 15) + 5,
      });
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-100 p-6 hidden lg:block">
      <div className="absolute top-6 left-6 flex flex-col gap-2 font-mono text-xs text-orange-600/60 uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-orange-600 animate-pulse" />
          <span>ESTABLISHING_SECURE_LINK...</span>
        </div>
        <span>LOCATION: 37.7749 N // 122.4194 W</span>
        <span>LATENCY: {metrics.ping}MS</span>
      </div>
      <div className="absolute top-6 right-6 text-right font-mono text-xs text-orange-600/60 uppercase tracking-widest">
        <div>EAGLEX_OS_V4.2.0</div>
        <div>UPLINK: ACTIVE</div>
      </div>
      
      <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-8 opacity-40">
        {[0, 1, 2, 3].map(i => (
          <div key={i} className="flex items-center gap-4">
            <div className="h-px w-8 bg-orange-600" />
            <div className="w-1 h-1 rounded-full bg-orange-600" />
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 left-6 flex gap-12 font-mono text-xs text-orange-600/60">
        <div className="flex gap-4">
          <span>CPU: {metrics.cpu}%</span>
          <div className="w-20 h-2 bg-white/5 relative overflow-hidden mt-1">
            <motion.div animate={{ width: `${metrics.cpu}%` }} className="absolute h-full bg-orange-600" />
          </div>
        </div>
        <div className="flex gap-4">
          <span>MEM: {metrics.ram}%</span>
          <div className="w-20 h-2 bg-white/5 relative overflow-hidden mt-1">
            <motion.div animate={{ width: `${metrics.ram}%` }} className="absolute h-full bg-orange-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function EagleXMonolith() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal Scroll GSAP Logic
      const panels = gsap.utils.toArray(".h-panel");
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: ".h-trigger",
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => "+=" + (horizontalRef.current?.offsetWidth || 2000),
        }
      });

      // Text reveal animations
      gsap.utils.toArray(".text-reveal").forEach((text: any) => {
        gsap.from(text, {
          y: 50,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: text,
            start: "top 90%"
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#050505] text-[#F5F5F5] selection:bg-orange-600 selection:text-black overflow-x-hidden w-full">
      <HUDOverlay />
      <GridPattern opacity={0.03} />
      
      <Navbar />
      <Hero />

      {/* Marquee Section */}
      <div className="relative py-8 md:py-12 bg-orange-600 border-y-4 border-black overflow-hidden flex select-none z-20 -rotate-1 origin-center scale-105">
        <motion.div 
          animate={{ x: [0, -2000] }} 
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap items-center gap-10 md:gap-20 px-10"
        >
          {[...Array(12)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-5xl md:text-7xl font-black uppercase text-black italic">Next-Gen Architecture</span>
              <Zap className="text-black fill-black" size={32} />
              <span className="text-5xl md:text-7xl font-black uppercase text-black italic">Atomic Components</span>
              <Hexagon className="text-black" size={32} />
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* Intent Section */}
      <section className="py-20 md:py-60 px-6 max-w-450 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
          <div className="lg:col-span-9">
            <RevealTitle className="text-xs md:text-sm font-mono text-orange-500 mb-6 md:mb-12 tracking-widest uppercase font-black">Section_04 // The Intent</RevealTitle>
            <p className="text-4xl md:text-[8vw] font-black leading-[0.9] md:leading-[0.85] uppercase tracking-tighter">
              We do not build for <span className="text-gray-700 italic">convenience.</span> We build for <span className="text-orange-600">absolute dominance.</span>
            </p>
          </div>
          <div className="lg:col-span-3 flex flex-col justify-end gap-8 md:gap-12">
            <div className="p-8 md:p-10 bg-white/5 border border-white/10 rounded-3xl space-y-6 group cursor-pointer">
              <Activity className="text-orange-600" size={32} />
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed uppercase font-bold tracking-widest group-hover:text-white transition-colors">
                Our methodology prioritizes high-stakes engineering over aesthetic fluff. We architect digital machinery.
              </p>
            </div>
            <div className="text-[12vw] font-black text-white/3 leading-none uppercase italic select-none hidden md:block">Impact</div>
          </div>
        </div>
      </section>

      {/* Horizontal Scroll Trigger Area - Split Panel Layout */}
     {/* Horizontal Scroll Trigger Area - Split Panel Layout */}
      <div className="h-trigger relative h-screen overflow-hidden">
        <div ref={horizontalRef} className="flex flex-row h-full w-[400vw]">
          
          {/* Panel 1: Distributed Core Logic (UPDATED WITH IMAGE) */}
          <div className="h-panel w-screen h-full bg-[#080808] border-r border-white/5 flex flex-col md:grid md:grid-cols-2 relative">
             {/* Content Side */}
             <div className="p-8 md:p-24 flex flex-col justify-center relative z-10 order-2 md:order-1 h-1/2 md:h-full">
                <div className="mb-8">
                   <Cpu size={48} className="text-orange-600 animate-pulse mb-6" />
                   <h3 className="text-4xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.9]">Distributed<br />Core Logic</h3>
                </div>
                <p className="text-sm md:text-xl text-gray-500 font-medium leading-relaxed max-w-xl">
                  Rust-based micro-services synchronized through gRPC. We eliminate the overhead of traditional REST for sub-millisecond internal communication.
                </p>
                <div className="flex flex-wrap gap-4 mt-8">
                  {["MEMORY-SAFE", "LOW-LATENCY", "gRPC", "K8S"].map(tag => (
                    <span key={tag} className="px-3 py-1 border border-orange-600/30 text-[10px] md:text-xs font-mono text-orange-500">{tag}</span>
                  ))}
                </div>
             </div>
             {/* Image Side - Added High Visibility Image */}
             <div className="relative h-1/2 md:h-full w-full order-1 md:order-2 overflow-hidden border-b md:border-b-0 md:border-l border-white/5">
                <div className="absolute inset-0 bg-orange-600/10 z-10 pointer-events-none" />
                <img 
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop" 
                  alt="Microprocessor Logic" 
                  className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity duration-1000 scale-105 hover:scale-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-[#080808] via-transparent to-transparent" />
             </div>
          </div>

          {/* Panel 2: Elastic State Trees */}
          <div className="h-panel w-screen h-full bg-[#0a0a0a] border-r border-white/5 flex flex-col md:grid md:grid-cols-2 relative">
             {/* Image Side - Left on Desktop */}
             <div className="relative h-1/2 md:h-full w-full overflow-hidden border-b md:border-b-0 md:border-r border-white/5">
                <img 
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
                  alt="Global Network" 
                  className="w-full h-full object-cover opacity-50 hover:opacity-80 transition-opacity duration-1000 grayscale hover:grayscale-0" 
                />
                <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent" />
             </div>
             {/* Content Side */}
             <div className="p-8 md:p-24 flex flex-col justify-center text-left md:text-right relative z-10 h-1/2 md:h-full">
                <div className="mb-8 md:ml-auto md:flex md:flex-col md:items-end">
                   <Database size={48} className="text-orange-600 mb-6" />
                   <h3 className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">Elastic<br />State Trees</h3>
                </div>
                <p className="text-sm md:text-xl text-gray-500 font-medium leading-relaxed max-w-xl md:ml-auto">
                  Global data persistence across 24 regions with conflict-free replicated data types (CRDTs). Your application state is consistent, everywhere.
                </p>
                <div className="flex flex-wrap gap-4 mt-8 md:justify-end">
                  {["CRDT", "POSTGRES", "REDIS", "EDGE"].map(tag => (
                    <span key={tag} className="px-3 py-1 border border-white/10 text-[10px] md:text-xs font-mono">{tag}</span>
                  ))}
                </div>
             </div>
          </div>

          {/* Panel 3: Zero-Trust Fortress (Light Theme) */}
          <div className="h-panel w-screen h-full bg-white text-black border-r border-white/5 flex flex-col md:grid md:grid-cols-2 relative">
             {/* Content Side */}
             <div className="p-8 md:p-24 flex flex-col justify-center relative z-10 h-1/2 md:h-full order-2 md:order-1">
                <div className="mb-8">
                   <Shield size={48} className="text-orange-600 mb-6" />
                   <h3 className="text-4xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.9]">Zero-Trust<br />Fortress</h3>
                </div>
                <p className="text-sm md:text-xl font-bold leading-relaxed max-w-xl">
                  Military-grade encryption for data at rest and in transit. Automated penetration testing is built into our CI/CD pipelines.
                </p>
             </div>
             {/* Image Side */}
             <div className="relative h-1/2 md:h-full w-full order-1 md:order-2 overflow-hidden border-b md:border-b-0 md:border-l border-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop" 
                  alt="Secure Architecture" 
                  className="w-full h-full object-cover opacity-80" 
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-white via-transparent to-transparent" />
             </div>
          </div>

          {/* Panel 4: Peak Apex (Orange Theme) */}
          <div className="h-panel w-screen h-full bg-orange-600 text-black flex flex-col md:grid md:grid-cols-2 relative">
             {/* Image Side */}
             <div className="relative h-1/2 md:h-full w-full overflow-hidden border-b md:border-b-0 md:border-r border-black/10">
                <div className="absolute inset-0 bg-orange-600/20 mix-blend-multiply z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop" 
                  alt="Future City" 
                  className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-orange-600 via-transparent to-transparent" />
             </div>
             {/* Content Side */}
             <div className="p-8 md:p-24 flex flex-col justify-center relative z-10 h-1/2 md:h-full">
                <h3 className="text-4xl md:text-8xl font-black uppercase leading-[0.9] italic tracking-tighter mb-8">Peak<br />Apex</h3>
                <div className="space-y-6">
                   <p className="text-2xl md:text-3xl font-black uppercase leading-tight">Handover complete. <br /> Systems operational.</p>
                   <p className="text-sm md:text-base font-bold opacity-80 leading-relaxed uppercase max-w-md">
                     We don't deliver projects; we deliver finished technical realities. Your new infrastructure is ready for the next decade.
                   </p>
                   <div className="h-2 w-full bg-black/20" />
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Bento Grid / Tools Section */}
      <section className="py-24 md:py-60 px-6 max-w-475 mx-auto overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-24 gap-8"
        >
          <div className="space-y-4">
            <span className="text-orange-600 font-mono text-xs uppercase tracking-widest font-black italic block animate-pulse">
              [ SYSTEM_LOAD: ARSENAL_MODULE ]
            </span>
            <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.8]">
              Tools of<br />Dominance
            </h2>
          </div>
          <p className="max-w-md text-gray-500 text-xs md:text-sm font-bold uppercase tracking-widest leading-relaxed text-left md:text-right border-l-2 md:border-l-0 md:border-r-2 border-orange-600 pl-6 md:pl-0 md:pr-6">
            Our custom component library is engineered for performance benchmarks that outclass standard React patterns by 40%.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            show: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-325"
        >
          <motion.div 
            variants={{ hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1 } }}
            className="md:col-span-8 bg-[#0a0a0a] border border-white/10 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 flex flex-col justify-between group overflow-hidden relative min-h-[400px] md:min-h-0"
          >
            <div className="absolute inset-0 bg-linear-to-br from-orange-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="flex justify-between items-start z-10">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                <Layers className="text-orange-600" size={48} />
              </motion.div>
              <span className="text-gray-700 font-mono text-[10px] md:text-xs uppercase font-black tracking-widest">Ref_742-ALPHA</span>
            </div>
            <div className="z-10 mt-10 md:mt-0">
              <h3 className="text-5xl md:text-9xl font-black uppercase italic leading-[0.85] mb-6 md:mb-10 group-hover:skew-x-2 transition-transform duration-700">
                Atomic<br /><span className="text-orange-600">Design</span> Lab
              </h3>
              <p className="text-gray-400 text-sm md:text-xl max-w-2xl leading-relaxed uppercase font-bold tracking-tight opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-500 md:translate-y-4 group-hover:translate-y-0">
                A proprietary UI framework built on top of native Tailwind and Framer, optimized for the highest rendering fidelity.
              </p>
            </div>
          </motion.div>

          <motion.div 
            variants={{ hidden: { opacity: 0, x: 50 }, show: { opacity: 1, x: 0 } }}
            className="md:col-span-4 bg-orange-600 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 flex flex-col justify-between group cursor-pointer overflow-hidden relative min-h-[300px] md:min-h-0"
          >
            <motion.div 
              animate={{ y: [0, -20, 0] }} 
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-10 -right-10 text-[20vw] font-black text-black opacity-10 italic"
            >
              GO
            </motion.div>
            <Rocket className="text-black group-hover:-translate-y-20 group-hover:translate-x-20 transition-all duration-700 ease-in-out" size={48} />
            <div className="space-y-4 z-10">
              <h4 className="text-4xl md:text-5xl font-black uppercase italic text-black leading-none">Blitz<br />Release</h4>
              <p className="text-black font-bold uppercase text-xs tracking-widest opacity-70">CI/CD deployment in under 60 seconds.</p>
            </div>
          </motion.div>

          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="md:col-span-3 bg-[#111] border border-white/5 rounded-[2rem] md:rounded-[3rem] p-8 md:p-10 flex flex-col justify-between hover:bg-orange-600 transition-all duration-500 group min-h-[200px] md:min-h-0"
          >
            <Terminal className="text-orange-600 group-hover:text-black transition-colors" size={32} />
            <h4 className="text-xl md:text-2xl font-black uppercase tracking-tighter group-hover:text-black">CLI Interface</h4>
          </motion.div>

          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="md:col-span-3 bg-[#0a0a0a] border border-white/10 rounded-[2rem] md:rounded-[3rem] p-8 md:p-10 flex flex-col justify-between hover:border-orange-600 transition-colors group min-h-[200px] md:min-h-0"
          >
            <Shield className="text-orange-600 group-hover:scale-110 transition-transform" size={32} />
            <h4 className="text-xl md:text-2xl font-black uppercase tracking-tighter">Audit Logic</h4>
          </motion.div>

          <motion.div 
            variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } }}
            className="md:col-span-6 bg-[#111] border border-white/5 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 flex items-center justify-between group overflow-hidden relative min-h-[200px] md:min-h-0"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ea580c15_0%,transparent_70%)] group-hover:scale-150 transition-transform duration-1000" />
            <div className="space-y-2 md:space-y-4 z-10">
              <h4 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter group-hover:text-orange-500 transition-colors">Neural Sync</h4>
              <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">Real-time AI telemetry integration.</p>
            </div>
            <ArrowUpRight className="text-white opacity-20 group-hover:opacity-100 group-hover:translate-x-4 group-hover:-translate-y-4 transition-all duration-500" size={60} />
          </motion.div>
        </motion.div>
      </section>

      {/* System Specs Section */}
      <section className="py-24 md:py-60 bg-[#020202] relative overflow-hidden border-y border-white/5">
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0.6, 0.7, 0.8], [0, 0.2, 0]) }}
          className="absolute inset-0"
        >
          <GridPattern size={40} />
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-40">
          <div className="space-y-12 md:space-y-24">
            <div className="overflow-hidden">
              <motion.h2 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="text-5xl md:text-7xl font-black uppercase italic leading-none"
              >
                System<br /><span className="text-orange-600">Specs</span>
              </motion.h2>
            </div>

            <div className="space-y-8 md:space-y-12">
              {[
                { label: "Compiler", value: "Custom LLVM Optimization", id: "C-01" },
                { label: "Language", value: "Typed Rust & TS 5.4", id: "L-02" },
                { label: "Infrastructure", value: "Terraform Clusters", id: "I-03" },
                { label: "State Management", value: "Atomic Proxy", id: "S-04" }
              ].map((spec, i) => (
                <motion.div 
                  key={spec.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="border-b border-white/10 pb-6 md:pb-8 flex justify-between items-end group cursor-crosshair"
                >
                  <div className="space-y-2">
                    <span className="text-orange-600 font-mono text-[10px] md:text-xs uppercase tracking-widest block group-hover:translate-x-2 transition-transform">
                      // {spec.label}
                    </span>
                    <div className="text-xl md:text-3xl font-black uppercase group-hover:text-orange-500 transition-colors tracking-tighter">
                      {spec.value}
                    </div>
                  </div>
                  <span className="text-gray-800 font-mono text-xs group-hover:text-orange-900 transition-colors italic">{spec.id}</span>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="bg-[#0a0a0a] rounded-3xl p-6 md:p-12 border border-white/5 flex flex-col gap-6 md:gap-10 shadow-[0_0_50px_rgba(234,88,12,0.05)]"
          >
            <div className="flex justify-between items-center border-b border-white/5 pb-6 md:pb-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-600 rounded-full animate-ping" />
                <span className="text-[10px] md:text-xs font-mono text-orange-500 uppercase tracking-widest italic">Live_System_Logs.log</span>
              </div>
              <div className="text-[10px] md:text-xs font-mono text-gray-600">UPTIME: 99.999%</div>
            </div>

            <div className="font-mono text-[10px] md:text-xs text-gray-500 space-y-4 h-64 md:h-112.5 overflow-hidden">
              {[...Array(24)].map((_, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-2 md:gap-6 border-l border-orange-600/20 pl-4 hover:bg-white/5 transition-colors"
                >
                  <span className="text-orange-600/40 hidden md:inline">[{1735313000 + i}]</span>
                  <span className="text-gray-400 italic break-all">UPLINK_ESTABLISHED: NODE_{i}_SYNC</span>
                  <span className="ml-auto text-green-500/40">NOMINAL</span>
                </motion.div>
              ))}
            </div>

            <motion.button 
              whileHover={{ scale: 0.98, backgroundColor: "#fff", color: "#000" }}
              className="mt-auto w-full py-4 border border-white/10 font-black uppercase tracking-widest text-[10px] md:text-xs transition-all"
            >
              Download Full Handover Audit
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Cycle Section */}
      <section className="py-24 md:py-60 bg-white text-black relative overflow-hidden">
        <div className="max-w-450 mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-40 gap-10">
            <motion.h2 
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-[14vw] font-black uppercase leading-[0.7] tracking-tighter italic"
            >
              The<br />Cycle
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="max-w-md text-sm md:text-xl font-bold uppercase tracking-tight text-gray-400 italic border-l-4 border-black pl-8"
            >
              Our execution pipeline is a relentless cycle of iteration until the result is mathematically perfect.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-20">
            {[
              { id: "01", title: "Discovery", desc: "Mapping the neural pathways of your business and bottlenecks." },
              { id: "02", title: "Refinement", desc: "Constructing architecture with zero tolerance for technical debt." },
              { id: "03", title: "Deployment", desc: "Launching infra through high-pressure stress testing." },
              { id: "04", title: "Expansion", desc: "Nurturing ecosystems with AI-driven telemetry feedback." }
            ].map((item, i) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="space-y-6 md:space-y-8 group relative"
              >
                <motion.div 
                  whileHover={{ x: 20, skewX: -10 }}
                  className="text-7xl md:text-9xl font-black text-gray-100 group-hover:text-orange-600 transition-all duration-700 cursor-default select-none"
                >
                  {item.id}
                </motion.div>
                
                <div className="relative z-10">
                  <h4 className="text-2xl md:text-3xl font-black uppercase tracking-tighter group-hover:translate-x-2 transition-transform">
                    {item.title}
                  </h4>
                  <p className="text-gray-500 font-medium leading-relaxed uppercase text-[10px] md:text-xs tracking-widest mt-4">
                    {item.desc}
                  </p>
                </div>
                
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-2 w-full bg-black origin-left"
                />
                <div className="h-2 w-0 group-hover:w-full bg-orange-600 transition-all duration-500 absolute bottom-0 left-0" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Alliances Section */}
      <section className="py-24 md:py-60 px-6 border-t border-white/5 relative overflow-hidden">
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 0.02 }}
          transition={{ duration: 2, ease: "circOut" }}
          className="absolute top-1/2 left-0 w-full text-[25vw] font-black -translate-y-1/2 pointer-events-none italic select-none whitespace-nowrap"
        >
          Alliances Alliances Alliances
        </motion.div>

        <div className="max-w-7xl mx-auto text-center space-y-20 md:space-y-40 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.2 }
              }
            }}
            className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-20 opacity-40 hover:opacity-100 transition-opacity duration-700 grayscale hover:grayscale-0"
          >
            {["NEXUS_INC", "QUANTUM_SYS", "APEX_VOID", "HYPER_DRIVE"].map((logo) => (
              <motion.div
                key={logo}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  show: { y: 0, opacity: 1 }
                }}
                whileHover={{ scale: 1.1, skewX: -10 }}
                className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter cursor-crosshair transition-all"
              >
                {logo}
              </motion.div>
            ))}
          </motion.div>
          
          <div className="space-y-12">
            <div className="overflow-hidden">
              <motion.blockquote 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl md:text-8xl font-black uppercase italic tracking-tighter leading-none max-w-6xl mx-auto"
              >
                "EagleX redefined our <span className="text-orange-600">roadmap.</span> Speed is <span className="italic">terrifying</span>, precision is <span className="text-gray-400">absolute.</span>"
              </motion.blockquote>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: "auto" }}
              transition={{ delay: 0.5, duration: 1 }}
              className="flex items-center justify-center gap-6 overflow-hidden"
            >
              <div className="h-px w-12 bg-orange-600" />
              <span className="font-mono text-orange-600 text-[10px] md:text-xs uppercase tracking-widest whitespace-nowrap">
                VP Engineering, NEXUS GROUP
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="h-screen flex flex-col justify-center items-center relative overflow-hidden bg-orange-600 text-black">
        <div className="absolute inset-0 opacity-10 flex flex-col gap-10 select-none py-10">
          {[...Array(8)].map((_, i) => (
            <motion.div 
              key={i}
              animate={{ x: i % 2 === 0 ? [-200, 0] : [0, -200] }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              className="text-[12vw] font-black uppercase italic leading-none whitespace-nowrap"
            >
              INITIATE_HANDSHAKE_PROTOCOL_V4_INITIATE_HANDSHAKE_PROTOCOL_V4
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 text-center cursor-pointer group"
        >
          <motion.span 
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-[10px] md:text-xs font-black uppercase tracking-widest mb-8 md:mb-12 block"
          >
            Connection_Request_Incoming
          </motion.span>
          
          <h2 className="text-[14vw] font-black uppercase leading-[0.7] tracking-tighter italic">
            Enter<br />
            <span className="text-transparent stroke-black transition-all duration-500 group-hover:text-black" style={{ WebkitTextStroke: "1px black" }}>Nexus</span>
          </h2>
          
          <motion.div 
            whileHover={{ y: -10 }}
            className="mt-12 md:mt-20 flex justify-center items-center gap-6 md:gap-12"
          >
            <div className="w-20 h-20 md:w-32 md:h-32 bg-black rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-zinc-900 transition-all duration-500">
               <ArrowUpRight className="text-orange-600 group-hover:rotate-45 transition-transform duration-500" size={40} />
            </div>
            <p className="text-xl md:text-4xl font-black uppercase italic underline decoration-4 md:decoration-8 underline-offset-8">Start Protocol</p>
          </motion.div>
        </motion.div>
      </section>

      <Footer />

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin 30s linear infinite;
        }
        ::-webkit-scrollbar {
          width: 0px;
          display: none;
        }
        body {
          -ms-overflow-style: none;
          scrollbar-width: none;
          background: #020202;
        }
        .h-panel {
          will-change: transform;
        }
      `}</style>
    </div>
  );
}