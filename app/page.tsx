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
  ArrowUpRight, Code2, Cpu, Globe, Zap, Fingerprint, 
  Layers, Shield, Terminal, Database, Rocket, 
  Users, Workflow, Activity, ChevronDown, Command, 
  MousePointer2, Radio, Server, Share2, Binary, 
  Box, Eye, HardDrive, Hexagon, Infinity as InfinityIcon, 
  Microscope, Monitor, Network, PenTool, 
  RefreshCcw, Search, Settings, Smartphone, Tablet, 
  Target, Triangle, Waves, Lock, Unlock, Key, 
  Cloud, CloudLightning, BarChart3, PieChart, LineChart
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const GridPattern = ({ size = 40, opacity = 0.1 }) => (
  <div className="absolute inset-0 pointer-events-none" style={{ opacity }}>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="innerGrid" width={size} height={size} patternUnits="userSpaceOnUse">
          <path d={`M ${size} 0 L 0 0 0 ${size}`} fill="none" stroke="white" strokeWidth="0.5" />
        </pattern>
        <pattern id="mainGrid" width={size * 5} height={size * 5} patternUnits="userSpaceOnUse">
          <rect width={size * 5} height={size * 5} fill="url(#innerGrid)" />
          <path d={`M ${size * 5} 0 L 0 0 0 ${size * 5}`} fill="none" stroke="white" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#mainGrid)" />
    </svg>
  </div>
);

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

const RevealTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={cn("overflow-hidden block", className)}>
      <motion.div
        initial={{ y: "100%", rotate: 5 }}
        whileInView={{ y: 0, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const MagneticLink = ({ children, href = "#" }: { children: React.ReactNode, href?: string }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const move = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    setPos({ x: (clientX - (left + width / 2)) * 0.4, y: (clientY - (top + height / 2)) * 0.4 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={move}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      className="relative text-xs font-black uppercase tracking-widest hover:text-orange-500 transition-colors py-2 px-4"
    >
      {children}
    </motion.a>
  );
};

export default function EagleXMonolith() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    <div ref={containerRef} className="bg-[#050505] text-[#F5F5F5] selection:bg-orange-600 selection:text-black">
      <HUDOverlay />
      <GridPattern opacity={0.03} />
      
      <nav className="fixed top-0 left-0 w-full z-110 px-8 py-10 flex justify-between items-start pointer-events-none">
        <div className="flex flex-col gap-1 pointer-events-auto">
          <div className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-orange-600 flex items-center justify-center rounded-sm transition-transform duration-500 group-hover:rotate-180">
              <Command className="text-black" size={24} />
            </div>
            <span className="text-4xl font-black uppercase italic tracking-tighter">EagleX</span>
          </div>
          <span className="text-xs font-mono text-orange-600/40 ml-16">ARCH_VERSION: 2.15.0</span>
        </div>

        <div className="flex flex-col items-end gap-6 pointer-events-auto">
          <div className="bg-black/40 backdrop-blur-2xl border border-white/10 p-4 rounded-2xl flex gap-10">
            {["Services", "Arsenal", "Nexus", "Foundry"].map(item => (
              <MagneticLink key={item}>{item}</MagneticLink>
            ))}
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-orange-600 text-black font-black uppercase tracking-widest text-xs rounded-lg"
          >
            Start Handshake
          </motion.button>
        </div>
      </nav>

      <section className="h-screen relative flex flex-col justify-center items-center px-6 overflow-hidden bg-[#020202]">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-10 w-72 h-72 border border-orange-600/20 rounded-full animate-[spin_25s_linear_infinite]" />
          <div className="absolute bottom-1/4 right-10 w-125 h-125 border border-orange-600/10 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: '110vh', opacity: [0, 0.5, 0] }}
                transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 5 }}
                className="absolute w-px h-20 bg-linear-to-b from-transparent via-orange-600 to-transparent"
                style={{ left: `${Math.random() * 100}%` }}
              />
            ))}
          </div>
        </div>

        <motion.div 
          style={{ perspective: 1200 }}
          className="z-10 text-center relative flex flex-col items-center"
        >
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className="flex items-center justify-center gap-8 mb-16 max-w-5xl px-4"
          >
            <div className="h-px flex-1 bg-linear-to-r from-transparent via-orange-600 to-orange-600" />
            <div className="flex items-center gap-3 font-mono text-xs text-orange-500 tracking-widest uppercase">
              <div className="w-2 h-2 bg-orange-600 animate-ping rounded-full" />
              <span>Uplink_Established_V.4.2</span>
            </div>
            <div className="h-px flex-1 bg-linear-to-l from-transparent via-orange-600 to-orange-600" />
          </motion.div>
          
          <motion.div
            initial={{ rotateX: 35, opacity: 0, scale: 0.9 }}
            animate={{ rotateX: 0, opacity: 1, scale: 1 }}
            whileHover={{ rotateX: -10, rotateY: 5 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative cursor-default select-none"
          >
            <h1 className="text-[17vw] md:text-[20vw] font-black uppercase leading-[0.7] tracking-tighter italic text-white group">
              EagleX<br />
            </h1>
          </motion.div>
          
          <div className="mt-28 grid grid-cols-1 md:grid-cols-3 gap-0 bg-white/5 border border-white/10 backdrop-blur-3xl max-w-7xl mx-auto divide-x divide-white/10 overflow-hidden">
            {[
              { 
                label: "CORE", 
                title: "Atomic Sync", 
                desc: "Next-gen distributed kernels built for absolute zero-latency execution.",
                icon: <Cpu size={16} /> 
              },
              { 
                label: "FORTRESS", 
                title: "Quantum Logic", 
                desc: "Zero-trust protocols as standard. Hardened logic gates at every network node.",
                icon: <Shield size={16} />
              },
              { 
                label: "SPEED", 
                title: "Blitz Protocol", 
                desc: "Proprietary deployment pipelines that physically outpace the global CDN.",
                icon: <Zap size={16} />
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + (idx * 0.2), duration: 0.8 }}
                className="group relative p-14 hover:bg-orange-600/3 transition-all duration-700 overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-orange-600/40 group-hover:border-orange-600 transition-colors" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-orange-600/40 group-hover:border-orange-600 transition-colors" />
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="text-orange-600 group-hover:rotate-360 transition-transform duration-1000">
                    {item.icon}
                  </div>
                  <span className="text-orange-600 font-mono text-xs tracking-widest uppercase font-black opacity-50 group-hover:opacity-100 transition-opacity">
                    {item.label}
                  </span>
                </div>
                
                <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter italic leading-none group-hover:text-orange-500 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 font-bold leading-relaxed uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                  {item.desc}
                </p>

                <span className="absolute -bottom-6 -right-4 text-7xl font-black text-white/1 italic select-none pointer-events-none group-hover:text-white/3 transition-colors">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="absolute bottom-14 flex flex-col items-center gap-5 cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-orange-600/30" />
            <span className="text-xs font-mono uppercase tracking-widest text-orange-600 animate-pulse">Engage_Scroll</span>
            <div className="w-12 h-px bg-orange-600/30" />
          </div>
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border border-orange-600/50 rounded-full flex justify-center p-1.5 backdrop-blur-sm"
          >
            <motion.div className="w-1.5 h-1.5 bg-orange-600 rounded-full shadow-[0_0_12px_#ea580c]" />
          </motion.div>
        </motion.div>
      </section>

      <div className="relative py-12 bg-orange-600 border-y-4 border-black overflow-hidden flex select-none z-20 -rotate-1 origin-center scale-105">
        <motion.div 
          animate={{ x: [0, -2000] }} 
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap items-center gap-20 px-10"
        >
          {[...Array(12)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-7xl font-black uppercase text-black italic">Next-Gen Architecture</span>
              <Zap className="text-black fill-black" size={48} />
              <span className="text-7xl font-black uppercase text-black italic">Atomic Components</span>
              <Hexagon className="text-black" size={48} />
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      <section className="py-60 px-6 max-w-450 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-9">
            <RevealTitle className="text-sm font-mono text-orange-500 mb-12 tracking-widest uppercase font-black">Section_04 // The Intent</RevealTitle>
            <p className="text-6xl md:text-[8vw] font-black leading-[0.85] uppercase tracking-tighter">
              We do not build for <span className="text-gray-700 italic">convenience.</span> We build for <span className="text-orange-600">absolute dominance.</span>
            </p>
          </div>
          <div className="lg:col-span-3 flex flex-col justify-end gap-12">
            <div className="p-10 bg-white/5 border border-white/10 rounded-3xl space-y-6 group cursor-pointer">
              <Activity className="text-orange-600" size={40} />
              <p className="text-gray-400 text-sm leading-relaxed uppercase font-bold tracking-widest group-hover:text-white transition-colors">
                Our methodology prioritizes high-stakes engineering over aesthetic fluff. We architect digital machinery.
              </p>
            </div>
            <div className="text-[12vw] font-black text-white/3 leading-none uppercase italic select-none">Impact</div>
          </div>
        </div>
      </section>

      <div className="h-trigger relative h-screen overflow-hidden">
        <div ref={horizontalRef} className="flex h-full w-[400vw]">
          <div className="h-panel w-screen h-full bg-[#080808] flex flex-col justify-center px-10 md:px-40 relative border-r border-white/5">
             <div className="absolute top-20 right-20 flex flex-col items-end">
                <span className="text-[25vw] font-black text-white/2 leading-none uppercase">Compute</span>
             </div>
             <div className="max-w-4xl space-y-12 relative z-10">
                <Cpu size={100} className="text-orange-600 animate-pulse" />
                <h3 className="text-8xl md:text-9xl font-black uppercase italic tracking-tighter">Distributed<br />Core Logic</h3>
                <p className="text-2xl text-gray-500 font-medium leading-relaxed max-w-2xl">
                  Rust-based micro-services synchronized through gRPC. We eliminate the overhead of traditional REST for sub-millisecond internal communication.
                </p>
                <div className="flex gap-6">
                  {["MEMORY-SAFE", "LOW-LATENCY", "gRPC", "K8S"].map(tag => (
                    <span key={tag} className="px-4 py-1 border border-orange-600/30 text-xs font-mono text-orange-500">{tag}</span>
                  ))}
                </div>
             </div>
          </div>

          <div className="h-panel w-screen h-full bg-[#0a0a0a] flex flex-col justify-center px-10 md:px-40 relative border-r border-white/5">
             <div className="max-w-4xl space-y-12 ml-auto text-right relative z-10">
                <Database size={100} className="text-orange-600 ml-auto" />
                <h3 className="text-8xl md:text-9xl font-black uppercase tracking-tighter">Elastic<br />State Trees</h3>
                <p className="text-2xl text-gray-500 font-medium leading-relaxed max-w-2xl ml-auto">
                  Global data persistence across 24 regions with conflict-free replicated data types (CRDTs). Your application state is consistent, everywhere.
                </p>
                <div className="flex gap-6 justify-end">
                  {["CRDT", "POSTGRES", "REDIS", "EDGE"].map(tag => (
                    <span key={tag} className="px-4 py-1 border border-white/10 text-xs font-mono">{tag}</span>
                  ))}
                </div>
             </div>
          </div>

          <div className="h-panel w-screen h-full bg-white text-black flex flex-col justify-center px-10 md:px-40 relative border-r border-white/5">
             <div className="max-w-4xl space-y-12 relative z-10">
                <Shield size={100} className="text-orange-600" />
                <h3 className="text-8xl md:text-9xl font-black uppercase italic tracking-tighter">Zero-Trust<br />Fortress</h3>
                <p className="text-2xl font-bold leading-relaxed max-w-2xl">
                  Military-grade encryption for data at rest and in transit. Automated penetration testing is built into our CI/CD pipelines.
                </p>
             </div>
          </div>

          <div className="h-panel w-screen h-full bg-orange-600 text-black flex flex-col justify-center px-10 md:px-40 relative">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                <h3 className="text-[12vw] font-black uppercase leading-[0.8] italic tracking-tighter">Peak<br />Apex</h3>
                <div className="space-y-10">
                   <p className="text-4xl font-black uppercase leading-tight">Handover complete. <br /> Systems operational.</p>
                   <p className="text-lg font-bold opacity-70 leading-relaxed uppercase">
                     We don't deliver projects; we deliver finished technical realities. Your new infrastructure is ready for the next decade.
                   </p>
                   <div className="h-2 w-full bg-black/20" />
                </div>
             </div>
          </div>
        </div>
      </div>

      <section className="py-60 px-6 max-w-475 mx-auto overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-between items-end mb-24"
        >
          <div className="space-y-4">
            <span className="text-orange-600 font-mono text-xs uppercase tracking-widest font-black italic block animate-pulse">
              [ SYSTEM_LOAD: ARSENAL_MODULE ]
            </span>
            <h2 className="text-8xl font-black uppercase italic tracking-tighter leading-[0.8]">
              Tools of<br />Dominance
            </h2>
          </div>
          <p className="max-w-md text-gray-500 text-sm font-bold uppercase tracking-widest leading-relaxed text-right border-r-2 border-orange-600 pr-6">
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
          className="grid grid-cols-1 md:grid-cols-12 gap-6 h-550 md:h-325"
        >
          <motion.div 
            variants={{ hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1 } }}
            whileHover={{ scale: 0.98 }}
            className="md:col-span-8 bg-[#0a0a0a] border border-white/10 rounded-[3rem] p-16 flex flex-col justify-between group overflow-hidden relative cursor-none"
          >
            <div className="absolute inset-0 bg-linear-to-br from-orange-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="flex justify-between items-start z-10">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                <Layers className="text-orange-600" size={64} />
              </motion.div>
              <span className="text-gray-700 font-mono text-xs uppercase font-black tracking-widest">Ref_742-ALPHA</span>
            </div>
            <div className="z-10">
              <h3 className="text-6xl md:text-9xl font-black uppercase italic leading-[0.85] mb-10 group-hover:skew-x-2 transition-transform duration-700">
                Atomic<br /><span className="text-orange-600">Design</span> Lab
              </h3>
              <p className="text-gray-400 text-xl max-w-2xl leading-relaxed uppercase font-bold tracking-tight opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                A proprietary UI framework built on top of native Tailwind and Framer, optimized for the highest rendering fidelity.
              </p>
            </div>
          </motion.div>

          <motion.div 
            variants={{ hidden: { opacity: 0, x: 50 }, show: { opacity: 1, x: 0 } }}
            className="md:col-span-4 bg-orange-600 rounded-[3rem] p-12 flex flex-col justify-between group cursor-pointer overflow-hidden relative"
          >
            <motion.div 
              animate={{ y: [0, -20, 0] }} 
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-10 -right-10 text-[20vw] font-black text-black opacity-10 italic"
            >
              GO
            </motion.div>
            <Rocket className="text-black group-hover:-translate-y-20 group-hover:translate-x-20 transition-all duration-700 ease-in-out" size={56} />
            <div className="space-y-4 z-10">
              <h4 className="text-5xl font-black uppercase italic text-black leading-none">Blitz<br />Release</h4>
              <p className="text-black font-bold uppercase text-xs tracking-widest opacity-70">CI/CD deployment in under 60 seconds.</p>
            </div>
          </motion.div>

          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="md:col-span-3 bg-[#111] border border-white/5 rounded-[3rem] p-10 flex flex-col justify-between hover:bg-orange-600 transition-all duration-500 group"
          >
            <Terminal className="text-orange-600 group-hover:text-black transition-colors" size={40} />
            <h4 className="text-2xl font-black uppercase tracking-tighter group-hover:text-black">CLI Interface</h4>
          </motion.div>

          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="md:col-span-3 bg-[#0a0a0a] border border-white/10 rounded-[3rem] p-10 flex flex-col justify-between hover:border-orange-600 transition-colors group"
          >
            <Shield className="text-orange-600 group-hover:scale-110 transition-transform" size={40} />
            <h4 className="text-2xl font-black uppercase tracking-tighter">Audit Logic</h4>
          </motion.div>

          <motion.div 
            variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } }}
            className="md:col-span-6 bg-[#111] border border-white/5 rounded-[3rem] p-12 flex items-center justify-between group overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ea580c15_0%,transparent_70%)] group-hover:scale-150 transition-transform duration-1000" />
            <div className="space-y-4 z-10">
              <h4 className="text-4xl font-black uppercase italic tracking-tighter group-hover:text-orange-500 transition-colors">Neural Sync</h4>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Real-time AI telemetry integration.</p>
            </div>
            <ArrowUpRight className="text-white opacity-20 group-hover:opacity-100 group-hover:translate-x-4 group-hover:-translate-y-4 transition-all duration-500" size={80} />
          </motion.div>
        </motion.div>
      </section>

      <section className="py-60 bg-[#020202] relative overflow-hidden border-y border-white/5">
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0.6, 0.7, 0.8], [0, 0.2, 0]) }}
          className="absolute inset-0"
        >
          <GridPattern size={40} />
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-40">
          <div className="space-y-24">
            <div className="overflow-hidden">
              <motion.h2 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="text-7xl font-black uppercase italic leading-none"
              >
                System<br /><span className="text-orange-600">Specs</span>
              </motion.h2>
            </div>

            <div className="space-y-12">
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
                  className="border-b border-white/10 pb-8 flex justify-between items-end group cursor-crosshair"
                >
                  <div className="space-y-2">
                    <span className="text-orange-600 font-mono text-xs uppercase tracking-widest block group-hover:translate-x-2 transition-transform">
                      // {spec.label}
                    </span>
                    <div className="text-3xl font-black uppercase group-hover:text-orange-500 transition-colors tracking-tighter">
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
            className="bg-[#0a0a0a] rounded-3xl p-12 border border-white/5 flex flex-col gap-10 shadow-[0_0_50px_rgba(234,88,12,0.05)]"
          >
            <div className="flex justify-between items-center border-b border-white/5 pb-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-600 rounded-full animate-ping" />
                <span className="text-xs font-mono text-orange-500 uppercase tracking-widest italic">Live_System_Logs.log</span>
              </div>
              <div className="text-xs font-mono text-gray-600">UPTIME: 99.999%</div>
            </div>

            <div className="font-mono text-xs text-gray-500 space-y-4 h-112.5 overflow-hidden">
              {[...Array(24)].map((_, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-6 border-l border-orange-600/20 pl-4 hover:bg-white/5 transition-colors"
                >
                  <span className="text-orange-600/40">[{1735313000 + i}]</span>
                  <span className="text-gray-400 italic">UPLINK_ESTABLISHED: NODE_{i}_SYNC</span>
                  <span className="ml-auto text-green-500/40">NOMINAL</span>
                </motion.div>
              ))}
            </div>

            <motion.button 
              whileHover={{ scale: 0.98, backgroundColor: "#fff", color: "#000" }}
              className="mt-auto w-full py-4 border border-white/10 font-black uppercase tracking-widest text-xs transition-all"
            >
              Download Full Handover Audit
            </motion.button>
          </motion.div>
        </div>
      </section>

      <section className="py-60 bg-white text-black relative overflow-hidden">
        <div className="max-w-450 mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-40 gap-10">
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
              className="max-w-md text-xl font-bold uppercase tracking-tight text-gray-400 italic border-l-4 border-black pl-8"
            >
              Our execution pipeline is a relentless cycle of iteration until the result is mathematically perfect.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20">
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
                className="space-y-8 group relative"
              >
                <motion.div 
                  whileHover={{ x: 20, skewX: -10 }}
                  className="text-9xl font-black text-gray-100 group-hover:text-orange-600 transition-all duration-700 cursor-default select-none"
                >
                  {item.id}
                </motion.div>
                
                <div className="relative z-10">
                  <h4 className="text-3xl font-black uppercase tracking-tighter group-hover:translate-x-2 transition-transform">
                    {item.title}
                  </h4>
                  <p className="text-gray-500 font-medium leading-relaxed uppercase text-xs tracking-widest mt-4">
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

      <section className="py-60 px-6 border-t border-white/5 relative overflow-hidden">
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 0.02 }}
          transition={{ duration: 2, ease: "circOut" }}
          className="absolute top-1/2 left-0 w-full text-[25vw] font-black -translate-y-1/2 pointer-events-none italic select-none whitespace-nowrap"
        >
          Alliances Alliances Alliances
        </motion.div>

        <div className="max-w-7xl mx-auto text-center space-y-40 relative z-10">
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
            className="flex flex-col md:flex-row justify-between items-center gap-20 opacity-40 hover:opacity-100 transition-opacity duration-700 grayscale hover:grayscale-0"
          >
            {["NEXUS_INC", "QUANTUM_SYS", "APEX_VOID", "HYPER_DRIVE"].map((logo) => (
              <motion.div
                key={logo}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  show: { y: 0, opacity: 1 }
                }}
                whileHover={{ scale: 1.1, skewX: -10 }}
                className="text-4xl font-black uppercase italic tracking-tighter cursor-crosshair transition-all"
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
                className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none max-w-6xl mx-auto"
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
              <span className="font-mono text-orange-600 text-xs uppercase tracking-widest whitespace-nowrap">
                VP Engineering, NEXUS GROUP
              </span>
            </motion.div>
          </div>
        </div>
      </section>

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
            className="text-xs font-black uppercase tracking-widest mb-12 block"
          >
            Connection_Request_Incoming
          </motion.span>
          
          <h2 className="text-[14vw] font-black uppercase leading-[0.7] tracking-tighter italic">
            Enter<br />
            <span className="text-transparent stroke-black transition-all duration-500 group-hover:text-black" style={{ WebkitTextStroke: "3px black" }}>Nexus</span>
          </h2>
          
          <motion.div 
            whileHover={{ y: -10 }}
            className="mt-20 flex justify-center items-center gap-12"
          >
            <div className="w-32 h-32 bg-black rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-zinc-900 transition-all duration-500">
               <ArrowUpRight className="text-orange-600 group-hover:rotate-45 transition-transform duration-500" size={64} />
            </div>
            <p className="text-4xl font-black uppercase italic underline decoration-8 underline-offset-8">Start Protocol</p>
          </motion.div>
        </motion.div>
      </section>

      <footer className="bg-[#020202] pt-60 pb-12 px-6 md:px-20 border-t border-white/5 relative z-20">
        <div className="max-w-500 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-32 mb-60">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-6 space-y-16"
            >
              <div className="flex items-center gap-6 group">
                 <motion.div 
                  whileHover={{ rotate: 180 }}
                  className="w-16 h-16 bg-orange-600 rounded-sm flex items-center justify-center cursor-pointer"
                 >
                    <Command className="text-black" size={32} />
                 </motion.div>
                 <span className="text-7xl font-black uppercase italic tracking-tighter transition-all group-hover:text-orange-600">EagleX</span>
              </div>
              <p className="text-3xl text-zinc-500 font-medium leading-relaxed max-w-2xl uppercase tracking-tighter">
                Architecting the future of global enterprise. Zero-latency. Zero-failure. <span className="text-white">Absolute-precision.</span>
              </p>
              
              <div className="flex gap-12">
                 {[
                   { label: "Operational Hub", val: "San Francisco, CA" },
                   { label: "Network Node", val: "Stockholm, SE" }
                 ].map((hub, idx) => (
                   <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 * idx }}
                    key={idx} className="space-y-2 border-l border-white/10 pl-6"
                   >
                      <span className="text-orange-600 font-mono text-xs uppercase tracking-widest">{hub.label}</span>
                      <p className="text-xs font-bold uppercase tracking-widest leading-tight">{hub.val}</p>
                   </motion.div>
                 ))}
              </div>
            </motion.div>
            
            <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-3 gap-20">
              {[
                { title: "Sub-Networks", links: ["Foundry", "Arsenal", "Infra", "Stack", "Clients"] },
                { title: "Sync_Links", links: ["Twitter / X", "GitHub", "LinkedIn", "Discord", "Behance"] },
                { title: "Protocols", links: ["Privacy", "Security", "Terms", "Cookies"] }
              ].map((group, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  key={idx} className="space-y-10"
                >
                   <h5 className="text-xs font-mono text-orange-500 uppercase tracking-widest font-black flex items-center gap-2">
                     <span className="w-1.5 h-1.5 bg-orange-600 rounded-full" /> {group.title}
                   </h5>
                   <ul className="space-y-4">
                     {group.links.map(l => (
                       <li key={l} className="overflow-hidden">
                          <motion.a 
                            whileHover={{ x: 10, color: "#ea580c" }}
                            href="#" className="text-lg font-black uppercase transition-all tracking-tight block"
                          >
                            {l}
                          </motion.a>
                       </li>
                     ))}
                   </ul>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-end gap-10 border-t border-white/5 pt-12">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-10 text-xs font-black uppercase tracking-widest text-zinc-700">
                <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }}>TX_LAT: 0.12ms</motion.span>
                <span>STATUS: STABLE_ALPHA</span>
                <span>ENCRYPT: AES_GCM_X4</span>
              </div>
              <div className="text-xs font-mono text-zinc-600 uppercase tracking-widest">
                © 2025 EagleX Global Nexus ● system_build_v4.2.0-final
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-4">
               <div className="flex gap-12 font-black uppercase text-xs">
                 <span className="cursor-pointer hover:text-orange-600 transition-colors tracking-widest">Handshake Nominal</span>
                 <span className="cursor-pointer hover:text-orange-600 transition-colors tracking-widest">Node Operational</span>
               </div>
               <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "20rem" }}
                transition={{ duration: 1.5, ease: "circOut" }}
                className="h-1 bg-linear-to-r from-transparent via-orange-600/30 to-transparent" 
               />
            </div>
          </div>
        </div>
      </footer>

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