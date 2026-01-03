"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useMotionValue, 
  useMotionTemplate 
} from "framer-motion";
import { ArrowUpRight, Terminal, Cpu, Zap, Activity } from "lucide-react";

// --- PROJECT DATA FOR MARQUEE ---
const projects = [
  "/projects/SkylineChill.png",
  "/projects/Goodwin Batteries.png",
  "/projects/Vyapar App.png",
  "/projects/HROne Cloud.png",
  "/projects/First500days.png",
  "/projects/CyreneAI.png",
  "/projects/Saurce.png"
];

// --- 1. Scramble Text Effect Component ---
const ScrambleText = ({ text, className }: { text: string, className?: string }) => {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&";
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    let iteration = 0;
    
    interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{display}</span>;
};

// --- 2. Floating 3D Card ---
const FloatingCard = ({ children, x, y, rotate, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 100 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    style={{ x, y, rotate }}
    className="absolute z-20 hidden lg:block pointer-events-none"
  >
    <div className="bg-black/80 backdrop-blur-xl border border-orange-500/30 p-4 rounded-xl shadow-[0_0_30px_-5px_rgba(234,88,12,0.3)]">
      {children}
    </div>
  </motion.div>
);

// --- 3. BACKGROUND MARQUEE COMPONENT ---
const MarqueeRow = ({ duration, reverse }: { duration: number, reverse?: boolean }) => (
  <div className="flex overflow-hidden w-full">
    <motion.div
      initial={{ x: reverse ? "-50%" : "0%" }}
      animate={{ x: reverse ? "0%" : "-50%" }}
      transition={{ duration, ease: "linear", repeat: Infinity }}
      className="flex gap-8 px-4 min-w-max"
    >
      {[...projects, ...projects, ...projects].map((src, i) => (
        <div key={i} className="w-[300px] h-[180px] rounded-lg overflow-hidden border border-white/10 bg-white/5 relative">
           {/* Fallback gray box if image fails, or the image itself */}
           <img src={src} alt="project" className="w-full h-full object-cover opacity-50" />
           <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}
    </motion.div>
  </div>
);

export default function HeroHighVoltage() {
  const ref = useRef<HTMLDivElement>(null);
  
  // --- 3D Tilt Logic ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse values for foreground
  const springConfig = { damping: 20, stiffness: 100 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

  // Background Parallax
  const bgConfig = { damping: 30, stiffness: 80 };
  const bgX = useSpring(useTransform(mouseX, [-0.5, 0.5], ["8%", "-8%"]), bgConfig);
  const bgY = useSpring(useTransform(mouseY, [-0.5, 0.5], ["8%", "-8%"]), bgConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const width = rect.width;
      const height = rect.height;
      const mouseXFromCenter = e.clientX - rect.left - width / 2;
      const mouseYFromCenter = e.clientY - rect.top - height / 2;
      
      mouseX.set(mouseXFromCenter / width);
      mouseY.set(mouseYFromCenter / height);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center perspective-1000"
      style={{ perspective: "1000px" }}
    >
      {/* --- PARALLAX CONTAINER --- */}
      <motion.div 
        style={{ x: bgX, y: bgY, scale: 1.1 }} 
        className="absolute inset-0 z-0 pointer-events-none select-none flex items-center justify-center"
      >
        {/* 1. NEW MARQUEE LAYER (Behind Eagle) */}
        {/* opacity-20 makes it dim. -rotate-6 gives it that dynamic angle */}
        <div className="absolute inset-0 z-0 flex flex-col justify-center gap-6 opacity-90 grayscale -rotate-6 scale-125">
             <MarqueeRow duration={40} />
             <MarqueeRow duration={50} reverse />
             <MarqueeRow duration={60} />
             {/* Vignette to fade edges */}
             <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_30%,#000_100%)]" />
        </div>

        {/* 2. EAGLE IMAGE (z-10 ensures it is IN FRONT of marquee) */}
        <motion.img 
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="/Eaglex2.png" 
            alt="Eagle X Robo Logo"
            className="relative z-10 w-full h-full object-contain object-center scale-100 md:scale-90"
        />
        
        {/* 3. OVERLAYS (Blending) */}
        <div className="absolute inset-0 z-20 bg-orange-900/10 mix-blend-overlay" />
        <div className="absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,transparent_20%,#000_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-2/3 z-20 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </motion.div>

      {/* --- Dynamic Background Grid Lines (Behind everything else) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-10" />
        <motion.div 
          animate={{ backgroundPosition: ["0px 0px", "0px 100px"] }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          className="absolute bottom-0 left-[-50%] right-[-50%] h-[50vh] bg-[linear-gradient(to_right,#ea580c_1px,transparent_1px),linear-gradient(to_bottom,#ea580c_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30 [transform:perspective(500px)_rotateX(60deg)] origin-bottom"
        />
      </div>

      {/* --- 3D Content Container --- */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-30 w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center mt-0 md:mt-[-5vh]"
      >
        
        {/* Floating Decor Elements (Desktop Only) */}
        <FloatingCard x={-350} y={-100} rotate={-10} delay={0.5}>
          <div className="flex items-center gap-3 text-orange-500 font-mono text-xs">
            <Terminal size={16} />
            <span>npm run build:prod</span>
          </div>
          <div className="mt-2 h-1 w-32 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-orange-500 w-[70%]" />
          </div>
        </FloatingCard>

        <FloatingCard x={380} y={50} rotate={10} delay={0.7}>
          <div className="flex items-center gap-3 text-green-400 font-mono text-xs">
            <Cpu size={16} />
            <span>Server Load: Optimal</span>
          </div>
          <div className="mt-2 font-bold text-xl text-white">98.4%</div>
        </FloatingCard>

        {/* --- Main Typography --- */}
        <div className="relative text-center transform-style-3d">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 mb-6 backdrop-blur-md"
          >
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-xs font-mono text-orange-400 tracking-widest uppercase">
              Eagle x System
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-5xl md:text-9xl font-black text-white tracking-tighter leading-[0.9] uppercase mb-8 drop-shadow-2xl">
            <div className="flex flex-col items-center gap-2">
              <span className="relative inline-block hover:scale-[1.02] transition-transform duration-300">
                We Engineer
                <span className="absolute inset-0 text-red-500 opacity-50 mix-blend-screen translate-x-[2px] pointer-events-none">We Engineer</span>
                <span className="absolute inset-0 text-blue-500 opacity-50 mix-blend-screen -translate-x-[2px] pointer-events-none">We Engineer</span>
              </span>
              
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-orange-400 to-orange-700 filter drop-shadow-[0_0_25px_rgba(234,88,12,0.5)]">
                <ScrambleText text="DOMINANCE" />
              </span>
            </div>
          </h1>

          <p className="max-w-xl mx-auto text-gray-200 text-lg md:text-xl font-medium leading-relaxed mb-10 text-shadow-lg">
            Forging high-performance digital infrastructure for the next generation of 
            <span className="text-white font-bold"> unicorn founders.</span>
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-5">
            <button className="group relative w-full md:w-auto px-8 py-4 bg-orange-600 text-black font-bold uppercase tracking-wider overflow-hidden">
              <div className="absolute inset-0 bg-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-200 skew-x-12" />
              <span className="relative flex items-center justify-center gap-2 group-hover:text-black transition-colors">
                Initialize Project <ArrowUpRight size={18} />
              </span>
            </button>
            
            <button className="group w-full md:w-auto px-8 py-4 bg-black/40 backdrop-blur-sm border border-white/20 text-white font-bold uppercase tracking-wider hover:bg-white/10 transition-all">
              <span className="flex items-center justify-center gap-2">
                 <Activity size={18} className="text-orange-500 group-hover:animate-pulse" /> View Metrics
              </span>
            </button>
          </div>
        </div>

      </motion.div>

      {/* --- Bottom Scrolling Ticker --- */}
      <div className="absolute bottom-0 left-0 w-full border-t border-white/10 bg-black/90 backdrop-blur-xl py-4 overflow-hidden z-40">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex whitespace-nowrap gap-12 text-xs font-mono text-gray-500 uppercase tracking-widest"
        >
          {Array(10).fill("").map((_, i) => (
            <React.Fragment key={i}>
              <span className="flex items-center gap-2 text-white">
                <Zap size={12} className="text-orange-500" /> RAPID DEPLOYMENT
              </span>
              <span>///</span>
              <span className="flex items-center gap-2 text-white">
                <Terminal size={12} className="text-orange-500" /> CLEAN ARCHITECTURE
              </span>
              <span>///</span>
            </React.Fragment>
          ))}
        </motion.div>
      </div>

    </section>
  );
}