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
    className="absolute z-0 hidden lg:block pointer-events-none"
  >
    <div className="bg-black/80 backdrop-blur-xl border border-orange-500/30 p-4 rounded-xl shadow-[0_0_30px_-5px_rgba(234,88,12,0.3)]">
      {children}
    </div>
  </motion.div>
);

export default function HeroHighVoltage() {
  const ref = useRef<HTMLDivElement>(null);
  
  // --- 3D Tilt Logic ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse values
  const springConfig = { damping: 20, stiffness: 100 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const width = rect.width;
      const height = rect.height;
      const mouseXFromCenter = e.clientX - rect.left - width / 2;
      const mouseYFromCenter = e.clientY - rect.top - height / 2;
      
      // Normalize values between -0.5 and 0.5
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
      {/* --- Dynamic Background Grid --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
        
        {/* Animated Floor Grid */}
        <motion.div 
          animate={{ backgroundPosition: ["0px 0px", "0px 100px"] }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          className="absolute bottom-0 left-[-50%] right-[-50%] h-[50vh] bg-[linear-gradient(to_right,#ea580c_1px,transparent_1px),linear-gradient(to_bottom,#ea580c_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 [transform:perspective(500px)_rotateX(60deg)] origin-bottom"
        />
        
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-10" />
      </div>

      {/* --- 3D Content Container --- */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-20 w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center"
      >
        
        {/* Floating Decor Elements (Behind Text) */}
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
          
          {/* Glowing Backlight */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-orange-600/30 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />

          {/* Label */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 mb-6 backdrop-blur-md"
          >
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-xs font-mono text-orange-400 tracking-widest uppercase">
              Eagle x
            </span>
          </motion.div>

          {/* Massive Headline */}
          <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-[0.85] uppercase mb-8">
            <div className="flex flex-col items-center gap-2">
              <span className="relative inline-block hover:scale-[1.02] transition-transform duration-300">
                We Engineer
                {/* Glitch Overlay */}
                <span className="absolute inset-0 text-red-500 opacity-50 mix-blend-screen translate-x-[2px] pointer-events-none">We Engineer</span>
                <span className="absolute inset-0 text-blue-500 opacity-50 mix-blend-screen -translate-x-[2px] pointer-events-none">We Engineer</span>
              </span>
              
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-orange-400 to-orange-700">
                <ScrambleText text="DOMINANCE" />
              </span>
            </div>
          </h1>

          <p className="max-w-xl mx-auto text-gray-400 text-lg md:text-xl font-medium leading-relaxed mb-10">
            Forging high-performance digital infrastructure for the next generation of 
            <span className="text-white font-bold"> unicorn founders.</span>
          </p>

          {/* Action Area */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-5">
            <button className="group relative w-full md:w-auto px-8 py-4 bg-orange-600 text-black font-bold uppercase tracking-wider overflow-hidden">
              <div className="absolute inset-0 bg-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-200 skew-x-12" />
              <span className="relative flex items-center justify-center gap-2 group-hover:text-black transition-colors">
                Initialize Project <ArrowUpRight size={18} />
              </span>
            </button>
            
            <button className="group w-full md:w-auto px-8 py-4 bg-transparent border border-white/20 text-white font-bold uppercase tracking-wider hover:bg-white/5 transition-all">
              <span className="flex items-center justify-center gap-2">
                 <Activity size={18} className="text-orange-500 group-hover:animate-pulse" /> View Metrics
              </span>
            </button>
          </div>
        </div>

      </motion.div>

      {/* --- Bottom Scrolling Ticker --- */}
      <div className="absolute bottom-0 left-0 w-full border-t border-white/10 bg-black/80 backdrop-blur-md py-4 overflow-hidden z-30">
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